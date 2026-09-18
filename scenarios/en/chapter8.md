// 放課後のステラ — Chapter 8「雨のち、分岐点」
# chapter8_start
@scene classroom_rainy fade
@bgm festival_rain.mp3
@se crowd_festival.mp3
> $chapter8.chapter8_start.r001
@se rain_window.mp3
> $chapter8.chapter8_start.r002
@show sakura right excited fade_in
@show kotoha left normal fade_in
sakura: $chapter8.chapter8_start.r003
player: $chapter8.chapter8_start.r004
sakura: $chapter8.chapter8_start.r005
kotoha: $chapter8.chapter8_start.r006
sakura: $chapter8.chapter8_start.r007
player: $chapter8.chapter8_start.r008
kotoha: $chapter8.chapter8_start.r009
sakura: $chapter8.chapter8_start.r010
kotoha: $chapter8.chapter8_start.r011
sakura: $chapter8.chapter8_start.r012
@show nobuhara_nobag center panic fade_in
nobuhara_nobag: $chapter8.chapter8_start.r013
player: $chapter8.chapter8_start.r014
nobuhara_nobag: $chapter8.chapter8_start.r015
> $chapter8.chapter8_start.r016
@hide_all fade_out
@jump chapter8_festival_open
# chapter8_festival_open
@scene corridor_festival_rainy fade
@bgm festival_rain.mp3
> $chapter8.chapter8_festival_open.r001
@show badminton_member_a center normal pop_in
badminton_member_a: $chapter8.chapter8_festival_open.r002
player: $chapter8.chapter8_festival_open.r003
badminton_member_a: $chapter8.chapter8_festival_open.r004
@hide badminton_member_a fade_out
@show teacher_male center serious fade_in
teacher_male: $chapter8.chapter8_festival_open.r005
@hide teacher_male fade_out
@show mahiru center happy fade_in
mahiru: $chapter8.chapter8_festival_open.r006
player: $chapter8.chapter8_festival_open.r007
mahiru: $chapter8.chapter8_festival_open.r008
> $chapter8.chapter8_festival_open.r009
mahiru: $chapter8.chapter8_festival_open.r010
player: $chapter8.chapter8_festival_open.r011
mahiru: $chapter8.chapter8_festival_open.r012
player: $chapter8.chapter8_festival_open.r013
mahiru: $chapter8.chapter8_festival_open.r014
> $chapter8.chapter8_festival_open.r015
@hide mahiru fade_out
@jump chapter8_sakura_cafe
# chapter8_sakura_cafe
@scene classroom_cafe_rainy fade
@bgm festival_rain.mp3
@show sakura_apron center excited fade_in
> $chapter8.chapter8_sakura_cafe.context001
sakura: $chapter8.chapter8_sakura_cafe.r001
> $chapter8.chapter8_sakura_cafe.r002
sakura: $chapter8.chapter8_sakura_cafe.r003
player: $chapter8.chapter8_sakura_cafe.r004
sakura: $chapter8.chapter8_sakura_cafe.r005
> $chapter8.chapter8_sakura_cafe.r006
@show classmate_female_a left normal fade_in
classmate_female_a: $chapter8.chapter8_sakura_cafe.r007
sakura: $chapter8.chapter8_sakura_cafe.r008
> $chapter8.chapter8_sakura_cafe.r009
@bgm stop
> $chapter8.chapter8_sakura_cafe.r010
> $chapter8.chapter8_sakura_cafe.r011
sakura: $chapter8.chapter8_sakura_cafe.r012
> $chapter8.chapter8_sakura_cafe.r013
sakura: $chapter8.chapter8_sakura_cafe.r014
player: $chapter8.chapter8_sakura_cafe.r015
> $chapter8.chapter8_sakura_cafe.r016
sakura: $chapter8.chapter8_sakura_cafe.r017
player: $chapter8.chapter8_sakura_cafe.r018
sakura: $chapter8.chapter8_sakura_cafe.r019
classmate_female_a: $chapter8.chapter8_sakura_cafe.r020
sakura: $chapter8.chapter8_sakura_cafe.r021
classmate_female_a: $chapter8.chapter8_sakura_cafe.r022
> $chapter8.chapter8_sakura_cafe.r023
sakura: $chapter8.chapter8_sakura_cafe.r024
@hide_all fade_out
@jump chapter8_music_room
# chapter8_music_room
@scene corridor_festival_rainy fade
@bgm piano_distant.mp3 noloop
@show kotoha center normal fade_in
> $chapter8.chapter8_music_room.r001
player: $chapter8.chapter8_music_room.r002
kotoha: $chapter8.chapter8_music_room.r003
> $chapter8.chapter8_music_room.r004
player: $chapter8.chapter8_music_room.r005
kotoha: $chapter8.chapter8_music_room.r006
> $chapter8.chapter8_music_room.r007
kotoha: $chapter8.chapter8_music_room.r008
player: $chapter8.chapter8_music_room.r009
kotoha: $chapter8.chapter8_music_room.r010
> $chapter8.chapter8_music_room.r011
kotoha: $chapter8.chapter8_music_room.r012
player: $chapter8.chapter8_music_room.r013
kotoha: $chapter8.chapter8_music_room.r014
> $chapter8.chapter8_music_room.r015
@hide kotoha fade_out
@jump chapter8_mahiru_reason
# chapter8_mahiru_reason
@scene corridor_festival_rainy fade
@bgm festival_rain.mp3
@show mahiru center happy fade_in
> $chapter8.chapter8_mahiru_reason.context001
mahiru: $chapter8.chapter8_mahiru_reason.r001
player: $chapter8.chapter8_mahiru_reason.r002
mahiru: $chapter8.chapter8_mahiru_reason.r003
player: $chapter8.chapter8_mahiru_reason.r004
mahiru: $chapter8.chapter8_mahiru_reason.r005
player: $chapter8.chapter8_mahiru_reason.r006
mahiru: $chapter8.chapter8_mahiru_reason.r007
player: $chapter8.chapter8_mahiru_reason.r008
mahiru: $chapter8.chapter8_mahiru_reason.r009
player: $chapter8.chapter8_mahiru_reason.r010
mahiru: $chapter8.chapter8_mahiru_reason.r011
> $chapter8.chapter8_mahiru_reason.r012
player: $chapter8.chapter8_mahiru_reason.r013
mahiru: $chapter8.chapter8_mahiru_reason.r014
player: $chapter8.chapter8_mahiru_reason.r015
mahiru: $chapter8.chapter8_mahiru_reason.r016
> $chapter8.chapter8_mahiru_reason.r017
mahiru: $chapter8.chapter8_mahiru_reason.r018
player: $chapter8.chapter8_mahiru_reason.r019
mahiru: $chapter8.chapter8_mahiru_reason.r020
@hide mahiru fade_out
@jump chapter8_rain_corridor
# chapter8_rain_corridor
@scene corridor_festival_rainy fade
@bgm tension_rain.mp3
@se rain_window.mp3
@still rain_festival_day
> $chapter8.chapter8_rain_corridor.r001
@still_hide
> $chapter8.chapter8_rain_corridor.r002
> $chapter8.chapter8_rain_corridor.r003
@jump chapter8_sakura_crisis
# chapter8_sakura_crisis
@scene corridor_festival_rainy fade
@bgm tension_rain.mp3
@show sakura center normal fade_in
> $chapter8.chapter8_sakura_crisis.context001
sakura: $chapter8.chapter8_sakura_crisis.r001
> $chapter8.chapter8_sakura_crisis.r002
sakura: $chapter8.chapter8_sakura_crisis.r003
sakura: $chapter8.chapter8_sakura_crisis.r004
> $chapter8.chapter8_sakura_crisis.r005
sakura: $chapter8.chapter8_sakura_crisis.r006
player: $chapter8.chapter8_sakura_crisis.r007
sakura: $chapter8.chapter8_sakura_crisis.r008
> $chapter8.chapter8_sakura_crisis.r009
player: $chapter8.chapter8_sakura_crisis.r010
sakura: $chapter8.chapter8_sakura_crisis.r011
player: $chapter8.chapter8_sakura_crisis.r012
sakura: $chapter8.chapter8_sakura_crisis.r013
> $chapter8.chapter8_sakura_crisis.r014
sakura: $chapter8.chapter8_sakura_crisis.r015
player: $chapter8.chapter8_sakura_crisis.r016
> $chapter8.chapter8_sakura_crisis.r017
@hide sakura fade_out
@jump chapter8_kotoha_crisis
# chapter8_kotoha_crisis
@scene corridor_festival_rainy fade
@bgm piano_distant.mp3 noloop
> $chapter8.chapter8_kotoha_crisis.r001
@show kotoha center normal fade_in
teacher_male: $chapter8.chapter8_kotoha_crisis.r002
teacher_male: $chapter8.chapter8_kotoha_crisis.r003
kotoha: $chapter8.chapter8_kotoha_crisis.r004
teacher_male: $chapter8.chapter8_kotoha_crisis.r005
> $chapter8.chapter8_kotoha_crisis.r006
> $chapter8.chapter8_kotoha_crisis.r007
> $chapter8.chapter8_kotoha_crisis.r008
@hide kotoha fade_out
@jump chapter8_mahiru_missing
# chapter8_mahiru_missing
@scene corridor_festival_rainy fade
@bgm tension_rain.mp3
> $chapter8.chapter8_mahiru_missing.r001
> $chapter8.chapter8_mahiru_missing.r002
> $chapter8.chapter8_mahiru_missing.r003
> $chapter8.chapter8_mahiru_missing.r004
> $chapter8.chapter8_mahiru_missing.r005
@bgm stop
@jump chapter8_branch
# chapter8_branch
@scene corridor_festival_rainy fade
@bgm mystery_shadow.mp3
@se rain_window.mp3
> $chapter8.chapter8_branch.r001
> $chapter8.chapter8_branch.r002
@show festival_committee center panic fade_in
festival_committee: $chapter8.chapter8_branch.r003
> $chapter8.chapter8_branch.context001
@still nobuhara_takes_charge pan_out
nobuhara_nobag: $chapter8.chapter8_branch.r004
player: $chapter8.chapter8_branch.r005
nobuhara_nobag: $chapter8.chapter8_branch.r006
player: $chapter8.chapter8_branch.r007
nobuhara_nobag: $chapter8.chapter8_branch.r008
> $chapter8.chapter8_branch.r009
@still_hide fade_out
@show nobuhara_nobag center serious fade_in
player: $chapter8.chapter8_branch.r010
nobuhara_nobag: $chapter8.chapter8_branch.r011
> $chapter8.chapter8_branch.r012
@hide_all fade_out
@choice
- $chapter8.chapter8_branch.r013 -> chapter8_to_sakura
- $chapter8.chapter8_branch.r014 -> chapter8_to_kotoha
- $chapter8.chapter8_branch.r015 -> chapter8_to_mahiru
# chapter8_to_sakura
@if sakura_favor >= 8 -> sakura_interlude
@jump bad_end_common
# chapter8_to_kotoha
@if kotoha_favor >= 8 -> kotoha_interlude
@jump bad_end_common
# chapter8_to_mahiru
@if mahiru_favor >= 8 -> mahiru_interlude
@jump bad_end_common
# bad_end_common
@scene corridor_festival_rainy fade
@bgm mystery_shadow.mp3
> $chapter8.bad_end_common.r001
> $chapter8.bad_end_common.r002
@bgm stop
@jump bad_end_start
# route_sakura_start
@jump sakura_interlude
# route_kotoha_start
@jump kotoha_interlude
# route_mahiru_start
@jump mahiru_interlude
