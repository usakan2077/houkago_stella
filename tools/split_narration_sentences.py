"""Preview or apply sentence-per-line narration without changing dialogue IDs."""

import argparse
from contextlib import ExitStack
import json
import re
from pathlib import Path

from narration_sentences import NARRATION_REF, narration_key, split_sentences

ROOT = Path(__file__).resolve().parents[1]


def plan(language):
    config = (ROOT / "config.js").read_text(encoding="utf-8")
    block = re.search(r"scenarioFilesByLanguage:\s*\{(.*?)\n  \},", config, re.S)[1]
    scripts = dict(re.findall(r"(\w+):\s*\[(.*?)\]", block, re.S))
    paths = re.findall(r"'([^']+)'", scripts[language])
    locale_path = ROOT / "locales" / f"scenario.{language}.json"
    locale = json.loads(locale_path.read_text(encoding="utf-8"))
    replacements, files, changed, added = {}, {}, 0, 0
    for relative in paths:
        path = ROOT / relative
        source = path.read_text(encoding="utf-8")
        lines = []
        for raw in source.splitlines():
            match = NARRATION_REF.fullmatch(raw.strip())
            if not match:
                lines.append(raw)
                continue
            emphasis, key = match.groups()
            parts = split_sentences(locale[key], language)
            if len(parts) == 1:
                lines.append(raw)
                continue
            if narration_key(key)[1] != 1 or key in replacements:
                raise ValueError(f"Cannot split existing continuation or repeated ID: {key}")
            keys = [key] + [f"{key}.s{number:03d}" for number in range(2, len(parts) + 1)]
            if any(item in locale for item in keys[1:]):
                raise ValueError(f"Narration continuation ID already exists: {key}")
            replacements[key] = dict(zip(keys, parts))
            lines.extend(f"> {emphasis}${item}{emphasis}" for item in keys)
            changed += 1
            added += len(parts) - 1
        updated = "\n".join(lines) + "\n"
        if updated != source:
            files[path] = updated
    if replacements:
        updated_locale = {}
        for key, value in locale.items():
            updated_locale.update(replacements.get(key, {key: value}))
        files[locale_path] = json.dumps(updated_locale, ensure_ascii=False, indent=2) + "\n"
    return files, changed, added


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--language", choices=("ja", "en"), action="append")
    parser.add_argument("--write", action="store_true", help="Apply changes; default is preview only")
    args = parser.parse_args()
    plans = [(language, *plan(language)) for language in args.language or ("ja", "en")]
    for language, files, changed, added in plans:
        print(f"{language}: split {changed} narration rows, add {added} rows, update {len(files)} files")
    if args.write:
        # Check access to every existing file before changing any of them.
        with ExitStack() as stack:
            opened = []
            for _, files, _, _ in plans:
                for path, text in files.items():
                    handle = stack.enter_context(path.open("r+", encoding="utf-8", newline="\n"))
                    opened.append((handle, text))
            for handle, text in opened:
                handle.seek(0)
                handle.write(text)
                handle.truncate()


if __name__ == "__main__":
    main()
