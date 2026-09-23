#!/usr/bin/env python3
"""
voice/voice_engine.py

Standalone Voice Engine for Lakshay Nagpal's Cockpit Dashboard.
Pure text-to-audio engine (zero LLM / Grok calls).
Pluggable providers: Kokoro (default), Edge-TTS, Azure Speech, ElevenLabs, Local Say fallback.
Features:
- Full text normalization (pronunciations.json)
- Delivery styles (styles.json: calm, warm, empathetic, intimate)
- Audio DSP pipeline (warmth EQ, close-mic reverb, LUFS normalization)
- SHA-256 caching by (text, voice, style, engine_version)
- Audio manifest management (data/audio_manifest.json)
- CLI commands: --samples, --daily, --pages, --all
"""

import os
import sys
import json
import time
import wave
import shutil
import hashlib
import argparse
import subprocess
from pathlib import Path
from typing import Dict, Any, Optional, Tuple, List

import re
import numpy as np

# Ensure voice directory is in sys.path
VOICE_DIR = Path(__file__).resolve().parent
BASE_DIR = VOICE_DIR.parent
if str(VOICE_DIR) not in sys.path:
    sys.path.insert(0, str(VOICE_DIR))

from normalizer import normalize_for_tts, split_into_sentences
from dsp import process_audio_style, write_wav, convert_wav_to_mp3, create_silence
from script_builder import build_daily_voice_script
from script_extractor import extract_all

CONFIG_PATH = VOICE_DIR / "voice_config.json"
STYLES_PATH = VOICE_DIR / "styles.json"
MANIFEST_PATH = BASE_DIR / "data" / "audio_manifest.json"
AUDIO_DIR = BASE_DIR / "assets" / "audio"
SAMPLES_DIR = VOICE_DIR / "samples"
CACHE_DIR = VOICE_DIR / ".cache"

AUDITION_TEXT = (
    "Good morning, Lakshay. Take one slow breath. Today is day three, and it is a steady one. "
    "First, two LeetCode problems, then your job applications. After breakfast, we will work "
    "on percentages, one step at a time. If something feels hard, that is normal. "
    "You have already done the hardest part by showing up. I am glad you are here."
)

CANONICAL_VOICE = "en-US-EmmaMultilingualNeural"
CANONICAL_STYLE = "velvet"


def load_json(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path: Path, data: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_audio_duration_wave(wav_path: Path) -> float:
    try:
        with wave.open(str(wav_path), "rb") as wf:
            frames = wf.getnframes()
            rate = wf.getframerate()
            return round(frames / float(rate), 2)
    except Exception:
        return 0.0


def compute_cache_hash(text: str, voice: str, style: str, engine_version: str, provider: str) -> str:
    raw = f"{text}|{voice}|{style}|{engine_version}|{provider}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


# =====================================================================
# Provider Implementations
# =====================================================================

class BaseTTSProvider:
    def synthesize_sentence(self, text: str, voice: str, speed: float, pitch_hz: int = 0) -> Tuple[np.ndarray, int]:
        raise NotImplementedError


class KokoroProvider(BaseTTSProvider):
    """Kokoro 82M Neural TTS Provider (24 kHz)."""
    def __init__(self):
        try:
            from kokoro import KPipeline
            self.KPipeline = KPipeline
            self.pipelines = {}
        except ImportError:
            raise RuntimeError(
                "Kokoro TTS is not installed in the current environment. "
                "Install with: pip install kokoro soundfile torch"
            )

    def _get_pipeline(self, voice: str):
        # 'b' for British voices (bf_emma), 'a' for American voices (af_heart, af_nicole, af_sky)
        lang_code = 'b' if voice.startswith('b') else 'a'
        if lang_code not in self.pipelines:
            self.pipelines[lang_code] = self.KPipeline(lang_code=lang_code)
        return self.pipelines[lang_code]

    def synthesize_sentence(self, text: str, voice: str, speed: float, pitch_hz: int = 0) -> Tuple[np.ndarray, int]:
        pipeline = self._get_pipeline(voice)
        generator = pipeline(text, voice=voice, speed=speed, split_pattern=r'\n+')
        chunks = []
        for _, _, audio in generator:
            chunks.append(audio)
        if chunks:
            full_audio = np.concatenate(chunks).astype(np.float32)
        else:
            full_audio = np.zeros(2400, dtype=np.float32)
        return full_audio, 24000


class EdgeTTSProvider(BaseTTSProvider):
    """Microsoft neural voices. One full read per script, so the delivery stays continuous."""

    long_form = True
    LEGACY_VOICES = {
        "af_heart": CANONICAL_VOICE,
        "af_nicole": CANONICAL_VOICE,
        "af_sky": CANONICAL_VOICE,
        "bf_emma": CANONICAL_VOICE,
    }

    def __init__(self):
        try:
            import edge_tts
            import asyncio
            self.edge_tts = edge_tts
            self.asyncio = asyncio
        except ImportError as exc:
            raise RuntimeError(
                "edge-tts is not installed. Install with: pip install edge-tts"
            ) from exc

    def synthesize_sentence(self, text: str, voice: str, speed: float, pitch_hz: int = 0) -> Tuple[np.ndarray, int]:
        from dsp import find_ffmpeg

        spoken = (text or "").strip()
        if not spoken:
            return np.zeros(2400, dtype=np.float32), 24000

        edge_voice = self.LEGACY_VOICES.get(voice, voice or CANONICAL_VOICE)
        rate_str = f"{int(round((speed - 1.0) * 100)):+d}%"
        pitch_str = f"{int(pitch_hz):+d}Hz"

        async def _run():
            communicate = self.edge_tts.Communicate(
                spoken, edge_voice, rate=rate_str, pitch=pitch_str
            )
            raw_bytes = b""
            async for chunk in communicate.stream():
                if chunk["type"] == "audio":
                    raw_bytes += chunk["data"]
            return raw_bytes

        audio_bytes = b""
        last_error = None
        for attempt in range(4):
            try:
                audio_bytes = self.asyncio.run(self.asyncio.wait_for(_run(), timeout=75))
                if audio_bytes:
                    break
            except Exception as exc:
                last_error = exc
                print(f"  [RETRY] Edge TTS attempt {attempt + 1} failed: {exc}")
                time.sleep(1.2 * (attempt + 1))
        if not audio_bytes:
            raise RuntimeError(f"Edge TTS returned no audio ({last_error})")

        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        token = f"{os.getpid()}_{time.time_ns()}"
        tmp_mp3 = CACHE_DIR / f"edge_{token}.mp3"
        tmp_wav = CACHE_DIR / f"edge_{token}.wav"
        tmp_mp3.write_bytes(audio_bytes)

        ffmpeg_bin = find_ffmpeg()
        if not ffmpeg_bin:
            raise RuntimeError(
                "ffmpeg is required to decode neural audio. "
                "Install ffmpeg, or pip install imageio-ffmpeg."
            )
        decoded = subprocess.run(
            [ffmpeg_bin, "-y", "-i", str(tmp_mp3), "-ar", "24000", "-ac", "1", str(tmp_wav)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        if decoded.returncode != 0 or not tmp_wav.exists():
            raise RuntimeError("ffmpeg could not decode Edge audio")

        with wave.open(str(tmp_wav), "rb") as wf:
            frames = wf.readframes(wf.getnframes())
            data = np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0

        tmp_mp3.unlink(missing_ok=True)
        tmp_wav.unlink(missing_ok=True)
        if data.size == 0:
            raise RuntimeError("Decoded Edge audio was empty")
        return data, 24000


class AzureProvider(BaseTTSProvider):
    """Azure Cognitive Services Speech Provider (requires AZURE_KEY and AZURE_REGION)."""
    def __init__(self):
        self.key = os.environ.get("AZURE_KEY")
        self.region = os.environ.get("AZURE_REGION")
        if not self.key or not self.region:
            raise RuntimeError(
                "Azure provider requires AZURE_KEY and AZURE_REGION environment variables to be set."
            )

    def synthesize_sentence(self, text: str, voice: str, speed: float, pitch_hz: int = 0) -> Tuple[np.ndarray, int]:
        import urllib.request
        azure_voice = CANONICAL_VOICE if voice in ("af_heart", "af_nicole", CANONICAL_VOICE) else voice
        url = f"https://{self.region}.tts.speech.microsoft.com/cognitiveservices/v1"
        headers = {
            "Ocp-Apim-Subscription-Key": self.key,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "riff-24khz-16bit-mono-pcm",
            "User-Agent": "LakshayVoiceEngine"
        }
        rate_pct = f"{int((speed - 1.0) * 100):+d}%"
        ssml = (
            f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>"
            f"<voice name='{azure_voice}'><prosody rate='{rate_pct}'>{text}</prosody></voice></speak>"
        )
        req = urllib.request.Request(url, data=ssml.encode("utf-8"), headers=headers, method="POST")
        with urllib.request.urlopen(req) as resp:
            wav_data = resp.read()
        
        tmp_wav = CACHE_DIR / "azure_temp.wav"
        tmp_wav.parent.mkdir(parents=True, exist_ok=True)
        tmp_wav.write_bytes(wav_data)
        with wave.open(str(tmp_wav), "rb") as wf:
            frames = wf.readframes(wf.getnframes())
            data = np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0
            return data, 24000


class ElevenLabsProvider(BaseTTSProvider):
    """ElevenLabs Neural TTS Provider (requires ELEVENLABS_KEY)."""
    def __init__(self):
        self.key = os.environ.get("ELEVENLABS_KEY")
        if not self.key:
            raise RuntimeError("ElevenLabs provider requires ELEVENLABS_KEY environment variable.")

    def synthesize_sentence(self, text: str, voice: str, speed: float, pitch_hz: int = 0) -> Tuple[np.ndarray, int]:
        import urllib.request
        voice_id = voice if voice and voice not in ("af_heart", "af_nicole") else "21m00Tcm4TlvDq8ikWAM"
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
        headers = {
            "xi-api-key": self.key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg"
        }
        payload = json.dumps({"text": text, "model_id": "eleven_multilingual_v2"}).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
        with urllib.request.urlopen(req) as resp:
            mp3_data = resp.read()
        
        tmp_mp3 = CACHE_DIR / "eleven_temp.mp3"
        tmp_wav = CACHE_DIR / "eleven_temp.wav"
        tmp_mp3.parent.mkdir(parents=True, exist_ok=True)
        tmp_mp3.write_bytes(mp3_data)
        
        if shutil.which("ffmpeg"):
            subprocess.run(["ffmpeg", "-y", "-i", str(tmp_mp3), "-ar", "24000", "-ac", "1", str(tmp_wav)],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        elif shutil.which("afconvert"):
            subprocess.run(["afconvert", "-f", "WAVE", "-d", "LEI16@24000", str(tmp_mp3), str(tmp_wav)],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
        with wave.open(str(tmp_wav), "rb") as wf:
            frames = wf.readframes(wf.getnframes())
            data = np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0
            return data, 24000


class LocalSayProvider(BaseTTSProvider):
    """macOS Native Speech Provider with DSP post-processing (zero external dependencies)."""
    VOICE_MAP = {
        "af_heart": "Samantha",
        "af_nicole": "Samantha",
        "bf_emma": "Karen",
        "af_sky": "Samantha"
    }

    def __init__(self):
        if not shutil.which("say"):
            raise RuntimeError("macOS 'say' command not available.")

    def synthesize_sentence(self, text: str, voice: str, speed: float, pitch_hz: int = 0) -> Tuple[np.ndarray, int]:
        mac_voice = self.VOICE_MAP.get(voice, "Samantha")
        rate_wpm = max(120, int(148 * (speed / 0.86)))
        
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        # Use unique pid temp file
        pid = os.getpid()
        tmp_aiff = CACHE_DIR / f"say_tmp_{pid}.aiff"
        tmp_wav = CACHE_DIR / f"say_tmp_{pid}.wav"

        # Generate AIFF
        cmd_say = ["say", "-v", mac_voice, "-r", str(rate_wpm), "-o", str(tmp_aiff), text]
        subprocess.run(cmd_say, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # Convert AIFF to standard 24kHz mono WAV
        cmd_conv = ["afconvert", "-f", "WAVE", "-d", "LEI16@24000", str(tmp_aiff), str(tmp_wav)]
        subprocess.run(cmd_conv, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        with wave.open(str(tmp_wav), "rb") as wf:
            n_frames = wf.getnframes()
            frames = wf.readframes(n_frames)
            data = np.frombuffer(frames, dtype=np.int16).astype(np.float32) / 32768.0

        # Clean up temp files safely
        try:
            tmp_aiff.unlink(missing_ok=True)
            tmp_wav.unlink(missing_ok=True)
        except Exception:
            pass

        return data, 24000


# =====================================================================
# Voice Engine Orchestrator
# =====================================================================

class VoiceEngine:
    def __init__(self, config_override: Optional[Dict[str, Any]] = None):
        self.config = load_json(CONFIG_PATH)
        if config_override:
            self.config.update(config_override)

        self.styles = load_json(STYLES_PATH)
        self.provider_name = self.config.get("provider", "edge_tts")
        self.default_voice = self.config.get("voice", CANONICAL_VOICE)
        self.default_style = self.config.get("style", CANONICAL_STYLE)
        self.voice_label = self.config.get("voice_label", "Velvet · Emma")
        self.default_speed = self.config.get("speed", 0.88)
        self.mp3_kbps = self.config.get("mp3_kbps", 48)
        self.engine_version = self.config.get("engine_version", "1.0.0")

        self.provider = self._init_provider(self.provider_name)
        self.manifest = self._load_manifest()

    def _init_provider(self, name: str) -> BaseTTSProvider:
        """Build the requested provider. Published audio must not silently become macOS say."""
        builders = {
            "kokoro": KokoroProvider,
            "edge_tts": EdgeTTSProvider,
            "azure": AzureProvider,
            "elevenlabs": ElevenLabsProvider,
            "local_say": LocalSayProvider,
        }
        builder = builders.get(name)
        if builder is None:
            raise RuntimeError(f"Unknown TTS provider '{name}'. Use edge_tts.")
        return builder()

    def _load_manifest(self) -> Dict[str, Any]:
        if MANIFEST_PATH.exists():
            return load_json(MANIFEST_PATH)
        return {
            "engine_version": self.engine_version,
            "provider": self.provider_name,
            "default_voice": self.default_voice,
            "default_style": self.default_style,
            "voice_label": self.voice_label,
            "sample_rate_hz": 24000,
            "bitrate_kbps": self.mp3_kbps,
            "items": {}
        }

    def save_manifest(self) -> None:
        self.manifest["updated_at"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        self.manifest["engine_version"] = self.engine_version
        self.manifest["provider"] = self.provider_name
        self.manifest["default_voice"] = self.default_voice
        self.manifest["default_style"] = self.default_style
        self.manifest["voice_label"] = self.voice_label
        self.manifest["bitrate_kbps"] = self.mp3_kbps
        save_json(MANIFEST_PATH, self.manifest)

    def render_script(
        self,
        raw_text: str,
        output_mp3_path: Path,
        voice: Optional[str] = None,
        style: Optional[str] = None,
        speed: Optional[float] = None,
        title: str = "Audio Brief",
        force: bool = False
    ) -> Tuple[Path, str, float]:
        """
        Renders a full script to MP3:
        1. Normalizes text (pronunciations, numbers, currency)
        2. Splits into sentences
        3. Applies subtle speed variations per sentence (+/- 4%)
        4. Synthesizes each sentence chunk
        5. Inserts sentence pauses (250-400ms)
        6. Applies warmth EQ, close-mic reverb, and LUFS normalization
        7. Encodes to 48kbps mono MP3
        Returns (output_path, sha256_hash, duration_seconds)
        """
        voice = voice or self.default_voice
        style = style or self.default_style
        speed = speed or self.default_speed

        style_cfg = self.styles.get(style, self.styles.get(CANONICAL_STYLE, self.styles.get("warm", {})))
        speed_base = style_cfg.get("speed", speed)
        pitch_hz = int(style_cfg.get("pitch_hz", self.config.get("pitch_hz", 0)))

        # 1. Normalize text
        normalized_text = normalize_for_tts(raw_text)
        sentences = split_into_sentences(normalized_text)

        # 2. Check cache hash
        cache_hash = compute_cache_hash(normalized_text, voice, style, self.engine_version, self.provider_name)
        if not force and output_mp3_path.exists():
            # Check manifest match
            for item_k, item_v in self.manifest.get("items", {}).items():
                if item_v.get("sha256") == cache_hash and Path(item_v.get("path", "")).resolve() == output_mp3_path.resolve():
                    print(f"  [CACHED] {output_mp3_path.relative_to(BASE_DIR)} ({item_v.get('duration_sec', 0)}s)")
                    return output_mp3_path, cache_hash, item_v.get("duration_sec", 0.0)

        # 3. Neural voices read the whole script once. Chopping clauses makes them restart
        # and sound less like a person. Local engines still go sentence by sentence.
        audio_segments: List[np.ndarray] = []
        sample_rate = 24000
        if getattr(self.provider, "long_form", False):
            chunk_audio, sample_rate = self.provider.synthesize_sentence(
                normalized_text, voice, speed_base, pitch_hz
            )
            audio_segments.append(chunk_audio)
        else:
            sentence_pause_ms = style_cfg.get("pause_sentence_ms", 480)
            clause_pause_ms = style_cfg.get("pause_clause_ms", 200)
            speed_variation_pct = style_cfg.get("speed_variance_pct", 0.035)

            for i, sentence in enumerate(sentences):
                if not sentence.strip():
                    continue

                variation = ((i % 3) - 1) * (speed_variation_pct / 2.0)
                sentence_speed = round(speed_base * (1.0 + variation), 3)

                clauses = [c.strip() for c in re.split(r'(?<=[,;:\u2014])\s+', sentence) if c.strip()]
                if not clauses:
                    clauses = [sentence]

                for c_idx, clause in enumerate(clauses):
                    chunk_audio, sr = self.provider.synthesize_sentence(clause, voice, sentence_speed, pitch_hz)
                    sample_rate = sr
                    audio_segments.append(chunk_audio)
                    if c_idx < len(clauses) - 1:
                        audio_segments.append(create_silence(clause_pause_ms, sample_rate))

                if i < len(sentences) - 1:
                    audio_segments.append(create_silence(sentence_pause_ms, sample_rate))

        if not audio_segments:
            # Fallback silence
            audio_segments.append(create_silence(1000, sample_rate))

        combined_audio = np.concatenate(audio_segments)

        # 4. DSP Post-Processing: Warmth EQ, close-mic acoustic reverb, LUFS loudness
        final_audio = process_audio_style(combined_audio, sample_rate, style_cfg)

        # 5. Write intermediate WAV & convert to MP3
        output_mp3_path.parent.mkdir(parents=True, exist_ok=True)
        temp_wav = CACHE_DIR / f"render_{cache_hash[:16]}.wav"
        CACHE_DIR.mkdir(parents=True, exist_ok=True)

        write_wav(temp_wav, final_audio, sample_rate)
        duration_sec = get_audio_duration_wave(temp_wav)

        convert_wav_to_mp3(temp_wav, output_mp3_path, self.mp3_kbps)
        temp_wav.unlink(missing_ok=True)

        print(f"  [RENDERED] {output_mp3_path.relative_to(BASE_DIR)} ({duration_sec}s, {output_mp3_path.stat().st_size} bytes)")
        return output_mp3_path, cache_hash, duration_sec

    def render_samples(self) -> List[Path]:
        """Render one audition of the voice the whole dashboard uses."""
        print("\n=======================================================")
        print(f"Audition: {self.voice_label} ({self.default_voice}, {self.default_style})")
        print(f"Target: {SAMPLES_DIR}")
        print("=======================================================")
        SAMPLES_DIR.mkdir(parents=True, exist_ok=True)
        for stale in SAMPLES_DIR.glob("sample_*.mp3"):
            stale.unlink()
        out_path = SAMPLES_DIR / "velvet.mp3"
        self.render_script(
            raw_text=AUDITION_TEXT,
            output_mp3_path=out_path,
            voice=self.default_voice,
            style=self.default_style,
            title=self.voice_label,
            force=True,
        )
        print(f"\nAudition written to {out_path}.")
        return [out_path]

    def render_daily(self, force: bool = False) -> Path:
        """Renders the daily briefing script from data/daily_plan.json."""
        print(f"\n=======================================================")
        print(f"Daily Briefing: Rendering morning audio brief")
        print(f"=======================================================")
        daily_script, meta = build_daily_voice_script()
        out_path = AUDIO_DIR / "index" / "daily_brief.mp3"
        word_count = len(daily_script.split())

        print(f"Script ({word_count} words):\n\"{daily_script}\"")
        _, cache_hash, duration = self.render_script(
            raw_text=daily_script,
            output_mp3_path=out_path,
            voice=self.default_voice,
            style=self.default_style,
            title="Daily Cockpit Briefing",
            force=force
        )

        # Update manifest
        item_id = "index/daily_brief"
        self.manifest["items"][item_id] = {
            "title": "Daily Cockpit Briefing",
            "page": "index",
            "path": f"assets/audio/index/daily_brief.mp3",
            "sha256": cache_hash,
            "words": word_count,
            "duration_sec": duration,
            "size_bytes": out_path.stat().st_size if out_path.exists() else 0,
            "voice": self.default_voice,
            "style": self.default_style,
            "provider": self.provider_name,
            "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }
        self.save_manifest()
        return out_path

    def _remember_existing(self, raw_text: str, out_path: Path, manifest_key: str, title: str, page_key: str) -> None:
        """Record a clip that was already rendered, without calling the speech service again."""
        normalized = normalize_for_tts(raw_text)
        cache_hash = compute_cache_hash(
            normalized, self.default_voice, self.default_style, self.engine_version, self.provider_name
        )
        duration = 0.0
        ffmpeg_bin = None
        try:
            from dsp import find_ffmpeg
            ffmpeg_bin = find_ffmpeg()
        except Exception:
            ffmpeg_bin = None
        if ffmpeg_bin and out_path.exists():
            probed = subprocess.run(
                [ffmpeg_bin, "-i", str(out_path)],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.PIPE,
                text=True,
            )
            match = re.search(r"Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)", probed.stderr or "")
            if match:
                hours, minutes, seconds = match.groups()
                duration = round(int(hours) * 3600 + int(minutes) * 60 + float(seconds), 2)
        self.manifest["items"][manifest_key] = {
            "title": title,
            "page": page_key,
            "path": f"assets/audio/{page_key}/{out_path.name}",
            "sha256": cache_hash,
            "words": len(raw_text.split()),
            "duration_sec": duration,
            "size_bytes": out_path.stat().st_size if out_path.exists() else 0,
            "voice": self.default_voice,
            "style": self.default_style,
            "provider": self.provider_name,
            "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

    def render_pages(self, force: bool = False, start_at: Optional[str] = None) -> Dict[str, Any]:
        """Extracts scripts from all pages and renders audio for each.

        start_at keeps every earlier clip that already exists and begins
        synthesis at that script id (for example topic_10_2).
        """
        print(f"\n=======================================================")
        print(f"Page Audio: Extracting scripts & rendering to assets/audio/")
        if start_at:
            print(f"Resume from: {start_at}")
        print(f"=======================================================")
        extracted = extract_all()
        results = {}
        started = not start_at

        for page_key, items in extracted.items():
            print(f"\nRendering {len(items)} audio briefs for page: [{page_key}]")
            for item in items:
                item_id = item["id"]
                manifest_key = f"{page_key}/{item_id}"
                out_path = AUDIO_DIR / page_key / f"{item_id}.mp3"
                word_count = len(item["text"].split())

                if not started:
                    if item_id == start_at or manifest_key == start_at:
                        started = True
                    elif out_path.exists() and out_path.stat().st_size > 1000:
                        print(f"  [KEEP] {manifest_key}")
                        self._remember_existing(item["text"], out_path, manifest_key, item["title"], page_key)
                        continue

                print(f"-> [{manifest_key}] '{item['title']}' ({word_count} words)")
                _, cache_hash, duration = self.render_script(
                    raw_text=item["text"],
                    output_mp3_path=out_path,
                    voice=self.default_voice,
                    style=self.default_style,
                    title=item["title"],
                    force=force or bool(start_at)
                )

                self.manifest["items"][manifest_key] = {
                    "title": item["title"],
                    "page": page_key,
                    "path": f"assets/audio/{page_key}/{item_id}.mp3",
                    "sha256": cache_hash,
                    "words": word_count,
                    "duration_sec": duration,
                    "size_bytes": out_path.stat().st_size if out_path.exists() else 0,
                    "voice": self.default_voice,
                    "style": self.default_style,
                    "provider": self.provider_name,
                    "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                }
                results[manifest_key] = self.manifest["items"][manifest_key]
                self.save_manifest()

        if start_at and not started:
            raise RuntimeError(f"Could not find a script id matching {start_at}")

        self.save_manifest()
        print(f"\nCompleted page audio rendering. Total manifest items: {len(self.manifest['items'])}")
        return results


# =====================================================================
# CLI Interface
# =====================================================================

def main():
    parser = argparse.ArgumentParser(description="Standalone Voice Engine for Lakshay Nagpal's Dashboard")
    parser.add_argument("--samples", action="store_true", help="Render the one Velvet audition clip")
    parser.add_argument("--daily", action="store_true", help="Render daily morning briefing to assets/audio/index/daily_brief.mp3")
    parser.add_argument("--pages", action="store_true", help="Extract and render all page summary audio files")
    parser.add_argument("--all", action="store_true", help="Render daily briefing, page summaries, and update manifest")
    parser.add_argument("--force", action="store_true", help="Force re-rendering even if cached")
    parser.add_argument("--from", dest="start_at", type=str, default=None, help="Skip existing clips before this script id, then render from there")
    parser.add_argument("--provider", type=str, default=None, help="Override TTS provider (kokoro, edge_tts, azure, elevenlabs, local_say)")
    parser.add_argument("--voice", type=str, default=None, help="Override voice name")
    parser.add_argument("--style", type=str, default=None, help="Override delivery style (calm, warm, empathetic, intimate)")
    parser.add_argument("--clean", action="store_true", help="Clean cache directory")

    args = parser.parse_args()

    if args.clean:
        if CACHE_DIR.exists():
            shutil.rmtree(CACHE_DIR)
            print("Cache cleared.")
        return

    overrides = {}
    if args.provider:
        overrides["provider"] = args.provider
    if args.voice:
        overrides["voice"] = args.voice
    if args.style:
        overrides["style"] = args.style

    engine = VoiceEngine(config_override=overrides)

    if args.samples:
        engine.render_samples()
    elif args.daily:
        engine.render_daily(force=args.force)
    elif args.pages:
        engine.render_pages(force=args.force, start_at=args.start_at)
    elif args.all:
        engine.manifest["items"] = {}
        engine.render_samples()
        engine.render_daily(force=args.force)
        engine.render_pages(force=args.force)
    else:
        # Default behavior if no flag passed
        print("No action flag provided. Use --samples, --daily, --pages, or --all.")
        print("Running --samples as default demonstration...")
        engine.render_samples()


if __name__ == "__main__":
    main()
