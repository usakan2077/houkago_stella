"""
editor/server.py — シナリオエディタ用のローカルサーバ

役割:
  - プロジェクトルートを静的配信（エディタが ../scenarios/ ../locales/ などを参照できる）
  - 編集内容を scenarios/*.md と locales/*.json に書き戻すAPI

セキュリティ:
  - 127.0.0.1 のみバインド
  - 書込先は scenarios/*.md と locales/*.json のホワイトリスト
  - パストラバーサル禁止
  - テンポラリファイルに書いてから rename（途中で落ちても元ファイルが残る）

起動:
  python editor/server.py
  または editor/start.bat をダブルクリック
"""

from __future__ import annotations

import json
import os
import re
import sys
import tempfile
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

PORT = 8765
HOST = "127.0.0.1"

# editor/ の親 = プロジェクトルート
ROOT = Path(__file__).resolve().parent.parent

# 書込許可パターン: (ディレクトリ, 拡張子)
WRITE_ALLOW = {
    "scenarios": ".md",
    "locales": ".json",
}


def _resolve_safe_path(rel: str, allow_dir: str, allow_ext: str) -> Path | None:
    """rel が allow_dir/ 配下で allow_ext 拡張子の安全なパスなら絶対パスを返す。
    パストラバーサルや不正な拡張子は None。"""
    # 先頭スラッシュやバックスラッシュを許さない（相対パス必須）
    if not rel or rel.startswith(("/", "\\")) or ":" in rel:
        return None
    # ファイル名のみ受付（サブディレクトリは現状不要）
    if "/" in rel or "\\" in rel or rel.startswith("."):
        return None
    if not rel.endswith(allow_ext):
        return None
    # 名前は英数字+アンダースコア+ドット+ハイフンのみ
    if not re.fullmatch(r"[A-Za-z0-9_.\-]+", rel):
        return None
    target = (ROOT / allow_dir / rel).resolve()
    base = (ROOT / allow_dir).resolve()
    # 解決後パスが許可ディレクトリ配下にあることを再確認
    try:
        target.relative_to(base)
    except ValueError:
        return None
    return target


def _atomic_write(path: Path, content: str) -> None:
    """同じディレクトリに一時ファイルを作り、書き終えてから rename。"""
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(prefix=".tmp_editor_", dir=str(path.parent))
    tmp = Path(tmp_name)
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        # Windows でも os.replace は原子的
        os.replace(tmp, path)
    except Exception:
        try:
            tmp.unlink(missing_ok=True)
        except Exception:
            pass
        raise


class EditorHandler(SimpleHTTPRequestHandler):
    # プロジェクトルートを基準にして静的配信
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        # アクセスログは控えめに
        sys.stderr.write(f"[editor] {self.address_string()} - {fmt % args}\n")

    def end_headers(self):
        # ローカル編集中のキャッシュを切る（編集して即リロード反映できるように）
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/assets":
            return self._handle_list_assets()
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/save/scenario":
            return self._handle_save("scenarios", ".md")
        if parsed.path == "/api/save/locale":
            return self._handle_save("locales", ".json")
        self._send_json(404, {"error": "unknown endpoint"})

    def _handle_list_assets(self) -> None:
        """assets ディレクトリ配下を走査して、エディタの選択肢に使う一覧を返す。"""
        def list_files(rel_dir: str, exts: tuple[str, ...]) -> list[str]:
            target = (ROOT / rel_dir).resolve()
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                return []
            if not target.is_dir():
                return []
            out = []
            for p in sorted(target.iterdir()):
                if p.is_file() and p.suffix.lower() in exts:
                    out.append(p.name)
            return out

        def list_basenames(rel_dir: str, exts: tuple[str, ...]) -> list[str]:
            # 拡張子を取り除いた basename のソート済み一覧
            seen = set()
            for name in list_files(rel_dir, exts):
                stem = name.rsplit(".", 1)[0]
                seen.add(stem)
            return sorted(seen)

        def list_char_expressions() -> dict:
            chars_root = (ROOT / "assets" / "images" / "chars").resolve()
            if not chars_root.is_dir():
                return {}
            out = {}
            for d in sorted(chars_root.iterdir()):
                if not d.is_dir():
                    continue
                exprs = list_basenames(f"assets/images/chars/{d.name}", (".png", ".webp", ".jpg", ".jpeg"))
                if exprs:
                    out[d.name] = exprs
            return out

        payload = {
            "bg": list_basenames("assets/images/bg", (".webp", ".png", ".jpg", ".jpeg")),
            "stills": list_basenames("assets/images/stills", (".webp", ".png", ".jpg", ".jpeg")),
            "bgm": list_files("assets/audio/bgm", (".mp3", ".ogg", ".wav")),
            "se": list_files("assets/audio/se", (".mp3", ".ogg", ".wav")),
            "chars": list_char_expressions(),
        }
        self._send_json(200, payload)

    def _handle_save(self, allow_dir: str, allow_ext: str) -> None:
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > 10 * 1024 * 1024:  # 10MB 上限
            return self._send_json(400, {"error": "invalid content length"})
        raw = self.rfile.read(length)
        try:
            payload = json.loads(raw.decode("utf-8"))
        except Exception as e:
            return self._send_json(400, {"error": f"invalid json: {e}"})

        file_name = payload.get("file")
        content = payload.get("content")
        if not isinstance(file_name, str) or not isinstance(content, str):
            return self._send_json(400, {"error": "file and content required"})

        target = _resolve_safe_path(file_name, allow_dir, allow_ext)
        if target is None:
            return self._send_json(400, {"error": "path not allowed"})

        # locales の場合は JSON として valid かサーバ側でも検証
        if allow_ext == ".json":
            try:
                json.loads(content)
            except Exception as e:
                return self._send_json(400, {"error": f"json validation failed: {e}"})

        try:
            _atomic_write(target, content)
        except Exception as e:
            return self._send_json(500, {"error": f"write failed: {e}"})

        # bytes はファイルサイズ（UTF-8 バイト数）、chars は文字数
        encoded_bytes = len(content.encode("utf-8"))
        self._send_json(200, {
            "ok": True, "file": file_name,
            "chars": len(content),
            "bytes": encoded_bytes,
        })

    def _send_json(self, status: int, obj: dict) -> None:
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> int:
    print(f"[editor] root = {ROOT}")
    print(f"[editor] open http://{HOST}:{PORT}/editor/ in your browser")
    print(f"[editor] press Ctrl+C to stop")
    with ThreadingHTTPServer((HOST, PORT), EditorHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[editor] stopped")
    return 0


if __name__ == "__main__":
    sys.exit(main())
