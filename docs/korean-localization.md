# 韓国語対応・確認記録

2026-11-18、1.4.8。中国語対応PR #18を土台にした追加。韓国語対応はPR #19、公開先は https://www.houkago-stella.com/ 。

## 対象と編集元

| 対象 | 韓国語対応 |
| --- | --- |
| 本文・分岐・選択肢・締め | 本編3,460＋おまけ285件、既存のID・コマンド・7エンディングを維持 |
| 操作画面 | 766項目、タイトル・CONFIG・ログ・セーブ・サウンドモード等 |
| 音声 | 本編1,040＋おまけ156台詞、12役、1,196ファイル、計3,865.44秒 |
| 紹介ページ | 通常・AI制作版、静的共有情報、試聴、ゲームへの言語引継ぎ |
| 画像 | ロゴ・ポスター・OG・OPノート、おまけSVG3種 |
| OP | 韓国語の人名・台詞・ノート・ロゴ、1080p/30fps/3,086フレーム |
| 字幕・ホーム画面 | 16区間の韓国語歌詞字幕、言語別manifest |

翻訳はエージェントがローカルの原文から作成し、外部翻訳サービスを使用していない。原稿は `locales/korean-drafts/`、本文出力は `scenario.ko.json` / `bonus.ko.json`、UI出力は `ui.ko.json` / `korean-locales.js`。`tools/build_korean_text.py` は日本語原文ハッシュ・ID順・件数・変数・HTMLを照合し、`build_korean_ui.py` はUIとSVGを出力する。

表記は「방과 후의 스텔라: 거짓과 소원의 경계」。主要人物は 키리시마 이사무 / 사쿠라자키 사쿠라 / 하나조노 코토하 / 츠키요노 마히루 / 노부하라 하루토。人名は既存の読み資料を参照。日本の舞台・校章・出典名・公式ハッシュタグは保持する。

`ko` / `ko-KR` 等のブラウザー言語を認識し、明示URL・保存した設定と合わせて既存の言語選択規則に従う。韓国語の書体は端末の対応フォントを使用する。本文の地の文に含むメッセージは引用符を復元し、引用内の句読点で文章を分割しない。

## 音声と台本

ユーザーの音声生成・少数STT許可を引き継ぎ、既存クレジット内で実施。eleven_v4の韓国語対応と既存12役をAPIで確認し、`language_code=ko`、MP3 44.1kHz/128kbpsで生成した。主人公・地の文は無音で、分岐・場面を越えない前後文脈として使用。演技資料は既存の役・個別指示・おまけことはの真剣な演技方針を引き継ぐ。

全件のハッシュ・デコード・時間・有声音RMS・サンプルピークを確認し、役別の既存日本語RMSを目標にゲインを補正。補正後サンプルピークの最大は約-1.052 dBFS。これはLUFS、真のピーク、BGMとの合成ピーク、聴感の合格判定ではない。[全件記録](korean-voice-audit.json)

同じElevenLabsのSTTに16件を送り、14件は一致または表記差、2件は要試聴とした。短い「이사무. 여기.」の人名、番外の「해설의 엔 씨」の助詞・N表記に差がある。認識差だけで誤読と断定せず、リテイクはしていない。全件の発音・アクセント・演技の試聴は未完了。[STT記録](korean-voice-sample-review.json)

生成台本 `../houkago-stella-voice/acting-scripts/korean-v1-20261118/` は原本として残す。現在の本文に対応したv2台本は `korean-v2-20261118/`。生成後の差分は無音の地の文8件の引用符だけで、NPC1,196件の本文は全て一致。人の承認フラグを代わりに付けてはいない。[原本・現行本文の照合](korean-recording-provenance.json)

全件の試聴は `../houkago-stella-voice/samples/korean-v1-20261118/audition.html`、16件の比較は `pilot-review.html`。制作フォルダー・生成計画・API鍵は公開用リポジトリに含めず、ゲーム用MP3と測定記録だけを収録する。

## 画像とOP

組み込みimagegenで既存デザインの文字を韓国語化し、Pillowで配信形式へ変換した。編集用4PNG・使用プロンプト・レンダラーは別素材リポジトリの `assets-src/korean-release-20261118/`。ゲームには書き出し済み画像を収録する。[画像ハッシュ](korean-promo-assets.json)

OPは既存編集データを用い、変更のない3区間を再利用。日本語歌唱の元AACはコピーし、韓国語歌詞を外部VTTで重ねる。全フレームのデコード、元音源ハッシュ、共通区間の画素を照合した。旧日本語・英語OPは変更していない。[OP検証](korean-op-production.json)

キャンペーンは国判定が日本で、表示言語が日本語のときだけ表示する。韓国語では日本からのアクセスでもバナー・応募ルール・コード・応募ハッシュタグを隠し、通常の完了記録と共有は利用できる。

## 検証

- `py tools/build_korean_text.py --check` / `py tools/build_chinese_text.py --check`
- `py tools/check_scenarios_i18n.py` / `py tools/test_narration_sentences.py` / `py tools/build_op_subtitles.py --check`
- Nodeの韓国語・中国語ローカライズ、全件音声、シナリオ取得、音声制御、フォント検査。
- `py tools/check_korean_browser.py`：両LPの実音声・OP・16字幕、静的共有情報・画像・manifest、5言語往復、320/390px、本編の本文・音声・ログ、英語から韓国語セーブの復元、OP実再生とスキップ。
- `py tools/check_multilingual_media.py` / `py tools/check_chinese_artwork.py`：英語・中国語の既存画像・LP・OP・字幕の回帰確認。
- `py tools/check_bonus_scenario.py --campaign-country-only`：5言語・全11入口の表示制限、完了記録の共有文、地域・通信失敗時の非表示。

ブラウザー検証は隔離Edgeとローカルサーバーを使用し、外部計測・翻訳通信は遮断。証跡はリポジトリ外の `stella-korean-check-20261118/` 等へ保存する。母語話者による最終校閲、全音声の主観試聴、iOS/Android実機のインストール確認は未実施。
