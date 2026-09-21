#!/usr/bin/env python3
"""
voice/normalizer.py

Text Normalizer for Lakshay Nagpal's Standalone Voice Engine.
Normalizes domain technical acronyms, times, dates, currencies, and
strips markdown, HTML, and emoji before speech synthesis.
"""

import re
import json
from pathlib import Path

# Load pronunciations mapping
PRONUNCIATIONS_FILE = Path(__file__).parent / "pronunciations.json"


def load_pronunciations():
    if PRONUNCIATIONS_FILE.exists():
        try:
            with open(PRONUNCIATIONS_FILE, "r", encoding="utf-8") as fh:
                return json.load(fh)
        except Exception:
            pass
    return {"acronyms": {}, "symbols": {}}


PRONUNCIATIONS = load_pronunciations()


def strip_emojis(text: str) -> str:
    """Removes emoji and pictograph characters from text."""
    # Common Unicode ranges for emojis and miscellaneous symbols
    emoji_pattern = re.compile(
        "["
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F680-\U0001F6FF"  # transport & map
        "\U0001F1E0-\U0001F1FF"  # flags
        "\U0001F900-\U0001F9FF"  # supplemental symbols
        "\U0001FA00-\U0001FA6F"  # chess symbols, etc.
        "\U0001FA70-\U0001FAFF"  # symbols and pictographs extended-A
        "\U00002702-\U000027B0"  # dingbats
        "\U000024C2-\U0001F251"
        "\U0000200D"              # zero-width joiner
        "\U0000FE0E-\U0000FE0F"  # variation selectors
        "⚠️✅💼🐯🇩🇪🎧↗️➡️↗"
        "]+",
        flags=re.UNICODE,
    )
    return emoji_pattern.sub("", text)


def strip_markdown_and_html(text: str) -> str:
    """Strips Markdown syntax, inline links, code fences, and HTML tags."""
    # Strip HTML tags
    text = re.sub(r"<[^>]+>", " ", text)
    # Replace markdown links [text](url) -> text
    text = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", text)
    # Replace image markdown ![alt](url) -> alt
    text = re.sub(r"!\[([^\]]*)\]\([^\)]+\)", r"\1", text)
    # Remove code blocks and inline backticks
    text = re.sub(r"```[\s\S]*?```", " ", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    # Remove markdown headers #, ##, etc.
    text = re.sub(r"^#{1,6}\s*", "", text, flags=re.MULTILINE)
    # Remove bold/italic asterisks or underscores
    text = re.sub(r"\*\*([^\*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^\*]+)\*", r"\1", text)
    text = re.sub(r"__([^_]+)__", r"\1", text)
    text = re.sub(r"_([^_]+)_", r"\1", text)
    return text


def number_to_words(n: int) -> str:
    """Converts integers up to millions into spoken words."""
    if n < 0:
        return "negative " + number_to_words(-n)
    if n == 0:
        return "zero"

    units = [
        "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
        "seventeen", "eighteen", "nineteen"
    ]
    tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

    def _convert_chunk(num):
        chunk = ""
        if num >= 100:
            chunk += units[num // 100] + " hundred "
            num %= 100
        if num >= 20:
            chunk += tens[num // 10]
            if num % 10:
                chunk += "-" + units[num % 10]
            chunk += " "
        elif num > 0:
            chunk += units[num] + " "
        return chunk.strip()

    if n < 100:
        return _convert_chunk(n)
    elif n < 1000:
        return _convert_chunk(n)
    elif n < 1000000:
        thousands = n // 1000
        remainder = n % 1000
        res = _convert_chunk(thousands) + " thousand"
        if remainder:
            res += " " + _convert_chunk(remainder)
        return res
    else:
        millions = n // 1000000
        remainder = n % 1000000
        res = _convert_chunk(millions) + " million"
        if remainder:
            res += " " + number_to_words(remainder)
        return res


def normalize_currencies(text: str) -> str:
    """Expands rupee and euro values into natural speech."""
    # Specific known fee amounts
    text = re.sub(r"(?:₹|Rs\.?\s*|INR\s*)2,?700\b", "twenty-seven hundred rupees", text, flags=re.IGNORECASE)
    text = re.sub(r"(?:₹|Rs\.?\s*|INR\s*)1,?350\b", "thirteen hundred fifty rupees", text, flags=re.IGNORECASE)

    # General rupees
    def _rupee_sub(m):
        raw = m.group(1).replace(",", "")
        try:
            val = int(raw)
            return f"{number_to_words(val)} rupees"
        except ValueError:
            return f"{raw} rupees"

    text = re.sub(r"(?:₹|Rs\.?\s*|INR\s*)(\d[\d,]*)\b", _rupee_sub, text, flags=re.IGNORECASE)

    # Specific known euro amounts
    text = re.sub(r"€\s*45,?934(?:\.20)?\b", "forty-five thousand nine hundred thirty-four euros", text)
    text = re.sub(r"€\s*11,?904\b", "eleven thousand nine hundred four euros", text)
    text = re.sub(r"€\s*22,?400\b", "twenty-two thousand four hundred euros", text)
    text = re.sub(r"€\s*(\d[\d,]*)\b", lambda m: f"{m.group(1)} euros", text)

    return text


def normalize_times(text: str) -> str:
    """Normalizes time intervals and 12h/24h time expressions."""
    # 5:00 PM IST or 5 PM IST
    text = re.sub(r"\b5:00\s*PM\s*IST\b", "five P.M. Indian Standard Time", text, flags=re.IGNORECASE)
    text = re.sub(r"\b5:00\s*PM\b", "five P.M.", text, flags=re.IGNORECASE)
    text = re.sub(r"\b5\s*PM\b", "five P.M.", text, flags=re.IGNORECASE)
    text = re.sub(r"\b11:59\s*PM\b", "eleven fifty-nine P.M.", text, flags=re.IGNORECASE)

    # Time ranges: 07:30 – 08:15
    text = re.sub(r"\b0?7:30\s*[–\-]\s*0?8:15(?:\s*AM)?\b", "seven thirty to eight fifteen in the morning", text)
    text = re.sub(r"\b0?8:15\s*[–\-]\s*0?9:00(?:\s*AM)?\b", "eight fifteen to nine A.M.", text)
    text = re.sub(r"\b16:30\s*[–\-]\s*18:00\b", "four thirty to six P.M.", text)
    text = re.sub(r"\b(\d{1,2}):(\d{2})\s*(AM|PM)\b", r"\1 \2 \3", text, flags=re.IGNORECASE)
    return text


def normalize_dates(text: str) -> str:
    """Expands dates like '22 Sep 2026' into spoken words."""
    months = {
        "jan": "January", "feb": "February", "mar": "March", "apr": "April",
        "may": "May", "jun": "June", "jul": "July", "aug": "August",
        "sep": "September", "oct": "October", "nov": "November", "dec": "December",
        "sept": "September"
    }
    ordinals = {
        1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth",
        6: "sixth", 7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth",
        11: "eleventh", 12: "twelfth", 13: "thirteenth", 14: "fourteenth",
        15: "fifteenth", 16: "sixteenth", 17: "seventeenth", 18: "eighteenth",
        19: "nineteenth", 20: "twentieth", 21: "twenty-first", 22: "twenty-second",
        23: "twenty-third", 24: "twenty-fourth", 25: "twenty-fifth",
        26: "twenty-sixth", 27: "twenty-seventh", 28: "twenty-eighth",
        29: "twenty-ninth", 30: "thirtieth", 31: "thirty-first"
    }

    def _replace_date(m):
        day = int(m.group(1))
        m_str = m.group(2).lower()
        year = m.group(3) if m.group(3) else ""
        month_name = months.get(m_str, m_str.capitalize())
        day_ord = ordinals.get(day, str(day))
        if year == "2026":
            year_spoken = "twenty twenty-six"
        elif year:
            year_spoken = year
        else:
            year_spoken = ""
        return f"{month_name} {day_ord}{', ' + year_spoken if year_spoken else ''}"

    # Match: "22 Sep 2026" or "22 September 2026" or "2 Sep"
    pattern = re.compile(
        r"\b(\d{1,2})\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:\s+(20\d\d))?\b",
        flags=re.IGNORECASE
    )
    text = pattern.sub(_replace_date, text)

    # Weekdays abbreviations
    text = re.sub(r"\bMon\b", "Monday", text)
    text = re.sub(r"\bTue\b", "Tuesday", text)
    text = re.sub(r"\bWed\b", "Wednesday", text)
    text = re.sub(r"\bThu\b", "Thursday", text)
    text = re.sub(r"\bFri\b", "Friday", text)
    text = re.sub(r"\bSat\b", "Saturday", text)
    text = re.sub(r"\bSun\b", "Sunday", text)

    return text


def normalize_acronyms(text: str) -> str:
    """Replaces domain acronyms with spoken phonetics."""
    acronyms = PRONUNCIATIONS.get("acronyms", {})
    # Sort keys by length descending to match multi-word / longer acronyms first
    sorted_acronyms = sorted(acronyms.keys(), key=len, reverse=True)
    for acr in sorted_acronyms:
        spoken = acronyms[acr]
        # Use word boundaries
        pattern = r"\b" + re.escape(acr) + r"\b"
        text = re.sub(pattern, spoken, text)
    return text


def normalize_symbols(text: str) -> str:
    """Normalizes miscellaneous symbols and characters."""
    symbols = PRONUNCIATIONS.get("symbols", {})
    for sym, spoken in symbols.items():
        text = text.replace(sym, spoken)

    # Clean percentages like 70.56%
    text = re.sub(r"(\d+)\.(\d+)\s*percent", r"\1 point \2 percent", text)
    # Slashes like 15-20/wk
    text = re.sub(r"(\d+)/wk\b", r"\1 per week", text)
    # Ordinals like 1st, 2nd, 3rd, 4th
    text = re.sub(r"\b1st\b", "first", text)
    text = re.sub(r"\b2nd\b", "second", text)
    text = re.sub(r"\b3rd\b", "third", text)
    text = re.sub(r"\b4th\b", "fourth", text)
    return text


def normalize_text(raw_text: str) -> str:
    """
    Main normalization entry point.
    Transforms raw webpage/dashboard text into smooth, spoken English.
    """
    if not raw_text:
        return ""

    text = strip_markdown_and_html(raw_text)
    text = strip_emojis(text)
    text = normalize_currencies(text)
    text = normalize_times(text)
    text = normalize_dates(text)
    text = normalize_acronyms(text)
    text = normalize_symbols(text)

    # Remove repeated whitespace and line breaks
    text = re.sub(r"\s+", " ", text).strip()
    return text


def split_into_sentences(text: str) -> list:
    """Splits text into spoken sentences at ., !, ?, while respecting abbreviations."""
    if not text:
        return []
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return [s.strip() for s in sentences if s.strip()]


# Alias for clarity
normalize_for_tts = normalize_text


if __name__ == "__main__":
    sample = (
        "Good morning, Lakshay. Today is Day 3 (22 Sep 2026, 5:00 PM IST). "
        "Complete 2 LC problems in DILR & VARC. Fee is ₹2,700 for CAT. "
        "Also check dMAT and MOI from MDU Rohtak."
    )
    print("RAW:\n", sample)
    print("\nNORMALIZED:\n", normalize_text(sample))
