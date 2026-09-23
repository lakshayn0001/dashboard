# Standalone Cockpit Voice Engine

A lightweight, high-fidelity, standalone text-to-speech (TTS) engine designed specifically for Lakshay Nagpal's Cockpit Dashboard.

> **Zero LLM / Grok calls**: This engine strictly transforms written dashboard text and daily plans into calibrated, warm spoken audio. It performs no generative language modeling or external chat calls.

---

## 1. Quick Start & Auditioning

The dashboard has one voice. Every English brief, including the daily plan, the page summaries, the TypeScript topic buttons, and the DSA pattern buttons, is rendered from `voice/voice_config.json`.

```bash
# One audition clip: voice/samples/velvet.mp3
python3 voice/voice_engine.py --samples

# Re-render every published clip with that same voice
python3 voice/voice_engine.py --all --force
```

The audition passage is:
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

```

---

## 3. Configuration (`voice/voice_config.json`)

Edit `voice/voice_config.json` to change default settings:

```json
{
  "provider": "edge_tts",
  "voice": "en-US-EmmaMultilingualNeural",
  "style": "velvet",
  "voice_label": "Velvet · Emma",
  "speed": 0.92,
  "pitch_hz": -7,
  "mp3_kbps": 64,
  "engine_version": "2.0.0"
}
```

Published audio does not rotate voices. `velvet` is the only style the pages request.

1. **`edge_tts` (the voice the site uses)**:
   - Microsoft Emma Multilingual, an adult female neural voice.
   - Delivery is soft and close: about 8 percent slower, pitched down 7 Hz, light warmth, almost no reverb, so it stays intelligible instead of whispered.
   - No API key. Requires `pip install edge-tts` and ffmpeg (or `imageio-ffmpeg`).
2. **`azure` and `elevenlabs`**: optional, only if you pass `--provider` and set the matching API key. They are not used by the published site.
3. **`local_say`**: macOS `say`, only when you explicitly pass `--provider local_say`. The engine will not quietly fall back to it.

---

## 4. Delivery Styles & Acoustic DSP (`voice/styles.json`)

`velvet` is the style every published file uses. The other names in `styles.json` are unused presets.

- **`velvet`**: speed 0.92, pitch −7 Hz, +1.8 dB low shelf at 170 Hz, high cut at 11 kHz, barely-there room (wet 0.03), −18 LUFS. Soft and close, still clear.

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
