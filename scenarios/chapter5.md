// ===================================================================
//  放課後のステラ — Chapter 5「水面の午後」
// ===================================================================

# chapter5_start

@scene classroom fade
@bgm daily_life.mp3
@se evening_wind.mp3
@wait 800

> $chapter5.chapter5_start.t001
> $chapter5.chapter5_start.t002
> $chapter5.chapter5_start.t003

@wait 500

> $chapter5.chapter5_start.t004
> $chapter5.chapter5_start.t005
> $chapter5.chapter5_start.t006

@wait 600

> $chapter5.chapter5_start.t007
> $chapter5.chapter5_start.t008
> $chapter5.chapter5_start.t009

@wait 700

> $chapter5.chapter5_start.t010

@wait 400

> $chapter5.chapter5_start.t011

@wait 800

@jump chapter5_morning_class


# chapter5_morning_class

@scene classroom fade
@bgm daily_life.mp3
@se classroom_noise.mp3
@wait 500

@show sakura right excited fade_in
@wait 300

sakura: $chapter5.chapter5_morning_class.t001

player: $chapter5.chapter5_morning_class.t002

sakura: $chapter5.chapter5_morning_class.t003
sakura: $chapter5.chapter5_morning_class.t004

@expr sakura happy
@wait 300

sakura: $chapter5.chapter5_morning_class.t005
sakura: $chapter5.chapter5_morning_class.t006

player: $chapter5.chapter5_morning_class.t007

sakura: $chapter5.chapter5_morning_class.t008
sakura: $chapter5.chapter5_morning_class.t009

@wait 400

> $chapter5.chapter5_morning_class.t010
> $chapter5.chapter5_morning_class.t011
> $chapter5.chapter5_morning_class.t012

@wait 500

@show kotoha left normal fade_in
@wait 300

> $chapter5.chapter5_morning_class.t013
> $chapter5.chapter5_morning_class.t014

sakura: $chapter5.chapter5_morning_class.t015

kotoha: $chapter5.chapter5_morning_class.t016

@expr kotoha thinking
@wait 500

kotoha: $chapter5.chapter5_morning_class.t017
kotoha: $chapter5.chapter5_morning_class.t018

sakura: $chapter5.chapter5_morning_class.t019

kotoha: $chapter5.chapter5_morning_class.t020
kotoha: $chapter5.chapter5_morning_class.t021

@expr sakura surprised
@wait 300

sakura: $chapter5.chapter5_morning_class.t022

player: $chapter5.chapter5_morning_class.t023

sakura: $chapter5.chapter5_morning_class.t024

player: $chapter5.chapter5_morning_class.t025

@expr sakura happy
@wait 300

sakura: $chapter5.chapter5_morning_class.t026

@wait 500

> $chapter5.chapter5_morning_class.t027
> $chapter5.chapter5_morning_class.t028
> $chapter5.chapter5_morning_class.t029

@wait 600

> $chapter5.chapter5_morning_class.t030
> $chapter5.chapter5_morning_class.t031
> $chapter5.chapter5_morning_class.t032

@wait 400

@hide sakura fade_out
@hide kotoha fade_out
@wait 400

@se school_bell.mp3
@wait 600

> $chapter5.chapter5_morning_class.t033
> $chapter5.chapter5_morning_class.t034

@wait 800

@jump chapter5_prep


# chapter5_prep

@scene corridor fade
@bgm daily_life.mp3
@se footsteps.mp3
@wait 600

> $chapter5.chapter5_prep.t001
> $chapter5.chapter5_prep.t002
> $chapter5.chapter5_prep.t003
> $chapter5.chapter5_prep.t004

@wait 700

> $chapter5.chapter5_prep.t005
> $chapter5.chapter5_prep.t006
> $chapter5.chapter5_prep.t007
> $chapter5.chapter5_prep.t008
> $chapter5.chapter5_prep.t009

@wait 600

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 800

> $chapter5.chapter5_prep.t010
> $chapter5.chapter5_prep.t011
> $chapter5.chapter5_prep.t012

@wait 500

> $chapter5.chapter5_prep.t013
> $chapter5.chapter5_prep.t014
> $chapter5.chapter5_prep.t015

@wait 600

@show sakura_swimsuit left excited fade_in
@wait 300

sakura: $chapter5.chapter5_prep.t016

> $chapter5.chapter5_prep.t017
> $chapter5.chapter5_prep.t018
> $chapter5.chapter5_prep.t019

@wait 400

sakura: $chapter5.chapter5_prep.t020
sakura: $chapter5.chapter5_prep.t021

player: $chapter5.chapter5_prep.t022

sakura: $chapter5.chapter5_prep.t023

@expr sakura_swimsuit happy
@wait 300

> $chapter5.chapter5_prep.t024
> $chapter5.chapter5_prep.t025
> $chapter5.chapter5_prep.t026
> $chapter5.chapter5_prep.t027

@wait 500

@show kotoha_swimsuit right normal fade_in
@wait 300

> $chapter5.chapter5_prep.t028
> $chapter5.chapter5_prep.t029
> $chapter5.chapter5_prep.t030

@wait 400

kotoha: $chapter5.chapter5_prep.t031

> $chapter5.chapter5_prep.t032
> $chapter5.chapter5_prep.t033

player: $chapter5.chapter5_prep.t034

kotoha: $chapter5.chapter5_prep.t035
kotoha: $chapter5.chapter5_prep.t036

@wait 400

> $chapter5.chapter5_prep.t037
> $chapter5.chapter5_prep.t038

@wait 500

@hide kotoha_swimsuit fade_out
@hide sakura_swimsuit fade_out
@wait 300

> $chapter5.chapter5_prep.t039
> $chapter5.chapter5_prep.t040
> $chapter5.chapter5_prep.t041
> $chapter5.chapter5_prep.t042

@wait 600

> $chapter5.chapter5_prep.t043
> $chapter5.chapter5_prep.t044

@wait 500

@jump chapter5_lesson


# chapter5_lesson

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se gym_whistle.mp3
@wait 500

> $chapter5.chapter5_lesson.t001

@show sakura_swimsuit center excited fade_in
@wait 300

sakura: $chapter5.chapter5_lesson.t002

> $chapter5.chapter5_lesson.t003

@expr sakura_swimsuit happy
@wait 400

> $chapter5.chapter5_lesson.t004
> $chapter5.chapter5_lesson.t005

@wait 300

> $chapter5.chapter5_lesson.t006
> $chapter5.chapter5_lesson.t007
> $chapter5.chapter5_lesson.t008
> $chapter5.chapter5_lesson.t009

@wait 500

> $chapter5.chapter5_lesson.t010
> $chapter5.chapter5_lesson.t011
> $chapter5.chapter5_lesson.t012
> $chapter5.chapter5_lesson.t013

@hide sakura_swimsuit fade_out
@wait 400

@show kotoha_swimsuit right normal fade_in
@wait 300

> $chapter5.chapter5_lesson.t014

> $chapter5.chapter5_lesson.t015

@wait 500

> $chapter5.chapter5_lesson.t016
> $chapter5.chapter5_lesson.t017
> $chapter5.chapter5_lesson.t018

@wait 400

> $chapter5.chapter5_lesson.t019
> $chapter5.chapter5_lesson.t020
> $chapter5.chapter5_lesson.t021

@wait 600

> $chapter5.chapter5_lesson.t022

@hide kotoha_swimsuit fade_out
@wait 300

@jump chapter5_sakura_kotoha


# chapter5_sakura_kotoha

@hide_all fade_out
@wait 300

@still pool_sakura_kotoha
@wait 800

> $chapter5.chapter5_sakura_kotoha.t001
> $chapter5.chapter5_sakura_kotoha.t002
> $chapter5.chapter5_sakura_kotoha.t003

@wait 600

> $chapter5.chapter5_sakura_kotoha.t004
> $chapter5.chapter5_sakura_kotoha.t005
> $chapter5.chapter5_sakura_kotoha.t006

@wait 700

> $chapter5.chapter5_sakura_kotoha.t007
> $chapter5.chapter5_sakura_kotoha.t008
> $chapter5.chapter5_sakura_kotoha.t009

@wait 800

> $chapter5.chapter5_sakura_kotoha.t010
> $chapter5.chapter5_sakura_kotoha.t011
> $chapter5.chapter5_sakura_kotoha.t012

@wait 600

@jump chapter5_kotoha_water


# chapter5_kotoha_water

@still_hide
@wait 300

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 500

@show kotoha_swimsuit right normal fade_in
@wait 400

> $chapter5.chapter5_kotoha_water.t001
> $chapter5.chapter5_kotoha_water.t002

@wait 400

> $chapter5.chapter5_kotoha_water.t003

player: $chapter5.chapter5_kotoha_water.t004

kotoha: $chapter5.chapter5_kotoha_water.t005

@wait 300

kotoha: $chapter5.chapter5_kotoha_water.t006

player: $chapter5.chapter5_kotoha_water.t007

@expr kotoha_swimsuit thinking
@wait 500

kotoha: $chapter5.chapter5_kotoha_water.t008

kotoha: $chapter5.chapter5_kotoha_water.t009
kotoha: $chapter5.chapter5_kotoha_water.t010

@wait 400

player: $chapter5.chapter5_kotoha_water.t011

kotoha: $chapter5.chapter5_kotoha_water.t012

player: $chapter5.chapter5_kotoha_water.t013

@expr kotoha_swimsuit normal
@wait 500

kotoha: $chapter5.chapter5_kotoha_water.t014
kotoha: $chapter5.chapter5_kotoha_water.t015

@wait 300

kotoha: $chapter5.chapter5_kotoha_water.t016

player: $chapter5.chapter5_kotoha_water.t017

@expr kotoha_swimsuit thinking
@wait 600

kotoha: $chapter5.chapter5_kotoha_water.t018
kotoha: $chapter5.chapter5_kotoha_water.t019
kotoha: $chapter5.chapter5_kotoha_water.t020

@wait 400

kotoha: $chapter5.chapter5_kotoha_water.t021
kotoha: $chapter5.chapter5_kotoha_water.t022
kotoha: $chapter5.chapter5_kotoha_water.t023

@wait 600

> $chapter5.chapter5_kotoha_water.t024
> $chapter5.chapter5_kotoha_water.t025
> $chapter5.chapter5_kotoha_water.t026

@wait 500

player: $chapter5.chapter5_kotoha_water.t027

@expr kotoha_swimsuit surprised
@wait 400

kotoha: $chapter5.chapter5_kotoha_water.t028

@expr kotoha_swimsuit normal
@wait 500

kotoha: $chapter5.chapter5_kotoha_water.t029
kotoha: $chapter5.chapter5_kotoha_water.t030

@wait 600

> $chapter5.chapter5_kotoha_water.t031
> $chapter5.chapter5_kotoha_water.t032
> $chapter5.chapter5_kotoha_water.t033

@wait 400

player: $chapter5.chapter5_kotoha_water.t034

@expr kotoha_swimsuit surprised
@wait 400

kotoha: $chapter5.chapter5_kotoha_water.t035

@wait 500

kotoha: $chapter5.chapter5_kotoha_water.t036
kotoha: $chapter5.chapter5_kotoha_water.t037

@wait 600

> $chapter5.chapter5_kotoha_water.t038
> $chapter5.chapter5_kotoha_water.t039

@wait 500

@hide kotoha_swimsuit fade_out
@wait 300

@se gym_whistle.mp3
@wait 400

> $chapter5.chapter5_kotoha_water.t040
> $chapter5.chapter5_kotoha_water.t041

@wait 500

@jump chapter5_sakura_scene


# chapter5_sakura_scene

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 500

@show sakura_swimsuit left excited fade_in
@wait 300

> $chapter5.chapter5_sakura_scene.t001
> $chapter5.chapter5_sakura_scene.t002
> $chapter5.chapter5_sakura_scene.t003

@wait 600

@expr sakura_swimsuit happy

sakura: $chapter5.chapter5_sakura_scene.t004
sakura: $chapter5.chapter5_sakura_scene.t005

> $chapter5.chapter5_sakura_scene.t006
> $chapter5.chapter5_sakura_scene.t007
> $chapter5.chapter5_sakura_scene.t008

@wait 400

player: $chapter5.chapter5_sakura_scene.t009

sakura: $chapter5.chapter5_sakura_scene.t010
sakura: $chapter5.chapter5_sakura_scene.t011

player: $chapter5.chapter5_sakura_scene.t012

sakura: $chapter5.chapter5_sakura_scene.t013

player: $chapter5.chapter5_sakura_scene.t014

@expr sakura_swimsuit excited
@wait 400

sakura: $chapter5.chapter5_sakura_scene.t015

@wait 500

> $chapter5.chapter5_sakura_scene.t016
> $chapter5.chapter5_sakura_scene.t017
> $chapter5.chapter5_sakura_scene.t018

@wait 600

@hide sakura_swimsuit fade_out
@wait 300

> $chapter5.chapter5_sakura_scene.t019
> $chapter5.chapter5_sakura_scene.t020
> $chapter5.chapter5_sakura_scene.t021

@wait 600

@jump chapter5_sakura_kotoha_end


# chapter5_sakura_kotoha_end

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 500

> $chapter5.chapter5_sakura_kotoha_end.t001

@wait 300

> $chapter5.chapter5_sakura_kotoha_end.t002

@wait 500

> $chapter5.chapter5_sakura_kotoha_end.t003
> $chapter5.chapter5_sakura_kotoha_end.t004
> $chapter5.chapter5_sakura_kotoha_end.t005

@wait 600

> $chapter5.chapter5_sakura_kotoha_end.t006
> $chapter5.chapter5_sakura_kotoha_end.t007

@wait 800

@choice
- $choices.chapter5.are_you_okay [sakura_favor+3] -> chapter5_sakura_talk
- $choices.chapter5.silence -> chapter5_sakura_skip


# chapter5_sakura_talk

@show sakura_swimsuit left normal fade_in
@wait 300

player: $chapter5.chapter5_sakura_talk.t001

@wait 300

> $chapter5.chapter5_sakura_talk.t002

@wait 1200

> $chapter5.chapter5_sakura_talk.t003
> $chapter5.chapter5_sakura_talk.t004

@wait 800

> $chapter5.chapter5_sakura_talk.t005

@wait 600

sakura: $chapter5.chapter5_sakura_talk.t006

> $chapter5.chapter5_sakura_talk.t007
> $chapter5.chapter5_sakura_talk.t008

@wait 800

> $chapter5.chapter5_sakura_talk.t009
> $chapter5.chapter5_sakura_talk.t010

@wait 500

sakura: $chapter5.chapter5_sakura_talk.t011

@wait 400

player: $chapter5.chapter5_sakura_talk.t012

@wait 300

> $chapter5.chapter5_sakura_talk.t013
> $chapter5.chapter5_sakura_talk.t014

@wait 500

sakura: $chapter5.chapter5_sakura_talk.t015

@wait 800

> $chapter5.chapter5_sakura_talk.t016
> $chapter5.chapter5_sakura_talk.t017
> $chapter5.chapter5_sakura_talk.t018

@wait 600

@expr sakura_swimsuit blank

> $chapter5.chapter5_sakura_talk.t019
> $chapter5.chapter5_sakura_talk.t020
> $chapter5.chapter5_sakura_talk.t021
> $chapter5.chapter5_sakura_talk.t022

@wait 800

> $chapter5.chapter5_sakura_talk.t023
> $chapter5.chapter5_sakura_talk.t024

@wait 600

@expr sakura_swimsuit surprised

sakura: $chapter5.chapter5_sakura_talk.t025

> $chapter5.chapter5_sakura_talk.t026
> $chapter5.chapter5_sakura_talk.t027

@wait 500

@expr sakura_swimsuit happy

sakura: $chapter5.chapter5_sakura_talk.t028
sakura: $chapter5.chapter5_sakura_talk.t029

player: $chapter5.chapter5_sakura_talk.t030

@wait 500

> $chapter5.chapter5_sakura_talk.t031
> $chapter5.chapter5_sakura_talk.t032
> $chapter5.chapter5_sakura_talk.t033
> $chapter5.chapter5_sakura_talk.t034

@wait 600

sakura: $chapter5.chapter5_sakura_talk.t035

player: $chapter5.chapter5_sakura_talk.t036

sakura: $chapter5.chapter5_sakura_talk.t037

@expr sakura_swimsuit thinking
@wait 500

sakura: $chapter5.chapter5_sakura_talk.t038

player: $chapter5.chapter5_sakura_talk.t039

sakura: $chapter5.chapter5_sakura_talk.t040
sakura: $chapter5.chapter5_sakura_talk.t041

@wait 500

> $chapter5.chapter5_sakura_talk.t042
> $chapter5.chapter5_sakura_talk.t043

@wait 400

player: $chapter5.chapter5_sakura_talk.t044

sakura: $chapter5.chapter5_sakura_talk.t045

player: $chapter5.chapter5_sakura_talk.t046

@expr sakura_swimsuit normal
@wait 600

sakura: $chapter5.chapter5_sakura_talk.t047

@wait 500

> $chapter5.chapter5_sakura_talk.t048
> $chapter5.chapter5_sakura_talk.t049

@wait 600

player: $chapter5.chapter5_sakura_talk.t050

sakura: $chapter5.chapter5_sakura_talk.t051

player: $chapter5.chapter5_sakura_talk.t052

@expr sakura_swimsuit happy
@wait 400

sakura: $chapter5.chapter5_sakura_talk.t053
sakura: $chapter5.chapter5_sakura_talk.t054

@wait 500

sakura: $chapter5.chapter5_sakura_talk.t055

> $chapter5.chapter5_sakura_talk.t056
> $chapter5.chapter5_sakura_talk.t057

@wait 600

@hide sakura_swimsuit fade_out
@wait 400

@jump chapter5_kotoha_scene


# chapter5_sakura_skip

> $chapter5.chapter5_sakura_skip.t001

@wait 300

> $chapter5.chapter5_sakura_skip.t002

@wait 500

> $chapter5.chapter5_sakura_skip.t003
> $chapter5.chapter5_sakura_skip.t004

@wait 400

@jump chapter5_kotoha_scene


# chapter5_kotoha_scene

@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
@wait 500

@show kotoha_swimsuit right normal fade_in
@wait 400

> $chapter5.chapter5_kotoha_scene.t001

> $chapter5.chapter5_kotoha_scene.t002

@wait 500

player: $chapter5.chapter5_kotoha_scene.t003

@wait 300

kotoha: $chapter5.chapter5_kotoha_scene.t004

@wait 400

player: $chapter5.chapter5_kotoha_scene.t005

@wait 300

kotoha: $chapter5.chapter5_kotoha_scene.t006

@wait 300

kotoha: $chapter5.chapter5_kotoha_scene.t007

@wait 500

> $chapter5.chapter5_kotoha_scene.t008

@wait 400

kotoha: $chapter5.chapter5_kotoha_scene.t009
kotoha: $chapter5.chapter5_kotoha_scene.t010

@wait 500

kotoha: $chapter5.chapter5_kotoha_scene.t011
kotoha: $chapter5.chapter5_kotoha_scene.t012

player: $chapter5.chapter5_kotoha_scene.t013

kotoha: $chapter5.chapter5_kotoha_scene.t014
kotoha: $chapter5.chapter5_kotoha_scene.t015

@wait 600

> $chapter5.chapter5_kotoha_scene.t016
> $chapter5.chapter5_kotoha_scene.t017
> $chapter5.chapter5_kotoha_scene.t018

@wait 500

player: $chapter5.chapter5_kotoha_scene.t019

kotoha: $chapter5.chapter5_kotoha_scene.t020
kotoha: $chapter5.chapter5_kotoha_scene.t021

@expr kotoha_swimsuit normal
@wait 400

kotoha: $chapter5.chapter5_kotoha_scene.t022

@wait 600

> $chapter5.chapter5_kotoha_scene.t023
> $chapter5.chapter5_kotoha_scene.t024

@wait 500

@hide kotoha_swimsuit fade_out
@wait 300

@still_hide
@wait 200

@jump chapter5_mahiru_window


# chapter5_mahiru_window

@scene corridor fade
@bgm daily_life.mp3
@wait 500

> $chapter5.chapter5_mahiru_window.t001
> $chapter5.chapter5_mahiru_window.t002

@wait 500

@still pool_mahiru_window
@wait 600

> $chapter5.chapter5_mahiru_window.t003

@wait 400

> $chapter5.chapter5_mahiru_window.t004
> $chapter5.chapter5_mahiru_window.t005
> $chapter5.chapter5_mahiru_window.t006

@wait 700

> $chapter5.chapter5_mahiru_window.t007

@wait 500

> $chapter5.chapter5_mahiru_window.t008
> $chapter5.chapter5_mahiru_window.t009

@wait 400

> $chapter5.chapter5_mahiru_window.t010

@wait 600

> $chapter5.chapter5_mahiru_window.t011
> $chapter5.chapter5_mahiru_window.t012
> $chapter5.chapter5_mahiru_window.t013

@wait 500

> $chapter5.chapter5_mahiru_window.t014
> $chapter5.chapter5_mahiru_window.t015

@wait 700

> $chapter5.chapter5_mahiru_window.t016
> $chapter5.chapter5_mahiru_window.t017

@wait 600

> $chapter5.chapter5_mahiru_window.t018
> $chapter5.chapter5_mahiru_window.t019
> $chapter5.chapter5_mahiru_window.t020

@wait 600

> $chapter5.chapter5_mahiru_window.t021
> $chapter5.chapter5_mahiru_window.t022

@wait 500

> $chapter5.chapter5_mahiru_window.t023
> $chapter5.chapter5_mahiru_window.t024

@wait 600

> $chapter5.chapter5_mahiru_window.t025
> $chapter5.chapter5_mahiru_window.t026
> $chapter5.chapter5_mahiru_window.t027

@wait 500

> $chapter5.chapter5_mahiru_window.t028
> $chapter5.chapter5_mahiru_window.t029

@wait 800

@still_hide
@wait 300

@jump chapter5_after_school


# chapter5_after_school

@scene classroom fade
@bgm daily_life.mp3
@se evening_wind.mp3
@wait 600

> $chapter5.chapter5_after_school.t001
> $chapter5.chapter5_after_school.t002
> $chapter5.chapter5_after_school.t003

@wait 500

@show sakura right happy fade_in
@wait 300

> $chapter5.chapter5_after_school.t004
> $chapter5.chapter5_after_school.t005

sakura: $chapter5.chapter5_after_school.t006

player: $chapter5.chapter5_after_school.t007

sakura: $chapter5.chapter5_after_school.t008

@wait 300

@show kotoha left normal fade_in
@wait 300

> $chapter5.chapter5_after_school.t009

kotoha: $chapter5.chapter5_after_school.t010

sakura: $chapter5.chapter5_after_school.t011

@expr kotoha normal
@wait 300

> $chapter5.chapter5_after_school.t012
> $chapter5.chapter5_after_school.t013
> $chapter5.chapter5_after_school.t014

@wait 500

sakura: $chapter5.chapter5_after_school.t015
sakura: $chapter5.chapter5_after_school.t016

player: $chapter5.chapter5_after_school.t017

sakura: $chapter5.chapter5_after_school.t018

@expr sakura excited
@wait 300

kotoha: $chapter5.chapter5_after_school.t019

sakura: $chapter5.chapter5_after_school.t020

kotoha: $chapter5.chapter5_after_school.t021

sakura: $chapter5.chapter5_after_school.t022

kotoha: $chapter5.chapter5_after_school.t023

@expr sakura surprised
@wait 400

sakura: $chapter5.chapter5_after_school.t024

kotoha: $chapter5.chapter5_after_school.t025

sakura: $chapter5.chapter5_after_school.t026

kotoha: $chapter5.chapter5_after_school.t027

sakura: $chapter5.chapter5_after_school.t028

@expr kotoha surprised
@wait 400

kotoha: $chapter5.chapter5_after_school.t029

sakura: $chapter5.chapter5_after_school.t030

player: $chapter5.chapter5_after_school.t031

sakura: $chapter5.chapter5_after_school.t032

player: $chapter5.chapter5_after_school.t033

@wait 400

> $chapter5.chapter5_after_school.t034
> $chapter5.chapter5_after_school.t035
> $chapter5.chapter5_after_school.t036

@wait 500

sakura: $chapter5.chapter5_after_school.t037

@expr kotoha shy
@wait 300

kotoha: $chapter5.chapter5_after_school.t038

sakura: $chapter5.chapter5_after_school.t039

player: $chapter5.chapter5_after_school.t040

sakura: $chapter5.chapter5_after_school.t041
sakura: $chapter5.chapter5_after_school.t042

@wait 500

> $chapter5.chapter5_after_school.t043
> $chapter5.chapter5_after_school.t044

@wait 400

kotoha: $chapter5.chapter5_after_school.t045

sakura: $chapter5.chapter5_after_school.t046

kotoha: $chapter5.chapter5_after_school.t047

@expr sakura happy
@wait 400

sakura: $chapter5.chapter5_after_school.t048

@wait 600

> $chapter5.chapter5_after_school.t049
> $chapter5.chapter5_after_school.t050
> $chapter5.chapter5_after_school.t051
> $chapter5.chapter5_after_school.t052

@wait 500

> $chapter5.chapter5_after_school.t053

@wait 600

sakura: $chapter5.chapter5_after_school.t054

kotoha: $chapter5.chapter5_after_school.t055

player: $chapter5.chapter5_after_school.t056

@hide sakura fade_out
@hide kotoha fade_out
@wait 500

> $chapter5.chapter5_after_school.t057
> $chapter5.chapter5_after_school.t058

@wait 600

@jump chapter5_end


# chapter5_end

@scene commute_road_summer_evening fade
@bgm evening_piano.mp3
@wait 600

> $chapter5.chapter5_end.t001
> $chapter5.chapter5_end.t002
> $chapter5.chapter5_end.t003

@wait 600

> $chapter5.chapter5_end.t004

@wait 400

> $chapter5.chapter5_end.t005
> $chapter5.chapter5_end.t006
> $chapter5.chapter5_end.t007
> $chapter5.chapter5_end.t008

@wait 400

> $chapter5.chapter5_end.t009
> $chapter5.chapter5_end.t010
> $chapter5.chapter5_end.t011
> $chapter5.chapter5_end.t012

@wait 400

> $chapter5.chapter5_end.t013
> $chapter5.chapter5_end.t014
> $chapter5.chapter5_end.t015
> $chapter5.chapter5_end.t016
> $chapter5.chapter5_end.t017

@wait 600

> $chapter5.chapter5_end.t018
> $chapter5.chapter5_end.t019

@wait 500

> $chapter5.chapter5_end.t020
> $chapter5.chapter5_end.t021
> $chapter5.chapter5_end.t022

@wait 600

> $chapter5.chapter5_end.t023
> $chapter5.chapter5_end.t024

@wait 500

@bgm stop
@wait 300

@bgm mystery_shadow.mp3
@wait 600

> $chapter5.chapter5_end.t025
> $chapter5.chapter5_end.t026

@wait 500

> $chapter5.chapter5_end.t027
> $chapter5.chapter5_end.t028
> $chapter5.chapter5_end.t029
> $chapter5.chapter5_end.t030

@wait 600

> $chapter5.chapter5_end.t031
> $chapter5.chapter5_end.t032

@wait 500

> $chapter5.chapter5_end.t033
> $chapter5.chapter5_end.t034

> $chapter5.chapter5_end.t035
> $chapter5.chapter5_end.t036
> $chapter5.chapter5_end.t037
> $chapter5.chapter5_end.t038

@wait 700

> $chapter5.chapter5_end.t039

@wait 400

> $chapter5.chapter5_end.t040

@wait 800

> $chapter5.chapter5_end.t041

@wait 600

> $chapter5.chapter5_end.t042
> $chapter5.chapter5_end.t043

@wait 1000

@end "$chapter5.chapter5_end.end_title" -> chapter6_start
