// ===================================================================
//  放課後のステラ — Chapter 1「星の見えない夜空」
// ===================================================================


# start

@flag has_met_sakura false
@flag has_met_kotoha false
@flag has_met_mahiru false
@flag chapter1_complete false

@scene school_corridor_nightmare fade
@bgm a_haunting_memory_of_a_dark_night.mp3
@se chime_soft.mp3
@wait 1000

> $chapter1.start.t001
> $chapter1.start.t002
> $chapter1.start.t003

@se footsteps.mp3
@wait 1200

> $chapter1.start.t004
> $chapter1.start.t005

player: $chapter1.start.t006

@se heartbeat.mp3
@wait 800

> $chapter1.start.t007
> $chapter1.start.t008
> $chapter1.start.t009
> $chapter1.start.t010

> $chapter1.start.t011
> $chapter1.start.t012

> $chapter1.start.t013
> $chapter1.start.t014
> $chapter1.start.t015

> $chapter1.start.t016

@bgm stop
@wait 400
@scene protagonist_room_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 1000

> $chapter1.start.t017
> $chapter1.start.t018
> $chapter1.start.t019

player: $chapter1.start.t020

> $chapter1.start.t021
> $chapter1.start.t022
> $chapter1.start.t023
> $chapter1.start.t024

> $chapter1.start.t025
> $chapter1.start.t026
> $chapter1.start.t027

> $chapter1.start.t028

> $chapter1.start.t029
> $chapter1.start.t030
> $chapter1.start.t031

> $chapter1.start.t032
> $chapter1.start.t033
> $chapter1.start.t034

> $chapter1.start.t035
> $chapter1.start.t036

> $chapter1.start.t037
> $chapter1.start.t038
> $chapter1.start.t039

> $chapter1.start.t040

> $chapter1.start.t041
> $chapter1.start.t042

player: $chapter1.start.t043

@bgm stop
@wait 500

@scene commute_road_spring_morning fade
@bgm spring_breeze.mp3
@se city_morning.mp3
@wait 1000

> $chapter1.start.t044
> $chapter1.start.t045
> $chapter1.start.t046
> $chapter1.start.t047

> $chapter1.start.t048
> $chapter1.start.t049
> $chapter1.start.t050

@se car_passing.mp3
@wait 600

> $chapter1.start.t051

> $chapter1.start.t052
> $chapter1.start.t053
> $chapter1.start.t054

@wait 800

> $chapter1.start.t055

> $chapter1.start.t056
> $chapter1.start.t057
> $chapter1.start.t058

> $chapter1.start.t059
> $chapter1.start.t060
> $chapter1.start.t061
> $chapter1.start.t062

@se city_morning.mp3
@wait 500

@jump chapter1_morning_gate


// ===================================================================
//  シーン1: 校門〜教室 — 四月の朝
// ===================================================================

# chapter1_morning_gate

@scene school_gate_spring fade
@bgm spring_breeze.mp3
@se school_bell.mp3
@wait 1000

> $chapter1.chapter1_morning_gate.t001
> $chapter1.chapter1_morning_gate.t002
> $chapter1.chapter1_morning_gate.t003
> $chapter1.chapter1_morning_gate.t004

> $chapter1.chapter1_morning_gate.t005

@scene classroom fade
@se classroom_noise.mp3
@wait 900

> $chapter1.chapter1_morning_gate.t006
> $chapter1.chapter1_morning_gate.t007
> $chapter1.chapter1_morning_gate.t008

> $chapter1.chapter1_morning_gate.t009
> $chapter1.chapter1_morning_gate.t010
> $chapter1.chapter1_morning_gate.t011

@show sakura right happy pop_in

sakura: $chapter1.chapter1_morning_gate.t012

player: $chapter1.chapter1_morning_gate.t013

sakura: $chapter1.chapter1_morning_gate.t014
sakura: $chapter1.chapter1_morning_gate.t015

player: $chapter1.chapter1_morning_gate.t016

sakura: $chapter1.chapter1_morning_gate.t017
sakura: $chapter1.chapter1_morning_gate.t018

player: $chapter1.chapter1_morning_gate.t019

@expr sakura excited

sakura: $chapter1.chapter1_morning_gate.t020
sakura: $chapter1.chapter1_morning_gate.t021

player: $chapter1.chapter1_morning_gate.t022

sakura: $chapter1.chapter1_morning_gate.t023

> $chapter1.chapter1_morning_gate.t024
> $chapter1.chapter1_morning_gate.t025
> $chapter1.chapter1_morning_gate.t026
> $chapter1.chapter1_morning_gate.t027

sakura: $chapter1.chapter1_morning_gate.t028
sakura: $chapter1.chapter1_morning_gate.t029
sakura: $chapter1.chapter1_morning_gate.t030

player: $chapter1.chapter1_morning_gate.t031

sakura: $chapter1.chapter1_morning_gate.t032
sakura: $chapter1.chapter1_morning_gate.t033

> $chapter1.chapter1_morning_gate.t034
> $chapter1.chapter1_morning_gate.t035
> $chapter1.chapter1_morning_gate.t036

@flag has_met_sakura true

@se school_bell.mp3
@wait 1000

> $chapter1.chapter1_morning_gate.t037
> $chapter1.chapter1_morning_gate.t038

sakura: $chapter1.chapter1_morning_gate.t039

@expr sakura happy

> $chapter1.chapter1_morning_gate.t040
> $chapter1.chapter1_morning_gate.t041
> $chapter1.chapter1_morning_gate.t042

> $chapter1.chapter1_morning_gate.t043
> $chapter1.chapter1_morning_gate.t044

@jump chapter1_homeroom


// ===================================================================
//  シーン2: ホームルーム — 転入生
// ===================================================================

# chapter1_homeroom

> $chapter1.chapter1_homeroom.t001
> $chapter1.chapter1_homeroom.t002

> $chapter1.chapter1_homeroom.t003

@se door_open.mp3
@wait 500

> $chapter1.chapter1_homeroom.t004

> $chapter1.chapter1_homeroom.t005
> $chapter1.chapter1_homeroom.t006

> $chapter1.chapter1_homeroom.t007
> $chapter1.chapter1_homeroom.t008
> $chapter1.chapter1_homeroom.t009

@show kotoha center normal fade_in
@move sakura left

> $chapter1.chapter1_homeroom.t010

kotoha: $chapter1.chapter1_homeroom.t011
kotoha: $chapter1.chapter1_homeroom.t012

> $chapter1.chapter1_homeroom.t013
> $chapter1.chapter1_homeroom.t014

> $chapter1.chapter1_homeroom.t015

kotoha: $chapter1.chapter1_homeroom.t016

> $chapter1.chapter1_homeroom.t017

@hide kotoha fade_out
@move sakura right

> $chapter1.chapter1_homeroom.t018
> $chapter1.chapter1_homeroom.t019

@still kotoha_window_ch1
@wait 600

> $chapter1.chapter1_homeroom.t020
> $chapter1.chapter1_homeroom.t021

> $chapter1.chapter1_homeroom.t022
> $chapter1.chapter1_homeroom.t023

@still_hide
@wait 400

> $chapter1.chapter1_homeroom.t024
> $chapter1.chapter1_homeroom.t025
> $chapter1.chapter1_homeroom.t026
> $chapter1.chapter1_homeroom.t027

sakura: $chapter1.chapter1_homeroom.t028
sakura: $chapter1.chapter1_homeroom.t029

player: $chapter1.chapter1_homeroom.t030

sakura: $chapter1.chapter1_homeroom.t031

player: $chapter1.chapter1_homeroom.t032

sakura: $chapter1.chapter1_homeroom.t033
sakura: $chapter1.chapter1_homeroom.t034

player: $chapter1.chapter1_homeroom.t035

sakura: $chapter1.chapter1_homeroom.t036

> $chapter1.chapter1_homeroom.t037
> $chapter1.chapter1_homeroom.t038
> $chapter1.chapter1_homeroom.t039
> $chapter1.chapter1_homeroom.t040
> $chapter1.chapter1_homeroom.t041

@hide sakura fade_out

@jump chapter1_breaktime


// ===================================================================
//  シーン3: 廊下 — 幼なじみ
// ===================================================================

# chapter1_breaktime

@scene corridor fade
@bgm daily_life.mp3
@se footsteps.mp3
@wait 700

> $chapter1.chapter1_breaktime.t001
> $chapter1.chapter1_breaktime.t002
> $chapter1.chapter1_breaktime.t003
> $chapter1.chapter1_breaktime.t004

> $chapter1.chapter1_breaktime.t005
> $chapter1.chapter1_breaktime.t006

> $chapter1.chapter1_breaktime.t007

> $chapter1.chapter1_breaktime.t008

@show mahiru center happy fade_in

> $chapter1.chapter1_breaktime.t009
> $chapter1.chapter1_breaktime.t010

mahiru: $chapter1.chapter1_breaktime.t011

player: $chapter1.chapter1_breaktime.t012

mahiru: $chapter1.chapter1_breaktime.t013
mahiru: $chapter1.chapter1_breaktime.t014

player: $chapter1.chapter1_breaktime.t015
player: $chapter1.chapter1_breaktime.t016

@expr mahiru normal

mahiru: $chapter1.chapter1_breaktime.t017
mahiru: $chapter1.chapter1_breaktime.t018

player: $chapter1.chapter1_breaktime.t019

mahiru: $chapter1.chapter1_breaktime.t020
mahiru: $chapter1.chapter1_breaktime.t021

> $chapter1.chapter1_breaktime.t022
> $chapter1.chapter1_breaktime.t023

player: $chapter1.chapter1_breaktime.t024

mahiru: $chapter1.chapter1_breaktime.t025
mahiru: $chapter1.chapter1_breaktime.t026
mahiru: $chapter1.chapter1_breaktime.t027

> $chapter1.chapter1_breaktime.t028
> $chapter1.chapter1_breaktime.t029
> $chapter1.chapter1_breaktime.t030

mahiru: $chapter1.chapter1_breaktime.t031
mahiru: $chapter1.chapter1_breaktime.t032

player: $chapter1.chapter1_breaktime.t033

@expr mahiru happy

mahiru: $chapter1.chapter1_breaktime.t034

@flag has_met_mahiru true

@hide mahiru slide_out_right
@wait 600

> $chapter1.chapter1_breaktime.t035
> $chapter1.chapter1_breaktime.t036

> $chapter1.chapter1_breaktime.t037
> $chapter1.chapter1_breaktime.t038
> $chapter1.chapter1_breaktime.t039
> $chapter1.chapter1_breaktime.t040

> $chapter1.chapter1_breaktime.t041
> $chapter1.chapter1_breaktime.t042
> $chapter1.chapter1_breaktime.t043
> $chapter1.chapter1_breaktime.t044

> $chapter1.chapter1_breaktime.t045

@jump chapter1_lunch


// ===================================================================
//  シーン4: 昼休み — さくらと
// ===================================================================

# chapter1_lunch

@scene classroom fade
@bgm spring_breeze.mp3
@se classroom_noise.mp3
@wait 800

> $chapter1.chapter1_lunch.t001
> $chapter1.chapter1_lunch.t002
> $chapter1.chapter1_lunch.t003
> $chapter1.chapter1_lunch.t004

@show sakura right happy fade_in

sakura: $chapter1.chapter1_lunch.t005
sakura: $chapter1.chapter1_lunch.t006

player: $chapter1.chapter1_lunch.t007

sakura: $chapter1.chapter1_lunch.t008
sakura: $chapter1.chapter1_lunch.t009

player: $chapter1.chapter1_lunch.t010

sakura: $chapter1.chapter1_lunch.t011

> $chapter1.chapter1_lunch.t012
> $chapter1.chapter1_lunch.t013

sakura: $chapter1.chapter1_lunch.t014
sakura: $chapter1.chapter1_lunch.t015

player: $chapter1.chapter1_lunch.t016

sakura: $chapter1.chapter1_lunch.t017
sakura: $chapter1.chapter1_lunch.t018

player: $chapter1.chapter1_lunch.t019

@expr sakura thinking

sakura: $chapter1.chapter1_lunch.t020
sakura: $chapter1.chapter1_lunch.t021
sakura: $chapter1.chapter1_lunch.t022

> $chapter1.chapter1_lunch.t023
> $chapter1.chapter1_lunch.t024

@expr sakura happy

sakura: $chapter1.chapter1_lunch.t025

> $chapter1.chapter1_lunch.t026

player: $chapter1.chapter1_lunch.t027

sakura: $chapter1.chapter1_lunch.t028

> $chapter1.chapter1_lunch.t029
> $chapter1.chapter1_lunch.t030
> $chapter1.chapter1_lunch.t031

@hide sakura fade_out

@jump chapter1_after_school_intro


// ===================================================================
//  シーン5: 放課後の教室 — 一瞬の空白
// ===================================================================

# chapter1_after_school_intro

@scene classroom_evening fade
@bgm evening_piano.mp3
@se school_bell.mp3
@wait 1200

> $chapter1.chapter1_after_school_intro.t001
> $chapter1.chapter1_after_school_intro.t002
> $chapter1.chapter1_after_school_intro.t003

> $chapter1.chapter1_after_school_intro.t004
> $chapter1.chapter1_after_school_intro.t005
> $chapter1.chapter1_after_school_intro.t006

> $chapter1.chapter1_after_school_intro.t007

@show sakura left happy fade_in

sakura: $chapter1.chapter1_after_school_intro.t008

player: $chapter1.chapter1_after_school_intro.t009

sakura: $chapter1.chapter1_after_school_intro.t010
sakura: $chapter1.chapter1_after_school_intro.t011

player: $chapter1.chapter1_after_school_intro.t012

sakura: $chapter1.chapter1_after_school_intro.t013

player: $chapter1.chapter1_after_school_intro.t014

sakura: $chapter1.chapter1_after_school_intro.t015

> $chapter1.chapter1_after_school_intro.t016
> $chapter1.chapter1_after_school_intro.t017
> $chapter1.chapter1_after_school_intro.t018

@expr sakura no_light_eyes

sakura: $chapter1.chapter1_after_school_intro.t019

> $chapter1.chapter1_after_school_intro.t020
> $chapter1.chapter1_after_school_intro.t021

> $chapter1.chapter1_after_school_intro.t022

> $chapter1.chapter1_after_school_intro.t023
> $chapter1.chapter1_after_school_intro.t024
> $chapter1.chapter1_after_school_intro.t025

> $chapter1.chapter1_after_school_intro.t026
> $chapter1.chapter1_after_school_intro.t027

player: $chapter1.chapter1_after_school_intro.t028

@expr sakura surprised

sakura: $chapter1.chapter1_after_school_intro.t029
sakura: $chapter1.chapter1_after_school_intro.t030

player: $chapter1.chapter1_after_school_intro.t031

@expr sakura happy

sakura: $chapter1.chapter1_after_school_intro.t032
sakura: $chapter1.chapter1_after_school_intro.t033

player: $chapter1.chapter1_after_school_intro.t034

sakura: $chapter1.chapter1_after_school_intro.t035
sakura: $chapter1.chapter1_after_school_intro.t036

player: $chapter1.chapter1_after_school_intro.t037

@hide sakura slide_out_left
@wait 800

> $chapter1.chapter1_after_school_intro.t038
> $chapter1.chapter1_after_school_intro.t039

> $chapter1.chapter1_after_school_intro.t040
> $chapter1.chapter1_after_school_intro.t041
> $chapter1.chapter1_after_school_intro.t042

> $chapter1.chapter1_after_school_intro.t043

> $chapter1.chapter1_after_school_intro.t044
> $chapter1.chapter1_after_school_intro.t045
> $chapter1.chapter1_after_school_intro.t046

@jump chapter1_library_pass


// ===================================================================
//  シーン6: 図書室前 — ことは
// ===================================================================

# chapter1_library_pass

@scene corridor_evening fade
@bgm library_quiet.mp3
@se footsteps.mp3
@wait 800

> $chapter1.chapter1_library_pass.t001
> $chapter1.chapter1_library_pass.t002
> $chapter1.chapter1_library_pass.t003

@se door_open.mp3
@wait 400

> $chapter1.chapter1_library_pass.t004

@scene library_evening fade
@show kotoha center normal fade_in
@wait 500

> $chapter1.chapter1_library_pass.t005
> $chapter1.chapter1_library_pass.t006

> $chapter1.chapter1_library_pass.t007
> $chapter1.chapter1_library_pass.t008
> $chapter1.chapter1_library_pass.t009

> $chapter1.chapter1_library_pass.t010
> $chapter1.chapter1_library_pass.t011

> $chapter1.chapter1_library_pass.t012

> $chapter1.chapter1_library_pass.t013
> $chapter1.chapter1_library_pass.t014

@se piano_single_note.mp3
@wait 600

> $chapter1.chapter1_library_pass.t015
> $chapter1.chapter1_library_pass.t016

@expr kotoha surprised

> $chapter1.chapter1_library_pass.t017
> $chapter1.chapter1_library_pass.t018
> $chapter1.chapter1_library_pass.t019

kotoha: $chapter1.chapter1_library_pass.t020

player: $chapter1.chapter1_library_pass.t021

@expr kotoha normal

kotoha: $chapter1.chapter1_library_pass.t022

@hide kotoha fade_out
@scene corridor_evening fade
@wait 600

> $chapter1.chapter1_library_pass.t023

> $chapter1.chapter1_library_pass.t024
> $chapter1.chapter1_library_pass.t025
> $chapter1.chapter1_library_pass.t026

> $chapter1.chapter1_library_pass.t027
> $chapter1.chapter1_library_pass.t028

> $chapter1.chapter1_library_pass.t029
> $chapter1.chapter1_library_pass.t030

@flag has_met_kotoha true

@jump chapter1_twilight_stairs


// ===================================================================
//  シーン7: 踊り場 — 夕暮れのまひる
// ===================================================================

# chapter1_twilight_stairs

@scene staircase_evening fade
@bgm evening_piano.mp3
@se footsteps.mp3
@wait 700

> $chapter1.chapter1_twilight_stairs.t001
> $chapter1.chapter1_twilight_stairs.t002
> $chapter1.chapter1_twilight_stairs.t003

> $chapter1.chapter1_twilight_stairs.t004

@show mahiru center normal fade_in

mahiru: $chapter1.chapter1_twilight_stairs.t005

player: $chapter1.chapter1_twilight_stairs.t006

mahiru: $chapter1.chapter1_twilight_stairs.t007
mahiru: $chapter1.chapter1_twilight_stairs.t008

player: $chapter1.chapter1_twilight_stairs.t009

mahiru: $chapter1.chapter1_twilight_stairs.t010
mahiru: $chapter1.chapter1_twilight_stairs.t011

> $chapter1.chapter1_twilight_stairs.t012
> $chapter1.chapter1_twilight_stairs.t013

mahiru: $chapter1.chapter1_twilight_stairs.t014

player: $chapter1.chapter1_twilight_stairs.t015

mahiru: $chapter1.chapter1_twilight_stairs.t016
mahiru: $chapter1.chapter1_twilight_stairs.t017

player: $chapter1.chapter1_twilight_stairs.t018

mahiru: $chapter1.chapter1_twilight_stairs.t019

> $chapter1.chapter1_twilight_stairs.t020
> $chapter1.chapter1_twilight_stairs.t021

player: $chapter1.chapter1_twilight_stairs.t022

mahiru: $chapter1.chapter1_twilight_stairs.t023
mahiru: $chapter1.chapter1_twilight_stairs.t024

player: $chapter1.chapter1_twilight_stairs.t025

@expr mahiru happy

mahiru: $chapter1.chapter1_twilight_stairs.t026

> $chapter1.chapter1_twilight_stairs.t027

mahiru: $chapter1.chapter1_twilight_stairs.t028
mahiru: $chapter1.chapter1_twilight_stairs.t029

player: $chapter1.chapter1_twilight_stairs.t030

@hide mahiru slide_out_right
@wait 700

> $chapter1.chapter1_twilight_stairs.t031
> $chapter1.chapter1_twilight_stairs.t032

> $chapter1.chapter1_twilight_stairs.t033
> $chapter1.chapter1_twilight_stairs.t034

@jump chapter1_last_classroom


// ===================================================================
//  シーン8: 夜の教室 — 星の見えない空
// ===================================================================

# chapter1_last_classroom

@scene classroom_night fade
@bgm night_melody.mp3
@wait 1000

> $chapter1.chapter1_last_classroom.t001

> $chapter1.chapter1_last_classroom.t002
> $chapter1.chapter1_last_classroom.t003
> $chapter1.chapter1_last_classroom.t004

> $chapter1.chapter1_last_classroom.t005
> $chapter1.chapter1_last_classroom.t006

> $chapter1.chapter1_last_classroom.t007
> $chapter1.chapter1_last_classroom.t008
> $chapter1.chapter1_last_classroom.t009

> $chapter1.chapter1_last_classroom.t010
> $chapter1.chapter1_last_classroom.t011
> $chapter1.chapter1_last_classroom.t012

> $chapter1.chapter1_last_classroom.t013
> $chapter1.chapter1_last_classroom.t014
> $chapter1.chapter1_last_classroom.t015

> $chapter1.chapter1_last_classroom.t016
> $chapter1.chapter1_last_classroom.t017
> $chapter1.chapter1_last_classroom.t018

player: $chapter1.chapter1_last_classroom.t019

> $chapter1.chapter1_last_classroom.t020

@scene overcast_sky fade
@bgm mystery_shadow.mp3
@wait 1000

> $chapter1.chapter1_last_classroom.t021
> $chapter1.chapter1_last_classroom.t022

> $chapter1.chapter1_last_classroom.t023
> $chapter1.chapter1_last_classroom.t024

> $chapter1.chapter1_last_classroom.t025
> $chapter1.chapter1_last_classroom.t026
> $chapter1.chapter1_last_classroom.t027
> $chapter1.chapter1_last_classroom.t028

> $chapter1.chapter1_last_classroom.t029

> $chapter1.chapter1_last_classroom.t030
> $chapter1.chapter1_last_classroom.t031
> $chapter1.chapter1_last_classroom.t032

> $chapter1.chapter1_last_classroom.t033
> $chapter1.chapter1_last_classroom.t034
> $chapter1.chapter1_last_classroom.t035
> $chapter1.chapter1_last_classroom.t036
> $chapter1.chapter1_last_classroom.t037

player: $chapter1.chapter1_last_classroom.t038

> $chapter1.chapter1_last_classroom.t039

> $chapter1.chapter1_last_classroom.t040
> $chapter1.chapter1_last_classroom.t041

> $chapter1.chapter1_last_classroom.t042
> $chapter1.chapter1_last_classroom.t043
> $chapter1.chapter1_last_classroom.t044

> $chapter1.chapter1_last_classroom.t045

> $chapter1.chapter1_last_classroom.t046
> $chapter1.chapter1_last_classroom.t047
> $chapter1.chapter1_last_classroom.t048
> $chapter1.chapter1_last_classroom.t049

> $chapter1.chapter1_last_classroom.t050
> $chapter1.chapter1_last_classroom.t051

@bgm stop
@wait 300
@bgm opening_piano.mp3
@wait 500

> $chapter1.chapter1_last_classroom.t052

> $chapter1.chapter1_last_classroom.t053
> $chapter1.chapter1_last_classroom.t054

> $chapter1.chapter1_last_classroom.t055
> $chapter1.chapter1_last_classroom.t056

> $chapter1.chapter1_last_classroom.t057
> $chapter1.chapter1_last_classroom.t058

> $chapter1.chapter1_last_classroom.t059
> $chapter1.chapter1_last_classroom.t060

> $chapter1.chapter1_last_classroom.t061
> $chapter1.chapter1_last_classroom.t062
> $chapter1.chapter1_last_classroom.t063

@flag chapter1_complete true

@bgm stop

@end "$chapter1.chapter1_last_classroom.end_title" -> chapter2_start
