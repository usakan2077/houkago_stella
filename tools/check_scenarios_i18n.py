from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OLD_DIR = ROOT / "scenarios" / "old"
SCENARIO_DIR = ROOT / "scenarios"
JA_LOCALE = ROOT / "locales" / "scenario.ja.json"
EN_LOCALE = ROOT / "locales" / "scenario.en.json"

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


def display_items(path: Path):
    items = []
    for no, raw in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        line = raw.strip()
        match = re.match(r'^@end\s+"(.+?)"', line)
        if match:
            items.append(("end", "", match.group(1), no))
            continue
        if not line or line.startswith("//") or line == "---" or line.startswith("@") or line.startswith("# "):
            continue
        if line.startswith(">"):
            has_narration_space = line.startswith("> ")
            text = line[1:].strip()
            text = re.sub(r"^\*\*(.+)\*\*$", r"\1", text)
            text = re.sub(r"^\*(.+)\*$", r"\1", text)
            if not has_narration_space:
                text = re.sub(r"^「((?:(?!」).)*)」$", r"\1", text)
            items.append(("narrate", "", text, no))
            continue
        colon_idx = line.find(":")
        if 0 < colon_idx <= 20:
            speaker = line[:colon_idx].strip()
            text = line[colon_idx + 1:].strip()
            text = re.sub(r'^「((?:(?!」).)*)」$', r"\1", text)
            text = re.sub(r'^"((?:(?!").)*)"$', r"\1", text)
            items.append(("say", speaker, text, no))
            continue
        match = re.match(r"^(\S+)「(.+)」$", line)
        if match:
            items.append(("say", match.group(1), match.group(2), no))
            continue
    return items


def control_lines(path: Path):
    lines = []
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if line.startswith("# "):
            lines.append(line)
        elif line.startswith("@"):
            if line.startswith("@end "):
                line = re.sub(r'^@end\s+".+?"', '@end "<title>"', line)
            lines.append(line)
    return lines


def main() -> int:
    errors = []
    ja = json.loads(JA_LOCALE.read_text(encoding="utf-8"))
    en = json.loads(EN_LOCALE.read_text(encoding="utf-8"))

    if set(ja) != set(en):
        errors.append(f"locale key mismatch: ja={len(ja)} en={len(en)}")

    total_items = 0
    for filename in SCENARIO_FILES:
        old_path = OLD_DIR / filename
        current_path = SCENARIO_DIR / filename
        old_items = display_items(old_path)
        current_items = display_items(current_path)
        total_items += len(current_items)

        if len(old_items) != len(current_items):
            errors.append(f"{filename}: display item count mismatch old={len(old_items)} current={len(current_items)}")

        for index, (old, current) in enumerate(zip(old_items, current_items), 1):
            old_kind, old_speaker, old_text, old_line = old
            cur_kind, cur_speaker, cur_text, cur_line = current
            if old_kind != cur_kind or old_speaker != cur_speaker:
                errors.append(
                    f"{filename}: display kind mismatch #{index}: old {old_line} {old_kind}/{old_speaker} "
                    f"current {cur_line} {cur_kind}/{cur_speaker}"
                )
                continue
            if not cur_text.startswith("$"):
                errors.append(f"{filename}: current display text is not keyed at line {cur_line}: {cur_text}")
                continue
            key = cur_text[1:]
            if ja.get(key) != old_text:
                errors.append(f"{filename}: ja text mismatch for {key}: old line {old_line}")

        old_controls = control_lines(old_path)
        current_controls = control_lines(current_path)
        if old_controls != current_controls:
            errors.append(f"{filename}: control lines differ between old and current")
            for i, (a, b) in enumerate(zip(old_controls, current_controls), 1):
                if a != b:
                    errors.append(f" {filename}: first control diff #{i}: old={a} current={b}")
                    break
            if len(old_controls) != len(current_controls):
                errors.append(f" {filename}: control count old={len(old_controls)} current={len(current_controls)}")

    fallback = sum(1 for key, value in ja.items() if en.get(key) == value)
    print(f"display items: {total_items}")
    print(f"locale keys: {len(ja)}")
    print(f"english fallback items: {fallback}")

    if errors:
        print("FAILED")
        for err in errors[:40]:
            print(("- " + err).encode("utf-8", errors="replace").decode("utf-8"))
        return 1

    print("OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
