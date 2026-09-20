# 🚀 Lakshay Nagpal | Engineering & Academic Roadmap Dashboard

Interactive developer portal and admissions roadmap hosted on GitHub Pages. Centralizes production full-stack engineering guides, deep TypeScript architecture curriculums, and strategic German Master of Science admission evaluations.

🔗 **Live Portal:** [https://lakshayn0001.github.io/dashboard/](https://lakshayn0001.github.io/dashboard/)

---

## 📂 Featured Portals & Documents

| Portal / Module | Description | Quick Link |
| :--- | :--- | :--- |
| ⚡ **DSA Problem Library & Tracker** | Complete in-dashboard library and dedicated tracker with 247 curated LeetCode problems (60 Easy, 158 Medium, 29 Hard) across 25 patterns, direct problem links, company priority tags (Google, Meta, Amazon), expandable mental models, and persistent LocalStorage progress tracking. | [`dsa_master_tracker.html`](dsa_master_tracker.html) / [`index.html#dsa-portal`](index.html#dsa-portal) |
| 🧠 **Engineering Learning Hub** | Scalable engineering platform featuring 6 structured tracks: Track 0: DSA Problem Library (247 Qs), Track 1: Production TypeScript (10 levels, 79 topics, 100+ drills), Track 2: Distributed System Design, Track 3: Cloud & DevOps, Track 4: Applied AI Systems, and Track 5: Database Engineering. | [`learning_hub.html`](learning_hub.html) |
| 🇩🇪 **German Universities Postgraduate Analysis** | Comprehensive roadmap evaluating public €0-tuition Master of Science programs (Summer 2027 intake), ECTS equivalence (Passau 2/3 credit rule: to be computed from MDU credit scheme), German grade benchmark (2.40 CGPA / 2.47 Marks 'Gut'; Passau rule: 2.7 or better OR top 70% of graduating cohort, to be computed), APS verification (dMAT requirement VERIFY), and EU Blue Card pathways. | [`german_universities_evaluation.html`](german_universities_evaluation.html) |
| 📅 **Official Deadlines & Master Calendar** | Centralized calendar with official verified deadlines (CAT 2026, Passau Summer 2027, APS India, IELTS, uni-assist), live countdowns, 16-day clash resolution guide, and 14-week chronological plan. | [`deadlines_calendar.html`](deadlines_calendar.html) |
| 🐯 **CAT 2026 Strategic Master Roadmap & Empirical Syllabus** | Full 3-section preparation plan (68 Qs: VARC 24, DILR 22, QA 22; source: iimcat.ac.in / VERIFY), adaptive post-mock rules, 72-day daily timetable with 14 full-length mocks, target B-school admission criteria (IITs, FMS, CAP IIMs), and official IIM facts. | [`cat_2026_syllabus_roadmap.html`](cat_2026_syllabus_roadmap.html) |
| 📘 **Production TypeScript Curriculum & Interview Mastery** | 17,600+ curriculum lines spanning 10 mastery levels, 79 core topics, 100+ practice drills, 10 production labs, type-level metaprogramming, and 125 technical interview Q&As. | [`typescript_curriculum.html`](typescript_curriculum.html) |
| 📄 **Original Full-Stack Resume** | Production software engineering resume tailored for Indian product startups & global remote tech (Next.js, TypeScript, PostgreSQL, Distributed Systems). | [`resume.html`](resume.html) · [Google Drive PDF](https://drive.google.com/file/d/1Agx-wMrLAPT3ilMJyPQiS8TGtIiT4ByT/view?usp=sharing) · [`assets/Lakshay_Nagpal_Resume_Original.pdf`](assets/Lakshay_Nagpal_Resume_Original.pdf) |
| 🇩🇪 **German Companies CV (EU Blue Card)** | European DIN A4 format CV tailored for German & DACH enterprise employers, detailing EU Blue Card (§18g AufenthG) eligibility, Anabin H+ university status, Bavarian grade equivalence (~2.4 "Gut"), and CEFR English/German proficiency. | [`Lakshay_Nagpal_CV.html`](Lakshay_Nagpal_CV.html) · [Google Drive PDF](https://drive.google.com/file/d/15GwnY6jhijyzTbYt-QVjesA7c4dnuHzE/view?usp=sharing) · [`assets/Lakshay_Nagpal_Resume_German.pdf`](assets/Lakshay_Nagpal_Resume_German.pdf) |
| 👤 **Candidate Profile & Dossier Hub** | Official academic records breakdown (8 semesters, 70.56% aggregate), dual-track cold email generator, 60+ job search portals engine, and high-res verified assets. | [`profile.html`](profile.html) |
| 💻 **Full-Stack Cloud Projects** | Production applications including Next.js 16 Real-Time Chat App (Socket.IO, K8s, Docker) and AI Data Analytics Dashboard (Gemini 1.5 API). | [GitHub Repositories](https://github.com/lakshayn0001?tab=repositories) |

## 🔔 Daily Execution Plan & Notification Engine

An automated, intelligent daily planner and notification system that synchronizes study agendas across CAT 2026, German MSc preparation, DSA problem solving, and job applications.

### ⚙️ How It Works
1. **Context Extraction:** `scripts/build_context.js` compiles verified milestones, 72-day CAT syllabus, DSA priorities, and German application tracks into `data/context.json`.
2. **Automated Generation:** A GitHub Actions cron workflow (`.github/workflows/daily-plan.yml`) runs daily at **23:00 UTC (04:30 AM IST)** or via manual dispatch:
   - Evaluates current IST date and urgent deadlines ($\le 7$ days away).
   - Generates an optimized daily schedule via xAI Grok API (`prompts/grok_system.md`) adhering strictly to the **6.0-hour daily budget**, wake/sleep constraints (06:30 – 22:30 IST), and meal windows.
   - **Deterministic Fallback:** If the API key is not present or an API failure occurs, `scripts/generate_plan.js` automatically produces a deterministic schedule directly from `data/context.json`.
   - Validates the resulting JSON against `data/daily_plan.schema.json`.
   - Saves to `data/daily_plan.json` (active) and archives to `data/history/YYYY-MM-DD.json`.
   - Commits changes to `main`, auto-updating GitHub Pages, and dispatches an optional push notification to mobile via `ntfy.sh`.
3. **Live Dashboard Experience (`index.html`):**
   - **Urgent Alerts Banner:** Highlights imminent deadlines (e.g., CAT registration closing).
   - **Real-Time Focus ("Now" & "Next"):** Live IST clock and dynamic countdown timer to block completion.
   - **Interactive Timeline:** Checkable task lists with browser `localStorage` persistence and stream badges (`cat`, `germany`, `dsa`, `job`, `health`).
   - **Browser Desktop Notifications:** 30-second interval checker alerting you at block start times.
   - **One-Click Calendar Sync (.ics):** Exports standard iCalendar file with `VALARM` 5-minute pre-event reminders for Google Calendar, Apple Calendar, or Outlook.

### 🔑 GitHub Actions Secrets Setup
To enable Grok AI generation and mobile notifications, configure these repository secrets under **Settings** > **Secrets and variables** > **Actions**:

| Secret Name | Required? | Description | Example |
| :--- | :--- | :--- | :--- |
| `XAI_API_KEY` | Optional | xAI API Key for Grok (`https://console.x.ai`). If omitted, deterministic fallback runs. | `xai-...` |
| `XAI_MODEL` | Optional | Model identifier (defaults to `grok-beta` if unset). | `grok-beta` or `grok-2` |
| `NTFY_TOPIC` | Optional | Topic name on [ntfy.sh](https://ntfy.sh) to receive push notifications on phone. | `lakshay-daily-planner-prod` |

### 💻 Manual Execution & Local Development
You can run and test the planner locally without needing any third-party libraries (zero-dependency Node.js 20+):

```bash
# 1. Regenerate context from repo HTML sources
node scripts/build_context.js

# 2. Generate daily plan for today (uses deterministic engine if XAI_API_KEY is not set)
node scripts/generate_plan.js

# 3. Generate daily plan for a specific date
node scripts/generate_plan.js 2026-09-22

# 4. (Optional) Run with Grok API locally
export XAI_API_KEY="your-xai-key"
export XAI_MODEL="grok-beta"
node scripts/generate_plan.js
```

### 🔒 Privacy & Zero-Exposure Security Note
- **Public Output:** `data/daily_plan.json` is checked into git and deployed publicly on GitHub Pages. Only professional goals, study topics, and official timeline milestones are stored.
- **Zero API Key Leakage:** Client-side JavaScript (`index.html`) never interacts with third-party LLM APIs. The dashboard only makes a single same-origin fetch to `data/daily_plan.json`. All API tokens reside strictly in GitHub Actions Secrets and run on runner environments only.

---

## 🌐 Deploying to GitHub Pages

1. Navigate to your repository on GitHub: `https://github.com/lakshayn0001/dashboard`.
2. Go to **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Branch**:
   - Select branch: `main`
   - Select folder: `/ (root)`
4. Click **Save**.
5. Your dashboard will be live at:
   👉 **`https://lakshayn0001.github.io/dashboard/`**

---

## 🛠️ Tech Stack & Architecture

- **Dashboard Suite:** HTML5, Modern Responsive Tailwind CSS, Glassmorphism, Responsive Collapsible Side Navigation Drawer, Embedded Preview Modal, Lucide SVG Icons.
- **DSA Master Tracker:** 240+ curated LeetCode problems, 25 pattern categories, direct problem URLs, expandable mental models ("Helping Approach"), and browser `localStorage` state persistence.
- **Engineering Learning Hub:** Scalable course architecture housing Production TypeScript, System Design, DevOps, Applied AI, and Database Engineering.
- **German Admissions Engine:** Tailored profile analytics, interactive category filters (Safe, Realistic, Ambitious, Private), and official university portal links.
- **Accessibility & TTS:** Web Speech Synthesis Female Voice Model narration integrated across all pages with floating media playback controls.
