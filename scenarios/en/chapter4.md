// 放課後のステラ — Chapter 4「理由を集める日々」
# chapter4_start
@scene classroom_rainy fade
@bgm tension_rain.mp3
@se rain_window.mp3
> $chapter4.chapter4_start.r001
@show sakura right happy fade_in
@show kotoha left normal fade_in
sakura: $chapter4.chapter4_start.r002
player: $chapter4.chapter4_start.r003
sakura: $chapter4.chapter4_start.r004
kotoha: $chapter4.chapter4_start.r005
sakura: $chapter4.chapter4_start.r006
player: $chapter4.chapter4_start.r007
sakura: $chapter4.chapter4_start.r008
> $chapter4.chapter4_start.r009
player: $chapter4.chapter4_start.r010
sakura: $chapter4.chapter4_start.r011
player: $chapter4.chapter4_start.r012
kotoha: $chapter4.chapter4_start.r013
player: $chapter4.chapter4_start.r014
sakura: $chapter4.chapter4_start.r015
player: $chapter4.chapter4_start.r016
sakura: $chapter4.chapter4_start.r017
kotoha: $chapter4.chapter4_start.r018
> $chapter4.chapter4_start.r019
sakura: $chapter4.chapter4_start.r020
player: $chapter4.chapter4_start.r021
> $chapter4.chapter4_start.r022
@hide_all fade_out
@jump chapter4_mahiru_corridor
# chapter4_mahiru_corridor
@scene corridor_rainy fade
@bgm daily_life.mp3
@se rain_window.mp3 loop
> $chapter4.chapter4_mahiru_corridor.r001
@show mahiru center normal fade_in
mahiru: $chapter4.chapter4_mahiru_corridor.r002
player: $chapter4.chapter4_mahiru_corridor.r003
mahiru: $chapter4.chapter4_mahiru_corridor.r004
player: $chapter4.chapter4_mahiru_corridor.r005
mahiru: $chapter4.chapter4_mahiru_corridor.r006
> $chapter4.chapter4_mahiru_corridor.r007
player: $chapter4.chapter4_mahiru_corridor.r008
mahiru: $chapter4.chapter4_mahiru_corridor.r009
player: $chapter4.chapter4_mahiru_corridor.r010
mahiru: $chapter4.chapter4_mahiru_corridor.r011
player: $chapter4.chapter4_mahiru_corridor.r012
mahiru: $chapter4.chapter4_mahiru_corridor.r013
> $chapter4.chapter4_mahiru_corridor.r014
mahiru: $chapter4.chapter4_mahiru_corridor.r015
player: $chapter4.chapter4_mahiru_corridor.r016
mahiru: $chapter4.chapter4_mahiru_corridor.r017
player: $chapter4.chapter4_mahiru_corridor.r018
mahiru: $chapter4.chapter4_mahiru_corridor.r019
player: $chapter4.chapter4_mahiru_corridor.r020
mahiru: $chapter4.chapter4_mahiru_corridor.r021
> $chapter4.chapter4_mahiru_corridor.r022
player: $chapter4.chapter4_mahiru_corridor.r023
mahiru: $chapter4.chapter4_mahiru_corridor.r024
@hide mahiru fade_out
@jump chapter4_music_room
# chapter4_music_room
@scene corridor_evening fade
@bgm stop
@bgm piano_distant.mp3 noloop
> $chapter4.chapter4_music_room.r001
@show kotoha center normal fade_in
player: $chapter4.chapter4_music_room.r002
kotoha: $chapter4.chapter4_music_room.r003
> $chapter4.chapter4_music_room.r004
player: $chapter4.chapter4_music_room.r005
kotoha: $chapter4.chapter4_music_room.r006
player: $chapter4.chapter4_music_room.r007
kotoha: $chapter4.chapter4_music_room.r008
> $chapter4.chapter4_music_room.r009
player: $chapter4.chapter4_music_room.r010
kotoha: $chapter4.chapter4_music_room.r011
player: $chapter4.chapter4_music_room.r012
kotoha: $chapter4.chapter4_music_room.r013
@expr kotoha thinking
kotoha: $chapter4.chapter4_music_room.r014
player: $chapter4.chapter4_music_room.r015
kotoha: $chapter4.chapter4_music_room.r016
> $chapter4.chapter4_music_room.r017
kotoha: $chapter4.chapter4_music_room.r018
player: $chapter4.chapter4_music_room.r019
kotoha: $chapter4.chapter4_music_room.r020
> $chapter4.chapter4_music_room.r021
kotoha: $chapter4.chapter4_music_room.r022
player: $chapter4.chapter4_music_room.r023
kotoha: $chapter4.chapter4_music_room.r024
> $chapter4.chapter4_music_room.r025
@hide kotoha fade_out
@jump chapter4_corridor
# chapter4_corridor
@scene corridor_evening fade
@bgm evening_piano.mp3
> $chapter4.chapter4_corridor.r001
> $chapter4.chapter4_corridor.r002
@show mahiru center normal fade_in
mahiru: $chapter4.chapter4_corridor.r003
player: $chapter4.chapter4_corridor.r004
@expr mahiru surprised
mahiru: $chapter4.chapter4_corridor.r005
> $chapter4.chapter4_corridor.r006
@se notebook_open.mp3
@still mahiru_notebook_drop
> $chapter4.chapter4_corridor.r007
@still_hide
player: $chapter4.chapter4_corridor.r008
mahiru: $chapter4.chapter4_corridor.r009
> $chapter4.chapter4_corridor.r010
player: $chapter4.chapter4_corridor.r011
mahiru: $chapter4.chapter4_corridor.r012
player: $chapter4.chapter4_corridor.r013
mahiru: $chapter4.chapter4_corridor.r014
player: $chapter4.chapter4_corridor.r015
mahiru: $chapter4.chapter4_corridor.r016
> $chapter4.chapter4_corridor.r017
@choice
- $chapter4.chapter4_corridor.r018 [mahiru_favor+5] -> chapter4_corridor_talk
- $chapter4.chapter4_corridor.r019 -> chapter4_corridor_end
# chapter4_corridor_talk
player: $chapter4.chapter4_corridor_talk.r001
@expr mahiru thinking
mahiru: $chapter4.chapter4_corridor_talk.r002
player: $chapter4.chapter4_corridor_talk.r003
mahiru: $chapter4.chapter4_corridor_talk.r004
player: $chapter4.chapter4_corridor_talk.r005
mahiru: $chapter4.chapter4_corridor_talk.r006
player: $chapter4.chapter4_corridor_talk.r007
mahiru: $chapter4.chapter4_corridor_talk.r008
> $chapter4.chapter4_corridor_talk.r009
mahiru: $chapter4.chapter4_corridor_talk.r010
player: $chapter4.chapter4_corridor_talk.r011
mahiru: $chapter4.chapter4_corridor_talk.r012
player: $chapter4.chapter4_corridor_talk.r013
mahiru: $chapter4.chapter4_corridor_talk.r014
> $chapter4.chapter4_corridor_talk.r015
player: $chapter4.chapter4_corridor_talk.r016
mahiru: $chapter4.chapter4_corridor_talk.r017
@jump chapter4_corridor_end
# chapter4_corridor_end
@expr mahiru normal
mahiru: $chapter4.chapter4_corridor_end.r001
player: $chapter4.chapter4_corridor_end.r002
mahiru: $chapter4.chapter4_corridor_end.r003
player: $chapter4.chapter4_corridor_end.r004
mahiru: $chapter4.chapter4_corridor_end.r005
> $chapter4.chapter4_corridor_end.r006
player: $chapter4.chapter4_corridor_end.r007
@expr mahiru surprised
mahiru: $chapter4.chapter4_corridor_end.r008
player: $chapter4.chapter4_corridor_end.r009
@expr mahiru shy
mahiru: $chapter4.chapter4_corridor_end.r010
player: $chapter4.chapter4_corridor_end.r011
mahiru: $chapter4.chapter4_corridor_end.r012
> $chapter4.chapter4_corridor_end.r013
mahiru: $chapter4.chapter4_corridor_end.r014
@hide mahiru fade_out
> $chapter4.chapter4_corridor_end.r015
@jump chapter4_walk
# chapter4_walk
@scene school_gate_june_rainy fade
@bgm evening_piano.mp3
@se rain_window.mp3 loop
@show mahiru center happy fade_in
> $chapter4.chapter4_walk.context001
mahiru: $chapter4.chapter4_walk.r001
player: $chapter4.chapter4_walk.r002
mahiru: $chapter4.chapter4_walk.r003
@se stop
@scene commute_road_june_evening fade
@still evening_walk_two
> $chapter4.chapter4_walk.r004
@still_hide
mahiru: $chapter4.chapter4_walk.r005
player: $chapter4.chapter4_walk.r006
mahiru: $chapter4.chapter4_walk.r007
player: $chapter4.chapter4_walk.r008
mahiru: $chapter4.chapter4_walk.r009
player: $chapter4.chapter4_walk.r010
mahiru: $chapter4.chapter4_walk.r011
> $chapter4.chapter4_walk.r012
player: $chapter4.chapter4_walk.r013
mahiru: $chapter4.chapter4_walk.r014
> $chapter4.chapter4_walk.r015
mahiru: $chapter4.chapter4_walk.r016
player: $chapter4.chapter4_walk.r017
mahiru: $chapter4.chapter4_walk.r018
> $chapter4.chapter4_walk.r019
mahiru: $chapter4.chapter4_walk.r020
player: $chapter4.chapter4_walk.r021
mahiru: $chapter4.chapter4_walk.r022
> $chapter4.chapter4_walk.r023
@hide mahiru fade_out
@jump chapter4_end
# chapter4_end
@scene commute_road_june_evening fade
@bgm mystery_shadow.mp3
> $chapter4.chapter4_end.r001
@still shin_flashback flashback_pan
> $chapter4.chapter4_end.r002
shin_child: $chapter4.chapter4_end.r003
player: $chapter4.chapter4_end.r004
shin_child: $chapter4.chapter4_end.r005
> $chapter4.chapter4_end.r006
shin_child: $chapter4.chapter4_end.r007
> $chapter4.chapter4_end.r008
@still_hide
@scene commute_road_june_evening fade
> $chapter4.chapter4_end.r009
> $chapter4.chapter4_end.r010
> $chapter4.chapter4_end.r011
@bgm stop
@end "$chapter4.chapter4_end.r012" -> chapter5_start
