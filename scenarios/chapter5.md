// ===================================================================
//  放課後のステラ — Chapter 5「水面の午後」
// ===================================================================

# pool_start

@scene classroom fade
@bgm daily_life.mp3
@se evening_wind.mp3
@wait 800

> 七月後半。
> 梅雨が明けて、空が一気に高くなった。
> 日差しが真上から来る季節になっていた。

@wait 500

> 朝から気温が高い。
> 教室の窓を開けていても、風は熱いまま入ってくる。
> 黒板の上の温度計は、午前中からすでに三十度を超えていた。

@wait 600

> 扇風機が首を振るたびに、誰かのプリントが舞い上がる。
> それを押さえる手。笑い声。椅子を引く音。
> 七月の教室は、そういう音で満ちていた。

@wait 700

> 夏という季節が、人間を少しだけ雑にする。

@wait 400

> ……別に、嫌いじゃない。

@wait 800

@jump pool_morning_class


# pool_morning_class

@scene classroom fade
@bgm daily_life.mp3
@se classroom_noise.mp3
@wait 500

@show sakura right excited fade_in
@wait 300

sakura: 聞いた？　今日プールじゃん！

player: 時間割に書いてある

sakura: そういう話じゃなくて！
sakura: テンションの問題！　気分の問題！

@expr sakura happy
@wait 300

sakura: あたし、プールの授業だと思うと朝から体が軽いんだよね
sakura: バドじゃ水泳と違う筋肉使うから、いい気分転換になるし

player: バドミントン部の練習量からしたら、プールなんて余裕だろ

sakura: でもさ、水の感触って別物じゃん！
sakura: 浮いてる感じ、抵抗感、全部違う！

@wait 400

> さくらが話すと、周りの空気が少し変わる。
> 温度が上がる、というより、輪郭がはっきりする感じ。
> こいつのいる場所は、いつも少しだけ鮮明だ。

@wait 500

@show kotoha left normal fade_in
@wait 300

> ことはは窓際の席で、静かに教科書を読んでいた。
> プールの話が聞こえているのかいないのか、視線は本の上で動かない。

sakura: ことはちゃんはどう？　プール得意？

kotoha: ……

@expr kotoha thinking
@wait 500

kotoha: 得意、とは少し違います
kotoha: でも、嫌いでもないです

sakura: どっちだよ！

kotoha: どちらでもない、ということです
kotoha: 水の中は、静かなので

@expr sakura surprised
@wait 300

sakura: え、プールで静かとか感じたことないかも。あたし全力で泳ぐから

player: お前はだいたい何でも全力だからな

sakura: 褒めてる？

player: 事実を言ってる

@expr sakura happy
@wait 300

sakura: 同じじゃん！

@wait 500

> ことははその会話を聞いて、少しだけ表情を動かした。
> 笑う、というほどではない。
> ただ、目の端が柔らかくなった。

@wait 600

> まひるとは別クラスだから、今朝は会っていない。
> 朝の廊下で見かけることもある。
> でも今日はまだ、その顔を見ていない。

@wait 400

@hide sakura fade_out
@hide kotoha fade_out
@wait 400

@se school_bell.mp3
@wait 600

> 授業の始まりを告げるチャイムが鳴った。
> 七月後半の朝が、また一時間進んでいく。

@wait 800

@jump pool_prep


# pool_prep

@scene corridor fade
@bgm daily_life.mp3
@se footsteps.mp3
@wait 600

> 三時間目。体育の時間になった。
> 廊下を移動していると、プールの塩素の匂いが風に乗ってくる。
> 夏のプールの匂いというのは、記憶を引っ張ってくる力がある。
> 小学校の授業、帰り道の疲れ、あの頃の日差しの角度まで。

@wait 700

> 更衣室で着替えながら、周りの声がざわついていた。
> 「どのコースになるかな」
> 「速泳ぎが得意なやつ、結局いつも同じメンバーだよな」
> 「日焼けやだー」
> そういう声が壁を抜けてくる。

@wait 600

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 800

> 更衣室の扉を開けると、光がまず来た。
> 七月の太陽が水面を白く砕いている。
> 目を細めながら外に出ると、空の青さが思ったより濃かった。

@wait 500

> プールサイドのコンクリートはすでに熱を持っていて、
> 足の裏から夏が伝わってくる。
> 水しぶきが飛んでくる場所だけ、少しだけ温度が違う。

@wait 600

@show sakura_swimsuit left excited fade_in
@wait 300

sakura: やばい、水めっちゃきれい！

> さくらがプールサイドに出てきた瞬間、声が一回り大きくなった。
> 目が輝いている。本当に輝いている。
> 夏という季節が、こいつのためにあるみたいな顔をしていた。

@wait 400

sakura: 勇くん、見て見て！　光の反射がすごくない？
sakura: なんかキラキラしてて、目が痛いくらい！

player: それ、単純に眩しいだけだろ

sakura: でもいい眩しさじゃん！

@expr sakura_swimsuit happy
@wait 300

> 確かに、今日の水面はよく光っていた。
> 梅雨明けの空は何も遮るものがなく、
> 光が水面に当たるたびに砕けて飛び散る。
> それは確かに、眩しかった。

@wait 500

@show kotoha_swimsuit right normal fade_in
@wait 300

> ことははプールサイドの端の方に立っていた。
> さくらとは少し距離を置いた場所。
> でも、遠ざかっているというより、ただそこが居場所なだけの立ち方だった。

@wait 400

kotoha: ……空が高くなりましたね

> 独り言なのか、声をかけているのかわからないくらいの音量だった。
> でも、こちらに向けた言葉だということは伝わった。

player: 七月後半になるとそうなるな

kotoha: 梅雨の間は、空に蓋がある感じがして
kotoha: それが取れると、こんなに遠かったんだと、毎年驚きます

@wait 400

> ことはは水面を見ていた。
> 反射する光の中に、何かを探すような目。

@wait 500

@hide kotoha_swimsuit fade_out
@hide sakura_swimsuit fade_out
@wait 300

> 先生の笛が鳴る前の短い時間、
> プールサイドはがやがやとした声で満ちていた。
> さくらは早速誰かと話していて、ことははまた少し離れたところにいて、
> 俺はその中間くらいに立っていた。

@wait 600

> 準備体操の号令がかかった。
> 夏の授業が、始まる。

@wait 500

@jump pool_lesson


# pool_lesson

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se gym_whistle.mp3
@wait 500

> 先生の笛が鳴った。

@show sakura_swimsuit center excited fade_in
@wait 300

sakura: よし、行きますか！

> さくらが最初に飛び込んだ。

@expr sakura_swimsuit happy
@wait 400

> 全力だった。
> いつでも、どこでも、全力だ。

@wait 300

> 水面を割った瞬間、白いしぶきが上がった。
> さくらの泳ぎは迷いがない。
> バドミントンで鍛えた体は水の中でも筋道があって、
> 無駄な動きがほとんどなかった。

@wait 500

> かと思えば、折り返しのタッチがものすごく速い。
> 壁に触れた瞬間、水が跳ね上がる。
> また折り返して、また跳ね上がる。
> その繰り返しが、リズムみたいに見えた。

@hide sakura_swimsuit fade_out
@wait 400

@show kotoha_swimsuit right normal fade_in
@wait 300

> ことははコースの端にいた。

> 水面を、ただ見ていた。

@wait 500

> 泳ぐ気配がなかった。
> 泳げないわけじゃないと思う。
> ただ、今は泳ぐことに興味がないように見えた。

@wait 400

> 水面に映る空。
> 逆さまになった雲の形。
> ことははそれを、静かに観察していた。

@wait 600

> 同じプールの中で、二人はまるで別の場所にいるみたいだった。

@hide kotoha_swimsuit fade_out
@wait 300

@jump pool_sakura_kotoha


# pool_sakura_kotoha

@hide_all fade_out
@wait 300

@still pool_sakura_kotoha
@wait 800

> 授業の半ばになって、さくらが全速力で泳いでいる横で、
> ことはがコースの端に立って水面を眺めている、
> そういう場面が続いていた。

@wait 600

> スタート台の端から見ると、その対比がはっきりわかる。
> 水を切り裂いて進んでいく者と、
> 水面の模様を読んでいる者。

@wait 700

> どちらが正しいとか、どちらが正しくないとか、
> そういう話ではない。
> ただ、二人は同じ場所で、まったく違うものを見ていた。

@wait 800

> プールという場所が、
> こんなにも違う何かになれるのだと、
> その時間だけ考えていた。

@wait 600

@jump pool_kotoha_water


# pool_kotoha_water

@still_hide
@wait 300

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 500

@show kotoha_swimsuit right normal fade_in
@wait 400

> 俺の番が終わって、端の方で水気を拭いていると、
> ことはがすぐ隣にいるのに気づいた。

@wait 400

> 相変わらず、水面を見ていた。

player: ……泳がないのか

kotoha: 少し前に泳ぎました

@wait 300

kotoha: 今は、見ているほうが好きなので

player: 何を見てる

@expr kotoha_swimsuit thinking
@wait 500

kotoha: 水面の動き方、です

kotoha: 誰かが泳ぐたびに、波が広がって
kotoha: 端まで届いて、跳ね返って、また戻ってきます

@wait 400

player: そうだな

kotoha: 声に似ていると思って

player: 声？

@expr kotoha_swimsuit normal
@wait 500

kotoha: 音、というか……
kotoha: 音楽かもしれません

@wait 300

kotoha: 水面って少し、音楽に似てるんです

player: ……どういう意味だ

@expr kotoha_swimsuit thinking
@wait 600

kotoha: 波は、鍵盤と似ていると思います
kotoha: 誰かがどこかを押すと、全体に響いて、広がって、消えていく
kotoha: 同じ鍵盤を押しても、強さが違えば全然違う音になる

@wait 400

kotoha: 水面もそれに近い気がして
kotoha: さくらさんが泳ぐと、波の形が全然違うんです
kotoha: ……さっきまで見ていたので

@wait 600

> ことはがピアノをやめたことは、どこかで聞いた。
> 詳しいことは知らない。
> でも今のことはの声には、音楽の話をするとき特有の、
> 微妙な間合いがあった。

@wait 500

player: ……ピアノは、まだ弾いてるか

@expr kotoha_swimsuit surprised
@wait 400

kotoha: ……どうして、それを

player: 以前、図書室で。音楽の本を持ってたから

@wait 400

kotoha: ……

@expr kotoha_swimsuit normal
@wait 500

kotoha: やめました
kotoha: 少し前に

@wait 300

kotoha: でも、音の話はまだ好きです
kotoha: やめたからといって、耳が変わるわけじゃないので

@wait 600

> その言葉が、何か大きなものを小さく言い換えているように聞こえた。
> 踏み込む場面じゃない、とは思う。
> それでも、簡単に流せなかった。

@wait 400

player: 水面が音楽に見えるのは、お前がそういう耳を持ってるからじゃないか

@expr kotoha_swimsuit surprised
@wait 400

kotoha: ……

@wait 500

kotoha: そう言ってもらえると
kotoha: 少し、楽になります

@wait 600

> 小さな声だった。
> でも、確かな重さがあった。

@wait 500

@hide kotoha_swimsuit fade_out
@wait 300

@se gym_whistle.mp3
@wait 400

> 先生の笛が鳴った。
> 授業の後半が始まる。

@wait 500

@jump pool_sakura_scene


# pool_sakura_scene

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 500

@show sakura_swimsuit left excited fade_in
@wait 300

> さくらは授業の最後まで、ほとんど全力で泳いでいた。
> 折り返しのたびに勢いが落ちない。
> こいつの体力はどこに入っているんだろう、と少し本気で思った。

@wait 600

@expr sakura_swimsuit happy

sakura: やばい、今日めっちゃ気持ちよかった！
sakura: タイムも自己ベストに近かったかも！

> 水から上がったばかりのさくらは、息が少し上がっていた。
> でも顔は晴れやかだった。
> 全力を出しきった顔というのは、こういう顔をする。

@wait 400

player: 最後まで全力だったな

sakura: そりゃそうでしょ！
sakura: プールの授業って年に何回もないんだから、もったいなくない？

player: 発想が部活人間だ

sakura: 褒めてる？

player: そのまま受け取っとけ

@expr sakura_swimsuit excited
@wait 400

sakura: じゃあ受け取ります！　ありがとう！

@wait 500

> さくらは笑って、タオルで顔を拭いた。
> 水滴がタイルに落ちる。
> 夏の光の中で、その水滴が一瞬だけきらきらした。

@wait 600

@hide sakura_swimsuit fade_out
@wait 300

> 授業終了の笛。
> みんなが上がり始める。
> プールサイドに声が戻ってきた。

@wait 600

@jump pool_sakura_kotoha_end


# pool_sakura_kotoha_end

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 500

> 着替えに向かおうとして、一度振り返った。

@wait 300

> さくらが壁際でしゃがんでいるのに気づいた。

@wait 500

> 他のみんなはもう移動していた。
> プールサイドの端。
> コンクリートの壁に背中を預けて、膝を抱えている。

@wait 600

> 疲れた、というより、出しきった後の静けさに見えた。
> さくらがこういう座り方をするのを、初めて見た。

@wait 800

@choice
- "大丈夫か" [sakura_favor+3] -> pool_sakura_talk
- "……" -> pool_sakura_skip


# pool_sakura_talk

@show sakura_swimsuit left normal fade_in
@wait 300

player: 大丈夫か。

@wait 300

> さくらは答えなかった。

@wait 1200

> 顔を上げない。
> 膝を抱えたまま、壁を見ている。

@wait 800

> それだけの時間が、やけに長かった。

@wait 600

sakura: ……うん

> 立ち上がろうとして、一度止まった。
> もう一度、ゆっくり立つ。

@wait 800

> いつもなら、そこに「あはは」が来る。
> でも来なかった。

@wait 500

sakura: ……なんで、そういうこと聞くの。

@wait 400

player: 顔色。

@wait 300

> さくらが俺を見た。
> 少し、驚いているような顔。

@wait 500

sakura: そっか。

@wait 800

> 笑わなかった。
> 「あはは」が出てこなかった。
> そのことに、さくら自身が少し驚いているように見えた。

@wait 600

@expr sakura_swimsuit blank

> ほんの一瞬だった。
> さくらの顔から、何かが消えた。
> 笑顔でも、驚いた顔でもない。
> あの放課後に見たのと同じ、光の消えた顔。

@wait 800

> 空っぽの顔。
> 何も置かれていない場所みたいな顔。

@wait 600

@expr sakura_swimsuit surprised

sakura: あ、

> 気づかれた、と思ったのかもしれない。
> さくらは一瞬だけ目を瞬かせた。

@wait 500

@expr sakura_swimsuit happy

sakura: ……ごめんごめん、ちょっとぼーっとしてた！
sakura: 全力で泳いだから、頭空っぽになっちゃってさ

player: ……

@wait 500

> 笑っている。
> いつもと同じ笑い方で、同じ声で。
> でも、その笑顔の手前に何かがある。
> そういう気がして、俺は何も言えなかった。

@wait 600

sakura: ……ねえ、勇くん

player: 何だ

sakura: 勇くんってさ

@expr sakura_swimsuit thinking
@wait 500

sakura: ちゃんと休んでる？

player: ……俺の話か

sakura: うん。
sakura: なんか、最近ちゃんと眠れてなさそうな顔してること、たまにあるから

@wait 500

> 逆に心配された。
> さくらから、こういう言葉が来るとは思っていなかった。

@wait 400

player: お前に言われるとは思わなかった

sakura: なんで？

player: お前が全力でいつも元気そうだから

@expr sakura_swimsuit normal
@wait 600

sakura: 全力で元気に見えるやつが、人のこと気にしないとは限らないよ

@wait 500

> その言葉は、思ったより真っ直ぐだった。
> 笑いでごまかさなかった。

@wait 600

player: ……ちゃんと寝てる

sakura: ほんと？

player: 大体は

@expr sakura_swimsuit happy
@wait 400

sakura: 「大体は」ってとこが気になるけど
sakura: まあ、信じとく！

@wait 500

sakura: ……ありがとね。声かけてくれて。

> 小さかった。
> でもいつもより、ずっと本物に聞こえた。

@wait 600

@hide sakura_swimsuit fade_out
@wait 400

@jump pool_kotoha_scene


# pool_sakura_skip

> さくらは俺に気づかないまま立ち上がった。

@wait 300

> そのまま、行ってしまった。

@wait 500

> 壁のそこだけ、ほんの少し空気が重かった。
> でも、もう誰もいない。

@wait 400

@jump pool_kotoha_scene


# pool_kotoha_scene

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 500

@show kotoha_swimsuit right normal fade_in
@wait 400

> ことははまだそこにいた。

> 水面を見ていた。

@wait 500

player: ……。

@wait 300

kotoha: 水は、静かですね。

@wait 400

player: プールだからな。

@wait 300

kotoha: ……音を吸い込むんです。

@wait 300

kotoha: 水は。

@wait 500

> 返す言葉が、なかった。

@wait 400

kotoha: みんなが上がると、波が少しずつ小さくなっていって
kotoha: 最後は、水面が鏡みたいになります

@wait 500

kotoha: ……空が映るんです
kotoha: 梅雨が明けた後の空は、ここで見るのが好きです

player: 逆さまの空か

kotoha: 逆さまのほうが、少し遠く見えます
kotoha: 本物の空より

@wait 600

> ことはは泳がなかった。
> でも、プールにいることには意味があった。
> こいつにとって、水面はそういう場所なのかもしれない。

@wait 500

player: ……さくらとは、正反対だな

kotoha: そうかもしれません
kotoha: でも、さくらさんの泳ぎ方が、波を作るから

@expr kotoha_swimsuit normal
@wait 400

kotoha: あの波が、ここまで来るのを待っていたりします

@wait 600

> さくらの全力が、ことはの水面に届いている。
> そういう話だった。

@wait 500

@hide kotoha_swimsuit fade_out
@wait 300

@still_hide
@wait 200

@jump pool_mahiru_window


# pool_mahiru_window

@scene corridor fade
@bgm daily_life.mp3
@wait 500

> 次の授業へ移動する廊下。
> プール棟に沿った通路を歩いていると、窓の外が開けた。

@wait 500

@still pool_mahiru_window
@wait 600

> 別のクラスが、水泳の授業をしていた。

@wait 400

> プールの中には人の波。
> 先生の笛の音が、ガラス越しに微かに届く。
> 生徒たちはひとかたまりになって、端から端へと泳いでいた。

@wait 700

> ——ひとりだけ、泳いでいない生徒がいた。

@wait 500

> プールサイドの端。
> 水着のまま、一人で立っている。

@wait 400

> まひるだった。

@wait 600

> 見ていると、クラスメイトたちが折り返してくる。
> 水しぶきが上がって、笑い声が弾ける。
> まひるのそばを通って、また向こうへ行く。

@wait 500

> まひるは動かなかった。
> 水面だけを、ずっと見ていた。

@wait 700

> クラスの中にいるのに、
> どこか別のところにいるような立ち方だった。

@wait 600

> 理由を考えようとして、止まった。
> 窓越しのまひるの横顔は、
> こちらには気づいていない。

@wait 600

> 踊り場で会ったときのまひるの目を思い出す。
> 「さみしい色の空の日って、黙ってる人が多いから」

@wait 500

> あのときの目が、少しだけ遠かった。
> 今のまひるも、同じ目をしていた。

@wait 600

> まひるの視線が動いた。
> 水面から、空へ。
> 空から、また水面へ。

@wait 500

> 廊下の人の流れに押されて、俺は歩き出した。
> 窓の外のまひるは、最後まで振り返らなかった。

@wait 800

@still_hide
@wait 300

@jump pool_after_school


# pool_after_school

@scene classroom fade
@bgm daily_life.mp3
@se evening_wind.mp3
@wait 600

> 午後の授業が終わった。
> 日差しは傾いてきたが、まだ熱い。
> 七月の放課後は、時間の進みが遅い。

@wait 500

@show sakura right happy fade_in
@wait 300

> さくらが鞄を肩にかけながら、こちらに向かってきた。
> 午前中のプールで全力を出した後とは思えない元気さだった。

sakura: 勇くん、帰り一緒に行かない？

player: ことははどうした

sakura: ことはちゃんも誘ってるよ！　今来るって

@wait 300

@show kotoha left normal fade_in
@wait 300

> ことははゆっくりと鞄を持ち直して、歩いてきた。

kotoha: ……お待たせしました

sakura: 待ってないよ！　ちょうどよかった！

@expr kotoha normal
@wait 300

> 三人で廊下に出た。
> 夕方の校舎は、昼間より音が少ない。
> 部活の声だけが、遠くから聞こえていた。

@wait 500

sakura: あーでもプールって後から疲れくるんだよね
sakura: 明日の朝、絶対筋肉痛かも

player: 自業自得だろ

sakura: そうなんだけど！　でも後悔はしてない！

@expr sakura excited
@wait 300

kotoha: ……全力で泳いでいましたね

sakura:見てた？

kotoha: 水面から見ていました

sakura: え、どっから

kotoha: コースの端から

@expr sakura surprised
@wait 400

sakura: そっか、ことはちゃんって泳ぐより見てるタイプなんだね

kotoha: そうかもしれません

sakura: なんか……それってかっこいい気がする

kotoha: ……そうですか？

sakura: なんか、「私は観察する側です」みたいな。哲学者みたいな

@expr kotoha surprised
@wait 400

kotoha: ……哲学者と水泳の観戦は、あまり重なりません

sakura: 細かい！

player: お前が適当すぎるんだよ

sakura: 二対一？！

player: そういうわけじゃないが

@wait 400

> さくらが笑った。
> ことはも、今日一番くらいに表情が柔らかかった。
> そういう笑い方をすると、ことはは年齢より少し若く見える。

@wait 500

sakura: ことはちゃんって笑うと可愛いよね

@expr kotoha shy
@wait 300

kotoha: ……そういうことを、突然言わないでください

sakura: なんで？　本当のことだよ

player: お前は人の警戒を解くのが上手いな

sakura: そう？
sakura: ただ思ったことを言ってるだけなんだけど

@wait 500

> 思ったことを言える人間は、羨ましい。
> それが全部かどうかは別として。

@wait 400

kotoha: ……さくらさんは、いつもそうやって人を驚かせますね

sakura: いい意味で？

kotoha: ……いい意味で、だと思います

@expr sakura happy
@wait 400

sakura: ならよかった！

@wait 600

> 下駄箱に着いた。
> 靴を履き替えながら、どうでもない話を続ける。
> 明日の時間割のこと、購買のパンのこと、来週のテストのこと。
> 別に深い意味のない会話。

@wait 500

> でも、そういう会話のほうが、案外長く続く。

@wait 600

sakura: じゃ、また明日！

kotoha: また明日

player: ああ

@hide sakura fade_out
@hide kotoha fade_out
@wait 500

> 二人の背中が別の方向へ消えていった。
> 夕方の校門の外は、まだ明るかった。

@wait 600

@jump pool_end


# pool_end

@scene corridor_evening fade
@bgm evening_piano.mp3
@wait 600

> 帰り道は、一人だった。
> 校門から出て、住宅街へ向かう道。
> 夕方の光が斜めに差して、影が長くなっていた。

@wait 600

> 今日のことを、頭の中で並べ直した。

@wait 400

> さくら。
> 全力で水を切って、全力で笑って、
> でもあの一瞬だけ、笑いが消えた。
> 何も置かれていない、あの顔。

@wait 400

> ことは。
> 泳がずに水面を見ていた。
> 波を見て、音楽を思った。
> やめたピアノのことを、小さな声で話した。

@wait 400

> まひる。
> プールサイドに一人でいた。
> カメラはなかった。
> 水面を見ていた。
> 何を見ていたかは、わからなかった。

@wait 600

> 同じプールにいたのに、三人それぞれが別の場所にいた。
> そういう気がした。

@wait 500

> さくらは水の中に全力で入っていって、
> ことはは水面から世界を読んでいて、
> まひるは水面の向こうにある何かを、まだ俺には見えないものを見ていた。

@wait 600

> 同じ場所にいても、見ているものは違う。
> その違いに気づけるかどうかが、距離を決める。

@wait 500

@bgm stop
@wait 300

@bgm mystery_shadow.mp3
@wait 600

> まひるがあの場所にいた理由が、まだわからない。
> カメラを持たずに、一人で水面を見ていた理由が。

@wait 500

> 新学期が始まってすぐの、踊り場でのことを思い出す。
> 「見失わないで済むから」
> そう言って笑った顔。
> でも目だけが、少しだけ遠かった。

@wait 600

> 俺は今日もまた、窓越しに見ていただけだった。
> 声をかけることも、近づくことも、できなかった。

@wait 500

> まひるが水面に何を見ていたのか、まだわからない。
> わからないまま、今日が終わっていく。

> そういえば、屋上で撮った写真。
> プリントしてみんなに渡すって、あのとき言っていた。
> 何ヶ月も経つのに、まだ受け取っていない。
> ……まひるの中で、あの日はどこに置かれているんだろう。

@wait 700

> ……水は、今日も何かを映していた。

@wait 400

> 逆さまのまま。

@wait 800

> 空も、雲も、こちら側にいる人間の顔も。

@wait 600

> でも映っているのは、いつも逆さまの世界だ。
> そこに何が映っているのか、見ている人間にしかわからない。

@wait 1000

@end "第五章「水面の午後」" -> ch4out_start
