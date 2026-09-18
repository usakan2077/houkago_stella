"""Check each language's current scripts, text references, assets and branches.

Japanese and English share text keys, speakers, branches and presentation cues.
The retired scenarios/old migration inputs are no longer required.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KEY = re.compile(r"\$([\w.]+)")
IMAGE_EXTENSIONS = (".webp", ".png", ".jpg", ".jpeg")


def load_locale(path: Path) -> dict[str, str]:
    def unique(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError(f"{path.name}: duplicate key {key}")
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{path.name}: empty or non-string value for {key}")
            result[key] = value
        return result
    return json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=unique)


def main() -> int:
    errors = []
    config = (ROOT / "config.js").read_text(encoding="utf-8")
    files_block = re.search(r"scenarioFilesByLanguage:\s*\{(.*?)\n  \},", config, re.S)
    text_block = re.search(r"scenarioTextFiles:\s*\{(.*?)\n  \},", config, re.S)
    if not files_block or not text_block:
        print("FAILED: language file configuration not found")
        return 1
    files = {lang: re.findall(r"'([^']+)'", body) for lang, body in
             re.findall(r"(\w+):\s*\[(.*?)\]", files_block[1], re.S)}
    text_files = dict(re.findall(r"(\w+):\s*'([^']+)'", text_block[1]))
    known_commands = set(re.findall(r"case '([^']+)':", (ROOT / "parser.js").read_text(encoding="utf-8")))
    bg_block = config.split("  backgrounds: {", 1)[1].split("  settings:", 1)[0]
    backgrounds = set(re.findall(r"^    ['\"]?([\w-]+)['\"]?:", bg_block, re.M))
    char_block = config.split("  characters: {", 1)[1].split("  speakerNames:", 1)[0]
    characters = {}
    for name, body in re.findall(r"^    (\w+): \{(.*?)^    \},", char_block, re.M | re.S):
        expression = re.search(r"expressions:\s*\[(.*?)\]", body, re.S)
        characters[name] = set(re.findall(r"'([^']+)'", expression[1])) if expression else set()

    def image_exists(folder, key):
        return any((ROOT / "assets/images" / folder / (key + ext)).is_file() for ext in IMAGE_EXTENSIONS)

    flows, presentations, locale_keys = {}, {}, {}
    for lang, paths in files.items():
        try:
            locale = load_locale(ROOT / text_files[lang])
        except (OSError, ValueError, KeyError) as exc:
            errors.append(str(exc))
            continue
        locale_keys[lang] = set(locale)
        presentations[lang] = []
        used, labels = set(), set()
        targets, controls = [], []
        endings = 0
        if not paths or len(paths) != len(set(paths)):
            errors.append(f"{lang}: empty or duplicate scenario paths")
        for relative in paths:
            path = ROOT / relative
            if not path.is_file():
                errors.append(f"missing script: {relative}")
                continue
            script_lines = path.read_text(encoding="utf-8").splitlines()
            presentations[lang].append((path.name, [
                line.strip() for line in script_lines
                if line.strip() and not line.strip().startswith("//") and line.strip() != "---"
            ]))
            in_choice, option_count = False, 0
            for number, raw in enumerate(script_lines, 1):
                line = raw.strip()
                where = f"{relative}:{number}"
                if not line or line.startswith("//") or line == "---":
                    continue
                if in_choice and not line.startswith("-"):
                    if option_count < 2:
                        errors.append(f"{where}: choice has fewer than two options")
                    in_choice = False
                references = KEY.findall(line)
                used.update(references)
                for key in references:
                    if key not in locale:
                        errors.append(f"{where}: missing {lang} text {key}")
                if line.startswith("# "):
                    label = line[2:]
                    if label in labels:
                        errors.append(f"{where}: duplicate label {label}")
                    labels.add(label)
                    controls.append(line)
                elif line.startswith("- "):
                    match = re.fullmatch(r"- (\$[\w.]+)(?:\s+\[([^]]+)\])?\s+->\s+(\S+)", line)
                    if not in_choice or not match:
                        errors.append(f"{where}: invalid or unlocalized choice")
                    else:
                        option_count += 1
                        targets.append((match[3], where))
                        controls.append(("choice", match[2], match[3]))
                elif line.startswith("@"):
                    args = line.split()
                    cmd = args[0][1:]
                    if cmd not in known_commands:
                        errors.append(f"{where}: unknown command {cmd}")
                    if cmd == "choice":
                        in_choice, option_count = True, 0
                    elif cmd in ("jump", "if"):
                        targets.append((args[-1], where))
                        controls.append(line)
                    elif cmd.startswith("flag") or cmd == "route_select":
                        controls.append(line)
                        if cmd == "route_select":
                            targets.extend((arg.split(":")[-1], where) for arg in args[1:])
                    elif cmd == "end":
                        match = re.fullmatch(r'@end "(\$[\w.]+)"(?:\s+->\s+(\S+))?', line)
                        if not match:
                            errors.append(f"{where}: invalid or unlocalized end title")
                        else:
                            controls.append(("end", match[2]))
                            if match[2]:
                                targets.append((match[2], where))
                            else:
                                endings += 1
                    elif cmd == "scene":
                        if args[1] not in backgrounds and not image_exists("bg", args[1]):
                            errors.append(f"{where}: unknown background {args[1]}")
                    elif cmd == "still":
                        if not image_exists("stills", args[1]):
                            errors.append(f"{where}: missing still {args[1]}")
                    elif cmd in ("show", "expr"):
                        char = args[1]
                        index = 3 if cmd == "show" else 2
                        expression = args[index] if len(args) > index else "normal"
                        if char not in characters or expression not in characters[char]:
                            errors.append(f"{where}: unknown sprite {char}/{expression}")
                        elif not (ROOT / "assets/images/chars" / char / (expression + ".png")).is_file():
                            errors.append(f"{where}: missing sprite {char}/{expression}")
                    elif cmd in ("bgm", "se", "credits", "ending_intro") and len(args) > 1:
                        if args[1] not in ("stop", "current"):
                            folder = "se" if cmd == "se" else "bgm"
                            if not (ROOT / "assets/audio" / folder / args[1]).is_file():
                                errors.append(f"{where}: missing audio {args[1]}")
                else:
                    if line.startswith(">"):
                        payload = line[1:].strip().strip("*")
                    elif match := re.match(r"^([^:]{1,20}):\s*(.*)$", line):
                        payload = match[2]
                    else:
                        errors.append(f"{where}: unrecognized script line")
                        continue
                    if not re.fullmatch(r"\$[\w.]+", payload):
                        errors.append(f"{where}: display text is not localized")
            if in_choice and option_count < 2:
                errors.append(f"{relative}: final choice has fewer than two options")
        for target, where in targets:
            if target not in labels:
                errors.append(f"{where}: missing target {target}")
        unused = set(locale) - used
        if unused:
            errors.append(f"{lang}: {len(unused)} unused text keys")
        flows[lang] = controls
        print(f"{lang}: {len(paths)} scripts, {len(labels)} labels, {len(used)} text keys, {endings} endings")
    if "ja" in flows and "en" in flows and flows["ja"] != flows["en"]:
        errors.append("Japanese and English branch structure/flags differ")
    if "ja" in locale_keys and "en" in locale_keys and locale_keys["ja"] != locale_keys["en"]:
        missing = locale_keys["ja"] - locale_keys["en"]
        extra = locale_keys["en"] - locale_keys["ja"]
        errors.append(f"English text keys differ from Japanese: {len(missing)} missing, {len(extra)} extra")
    if "ja" in presentations and "en" in presentations and presentations["ja"] != presentations["en"]:
        errors.append("Japanese and English presentation/text order differ (check speakers, stills and scene cues)")
    if errors:
        print("FAILED")
        for error in errors[:60]:
            print("- " + error)
        return 1
    print("OK: localized text, assets, targets, language branch and presentation parity")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
