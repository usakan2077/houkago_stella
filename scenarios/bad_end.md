// ===================================================================
//  放課後のステラ — 共通バッドエンド
//  「星の見えない朝に、俺はまた一人だった」
//
//  接続元: chapter8.md / bad_end_common -> @jump bad_end_start
// ===================================================================


// ===================================================================
//  文化祭当日 — 朝
// ===================================================================

# bad_end_start

@scene corridor_festival_rainy fade
@bgm school_festival.mp3
@wait 1000

> $bad_end.bad_end_start.t001
> $bad_end.bad_end_start.t002

> $bad_end.bad_end_start.t003

@wait 800

> $bad_end.bad_end_start.t004
> $bad_end.bad_end_start.t005
> $bad_end.bad_end_start.t006
> $bad_end.bad_end_start.t007

@wait 800

> $bad_end.bad_end_start.t008
> $bad_end.bad_end_start.t009
> $bad_end.bad_end_start.t010

@wait 800

@show sakura center happy fade_in
@wait 400

sakura: $bad_end.bad_end_start.t011

@wait 500

> $bad_end.bad_end_start.t012
> $bad_end.bad_end_start.t013
> $bad_end.bad_end_start.t014

@wait 600

> $bad_end.bad_end_start.t015
> $bad_end.bad_end_start.t016

@wait 700

player: $bad_end.bad_end_start.t017

sakura: $bad_end.bad_end_start.t018

@hide sakura fade_out
@wait 1000

> $bad_end.bad_end_start.t019
> $bad_end.bad_end_start.t020

@wait 800

@jump bad_end_festival_kotoha


// ===================================================================
//  文化祭当日 — 音楽室の前
// ===================================================================

# bad_end_festival_kotoha

@scene music_room fade
@wait 800

> $bad_end.bad_end_festival_kotoha.t001
> $bad_end.bad_end_festival_kotoha.t002

@wait 600

kotoha（OFF）: $bad_end.bad_end_festival_kotoha.t003

@wait 1000

> $bad_end.bad_end_festival_kotoha.t004
> $bad_end.bad_end_festival_kotoha.t005
> $bad_end.bad_end_festival_kotoha.t006

@wait 800

> $bad_end.bad_end_festival_kotoha.t007
> $bad_end.bad_end_festival_kotoha.t008

@wait 800

> $bad_end.bad_end_festival_kotoha.t009
> $bad_end.bad_end_festival_kotoha.t010

@wait 1000

@jump bad_end_festival_mahiru


// ===================================================================
//  文化祭当日 — まひるの不在（回想）
// ===================================================================

# bad_end_festival_mahiru

@scene staircase_rainy fade
@wait 800

> $bad_end.bad_end_festival_mahiru.t001

@wait 600

> $bad_end.bad_end_festival_mahiru.t002
> $bad_end.bad_end_festival_mahiru.t003
> $bad_end.bad_end_festival_mahiru.t004

@wait 800

> $bad_end.bad_end_festival_mahiru.t005
> $bad_end.bad_end_festival_mahiru.t006

@wait 600

@scene rooftop_rainy instant
@show mahiru center normal fade_in

> $bad_end.bad_end_festival_mahiru.t007

@wait 800

> $bad_end.bad_end_festival_mahiru.t008
> $bad_end.bad_end_festival_mahiru.t009
> $bad_end.bad_end_festival_mahiru.t010

@wait 600

> $bad_end.bad_end_festival_mahiru.t011
> $bad_end.bad_end_festival_mahiru.t012
> $bad_end.bad_end_festival_mahiru.t013

@wait 600

> $bad_end.bad_end_festival_mahiru.t014

@wait 800

> $bad_end.bad_end_festival_mahiru.t015
> $bad_end.bad_end_festival_mahiru.t016
> $bad_end.bad_end_festival_mahiru.t017

@wait 600

> $bad_end.bad_end_festival_mahiru.t018

@hide mahiru fade_out
@scene staircase_rainy instant
@wait 1000

> $bad_end.bad_end_festival_mahiru.t019
> $bad_end.bad_end_festival_mahiru.t020

@wait 1000

@jump bad_end_after


// ===================================================================
//  文化祭の後
// ===================================================================

# bad_end_after

@scene classroom_night fade
@bgm bad_end_loop.mp3
@wait 1200

> $bad_end.bad_end_after.t001

> $bad_end.bad_end_after.t002
> $bad_end.bad_end_after.t003
> $bad_end.bad_end_after.t004
> $bad_end.bad_end_after.t005

@wait 1000

> $bad_end.bad_end_after.t006

> $bad_end.bad_end_after.t007
> $bad_end.bad_end_after.t008
> $bad_end.bad_end_after.t009

@wait 800

> $bad_end.bad_end_after.t010

@jump bad_end_sakura_fragment


// ===================================================================
//  断片1 — さくら
// ===================================================================

# bad_end_sakura_fragment

@scene corridor fade
@wait 800

> $bad_end.bad_end_sakura_fragment.t001

@show sakura center happy fade_in

sakura: $bad_end.bad_end_sakura_fragment.t002
sakura: $bad_end.bad_end_sakura_fragment.t003

@wait 600

> $bad_end.bad_end_sakura_fragment.t004
> $bad_end.bad_end_sakura_fragment.t005

@wait 500

@expr sakura excited

sakura: $bad_end.bad_end_sakura_fragment.t006

@wait 400

> $bad_end.bad_end_sakura_fragment.t007
> $bad_end.bad_end_sakura_fragment.t008

@wait 600

> $bad_end.bad_end_sakura_fragment.t009
> $bad_end.bad_end_sakura_fragment.t010

@wait 600

@expr sakura normal

> $bad_end.bad_end_sakura_fragment.t011

> $bad_end.bad_end_sakura_fragment.t012
> $bad_end.bad_end_sakura_fragment.t013

@wait 600

sakura: $bad_end.bad_end_sakura_fragment.t014

@wait 500

player: $bad_end.bad_end_sakura_fragment.t015

@wait 400

@expr sakura happy

sakura: $bad_end.bad_end_sakura_fragment.t016

@hide sakura fade_out
@wait 1000

> $bad_end.bad_end_sakura_fragment.t017
> $bad_end.bad_end_sakura_fragment.t018

@wait 800

@jump bad_end_kotoha_fragment


// ===================================================================
//  断片2 — ことは
// ===================================================================

# bad_end_kotoha_fragment

@scene library_evening fade
@wait 800

> $bad_end.bad_end_kotoha_fragment.t001

@show kotoha center normal fade_in

> $bad_end.bad_end_kotoha_fragment.t002
> $bad_end.bad_end_kotoha_fragment.t003
> $bad_end.bad_end_kotoha_fragment.t004

@wait 700

> $bad_end.bad_end_kotoha_fragment.t005
> $bad_end.bad_end_kotoha_fragment.t006
> $bad_end.bad_end_kotoha_fragment.t007

@wait 600

> $bad_end.bad_end_kotoha_fragment.t008
> $bad_end.bad_end_kotoha_fragment.t009

@wait 500

> $bad_end.bad_end_kotoha_fragment.t010
> $bad_end.bad_end_kotoha_fragment.t011

@wait 800

> $bad_end.bad_end_kotoha_fragment.t012
> $bad_end.bad_end_kotoha_fragment.t013
> $bad_end.bad_end_kotoha_fragment.t014

@wait 700

> $bad_end.bad_end_kotoha_fragment.t015

@wait 600

> $bad_end.bad_end_kotoha_fragment.t016
> $bad_end.bad_end_kotoha_fragment.t017

@wait 800

> $bad_end.bad_end_kotoha_fragment.t018
> $bad_end.bad_end_kotoha_fragment.t019

@hide kotoha fade_out
@wait 1000

@jump bad_end_mahiru_fragment


// ===================================================================
//  断片3 — まひる
// ===================================================================

# bad_end_mahiru_fragment

@scene rooftop fade
@wait 800

> $bad_end.bad_end_mahiru_fragment.t001

@wait 600

> $bad_end.bad_end_mahiru_fragment.t002
> $bad_end.bad_end_mahiru_fragment.t003
> $bad_end.bad_end_mahiru_fragment.t004

@wait 700

> $bad_end.bad_end_mahiru_fragment.t005

> $bad_end.bad_end_mahiru_fragment.t006

> $bad_end.bad_end_mahiru_fragment.t007
> $bad_end.bad_end_mahiru_fragment.t008

> $bad_end.bad_end_mahiru_fragment.t009

@wait 800

> $bad_end.bad_end_mahiru_fragment.t010
> $bad_end.bad_end_mahiru_fragment.t011
> $bad_end.bad_end_mahiru_fragment.t012

@wait 800

> $bad_end.bad_end_mahiru_fragment.t013
> $bad_end.bad_end_mahiru_fragment.t014

@wait 600

> $bad_end.bad_end_mahiru_fragment.t015
> $bad_end.bad_end_mahiru_fragment.t016

@wait 700

> $bad_end.bad_end_mahiru_fragment.t017
> $bad_end.bad_end_mahiru_fragment.t018

@wait 1000

> $bad_end.bad_end_mahiru_fragment.t019
> $bad_end.bad_end_mahiru_fragment.t020

@wait 600

> $bad_end.bad_end_mahiru_fragment.t021
> $bad_end.bad_end_mahiru_fragment.t022
> $bad_end.bad_end_mahiru_fragment.t023

@wait 600

> $bad_end.bad_end_mahiru_fragment.t024

@wait 1000

@jump bad_end_classroom


// ===================================================================
//  空の教室
// ===================================================================

# bad_end_classroom

@scene classroom_night fade
@bgm bad_end_loop.mp3
@wait 1200

> $bad_end.bad_end_classroom.t001
> $bad_end.bad_end_classroom.t002

> $bad_end.bad_end_classroom.t003
> $bad_end.bad_end_classroom.t004

@wait 1000

@still bad_end_empty_classroom
@wait 1500

> $bad_end.bad_end_classroom.t005
> $bad_end.bad_end_classroom.t006
> $bad_end.bad_end_classroom.t007

> $bad_end.bad_end_classroom.t008

@wait 1200
@still_hide

@jump bad_end_window


// ===================================================================
//  窓、そして夜空
// ===================================================================

# bad_end_window

@scene overcast_night fade
@wait 1000

@still night_sky_no_stars
@wait 1500

> $bad_end.bad_end_window.t001

@se heartbeat.mp3
@wait 1200

> $bad_end.bad_end_window.t002

> $bad_end.bad_end_window.t003

@wait 1500

> **$bad_end.bad_end_window.t004**

@wait 1000

> **$bad_end.bad_end_window.t005**

@wait 800

> **$bad_end.bad_end_window.t006**

@wait 1200
@still_hide

@jump bad_end_monologue


// ===================================================================
//  核心の独白
// ===================================================================

# bad_end_monologue

@scene classroom_night fade
@bgm bad_end_loop.mp3
@wait 1000

> $bad_end.bad_end_monologue.t001
> $bad_end.bad_end_monologue.t002

> $bad_end.bad_end_monologue.t003
> $bad_end.bad_end_monologue.t004
> $bad_end.bad_end_monologue.t005

> $bad_end.bad_end_monologue.t006

@wait 1000

> $bad_end.bad_end_monologue.t007
> $bad_end.bad_end_monologue.t008

> $bad_end.bad_end_monologue.t009

@wait 1500

@se heartbeat.mp3
@wait 800

player: $bad_end.bad_end_monologue.t010

@wait 1800

> $bad_end.bad_end_monologue.t011

@wait 800

> $bad_end.bad_end_monologue.t012

> $bad_end.bad_end_monologue.t013
> $bad_end.bad_end_monologue.t014

> $bad_end.bad_end_monologue.t015
> $bad_end.bad_end_monologue.t016
> $bad_end.bad_end_monologue.t017

@wait 1000

> $bad_end.bad_end_monologue.t018
> $bad_end.bad_end_monologue.t019
> $bad_end.bad_end_monologue.t020

@wait 800

> $bad_end.bad_end_monologue.t021

@wait 1500

@jump bad_end_ending


// ===================================================================
//  エンディング
// ===================================================================

# bad_end_ending

@scene overcast_night fade
@wait 1000

> $bad_end.bad_end_ending.t001

> $bad_end.bad_end_ending.t002

@wait 1200

> $bad_end.bad_end_ending.t003
> $bad_end.bad_end_ending.t004

> $bad_end.bad_end_ending.t005

@wait 1000

> $bad_end.bad_end_ending.t006
> $bad_end.bad_end_ending.t007

@wait 800

> $bad_end.bad_end_ending.t008
> $bad_end.bad_end_ending.t009

@wait 1500

> **$bad_end.bad_end_ending.t010**

@wait 2000

@bgm stop
@wait 800

@credits bad_end_loop.mp3
@end "$bad_end.bad_end_ending.end_title"
