#!/usr/bin/env python3
"""Generate one spoken clip without changing the dashboard voice.

This does not copy another recording, and it does not rewrite
voice_config.json or the live audio files. It writes a new mp3 only.

Examples:
  python3 voice/generate.py --list
  python3 voice/generate.py --list --female
  python3 voice/generate.py --voice en-NZ-MollyNeural --text "Hello."
  python3 voice/generate.py --voice en-IE-EmilyNeural --file notes.txt --speed 0.92 --pitch -1
"""

import argparse
import asyncio
import sys
from pathlib import Path

VOICE_DIR = Path(__file__).resolve().parent
if str(VOICE_DIR) not in sys.path:
    sys.path.insert(0, str(VOICE_DIR))

from voice_engine import VoiceEngine  # noqa: E402


def list_voices(female_only: bool, locale_prefix: str) -> None:
    import edge_tts

    async def load():
        return await edge_tts.list_voices()

    voices = asyncio.run(load())
    rows = []
    for voice in voices:
        name = voice["ShortName"]
        if locale_prefix and not name.startswith(locale_prefix):
            continue
        if female_only and voice.get("Gender") != "Female":
            continue
        rows.append((name, voice.get("Gender", ""), voice.get("Locale", "")))
    rows.sort()
    for name, gender, locale in rows:
        print(f"{name:42} {gender:8} {locale}")
    print(f"\n{len(rows)} voices")


def generate(args: argparse.Namespace) -> Path:
    if args.file:
        text = Path(args.file).read_text(encoding="utf-8").strip()
    else:
        text = (args.text or "").strip()
    if not text:
        raise SystemExit("Pass --text or --file. There is nothing to speak.")

    engine = VoiceEngine()
    style = dict(engine.styles.get(args.style, engine.styles["velvet"]))
    style["speed"] = args.speed
    style["pitch_hz"] = args.pitch
    style["pitch_contour_hz"] = [0, -1, 0]
    style["volume"] = args.volume
    style["pause_sentence_ms"] = args.pause
    engine.styles["preview"] = style

    out = Path(args.out).expanduser()
    if not out.is_absolute():
        out = Path.cwd() / out
    out.parent.mkdir(parents=True, exist_ok=True)
    engine.render_script(
        raw_text=text,
        output_mp3_path=out,
        voice=args.voice,
        style="preview",
        title="Preview",
        force=True,
    )
    return out


def main() -> None:
    parser = argparse.ArgumentParser(description="Speak one text into an mp3. Does not change the dashboard.")
    parser.add_argument("--list", action="store_true", help="Print available Edge voices and exit")
    parser.add_argument("--female", action="store_true", help="With --list, show female voices only")
    parser.add_argument("--locale", default="en-", help="With --list, keep voices whose name starts with this")
    parser.add_argument("--voice", help="Edge voice id, for example en-NZ-MollyNeural")
    parser.add_argument("--text", help="Words to speak")
    parser.add_argument("--file", help="Text file to speak")
    parser.add_argument("--speed", type=float, default=0.92, help="1.0 is normal. 0.92 is a little slow")
    parser.add_argument("--pitch", type=int, default=0, help="Pitch shift in Hz. Keep this near 0")
    parser.add_argument("--volume", default="-3%", help="Edge volume, for example -3%%")
    parser.add_argument("--pause", type=int, default=160, help="Milliseconds of rest after a sentence")
    parser.add_argument("--style", default="velvet", help="Start from this style, then apply the flags above")
    parser.add_argument("--out", default=str(Path.home() / "Desktop" / "voice_generated.mp3"), help="Output mp3 path")
    args = parser.parse_args()

    if args.list:
        list_voices(args.female, args.locale)
        return
    if not args.voice:
        raise SystemExit("Pass --voice, or run --list to see the choices.")
    path = generate(args)
    print(path)


if __name__ == "__main__":
    main()
