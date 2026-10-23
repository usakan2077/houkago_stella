"""Export the selected bonus artwork; keep editable originals in the sibling asset repo."""
from pathlib import Path
import hashlib
import json
import os
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(os.environ.get('STELLA_ASSETS_SRC', ROOT.parent / 'houkago-stella-assets/assets-src'))


def main():
    records = []
    groups = [
        ('bonus_mahjong_20261017', 'generation.json', 'cg'),
        ('bonus_aa_heroines_20261017', 'generation.json', 'aa'),
        ('bonus_memes_20261017', 'generation.json', 'yukkuri'),
    ]
    for folder, manifest, kind in groups:
        for item in json.loads((SOURCE / folder / manifest).read_text(encoding='utf8')):
            if kind == 'yukkuri' and not item['id'].endswith('_yukkuri'):
                continue
            src = SOURCE / folder / item['file']
            key = 'bonus_' + item['id']
            dest = ROOT / ('assets/images/stills' if kind == 'cg' else 'assets/bonus') / (key + '.webp')
            dest.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(src) as image:
                image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
                # Downscale only; keep the exact composition and the generated alpha.
                image.thumbnail((1280, 900) if kind == 'cg' else (720, 1080), Image.Resampling.LANCZOS)
                image.save(dest, 'WEBP', quality=92, method=6)
                records.append(dict(id=item['id'], key=key, kind=kind,
                    file=dest.relative_to(ROOT).as_posix(), source=src.relative_to(SOURCE).as_posix(),
                    width=image.width, height=image.height,
                    source_sha256=hashlib.sha256(src.read_bytes()).hexdigest(),
                    sha256=hashlib.sha256(dest.read_bytes()).hexdigest()))
    (ROOT / 'assets/bonus/manifest.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf8')
    print(f'Exported {len(records)} selected bonus images.')


if __name__ == '__main__':
    main()
