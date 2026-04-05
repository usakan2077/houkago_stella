# キャラクター画像の配置方法

## フォルダ構成

```
chars/
├── sakura/          ← 桜咲さくら（通常）
│   ├── normal.png
│   ├── happy.png
│   ├── excited.png
│   ├── sad.png
│   ├── surprised.png
│   ├── angry.png
│   ├── shy.png
│   ├── thinking.png
│   └── blank.png    ← 無表情（さくら専用）
├── sakura_sports/   ← 桜咲さくら（スポーツウェア）
│   ├── normal.png
│   ├── happy.png
│   ├── excited.png
│   ├── shy.png
│   └── thinking.png
├── sakura_swimsuit/ ← 桜咲さくら（水着）
│   ├── normal.png
│   ├── happy.png
│   ├── excited.png
│   ├── surprised.png
│   ├── thinking.png
│   └── blank.png
├── kotoha/          ← 花園ことは（通常）
│   ├── normal.png
│   ├── happy.png
│   ├── excited.png
│   ├── sad.png
│   ├── surprised.png
│   ├── angry.png
│   ├── shy.png
│   └── thinking.png
├── kotoha_swimsuit/ ← 花園ことは（水着）
│   ├── normal.png
│   ├── surprised.png
│   └── thinking.png
└── mahiru/          ← 月夜野まひる
    ├── normal.png
    ├── happy.png
    ├── excited.png
    ├── sad.png
    ├── surprised.png
    ├── angry.png
    ├── shy.png
    └── thinking.png
```

## 画像仕様

| 項目 | 推奨値 |
|------|--------|
| **推奨サイズ** | **512 × 900 px** |
| **高解像度版** | 1024 × 1800 px（ぼやけ防止・推奨） |
| **形式** | PNG（透過背景必須）または WebP |
| **アスペクト比** | 縦長（幅:高さ ≈ 0.57:1） |

### キャンバス上での表示領域

- キャラクタースロット: **420 × 720 px**（ゲーム画面フルハイト）
- 下端がゲーム画面の最下端に揃います
- `object-fit: contain` で縦に合わせてスケールされます

### 画像の作り方のポイント

```
┌─────────────────┐  ← 画像の上端（余白OK）
│                 │
│   (キャラ全身)  │
│                 │
│                 │
└─────────────────┘  ← 画像の下端 = 足元 (地面に接する位置)
```

- **足元は画像の最下端** に合わせて描く（余白不要）
- 上部には空き余白があってもOK
- キャラ左右に透過余白を持たせると自然に見える

## 表情一覧 (スクリプトで使用する名前)

| 名前        | 説明                          | 備考               |
|-------------|-------------------------------|--------------------|
| normal      | 通常                          |                    |
| happy       | 笑顔                          |                    |
| excited     | 喜び・興奮                    |                    |
| sad         | 悲しい                        |                    |
| surprised   | 驚き                          |                    |
| angry       | 怒り                          |                    |
| shy         | 恥ずかしい                    |                    |
| thinking    | 考える                        |                    |
| blank       | 無表情（さくら専用・重要）    | expression.png を使用 |

## スクリプトでの使い方

```
@show sakura center happy fade_in        ← 通常立ち絵
@show sakura_sports center excited       ← スポーツウェア
@show sakura_swimsuit center normal      ← 水着
@show kotoha_swimsuit left surprised     ← ことは水着
@expr sakura surprised                   ← 表情変更
```
