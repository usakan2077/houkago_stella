# 編集ファイルの案内

日英の本文・話者・音声の確認は [シナリオ・音声索引](scenario-reference/index.html) から始める。Excel用CSVと章別Markdownも同じフォルダーにある。索引は参照専用で、編集後に再生成する。

|目的|編集元・入口|
|---|---|
|ゲーム設定・キャラ・背景・バージョン・更新履歴|`config.js`|
|日本語の進行・表情・演出|`scenarios/*.md`|
|英語の進行・表情・演出|`scenarios/en/*.md`|
|表示本文|`locales/scenario.ja.json` / `scenario.en.json`|
|画面で本文・コマンドを編集|`editor/`（起動は同フォルダーのREADME参照）|
|音声の登録先・音量|`assets/voice/ja/manifest.json` / `en/manifest.json`|
|音声・テキストIDの対応を探す|[本文・音声索引](scenario-reference/index.html) / [CSV](scenario-reference/scenario-voice.csv)|
|ボイス生成の原本・台本・比較|隣接する `houkago-stella-voice/`|
|背景・立ち絵・スチルの原本|隣接する `houkago-stella-assets/assets-src/`|
|再生成済みの本文・音声資料|`docs/scenario-reference/`|
|テストプレイヤーの報告原文|`デバッグ用/`|
|プロット・キャラクター設定資料|`docs/design/`|
|エモート・メッセージUIの比較画面|`tools/previews/`（[入口](../tools/previews/README.md)）|

2026-10-20の整理で、ルート直下の設計資料2本は `docs/design/`、開発用HTML2本は `tools/previews/` へ移動した。相対リンクと共有CSS・画像の参照も更新済み。ゲームの入口と読込先、既存セーブの本文・音声IDは維持する。

`manifest.json` の `clips` はテキストIDをキーにし、`src` が音声のパス、`gainDb` がゲーム内の音量補正。音声は現役を言語・章別、旧テイクをarchiveへ分類し、manifestのsrcだけを更新した。ファイル名や台詞IDを振り直す必要はない。音声ファイルを探す際は索引で章・話者を絞り込む。

日本語と英語では、一文の長さに合わせた分割数が異なる。実行用の2つのmdは保持し、エディターで英語だけの追加行も表示する。既存の `$...` キーは既読・音声との対応に使うため、整理目的での改名や連番化は行わない。

追記したlocaleキーも、次のコマンドで各言語の再生順へ並べ直す。未参照の既存キーは削除しない。

```powershell
python tools/format_scenarios.py
python tools/build_scenario_reference.py
python tools/check_scenarios_i18n.py
```
