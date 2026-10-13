"""Sentence boundaries and continuation IDs for localized narration."""

import re

NARRATION_REF = re.compile(r"^>\s*(\*{0,2})\$([\w.]+)\1$")
CONTINUATION = re.compile(r"^(.*)\.s(\d{3,})$")
PAIRS = {"「": "」", "『": "』", "（": "）", "(": ")", "[": "]", "“": "”"}
ABBREVIATION = re.compile(r"\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|vs|etc|e\.g|i\.e)\.$", re.I)


def narration_key(key):
    match = CONTINUATION.fullmatch(key)
    return (match[1], int(match[2])) if match else (key, 1)


def split_sentences(text, language):
    """Keep the exact text; split Japanese outside brackets and protect English abbreviations."""
    parts, stack, start = [], [], 0
    for index, char in enumerate(text):
        if char == '"':
            if stack and stack[-1] == '"':
                stack.pop()
            else:
                stack.append('"')
            continue
        if char in PAIRS:
            stack.append(PAIRS[char])
            continue
        if stack and char == stack[-1]:
            stack.pop()
            continue
        if language == "ja":
            if stack or char != "。":
                continue
        else:
            if char not in ".!?":
                continue
            if char == ".":
                if (index and text[index - 1] == ".") or text[index + 1:index + 2] == ".":
                    continue
                if ABBREVIATION.search(text[:index + 1]):
                    continue
        end, pending = index + 1, list(stack)
        while pending and end < len(text) and text[end] == pending[-1]:
            pending.pop()
            end += 1
        if pending and language == "en":
            continue
        if language == "en" and end < len(text):
            if not text[end].isspace():
                continue
            following = text[end:].lstrip()
            # A quoted question followed by "she said" is still one sentence.
            if following and following[0].islower():
                continue
        while end < len(text) and text[end].isspace():
            end += 1
        if end > start:
            parts.append(text[start:end])
            start = end
    if start < len(text):
        parts.append(text[start:])
    return parts or [text]


def normalize_narration(lines):
    """Collapse only consecutive, correctly numbered narration continuations."""
    result = []
    previous, emphasis, expected = None, None, None
    for line in lines:
        match = NARRATION_REF.fullmatch(line)
        if not match:
            previous = None
            result.append(line)
            continue
        base, number = narration_key(match[2])
        if number == 1 and not CONTINUATION.fullmatch(match[2]):
            result.append(line)
            previous, emphasis, expected = base, match[1], 2
        elif base == previous and match[1] == emphasis and number == expected:
            expected += 1
        else:
            raise ValueError(f"Invalid narration continuation: {line}")
    return result
