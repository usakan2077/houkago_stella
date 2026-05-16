// ===================================================================
//  放課後のステラ — さくらルート Ch.9s〜12s
//  「散らないように、咲く」
// ===================================================================


// ===================================================================
//  幕間「桜咲さくらの独白」
// ===================================================================

# sakura_interlude

@window_color sakura
@scene classroom_night fade
@bgm night_melody.mp3
@wait 1200

> $route_sakura.sakura_interlude.t001

@wait 1000

sakura: $route_sakura.sakura_interlude.t002

@wait 1000

sakura: $route_sakura.sakura_interlude.t003
sakura: $route_sakura.sakura_interlude.t004

@wait 800

sakura: $route_sakura.sakura_interlude.t005

@wait 1200

sakura: $route_sakura.sakura_interlude.t006
sakura: $route_sakura.sakura_interlude.t007
sakura: $route_sakura.sakura_interlude.t008
sakura: $route_sakura.sakura_interlude.t009

@wait 1000

sakura: $route_sakura.sakura_interlude.t010
sakura: $route_sakura.sakura_interlude.t011

@wait 1200

sakura: $route_sakura.sakura_interlude.t012

@wait 1000

sakura: $route_sakura.sakura_interlude.t013

@wait 1500

sakura: $route_sakura.sakura_interlude.t014

@wait 800

sakura: $route_sakura.sakura_interlude.t015
sakura: $route_sakura.sakura_interlude.t016

@wait 1000

sakura: $route_sakura.sakura_interlude.t017

@wait 1200

sakura: $route_sakura.sakura_interlude.t018

@wait 800

sakura: $route_sakura.sakura_interlude.t019
sakura: $route_sakura.sakura_interlude.t020
sakura: $route_sakura.sakura_interlude.t021

@wait 1000

sakura: $route_sakura.sakura_interlude.t022
sakura: $route_sakura.sakura_interlude.t023

@wait 1200

sakura: $route_sakura.sakura_interlude.t024

@wait 800

sakura: $route_sakura.sakura_interlude.t025
sakura: $route_sakura.sakura_interlude.t026

@wait 1000

sakura: $route_sakura.sakura_interlude.t027

@wait 1500

@bgm stop
@wait 800

@window_color reset
@wait 700
@jump sakura_ch9_start


// ===================================================================
//  Chapter 9s「誰もいない部屋」
// ===================================================================

# sakura_ch9_start

@scene school_gate_autumn_rainy fade
@bgm sakura_theme.mp3
@se footsteps.mp3
@wait 800

> $route_sakura.sakura_ch9_start.t001

> $route_sakura.sakura_ch9_start.t002
> $route_sakura.sakura_ch9_start.t003

> $route_sakura.sakura_ch9_start.t004

> $route_sakura.sakura_ch9_start.t005

> $route_sakura.sakura_ch9_start.t006
> $route_sakura.sakura_ch9_start.t007
> $route_sakura.sakura_ch9_start.t008

> $route_sakura.sakura_ch9_start.t009

@se footsteps.mp3
@wait 600

> $route_sakura.sakura_ch9_start.t010
> $route_sakura.sakura_ch9_start.t011

@wait 1000

> $route_sakura.sakura_ch9_start.t012

@show sakura center normal fade_in

> $route_sakura.sakura_ch9_start.t013
> $route_sakura.sakura_ch9_start.t014
> $route_sakura.sakura_ch9_start.t015

@wait 600

player: $route_sakura.sakura_ch9_start.t016

@expr sakura surprised

sakura: $route_sakura.sakura_ch9_start.t017

sakura: $route_sakura.sakura_ch9_start.t018

sakura: $route_sakura.sakura_ch9_start.t019

player: $route_sakura.sakura_ch9_start.t020

@wait 500

sakura: $route_sakura.sakura_ch9_start.t021

sakura: $route_sakura.sakura_ch9_start.t022

player: $route_sakura.sakura_ch9_start.t023

sakura: $route_sakura.sakura_ch9_start.t024

player: $route_sakura.sakura_ch9_start.t025

@wait 700

@expr sakura blank

> $route_sakura.sakura_ch9_start.t026

> $route_sakura.sakura_ch9_start.t027
> $route_sakura.sakura_ch9_start.t028

@wait 1000

@expr sakura happy

sakura: $route_sakura.sakura_ch9_start.t029

sakura: $route_sakura.sakura_ch9_start.t030

@se footsteps.mp3
@wait 500

@hide sakura slide_out_left
@wait 400

> $route_sakura.sakura_ch9_start.t031
> $route_sakura.sakura_ch9_start.t032

@bgm stop
@wait 300

@jump sakura_ch9_days


# sakura_ch9_days

@scene classroom fade
@bgm daily_life.mp3
@se school_bell.mp3
@wait 1000

> $route_sakura.sakura_ch9_days.t001

> $route_sakura.sakura_ch9_days.t002
> $route_sakura.sakura_ch9_days.t003

> $route_sakura.sakura_ch9_days.t004
> $route_sakura.sakura_ch9_days.t005

@show sakura right happy fade_in

sakura: $route_sakura.sakura_ch9_days.t006

player: $route_sakura.sakura_ch9_days.t007

sakura: $route_sakura.sakura_ch9_days.t008

player: $route_sakura.sakura_ch9_days.t009

@wait 400

@expr sakura normal

sakura: $route_sakura.sakura_ch9_days.t010

sakura: $route_sakura.sakura_ch9_days.t011
sakura: $route_sakura.sakura_ch9_days.t012

player: $route_sakura.sakura_ch9_days.t013

@wait 500

@expr sakura thinking

sakura: $route_sakura.sakura_ch9_days.t014

sakura: $route_sakura.sakura_ch9_days.t015

@wait 400

player: $route_sakura.sakura_ch9_days.t016

sakura: $route_sakura.sakura_ch9_days.t017

@wait 600

@expr sakura happy

sakura: $route_sakura.sakura_ch9_days.t018
sakura: $route_sakura.sakura_ch9_days.t019

> *$route_sakura.sakura_ch9_days.t020*

player: $route_sakura.sakura_ch9_days.t021

sakura: $route_sakura.sakura_ch9_days.t022

@hide sakura fade_out
@wait 500

@jump sakura_ch9_daily_life


# sakura_ch9_daily_life

@scene corridor fade
@bgm daily_life.mp3
@wait 800

> $route_sakura.sakura_ch9_daily_life.t001

> $route_sakura.sakura_ch9_daily_life.t002
> $route_sakura.sakura_ch9_daily_life.t003
> $route_sakura.sakura_ch9_daily_life.t004
> $route_sakura.sakura_ch9_daily_life.t005

> $route_sakura.sakura_ch9_daily_life.t006
> $route_sakura.sakura_ch9_daily_life.t007

@show sakura left happy fade_in

sakura: $route_sakura.sakura_ch9_daily_life.t008

player: $route_sakura.sakura_ch9_daily_life.t009

sakura: $route_sakura.sakura_ch9_daily_life.t010

player: $route_sakura.sakura_ch9_daily_life.t011

sakura: $route_sakura.sakura_ch9_daily_life.t012

player: $route_sakura.sakura_ch9_daily_life.t013

sakura: $route_sakura.sakura_ch9_daily_life.t014

@wait 400

> $route_sakura.sakura_ch9_daily_life.t015
> $route_sakura.sakura_ch9_daily_life.t016

@wait 500

@expr sakura normal

> $route_sakura.sakura_ch9_daily_life.t017
> $route_sakura.sakura_ch9_daily_life.t018
> $route_sakura.sakura_ch9_daily_life.t019

> $route_sakura.sakura_ch9_daily_life.t020
> $route_sakura.sakura_ch9_daily_life.t021

@hide sakura fade_out
@wait 500

@jump sakura_ch9_daily2


# sakura_ch9_daily2

@scene cafeteria fade
@bgm daily_life.mp3
@wait 700

> $route_sakura.sakura_ch9_daily2.t001

> $route_sakura.sakura_ch9_daily2.t002
> $route_sakura.sakura_ch9_daily2.t003
> $route_sakura.sakura_ch9_daily2.t004

@show sakura center happy fade_in

sakura: $route_sakura.sakura_ch9_daily2.t005

player: $route_sakura.sakura_ch9_daily2.t006

sakura: $route_sakura.sakura_ch9_daily2.t007

player: $route_sakura.sakura_ch9_daily2.t008

sakura: $route_sakura.sakura_ch9_daily2.t009

@wait 400

player: $route_sakura.sakura_ch9_daily2.t010

sakura: $route_sakura.sakura_ch9_daily2.t011

@wait 500

> $route_sakura.sakura_ch9_daily2.t012
> $route_sakura.sakura_ch9_daily2.t013

@wait 400

@expr sakura normal

sakura: $route_sakura.sakura_ch9_daily2.t014

sakura: $route_sakura.sakura_ch9_daily2.t015

@wait 500

player: $route_sakura.sakura_ch9_daily2.t016

sakura: $route_sakura.sakura_ch9_daily2.t017

@wait 600

player: $route_sakura.sakura_ch9_daily2.t018

@wait 300

@expr sakura thinking

sakura: $route_sakura.sakura_ch9_daily2.t019

sakura: $route_sakura.sakura_ch9_daily2.t020

sakura: $route_sakura.sakura_ch9_daily2.t021

player: $route_sakura.sakura_ch9_daily2.t022

sakura: $route_sakura.sakura_ch9_daily2.t023

@wait 500

> *$route_sakura.sakura_ch9_daily2.t024*
> *$route_sakura.sakura_ch9_daily2.t025*

player: $route_sakura.sakura_ch9_daily2.t026

@expr sakura happy

sakura: $route_sakura.sakura_ch9_daily2.t027

player: $route_sakura.sakura_ch9_daily2.t028

sakura: $route_sakura.sakura_ch9_daily2.t029

player: $route_sakura.sakura_ch9_daily2.t030

sakura: $route_sakura.sakura_ch9_daily2.t031

@wait 600

> $route_sakura.sakura_ch9_daily2.t032
> $route_sakura.sakura_ch9_daily2.t033
> $route_sakura.sakura_ch9_daily2.t034

@hide sakura fade_out
@wait 500

@jump sakura_ch9_gym


# sakura_ch9_gym

@scene gymnasium fade
@bgm daily_life.mp3
@wait 800

> $route_sakura.sakura_ch9_gym.t001

> $route_sakura.sakura_ch9_gym.t002
> $route_sakura.sakura_ch9_gym.t003
> $route_sakura.sakura_ch9_gym.t004

> $route_sakura.sakura_ch9_gym.t005

@show sakura_sports left happy fade_in

sakura: $route_sakura.sakura_ch9_gym.t006
sakura: $route_sakura.sakura_ch9_gym.t007

> $route_sakura.sakura_ch9_gym.t008

sakura: $route_sakura.sakura_ch9_gym.t009

> $route_sakura.sakura_ch9_gym.t010
> $route_sakura.sakura_ch9_gym.t011
> $route_sakura.sakura_ch9_gym.t012

@wait 800

@expr sakura_sports normal

> $route_sakura.sakura_ch9_gym.t013
> $route_sakura.sakura_ch9_gym.t014
> $route_sakura.sakura_ch9_gym.t015

> $route_sakura.sakura_ch9_gym.t016
> $route_sakura.sakura_ch9_gym.t017

@wait 600

@expr sakura_sports happy

sakura: $route_sakura.sakura_ch9_gym.t018
sakura: $route_sakura.sakura_ch9_gym.t019

> $route_sakura.sakura_ch9_gym.t020

sakura: $route_sakura.sakura_ch9_gym.t021

> $route_sakura.sakura_ch9_gym.t022
> $route_sakura.sakura_ch9_gym.t023

@wait 500

> $route_sakura.sakura_ch9_gym.t024
> $route_sakura.sakura_ch9_gym.t025
> $route_sakura.sakura_ch9_gym.t026

> $route_sakura.sakura_ch9_gym.t027
> $route_sakura.sakura_ch9_gym.t028

@wait 400

> $route_sakura.sakura_ch9_gym.t029
> $route_sakura.sakura_ch9_gym.t030
> $route_sakura.sakura_ch9_gym.t031

@se footsteps.mp3
@wait 400

> $route_sakura.sakura_ch9_gym.t032

@expr sakura_sports normal

> $route_sakura.sakura_ch9_gym.t033

> $route_sakura.sakura_ch9_gym.t034
> $route_sakura.sakura_ch9_gym.t035

> $route_sakura.sakura_ch9_gym.t036

@wait 800

player: $route_sakura.sakura_ch9_gym.t037

@expr sakura_sports normal

sakura: $route_sakura.sakura_ch9_gym.t038

player: $route_sakura.sakura_ch9_gym.t039

sakura: $route_sakura.sakura_ch9_gym.t040

> $route_sakura.sakura_ch9_gym.t041
> $route_sakura.sakura_ch9_gym.t042

@hide sakura_sports fade_out
@wait 500

@jump sakura_ch9_walk


# sakura_ch9_walk

@scene gymnasium_back_school fade
@bgm evening_piano.mp3
@wait 700

> $route_sakura.sakura_ch9_walk.t001

> $route_sakura.sakura_ch9_walk.t002
> $route_sakura.sakura_ch9_walk.t003

@show sakura right normal fade_in

sakura: $route_sakura.sakura_ch9_walk.t004

player: $route_sakura.sakura_ch9_walk.t005

sakura: $route_sakura.sakura_ch9_walk.t006

player: $route_sakura.sakura_ch9_walk.t007

sakura: $route_sakura.sakura_ch9_walk.t008

@wait 400

sakura: $route_sakura.sakura_ch9_walk.t009

player: $route_sakura.sakura_ch9_walk.t010

@wait 500

@expr sakura thinking

sakura: $route_sakura.sakura_ch9_walk.t011

sakura: $route_sakura.sakura_ch9_walk.t012

@wait 400

@expr sakura happy

sakura: $route_sakura.sakura_ch9_walk.t013

player: $route_sakura.sakura_ch9_walk.t014

@wait 600

> *$route_sakura.sakura_ch9_walk.t015*

> *$route_sakura.sakura_ch9_walk.t016*
> *$route_sakura.sakura_ch9_walk.t017*
> *$route_sakura.sakura_ch9_walk.t018*

> *$route_sakura.sakura_ch9_walk.t019*

player: $route_sakura.sakura_ch9_walk.t020

sakura: $route_sakura.sakura_ch9_walk.t021

player: $route_sakura.sakura_ch9_walk.t022

sakura: $route_sakura.sakura_ch9_walk.t023

player: $route_sakura.sakura_ch9_walk.t024

sakura: $route_sakura.sakura_ch9_walk.t025

@wait 500

player: $route_sakura.sakura_ch9_walk.t026

@expr sakura shy

sakura: $route_sakura.sakura_ch9_walk.t027

player: $route_sakura.sakura_ch9_walk.t028

sakura: $route_sakura.sakura_ch9_walk.t029

player: $route_sakura.sakura_ch9_walk.t030

@wait 500

@expr sakura normal

sakura: $route_sakura.sakura_ch9_walk.t031

@wait 600

> $route_sakura.sakura_ch9_walk.t032
> $route_sakura.sakura_ch9_walk.t033
> $route_sakura.sakura_ch9_walk.t034

> $route_sakura.sakura_ch9_walk.t035
> $route_sakura.sakura_ch9_walk.t036

@hide sakura fade_out
@wait 500

@jump sakura_ch9_mother


# sakura_ch9_mother

@scene protagonist_room_night fade
@bgm night_melody.mp3
@wait 800

> $route_sakura.sakura_ch9_mother.t001

> $route_sakura.sakura_ch9_mother.t002
> $route_sakura.sakura_ch9_mother.t003

> $route_sakura.sakura_ch9_mother.t004
> $route_sakura.sakura_ch9_mother.t005

@wait 600

player: $route_sakura.sakura_ch9_mother.t006

@wait 400

> $route_sakura.sakura_ch9_mother.t007
> $route_sakura.sakura_ch9_mother.t008

> $route_sakura.sakura_ch9_mother.t009

@wait 500

player: $route_sakura.sakura_ch9_mother.t010

> $route_sakura.sakura_ch9_mother.t011

@wait 600

> $route_sakura.sakura_ch9_mother.t012

> $route_sakura.sakura_ch9_mother.t013

@wait 1000

@bgm stop
@wait 400

> $route_sakura.sakura_ch9_mother.t014
> $route_sakura.sakura_ch9_mother.t015

@wait 800

> *$route_sakura.sakura_ch9_mother.t016*
> *$route_sakura.sakura_ch9_mother.t017*
> *$route_sakura.sakura_ch9_mother.t018*

@wait 600

> $route_sakura.sakura_ch9_mother.t019

> $route_sakura.sakura_ch9_mother.t020
> $route_sakura.sakura_ch9_mother.t021

> $route_sakura.sakura_ch9_mother.t022
> $route_sakura.sakura_ch9_mother.t023

@wait 700

> $route_sakura.sakura_ch9_mother.t024

player: $route_sakura.sakura_ch9_mother.t025

@wait 400

> $route_sakura.sakura_ch9_mother.t026
> $route_sakura.sakura_ch9_mother.t027

@wait 500

> $route_sakura.sakura_ch9_mother.t028
> $route_sakura.sakura_ch9_mother.t029

@bgm night_melody.mp3
@wait 600

@jump sakura_ch9_daily3


# sakura_ch9_daily3

@scene classroom fade
@bgm daily_life.mp3
@wait 800

> $route_sakura.sakura_ch9_daily3.t001

> $route_sakura.sakura_ch9_daily3.t002
> $route_sakura.sakura_ch9_daily3.t003

@show sakura right happy fade_in

sakura: $route_sakura.sakura_ch9_daily3.t004

player: $route_sakura.sakura_ch9_daily3.t005

sakura: $route_sakura.sakura_ch9_daily3.t006

player: $route_sakura.sakura_ch9_daily3.t007

sakura: $route_sakura.sakura_ch9_daily3.t008

player: $route_sakura.sakura_ch9_daily3.t009

sakura: $route_sakura.sakura_ch9_daily3.t010

player: $route_sakura.sakura_ch9_daily3.t011

@wait 400

sakura: $route_sakura.sakura_ch9_daily3.t012
sakura: $route_sakura.sakura_ch9_daily3.t013

@wait 500

player: $route_sakura.sakura_ch9_daily3.t014

@expr sakura thinking

sakura: $route_sakura.sakura_ch9_daily3.t015

sakura: $route_sakura.sakura_ch9_daily3.t016
sakura: $route_sakura.sakura_ch9_daily3.t017

player: $route_sakura.sakura_ch9_daily3.t018

sakura: $route_sakura.sakura_ch9_daily3.t019
sakura: $route_sakura.sakura_ch9_daily3.t020

@wait 600

@expr sakura happy

sakura: $route_sakura.sakura_ch9_daily3.t021

player: $route_sakura.sakura_ch9_daily3.t022

@wait 400

> *$route_sakura.sakura_ch9_daily3.t023*

> *$route_sakura.sakura_ch9_daily3.t024*

player: $route_sakura.sakura_ch9_daily3.t025

@expr sakura surprised

sakura: $route_sakura.sakura_ch9_daily3.t026

player: $route_sakura.sakura_ch9_daily3.t027

sakura: $route_sakura.sakura_ch9_daily3.t028

@wait 500

> $route_sakura.sakura_ch9_daily3.t029
> $route_sakura.sakura_ch9_daily3.t030

> $route_sakura.sakura_ch9_daily3.t031
> $route_sakura.sakura_ch9_daily3.t032
> $route_sakura.sakura_ch9_daily3.t033

> $route_sakura.sakura_ch9_daily3.t034
> $route_sakura.sakura_ch9_daily3.t035

@hide sakura fade_out
@wait 500

@jump sakura_ch9_choice


# sakura_ch9_choice

@scene commute_road_autumn_evening fade
@bgm sakura_theme.mp3
@wait 700

> $route_sakura.sakura_ch9_choice.t001
> $route_sakura.sakura_ch9_choice.t002

@show sakura right normal fade_in

> $route_sakura.sakura_ch9_choice.t003
> $route_sakura.sakura_ch9_choice.t004

> $route_sakura.sakura_ch9_choice.t005
> $route_sakura.sakura_ch9_choice.t006

@wait 600

@expr sakura happy

sakura: $route_sakura.sakura_ch9_choice.t007

player: $route_sakura.sakura_ch9_choice.t008

@wait 400

@choice
- $choices.route_sakura.ask_okay -> sakura_ch9_ask
- $choices.route_sakura.say_nothing -> sakura_ch9_silent


# sakura_ch9_ask

player: $route_sakura.sakura_ch9_ask.t001

@wait 500

@expr sakura surprised

sakura: $route_sakura.sakura_ch9_ask.t002

@wait 300

@expr sakura happy

sakura: $route_sakura.sakura_ch9_ask.t003
sakura: $route_sakura.sakura_ch9_ask.t004

@wait 700

> *$route_sakura.sakura_ch9_ask.t005*

player: $route_sakura.sakura_ch9_ask.t006

sakura: $route_sakura.sakura_ch9_ask.t007

@wait 600

> $route_sakura.sakura_ch9_ask.t008

> $route_sakura.sakura_ch9_ask.t009
> $route_sakura.sakura_ch9_ask.t010

> $route_sakura.sakura_ch9_ask.t011
> $route_sakura.sakura_ch9_ask.t012

@jump sakura_ch9_end


# sakura_ch9_silent

> $route_sakura.sakura_ch9_silent.t001

> $route_sakura.sakura_ch9_silent.t002
> $route_sakura.sakura_ch9_silent.t003
> $route_sakura.sakura_ch9_silent.t004

@wait 600

sakura: $route_sakura.sakura_ch9_silent.t005

sakura: $route_sakura.sakura_ch9_silent.t006

player: $route_sakura.sakura_ch9_silent.t007

sakura: $route_sakura.sakura_ch9_silent.t008

@wait 400

@expr sakura normal

sakura: $route_sakura.sakura_ch9_silent.t009

sakura: $route_sakura.sakura_ch9_silent.t010

@wait 600

> *$route_sakura.sakura_ch9_silent.t011*

@jump sakura_ch9_end


# sakura_ch9_end

@hide sakura fade_out
@scene commute_road_autumn_evening fade
@bgm evening_piano.mp3
@wait 800

> $route_sakura.sakura_ch9_end.t001

> $route_sakura.sakura_ch9_end.t002
> $route_sakura.sakura_ch9_end.t003
> $route_sakura.sakura_ch9_end.t004

> $route_sakura.sakura_ch9_end.t005
> $route_sakura.sakura_ch9_end.t006

@wait 1000

> *$route_sakura.sakura_ch9_end.t007*
> *$route_sakura.sakura_ch9_end.t008*

> *$route_sakura.sakura_ch9_end.t009*
> *$route_sakura.sakura_ch9_end.t010*

> *$route_sakura.sakura_ch9_end.t011*
> *$route_sakura.sakura_ch9_end.t012*
> *$route_sakura.sakura_ch9_end.t013*

@wait 1000

@bgm stop
@wait 500

@jump sakura_ch10_start


// ===================================================================
//  Chapter 10s「笑えない」
// ===================================================================

# sakura_ch10_start

@scene classroom fade
@bgm daily_life.mp3
@se school_bell.mp3
@wait 800

> $route_sakura.sakura_ch10_start.t001

> $route_sakura.sakura_ch10_start.t002
> $route_sakura.sakura_ch10_start.t003
> $route_sakura.sakura_ch10_start.t004

> $route_sakura.sakura_ch10_start.t005
> $route_sakura.sakura_ch10_start.t006

@show sakura right happy fade_in

sakura: $route_sakura.sakura_ch10_start.t007

player: $route_sakura.sakura_ch10_start.t008

sakura: $route_sakura.sakura_ch10_start.t009
sakura: $route_sakura.sakura_ch10_start.t010

player: $route_sakura.sakura_ch10_start.t011

sakura: $route_sakura.sakura_ch10_start.t012

@wait 400

@expr sakura normal

> $route_sakura.sakura_ch10_start.t013

> $route_sakura.sakura_ch10_start.t014

@wait 300

@expr sakura blank

> $route_sakura.sakura_ch10_start.t015

> $route_sakura.sakura_ch10_start.t016
> $route_sakura.sakura_ch10_start.t017

@wait 800

@expr sakura happy

sakura: $route_sakura.sakura_ch10_start.t018

player: $route_sakura.sakura_ch10_start.t019

@wait 400

> *$route_sakura.sakura_ch10_start.t020*
> *$route_sakura.sakura_ch10_start.t021*

@hide sakura fade_out
@wait 500

@jump sakura_ch10_message


# sakura_ch10_message

@scene protagonist_room_night fade
@bgm night_melody.mp3
@wait 800

> $route_sakura.sakura_ch10_message.t001

> $route_sakura.sakura_ch10_message.t002

> $route_sakura.sakura_ch10_message.t003

> $route_sakura.sakura_ch10_message.t004
> $route_sakura.sakura_ch10_message.t005

@wait 600

player: $route_sakura.sakura_ch10_message.t006

@wait 400

> $route_sakura.sakura_ch10_message.t007

> $route_sakura.sakura_ch10_message.t008

@wait 800

> *$route_sakura.sakura_ch10_message.t009*
> *$route_sakura.sakura_ch10_message.t010*

@bgm stop
@wait 300

> $route_sakura.sakura_ch10_message.t011
> $route_sakura.sakura_ch10_message.t012

> $route_sakura.sakura_ch10_message.t013
> $route_sakura.sakura_ch10_message.t014
> $route_sakura.sakura_ch10_message.t015

> $route_sakura.sakura_ch10_message.t016

@wait 600

> $route_sakura.sakura_ch10_message.t017
> $route_sakura.sakura_ch10_message.t018
> $route_sakura.sakura_ch10_message.t019

> $route_sakura.sakura_ch10_message.t020
> $route_sakura.sakura_ch10_message.t021

@wait 800

player: $route_sakura.sakura_ch10_message.t022

@wait 500

> $route_sakura.sakura_ch10_message.t023

> $route_sakura.sakura_ch10_message.t024
> $route_sakura.sakura_ch10_message.t025

> $route_sakura.sakura_ch10_message.t026
> $route_sakura.sakura_ch10_message.t027

@wait 600

> $route_sakura.sakura_ch10_message.t028
> $route_sakura.sakura_ch10_message.t029

> $route_sakura.sakura_ch10_message.t030
> $route_sakura.sakura_ch10_message.t031

@bgm night_melody.mp3
@wait 500

@jump sakura_ch10_gym


# sakura_ch10_gym

@scene gymnasium fade
@bgm daily_life.mp3
@wait 800

> $route_sakura.sakura_ch10_gym.t001

> $route_sakura.sakura_ch10_gym.t002
> $route_sakura.sakura_ch10_gym.t003

@show sakura_sports center happy fade_in

sakura: $route_sakura.sakura_ch10_gym.t004

> $route_sakura.sakura_ch10_gym.t005

sakura: $route_sakura.sakura_ch10_gym.t006

@wait 500

@expr sakura_sports normal

> $route_sakura.sakura_ch10_gym.t007

> $route_sakura.sakura_ch10_gym.t008
> $route_sakura.sakura_ch10_gym.t009
> $route_sakura.sakura_ch10_gym.t010

@expr sakura_sports happy

sakura: $route_sakura.sakura_ch10_gym.t011

> $route_sakura.sakura_ch10_gym.t012

sakura: $route_sakura.sakura_ch10_gym.t013

@wait 400

> $route_sakura.sakura_ch10_gym.t014
> $route_sakura.sakura_ch10_gym.t015

sakura: $route_sakura.sakura_ch10_gym.t016

> $route_sakura.sakura_ch10_gym.t017

sakura: $route_sakura.sakura_ch10_gym.t018

@wait 600

> $route_sakura.sakura_ch10_gym.t019

sakura: $route_sakura.sakura_ch10_gym.t020

@wait 500

> $route_sakura.sakura_ch10_gym.t021

@se footsteps.mp3
@wait 300

@expr sakura_sports normal

> $route_sakura.sakura_ch10_gym.t022

> $route_sakura.sakura_ch10_gym.t023
> $route_sakura.sakura_ch10_gym.t024

@expr sakura_sports happy

sakura: $route_sakura.sakura_ch10_gym.t025

@wait 400

> $route_sakura.sakura_ch10_gym.t026

sakura: $route_sakura.sakura_ch10_gym.t027

> $route_sakura.sakura_ch10_gym.t028

sakura: $route_sakura.sakura_ch10_gym.t029

> $route_sakura.sakura_ch10_gym.t030

sakura: $route_sakura.sakura_ch10_gym.t031
sakura: $route_sakura.sakura_ch10_gym.t032
sakura: $route_sakura.sakura_ch10_gym.t033

@wait 500

> $route_sakura.sakura_ch10_gym.t034

> $route_sakura.sakura_ch10_gym.t035
> $route_sakura.sakura_ch10_gym.t036

@wait 600

> *$route_sakura.sakura_ch10_gym.t037*
> *$route_sakura.sakura_ch10_gym.t038*

@hide sakura_sports fade_out
@wait 500

@jump sakura_ch10_after_practice


# sakura_ch10_after_practice

@scene gymnasium fade
@bgm daily_life.mp3
@wait 700

> $route_sakura.sakura_ch10_after_practice.t001

> $route_sakura.sakura_ch10_after_practice.t002

@show sakura_sports right normal fade_in

> $route_sakura.sakura_ch10_after_practice.t003
> $route_sakura.sakura_ch10_after_practice.t004

@expr sakura_sports happy

sakura: $route_sakura.sakura_ch10_after_practice.t005

> $route_sakura.sakura_ch10_after_practice.t006

> $route_sakura.sakura_ch10_after_practice.t007
> $route_sakura.sakura_ch10_after_practice.t008

@wait 600

@expr sakura_sports normal

> $route_sakura.sakura_ch10_after_practice.t009

> $route_sakura.sakura_ch10_after_practice.t010
> $route_sakura.sakura_ch10_after_practice.t011

> $route_sakura.sakura_ch10_after_practice.t012
> $route_sakura.sakura_ch10_after_practice.t013
> $route_sakura.sakura_ch10_after_practice.t014

> $route_sakura.sakura_ch10_after_practice.t015
> $route_sakura.sakura_ch10_after_practice.t016

@wait 600

> $route_sakura.sakura_ch10_after_practice.t017

> $route_sakura.sakura_ch10_after_practice.t018
> $route_sakura.sakura_ch10_after_practice.t019

@still sakura_crying_gym
@wait 1000
@still_hide
@wait 300

@hide sakura_sports fade_out
@wait 500

@jump sakura_ch10_outside


# sakura_ch10_outside

@scene gymnasium_storage_room fade
@bgm sakura_theme.mp3
@se door_open.mp3
@wait 700

> $route_sakura.sakura_ch10_outside.t001

> $route_sakura.sakura_ch10_outside.t002
> $route_sakura.sakura_ch10_outside.t003
> $route_sakura.sakura_ch10_outside.t004

@wait 400

@show sakura_sports right normal fade_in

player: $route_sakura.sakura_ch10_outside.t005

@expr sakura_sports surprised

sakura: $route_sakura.sakura_ch10_outside.t006

@wait 400

@expr sakura_sports happy

sakura: $route_sakura.sakura_ch10_outside.t007
sakura: $route_sakura.sakura_ch10_outside.t008

player: $route_sakura.sakura_ch10_outside.t009

sakura: $route_sakura.sakura_ch10_outside.t010
sakura: $route_sakura.sakura_ch10_outside.t011

player: $route_sakura.sakura_ch10_outside.t012

@bgm stop
@wait 600

> $route_sakura.sakura_ch10_outside.t013
> $route_sakura.sakura_ch10_outside.t014

> $route_sakura.sakura_ch10_outside.t015

@wait 400

> $route_sakura.sakura_ch10_outside.t016

@wait 500

> $route_sakura.sakura_ch10_outside.t017

@wait 400

> $route_sakura.sakura_ch10_outside.t018

@hide sakura_sports fade_out
@wait 300

@still sakura_cant_smile
@wait 1500
@still_hide

@wait 800

@show sakura_sports center normal fade_in

sakura: $route_sakura.sakura_ch10_outside.t019

@wait 600

player: $route_sakura.sakura_ch10_outside.t020

@wait 500

sakura: $route_sakura.sakura_ch10_outside.t021

@wait 1000

> $route_sakura.sakura_ch10_outside.t022
> $route_sakura.sakura_ch10_outside.t023
> $route_sakura.sakura_ch10_outside.t024

@wait 800

> $route_sakura.sakura_ch10_outside.t025

@wait 600

sakura: $route_sakura.sakura_ch10_outside.t026
sakura: $route_sakura.sakura_ch10_outside.t027

@wait 800

> $route_sakura.sakura_ch10_outside.t028
> $route_sakura.sakura_ch10_outside.t029
> $route_sakura.sakura_ch10_outside.t030

@wait 700

sakura: $route_sakura.sakura_ch10_outside.t031

@wait 800

sakura: $route_sakura.sakura_ch10_outside.t032

@wait 1000

@bgm stop
@wait 600

@expr sakura_sports crying

> $route_sakura.sakura_ch10_outside.t033
> $route_sakura.sakura_ch10_outside.t034
> $route_sakura.sakura_ch10_outside.t035

@wait 800

> $route_sakura.sakura_ch10_outside.t036
> $route_sakura.sakura_ch10_outside.t037

@wait 800

> $route_sakura.sakura_ch10_outside.t038
> $route_sakura.sakura_ch10_outside.t039

@wait 600

> $route_sakura.sakura_ch10_outside.t040

@still sakura_embrace
@wait 600

@se heartbeat.mp3
@wait 800

> $route_sakura.sakura_ch10_outside.t041
> $route_sakura.sakura_ch10_outside.t042
> $route_sakura.sakura_ch10_outside.t043

@wait 1500

@bgm sakura_breakdown.mp3
@wait 1000

> $route_sakura.sakura_ch10_outside.t044

@wait 1200

@expr sakura_sports normal

sakura: $route_sakura.sakura_ch10_outside.t045

@wait 1000

> $route_sakura.sakura_ch10_outside.t046
> $route_sakura.sakura_ch10_outside.t047

@wait 1200

@still_hide
@wait 400

@hide sakura_sports fade_out
@wait 500

@bgm evening_piano.mp3
@wait 800

> *$route_sakura.sakura_ch10_outside.t048*
> *$route_sakura.sakura_ch10_outside.t049*
> *$route_sakura.sakura_ch10_outside.t050*

@wait 1000

> $route_sakura.sakura_ch10_outside.t051
> $route_sakura.sakura_ch10_outside.t052

@scene gymnasium_back fade
@wait 600

> $route_sakura.sakura_ch10_outside.t053
> $route_sakura.sakura_ch10_outside.t054

@wait 700

> $route_sakura.sakura_ch10_outside.t055

@wait 700

@jump sakura_ch10_walk


# sakura_ch10_walk

@scene school_gate_autumn_evening fade
@bgm evening_piano.mp3
@wait 700

> $route_sakura.sakura_ch10_walk.t001
> $route_sakura.sakura_ch10_walk.t002

@show sakura left normal fade_in

> $route_sakura.sakura_ch10_walk.t003
> $route_sakura.sakura_ch10_walk.t004
> $route_sakura.sakura_ch10_walk.t005

@wait 800

> $route_sakura.sakura_ch10_walk.t006

> $route_sakura.sakura_ch10_walk.t007
> $route_sakura.sakura_ch10_walk.t008

@wait 600

sakura: $route_sakura.sakura_ch10_walk.t009

player: $route_sakura.sakura_ch10_walk.t010

sakura: $route_sakura.sakura_ch10_walk.t011

player: $route_sakura.sakura_ch10_walk.t012

sakura: $route_sakura.sakura_ch10_walk.t013

@wait 500

player: $route_sakura.sakura_ch10_walk.t014

@expr sakura thinking

sakura: $route_sakura.sakura_ch10_walk.t015

sakura: $route_sakura.sakura_ch10_walk.t016

player: $route_sakura.sakura_ch10_walk.t017

@wait 400

sakura: $route_sakura.sakura_ch10_walk.t018

sakura: $route_sakura.sakura_ch10_walk.t019

player: $route_sakura.sakura_ch10_walk.t020

@expr sakura normal

sakura: $route_sakura.sakura_ch10_walk.t021

player: $route_sakura.sakura_ch10_walk.t022

@wait 600

> $route_sakura.sakura_ch10_walk.t023

@wait 500

sakura: $route_sakura.sakura_ch10_walk.t024

sakura: $route_sakura.sakura_ch10_walk.t025

@wait 700

> $route_sakura.sakura_ch10_walk.t026
> $route_sakura.sakura_ch10_walk.t027

> $route_sakura.sakura_ch10_walk.t028

@wait 600

@expr sakura normal

> $route_sakura.sakura_ch10_walk.t029
> $route_sakura.sakura_ch10_walk.t030
> $route_sakura.sakura_ch10_walk.t031

> $route_sakura.sakura_ch10_walk.t032
> $route_sakura.sakura_ch10_walk.t033
> $route_sakura.sakura_ch10_walk.t034

@hide sakura fade_out
@wait 500

@bgm stop
@wait 500

@jump sakura_ch11_start


// ===================================================================
//  Chapter 11s「あたし、ずっと怖かった」
// ===================================================================

# sakura_ch11_start

@scene protagonist_room_night fade
@bgm night_melody.mp3
@wait 1000

> $route_sakura.sakura_ch11_start.t001

> $route_sakura.sakura_ch11_start.t002
> $route_sakura.sakura_ch11_start.t003

> $route_sakura.sakura_ch11_start.t004
> $route_sakura.sakura_ch11_start.t005

@wait 600

> $route_sakura.sakura_ch11_start.t006

@wait 500

> $route_sakura.sakura_ch11_start.t007

@bgm stop
@wait 400

> $route_sakura.sakura_ch11_start.t008
> $route_sakura.sakura_ch11_start.t009
> $route_sakura.sakura_ch11_start.t010

> $route_sakura.sakura_ch11_start.t011
> $route_sakura.sakura_ch11_start.t012

> $route_sakura.sakura_ch11_start.t013
> $route_sakura.sakura_ch11_start.t014

@wait 800

@bgm night_melody.mp3

> $route_sakura.sakura_ch11_start.t015
> $route_sakura.sakura_ch11_start.t016

@wait 600

> *$route_sakura.sakura_ch11_start.t017*

> *$route_sakura.sakura_ch11_start.t018*
> *$route_sakura.sakura_ch11_start.t019*

> *$route_sakura.sakura_ch11_start.t020*
> *$route_sakura.sakura_ch11_start.t021*

@wait 1000

@bgm stop
@wait 300

@jump sakura_ch11_morning


# sakura_ch11_morning

@scene protagonist_room_morning fade
@bgm stop
@se chime_soft.mp3
@wait 800

> $route_sakura.sakura_ch11_morning.t001

> $route_sakura.sakura_ch11_morning.t002
> $route_sakura.sakura_ch11_morning.t003

> $route_sakura.sakura_ch11_morning.t004
> $route_sakura.sakura_ch11_morning.t005
> $route_sakura.sakura_ch11_morning.t006
> $route_sakura.sakura_ch11_morning.t007

@wait 800

> $route_sakura.sakura_ch11_morning.t008

> $route_sakura.sakura_ch11_morning.t009
> $route_sakura.sakura_ch11_morning.t010

> $route_sakura.sakura_ch11_morning.t011
> $route_sakura.sakura_ch11_morning.t012

@wait 600

> *$route_sakura.sakura_ch11_morning.t013*
> *$route_sakura.sakura_ch11_morning.t014*

> *$route_sakura.sakura_ch11_morning.t015*

@wait 800

> $route_sakura.sakura_ch11_morning.t016
> $route_sakura.sakura_ch11_morning.t017
> $route_sakura.sakura_ch11_morning.t018

@jump sakura_ch11_hospital


# sakura_ch11_hospital

@scene commute_road_autumn fade
@bgm stop
@wait 1200

> $route_sakura.sakura_ch11_hospital.t001

> $route_sakura.sakura_ch11_hospital.t002
> $route_sakura.sakura_ch11_hospital.t003
> $route_sakura.sakura_ch11_hospital.t004

@wait 800

> $route_sakura.sakura_ch11_hospital.t005

@wait 600

@se footsteps.mp3
@wait 400

> $route_sakura.sakura_ch11_hospital.t006

@show sakura left normal fade_in

> $route_sakura.sakura_ch11_hospital.t007
> $route_sakura.sakura_ch11_hospital.t008
> $route_sakura.sakura_ch11_hospital.t009

@wait 600

> $route_sakura.sakura_ch11_hospital.t010

@expr sakura surprised

sakura: $route_sakura.sakura_ch11_hospital.t011

player: $route_sakura.sakura_ch11_hospital.t012

sakura: $route_sakura.sakura_ch11_hospital.t013

player: $route_sakura.sakura_ch11_hospital.t014

@wait 800

> $route_sakura.sakura_ch11_hospital.t015

> $route_sakura.sakura_ch11_hospital.t016
> $route_sakura.sakura_ch11_hospital.t017

@wait 600

> $route_sakura.sakura_ch11_hospital.t018

@wait 500

@bgm stop

> $route_sakura.sakura_ch11_hospital.t019

@wait 400

> $route_sakura.sakura_ch11_hospital.t020
> $route_sakura.sakura_ch11_hospital.t021
> $route_sakura.sakura_ch11_hospital.t022

@wait 700

> $route_sakura.sakura_ch11_hospital.t023
> $route_sakura.sakura_ch11_hospital.t024

> $route_sakura.sakura_ch11_hospital.t025
> $route_sakura.sakura_ch11_hospital.t026
> $route_sakura.sakura_ch11_hospital.t027

@wait 600

@expr sakura crying

> $route_sakura.sakura_ch11_hospital.t028

@wait 600

sakura: $route_sakura.sakura_ch11_hospital.t029

@wait 300

sakura: $route_sakura.sakura_ch11_hospital.t030

@wait 1200

> $route_sakura.sakura_ch11_hospital.t031

@wait 600

> $route_sakura.sakura_ch11_hospital.t032
> $route_sakura.sakura_ch11_hospital.t033

@wait 500

> $route_sakura.sakura_ch11_hospital.t034

@wait 800

> $route_sakura.sakura_ch11_hospital.t035
> $route_sakura.sakura_ch11_hospital.t036

@wait 1000

@se heartbeat.mp3
@wait 400

sakura: $route_sakura.sakura_ch11_hospital.t037

sakura: $route_sakura.sakura_ch11_hospital.t038

@wait 700

sakura: $route_sakura.sakura_ch11_hospital.t039

sakura: $route_sakura.sakura_ch11_hospital.t040

@wait 1000

player: $route_sakura.sakura_ch11_hospital.t041

@wait 600

sakura: $route_sakura.sakura_ch11_hospital.t042

sakura: $route_sakura.sakura_ch11_hospital.t043

@wait 800

sakura: $route_sakura.sakura_ch11_hospital.t044

@wait 500

sakura: $route_sakura.sakura_ch11_hospital.t045

@wait 400

sakura: $route_sakura.sakura_ch11_hospital.t046

@wait 800

> *$route_sakura.sakura_ch11_hospital.t047*
> *$route_sakura.sakura_ch11_hospital.t048*
> *$route_sakura.sakura_ch11_hospital.t049*

@wait 500

sakura: $route_sakura.sakura_ch11_hospital.t050

@wait 600

sakura: $route_sakura.sakura_ch11_hospital.t051

@wait 1500

> $route_sakura.sakura_ch11_hospital.t052

> $route_sakura.sakura_ch11_hospital.t053
> $route_sakura.sakura_ch11_hospital.t054

@wait 1000

> *$route_sakura.sakura_ch11_hospital.t055*
> *$route_sakura.sakura_ch11_hospital.t056*

@wait 800

> $route_sakura.sakura_ch11_hospital.t057

> $route_sakura.sakura_ch11_hospital.t058
> $route_sakura.sakura_ch11_hospital.t059
> $route_sakura.sakura_ch11_hospital.t060

@wait 600

sakura: $route_sakura.sakura_ch11_hospital.t061

@wait 1000

player: $route_sakura.sakura_ch11_hospital.t062

@wait 1200

> $route_sakura.sakura_ch11_hospital.t063
> $route_sakura.sakura_ch11_hospital.t064
> $route_sakura.sakura_ch11_hospital.t065

@wait 1500

@bgm sakura_breakdown.mp3
@wait 1000

> $route_sakura.sakura_ch11_hospital.t066

@wait 1200

@expr sakura normal

sakura: $route_sakura.sakura_ch11_hospital.t067

@wait 800

player: $route_sakura.sakura_ch11_hospital.t068

@wait 1000

> $route_sakura.sakura_ch11_hospital.t069

> $route_sakura.sakura_ch11_hospital.t070

@wait 1200

@bgm stop
@hide sakura fade_out
@wait 600

@jump sakura_ch12_start


// ===================================================================
//  Chapter 12s「エンディング分岐」
// ===================================================================

# sakura_ch12_start

@scene commute_road_autumn fade
@bgm sakura_theme.mp3
@wait 1000

> $route_sakura.sakura_ch12_start.t001

> $route_sakura.sakura_ch12_start.t002
> $route_sakura.sakura_ch12_start.t003

@show sakura center happy fade_in

@wait 600

> $route_sakura.sakura_ch12_start.t004
> $route_sakura.sakura_ch12_start.t005
> $route_sakura.sakura_ch12_start.t006

@hide sakura fade_out
@wait 500

@jump sakura_ch12_branch


# sakura_ch12_branch

@scene corridor fade
@bgm daily_life.mp3
@wait 800

> $route_sakura.sakura_ch12_branch.t001

@wait 600

@choice
- $choices.route_sakura.step_back -> sakura_good_end
- $choices.route_sakura.stay_close -> sakura_bad_end


// ===================================================================
//  Good End「散らないように、咲く」
// ===================================================================

# sakura_good_end

@scene classroom_evening fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 1000

> $route_sakura.sakura_good_end.t001

> $route_sakura.sakura_good_end.t002
> $route_sakura.sakura_good_end.t003

> $route_sakura.sakura_good_end.t004
> $route_sakura.sakura_good_end.t005
> $route_sakura.sakura_good_end.t006

@show sakura right normal fade_in

sakura: $route_sakura.sakura_good_end.t007

player: $route_sakura.sakura_good_end.t008

sakura: $route_sakura.sakura_good_end.t009

@wait 400

@expr sakura thinking

sakura: $route_sakura.sakura_good_end.t010

sakura: $route_sakura.sakura_good_end.t011

player: $route_sakura.sakura_good_end.t012

@wait 600

sakura: $route_sakura.sakura_good_end.t013

@wait 800

player: $route_sakura.sakura_good_end.t014

sakura: $route_sakura.sakura_good_end.t015

sakura: $route_sakura.sakura_good_end.t016

sakura: $route_sakura.sakura_good_end.t017

@wait 600

player: $route_sakura.sakura_good_end.t018

@expr sakura normal

sakura: $route_sakura.sakura_good_end.t019

@wait 600

> $route_sakura.sakura_good_end.t020
> $route_sakura.sakura_good_end.t021

@hide sakura fade_out
@wait 500

@jump sakura_good_end_daily


# sakura_good_end_daily

@scene corridor fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 800

> $route_sakura.sakura_good_end_daily.t001

> $route_sakura.sakura_good_end_daily.t002
> $route_sakura.sakura_good_end_daily.t003

@show sakura left normal fade_in

sakura: $route_sakura.sakura_good_end_daily.t004

player: $route_sakura.sakura_good_end_daily.t005

sakura: $route_sakura.sakura_good_end_daily.t006

player: $route_sakura.sakura_good_end_daily.t007

sakura: $route_sakura.sakura_good_end_daily.t008

@wait 500

player: $route_sakura.sakura_good_end_daily.t009

@expr sakura happy

sakura: $route_sakura.sakura_good_end_daily.t010

sakura: $route_sakura.sakura_good_end_daily.t011

player: $route_sakura.sakura_good_end_daily.t012

sakura: $route_sakura.sakura_good_end_daily.t013

@wait 600

player: $route_sakura.sakura_good_end_daily.t014

@expr sakura normal

sakura: $route_sakura.sakura_good_end_daily.t015

player: $route_sakura.sakura_good_end_daily.t016

sakura: $route_sakura.sakura_good_end_daily.t017

sakura: $route_sakura.sakura_good_end_daily.t018

player: $route_sakura.sakura_good_end_daily.t019

sakura: $route_sakura.sakura_good_end_daily.t020

@wait 600

> $route_sakura.sakura_good_end_daily.t021
> $route_sakura.sakura_good_end_daily.t022

@hide sakura fade_out
@wait 500

@jump sakura_good_end_hospital


# sakura_good_end_hospital

@scene classroom_evening fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 800

> $route_sakura.sakura_good_end_hospital.t001

> $route_sakura.sakura_good_end_hospital.t002

@show sakura center normal fade_in

sakura: $route_sakura.sakura_good_end_hospital.t003

@wait 1000

> $route_sakura.sakura_good_end_hospital.t004
> $route_sakura.sakura_good_end_hospital.t005

> $route_sakura.sakura_good_end_hospital.t006

@wait 800

player: $route_sakura.sakura_good_end_hospital.t007

@expr sakura shy

sakura: $route_sakura.sakura_good_end_hospital.t008

player: $route_sakura.sakura_good_end_hospital.t009

sakura: $route_sakura.sakura_good_end_hospital.t010

player: $route_sakura.sakura_good_end_hospital.t011

@wait 500

sakura: $route_sakura.sakura_good_end_hospital.t012

sakura: $route_sakura.sakura_good_end_hospital.t013

@wait 600

> $route_sakura.sakura_good_end_hospital.t014
> $route_sakura.sakura_good_end_hospital.t015

@wait 1000

@hide sakura fade_out
@wait 500

@jump sakura_good_end_club


# sakura_good_end_club

@scene gymnasium fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 800

> $route_sakura.sakura_good_end_club.t001

@show sakura_sports center happy fade_in

> $route_sakura.sakura_good_end_club.t002
> $route_sakura.sakura_good_end_club.t003
> $route_sakura.sakura_good_end_club.t004

> $route_sakura.sakura_good_end_club.t005

sakura: $route_sakura.sakura_good_end_club.t006

> $route_sakura.sakura_good_end_club.t007

sakura: $route_sakura.sakura_good_end_club.t008

@wait 500

@expr sakura_sports normal

sakura: $route_sakura.sakura_good_end_club.t009
sakura: $route_sakura.sakura_good_end_club.t010

> $route_sakura.sakura_good_end_club.t011

@wait 600

> $route_sakura.sakura_good_end_club.t012

@expr sakura_sports happy

> $route_sakura.sakura_good_end_club.t013

@wait 500

> $route_sakura.sakura_good_end_club.t014

sakura: $route_sakura.sakura_good_end_club.t015

player: $route_sakura.sakura_good_end_club.t016

sakura: $route_sakura.sakura_good_end_club.t017

@wait 400

player: $route_sakura.sakura_good_end_club.t018

@expr sakura_sports normal

sakura: $route_sakura.sakura_good_end_club.t019

@wait 500

> *$route_sakura.sakura_good_end_club.t020*
> *$route_sakura.sakura_good_end_club.t021*
> *$route_sakura.sakura_good_end_club.t022*
> *$route_sakura.sakura_good_end_club.t023*
> *$route_sakura.sakura_good_end_club.t024*

@hide sakura_sports fade_out
@wait 500

@jump sakura_good_end_message


# sakura_good_end_message

@scene protagonist_room_night fade
@hide sakura instant
@hide sakura_sports instant
@bgm sakura_good_end.mp3
@wait 800

> $route_sakura.sakura_good_end_message.t001

> $route_sakura.sakura_good_end_message.t002

> $route_sakura.sakura_good_end_message.t003

@wait 600

player: $route_sakura.sakura_good_end_message.t004

@wait 400

> $route_sakura.sakura_good_end_message.t005
> $route_sakura.sakura_good_end_message.t006
> $route_sakura.sakura_good_end_message.t007

@wait 1000

> *$route_sakura.sakura_good_end_message.t008*
> *$route_sakura.sakura_good_end_message.t009*

@wait 600

player: $route_sakura.sakura_good_end_message.t010

@wait 400

> $route_sakura.sakura_good_end_message.t011

> $route_sakura.sakura_good_end_message.t012
> $route_sakura.sakura_good_end_message.t013

@wait 800

player: $route_sakura.sakura_good_end_message.t014

@wait 400

> $route_sakura.sakura_good_end_message.t015

@wait 500

> $route_sakura.sakura_good_end_message.t016

@wait 600

> *$route_sakura.sakura_good_end_message.t017*
> *$route_sakura.sakura_good_end_message.t018*

@bgm stop
@wait 500

@jump sakura_good_end_rooftop


# sakura_good_end_rooftop

@scene rooftop_evening fade
@hide sakura instant
@hide sakura_sports instant
@bgm stop
@se chime_soft.mp3
@wait 1200

> $route_sakura.sakura_good_end_rooftop.t001

> $route_sakura.sakura_good_end_rooftop.t002
> $route_sakura.sakura_good_end_rooftop.t003
> $route_sakura.sakura_good_end_rooftop.t004

@wait 800

> $route_sakura.sakura_good_end_rooftop.t005

@show sakura center normal fade_in

sakura: $route_sakura.sakura_good_end_rooftop.t006

player: $route_sakura.sakura_good_end_rooftop.t007

sakura: $route_sakura.sakura_good_end_rooftop.t008

@wait 600

@expr sakura happy

sakura: $route_sakura.sakura_good_end_rooftop.t009

@wait 500

player: $route_sakura.sakura_good_end_rooftop.t010

sakura: $route_sakura.sakura_good_end_rooftop.t011
sakura: $route_sakura.sakura_good_end_rooftop.t012

player: $route_sakura.sakura_good_end_rooftop.t013

sakura: $route_sakura.sakura_good_end_rooftop.t014

@wait 600

@expr sakura normal

> $route_sakura.sakura_good_end_rooftop.t015

> $route_sakura.sakura_good_end_rooftop.t016
> $route_sakura.sakura_good_end_rooftop.t017
> $route_sakura.sakura_good_end_rooftop.t018

@wait 800

sakura: $route_sakura.sakura_good_end_rooftop.t019

player: $route_sakura.sakura_good_end_rooftop.t020

sakura: $route_sakura.sakura_good_end_rooftop.t021

player: $route_sakura.sakura_good_end_rooftop.t022

sakura: $route_sakura.sakura_good_end_rooftop.t023

player: $route_sakura.sakura_good_end_rooftop.t024

@wait 400

sakura: $route_sakura.sakura_good_end_rooftop.t025
sakura: $route_sakura.sakura_good_end_rooftop.t026

player: $route_sakura.sakura_good_end_rooftop.t027

@expr sakura shy

sakura: $route_sakura.sakura_good_end_rooftop.t028

sakura: $route_sakura.sakura_good_end_rooftop.t029

@wait 600

player: $route_sakura.sakura_good_end_rooftop.t030

sakura: $route_sakura.sakura_good_end_rooftop.t031
sakura: $route_sakura.sakura_good_end_rooftop.t032

@wait 500

@expr sakura normal

sakura: $route_sakura.sakura_good_end_rooftop.t033

sakura: $route_sakura.sakura_good_end_rooftop.t034

@wait 700

player: $route_sakura.sakura_good_end_rooftop.t035

sakura: $route_sakura.sakura_good_end_rooftop.t036

@wait 500

@bgm sakura_good_end.mp3

sakura: $route_sakura.sakura_good_end_rooftop.t037

player: $route_sakura.sakura_good_end_rooftop.t038

sakura: $route_sakura.sakura_good_end_rooftop.t039

sakura: $route_sakura.sakura_good_end_rooftop.t040

player: $route_sakura.sakura_good_end_rooftop.t041

sakura: $route_sakura.sakura_good_end_rooftop.t042

@wait 800

player: $route_sakura.sakura_good_end_rooftop.t043

sakura: $route_sakura.sakura_good_end_rooftop.t044

sakura: $route_sakura.sakura_good_end_rooftop.t045

@wait 1000

@hide sakura fade_out
@wait 400

@still sakura_good_end_rooftop1_pre1
@wait 700

> $route_sakura.sakura_good_end_rooftop.t046

@still sakura_good_end_rooftop1_pre2
@wait 900

> $route_sakura.sakura_good_end_rooftop.t047

@still sakura_good_end_rooftop1_pre3
@wait 1000

> $route_sakura.sakura_good_end_rooftop.t048
> $route_sakura.sakura_good_end_rooftop.t049

@still sakura_good_end_rooftop1
@wait 1200

> $route_sakura.sakura_good_end_rooftop.t050

@wait 800

sakura: $route_sakura.sakura_good_end_rooftop.t051

@wait 800

player: $route_sakura.sakura_good_end_rooftop.t052

@wait 800

sakura: $route_sakura.sakura_good_end_rooftop.t053

sakura: $route_sakura.sakura_good_end_rooftop.t054

sakura: $route_sakura.sakura_good_end_rooftop.t055

player: $route_sakura.sakura_good_end_rooftop.t056

sakura: $route_sakura.sakura_good_end_rooftop.t057

@wait 800

@still_hide
@wait 600

> $route_sakura.sakura_good_end_rooftop.t058

> $route_sakura.sakura_good_end_rooftop.t059

> $route_sakura.sakura_good_end_rooftop.t060
> $route_sakura.sakura_good_end_rooftop.t061

> $route_sakura.sakura_good_end_rooftop.t062
> $route_sakura.sakura_good_end_rooftop.t063

@wait 1500

@still sakura_good_end_rooftop2
@ending_intro current sakura_good_end 10000

@scene school_grounds_evening fade
@bgm epilogue_sunset_for_each.mp3

> $route_sakura.sakura_good_end_rooftop.t064
> $route_sakura.sakura_good_end_rooftop.t065

@wait 1200

> $route_sakura.sakura_good_end_rooftop.t066

@wait 1000

@show sakura center normal fade_in

> $route_sakura.sakura_good_end_rooftop.t067
> $route_sakura.sakura_good_end_rooftop.t068
> $route_sakura.sakura_good_end_rooftop.t069

@wait 1200

@hide sakura fade_out
@wait 600

> $route_sakura.sakura_good_end_rooftop.t070
> $route_sakura.sakura_good_end_rooftop.t071

@wait 800

> $route_sakura.sakura_good_end_rooftop.t072
> $route_sakura.sakura_good_end_rooftop.t073

@wait 1200

@show sakura center thinking fade_in

sakura: $route_sakura.sakura_good_end_rooftop.t074

@wait 600

> $route_sakura.sakura_good_end_rooftop.t075
> $route_sakura.sakura_good_end_rooftop.t076

@expr sakura normal

sakura: $route_sakura.sakura_good_end_rooftop.t077

@wait 1500

@hide sakura fade_out
@wait 400

> $route_sakura.sakura_good_end_rooftop.t078

@wait 1000

> $route_sakura.sakura_good_end_rooftop.t079
> $route_sakura.sakura_good_end_rooftop.t080

@wait 1200

> $route_sakura.sakura_good_end_rooftop.t081
> $route_sakura.sakura_good_end_rooftop.t082

@wait 1500

> $route_sakura.sakura_good_end_rooftop.t083

@wait 2500

@still sakura_epilogue fade_in
@click_wait
@end "$route_sakura.sakura_good_end_rooftop.end_title"


// ===================================================================
//  Bad End「誰かのための笑顔」
// ===================================================================

# sakura_bad_end

@scene classroom_evening fade
@bgm bad_end_loop.mp3
@wait 1000

> $route_sakura.sakura_bad_end.t001

> $route_sakura.sakura_bad_end.t002

> $route_sakura.sakura_bad_end.t003
> $route_sakura.sakura_bad_end.t004
> $route_sakura.sakura_bad_end.t005

> $route_sakura.sakura_bad_end.t006

@show sakura center happy fade_in

sakura: $route_sakura.sakura_bad_end.t007
sakura: $route_sakura.sakura_bad_end.t008
sakura: $route_sakura.sakura_bad_end.t009

@wait 600

player: $route_sakura.sakura_bad_end.t010

sakura: $route_sakura.sakura_bad_end.t011

player: $route_sakura.sakura_bad_end.t012

@wait 400

@expr sakura surprised

sakura: $route_sakura.sakura_bad_end.t013

@wait 500

@expr sakura happy

sakura: $route_sakura.sakura_bad_end.t014
sakura: $route_sakura.sakura_bad_end.t015

player: $route_sakura.sakura_bad_end.t016

@hide sakura fade_out
@wait 500

> *$route_sakura.sakura_bad_end.t017*
> *$route_sakura.sakura_bad_end.t018*

@wait 600

> *$route_sakura.sakura_bad_end.t019*
> *$route_sakura.sakura_bad_end.t020*

@jump sakura_bad_end_dependency


# sakura_bad_end_dependency

@scene corridor fade
@bgm bad_end_loop.mp3
@wait 800

> $route_sakura.sakura_bad_end_dependency.t001

@show sakura right happy fade_in

> $route_sakura.sakura_bad_end_dependency.t002
> $route_sakura.sakura_bad_end_dependency.t003

> $route_sakura.sakura_bad_end_dependency.t004
> $route_sakura.sakura_bad_end_dependency.t005

@wait 600

sakura: $route_sakura.sakura_bad_end_dependency.t006
sakura: $route_sakura.sakura_bad_end_dependency.t007

player: $route_sakura.sakura_bad_end_dependency.t008

sakura: $route_sakura.sakura_bad_end_dependency.t009

@wait 400

sakura: $route_sakura.sakura_bad_end_dependency.t010

player: $route_sakura.sakura_bad_end_dependency.t011

sakura: $route_sakura.sakura_bad_end_dependency.t012

player: $route_sakura.sakura_bad_end_dependency.t013

@wait 500

@expr sakura happy

sakura: $route_sakura.sakura_bad_end_dependency.t014

@wait 600

> $route_sakura.sakura_bad_end_dependency.t015
> $route_sakura.sakura_bad_end_dependency.t016

> *$route_sakura.sakura_bad_end_dependency.t017*
> *$route_sakura.sakura_bad_end_dependency.t018*
> *$route_sakura.sakura_bad_end_dependency.t019*

@hide sakura fade_out
@wait 500

@jump sakura_bad_end_scene


# sakura_bad_end_scene

@scene classroom_night fade
@bgm bad_end_loop.mp3
@wait 1000

> $route_sakura.sakura_bad_end_scene.t001

> $route_sakura.sakura_bad_end_scene.t002

> $route_sakura.sakura_bad_end_scene.t003
> $route_sakura.sakura_bad_end_scene.t004

> $route_sakura.sakura_bad_end_scene.t005

@wait 800

@show sakura center normal fade_in

> $route_sakura.sakura_bad_end_scene.t006
> $route_sakura.sakura_bad_end_scene.t007
> $route_sakura.sakura_bad_end_scene.t008

sakura: $route_sakura.sakura_bad_end_scene.t009

player: $route_sakura.sakura_bad_end_scene.t010

sakura: $route_sakura.sakura_bad_end_scene.t011

@wait 600

@expr sakura happy

sakura: $route_sakura.sakura_bad_end_scene.t012

player: $route_sakura.sakura_bad_end_scene.t013

@wait 500

@wait 600

@show sakura center happy fade_in

> $route_sakura.sakura_bad_end_scene.t014

> $route_sakura.sakura_bad_end_scene.t015
> $route_sakura.sakura_bad_end_scene.t016

@wait 1000

@bgm stop
@wait 300

> $route_sakura.sakura_bad_end_scene.t017

> $route_sakura.sakura_bad_end_scene.t018

> $route_sakura.sakura_bad_end_scene.t019
> $route_sakura.sakura_bad_end_scene.t020

@wait 800

> $route_sakura.sakura_bad_end_scene.t021
> $route_sakura.sakura_bad_end_scene.t022
> $route_sakura.sakura_bad_end_scene.t023
> $route_sakura.sakura_bad_end_scene.t024

@wait 1200

@jump sakura_bad_end_alone


# sakura_bad_end_alone

@hide sakura instant
@scene school_gate_autumn_evening fade
@bgm bad_end_loop.mp3
@wait 800

> $route_sakura.sakura_bad_end_alone.t001

> $route_sakura.sakura_bad_end_alone.t002
> $route_sakura.sakura_bad_end_alone.t003
> $route_sakura.sakura_bad_end_alone.t004

@wait 600

@show sakura left blank fade_in

> $route_sakura.sakura_bad_end_alone.t005

> $route_sakura.sakura_bad_end_alone.t006

@wait 500

@expr sakura happy

sakura: $route_sakura.sakura_bad_end_alone.t007

@wait 600

> $route_sakura.sakura_bad_end_alone.t008

> $route_sakura.sakura_bad_end_alone.t009

@wait 800

> *$route_sakura.sakura_bad_end_alone.t010*
> *$route_sakura.sakura_bad_end_alone.t011*
> *$route_sakura.sakura_bad_end_alone.t012*

@hide sakura fade_out
@wait 500

@jump sakura_bad_end_final


# sakura_bad_end_final

@scene classroom_night fade
@bgm bad_end_loop.mp3
@wait 1000

> $route_sakura.sakura_bad_end_final.t001

> $route_sakura.sakura_bad_end_final.t002

> $route_sakura.sakura_bad_end_final.t003

@wait 800

@show sakura center happy fade_in

> $route_sakura.sakura_bad_end_final.t004
> $route_sakura.sakura_bad_end_final.t005

> $route_sakura.sakura_bad_end_final.t006
> $route_sakura.sakura_bad_end_final.t007
> $route_sakura.sakura_bad_end_final.t008

@wait 600

sakura: $route_sakura.sakura_bad_end_final.t009

player: $route_sakura.sakura_bad_end_final.t010

sakura: $route_sakura.sakura_bad_end_final.t011

player: $route_sakura.sakura_bad_end_final.t012

@expr sakura happy

sakura: $route_sakura.sakura_bad_end_final.t013

@wait 800

> $route_sakura.sakura_bad_end_final.t014
> $route_sakura.sakura_bad_end_final.t015

@wait 600

@bgm stop
@wait 300

> $route_sakura.sakura_bad_end_final.t016

> $route_sakura.sakura_bad_end_final.t017

> $route_sakura.sakura_bad_end_final.t018
> $route_sakura.sakura_bad_end_final.t019

@wait 1000

@expr sakura blank

> $route_sakura.sakura_bad_end_final.t020

@wait 800

@hide sakura fade_out
@wait 600

@still bad_end_empty_classroom
@wait 2000
@still_hide
@wait 600

@bgm bad_end_loop.mp3
@wait 800

sakura: $route_sakura.sakura_bad_end_final.t021

@wait 800

> $route_sakura.sakura_bad_end_final.t022
> $route_sakura.sakura_bad_end_final.t023

@wait 600

> $route_sakura.sakura_bad_end_final.t024
> $route_sakura.sakura_bad_end_final.t025
> $route_sakura.sakura_bad_end_final.t026

@wait 1000

> *$route_sakura.sakura_bad_end_final.t027*

@wait 1500

@bgm stop

@credits bad_end_loop.mp3
@end "$route_sakura.sakura_bad_end_final.end_title"
