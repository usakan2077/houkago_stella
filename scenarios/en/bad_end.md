// 共通 Bad End
# bad_end_start
@scene corridor_festival_rainy fade
@bgm school_festival.mp3
> $bad_end.bad_end_start.r001
> $bad_end.bad_end_start.r002
@show sakura center happy fade_in
sakura: $bad_end.bad_end_start.r003
player: $bad_end.bad_end_start.r004
sakura: $bad_end.bad_end_start.r005
> $bad_end.bad_end_start.r006
> $bad_end.bad_end_start.r007
@hide sakura fade_out
@jump bad_end_festival_kotoha
# bad_end_festival_kotoha
@scene corridor_festival_rainy fade
> $bad_end.bad_end_festival_kotoha.r001
kotoha（OFF）: $bad_end.bad_end_festival_kotoha.r002
> $bad_end.bad_end_festival_kotoha.r003
> $bad_end.bad_end_festival_kotoha.r004
> $bad_end.bad_end_festival_kotoha.r005
@jump bad_end_festival_mahiru
# bad_end_festival_mahiru
@scene staircase_rainy fade
> $bad_end.bad_end_festival_mahiru.r001
@scene rooftop_rainy instant
@show mahiru center normal fade_in
> $bad_end.bad_end_festival_mahiru.r002
mahiru: $bad_end.bad_end_festival_mahiru.r003
player: $bad_end.bad_end_festival_mahiru.r004
mahiru: $bad_end.bad_end_festival_mahiru.r005
> $bad_end.bad_end_festival_mahiru.r006
@hide mahiru fade_out
@scene staircase_rainy instant
> $bad_end.bad_end_festival_mahiru.r007
@jump bad_end_after
# bad_end_after
@scene classroom_night fade
@bgm bad_end_loop.mp3
> $bad_end.bad_end_after.r001
> $bad_end.bad_end_after.r002
> $bad_end.bad_end_after.r003
> $bad_end.bad_end_after.r004
@jump bad_end_sakura_fragment
# bad_end_sakura_fragment
@scene classroom fade
@show sakura center happy fade_in
> $bad_end.bad_end_sakura_fragment.r001
sakura: $bad_end.bad_end_sakura_fragment.r002
player: $bad_end.bad_end_sakura_fragment.r003
sakura: $bad_end.bad_end_sakura_fragment.r004
> $bad_end.bad_end_sakura_fragment.r005
player: $bad_end.bad_end_sakura_fragment.r006
sakura: $bad_end.bad_end_sakura_fragment.r007
> $bad_end.bad_end_sakura_fragment.r008
@hide sakura fade_out
@jump bad_end_kotoha_fragment
# bad_end_kotoha_fragment
@scene library_evening fade
@show kotoha center normal fade_in
> $bad_end.bad_end_kotoha_fragment.context001
> $bad_end.bad_end_kotoha_fragment.r001
> $bad_end.bad_end_kotoha_fragment.r002
kotoha: $bad_end.bad_end_kotoha_fragment.r003
player: $bad_end.bad_end_kotoha_fragment.r004
> $bad_end.bad_end_kotoha_fragment.r005
> $bad_end.bad_end_kotoha_fragment.r006
kotoha: $bad_end.bad_end_kotoha_fragment.r007
player: $bad_end.bad_end_kotoha_fragment.r008
> $bad_end.bad_end_kotoha_fragment.r009
@hide kotoha fade_out
@jump bad_end_mahiru_fragment
# bad_end_mahiru_fragment
@scene corridor fade
> $bad_end.bad_end_mahiru_fragment.context001
> $bad_end.bad_end_mahiru_fragment.r001
> $bad_end.bad_end_mahiru_fragment.r002
> $bad_end.bad_end_mahiru_fragment.r003
player: $bad_end.bad_end_mahiru_fragment.r004
> $bad_end.bad_end_mahiru_fragment.r005
> $bad_end.bad_end_mahiru_fragment.r006
> $bad_end.bad_end_mahiru_fragment.r007
@jump bad_end_classroom
# bad_end_classroom
@scene classroom_night fade
@bgm bad_end_loop.mp3
@still bad_end_empty_classroom
> $bad_end.bad_end_classroom.r001
> $bad_end.bad_end_classroom.r002
@still_hide
@jump bad_end_window
# bad_end_window
@scene overcast_night fade
@still night_sky_no_stars
> $bad_end.bad_end_window.r001
@se heartbeat.mp3
> $bad_end.bad_end_window.r002
@still_hide
@jump bad_end_monologue
# bad_end_monologue
@scene classroom_night fade
@bgm bad_end_loop.mp3
> $bad_end.bad_end_monologue.context001
> $bad_end.bad_end_monologue.r001
> $bad_end.bad_end_monologue.r002
> $bad_end.bad_end_monologue.r003
@se heartbeat.mp3
player: $bad_end.bad_end_monologue.r004
> $bad_end.bad_end_monologue.r005
> $bad_end.bad_end_monologue.r006
@jump bad_end_ending
# bad_end_ending
@scene overcast_night fade
> $bad_end.bad_end_ending.r001
player: $bad_end.bad_end_ending.r002
> $bad_end.bad_end_ending.r003
> $bad_end.bad_end_ending.r004
@bgm stop
@credits bad_end_loop.mp3
@end "$bad_end.bad_end_ending.r005"
