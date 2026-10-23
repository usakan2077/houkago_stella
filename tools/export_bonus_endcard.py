"""Export the selected ending-card illustration from the separate source repository."""
from pathlib import Path
import hashlib
import json
import os
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path(os.environ.get('STELLA_ASSETS_SRC', ROOT.parent / 'houkago-stella-assets/assets-src'))
SOURCE = SOURCE_ROOT / 'bonus_endcard_20261022/bonus_endcard_v2.png'
TARGET = ROOT / 'assets/bonus/bonus_endcard_v2.webp'

if __name__ == '__main__':
    with Image.open(SOURCE) as image:
        original_size = image.size
        ImageOps.fit(image.convert('RGB'), (1920, 1080), method=Image.Resampling.LANCZOS).save(TARGET, 'WEBP', quality=92, method=6)
    metadata = dict(source=SOURCE.name, source_size=original_size, export=str(TARGET.relative_to(ROOT)),
                    export_size=[1920, 1080], sha256=hashlib.sha256(TARGET.read_bytes()).hexdigest(),
                    generator='built-in image_gen', prompt='prompt_v2.txt')
    (SOURCE.parent / 'export_v2.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2)+'\n', encoding='utf8')
    print(f'Exported {TARGET.name}: {TARGET.stat().st_size} bytes, 1920x1080')
