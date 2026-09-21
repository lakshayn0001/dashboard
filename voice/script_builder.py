#!/usr/bin/env python3
"""
voice/script_builder.py

Daily Voice Script Builder for Lakshay Nagpal's Standalone Voice Engine.
Reads data/daily_plan.json and constructs an ~80-word grounded morning briefing.
Includes a curated bank of 40 encouragement lines organized by day type.
Addresses Lakshay warmly, highlights 2-3 key tasks, and makes zero false promises.
"""

import json
import hashlib
from pathlib import Path
from typing import Dict, Any, Tuple

# Curated bank of exactly 40 grounded encouragement lines
ENCOURAGEMENT_BANK: Dict[str, list] = {
    "normal": [
        "You have already done the hardest part by showing up today.",
        "Take each problem one step at a time; steady consistency is what counts.",
        "Focus on genuine clarity rather than rushing through the clock.",
        "One thoughtful passage and one solid problem builds real momentum.",
        "Give this block your honest attention, and then let it rest.",
        "Trust the quiet routine you are building day after day.",
        "Patience with fundamentals is the highest form of discipline.",
        "Small, disciplined efforts accumulate into lasting mastery.",
        "Keep your focus right here on today's page, nowhere else.",
        "Every focused minute today strengthens your foundation."
    ],
    "mock": [
        "Treat this mock as an honest diagnostic, not a judgment.",
        "Stay calm when a question feels unfamiliar; breathe and move forward.",
        "The real value of today comes from your error analysis afterward.",
        "Manage your sectional clock with composure; skip cleanly when needed.",
        "Remember the twelve-minute rule: preserve your clarity for solvable sets.",
        "Look at every mistake today as a gift that saves marks later.",
        "Keep your head cool through all three sections.",
        "Approach each section with a fresh mind and zero baggage."
    ],
    "taper": [
        "The heavy lifting is behind you; now we protect your energy and composure.",
        "Review your error logs calmly and trust what you have already learned.",
        "Prioritize rest, clean sleep, and steady confidence.",
        "No panic, no cramming; simply stay centered and sharp.",
        "Consolidate your formula notes and keep your mind uncluttered.",
        "Protect your peace of mind as the final days approach."
    ],
    "exam": [
        "Take one slow, deep breath. Today you simply execute what you practiced.",
        "Read each question with calm eyes and pick your battles wisely.",
        "You have prepared with honesty; trust your instincts in the exam hall.",
        "Forty minutes per box, one question at a time. You are ready.",
        "Stay grounded in your breath through every single section.",
        "Whatever comes, maintain your calm and do your best work."
    ],
    "missed": [
        "A pause in the routine is completely normal; you are back now.",
        "Do not worry about catching up on everything at once; start right here.",
        "Today is a clean slate. One focused hour resets your rhythm.",
        "Be kind to yourself and take the first step forward.",
        "Consistency is not about perfection, but about returning without hesitation."
    ],
    "post_cat": [
        "You saw CAT through to the finish; take pride in your endurance.",
        "Now we shift focus smoothly toward your next engineering milestones.",
        "Channel your discipline into German applications and software interviews.",
        "Keep your algorithmic skills fresh with two daily problems.",
        "The road ahead is full of opportunity; keep moving with purpose."
    ]
}


def detect_day_type(plan_data: Dict[str, Any]) -> str:
    """Detects the day type from plan date, summary, and block contents."""
    date_str = plan_data.get("date", "")
    summary = plan_data.get("summary", "").lower()

    if date_str == "2026-11-29" or "exam day" in summary or "d-day" in summary:
        return "exam"

    if date_str > "2026-11-29":
        return "post_cat"

    if "2026-11-20" <= date_str <= "2026-11-28" or "taper" in summary or "final revision" in summary:
        return "taper"

    if "mock" in summary or "diagnostic" in summary or "simcat" in summary or "aimcat" in summary:
        return "mock"

    if plan_data.get("missed_day", False) or "returning after" in summary:
        return "missed"

    return "normal"


def select_encouragement(day_type: str, date_str: str) -> str:
    """Deterministically picks an encouragement line using date hash."""
    lines = ENCOURAGEMENT_BANK.get(day_type, ENCOURAGEMENT_BANK["normal"])
    # Seed by date string for deterministic daily selection
    seed_val = int(hashlib.md5(date_str.encode("utf-8")).hexdigest(), 16)
    idx = seed_val % len(lines)
    return lines[idx]


def extract_core_tasks(plan_data: Dict[str, Any]) -> list:
    """Extracts 2-3 concise, grounded task summaries from daily plan blocks."""
    blocks = plan_data.get("blocks", [])
    tasks = []

    for b in blocks:
        stream = b.get("stream", "")
        title = b.get("title", "")
        details = b.get("details", "")

        if stream == "dsa" and "dsa" not in " ".join(tasks).lower():
            tasks.append("two LeetCode problems in your algorithmic slot")
        elif stream == "job" and "application" not in " ".join(tasks).lower():
            if "batch" in title.lower() or "application" in title.lower():
                tasks.append("your morning batch of job applications")
            else:
                tasks.append("recruiter triage and application outreach")
        elif stream == "cat" and len(tasks) < 3:
            if "mock" in title.lower() or "diagnostic" in title.lower():
                tasks.append("your timed diagnostic mock and error post-mortem")
            elif "varc" in title.lower() or "reading" in details.lower():
                tasks.append("Reading Comprehension passages and verbal drills")
            elif "quant" in title.lower() or "arithmetic" in title.lower() or "percentages" in details.lower():
                tasks.append("Arithmetic percentage concepts and problem practice")
            elif "dilr" in title.lower() or "arrangement" in details.lower():
                tasks.append("linear arrangement sets in Logical Reasoning")
        elif stream == "germany" and len(tasks) < 3:
            tasks.append("your German university prerequisite audits")

        if len(tasks) >= 3:
            break

    # Fallback if blocks were sparse
    if not tasks:
        tasks = ["your morning DSA problems", "job applications", "your structured CAT focus slot"]

    return tasks


def build_daily_voice_script(plan_path: Path = None) -> Tuple[str, Dict[str, Any]]:
    """
    Builds an ~80-word voice script from data/daily_plan.json.
    Returns (script_text, metadata).
    """
    if plan_path is None:
        plan_path = Path(__file__).resolve().parent.parent / "data" / "daily_plan.json"

    if not plan_path.exists():
        # Fallback text if plan doesn't exist
        fallback_script = (
            "Good morning, Lakshay. Take one slow breath. Today is a steady day. "
            "First, two LeetCode problems, then your morning job applications. "
            "After that, we focus on your core syllabus topics and error journaling. "
            "If something feels challenging, that is completely normal. "
            "You have already done the hardest part by showing up today. "
            "I am glad you are here."
        )
        return fallback_script, {"word_count": len(fallback_script.split()), "day_type": "normal"}

    with open(plan_path, "r", encoding="utf-8") as fh:
        plan_data = json.load(fh)

    date_str = plan_data.get("date", "Today")
    day_type = detect_day_type(plan_data)
    tasks = extract_core_tasks(plan_data)
    encouragement = select_encouragement(day_type, date_str)

    # Format tasks into warm, natural prose (~75-85 words total)
    if len(tasks) == 1:
        task_str = f"First, we will focus on {tasks[0]}. Take your time with the steps and review your error notes afterward."
    elif len(tasks) == 2:
        task_str = f"First, we will tackle {tasks[0]}, followed by {tasks[1]}. After that, we will consolidate your notes."
    else:
        task_str = (
            f"First, we will tackle {tasks[0]}, followed by {tasks[1]}. "
            f"Later today, our focus turns to {tasks[2]}, working one step at a time."
        )

    # Build script (~75-85 words)
    script_parts = [
        "Good morning, Lakshay. Take one slow, gentle breath.",
        "Today is a steady, purposeful day, and I am right here with you.",
        task_str,
        "If something feels challenging, that is completely normal.",
        encouragement,
        "You have already done the hardest part just by showing up today. I am so glad you are here."
    ]

    script = " ".join(script_parts)
    words = script.split()
    word_count = len(words)

    meta = {
        "date": date_str,
        "day_type": day_type,
        "word_count": word_count,
        "tasks_count": len(tasks),
        "encouragement": encouragement
    }

    return script, meta


if __name__ == "__main__":
    script, meta = build_daily_voice_script()
    print("=== DAILY VOICE SCRIPT ===")
    print(script)
    print("\nMetadata:", meta)
