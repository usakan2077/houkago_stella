// 放課後のステラ — Chapter 5「水面の午後」
# chapter5_start
@scene classroom fade
@bgm daily_life.mp3
@se classroom_noise.mp3
> $chapter5.chapter5_start.r001
> $chapter5.chapter5_start.r002
@jump chapter5_morning_class
# chapter5_morning_class
@show sakura right excited fade_in
sakura: $chapter5.chapter5_morning_class.r001
player: $chapter5.chapter5_morning_class.r002
sakura: $chapter5.chapter5_morning_class.r003
player: $chapter5.chapter5_morning_class.r004
sakura: $chapter5.chapter5_morning_class.r005
kotoha: $chapter5.chapter5_morning_class.r006
@show kotoha left normal fade_in
sakura: $chapter5.chapter5_morning_class.r007
kotoha: $chapter5.chapter5_morning_class.r008
sakura: $chapter5.chapter5_morning_class.r009
kotoha: $chapter5.chapter5_morning_class.r010
player: $chapter5.chapter5_morning_class.r011
kotoha: $chapter5.chapter5_morning_class.r012
> $chapter5.chapter5_morning_class.r013
@hide_all fade_out
@se school_bell.mp3
@jump chapter5_prep
# chapter5_prep
@scene corridor fade
@bgm daily_life.mp3
> $chapter5.chapter5_prep.r001
@scene pool_outdoor fade
@bgm energetic_light.mp3
@se river_flow.mp3
> $chapter5.chapter5_prep.r002
@show sakura_swimsuit left excited fade_in
sakura: $chapter5.chapter5_prep.r003
player: $chapter5.chapter5_prep.r004
sakura: $chapter5.chapter5_prep.r005
player: $chapter5.chapter5_prep.r006
@show kotoha_swimsuit right normal fade_in
kotoha: $chapter5.chapter5_prep.r007
> $chapter5.chapter5_prep.r008
player: $chapter5.chapter5_prep.r009
kotoha: $chapter5.chapter5_prep.r010
> $chapter5.chapter5_prep.r011
@hide_all fade_out
@jump chapter5_lesson
# chapter5_lesson
@scene pool_outdoor fade
@bgm energetic_light.mp3
@se gym_whistle.mp3
@show sakura_swimsuit center excited fade_in
> $chapter5.chapter5_lesson.context001
sakura: $chapter5.chapter5_lesson.r001
> $chapter5.chapter5_lesson.r002
> $chapter5.chapter5_lesson.r003
@hide sakura_swimsuit fade_out
@show kotoha_swimsuit right normal fade_in
> $chapter5.chapter5_lesson.r004
@hide kotoha_swimsuit fade_out
@jump chapter5_sakura_kotoha
# chapter5_sakura_kotoha
@still pool_sakura_kotoha
> $chapter5.chapter5_sakura_kotoha.r001
> $chapter5.chapter5_sakura_kotoha.r002
@jump chapter5_kotoha_water
# chapter5_kotoha_water
@still_hide
@scene pool_outdoor fade
@show kotoha_swimsuit right normal fade_in
> $chapter5.chapter5_kotoha_water.context001
player: $chapter5.chapter5_kotoha_water.r001
kotoha: $chapter5.chapter5_kotoha_water.r002
player: $chapter5.chapter5_kotoha_water.r003
kotoha: $chapter5.chapter5_kotoha_water.r004
> $chapter5.chapter5_kotoha_water.r005
player: $chapter5.chapter5_kotoha_water.r006
kotoha: $chapter5.chapter5_kotoha_water.r007
> $chapter5.chapter5_kotoha_water.r008
kotoha: $chapter5.chapter5_kotoha_water.r009
player: $chapter5.chapter5_kotoha_water.r010
kotoha: $chapter5.chapter5_kotoha_water.r011
> $chapter5.chapter5_kotoha_water.r012
kotoha: $chapter5.chapter5_kotoha_water.r013
player: $chapter5.chapter5_kotoha_water.r014
kotoha: $chapter5.chapter5_kotoha_water.r015
player: $chapter5.chapter5_kotoha_water.r016
> $chapter5.chapter5_kotoha_water.r017
@hide kotoha_swimsuit fade_out
@se gym_whistle.mp3
@jump chapter5_sakura_scene
# chapter5_sakura_scene
@scene pool_outdoor fade
@bgm energetic_light.mp3
@show sakura_swimsuit left excited fade_in
> $chapter5.chapter5_sakura_scene.context001
sakura: $chapter5.chapter5_sakura_scene.r001
player: $chapter5.chapter5_sakura_scene.r002
sakura: $chapter5.chapter5_sakura_scene.r003
player: $chapter5.chapter5_sakura_scene.r004
@expr sakura_swimsuit happy
sakura: $chapter5.chapter5_sakura_scene.r005
player: $chapter5.chapter5_sakura_scene.r006
sakura: $chapter5.chapter5_sakura_scene.r007
> $chapter5.chapter5_sakura_scene.r008
@hide sakura_swimsuit fade_out
@jump chapter5_sakura_kotoha_end
# chapter5_sakura_kotoha_end
@scene pool_outdoor fade
> $chapter5.chapter5_sakura_kotoha_end.r001
> $chapter5.chapter5_sakura_kotoha_end.r002
@choice
- $chapter5.chapter5_sakura_kotoha_end.r003 [sakura_favor+3] -> chapter5_sakura_talk
- $chapter5.chapter5_sakura_kotoha_end.r004 -> chapter5_sakura_skip
# chapter5_sakura_talk
@show sakura_swimsuit left normal fade_in
player: $chapter5.chapter5_sakura_talk.r001
> $chapter5.chapter5_sakura_talk.r002
sakura: $chapter5.chapter5_sakura_talk.r003
player: $chapter5.chapter5_sakura_talk.r004
sakura: $chapter5.chapter5_sakura_talk.r005
> $chapter5.chapter5_sakura_talk.r006
sakura: $chapter5.chapter5_sakura_talk.r007
player: $chapter5.chapter5_sakura_talk.r008
@expr sakura_swimsuit blank
> $chapter5.chapter5_sakura_talk.r009
@expr sakura_swimsuit normal
sakura: $chapter5.chapter5_sakura_talk.r010
player: $chapter5.chapter5_sakura_talk.r011
sakura: $chapter5.chapter5_sakura_talk.r012
player: $chapter5.chapter5_sakura_talk.r013
sakura: $chapter5.chapter5_sakura_talk.r014
player: $chapter5.chapter5_sakura_talk.r015
sakura: $chapter5.chapter5_sakura_talk.r016
player: $chapter5.chapter5_sakura_talk.r017
sakura: $chapter5.chapter5_sakura_talk.r018
> $chapter5.chapter5_sakura_talk.r019
player: $chapter5.chapter5_sakura_talk.r020
sakura: $chapter5.chapter5_sakura_talk.r021
> $chapter5.chapter5_sakura_talk.r022
sakura: $chapter5.chapter5_sakura_talk.r023
player: $chapter5.chapter5_sakura_talk.r024
> $chapter5.chapter5_sakura_talk.r025
@hide sakura_swimsuit fade_out
@jump chapter5_kotoha_scene
# chapter5_sakura_skip
> $chapter5.chapter5_sakura_skip.r001
> $chapter5.chapter5_sakura_skip.r002
@jump chapter5_kotoha_scene
# chapter5_kotoha_scene
@scene pool_outdoor fade
@show kotoha_swimsuit right normal fade_in
> $chapter5.chapter5_kotoha_scene.context001
kotoha: $chapter5.chapter5_kotoha_scene.r001
player: $chapter5.chapter5_kotoha_scene.r002
kotoha: $chapter5.chapter5_kotoha_scene.r003
> $chapter5.chapter5_kotoha_scene.r004
kotoha: $chapter5.chapter5_kotoha_scene.r005
player: $chapter5.chapter5_kotoha_scene.r006
kotoha: $chapter5.chapter5_kotoha_scene.r007
> $chapter5.chapter5_kotoha_scene.r008
@hide kotoha_swimsuit fade_out
@still_hide
@jump chapter5_mahiru_window
# chapter5_mahiru_window
@scene corridor fade
@bgm daily_life.mp3
@still vending_corner fade_in
> $chapter5.chapter5_mahiru_window.r001
player: $chapter5.chapter5_mahiru_window.r002
> $chapter5.chapter5_mahiru_window.r003
@still_hide fade_out
@still pool_mahiru_window
> $chapter5.chapter5_mahiru_window.r004
> $chapter5.chapter5_mahiru_window.r005
> $chapter5.chapter5_mahiru_window.r006
> $chapter5.chapter5_mahiru_window.r007
> $chapter5.chapter5_mahiru_window.r008
@still_hide
@jump chapter5_after_school
# chapter5_after_school
@scene classroom fade
@bgm daily_life.mp3
@show sakura right happy fade_in
> $chapter5.chapter5_after_school.context001
sakura: $chapter5.chapter5_after_school.r001
player: $chapter5.chapter5_after_school.r002
sakura: $chapter5.chapter5_after_school.r003
@show kotoha left normal fade_in
kotoha: $chapter5.chapter5_after_school.r004
sakura: $chapter5.chapter5_after_school.r005
player: $chapter5.chapter5_after_school.r006
kotoha: $chapter5.chapter5_after_school.r007
sakura: $chapter5.chapter5_after_school.r008
kotoha: $chapter5.chapter5_after_school.r009
sakura: $chapter5.chapter5_after_school.r010
kotoha: $chapter5.chapter5_after_school.r011
> $chapter5.chapter5_after_school.r012
player: $chapter5.chapter5_after_school.r013
sakura: $chapter5.chapter5_after_school.r014
kotoha: $chapter5.chapter5_after_school.r015
sakura: $chapter5.chapter5_after_school.r016
> $chapter5.chapter5_after_school.r017
sakura: $chapter5.chapter5_after_school.r018
kotoha: $chapter5.chapter5_after_school.r019
@hide_all fade_out
@jump chapter5_end
# chapter5_end
@scene school_gate_summer_evening fade
@bgm evening_piano.mp3
@show nobuhara right tired fade_in
> $chapter5.chapter5_end.context001
nobuhara: $chapter5.chapter5_end.r001
player: $chapter5.chapter5_end.r002
> $chapter5.chapter5_end.r003
nobuhara: $chapter5.chapter5_end.r004
player: $chapter5.chapter5_end.r005
nobuhara: $chapter5.chapter5_end.r006
> $chapter5.chapter5_end.r007
player: $chapter5.chapter5_end.r008
nobuhara: $chapter5.chapter5_end.r009
> $chapter5.chapter5_end.r010
player: $chapter5.chapter5_end.r011
nobuhara: $chapter5.chapter5_end.r012
@hide nobuhara fade_out
@scene commute_road_summer_evening fade
> $chapter5.chapter5_end.r013
> $chapter5.chapter5_end.r014
> $chapter5.chapter5_end.r015
@scene protagonist_room_night fade
@bgm night_melody.mp3
> $chapter5.chapter5_end.r016
> $chapter5.chapter5_end.r017
player: $chapter5.chapter5_end.r018
> $chapter5.chapter5_end.r019
@end "$chapter5.chapter5_end.r020" -> chapter6_start
