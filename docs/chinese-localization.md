# 中国語対応（1.4.7・未公開）

2026-11-17。簡体字 `zh-CN` と繁体字 `zh-TW` を追加。韓国語は後回し。外部翻訳サービスは使用せず、こちらで日本語原文から簡体字原稿を作成。繁体字はWindowsのオフライン文字変換を基に地域用語を調整した。中国語母語話者による全編校閲は未実施。

## 対応範囲

- 本編3,460項目・おまけ285項目を両表記に翻訳。台詞ID・話者・分岐・演出を日本語版と共有し、セーブ位置と音声IDを維持。
- 操作画面、両紹介ページ、更新履歴、CG・曲名、クレジット、歌詞、おまけの掲示板・新聞SVGを翻訳。
- 保存済み設定がなければブラウザの中国語の地域に応じて初期表記を選択。タイトル・CONFIG・紹介ページで4言語を手動選択可能。
- 中国語表示は各表示に対応する普通話音声を再生。日英の録音・manifestは保持。OPは既存の日本語版を使用。
- 中国語はOSの地域別フォントを使用し、追加Webフォントは不要。
- タイトルロゴ・LPポスター・共有画像・キャンペーン画像も両表記に対応。スマホの回転・ホーム画面追加案内も翻訳。

ゲームと両LPのバージョン・公開履歴・キャッシュ用URLは1.4.7に統一。ブランチは `feat/chinese-localization`。PRでレビューし、本流への統合・本番公開は別途行う。

## 原稿とビルド

原稿は `locales/chinese-drafts/*.txt`。番号は同フォルダーの `scenario-source-index.json` / `bonus-source-index.json` に対応。日本語本文やキー順が変わるとビルダーが停止するので、原文と対訳を照合して更新する。

```powershell
py tools/build_chinese_text.py
py tools/build_chinese_ui.py
py tools/build_bonus_scenario.py
py tools/build_chinese_text.py --check
py tools/check_scenarios_i18n.py
```

UI原稿は `ui-source.json` と `ui.txt`、追加文言は `ui-extra.json`。辞書と `chinese-locales.js` を生成する。実行時にも翻訳APIを呼ばない。旧作業フォルダーの外部翻訳スクリプトは起動時に停止するよう無効化済み。

## タイトル画像とLP

タイトルは簡体字「放学后的星光：谎言与愿望的边界」、繁体字「放學後的星光：謊言與願望的邊界」に統一。元の星・五線譜・淡い紫のロゴデザインを基に両表記を制作し、透明PNGの元素材を `houkago-stella-assets/assets-src/chinese-promo-v1/` に保存した。ポスター・OG画像・キャンペーン画像も同フォルダーで管理。配信用は [画像登録記録](chinese-promo-assets.json) の8点を参照。

```powershell
py tools/convert_chinese_promo.py
py tools/build_chinese_ui.py
py tools/build_chinese_landing_pages.py
py tools/check_chinese_artwork.py
```

変換はPillowで寸法とWebP/PNG形式を揃える。ロゴは透明度を維持し、共有画像は1200×630px。画像生成は別作業であり、これらのビルドコマンドから生成APIや翻訳APIを呼ばない。

中国語を選択すると、ゲームのタイトルと両LPの画像を同じ表記へ切り替える。キャンペーンのサムネイルと詳細画像も追従し、日本国内在住者という参加条件を両表記の画像・本文で維持。日英へ戻した際は既存画像を使う。

共有・検索用の入口は `lp/index.zh-CN.html` / `lp/index.zh-TW.html`、制作紹介版は `lp/ai/index.zh-CN.html` / `lp/ai/index.zh-TW.html`。本文・タイトル・canonical・OG画像は静的HTMLへ書き出すため、JavaScriptを実行しないクローラーにも中国語の情報を返す。本文やUIの変更後は再ビルドする。元の日本語文言も属性へ保持し、生成したページ内でも4言語を切り替えられる。

明示的なURLの `?lang=zh-CN` / `?lang=zh-TW`、中国語専用入口、保存済み設定、ブラウザ言語の順で初期言語を選ぶ。LPのプレイボタンは選択言語をゲームURLへ引き継ぐ。別言語を選ぶとURLも更新し、再読込で古い言語へ戻らない。

外部ネットワークを遮断した実Edgeで、通常LPと中国語専用4ページの画像・音声試聴、4言語の往復、スマホ320px／390px、キャンペーン条件、ゲームタイトルの横画面表示を確認。画像・レポートは `D:/AI/stella-chinese-artwork-check-20261117/`。

## 音声台本

[最新台本v3](../../houkago-stella-voice/acting-scripts/chinese-v3-20261117/README.md) に各言語1,196台詞（本編1,040＋おまけ156）を収載。章別・役別MarkdownとJSONを用意し、原文、中国語表示本文、音声用本文、前後文脈、個別演技、暫定配役を台詞IDで対応させた。[読み・表記メモ](../../houkago-stella-voice/acting-scripts/chinese-v3-20261117/pronunciation-guide.md)も参照。

主人公・地の文・選択肢は無音。文脈資料には含むが、別の選択肢や場面をまたいで連結しない。旧台本は保持。

## 中国語音声

2026-11-17の生成依頼に基づきElevenLabsで制作。モデル `eleven_v4`、`language_code: zh`、MP3 44.1kHz/128kbps。既存12役のVoice IDとAPIでの利用可否、中国語対応を照合した。外部翻訳サービスは使用していない。

各表示言語1,196台詞（本編1,040＋おまけ156）。同じ音声本文・Voice・演技・前後文脈は両表記で共有し、地域用語が異なる44件は別収録。配信ファイルは計1,240件。繁体字版も標準中国語であり、広東語・台湾語の音声ではない。

普通話の音声入力はオフラインで簡体字へ正規化。固有名詞は中国語読みとし、「咲」は教育部異体字辞典のxiàoに従い音声用だけ「笑」に変換した。表示本文は変更しない。演技タグと前後文脈を付け、採用済みの個別演技を維持する。

全件のMP3フレーム・デコード・長さ・有声音RMS・サンプルピーク・SHA-256を照合。既存日本語版の役別補正後RMSを目標として新録音を測定し、各ファイルの補正後ピークを-1dBFS以下に制限した。LUFS・真のピーク・BGMとの合成ピークは未測定。

生成計画・request ID・元音声は制作フォルダーの `samples/chinese-v1-20261117/` に保持。ゲーム側は [測定・登録記録](chinese-voice-audit.json) と `assets/voice/zh-CN/manifest.json` / `zh-TW/manifest.json` を参照。実ファイルは `assets/voice/zh/chinese-v1-20261117/` に版付きで配置。APIキーや制作環境の.envは配布しない。ゲーム内で生成APIを呼ばない。

全件の試聴ページは [audition.html](../../houkago-stella-voice/samples/chinese-v1-20261117/audition.html)。機械検査は発音・演技の正しさを保証しない。母語話者による全件試聴は未実施。

## 検証

- 全4言語：12スクリプト・190ラベル・7結末。本文ID集合・分岐・演出・素材参照が一致。
- Node：全本文・選択肢・結末、中国語音声・ログの言語対応、全NPC台詞の音声収録と本文ハッシュ、音声ファイルのハッシュ・音量、既存日英全音声、失敗時の再取得、フォント等。
- 実Edge：両紹介ページの4言語切替、320px／390pxで横はみ出しなし。英語表示から中国語セーブを読んでも中国語本文と中国語音声へ復元。
- 音声台本4項目：各言語1,196件、主人公除外、分岐内の文脈、翻訳済み本文、おまけの採用済み演技を維持。

ブラウザ記録・画像は `D:/AI/stella-chinese-check-20261117/`。全ルートの人による通しプレイ、中国語の全件試聴は今回の検証に含めない。
