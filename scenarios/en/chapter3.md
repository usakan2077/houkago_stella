// 放課後のステラ — Chapter 3「遠くの音」
# chapter3_start
@scene classroom fade
@bgm spring_breeze.mp3
@se school_bell.mp3
> $chapter3.chapter3_start.r001
@show nobuhara left normal pop_in
@show classmate_male_a right laugh pop_in
nobuhara: $chapter3.chapter3_start.r002
player: $chapter3.chapter3_start.r003
classmate_male_a: $chapter3.chapter3_start.r004
player: $chapter3.chapter3_start.r005
@show teacher_male center stern fade_in
teacher_male: $chapter3.chapter3_start.r006
> $chapter3.chapter3_start.r007
nobuhara: $chapter3.chapter3_start.r008
player: $chapter3.chapter3_start.r009
@hide_all fade_out
@show sakura right happy fade_in
@show kotoha left normal fade_in
sakura: $chapter3.chapter3_start.r010
player: $chapter3.chapter3_start.r011
sakura: $chapter3.chapter3_start.r012
kotoha: $chapter3.chapter3_start.r013
sakura: $chapter3.chapter3_start.r014
> $chapter3.chapter3_start.r015
player: $chapter3.chapter3_start.r016
sakura: $chapter3.chapter3_start.r017
kotoha: $chapter3.chapter3_start.r018
sakura: $chapter3.chapter3_start.r019
player: $chapter3.chapter3_start.r020
sakura: $chapter3.chapter3_start.r021
> $chapter3.chapter3_start.r022
sakura: $chapter3.chapter3_start.r023
kotoha: $chapter3.chapter3_start.r024
sakura: $chapter3.chapter3_start.r025
@show mahiru center normal fade_in
mahiru: $chapter3.chapter3_start.r026
sakura: $chapter3.chapter3_start.r027
mahiru: $chapter3.chapter3_start.r028
> $chapter3.chapter3_start.r029
mahiru: $chapter3.chapter3_start.r030
sakura: $chapter3.chapter3_start.r031
kotoha: $chapter3.chapter3_start.r032
mahiru: $chapter3.chapter3_start.r033
player: $chapter3.chapter3_start.r034
@se school_bell.mp3
mahiru: $chapter3.chapter3_start.r035
@hide_all fade_out
@jump chapter3_lunch
# chapter3_lunch
@scene corridor fade
@still vending_corner fade_in
> $chapter3.chapter3_lunch.r001
@scene rooftop fade
@bgm rooftop_wind.mp3
@still_hide fade_out
@show sakura right excited fade_in
@show kotoha left normal fade_in
> $chapter3.chapter3_lunch.context001
sakura: $chapter3.chapter3_lunch.r002
player: $chapter3.chapter3_lunch.r003
sakura: $chapter3.chapter3_lunch.r004
kotoha: $chapter3.chapter3_lunch.r005
> $chapter3.chapter3_lunch.r006
sakura: $chapter3.chapter3_lunch.r007
kotoha: $chapter3.chapter3_lunch.r008
@show mahiru center normal fade_in
mahiru: $chapter3.chapter3_lunch.r009
player: $chapter3.chapter3_lunch.r010
mahiru: $chapter3.chapter3_lunch.r011
sakura: $chapter3.chapter3_lunch.r012
mahiru: $chapter3.chapter3_lunch.r013
kotoha: $chapter3.chapter3_lunch.r014
player: $chapter3.chapter3_lunch.r015
mahiru: $chapter3.chapter3_lunch.r016
@still mahiru_rooftop_photo
@se camera_film_shutter.mp3
> $chapter3.chapter3_lunch.r017
@still_hide
sakura: $chapter3.chapter3_lunch.r018
mahiru: $chapter3.chapter3_lunch.r019
sakura: $chapter3.chapter3_lunch.r020
@se book_drop.mp3
> $chapter3.chapter3_lunch.r021
kotoha: $chapter3.chapter3_lunch.r022
> $chapter3.chapter3_lunch.r023
sakura: $chapter3.chapter3_lunch.r024
player: $chapter3.chapter3_lunch.r025
sakura: $chapter3.chapter3_lunch.r026
mahiru: $chapter3.chapter3_lunch.r027
kotoha: $chapter3.chapter3_lunch.r028
sakura: $chapter3.chapter3_lunch.r029
> $chapter3.chapter3_lunch.r030
kotoha: $chapter3.chapter3_lunch.r031
sakura: $chapter3.chapter3_lunch.r032
player: $chapter3.chapter3_lunch.r033
sakura: $chapter3.chapter3_lunch.r034
@se camera_film_shutter.mp3
mahiru: $chapter3.chapter3_lunch.r035
> $chapter3.chapter3_lunch.r036
kotoha: $chapter3.chapter3_lunch.r037
sakura: $chapter3.chapter3_lunch.r038
player: $chapter3.chapter3_lunch.r039
mahiru: $chapter3.chapter3_lunch.r040
> $chapter3.chapter3_lunch.r041
@hide_all fade_out
@jump chapter3_library
# chapter3_library
@scene library fade
@bgm library_quiet.mp3
> $chapter3.chapter3_library.r001
@show classmate_female_a left normal pop_in
classmate_female_a: $chapter3.chapter3_library.r002
player: $chapter3.chapter3_library.r003
classmate_female_a: $chapter3.chapter3_library.r004
player: $chapter3.chapter3_library.r005
@hide classmate_female_a fade_out
@show kotoha center normal fade_in
> $chapter3.chapter3_library.r006
@choice
- $chapter3.chapter3_library.r007 [kotoha_favor+5] -> chapter3_library_talk
- $chapter3.chapter3_library.r008 -> chapter3_library_skip
# chapter3_library_skip
> $chapter3.chapter3_library_skip.r001
@hide kotoha fade_out
@jump chapter3_music_room
# chapter3_library_talk
player: $chapter3.chapter3_library_talk.r001
> $chapter3.chapter3_library_talk.r002
@hide kotoha fade_out
@still library_hands_overlap
@wait 800
@still_hide
@show kotoha center surprised fade_in
kotoha: $chapter3.chapter3_library_talk.r003
player: $chapter3.chapter3_library_talk.r004
> $chapter3.chapter3_library_talk.r005
@expr kotoha normal
player: $chapter3.chapter3_library_talk.r006
kotoha: $chapter3.chapter3_library_talk.r007
player: $chapter3.chapter3_library_talk.r008
kotoha: $chapter3.chapter3_library_talk.r009
> $chapter3.chapter3_library_talk.r010
player: $chapter3.chapter3_library_talk.r011
kotoha: $chapter3.chapter3_library_talk.r012
player: $chapter3.chapter3_library_talk.r013
@expr kotoha sad
kotoha: $chapter3.chapter3_library_talk.r014
> $chapter3.chapter3_library_talk.r015
player: $chapter3.chapter3_library_talk.r016
kotoha: $chapter3.chapter3_library_talk.r017
player: $chapter3.chapter3_library_talk.r018
kotoha: $chapter3.chapter3_library_talk.r019
> $chapter3.chapter3_library_talk.r020
player: $chapter3.chapter3_library_talk.r021
kotoha: $chapter3.chapter3_library_talk.r022
> $chapter3.chapter3_library_talk.r023
kotoha: $chapter3.chapter3_library_talk.r024
player: $chapter3.chapter3_library_talk.r025
kotoha: $chapter3.chapter3_library_talk.r026
player: $chapter3.chapter3_library_talk.r027
> $chapter3.chapter3_library_talk.r028
@hide kotoha fade_out
@jump chapter3_music_room
# chapter3_music_room
@scene corridor_evening fade
@bgm stop
@bgm piano_distant.mp3 noloop
> $chapter3.chapter3_music_room.r001
@show kotoha center normal fade_in
> $chapter3.chapter3_music_room.r002
player: $chapter3.chapter3_music_room.r003
kotoha: $chapter3.chapter3_music_room.r004
player: $chapter3.chapter3_music_room.r005
> $chapter3.chapter3_music_room.r006
player: $chapter3.chapter3_music_room.r007
kotoha: $chapter3.chapter3_music_room.r008
> $chapter3.chapter3_music_room.r009
kotoha: $chapter3.chapter3_music_room.r010
player: $chapter3.chapter3_music_room.r011
kotoha: $chapter3.chapter3_music_room.r012
> $chapter3.chapter3_music_room.r013
kotoha: $chapter3.chapter3_music_room.r014
player: $chapter3.chapter3_music_room.r015
@expr kotoha thinking
kotoha: $chapter3.chapter3_music_room.r016
player: $chapter3.chapter3_music_room.r017
kotoha: $chapter3.chapter3_music_room.r018
> $chapter3.chapter3_music_room.r019
kotoha: $chapter3.chapter3_music_room.r020
player: $chapter3.chapter3_music_room.r021
kotoha: $chapter3.chapter3_music_room.r022
player: $chapter3.chapter3_music_room.r023
kotoha: $chapter3.chapter3_music_room.r024
> $chapter3.chapter3_music_room.r025
kotoha: $chapter3.chapter3_music_room.r026
player: $chapter3.chapter3_music_room.r027
@hide kotoha fade_out
@jump chapter3_mahiru_photo
# chapter3_mahiru_photo
@scene corridor_evening fade
@bgm daily_life.mp3
@show mahiru center normal fade_in
@se camera_film_shutter.mp3
> $chapter3.chapter3_mahiru_photo.context001
player: $chapter3.chapter3_mahiru_photo.r001
mahiru: $chapter3.chapter3_mahiru_photo.r002
player: $chapter3.chapter3_mahiru_photo.r003
mahiru: $chapter3.chapter3_mahiru_photo.r004
player: $chapter3.chapter3_mahiru_photo.r005
mahiru: $chapter3.chapter3_mahiru_photo.r006
> $chapter3.chapter3_mahiru_photo.r007
player: $chapter3.chapter3_mahiru_photo.r008
mahiru: $chapter3.chapter3_mahiru_photo.r009
player: $chapter3.chapter3_mahiru_photo.r010
mahiru: $chapter3.chapter3_mahiru_photo.r011
> $chapter3.chapter3_mahiru_photo.r012
player: $chapter3.chapter3_mahiru_photo.r013
mahiru: $chapter3.chapter3_mahiru_photo.r014
player: $chapter3.chapter3_mahiru_photo.r015
@expr mahiru happy
mahiru: $chapter3.chapter3_mahiru_photo.r016
> $chapter3.chapter3_mahiru_photo.r017
player: $chapter3.chapter3_mahiru_photo.r018
mahiru: $chapter3.chapter3_mahiru_photo.r019
player: $chapter3.chapter3_mahiru_photo.r020
> $chapter3.chapter3_mahiru_photo.r021
mahiru: $chapter3.chapter3_mahiru_photo.r022
player: $chapter3.chapter3_mahiru_photo.r023
mahiru: $chapter3.chapter3_mahiru_photo.r024
player: $chapter3.chapter3_mahiru_photo.r025
mahiru: $chapter3.chapter3_mahiru_photo.r026
player: $chapter3.chapter3_mahiru_photo.r027
@se camera_film_shutter.mp3
player: $chapter3.chapter3_mahiru_photo.r028
mahiru: $chapter3.chapter3_mahiru_photo.r029
player: $chapter3.chapter3_mahiru_photo.r030
mahiru: $chapter3.chapter3_mahiru_photo.r031
> $chapter3.chapter3_mahiru_photo.r032
> $chapter3.chapter3_mahiru_photo.r033
@hide mahiru fade_out
@jump chapter3_sakura
# chapter3_sakura
@scene classroom_evening fade
@bgm evening_piano.mp3
@show sakura center normal fade_in
> $chapter3.chapter3_sakura.r001
player: $chapter3.chapter3_sakura.r002
sakura: $chapter3.chapter3_sakura.r003
> $chapter3.chapter3_sakura.r004
player: $chapter3.chapter3_sakura.r005
sakura: $chapter3.chapter3_sakura.r006
@bgm stop
> $chapter3.chapter3_sakura.r007
@expr sakura blank
sakura: $chapter3.chapter3_sakura.r008
player: $chapter3.chapter3_sakura.r009
sakura: $chapter3.chapter3_sakura.r010
@hide sakura slide_out_left
> $chapter3.chapter3_sakura.r011
@jump chapter3_end
# chapter3_end
@scene corridor_evening fade
@bgm evening_piano.mp3
> $chapter3.chapter3_end.r001
> $chapter3.chapter3_end.r002
> $chapter3.chapter3_end.r003
> $chapter3.chapter3_end.r004
> $chapter3.chapter3_end.r005
@bgm stop
@end "$chapter3.chapter3_end.r006" -> chapter4_start
