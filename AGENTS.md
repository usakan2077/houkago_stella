# 放課後のステラの作業ルール

- ユーザーとのやり取りは日本語で行う。
- ブランチ・素材管理の正式な手順は `docs/development.md` を参照する。
- 本流は `master`。作業ごとに最新の本流から `feat/*`、`fix/*`、`docs/*` 等を作る。
- 途中のボイス実装とシナリオ・演出の見直しは `feat/voice-implementation` で進める。未完成の機能を運用変更とまとめて本流に統合しない。
- 作業ブランチは squash merge で本流へ統合し、完了後に削除する。長期の `assets-dev` は今後の作業に再利用しない。
- 編集用元素材は隣の `houkago-stella-assets/assets-src/` で管理する。ゲームの `assets-src/` を追加・強制追加しない。
- ゲームで使う書き出し済み素材は `assets/` へ追加する。
- 画像変換は Python Pillow を使う。変換ツールは `STELLA_ASSETS_SRC` で元素材の置き場を変更できる。
- 既存の履歴を整理するための rebase、reset、force push は行わない。
