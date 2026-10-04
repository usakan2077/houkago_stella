# 放課後のステラ　嘘と願いのバウンドリー

恋愛アドベンチャーゲーム（ブラウザ動作・バニラJS）

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

## 起動時のOPとタイトル待機

ロード完了後に「OK」を押すと、完成版OP（`assets/video/stella-op.mp4`）を音付きで再生します。終了・スキップ時は0.65秒で暗転し、タイトル画面を0.45秒で表示します。クリック・Enter・Space・Escでスキップできます。OPの音量はCONFIGのBGM音量に従います。

タイトル画面で約10秒無操作になるとOPを再上映します。マウス・タッチ・キー・ホイール操作で待機時間をリセットし、設定・ロード・ギャラリー・デバッグメニューの表示中、ゲーム中、非アクティブなタブでは再上映しません。再生がブラウザーに制限された場合は再生ボタンを表示し、動画の読み込みに失敗した場合はタイトルに進みます。

`config.js` の `openingMovie` と `openingMovieIdleMs` で動画と待機時間を指定します。NEW GAME後の導入動画 `introVideo` は別のものです。

Windows / Edgeでの動作確認は `python tools/check_opening_movie.py` で実行できます。専用ゲストプロファイルとローカルサーバーを使用し、確認結果・画像をリポジトリの隣の `stella-op-integration-check/` に保存します。

## プロジェクト構成

```
houkago-stella/
│
├── index.html          ← エントリポイント（DOM構造）
├── style.css           ← 全スタイル
├── game.js             ← ゲームエンジン本体（VNEngine クラス）
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
│       │   ├── title.mp4   ← オープニング動画
│       │   └── *.jpg       ← 背景画像（1920×1080）
│       │
│       └── chars/
│           ├── README.md       ← 立ち絵仕様・表情一覧
│           └── {キャラID}/
│               └── {表情}.png  ← 立ち絵（透過PNG推奨）
│
├── プロット.md         ← シナリオ構成・各ルートあらすじ
└── キャラクターシート.md ← キャラクター設定資料
```

---

## シナリオファイルの構文

```
# ラベル名
@scene 背景キー [fade|cut]       ← 背景切替
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
