#!/usr/bin/env python3
"""
Script Extractor for Dashboard Voice Engine
Extracts audio text from HTML pages and writes them to voice/scripts/<page>/<id>.txt
Also generates a normalized script inventory for the voice engine.
"""

import os
import re
import json
import html
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
VOICE_DIR = BASE_DIR / "voice"
SCRIPTS_DIR = VOICE_DIR / "scripts"

PAGES = {
    "index": BASE_DIR / "index.html",
    "cat_2026_syllabus_roadmap": BASE_DIR / "cat_2026_syllabus_roadmap.html",
    "german_universities_evaluation": BASE_DIR / "german_universities_evaluation.html",
    "typescript_curriculum": BASE_DIR / "typescript_curriculum.html",
    "dsa_master_tracker": BASE_DIR / "dsa_master_tracker.html",
    "learning_hub": BASE_DIR / "learning_hub.html",
}

def slugify(text: str) -> str:
    """Convert title to clean lowercase slug."""
    text = text.lower()
    text = re.sub(r'[\'\"&]', '', text)
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

def extract_scripts_from_html(file_path: Path):
    """
    Extracts all playAudioSummary calls from an HTML file.
    Returns list of dicts: {title, text, slug}
    """
    if not file_path.exists():
        return []
    
    content = file_path.read_text(encoding="utf-8")
    items = []
    
    # Pattern for onclick="playAudioSummary(..., 'Title', 'Text'[, 'optId'])"
    # Handles escaped quotes and multiline attributes
    pattern = re.compile(
        r"playAudioSummary\s*\(\s*(?:this|null|btn)\s*,\s*(['\"])(.*?)\1\s*,\s*(['\"])(.*?)\3(?:\s*,\s*(['\"])(.*?)\5)?\s*\)",
        re.DOTALL
    )
    
    for match in pattern.finditer(content):
        raw_title = match.group(2).strip()
        raw_text = match.group(4).strip()
        opt_id = match.group(6).strip() if match.group(6) else None
        
        # Clean escaped quotes (\', \")
        cleaned_text = raw_text.replace(r"\'", "'").replace(r'\"', '"')
        cleaned_title = raw_title.replace(r"\'", "'").replace(r'\"', '"')
        
        # Clean double backslashes
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
        cleaned_title = re.sub(r'\s+', ' ', cleaned_title).strip()
        
        slug = opt_id if opt_id else slugify(cleaned_title)
        items.append({
            "title": cleaned_title,
            "text": cleaned_text,
            "id": slug
        })
    
    return items

def _strip_html(fragment: str) -> str:
    text = re.sub(r"<[^>]+>", " ", fragment or "")
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def extract_typescript_topics(html_text: str):
    """Build the same short brief playTopicAudio speaks, one file per topic."""
    items = []
    parts = re.split(r'<article class="topic-card"', html_text)
    for part in parts[1:]:
        id_match = re.search(r'id="topic-([^"]+)"', part)
        if not id_match:
            continue
        topic_id = id_match.group(1)
        title_match = re.search(r"<h3>(.*?)</h3>", part, re.S)
        title = _strip_html(title_match.group(1)) if title_match else f"Topic {topic_id}"
        caption_match = re.search(r'<div class="code-caption">(.*?)</div>', part, re.S)
        caption = _strip_html(caption_match.group(1)) if caption_match else ""

        understand = why = mistakes = ""
        for block in re.findall(r'<div class="topic-info-block">(.*?)</div>', part, re.S):
            heading_match = re.search(r"<h4>(.*?)</h4>", block, re.S)
            heading = _strip_html(heading_match.group(1)) if heading_match else ""
            bullets = [_strip_html(li) for li in re.findall(r"<li>(.*?)</li>", block, re.S)]
            bullets = [b for b in bullets if b]
            if "Understand" in heading and bullets:
                understand = ". ".join(bullets[:2]) + "."
            elif "Important" in heading and bullets:
                why = ". ".join(bullets[:2]) + "."
            elif "Mistakes" in heading and bullets:
                mistakes = ". ".join(bullets[:2]) + "."

        drill_match = re.search(r'<div class="topic-drill-expl">(.*?)</div>', part, re.S)
        drill = _strip_html(drill_match.group(1)) if drill_match else ""
        drill = re.sub(r"^Explanation:\s*", "", drill)

        script = f"Audio briefing for {title}. "
        if caption:
            script += f"Core concept: {caption} "
        if understand:
            script += f"Key principles: {understand} "
        if why:
            script += f"Why this matters in production: {why} "
        if mistakes:
            script += f"Common pitfall to avoid: {mistakes} "
        if drill:
            script += f"Practical takeaway: {drill}."
        script = re.sub(r"\s+", " ", script).strip()
        script = re.sub(r"\.{2,}", ".", script)

        items.append({
            "id": "topic_" + topic_id.replace(".", "_"),
            "title": title,
            "text": script,
        })
    return items


def extract_dsa_topic_briefs():
    """Match the text listenTopicBrief speaks for each pattern."""
    data_path = BASE_DIR / "dsa_problems_data.js"
    if not data_path.exists():
        return []
    raw = data_path.read_text(encoding="utf-8").split("DSA_PROBLEMS_LIST")[0]
    chunks = re.split(r'\n\s*\{\s*\n\s*"topic":\s*"', raw)
    items = []
    for chunk in chunks[1:]:
        topic_match = re.match(r'([^"]+)"\s*,\s*"description":\s*"([^"]*)"', chunk)
        if not topic_match:
            continue
        topic, description = topic_match.group(1), topic_match.group(2).rstrip(".")
        problem_count = len(re.findall(r'"(?:Easy|Medium|Hard)"', chunk))
        text = (
            f"Overview of {topic}. {description}. "
            f"Contains {problem_count} high-yield problems. "
            "Focus on mastering the key patterns and edge cases."
        )
        title = f"{topic} Brief"
        items.append({
            "id": slugify(title),
            "title": title,
            "text": text,
        })
    return items


def _write_extracted(page_key: str, items: list, all_extracted: dict) -> None:
    page_dir = SCRIPTS_DIR / page_key
    page_dir.mkdir(parents=True, exist_ok=True)
    seen = {item["id"] for item in all_extracted.get(page_key, [])}
    for item in items:
        item_id = item["id"]
        if item_id in seen:
            continue
        seen.add(item_id)
        (page_dir / f"{item_id}.txt").write_text(item["text"], encoding="utf-8")
        all_extracted.setdefault(page_key, []).append({
            "id": item_id,
            "title": item["title"],
            "text": item["text"],
            "file": f"{page_key}/{item_id}.txt",
        })


def extract_all():
    """Extract all scripts from the 4 targeted pages."""
    os.makedirs(SCRIPTS_DIR, exist_ok=True)
    all_extracted = {}
    
    # 1. Index page
    index_dir = SCRIPTS_DIR / "index"
    index_dir.mkdir(parents=True, exist_ok=True)
    
    # Master Todos text from index.html
    index_html = PAGES["index"].read_text(encoding="utf-8")
    m_todos = re.search(r'function playMasterTodosAudioBrief.*?const text = "(.*?)";', index_html, re.DOTALL)
    if m_todos:
        todos_text = m_todos.group(1).replace(r"\'", "'").replace(r'\"', '"').strip()
        (index_dir / "master_todos.txt").write_text(todos_text, encoding="utf-8")
        all_extracted.setdefault("index", []).append({
            "id": "master_todos",
            "title": "Master To-Dos Briefing",
            "text": todos_text,
            "file": "index/master_todos.txt"
        })
    
    # Daily brief from script_builder
    try:
        import sys
        sys.path.insert(0, str(VOICE_DIR))
        from script_builder import build_daily_voice_script
        daily_script, _ = build_daily_voice_script()
        (index_dir / "daily_brief.txt").write_text(daily_script, encoding="utf-8")
        all_extracted.setdefault("index", []).append({
            "id": "daily_brief",
            "title": "Daily Cockpit Briefing",
            "text": daily_script,
            "file": "index/daily_brief.txt"
        })
    except Exception as e:
        print(f"Warning: Could not generate daily brief script: {e}")
    
    # 2. Other pages
    for page_key in ["cat_2026_syllabus_roadmap", "german_universities_evaluation", "typescript_curriculum", "dsa_master_tracker", "learning_hub"]:
        page_file = PAGES[page_key]
        page_dir = SCRIPTS_DIR / page_key
        page_dir.mkdir(parents=True, exist_ok=True)
        
        items = extract_scripts_from_html(page_file)
        seen_ids = set()
        
        for item in items:
            item_id = item["id"]
            # Deduplicate id if needed
            if item_id in seen_ids:
                counter = 2
                while f"{item_id}_{counter}" in seen_ids:
                    counter += 1
                item_id = f"{item_id}_{counter}"
            seen_ids.add(item_id)
            
            script_file = page_dir / f"{item_id}.txt"
            script_file.write_text(item["text"], encoding="utf-8")
            
            all_extracted.setdefault(page_key, []).append({
                "id": item_id,
                "title": item["title"],
                "text": item["text"],
                "file": f"{page_key}/{item_id}.txt"
            })

    ts_html = PAGES["typescript_curriculum"].read_text(encoding="utf-8")
    _write_extracted("typescript_curriculum", extract_typescript_topics(ts_html), all_extracted)
    _write_extracted("dsa_master_tracker", extract_dsa_topic_briefs(), all_extracted)

    print(f"Extracted scripts across {len(all_extracted)} pages:")
    for page, items in all_extracted.items():
        print(f"  {page}: {len(items)} scripts")
        for it in items:
            print(f"    - [{it['id']}] {it['title']} ({len(it['text'].split())} words)")
            
    return all_extracted

if __name__ == "__main__":
    extract_all()
