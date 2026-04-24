// ===================================================================
//  放課後のステラ — さくらルート Ch.9s〜12s
//  「散らないように、咲く」
// ===================================================================


// ===================================================================
//  幕間「桜咲さくらの独白」
// ===================================================================

# sakura_interlude

@window_color sakura
@scene classroom_night fade
@bgm night_melody.mp3
@wait 1200

> ——笑顔は、夜には脱げる。

@wait 1000

sakura: 疲れた、って言えたら楽なのかな。

@wait 1000

sakura: 別に、バドミントンが嫌いなわけじゃない。
sakura: クラスのみんなが嫌いなわけでも、ない。

@wait 800

sakura: ただ。

@wait 1200

sakura: 誰かと一緒にいるとき、ずっと何かを演じてる気がする。
sakura: 笑いやすい空気を作るための笑顔。
sakura: 誰かが暗くなったときに場を持たせる言葉。
sakura: 気まずくならないように先読みして、先に動く。

@wait 1000

sakura: それが普通だと思ってた。
sakura: ずっと、そういうものだと思ってた。

@wait 1200

sakura: ……でも、たまに。

@wait 1000

sakura: すごく、ひとりになりたくなる。

@wait 1500

sakura: お父さんが倒れてから、ちょっとわかんなくなってる。

@wait 800

sakura: 笑ってれば大丈夫、って信じてたのに。
sakura: 笑ってたのに、ぜんぜん大丈夫じゃなかった。

@wait 1000

sakura: じゃあ、笑顔って何だったんだろう。

@wait 1200

sakura: ……勇くんが、変なんだよね。

@wait 800

sakura: 変っていうか。
sakura: あの人、笑わせようとしてこない。
sakura: 場を明るくしようとも、してこない。

@wait 1000

sakura: ただ、見てる。
sakura: あたしが笑ってても、笑ってなくても、同じ顔で見てる。

@wait 1200

sakura: それが。

@wait 800

sakura: なんか、怖いんだよね。
sakura: 見透かされてる気がして。

@wait 1000

sakura: ……でも、怖いだけじゃない、のかもしれない。

@wait 1500

@bgm stop
@wait 800

@window_color reset
@wait 700
@jump sakura_ch9_start


// ===================================================================
//  Chapter 9s「誰もいない部屋」
// ===================================================================

# sakura_ch9_start

@scene school_gate_autumn_rainy fade
@bgm sakura_theme.mp3
@se footsteps.mp3
@wait 800

> さくらが行った方向へ、俺は走った。

> 音楽準備室の前に、ことはがいるはずだった。
> まひるは、まだどこにもいない。

> 俺の足は、さくらの方へ動いていた。

> 「いつも一人だし！」

> あの笑顔が頭から離れなかった。
> 笑えていた。ちゃんと笑っていた。
> でも、かばんを握る手が白くなっていた。

> 白くなっていたのに、俺は一歩遅れた。

@se footsteps.mp3
@wait 600

> 雨の中を走った。
> 文化祭の音が遠ざかっていく。

@wait 1000

> 校門を出たところに、さくらがいた。

@show sakura center normal fade_in

> 立ち止まっている。
> 傘を出そうとして、
> その手が止まっていた。

@wait 600

player: ……さくら

@expr sakura surprised

sakura: え

sakura: なんで

sakura: 文化祭まだあるじゃん

player: 行く

@wait 500

sakura: え、でも

sakura: 大丈夫だよ、あたし一人で

player: わかってる

sakura: ……

player: 傘、出せなかっただろ

@wait 700

@expr sakura blank

> さくらは何も言わなかった。

> 雨が降っていた。
> 細かく、静かに。

@wait 1000

@expr sakura happy

sakura: ……もう

sakura: しょうがないな

@se footsteps.mp3
@wait 500

@hide sakura slide_out_left
@wait 400

> 並んで歩いた。
> 病院の名前だけ確かめて、それ以上は何も言わなかった。

@bgm stop
@wait 300

@jump sakura_ch9_days


# sakura_ch9_days

@scene classroom fade
@bgm daily_life.mp3
@se school_bell.mp3
@wait 1000

> 父親は軽症だった。

> 心臓に少し負担がかかっていた、ということで、
> 数週間の入院が必要だということ。

> その話をさくらは、翌日の放課後に教えてくれた。
> 「大したことなかったよ！　よかったよかった！」と言いながら。

@show sakura right happy fade_in

sakura: だから本当に大丈夫だったんだって

player: 入院するんだろ

sakura: でもそれって念のためで

player: 一人で家のこと、全部やるのか

@wait 400

@expr sakura normal

sakura: ……まあ、うん

sakura: 別に大したことないし
sakura: ごはんとか洗濯とか、もともと手伝ってたから

player: お母さんには連絡したか

@wait 500

@expr sakura thinking

sakura: ……したよ

sakura: 既読がつくかどうかわかんないけど

@wait 400

player: ついたか

sakura: ……まだ

@wait 600

@expr sakura happy

sakura: でも大丈夫！
sakura: お父さん元気だって書いておいたし

> *（元気じゃないから入院しているのに）*

player: ……そうか

sakura: うん！

@hide sakura fade_out
@wait 500

@jump sakura_ch9_daily_life


# sakura_ch9_daily_life

@scene corridor fade
@bgm daily_life.mp3
@wait 800

> 入院が始まった最初の週。

> さくらはいつも通りだった。
> 朝は俺より早く来て、席で課題をやっていた。
> 昼休みは友達と話して笑っていた。
> 帰りは部活。

> 何一つ変わっていなかった。
> 変わらないように、していた。

@show sakura left happy fade_in

sakura: あ、勇くん！　朝ごはん食べた？

player: 食べた

sakura: ほんとに？　ちゃんと食べた？

player: 食べたと言ってる

sakura: パンだけとかじゃないよね

player: 米だ

sakura: えらい！

@wait 400

> いつものやり取りだった。
> いつものさくらだった。

@wait 500

@expr sakura normal

> でもさくらの目の下に、うっすらと色があった。
> 疲れているのに、睡眠が足りていないのに、
> 気づかないふりをしている。

> 俺も気づかないふりをした。
> まだ聞く言葉を持っていなかったから。

@hide sakura fade_out
@wait 500

@jump sakura_ch9_daily2


# sakura_ch9_daily2

@scene cafeteria fade
@bgm daily_life.mp3
@wait 700

> 一週間が経った。

> 昼食を一緒に食べることになった。
> どちらが誘ったわけでもなかった。
> なんとなく、そうなっていた。

@show sakura center happy fade_in

sakura: 今日の唐揚げ、いつもより小さくない？

player: 気のせいだろ

sakura: いや絶対小さい！　先週の方が大きかった

player: 覚えてるのか

sakura: そりゃ覚えてるよ！　毎週楽しみにしてるもん

@wait 400

player: お前が楽しみにしてるのは唐揚げか

sakura: ご飯全体！

@wait 500

> さくらは笑った。
> 本物の笑顔だった。

@wait 400

@expr sakura normal

sakura: ……ねえ、勇くんって

sakura: お父さんとご飯食べる？

@wait 500

player: たまに

sakura: そっか

@wait 600

player: お前は

@wait 300

@expr sakura thinking

sakura: ……今は一人だから

sakura: 食べ終わる時間ってよくわかんなくなるよね

sakura: あ、食べてないわけじゃないよ！　ちゃんと作って食べてるよ

player: ……

sakura: ほんとだって！

@wait 500

> *（「ちゃんと」って言うとき、だいたいちゃんとしていない）*
> *（でも今はそれを言う場所じゃないと思った）*

player: 何が得意なんだ、料理

@expr sakura happy

sakura: え？　えーと、炒め物かな。あとスープ

player: 炒め物とスープの組み合わせなら栄養は取れる

sakura: ……勇くん、なんか変なとこで合理的だよね

player: そうか

sakura: でも、ありがとう

@wait 600

> ありがとう、の意味が、俺にはわかっていた。
> 食べてるかどうかを確認してくれたことへの礼だ。
> さくらはそういうことをちゃんと聞いている。

@hide sakura fade_out
@wait 500

@jump sakura_ch9_gym


# sakura_ch9_gym

@scene gymnasium fade
@bgm daily_life.mp3
@wait 800

> さくらはいつも通りだった。

> クラスの係も、委員会の仕事も、ちゃんとこなしていた。
> バドミントン部の練習では後輩の面倒を見て、
> 誰かが悩んでいたら声をかけて。

> 誰にも、何も言っていないはずだった。

@show sakura_sports left happy fade_in

sakura: 花見、シャトル落としすぎ！
sakura: もっと打点上げて！　手首じゃなくて肘から！

> 後輩「は、はい！」

sakura: できてる、その感じ！　続けて！

> 声が明るい。
> 走る。返す。指示する。笑う。
> 全部を、全力でやっていた。

@wait 800

@expr sakura_sports normal

> 副部長としての仕事は、ちゃんとやっていた。
> 練習メニューを組んで、後輩の様子を見て、
> 次の大会に向けたスケジュールを顧問と確認して。

> 全部ひとりでこなしていた。
> 「大丈夫です」という返事と一緒に。

@wait 600

@expr sakura_sports happy

sakura: 倉橋、今日フットワーク速くなってたよ！
sakura: この前と全然違う！

> 後輩「……ほんとですか！　嬉しい！」

sakura: ほんとほんと！　わかりやすく変わってた

> 後輩が照れながら笑う。
> さくらも笑う。

@wait 500

> 俺は壁際から見ていた。
> さくらの笑顔は本物だった。
> 後輩が上達したことは、本当に嬉しいんだと思う。

> でも、その笑顔の端に。
> 疲れが、こびりついていた。

@wait 400

> この後、文化祭委員会の反省会がある。
> 昨日の放課後もそうだった。
> それなのに、ここでも後輩の前では全力だ。

@se footsteps.mp3
@wait 400

> 練習が終わって、後輩たちが帰っていく。

@expr sakura_sports normal

> さくらはコートの端で、一人でシャトルを拾い集めていた。

> 一つ。また一つ。
> 黙って、丁寧に。

> 誰も見ていないときの手つきだった。

@wait 800

player: ……手伝うか

@expr sakura_sports normal

sakura: あ、勇くんまだいたの？

player: 邪魔か

sakura: ……ううん

> さくらはまた笑った。
> でもその笑顔は、ほんの少しだけ遅れて出てきた。

@hide sakura_sports fade_out
@wait 500

@jump sakura_ch9_walk


# sakura_ch9_walk

@scene gymnasium_back_school fade
@bgm evening_piano.mp3
@wait 700

> シャトルを片付けて、二人で体育館を出た。

> 夕方の光が斜めに差し込んでいた。
> 秋の終わりの空気は、指先が少し冷たい。

@show sakura right normal fade_in

sakura: 今日の花見ちゃん、上手くなってきてるんだよね

player: さっきそう言ってたな

sakura: うん。でもまだ体幹がね、足りなくて

player: 足りなくなるのは疲れてるときだ

sakura: ……そうかも

@wait 400

sakura: 勇くん、バドミントン詳しいの？

player: 詳しくない。でも疲れてる人間の動きは見ればわかる

@wait 500

@expr sakura thinking

sakura: ……そっか

sakura: 疲れてると動きに出るよね、確かに

@wait 400

@expr sakura happy

sakura: あたしは大丈夫だけど

player: ……

@wait 600

> *（「大丈夫」という言葉を、さくらはどれだけ使ってきたんだろう）*

> *（「大丈夫」と言えば、続けられる）*
> *（「大丈夫」と言えば、心配させない）*
> *（「大丈夫」と言えば、誰もいなくならない）*

> *（そういう使い方を、もう何年もしてきた言葉だ）*

player: ……ちゃんと食えてるか

sakura: え、ちゃんと食べてるよ！

player: 何を食べた

sakura: ……ゆうべは炒飯

player: 今日の朝は

sakura: ……ヨーグルト

@wait 500

player: 少ないな

@expr sakura shy

sakura: ……朝は別にいいじゃん

player: よくない

sakura: 勇くんって意外とうるさいよね

player: そういうことにしておく

@wait 500

@expr sakura normal

sakura: ……ありがとね

@wait 600

> また、ありがとうだった。
> さくらはこういうとき必ず礼を言う。
> 心配してもらうことを、申し訳ないと思っているから。

> 謝る必要のないことで、さくらは謝り続けている。
> ありがとうという言葉の裏に、すみません、が透けて見えた。

@hide sakura fade_out
@wait 500

@jump sakura_ch9_mother


# sakura_ch9_mother

@scene protagonist_room_night fade
@bgm night_melody.mp3
@wait 800

> 夜。

> さくらからメッセージが届いた。
> 「今日のごはん写真撮ったよ」

> 画像が一枚。
> 小さな鍋にスープ。卵焼き。炊きたての米。

@wait 600

player: 食えてるじゃないか

@wait 400

> 返信が来た。
> 「勇くんにうるさいって言われたから　笑」

> 絵文字が一個ついていた。

@wait 500

player: うるさくてよかった

> 「あははそれな」

@wait 600

> それからしばらくして、もう一通来た。

> 「お母さん、まだ既読ついてない」

@wait 1000

@bgm stop
@wait 400

> 一行だけ。
> 絵文字なし。

@wait 800

> *（病院に運ばれた父の話を送って、もう十日が経っていた）*
> *（「お父さん倒れた」「今は病院にいる」「少し大変だけど大丈夫」）*
> *（そう送って。既読がつかなかった）*

@wait 600

> 何を送れば正解か、俺にはわからなかった。

> 「大丈夫か」と聞けば「大丈夫」と返ってくる。
> 「辛いな」と言えば「そんなことないよ！」と返ってくる。

> さくらはすごく速く笑顔を作る。
> 文字の上でも、それは変わらない。

@wait 700

> 俺はしばらく画面を見つめて。

player: ……スープうまそうだったな

@wait 400

> 返信が来た。
> 「うん、うまかった」

@wait 500

> それだけだった。
> でも、それだけでよかった。

@bgm night_melody.mp3
@wait 600

@jump sakura_ch9_daily3


# sakura_ch9_daily3

@scene classroom fade
@bgm daily_life.mp3
@wait 800

> また一週間が経った。

> さくらの目の下の色は、まだそこにあった。
> でも笑顔の速さは変わらなかった。

@show sakura right happy fade_in

sakura: 勇くん、週末どうしてた？

player: 特に何もしてない

sakura: え、ほんとに？　ゲームとか？

player: 本を読んでた

sakura: え、何の本？

player: 推理小説

sakura: 面白い？

player: まあな

@wait 400

sakura: あたしも読んでみようかな
sakura: 最近なんか、夜に時間があるんだよね

@wait 500

player: ……寝られてるか

@expr sakura thinking

sakura: うーん

sakura: 眠れてはいるんだけど
sakura: なんか変な夢見るんだよ

player: 変な夢

sakura: うん、内容はよく覚えてないんだけど
sakura: なんか追いかけられてる感じの

@wait 600

@expr sakura happy

sakura: でも大丈夫！　朝ちゃんと起きられてるし

player: ……

@wait 400

> *（「追いかけられる夢」を「大丈夫」と言える人間が、大丈夫なわけがない）*

> *（でも、それを言えば「大丈夫だって！」が返ってくる）*

player: 推理小説、貸してやる

@expr sakura surprised

sakura: え、いいの？

player: 読み終わったから

sakura: やった！　ありがとう！

@wait 500

> さくらは少し嬉しそうだった。
> たぶん本の話をするのが久しぶりだったから。

> 父が入院してから、さくらは「自分のこと」をあまり話さなくなっていた。
> 部活のこと、後輩のこと、クラスのこと。
> それは話す。

> でも、自分が好きなもの、自分が楽しいと思うことは、
> 少しずつ減っていっていた。

@hide sakura fade_out
@wait 500

@jump sakura_ch9_choice


# sakura_ch9_choice

@scene commute_road_autumn_evening fade
@bgm sakura_theme.mp3
@wait 700

> 帰り道、並んで歩いていると、
> さくらのスマホが一度だけ光った。

@show sakura right normal fade_in

> さくらはそれを見て、
> 一秒だけ、顔が止まった。

> 既読がついていない。
> そう、ひと目でわかった。

@wait 600

@expr sakura happy

sakura: なんでもない！　迷惑メールかな

player: ……

@wait 400

@choice
- "大丈夫か、と聞く" -> sakura_ch9_ask
- "何も言わないでいる" -> sakura_ch9_silent


# sakura_ch9_ask

player: ……大丈夫か

@wait 500

@expr sakura surprised

sakura: え？

@wait 300

@expr sakura happy

sakura: うん、全然大丈夫！
sakura: ありがとね

@wait 700

> *（「全然」って言うやつが大丈夫だったことはない）*

player: ……そうか

sakura: そうだよ！

@wait 600

> さくらは笑い続けていた。

> 全然、と言った。
> 全然、大丈夫。

> そういう言葉の使い方を、
> 大丈夫な人間はしない。

@jump sakura_ch9_end


# sakura_ch9_silent

> 何も言わなかった。

> 聞こえていた。
> でも、聞いてしまったら、
> さくらが答えを作らなければいけなくなる。

@wait 600

sakura: ……勇くんって

sakura: 変なとこで黙るよね

player: そうか？

sakura: うん

@wait 400

@expr sakura normal

sakura: ……でもなんか

sakura: 安心する、かも

@wait 600

> *（俺には何もできていない。それでも、それだけが今できることだった）*

@jump sakura_ch9_end


# sakura_ch9_end

@hide sakura fade_out
@scene commute_road_autumn_evening fade
@bgm evening_piano.mp3
@wait 800

> 途中で別れた。

> 「また明日ね！」と言って、さくらは帰っていった。
> いつもの声だった。
> いつもの笑顔だった。

> でも誰もいない方向へ歩く後ろ姿は、
> 少しだけ、小さかった。

@wait 1000

> *（誰もいない部屋に帰っていく）*
> *（それが何日目かも、俺は知らない）*

> *（洗濯をして、ご飯を作って、食べて、寝る）*
> *（それを一人でこなして、「大丈夫」と言い続けていた）*

> *（謝る必要のないことで、さくらは謝り続けている）*
> *（「心配かけてごめんね」「大丈夫だから気にしないで」）*
> *（そのたびに、俺は何も言えなかった）*

@wait 1000

@bgm stop
@wait 500

@jump sakura_ch10_start


// ===================================================================
//  Chapter 10s「笑えない」
// ===================================================================

# sakura_ch10_start

@scene classroom fade
@bgm daily_life.mp3
@se school_bell.mp3
@wait 800

> また数日が経った。

> 父親の入院は続いていた。
> さくらは何も言わなかった。
> 俺も聞かなかった。

> 聞いたところで、「大丈夫」と言う。
> その答えは最初からわかっていたから。

@show sakura right happy fade_in

sakura: 勇くん、今日の数学の課題もう終わった？

player: まだ

sakura: あたしも！
sakura: 放課後一緒にやろうよ

player: いいけど

sakura: やった！

@wait 400

@expr sakura normal

> さくらのスマホが震えた。

> 机の上で、一度だけ。

@wait 300

@expr sakura blank

> さくらの手が止まった。

> 見た。読んだ。
> 何秒かかけて、読んだ。

@wait 800

@expr sakura happy

sakura: あ、ごめんごめん！　どこまで話してたっけ

player: ……

@wait 400

> *（切り替えが速すぎる。慣れすぎている）*
> *（何年も、それでやってきたんだろう）*

@hide sakura fade_out
@wait 500

@jump sakura_ch10_message


# sakura_ch10_message

@scene protagonist_room_night fade
@bgm night_melody.mp3
@wait 800

> 夜。

> さくらからメッセージが届いた。

> 「お母さんからLINEきた」

> 一行だけ。
> それ以上は書かれていなかった。

@wait 600

player: 何て書いてあったんだ

@wait 400

> しばらくして返信が来た。

> 「しばらく連絡できないかも　って」

@wait 800

> *（一行のメッセージ）*
> *（それだけで、数ヶ月の沈黙に答えが出た）*

@bgm stop
@wait 300

> さくらが八歳のとき、母は家を出た。
> 「歌手になる夢を追う」と言って。

> それから年に数回、メッセージが来る。
> 「元気にしてる？」「寒くなったね」「ごめんね」
> そういうものが来る。

> 既読がつくのは、数日後だった。

@wait 600

> 父が倒れたとき、さくらはすぐ母に連絡した。
> たぶん、来てほしかったから。
> 父のためか、自分のためかはわからないけど。

> でも「しばらく連絡できないかも」という返信が来た。
> それだけが来た。

@wait 800

player: ……

@wait 500

> 何を返せばいいか、わからなかった。

> 大丈夫か、と聞けばいい。
> でも「全然大丈夫！」が返ってくる。

> そうか、と言えばいい。
> でもそれは何も言わないのと同じだ。

@wait 600

> 俺はしばらく画面を見つめて、
> 結局、何も送らなかった。

> 翌朝、さくらは「おはよう！」と言いながら教室に来た。
> いつも通りだった。

@bgm night_melody.mp3
@wait 500

@jump sakura_ch10_gym


# sakura_ch10_gym

@scene gymnasium fade
@bgm daily_life.mp3
@wait 800

> 翌日の部活。

> さくらはいつも通りだった。
> いつも通り、すべてをこなしていた。

@show sakura_sports center happy fade_in

sakura: もっと体幹意識して！　打った後の姿勢！

> 後輩たちが走り回っている。

sakura: 上手くなってるよ、ちゃんとわかるから！

@wait 500

@expr sakura_sports normal

> さくらは副部長として、練習全体を見ていた。

> 動ける子、動けていない子。
> 疲れている子、気合いが入っている子。
> さくらはそれを全部見ながら、声をかけ続けた。

@expr sakura_sports happy

sakura: 松田、いいよそのフォーム！　それで続けて！

> 後輩「はい！」

sakura: 森川、ちょっとラケットの角度が！　見てて

@wait 400

> 自分のラケットを取り出して、デモンストレーションをする。
> 後輩が真剣な目で見ている。

sakura: こう。わかった？

> 後輩「……あ、なんか違う感じします」

sakura: そそ！　やってみて

@wait 600

> 後輩が打つ。さくらが頷く。

sakura: いいじゃん！

@wait 500

> 後輩の一人が転んだ。

@se footsteps.mp3
@wait 300

@expr sakura_sports normal

> 後輩「……っ」

> 泣いていた。
> 疲れと、悔しさと、もっと別の何かで。

@expr sakura_sports happy

sakura: ……おーい、大丈夫？

@wait 400

> さくらは迷わずしゃがんで、後輩の肩を抱いた。

sakura: 大丈夫大丈夫！　痛い？　どこ当たった？

> 後輩「……ふくらはぎで」

sakura: じゃあ骨は大丈夫だよ、立てる？

> 後輩「……はい」

sakura: えらい。
sakura: もう少ししたら帰っていいからね。
sakura: 今日よく動けてたから

@wait 500

> 後輩は泣きながら、小さく笑っていた。

> さくらの声のせいだと思う。
> あの声は、人を落ち着かせる。

@wait 600

> *（誰かを安心させるのが、うまい）*
> *（自分が安心する場所を知らないのに）*

@hide sakura_sports fade_out
@wait 500

@jump sakura_ch10_after_practice


# sakura_ch10_after_practice

@scene gymnasium fade
@bgm daily_life.mp3
@wait 700

> 練習が終わった。

> 後輩たちが荷物をまとめて、挨拶をして、出ていく。

@show sakura_sports right normal fade_in

> さくらはコートの後片付けをしていた。
> ネットを畳んで、ラインテープを確認して。

@expr sakura_sports happy

sakura: お疲れ様！　また明日！

> 後輩「お疲れ様でした！」

> 次々と帰っていく。
> 声が遠くなっていく。

@wait 600

@expr sakura_sports normal

> 体育館が静かになった。

> さくらは片付けを続けていた。
> 一つ一つ、丁寧に。

> 橋本先輩が引退して、もうひと月が経つ。
> さくらが、部全体を一人で回すようになっていた。

> 誰かがいなくなった後の静けさに、さくらは慣れていた。
> それが体に染み込んでいるように見えた。

@wait 600

> 帰り支度をして、出口へ向かった。

> さくらがドアの前で立ち止まっていた。
> 出口のすぐそばで、ラケットを持ったまま。

@still sakura_crying_gym
@wait 1000
@still_hide
@wait 300

@hide sakura_sports fade_out
@wait 500

@jump sakura_ch10_outside


# sakura_ch10_outside

@scene gymnasium_back fade
@bgm sakura_theme.mp3
@se footsteps_leave.mp3
@wait 700

> 体育館の外に出た。

> さくらが後ろからついてきた。
> 外の空気に、少し肩の力が抜けた気がした。

@wait 400

@show sakura_sports right normal fade_in

player: ……さくら

@expr sakura_sports surprised

sakura: っ

@wait 400

@expr sakura_sports happy

sakura: うわ、びっくりした！
sakura: なにどうしたの、帰ったんじゃないの

player: お前が見当たらなかったから

sakura: あー、ちょっと外の空気吸いたかっただけだよ
sakura: 大丈夫大丈夫！

player: ……

@bgm stop
@wait 600

> 一緒に帰り始めた。
> 廊下を抜けて、階段へ。

@scene staircase_evening fade
@wait 500

> 口の端が上がりかける。

@wait 400

> 止まる。

@wait 500

> また上がりかける。

@wait 400

> また止まる。

@hide sakura_sports fade_out
@wait 300

@still sakura_cant_smile
@wait 1500
@still_hide

@wait 800

@show sakura_sports center normal fade_in

sakura: ……あたし、今日おかしい

@wait 600

player: おかしくない

@wait 500

sakura: ……笑えないって、こんな感じなんだ

@wait 1000

> 独り言みたいに言った。
> 俺への言葉なのか、自分への言葉なのか、
> 境界線がなかった。

@wait 800

> でも、その場を離れなかった。

@wait 600

sakura: ……お母さん
sakura: まだ連絡してこないんだ

@wait 800

> 静かな声だった。
> 怒っているでも、悲しんでいるでもなく。
> ただ、言わずにいられなかった、というように。

@wait 700

sakura: 笑ってれば、いてくれると思ってたのに

@wait 800

sakura: ……全然、そうじゃなかった

@wait 1000

@bgm stop
@wait 600

@expr sakura_sports crying

> 涙が出ていた。
> 声を殺していた。
> 泣いていることに、さくら自身が一番戸惑っているようだった。

@wait 800

> 俺はさくらに歩み寄った。
> すぐそばに。

@wait 800

> さくらが少しだけ傾いた。
> ほんの少しだけ、俺の方に。

@wait 600

> 俺はさくらを抱きしめた。

@still sakura_embrace
@wait 600

@se heartbeat.mp3
@wait 800

> さくらはしばらく泣いていた。
> 笑わなかった。
> 我慢しなかった。

@wait 1500

@bgm sakura_breakdown.mp3
@wait 1000

> しばらく経って。

@wait 1200

@expr sakura_sports normal

sakura: ……あったかい

@wait 1000

> 独り言みたいに言った。
> 自分の体温に、初めて気づいたみたいな声だった。

@wait 1200

@still_hide
@wait 400

@hide sakura_sports fade_out
@wait 500

@bgm evening_piano.mp3
@wait 800

> *（泣けた）*
> *（笑おうとしないで、泣けた）*
> *（それがさくらにとって何年ぶりかは、俺にはわからなかった）*

@wait 1000

@jump sakura_ch10_walk


# sakura_ch10_walk

@scene school_gate_autumn_evening fade
@bgm evening_piano.mp3
@wait 700

> 帰り道。
> 二人で並んで、ゆっくり歩いていた。

@show sakura left normal fade_in

> さくらはずっと黙っていた。
> 喋ることを探しているわけでもなかった。
> ただ歩いていた。

@wait 800

> 俺も何も言わなかった。

> 夕方の空気が冷たかった。
> 街灯がひとつ、ついた。

@wait 600

sakura: ……ねえ

player: なんだ

sakura: 後輩が泣いてたじゃん、今日

player: ああ

sakura: あたし、ちゃんと声かけられたと思う？

@wait 500

player: 見てたけど、よかったと思う

@expr sakura thinking

sakura: ……そっか

sakura: なんか最近、ちゃんとできてるかどうか不安で

player: 不安になるなら、ちゃんとやってる証拠だろ

@wait 400

sakura: ……勇くんってさ

sakura: そういうこと、どこで覚えたの

player: 覚えた覚えはない

@expr sakura normal

sakura: じゃあなんで言えるの

player: わからない。でも思ったから言った

@wait 600

> さくらはしばらく黙っていた。

@wait 500

sakura: ……そういうとこ

sakura: すきだよ、勇くんの

@wait 700

> 淡々と言った。
> 特別な意味があるとも、ないとも取れた。

> でも、俺はそれを大事に受け取った。

@wait 600

@expr sakura normal

> 笑わなかった。
> 今日、笑えなかった日に。
> さくらは、すきだと言った。

> 笑顔じゃない言葉だった。
> だからかもしれない。
> それが、一番本物に見えた。

@hide sakura fade_out
@wait 500

@bgm stop
@wait 500

@jump sakura_ch11_start


// ===================================================================
//  Chapter 11s「あたし、ずっと怖かった」
// ===================================================================

# sakura_ch11_start

@scene protagonist_room_night fade
@bgm night_melody.mp3
@wait 1000

> 父親の退院日が決まった。

> さくらはそれをさらっと教えてくれた。
> 「来週の水曜日らしい！　よかったよかった！」と。

> 一人で迎えに行くつもりだ、と言っていた。
> 「もう慣れてるし、全然平気だから」と。

@wait 600

> 俺は「そうか」と言った。

@wait 500

> ……それだけ言って、黙った。

@bgm stop
@wait 400

> 全然平気。
> 全然大丈夫。
> 全然慣れてる。

> 「全然」ってつけるとき、
> だいたい全然じゃない。

> もう知っていた。
> 知っていて、俺はまだ何もしていない。

@wait 800

@bgm night_melody.mp3

> 窓の外を見た。
> 街灯の光だけが浮かんでいた。

@wait 600

> *（慎が消えたとき、俺は隣にいなかった）*

> *（気づいていた。何かがおかしいと気づいていた）*
> *（それでも声をかけるのが一日遅れた）*

> *（一日だけ）*
> *（たった一日）*

@wait 1000

@bgm stop
@wait 300

@jump sakura_ch11_morning


# sakura_ch11_morning

@scene protagonist_room_morning fade
@bgm stop
@se chime_soft.mp3
@wait 800

> 水曜日。

> 朝の六時半。
> 目が覚めた。

> 起き上がって、カーテンを開けた。
> 雨上がりの空だった。
> アスファルトがまだ光を反射していて、
> 空気が少しだけ冷たかった。

@wait 800

> 着替えて、家を出た。

> 病院の開院は八時。
> 父親の退院手続きには、一時間くらいかかるかもしれない。

> さくらは一人で全部やるつもりだった。
> 退院の書類も、荷物も、タクシーの手配も。

@wait 600

> *（俺がいてもいなくても、さくらはできる）*
> *（それはわかってる）*

> *（でも「できる」と「一人でやらなくていい」は、別の話だ）*

@wait 800

> 電車に乗った。
> 病院のある駅で降りた。
> 空気がまだ少し濡れていた。

@jump sakura_ch11_hospital


# sakura_ch11_hospital

@scene commute_road_autumn fade
@bgm stop
@wait 1200

> 雨上がりだった。

> アスファルトがまだ光を反射していて、
> 空気が少しだけ冷たかった。
> 朝の八時。

@wait 800

> 病院の自動ドアが開くたびに、消毒液のにおいが流れてくる。

@wait 600

@se footsteps.mp3
@wait 400

> 足音が聞こえた。

@show sakura left normal fade_in

> さくらだった。
> 鞄を肩にかけて、少しだけ急ぎ足で。
> 前を向いて、ちゃんと歩いていた。

@wait 600

> 俺に気づいた瞬間、足が止まった。

@expr sakura surprised

sakura: ……なんでいるの

player: 一人で行くのかと思って

sakura: 一人で行けるよ

player: 行けるのは知ってる

@wait 800

> さくらは俺を見ていた。

> 怒っているのか、驚いているのか、
> その顔からはわからなかった。

@wait 600

> 雨上がりの空を、細い風が渡っていく。

@wait 500

@bgm stop

> さくらの喉が動いた。

@wait 400

> 何かを言おうとした。
> 「大丈夫」か、「ありがとね」か、
> そういう言葉を作ろうとしていた。

@wait 700

> 何度もそうしてきた。
> 何年も、そうしてきた。

> 笑顔を出して、「大丈夫」と言って、
> 誰かに「そっか、よかった」と言ってもらって。
> それで終わりにしてきた。

@wait 600

@expr sakura crying

> でも。

@wait 600

sakura: ……なんで

@wait 300

sakura: なんでいてくれるの

@wait 1200

> さくらの声が、詰まった。

@wait 600

> 笑おうとしなかった。
> 笑顔を探さなかった。

@wait 500

> ただ、泣いていた。

@wait 800

> 声を殺さない。
> 止まらない。

@wait 1000

@se heartbeat.mp3
@wait 400

sakura: あたしさ

sakura: お母さんがいなくなったのって

@wait 700

sakura: 泣き虫だったからだって

sakura: ずっと思ってたんだよね

@wait 1000

player: ……

@wait 600

sakura: だから笑ってたの

sakura: 笑ってれば、誰もいなくならないって

@wait 800

sakura: でもお父さん倒れたじゃん

@wait 500

sakura: 笑ってたのに

@wait 400

sakura: 笑ってたのに、全然足りなかった

@wait 800

> *（全然）*
> *（また全然だ）*
> *（でも今回の全然は、ちゃんと全然だった）*

@wait 500

sakura: ……笑えなくなったら

@wait 600

sakura: どうしたらいいのかわかんないの

@wait 1500

> 声が、そこで折れた。

> 「わかんない」という言葉は、
> さくらの口からたぶん初めて出た言葉だった。

@wait 1000

> *（慎が消えたとき、俺は隣にいなかった）*
> *（今日は、いる）*

@wait 800

> 俺は何も言わなかった。

> 言葉は何も持っていなかった。
> 慰める言葉も、答えも、
> 何も持っていなかった。

@wait 600

sakura: ……笑わなくても、いてくれる？

@wait 1000

player: いる

@wait 1200

> さくらはしばらく泣いていた。
> 笑わなかった。
> 我慢しなかった。

@wait 1500

@bgm sakura_breakdown.mp3
@wait 1000

> しばらく経って。

@wait 1200

@expr sakura normal

sakura: ……病院、一緒に来てくれる？

@wait 800

player: 来るつもりだったから、ここにいる

@wait 1000

> さくらは何も言わなかった。

> ただ、少しだけ力を抜いた。

@wait 1200

@bgm stop
@hide sakura fade_out
@wait 600

@jump sakura_ch12_start


// ===================================================================
//  Chapter 12s「エンディング分岐」
// ===================================================================

# sakura_ch12_start

@scene commute_road_autumn fade
@bgm sakura_theme.mp3
@wait 1000

> 父親は元気そうだった。

> 顔色もよくて、さくらを見て「大げさに泣くなよ」と笑った。
> さくらは「泣いてないし！」と言って、少しだけ笑った。

@show sakura center happy fade_in

@wait 600

> その笑顔は、いつものやつと少し違った。
> 眩しさが一段落ちていた。
> その分だけ、本物に近かった。

@hide sakura fade_out
@wait 500

@jump sakura_ch12_branch


# sakura_ch12_branch

@scene corridor fade
@bgm daily_life.mp3
@wait 800

> それから、少しずつ変わっていった。

@wait 600

@choice
- "さくらが自分で立てるまで、少し引いていようと思った" -> sakura_good_end
- "俺がそばにいてやれば、大丈夫だと思った" -> sakura_bad_end


// ===================================================================
//  Good End「散らないように、咲く」
// ===================================================================

# sakura_good_end

@scene classroom_evening fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 1000

> さくらは泣けるようになった。

> 少しずつ。
> 急にではなく。

> 笑っているときも泣くやつだったから、
> 泣きながら笑うこともあった。
> それがさくららしいとも思った。

@show sakura right normal fade_in

sakura: ねえ勇くん

player: なんだ

sakura: あのさ

@wait 400

@expr sakura thinking

sakura: お母さんにさ

sakura: 返信した

player: ……なんて

@wait 600

sakura: 「……うん」って

@wait 800

player: ……

sakura: 「うん、元気だよ！」って書きたかったんだけど

sakura: なんか

sakura: 「うん」だけでいいかなって

@wait 600

player: よかったんじゃないか

@expr sakura normal

sakura: ……うん

@wait 600

> 笑わなかった。
> でも、ちゃんとここにいた。

@hide sakura fade_out
@wait 500

@jump sakura_good_end_daily


# sakura_good_end_daily

@scene corridor fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 800

> 父が退院してから、さくらの毎日が少しずつ変わっていった。

> 変わった、というより。
> 戻っていった、が正しいかもしれない。

@show sakura left normal fade_in

sakura: 昨日、お父さんと二人でご飯食べたんだよ

player: 久しぶりか

sakura: うん。久しぶり。なんか変な感じした

player: 変な感じ

sakura: なんか、こんなに二人でいいのかなって

@wait 500

player: いいだろ

@expr sakura happy

sakura: ……うん、そうだよね

sakura: 天ぷら揚げたんだよ、二人で

player: 食べられたか

sakura: めっちゃ食べた！　お父さんも嬉しそうだったし

@wait 600

player: そうか

@expr sakura normal

sakura: ……退院してから、お父さんなんか優しくなったんだよね

player: 心配させたからじゃないか

sakura: そうかな

sakura: あたしも、ちゃんと心配してたって言ったよ

player: ……言えたのか

sakura: うん。なんか、言えた

@wait 600

> 当然のことのように言った。
> でも、さくらにとって「言えた」は簡単なことじゃなかったはずだ。

@hide sakura fade_out
@wait 500

@jump sakura_good_end_hospital


# sakura_good_end_hospital

@scene classroom_evening fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 800

> さくらが話してくれた、見舞いの日のこと。

> 父の前で、少しだけ言葉を探してから、言ったのだと。

@show sakura center normal fade_in

sakura: ……ちょっと怖かった

@wait 1000

> 笑顔なしで。
> 「大丈夫だったよ」なしで。

> ただ、怖かった、と。

@wait 800

player: ……

@expr sakura shy

sakura: 父親に言うのって、恥ずかしいな

player: そうか？

sakura: だってなんか、弱いじゃん

player: 弱くないだろ

@wait 500

sakura: ……勇くんに言われると

sakura: そうかもなって思う

@wait 600

> 父は何も言わなかった。
> ただ、さくらの頭に手を置いた。

@wait 1000

@hide sakura fade_out
@wait 500

@jump sakura_good_end_club


# sakura_good_end_club

@scene gymnasium fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 800

> 部活の日。

@show sakura_sports center happy fade_in

> 後輩たちが残って居残り練習をしようとしていた。

sakura: ……今日はもう帰っていいよ

> 後輩「え、でも先輩」

sakura: あたしも帰るから

@wait 500

@expr sakura_sports normal

sakura: 疲れてるときって体の動き見てもわかるから
sakura: 今日は休んで、次でちゃんとやろう

> 後輩「……はい、ありがとうございます！」

@wait 600

> 後輩たちが出ていく。

@expr sakura_sports happy

> さくらは少しだけ、息を吐いた。

@wait 500

> 俺が近づいていくと、さくらは振り返った。

sakura: 帰ろ、勇くん

player: もう片付けはいいのか

sakura: 今日はいい。明日やる

@wait 400

player: ……珍しいな

@expr sakura_sports normal

sakura: たまには、ね

@wait 500

> *（「大丈夫」じゃなくても、後輩の面倒は見られる）*
> *（帰っていい、と言えたことが、たぶん今日の一歩だった）*
> *（片付けを後回しにできたことが、もう一歩だった）*

@hide sakura_sports fade_out
@wait 500

@jump sakura_good_end_message


# sakura_good_end_message

@scene protagonist_room_night fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 800

> その夜。

> さくらからメッセージが来た。

> 「お母さんに追加で送った」

@wait 600

player: 何て

@wait 400

> 「お父さん退院したよ」
> 「怖かったって言えなかったけど、少し怖かった」
> 「あと、元気じゃないとき元気だよって言ってたごめん」

@wait 1000

> *（元気だよ！　じゃない）*
> *（ごめん、を言えた）*

@wait 600

player: 送れてよかったな

@wait 400

> しばらくして返信が来た。

> 「まだ既読ついてないけど　笑」
> 「でもなんか、すっきりした」

@wait 800

player: それでいい

@wait 400

> 「うん」

@wait 500

> 「ありがとね　勇くん」

@wait 600

> *（ありがとう、の意味が変わってきた気がした）*
> *（申し訳なさじゃなくて、ちゃんとした礼だった）*

@bgm stop
@wait 500

@jump sakura_good_end_rooftop


# sakura_good_end_rooftop

@scene rooftop_evening fade
@hide sakura instant
@hide sakura_sports instant
@bgm stop
@se chime_soft.mp3
@wait 1200

> 屋上に出た。

> 夕方の空が広がっていた。
> 薄い橙と、青の残りと。
> その境目がゆっくりにじんでいく。

@wait 800

> さくらはすでにそこにいた。

@show sakura center normal fade_in

sakura: ……勇くん

player: 先にいたのか

sakura: うん。なんか来たくなって

@wait 600

@expr sakura happy

sakura: 今日の空、わりときれいだね

@wait 500

player: そうだな

sakura: 雨上がりって空気が違う気がする
sakura: なんか洗われた感じ？

player: 詩人みたいなこと言うな

sakura: えー、わかんない？

@wait 600

@expr sakura normal

> さくらは空を見ていた。

> 笑っていた。
> 今日の笑顔は、全力じゃなかった。
> でも、本物だった。

@wait 800

sakura: ……ねえ、勇くん

player: なんだ

sakura: 今日、後輩が泣いてたんだよね

player: また転んだか

sakura: ちがう！　悔しくて泣いてたの

player: ああ

@wait 400

sakura: 慰めたんだけどね
sakura: 慰めながらちょっと泣きそうになった

player: …慰めながら？

@expr sakura shy

sakura: なんかね、「先輩も大変なのに来てくれてありがとう」って言われて

sakura: 知ってたんだ、あの子。あたしのこと

@wait 600

player: ……

sakura: なんか嬉しくてさ
sakura: 泣き虫だなあって思った

@wait 500

@expr sakura normal

sakura: でも

sakura: 泣きたいときに泣ける方が、いいよね

@wait 700

player: そうだな

sakura: うん

@wait 500

@bgm sakura_good_end.mp3

sakura: ねえ

player: なんだ

sakura: あたし、ずっと

sakura: 笑い続けてたら、誰もいなくならないって思ってたじゃん

player: ああ

sakura: ……それ、違ったな

@wait 800

player: ……

sakura: 笑えなくても

sakura: いてくれる人、いたから

@wait 1000

@hide sakura fade_out
@wait 400

@still sakura_good_end_rooftop1_pre1
@wait 700

> さくらが、ゆっくり手を上げた。

@still sakura_good_end_rooftop1_pre2
@wait 900

> 結んでいた髪に、指をかける。

@still sakura_good_end_rooftop1_pre3
@wait 1000

> 横目で、こちらをちらりと見た。
> 照れていた。

@still sakura_good_end_rooftop1
@wait 1200

> 髪が、ほどけた。

@wait 800

sakura: ……勇くんのこと、好きです

@wait 800

player: ……俺もだ

@wait 800

sakura: ふふ

sakura: なんか勇くんに言われると

sakura: もっと笑えそうな気がする

player: なんだそれ

sakura: 本当のことだもん！

@wait 800

@still_hide
@wait 600

> さくらは笑った。

> 空に向かって、少しだけ顔を上げて。

> 今日の笑顔は、世界一眩しいわけじゃなかった。
> でも世界一、本物だった。

> 散らないように。
> でも、ちゃんと咲いていた。

@wait 1500

@still sakura_good_end_rooftop2
@ending_intro current sakura_good_end 10000

@scene school_grounds_evening fade
@bgm epilogue_sunset_for_each.mp3

> 夕方のグラウンド。
> オレンジの光がトラックを斜めに切っている。

@wait 1200

> ゴールもないまま、減速する。

@wait 1000

@show sakura center normal fade_in

> 少し離れた場所で、さくらが手を振っている。
> 大きくは振らない。呼びもしない。
> ただ、そこにいる。

@wait 1200

@hide sakura fade_out
@wait 600

> 木陰。
> 主人公がそのまま座り込む。

@wait 800

> さくらが隣に来て、自然に膝を貸す。
> 主人公は前髪に顔を隠すように目を閉じる。

@wait 1200

@show sakura center thinking fade_in

sakura: ……まけっちゃったねー

@wait 600

> 声は軽い。
> でも無理に明るくはない。

@expr sakura normal

sakura: でも、ちゃんと走ってた

@wait 1500

@hide sakura fade_out
@wait 400

> 風が葉を揺らす。

@wait 1000

> 会話が途切れる。
> それでも気まずくない。

@wait 1200

> さくらは空を見ている。
> 主人公は目を閉じたまま。

@wait 1500

> 同じ時間の中にいる。

@wait 2500

@still sakura_epilogue fade_in
@wait 1500
@end "第十二章「散らないように、咲く」— さくらルート Good End"


// ===================================================================
//  Bad End「誰かのための笑顔」
// ===================================================================

# sakura_bad_end

@scene classroom_evening fade
@bgm bad_end_loop.mp3
@wait 1000

> 勇がいれば大丈夫だった。

> さくらはそう思い始めていた。

> 病院の前で泣いてから。
> 抱きしめてもらってから。
> 「いる」と言ってもらってから。

> その一点に、さくらはしがみついていた。

@show sakura center happy fade_in

sakura: 勇くんがいてくれるから大丈夫！
sakura: 今日も大丈夫！
sakura: 全然大丈夫！

@wait 600

player: ……

sakura: ね、放課後どうする？

player: 少し一人の時間がほしいんだが

@wait 400

@expr sakura surprised

sakura: え

@wait 500

@expr sakura happy

sakura: あ、そっか！　ごめんごめん！
sakura: あたし先帰るね！

player: ……

@hide sakura fade_out
@wait 500

> *（さくらの笑顔に、何かが戻っていた）*
> *（でも、そこに自分がいない気がした）*

@wait 600

> *（何かのために笑っている顔だった）*
> *（それが俺のためになっていた）*

@jump sakura_bad_end_dependency


# sakura_bad_end_dependency

@scene corridor fade
@bgm bad_end_loop.mp3
@wait 800

> 少しずつ、見えてきた。

@show sakura right happy fade_in

> 勇が来ると、さくらは明るくなった。
> 勇が傍にいると、さくらは元気になった。

> その変化は最初、うれしかった。
> 役に立てている気がした。

@wait 600

sakura: 勇くん！　今日の授業聞いてた？
sakura: ノート貸してほしいんだけど

player: いいけど

sakura: やった！　ありがとう！

@wait 400

sakura: 今日の放課後は？

player: 特に何も

sakura: じゃあ一緒にいよ！

player: ……ああ

@wait 500

@expr sakura happy

sakura: やった！

@wait 600

> 笑顔だった。
> 全力の笑顔だった。

> *（その笑顔は、きれいだった）*
> *（でも何かが引っかかっていた）*
> *（引っかかりの正体が、まだわからなかった）*

@hide sakura fade_out
@wait 500

@jump sakura_bad_end_scene


# sakura_bad_end_scene

@scene classroom_night fade
@bgm bad_end_loop.mp3
@wait 1000

> 少しずつ変わっていった。

> でも、変わったのはさくらじゃなかった。

> 笑っていた。ずっと笑っていた。
> ただし今度は、俺のために笑っていた。

> 勇がいない日は、何もできなくなった。

@wait 800

@show sakura center normal fade_in

> ある日の放課後。
> 俺が少し遅れて教室に来たとき、
> さくらは窓際でじっとしていた。

sakura: ……あ、勇くん

player: ……遅かったか

sakura: ううん！　全然！

@wait 600

@expr sakura happy

sakura: 待ってたよ！　ずっと待ってた！

player: ……

@wait 500

@wait 600

@show sakura center happy fade_in

> さくらは笑っていた。

> でもその目に、
> 光がなかった。

@wait 1000

@bgm stop
@wait 300

> 笑えないって、こんな感じなんだ。

> あの夜、さくらが言っていた。

> 今のさくらは笑っていた。
> でも、俺には届いていなかった。

@wait 800

> 笑えなかったのに、
> 笑えるようになった。
> でも何のために笑っているのかが、
> 消えていた。

@wait 1200

@jump sakura_bad_end_alone


# sakura_bad_end_alone

@hide sakura instant
@scene school_gate_autumn_evening fade
@bgm bad_end_loop.mp3
@wait 800

> 勇がいない日のことを、後から聞いた。

> 委員会の仕事があって、俺が先に帰った日。
> さくらはその日、一人で教室に残って、
> 何もしないまま二時間いたらしかった。

@wait 600

@show sakura left blank fade_in

> 後輩がたまたま声をかけて、初めて気づいた。

> 後輩「先輩、どうかしましたか」

@wait 500

@expr sakura happy

sakura: あ、なんでもない！　ちょっと考えごとしてただけ！

@wait 600

> 後輩は心配そうにしていた。

> でも「大丈夫」と言われたから、帰っていった。

@wait 800

> *（また大丈夫）*
> *（また笑顔）*
> *（また誰も気づかない）*

@hide sakura fade_out
@wait 500

@jump sakura_bad_end_final


# sakura_bad_end_final

@scene classroom_night fade
@bgm bad_end_loop.mp3
@wait 1000

> 何も変わらなかった。

> いや。何かが変わった。

> 元に戻ってしまった。

@wait 800

@show sakura center happy fade_in

> さくらは笑っていた。
> 部活でも、授業でも、友達との会話でも。

> ただ、それは誰かのための笑顔だった。
> 病院の前に泣く前のさくらが「誰もいなくならないため」に笑っていたように。
> 今のさくらは、俺のために笑っていた。

@wait 600

sakura: 勇くん、今日も一緒に帰ろ！

player: ……

sakura: ね、いいでしょ？

player: ……ああ

@expr sakura happy

sakura: やった！

@wait 800

> やった、と言う。
> でも何を得たかを、さくらは知らないかもしれない。

@wait 600

@bgm stop
@wait 300

> 笑えないって、こんな感じなんだ。

> あの言葉が蘇った。

> 笑えなかったさくらが、笑えるようになった。
> でも今のさくらの笑顔には、さくらがいなかった。

@wait 1000

@expr sakura blank

> 笑顔の端が、少しだけ硬かった。

@wait 800

@hide sakura fade_out
@wait 600

@still bad_end_empty_classroom
@wait 2000
@still_hide
@wait 600

@bgm bad_end_loop.mp3
@wait 800

sakura: （遠くから）勇くーん！　早く行こうよー！

@wait 800

> 手を振る声だった。
> 笑顔の声だった。

@wait 600

> でも、その声は
> 俺に向かって降ってくるというより、
> どこかへ溶けていくみたいに聞こえた。

@wait 1000

> *（誰かのための笑顔は、やがて誰のものでもなくなる）*

@wait 1500

@bgm stop

@credits bad_end_loop.mp3
@end "第十二章「誰かのための笑顔」— さくらルート Bad End"
