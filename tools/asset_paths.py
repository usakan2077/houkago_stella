"""Paths shared by the source asset conversion tools."""

import os
from pathlib import Path

GAME_ROOT = Path(__file__).resolve().parent.parent
ASSET_SOURCE_ROOT = Path(
    os.environ.get(
        "STELLA_ASSETS_SRC",
        str(GAME_ROOT.parent / "houkago-stella-assets" / "assets-src"),
    )
).expanduser().resolve()


def asset_source(relative_path):
    path = ASSET_SOURCE_ROOT / relative_path
    if not path.exists():
        raise FileNotFoundError(
            f"Source asset not found: {path}. "
            "Place houkago-stella-assets beside the game repository, "
            "or set STELLA_ASSETS_SRC to its assets-src directory."
        )
    return path
