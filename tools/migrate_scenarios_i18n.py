from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OLD_DIR = ROOT / "scenarios" / "old"
SCENARIO_DIR = ROOT / "scenarios"
LOCALE_DIR = ROOT / "locales"
JA_LOCALE = LOCALE_DIR / "scenario.ja.json"
EN_LOCALE = LOCALE_DIR / "scenario.en.json"

SCENARIO_FILES = [
    "chapter1.md",
    "chapter2.md",
    "chapter3.md",
    "chapter4.md",
    "chapter5.md",
    "chapter6.md",
    "chapter7.md",
    "chapter8.md",
    "bad_end.md",
    "route_sakura.md",
    "route_kotoha.md",
    "route_mahiru.md",
]


def file_key(filename: str) -> str:
    return Path(filename).stem


def label_key(label: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9_]+", "_", label.strip()).strip("_")
    return cleaned or "preamble"


def strip_dialog_quotes(raw: str) -> str:
    text = raw.strip()
    for pattern in (
        r'^「((?:(?!」).)*)」$',
        r'^"((?:(?!").)*)"$',
        r"^'((?:(?!').)*)'$",
    ):
        match = re.match(pattern, text)
        if match:
            return match.group(1)
    return text


def extract_items(path: Path, prefix: str):
    items = []
    current_label = "preamble"
    counters: dict[str, int] = {}

    for line_no, raw in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        line = raw.strip()
        if not line or line.startswith("//") or line == "---":
            continue

        if line.startswith("# "):
            current_label = label_key(line[2:].strip())
            counters.setdefault(current_label, 0)
            continue

        if line.startswith("> "):
            text = line[2:].strip()
            emphasis = None
            climax = re.match(r"^\*\*(.+)\*\*$", text)
            inner = re.match(r"^\*(.+)\*$", text)
            if climax:
                text = climax.group(1)
                emphasis = "climax"
            elif inner:
                text = inner.group(1)
                emphasis = "inner"
            counters[current_label] = counters.get(current_label, 0) + 1
            key = f"{prefix}.{current_label}.t{counters[current_label]:03d}"
            items.append(("narrate", "", text, key, line_no, raw, emphasis))
            continue

        colon_idx = line.find(":")
        if 0 < colon_idx <= 20:
            speaker = line[:colon_idx].strip()
            text = strip_dialog_quotes(line[colon_idx + 1:])
            counters[current_label] = counters.get(current_label, 0) + 1
            key = f"{prefix}.{current_label}.t{counters[current_label]:03d}"
            items.append(("say", speaker, text, key, line_no, raw, None))
            continue

        match = re.match(r"^(\S+)「(.+)」$", line)
        if match:
            speaker = match.group(1)
            counters[current_label] = counters.get(current_label, 0) + 1
            key = f"{prefix}.{current_label}.t{counters[current_label]:03d}"
            items.append(("say", speaker, match.group(2), key, line_no, raw, None))
            continue

        match = re.match(r'^@end\s+"(.+?)"(\s*->\s*\S+)?\s*$', line)
        if match:
            key = f"{prefix}.{current_label}.end_title"
            items.append(("end", "", match.group(1), key, line_no, raw, None))

    return items


def keyify_file(filename: str):
    prefix = file_key(filename)
    source = OLD_DIR / filename
    dest = SCENARIO_DIR / filename
    items = extract_items(source, prefix)
    by_line = {item[4]: item for item in items}
    out_lines = []

    for line_no, raw in enumerate(source.read_text(encoding="utf-8").splitlines(), 1):
        item = by_line.get(line_no)
        if not item:
            out_lines.append(raw)
            continue

        kind, speaker, _text, key, _line_no, _raw, emphasis = item
        ref = f"${key}"
        indent = raw[: len(raw) - len(raw.lstrip())]
        if kind == "narrate":
            if emphasis == "climax":
                out_lines.append(f"{indent}> **{ref}**")
            elif emphasis == "inner":
                out_lines.append(f"{indent}> *{ref}*")
            else:
                out_lines.append(f"{indent}> {ref}")
        elif kind == "say":
            out_lines.append(f"{indent}{speaker}: {ref}")
        elif kind == "end":
            out_lines.append(re.sub(r'^(\s*@end\s+)"(.+?)"', rf'\1"{ref}"', raw))
        else:
            out_lines.append(raw)

    dest.write_text("\n".join(out_lines) + "\n", encoding="utf-8")
    return items


def main() -> int:
    LOCALE_DIR.mkdir(exist_ok=True)
    existing_en = {}
    if EN_LOCALE.exists():
        existing_en = json.loads(EN_LOCALE.read_text(encoding="utf-8"))

    ja_locale = {}
    en_locale = {}
    counts = {}

    for filename in SCENARIO_FILES:
        items = keyify_file(filename)
        counts[filename] = len(items)
        for _kind, _speaker, text, key, *_rest in items:
            ja_locale[key] = text
            en_locale[key] = existing_en.get(key, text)

    JA_LOCALE.write_text(json.dumps(ja_locale, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    EN_LOCALE.write_text(json.dumps(en_locale, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    for filename, count in counts.items():
        print(f"{filename}: {count}")
    print(f"total: {sum(counts.values())}")
    print(f"wrote {JA_LOCALE.relative_to(ROOT)}")
    print(f"wrote {EN_LOCALE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
