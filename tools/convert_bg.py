from PIL import Image
import os

SRC_DIR = "assets-src/bg_re_re/"
DST_DIR = "assets/images/bg/"
SIZE = (1280, 720)
QUALITY = 90

EXCLUDE = {"cafeteria_綺麗な時計とメニュー.png", "cafeteria_綺麗な背景.png"}

for fname in sorted(os.listdir(SRC_DIR)):
    if not fname.lower().endswith(".png"):
        continue
    if fname in EXCLUDE:
        print(f"  skip: {fname}")
        continue
    src = os.path.join(SRC_DIR, fname)
    dst = os.path.join(DST_DIR, os.path.splitext(fname)[0] + ".webp")
    with Image.open(src) as img:
        original_size = img.size
        img = img.convert("RGB")
        img = img.resize(SIZE, Image.LANCZOS)
        img.save(dst, "WEBP", quality=QUALITY)
    print(f"  {fname} ({original_size[0]}x{original_size[1]}) -> {os.path.basename(dst)}")

print("done")
