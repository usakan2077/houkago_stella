// ===================================================================
//  放課後のステラ — Chapter 8「選ぶということ」
// ===================================================================


# chapter8_start

@scene classroom_rainy fade
@bgm festival_rain.mp3
@se crowd_festival.mp3
@wait 1000

> $chapter8.chapter8_start.t001
> $chapter8.chapter8_start.t002

> $chapter8.chapter8_start.t003

> $chapter8.chapter8_start.t004
> $chapter8.chapter8_start.t005
> $chapter8.chapter8_start.t006

> $chapter8.chapter8_start.t007

@se rain_window.mp3
@wait 600

> $chapter8.chapter8_start.t008

> $chapter8.chapter8_start.t009

> $chapter8.chapter8_start.t010

@wait 800

> $chapter8.chapter8_start.t011
> $chapter8.chapter8_start.t012
> $chapter8.chapter8_start.t013
> $chapter8.chapter8_start.t014
> $chapter8.chapter8_start.t015

> $chapter8.chapter8_start.t016
> $chapter8.chapter8_start.t017
> $chapter8.chapter8_start.t018
> $chapter8.chapter8_start.t019

@show sakura right excited fade_in
@show kotoha left normal fade_in

sakura: $chapter8.chapter8_start.t020

player: $chapter8.chapter8_start.t021

sakura: $chapter8.chapter8_start.t022

player: $chapter8.chapter8_start.t023

sakura: $chapter8.chapter8_start.t024

> $chapter8.chapter8_start.t025
> $chapter8.chapter8_start.t026
> $chapter8.chapter8_start.t027
> $chapter8.chapter8_start.t028

> $chapter8.chapter8_start.t029

sakura: $chapter8.chapter8_start.t030

player: $chapter8.chapter8_start.t031

sakura: $chapter8.chapter8_start.t032

sakura: $chapter8.chapter8_start.t033
sakura: $chapter8.chapter8_start.t034

@expr kotoha normal

kotoha: $chapter8.chapter8_start.t035

sakura: $chapter8.chapter8_start.t036

player: $chapter8.chapter8_start.t037

sakura: $chapter8.chapter8_start.t038

@wait 400

> $chapter8.chapter8_start.t039
> $chapter8.chapter8_start.t040
> $chapter8.chapter8_start.t041

player: $chapter8.chapter8_start.t042

@expr kotoha thinking

kotoha: $chapter8.chapter8_start.t043
kotoha: $chapter8.chapter8_start.t044

sakura: $chapter8.chapter8_start.t045

@expr kotoha normal

kotoha: $chapter8.chapter8_start.t046
kotoha: $chapter8.chapter8_start.t047

sakura: $chapter8.chapter8_start.t048

> $chapter8.chapter8_start.t049
> $chapter8.chapter8_start.t050
> $chapter8.chapter8_start.t051

@wait 600

> $chapter8.chapter8_start.t052

sakura: $chapter8.chapter8_start.t053

player: $chapter8.chapter8_start.t054

sakura: $chapter8.chapter8_start.t055

> $chapter8.chapter8_start.t056
> $chapter8.chapter8_start.t057
> $chapter8.chapter8_start.t058

> $chapter8.chapter8_start.t059
> $chapter8.chapter8_start.t060
> $chapter8.chapter8_start.t061

> $chapter8.chapter8_start.t062

@hide_all fade_out
@wait 500

@jump chapter8_festival_open


// ===================================================================
//  文化祭開始
// ===================================================================

# chapter8_festival_open

@scene corridor_festival_rainy fade
@bgm festival_rain.mp3
@wait 800

> $chapter8.chapter8_festival_open.t001
> $chapter8.chapter8_festival_open.t002

> $chapter8.chapter8_festival_open.t003
> $chapter8.chapter8_festival_open.t004
> $chapter8.chapter8_festival_open.t005

> $chapter8.chapter8_festival_open.t006
> $chapter8.chapter8_festival_open.t007

@wait 600

> $chapter8.chapter8_festival_open.t008
> $chapter8.chapter8_festival_open.t009
> $chapter8.chapter8_festival_open.t010
> $chapter8.chapter8_festival_open.t011

> $chapter8.chapter8_festival_open.t012
> $chapter8.chapter8_festival_open.t013

@show mahiru center happy fade_in

mahiru: $chapter8.chapter8_festival_open.t014

player: $chapter8.chapter8_festival_open.t015

mahiru: $chapter8.chapter8_festival_open.t016

player: $chapter8.chapter8_festival_open.t017

@expr mahiru normal

mahiru: $chapter8.chapter8_festival_open.t018

mahiru: $chapter8.chapter8_festival_open.t019
mahiru: $chapter8.chapter8_festival_open.t020

player: $chapter8.chapter8_festival_open.t021

mahiru: $chapter8.chapter8_festival_open.t022

mahiru: $chapter8.chapter8_festival_open.t023
mahiru: $chapter8.chapter8_festival_open.t024

player: $chapter8.chapter8_festival_open.t025

@expr mahiru happy

mahiru: $chapter8.chapter8_festival_open.t026

@wait 600

> $chapter8.chapter8_festival_open.t027
> $chapter8.chapter8_festival_open.t028

> $chapter8.chapter8_festival_open.t029
> $chapter8.chapter8_festival_open.t030

@expr mahiru thinking

mahiru: $chapter8.chapter8_festival_open.t031

player: $chapter8.chapter8_festival_open.t032

mahiru: $chapter8.chapter8_festival_open.t033

> $chapter8.chapter8_festival_open.t034
> $chapter8.chapter8_festival_open.t035
> $chapter8.chapter8_festival_open.t036

mahiru: $chapter8.chapter8_festival_open.t037
mahiru: $chapter8.chapter8_festival_open.t038

player: $chapter8.chapter8_festival_open.t039

mahiru: $chapter8.chapter8_festival_open.t040
mahiru: $chapter8.chapter8_festival_open.t041
mahiru: $chapter8.chapter8_festival_open.t042

player: $chapter8.chapter8_festival_open.t043

@expr mahiru happy

mahiru: $chapter8.chapter8_festival_open.t044

mahiru: $chapter8.chapter8_festival_open.t045

> $chapter8.chapter8_festival_open.t046
> $chapter8.chapter8_festival_open.t047

@hide mahiru fade_out
@wait 500

@jump chapter8_sakura_cafe


// ===================================================================
//  クラス喫茶店
// ===================================================================

# chapter8_sakura_cafe

@scene classroom_cafe_rainy fade
@bgm festival_rain.mp3
@wait 800

> $chapter8.chapter8_sakura_cafe.t001

> $chapter8.chapter8_sakura_cafe.t002
> $chapter8.chapter8_sakura_cafe.t003
> $chapter8.chapter8_sakura_cafe.t004

> $chapter8.chapter8_sakura_cafe.t005

@wait 600

> $chapter8.chapter8_sakura_cafe.t006
> $chapter8.chapter8_sakura_cafe.t007
> $chapter8.chapter8_sakura_cafe.t008
> $chapter8.chapter8_sakura_cafe.t009

>誰かが、きちんと準備したのがわかる空間だった。

@show sakura_apron center excited fade_in

sakura: $chapter8.chapter8_sakura_cafe.t010

> $chapter8.chapter8_sakura_cafe.t011

> $chapter8.chapter8_sakura_cafe.t012
> $chapter8.chapter8_sakura_cafe.t013
> $chapter8.chapter8_sakura_cafe.t014

> $chapter8.chapter8_sakura_cafe.t015
> $chapter8.chapter8_sakura_cafe.t016
> $chapter8.chapter8_sakura_cafe.t017
> $chapter8.chapter8_sakura_cafe.t018

> $chapter8.chapter8_sakura_cafe.t019
> $chapter8.chapter8_sakura_cafe.t020

sakura: $chapter8.chapter8_sakura_cafe.t021

player: $chapter8.chapter8_sakura_cafe.t022

sakura: $chapter8.chapter8_sakura_cafe.t023

player: $chapter8.chapter8_sakura_cafe.t024

sakura: $chapter8.chapter8_sakura_cafe.t025

player: $chapter8.chapter8_sakura_cafe.t026

@wait 400

> $chapter8.chapter8_sakura_cafe.t027

> $chapter8.chapter8_sakura_cafe.t028
> $chapter8.chapter8_sakura_cafe.t029

> $chapter8.chapter8_sakura_cafe.t030
> $chapter8.chapter8_sakura_cafe.t031
> $chapter8.chapter8_sakura_cafe.t032

@wait 600

> $chapter8.chapter8_sakura_cafe.t033
> $chapter8.chapter8_sakura_cafe.t034

@expr sakura_apron normal

> $chapter8.chapter8_sakura_cafe.t035
> $chapter8.chapter8_sakura_cafe.t036

> $chapter8.chapter8_sakura_cafe.t037
> $chapter8.chapter8_sakura_cafe.t038

> $chapter8.chapter8_sakura_cafe.t039
> $chapter8.chapter8_sakura_cafe.t040

@wait 500

> $chapter8.chapter8_sakura_cafe.t041
> $chapter8.chapter8_sakura_cafe.t042
> $chapter8.chapter8_sakura_cafe.t043

> $chapter8.chapter8_sakura_cafe.t044
> $chapter8.chapter8_sakura_cafe.t045

@wait 800

> $chapter8.chapter8_sakura_cafe.t046
> $chapter8.chapter8_sakura_cafe.t047

@bgm stop
@wait 300

> $chapter8.chapter8_sakura_cafe.t048

sakura: $chapter8.chapter8_sakura_cafe.t049

> $chapter8.chapter8_sakura_cafe.t050

@wait 400

> $chapter8.chapter8_sakura_cafe.t051

> $chapter8.chapter8_sakura_cafe.t052

> $chapter8.chapter8_sakura_cafe.t053
> $chapter8.chapter8_sakura_cafe.t054

> $chapter8.chapter8_sakura_cafe.t055
> $chapter8.chapter8_sakura_cafe.t056

@expr sakura_apron blank

sakura: $chapter8.chapter8_sakura_cafe.t057

@wait 500

@expr sakura_apron happy

sakura: $chapter8.chapter8_sakura_cafe.t058
sakura: $chapter8.chapter8_sakura_cafe.t059

> $chapter8.chapter8_sakura_cafe.t060

> $chapter8.chapter8_sakura_cafe.t061

player: $chapter8.chapter8_sakura_cafe.t062

> $chapter8.chapter8_sakura_cafe.t063
> $chapter8.chapter8_sakura_cafe.t064
> $chapter8.chapter8_sakura_cafe.t065

@wait 600

@expr sakura_apron excited

sakura: $chapter8.chapter8_sakura_cafe.t066
sakura: $chapter8.chapter8_sakura_cafe.t067

player: $chapter8.chapter8_sakura_cafe.t068

> $chapter8.chapter8_sakura_cafe.t069
> $chapter8.chapter8_sakura_cafe.t070

@wait 800

> $chapter8.chapter8_sakura_cafe.t071

> $chapter8.chapter8_sakura_cafe.t072
> $chapter8.chapter8_sakura_cafe.t073
> $chapter8.chapter8_sakura_cafe.t074

> $chapter8.chapter8_sakura_cafe.t075

> $chapter8.chapter8_sakura_cafe.t076
> $chapter8.chapter8_sakura_cafe.t077

@wait 600

> $chapter8.chapter8_sakura_cafe.t078
> $chapter8.chapter8_sakura_cafe.t079
> $chapter8.chapter8_sakura_cafe.t080
> $chapter8.chapter8_sakura_cafe.t081

player: $chapter8.chapter8_sakura_cafe.t082

@expr sakura_apron surprised

sakura: $chapter8.chapter8_sakura_cafe.t083

@expr sakura_apron happy

sakura: $chapter8.chapter8_sakura_cafe.t084
sakura: $chapter8.chapter8_sakura_cafe.t085

player: $chapter8.chapter8_sakura_cafe.t086

sakura: $chapter8.chapter8_sakura_cafe.t087

sakura: $chapter8.chapter8_sakura_cafe.t088
sakura: $chapter8.chapter8_sakura_cafe.t089

player: $chapter8.chapter8_sakura_cafe.t090

@expr sakura_apron happy

sakura: $chapter8.chapter8_sakura_cafe.t091
sakura: $chapter8.chapter8_sakura_cafe.t092

> $chapter8.chapter8_sakura_cafe.t093
> $chapter8.chapter8_sakura_cafe.t094
> $chapter8.chapter8_sakura_cafe.t095

@hide sakura_apron fade_out
@wait 500

@jump chapter8_music_room


// ===================================================================
//  音楽室前
// ===================================================================

# chapter8_music_room

@scene corridor_festival_rainy fade
@bgm stop
@bgm piano_distant.mp3 noloop
@wait 700

@show kotoha center normal fade_in

> $chapter8.chapter8_music_room.t001
> $chapter8.chapter8_music_room.t002

> $chapter8.chapter8_music_room.t003
> $chapter8.chapter8_music_room.t004
> $chapter8.chapter8_music_room.t005

player: $chapter8.chapter8_music_room.t006

kotoha: $chapter8.chapter8_music_room.t007
kotoha: $chapter8.chapter8_music_room.t008

player: $chapter8.chapter8_music_room.t009

@wait 600

> $chapter8.chapter8_music_room.t010
> $chapter8.chapter8_music_room.t011

> $chapter8.chapter8_music_room.t012
> $chapter8.chapter8_music_room.t013

kotoha: $chapter8.chapter8_music_room.t014

kotoha: $chapter8.chapter8_music_room.t015
kotoha: $chapter8.chapter8_music_room.t016

player: $chapter8.chapter8_music_room.t017

kotoha: $chapter8.chapter8_music_room.t018
kotoha: $chapter8.chapter8_music_room.t019

player: $chapter8.chapter8_music_room.t020

kotoha: $chapter8.chapter8_music_room.t021
kotoha: $chapter8.chapter8_music_room.t022

> $chapter8.chapter8_music_room.t023
> $chapter8.chapter8_music_room.t024

@wait 800

> $chapter8.chapter8_music_room.t025

> $chapter8.chapter8_music_room.t026
> $chapter8.chapter8_music_room.t027

@expr kotoha thinking

kotoha: $chapter8.chapter8_music_room.t028
kotoha: $chapter8.chapter8_music_room.t029

player: $chapter8.chapter8_music_room.t030

kotoha: $chapter8.chapter8_music_room.t031

@wait 400

kotoha: $chapter8.chapter8_music_room.t032
kotoha: $chapter8.chapter8_music_room.t033

player: $chapter8.chapter8_music_room.t034

kotoha: $chapter8.chapter8_music_room.t035
kotoha: $chapter8.chapter8_music_room.t036
kotoha: $chapter8.chapter8_music_room.t037

player: $chapter8.chapter8_music_room.t038

@expr kotoha normal

kotoha: $chapter8.chapter8_music_room.t039
kotoha: $chapter8.chapter8_music_room.t040

> $chapter8.chapter8_music_room.t041
> $chapter8.chapter8_music_room.t042
> $chapter8.chapter8_music_room.t043
> $chapter8.chapter8_music_room.t044

> $chapter8.chapter8_music_room.t045
> $chapter8.chapter8_music_room.t046

@hide kotoha fade_out
@wait 500

@jump chapter8_mahiru_reason


// ===================================================================
//  まひる — 今日の理由
// ===================================================================

# chapter8_mahiru_reason

@scene corridor_festival_rainy fade
@bgm festival_rain.mp3
@wait 700

@show mahiru center happy fade_in

mahiru: $chapter8.chapter8_mahiru_reason.t001

player: $chapter8.chapter8_mahiru_reason.t002

mahiru: $chapter8.chapter8_mahiru_reason.t003
mahiru: $chapter8.chapter8_mahiru_reason.t004

player: $chapter8.chapter8_mahiru_reason.t005

mahiru: $chapter8.chapter8_mahiru_reason.t006
mahiru: $chapter8.chapter8_mahiru_reason.t007

@wait 600

player: $chapter8.chapter8_mahiru_reason.t008

@expr mahiru thinking

mahiru: $chapter8.chapter8_mahiru_reason.t009
mahiru: $chapter8.chapter8_mahiru_reason.t010

player: $chapter8.chapter8_mahiru_reason.t011

@wait 400

> $chapter8.chapter8_mahiru_reason.t012
> $chapter8.chapter8_mahiru_reason.t013
> $chapter8.chapter8_mahiru_reason.t014

> $chapter8.chapter8_mahiru_reason.t015

player: $chapter8.chapter8_mahiru_reason.t016

@expr mahiru normal

mahiru: $chapter8.chapter8_mahiru_reason.t017

mahiru: $chapter8.chapter8_mahiru_reason.t018

player: $chapter8.chapter8_mahiru_reason.t019

mahiru: $chapter8.chapter8_mahiru_reason.t020
mahiru: $chapter8.chapter8_mahiru_reason.t021
mahiru: $chapter8.chapter8_mahiru_reason.t022

player: $chapter8.chapter8_mahiru_reason.t023

@expr mahiru happy

mahiru: $chapter8.chapter8_mahiru_reason.t024

mahiru: $chapter8.chapter8_mahiru_reason.t025

mahiru: $chapter8.chapter8_mahiru_reason.t026
mahiru: $chapter8.chapter8_mahiru_reason.t027

mahiru: $chapter8.chapter8_mahiru_reason.t028

player: $chapter8.chapter8_mahiru_reason.t029

mahiru: $chapter8.chapter8_mahiru_reason.t030

mahiru: $chapter8.chapter8_mahiru_reason.t031
mahiru: $chapter8.chapter8_mahiru_reason.t032

> $chapter8.chapter8_mahiru_reason.t033
> $chapter8.chapter8_mahiru_reason.t034

@wait 600

player: $chapter8.chapter8_mahiru_reason.t035
player: $chapter8.chapter8_mahiru_reason.t036

@wait 400

> $chapter8.chapter8_mahiru_reason.t037
> $chapter8.chapter8_mahiru_reason.t038

@expr mahiru normal

mahiru: $chapter8.chapter8_mahiru_reason.t039

mahiru: $chapter8.chapter8_mahiru_reason.t040
mahiru: $chapter8.chapter8_mahiru_reason.t041

mahiru: $chapter8.chapter8_mahiru_reason.t042

player: $chapter8.chapter8_mahiru_reason.t043

mahiru: $chapter8.chapter8_mahiru_reason.t044
mahiru: $chapter8.chapter8_mahiru_reason.t045

@wait 600

> $chapter8.chapter8_mahiru_reason.t046
> $chapter8.chapter8_mahiru_reason.t047
> $chapter8.chapter8_mahiru_reason.t048

mahiru: $chapter8.chapter8_mahiru_reason.t049
mahiru: $chapter8.chapter8_mahiru_reason.t050

player: $chapter8.chapter8_mahiru_reason.t051

@expr mahiru happy

mahiru: $chapter8.chapter8_mahiru_reason.t052

@hide mahiru fade_out
@wait 500

@jump chapter8_rain_corridor


// ===================================================================
//  雨の廊下 — 内省
// ===================================================================

# chapter8_rain_corridor

@scene corridor_festival_rainy fade
@bgm tension_rain.mp3
@se rain_window.mp3
@wait 800

> $chapter8.chapter8_rain_corridor.t001

> $chapter8.chapter8_rain_corridor.t002

> $chapter8.chapter8_rain_corridor.t003
> $chapter8.chapter8_rain_corridor.t004

@still rain_festival_day
@wait 1200
@still_hide

> $chapter8.chapter8_rain_corridor.t005

> $chapter8.chapter8_rain_corridor.t006

> $chapter8.chapter8_rain_corridor.t007
> $chapter8.chapter8_rain_corridor.t008

> $chapter8.chapter8_rain_corridor.t009
> $chapter8.chapter8_rain_corridor.t010

> $chapter8.chapter8_rain_corridor.t011
> $chapter8.chapter8_rain_corridor.t012

> $chapter8.chapter8_rain_corridor.t013
> $chapter8.chapter8_rain_corridor.t014

player: $chapter8.chapter8_rain_corridor.t015

@wait 600

> $chapter8.chapter8_rain_corridor.t016
> $chapter8.chapter8_rain_corridor.t017
> $chapter8.chapter8_rain_corridor.t018
> $chapter8.chapter8_rain_corridor.t019

> $chapter8.chapter8_rain_corridor.t020
> $chapter8.chapter8_rain_corridor.t021
> $chapter8.chapter8_rain_corridor.t022
> $chapter8.chapter8_rain_corridor.t023

> $chapter8.chapter8_rain_corridor.t024
> $chapter8.chapter8_rain_corridor.t025
> $chapter8.chapter8_rain_corridor.t026

@bgm mystery_shadow.mp3
@wait 1000

> $chapter8.chapter8_rain_corridor.t027

> $chapter8.chapter8_rain_corridor.t028

> $chapter8.chapter8_rain_corridor.t029
> $chapter8.chapter8_rain_corridor.t030

@wait 800

// ===================================================================
//  回想 — これまでのサイン
// ===================================================================

@wait 1000

> $chapter8.chapter8_rain_corridor.t031
> $chapter8.chapter8_rain_corridor.t032
> $chapter8.chapter8_rain_corridor.t033

@wait 800

@still sakura_blank_moment
@wait 1200

> $chapter8.chapter8_rain_corridor.t034
> $chapter8.chapter8_rain_corridor.t035
> $chapter8.chapter8_rain_corridor.t036
> $chapter8.chapter8_rain_corridor.t037

@still_hide
@wait 400

@still kotoha_window_ch1
@wait 1200

> $chapter8.chapter8_rain_corridor.t038
> $chapter8.chapter8_rain_corridor.t039
> $chapter8.chapter8_rain_corridor.t040
> $chapter8.chapter8_rain_corridor.t041

@still_hide
@wait 400
@still mahiru_notebook_drop
@wait 1200

> $chapter8.chapter8_rain_corridor.t042
> $chapter8.chapter8_rain_corridor.t043

> $chapter8.chapter8_rain_corridor.t044

> $chapter8.chapter8_rain_corridor.t045

@still_hide
@wait 400

@scene corridor_festival_rainy fade
@bgm tension_rain.mp3
@se rain_window.mp3
@wait 800

> $chapter8.chapter8_rain_corridor.t046
> $chapter8.chapter8_rain_corridor.t047
> $chapter8.chapter8_rain_corridor.t048
> $chapter8.chapter8_rain_corridor.t049

> $chapter8.chapter8_rain_corridor.t050

player: $chapter8.chapter8_rain_corridor.t051

@wait 1200

> $chapter8.chapter8_rain_corridor.t052
> $chapter8.chapter8_rain_corridor.t053

@bgm stop
@wait 500

@jump chapter8_sakura_crisis


// ===================================================================
//  さくら — 父が救急搬送
// ===================================================================

# chapter8_sakura_crisis

@scene corridor_festival_rainy fade
@bgm tension_rain.mp3
@se rain_window.mp3
@wait 600

> $chapter8.chapter8_sakura_crisis.t001

@wait 400

> $chapter8.chapter8_sakura_crisis.t002
> $chapter8.chapter8_sakura_crisis.t003

@show sakura center normal fade_in

sakura: $chapter8.chapter8_sakura_crisis.t004

> $chapter8.chapter8_sakura_crisis.t005
> $chapter8.chapter8_sakura_crisis.t006
> $chapter8.chapter8_sakura_crisis.t007

@wait 400

sakura: $chapter8.chapter8_sakura_crisis.t008

@wait 500

sakura: $chapter8.chapter8_sakura_crisis.t009

@wait 300

sakura: $chapter8.chapter8_sakura_crisis.t010

@wait 400

sakura: $chapter8.chapter8_sakura_crisis.t011

@wait 300

> $chapter8.chapter8_sakura_crisis.t012

@wait 700

@expr sakura blank

> $chapter8.chapter8_sakura_crisis.t013

> $chapter8.chapter8_sakura_crisis.t014

> $chapter8.chapter8_sakura_crisis.t015
> $chapter8.chapter8_sakura_crisis.t016
> $chapter8.chapter8_sakura_crisis.t017

@wait 1000

player: $chapter8.chapter8_sakura_crisis.t018

@expr sakura surprised

sakura: $chapter8.chapter8_sakura_crisis.t019

@wait 300

> $chapter8.chapter8_sakura_crisis.t020

> $chapter8.chapter8_sakura_crisis.t021

> $chapter8.chapter8_sakura_crisis.t022

@wait 700

@expr sakura sad

sakura: $chapter8.chapter8_sakura_crisis.t023

sakura: $chapter8.chapter8_sakura_crisis.t024

player: $chapter8.chapter8_sakura_crisis.t025

sakura: $chapter8.chapter8_sakura_crisis.t026
sakura: $chapter8.chapter8_sakura_crisis.t027

@wait 500

> $chapter8.chapter8_sakura_crisis.t028
> $chapter8.chapter8_sakura_crisis.t029

@wait 600

@expr sakura happy

sakura: $chapter8.chapter8_sakura_crisis.t030
sakura: $chapter8.chapter8_sakura_crisis.t031

player: $chapter8.chapter8_sakura_crisis.t032

sakura: $chapter8.chapter8_sakura_crisis.t033
sakura: $chapter8.chapter8_sakura_crisis.t034

@wait 500

> $chapter8.chapter8_sakura_crisis.t035

> $chapter8.chapter8_sakura_crisis.t036
> $chapter8.chapter8_sakura_crisis.t037
> $chapter8.chapter8_sakura_crisis.t038

@wait 600

> $chapter8.chapter8_sakura_crisis.t039
> $chapter8.chapter8_sakura_crisis.t040
> $chapter8.chapter8_sakura_crisis.t041
> $chapter8.chapter8_sakura_crisis.t042
> $chapter8.chapter8_sakura_crisis.t043

@hide sakura slide_out_left
@wait 500

@jump chapter8_kotoha_crisis


// ===================================================================
//  ことは — 伴奏依頼で固まっている
// ===================================================================

# chapter8_kotoha_crisis

@scene corridor_festival_rainy fade
@bgm stop
@bgm piano_distant.mp3 noloop
@wait 700

> $chapter8.chapter8_kotoha_crisis.t001

@wait 400

> $chapter8.chapter8_kotoha_crisis.t002

@show kotoha center normal fade_in

> $chapter8.chapter8_kotoha_crisis.t003
> $chapter8.chapter8_kotoha_crisis.t004

> $chapter8.chapter8_kotoha_crisis.t005

@wait 600

> $chapter8.chapter8_kotoha_crisis.t006
> $chapter8.chapter8_kotoha_crisis.t007
> $chapter8.chapter8_kotoha_crisis.t008
> $chapter8.chapter8_kotoha_crisis.t009

> $chapter8.chapter8_kotoha_crisis.t010

@wait 400

> $chapter8.chapter8_kotoha_crisis.t011
> $chapter8.chapter8_kotoha_crisis.t012
> $chapter8.chapter8_kotoha_crisis.t013

@wait 300

> $chapter8.chapter8_kotoha_crisis.t014
> $chapter8.chapter8_kotoha_crisis.t015
> $chapter8.chapter8_kotoha_crisis.t016

@wait 500

kotoha: $chapter8.chapter8_kotoha_crisis.t017

> $chapter8.chapter8_kotoha_crisis.t018

> $chapter8.chapter8_kotoha_crisis.t019

@wait 600

> $chapter8.chapter8_kotoha_crisis.t020

> $chapter8.chapter8_kotoha_crisis.t021

> $chapter8.chapter8_kotoha_crisis.t022
> $chapter8.chapter8_kotoha_crisis.t023
> $chapter8.chapter8_kotoha_crisis.t024

@expr kotoha thinking

@wait 1000

> $chapter8.chapter8_kotoha_crisis.t025
> $chapter8.chapter8_kotoha_crisis.t026

> $chapter8.chapter8_kotoha_crisis.t027
> $chapter8.chapter8_kotoha_crisis.t028
> $chapter8.chapter8_kotoha_crisis.t029

@wait 600

> $chapter8.chapter8_kotoha_crisis.t030
> $chapter8.chapter8_kotoha_crisis.t031
> $chapter8.chapter8_kotoha_crisis.t032

@wait 400

> $chapter8.chapter8_kotoha_crisis.t033
> $chapter8.chapter8_kotoha_crisis.t034

> $chapter8.chapter8_kotoha_crisis.t035
> $chapter8.chapter8_kotoha_crisis.t036
> $chapter8.chapter8_kotoha_crisis.t037

@wait 800

@expr kotoha sad

> $chapter8.chapter8_kotoha_crisis.t038

> $chapter8.chapter8_kotoha_crisis.t039
> $chapter8.chapter8_kotoha_crisis.t040
> $chapter8.chapter8_kotoha_crisis.t041

@wait 800

> $chapter8.chapter8_kotoha_crisis.t042
> $chapter8.chapter8_kotoha_crisis.t043
> $chapter8.chapter8_kotoha_crisis.t044

> $chapter8.chapter8_kotoha_crisis.t045

@hide kotoha fade_out
@wait 500

@jump chapter8_mahiru_missing


// ===================================================================
//  まひる — 姿が見えない
// ===================================================================

# chapter8_mahiru_missing

@scene corridor_festival_rainy fade
@bgm tension_rain.mp3
@wait 700

> $chapter8.chapter8_mahiru_missing.t001

@wait 400

> $chapter8.chapter8_mahiru_missing.t002

> $chapter8.chapter8_mahiru_missing.t003
> $chapter8.chapter8_mahiru_missing.t004
> $chapter8.chapter8_mahiru_missing.t005

@wait 400

> $chapter8.chapter8_mahiru_missing.t006
> $chapter8.chapter8_mahiru_missing.t007
> $chapter8.chapter8_mahiru_missing.t008

@wait 600

> $chapter8.chapter8_mahiru_missing.t009
> $chapter8.chapter8_mahiru_missing.t010

@wait 400

> $chapter8.chapter8_mahiru_missing.t011

> $chapter8.chapter8_mahiru_missing.t012

@wait 400

> $chapter8.chapter8_mahiru_missing.t013
> $chapter8.chapter8_mahiru_missing.t014

@wait 500

> $chapter8.chapter8_mahiru_missing.t015
> $chapter8.chapter8_mahiru_missing.t016

> $chapter8.chapter8_mahiru_missing.t017
> $chapter8.chapter8_mahiru_missing.t018

@wait 400

> $chapter8.chapter8_mahiru_missing.t019
> $chapter8.chapter8_mahiru_missing.t020
> $chapter8.chapter8_mahiru_missing.t021
> $chapter8.chapter8_mahiru_missing.t022

> $chapter8.chapter8_mahiru_missing.t023
> $chapter8.chapter8_mahiru_missing.t024

> $chapter8.chapter8_mahiru_missing.t025

@wait 600

> $chapter8.chapter8_mahiru_missing.t026
> $chapter8.chapter8_mahiru_missing.t027
> $chapter8.chapter8_mahiru_missing.t028

@bgm stop
@wait 400

> $chapter8.chapter8_mahiru_missing.t029
> $chapter8.chapter8_mahiru_missing.t030

> $chapter8.chapter8_mahiru_missing.t031
> $chapter8.chapter8_mahiru_missing.t032

> $chapter8.chapter8_mahiru_missing.t033

> $chapter8.chapter8_mahiru_missing.t034
> $chapter8.chapter8_mahiru_missing.t035
> $chapter8.chapter8_mahiru_missing.t036

> $chapter8.chapter8_mahiru_missing.t037
> $chapter8.chapter8_mahiru_missing.t038

@wait 1000

> $chapter8.chapter8_mahiru_missing.t039

@wait 800

@jump chapter8_branch


// ===================================================================
//  本分岐
// ===================================================================

# chapter8_branch

@scene corridor_festival_rainy fade
@bgm mystery_shadow.mp3
@se rain_window.mp3
@wait 1000

> $chapter8.chapter8_branch.t001
> $chapter8.chapter8_branch.t002

> $chapter8.chapter8_branch.t003
> $chapter8.chapter8_branch.t004

> $chapter8.chapter8_branch.t005
> $chapter8.chapter8_branch.t006

@wait 600

> $chapter8.chapter8_branch.t007

> $chapter8.chapter8_branch.t008
> $chapter8.chapter8_branch.t009

> $chapter8.chapter8_branch.t010
> $chapter8.chapter8_branch.t011

> $chapter8.chapter8_branch.t012
> $chapter8.chapter8_branch.t013
> $chapter8.chapter8_branch.t014

@wait 800

> $chapter8.chapter8_branch.t015

@wait 1000

> $chapter8.chapter8_branch.t016
> $chapter8.chapter8_branch.t017

> $chapter8.chapter8_branch.t018
> $chapter8.chapter8_branch.t019

> $chapter8.chapter8_branch.t020

@wait 800

@choice
- $choices.chapter8.go_to_sakura -> chapter8_to_sakura
- $choices.chapter8.go_to_kotoha -> chapter8_to_kotoha
- $choices.chapter8.search_mahiru -> chapter8_to_mahiru


# chapter8_to_sakura
@if sakura_favor >= 8 -> sakura_interlude
@jump bad_end_common

# chapter8_to_kotoha
@if kotoha_favor >= 8 -> kotoha_interlude
@jump bad_end_common

# chapter8_to_mahiru
@if mahiru_favor >= 8 -> mahiru_interlude
@jump bad_end_common


// ===================================================================
//  共通バッドエンドへ
// ===================================================================

# bad_end_common

@scene corridor_festival_rainy fade
@bgm mystery_shadow.mp3
@wait 1000

> $chapter8.bad_end_common.t001

> $chapter8.bad_end_common.t002

> $chapter8.bad_end_common.t003

> $chapter8.bad_end_common.t004

> $chapter8.bad_end_common.t005
> $chapter8.bad_end_common.t006
> $chapter8.bad_end_common.t007

@bgm stop
@wait 1000

@jump bad_end_start


// ===================================================================
//  各ルートの入口（Ch.9以降へ）
// ===================================================================

# route_sakura_start
@jump sakura_interlude

# route_kotoha_start
@jump kotoha_interlude

# route_mahiru_start
@jump mahiru_interlude
