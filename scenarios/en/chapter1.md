// 放課後のステラ — Chapter 1「星の見えない夜空」
# start
@flag has_met_sakura false
@flag has_met_kotoha false
@flag has_met_mahiru false
@flag chapter1_complete false
@scene school_corridor_nightmare fade
@bgm a_haunting_memory_of_a_dark_night.mp3
@se chime_soft.mp3
> $chapter1.start.r001
@se footsteps.mp3
> $chapter1.start.context002
player: $chapter1.start.r002
> $chapter1.start.r003
@se heartbeat.mp3
> $chapter1.start.r004
@bgm stop
@scene protagonist_room_night fade
@bgm night_melody.mp3
> $chapter1.start.context001
player: $chapter1.start.r005
> $chapter1.start.r006
> $chapter1.start.r007
> $chapter1.start.r008
> $chapter1.start.r009
> $chapter1.start.r010
> $chapter1.start.r011
> $chapter1.start.context003
player: $chapter1.start.r012
> $chapter1.start.r013
> $chapter1.start.context004
@scene commute_road_spring_morning fade
@bgm spring_breeze.mp3
@se city_morning.mp3
> $chapter1.start.r014
@se car_passing.mp3
> $chapter1.start.r015
> $chapter1.start.r016
@jump chapter1_morning_gate
# chapter1_morning_gate
@scene school_gate_spring fade
@bgm spring_breeze.mp3
@se school_bell.mp3
> $chapter1.chapter1_morning_gate.r001
@scene classroom fade
@se classroom_noise.mp3
> $chapter1.chapter1_morning_gate.r002
@show nobuhara center panic fade_in
nobuhara: $chapter1.chapter1_morning_gate.r003
> $chapter1.chapter1_morning_gate.r004
player: $chapter1.chapter1_morning_gate.r005
nobuhara: $chapter1.chapter1_morning_gate.r006
> $chapter1.chapter1_morning_gate.r007
player: $chapter1.chapter1_morning_gate.r008
nobuhara: $chapter1.chapter1_morning_gate.r009
player: $chapter1.chapter1_morning_gate.r010
nobuhara: $chapter1.chapter1_morning_gate.r011
@hide nobuhara fade_out
@show sakura right happy pop_in
sakura: $chapter1.chapter1_morning_gate.r012
player: $chapter1.chapter1_morning_gate.r013
sakura: $chapter1.chapter1_morning_gate.r014
player: $chapter1.chapter1_morning_gate.r015
sakura: $chapter1.chapter1_morning_gate.r016
player: $chapter1.chapter1_morning_gate.r017
sakura: $chapter1.chapter1_morning_gate.r018
player: $chapter1.chapter1_morning_gate.r019
sakura: $chapter1.chapter1_morning_gate.r020
player: $chapter1.chapter1_morning_gate.r021
sakura: $chapter1.chapter1_morning_gate.r022
> $chapter1.chapter1_morning_gate.r023
sakura: $chapter1.chapter1_morning_gate.r024
player: $chapter1.chapter1_morning_gate.r025
sakura: $chapter1.chapter1_morning_gate.r026
player: $chapter1.chapter1_morning_gate.r027
sakura: $chapter1.chapter1_morning_gate.r028
> $chapter1.chapter1_morning_gate.r029
player: $chapter1.chapter1_morning_gate.r030
sakura: $chapter1.chapter1_morning_gate.r031
@flag has_met_sakura true
@se school_bell.mp3
sakura: $chapter1.chapter1_morning_gate.r032
player: $chapter1.chapter1_morning_gate.r033
@jump chapter1_homeroom
# chapter1_homeroom
@se door_open.mp3
@show teacher_male center normal fade_in
> $chapter1.chapter1_homeroom.context001
teacher_male: $chapter1.chapter1_homeroom.r001
nobuhara: $chapter1.chapter1_homeroom.r002
teacher_male: $chapter1.chapter1_homeroom.r003
@hide teacher_male fade_out
@show kotoha center normal fade_in
@move sakura left
kotoha: $chapter1.chapter1_homeroom.r004
teacher_male: $chapter1.chapter1_homeroom.r005
kotoha: $chapter1.chapter1_homeroom.r006
> $chapter1.chapter1_homeroom.r007
teacher_male: $chapter1.chapter1_homeroom.r008
@hide kotoha fade_out
@move sakura right
@still kotoha_window_ch1
> $chapter1.chapter1_homeroom.r009
@still_hide
sakura: $chapter1.chapter1_homeroom.r010
player: $chapter1.chapter1_homeroom.r011
sakura: $chapter1.chapter1_homeroom.r012
player: $chapter1.chapter1_homeroom.r013
teacher_male: $chapter1.chapter1_homeroom.r014
sakura: $chapter1.chapter1_homeroom.r015
> $chapter1.chapter1_homeroom.r016
@hide sakura fade_out
@jump chapter1_breaktime
# chapter1_breaktime
@scene corridor fade
@bgm daily_life.mp3
> $chapter1.chapter1_breaktime.r001
@show mahiru center happy fade_in
mahiru: $chapter1.chapter1_breaktime.r002
player: $chapter1.chapter1_breaktime.r003
mahiru: $chapter1.chapter1_breaktime.r004
player: $chapter1.chapter1_breaktime.r005
mahiru: $chapter1.chapter1_breaktime.r006
player: $chapter1.chapter1_breaktime.r007
mahiru: $chapter1.chapter1_breaktime.r008
player: $chapter1.chapter1_breaktime.r009
mahiru: $chapter1.chapter1_breaktime.r010
> $chapter1.chapter1_breaktime.r011
player: $chapter1.chapter1_breaktime.r012
mahiru: $chapter1.chapter1_breaktime.r013
player: $chapter1.chapter1_breaktime.r014
mahiru: $chapter1.chapter1_breaktime.r015
> $chapter1.chapter1_breaktime.r016
mahiru: $chapter1.chapter1_breaktime.r017
player: $chapter1.chapter1_breaktime.r018
mahiru: $chapter1.chapter1_breaktime.r019
player: $chapter1.chapter1_breaktime.r020
@flag has_met_mahiru true
@hide mahiru slide_out_right
> $chapter1.chapter1_breaktime.r021
> $chapter1.chapter1_breaktime.r022
@jump chapter1_lunch
# chapter1_lunch
@scene classroom fade
@bgm spring_breeze.mp3
@show sakura right happy fade_in
> $chapter1.chapter1_lunch.context001
sakura: $chapter1.chapter1_lunch.r001
player: $chapter1.chapter1_lunch.r002
sakura: $chapter1.chapter1_lunch.r003
player: $chapter1.chapter1_lunch.r004
sakura: $chapter1.chapter1_lunch.r005
> $chapter1.chapter1_lunch.r006
player: $chapter1.chapter1_lunch.r007
sakura: $chapter1.chapter1_lunch.r008
player: $chapter1.chapter1_lunch.r009
sakura: $chapter1.chapter1_lunch.r010
player: $chapter1.chapter1_lunch.r011
sakura: $chapter1.chapter1_lunch.r012
> $chapter1.chapter1_lunch.r013
sakura: $chapter1.chapter1_lunch.r014
player: $chapter1.chapter1_lunch.r015
sakura: $chapter1.chapter1_lunch.r016
player: $chapter1.chapter1_lunch.r017
sakura: $chapter1.chapter1_lunch.r018
player: $chapter1.chapter1_lunch.r019
sakura: $chapter1.chapter1_lunch.r020
> $chapter1.chapter1_lunch.r021
@hide sakura fade_out
@jump chapter1_after_school_intro
# chapter1_after_school_intro
@scene classroom_evening fade
@bgm evening_piano.mp3
@se school_bell.mp3
> $chapter1.chapter1_after_school_intro.r001
@show sakura left happy fade_in
sakura: $chapter1.chapter1_after_school_intro.r002
player: $chapter1.chapter1_after_school_intro.r003
sakura: $chapter1.chapter1_after_school_intro.r004
> $chapter1.chapter1_after_school_intro.r005
sakura: $chapter1.chapter1_after_school_intro.r006
player: $chapter1.chapter1_after_school_intro.r007
sakura: $chapter1.chapter1_after_school_intro.r008
@expr sakura no_light_eyes
> $chapter1.chapter1_after_school_intro.r009
player: $chapter1.chapter1_after_school_intro.r010
@expr sakura surprised
sakura: $chapter1.chapter1_after_school_intro.r011
player: $chapter1.chapter1_after_school_intro.r012
@expr sakura happy
sakura: $chapter1.chapter1_after_school_intro.r013
> $chapter1.chapter1_after_school_intro.r014
sakura: $chapter1.chapter1_after_school_intro.r015
player: $chapter1.chapter1_after_school_intro.r016
sakura: $chapter1.chapter1_after_school_intro.r017
@hide sakura slide_out_left
> $chapter1.chapter1_after_school_intro.r018
@jump chapter1_library_pass
# chapter1_library_pass
@scene corridor_evening fade
@bgm library_quiet.mp3
@se door_open.mp3
> $chapter1.chapter1_library_pass.r001
@scene library_evening fade
@show kotoha center normal fade_in
> $chapter1.chapter1_library_pass.r002
> $chapter1.chapter1_library_pass.r003
@se piano_single_note.mp3
@expr kotoha surprised
> $chapter1.chapter1_library_pass.r004
player: $chapter1.chapter1_library_pass.r005
kotoha: $chapter1.chapter1_library_pass.r006
> $chapter1.chapter1_library_pass.r007
player: $chapter1.chapter1_library_pass.r008
@expr kotoha normal
kotoha: $chapter1.chapter1_library_pass.r009
player: $chapter1.chapter1_library_pass.r010
kotoha: $chapter1.chapter1_library_pass.r011
> $chapter1.chapter1_library_pass.r012
@hide kotoha fade_out
@scene corridor_evening fade
> $chapter1.chapter1_library_pass.r013
@flag has_met_kotoha true
@jump chapter1_twilight_stairs
# chapter1_twilight_stairs
@scene staircase_evening fade
@bgm evening_piano.mp3
@show mahiru center normal fade_in
> $chapter1.chapter1_twilight_stairs.context001
mahiru: $chapter1.chapter1_twilight_stairs.r001
player: $chapter1.chapter1_twilight_stairs.r002
mahiru: $chapter1.chapter1_twilight_stairs.r003
> $chapter1.chapter1_twilight_stairs.r004
player: $chapter1.chapter1_twilight_stairs.r005
mahiru: $chapter1.chapter1_twilight_stairs.r006
player: $chapter1.chapter1_twilight_stairs.r007
mahiru: $chapter1.chapter1_twilight_stairs.r008
> $chapter1.chapter1_twilight_stairs.r009
player: $chapter1.chapter1_twilight_stairs.r010
mahiru: $chapter1.chapter1_twilight_stairs.r011
player: $chapter1.chapter1_twilight_stairs.r012
mahiru: $chapter1.chapter1_twilight_stairs.r013
player: $chapter1.chapter1_twilight_stairs.r014
mahiru: $chapter1.chapter1_twilight_stairs.r015
> $chapter1.chapter1_twilight_stairs.r016
mahiru: $chapter1.chapter1_twilight_stairs.r017
@hide mahiru slide_out_right
> $chapter1.chapter1_twilight_stairs.r018
@jump chapter1_last_classroom
# chapter1_last_classroom
@scene classroom_night fade
@bgm night_melody.mp3
> $chapter1.chapter1_last_classroom.r001
> $chapter1.chapter1_last_classroom.r002
@scene overcast_night fade
@bgm mystery_shadow.mp3
> $chapter1.chapter1_last_classroom.r003
@scene elementary_classroom_evening fade
@show shin_child center back fade_in
> $chapter1.chapter1_last_classroom.context001
shin_child: $chapter1.chapter1_last_classroom.r004
> $chapter1.chapter1_last_classroom.r005
@hide shin_child fade_out
@scene overcast_night fade
> $chapter1.chapter1_last_classroom.r006
> $chapter1.chapter1_last_classroom.r007
> $chapter1.chapter1_last_classroom.r008
player: $chapter1.chapter1_last_classroom.r009
> $chapter1.chapter1_last_classroom.r010
@bgm stop
@bgm opening_piano.mp3
> $chapter1.chapter1_last_classroom.r011
> $chapter1.chapter1_last_classroom.r012
@flag chapter1_complete true
@bgm stop
@end "$chapter1.chapter1_last_classroom.r013" -> chapter2_start
