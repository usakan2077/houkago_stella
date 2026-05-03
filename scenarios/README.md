# シナリオスクリプト 制作ガイド

シナリオファイルは `scenarios/` フォルダに `.md` 形式で作成します。
新しいファイルを追加した場合は `config.js` の `scenarioFiles` 配列に追記してください。

---

## 基本構文

```
# ラベル名          ← シーン区切り・ジャンプ先の目印
// コメント         ← 無視される（メモ用）
---                 ← 区切り線（無視）
```

---

## テキスト

### ナレーション（地の文）
```
> テキスト
```

### キャラクターのセリフ
```
charkey: セリフテキスト
charkey「セリフテキスト」
```

利用可能な charkey → [キャラクター一覧](#キャラクター) 参照

---

## @ コマンド一覧

### 背景

```
@scene bg_name
@scene bg_name fade          ← フェード（デフォルト）
@scene bg_name instant       ← 即切り替え
@scene bg_name slide_left
@scene bg_name slide_right
```

利用可能な bg_name → [背景一覧](#背景) 参照

---

### BGM

```
@bgm filename.mp3   ← 再生（ループ）
@bgm stop           ← 停止
```

> ※ `@jump` / ラベル移動時に BGM は自動停止します。

利用可能なファイル → [BGM一覧](#bgm) 参照

---

### SE（効果音）

```
@se filename.mp3    ← 1回再生
```

> ※ `@scene`（フェードあり）や `@jump` 時に再生中のSEは自動停止します。

利用可能なファイル → [SE一覧](#se効果音) 参照

---

### キャラクター表示

```
@show charkey pos
@show charkey pos expr
@show charkey pos expr effect
```

| 引数 | 選択肢 |
|------|--------|
| pos | `left` / `center` / `right` |
| expr | `normal` / `happy` / `sad` / `angry` / `surprised` / `shy` / `thinking` / `excited` |
| effect | `fade_in`（デフォルト） / `slide_in_left` / `slide_in_right` / `pop_in` / `instant` |

```
@hide charkey              ← キャラ非表示
@hide charkey slide_out_left
@hide_all                  ← 全キャラ非表示
@hide_all instant

@expr charkey expr         ← 表情だけ変更
@move charkey new_pos      ← 位置移動（slideエフェクト）
```

---

### スチル（イベントCG）

```
@still image_name          ← 表示（fade_inデフォルト）
@still image_name slide_in_bottom
@still_hide                ← 非表示（fade_outデフォルト）
```

画像パス: `assets/images/stills/{image_name}.jpg`

---

### 待機

```
@wait 1000    ← 1000ms 待機（スキップ時は無視）
```

---

### ジャンプ・終了

```
@jump label_name              ← ラベルへジャンプ（BGM・SE自動停止）
@end "エンディングタイトル"   ← ゲーム終了画面へ
```

---

### 選択肢

```
@choice
- "選択テキスト" -> label_name
- "選択テキスト" [flag+10] -> label_name
- "選択テキスト" [flag+10,flag2-5] -> label_name
```

> `[flag+N]` はその選択肢を選んだときにフラグを自動加減算します。

---

### フラグ操作

```
@flag name value         ← フラグをセット（例: @flag has_met_sakura true）
@flag_add name amount    ← 数値フラグ加算（例: @flag_add sakura_favor 10）
@flag_sub name amount    ← 数値フラグ減算
@flag_toggle name        ← ブールフラグ反転
```

### 条件分岐

```
@if flag_name op value -> label
```

| op | 意味 |
|----|------|
| `==` | 等しい |
| `!=` | 等しくない |
| `>=` `>` `<=` `<` | 数値比較 |

```
@if sakura_favor >= 30 -> sakura_route
@if has_met_sakura == true -> sakura_event
```

条件を満たさない場合は次のコマンドへ続行します。

### ルート自動選択

```
@route_select flag1:label1 flag2:label2 ... fallback_label
```

数値フラグが最大のルートへジャンプ。すべて 0 の場合は fallback へ。

```
@route_select sakura_favor:sakura_route kotoha_favor:kotoha_route mahiru_favor:mahiru_route bad_end
```

---

## キャラクター

| charkey | 表示名 | 名前色 |
|---------|--------|--------|
| `player` | 桐島 勇 | 水色 |
| `sakura` | 桜咲さくら | ピンク |
| `kotoha` | 花園ことは | 青紫 |
| `mahiru` | 月夜野まひる | 緑 |

---

## 背景

### 校門
| キー | 説明 |
|------|------|
| `school_gate` | 昼・晴れ |
| `school_gate_evening` | 夕方 |

### 教室
| キー | 説明 |
|------|------|
| `classroom` | 昼 |
| `classroom_evening` | 夕方 |
| `classroom_night` | 夜 |
| `classroom_rainy` | 雨天 |
| `classroom_festival` | 文化祭 |

### 廊下
| キー | 説明 |
|------|------|
| `corridor` | 昼 |
| `corridor_evening` | 夕方 |
| `corridor_night` | 夜 |
| `corridor_rainy` | 雨天 |
| `corridor_festival` | 文化祭 |

### 屋上
| キー | 説明 |
|------|------|
| `rooftop` | 昼 |
| `rooftop_evening` | 夕方 |
| `rooftop_night` | 夜 |
| `rooftop_predawn` | 夜明け前 |
| `rooftop_dawn` | 夜明け |
| `night_rooftop` | 夜（chapter1用エイリアス） |

### 図書室
| キー | 説明 |
|------|------|
| `library` | 昼 |
| `library_evening` | 夕方 |

### 音楽準備室
| キー | 説明 |
|------|------|
| `music_room` | 昼 |
| `music_room_evening` | 夕方 |

### 階段
| キー | 説明 |
|------|------|
| `staircase` | 昼 |
| `staircase_evening` | 夕方 |
| `staircase_night` | 夜 |
| `staircase_rainy` | 雨天 |

### 校舎外・空
| キー | 説明 |
|------|------|
| `school_exterior_night` | 校舎外・夜 |
| `overcast_sky` | 曇り空 |

### その他
| キー | 説明 |
|------|------|
| `gymnasium` | 体育館 |
| `stage` | ステージ（暗転気味） |
| `protagonist_room_night` | 主人公の部屋・夜 |
| `title_bg` | タイトル画面用 |
| `monologe-bg` | 内面独白・回想シーン用 |

> 画像ファイル（`.jpg` / `.png` 等）が `assets/images/bg/` に存在する場合は画像を優先表示。
> 存在しない場合はグラデーションで代替表示されます。

---

## スチル（イベントCG）

画像パス: `assets/images/stills/{image_name}.jpg`

### 共通ルート

| image_name | 登場章 | 内容 |
|------------|--------|------|
| `kotoha_window_ch1` | Ch.1 | 転入初日、窓の外を見つめることは |
| `night_sky_no_stars` | Ch.1 | 夜の教室から曇り空を見上げる勇 |
| `sakura_blank_moment` | Ch.2 | 笑いが途切れた一瞬、さくらの「無の顔」 |
| `kotoha_library_headphones` | Ch.2 | 図書室でヘッドホンを外し本をなぞることは |
| `mahiru_rooftop_photo` | Ch.3 | 屋上でカメラを構えるまひる |
| `mahiru_notebook_drop` | Ch.4 | ノートが落ちて「今日の良かったこと」が見える |
| `evening_walk_two` | Ch.4 | 夕暮れの帰り道、まひると並んで歩く勇（後ろ姿） |
| `sakura_corner_resting` | Ch.5 | 文化祭準備後、教室の隅でこっそり休むさくら |
| `kotoha_frozen_piano_sound` | Ch.5 | 廊下でピアノの音に固まるることは |
| `mahiru_evening_rooftop` | Ch.5 | 夕暮れの屋上で兄の話をするまひる |
| `rain_festival_day` | Ch.6 | 雨の文化祭当日、廊下に立ち尽くす勇 |

### さくらルート

| image_name | 内容 |
|------------|------|
| `sakura_crying_gym` | 体育館の隅で泣きそうになるさくら |
| `sakura_cant_smile` | 笑おうとして笑えない、初めての「ごめん」 |
| `sakura_good_end_rooftop1` | 屋上で並んで空を見るさくら（Good End その1） |
| `sakura_good_end_rooftop2` | 屋上で並んで空を見るさくら（Good End その2） |

### ことはルート

| image_name | 内容 |
|------------|------|
| `kotoha_music_door` | 音楽準備室のドアに手をかけたまま動けないことは |
| `kotoha_piano_trembling` | ピアノの前で震える手 |
| `kotoha_one_note` | 十年ぶりに一音を弾いた瞬間 |
| `kotoha_performance1` | 合唱伴奏を弾くことは（Good End その1） |
| `kotoha_performance2` | 合唱伴奏を弾くことは（Good End その2） |

### まひるルート

| image_name | 内容 |
|------------|------|
| `mahiru_notebook_one_line` | 一行だけになったノートのページ |
| `mahiru_seen_from_below` | 校舎外から屋上のまひるを見上げる勇（発見の瞬間） |
| `mahiru_rooftop_night` | 夜の屋上、柵に手をかけたまひる（勇が到達した直後） |
| `mahiru_rooftop_reach` | 勇がまひるの腕を掴んで引き戻す瞬間（クライマックス） |
| `mahiru_dawn_two` | 命日の朝、並んで朝日を見るまひると勇（Good End） |

### バッドエンド

| image_name | 内容 |
|------------|------|
| `bad_end_empty_classroom` | 誰もいない夜の教室、星の見えない空を見上げる勇 |

---

## BGM

| ファイル名 | 用途イメージ |
|-----------|-------------|
| `title.mp3` | タイトル画面 |
| `opening_piano.mp3` | オープニング・モノローグ |
| `spring_breeze.mp3` | 日常・学校生活（明るい） |
| `daily_life.mp3` | 日常・学校生活（穏やか） |
| `evening_piano.mp3` | 放課後・夕方の情景 |
| `night_melody.mp3` | 夜・しっとりした場面 |
| `library_quiet.mp3` | 図書室・静かな場面 |
| `rooftop_wind.mp3` | 屋上・空気感のある場面 |
| `school_festival.mp3` | 文化祭・賑やかな場面 |
| `piano_resonance.mp3` | ピアノ・感動的な場面 |
| `sakura_theme.mp3` | さくらルート テーマ |
| `sakura_breakdown.mp3` | さくら 葛藤・崩壊シーン |
| `sakura_good_end.mp3` | さくら グッドエンド |
| `kotoha_theme.mp3` | ことはルート テーマ |
| `kotoha_good_end.mp3` | ことは グッドエンド |
| `mahiru_theme.mp3` | まひるルート テーマ |
| `mahiru_dawn.mp3` | まひる 夜明け・和解シーン |
| `mystery_shadow.mp3` | ミステリアス・不穏な場面 |
| `tension_rain.mp3` | 緊張・雨のシーン |
| `predawn_tension.mp3` | 夜明け前・クライマックス |
| `bad_end_loop.mp3` | バッドエンド |

---

## SE（効果音）

| ファイル名 | 用途 |
|-----------|------|
| `school_bell.mp3` | 始業・終業ベル |
| `classroom_noise.mp3` | 教室のざわめき |
| `footsteps.mp3` | 足音 |
| `door_open.mp3` | ドアの開閉 |
| `notebook_open.mp3` | ノートを開く |
| `book_drop.mp3` | 本が落ちる |
| `rain_window.mp3` | 窓を叩く雨音 |
| `wind_rooftop.mp3` | 屋上の風 |
| `night_insect.mp3` | 夜の虫の声 |
| `piano_distant.mp3` | 遠くから聞こえるピアノ |
| `piano_single_note.mp3` | ピアノの単音（ハッとする瞬間） |
| `chime_soft.mp3` | 柔らかなチャイム（回想・夢） |
| `choir_distant.mp3` | 遠くの合唱（感動・神秘的な場面） |
| `heartbeat.mp3` | 心拍音（緊張・クライマックス） |
| `crowd_festival.mp3` | 文化祭の人混み |
| `gym_whistle.mp3` | 体育館のホイッスル |
| `shuttle_hit.mp3` | バドミントンのシャトル打撃音 |
| `collision.mp3` | 衝突・ぶつかる音 |
| `click.mp3` | UI クリック音（自動使用） |

---

## シナリオ例

```markdown
# ch1_classroom

@scene classroom fade
@bgm spring_breeze.mp3
@se school_bell.mp3
@wait 1200

> 新学期最初の朝。

@show sakura right happy fade_in

sakura: おはよう！今年もよろしくね！

player: ……ああ、よろしく

@expr sakura normal

@choice
- "笑って返す" [sakura_favor+5] -> ch1_classroom_smile
- "曖昧に流す" -> ch1_classroom_vague

# ch1_classroom_smile

> 久しぶりに、ちゃんと笑った気がした。

@jump ch1_corridor
```
