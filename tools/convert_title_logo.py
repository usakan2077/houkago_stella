from PIL import Image
from asset_paths import GAME_ROOT, asset_source

SRC = asset_source("bg/title_logo_en.png")
DST = GAME_ROOT / "assets/images/bg/title_logo_en.webp"
QUALITY = 90

with Image.open(SRC) as img:
    original_size = img.size
    if img.mode not in ("RGBA", "RGB"):
        img = img.convert("RGBA")
    img.save(DST, "WEBP", quality=QUALITY)

print(f"  {SRC.name} ({original_size[0]}x{original_size[1]}) -> {DST}")
print("done")
