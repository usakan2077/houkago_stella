// 放課後のステラ — ことはルート

# kotoha_interlude

@window_color kotoha
@scene library_evening fade
@bgm library_quiet.mp3

> $route_kotoha.kotoha_interlude.r001
> $route_kotoha.kotoha_interlude.r001.s002
> $route_kotoha.kotoha_interlude.r002
> $route_kotoha.kotoha_interlude.r002.s002

kotoha: $route_kotoha.kotoha_interlude.r003

> $route_kotoha.kotoha_interlude.r004
> $route_kotoha.kotoha_interlude.r004.s002
> $route_kotoha.kotoha_interlude.r005
> $route_kotoha.kotoha_interlude.r005.s002
> $route_kotoha.kotoha_interlude.r005.s003
> $route_kotoha.kotoha_interlude.r006
> $route_kotoha.kotoha_interlude.r006.s002
> $route_kotoha.kotoha_interlude.r006.s003
> $route_kotoha.kotoha_interlude.r007
> $route_kotoha.kotoha_interlude.r007.s002

kotoha: $route_kotoha.kotoha_interlude.r008

> $route_kotoha.kotoha_interlude.r009
> $route_kotoha.kotoha_interlude.r009.s002

@bgm stop
@window_color reset
@jump kotoha_ch9_start

# kotoha_ch9_start

@scene corridor_festival_rainy fade
@bgm piano_distant.mp3 noloop

> $route_kotoha.kotoha_ch9_start.r001
> $route_kotoha.kotoha_ch9_start.r001.s002

@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch9_start.r002
> $route_kotoha.kotoha_ch9_start.r002.s002

player: $route_kotoha.kotoha_ch9_start.r003

kotoha: $route_kotoha.kotoha_ch9_start.r004

player: $route_kotoha.kotoha_ch9_start.r005

kotoha: $route_kotoha.kotoha_ch9_start.r006

> $route_kotoha.kotoha_ch9_start.r007
> $route_kotoha.kotoha_ch9_start.r007.s002
> $route_kotoha.kotoha_ch9_start.r007.s003
> $route_kotoha.kotoha_ch9_start.context001
> $route_kotoha.kotoha_ch9_start.context001.s002

@still kotoha_music_door

kotoha: $route_kotoha.kotoha_ch9_start.r008

player: $route_kotoha.kotoha_ch9_start.r009

kotoha: $route_kotoha.kotoha_ch9_start.r010

player: $route_kotoha.kotoha_ch9_start.r011

kotoha: $route_kotoha.kotoha_ch9_start.r012

@still_hide

> $route_kotoha.kotoha_ch9_start.r013
> $route_kotoha.kotoha_ch9_start.r013.s002

player: $route_kotoha.kotoha_ch9_start.r014

kotoha: $route_kotoha.kotoha_ch9_start.r015

> $route_kotoha.kotoha_ch9_start.r016
> $route_kotoha.kotoha_ch9_start.r016.s002

@bgm stop

> $route_kotoha.kotoha_ch9_start.r017
> $route_kotoha.kotoha_ch9_start.r017.s002

kotoha: $route_kotoha.kotoha_ch9_start.r018

player: $route_kotoha.kotoha_ch9_start.r019

kotoha: $route_kotoha.kotoha_ch9_start.r020

@hide kotoha fade_out
@bgm evening_piano.mp3
@jump kotoha_ch9_daily1

# kotoha_ch9_daily1

@scene corridor_evening fade
@bgm piano_distant.mp3 noloop

> $route_kotoha.kotoha_ch9_daily1.r001
> $route_kotoha.kotoha_ch9_daily1.r001.s002

@show kotoha center normal fade_in

kotoha: $route_kotoha.kotoha_ch9_daily1.r002

player: $route_kotoha.kotoha_ch9_daily1.r003

kotoha: $route_kotoha.kotoha_ch9_daily1.r004

player: $route_kotoha.kotoha_ch9_daily1.r005

> $route_kotoha.kotoha_ch9_daily1.r006

kotoha: $route_kotoha.kotoha_ch9_daily1.r007

player: $route_kotoha.kotoha_ch9_daily1.r008

kotoha: $route_kotoha.kotoha_ch9_daily1.r009

player: $route_kotoha.kotoha_ch9_daily1.r010

> $route_kotoha.kotoha_ch9_daily1.r011
> $route_kotoha.kotoha_ch9_daily1.r011.s002

@hide kotoha fade_out
@jump kotoha_ch9_daily2

# kotoha_ch9_daily2

@scene library_evening fade
@bgm library_quiet.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch9_daily2.r001
> $route_kotoha.kotoha_ch9_daily2.r001.s002

player: $route_kotoha.kotoha_ch9_daily2.r002

kotoha: $route_kotoha.kotoha_ch9_daily2.r003

player: $route_kotoha.kotoha_ch9_daily2.r004

kotoha: $route_kotoha.kotoha_ch9_daily2.r005

> $route_kotoha.kotoha_ch9_daily2.r006

player: $route_kotoha.kotoha_ch9_daily2.r007

kotoha: $route_kotoha.kotoha_ch9_daily2.r008

player: $route_kotoha.kotoha_ch9_daily2.r009

> $route_kotoha.kotoha_ch9_daily2.r010

kotoha: $route_kotoha.kotoha_ch9_daily2.r011

player: $route_kotoha.kotoha_ch9_daily2.r012

@emote kotoha nod 0.4

kotoha: $route_kotoha.kotoha_ch9_daily2.r013

> $route_kotoha.kotoha_ch9_daily2.r014
> $route_kotoha.kotoha_ch9_daily2.r014.s002

@hide kotoha fade_out
@jump kotoha_ch9_daily3

# kotoha_ch9_daily3

@scene commute_road_autumn fade
@bgm daily_life.mp3
@se wind_leaves.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch9_daily3.r001

player: $route_kotoha.kotoha_ch9_daily3.r002

kotoha: $route_kotoha.kotoha_ch9_daily3.r003

> $route_kotoha.kotoha_ch9_daily3.r004
> $route_kotoha.kotoha_ch9_daily3.r004.s002

@bgm stop

kotoha: $route_kotoha.kotoha_ch9_daily3.r005

player: $route_kotoha.kotoha_ch9_daily3.r006

kotoha: $route_kotoha.kotoha_ch9_daily3.r007

player: $route_kotoha.kotoha_ch9_daily3.r008

> $route_kotoha.kotoha_ch9_daily3.r009
> $route_kotoha.kotoha_ch9_daily3.r009.s002

kotoha: $route_kotoha.kotoha_ch9_daily3.r010

player: $route_kotoha.kotoha_ch9_daily3.r011

kotoha: $route_kotoha.kotoha_ch9_daily3.r012

> $route_kotoha.kotoha_ch9_daily3.r013
> $route_kotoha.kotoha_ch9_daily3.r013.s002

@hide kotoha fade_out
@jump kotoha_ch10_start

# kotoha_ch10_start

@scene classroom fade
@bgm daily_life.mp3

> $route_kotoha.kotoha_ch10_start.r001
> $route_kotoha.kotoha_ch10_start.r001.s002

@scene library_evening fade
@bgm library_quiet.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch10_start.r002
> $route_kotoha.kotoha_ch10_start.r002.s002

kotoha: $route_kotoha.kotoha_ch10_start.r003

player: $route_kotoha.kotoha_ch10_start.r004

@expr kotoha thinking

kotoha: $route_kotoha.kotoha_ch10_start.r005

> $route_kotoha.kotoha_ch10_start.r006

kotoha: $route_kotoha.kotoha_ch10_start.r007

@bgm quiet_piano_distant.mp3

player: $route_kotoha.kotoha_ch10_start.r008

kotoha: $route_kotoha.kotoha_ch10_start.r009

> $route_kotoha.kotoha_ch10_start.r010

kotoha: $route_kotoha.kotoha_ch10_start.r011

player: $route_kotoha.kotoha_ch10_start.r012

kotoha: $route_kotoha.kotoha_ch10_start.r013

> $route_kotoha.kotoha_ch10_start.r014

kotoha: $route_kotoha.kotoha_ch10_start.r015

@expr kotoha sad

kotoha: $route_kotoha.kotoha_ch10_start.r016

player: $route_kotoha.kotoha_ch10_start.r017

kotoha: $route_kotoha.kotoha_ch10_start.r018

> $route_kotoha.kotoha_ch10_start.r019
> $route_kotoha.kotoha_ch10_start.r019.s002

kotoha: $route_kotoha.kotoha_ch10_start.r020

player: $route_kotoha.kotoha_ch10_start.r021

> $route_kotoha.kotoha_ch10_start.r022

player: $route_kotoha.kotoha_ch10_start.r023

@expr kotoha normal

kotoha: $route_kotoha.kotoha_ch10_start.r024

player: $route_kotoha.kotoha_ch10_start.r025

kotoha: $route_kotoha.kotoha_ch10_start.r026

> $route_kotoha.kotoha_ch10_start.r027

player: $route_kotoha.kotoha_ch10_start.r028

> $route_kotoha.kotoha_ch10_start.r029

kotoha: $route_kotoha.kotoha_ch10_start.r030

player: $route_kotoha.kotoha_ch10_start.r031

@still kotoha_library_headphones

> $route_kotoha.kotoha_ch10_start.r032
> $route_kotoha.kotoha_ch10_start.r032.s002

@still_hide
@hide kotoha fade_out
@bgm library_quiet.mp3
@jump kotoha_ch10_book

# kotoha_ch10_book

@scene library_evening fade
@bgm library_quiet.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch10_book.r001
> $route_kotoha.kotoha_ch10_book.r001.s002

player: $route_kotoha.kotoha_ch10_book.r002

kotoha: $route_kotoha.kotoha_ch10_book.r003

player: $route_kotoha.kotoha_ch10_book.r004

kotoha: $route_kotoha.kotoha_ch10_book.r005

player: $route_kotoha.kotoha_ch10_book.r006

> $route_kotoha.kotoha_ch10_book.r007

kotoha: $route_kotoha.kotoha_ch10_book.r008

player: $route_kotoha.kotoha_ch10_book.r009

kotoha: $route_kotoha.kotoha_ch10_book.r010

> $route_kotoha.kotoha_ch10_book.r011
> $route_kotoha.kotoha_ch10_book.r011.s002

player: $route_kotoha.kotoha_ch10_book.r012

kotoha: $route_kotoha.kotoha_ch10_book.r013

player: $route_kotoha.kotoha_ch10_book.r014

@hide kotoha fade_out
@jump kotoha_ch10_relay

# kotoha_ch10_relay

@scene corridor_evening fade
@bgm daily_life.mp3
@show classmate_male_a center normal fade_in

> $route_kotoha.kotoha_ch10_relay.context001
> $route_kotoha.kotoha_ch10_relay.context001.s002

classmate_male_a: $route_kotoha.kotoha_ch10_relay.r001

player: $route_kotoha.kotoha_ch10_relay.r002

classmate_male_a: $route_kotoha.kotoha_ch10_relay.r003

> $route_kotoha.kotoha_ch10_relay.r004

@hide classmate_male_a fade_out
@scene commute_road_autumn fade
@bgm quiet_piano_distant.mp3

> $route_kotoha.kotoha_ch10_relay.r005
> $route_kotoha.kotoha_ch10_relay.r005.s002
> $route_kotoha.kotoha_ch10_relay.r005.s003
> $route_kotoha.kotoha_ch10_relay.r005.s004
> $route_kotoha.kotoha_ch10_relay.r006
> $route_kotoha.kotoha_ch10_relay.r006.s002
> $route_kotoha.kotoha_ch10_relay.r007
> $route_kotoha.kotoha_ch10_relay.r007.s002

@choice

- $route_kotoha.kotoha_ch10_relay.r008 -> kotoha_ch10_accept
- $route_kotoha.kotoha_ch10_relay.r009 -> kotoha_ch10_bad

# kotoha_ch10_accept

@flag kotoha_relay_join 1
@scene corridor_evening fade
@bgm daily_life.mp3
@show classmate_male_a center normal fade_in

> $route_kotoha.kotoha_ch10_accept.context001
> $route_kotoha.kotoha_ch10_accept.context001.s002

player: $route_kotoha.kotoha_ch10_accept.r001

classmate_male_a: $route_kotoha.kotoha_ch10_accept.r002

player: $route_kotoha.kotoha_ch10_accept.r003

@emote classmate_male_a nod 0.4

classmate_male_a: $route_kotoha.kotoha_ch10_accept.r004

player: $route_kotoha.kotoha_ch10_accept.r005

@hide classmate_male_a fade_out
@jump kotoha_ch10_decide

# kotoha_ch10_bad

> $route_kotoha.kotoha_ch10_bad.r001
> $route_kotoha.kotoha_ch10_bad.r001.s002
> $route_kotoha.kotoha_ch10_bad.r002
> $route_kotoha.kotoha_ch10_bad.next_day
> $route_kotoha.kotoha_ch10_bad.next_day.s002

@jump kotoha_ch10_decide

# kotoha_ch10_decide

@scene library_evening fade
@bgm library_quiet.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch10_decide.context001

kotoha: $route_kotoha.kotoha_ch10_decide.r001

player: $route_kotoha.kotoha_ch10_decide.r002

kotoha: $route_kotoha.kotoha_ch10_decide.r003

> $route_kotoha.kotoha_ch10_decide.r004

@if kotoha_relay_join == 1 -> kotoha_relay_report

player: $route_kotoha.kotoha_ch10_decide.not_joined

@jump kotoha_relay_report_resume

# kotoha_relay_report

player: $route_kotoha.kotoha_ch10_decide.r005

@jump kotoha_relay_report_resume

# kotoha_relay_report_resume

> $route_kotoha.kotoha_ch10_decide.r006

kotoha: $route_kotoha.kotoha_ch10_decide.r007

player: $route_kotoha.kotoha_ch10_decide.r008

kotoha: $route_kotoha.kotoha_ch10_decide.r009

> $route_kotoha.kotoha_ch10_decide.r010

kotoha: $route_kotoha.kotoha_ch10_decide.r011

player: $route_kotoha.kotoha_ch10_decide.r012

kotoha: $route_kotoha.kotoha_ch10_decide.r013

player: $route_kotoha.kotoha_ch10_decide.r014

kotoha: $route_kotoha.kotoha_ch10_decide.r015

> $route_kotoha.kotoha_ch10_decide.r016
> $route_kotoha.kotoha_ch10_decide.r016.s002
> $route_kotoha.kotoha_ch10_decide.next_step
> $route_kotoha.kotoha_ch10_decide.next_step.s002

@choice

- $route_kotoha.kotoha_ch10_decide.stay -> kotoha_ch10_stay
- $route_kotoha.kotoha_ch10_decide.wait_finished -> kotoha_ch10_wait_finished

# kotoha_ch10_stay

player: $route_kotoha.kotoha_ch10_decide.stay_reply

@emote kotoha nod 0.35

kotoha: $route_kotoha.kotoha_ch10_decide.stay_answer

@hide kotoha fade_out
@jump kotoha_ch11_start

# kotoha_ch10_wait_finished

player: $route_kotoha.kotoha_ch10_decide.wait_reply

kotoha: $route_kotoha.kotoha_ch10_decide.wait_answer

@hide kotoha fade_out
@jump kotoha_ch10_distance

# kotoha_ch10_distance

@scene library_evening fade
@bgm library_quiet.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch10_distance.waiting
> $route_kotoha.kotoha_ch10_distance.waiting.s002
> $route_kotoha.kotoha_ch10_bad.r003

kotoha: $route_kotoha.kotoha_ch10_bad.r004

player: $route_kotoha.kotoha_ch10_bad.r005

> $route_kotoha.kotoha_ch10_bad.r006
> $route_kotoha.kotoha_ch10_bad.r006.s002
> $route_kotoha.kotoha_ch10_bad.r007
> $route_kotoha.kotoha_ch10_bad.r007.s002
> $route_kotoha.kotoha_ch10_bad.r007.s003

@hide kotoha fade_out
@jump kotoha_ch12_bad_end

# kotoha_ch11_start

@scene corridor_evening fade
@bgm daily_life.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch11_start.r001
> $route_kotoha.kotoha_ch11_start.r001.s002

kotoha: $route_kotoha.kotoha_ch11_start.r002

player: $route_kotoha.kotoha_ch11_start.r003

> $route_kotoha.kotoha_ch11_start.r004
> $route_kotoha.kotoha_ch11_start.r004.s002

@se door_open.mp3
@scene music_room_evening fade
@bgm stop

> $route_kotoha.kotoha_ch11_start.r005
> $route_kotoha.kotoha_ch11_start.r005.s002
> $route_kotoha.kotoha_ch11_start.r006
> $route_kotoha.kotoha_ch11_start.r006.s002

kotoha: $route_kotoha.kotoha_ch11_start.r007

player: $route_kotoha.kotoha_ch11_start.r008

> $route_kotoha.kotoha_ch11_start.r009

@still kotoha_piano_trembling

> $route_kotoha.kotoha_ch11_start.r010
> $route_kotoha.kotoha_ch11_start.r010.s002

@still_hide

kotoha: $route_kotoha.kotoha_ch11_start.r011

player: $route_kotoha.kotoha_ch11_start.r012

kotoha: $route_kotoha.kotoha_ch11_start.r013

> $route_kotoha.kotoha_ch11_start.r014
> $route_kotoha.kotoha_ch11_start.r014.s002

kotoha: $route_kotoha.kotoha_ch11_start.r015

player: $route_kotoha.kotoha_ch11_start.r016

> $route_kotoha.kotoha_ch11_start.r017

kotoha: $route_kotoha.kotoha_ch11_start.r018

@still kotoha_one_note
@se piano_single_note.mp3

> $route_kotoha.kotoha_ch11_start.r019
> $route_kotoha.kotoha_ch11_start.r019.s002

@wait 1200
@still_hide

> $route_kotoha.kotoha_ch11_start.r020
> $route_kotoha.kotoha_ch11_start.r020.s002

@show kotoha center crying fade_in

kotoha: $route_kotoha.kotoha_ch11_start.r021

> $route_kotoha.kotoha_ch11_start.r022
> $route_kotoha.kotoha_ch11_start.r022.s002

kotoha: $route_kotoha.kotoha_ch11_start.r023

player: $route_kotoha.kotoha_ch11_start.r024

kotoha: $route_kotoha.kotoha_ch11_start.r025

player: $route_kotoha.kotoha_ch11_start.r026

kotoha: $route_kotoha.kotoha_ch11_start.r027

> $route_kotoha.kotoha_ch11_start.r028

player: $route_kotoha.kotoha_ch11_start.r029

kotoha: $route_kotoha.kotoha_ch11_start.r030

player: $route_kotoha.kotoha_ch11_start.r031

@se piano_single_note.mp3
@se piano_single_note.mp3

> $route_kotoha.kotoha_ch11_start.r032
> $route_kotoha.kotoha_ch11_start.r032.s002

@bgm piano_resonance.mp3
@expr kotoha normal

player: $route_kotoha.kotoha_ch11_start.r033

kotoha: $route_kotoha.kotoha_ch11_start.r034

player: $route_kotoha.kotoha_ch11_start.r035

> $route_kotoha.kotoha_ch11_start.r036

kotoha: $route_kotoha.kotoha_ch11_start.r037

player: $route_kotoha.kotoha_ch11_start.r038

> $route_kotoha.kotoha_ch11_start.r039
> $route_kotoha.kotoha_ch11_start.r039.s002
> $route_kotoha.kotoha_ch11_start.r040
> $route_kotoha.kotoha_ch11_start.r040.s002

kotoha: $route_kotoha.kotoha_ch11_start.r041

@se piano_single_note.mp3

> $route_kotoha.kotoha_ch11_start.r042
> $route_kotoha.kotoha_ch11_start.r042.s002

@expr kotoha happy

kotoha: $route_kotoha.kotoha_ch11_start.r043

player: $route_kotoha.kotoha_ch11_start.r044

> $route_kotoha.kotoha_ch11_start.r045
> $route_kotoha.kotoha_ch11_start.r045.s002

@hide kotoha fade_out
@jump kotoha_ch12_branch

# kotoha_ch12_branch

@scene music_room_evening fade
@bgm kotoha_theme.mp3

> $route_kotoha.kotoha_ch12_branch.r001
> $route_kotoha.kotoha_ch12_branch.r001.s002

@show kotoha center thinking fade_in

> $route_kotoha.kotoha_ch12_branch.r002
> $route_kotoha.kotoha_ch12_branch.r002.s002
> $route_kotoha.kotoha_ch12_branch.r003
> $route_kotoha.kotoha_ch12_branch.r003.s002

kotoha: $route_kotoha.kotoha_ch12_branch.r004

@hide kotoha fade_out
@jump kotoha_ch12_running

# kotoha_ch12_running

@scene school_grounds_evening fade
@window_color reset
@bgm kotoha_theme.mp3

> $route_kotoha.kotoha_ch12_running.r001
> $route_kotoha.kotoha_ch12_running.r001.s002
> $route_kotoha.kotoha_ch12_running.r002
> $route_kotoha.kotoha_ch12_running.r002.s002

@window_color kotoha
@scene music_room_evening instant

> $route_kotoha.kotoha_ch12_running.r003
> $route_kotoha.kotoha_ch12_running.r003.s002
> $route_kotoha.kotoha_ch12_running.r004
> $route_kotoha.kotoha_ch12_running.r004.s002
> $route_kotoha.kotoha_ch12_running.r005
> $route_kotoha.kotoha_ch12_running.r005.s002
> $route_kotoha.kotoha_ch12_running.r005.s003
> $route_kotoha.kotoha_ch12_running.r006
> $route_kotoha.kotoha_ch12_running.r006.s002
> $route_kotoha.kotoha_ch12_running.decision
> $route_kotoha.kotoha_ch12_running.decision.s002

@window_color reset
@scene school_grounds_evening instant

> $route_kotoha.kotoha_ch12_running.r007
> $route_kotoha.kotoha_ch12_running.r007.s002
> $route_kotoha.kotoha_ch12_running.r007.s003

@scene corridor_evening fade
@bgm daily_life.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch12_running.r008

kotoha: $route_kotoha.kotoha_ch12_running.r009

player: $route_kotoha.kotoha_ch12_running.r010

kotoha: $route_kotoha.kotoha_ch12_running.r011

player: $route_kotoha.kotoha_ch12_running.r012

kotoha: $route_kotoha.kotoha_ch12_running.r013

> $route_kotoha.kotoha_ch12_running.r014

kotoha: $route_kotoha.kotoha_ch12_running.r015

player: $route_kotoha.kotoha_ch12_running.r016

@hide kotoha fade_out
@jump kotoha_ch12_practice

# kotoha_ch12_practice

@scene music_room_evening fade
@bgm daily_life.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch12_practice.r001
> $route_kotoha.kotoha_ch12_practice.r001.s002
> $route_kotoha.kotoha_ch12_practice.r001.s003

kotoha: $route_kotoha.kotoha_ch12_practice.r002

player: $route_kotoha.kotoha_ch12_practice.r003

kotoha: $route_kotoha.kotoha_ch12_practice.r004

> $route_kotoha.kotoha_ch12_practice.r005
> $route_kotoha.kotoha_ch12_practice.r005.s002

kotoha: $route_kotoha.kotoha_ch12_practice.r006

player: $route_kotoha.kotoha_ch12_practice.r007

kotoha: $route_kotoha.kotoha_ch12_practice.r008

> $route_kotoha.kotoha_ch12_practice.r009

@bgm quiet_piano_distant.mp3

> $route_kotoha.kotoha_ch12_practice.r010

kotoha: $route_kotoha.kotoha_ch12_practice.r011

player: $route_kotoha.kotoha_ch12_practice.r012

kotoha: $route_kotoha.kotoha_ch12_practice.r013

> $route_kotoha.kotoha_ch12_practice.r014

@hide kotoha fade_out
@jump kotoha_ch12_good_end

# kotoha_ch12_good_end

@scene school_grounds_evening fade
@bgm kotoha_theme.mp3
@if kotoha_relay_join == 1 -> kotoha_relay_finished

> $route_kotoha.kotoha_ch12_good_end.training_result
> $route_kotoha.kotoha_ch12_good_end.training_result.s002

@jump kotoha_concert_resume

# kotoha_relay_finished

> $route_kotoha.kotoha_ch12_good_end.relay_result
> $route_kotoha.kotoha_ch12_good_end.relay_result.s002

@jump kotoha_concert_resume

# kotoha_concert_resume

@scene stage fade

> $route_kotoha.kotoha_ch12_good_end.r001
> $route_kotoha.kotoha_ch12_good_end.r001.s002
> $route_kotoha.kotoha_ch12_good_end.r001.s003
> $route_kotoha.kotoha_ch12_good_end.r002
> $route_kotoha.kotoha_ch12_good_end.r002.s002

@bgm stop
@still kotoha_performance1
@bgm kotoha_piano_stage.mp3

> $route_kotoha.kotoha_ch12_good_end.r003
> $route_kotoha.kotoha_ch12_good_end.r003.s002
> $route_kotoha.kotoha_ch12_good_end.r004
> $route_kotoha.kotoha_ch12_good_end.r004.s002

@se piano_single_note.mp3

> $route_kotoha.kotoha_ch12_good_end.r005
> $route_kotoha.kotoha_ch12_good_end.r005.s002

@still kotoha_performance2

> $route_kotoha.kotoha_ch12_good_end.r006
> $route_kotoha.kotoha_ch12_good_end.r006.s002
> $route_kotoha.kotoha_ch12_good_end.r007
> $route_kotoha.kotoha_ch12_good_end.r007.s002

@bgm stop
@se applause.mp3
@still_hide

> $route_kotoha.kotoha_ch12_good_end.r008
> $route_kotoha.kotoha_ch12_good_end.r008.s002

@scene music_room_evening fade
@bgm piano_resonance.mp3
@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch12_good_end.r009
> $route_kotoha.kotoha_ch12_good_end.r009.s002
> $route_kotoha.kotoha_ch12_good_end.read_aloud

kotoha: $route_kotoha.kotoha_ch12_good_end.r010

player: $route_kotoha.kotoha_ch12_good_end.r011

kotoha: $route_kotoha.kotoha_ch12_good_end.r012

> $route_kotoha.kotoha_ch12_good_end.r013
> $route_kotoha.kotoha_ch12_good_end.r013.s002

player: $route_kotoha.kotoha_ch12_good_end.r014

kotoha: $route_kotoha.kotoha_ch12_good_end.r015

player: $route_kotoha.kotoha_ch12_good_end.r016

kotoha: $route_kotoha.kotoha_ch12_good_end.r017

player: $route_kotoha.kotoha_ch12_good_end.r018

kotoha: $route_kotoha.kotoha_ch12_good_end.r019

> $route_kotoha.kotoha_ch12_good_end.r020

@expr kotoha happy
@emote kotoha nod 0.35

kotoha: $route_kotoha.kotoha_ch12_good_end.r021

player: $route_kotoha.kotoha_ch12_good_end.r022

kotoha: $route_kotoha.kotoha_ch12_good_end.r023

player: $route_kotoha.kotoha_ch12_good_end.r024

> $route_kotoha.kotoha_ch12_good_end.r025

kotoha: $route_kotoha.kotoha_ch12_good_end.r026

> $route_kotoha.kotoha_ch12_good_end.r027
> $route_kotoha.kotoha_ch12_good_end.r027.s002
> $route_kotoha.kotoha_ch12_good_end.r027.s003

@still kotoha_piano_side
@ending_intro きみと触れる音.mp3 kotoha_good_end 13000
@scene street_plaza_summer fade
@bgm epilogue_sunset_for_each.mp3

> $route_kotoha.kotoha_ch12_good_end.r028

@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch12_good_end.r029
> $route_kotoha.kotoha_ch12_good_end.r029.s002

@se piano_single_note.mp3

> $route_kotoha.kotoha_ch12_good_end.r030
> $route_kotoha.kotoha_ch12_good_end.r030.s002
> $route_kotoha.kotoha_ch12_good_end.r031

kotoha: $route_kotoha.kotoha_ch12_good_end.r032

player: $route_kotoha.kotoha_ch12_good_end.r033

kotoha: $route_kotoha.kotoha_ch12_good_end.r034

> $route_kotoha.kotoha_ch12_good_end.r035

kotoha: $route_kotoha.kotoha_ch12_good_end.r036

player: $route_kotoha.kotoha_ch12_good_end.r037

kotoha: $route_kotoha.kotoha_ch12_good_end.r038
kotoha: $route_kotoha.kotoha_ch12_good_end.again

player: $route_kotoha.kotoha_ch12_good_end.agree

> $route_kotoha.kotoha_ch12_good_end.r039
> $route_kotoha.kotoha_ch12_good_end.r039.s002

@still kotoha_epilogue fade_in
@click_wait
@end "$route_kotoha.kotoha_ch12_good_end.r040"

# kotoha_ch12_bad_end

@scene corridor_evening fade
@bgm bad_end_loop.mp3

> $route_kotoha.kotoha_ch12_bad_end.r001
> $route_kotoha.kotoha_ch12_bad_end.r001.s002
> $route_kotoha.kotoha_ch12_bad_end.r002
> $route_kotoha.kotoha_ch12_bad_end.r002.s002

@show kotoha center normal fade_in

> $route_kotoha.kotoha_ch12_bad_end.r003
> $route_kotoha.kotoha_ch12_bad_end.r003.s002
> $route_kotoha.kotoha_ch12_bad_end.r003.s003

kotoha: $route_kotoha.kotoha_ch12_bad_end.r004

player: $route_kotoha.kotoha_ch12_bad_end.r005

kotoha: $route_kotoha.kotoha_ch12_bad_end.r006

player: $route_kotoha.kotoha_ch12_bad_end.r007

> $route_kotoha.kotoha_ch12_bad_end.r008

kotoha: $route_kotoha.kotoha_ch12_bad_end.r009

> $route_kotoha.kotoha_ch12_bad_end.r010
> $route_kotoha.kotoha_ch12_bad_end.r010.s002

@hide kotoha fade_out

> $route_kotoha.kotoha_ch12_bad_end.r011
> $route_kotoha.kotoha_ch12_bad_end.r011.s002
> $route_kotoha.kotoha_ch12_bad_end.r011.s003
> $route_kotoha.kotoha_ch12_bad_end.r012
> $route_kotoha.kotoha_ch12_bad_end.r012.s002

@scene classroom_night fade

> $route_kotoha.kotoha_ch12_bad_end.context001
> $route_kotoha.kotoha_ch12_bad_end.context001.s002

@still bad_end_empty_classroom
@bgm bad_end_loop.mp3
@still_hide
@scene protagonist_room_night fade

> $route_kotoha.kotoha_ch12_bad_end.r013
> $route_kotoha.kotoha_ch12_bad_end.r013.s002
> $route_kotoha.kotoha_ch12_bad_end.r014

@ending_intro bad_end_loop.mp3 bad_end 10500
@end "$route_kotoha.kotoha_ch12_bad_end.r015"
