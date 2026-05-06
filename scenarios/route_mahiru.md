// ===================================================================
//  放課後のステラ — まひるルート Ch.9m〜12m
//  「夜明けは、一人では見つけられなかった」
// ===================================================================


// ===================================================================
//  幕間「月夜野まひるの独白」
// ===================================================================

# mahiru_interlude

@window_color mahiru
@scene rooftop_evening fade
@bgm rooftop_wind.mp3
@wait 1200

> ——理由を、今日も一つ集めた。

@wait 1000

mahiru: 今日の良かったこと、三つ書いた。

@wait 1000

mahiru: 一つ目は、給食のデザートがプリンだったこと。
mahiru: 二つ目は、帰り道に猫を見たこと。白くて、耳だけ灰色の猫。
mahiru: 三つ目は……

@wait 1200

mahiru: 空が、きれいだったこと。

@wait 1000

mahiru: お兄ちゃんが死んでから、まひるはずっとこれをやってる。
mahiru: 毎日、何か一つでも良かったことを見つける。
mahiru: 一つもない日は、「今日も生きてた」って書く。

@wait 1200

mahiru: お兄ちゃんはね、理由が足りなくなったんだと思う。
mahiru: 消えていい理由は、いつでも作れる。
mahiru: でも残る理由は、誰かが「これがある」って決めないといけない。

@wait 1500

mahiru: まひるはそれを、毎日集めてる。
mahiru: 少しずつ、ためてる。

@wait 1200

mahiru: ……十月が、近い。

@wait 1000

mahiru: 毎年、この時期になると空が変わる気がする。
mahiru: 気がするだけで、空はたぶん何も変わってないんだけど。

@wait 1000

mahiru: 勇くんと、また話すようになった。
mahiru: 昔と同じで、昔と全然違う。

@wait 1200

mahiru: 昔の勇くんは、もっと遠くにいた。
mahiru: 先に走って行く人だった。
mahiru: まひるが立ち止まっても、振り返らずに行ける人だと思ってた。

@wait 1000

mahiru: でも今は、なんか。
mahiru: 一緒に歩いてる感じがする。

@wait 1200

mahiru: ……それが、怖いんだよね。

@wait 800

mahiru: 大事な人がいると、失うのが怖くなる。
mahiru: だから最初から、あんまり大事にしないようにしてた。

@wait 1000

mahiru: でも、もう少し遅かったかもしれない。

@wait 1500

mahiru: 今日の良かったこと、四つ目。

@wait 800

mahiru: 勇くんと、話した。

@wait 2000

@bgm stop
@wait 800

@window_color reset
@wait 700
@jump mahiru_ch9_start


// ===================================================================
//  Chapter 9m「秋の深まり」
// ===================================================================

# mahiru_ch9_start

@scene corridor fade
@bgm mahiru_theme.mp3
@se footsteps.mp3
@wait 800

> まひるを探して、俺は走った。

> 音楽準備室の前で、ことははまだ扉に手をかけたままでいるはずだった。
> さくらは、一人で病院へ向かっていった。

> 俺の足は、まひるの方へ動いていた。

> 走った、というより。
> 走れたことが、少し意外だった。

> 足首がまだ少し重い気がした。
> でも、動いた。

@wait 700

> まひるは家にいた。
> 何日か休んでから、また登校してきた。
> 何も言わなかった。俺も聞かなかった。

@wait 600

> ただ、いつもと少しだけ違っていた。

@jump mahiru_ch9_return


# mahiru_ch9_return

@scene corridor fade
@bgm mahiru_theme.mp3
@se footsteps.mp3
@wait 1000

> まひるが登校してきた日のことを、よく覚えている。

> 十月の初め。
> 文化祭が終わって、学校は妙に静かになっていた。
> 非日常の空気が抜けると、残るのは普段より少しだけ間の抜けた日常だ。

@wait 700

> 朝、靴箱で見かけた。
> まひるは上履きを片手に持ったまま、廊下の先を見ていた。
> 何かを確かめているみたいな目だった。

@show mahiru center normal fade_in

@wait 800

> 俺が近づくと、まひるは気づいた。

@expr mahiru happy

mahiru: あ、おはよう

player: ……おはよう

@wait 600

> いつもと同じ声だった。
> いつもと同じ笑顔だった。

> でも。

@wait 500

> 俺は何かが引っかかった。
> うまく言葉にならない、小さな違和感。

> 笑顔は本物だと思う。
> 演じているわけじゃない。

> ただ、
> その笑顔が、まひるの全部を埋めていなかった。
> 余白があった。
> 笑っていない部分が、確かにあった。

@wait 800

mahiru: 休んでごめんね

player: ……別に

mahiru: ちょっとしんどかったんだけど
mahiru: もう大丈夫だから

@wait 1000

> 大丈夫。
> その一言を、俺はじっと見ていた。

> 信じないわけじゃない。
> ただ、その言葉はいつだって、
> 言った側が一番信じていない。

@wait 700

player: 無理しなくていいぞ

@expr mahiru normal

mahiru: ……うん

@wait 600

> それだけだった。
> ありがとう、でも大丈夫、でもなく。
> ただ、うん、と言った。

> その「うん」が少し重かった。

@wait 800

@hide mahiru fade_out
@wait 500

@jump mahiru_ch9_notebook


# mahiru_ch9_notebook

@scene classroom fade
@bgm mahiru_theme.mp3
@wait 800

> 毎朝、まひるはノートを開く。

> 「今日、生きていて良かったこと」を書くノートだと、
> 前に教えてくれた。

> ふだんは三行か四行か、
> 短いけれど几帳面な字で埋まっていた。

@wait 700

> 昨日は「桜の木の根元に落ち葉が積もってた」
> 「さくらちゃんが消しゴムをくれた」「窓から鳥が三羽見えた」
> そう書いてあるのを、偶然目にしたことがあった。

> 細かい。
> どれも、見落とそうと思えば簡単に見落とせるものだ。
> でも、まひるは拾っていた。
> 一行一行、丁寧に。

@wait 900

@still mahiru_notebook_one_line
@wait 1500
@still_hide

> 今日の朝、チラリと見えたページには
> 一行しかなかった。

> 「今日も空が青かった」

@wait 800

> それだけだった。

@wait 700

> 読んでしまった、と後悔した。
> 読んでしまったことを、まひるに知られたくなかった。

> でも頭から離れなかった。

> 「今日も空が青かった」

> 空が青かったことだけが、今日の良かったことだった。
> それとも、空が青かったことしか見えなかった。

> どちらの意味なのか。
> どちらでもないのかもしれない。
> ただ、理由が減っていた。

@wait 1000

@show mahiru_no_camera center happy fade_in

mahiru: 勇くん、おはよ

player: おはよう

mahiru: 今日、いい天気だね

@wait 400

@expr mahiru_no_camera normal

> まひるは笑っていた。
> いつもみたいに、ゆっくりと。

> でも、カメラのシャッターを切る回数が
> 先週より少なかった。

> 屋上に行くたびに空を撮っていたのが、
> 最近はただ眺めているだけになっていた。

@wait 600

> カメラを持ってくる日も、減った。
> ストラップだけが鞄に残っていた。
> 引っかかって邪魔そうなのに、外そうともしていなかった。

@wait 700

@hide mahiru_no_camera fade_out
@wait 500

@jump mahiru_ch9_corridor


# mahiru_ch9_corridor

@scene corridor fade
@bgm mahiru_theme.mp3
@se footsteps.mp3
@wait 900

> 昼休み、廊下でまひるとすれ違った。
> 一人だった。
> いつもはさくらか誰かと一緒なのに。

@show mahiru_no_camera center normal fade_in

@wait 600

mahiru: あ、勇くん

player: 一人か

mahiru: ん、ちょっとひとりがよかったの

@wait 700

> 否定でも肯定でもなく、ただそう言った。
> 怒っているわけじゃない。
> 静かにそうしたかった、というだけだ。

@wait 600

> カメラがなかった。
> 手ぶらで廊下を歩いていた。

@expr mahiru_no_camera thinking

player: ……カメラは

mahiru: 今日は持ってこなかった

player: なんで

@wait 800

mahiru: ……
mahiru: なんか、撮るものが見つからなくて

@wait 1000

> 撮るものが見つからない。

> まひるがそういうことを言うのを、初めて聞いた。
> あいつは昔から、どこにでも撮るものを見つける人間だと思っていた。
> 窓ガラスの水滴。
> 教科書の端についた鉛筆の汚れ。
> 夕方の校舎に落ちる長い影。

> 見つけられないのなら、
> それは目の問題じゃなくて、
> 探す気力の問題だ。

@wait 900

player: そうか

@expr mahiru_no_camera normal

mahiru: うん
mahiru: そのうち見つかると思うけど

@wait 700

> 笑った。
> やはりいつもと同じ笑い方だった。

> でも俺は、
> そのうち、という言葉の重さを量っていた。

@wait 600

@hide mahiru_no_camera fade_out
@wait 500

@jump mahiru_ch9_reason


# mahiru_ch9_reason

@scene school_gate_autumn_evening fade
@bgm evening_piano.mp3
@wait 800

> 放課後。

> まひるが「一緒に帰ろ」と言ってきた。
> 珍しかった。
>向こうから言ってくるのは、いつも元気なときだった。

@show mahiru_no_camera center normal fade_in

> 校門を出て、しばらく黙って歩いた。
> まひるは少し俯き加減で、空を見上げるいつもの癖がなかった。

@wait 1000

@expr mahiru_no_camera thinking

mahiru: ねえ、勇くん

player: なんだ

@wait 600

mahiru: 理由って
mahiru: 減るよね

@wait 1200

> さらっと言った。
> いつもの会話の続きみたいに、軽い声で。

> でも俺の足が、一瞬だけ止まりかけた。

@wait 800

player: ……理由って

mahiru: 生きてよかった理由

@wait 800

mahiru: 最初はいっぱいあったのに
mahiru: 数えようとすると、あんまりなくて

@wait 1000

@expr mahiru_no_camera normal

mahiru: おかしいかな

@wait 800

> おかしくない、と言えなかった。
> 大丈夫だよ、とも言えなかった。

> 何も言えないまま、俺はただまひるの横を歩いた。

@wait 700

player: ……減ったら

mahiru: うん

player: また増やせばいいだけだろ

@wait 1000

> 言ってから、薄い言葉だと気づいた。
> でもまひるは少しだけ息をついた。

@expr mahiru_no_camera thinking

mahiru: そうだよね
mahiru: そうなんだけど

@wait 800

mahiru: 増やす気力も、一緒に減るんだよね

@wait 1500

> 俺は何も返せなかった。

> 歩きながら、ただ隣にいた。

> それが正しかったのかもしれないし、
> 全然足りなかったのかもしれない。

@wait 900

@expr mahiru_no_camera happy

mahiru: ごめん、なんか暗いこと言った

player: ……別に

mahiru: 勇くんって、全然走らないよね

@wait 800

> 唐突に話が変わった。
> いや、変えたんだろう。

player: ……なんで急に

mahiru: なんとなく
mahiru: 昔、足速かったじゃない
mahiru: 今はなんか、ゆっくり歩くから

@wait 800

player: 足首、やったから

mahiru: 治ったんじゃないの

player: ……治った

@wait 700

mahiru: でも走らないんだ

player: ……

@wait 600

> 答えられなかった。

> 足首は治っている。
> 走ろうと思えば走れる。
> でも走っていない。

> その理由を、俺はまひるに説明できる言葉を持っていなかった。
> 自分でもうまく整理できていなかった。

@wait 800

@expr mahiru_no_camera normal

mahiru: まあ、いっか
mahiru: また走りたくなったら走ればいいし

@wait 700

> まひるはそう言って、また歩き始めた。
> その横顔は、どこか遠かった。

> ねえ、勇くん。理由って減るよね。

> その一言が、夕方の空気の中にまだ漂っていた。

@wait 1000

@hide mahiru_no_camera fade_out
@wait 500

@bgm stop
@wait 400

@jump mahiru_ch9_walk


# mahiru_ch9_walk

@scene commute_road_autumn_evening fade
@bgm mahiru_theme.mp3
@se footsteps.mp3
@wait 800

> 下校。

> まひると並んで歩いていると、
> 自然と歩幅が落ちていた。

@show mahiru_no_camera center normal fade_in

> まひるに合わせているつもりだった。

> けれど。

@wait 600

> ふと気づいた。

> *（俺、走るのを避けている）*

> 廊下を歩くとき。
> 階段を降りるとき。
> 急いでいるはずなのに、走らずに済む道を選んでいた。

> いつからだろう。
> 気づかないうちにそうなっていた。

@wait 700

@expr mahiru_no_camera thinking

mahiru: 勇くんって

mahiru: 昔はもっと先に行く人だった気がする

@wait 800

player: ……そうか？

@expr mahiru_no_camera happy

mahiru: うん
mahiru: あっという間に遠くなる人

mahiru: 今は、なんか
mahiru: 一緒に歩いてる感じ

player: ……

@wait 700

> 軽く笑って流した。

> でも、
> その言葉が頭に残り続けた。

> *（先に行く人）*
> *（俺は、いつ止まったんだろう）*

@wait 600

@hide mahiru_no_camera fade_out
@wait 500

@bgm stop
@wait 400

@jump mahiru_ch9_end


# mahiru_ch9_end

@scene commute_road_autumn_evening fade
@bgm evening_piano.mp3
@wait 800

> 交差点で別れた。

> まひるは少しだけ振り返って、
> 「また明日ね」と言った。

> いつもの声だった。

> でも十月の空は、
> 今日も少しだけ低くなっていた。

@wait 1000

> *（十月下旬）*
> *（まひるのノートの一行が、頭を離れない）*

@wait 800

> 今日の空が青かったこと。
> それだけが、今日の良かったこと。

> まひるはそのノートを、
> これからも毎日開くのだろうか。

> 明日も。
> 明後日も。
> 命日の前日も。

@wait 1000

> 俺は空を見上げた。
> 星はまだ出ていなかった。
> 夕焼けの名残が、西の端を赤く染めていた。

@wait 1000

@bgm stop
@wait 500

@jump mahiru_ch10_start


// ===================================================================
//  Chapter 10m「消えてしまいそうな気配」
// ===================================================================

# mahiru_ch10_start

@scene school_exterior_night fade
@bgm piano_resonance.mp3
@wait 1000

> 命日の前夜。

> 委員会の後、俺は一人で校舎を出ようとしていた。

@wait 600

> 空気が冷たかった。
> 十月の夜のにおいがした。

> 焚き火でも、落ち葉でも、
> 正確には何のにおいとも言えない。
> ただ確かに「十月の夜」のにおいだった。

@wait 700

> みんな帰った後の校舎は静かだ。
> 昼間の熱が抜けると、石の冷たさだけが残る。
> 足音だけが、廊下を行ったり来たりしていた。

@wait 800

> まひるのことを、思い出していた。
> 数日前から、ずっとどこかで気にしていた。

> 文化祭の日のまひるは、
> どこか輪の外にいるような気がした。
> 笑っていた。でも少し遠かった。

> ノートのことを思い出した。
> 「今日も空が青かった」

> あれから何日経つ。
> 今日のページには、何行あるだろう。

@wait 900

@se wind_rooftop.mp3
@wait 800

> 外に出た瞬間、冷たい風が頬を打った。

> 反射的に上を見た。

> 校舎の屋上。

> 人影があった。

@wait 700

@still mahiru_seen_from_below
@wait 1500
@still_hide

@wait 600

> 遠くて、はっきりわからない。

> 柵に寄りかかっているのか。
> ただそこに立っているだけなのか。

> どちらかわからない。
> でも。

@wait 800

> 十月の下旬。
> 明日は、まひるの兄の命日だ。

> 俺は何日か前に、それを知った。
> 直接聞いたわけじゃない。
> ただ、ノートのことや、まひるの様子を見ていて、
> いつかのまひるの言葉から、そうだと気づいた。

@wait 800

> 命日前夜。
> まひるが一人で屋上にいる。

@wait 600

> *（足が、動いた）*

@jump mahiru_ch10_monologue


# mahiru_ch10_monologue

@scene school_exterior_night cut
@bgm stop
@wait 600

> 動こうとした瞬間、一秒だけ止まった。

> 屋上への道を、頭の中で確認した。
> 玄関から廊下へ。廊下の端から非常階段か、
> 中央の階段から屋上へ続く扉へ。

> 中央の階段の方が早い。

> わかっていた。
> わかっていたが、足がまだ重かった。

@wait 700

> *（走れるか）*

> 走れないままで、三年いた。
> 足首は治っている。
> でも走っていない。
> それが習慣になっていた。
> 恐怖というより、習慣。

> *（走れなかったとしても、歩けば届く）*
> *（でも、今夜に限って、それが怖かった）*

@wait 900

> まひるが消える前に。
> 俺が辿り着く前に。

> そんな可能性を、打ち消そうとしても打ち消せなかった。

@wait 800

> *（動け）*

@choice
- "（がむしゃらに、走り出した）" -> mahiru_ch10_run
- "（ここからじゃ、間に合わない）" -> mahiru_bad_end


# mahiru_ch10_run

@scene school_exterior_night cut
@se heartbeat.mp3
@wait 300

@scene staircase_night cut
@wait 200

> 走っていた。

> 走れていた、という驚きより先に、
> 体が動いていた。

@wait 500

> 廊下が後ろへ流れた。
> 夜の校舎に、俺の足音だけが響いた。

> 息を吸う。
> 空気が冷たい。
> 胸に刺さるみたいな冷たさ。
> でも動き続けた。

@scene staircase_night cut
@wait 300

> 走りながら、いろんなものが頭の中に戻ってきた。
> 走っているときに限って、そういう記憶が出てくる。

@wait 500

> 父のことを思い出した。

> 病院から電話が来た夜。
> 「お父さんが倒れた、すぐ来てくれ」
> 俺は走った。
> 病院まで走った。
> でも父は既にICUだった。

> 走る意味がなかった。
> でも走らずにはいられなかった。
> そして走った俺に父は何も言わなかった。
> 目を覚ました父の最初の一言は「大丈夫だ」だった。

> 「大丈夫」
> 全然大丈夫じゃなかった。

@wait 700

> *（走れなくなったのはあの夜から）*

@wait 400

> 慎のことを思い出した。
> 翌朝、誰もいない机。
> 担任が「本日は欠席です」と言っただけだった。

> あの日、何か気づいていれば。
> 前の日に少しだけ変だと思ったのに、
> 聞けなかった。
> 怖かった。
> 本当のことを聞いたら、
> どうしたらいいかわからなくなると思って。

> 聞かないまま、翌朝来たら机が空だった。

@wait 600

> 一日、遅れた。

@scene staircase_night cut
@wait 200

> *（また、間に合わないのか）*

@wait 300

> 階段を駆け上がる。
> 足首が鈍く痛んだ。
> 無視した。

> 足首なんか、今はどうでもよかった。

> 大事なのは今夜だ。
> 今夜この瞬間だ。

@wait 500

> *（嫌だ）*

> また間に合わないのは、嫌だ。
> また「もう少し早ければ」と思うのは、嫌だ。
> あの感覚を、もう一度味わうのは。

@wait 500

@se heartbeat.mp3
@wait 300

> 踊り場を抜けた。
> また一段、また一段。
> 足音が暗い階段に吸い込まれていった。

> 息が切れた。
> でも止まらなかった。

> 俺の足は覚えていた。
> 走ることを、体は覚えていた。

> 三年止まっていたのに、
> 体は忘れていなかった。

@wait 700

@jump mahiru_ch10_rooftop


# mahiru_ch10_rooftop

@scene rooftop_night fade
@bgm predawn_tension.mp3
@wait 600

> 扉を開いた。

> 夜の屋上。

> 冷たい空気が顔を打った。

> 十月の夜風が、汗ばんだ首筋に刺さった。

@wait 500

@still mahiru_rooftop_night
@wait 1000
@still_hide

@wait 400

> まひるがいた。

> 柵の手前に立っていた。
> 柵の外ではなかった。

> 空を見ていた。

> ただ、空を。

> 星もない、暗い秋の夜空を。

@wait 800

> 俺は、その場に倒れ込むように座り込んだ。

> 息が切れていた。
> 膝が震えていた。
> 足首が熱を持っていた。

> でもそれより先に、
> まひるがいた、という事実だけが、
> 体の力を全部抜いた。

@show mahiru_no_camera center normal fade_in

> まひるが振り返った。

@expr mahiru_no_camera surprised

mahiru: ……なんで来たの

@wait 1000

> 息が、整わない。

> *（なんで来たのか）*
> *（なんで来たんだろう）*

@wait 800

> 聞かれて初めて、答えを探した。
> 理由は何か。
> でも言葉にできるものは、
> ひとつだけだった。

player: ……嫌だ

@wait 600

@expr mahiru_no_camera thinking

mahiru: 嫌？

@wait 700

> まだ息が切れたまま。

player: 間に合わないのが、嫌だった

@wait 1200

> まひるは何も言わなかった。

@wait 800

@bgm stop
@wait 600

> 沈黙があった。

> 夜の屋上に、
> 俺の呼吸だけが聞こえていた。

@wait 1000

@se wind_rooftop.mp3
@wait 800

> まひるの肩が、
> 少し揺れた。

@wait 600

@expr mahiru_no_camera crying

> 声が、出た。

> 小さく、子どもみたいな声だった。

> 泣いていた。

@wait 800

> 何年ぶりかの、泣き声だった。

> 子どもみたいに、と言ったのは、
> そういう泣き方だったからだ。
> 声を殺さない泣き方。
> 抑えようとしていないわけじゃない。
> でも、もう抑えきれなくなっていた。
> そういう泣き方だった。

@wait 1200

@bgm night_melody.mp3
@wait 500

mahiru: ……来てくれると思ってなかった

@wait 1500

mahiru: 誰も来ないと思ってた

@wait 1200

mahiru: ……来てほしかったのに

@wait 600

mahiru: 来ないって、決めてた

@wait 1500

> *（来てほしかったのに、来ないって決めてた）*

@wait 1000

> その言葉の重さが、ゆっくりと沁みてきた。

> 来てほしかった。
> そう思いながら。
> でも来ないって、決めていた。

> 来てもらえるはずがない、と思っていたのか。
> 来てもらう資格がない、と思っていたのか。
> それとも、来てほしいと思う自分を、諦めていたのか。

@wait 900

> 途切れ途切れに、
> 順番なく、言葉が出てきた。

@wait 600

mahiru: お兄ちゃんのときも

mahiru: 誰かが来てくれたら
mahiru: 違ったのかなって

@wait 1200

mahiru: ……でもそれって

mahiru: まひるが気づいてあげればよかった
mahiru: ってことで

@wait 1000

mahiru: だからまひるには
mahiru: 誰かに来てもらう資格がないって

@wait 1200

@expr mahiru_no_camera sad

mahiru: ずっとそう思ってた

@wait 1500

> 俺は何も言えなかった。

> 言葉は何も持っていなかった。

> でも。

@wait 600

> まひるの手を、
> 離さなかった。

@wait 1500

@hide mahiru_no_camera fade_out
@wait 300
@still mahiru_rooftop_reach
@wait 1200
@still_hide

@wait 600

@show mahiru_no_camera center crying fade_in

@wait 800

> まひるは泣き続けた。

> 声を、殺さなかった。

> 風が吹くたびに、俺は少しだけ強くまひるの手を握った。
> 何も言わなかった。
> 言わなくていいと思った。

> 今夜は、ただここにいることだけが、
> 俺にできることだった。

@wait 1500

@bgm stop
@wait 400

@jump mahiru_ch11_start


// ===================================================================
//  Chapter 11m「今度は間に合う」
// ===================================================================

# mahiru_ch11_start

@scene rooftop_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 1200

> 泣き止んでから、
> 俺たちは屋上の床に座ったままでいた。

> 立つ気力が、お互いになかった。

@wait 800

@show mahiru_no_camera center normal fade_in

> 夜の虫の声が聞こえていた。

> まひるの呼吸が、少しずつ落ち着いていった。

@wait 1000

> *（小さい）*
> *（こんなに小さかったか）*

> *（幼なじみの、もう知らないと思っていた体温）*

@wait 800

> まひるは膝を抱えていた。
> 俺はその隣に、少しだけ距離を残して座っていた。

> 距離を残していたのは、
> 近づきすぎることへの遠慮だったかもしれない。
> それとも、まだ整理できていない気持ちの置き場がなかったからかもしれない。

@wait 900

> しばらくは何も言わなかった。
> ただ、夜の虫の声と、遠くの街の音だけがあった。

> それで充分だった。
> 充分、という言葉が合ってるかどうかはわからないが、
> 沈黙が重くなかった。

@wait 1000

@expr mahiru_no_camera thinking

mahiru: ……お兄ちゃんの部屋に行ったら

mahiru: 机の上に手紙があって

@wait 900

mahiru: 「まひるへ。お前が一番好きだった。ごめんな」

@wait 1200

mahiru: ……それだけ書いてあった

@wait 1000

> まひるは空を見ていた。
> 星のない夜空だった。

@show mahiru_no_camera center thinking fade_in

> 星が出ていないのに、
> まひるはずっと空を見ていた。
> 何かを探しているんじゃなくて、
> ただ見ていられる場所として、空があった。

@wait 800

mahiru: まひる、救急車を呼んだんだ

@wait 800

mahiru: 間に合わなかった

@wait 1200

> 間に合わなかった。

> 四年前の十月、まひるは発見して、救急車を呼んで、
> それでも間に合わなかった。

> まひるが手を尽くして、
> それでも届かなかった。

> 誰かに話したのかもしれない。
> でもきっと、誰にも本当のことは話せなかった。
> 話せる言葉を持っていなかったから。

@wait 900

mahiru: ……手紙、誰にも見せてないんだ

mahiru: 見せたら

mahiru: 気づいてあげられなかったことが
mahiru: 本当になるから

@wait 1500

> 気づいてあげられなかったことが、本当になる。

> 手紙は、まひるに届いた。
> でもまひるは、その手紙を受け取れなかった。
> 間に合わなかったから。
> だから手紙は、まひるの中でずっと宙ぶらりんのままだった。

> 誰かに見せたら、それが確定する。
> 気づいてあげられなかった自分が、確定する。

> だから見せられなかった。
> 四年間、一人で持っていた。

@wait 1000

player: ……

@wait 600

> 俺も、気づいていた。

> 慎のこと。
> 元気がなかったこと。
> 昼飯を食べなくなっていたこと。

> 笑い方が、少しだけ雑になっていたこと。

@wait 600

player: 俺も、気づいてた

player: 慎のこと

player: でも聞けなかった

@wait 1000

player: 怖かった

@wait 1000

@expr mahiru_no_camera surprised

mahiru: ……勇くんも怖いんだ

@wait 600

player: 怖いよ

@wait 800

> 怖かった。
> 聞いたら、本当のことがわかる気がして。
> 本当のことを知ったら、
> 俺は何をすればいいかわからなくなると思って。

> だから聞かなかった。
> 聞けなかった、というより、聞かなかった。
> 逃げていた。

@wait 700

player: 聞いたら、本当のことがわかる気がして
player: 怖かった

@wait 1000

@expr mahiru_no_camera thinking

mahiru: 強いと思ってた

@wait 600

player: 走れないまま三年いたやつが強いわけない

@wait 1000

@expr mahiru_no_camera normal

> まひるは少しだけ、俺を見た。

mahiru: ……でも今日

mahiru: 走ってたじゃん

@wait 1200

> 俺は答えを探した。

> 「走れた」と言うのは正確じゃない気がした。
> 走ろうと思って走ったわけじゃないから。
> 体が動いていた。
> 頭より先に、足が動いていた。

> それは怖くなかったのか、と聞かれれば、
> 怖かった。
> でも別の怖さの方が、ずっと大きかっただけだ。

@wait 600

player: お前が消えるほうが、ずっと怖かった

@wait 1500

@bgm night_melody.mp3
@wait 500

@expr mahiru_no_camera sad

mahiru: ……ごめん

@wait 800

player: 謝らなくていい

player: 俺が走りたかっただけだから

@wait 1500

> まひるは何も言わなかった。

> 俺はまひるを引き寄せた。

> 乱暴でも優しすぎでもなく、
> ただ、離さないように。

@wait 800

> *（小さい。こんなに小さかったか）*
> *（幼なじみの、もう知らないと思っていた体温）*

> まひるはしばらく、俺の肩に頭を預けていた。
> 何も言わなかった。
> 俺も何も言わなかった。

> 夜の虫の声が続いていた。
> 遠くで電車が通る音がした。
> 世界は普通に動いていた。
> 命日の前夜の、普通の夜として。

@wait 1200

@se wind_rooftop.mp3
@wait 600

mahiru: ……まひるのこと

mahiru: 消えそうだって気づいてた？

@wait 1000

player: ……気づいてた

@wait 800

player: 屋上で空の写真を撮ってたとき

@wait 1000

> それは本当だった。
> 写真を撮っているまひるを見ながら、
> あいつは今日の空に何を見ているのだろうと思っていた。
> 綺麗だと思って撮っているのか。
> 残しておきたくて撮っているのか。

> どちらかわからなくて、
> 聞けなかった。

> でも、どちらにしても、
> 俺の前ではまだカメラを持っていた。
> まだ、今日の良かったことを探していた。

> それが、少しずつ減っていくのを見ていた。

@wait 1000

@expr mahiru_no_camera normal

> まひるは少し黙った。

> それから、泣き笑いみたいな顔をした。

mahiru: ……早かったんだね

@wait 1200

> 責めていなかった。

> 安堵、だった。

> 気づいてもらっていた、ということへの安堵。
> 気づいてもらえる自分だったことへの安堵。

> まひるは四年間、
> 誰にも気づいてもらえなかったと思っていたかもしれない。
> お兄さんのことも、
> まひる自身のことも。

> 早かったんだね。
> その一言は、
> そういう重さを持っていた。

@wait 1500

> *（今度は、間に合った）*

@wait 1000

> 風が吹いた。
> 屋上の柵がわずかに鳴った。
> まひるは目を細めて、また夜空を見た。

> 星は出ていなかった。
> でも、空はそこにあった。

@wait 1200

mahiru: ……勇くん

player: なんだ

mahiru: ありがとう

@wait 1000

> 言葉は短かった。
> でも俺には、そのたった五文字が、
> まひるの何年分かを含んでいる気がした。

@wait 800

player: ……俺こそ

@wait 700

mahiru: え？

player: 走れた

player: 三年ぶりに、ちゃんと走れた

@wait 1000

@expr mahiru_no_camera normal

> まひるは俺を見た。
> それからゆっくり、小さく笑った。

mahiru: よかったじゃん

@wait 800

> よかったじゃん、と言いながら、
> まひるの目が少し潤んでいた。

> 俺のために泣いていた。

> そのことが不思議だった。
> いや、不思議じゃないか。
> まひるはそういうやつだ。
> 他人の痛みを、自分のことみたいに感じるやつだ。

@wait 1200

@hide mahiru_no_camera fade_out
@wait 500

@bgm stop
@wait 400

@jump mahiru_ch11_stars


// ===================================================================
//  Chapter 11m-A「夜が明けるまでの会話」
// ===================================================================

# mahiru_ch11_stars

@scene rooftop_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 800

> 星が出ていなかった。
> 雲がほとんどを覆っていた。
> 黒というより、深い灰色の夜空だった。

@show mahiru_no_camera center normal fade_in

@wait 800

@expr mahiru_no_camera thinking

mahiru: ……お兄ちゃん

mahiru: 星が好きだったんだ

@wait 1000

> まひるはそれだけ言った。
> 星のない夜空を見上げながら。

@wait 700

player: ……知ってる

@wait 600

@expr mahiru_no_camera normal

mahiru: 覚えてるの？

@wait 600

> 覚えていた。
> 幼なじみとして、自然に覚えていた。

> まひるの家に遊びに行っていた頃、
> 兄がいた。
> 夜になるとたまに庭か屋上で空を見ていた。

> 一度だけ、俺とまひるも一緒に見た。
> 「あれがオリオン座だ」と兄が言った。
> 「あっちがカシオペアだ」とも言った。

@wait 700

player: 星座を教えてもらったことがあったから

mahiru: そっか、そんなこともあったっけ

@wait 600

@expr mahiru_no_camera thinking

mahiru: 後で本で調べたら
mahiru: カシオペア座、全然違う形だったんだよね

@wait 500

> まひるが小さく笑った。

@wait 400

player: 知らなかった

mahiru: 「お兄ちゃん、これカシオペアじゃないよ」って言ったら
mahiru: 「……これからそういうことにしよう」って

@wait 700

> 声の調子が変わっていた。
> 兄のことを思い出しているときの、やわらかい声だった。

@wait 600

player: 自慢したかったんだろ

@expr mahiru_no_camera normal

mahiru: たぶんね
mahiru: 嘘は困るけど

@wait 500

@expr mahiru_no_camera thinking

mahiru: ……でも
mahiru: あのとき三人で空見てたこと

mahiru: まひるが覚えてるんだから
mahiru: お兄ちゃんも覚えてたと思う

@wait 1200

> 俺はその横顔を見た。

> まひるの目が少し光っていた。
> 泣いているんじゃなかった。
> ただ、潤んでいた。

> 嫌いじゃない記憶を、思い出している顔だった。

@wait 1000

@se wind_rooftop.mp3
@wait 600

mahiru: 今夜、星出てないね

player: 雲が多いんだろ

mahiru: お兄ちゃんがいたら
mahiru: なんか理由つけて説明しそう

@wait 700

> まひるはもう一度、小さく笑った。

@wait 800

> 俺は何も言わなかった。
> 言わなくていいと思った。

> まひるが笑っているなら、
> それでよかった。

@wait 1000

mahiru: ……ねえ

player: なんだ

mahiru: 夜明けまで、ここにいていい？

@wait 1000

> まひるは俺を見た。
> 頼むような目だった。
> でも、遠慮もあった。

> 迷惑をかけることへの遠慮。
> それでも、ここにいたいという気持ち。

@wait 700

player: ああ

@wait 600

@expr mahiru_no_camera happy

mahiru: ……ありがとう

@wait 1200

@bgm stop
@wait 600

@jump mahiru_ch12_branch


// ===================================================================
//  Chapter 12m「エンディング分岐」
// ===================================================================

# mahiru_ch12_branch

@scene rooftop_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 1000

> 夜が、深くなっていた。

> 俺たちはまだ屋上にいた。

> まひるが、空を見ていた。
> 星は出ていなかった。
> それでもまひるは、空を見ていた。

@show mahiru_no_camera center normal fade_in

@wait 800

mahiru: ……勇くん

player: なんだ

mahiru: 空

mahiru: 明日の朝になったら
mahiru: どんな色になるんだろう

@wait 1000

> *（夜明けまで、ここにいるつもりか）*

@wait 600

> まひるは答えを求めていなかった。
> ただ、誰かに聞いてほしかった声だった。

> 明日は命日だ。
> まひるにとって、毎年一番長い一日が始まる。

> 一人で朝を迎えさせたくなかった。

@wait 800

@jump mahiru_good_end


// ===================================================================
//  Good End「夜明けは、一人では見つけられなかった」
// ===================================================================

# mahiru_good_end

@scene rooftop_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 600

player: 朝日まで、一緒にいる

@wait 1200

@expr mahiru_no_camera thinking

mahiru: ……

@wait 800

@expr mahiru_no_camera normal

mahiru: ……うん

@wait 600

> それだけだった。

> 余計な言葉は何もなかった。
> ただ、うん、と言った。

@wait 1000

@bgm night_melody.mp3
@wait 600

> 夜を、二人で過ごした。

> たくさん話したわけじゃない。
> ほとんど黙っていた。

> でも、沈黙が重くなかった。

@wait 1500

> まひるはときどき
> 小さいことをつぶやいた。

mahiru: ……虫の声、秋だな

@wait 600

player: そうだな

@wait 500

mahiru: こういう夜って
mahiru: お兄ちゃんも好きだった

@wait 1000

mahiru: 「夜って静かだから思考が整理されるんだよ」
mahiru: って言ってた

@wait 800

player: 整理されたか

@wait 600

@expr mahiru_no_camera thinking

mahiru: ……少し

@wait 800

@expr mahiru_no_camera normal

mahiru: まだ全部じゃないけど

@wait 600

mahiru: 今夜は

mahiru: ここにいていい気がした

@wait 1500

> *（俺も、そう思っていた）*

@wait 1000

> 「ここにいていい」と思える場所は、
> たぶん多くない。
> 今夜のこの屋上が、そうだとしたら。
> 俺はそれに、少し貢献できたのかもしれない。

@wait 800

mahiru: ……ねえ

player: なんだ

mahiru: お兄ちゃんの手紙

mahiru: まひるへって書いてあったけど

@wait 1000

mahiru: もしかしたら
mahiru: 気づいてほしかったのかな

@wait 1200

> まひるは独り言みたいに言った。
> 答えを求めているのかもしれないし、
> ただ声に出してみたかっただけかもしれない。

@wait 700

player: ……たぶん

player: 気づいてほしかったのと
player: 気づかれたくなかったのと、
player: 両方あったんじゃないか

@wait 1000

mahiru: ……そうかな

player: そうじゃないかな

@wait 800

@expr mahiru_no_camera thinking

mahiru: 二つ、両方

@wait 600

mahiru: なんか
mahiru: それなら少しだけ楽

@wait 1000

> 楽、という言葉が出た。
> 俺は黙っていた。

> まひるが楽だと感じることなら、
> それが正しいかどうかよりも大事だと思った。

@wait 1200

@bgm stop
@wait 800

@jump mahiru_good_end_dawn


# mahiru_good_end_dawn

@scene rooftop_predawn fade
@bgm quiet_piano_distant.mp3
@se wind_rooftop.mp3
@wait 1200

> 夜明け前。

> 空の端が、ほんのわずかに明るくなり始めた。

> 深い紺から、
> 少しだけ青みがかった紺に。

@wait 1000

@show mahiru_no_camera center normal fade_in

> まひるは立ち上がっていた。
> 柵に手をかけて、遠くを見ていた。

> 怖くなかった。
> 柵に手をかけていても、
> 今のまひるは、空に向かって立っている。
> 落ちようとしているんじゃない。
> 夜明けを見ようとしている。

> その違いが、俺にはわかった。

@wait 1000

@se chime_soft.mp3
@wait 500

mahiru: ……始まった

@wait 600

player: そうだな

mahiru: じわじわくるね

@wait 800

> まひるはノートを取り出した。

> この夜、ずっとポケットに入れていたノートだった。

@wait 600

@expr mahiru_no_camera happy

mahiru: 書いていい？

player: 書けよ

@wait 700

> まひるは書いた。

@hide mahiru_no_camera fade_out
@wait 400

@scene rooftop_dawn fade
@bgm mahiru_dawn.mp3
@wait 1200

@still mahiru_dawn_two
@wait 1500
@still_hide

@show mahiru_no_camera center happy fade_in

> 空が、開いた。

> 橙と紫と、その間の色が
> 地平線から滲んで広がっていた。

> 雲が染まっていた。
> 細い雲が、朝焼けの色を受けて赤くなっていた。

> 綺麗、という言葉では足りなかった。
> でも他に言葉がなかった。

@wait 1000

mahiru: 勇くん

player: なんだ

mahiru: 見て

@wait 600

> まひるはノートを開いて見せた。

> 「今日の良かったこと：勇くんが、まひるの隣にいてくれた」

@wait 1500

player: ……

mahiru: 多い日は五行書けるんだけど

mahiru: 今日は

mahiru: これだけで、全部入ってる気がする

@wait 1200

> まひるは空を見た。

> 朝日が、ゆっくり上がっていた。

@wait 800

@expr mahiru_no_camera normal

mahiru: お兄ちゃん

@wait 600

mahiru: まひるね

mahiru: また理由が増えた

@wait 1500

> 声が、穏やかだった。

> 悲しくなかった。
> でも悲しみが消えたわけでもなかった。

> ただ、今朝は。
> 悲しみに押しつぶされていなかった。

@wait 1200

> 命日の朝だった。
> 四年経っても、命日は命日だ。
> 今年の十月下旬も、来年も、
> まひるはきっとこの日を重く感じる。

> でも今年は、隣に俺がいた。

@wait 900

@se chime_soft.mp3
@wait 800

> 俺は朝日の中で足元を見た。

> 昨夜、走ってきた足。
> 痛みはまだ少し残っていた。
> でも、それだけだった。

> *（もうそこには「走れない自分」の感覚はない）*

> 確認するまでもなかった。
> 体がわかっていた。
> 昨夜、全力で走れた体が、覚えていた。

@wait 800

> *（父のことも、慎のことも、消えはしない）*

> それは本当だ。
> 消えない。
> 消えてほしいとも思っていない。

> 俺が見落としたこと。
> 間に合わなかったこと。
> あの日々の重さは、ずっとあり続ける。

> でも。

@wait 700

> *（でも俺は、もう立ち止まったままじゃない）*

> 三年、止まっていた。
> 足首が治っても走らなかった。
> 走れないのではなく、走らないことを選んでいた。
> 止まり続けることが、自分への罰だと思っていたのかもしれない。

> でも昨夜、走れた。
> まひるのために走った。
> それは罰でも贖罪でもなくて、
> ただ行きたかったから走った。

> それで、いい。

@wait 900

> *（今度は、誰かのところへ行ける）*

@wait 1500

@expr mahiru_no_camera happy

mahiru: 勇くん

player: なんだ

mahiru: 今日、学校どうする

@wait 800

> 命日に学校。
> 普通じゃない問いかけだったが、
> まひるはあっさりと聞いた。

player: ……どうしたい

mahiru: 行こうかな

@wait 700

player: そうか

mahiru: ……うん
mahiru: お兄ちゃんのこと、ずっと隠してたら
mahiru: 自分が消えそうになるって、わかったから

@wait 1000

mahiru: 少しずつ、話せるようになりたい

@wait 800

@expr mahiru_no_camera normal

mahiru: まず、勇くんに話せた
mahiru: それで充分かな、今日は

@wait 1000

> まひるはそう言って、
> また空を見た。

> カメラを取り出した。

> 朝焼けに染まる空を、
> 一枚、撮った。

@wait 800

@wait 600

mahiru: ……きれい

player: そうだな

mahiru: 撮れた

@wait 800

> まひるは写真を確認して、
> 小さく笑った。

@wait 800

> それから、カバンの中を少し探して、
> 封筒を取り出した。

@wait 600

mahiru: ……ねえ、これ

player: なんだ

mahiru: ずっと渡せなかったんだけど

@wait 600

> 封筒の中に、写真が一枚入っていた。
> 屋上で、まひるが撮ったあの日の写真。

> さくらが笑っていた。
> ことはが少しだけ目を逸らしていた。
> 俺が、そこにいた。

@wait 800

mahiru: プリントはしてたんだ
mahiru: でも渡すタイミングが、なかなか

@wait 600

player: ……何ヶ月持ってたんだ

mahiru: ……七月から

@wait 800

> まひるは少し恥ずかしそうに視線を外した。

@wait 500

mahiru: さくらちゃんとことはちゃんのぶんも、ある
mahiru: 今日、学校行ったら渡す

@wait 700

> それだけのことが、
> まひるには時間がかかった。

> 渡すって決めることが、
> 誰かに近づくことと、同じだから。

@wait 1000

> その笑顔に、余白はなかった。
> 全部が埋まっていた。

@wait 1200

> 写真の中で、俺たちは笑っていた。
> まひるが、撮った。

@wait 1000

> 七月から、ずっと持っていた。

@wait 1200

> 渡せなかった時間の分だけ、
> この一枚は重かった。
> そしてその重さが、今の軽さになっていた。

@wait 1500

@expr mahiru_no_camera happy

mahiru: ……行こっか

player: ああ

@wait 1200

> 屋上の扉を開けると、
> 朝の空気が中に流れ込んできた。

> まひるが先に歩き出した。
> 俺は後ろから、その背中を見ていた。

@wait 1200

> 今日は命日だ。
> でも今年は、まひるは一人じゃなかった。

@wait 1500

@hide mahiru_no_camera fade_out
@wait 500

@bgm stop
@wait 800

@jump mahiru_good_end_school


// ===================================================================
//  Good End 後日談「命日の朝に学校へ行く」
// ===================================================================

# mahiru_good_end_school

@scene classroom fade
@bgm daily_life.mp3
@wait 1200

> 命日の朝。

> まひるは学校に来た。

@wait 800

> 普通に来た。
> それだけのことが、今年は少し違う意味を持っていた。

@wait 1000

@show sakura left happy fade_in
@show mahiru center normal fade_in

@wait 600

sakura: まひるちゃん、おはよー

mahiru: おはよ

@wait 600

> さくらは何も聞かなかった。
> ただ、いつも通りに笑った。

sakura: 昨日LINEしたのに
sakura: どこにいたの

mahiru: ……屋上

sakura: 屋上！？　一人で？

mahiru: 途中から、勇くんも来た

@wait 600

@expr sakura surprised

sakura: 勇くんが？

mahiru: うん

@wait 700

> さくらはチラリと俺を見た。
> 何かを察した顔だった。

@expr sakura happy

sakura: ……そっか
sakura: よかった

@wait 800

> 詳しくは聞かなかった。
> さくらはそういうやつだ。

@wait 800

@expr mahiru normal

mahiru: ……ねえ、さくらちゃん

sakura: うん？

@wait 500

> まひるはカバンから封筒を取り出した。

mahiru: ずっと渡せなかったんだけど
mahiru: これ、写真

@wait 700

@expr sakura surprised

sakura: え、写真？

@wait 600

> さくらは封筒を受け取った。
> 中身を確認して、少しの間黙った。

@wait 700

@expr sakura happy

sakura: ……まひるちゃん
sakura: 七月のじゃん

mahiru: ずっと持ってたんだ
mahiru: 渡すタイミングが、なくて

sakura: そんなに！

@wait 600

> さくらは笑いながら、写真を大事そうに封筒に戻した。

sakura: ありがとう
sakura: すごく嬉しい

@wait 800

> まひるも笑っていた。
> 全部が埋まっている笑顔だった。

@wait 800

@hide sakura fade_out
@wait 500

> 昼休みに、ことはにも渡した。
> ことははいつものように静かに受け取って、
> しばらく写真を見ていた。

@show kotoha left normal fade_in
@wait 600

> ことははやがて顔を上げた。
> まひるを、見た。

kotoha: ……まひるさんが

kotoha: 笑っています

@wait 1000

mahiru: 笑ってるよ

@wait 500

@expr kotoha normal

> ことははもう一度写真を見た。
> それから、小さく頷いた。

kotoha: ……よかったです

@wait 800

@hide kotoha fade_out
@hide mahiru fade_out
@wait 500

@scene school_gate_autumn_evening fade
@bgm mahiru_theme.mp3
@wait 1000

> 放課後。

@show mahiru center normal fade_in

@wait 600

mahiru: ……今日、来れた

@wait 600

player: 来れたな

@wait 500

mahiru: 去年は休んでたから

@wait 1000

> 昨年の命日は一人だった。
> その前も、一人だった。
> 四年間、まひるはこの日を一人で越えてきた。

@wait 700

player: 来年も来いよ

@wait 600

@expr mahiru normal

mahiru: ……うん
mahiru: たぶんね

@wait 1000

> まひるはカバンからノートを取り出した。
> 歩きながら、ゆっくりページを開いた。

@wait 600

@expr mahiru happy

mahiru: 今日の良かったこと
mahiru: 多すぎて書ききれない

@wait 1200

> まひるは笑った。
> 声に出して笑った。

@wait 800

> 悲しみは消えていない。
> 今日は命日だった。
> 来年もこの日は来る。
> そのたびに重くなる。

> でも今日のまひるは、
> 書ききれないくらい、今日を生きていた。

@wait 1200

@hide mahiru fade_out
@wait 600

@still mahiru_rooftop_friends_photo
@ending_intro 理由のない明日へ.mp3 mahiru_good_end 14000

@scene commute_road_autumn_evening fade
@bgm epilogue_sunset_for_each.mp3

> 夕方の帰り道。
> 風が少しだけ冷たい。

@show mahiru_no_camera center normal fade_in

> 並んで歩く。
> 歩幅は自然に揃っている。

@wait 1000

player: ……今日は書かないのか

mahiru: ん？

player: ノート

@wait 800

@expr mahiru_no_camera thinking

> まひるは目を伏せて、指先でノートの角をなぞった。

@wait 800

mahiru: ……うん

@wait 600

mahiru: 今日は、いいかなって

@wait 800

mahiru: 書かなくても、忘れなさそうだから

player: そうか

@wait 600

@expr mahiru_no_camera happy

> まひる、小さく笑う。

mahiru: でも、また書くかもしれないよ

mahiru: そういう日もあるし

@wait 800

> 風が吹く。

@wait 600

mahiru: 今日のいいこと、もう決まってるし

player: 何だ

@wait 800

mahiru: ……内緒

@wait 1000

@expr mahiru_no_camera thinking

> 歩きながら、まひるが手を出す。
> 主人公が取る。

@wait 800

mahiru: ……こういうの、前は書いてたんだよ

player: ……そうか

@wait 1000

> まひるは空を見る。
> 夕焼けが少し薄れている。

@expr mahiru_no_camera normal

@wait 800

mahiru: 明日は、書くかも

@wait 400

mahiru: 書かないかも

@wait 400

mahiru: どっちでもいい日が、増えるといいね

@wait 2500

@hide mahiru_no_camera fade_out
@wait 500

@still mahiru_epilogue fade_in
@click_wait
@end "第十二章「夜明けは、一人では見つけられなかった」— まひるルート Good End"


// ===================================================================
//  Bad End「星は落ちていない。まだ、空にある」
// ===================================================================

# mahiru_bad_end

@scene school_exterior_night fade
@bgm bad_end_loop.mp3
@wait 1000

> 俺は走り出そうとした。

> まひるのところへ行こうとした。

@wait 800

> でも。

@wait 600

> 足が、動かなかった。

@wait 800

> *（また、怖い）*

@wait 600

> 足首の感触がよみがえった。
> 折れた音。
> 走れなくなった夜。

> あの痛みが、体の記憶から蘇ってきた。
> 忘れていたわけじゃない。
> ただ、今夜この瞬間に限って、
> その記憶が体を縛った。

@wait 800

> 父の顔が浮かんだ。
> 失望した顔。
> 「なんで走れなかった」と言わなかった父の顔。
> 言わなかった分だけ、重かった顔。

@wait 600

> 慎の空席が浮かんだ。
> あの日もう少し早く動いていれば、
> という後悔が、また体を重くした。

> 間に合わなかった。
> また間に合わない。
> そのループから抜け出せなかった。

@wait 1000

> *（また、俺は止まるのか）*

@wait 600

> 一歩、踏み出そうとした。

> 踏み出せなかった。

> 足の裏が地面を離れなかった。
> 離すことが、怖かった。

@wait 1500

> *（ここからじゃ、間に合わない）*

@wait 1200

> 校舎を見上げた。
> 屋上の人影は、まだそこにあった。

> どのくらいそうしていたのかわからない。
> 時間だけが、冷たく過ぎていった。

@wait 1200

> やがて。

> 玄関の扉が開く音がした。

@show mahiru_no_camera center normal fade_in

@wait 600

@expr mahiru_no_camera surprised

mahiru: ……

@wait 800

> まひるは俺に気づいた。

> 驚いていた。
> でも、それだけだった。

@wait 700

mahiru: こなくていいのに

@wait 1200

> 責めていなかった。

> ただ、静かに言った。

> 「こなくていいのに」

> その静けさが、刺さった。
> 怒鳴られる方が楽だったかもしれない。

@wait 1000

> *（来てほしかったのに、来ないって決めてた）*

> きっとそうだったのだと思った。
> 来てほしかった。
> でも来ないって決めてた。

> 俺はその決意を、崩しきれなかった。
> 来た。
> でも遅かった。
> まひるが「やっぱり誰も来ない」という結論に辿り着いた後で、来た。

> *（俺は、その決意を崩しきれなかった）*

@wait 1500

@expr mahiru_no_camera normal

mahiru: ……

@wait 800

mahiru: 帰るね

player: ……まひる

mahiru: 大丈夫だよ

@wait 1000

> 大丈夫だよ、と言った。

> 全然大丈夫じゃない顔で。
> それでも笑っていた。
> まひるはまた笑っていた。

> 俺がここにいるから、笑わなければならなくなった。
> そういう顔だった。

@wait 800

@hide mahiru_no_camera fade_out
@wait 600

@still bad_end_empty_classroom
@wait 1500
@still_hide

@wait 800

> 夜が、深かった。

@wait 1000

> *（まひるは今頃、一人で下りていく）*
> *（今夜も、一人で）*

@wait 800

> *（俺は間に合わなかった）*
> *（いや、間に合った。でも踏み出せなかった）*

> *（それが今夜の、俺の限界だった）*

@wait 1200

> 自分を責めても仕方がない、と思おうとした。
> でも責めずにはいられなかった。

> 三年前もそうだった。
> 俺はいつも、惜しいところまで行って、
> 最後の一歩を踏み出せない。

> 届きそうな距離で、
> 届かない。

> それが今夜もそうだった。

@wait 1000

> 空に星は出ていなかった。

> でも。

> 落ちてもいなかった。

> まだ、空にあった。

@wait 800

> まひるはまだ生きている。
> 今夜は帰っていく。

> だから次がある。
> 次があるということは、
> まだ間に合える可能性がある。

> 今夜は踏み出せなかった。
> でも、まひるはまだ空にある。

@wait 1200

> *（次こそ、走れるか）*

@wait 1000

> 俺には答えがなかった。

@wait 800

@bgm stop
@wait 300

@credits bad_end_loop.mp3
@end "第十二章「星は落ちていない。まだ、空にある」— まひるルート Bad End"
