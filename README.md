# 🚀 Lakshay Nagpal | Engineering, Admissions & Daily Execution Dashboard

> **Production Developer Portal, Strategic Masters Admissions Hub & Automated Grok Daily Planner**  
> Hosted on GitHub Pages: [https://lakshayn0001.github.io/dashboard/](https://lakshayn0001.github.io/dashboard/)

---

## 📑 Table of Contents
1. [Overview & Architecture](#-overview--architecture)
2. [Complete Dashboard Features & Portals](#-complete-dashboard-features--portals)
   - [1. Daily Execution Plan & Notification Engine](#1-daily-execution-plan--notification-engine-indexhtml)
   - [2. DSA Problem Library & Tracker](#2-dsa-problem-library--tracker-dsa_master_trackerhtml)
   - [3. Engineering Learning Hub](#3-engineering-learning-hub-learning_hubhtml)
   - [4. German Universities Postgraduate Analysis](#4-german-universities-postgraduate-analysis-german_universities_evaluationhtml)
   - [5. Official Deadlines & Master Calendar](#5-official-deadlines--master-calendar-deadlines_calendarhtml)
   - [6. CAT 2026 Strategic Master Roadmap](#6-cat-2026-strategic-master-roadmap-cat_2026_syllabus_roadmaphtml)
   - [7. Production TypeScript Curriculum](#7-production-typescript-curriculum-typescript_curriculumhtml)
   - [8. Dual Resume & CV System](#8-dual-resume--cv-system)
   - [9. Candidate Profile & Dossier Hub](#9-candidate-profile--dossier-hub-profilehtml)
3. [🔔 Grok Bot & Daily Notification Setup Guide](#-grok-bot--daily-notification-setup-guide)
   - [How the Engine Works](#how-the-engine-works)
   - [Step 1: Get xAI Grok API Key](#step-1-get-xai-grok-api-key)
   - [Step 2: Configure GitHub Repository Secrets](#step-2-configure-github-repository-secrets)
   - [Step 3: Setup Mobile Push Notifications (ntfy.sh)](#step-3-setup-mobile-push-notifications-ntfysh)
   - [Step 4: Enable Browser Desktop Notifications](#step-4-enable-browser-desktop-notifications)
   - [Step 5: Calendar Sync (.ics) with Reminders](#step-5-calendar-sync-ics-with-reminders)
   - [Manual & Local CLI Execution](#manual--local-cli-execution)
   - [Deterministic Fallback Engine](#deterministic-fallback-engine)
4. [🔒 Security, Zero Exposure & Privacy Policies](#-security-zero-exposure--privacy-policies)
5. [🌐 GitHub Pages Deployment Guide](#-github-pages-deployment-guide)

---

## 🏛️ Overview & Architecture

This repository powers a high-performance, single-origin developer dashboard built with semantic HTML5, modern Tailwind CSS, and glassmorphism styling. It integrates static portfolio showcases with dynamic, automated daily scheduling powered by **xAI Grok** and GitHub Actions.

```mermaid
flowchart TD
    subgraph Offline / Build Context
        A1["deadlines_calendar.html"] --> B["scripts/build_context.js"]
        A2["cat_2026_syllabus_roadmap.html"] --> B
        A3["dsa_master_tracker.html"] --> B
        B --> C["data/context.json"]
    end

    subgraph GitHub Actions Cron (23:00 UTC / 04:30 AM IST)
        C --> D["scripts/generate_plan.js"]
        P["prompts/grok_system.md"] --> D
        SEC["GitHub Secrets (XAI_API_KEY)"] -.-> D
        D -->|Primary: xAI API| E["data/daily_plan.json"]
        D -->|Fallback: Deterministic Engine| E
        E --> F["data/history/YYYY-MM-DD.json"]
        E -->|Optional Webhook| N["ntfy.sh Mobile Push Notification"]
    end

    subgraph Client-Side GitHub Pages (index.html)
        E -->|Same-Origin Fetch| G["Live Dashboard UI"]
        G --> H1["Urgent Deadlines Banner"]
        G --> H2["Real-Time Clock & Countdown"]
        G --> H3["Now & Next Focus Cards"]
        G --> H4["Checkable Timeline (localStorage)"]
        G --> H5["Browser Desktop Notifications (Audio)"]
        G --> H6[".ics iCalendar Export (VALARM)"]
    end
```

---

## 📂 Complete Dashboard Features & Portals

### 1. Daily Execution Plan & Notification Engine (`index.html`)
- **Location:** Direct section on top of `index.html` (`#section-daily-plan`).
- **Real-Time Live Focus:** Shows current IST clock and live minute-by-minute countdown to the end of the current active block or beginning of the next block.
- **"Now" and "Next" Status Cards:** Instant snapshot of what to study/execute right now and what is coming up next.
- **Urgent Deadlines Ticker:** Displays actionable alerts for milestones within 7 days (e.g., CAT registration closing).
- **Interactive Checklists:** Check off completed tasks directly on the dashboard with persistence saved in browser `localStorage`.
- **Stream Duration Breakdown:** Visual badge pills displaying exact minutes dedicated to each stream (`CAT 2026`, `German Prep`, `DSA`, `Job Outreach`, `Health`).
- **Stale Plan Warning:** Automatically detects and alerts if the loaded plan is outdated.

### 2. DSA Problem Library & Tracker (`dsa_master_tracker.html`)
- **Direct Link:** [`dsa_master_tracker.html`](dsa_master_tracker.html)
- **Library Scope:** 247 curated LeetCode problems (60 Easy, 158 Medium, 29 Hard) organized into 25 algorithmic patterns.
- **Pattern Categories:** Sliding Window, Two Pointers, Fast & Slow Pointers, Merge Intervals, Cyclic Sort, In-place Reversal of LinkedList, Tree BFS/DFS, Two Heaps, Subsets, Modified Binary Search, Bitwise XOR, Top 'K' Elements, K-way Merge, 0/1 Knapsack, Topological Sort, Dynamic Programming, Graphs, Trie, Union Find, Monotonic Stack.
- **Features:** Direct LeetCode problem links, company priority tags (Google, Meta, Amazon, Microsoft), expandable mental models ("Helping Approach / Intuition"), search & pattern filters, and persistent `localStorage` progress tracking.

### 3. Engineering Learning Hub (`learning_hub.html`)
- **Direct Link:** [`learning_hub.html`](learning_hub.html)
- **Structured Learning Tracks:**
  - **Track 0: DSA Mastery** (247 curated LeetCode problems).
  - **Track 1: Production TypeScript** (10 levels, 79 topics, 100+ drills, type-level metaprogramming).
  - **Track 2: Distributed System Design** (Rate limiting, caching, consistency models, CDC, Kafka, event-driven architectures).
  - **Track 3: Cloud & DevOps** (Docker containerization, Kubernetes orchestration, CI/CD pipelines, AWS/GCP infrastructure).
  - **Track 4: Applied AI Systems** (LLM orchestrations, RAG pipelines, vector databases, prompt engineering).
  - **Track 5: Database Engineering** (PostgreSQL internals, indexing strategies, query execution plans, ACID isolation levels).

### 4. German Universities Postgraduate Analysis (`german_universities_evaluation.html`)
- **Direct Link:** [`german_universities_evaluation.html`](german_universities_evaluation.html)
- **Strategic Evaluation:** Public €0-tuition German Master of Science programs for Summer 2027 / Winter 2027/28 intakes.
- **Academic Benchmark:** Bavarian grade formula calculation (70.56% aggregate $\rightarrow$ ~2.4 "Gut").
- **ECTS Credit Mapping:** Passau 2/3 credit rule analysis mapped against Maharshi Dayanand University (MDU Rohtak) curriculum.
- **Verification Milestones:** Anabin H+ university verification, APS India certificate procedures, dMAT requirement checks, and EU Blue Card (§18g AufenthG) pathways.

### 5. Official Deadlines & Master Calendar (`deadlines_calendar.html`)
- **Direct Link:** [`deadlines_calendar.html`](deadlines_calendar.html)
- **Centralized Tracker:** Official verified milestones for CAT 2026, Passau Summer 2027 / Winter 2027/28, APS India, IELTS, and uni-assist.
- **Routine Boundaries:** Explicit wake window (06:30 IST), sleep window (22:30 IST), meal times (Breakfast, Lunch, Tea, Dinner), and strict **6.0-hour daily study/work budget**.
- **16-Day Clash Resolution:** Detailed plan resolving simultaneous preparation between CAT mocks and German APS document deadlines.

### 6. CAT 2026 Strategic Master Roadmap (`cat_2026_syllabus_roadmap.html`)
- **Direct Link:** [`cat_2026_syllabus_roadmap.html`](cat_2026_syllabus_roadmap.html)
- **Syllabus Breakdown:** Comprehensive 3-section preparation plan (68 Questions: VARC 24, DILR 22, QA 22).
- **72-Day Daily Agenda:** Day-by-day timetable from September 19 to November 29, 2026.
- **Mock Schedule:** 14 full-length mocks with diagnostic review rules, percentile benchmarking, and top Indian B-school eligibility criteria.

### 7. Production TypeScript Curriculum (`typescript_curriculum.html`)
- **Direct Link:** [`typescript_curriculum.html`](typescript_curriculum.html)
- **Depth:** 17,600+ lines of curriculum covering 10 mastery levels.
- **Curriculum:** Generics, conditional types, template literal types, mapped types, AST manipulation, compiler API, and 125 technical interview questions with deep answers.

### 8. Dual Resume & CV System
- **Original Full-Stack Resume:**
  - Designed for Indian high-growth tech startups and global remote engineering roles.
  - Interactive Web Version: [`resume.html`](resume.html)
  - Google Drive PDF: [View & Download Original Resume](https://drive.google.com/file/d/1Agx-wMrLAPT3ilMJyPQiS8TGtIiT4ByT/view?usp=sharing)
- **German Companies CV (EU Blue Card):**
  - European DIN A4 standard format tailored for German & DACH enterprise employers.
  - Details Anabin H+ recognition, Bavarian grade equivalence (~2.4 "Gut"), and EU Blue Card eligibility.
  - Interactive Web Version: [`Lakshay_Nagpal_CV.html`](Lakshay_Nagpal_CV.html)
  - Google Drive PDF: [View & Download German Resume](https://drive.google.com/file/d/15GwnY6jhijyzTbYt-QVjesA7c4dnuHzE/view?usp=sharing)

### 9. Candidate Profile & Dossier Hub (`profile.html`)
- **Direct Link:** [`profile.html`](profile.html)
- **Academic Dossier:** Complete verified breakdown of 8 B.Tech semesters (3810 / 5400 marks, 70.56% aggregate, First Division).
- **Job Search Engine:** Links to 60+ global job search portals and an interactive cold email template generator.

---

## 🔔 Grok Bot & Daily Notification Setup Guide

The daily notification engine uses **xAI Grok** to analyze upcoming deadlines, current syllabus missions, and routine constraints, dynamically generating a realistic daily schedule that never exceeds the 6.0-hour budget.

### How the Engine Works
1. Every night at **23:00 UTC (04:30 AM IST)**, GitHub Actions triggers `.github/workflows/daily-plan.yml`.
2. The workflow runs `node scripts/generate_plan.js`.
3. If `XAI_API_KEY` is present, it prompts xAI's Grok API with `prompts/grok_system.md` and `data/context.json`.
4. If `XAI_API_KEY` is absent or the API fails, it automatically runs the **Deterministic Fallback Engine**, generating a structured schedule from `data/context.json`.
5. The resulting plan is validated against `data/daily_plan.schema.json`.
6. The active plan is saved to `data/daily_plan.json` and archived to `data/history/YYYY-MM-DD.json`.
7. Git automatically commits and pushes the new plan, refreshing your live GitHub Pages dashboard.
8. If configured, a mobile push notification is dispatched to your phone via `ntfy.sh`.

---

### Step 1: Get xAI Grok API Key
1. Visit the xAI Console: [https://console.x.ai/](https://console.x.ai/)
2. Sign in and create an API Key.
3. Copy your key (starts with `xai-...`).

---

### Step 2: Configure GitHub Repository Secrets
1. Navigate to your GitHub repository: `https://github.com/lakshayn0001/dashboard`.
2. Click on **Settings** (top navigation tab).
3. In the left sidebar, click **Secrets and variables** $\rightarrow$ **Actions**.
4. Click the green button **New repository secret**.
5. Add the following secrets:

| Secret Name | Value | Purpose |
| :--- | :--- | :--- |
| `XAI_API_KEY` | `xai-your-api-key-here` | Authorizes calls to the Grok API. *(If omitted, deterministic fallback runs)* |
| `XAI_MODEL` | `grok-beta` | *(Optional)* Model identifier (defaults to `grok-beta` or `grok-2`). |
| `NTFY_TOPIC` | `lakshay-planner-alert-91` | *(Optional)* Private channel name for phone notifications. |

---

### Step 3: Setup Mobile Push Notifications (ntfy.sh)
Receive instant alerts on your phone every morning when the daily plan is generated:

1. **Install the App:**
   - **Android:** Install [ntfy from Google Play](https://play.google.com/store/apps/details?id=io.heckel.ntfy) or F-Droid.
   - **iOS:** Install [ntfy from the App Store](https://apps.apple.com/app/ntfy/id1625396347).
2. **Subscribe to a Private Topic:**
   - Open the app and click **+** (Subscribe to topic).
   - Enter a unique, hard-to-guess topic name, for example: `lakshay-plan-2026-secure`.
3. **Save in GitHub Secrets:**
   - Set the `NTFY_TOPIC` secret in GitHub to the exact topic name you chose (`lakshay-plan-2026-secure`).
4. **Test Delivery:**
   - Go to GitHub Actions $\rightarrow$ **Daily Plan Generator** $\rightarrow$ Click **Run workflow**.
   - Your phone will receive a high-priority push notification containing the day's focus blocks and urgent alerts.

---

### Step 4: Enable Browser Desktop Notifications
On your live dashboard (`https://lakshayn0001.github.io/dashboard/`):
1. Locate the **Today's Execution Plan** section at the top.
2. Click the **"Enable Browser Alerts"** button.
3. When prompted by your browser, click **Allow**.
4. The dashboard runs a background timer checking every 30 seconds. Exactly when a scheduled block starts (e.g. at 06:30 IST for CAT VARC), a native desktop notification with audio chime will appear.

---

### Step 5: Calendar Sync (.ics) with Reminders
Import your daily schedule directly into Google Calendar, Apple Calendar, or Outlook:
1. In the **Today's Execution Plan** card header, click **"Export .ics"**.
2. An iCalendar (`.ics`) file for today's schedule is generated instantly.
3. Each block includes a pre-configured **`VALARM` reminder that notifies you 5 minutes before the session starts**.
4. Open the downloaded file to add it directly to your primary calendar app.

---

### Manual & Local CLI Execution
You can test, generate, or preview plans locally without any external dependencies:

```bash
# 1. Regenerate context from HTML repository sources
node scripts/build_context.js

# 2. Generate daily plan for today (uses deterministic engine if no API key is present)
node scripts/generate_plan.js

# 3. Generate daily plan for a specific date (e.g., CAT Registration closing day)
node scripts/generate_plan.js 2026-09-22

# 4. Run locally with xAI Grok API
export XAI_API_KEY="xai-..."
export XAI_MODEL="grok-beta"
node scripts/generate_plan.js
```

---

### Deterministic Fallback Engine
If you don't have an xAI API key or if the xAI service is temporarily unreachable, **you don't need to do anything**. The system will automatically:
- Read today's mission from `data/context.json` (keyed across all 72 CAT dates).
- Check any milestones $\le 7$ days away and generate urgent alerts.
- Construct a balanced 5-block schedule (CAT VARC, CAT Quant/DILR, German Prep / MDU Outreach, DSA drills, Job applications) totaling exactly 360 minutes (6.0 hours).
- Pass strict validation against `data/daily_plan.schema.json`.

---

## 🔒 Security, Zero Exposure & Privacy Policies

- **Zero Client-Side Keys:** `index.html` NEVER contains or calls any API keys. It only performs a same-origin fetch to `data/daily_plan.json`.
- **Public Data Safety:** Only professional milestones, syllabus topics, and academic study plans are stored in `data/daily_plan.json`.
- **Sandbox Isolation:** All LLM queries run strictly within isolated GitHub Actions runners or offline development environments.

---

## 🌐 GitHub Pages Deployment Guide

1. Navigate to: `https://github.com/lakshayn0001/dashboard`
2. Go to **Settings** $\rightarrow$ **Pages** (in the left sidebar).
3. Under **Build and deployment** $\rightarrow$ **Branch**:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**.
5. Your dashboard is live at:
   👉 **[https://lakshayn0001.github.io/dashboard/](https://lakshayn0001.github.io/dashboard/)**
