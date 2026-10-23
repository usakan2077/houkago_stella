# 放課後のステラ　嘘と願いのバウンドリー

現行版：**ver 1.4（2026-10-23）**。変更点は [更新履歴](CHANGELOG.md) を参照。

恋愛アドベンチャーゲーム（ブラウザ動作・バニラJS）

## 開発と素材の管理

本流は `master` です。作業ごとに本流からブランチを作り、完了した変更を squash merge で統合します。編集用元素材は隣の `houkago-stella-assets/assets-src/` で管理し、このリポジトリにはゲームで使う書き出し済み素材を保存します。具体的な手順は [開発運用](docs/development.md) を参照してください。

---

## ローカルサーバーの起動

`file://` で直接開くと音声・動画がブロックされるため、**必ずローカルサーバー経由で起動**してください。

### Python（推奨）

```bash
cd houkago-stella
py -m http.server 8080
```

ブラウザで `http://localhost:8080` を開く。

> Windows で `python` コマンドが動かない場合は `py` を使用してください。
> ポートが使用中のエラー（WinError 10013）が出た場合は番号を変えてください：
> `py -m http.server 3000` → `http://localhost:3000`

### Node.js

```bash
cd houkago-stella
npx serve -l 3000 .
```

ブラウザで `http://localhost:3000` を開く。

### VS Code

拡張機能 **Live Server** をインストールし、`index.html` を右クリック →「Open with Live Server」。

---

## クリア後のおまけ

さくら・ことは・まひる全員のGOOD ENDを達成すると、第4章冒頭の文化祭準備の会話に選択肢が追加されます。「いっそ、好きにやってみるか」を選ぶとオマケシナリオへ進めます。分岐前のセーブから再開するか、新しく始めて第4章まで進めてください。タイトルメニューにオマケの項目は追加されません。

日英の音声、専用画像・動画、集合エンドカード付き。注意画面で辞退すると本編の続きへ戻ります。いずれかのエンディングを見た後は、タイトルの「サウンドモード」でBGMやOP・ED曲も聴けます。

## おまけのローカルデバッグ

`run-local-debug.cmd` を実行すると専用サーバーとブラウザーが起動します。コマンドの場合は `py tools/run_local_debug.py`。URLは `http://127.0.0.1:8885/index.html` です。

ロード後にOKを押し、OPをスキップしたタイトル画面でF2を押して「DEBUG JUMP」を表示します。デバッグ設定が有効なら、メニュー内の「おまけ」から未クリアでも開始でき、図書室・麻雀・掲示板・AA・ゆっくり・爆発オチへ直接移動できます。URLパラメータは不要です。全END記録を付与する操作は行いません。専用ポートは公開版と異なる保存領域を使います。[詳しい説明](docs/bonus-scenario.md)

## 起動時のOPとタイトル待機

ロード完了後に「OK」を押すと、完成版OP（`assets/video/stella-op.mp4`）を音付きで再生します。終了・スキップ時は0.65秒で暗転し、タイトル画面を0.45秒で表示します。クリック・Enter・Space・Escでスキップできます。OPの音量はCONFIGのBGM音量に従います。

タイトル画面で約30秒無操作になるとOPを再上映します。マウス・タッチ・キー・ホイール操作で待機時間をリセットし、設定・ロード・ギャラリー・デバッグメニューの表示中、ゲーム中、非アクティブなタブでは再上映しません。再生がブラウザーに制限された場合は再生ボタンを表示し、動画の読み込みに失敗した場合はタイトルに進みます。

`config.js` の `openingMovie` と `openingMovieIdleMs` で動画と待機時間を指定します。NEW GAME後の導入動画 `introVideo` は別のものです。

Windows / Edgeでの動作確認は `python tools/check_opening_movie.py` で実行できます。専用ゲストプロファイルとローカルサーバーを使用し、確認結果・画像をリポジトリの隣の `stella-op-integration-check/` に保存します。

## 台詞ボイス

2026-10-13、全編の日英ボイスを収録・登録済みです。配役と制作手順、改稿時の既存音声の扱いは [ボイス制作仕様](../houkago-stella-voice/ボイス制作仕様.md) を参照してください。

主人公以外の台詞に、先読み付きの音声再生を組み込んでいます。現在の台詞と先の3台詞を読み込み、スキップ中は再生・取得を止めます。ログからの再生とCONFIGのボイス音量に対応しています。全12役・全分岐の日本語1,040台詞と英語1,040台詞を収録済み。主人公・地の文・選択肢は無音です。ことははLeiraによる控えた演技の録音を採用しています。表示言語に合わせて音声も切り替わります。

音声ファイルの登録方法・動作仕様は [docs/voice.md](docs/voice.md) を参照してください。制御テストは `node --test tools/check_voice.cjs`、Windows / Edgeでの結合確認は `python tools/check_voice_browser.py` です。ブラウザテストでは合成したテスト音を使い、証跡はリポジトリの隣の `stella-voice-integration-check/` に保存します。

## メッセージウィンドウの透明度

CONFIGの「ウィンドウ透明度」で背景と名前欄を調整できます。0%は不透明、100%は透明、初期値は20%です。文字・名前・ボイス表示は薄くしません。プレビューで見え方を確認でき、パレットや言語を変更しても同じ透明度を維持し、再起動後も復元します。

通常の場面切り替えは1.2秒。45度回転したタイルが画面全体を覆った中央で、0.15秒の暗転待ちを入れて背景を切り替えます。`python tools/check_display_settings.py` で画面比率別のピクセル被覆と暗転時間、透明度・プレビュー・設定復元を検査できます。

編集先と開発用画面の入口は [ファイル構成ガイド](docs/project-map.md) を参照してください。

## プロジェクト構成

```
houkago-stella/
│
├── index.html          ← エントリポイント（DOM構造）
├── style.css           ← 全スタイル
├── game.js             ← ゲームエンジン本体（VNEngine クラス）
├── voice.js            ← 台詞音声の再生・先読み・キャッシュ
├── parser.js           ← シナリオ .md パーサー
├── config.js           ← キャラ・背景・BGM・ゲーム設定
│
├── scenarios/          ← シナリオファイル（Markdown 形式）
│   └── chapter1.md
│
├── assets/
│   ├── audio/
│   │   ├── README.md   ← BGM/SE 一覧・優先度・タイトル一覧
│   │   ├── bgm/        ← BGM（ループ再生） *.mp3
│   │   └── se/         ← 効果音（1回再生） *.mp3
│   │
│   └── images/
│       ├── bg/
│       │   ├── README.md   ← 背景キー一覧・プロット対応表
│       │   └── *.webp      ← 書き出し済み背景画像
│       │
│       └── chars/
│           ├── README.md       ← 立ち絵仕様・表情一覧
│           └── {キャラID}/
│               └── {表情}.png  ← 立ち絵（透過PNG推奨）
│
├── docs/design/        ← プロット・キャラクター設定資料
└── tools/previews/     ← エモート・メッセージメニューの比較画面
```

---

## シナリオファイルの構文

```
# ラベル名
@scene 背景キー [fade|cut|rush]       ← 背景切替
@bgm ファイル名.mp3 / @bgm stop  ← BGM
@se ファイル名.mp3               ← SE
@show キャラID 表情 [left|center|right]
@hide キャラID
@choice                          ← 選択肢ブロック開始
  - 選択肢テキスト >> ラベル名
キャラID「セリフ」
narrator セリフ（地の文）
```

---

## 設定ファイル（config.js）の主要項目

| キー | 内容 |
|------|------|
| `characters` | キャラクター名・名前色・台詞枠色 |
| `backgrounds` | 背景キー → フォールバックグラデーション |
| `settings` | タイプ速度・音量・フェード時間・デバッグフラグ |
| `scenarioFiles` | 読み込むシナリオファイルの順序 |
| `scenarioFilesByLanguage` | 日英それぞれのシナリオ読み込み先 |
| `scenarioTextFiles` | 日英の本文JSON（`locales/scenario.ja.json` / `scenario.en.json`） |
| `titleBGM` | タイトル画面 BGM |
| `clickSE` | ボタンクリック SE |
| `introVideo` | NEW GAME 後に流す動画 |
| `openingMovie` | ロード後・タイトル待機中に流すOP |
| `openingMovieIdleMs` | タイトル無操作時のOP再上映までの待機時間（ミリ秒） |
| `openingBGM` | モノローグ時の BGM |
| `openingLines` | オープニングモノローグのテキスト配列 |

日本語の `scenarios/*.md` と英語の `scenarios/en/*.md` は、同じテキストキー・話者・分岐・演出を使用します。本文は各言語のJSONで編集します。変更後は `python tools/check_scenarios_i18n.py` を実行し、翻訳の参照漏れや表示指示のずれを確認してください。改稿の方針は [改稿メモ](docs/scenario-rewrite-ja.md) にあります。

---

## デバッグモード

`config.js` の `settings.debug` で制御します。

```js
// config.js
settings: {
  // ...
  debug: true,   // ← true でデバッグ機能ON、false でOFF（公開時）
}
```

### 有効時の機能

| 機能 | 操作 |
|------|------|
| **デバッグパネル**（フラグモニター） | `F2` キーでトグル表示 |
| **チャプタージャンプ** | タイトル画面の `⚙ DEBUG JUMP` ボタン |

#### デバッグパネル（F2）

- 現在の `label` / `index` を表示
- **数値フラグ**: 好感度などを `＋ / −` ボタンでリアルタイム編集。好感度フラグ（`*_favor`）はプログレスバーつき。
- **真偽フラグ**: トグルボタンで `true / false` を切替。
- **その他**: 文字列フラグを表示。

### 公開時の設定

```js
debug: false,
```

`false` にすると以下がすべて無効化されます：
- `⚙ DEBUG JUMP` ボタンが非表示
- `F2` キーでのパネル表示なし
- フラグ操作 API (`window._dbg`) も機能しない

---

## 使用素材のクレジット

### フリー音源

| サイト | 利用規約 | クレジット |
|--------|---------|-----------|
| [彩音 ～Taira Komori～](https://taira-komori.net/) | 商用可・クレジット不要 | 任意 |
| [OtoLogic](https://otologic.jp/) | CC BY 4.0・商用可 | **必須**（「OtoLogic」と表記） |
| [効果音ラボ](https://soundeffect-lab.info/) | 商用可・クレジット不要 | 任意 |
| [DOVA-SYNDROME](https://dova-s.jp/) | 商用可・クレジット不要 | 任意 |
| [Springin' Sound Stock](https://www.springin.org/sound-stock/) | 商用可・クレジット推奨 | 推奨 |
| [音人 ～On-Jin～](https://on-jin.com/) | 個人・サークル可（企業は要申請） | 推奨 |

> 詳細な利用規約は [assets/audio/README.md](assets/audio/README.md) を参照。

---

## 実装状況

### エンジン

| 機能 | 状態 |
|------|------|
| タイトル画面・BGM | ✅ |
| オープニングモノローグ | ✅ |
| イントロ動画（title.mp4） | ✅ |
| シナリオ再生・テキスト送り | ✅ |
| 背景切替（フェード/カット） | ✅ |
| キャラクター立ち絵表示 | ✅ |
| BGM / SE 再生 | ✅ |
| 選択肢・ルート分岐・フラグ管理 | ✅ |
| セーブ / ロード | ✅ |
| オート / スキップモード | ✅ |
| スチル（イベントCG）表示 | ✅ |
| 内心ナレーション・締め演出 | ✅ |
| クレジット画面 | ✅ |
| デバッグパネル（F2） | ✅ |

### シナリオ

| 章 | 状態 |
|------|------|
| Ch.1〜8（共通ルート） | ✅ |
| さくらルート | ✅ |
| ことはルート | ✅ |
| まひるルート | ✅ |
| バッドエンド | ✅ |

### 素材

| 種別 | 状態 |
|------|------|
| BGM（29曲） | ✅ |
| SE（28種） | ✅ |
| 背景画像 | ✅ |
| キャラクター立ち絵 | ✅ |
| スチル（イベントCG・37枚） | ✅ |


## 制作ファイルを探す

[ファイル案内](docs/project-map.md) ／ [本文・音声索引](docs/scenario-reference/index.html) ／ [デバッグ報告11の対応状況](docs/debug-report11-status.md)

## デバッグ報告11の音声

23台詞を撮り直し、旧版を保存したまま登録しています。[旧新の比較試聴](docs/voice-review/index.html) / [対応状況](docs/debug-report11-status.md)。
