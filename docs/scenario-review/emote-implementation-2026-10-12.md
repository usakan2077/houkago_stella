# 本編への立ち絵エモート適用（2026-10-12）

全12シナリオと各分岐の台詞・表情・スチルを確認し、日英それぞれ41箇所へ動きを追加した。解除命令は4箇所。台詞・地の文・音声ファイル・配役は変更していない。

## 選び方

- 日常の喜び、照れ、驚き、了解する返事を中心に、強さ0.35〜0.5で短く動かす。全台詞には付けない。
- 汗は延原のプリント・釣り銭と、さくらの宿題の勘違いの3箇所。キラキラはさくらがプレーを褒められる1箇所だけ。
- 数を数えることはの小さな不満は、記号のない `irritated 0.35`。青筋・ハート・大きな喜び・倒れ込み・ため息記号は本編では使わない。
- 震えも今回は採用していない。今後必要な場合にも実装の上限0.35を守る。
- 姿勢を保持する `slump` は日常の軽い落胆の2箇所だけ。次のやり取りへ進む前に明示的に解除する。
- スチル表示中には追加しない。衣装違いの立ち絵は基本名で対象を指定し、その場で表示中の衣装へ届ける。

## 適用箇所

以下は直後に表示するテキストID。日英とも同じ命令を置く。

| 直後のID | 命令 | 場面・理由 |
|---|---|---|
| `chapter1.chapter1_morning_gate.r006` | `@emote nobuhara sweat 0.45` | 落ちそうなプリントを支えて慌てる。序盤の日常の軽いやり取り。 |
| `chapter1.chapter1_morning_gate.r018` | `@emote sakura bounce 0.45` | 名前を覚えて即座に呼ぶ、明るい返事。 |
| `chapter1.chapter1_homeroom.r015` | `@emote sakura startle 0.4` | 先生に注意され、慌てて謝る。 |
| `chapter1.chapter1_breaktime.r004` | `@emote mahiru nod 0.4` | 久しぶりの再会に、静かに応える。 |
| `chapter1.chapter1_lunch.r003` | `@emote sakura bounce 0.45` | 一緒に昼食を食べられて喜ぶ。 |
| `chapter2.chapter2_start.r016` | `@emote kotoha shy 0.4` | かわいいと言われて照れる表情に添える。 |
| `chapter2.chapter2_lunch.r001` | `@emote sakura bounce 0.5` | 屋上が開いていた喜び。 |
| `chapter2.chapter2_lunch.r026` | `@emote sakura nod 0.45` | 半分ずつの提案にうなずく地の文と合わせる。 |
| `chapter2.chapter2_lunch.r034` | `@emote kotoha nod 0.4` | 昼食の写真を自分も欲しいと頼む。 |
| `chapter2.chapter2_sakura_event.r002` | `@emote sakura startle 0.4` | 隣の主人公に気づいて驚く。 |
| `chapter2.chapter2_sakura_event.r024` | `@emote sakura sparkle 0.4` | プレーを褒められて嬉しがる。装飾はこの一箇所に限定。 |
| `chapter2.chapter2_mahiru_corridor.r019` | `@emote mahiru nod 0.4` | 今日のよかったこととして会話を採用する。 |
| `chapter3.chapter3_start.r008` | `@emote nobuhara slump 0.4` | 当番の仕事を押しつけられず、軽くしょげる。 |
| `chapter3.chapter3_start.r019` | `@emote sakura sweat 0.45` | 宿題の指定を聞き漏らしていたと気づく。 |
| `chapter3.chapter3_start.r025` | `@emote sakura slump 0.4` | 間違いがいくつもあったと知り、しゅんとする。 |
| `chapter3.chapter3_lunch.r021` | `@emote sakura startle 0.4` | 弁当箱を落とす瞬間の驚き。 |
| `chapter3.chapter3_mahiru_photo.r016` | `@emote mahiru nod 0.4` | 写真を欲しいと言ってもらえて喜ぶ。 |
| `chapter4.chapter4_corridor.r005` | `@emote mahiru startle 0.35` | 探していたノートが見つかった驚き。 |
| `chapter4.chapter4_corridor_end.r010` | `@emote mahiru shy 0.4` | ノートの個人的な言葉を読まれて照れる。 |
| `chapter4.chapter4_walk.r014` | `@emote mahiru nod 0.4` | 今は一緒に歩ける、と穏やかに答える。 |
| `chapter5.chapter5_morning_class.r005` | `@emote sakura bounce 0.45` | 水泳を楽しみにしている朝の元気。 |
| `chapter5.chapter5_sakura_scene.r005` | `@emote sakura bounce 0.45` | 自己ベストに近い泳ぎを喜ぶ。 |
| `chapter5.chapter5_after_school.r015` | `@emote kotoha startle 0.35` | 泳ぎ方を再現する腕が顔に当たりそうになる。 |
| `chapter5.chapter5_end.r006` | `@emote nobuhara wobble 0.45` | 重い荷物を支えきれず、助けを求める。 |
| `chapter6.chapter6_sakura_gym.r022` | `@emote sakura nod 0.45` | 引退後の部のことを任せてほしいと答える。 |
| `chapter6.chapter6_sakura_talk.r026` | `@emote sakura shy 0.45` | 呼び方を意識する、採用済みFACE24の照れに添える。 |
| `chapter6.chapter6_kotoha_piano.r005` | `@emote nobuhara wobble 0.4` | 配達の箱を抱えながら腕を見せようとする。 |
| `chapter7.chapter7_start.r005` | `@emote sakura bounce 0.45` | 文化祭の喫茶店を知らせる、準備への意欲。 |
| `chapter7.chapter7_festival.r009` | `@emote nobuhara nod 0.45` | 買い出しのリストを受け取り、了解する。 |
| `chapter7.chapter7_festival.r025` | `@emote kotoha irritated 0.35` | 数を合わせている最中に話しかけられる。青筋は出さない。 |
| `chapter8.chapter8_start.r015` | `@emote nobuhara sweat 0.4` | 釣り銭を持ち歩く緊張。急変の場面には持ち込まない。 |
| `chapter8.chapter8_sakura_cafe.r024` | `@emote sakura nod 0.4` | 同級生に店を任せて休憩へ行く返事。 |
| `route_sakura.sakura_ch9_daily2.r018` | `@emote sakura bounce 0.4` | 食べ物を分けてもらい、文句を撤回する軽口。 |
| `route_sakura.sakura_ch9_gym.r012` | `@emote sakura nod 0.4` | 片づけの手伝いを素直に頼む。 |
| `route_sakura.sakura_good_end_club.r002` | `@emote sakura bounce 0.45` | 自分で練習の終わりを決め、帰る喜び。 |
| `route_kotoha.kotoha_ch9_daily2.r013` | `@emote kotoha nod 0.4` | 雨の描写がある本を借りてみると決める。 |
| `route_kotoha.kotoha_ch10_accept.r004` | `@emote classmate_male_a nod 0.4` | まず練習からという、現実的で前向きな返事。 |
| `route_kotoha.kotoha_ch10_decide.stay_answer` | `@emote kotoha nod 0.35` | 弾けなくても来てくれる申し出を静かに受け取る。 |
| `route_kotoha.kotoha_ch12_good_end.r021` | `@emote kotoha nod 0.35` | もう一曲聴いてほしいと、自分から誘う。 |
| `route_mahiru.mahiru_good_end_school.r013` | `@emote sakura startle 0.4` | 写真を七月から持っていたと聞いて驚く、翌日の学校の軽口。 |
| `route_mahiru.mahiru_good_end_school.r032` | `@emote mahiru nod 0.35` | 書くことが増えた日の終わりに、一緒に帰る。 |
| `chapter3.chapter3_start.r009` | `@emote nobuhara clear` | 次の軽口の前に落ち込みの姿勢を戻す。 |
| `chapter3.chapter3_start.r026` | `@emote sakura clear` | まひるの登場前に落ち込みの姿勢を戻す。 |
| `chapter2.chapter2_sakura_event.r032` | `@emote sakura clear` | 明るい褒め合いから、負担の話へ変わる前に装飾を消す。 |
| `chapter3.chapter3_mahiru_photo.r018` | `@emote mahiru clear` | 写真の喜びから、主人公が距離を感じる話へ変わる前に動きを戻す。 |

## 動きを付けずに残した場面

- 第1章の悪夢・慎の回想、さくらの表情が抜ける瞬間、ことはの音楽へのためらい。
- 第4章の登校やノートの理由の説明。ノート発見・照れの反応以外は表情と台詞に任せる。
- 第5章のプールサイドのまひるの孤立と、泳いだ後のさくらの疲れ。スチルの構図や伏線を動きで崩さない。
- 第6章の病院の話、ストリートピアノに座れない理由、まひるが過去に触れる場面。
- 第7章のさくらの「見ないでよ」から母親の話、音楽室へ入れないことは、兄の話から星に願う場面。怒りの青筋や汗を付けない。
- 第8章の父親の急変、伴奏の依頼を断る場面、まひるの不在、延原が引き受ける場面。
- さくらルートの母親への期待、後輩のけが、笑えない告白、病院での涙。
- ことはルートの父親とコンクールの告白、一音を弾く緊張と涙、本番の演奏。
- まひるルートの登校が難しい日々、屋上へ走る場面、兄の死と手紙の告白、夜明けのスチル。翌日の学校で2箇所だけ短い反応を付ける。
- 共通Bad Endと3人それぞれのBad End。明るい台詞にも無理をしている含みがあるため、喜びの動きを足さない。

## 確認

Nodeの回帰検査61件はすべて通過した。本編の新しい検査4件で、各分岐の表示対象、スチルに隠れないこと、保持姿勢の解除、重い場面の効果なしを確認した。日英の対応検査も通過（各12スクリプト・190ラベル・7エンディング）。

実ゲームはEdgeで8項目を確認した。序盤の汗と解除、落ち込みの解除、体操服のさくらの照れと病院の話への切替、ことはの記号なしの不満、プールの孤立、父親の急変、英語の同じ動き。本文・マニフェスト・既存ボイスは作業前との比較でも変更なし。自動検査とブラウザ確認の記録は `D:/AI/stella-scenario-review/emote-scenario/` に保存する。全ルートの演技テンポを人が通しプレイして判断した結果ではない。

関連：[エモートの仕様と実装見本](../character-emotes.md)、[台詞と表情のレビュー](11-dialogue-expression.md)。
