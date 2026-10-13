# 台詞・演技意図と立ち絵の表情の照合（2026-10-12）

ユーザー指摘の序盤の延原を起点に、全12ファイル・190ラベルを追加の観点で確認した。前の10観点の記録とは別に、FACE01〜30を記録する。24項目を日英へ実装、2項目を任意案として保留、4項目は意図を確認して維持した。

## 確認の方法と基準

日本語の話者付き台詞1,040行（主人公を除く）と、前後の地の文・表示命令を読み合わせた。実際のparserで読み込んだ命令から、show／expr／hide／move、衣装のspeakerKey、スチル表示と解除、選択と条件分岐で届き得る表情を照合した。条件の両側を探索する静的な一覧は条件を過大に含むため、ゲームの到達確率の評価には使わない。

表情は台詞の単語だけで決めず、相手・話題・直前の反応・本人の意図を読む。笑顔の仮面、怒りを抑える声、静かな拒否も区別する。強い表情の解除、聞いている人物の顔、泣き始めと泣きやみ、スチルから戻った顔を確認する。一台詞ごとに必ず絵を変える方針ではない。

既存素材を使用。延原のpanic／relieved／happy／normalと、主要人物の表情見本を目視した。全表情の新規素材制作、全場面の実機通しプレイ、個別の新しい音声の試聴は行っていない。英語は同じ演出命令へ反映し構造を検査した。下の演技意図は次回収録の指針であり、APIへ送信済みの指示ではない。

## ファイル別の確認範囲

| ファイル | 主人公以外の話者付き台詞 | 結果 |
|---|---:|---|
| [chapter1.md](../../scenarios/chapter1.md) | 65 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [chapter2.md](../../scenarios/chapter2.md) | 102 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [chapter3.md](../../scenarios/chapter3.md) | 90 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [chapter4.md](../../scenarios/chapter4.md) | 69 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [chapter5.md](../../scenarios/chapter5.md) | 58 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [chapter6.md](../../scenarios/chapter6.md) | 70 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [chapter7.md](../../scenarios/chapter7.md) | 134 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [chapter8.md](../../scenarios/chapter8.md) | 64 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [route_sakura.md](../../scenarios/route_sakura.md) | 143 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [route_kotoha.md](../../scenarios/route_kotoha.md) | 98 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [bad_end.md](../../scenarios/bad_end.md) | 7 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |
| [route_mahiru.md](../../scenarios/route_mahiru.md) | 140 | 台詞・聞き手・表情の引継ぎ・スチルを確認 |

## 記録項目

原文の役割と演技意図を表情へつなぐ。実装済み項目の「変更」は、今回採用した既存素材と切替タイミング。

## FACE01｜実装済｜朝の延原：焦りが軽口へ残る

対象：`chapter1.chapter1_morning_gate.r009`（[chapter1.md:92](../../scenarios/chapter1.md#L92)）。

本文：あ、お前の席か。じゃ、ついでに配ってくれよ

表情：panic → relieved → happy。プリントを机へ置けた時点で息をつき、配布も任せようとする軽口へ。r009は「じゃ、ついでに配ってくれよ」、主人公は「自分で配れ」。目的が後から推測される旧文を整理。

演技意図：切迫した短い呼びかけ → 安堵 → 調子に乗った軽口。冗談を焦り声で押し通さない。

## FACE02｜実装済｜担任に注意されたさくら

対象：`chapter1.chapter1_homeroom.r015`（[chapter1.md:155](../../scenarios/chapter1.md#L155)）。

本文：あ、すいません！

表情：happy → surprised。注意への反応を笑顔から驚きへ切り替える。

演技意図：不意に呼ばれて短く謝る。

## FACE03｜実装済｜再会したまひるが近況をかわす

対象：`chapter1.chapter1_breaktime.r013`（[chapter1.md:179](../../scenarios/chapter1.md#L179)）。

本文：勇くん、背、伸びたね

表情：happy → normal → happy。元気だったかを聞かれた時点で通常顔へ。教科書の用件に話を戻したら明るさを戻す。

演技意図：再会の喜びは保ちつつ、近況をかわす箇所は一拍置く。過剰に悲しませない。

## FACE04｜実装済｜ことはの照れが日付の会話まで残る

対象：`chapter2.chapter2_start.r025`（[chapter2.md:44](../../scenarios/chapter2.md#L44)）。

本文：日付だと思います

表情：shy → normal。主人公が屋上の時刻へ話題を戻すところで通常顔に戻す。聞き手としての表情も解除。

演技意図：日付は淡々と答える。照れ声を後の話題まで持ち越さない。

## FACE05｜実装済｜体育の延原の軽口がpanic

対象：`chapter2.chapter2_pe.r002`（[chapter2.md:147](../../scenarios/chapter2.md#L147)）。

本文：桐島、今日の俺、声で貢献するから

表情：入口をpanicからhappyへ。声で二人分働くという調子のよい冗談を、最初から笑顔で始める。

演技意図：おちゃらけた自慢。落とし物や事故の切迫感ではない。

## FACE06｜実装済｜部活前のさくらが驚いたまま

対象：`chapter2.chapter2_sakura_event.r007`（[chapter2.md:193](../../scenarios/chapter2.md#L193)）。

本文：知ってたんだけどね、時間は。あー、行くかあ

表情：surprised → normal。隣にいた主人公に気づいた驚きはr002まで。r004の時刻確認から通常顔へ。

演技意図：驚きから、動き出すのをためらう普段の会話へ。

## FACE07｜実装済｜読書課題の驚きが反論まで続く

対象：`chapter3.chapter3_start.r021`（[chapter3.md:36](../../scenarios/chapter3.md#L36)）。

本文：勇くんも喋ってたじゃん

表情：surprised → normal。課題の指定を知るr014・r019の驚きは残し、主人公へ言い返すr021で戻す。

演技意図：困惑を受けて、軽い抗議へ切り替える。

## FACE08｜実装済｜弁当箱が落ちてもさくらがexcited

対象：`chapter3.chapter3_lunch.r021`（[chapter3.md:97](../../scenarios/chapter3.md#L97)）。

本文：乗り出した拍子に、さくらの膝から弁当箱が落ちた。

表情：excited → surprised → happy。落下の地の文で驚き、中身が無事と分かったr026で笑顔へ。ことはの冗談を聞く顔にも反映。

演技意図：落として焦る、汚れを気にする、中身を確かめて落ち着く。

## FACE09｜実装済｜ことはのthinkingが本を貸す会話へ残る

対象：`chapter3.chapter3_music_room.r024`（[chapter3.md:222](../../scenarios/chapter3.md#L222)）。

本文：そこは覚えてください

表情：thinking → normal。「そこは覚えてください」で声が普段へ戻ることを絵にも反映。貸し借りの軽いやり取りは通常顔。

演技意図：重い回想から会話へ戻る。最後まで沈み込ませない。

## FACE10｜実装済｜まひるが距離を指摘されても笑顔

対象：`chapter3.chapter3_mahiru_photo.r022`（[chapter3.md:267](../../scenarios/chapter3.md#L267)）。

本文：前よりは、戻ってきたつもりだったんだけど

表情：happy → normal → happy。遠くにいるようだと言われる直前で笑顔を解除。話したくない境界を守り、写真の軽口で笑顔へ戻す。

演技意図：嬉しさから戸惑いへ。中学の事情をかわす言葉は小さく、撮影の冗談で緩める。

## FACE11｜実装済｜ノート発見の驚きが人生の話まで残る

対象：`chapter4.chapter4_corridor.r016`（[chapter4.md:142](../../scenarios/chapter4.md#L142)）。

本文：それだと、あんまり意味なくて。生きててよかった理由、集めてるの

表情：surprised → normal → thinking。ノートを返した主人公への返事から通常顔へ。「生きててよかった理由」で考える顔に切り替える。

演技意図：見つかった安堵、普段の返答、慎重な説明を分ける。

## FACE12｜実装済｜河川敷で長く笑うまひるが通常顔

対象：`chapter6.chapter6_mahiru_talk.r028`（[chapter6.md:272](../../scenarios/chapter6.md#L272)）。

本文：まひるは画面を見て、長く笑っていた。

表情：normal → happy。長く笑ったという地の文へ、私服の立ち絵のhappyを合わせる。

演技意図：写真の主人公を見て自然に笑う。

## FACE13｜実装済｜買い物リストを受け取った延原がpanic

対象：`chapter7.chapter7_festival.r009`（[chapter7.md:91](../../scenarios/chapter7.md#L91)）。

本文：はいはい。お釣りも返します

表情：panic → happy。忘れる心配の顔はリストを受け取るまで。お釣りも返すという軽口で笑顔へ戻す。

演技意図：心配が解けた軽い返事。

## FACE14｜実装済｜「見ないでよ」のさくらが通常顔

対象：`chapter7.chapter7_sakura_break.r003`（[chapter7.md:145](../../scenarios/chapter7.md#L145)）。

本文：見ないでよ

表情：normal → angry → normal。短い強い拒絶で怒り顔。ハサミの用件だと気づくr006で通常顔へ戻し、謝罪まで怒らせない。

演技意図：瞬間的に強く出た後、言い過ぎに気づいて声を落とす。

## FACE15｜実装済｜足と兄の事情を聞くまひるがhappy

対象：`chapter7.chapter7_rooftop_move.r007`（[chapter7.md:245](../../scenarios/chapter7.md#L245)）。

本文：足、まだ痛む？

表情：happy → normal。屋上への明るい誘いから、足の具合を聞くタイミングで通常顔へ。回想を一律に泣き顔にはしない。

演技意図：心配して尋ね、急がせたことに気づいて謝る。

## FACE16｜実装済｜兄の回想を聞くさくらが笑顔のまま

対象：`chapter7.chapter7_rooftop.r013`（[chapter7.md:305](../../scenarios/chapter7.md#L305)）。

本文：こういう夕方、お兄ちゃんが好きだった

表情：聞き手のhappy → normal → happy。まひるの兄の話ではさくらの聞く表情を通常顔へ。スチル解除後の帰り支度では明るさを戻す。

演技意図：発話していない間にも、話題を受けて黙る演技を合わせる。

## FACE17｜実装済｜「十月だからかな」のまひる

対象：`chapter7.chapter7_evening_classroom.r022`（[chapter7.md:400](../../scenarios/chapter7.md#L400)）。

本文：見えてるのと、残したいのが違う感じ。十月だからかな

表情：happy → normal → happy。写真に残したいものの違いを話す箇所で通常顔へ。コンビニの誘いで笑顔を戻す。

演技意図：自分でも理由が定まらない間を置き、次の用件で戻る。悲しい声を先取りしない。

## FACE18｜実装済｜休みたいさくらが接客のexcitedのまま

対象：`chapter8.chapter8_sakura_cafe.r017`（[chapter8.md:91](../../scenarios/chapter8.md#L91)）。

本文：足、疲れた。あとで休もうかな

表情：sakura_apron excited → normal。足の疲れを認めるタイミングでエプロン衣装の通常顔へ。交代する間も接客の勢いを残しすぎない。

演技意図：客への明るい声から仲間への小さい本音へ。

## FACE19｜実装済｜後輩のけがを確認するさくらがhappy

対象：`route_sakura.sakura_ch10_gym.r006`（[route_sakura.md:298](../../scenarios/route_sakura.md#L298)）。

本文：どこ打った？　足、動く？

表情：sakura_sports happy → serious → normal。けがの確認と先生を呼ぶ指示は真剣な顔。練習を終える声かけで通常顔へ。

演技意図：状況確認と指示ははっきり、最後は落ち着いて安心させる。

## FACE20｜実装済｜病院で泣くさくらが通常顔

対象：`route_sakura.sakura_ch11_hospital.r012`（[route_sakura.md:457](../../scenarios/route_sakura.md#L457)）。

本文：あたし、今日は泣かないつもりだったのに

表情：normal → crying → normal。泣かないつもりだったと言うところから泣き顔。泣きやんだ後の「病院、一緒に来て」で通常顔へ。

演技意図：崩れながら話す、待ってもらう、落ち着いて頼む順序。

## FACE21｜実装済｜屋上で泣き声になるまひるの反映が遅い

対象：`route_mahiru.mahiru_ch10_rooftop.context001`（[route_mahiru.md:284](../../scenarios/route_mahiru.md#L284)）。

本文：腕を支えたまま、俺も床へ腰を下ろした。

表情：mahiru_no_camera normal → crying。泣き声へ崩れる地の文からカメラなしの泣き顔へ変更。次のラベルまで通常顔を引っ張らない。

演技意図：声が崩れた後の兄の話は、その泣き方を継続する。

## FACE22｜実装済｜ことはの告白が全て通常顔

対象：`route_kotoha.kotoha_ch10_start.r016`（[route_kotoha.md:157](../../scenarios/route_kotoha.md#L157)）。

本文：あの日、うまく弾けていなかったんです。父の顔を見ようとして。それから、ああなって

表情：normal → thinking → sad → normal。コンクールの話を始めるときにthinking、自分を責める部分でsad、主人公との境界を示すr024で通常顔へ。

演技意図：事実の説明と自責を分ける。拒否は大声の怒りにせず、静かにはっきり。

## FACE23｜実装済｜演奏後に自分から誘うことは

対象：`route_kotoha.kotoha_ch12_good_end.r021`（[route_kotoha.md:523](../../scenarios/route_kotoha.md#L523)）。

本文：もう一曲、聴きますか

表情：normal → happy。止まった手を振り返る通常顔は残し、もう一曲聴くかと自分から誘うところで穏やかな笑顔へ。

演技意図：演奏を評価してほしい言い方から、自分が弾きたい誘いへ。

## FACE24｜ユーザー採用・実装済｜呼び方を意識するさくらの照れ

対象：`chapter6.chapter6_sakura_talk.r026`（[chapter6.md:117](../../scenarios/chapter6.md#L117)）。

本文：なんでだろ。勇くん。……変に意識しちゃったじゃん

表情：normal → shy → normal。ユーザーの指定により照れ顔を採用（2026-10-12）。r026の「勇くん。……変に意識しちゃったじゃん」で体操着のshyへ切り替え、一緒に帰る誘いのr028まで残す。r030で病院に寄る話へ移る際にnormalへ戻す。日英に同じ命令を反映。

演技意図：呼び方を言い直すときに短い照れを見せ、そのまま一緒に帰る誘いへつなぐ。父親の病院の話では通常の声と表情へ戻す。台詞本文は変更せず、新たな音声生成は行わない。

## FACE25｜保留・任意案｜告白後に走り出すさくらの笑顔

対象：`route_sakura.sakura_good_end_rooftop.r027`（[route_sakura.md:641](../../scenarios/route_sakura.md#L641)）。

本文：あはは、待ってってば

表情：normal維持／happyを検討。告白スチル解除から走り出すまでが短い。happyの一枚を挟む案は、解除直後の画面の忙しさと合わせて判断。

演技意図：笑いながら先へ走る。スチルから戻る時間と声の間を合わせる。

## FACE26｜保留・任意案｜転校することはの表情

対象：`route_kotoha.kotoha_ch12_bad_end.r006`（[route_kotoha.md:571](../../scenarios/route_kotoha.md#L571)）。

本文：また別の学校です。……どこへ行っても、わたしは同じでしょうね

表情：normal維持／sadを検討。距離を保った礼儀正しい別れにも読める。悲しみを絵で先に確定させず、演技と合わせて判断。

演技意図：平静を保つ挨拶。悲しさを強調しすぎない。

## FACE27｜現状維持｜さくらの無理な笑顔

対象：`route_sakura.sakura_bad_end.r007`（[route_sakura.md:682](../../scenarios/route_sakura.md#L682)）。

本文：え。……うん！　ごめんごめん。先帰るね

表情：happy／blankの使い分けを維持。明るい声で引くところと、待ち続けた後の空白の顔を区別する。Bad Endだから一律にsadへ変えない。

演技意図：明るく取り繕う声と表情が同じ意図を持つ。

## FACE28｜現状維持｜水着のさくらの空白の顔

対象：`chapter5.chapter5_sakura_talk.r009`（[chapter5.md:150](../../scenarios/chapter5.md#L150)）。

本文：立ち上がったさくらが俺の手元を見た。

表情：blank → normalは既に指定済み。地の文の空白の顔にはblank、次の主人公への問いにはnormalが入っている。台詞だけの一覧ではこの間の演出を見落とさない。

演技意図：一瞬の間から、主人公を気にかける問いへ。

## FACE29｜現状維持｜ことはの一音後の涙

対象：`route_kotoha.kotoha_ch11_start.r021`（[route_kotoha.md:350](../../scenarios/route_kotoha.md#L350)）。

本文：父に、聴かせたかった

表情：crying → normal → happyを維持。泣く描写と演奏を続ける意思、主人公へ教える会話の段階が既に分かれている。

演技意図：泣きながら言う部分と、教える声へ戻る部分を区別する。

## FACE30｜現状維持・運用追加｜スチル中・画面外・サブキャラの扱い

対象：`chapter8.chapter8_branch.r004`（[chapter8.md:247](../../scenarios/chapter8.md#L247)）。

本文：桐島。ここ俺が行く

表情：表示している絵を基準に判断。延原が動く場面はスチルからseriousの立ち絵へ戻る指定が成立。担任の画面外の発話、慎の回想、幕間の内面も確認。台詞があるだけで全員を画面に出さず、スチルに隠れた表情変更だけで改善したと扱わない。

演技意図：画面に出ていない話者も演技は作る。画面に残る聞き手の表情は別に指定する。

## 音声と検証

台詞を改稿したのは日英の `chapter1.chapter1_morning_gate.r009` と主人公のr010。r009の旧音声は日英manifestから外した。原音・以前のmanifest・送信記録は保存し、再収録までその台詞は無音になる。その他のNPC本文は維持。隣接するr006・r011は文脈・間の確認対象とし、今回の表情変更だけを理由に一律に再生成しない。

日英の参照・素材・分岐・表示命令の整合検査は通過。音声14件、表示競合7件、シナリオ26件（今回8件追加）の回帰テストを通過。序盤の焦り解除、後輩のけがの確認、泣き声になる時点、エプロン衣装の表情、聞き手の顔を分岐を通して確認した。APIは呼んでいない。

Edgeの16項目も通過。本編の朝の教室を進めて延原の焦り・安堵・笑顔の切替と新しい本文を確認し、音声UIの既存動作も確認した。ローカルの合成音声による制御検査であり、新しい演技の試聴ではない。原音などmanifest以外の115ファイルは変更前と一致し、manifestの差分は日英r009の登録削除のみ。

静的な照合一覧・変更前の本文とmanifest・表情の切替一覧は、ゲーム外の `D:/AI/stella-scenario-review/dialogue-expression-review/` に保存。次回は保留2項目と、実際の声・表示時間を合わせた通しプレイを確認する。
