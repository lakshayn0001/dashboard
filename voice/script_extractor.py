#!/usr/bin/env python3
"""
Script Extractor for Dashboard Voice Engine
Extracts audio text from HTML pages and writes them to voice/scripts/<page>/<id>.txt
Also generates a normalized script inventory for the voice engine.
"""

import os
import re
import json
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
            
    print(f"Extracted scripts across {len(all_extracted)} pages:")
    for page, items in all_extracted.items():
        print(f"  {page}: {len(items)} scripts")
        for it in items:
            print(f"    - [{it['id']}] {it['title']} ({len(it['text'].split())} words)")
            
    return all_extracted

if __name__ == "__main__":
    extract_all()
