# assets-src — 素材元データ置き場

ゲームに組み込む前の**編集用元データ**をここに置きます。  
書き出し済みのゲーム用ファイルは `assets/images/` に入れてください。

---

## ディレクトリ構成

```
assets-src/
  bg/       背景画像の元データ
  stills/   スチル絵（イベントCG）の元データ
  chars/    立ち絵の元データ
```

---

## 書き出しルール

### 背景 (`assets/images/bg/`)
| 項目 | 規格 |
|---|---|
| サイズ | 1280×720px 以上推奨 |
| 形式 | WebP（推奨）または PNG |
| 命名 | `config.js` の `backgrounds` キーと一致させる |

### スチル絵 (`assets/images/stills/`)
| 項目 | 規格 |
|---|---|
| サイズ | 1280×720px（ゲーム画面と同じ） |
| 形式 | WebP（推奨）または PNG |
| 命名 | シナリオの `@still 画像名` と一致させる（例: `sakura_embrace.webp`） |

### 立ち絵 (`assets/images/chars/キャラ名/`)
| 項目 | 規格 |
|---|---|
| サイズ | 高さ 900px 以上推奨（縦長） |
| 形式 | PNG（透過必須） |
| 命名 | `表情名.png`（例: `normal.png`, `happy.png`） |
| 表情一覧 | `config.js` の各キャラの `expressions` を参照 |

---

## 注意

- 元データ（PSD・Clip Studio・SAI等）はファイルサイズが大きいため、  
  Git LFS の導入を検討中です。大きいファイルを追加する前に確認してください。
- ゲームへの反映は**書き出し済みファイルを `assets/images/` に置くだけ**で完了します。
