# PLiCy・itch.io向け配布

2026-10-24、ゲーム1.4.3のitch.io版を英語初期設定・デバッグOFFで再作成した。masterも通常時はデバッグOFF。公式サイトと同じ日英シナリオ・採用音声を含む。掲載ページへの今回のZIPのアップロードは行っていない。

## 完成データ

itch.io最新版：`D:/AI/stella-distributions-20261023/build-20261024-001153/`

PLiCy版：`D:/AI/stella-distributions-20261023/build-20261023-194732/`（今回再作成していない）

| 配布先 | ZIP | ZIP容量 | 展開後容量 | ファイル数 |
| --- | --- | --- | --- | --- |
| PLiCy | `stella-plicy-v1.4.3.zip` | 682,573,873 bytes | 683,791,930 bytes | 2,771 |
| itch.io | `stella-itchio-v1.4.3.zip` | 482,405,447 bytes | 484,374,829 bytes | 508 |

`stella-upload-kit.zip` は紹介文・投稿手順・実ゲーム画面10枚。`upload-kit/` に展開済みの同内容がある。
今回のitch.io用キットには `D:/AI/stella-promotion-20261023/english/` の英語画面10枚を収録。前のPLiCy用キットは `D:/AI/stella-promotion-20261023/mugen/` の日本語画面を収録している。

## 構成

`tools/build_distributions.py` が設定・シナリオ・実行コードの参照から必要ファイルを抽出する。
旧素材、旧OP、未採用音声、編集用PSD、開発資料、レポート、`.git`、`.env`、`debug.log`、`dev-preview` は配布しない。
元のリポジトリ内の素材は削除しない。`LICENSE` と日英の簡単なreadmeを両方へ収録する。
ZIP直下は `index.html`。ゲーム内からの作品紹介リンクは公式紹介ページのHTTPS URLへ変える。
masterは通常時のデバッグ設定をOFFにする。配布版もデバッグ設定をOFFに固定し、GA計測を無効にする。フォントは通常版と同じ任意のWebフォントで、外部通信がなくても代替フォントで起動できる。

### PLiCy

OPは原版1920×1080、画像・BGM・SE・2392件のボイスは元ファイル。
HTMLの画面を持つ独自エンジンのため、`plicy-thumbnail.js` がDOMの先頭にcanvasを作り、代表的な実ゲーム画面を描く。
PLiCyの「最初のcanvas」のサムネイル取得をローカルで模擬確認する。ミニLP等で現在の場面を再撮影する機能はなく、代表画面は固定。
通常のゲーム表示・入力はHTMLのままで、外部サイトのiframe表示へ置き換えない。

### itch.io

- 初期言語は英語（EN）。master／PLiCyの日本語初期設定は維持する。タイトル・CONFIGから切り替えられ、保存された言語の選択を優先する。
- 日英の全2392音声を129個の約1MiB以下のパックに分け、必要な音声だけMP3のバイト列へ戻して既存プレイヤーへ渡す。全音声のバイト一致をビルド時に確認。manifest、台詞ID、採用テイク、gainDb、ボイス再生処理は維持する。
- 配布版の `voice.js` だけに専用fetch依存を設定する。通常のfetchや公式版のコードは書き換えない。
- 同じパックの取得を共有し、個別キャンセルは別の音声を止めない。最後の待機者が消えると取得を中止。圧縮されたパックのキャッシュは12MiBまで。失敗や途中切断はキャッシュから外して再試行できる。
- PNGをlossless WebPへ変換。RGBAの全画素と寸法の一致を確認し、プリロード・表示・拡張子指定を配布物内で揃える。
- 日英OPは1280×720、H.264 CRF23／最大1500kbpsに変換。映像の内容とタイミングを維持し、AACは再圧縮せずコピーしてハッシュを照合する。
- 展開後500,000,000 bytes以下、1000ファイル以下、単一200,000,000 bytes以下、パス240文字以下を満たさなければビルドを失敗させる。

## 再作成

Pillow、NodeまたはVS CodeのNode、FFmpegが必要。実行例：

```powershell
py tools/build_distributions.py --output D:/AI/stella-distributions-20261023 --thumbnail D:/AI/stella-promotion-20261023/mugen/screen01.jpg --screenshots D:/AI/stella-promotion-20261023/mugen

# itch.ioだけを英語初期設定で再作成
py tools/build_distributions.py --profile itchio --output D:/AI/stella-distributions-20261023 --screenshots D:/AI/stella-promotion-20261023/english
```

`--node`、`--ffmpeg` で実行ファイルを指定できる。未指定時のフォールバックはこの作業環境のVS Codeと既存OP制作環境のFFmpeg。
`--profile itchio` または `--profile plicy` で片方だけを作成できる。省略時は両方を作る。
出力は毎回別の `build-日時/` に作る。画像・動画の変換キャッシュは入力のSHA-256と変換設定で分離する。
最新の完成フォルダーは親フォルダーの `latest.txt` に記録する。投稿には上記の完成フォルダーのZIPを使う。

## 検証

- `node --test tools/check_distribution_assets.cjs`：6項目成功。共有取得、音声バイト列、個別／全キャンセル、切断復旧、通常fetch、キャッシュ上限を確認。
- `py tools/check_distributions.py --build D:/AI/stella-distributions-20261023/build-20261023-194732 --profile plicy`：全背景・立ち絵全表情・CG、日英OP、実ボイス、サムネイルcanvas、おまけ画像、保存／読込・ログ、SOUND MODE・音量メーター・ダウンロード先、スマートフォン横向きを確認。外部HTTPSはブロックした状態。
- itch.io最新版は `--build D:/AI/stella-distributions-20261023/build-20261024-001153 --profile itchio`。6項目成功。新規ブラウザープロファイルでEN初期設定・デバッグOFF・デバッグUI非表示・英語OPの初回起動を確認。sandbox付きiframeで、相対パス・音声パック・日英動画・保存・画面サイズも確認。不足アセット・ブラウザー例外なし。結果は完成フォルダーの `verification/` に記録。
- 完成ZIPの全メンバーを読み、CRC・SHA-256・ファイル数・展開後サイズを照合。軽量化した日英OPも全3086フレームをデコードできることを確認。`verification/integrity.json` と `SHA256SUMS.txt` に結果を保存。

最新版の2392音声は前の完成版と全件同じSHA-256。音声パック補助スクリプトの差はGitチェックアウトによる改行形式のみ。今回の動画は検証済みの同じ変換キャッシュを再利用している。

検証サーバーは実CDNに近いHTTP/1.1と厳密なファイル名照合で配信する。HTTP/1.0で多数の画像の接続を開閉した初期検証では一部の先読みが失敗したため、画像の単独デコードで元ファイルが正常であることを確認して配信条件を修正した。

実サイトの変換・埋め込み・保存先は、アップロード後の非公開プレビュー／テストプレイで最終確認する。公式サイトと両投稿先のセーブデータは自動共有されない。

## 仕様の参照

- [PLiCy HTML5 FAQ](https://plicy.net/ToolFAQ/HTML5)
- [itch.io HTML5投稿](https://itch.io/docs/creators/html5)
- [itch.io AI使用の表示](https://itch.io/docs/creators/quality-guidelines#ai-disclosure)

紹介文は本編中心で、おまけの具体的なネタや展開を記載しない。AI使用の登録欄には画像・音声・文章・コードの利用を記入する。
