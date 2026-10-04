// 放課後のステラ — Chapter 2「笑顔の境界線」
# chapter2_start
@scene classroom fade
@bgm spring_breeze.mp3
@se school_bell.mp3
> $chapter2.chapter2_start.r001
@show sakura right happy fade_in
sakura: $chapter2.chapter2_start.r002
player: $chapter2.chapter2_start.r003
sakura: $chapter2.chapter2_start.r004
@show kotoha left normal fade_in
kotoha: $chapter2.chapter2_start.r005
sakura: $chapter2.chapter2_start.r006
player: $chapter2.chapter2_start.r007
sakura: $chapter2.chapter2_start.r008
> $chapter2.chapter2_start.r009
kotoha: $chapter2.chapter2_start.r010
sakura: $chapter2.chapter2_start.r011
kotoha: $chapter2.chapter2_start.r012
player: $chapter2.chapter2_start.r013
kotoha: $chapter2.chapter2_start.r014
sakura: $chapter2.chapter2_start.r015
@expr kotoha shy
kotoha: $chapter2.chapter2_start.r016
> $chapter2.chapter2_start.r017
player: $chapter2.chapter2_start.r018
sakura: $chapter2.chapter2_start.r019
@expr sakura blank
@still sakura_blank_moment
> $chapter2.chapter2_start.r020
@still_hide
@expr sakura happy
sakura: $chapter2.chapter2_start.r021
> $chapter2.chapter2_start.r022
sakura: $chapter2.chapter2_start.r023
player: $chapter2.chapter2_start.r024
kotoha: $chapter2.chapter2_start.r025
sakura: $chapter2.chapter2_start.r026
@hide_all fade_out
@jump chapter2_class
# chapter2_class
@scene classroom fade
@bgm daily_life.mp3
> $chapter2.chapter2_class.r001
@show sakura right happy fade_in
> $chapter2.chapter2_class.r002
> $chapter2.chapter2_class.r003
@expr sakura no_light_eyes
> $chapter2.chapter2_class.r004
> $chapter2.chapter2_class.r005
@expr sakura happy
teacher_male: $chapter2.chapter2_class.r006
player: $chapter2.chapter2_class.r007
> $chapter2.chapter2_class.r008
@hide sakura fade_out
@jump chapter2_lunch
# chapter2_lunch
@scene rooftop fade
@bgm spring_breeze.mp3
@se wind_rooftop.mp3
@show sakura right excited fade_in
@show kotoha left normal fade_in
@show mahiru center happy fade_in
> $chapter2.chapter2_lunch.context001
sakura: $chapter2.chapter2_lunch.r001
player: $chapter2.chapter2_lunch.r002
sakura: $chapter2.chapter2_lunch.r003
> $chapter2.chapter2_lunch.r004
mahiru: $chapter2.chapter2_lunch.r005
sakura: $chapter2.chapter2_lunch.r006
kotoha: $chapter2.chapter2_lunch.r007
mahiru: $chapter2.chapter2_lunch.r008
player: $chapter2.chapter2_lunch.r009
mahiru: $chapter2.chapter2_lunch.r010
> $chapter2.chapter2_lunch.r011
kotoha: $chapter2.chapter2_lunch.r012
mahiru: $chapter2.chapter2_lunch.r013
sakura: $chapter2.chapter2_lunch.r014
kotoha: $chapter2.chapter2_lunch.r015
sakura: $chapter2.chapter2_lunch.r016
kotoha: $chapter2.chapter2_lunch.r017
sakura: $chapter2.chapter2_lunch.r018
player: $chapter2.chapter2_lunch.r019
sakura: $chapter2.chapter2_lunch.r020
kotoha: $chapter2.chapter2_lunch.r021
sakura: $chapter2.chapter2_lunch.r022
> $chapter2.chapter2_lunch.r023
sakura: $chapter2.chapter2_lunch.r024
@expr kotoha happy
kotoha: $chapter2.chapter2_lunch.r025
> $chapter2.chapter2_lunch.r026
mahiru: $chapter2.chapter2_lunch.r027
player: $chapter2.chapter2_lunch.r028
mahiru: $chapter2.chapter2_lunch.r029
@se camera_film_shutter.mp3
sakura: $chapter2.chapter2_lunch.r030
mahiru: $chapter2.chapter2_lunch.r031
> $chapter2.chapter2_lunch.r032
sakura: $chapter2.chapter2_lunch.r033
kotoha: $chapter2.chapter2_lunch.r034
player: $chapter2.chapter2_lunch.r035
mahiru: $chapter2.chapter2_lunch.r036
player: $chapter2.chapter2_lunch.r037
mahiru: $chapter2.chapter2_lunch.r038
> $chapter2.chapter2_lunch.r039
sakura: $chapter2.chapter2_lunch.r040
kotoha: $chapter2.chapter2_lunch.r041
sakura: $chapter2.chapter2_lunch.r042
kotoha: $chapter2.chapter2_lunch.r043
player: $chapter2.chapter2_lunch.r044
sakura: $chapter2.chapter2_lunch.r045
> $chapter2.chapter2_lunch.r046
kotoha: $chapter2.chapter2_lunch.r047
mahiru: $chapter2.chapter2_lunch.r048
sakura: $chapter2.chapter2_lunch.r049
player: $chapter2.chapter2_lunch.r050
@hide_all fade_out
@jump chapter2_pe
# chapter2_pe
@scene gymnasium fade
@bgm daily_life.mp3
@se gym_whistle.mp3
> $chapter2.chapter2_pe.r001
@show nobuhara_sports left panic pop_in
nobuhara_sports: $chapter2.chapter2_pe.r002
player: $chapter2.chapter2_pe.r003
nobuhara_sports: $chapter2.chapter2_pe.r004
@hide nobuhara_sports fade_out
@show sakura_sports right happy fade_in
@show mahiru_sports center normal fade_in
sakura: $chapter2.chapter2_pe.r005
player: $chapter2.chapter2_pe.r006
sakura: $chapter2.chapter2_pe.r007
mahiru: $chapter2.chapter2_pe.r008
player: $chapter2.chapter2_pe.r009
mahiru: $chapter2.chapter2_pe.r010
> $chapter2.chapter2_pe.r011
mahiru: $chapter2.chapter2_pe.r012
player: $chapter2.chapter2_pe.r013
> $chapter2.chapter2_pe.r014
nobuhara_sports: $chapter2.chapter2_pe.r015
> $chapter2.chapter2_pe.r016
sakura: $chapter2.chapter2_pe.r017
player: $chapter2.chapter2_pe.r018
> $chapter2.chapter2_pe.r019
@hide_all fade_out
@jump chapter2_after_school
# chapter2_after_school
@scene classroom_evening fade
@bgm evening_piano.mp3
@se school_bell.mp3
> $chapter2.chapter2_after_school.r001
@show sakura center normal fade_in
> $chapter2.chapter2_after_school.r002
@choice
- $chapter2.chapter2_after_school.r003 [sakura_favor+5] -> chapter2_sakura_event
- $chapter2.chapter2_after_school.r004 -> chapter2_leave
# chapter2_sakura_event
player: $chapter2.chapter2_sakura_event.r001
@expr sakura surprised
sakura: $chapter2.chapter2_sakura_event.r002
player: $chapter2.chapter2_sakura_event.r003
sakura: $chapter2.chapter2_sakura_event.r004
player: $chapter2.chapter2_sakura_event.r005
> $chapter2.chapter2_sakura_event.r006
sakura: $chapter2.chapter2_sakura_event.r007
player: $chapter2.chapter2_sakura_event.r008
sakura: $chapter2.chapter2_sakura_event.r009
player: $chapter2.chapter2_sakura_event.r010
sakura: $chapter2.chapter2_sakura_event.r011
player: $chapter2.chapter2_sakura_event.r012
sakura: $chapter2.chapter2_sakura_event.r013
> $chapter2.chapter2_sakura_event.r014
@hide sakura fade_out
@scene gymnasium_evening fade
@bgm daily_life.mp3
@se crowd_distant.mp3
@show sakura_sports right normal fade_in
> $chapter2.chapter2_sakura_event.r015
sakura: $chapter2.chapter2_sakura_event.r016
@se shuttle_hit.mp3
> $chapter2.chapter2_sakura_event.r017
> $chapter2.chapter2_sakura_event.r018
> $chapter2.chapter2_sakura_event.r019
sakura: $chapter2.chapter2_sakura_event.r020
player: $chapter2.chapter2_sakura_event.r021
@expr sakura_sports happy
sakura: $chapter2.chapter2_sakura_event.r022
player: $chapter2.chapter2_sakura_event.r023
sakura: $chapter2.chapter2_sakura_event.r024
player: $chapter2.chapter2_sakura_event.r025
> $chapter2.chapter2_sakura_event.r026
player: $chapter2.chapter2_sakura_event.r027
sakura: $chapter2.chapter2_sakura_event.r028
player: $chapter2.chapter2_sakura_event.r029
sakura: $chapter2.chapter2_sakura_event.r030
> $chapter2.chapter2_sakura_event.r031
@expr sakura_sports normal
sakura: $chapter2.chapter2_sakura_event.r032
player: $chapter2.chapter2_sakura_event.r033
sakura: $chapter2.chapter2_sakura_event.r034
player: $chapter2.chapter2_sakura_event.r035
sakura: $chapter2.chapter2_sakura_event.r036
player: $chapter2.chapter2_sakura_event.r037
sakura: $chapter2.chapter2_sakura_event.r038
> $chapter2.chapter2_sakura_event.r039
sakura: $chapter2.chapter2_sakura_event.r040
player: $chapter2.chapter2_sakura_event.r041
sakura: $chapter2.chapter2_sakura_event.r042
> $chapter2.chapter2_sakura_event.r043
sakura: $chapter2.chapter2_sakura_event.r044
player: $chapter2.chapter2_sakura_event.r045
sakura: $chapter2.chapter2_sakura_event.r046
> $chapter2.chapter2_sakura_event.r047
@hide sakura_sports fade_out
@jump chapter2_library
# chapter2_leave
> $chapter2.chapter2_leave.r001
player: $chapter2.chapter2_leave.r002
sakura: $chapter2.chapter2_leave.r003
@hide sakura fade_out
@scene corridor_evening fade
> $chapter2.chapter2_leave.r004
@jump chapter2_library
# chapter2_library
@scene library_evening fade
@bgm library_quiet.mp3
@show kotoha center normal fade_in
@still kotoha_library_headphones
> $chapter2.chapter2_library.r001
@still_hide
player: $chapter2.chapter2_library.r002
kotoha: $chapter2.chapter2_library.r003
> $chapter2.chapter2_library.r004
player: $chapter2.chapter2_library.r005
kotoha: $chapter2.chapter2_library.r006
player: $chapter2.chapter2_library.r007
kotoha: $chapter2.chapter2_library.r008
> $chapter2.chapter2_library.r009
player: $chapter2.chapter2_library.r010
@expr kotoha thinking
kotoha: $chapter2.chapter2_library.r011
player: $chapter2.chapter2_library.r012
kotoha: $chapter2.chapter2_library.r013
> $chapter2.chapter2_library.r014
player: $chapter2.chapter2_library.r015
kotoha: $chapter2.chapter2_library.r016
player: $chapter2.chapter2_library.r017
kotoha: $chapter2.chapter2_library.r018
> $chapter2.chapter2_library.r019
kotoha: $chapter2.chapter2_library.r020
player: $chapter2.chapter2_library.r021
kotoha: $chapter2.chapter2_library.r022
> $chapter2.chapter2_library.r023
kotoha: $chapter2.chapter2_library.r024
player: $chapter2.chapter2_library.r025
kotoha: $chapter2.chapter2_library.r026
> $chapter2.chapter2_library.r027
@hide kotoha fade_out
@jump chapter2_mahiru_corridor
# chapter2_mahiru_corridor
@scene corridor_evening fade
@bgm evening_piano.mp3
@show mahiru center normal fade_in
> $chapter2.chapter2_mahiru_corridor.context001
mahiru: $chapter2.chapter2_mahiru_corridor.r001
player: $chapter2.chapter2_mahiru_corridor.r002
mahiru: $chapter2.chapter2_mahiru_corridor.r003
> $chapter2.chapter2_mahiru_corridor.r004
player: $chapter2.chapter2_mahiru_corridor.r005
mahiru: $chapter2.chapter2_mahiru_corridor.r006
player: $chapter2.chapter2_mahiru_corridor.r007
mahiru: $chapter2.chapter2_mahiru_corridor.r008
player: $chapter2.chapter2_mahiru_corridor.r009
mahiru: $chapter2.chapter2_mahiru_corridor.r010
> $chapter2.chapter2_mahiru_corridor.r011
player: $chapter2.chapter2_mahiru_corridor.r012
mahiru: $chapter2.chapter2_mahiru_corridor.r013
player: $chapter2.chapter2_mahiru_corridor.r014
mahiru: $chapter2.chapter2_mahiru_corridor.r015
player: $chapter2.chapter2_mahiru_corridor.r016
mahiru: $chapter2.chapter2_mahiru_corridor.r017
player: $chapter2.chapter2_mahiru_corridor.r018
@expr mahiru happy
mahiru: $chapter2.chapter2_mahiru_corridor.r019
@hide mahiru fade_out
> $chapter2.chapter2_mahiru_corridor.r020
> $chapter2.chapter2_mahiru_corridor.r021
@jump chapter2_end
# chapter2_mahiru_note
@jump chapter2_mahiru_corridor
# chapter2_end
@scene commute_road_spring_evening fade
@bgm evening_piano.mp3
> $chapter2.chapter2_end.r001
> $chapter2.chapter2_end.r002
> $chapter2.chapter2_end.r003
> $chapter2.chapter2_end.r004
player: $chapter2.chapter2_end.r005
> $chapter2.chapter2_end.r006
@bgm stop
@end "$chapter2.chapter2_end.r007" -> chapter3_start
