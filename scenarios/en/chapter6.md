// 放課後のステラ — Chapter 6「それぞれの放課後」
# chapter6_start
@scene commute_road_summer fade
@bgm sunday_afternoon.mp3
@se semi.mp3
> $chapter6.chapter6_start.r001
> $chapter6.chapter6_start.r002
> $chapter6.chapter6_start.r003
> $chapter6.chapter6_start.r004
@jump chapter6_sakura_gym
# chapter6_sakura_gym
@scene gymnasium fade
@bgm energetic_light.mp3
@se badminton_match.mp3
> $chapter6.chapter6_sakura_gym.r001
> $chapter6.chapter6_sakura_gym.r002
@show badminton_member_a left normal pop_in
badminton_member_a: $chapter6.chapter6_sakura_gym.r003
player: $chapter6.chapter6_sakura_gym.r004
@show badminton_member_b right normal pop_in
badminton_member_b: $chapter6.chapter6_sakura_gym.r005
player: $chapter6.chapter6_sakura_gym.r006
badminton_member_a: $chapter6.chapter6_sakura_gym.r007
@hide_all fade_out
@show sakura_sports center serious fade_in
> $chapter6.chapter6_sakura_gym.r008
sakura_sports: $chapter6.chapter6_sakura_gym.r009
@se shuttle_hit.mp3
> $chapter6.chapter6_sakura_gym.r010
@se point_whistle.mp3
@show badminton_member_a left cheer pop_in
badminton_member_a: $chapter6.chapter6_sakura_gym.r011
@show badminton_member_b right laugh pop_in
badminton_member_b: $chapter6.chapter6_sakura_gym.r012
> $chapter6.chapter6_sakura_gym.r013
@hide badminton_member_a fade_out
@hide badminton_member_b fade_out
@bgm stop
@se crowd_distant.mp3
> $chapter6.chapter6_sakura_gym.r014
@show badminton_member_a left normal fade_in
badminton_member_a: $chapter6.chapter6_sakura_gym.r015
sakura_sports: $chapter6.chapter6_sakura_gym.r016
@hide badminton_member_a fade_out
@move sakura_sports left
@show hashimoto right normal fade_in
hashimoto: $chapter6.chapter6_sakura_gym.r017
sakura_sports: $chapter6.chapter6_sakura_gym.r018
hashimoto: $chapter6.chapter6_sakura_gym.r019
> $chapter6.chapter6_sakura_gym.r020
hashimoto: $chapter6.chapter6_sakura_gym.r021
sakura_sports: $chapter6.chapter6_sakura_gym.r022
hashimoto: $chapter6.chapter6_sakura_gym.r023
sakura_sports: $chapter6.chapter6_sakura_gym.r024
@hide hashimoto fade_out
> $chapter6.chapter6_sakura_gym.r025
@hide sakura_sports fade_out
@scene gymnasium_back fade
@bgm quiet_piano_distant.mp3
@show sakura_sports center normal fade_in
@still sakura_after_match
> $chapter6.chapter6_sakura_gym.r026
> $chapter6.chapter6_sakura_gym.r027
@choice
- $chapter6.chapter6_sakura_gym.r028 [sakura_favor+5] -> chapter6_sakura_talk
- $chapter6.chapter6_sakura_gym.r029 -> chapter6_sakura_skip
# chapter6_sakura_talk
@still_hide
player: $chapter6.chapter6_sakura_talk.r001
sakura_sports: $chapter6.chapter6_sakura_talk.r002
player: $chapter6.chapter6_sakura_talk.r003
@expr sakura_sports happy
sakura_sports: $chapter6.chapter6_sakura_talk.r004
player: $chapter6.chapter6_sakura_talk.r005
sakura_sports: $chapter6.chapter6_sakura_talk.r006
> $chapter6.chapter6_sakura_talk.r007
player: $chapter6.chapter6_sakura_talk.r008
@expr sakura_sports normal
sakura_sports: $chapter6.chapter6_sakura_talk.r009
player: $chapter6.chapter6_sakura_talk.r010
sakura_sports: $chapter6.chapter6_sakura_talk.r011
player: $chapter6.chapter6_sakura_talk.r012
sakura_sports: $chapter6.chapter6_sakura_talk.r013
> $chapter6.chapter6_sakura_talk.r014
player: $chapter6.chapter6_sakura_talk.r015
sakura_sports: $chapter6.chapter6_sakura_talk.r016
player: $chapter6.chapter6_sakura_talk.r017
> $chapter6.chapter6_sakura_talk.r018
sakura_sports: $chapter6.chapter6_sakura_talk.r019
player: $chapter6.chapter6_sakura_talk.r020
sakura_sports: $chapter6.chapter6_sakura_talk.r021
> $chapter6.chapter6_sakura_talk.r022
player: $chapter6.chapter6_sakura_talk.r023
sakura_sports: $chapter6.chapter6_sakura_talk.r024
player: $chapter6.chapter6_sakura_talk.r025
sakura_sports: $chapter6.chapter6_sakura_talk.r026
player: $chapter6.chapter6_sakura_talk.r027
sakura_sports: $chapter6.chapter6_sakura_talk.r028
player: $chapter6.chapter6_sakura_talk.r029
sakura_sports: $chapter6.chapter6_sakura_talk.r030
player: $chapter6.chapter6_sakura_talk.r031
sakura_sports: $chapter6.chapter6_sakura_talk.r032
> $chapter6.chapter6_sakura_talk.r033
sakura_sports: $chapter6.chapter6_sakura_talk.r034
@hide sakura_sports fade_out
> $chapter6.chapter6_sakura_talk.r035
@jump chapter6_kotoha_piano
# chapter6_sakura_skip
@still_hide
> $chapter6.chapter6_sakura_skip.r001
> $chapter6.chapter6_sakura_skip.r002
@hide sakura_sports fade_out
@jump chapter6_kotoha_piano
# chapter6_kotoha_piano
@scene commute_road_summer fade
@bgm town_afternoon.mp3
@se shopping_street_ambient.mp3
> $chapter6.chapter6_kotoha_piano.r001
@show nobuhara_private right normal pop_in
nobuhara_private: $chapter6.chapter6_kotoha_piano.r002
> $chapter6.chapter6_kotoha_piano.r003
player: $chapter6.chapter6_kotoha_piano.r004
nobuhara_private: $chapter6.chapter6_kotoha_piano.r005
player: $chapter6.chapter6_kotoha_piano.r006
nobuhara_private: $chapter6.chapter6_kotoha_piano.r007
> $chapter6.chapter6_kotoha_piano.r008
nobuhara_private: $chapter6.chapter6_kotoha_piano.r009
player: $chapter6.chapter6_kotoha_piano.r010
nobuhara_private: $chapter6.chapter6_kotoha_piano.r011
@hide nobuhara_private fade_out
@scene street_plaza_summer fade
> $chapter6.chapter6_kotoha_piano.r012
> $chapter6.chapter6_kotoha_piano.r013
@show kotoha center normal fade_in
@still kotoha_street_piano
> $chapter6.chapter6_kotoha_piano.r014
> $chapter6.chapter6_kotoha_piano.r015
@choice
- $chapter6.chapter6_kotoha_piano.r016 [kotoha_favor+5] -> chapter6_kotoha_talk
- $chapter6.chapter6_kotoha_piano.r017 -> chapter6_kotoha_skip
# chapter6_kotoha_talk
@still_hide
player: $chapter6.chapter6_kotoha_talk.r001
> $chapter6.chapter6_kotoha_talk.r002
kotoha: $chapter6.chapter6_kotoha_talk.r003
player: $chapter6.chapter6_kotoha_talk.r004
kotoha: $chapter6.chapter6_kotoha_talk.r005
player: $chapter6.chapter6_kotoha_talk.r006
kotoha: $chapter6.chapter6_kotoha_talk.r007
> $chapter6.chapter6_kotoha_talk.r008
player: $chapter6.chapter6_kotoha_talk.r009
kotoha: $chapter6.chapter6_kotoha_talk.r010
player: $chapter6.chapter6_kotoha_talk.r011
kotoha: $chapter6.chapter6_kotoha_talk.r012
> $chapter6.chapter6_kotoha_talk.r013
player: $chapter6.chapter6_kotoha_talk.r014
kotoha: $chapter6.chapter6_kotoha_talk.r015
player: $chapter6.chapter6_kotoha_talk.r016
kotoha: $chapter6.chapter6_kotoha_talk.r017
> $chapter6.chapter6_kotoha_talk.r018
kotoha: $chapter6.chapter6_kotoha_talk.r019
player: $chapter6.chapter6_kotoha_talk.r020
kotoha: $chapter6.chapter6_kotoha_talk.r021
player: $chapter6.chapter6_kotoha_talk.r022
> $chapter6.chapter6_kotoha_talk.r023
> $chapter6.chapter6_kotoha_talk.r024
@hide kotoha fade_out
@jump chapter6_mahiru_river
# chapter6_kotoha_skip
@still_hide
> $chapter6.chapter6_kotoha_skip.r001
> $chapter6.chapter6_kotoha_skip.r002
@hide kotoha fade_out
@jump chapter6_mahiru_river
# chapter6_mahiru_river
@scene riverbank_evening fade
@bgm river_wind.mp3
@se river_flow.mp3
> $chapter6.chapter6_mahiru_river.r001
@show mahiru_private center normal fade_in
mahiru: $chapter6.chapter6_mahiru_river.r002
player: $chapter6.chapter6_mahiru_river.r003
mahiru: $chapter6.chapter6_mahiru_river.r004
player: $chapter6.chapter6_mahiru_river.r005
> $chapter6.chapter6_mahiru_river.r006
@still mahiru_riverbank
> $chapter6.chapter6_mahiru_river.r007
@choice
- $chapter6.chapter6_mahiru_river.r008 [mahiru_favor+5] -> chapter6_mahiru_talk
- $chapter6.chapter6_mahiru_river.r009 -> chapter6_mahiru_skip
# chapter6_mahiru_talk
@still_hide
> $chapter6.chapter6_mahiru_talk.r001
mahiru: $chapter6.chapter6_mahiru_talk.r002
player: $chapter6.chapter6_mahiru_talk.r003
mahiru: $chapter6.chapter6_mahiru_talk.r004
> $chapter6.chapter6_mahiru_talk.r005
player: $chapter6.chapter6_mahiru_talk.r006
mahiru: $chapter6.chapter6_mahiru_talk.r007
player: $chapter6.chapter6_mahiru_talk.r008
mahiru: $chapter6.chapter6_mahiru_talk.r009
> $chapter6.chapter6_mahiru_talk.r010
player: $chapter6.chapter6_mahiru_talk.r011
mahiru: $chapter6.chapter6_mahiru_talk.r012
player: $chapter6.chapter6_mahiru_talk.r013
> $chapter6.chapter6_mahiru_talk.r014
mahiru: $chapter6.chapter6_mahiru_talk.r015
player: $chapter6.chapter6_mahiru_talk.r016
mahiru: $chapter6.chapter6_mahiru_talk.r017
> $chapter6.chapter6_mahiru_talk.r018
@se camera_film_shutter.mp3
mahiru: $chapter6.chapter6_mahiru_talk.r019
player: $chapter6.chapter6_mahiru_talk.r020
mahiru: $chapter6.chapter6_mahiru_talk.r021
> $chapter6.chapter6_mahiru_talk.r022
mahiru: $chapter6.chapter6_mahiru_talk.r023
player: $chapter6.chapter6_mahiru_talk.r024
@se camera_film_shutter.mp3
player: $chapter6.chapter6_mahiru_talk.r025
mahiru: $chapter6.chapter6_mahiru_talk.r026
player: $chapter6.chapter6_mahiru_talk.r027
> $chapter6.chapter6_mahiru_talk.r028
@hide mahiru_private fade_out
@jump chapter6_evening_walk
# chapter6_mahiru_skip
@still_hide
> $chapter6.chapter6_mahiru_skip.r001
> $chapter6.chapter6_mahiru_skip.r002
mahiru: $chapter6.chapter6_mahiru_skip.r003
player: $chapter6.chapter6_mahiru_skip.r004
mahiru: $chapter6.chapter6_mahiru_skip.r005
@hide mahiru_private fade_out
@jump chapter6_evening_walk
# chapter6_evening_walk
@scene commute_road_summer_evening fade
@bgm evening_gentle.mp3
@se evening_wind.mp3
@show mahiru_private right normal fade_in
> $chapter6.chapter6_evening_walk.context001
@still evening_walk_private
> $chapter6.chapter6_evening_walk.r001
@still_hide
mahiru: $chapter6.chapter6_evening_walk.r002
player: $chapter6.chapter6_evening_walk.r003
mahiru: $chapter6.chapter6_evening_walk.r004
player: $chapter6.chapter6_evening_walk.r005
mahiru: $chapter6.chapter6_evening_walk.r006
> $chapter6.chapter6_evening_walk.r007
player: $chapter6.chapter6_evening_walk.r008
mahiru: $chapter6.chapter6_evening_walk.r009
player: $chapter6.chapter6_evening_walk.r010
mahiru: $chapter6.chapter6_evening_walk.r011
player: $chapter6.chapter6_evening_walk.r012
mahiru: $chapter6.chapter6_evening_walk.r013
player: $chapter6.chapter6_evening_walk.r014
mahiru: $chapter6.chapter6_evening_walk.r015
player: $chapter6.chapter6_evening_walk.r016
> $chapter6.chapter6_evening_walk.r017
mahiru: $chapter6.chapter6_evening_walk.r018
player: $chapter6.chapter6_evening_walk.r019
mahiru: $chapter6.chapter6_evening_walk.r020
> $chapter6.chapter6_evening_walk.r021
mahiru: $chapter6.chapter6_evening_walk.r022
player: $chapter6.chapter6_evening_walk.r023
mahiru: $chapter6.chapter6_evening_walk.r024
> $chapter6.chapter6_evening_walk.r025
@hide mahiru_private fade_out
@jump chapter6_end
# chapter6_end
@scene commute_road_summer_evening fade
@bgm evening_gentle.mp3
> $chapter6.chapter6_end.r001
> $chapter6.chapter6_end.r002
> $chapter6.chapter6_end.r003
@scene protagonist_room_night fade
@bgm night_melody.mp3
> $chapter6.chapter6_end.r004
player: $chapter6.chapter6_end.r005
> $chapter6.chapter6_end.r006
@end "$chapter6.chapter6_end.r007" -> chapter7_start
