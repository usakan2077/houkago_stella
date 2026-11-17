"""Compile locally authored Chinese drafts. No network or translation API."""
from __future__ import annotations
import argparse
import ctypes
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DRAFTS = ROOT / 'locales/chinese-drafts'
TRADITIONAL_TERMS = {'視頻': '影片', '視頻文件': '影片檔案', '文件夾': '資料夾', '軟件': '軟體',
                     '鼠標': '滑鼠', '打印': '列印', '加載': '載入', '信息': '資訊', '網絡': '網路',
                     '自行車': '腳踏車', '土豆': '馬鈴薯', '出租車': '計程車',
                     '自動售貨機': '自動販賣機', '售貨機': '販賣機', '便利店': '便利商店',
                     '塑料瓶': '寶特瓶'}

def read(path):
    return json.loads(path.read_text(encoding='utf-8'))

def save(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def traditional(text):
    # Windows' offline character mapping. Regional vocabulary is explicit above.
    api = ctypes.WinDLL('kernel32', use_last_error=True).LCMapStringEx
    api.argtypes = [ctypes.c_wchar_p, ctypes.c_uint, ctypes.c_wchar_p, ctypes.c_int,
                    ctypes.c_wchar_p, ctypes.c_int, ctypes.c_void_p, ctypes.c_void_p, ctypes.c_longlong]
    api.restype = ctypes.c_int
    size = api('zh-TW', 0x04000000, text, len(text), None, 0, None, None, 0)
    if not size:
        raise ctypes.WinError(ctypes.get_last_error())
    target = ctypes.create_unicode_buffer(size + 1)
    if not api('zh-TW', 0x04000000, text, len(text), target, size, None, None, 0):
        raise ctypes.WinError(ctypes.get_last_error())
    result = target.value
    for original, translated in sorted(TRADITIONAL_TERMS.items(), key=lambda pair: -len(pair[0])):
        result = result.replace(original, translated)
    return result

def compile_kind(kind, check=False):
    source_path = ROOT / f'locales/{kind}.ja.json'
    source = read(source_path)
    groups = {}
    for key in source:
        group = 'bonus' if kind == 'bonus' else key.split('.')[0]
        groups.setdefault(group, []).append(key)
    index_path = DRAFTS / f'{kind}-source-index.json'
    index = {'source_sha256': hashlib.sha256(source_path.read_bytes()).hexdigest(), 'groups': groups}
    if index_path.exists():
        if read(index_path) != index:
            raise ValueError('Japanese source/order changed: review draft indices before rebuilding ' + kind)
    elif not check:
        save(index_path, index)
    simplified = {}
    for group, keys in groups.items():
        path = DRAFTS / (group + '.txt')
        if not path.exists():
            raise ValueError('Missing authored translation: ' + str(path))
        translated = {}
        for line in path.read_text(encoding='utf-8').splitlines():
            number, text = line.split('|', 1)
            number = int(number)
            if number in translated or not text.strip():
                raise ValueError(f'{path}: duplicate/empty entry {number}')
            translated[number] = text.replace('⏎', '\n')
        if set(translated) != set(range(len(keys))):
            raise ValueError(f'{group}: expected {len(keys)} entries, got {len(translated)}')
        simplified.update({key: translated[i] for i, key in enumerate(keys)})
    for language, data in [('zh-CN', simplified), ('zh-TW', {key: traditional(text) for key, text in simplified.items()})]:
        path = ROOT / f'locales/{kind}.{language}.json'
        if check:
            if read(path) != data:
                raise ValueError('Output differs from authored draft: ' + str(path))
        else:
            save(path, data)
        print(f'{kind}/{language}: {len(data)} locally authored entries')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--kind', choices=['scenario', 'bonus', 'all'], default='all')
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    for kind in ['scenario', 'bonus'] if args.kind == 'all' else [args.kind]:
        compile_kind(kind, args.check)
