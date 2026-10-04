// 放課後のステラ — Chapter 7「重なる孤独」
# chapter7_start
@scene corridor fade
@bgm spring_breeze.mp3
> $chapter7.chapter7_start.context001
@still vending_corner fade_in
@still vending_soldout fade_in
> $chapter7.chapter7_start.r001
player: $chapter7.chapter7_start.r002
> $chapter7.chapter7_start.r003
@still_hide fade_out
@scene classroom fade
@se school_bell.mp3
> $chapter7.chapter7_start.r004
@show sakura right happy fade_in
@show kotoha left normal fade_in
sakura: $chapter7.chapter7_start.r005
player: $chapter7.chapter7_start.r006
sakura: $chapter7.chapter7_start.r007
kotoha: $chapter7.chapter7_start.r008
player: $chapter7.chapter7_start.r009
sakura: $chapter7.chapter7_start.r010
> $chapter7.chapter7_start.r011
@jump chapter7_festival_lunch
# chapter7_festival_lunch
@scene classroom_festival_prep fade
@bgm school_festival.mp3
@show teacher_male center normal fade_in
> $chapter7.chapter7_festival_lunch.context001
teacher_male: $chapter7.chapter7_festival_lunch.r001
nobuhara: $chapter7.chapter7_festival_lunch.r002
teacher_male: $chapter7.chapter7_festival_lunch.r003
nobuhara: $chapter7.chapter7_festival_lunch.r004
> $chapter7.chapter7_festival_lunch.r005
@hide teacher_male fade_out
sakura: $chapter7.chapter7_festival_lunch.r006
player: $chapter7.chapter7_festival_lunch.r007
sakura: $chapter7.chapter7_festival_lunch.r008
kotoha: $chapter7.chapter7_festival_lunch.r009
sakura: $chapter7.chapter7_festival_lunch.r010
player: $chapter7.chapter7_festival_lunch.r011
sakura: $chapter7.chapter7_festival_lunch.r012
> $chapter7.chapter7_festival_lunch.r013
sakura: $chapter7.chapter7_festival_lunch.r014
player: $chapter7.chapter7_festival_lunch.r015
> $chapter7.chapter7_festival_lunch.r016
player: $chapter7.chapter7_festival_lunch.r017
sakura: $chapter7.chapter7_festival_lunch.r018
kotoha: $chapter7.chapter7_festival_lunch.r019
> $chapter7.chapter7_festival_lunch.r020
player: $chapter7.chapter7_festival_lunch.r021
sakura: $chapter7.chapter7_festival_lunch.r022
player: $chapter7.chapter7_festival_lunch.r023
sakura: $chapter7.chapter7_festival_lunch.r024
player: $chapter7.chapter7_festival_lunch.r025
kotoha: $chapter7.chapter7_festival_lunch.r026
> $chapter7.chapter7_festival_lunch.r027
sakura: $chapter7.chapter7_festival_lunch.r028
player: $chapter7.chapter7_festival_lunch.r029
> $chapter7.chapter7_festival_lunch.r030
@hide_all fade_out
@jump chapter7_festival
# chapter7_festival
@scene classroom_festival_prep fade
@bgm school_festival.mp3
> $chapter7.chapter7_festival.r001
@show teacher_male center serious fade_in
@show sakura right normal fade_in
teacher_male: $chapter7.chapter7_festival.r002
sakura: $chapter7.chapter7_festival.r003
teacher_male: $chapter7.chapter7_festival.r004
> $chapter7.chapter7_festival.r005
@hide teacher_male fade_out
@show kotoha left normal fade_in
sakura: $chapter7.chapter7_festival.r006
@show nobuhara_nobag center panic fade_in
nobuhara_nobag: $chapter7.chapter7_festival.r007
kotoha: $chapter7.chapter7_festival.r008
nobuhara_nobag: $chapter7.chapter7_festival.r009
sakura: $chapter7.chapter7_festival.r010
@hide nobuhara_nobag fade_out
> $chapter7.chapter7_festival.r011
@show festival_committee center panic pop_in
festival_committee: $chapter7.chapter7_festival.r012
player: $chapter7.chapter7_festival.r013
festival_committee: $chapter7.chapter7_festival.r014
player: $chapter7.chapter7_festival.r015
@hide festival_committee fade_out
sakura: $chapter7.chapter7_festival.r016
classmate_male_a: $chapter7.chapter7_festival.r017
sakura: $chapter7.chapter7_festival.r018
> $chapter7.chapter7_festival.r019
kotoha: $chapter7.chapter7_festival.r020
player: $chapter7.chapter7_festival.r021
sakura: $chapter7.chapter7_festival.r022
> $chapter7.chapter7_festival.r023
player: $chapter7.chapter7_festival.r024
kotoha: $chapter7.chapter7_festival.r025
player: $chapter7.chapter7_festival.r026
> $chapter7.chapter7_festival.r027
kotoha: $chapter7.chapter7_festival.r028
player: $chapter7.chapter7_festival.r029
@show classmate_male_a center work pop_in
classmate_male_a: $chapter7.chapter7_festival.r030
sakura: $chapter7.chapter7_festival.r031
@hide classmate_male_a fade_out
@show nobuhara_nobag center tired fade_in
nobuhara_nobag: $chapter7.chapter7_festival.r032
sakura: $chapter7.chapter7_festival.r033
nobuhara_nobag: $chapter7.chapter7_festival.r034
> $chapter7.chapter7_festival.r035
player: $chapter7.chapter7_festival.r036
nobuhara_nobag: $chapter7.chapter7_festival.r037
> $chapter7.chapter7_festival.r038
@hide_all fade_out
@bgm stop
@jump chapter7_sakura_break
# chapter7_sakura_break
@scene classroom_festival_prep fade
@still sakura_corner_resting
> $chapter7.chapter7_sakura_break.r001
@still_hide
@show sakura right normal fade_in
player: $chapter7.chapter7_sakura_break.r002
sakura: $chapter7.chapter7_sakura_break.r003
> $chapter7.chapter7_sakura_break.r004
player: $chapter7.chapter7_sakura_break.r005
sakura: $chapter7.chapter7_sakura_break.r006
> $chapter7.chapter7_sakura_break.r007
sakura: $chapter7.chapter7_sakura_break.r008
player: $chapter7.chapter7_sakura_break.r009
> $chapter7.chapter7_sakura_break.r010
sakura: $chapter7.chapter7_sakura_break.r011
player: $chapter7.chapter7_sakura_break.r012
sakura: $chapter7.chapter7_sakura_break.r013
> $chapter7.chapter7_sakura_break.r014
@choice
- $chapter7.chapter7_sakura_break.r015 [sakura_favor+3] -> chapter7_sakura_warm
- $chapter7.chapter7_sakura_break.r016 -> chapter7_sakura_resume
# chapter7_sakura_warm
player: $chapter7.chapter7_sakura_warm.r001
sakura: $chapter7.chapter7_sakura_warm.r002
player: $chapter7.chapter7_sakura_warm.r003
> $chapter7.chapter7_sakura_warm.r004
@jump chapter7_sakura_resume
# chapter7_sakura_resume
sakura: $chapter7.chapter7_sakura_resume.r001
> $chapter7.chapter7_sakura_resume.r002
sakura: $chapter7.chapter7_sakura_resume.r003
player: $chapter7.chapter7_sakura_resume.r004
@hide sakura fade_out
@jump chapter7_music_room
# chapter7_music_room
@scene corridor_evening fade
@bgm piano_distant.mp3 noloop
@show kotoha center normal fade_in
> $chapter7.chapter7_music_room.r001
kotoha: $chapter7.chapter7_music_room.r002
player: $chapter7.chapter7_music_room.r003
kotoha: $chapter7.chapter7_music_room.r004
> $chapter7.chapter7_music_room.r005
@still kotoha_frozen_piano_sound
> $chapter7.chapter7_music_room.r006
@se door_open.mp3
> $chapter7.chapter7_music_room.r007
@still_hide
player: $chapter7.chapter7_music_room.r008
kotoha: $chapter7.chapter7_music_room.r009
> $chapter7.chapter7_music_room.r010
kotoha: $chapter7.chapter7_music_room.r011
player: $chapter7.chapter7_music_room.r012
kotoha: $chapter7.chapter7_music_room.r013
> $chapter7.chapter7_music_room.r014
kotoha: $chapter7.chapter7_music_room.r015
player: $chapter7.chapter7_music_room.r016
kotoha: $chapter7.chapter7_music_room.r017
player: $chapter7.chapter7_music_room.r018
kotoha: $chapter7.chapter7_music_room.r019
> $chapter7.chapter7_music_room.r020
player: $chapter7.chapter7_music_room.r021
kotoha: $chapter7.chapter7_music_room.r022
> $chapter7.chapter7_music_room.r023
kotoha: $chapter7.chapter7_music_room.r024
@choice
- $chapter7.chapter7_music_room.r025 [kotoha_favor+3] -> chapter7_kotoha_warm
- $chapter7.chapter7_music_room.r026 -> chapter7_kotoha_resume
# chapter7_kotoha_warm
player: $chapter7.chapter7_kotoha_warm.r001
kotoha: $chapter7.chapter7_kotoha_warm.r002
player: $chapter7.chapter7_kotoha_warm.r003
@jump chapter7_kotoha_resume
# chapter7_kotoha_resume
> $chapter7.chapter7_kotoha_resume.r001
kotoha: $chapter7.chapter7_kotoha_resume.r002
player: $chapter7.chapter7_kotoha_resume.r003
kotoha: $chapter7.chapter7_kotoha_resume.r004
@hide kotoha fade_out
@jump chapter7_rooftop_move
# chapter7_rooftop_move
@scene staircase_evening fade
@bgm evening_piano.mp3
@show mahiru center happy fade_in
> $chapter7.chapter7_rooftop_move.context001
mahiru: $chapter7.chapter7_rooftop_move.r001
player: $chapter7.chapter7_rooftop_move.r002
mahiru: $chapter7.chapter7_rooftop_move.r003
player: $chapter7.chapter7_rooftop_move.r004
mahiru: $chapter7.chapter7_rooftop_move.r005
> $chapter7.chapter7_rooftop_move.r006
mahiru: $chapter7.chapter7_rooftop_move.r007
player: $chapter7.chapter7_rooftop_move.r008
mahiru: $chapter7.chapter7_rooftop_move.r009
player: $chapter7.chapter7_rooftop_move.r010
mahiru: $chapter7.chapter7_rooftop_move.r011
> $chapter7.chapter7_rooftop_move.r012
mahiru: $chapter7.chapter7_rooftop_move.r013
player: $chapter7.chapter7_rooftop_move.r014
mahiru: $chapter7.chapter7_rooftop_move.r015
@choice
- $chapter7.chapter7_rooftop_move.r016 [mahiru_favor+3] -> chapter7_mahiru_warm
- $chapter7.chapter7_rooftop_move.r017 -> chapter7_mahiru_normal
# chapter7_mahiru_warm
player: $chapter7.chapter7_mahiru_warm.r001
mahiru: $chapter7.chapter7_mahiru_warm.r002
@jump chapter7_mahiru_resume
# chapter7_mahiru_normal
player: $chapter7.chapter7_mahiru_normal.r001
mahiru: $chapter7.chapter7_mahiru_normal.r002
@jump chapter7_mahiru_resume
# chapter7_mahiru_resume
@hide mahiru fade_out
> $chapter7.chapter7_mahiru_resume.r001
@show sakura center happy fade_in
@show kotoha right normal fade_in
sakura: $chapter7.chapter7_mahiru_resume.r002
player: $chapter7.chapter7_mahiru_resume.r003
sakura: $chapter7.chapter7_mahiru_resume.r004
@hide_all fade_out
@jump chapter7_rooftop
# chapter7_rooftop
@scene rooftop_evening fade
@bgm rooftop_wind.mp3
@se wind_rooftop.mp3
@show sakura left happy fade_in
@show kotoha right normal fade_in
@show mahiru center normal fade_in
@still mahiru_evening_rooftop
> $chapter7.chapter7_rooftop.r001
mahiru: $chapter7.chapter7_rooftop.r002
sakura: $chapter7.chapter7_rooftop.r003
mahiru: $chapter7.chapter7_rooftop.r004
player: $chapter7.chapter7_rooftop.r005
mahiru: $chapter7.chapter7_rooftop.r006
@still_hide
sakura: $chapter7.chapter7_rooftop.r007
kotoha: $chapter7.chapter7_rooftop.r008
sakura: $chapter7.chapter7_rooftop.r009
player: $chapter7.chapter7_rooftop.r010
sakura: $chapter7.chapter7_rooftop.r011
> $chapter7.chapter7_rooftop.r012
mahiru: $chapter7.chapter7_rooftop.r013
> $chapter7.chapter7_rooftop.r014
kotoha: $chapter7.chapter7_rooftop.r015
@scene rooftop_night fade
> $chapter7.chapter7_rooftop.context001
mahiru: $chapter7.chapter7_rooftop.r016
@bgm stop
@se chime_soft.mp3
@still rooftop_shooting_star
mahiru: $chapter7.chapter7_rooftop.r017
sakura: $chapter7.chapter7_rooftop.r018
player: $chapter7.chapter7_rooftop.r019
kotoha: $chapter7.chapter7_rooftop.r020
mahiru: $chapter7.chapter7_rooftop.r021
sakura: $chapter7.chapter7_rooftop.r022
mahiru: $chapter7.chapter7_rooftop.r023
player: $chapter7.chapter7_rooftop.r024
mahiru: $chapter7.chapter7_rooftop.r025
@still rooftop_four_wishes
> $chapter7.chapter7_rooftop.r026
mahiru: $chapter7.chapter7_rooftop.r027
sakura: $chapter7.chapter7_rooftop.r028
kotoha: $chapter7.chapter7_rooftop.r029
sakura: $chapter7.chapter7_rooftop.r030
> $chapter7.chapter7_rooftop.r031
mahiru: $chapter7.chapter7_rooftop.r032
kotoha: $chapter7.chapter7_rooftop.r033
sakura: $chapter7.chapter7_rooftop.r034
kotoha: $chapter7.chapter7_rooftop.r035
player: $chapter7.chapter7_rooftop.r036
kotoha: $chapter7.chapter7_rooftop.r037
sakura: $chapter7.chapter7_rooftop.r038
kotoha: $chapter7.chapter7_rooftop.r039
> $chapter7.chapter7_rooftop.r040
mahiru: $chapter7.chapter7_rooftop.r041
player: $chapter7.chapter7_rooftop.r042
sakura: $chapter7.chapter7_rooftop.r043
player: $chapter7.chapter7_rooftop.r044
sakura: $chapter7.chapter7_rooftop.r045
player: $chapter7.chapter7_rooftop.r046
sakura: $chapter7.chapter7_rooftop.r047
mahiru: $chapter7.chapter7_rooftop.r048
> $chapter7.chapter7_rooftop.r049
mahiru: $chapter7.chapter7_rooftop.r050
sakura: $chapter7.chapter7_rooftop.r051
mahiru: $chapter7.chapter7_rooftop.r052
> $chapter7.chapter7_rooftop.r053
sakura: $chapter7.chapter7_rooftop.r054
kotoha: $chapter7.chapter7_rooftop.r055
sakura: $chapter7.chapter7_rooftop.r056
@bgm evening_piano.mp3
@still_hide
> $chapter7.chapter7_rooftop.r057
@hide_all fade_out
@jump chapter7_evening_classroom
# chapter7_evening_classroom
@scene classroom_night fade
@bgm evening_piano.mp3
@show sakura left normal fade_in
@show kotoha right normal fade_in
@show mahiru center happy fade_in
> $chapter7.chapter7_evening_classroom.r001
sakura: $chapter7.chapter7_evening_classroom.r002
kotoha: $chapter7.chapter7_evening_classroom.r003
sakura: $chapter7.chapter7_evening_classroom.r004
kotoha: $chapter7.chapter7_evening_classroom.r005
> $chapter7.chapter7_evening_classroom.r006
player: $chapter7.chapter7_evening_classroom.r007
sakura: $chapter7.chapter7_evening_classroom.r008
> $chapter7.chapter7_evening_classroom.r009
kotoha: $chapter7.chapter7_evening_classroom.r010
sakura: $chapter7.chapter7_evening_classroom.r011
player: $chapter7.chapter7_evening_classroom.r012
sakura: $chapter7.chapter7_evening_classroom.r013
> $chapter7.chapter7_evening_classroom.r014
sakura: $chapter7.chapter7_evening_classroom.r015
kotoha: $chapter7.chapter7_evening_classroom.r016
sakura: $chapter7.chapter7_evening_classroom.r017
> $chapter7.chapter7_evening_classroom.r018
player: $chapter7.chapter7_evening_classroom.r019
mahiru: $chapter7.chapter7_evening_classroom.r020
player: $chapter7.chapter7_evening_classroom.r021
mahiru: $chapter7.chapter7_evening_classroom.r022
> $chapter7.chapter7_evening_classroom.r023
player: $chapter7.chapter7_evening_classroom.r024
sakura: $chapter7.chapter7_evening_classroom.r025
mahiru: $chapter7.chapter7_evening_classroom.r026
kotoha: $chapter7.chapter7_evening_classroom.r027
sakura: $chapter7.chapter7_evening_classroom.r028
> $chapter7.chapter7_evening_classroom.r029
sakura: $chapter7.chapter7_evening_classroom.r030
player: $chapter7.chapter7_evening_classroom.r031
> $chapter7.chapter7_evening_classroom.r032
@hide_all fade_out
@jump chapter7_mahiru_notebook
# chapter7_mahiru_notebook
@scene corridor_night fade
@bgm stop
> $chapter7.chapter7_mahiru_notebook.r001
@scene school_exterior_night fade
> $chapter7.chapter7_mahiru_notebook.r002
@jump chapter7_monologue
# chapter7_monologue
@scene protagonist_room_night fade
@bgm night_melody.mp3
> $chapter7.chapter7_monologue.r001
> $chapter7.chapter7_monologue.r002
> $chapter7.chapter7_monologue.r003
> $chapter7.chapter7_monologue.r004
player: $chapter7.chapter7_monologue.r005
> $chapter7.chapter7_monologue.r006
@bgm stop
@end "$chapter7.chapter7_monologue.r007" -> chapter8_start
