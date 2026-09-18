// 放課後のステラ — さくらルート
# sakura_interlude
@window_color sakura
@scene classroom_night fade
@bgm night_melody.mp3
> $route_sakura.sakura_interlude.r001
sakura: $route_sakura.sakura_interlude.r002
> $route_sakura.sakura_interlude.r003
> $route_sakura.sakura_interlude.r004
sakura: $route_sakura.sakura_interlude.r005
> $route_sakura.sakura_interlude.r006
> $route_sakura.sakura_interlude.r007
> $route_sakura.sakura_interlude.r008
sakura: $route_sakura.sakura_interlude.r009
> $route_sakura.sakura_interlude.r010
@bgm stop
@window_color reset
@jump sakura_ch9_start
# sakura_ch9_start
@scene school_gate_autumn_rainy fade
@bgm sakura_theme.mp3
@se footsteps.mp3
> $route_sakura.sakura_ch9_start.r001
> $route_sakura.sakura_ch9_start.r002
@show sakura center normal fade_in
player: $route_sakura.sakura_ch9_start.r003
sakura: $route_sakura.sakura_ch9_start.r004
player: $route_sakura.sakura_ch9_start.r005
sakura: $route_sakura.sakura_ch9_start.r006
player: $route_sakura.sakura_ch9_start.r007
> $route_sakura.sakura_ch9_start.r008
player: $route_sakura.sakura_ch9_start.r009
> $route_sakura.sakura_ch9_start.r010
sakura: $route_sakura.sakura_ch9_start.r011
player: $route_sakura.sakura_ch9_start.r012
sakura: $route_sakura.sakura_ch9_start.r013
> $route_sakura.sakura_ch9_start.r014
@hide sakura fade_out
@bgm stop
@jump sakura_ch9_days
# sakura_ch9_days
@scene classroom_evening fade
@bgm daily_life.mp3
@se school_bell.mp3
> $route_sakura.sakura_ch9_days.r001
> $route_sakura.sakura_ch9_days.r002
@show sakura right happy fade_in
sakura: $route_sakura.sakura_ch9_days.r003
player: $route_sakura.sakura_ch9_days.r004
sakura: $route_sakura.sakura_ch9_days.r005
player: $route_sakura.sakura_ch9_days.r006
sakura: $route_sakura.sakura_ch9_days.r007
> $route_sakura.sakura_ch9_days.r008
player: $route_sakura.sakura_ch9_days.r009
sakura: $route_sakura.sakura_ch9_days.r010
player: $route_sakura.sakura_ch9_days.r011
sakura: $route_sakura.sakura_ch9_days.r012
> $route_sakura.sakura_ch9_days.r013
@hide sakura fade_out
@jump sakura_ch9_daily_life
# sakura_ch9_daily_life
@scene classroom fade
@bgm daily_life.mp3
> $route_sakura.sakura_ch9_daily_life.r001
@show sakura left happy fade_in
sakura: $route_sakura.sakura_ch9_daily_life.r002
player: $route_sakura.sakura_ch9_daily_life.r003
sakura: $route_sakura.sakura_ch9_daily_life.r004
player: $route_sakura.sakura_ch9_daily_life.r005
sakura: $route_sakura.sakura_ch9_daily_life.r006
player: $route_sakura.sakura_ch9_daily_life.r007
sakura: $route_sakura.sakura_ch9_daily_life.r008
> $route_sakura.sakura_ch9_daily_life.r009
player: $route_sakura.sakura_ch9_daily_life.r010
sakura: $route_sakura.sakura_ch9_daily_life.r011
> $route_sakura.sakura_ch9_daily_life.r012
@hide sakura fade_out
@jump sakura_ch9_daily2
# sakura_ch9_daily2
@scene cafeteria fade
@bgm daily_life.mp3
@show sakura center happy fade_in
> $route_sakura.sakura_ch9_daily2.r001
sakura: $route_sakura.sakura_ch9_daily2.r002
player: $route_sakura.sakura_ch9_daily2.r003
sakura: $route_sakura.sakura_ch9_daily2.r004
player: $route_sakura.sakura_ch9_daily2.r005
sakura: $route_sakura.sakura_ch9_daily2.r006
> $route_sakura.sakura_ch9_daily2.r007
sakura: $route_sakura.sakura_ch9_daily2.r008
player: $route_sakura.sakura_ch9_daily2.r009
sakura: $route_sakura.sakura_ch9_daily2.r010
player: $route_sakura.sakura_ch9_daily2.r011
sakura: $route_sakura.sakura_ch9_daily2.r012
player: $route_sakura.sakura_ch9_daily2.r013
sakura: $route_sakura.sakura_ch9_daily2.r014
player: $route_sakura.sakura_ch9_daily2.r015
sakura: $route_sakura.sakura_ch9_daily2.r016
> $route_sakura.sakura_ch9_daily2.r017
sakura: $route_sakura.sakura_ch9_daily2.r018
@hide sakura fade_out
@jump sakura_ch9_gym
# sakura_ch9_gym
@scene gymnasium fade
@bgm daily_life.mp3
@show sakura_sports left happy fade_in
> $route_sakura.sakura_ch9_gym.r001
sakura: $route_sakura.sakura_ch9_gym.r002
> $route_sakura.sakura_ch9_gym.r003
sakura: $route_sakura.sakura_ch9_gym.r004
> $route_sakura.sakura_ch9_gym.r005
sakura: $route_sakura.sakura_ch9_gym.r006
> $route_sakura.sakura_ch9_gym.r007
> $route_sakura.sakura_ch9_gym.r008
player: $route_sakura.sakura_ch9_gym.r009
sakura: $route_sakura.sakura_ch9_gym.r010
> $route_sakura.sakura_ch9_gym.r011
sakura: $route_sakura.sakura_ch9_gym.r012
@hide sakura_sports fade_out
@jump sakura_ch9_walk
# sakura_ch9_walk
@scene gymnasium_back_school fade
@bgm evening_piano.mp3
@show sakura_sports right normal fade_in
> $route_sakura.sakura_ch9_walk.context001
sakura: $route_sakura.sakura_ch9_walk.r001
player: $route_sakura.sakura_ch9_walk.r002
sakura: $route_sakura.sakura_ch9_walk.r003
player: $route_sakura.sakura_ch9_walk.r004
sakura: $route_sakura.sakura_ch9_walk.r005
> $route_sakura.sakura_ch9_walk.r006
player: $route_sakura.sakura_ch9_walk.r007
sakura: $route_sakura.sakura_ch9_walk.r008
player: $route_sakura.sakura_ch9_walk.r009
sakura: $route_sakura.sakura_ch9_walk.r010
> $route_sakura.sakura_ch9_walk.r011
sakura: $route_sakura.sakura_ch9_walk.r012
player: $route_sakura.sakura_ch9_walk.r013
sakura: $route_sakura.sakura_ch9_walk.r014
@hide sakura_sports fade_out
@jump sakura_ch9_mother
# sakura_ch9_mother
@scene protagonist_room_night fade
@bgm night_melody.mp3
> $route_sakura.sakura_ch9_mother.r001
player: $route_sakura.sakura_ch9_mother.r002
> $route_sakura.sakura_ch9_mother.r003
> $route_sakura.sakura_ch9_mother.r004
@bgm stop
> $route_sakura.sakura_ch9_mother.r005
> $route_sakura.sakura_ch9_mother.r006
player: $route_sakura.sakura_ch9_mother.r007
> $route_sakura.sakura_ch9_mother.r008
> $route_sakura.sakura_ch9_mother.r009
@bgm night_melody.mp3
@jump sakura_ch9_daily3
# sakura_ch9_daily3
@scene classroom fade
@bgm daily_life.mp3
@show sakura right happy fade_in
> $route_sakura.sakura_ch9_daily3.r001
sakura: $route_sakura.sakura_ch9_daily3.r002
player: $route_sakura.sakura_ch9_daily3.r003
sakura: $route_sakura.sakura_ch9_daily3.r004
player: $route_sakura.sakura_ch9_daily3.r005
sakura: $route_sakura.sakura_ch9_daily3.r006
player: $route_sakura.sakura_ch9_daily3.r007
sakura: $route_sakura.sakura_ch9_daily3.r008
> $route_sakura.sakura_ch9_daily3.r009
player: $route_sakura.sakura_ch9_daily3.r010
sakura: $route_sakura.sakura_ch9_daily3.r011
player: $route_sakura.sakura_ch9_daily3.r012
@hide sakura fade_out
@jump sakura_ch9_choice
# sakura_ch9_choice
@scene commute_road_autumn_evening fade
@bgm sakura_theme.mp3
@show sakura right normal fade_in
> $route_sakura.sakura_ch9_choice.r001
sakura: $route_sakura.sakura_ch9_choice.r002
> $route_sakura.sakura_ch9_choice.r003
@choice
- $route_sakura.sakura_ch9_choice.r004 -> sakura_ch9_ask
- $route_sakura.sakura_ch9_choice.r005 -> sakura_ch9_silent
# sakura_ch9_ask
player: $route_sakura.sakura_ch9_ask.r001
sakura: $route_sakura.sakura_ch9_ask.r002
player: $route_sakura.sakura_ch9_ask.r003
sakura: $route_sakura.sakura_ch9_ask.r004
> $route_sakura.sakura_ch9_ask.r005
@jump sakura_ch9_end
# sakura_ch9_silent
> $route_sakura.sakura_ch9_silent.r001
sakura: $route_sakura.sakura_ch9_silent.r002
player: $route_sakura.sakura_ch9_silent.r003
sakura: $route_sakura.sakura_ch9_silent.r004
> $route_sakura.sakura_ch9_silent.r005
@jump sakura_ch9_end
# sakura_ch9_end
@scene commute_road_autumn_evening fade
@bgm evening_piano.mp3
> $route_sakura.sakura_ch9_end.context001
sakura: $route_sakura.sakura_ch9_end.r001
player: $route_sakura.sakura_ch9_end.r002
sakura: $route_sakura.sakura_ch9_end.r003
@hide sakura fade_out
> $route_sakura.sakura_ch9_end.r004
@bgm stop
@jump sakura_ch10_start
# sakura_ch10_start
@scene classroom fade
@bgm daily_life.mp3
@se school_bell.mp3
@show sakura right happy fade_in
> $route_sakura.sakura_ch10_start.context001
sakura: $route_sakura.sakura_ch10_start.r001
player: $route_sakura.sakura_ch10_start.r002
sakura: $route_sakura.sakura_ch10_start.r003
> $route_sakura.sakura_ch10_start.r004
sakura: $route_sakura.sakura_ch10_start.r005
player: $route_sakura.sakura_ch10_start.r006
sakura: $route_sakura.sakura_ch10_start.r007
@hide sakura fade_out
@jump sakura_ch10_message
# sakura_ch10_message
@scene protagonist_room_night fade
@bgm night_melody.mp3
> $route_sakura.sakura_ch10_message.r001
player: $route_sakura.sakura_ch10_message.r002
> $route_sakura.sakura_ch10_message.r003
> $route_sakura.sakura_ch10_message.r004
@bgm stop
> $route_sakura.sakura_ch10_message.r005
> $route_sakura.sakura_ch10_message.r006
> $route_sakura.sakura_ch10_message.r007
@bgm night_melody.mp3
@jump sakura_ch10_gym
# sakura_ch10_gym
@scene gymnasium fade
@bgm daily_life.mp3
@show sakura_sports center happy fade_in
> $route_sakura.sakura_ch10_gym.r001
sakura: $route_sakura.sakura_ch10_gym.r002
> $route_sakura.sakura_ch10_gym.r003
sakura: $route_sakura.sakura_ch10_gym.r004
> $route_sakura.sakura_ch10_gym.r005
sakura: $route_sakura.sakura_ch10_gym.r006
> $route_sakura.sakura_ch10_gym.r007
sakura: $route_sakura.sakura_ch10_gym.r008
> $route_sakura.sakura_ch10_gym.r009
sakura: $route_sakura.sakura_ch10_gym.r010
> $route_sakura.sakura_ch10_gym.r011
@hide sakura_sports fade_out
@jump sakura_ch10_after_practice
# sakura_ch10_after_practice
@scene gymnasium fade
@bgm daily_life.mp3
@show sakura_sports right normal fade_in
> $route_sakura.sakura_ch10_after_practice.r001
> $route_sakura.sakura_ch10_after_practice.r002
sakura: $route_sakura.sakura_ch10_after_practice.r003
player: $route_sakura.sakura_ch10_after_practice.r004
sakura: $route_sakura.sakura_ch10_after_practice.r005
> $route_sakura.sakura_ch10_after_practice.r006
@still sakura_crying_gym
> $route_sakura.sakura_ch10_after_practice.r007
@still_hide
@hide sakura_sports fade_out
@jump sakura_ch10_outside
# sakura_ch10_outside
@scene gymnasium_storage_room fade
@bgm sakura_theme.mp3
@se door_open.mp3
@show sakura_sports right normal fade_in
> $route_sakura.sakura_ch10_outside.context001
player: $route_sakura.sakura_ch10_outside.r001
sakura: $route_sakura.sakura_ch10_outside.r002
player: $route_sakura.sakura_ch10_outside.r003
> $route_sakura.sakura_ch10_outside.r004
sakura: $route_sakura.sakura_ch10_outside.r005
> $route_sakura.sakura_ch10_outside.r006
@bgm stop
@hide sakura_sports instant
@still sakura_cant_smile
sakura: $route_sakura.sakura_ch10_outside.r007
player: $route_sakura.sakura_ch10_outside.r008
sakura: $route_sakura.sakura_ch10_outside.r009
> $route_sakura.sakura_ch10_outside.r010
@still_hide
@show sakura_sports center crying fade_in
sakura: $route_sakura.sakura_ch10_outside.r011
player: $route_sakura.sakura_ch10_outside.r012
sakura: $route_sakura.sakura_ch10_outside.r013
> $route_sakura.sakura_ch10_outside.r014
sakura: $route_sakura.sakura_ch10_outside.r015
player: $route_sakura.sakura_ch10_outside.r016
sakura: $route_sakura.sakura_ch10_outside.r017
> $route_sakura.sakura_ch10_outside.r018
sakura: $route_sakura.sakura_ch10_outside.r019
> $route_sakura.sakura_ch10_outside.r020
@still sakura_embrace
@se heartbeat.mp3
@bgm sakura_breakdown.mp3
> $route_sakura.sakura_ch10_outside.r021
> $route_sakura.sakura_ch10_outside.r022
sakura: $route_sakura.sakura_ch10_outside.r023
> $route_sakura.sakura_ch10_outside.r024
@still_hide
@hide sakura_sports fade_out
@bgm evening_piano.mp3
> $route_sakura.sakura_ch10_outside.r025
@scene gymnasium_back fade
> $route_sakura.sakura_ch10_outside.r026
@jump sakura_ch10_walk
# sakura_ch10_walk
@scene school_gate_autumn_evening fade
@bgm evening_piano.mp3
@show sakura left normal fade_in
> $route_sakura.sakura_ch10_walk.context001
sakura: $route_sakura.sakura_ch10_walk.r001
player: $route_sakura.sakura_ch10_walk.r002
sakura: $route_sakura.sakura_ch10_walk.r003
player: $route_sakura.sakura_ch10_walk.r004
sakura: $route_sakura.sakura_ch10_walk.r005
> $route_sakura.sakura_ch10_walk.r006
sakura: $route_sakura.sakura_ch10_walk.r007
player: $route_sakura.sakura_ch10_walk.r008
sakura: $route_sakura.sakura_ch10_walk.r009
player: $route_sakura.sakura_ch10_walk.r010
> $route_sakura.sakura_ch10_walk.r011
sakura: $route_sakura.sakura_ch10_walk.r012
player: $route_sakura.sakura_ch10_walk.r013
sakura: $route_sakura.sakura_ch10_walk.r014
> $route_sakura.sakura_ch10_walk.r015
@hide sakura fade_out
@bgm stop
@jump sakura_ch11_start
# sakura_ch11_start
@scene protagonist_room_night fade
@bgm night_melody.mp3
> $route_sakura.sakura_ch11_start.r001
> $route_sakura.sakura_ch11_start.r002
> $route_sakura.sakura_ch11_start.r003
@scene corridor fade
> $route_sakura.sakura_ch11_start.r004
@bgm stop
@jump sakura_ch11_morning
# sakura_ch11_morning
@scene protagonist_room_morning fade
@bgm stop
@se chime_soft.mp3
> $route_sakura.sakura_ch11_morning.r001
@scene commute_road_autumn fade
> $route_sakura.sakura_ch11_morning.r002
> $route_sakura.sakura_ch11_morning.r003
@jump sakura_ch11_hospital
# sakura_ch11_hospital
@scene commute_road_autumn fade
@bgm stop
> $route_sakura.sakura_ch11_hospital.r001
@se footsteps.mp3
@show sakura left normal fade_in
sakura: $route_sakura.sakura_ch11_hospital.r002
player: $route_sakura.sakura_ch11_hospital.r003
sakura: $route_sakura.sakura_ch11_hospital.r004
player: $route_sakura.sakura_ch11_hospital.r005
sakura: $route_sakura.sakura_ch11_hospital.r006
> $route_sakura.sakura_ch11_hospital.r007
player: $route_sakura.sakura_ch11_hospital.r008
sakura: $route_sakura.sakura_ch11_hospital.r009
player: $route_sakura.sakura_ch11_hospital.r010
> $route_sakura.sakura_ch11_hospital.r011
sakura: $route_sakura.sakura_ch11_hospital.r012
player: $route_sakura.sakura_ch11_hospital.r013
sakura: $route_sakura.sakura_ch11_hospital.r014
> $route_sakura.sakura_ch11_hospital.r015
sakura: $route_sakura.sakura_ch11_hospital.r016
player: $route_sakura.sakura_ch11_hospital.r017
sakura: $route_sakura.sakura_ch11_hospital.r018
> $route_sakura.sakura_ch11_hospital.r019
sakura: $route_sakura.sakura_ch11_hospital.r020
sakura: $route_sakura.sakura_ch11_hospital.r021
> $route_sakura.sakura_ch11_hospital.r022
sakura: $route_sakura.sakura_ch11_hospital.r023
player: $route_sakura.sakura_ch11_hospital.r024
sakura: $route_sakura.sakura_ch11_hospital.r025
> $route_sakura.sakura_ch11_hospital.r026
sakura: $route_sakura.sakura_ch11_hospital.r027
player: $route_sakura.sakura_ch11_hospital.r028
@bgm sakura_breakdown.mp3
> $route_sakura.sakura_ch11_hospital.r029
sakura: $route_sakura.sakura_ch11_hospital.r030
player: $route_sakura.sakura_ch11_hospital.r031
sakura: $route_sakura.sakura_ch11_hospital.r032
> $route_sakura.sakura_ch11_hospital.r033
@hide sakura fade_out
@bgm stop
@jump sakura_ch12_start
# sakura_ch12_start
@scene commute_road_autumn fade
@bgm sakura_theme.mp3
> $route_sakura.sakura_ch12_start.r001
@show sakura center normal fade_in
sakura: $route_sakura.sakura_ch12_start.r002
> $route_sakura.sakura_ch12_start.r003
sakura: $route_sakura.sakura_ch12_start.r004
> $route_sakura.sakura_ch12_start.r005
@hide sakura fade_out
@jump sakura_ch12_branch
# sakura_ch12_branch
@scene corridor fade
@bgm daily_life.mp3
> $route_sakura.sakura_ch12_branch.r001
@choice
- $route_sakura.sakura_ch12_branch.r002 -> sakura_good_end
- $route_sakura.sakura_ch12_branch.r003 -> sakura_bad_end
# sakura_good_end
@scene classroom_evening fade
@bgm sakura_good_end.mp3
@show sakura right normal fade_in
> $route_sakura.sakura_good_end.context001
sakura: $route_sakura.sakura_good_end.r001
player: $route_sakura.sakura_good_end.r002
sakura: $route_sakura.sakura_good_end.r003
> $route_sakura.sakura_good_end.r004
sakura: $route_sakura.sakura_good_end.r005
player: $route_sakura.sakura_good_end.r006
sakura: $route_sakura.sakura_good_end.r007
player: $route_sakura.sakura_good_end.r008
sakura: $route_sakura.sakura_good_end.r009
player: $route_sakura.sakura_good_end.r010
@hide sakura fade_out
@jump sakura_good_end_daily
# sakura_good_end_daily
@scene corridor fade
@bgm sakura_good_end.mp3
@show sakura left normal fade_in
> $route_sakura.sakura_good_end_daily.context001
sakura: $route_sakura.sakura_good_end_daily.r001
player: $route_sakura.sakura_good_end_daily.r002
sakura: $route_sakura.sakura_good_end_daily.r003
player: $route_sakura.sakura_good_end_daily.r004
sakura: $route_sakura.sakura_good_end_daily.r005
> $route_sakura.sakura_good_end_daily.r006
player: $route_sakura.sakura_good_end_daily.r007
sakura: $route_sakura.sakura_good_end_daily.r008
> $route_sakura.sakura_good_end_daily.r009
@hide sakura fade_out
@jump sakura_good_end_hospital
# sakura_good_end_hospital
@scene classroom_evening fade
@bgm sakura_good_end.mp3
@show sakura center normal fade_in
> $route_sakura.sakura_good_end_hospital.context001
sakura: $route_sakura.sakura_good_end_hospital.r001
player: $route_sakura.sakura_good_end_hospital.r002
sakura: $route_sakura.sakura_good_end_hospital.r003
player: $route_sakura.sakura_good_end_hospital.r004
sakura: $route_sakura.sakura_good_end_hospital.r005
> $route_sakura.sakura_good_end_hospital.r006
sakura: $route_sakura.sakura_good_end_hospital.r007
player: $route_sakura.sakura_good_end_hospital.r008
sakura: $route_sakura.sakura_good_end_hospital.r009
@hide sakura fade_out
@jump sakura_good_end_club
# sakura_good_end_club
@scene gymnasium fade
@bgm sakura_good_end.mp3
@show sakura_sports center happy fade_in
> $route_sakura.sakura_good_end_club.r001
sakura: $route_sakura.sakura_good_end_club.r002
badminton_member_a: $route_sakura.sakura_good_end_club.r003
sakura: $route_sakura.sakura_good_end_club.r004
> $route_sakura.sakura_good_end_club.r005
player: $route_sakura.sakura_good_end_club.r006
sakura: $route_sakura.sakura_good_end_club.r007
> $route_sakura.sakura_good_end_club.r008
@hide sakura_sports fade_out
@jump sakura_good_end_message
# sakura_good_end_message
@scene protagonist_room_night fade
@bgm sakura_good_end.mp3
> $route_sakura.sakura_good_end_message.r001
> $route_sakura.sakura_good_end_message.r002
> $route_sakura.sakura_good_end_message.r003
player: $route_sakura.sakura_good_end_message.r004
> $route_sakura.sakura_good_end_message.r005
> $route_sakura.sakura_good_end_message.r006
player: $route_sakura.sakura_good_end_message.r007
> $route_sakura.sakura_good_end_message.r008
> $route_sakura.sakura_good_end_message.r009
@bgm stop
@jump sakura_good_end_rooftop
# sakura_good_end_rooftop
@scene rooftop_evening fade
@bgm stop
@se chime_soft.mp3
@show sakura center normal fade_in
> $route_sakura.sakura_good_end_rooftop.r001
sakura: $route_sakura.sakura_good_end_rooftop.r002
player: $route_sakura.sakura_good_end_rooftop.r003
sakura: $route_sakura.sakura_good_end_rooftop.r004
player: $route_sakura.sakura_good_end_rooftop.r005
sakura: $route_sakura.sakura_good_end_rooftop.r006
player: $route_sakura.sakura_good_end_rooftop.r007
sakura: $route_sakura.sakura_good_end_rooftop.r008
> $route_sakura.sakura_good_end_rooftop.r009
sakura: $route_sakura.sakura_good_end_rooftop.r010
> $route_sakura.sakura_good_end_rooftop.r011
sakura: $route_sakura.sakura_good_end_rooftop.r012
player: $route_sakura.sakura_good_end_rooftop.r013
sakura: $route_sakura.sakura_good_end_rooftop.r014
player: $route_sakura.sakura_good_end_rooftop.r015
sakura: $route_sakura.sakura_good_end_rooftop.r016
@bgm sakura_good_end.mp3
@still sakura_good_end_rooftop1_pre1
> $route_sakura.sakura_good_end_rooftop.r017
> $route_sakura.sakura_good_end_rooftop.context001
@still sakura_good_end_rooftop1_pre2
sakura: $route_sakura.sakura_good_end_rooftop.r018
@still sakura_good_end_rooftop1_pre3
> $route_sakura.sakura_good_end_rooftop.r019
> $route_sakura.sakura_good_end_rooftop.context002
@still sakura_good_end_rooftop1
sakura: $route_sakura.sakura_good_end_rooftop.r020
player: $route_sakura.sakura_good_end_rooftop.r021
sakura: $route_sakura.sakura_good_end_rooftop.r022
player: $route_sakura.sakura_good_end_rooftop.r023
sakura: $route_sakura.sakura_good_end_rooftop.r024
player: $route_sakura.sakura_good_end_rooftop.r025
@still_hide
> $route_sakura.sakura_good_end_rooftop.r026
sakura: $route_sakura.sakura_good_end_rooftop.r027
@hide_all instant
@scene rooftop fade
> $route_sakura.sakura_good_end_rooftop.context003
@still sakura_good_end_rooftop2
@ending_intro current sakura_good_end 10000
@scene school_grounds_evening fade
@bgm epilogue_sunset_for_each.mp3
> $route_sakura.sakura_good_end_rooftop.r028
> $route_sakura.sakura_good_end_rooftop.r029
@show sakura center normal fade_in
> $route_sakura.sakura_good_end_rooftop.r030
player: $route_sakura.sakura_good_end_rooftop.r031
sakura: $route_sakura.sakura_good_end_rooftop.r032
> $route_sakura.sakura_good_end_rooftop.r033
sakura: $route_sakura.sakura_good_end_rooftop.r034
player: $route_sakura.sakura_good_end_rooftop.r035
sakura: $route_sakura.sakura_good_end_rooftop.r036
> $route_sakura.sakura_good_end_rooftop.r037
@still sakura_epilogue fade_in
@click_wait
@end "$route_sakura.sakura_good_end_rooftop.r038"
# sakura_bad_end
@scene classroom_evening fade
@bgm bad_end_loop.mp3
@show sakura center happy fade_in
> $route_sakura.sakura_bad_end.r001
sakura: $route_sakura.sakura_bad_end.r002
player: $route_sakura.sakura_bad_end.r003
> $route_sakura.sakura_bad_end.r004
sakura: $route_sakura.sakura_bad_end.r005
player: $route_sakura.sakura_bad_end.r006
sakura: $route_sakura.sakura_bad_end.r007
> $route_sakura.sakura_bad_end.r008
@hide sakura fade_out
@jump sakura_bad_end_dependency
# sakura_bad_end_dependency
@scene corridor fade
@bgm bad_end_loop.mp3
@show sakura right happy fade_in
> $route_sakura.sakura_bad_end_dependency.r001
sakura: $route_sakura.sakura_bad_end_dependency.r002
player: $route_sakura.sakura_bad_end_dependency.r003
sakura: $route_sakura.sakura_bad_end_dependency.r004
player: $route_sakura.sakura_bad_end_dependency.r005
sakura: $route_sakura.sakura_bad_end_dependency.r006
player: $route_sakura.sakura_bad_end_dependency.r007
sakura: $route_sakura.sakura_bad_end_dependency.r008
> $route_sakura.sakura_bad_end_dependency.r009
> $route_sakura.sakura_bad_end_dependency.r010
@hide sakura fade_out
@jump sakura_bad_end_scene
# sakura_bad_end_scene
@scene classroom_night fade
@bgm bad_end_loop.mp3
@show sakura center normal fade_in
> $route_sakura.sakura_bad_end_scene.r001
sakura: $route_sakura.sakura_bad_end_scene.r002
player: $route_sakura.sakura_bad_end_scene.r003
sakura: $route_sakura.sakura_bad_end_scene.r004
> $route_sakura.sakura_bad_end_scene.r005
@hide sakura fade_out
@bgm stop
@jump sakura_bad_end_alone
# sakura_bad_end_alone
@scene school_gate_autumn_evening fade
@bgm bad_end_loop.mp3
> $route_sakura.sakura_bad_end_alone.r001
> $route_sakura.sakura_bad_end_alone.r002
@show sakura left blank fade_in
> $route_sakura.sakura_bad_end_alone.r003
sakura: $route_sakura.sakura_bad_end_alone.r004
player: $route_sakura.sakura_bad_end_alone.r005
sakura: $route_sakura.sakura_bad_end_alone.r006
> $route_sakura.sakura_bad_end_alone.r007
@hide sakura fade_out
@jump sakura_bad_end_final
# sakura_bad_end_final
@scene classroom_night fade
@bgm bad_end_loop.mp3
@show sakura center happy fade_in
> $route_sakura.sakura_bad_end_final.r001
sakura: $route_sakura.sakura_bad_end_final.r002
player: $route_sakura.sakura_bad_end_final.r003
sakura: $route_sakura.sakura_bad_end_final.r004
> $route_sakura.sakura_bad_end_final.r005
@hide sakura instant
@still bad_end_empty_classroom
> $route_sakura.sakura_bad_end_final.r006
@still_hide
sakura: $route_sakura.sakura_bad_end_final.r007
> $route_sakura.sakura_bad_end_final.r008
@bgm stop
@credits bad_end_loop.mp3
@end "$route_sakura.sakura_bad_end_final.r009"
