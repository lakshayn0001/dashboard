# Standalone Cockpit Voice Engine

A lightweight, high-fidelity, standalone text-to-speech (TTS) engine designed specifically for Lakshay Nagpal's Cockpit Dashboard.

> **Zero LLM / Grok calls**: This engine strictly transforms written dashboard text and daily plans into calibrated, warm spoken audio. It performs no generative language modeling or external chat calls.

---

## 1. Quick Start & Auditioning

To sample the 12 available voice & delivery style permutations:

```bash
# Render 4 voices x 3 styles (12 MP3 files in voice/samples/)
python3 voice/voice_engine.py --samples
```

Open `voice/samples/` and listen to the samples:
- `sample_af_heart_calm.mp3` | `sample_af_heart_warm.mp3` | `sample_af_heart_intimate.mp3`
- `sample_af_nicole_calm.mp3` | `sample_af_nicole_warm.mp3` | `sample_af_nicole_intimate.mp3`
- `sample_bf_emma_calm.mp3` | `sample_bf_emma_warm.mp3` | `sample_bf_emma_intimate.mp3`
- `sample_af_sky_calm.mp3` | `sample_af_sky_warm.mp3` | `sample_af_sky_intimate.mp3`

The audition passage used for all samples:
> *"Good morning, Lakshay. Take one slow breath. Today is day three, and it is a steady one. First, two LeetCode problems, then your job applications. After breakfast, we will work on percentages, one step at a time. If something feels hard, that is normal. You have already done the hardest part by showing up. I am glad you are here."*

---

## 2. CLI Commands

```bash
# Render today's morning briefing (from data/daily_plan.json)
python3 voice/voice_engine.py --daily

# Extract and render all page audio briefs across the 4 core pages
python3 voice/voice_engine.py --pages

# Full render: daily brief + all page audio files + manifest update
python3 voice/voice_engine.py --all

# Force re-render without relying on SHA-256 cache
python3 voice/voice_engine.py --all --force

# Test with a specific provider, voice, or style
python3 voice/voice_engine.py --daily --voice af_nicole --style intimate
```

---

## 3. Configuration (`voice/voice_config.json`)

Edit `voice/voice_config.json` to change default settings:

```json
{
  "provider": "kokoro",
  "voice": "af_heart",
  "style": "warm",
  "speed": 0.88,
  "mp3_kbps": 48,
  "mono": true,
  "engine_version": "1.0.0"
}
```

### Supported Providers:
1. **`kokoro` (Default Neural Engine)**:
   - 82M parameter lightweight transformer TTS model operating natively at 24 kHz.
   - Pinned voices: `af_heart` (warm American female), `af_nicole` (conversational), `bf_emma` (crisp British RP), `af_sky` (soothing).
   - Requires: `pip install kokoro soundfile torch`.
2. **`edge_tts` (Zero-Key Neural Cloud Provider)**:
   - Microsoft Edge neural cloud speech synthesis (no API keys required).
   - Voices: `en-US-JennyNeural`, `en-US-AvaNeural`, `en-GB-SoniaNeural`, `en-IN-NeerjaNeural`.
3. **`azure` (Optional Cloud Provider)**:
   - Microsoft Azure Cognitive Services Speech.
   - Requires environment variables: `export AZURE_KEY="your_key"` and `export AZURE_REGION="eastus"`.
4. **`elevenlabs` (Optional Cloud Provider)**:
   - ElevenLabs multilingual neural synthesis.
   - Requires environment variable: `export ELEVENLABS_KEY="your_key"`.
5. **`local_say` (macOS Offline Fallback)**:
   - Uses native macOS `say` voice synthesis coupled with the full DSP post-processing pipeline. Runs completely offline with zero pip package dependencies.

---

## 4. Delivery Styles & Acoustic DSP (`voice/styles.json`)

The engine shapes acoustic delivery using digital signal processing:
- **`warm` (Default)**: Speed 0.88x, +3.0 dB low-shelf warmth EQ at 220 Hz, gentle high-cut at 7000 Hz, close-mic studio acoustic reverb, 260 ms sentence pauses, -19.0 LUFS loudness.
- **`calm`**: Speed 0.85x, +2.5 dB low shelf, subtle high cut, 320 ms pauses, -20.0 LUFS.
- **`empathetic`**: Speed 0.84x, +3.5 dB low shelf, gentle room presence, 350 ms pauses, -19.5 LUFS.
- **`intimate`**: Speed 0.82x, +4.0 dB low shelf, closer microphone acoustic space, 400 ms pauses, -21.0 LUFS.

---

## 5. Domain Normalization (`voice/pronunciations.json`)

The normalizer cleans and expands domain abbreviations before synthesis:
- `DILR` -> *"D I L R, Data Interpretation and Logical Reasoning"*
- `VARC` -> *"V A R C, Verbal Ability and Reading Comprehension"*
- `QA` -> *"Quantitative Ability"*
- `LC` -> *"LeetCode"*
- `dMAT` -> *"d M A T"*
- `IIM` -> *"I I M"*
- `APS` -> *"A P S"*
- `MOI` -> *"Medium of Instruction certificate"*
- `₹2,700` -> *"two thousand seven hundred rupees"*
- `5:00 PM IST` -> *"five o'clock PM Indian Standard Time"*
- Strips all Markdown formatting, emojis, and HTML elements cleanly.

---

## 6. Cloud & GPU Notebook

- `voice/colab_orpheus.ipynb`: Optional Google Colab notebook for rendering with Kokoro or Orpheus on NVIDIA T4/A100 GPUs. Marked **untested on local machine**.
- `.github/workflows/voice.yml`: Automated GitHub Actions workflow that renders the morning brief every day at 02:00 UTC (07:30 AM IST) and pushes the updated MP3 and `data/audio_manifest.json` with `[skip ci]`.
