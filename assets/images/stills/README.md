# スチル（イベントCG）一覧

画像パス: `assets/images/stills/{ファイル名}.webp`
スクリプトから呼ぶとき: `@still ファイル名`

優先度：★★★ 必須 ／ ★★ 重要 ／ ★ あると良い

---

## キャラクター外見メモ（プロンプト共通）

| キャラ | 髪 | 瞳 | 身長 | 特徴 |
|--------|----|----|------|------|
| **桐島 勇**（主人公） | 暗い黒褐色、少し癖毛、前髪が目にかかる | 深い茶色 | 175cm | 細身、元陸上部の引き締まった体格、無表情だが目が雄弁 |
| **桜咲 さくら** | 明るい栗色、肩より少し長い、よく後ろでまとめている | 琥珀色（暖かみあり） | 161cm | バドミントンで鍛えたしなやかな体型、よく笑う |
| **花園 ことは** | 黒に近い暗い茶色、腰まで届く長さ、静かに揺れる | 深い藍色 | 163cm | 姿勢が良い、指が長い、よく本を胸に抱えて歩く |
| **月夜野 まひる** | 明るい栗色、腰あたりまで、ゆるくウェーブ | 淡いグリーン（ヘーゼル系） | 158cm | 華奢、首からカメラ、ポケットに小さなノート |

**共通スタイル指示（全プロンプトに付加）:**
```
visual novel style, anime illustration, soft lighting, detailed background,
high quality, 16:9 landscape composition, school setting
```

---

## 共通ルート（Ch.1〜8）

### Chapter 1

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `kotoha_window_ch1` | ことはが転入初日、窓の外を静かに見つめている | ★★ | ✅ |
| `night_sky_no_stars` | 夜の教室の窓から曇り空を見上げる勇（一人・後ろ姿） | ★★★ | ✅ |

#### `kotoha_window_ch1`
```
A quiet high school classroom, daytime, overcast sky outside the window.
A 17-year-old Japanese schoolgirl with long dark brown hair (waist-length, softly swaying),
deep navy-blue eyes, sitting alone at a window seat on her first day of transfer.
She stares out the window with a calm, unreadable expression, as if searching for something.
School uniform (dark blazer, ribbon), hands resting on the desk.
Soft diffused light from the cloudy window. Empty desks around her.
Melancholic, lonely atmosphere. Medium shot from slightly behind and to the side.
visual novel CG style, anime illustration, detailed, soft color palette.
```

#### `night_sky_no_stars`
```
Evening turning to night. A 17-year-old Japanese high school boy with dark black slightly wavy hair,
bangs falling over his eyes, standing alone at a classroom window.
Back view / three-quarter view. He looks up at the overcast night sky.
No stars visible — thick gray-purple clouds cover the sky completely.
Empty classroom behind him, orange-tinted sunset fading.
Desk chairs silhouetted. Mood: solitary, introspective, heavy.
visual novel CG style, anime illustration, cinematic lighting, 16:9 composition.
```

---

### Chapter 2

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `sakura_blank_moment` | 笑いが途切れた一瞬、さくらが「無の顔」になる瞬間 | ★★★ | ✅ |
| `kotoha_library_headphones` | 図書室でヘッドホンをはずして本の表紙をなぞるることは | ★★ | ✅ |

#### `sakura_blank_moment`
```
Inside a bright school classroom. A 17-year-old Japanese schoolgirl with chestnut-brown hair
tied in a loose ponytail, warm amber eyes. She was laughing a moment ago —
but for just one second, her smile has completely vanished.
A rare, unguarded expression: blank, empty, like the light switched off.
No one around her seems to notice. She is surrounded by other students who are still chatting.
The contrast between her usual brightness and this fleeting void is the focus.
Close-up / medium shot. School uniform. Natural daytime classroom lighting.
visual novel CG style, anime illustration, emotionally significant moment.
```

#### `kotoha_library_headphones`
```
A quiet school library, afternoon light through tall windows.
A 17-year-old Japanese schoolgirl with long dark brown hair (waist-length),
deep navy-blue eyes, sitting at a reading desk alone.
She has just removed her headphones and holds them loosely.
Her other hand slowly traces the spine of a closed book — fingers barely touching it.
Her expression is neutral, almost distant, as if lost in a memory.
Soft golden afternoon light. Bookshelves in background.
Medium shot, slightly elevated angle. Melancholic, still atmosphere.
visual novel CG style, anime illustration.
```

---

### Chapter 3

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `library_hands_overlap` | 図書室の棚で二人の手が重なる瞬間（音楽小説を取ろうとして） | ★★★ | ✅ |
| `mahiru_rooftop_photo` | 屋上でカメラを構えるまひると、遠く空を写している瞬間 | ★★ | ✅ |

#### `library_hands_overlap`
```
Inside a school library, between tall bookshelves.
Two hands reaching for the same book at the same time — nearly touching.
Left hand: a boy's hand, slightly calloused (former track athlete).
Right hand: a girl's hand, slender with long elegant fingers (pianist's hands).
The book is a music-themed novel. The focus is on the hands, almost overlapping.
Neither has grabbed it yet. A moment of suspended tension.
Warm, dim library lighting. Bokeh bookshelves in background.
Close-up shot, intimate and quiet mood. visual novel CG style, anime illustration.
```

#### `mahiru_rooftop_photo`
```
School rooftop, daytime, early spring. Wide blue sky with soft white clouds.
A 17-year-old Japanese schoolgirl with light chestnut-brown wavy long hair,
pale hazel-green eyes, standing near the chain-link fence.
She holds a film camera up to her eye, photographing the sky.
A small notebook peeks out from her jacket pocket.
Her expression is peaceful, slightly faraway. Alone on the rooftop.
Bright natural light, gentle wind blowing her hair.
Medium-wide shot. Warm, quietly melancholic mood.
visual novel CG style, anime illustration, beautiful sky composition.
```

---

### Chapter 4（外イベント — それぞれの放課後）

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `sakura_after_match` | 試合後、他の部員が親と帰る中、さくらだけ体育館の裏手で壁に背をもたれている | ★★★ | ✅ |
| `kotoha_street_piano` | 図書館帰りの商店街、ストリートピアノの前で足が止まることは | ★★★ | ✅ |
| `mahiru_riverbank` | 河川敷でカメラを向けるまひる（兄・蒼との思い出の場所） | ★★★ | ✅ |

#### `sakura_after_match`
```
Outside a municipal gymnasium, late afternoon. The match has just ended.
In the background (soft focus): other players laughing with their parents,
families reuniting, bags being collected, warmth and noise.
Foreground: a 17-year-old Japanese schoolgirl with chestnut-brown hair in a ponytail,
badminton racket loosely in hand, standing alone at the back of the building.
She leans against the wall — not sitting, just resting back against the concrete.
She is not looking at the families. Eyes slightly down, expression unreadable.
No one is coming for her. She is not waiting — she knows no one is coming.
Warm late-afternoon light catches the front of the building; the back where she stands is in shadow.
Medium shot. The contrast between the reunion scene behind her and her stillness is the key.
visual novel CG style, anime illustration. Quiet, aching loneliness.
```

#### `kotoha_street_piano`
```
A shopping street or small plaza, late afternoon. Warm golden light.
A public upright piano (street piano) sits near a bench, slightly worn.
A 17-year-old Japanese schoolgirl with long dark brown hair (waist-length, softly swaying),
deep navy-blue eyes, standing a few steps away from the piano — frozen.
She was walking past (library bag or book under arm) but has stopped completely.
Her eyes are fixed on the piano keys. She is not moving toward it or away from it.
Someone nearby is playing something simple — or the piano sits silent, waiting.
Her hand, at her side, has curled slightly — fingers in a half-position, as if remembering.
Expression: outwardly still, but something is surfacing under the calm.
Medium shot, slightly from behind and to the side. The piano and her figure in balance.
visual novel CG style, anime illustration. Suspended, haunted, quietly powerful.
```

#### `mahiru_riverbank`
```
Quiet riverbank, late afternoon. The river reflects the golden-orange sky.
A 17-year-old Japanese schoolgirl with light chestnut wavy long hair, pale hazel-green eyes,
standing near the water's edge, camera raised to photograph the river and sky.
She is not moving. There is something heavier than usual in her stillness.
This place feels personal — like she has stood here many times before.
A small worn notebook is visible in her jacket pocket.
Wide shot with the river prominent. Golden light, gentle breeze, melancholic.
visual novel CG style, anime illustration.
```

---

### Chapter 5（止まった時計、動き出す時間）

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `mahiru_notebook_drop` | まひるのノートが落ちて開いた瞬間（「今日の良かったこと」が見える） | ★★★ | ✅ |
| `evening_walk_two` | 夕暮れの帰り道、まひると並んで歩く勇（後ろ姿） | ★★ | ✅ |

#### `mahiru_notebook_drop`
```
School corridor or walkway, afternoon.
A small notebook has fallen open on the floor.
The visible page is handwritten in soft, careful Japanese script.
One line clearly readable: 「今日の良かったこと：ひさしぶりに勇くんと話した」
(Today's good thing: I talked to Isamu-kun for the first time in a while)
The notebook is slightly worn, filled with entries. Small pressed flower on one page.
A girl's shoe (school uniform) is visible at the edge, she's bending to pick it up.
Soft warm lighting. Close-up, emotional focus on the handwritten text.
visual novel CG style, anime illustration.
```

#### `evening_walk_two`
```
Quiet residential street near a school, late afternoon sunset.
Two high school students walking side by side, seen from behind.
Left: a tall boy (175cm), dark slightly wavy hair, school uniform, hands in pockets.
Right: a shorter girl (158cm), long light chestnut wavy hair, school uniform,
holding a notebook to her chest with both arms.
Warm golden sunset light casting long shadows on the road.
Sakura petals or leaves drifting. The space between them is small but not quite touching.
Quiet, bittersweet atmosphere. Medium-wide shot, cinematic.
visual novel CG style, anime illustration.
```

---

### Chapter 6（プールイベント — 水面の午後）

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `pool_sakura_kotoha` | プール授業、さくら＋ことは同時（対照的な二人） | ★★★ | ✅ |
| `pool_mahiru_window` | 窓越しに一人でプールサイドに立つまひるを見かける | ★★★ | ✅ |

#### `pool_sakura_kotoha`
```
Outdoor school swimming pool, summer afternoon. Bright sunlight on blue water.
Two contrasting girls visible: left side — a cheerful girl (chestnut ponytail, sakura)
swimming energetically in the pool, water splashing, full of life.
Right side, at the pool edge — a quieter girl (long dark brown hair pinned back, kotoha)
sitting still, feet in the water, looking at the surface.
Both in school swimsuits. The contrast between energy and stillness is the composition's focus.
The boy (protagonist) watches from the poolside area, slightly to the back.
Bright, summery lighting, water reflections. Medium-wide shot.
visual novel CG style, anime illustration.
```

#### `pool_mahiru_window`
```
School building interior, a corridor or changing room hallway, summer afternoon.
Seen from inside through a window: outside, at the empty poolside, a girl (light chestnut wavy hair,
mahiru) stands alone, looking at the water's surface.
The pool is empty — no one else is using it at this time.
She is not swimming, not photographing. Just standing, looking down at the still water.
The protagonist's perspective: he sees her through the glass, at a distance.
The window frame divides the composition — inside dark, outside bright and blue.
He cannot call out to her from here. The glass and distance separate them.
Medium shot, through-glass framing. Quiet, unreachable atmosphere.
visual novel CG style, anime illustration.
```

---

### Chapter 7（夕暮れの告白）

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `sakura_corner_resting` | 文化祭準備後、教室の隅でこっそり休むさくら（気づかれないように） | ★★★ | ✅ |
| `kotoha_frozen_piano_sound` | 廊下で遠くのピアノの音に気づき、動けなくなっていることは | ★★★ | ✅ |
| `mahiru_evening_rooftop` | 夕暮れの屋上で「お兄ちゃんが好きだったんだ」と呟くまひる | ★★★ | ✅ |
| `mahiru_rooftop_friends_photo` | 屋上で三人と一緒に撮った写真のシーン | ★★ | ✅ |
| `rooftop_shooting_star` | 屋上で四人が流れ星を見た瞬間（まひるだけが見えていた） | ★★★ | ✅ |
| `rooftop_four_wishes` | 四人がそれぞれ願い事を口にする夜の屋上（章のクライマックス） | ★★ | ✅ |

#### `sakura_corner_resting`
```
Festival-decorated classroom, late afternoon. Desks pushed aside for preparation.
A 17-year-old Japanese schoolgirl with chestnut-brown hair in a ponytail,
sitting in the corner away from everyone else, back against the wall.
Her usual bright smile is completely gone. Eyes closed or half-open, exhausted.
She doesn't realize anyone can see her. A moment of absolute unguarded tiredness.
Paper decorations and streamers nearby hint at the festive preparation.
Warm but tired atmosphere. Slightly low angle to emphasize her small, tired figure.
visual novel CG style, anime illustration, emotionally charged.
```

#### `kotoha_frozen_piano_sound`
```
School hallway, evening. Warm orange corridor light.
A 17-year-old Japanese schoolgirl with long dark brown hair (waist-length),
standing completely still in the corridor, hand lightly touching the wall.
She has stopped mid-step. A distant piano melody can be heard from a closed door nearby.
Her eyes are slightly wide, staring at nothing — listening, frozen.
One hand has slightly clenched. Expression: outwardly calm but internally shaken.
The music room door is visible behind her, slightly ajar.
Close-to-medium shot, three-quarter view. Tense, haunted mood.
visual novel CG style, anime illustration.
```

#### `mahiru_evening_rooftop`
```
School rooftop at sunset. The sky is a breathtaking gradient of orange, pink, and deep blue.
A 17-year-old Japanese schoolgirl with light chestnut wavy long hair, hazel-green eyes,
standing at the fence, looking out at the sunset.
She is not smiling. Her expression is soft, nostalgic, slightly sad —
as if remembering someone who loved this kind of sky.
Camera hangs around her neck but she is not shooting.
The golden light catches her hair. A quiet, reverent atmosphere.
Medium shot, slightly from the side. Visual novel CG style, anime illustration.
```

#### `rooftop_shooting_star`
```
School rooftop, early night. The sky is deep indigo, transitioning from dusk.
Four high school students stand near the chain-link fence, all looking upward at the same moment.
Left: a cheerful girl with chestnut-brown ponytail hair (sakura), mouth open in surprise.
Center-left: a tall boy with dark slightly wavy hair (protagonist), calm expression, looking up but not seeing it.
Center-right: a girl with light chestnut wavy long hair (mahiru), finger raised slightly, pointing at where the star just was.
Right: a girl with long dark brown hair (kotoha), looking upward with wide eyes.
A faint streak of light is just visible in the upper corner of the sky — already almost gone.
Mahiru is the only one who clearly caught it. The others are reacting a half-second too late.
Night breeze. The rooftop fence silhouetted against the dark sky.
Wide-medium shot taking in all four figures. Emotional, fleeting, wonder-filled atmosphere.
visual novel CG style, anime illustration, cinematic 16:9 composition.
```

#### `rooftop_four_wishes`
```
School rooftop, night. Clear dark sky overhead, city lights faint below.
Four high school students standing in a loose circle near the fence, each slightly apart.
Left: cheerful girl (chestnut ponytail, sakura) with eyes closed and fists clenched — making her wish with full energy.
Center-left: tall boy (dark wavy hair, protagonist) looking slightly away, expression guarded but thoughtful.
Center-right: girl with long wavy light chestnut hair (mahiru) gazing upward softly, peaceful smile.
Right: girl with long dark brown hair (kotoha) looking at the sky with quiet, careful eyes.
The mood is intimate and a little melancholic — each person alone with their thoughts despite being together.
Warm distant city glow from below contrasts with the cold star-dotted sky above.
Medium-wide shot, slightly elevated. The four figures small against the vast night sky.
visual novel CG style, anime illustration, emotionally resonant, soft night lighting.
```

---

### Chapter 8（雨のち、分岐点）

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `rain_festival_day` | 文化祭当日、雨が窓を叩く — 勇が廊下で立ち止まる | ★★★ | ✅ |

#### `rain_festival_day`
```
School corridor during a cultural festival, daytime but darkened by rain.
A 17-year-old Japanese boy with dark wavy hair, standing alone at a window.
Heavy rain against the glass. Festival decorations inside contrast with the gloomy weather.
He is looking at his phone or looking down the corridor — a decision he must make.
The weight of the moment is visible in his posture. Three-way split feeling.
Dramatic lighting, rain streaks on window, festival lanterns glowing inside.
Wide-medium shot. Tense, pivotal mood. visual novel CG style, anime illustration.
```

---

## さくらルート（Ch.9s〜12s）

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `sakura_crying_gym` | 体育館の隅で泣きそうになるさくら（コートを出てきた直後） | ★★★ | ✅ |
| `sakura_cant_smile` | 笑おうとして笑えない——さくらが初めて「ごめん」と言う | ★★★ | ✅ |
| `sakura_embrace` | さくらが勇に抱きつく（感情が溢れるシーン） | ★★★ | ✅ |
| `sakura_good_end_rooftop1` | 屋上で勇と並んで空を見るさくら（本物の笑顔）その1 | ★★★ | ✅ |
| `sakura_good_end_rooftop2` | 屋上で勇と並んで空を見るさくら（本物の笑顔）その2 | ★★★ | ✅ |

#### `sakura_crying_gym`
```
School gymnasium hallway or exit, late afternoon.
A 17-year-old Japanese schoolgirl with chestnut hair coming loose from her ponytail,
badminton racket in hand, standing with her back against the wall.
She has just left the court. Her eyes are red and she is clearly on the verge of tears —
but her jaw is set, trying desperately to hold it together.
Gym sounds audible (implied) through the door. Alone in the hallway.
Her usual brightness is completely absent. Raw, vulnerable, exhausted.
Close-medium shot. Emotional, breakthrough moment. visual novel CG style, anime illustration.
```

#### `sakura_cant_smile`
```
Gym storage room, evening.
A 17-year-old Japanese schoolgirl, face streaked with tears she can no longer hold back.
She is trying to smile — mouth halfway there — but the smile won't come.
This is her first time failing to smile. First time saying sorry without performing it.
Expression: broken, honest, relieved and terrified at the same time.
Golden evening light through a high barred window. Stacked gym mats, shelves, mops and ball carts around her.
Close-up on her face. The most emotionally important image in her route.
Visual novel CG style, anime illustration, high emotional impact.
```

#### `sakura_good_end_rooftop`
```
School rooftop, clear afternoon sky. Spring clouds drifting.
A 17-year-old Japanese schoolgirl with chestnut hair loose and flowing, amber eyes bright.
Standing beside a tall boy with dark hair. Both looking at the sky.
She is smiling — genuinely, quietly, for herself. Not performing. Not for anyone.
Her eyes are soft and a little tired, but real.
The boy is slightly turned toward her, a small content expression.
Warm afternoon light. Comfortable silence between them.
Medium shot, slightly low angle looking up. Peaceful, hopeful, earned.
visual novel CG style, anime illustration.
```

---

## ことはルート（Ch.9k〜12k）

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `kotoha_music_door` | 音楽準備室のドアに手をかけたまま動けないことは | ★★★ | ✅ |
| `kotoha_piano_side` | ピアノの横に佇むことは（横顔・静かなシーン） | ★★ | ✅ |
| `kotoha_piano_trembling` | ピアノの前に座り、鍵盤に触れる直前——震える手 | ★★★ | ✅ |
| `kotoha_one_note` | 十年ぶりに一音を弾いた瞬間（決定的シーン） | ★★★ | ✅ |
| `kotoha_performance1` | 合唱の伴奏を演奏するることは（Good End）その1 | ★★ | ✅ |
| `kotoha_performance2` | 合唱の伴奏を演奏するることは（Good End）その2 | ★★ | ✅ |

#### `kotoha_music_door`
```
School music preparation room, after school, dimly lit corridor.
A 17-year-old Japanese schoolgirl with long dark brown hair (waist-length),
standing at a closed music room door.
Her hand is on the door  — but she hasn't turned it. She cannot move.
Expression: outwardly calm, controlled, but there is fear underneath.
The corridor is empty. Orange after-school light. Sheet music visible through the small window.
This is someone fighting an invisible wall.
Medium shot, side profile. Haunted, tense. visual novel CG style, anime illustration.
```

#### `kotoha_piano_trembling`
```
School music preparation room, evening light through windows.
An upright piano, lid open. Sheet music on the stand.
A 17-year-old Japanese schoolgirl sitting at the piano bench,
long dark brown hair falling over her shoulders.
She has placed both hands on the keys — but hasn't pressed yet.
Her hands are trembling slightly. Her face is down, turned slightly away.
This is someone returning to something they were afraid of.
The piano fills most of the composition. Soft, emotional lighting.
Close-medium shot. visual novel CG style, anime illustration. Quiet, devastating mood.
```

#### `kotoha_one_note`
```
School music preparation room. A single piano key being pressed.
Close-up on one finger pressing one key — a girl's slender, elegant finger.
The key is down. The sound just happened. This is the first note in ten years.
Behind the hand, out of focus: a girl's silhouette with long dark hair, head slightly bowed.
Even further behind, barely visible: a boy standing quietly, watching.
The room is otherwise silent. The emotion is entirely in this one pressed key.
Extreme close-up / close-up composition. High emotional weight.
Warm golden tone. visual novel CG style, anime illustration.
```

#### `kotoha_performance`
```
School stage or auditorium, during a choir performance.
A 17-year-old Japanese schoolgirl with long dark brown hair tied back simply,
sitting at a grand piano on stage, playing.
Behind her, a school choir in formal uniforms.
The audience is visible in soft focus. Some have tears on their faces.
Kotoha's expression is not triumphant — it is focused, and somewhere behind the focus, free.
Stage lighting: warm spotlight. Powerful, cathartic atmosphere.
Medium-wide shot from slightly to the side of the audience.
visual novel CG style, anime illustration. Emotional climax scene.
```

---

## まひるルート（Ch.9m〜12m）

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `mahiru_notebook_one_line` | 一行だけになったノートのページ（「今日も空が青かった」） | ★★★ | ✅ |
| `mahiru_seen_from_below` | 校舎外から屋上のまひるを見上げる勇の視点（発見の瞬間） | ★★★ | ✅ |
| `mahiru_rooftop_night` | 夜の屋上、柵に手をかけたまひる（勇が到達した直後） | ★★★ | ✅ |
| `mahiru_rooftop_reach` | 勇がまひるの腕を掴んで引き戻す瞬間（クライマックス） | ★★★ | ✅ |
| `mahiru_dawn_two` | 命日の朝、勇と並んで朝日を見るまひる（Good End） | ★★★ | ✅ |

#### `mahiru_notebook_one_line`
```
Close-up on an open notebook page, held by delicate hands.
The notebook is worn and filled with past entries — previous pages dense with 3-5 lines of handwriting.
But this current page has only one line:
「今日も空が青かった」(The sky was blue again today)
The handwriting is the same as always, but somehow quieter, smaller.
Soft natural light (window). The contrast between full past pages and this empty present page.
Melancholic, whisper-quiet. visual novel CG style, anime illustration.
```

#### `mahiru_seen_from_below`
```
Night. A high school boy (17, dark slightly wavy hair, school uniform)
standing outside a school building, looking sharply upward.
His body is turned toward the building, one foot already stepping forward —
he has just seen something above and is about to run.
From his point of view: far above on the rooftop edge, a tiny figure —
a girl with long light chestnut wavy hair — stands at the chain-link fence,
her silhouette small against the night sky.
The distance and the dark make it impossible to tell exactly what she is doing.
That ambiguity is the point. The boy must decide based on instinct alone.
Composition: low-angle wide shot. The building looms above. The tiny figure at the top.
Cold blue-black night. One lit window somewhere. Urgency, dread, the precipice of decision.
visual novel CG style, anime illustration. This is the moment everything changes.
```

#### `mahiru_rooftop_night`
```
School rooftop, late at night. Dark sky with a few stars barely visible.
A 17-year-old Japanese schoolgirl with long light chestnut wavy hair,
standing at the chain-link fence, one hand resting on it.
She is looking out through the fence into the darkness beyond —
not dangerously, but with a stillness that says she has been standing here a long time.
Her expression is soft and distant, somewhere between peaceful and empty.
The wind moves her hair. The fence casts striped shadows on her face.
Medium shot, from slightly behind her. The sky beyond the fence is the other half of the composition.
This CG is used after the protagonist arrives on the rooftop — the moment just before he reaches her.
Haunting, quiet, urgent. visual novel CG style, anime illustration.
```

#### `mahiru_rooftop_reach`
```
School rooftop, night. The chain-link fence is in the background.
A tall boy (17, dark slightly wavy hair, school uniform) has grabbed a girl's arm —
pulling her back from the fence with both hands. He is out of breath, disheveled.
The girl (light chestnut wavy long hair, 158cm) has been pulled into his arms.
Both are on the ground or stumbling — the momentum of the grab just resolved.
The boy's face: desperate relief, still catching his breath. Eyes wide.
The girl's face: shocked, wet eyes — she did not expect anyone to come.
The fence and the dark sky are visible just behind them — what almost happened.
This is the emotional climax of Mahiru's route.
Close-medium shot. Chaotic composition settling into stillness.
visual novel CG style, anime illustration. High emotional impact.
```

#### `mahiru_dawn_two`
```
School rooftop or nearby hill, dawn. Pre-sunrise sky turning from deep blue to pale gold and pink.
A 17-year-old Japanese schoolgirl with light chestnut wavy hair, and a tall boy with dark hair,
standing side by side, watching the sunrise.
Mahiru holds her open notebook to her chest, like something precious.
She is crying quietly, but there is a small smile — both things at once.
The boy stands close, not touching, but present.
The sunrise is the visual focus — the two figures silhouetted or partially lit.
This is earned after everything. Beauty after the darkness.
Wide shot, cinematic. visual novel CG style, anime illustration. Cathartic, moving.
```

---

## 共通バッドエンド

| ファイル名 | シーン | 優先度 | 状態 |
|-----------|--------|--------|------|
| `bad_end_empty_classroom` | 誰もいない夜の教室で夜空を見上げる勇（星は見えない） | ★★★ | ✅ |

#### `bad_end_empty_classroom`
```
Empty school classroom, very late at night. Only moonless, starless overcast sky outside.
A 17-year-old Japanese boy, alone, sitting at a desk by the window.
He looks up at the cloudy night sky. No stars. Thick, dark clouds.
Festival decorations are still visible in the classroom — the cultural festival just ended.
But the classroom is empty. Everyone has left. He is alone.
Expression: not crying, not angry — quietly, completely hollow.
Cold blue-gray lighting. The empty classroom around him emphasizes the silence.
Medium shot from the side. This is the failure state — the price of not acting.
visual novel CG style, anime illustration. Deeply melancholic.
```

---

## スチル 合計：37枚（全枚確保済み ✅）

| 優先度 | 枚数 |
|--------|------|
| ★★★ 必須 | 27枚 |
| ★★ 重要 | 10枚 |

---

## 生成ツール参考

| ツール | 用途 |
|--------|------|
| NovelAI / NAI Diffusion | アニメスタイルに強い。VN向け |
| Stable Diffusion (Anything v5等) | カスタマイズ幅が広い |
| Midjourney | 構図・雰囲気の参考出しに |
| ComfyUI + LoRA | キャラの顔を統一したい場合 |
