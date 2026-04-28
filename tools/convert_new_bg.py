from PIL import Image
import os

BG_SRC  = "assets-src/bg_re_re"
BG_DST  = "assets/images/bg"
ST_SRC  = "assets-src/stills_re"
ST_DST  = "assets/images/stills"
SIZE    = (1280, 720)
QUALITY = 90

tasks = [
    (f"{BG_SRC}/corridor_rainy.png",       f"{BG_DST}/corridor_rainy.webp"),
    (f"{BG_SRC}/staircase_rainy.png",      f"{BG_DST}/staircase_rainy.webp"),
    (f"{BG_SRC}/corridor_nightly.png",     f"{BG_DST}/corridor_night.webp"),
    (f"{ST_SRC}/evening_walk_private.png", f"{ST_DST}/evening_walk_private.webp"),
]

for src, dst in tasks:
    if not os.path.exists(src):
        print(f"  SKIP (not found): {src}")
        continue
    with Image.open(src) as img:
        img = img.convert("RGB")
        img = img.resize(SIZE, Image.LANCZOS)
        img.save(dst, "WEBP", quality=QUALITY)
    print(f"  OK: {os.path.basename(src)} -> {dst}")
