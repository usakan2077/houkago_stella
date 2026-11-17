"""Compile local Chinese UI dictionaries and vector text; no network."""
import html
import json
import re
from pathlib import Path
from build_chinese_text import traditional

ROOT = Path(__file__).resolve().parents[1]
DRAFTS = ROOT / 'locales/chinese-drafts'
source = json.loads((DRAFTS/'ui-source.json').read_text(encoding='utf-8'))
entries = {}
for line in (DRAFTS/'ui.txt').read_text(encoding='utf-8').splitlines():
    index, value = line.split('|', 1)
    if int(index) in entries or not value.strip():
        raise ValueError('Duplicate/empty UI translation: '+index)
    entries[int(index)] = value.replace('⏎', '\n')
if set(entries) != set(range(len(source))):
    raise ValueError(f'Expected {len(source)} UI entries, got {len(entries)}')
dictionaries = {}
for language in ['zh-CN', 'zh-TW']:
    path = ROOT/f'locales/ui.{language}.json'
    dictionary = json.loads(path.read_text(encoding='utf-8'))
    extra = json.loads((DRAFTS/'ui-extra.json').read_text(encoding='utf-8'))
    dictionary.update({key: pair[0 if language == 'zh-CN' else 1] for key, pair in extra.items()})
    for index, original in enumerate(source):
        translated = entries[index] if language == 'zh-CN' else traditional(entries[index])
        if sorted(re.findall(r'\{\w+\}', original)) != sorted(re.findall(r'\{\w+\}', translated)):
            raise ValueError('Changed placeholder: '+original)
        if re.findall(r'</?\w+[^>]*>', original) != re.findall(r'</?\w+[^>]*>', translated):
            # A few old escaped examples are ordinary text, not executable markup.
            raise ValueError('Changed HTML: '+original)
        dictionary[original] = translated
    dictionary.pop('中国語表示では日本語音声を再生。', None)
    path.write_text(json.dumps(dictionary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    dictionaries[language] = dictionary
    for svg in (ROOT/'assets/bonus').glob('*_ja*.svg'):
        def replace(match):
            original = html.unescape(match[2])
            value = dictionary.get(original, original)
            return match[1]+html.escape(value, quote=False)+match[3]
        content = re.sub(r'(<(?:text|tspan)\b[^>]*>)([^<]+)(</(?:text|tspan)>)', replace, svg.read_text(encoding='utf-8'))
        target = svg.with_name(svg.name.replace('_ja', '_'+language))
        target.write_text(content,encoding='utf-8')
    print(language, len(dictionary), 'local UI translations')
runtime = ROOT/'chinese-locales.js'
body = runtime.read_text(encoding='utf-8')
start = body.index('  const dictionaries = ')
end = body.index('  const originals = ', start)
body = body[:start]+'  const dictionaries = '+json.dumps(dictionaries,ensure_ascii=False,indent=2)+';\n'+body[end:]
runtime.write_text(body,encoding='utf-8')
