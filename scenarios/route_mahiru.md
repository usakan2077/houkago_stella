// ===================================================================
//  放課後のステラ — まひるルート Ch.9m〜12m
//  「夜明けは、一人では見つけられなかった」
// ===================================================================


// ===================================================================
//  幕間「月夜野まひるの独白」
// ===================================================================

# mahiru_interlude

@window_color mahiru
@scene rooftop_evening fade
@bgm rooftop_wind.mp3
@wait 1200

> $route_mahiru.mahiru_interlude.t001

@wait 1000

mahiru: $route_mahiru.mahiru_interlude.t002

@wait 1000

mahiru: $route_mahiru.mahiru_interlude.t003
mahiru: $route_mahiru.mahiru_interlude.t004
mahiru: $route_mahiru.mahiru_interlude.t005

@wait 1200

mahiru: $route_mahiru.mahiru_interlude.t006

@wait 1000

mahiru: $route_mahiru.mahiru_interlude.t007
mahiru: $route_mahiru.mahiru_interlude.t008
mahiru: $route_mahiru.mahiru_interlude.t009

@wait 1200

mahiru: $route_mahiru.mahiru_interlude.t010
mahiru: $route_mahiru.mahiru_interlude.t011
mahiru: $route_mahiru.mahiru_interlude.t012

@wait 1500

mahiru: $route_mahiru.mahiru_interlude.t013
mahiru: $route_mahiru.mahiru_interlude.t014

@wait 1200

mahiru: $route_mahiru.mahiru_interlude.t015

@wait 1000

mahiru: $route_mahiru.mahiru_interlude.t016
mahiru: $route_mahiru.mahiru_interlude.t017

@wait 1000

mahiru: $route_mahiru.mahiru_interlude.t018
mahiru: $route_mahiru.mahiru_interlude.t019

@wait 1200

mahiru: $route_mahiru.mahiru_interlude.t020
mahiru: $route_mahiru.mahiru_interlude.t021
mahiru: $route_mahiru.mahiru_interlude.t022

@wait 1000

mahiru: $route_mahiru.mahiru_interlude.t023
mahiru: $route_mahiru.mahiru_interlude.t024

@wait 1200

mahiru: $route_mahiru.mahiru_interlude.t025

@wait 800

mahiru: $route_mahiru.mahiru_interlude.t026
mahiru: $route_mahiru.mahiru_interlude.t027

@wait 1000

mahiru: $route_mahiru.mahiru_interlude.t028

@wait 1500

mahiru: $route_mahiru.mahiru_interlude.t029

@wait 800

mahiru: $route_mahiru.mahiru_interlude.t030

@wait 2000

@bgm stop
@wait 800

@window_color reset
@wait 700
@jump mahiru_ch9_start


// ===================================================================
//  Chapter 9m「秋の深まり」
// ===================================================================

# mahiru_ch9_start

@scene corridor fade
@bgm mahiru_theme.mp3
@se footsteps.mp3
@wait 800

> $route_mahiru.mahiru_ch9_start.t001

> $route_mahiru.mahiru_ch9_start.t002
> $route_mahiru.mahiru_ch9_start.t003

> $route_mahiru.mahiru_ch9_start.t004

> $route_mahiru.mahiru_ch9_start.t005
> $route_mahiru.mahiru_ch9_start.t006

> $route_mahiru.mahiru_ch9_start.t007
> $route_mahiru.mahiru_ch9_start.t008

@wait 700

> $route_mahiru.mahiru_ch9_start.t009
> $route_mahiru.mahiru_ch9_start.t010
> $route_mahiru.mahiru_ch9_start.t011

@wait 600

> $route_mahiru.mahiru_ch9_start.t012

@jump mahiru_ch9_return


# mahiru_ch9_return

@scene corridor fade
@bgm mahiru_theme.mp3
@se footsteps.mp3
@wait 1000

> $route_mahiru.mahiru_ch9_return.t001

> $route_mahiru.mahiru_ch9_return.t002
> $route_mahiru.mahiru_ch9_return.t003
> $route_mahiru.mahiru_ch9_return.t004

@wait 700

> $route_mahiru.mahiru_ch9_return.t005
> $route_mahiru.mahiru_ch9_return.t006
> $route_mahiru.mahiru_ch9_return.t007

@show mahiru center normal fade_in

@wait 800

> $route_mahiru.mahiru_ch9_return.t008

@expr mahiru happy

mahiru: $route_mahiru.mahiru_ch9_return.t009

player: $route_mahiru.mahiru_ch9_return.t010

@wait 600

> $route_mahiru.mahiru_ch9_return.t011
> $route_mahiru.mahiru_ch9_return.t012

> $route_mahiru.mahiru_ch9_return.t013

@wait 500

> $route_mahiru.mahiru_ch9_return.t014
> $route_mahiru.mahiru_ch9_return.t015

> $route_mahiru.mahiru_ch9_return.t016
> $route_mahiru.mahiru_ch9_return.t017

> $route_mahiru.mahiru_ch9_return.t018
> $route_mahiru.mahiru_ch9_return.t019
> $route_mahiru.mahiru_ch9_return.t020
> $route_mahiru.mahiru_ch9_return.t021

@wait 800

mahiru: $route_mahiru.mahiru_ch9_return.t022

player: $route_mahiru.mahiru_ch9_return.t023

mahiru: $route_mahiru.mahiru_ch9_return.t024
mahiru: $route_mahiru.mahiru_ch9_return.t025

@wait 1000

> $route_mahiru.mahiru_ch9_return.t026
> $route_mahiru.mahiru_ch9_return.t027

> $route_mahiru.mahiru_ch9_return.t028
> $route_mahiru.mahiru_ch9_return.t029
> $route_mahiru.mahiru_ch9_return.t030

@wait 700

player: $route_mahiru.mahiru_ch9_return.t031

@expr mahiru normal

mahiru: $route_mahiru.mahiru_ch9_return.t032

@wait 600

> $route_mahiru.mahiru_ch9_return.t033
> $route_mahiru.mahiru_ch9_return.t034
> $route_mahiru.mahiru_ch9_return.t035

> $route_mahiru.mahiru_ch9_return.t036

@wait 800

@hide mahiru fade_out
@wait 500

@jump mahiru_ch9_notebook


# mahiru_ch9_notebook

@scene classroom fade
@bgm mahiru_theme.mp3
@wait 800

> $route_mahiru.mahiru_ch9_notebook.t001

> $route_mahiru.mahiru_ch9_notebook.t002
> $route_mahiru.mahiru_ch9_notebook.t003

> $route_mahiru.mahiru_ch9_notebook.t004
> $route_mahiru.mahiru_ch9_notebook.t005

@wait 700

> $route_mahiru.mahiru_ch9_notebook.t006
> $route_mahiru.mahiru_ch9_notebook.t007
> $route_mahiru.mahiru_ch9_notebook.t008

> $route_mahiru.mahiru_ch9_notebook.t009
> $route_mahiru.mahiru_ch9_notebook.t010
> $route_mahiru.mahiru_ch9_notebook.t011
> $route_mahiru.mahiru_ch9_notebook.t012

@wait 900

@still mahiru_notebook_one_line
@wait 1500
@still_hide

> $route_mahiru.mahiru_ch9_notebook.t013
> $route_mahiru.mahiru_ch9_notebook.t014

> $route_mahiru.mahiru_ch9_notebook.t015

@wait 800

> $route_mahiru.mahiru_ch9_notebook.t016

@wait 700

> $route_mahiru.mahiru_ch9_notebook.t017
> $route_mahiru.mahiru_ch9_notebook.t018

> $route_mahiru.mahiru_ch9_notebook.t019

> $route_mahiru.mahiru_ch9_notebook.t020

> $route_mahiru.mahiru_ch9_notebook.t021
> $route_mahiru.mahiru_ch9_notebook.t022

> $route_mahiru.mahiru_ch9_notebook.t023
> $route_mahiru.mahiru_ch9_notebook.t024
> $route_mahiru.mahiru_ch9_notebook.t025

@wait 1000

@show mahiru_no_camera center happy fade_in

mahiru: $route_mahiru.mahiru_ch9_notebook.t026

player: $route_mahiru.mahiru_ch9_notebook.t027

mahiru: $route_mahiru.mahiru_ch9_notebook.t028

@wait 400

@expr mahiru_no_camera normal

> $route_mahiru.mahiru_ch9_notebook.t029
> $route_mahiru.mahiru_ch9_notebook.t030

> $route_mahiru.mahiru_ch9_notebook.t031
> $route_mahiru.mahiru_ch9_notebook.t032

> $route_mahiru.mahiru_ch9_notebook.t033
> $route_mahiru.mahiru_ch9_notebook.t034

@wait 600

> $route_mahiru.mahiru_ch9_notebook.t035
> $route_mahiru.mahiru_ch9_notebook.t036
> $route_mahiru.mahiru_ch9_notebook.t037

@wait 700

@hide mahiru_no_camera fade_out
@wait 500

@jump mahiru_ch9_corridor


# mahiru_ch9_corridor

@scene corridor fade
@bgm mahiru_theme.mp3
@se footsteps.mp3
@wait 900

> $route_mahiru.mahiru_ch9_corridor.t001
> $route_mahiru.mahiru_ch9_corridor.t002
> $route_mahiru.mahiru_ch9_corridor.t003

@show mahiru_no_camera center normal fade_in

@wait 600

mahiru: $route_mahiru.mahiru_ch9_corridor.t004

player: $route_mahiru.mahiru_ch9_corridor.t005

mahiru: $route_mahiru.mahiru_ch9_corridor.t006

@wait 700

> $route_mahiru.mahiru_ch9_corridor.t007
> $route_mahiru.mahiru_ch9_corridor.t008
> $route_mahiru.mahiru_ch9_corridor.t009

@wait 600

> $route_mahiru.mahiru_ch9_corridor.t010
> $route_mahiru.mahiru_ch9_corridor.t011

@expr mahiru_no_camera thinking

player: $route_mahiru.mahiru_ch9_corridor.t012

mahiru: $route_mahiru.mahiru_ch9_corridor.t013

player: $route_mahiru.mahiru_ch9_corridor.t014

@wait 800

mahiru: $route_mahiru.mahiru_ch9_corridor.t015
mahiru: $route_mahiru.mahiru_ch9_corridor.t016

@wait 1000

> $route_mahiru.mahiru_ch9_corridor.t017

> $route_mahiru.mahiru_ch9_corridor.t018
> $route_mahiru.mahiru_ch9_corridor.t019
> $route_mahiru.mahiru_ch9_corridor.t020
> $route_mahiru.mahiru_ch9_corridor.t021
> $route_mahiru.mahiru_ch9_corridor.t022

> $route_mahiru.mahiru_ch9_corridor.t023
> $route_mahiru.mahiru_ch9_corridor.t024
> $route_mahiru.mahiru_ch9_corridor.t025

@wait 900

player: $route_mahiru.mahiru_ch9_corridor.t026

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_ch9_corridor.t027
mahiru: $route_mahiru.mahiru_ch9_corridor.t028

@wait 700

> $route_mahiru.mahiru_ch9_corridor.t029
> $route_mahiru.mahiru_ch9_corridor.t030

> $route_mahiru.mahiru_ch9_corridor.t031
> $route_mahiru.mahiru_ch9_corridor.t032

@wait 600

@hide mahiru_no_camera fade_out
@wait 500

@jump mahiru_ch9_reason


# mahiru_ch9_reason

@scene school_gate_autumn_evening fade
@bgm evening_piano.mp3
@wait 800

> $route_mahiru.mahiru_ch9_reason.t001

> $route_mahiru.mahiru_ch9_reason.t002
> $route_mahiru.mahiru_ch9_reason.t003
>向こうから言ってくるのは、いつも元気なときだった。

@show mahiru_no_camera center normal fade_in

> $route_mahiru.mahiru_ch9_reason.t004
> $route_mahiru.mahiru_ch9_reason.t005

@wait 1000

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch9_reason.t006

player: $route_mahiru.mahiru_ch9_reason.t007

@wait 600

mahiru: $route_mahiru.mahiru_ch9_reason.t008
mahiru: $route_mahiru.mahiru_ch9_reason.t009

@wait 1200

> $route_mahiru.mahiru_ch9_reason.t010
> $route_mahiru.mahiru_ch9_reason.t011

> $route_mahiru.mahiru_ch9_reason.t012

@wait 800

player: $route_mahiru.mahiru_ch9_reason.t013

mahiru: $route_mahiru.mahiru_ch9_reason.t014

@wait 800

mahiru: $route_mahiru.mahiru_ch9_reason.t015
mahiru: $route_mahiru.mahiru_ch9_reason.t016

@wait 1000

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_ch9_reason.t017

@wait 800

> $route_mahiru.mahiru_ch9_reason.t018
> $route_mahiru.mahiru_ch9_reason.t019

> $route_mahiru.mahiru_ch9_reason.t020

@wait 700

player: $route_mahiru.mahiru_ch9_reason.t021

mahiru: $route_mahiru.mahiru_ch9_reason.t022

player: $route_mahiru.mahiru_ch9_reason.t023

@wait 1000

> $route_mahiru.mahiru_ch9_reason.t024
> $route_mahiru.mahiru_ch9_reason.t025

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch9_reason.t026
mahiru: $route_mahiru.mahiru_ch9_reason.t027

@wait 800

mahiru: $route_mahiru.mahiru_ch9_reason.t028

@wait 1500

> $route_mahiru.mahiru_ch9_reason.t029

> $route_mahiru.mahiru_ch9_reason.t030

> $route_mahiru.mahiru_ch9_reason.t031
> $route_mahiru.mahiru_ch9_reason.t032

@wait 900

@expr mahiru_no_camera happy

mahiru: $route_mahiru.mahiru_ch9_reason.t033

player: $route_mahiru.mahiru_ch9_reason.t034

mahiru: $route_mahiru.mahiru_ch9_reason.t035

@wait 800

> $route_mahiru.mahiru_ch9_reason.t036
> $route_mahiru.mahiru_ch9_reason.t037

player: $route_mahiru.mahiru_ch9_reason.t038

mahiru: $route_mahiru.mahiru_ch9_reason.t039
mahiru: $route_mahiru.mahiru_ch9_reason.t040
mahiru: $route_mahiru.mahiru_ch9_reason.t041

@wait 800

player: $route_mahiru.mahiru_ch9_reason.t042

mahiru: $route_mahiru.mahiru_ch9_reason.t043

player: $route_mahiru.mahiru_ch9_reason.t044

@wait 700

mahiru: $route_mahiru.mahiru_ch9_reason.t045

player: $route_mahiru.mahiru_ch9_reason.t046

@wait 600

> $route_mahiru.mahiru_ch9_reason.t047

> $route_mahiru.mahiru_ch9_reason.t048
> $route_mahiru.mahiru_ch9_reason.t049
> $route_mahiru.mahiru_ch9_reason.t050

> $route_mahiru.mahiru_ch9_reason.t051
> $route_mahiru.mahiru_ch9_reason.t052

@wait 800

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_ch9_reason.t053
mahiru: $route_mahiru.mahiru_ch9_reason.t054

@wait 700

> $route_mahiru.mahiru_ch9_reason.t055
> $route_mahiru.mahiru_ch9_reason.t056

> $route_mahiru.mahiru_ch9_reason.t057

> $route_mahiru.mahiru_ch9_reason.t058

@wait 1000

@hide mahiru_no_camera fade_out
@wait 500

@bgm stop
@wait 400

@jump mahiru_ch9_walk


# mahiru_ch9_walk

@scene commute_road_autumn_evening fade
@bgm mahiru_theme.mp3
@se footsteps.mp3
@wait 800

> $route_mahiru.mahiru_ch9_walk.t001

> $route_mahiru.mahiru_ch9_walk.t002
> $route_mahiru.mahiru_ch9_walk.t003

@show mahiru_no_camera center normal fade_in

> $route_mahiru.mahiru_ch9_walk.t004

> $route_mahiru.mahiru_ch9_walk.t005

@wait 600

> $route_mahiru.mahiru_ch9_walk.t006

> *$route_mahiru.mahiru_ch9_walk.t007*

> $route_mahiru.mahiru_ch9_walk.t008
> $route_mahiru.mahiru_ch9_walk.t009
> $route_mahiru.mahiru_ch9_walk.t010

> $route_mahiru.mahiru_ch9_walk.t011
> $route_mahiru.mahiru_ch9_walk.t012

@wait 700

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch9_walk.t013

mahiru: $route_mahiru.mahiru_ch9_walk.t014

@wait 800

player: $route_mahiru.mahiru_ch9_walk.t015

@expr mahiru_no_camera happy

mahiru: $route_mahiru.mahiru_ch9_walk.t016
mahiru: $route_mahiru.mahiru_ch9_walk.t017

mahiru: $route_mahiru.mahiru_ch9_walk.t018
mahiru: $route_mahiru.mahiru_ch9_walk.t019

player: $route_mahiru.mahiru_ch9_walk.t020

@wait 700

> $route_mahiru.mahiru_ch9_walk.t021

> $route_mahiru.mahiru_ch9_walk.t022
> $route_mahiru.mahiru_ch9_walk.t023

> *$route_mahiru.mahiru_ch9_walk.t024*
> *$route_mahiru.mahiru_ch9_walk.t025*

@wait 600

@hide mahiru_no_camera fade_out
@wait 500

@bgm stop
@wait 400

@jump mahiru_ch9_end


# mahiru_ch9_end

@scene commute_road_autumn_evening fade
@bgm evening_piano.mp3
@wait 800

> $route_mahiru.mahiru_ch9_end.t001

> $route_mahiru.mahiru_ch9_end.t002
> $route_mahiru.mahiru_ch9_end.t003

> $route_mahiru.mahiru_ch9_end.t004

> $route_mahiru.mahiru_ch9_end.t005
> $route_mahiru.mahiru_ch9_end.t006

@wait 1000

> *$route_mahiru.mahiru_ch9_end.t007*
> *$route_mahiru.mahiru_ch9_end.t008*

@wait 800

> $route_mahiru.mahiru_ch9_end.t009
> $route_mahiru.mahiru_ch9_end.t010

> $route_mahiru.mahiru_ch9_end.t011
> $route_mahiru.mahiru_ch9_end.t012

> $route_mahiru.mahiru_ch9_end.t013
> $route_mahiru.mahiru_ch9_end.t014
> $route_mahiru.mahiru_ch9_end.t015

@wait 1000

> $route_mahiru.mahiru_ch9_end.t016
> $route_mahiru.mahiru_ch9_end.t017
> $route_mahiru.mahiru_ch9_end.t018

@wait 1000

@bgm stop
@wait 500

@jump mahiru_ch10_start


// ===================================================================
//  Chapter 10m「消えてしまいそうな気配」
// ===================================================================

# mahiru_ch10_start

@scene school_exterior_night fade
@bgm piano_resonance.mp3
@wait 1000

> $route_mahiru.mahiru_ch10_start.t001

> $route_mahiru.mahiru_ch10_start.t002

@wait 600

> $route_mahiru.mahiru_ch10_start.t003
> $route_mahiru.mahiru_ch10_start.t004

> $route_mahiru.mahiru_ch10_start.t005
> $route_mahiru.mahiru_ch10_start.t006
> $route_mahiru.mahiru_ch10_start.t007

@wait 700

> $route_mahiru.mahiru_ch10_start.t008
> $route_mahiru.mahiru_ch10_start.t009
> $route_mahiru.mahiru_ch10_start.t010

@wait 800

> $route_mahiru.mahiru_ch10_start.t011
> $route_mahiru.mahiru_ch10_start.t012

> $route_mahiru.mahiru_ch10_start.t013
> $route_mahiru.mahiru_ch10_start.t014
> $route_mahiru.mahiru_ch10_start.t015

> $route_mahiru.mahiru_ch10_start.t016
> $route_mahiru.mahiru_ch10_start.t017

> $route_mahiru.mahiru_ch10_start.t018
> $route_mahiru.mahiru_ch10_start.t019

@wait 900

@se wind_rooftop.mp3
@wait 800

> $route_mahiru.mahiru_ch10_start.t020

> $route_mahiru.mahiru_ch10_start.t021

> $route_mahiru.mahiru_ch10_start.t022

> $route_mahiru.mahiru_ch10_start.t023

@wait 700

@still mahiru_seen_from_below
@wait 1500
@still_hide

@wait 600

> $route_mahiru.mahiru_ch10_start.t024

> $route_mahiru.mahiru_ch10_start.t025
> $route_mahiru.mahiru_ch10_start.t026

> $route_mahiru.mahiru_ch10_start.t027
> $route_mahiru.mahiru_ch10_start.t028

@wait 800

> $route_mahiru.mahiru_ch10_start.t029
> $route_mahiru.mahiru_ch10_start.t030

> $route_mahiru.mahiru_ch10_start.t031
> $route_mahiru.mahiru_ch10_start.t032
> $route_mahiru.mahiru_ch10_start.t033
> $route_mahiru.mahiru_ch10_start.t034

@wait 800

> $route_mahiru.mahiru_ch10_start.t035
> $route_mahiru.mahiru_ch10_start.t036

@wait 600

> *$route_mahiru.mahiru_ch10_start.t037*

@jump mahiru_ch10_monologue


# mahiru_ch10_monologue

@scene school_exterior_night cut
@bgm stop
@wait 600

> $route_mahiru.mahiru_ch10_monologue.t001

> $route_mahiru.mahiru_ch10_monologue.t002
> $route_mahiru.mahiru_ch10_monologue.t003
> $route_mahiru.mahiru_ch10_monologue.t004

> $route_mahiru.mahiru_ch10_monologue.t005

> $route_mahiru.mahiru_ch10_monologue.t006
> $route_mahiru.mahiru_ch10_monologue.t007

@wait 700

> *$route_mahiru.mahiru_ch10_monologue.t008*

> $route_mahiru.mahiru_ch10_monologue.t009
> $route_mahiru.mahiru_ch10_monologue.t010
> $route_mahiru.mahiru_ch10_monologue.t011
> $route_mahiru.mahiru_ch10_monologue.t012
> $route_mahiru.mahiru_ch10_monologue.t013

> *$route_mahiru.mahiru_ch10_monologue.t014*
> *$route_mahiru.mahiru_ch10_monologue.t015*

@wait 900

> $route_mahiru.mahiru_ch10_monologue.t016
> $route_mahiru.mahiru_ch10_monologue.t017

> $route_mahiru.mahiru_ch10_monologue.t018

@wait 800

> *$route_mahiru.mahiru_ch10_monologue.t019*

@choice
- $choices.route_mahiru.run -> mahiru_ch10_run
- $choices.route_mahiru.too_late -> mahiru_bad_end


# mahiru_ch10_run

@scene school_exterior_night cut
@se heartbeat.mp3
@wait 300

@scene staircase_night cut
@wait 200

> $route_mahiru.mahiru_ch10_run.t001

> $route_mahiru.mahiru_ch10_run.t002
> $route_mahiru.mahiru_ch10_run.t003

@wait 500

> $route_mahiru.mahiru_ch10_run.t004
> $route_mahiru.mahiru_ch10_run.t005

> $route_mahiru.mahiru_ch10_run.t006
> $route_mahiru.mahiru_ch10_run.t007
> $route_mahiru.mahiru_ch10_run.t008
> $route_mahiru.mahiru_ch10_run.t009

@scene staircase_night cut
@wait 300

> $route_mahiru.mahiru_ch10_run.t010
> $route_mahiru.mahiru_ch10_run.t011

@wait 500

> $route_mahiru.mahiru_ch10_run.t012

> $route_mahiru.mahiru_ch10_run.t013
> $route_mahiru.mahiru_ch10_run.t014
> $route_mahiru.mahiru_ch10_run.t015
> $route_mahiru.mahiru_ch10_run.t016
> $route_mahiru.mahiru_ch10_run.t017

> $route_mahiru.mahiru_ch10_run.t018
> $route_mahiru.mahiru_ch10_run.t019
> $route_mahiru.mahiru_ch10_run.t020
> $route_mahiru.mahiru_ch10_run.t021

> $route_mahiru.mahiru_ch10_run.t022
> $route_mahiru.mahiru_ch10_run.t023

@wait 700

> *$route_mahiru.mahiru_ch10_run.t024*

@wait 400

> $route_mahiru.mahiru_ch10_run.t025
> $route_mahiru.mahiru_ch10_run.t026
> $route_mahiru.mahiru_ch10_run.t027

> $route_mahiru.mahiru_ch10_run.t028
> $route_mahiru.mahiru_ch10_run.t029
> $route_mahiru.mahiru_ch10_run.t030
> $route_mahiru.mahiru_ch10_run.t031
> $route_mahiru.mahiru_ch10_run.t032
> $route_mahiru.mahiru_ch10_run.t033

> $route_mahiru.mahiru_ch10_run.t034

@wait 600

> $route_mahiru.mahiru_ch10_run.t035

@scene staircase_night cut
@wait 200

> *$route_mahiru.mahiru_ch10_run.t036*

@wait 300

> $route_mahiru.mahiru_ch10_run.t037
> $route_mahiru.mahiru_ch10_run.t038
> $route_mahiru.mahiru_ch10_run.t039

> $route_mahiru.mahiru_ch10_run.t040

> $route_mahiru.mahiru_ch10_run.t041
> $route_mahiru.mahiru_ch10_run.t042

@wait 500

> *$route_mahiru.mahiru_ch10_run.t043*

> $route_mahiru.mahiru_ch10_run.t044
> $route_mahiru.mahiru_ch10_run.t045
> $route_mahiru.mahiru_ch10_run.t046

@wait 500

@se heartbeat.mp3
@wait 300

> $route_mahiru.mahiru_ch10_run.t047
> $route_mahiru.mahiru_ch10_run.t048
> $route_mahiru.mahiru_ch10_run.t049

> $route_mahiru.mahiru_ch10_run.t050
> $route_mahiru.mahiru_ch10_run.t051

> $route_mahiru.mahiru_ch10_run.t052
> $route_mahiru.mahiru_ch10_run.t053

> $route_mahiru.mahiru_ch10_run.t054
> $route_mahiru.mahiru_ch10_run.t055

@wait 700

@jump mahiru_ch10_rooftop


# mahiru_ch10_rooftop

@scene rooftop_night fade
@bgm predawn_tension.mp3
@wait 600

> $route_mahiru.mahiru_ch10_rooftop.t001

> $route_mahiru.mahiru_ch10_rooftop.t002

> $route_mahiru.mahiru_ch10_rooftop.t003

> $route_mahiru.mahiru_ch10_rooftop.t004

@wait 500

@still mahiru_rooftop_night
@wait 1000
@still_hide

@wait 400

> $route_mahiru.mahiru_ch10_rooftop.t005

> $route_mahiru.mahiru_ch10_rooftop.t006
> $route_mahiru.mahiru_ch10_rooftop.t007

> $route_mahiru.mahiru_ch10_rooftop.t008

> $route_mahiru.mahiru_ch10_rooftop.t009

> $route_mahiru.mahiru_ch10_rooftop.t010

@wait 800

> $route_mahiru.mahiru_ch10_rooftop.t011

> $route_mahiru.mahiru_ch10_rooftop.t012
> $route_mahiru.mahiru_ch10_rooftop.t013
> $route_mahiru.mahiru_ch10_rooftop.t014

> $route_mahiru.mahiru_ch10_rooftop.t015
> $route_mahiru.mahiru_ch10_rooftop.t016
> $route_mahiru.mahiru_ch10_rooftop.t017

@show mahiru_no_camera center normal fade_in

> $route_mahiru.mahiru_ch10_rooftop.t018

@expr mahiru_no_camera surprised

mahiru: $route_mahiru.mahiru_ch10_rooftop.t019

@wait 1000

> $route_mahiru.mahiru_ch10_rooftop.t020

> *$route_mahiru.mahiru_ch10_rooftop.t021*
> *$route_mahiru.mahiru_ch10_rooftop.t022*

@wait 800

> $route_mahiru.mahiru_ch10_rooftop.t023
> $route_mahiru.mahiru_ch10_rooftop.t024
> $route_mahiru.mahiru_ch10_rooftop.t025
> $route_mahiru.mahiru_ch10_rooftop.t026

player: $route_mahiru.mahiru_ch10_rooftop.t027

@wait 600

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch10_rooftop.t028

@wait 700

> $route_mahiru.mahiru_ch10_rooftop.t029

player: $route_mahiru.mahiru_ch10_rooftop.t030

@wait 1200

> $route_mahiru.mahiru_ch10_rooftop.t031

@wait 800

@bgm stop
@wait 600

> $route_mahiru.mahiru_ch10_rooftop.t032

> $route_mahiru.mahiru_ch10_rooftop.t033
> $route_mahiru.mahiru_ch10_rooftop.t034

@wait 1000

@se wind_rooftop.mp3
@wait 800

> $route_mahiru.mahiru_ch10_rooftop.t035
> $route_mahiru.mahiru_ch10_rooftop.t036

@wait 600

@expr mahiru_no_camera crying

> $route_mahiru.mahiru_ch10_rooftop.t037

> $route_mahiru.mahiru_ch10_rooftop.t038

> $route_mahiru.mahiru_ch10_rooftop.t039

@wait 800

> $route_mahiru.mahiru_ch10_rooftop.t040

> $route_mahiru.mahiru_ch10_rooftop.t041
> $route_mahiru.mahiru_ch10_rooftop.t042
> $route_mahiru.mahiru_ch10_rooftop.t043
> $route_mahiru.mahiru_ch10_rooftop.t044
> $route_mahiru.mahiru_ch10_rooftop.t045
> $route_mahiru.mahiru_ch10_rooftop.t046

@wait 1200

@bgm night_melody.mp3
@wait 500

mahiru: $route_mahiru.mahiru_ch10_rooftop.t047

@wait 1500

mahiru: $route_mahiru.mahiru_ch10_rooftop.t048

@wait 1200

mahiru: $route_mahiru.mahiru_ch10_rooftop.t049

@wait 600

mahiru: $route_mahiru.mahiru_ch10_rooftop.t050

@wait 1500

> *$route_mahiru.mahiru_ch10_rooftop.t051*

@wait 1000

> $route_mahiru.mahiru_ch10_rooftop.t052

> $route_mahiru.mahiru_ch10_rooftop.t053
> $route_mahiru.mahiru_ch10_rooftop.t054
> $route_mahiru.mahiru_ch10_rooftop.t055

> $route_mahiru.mahiru_ch10_rooftop.t056
> $route_mahiru.mahiru_ch10_rooftop.t057
> $route_mahiru.mahiru_ch10_rooftop.t058

@wait 900

> $route_mahiru.mahiru_ch10_rooftop.t059
> $route_mahiru.mahiru_ch10_rooftop.t060

@wait 600

mahiru: $route_mahiru.mahiru_ch10_rooftop.t061

mahiru: $route_mahiru.mahiru_ch10_rooftop.t062
mahiru: $route_mahiru.mahiru_ch10_rooftop.t063

@wait 1200

mahiru: $route_mahiru.mahiru_ch10_rooftop.t064

mahiru: $route_mahiru.mahiru_ch10_rooftop.t065
mahiru: $route_mahiru.mahiru_ch10_rooftop.t066

@wait 1000

mahiru: $route_mahiru.mahiru_ch10_rooftop.t067
mahiru: $route_mahiru.mahiru_ch10_rooftop.t068

@wait 1200

@expr mahiru_no_camera sad

mahiru: $route_mahiru.mahiru_ch10_rooftop.t069

@wait 1500

> $route_mahiru.mahiru_ch10_rooftop.t070

> $route_mahiru.mahiru_ch10_rooftop.t071

> $route_mahiru.mahiru_ch10_rooftop.t072

@wait 600

> $route_mahiru.mahiru_ch10_rooftop.t073
> $route_mahiru.mahiru_ch10_rooftop.t074

@wait 1500

@hide mahiru_no_camera fade_out
@wait 300
@still mahiru_rooftop_reach
@wait 1200
@still_hide

@wait 600

@show mahiru_no_camera center crying fade_in

@wait 800

> $route_mahiru.mahiru_ch10_rooftop.t075

> $route_mahiru.mahiru_ch10_rooftop.t076

> $route_mahiru.mahiru_ch10_rooftop.t077
> $route_mahiru.mahiru_ch10_rooftop.t078
> $route_mahiru.mahiru_ch10_rooftop.t079

> $route_mahiru.mahiru_ch10_rooftop.t080
> $route_mahiru.mahiru_ch10_rooftop.t081

@wait 1500

@bgm stop
@wait 400

@jump mahiru_ch11_start


// ===================================================================
//  Chapter 11m「今度は間に合う」
// ===================================================================

# mahiru_ch11_start

@scene rooftop_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 1200

> $route_mahiru.mahiru_ch11_start.t001
> $route_mahiru.mahiru_ch11_start.t002

> $route_mahiru.mahiru_ch11_start.t003

@wait 800

@show mahiru_no_camera center normal fade_in

> $route_mahiru.mahiru_ch11_start.t004

> $route_mahiru.mahiru_ch11_start.t005

@wait 1000

> *$route_mahiru.mahiru_ch11_start.t006*
> *$route_mahiru.mahiru_ch11_start.t007*

> *$route_mahiru.mahiru_ch11_start.t008*

@wait 800

> $route_mahiru.mahiru_ch11_start.t009
> $route_mahiru.mahiru_ch11_start.t010

> $route_mahiru.mahiru_ch11_start.t011
> $route_mahiru.mahiru_ch11_start.t012
> $route_mahiru.mahiru_ch11_start.t013

@wait 900

> $route_mahiru.mahiru_ch11_start.t014
> $route_mahiru.mahiru_ch11_start.t015

> $route_mahiru.mahiru_ch11_start.t016
> $route_mahiru.mahiru_ch11_start.t017
> $route_mahiru.mahiru_ch11_start.t018

@wait 1000

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch11_start.t019

mahiru: $route_mahiru.mahiru_ch11_start.t020

@wait 900

mahiru: $route_mahiru.mahiru_ch11_start.t021

@wait 1200

mahiru: $route_mahiru.mahiru_ch11_start.t022

@wait 1000

> $route_mahiru.mahiru_ch11_start.t023
> $route_mahiru.mahiru_ch11_start.t024

@show mahiru_no_camera center thinking fade_in

> $route_mahiru.mahiru_ch11_start.t025
> $route_mahiru.mahiru_ch11_start.t026
> $route_mahiru.mahiru_ch11_start.t027
> $route_mahiru.mahiru_ch11_start.t028

@wait 800

mahiru: $route_mahiru.mahiru_ch11_start.t029

@wait 800

mahiru: $route_mahiru.mahiru_ch11_start.t030

@wait 1200

> $route_mahiru.mahiru_ch11_start.t031

> $route_mahiru.mahiru_ch11_start.t032
> $route_mahiru.mahiru_ch11_start.t033

> $route_mahiru.mahiru_ch11_start.t034
> $route_mahiru.mahiru_ch11_start.t035

> $route_mahiru.mahiru_ch11_start.t036
> $route_mahiru.mahiru_ch11_start.t037
> $route_mahiru.mahiru_ch11_start.t038

@wait 900

mahiru: $route_mahiru.mahiru_ch11_start.t039

mahiru: $route_mahiru.mahiru_ch11_start.t040

mahiru: $route_mahiru.mahiru_ch11_start.t041
mahiru: $route_mahiru.mahiru_ch11_start.t042

@wait 1500

> $route_mahiru.mahiru_ch11_start.t043

> $route_mahiru.mahiru_ch11_start.t044
> $route_mahiru.mahiru_ch11_start.t045
> $route_mahiru.mahiru_ch11_start.t046
> $route_mahiru.mahiru_ch11_start.t047

> $route_mahiru.mahiru_ch11_start.t048
> $route_mahiru.mahiru_ch11_start.t049

> $route_mahiru.mahiru_ch11_start.t050
> $route_mahiru.mahiru_ch11_start.t051

@wait 1000

player: $route_mahiru.mahiru_ch11_start.t052

@wait 600

> $route_mahiru.mahiru_ch11_start.t053

> $route_mahiru.mahiru_ch11_start.t054
> $route_mahiru.mahiru_ch11_start.t055
> $route_mahiru.mahiru_ch11_start.t056

> $route_mahiru.mahiru_ch11_start.t057

@wait 600

player: $route_mahiru.mahiru_ch11_start.t058

player: $route_mahiru.mahiru_ch11_start.t059

player: $route_mahiru.mahiru_ch11_start.t060

@wait 1000

player: $route_mahiru.mahiru_ch11_start.t061

@wait 1000

@expr mahiru_no_camera surprised

mahiru: $route_mahiru.mahiru_ch11_start.t062

@wait 600

player: $route_mahiru.mahiru_ch11_start.t063

@wait 800

> $route_mahiru.mahiru_ch11_start.t064
> $route_mahiru.mahiru_ch11_start.t065
> $route_mahiru.mahiru_ch11_start.t066
> $route_mahiru.mahiru_ch11_start.t067

> $route_mahiru.mahiru_ch11_start.t068
> $route_mahiru.mahiru_ch11_start.t069
> $route_mahiru.mahiru_ch11_start.t070

@wait 700

player: $route_mahiru.mahiru_ch11_start.t071
player: $route_mahiru.mahiru_ch11_start.t072

@wait 1000

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch11_start.t073

@wait 600

player: $route_mahiru.mahiru_ch11_start.t074

@wait 1000

@expr mahiru_no_camera normal

> $route_mahiru.mahiru_ch11_start.t075

mahiru: $route_mahiru.mahiru_ch11_start.t076

mahiru: $route_mahiru.mahiru_ch11_start.t077

@wait 1200

> $route_mahiru.mahiru_ch11_start.t078

> $route_mahiru.mahiru_ch11_start.t079
> $route_mahiru.mahiru_ch11_start.t080
> $route_mahiru.mahiru_ch11_start.t081
> $route_mahiru.mahiru_ch11_start.t082

> $route_mahiru.mahiru_ch11_start.t083
> $route_mahiru.mahiru_ch11_start.t084
> $route_mahiru.mahiru_ch11_start.t085

@wait 600

player: $route_mahiru.mahiru_ch11_start.t086

@wait 1500

@bgm night_melody.mp3
@wait 500

@expr mahiru_no_camera sad

mahiru: $route_mahiru.mahiru_ch11_start.t087

@wait 800

player: $route_mahiru.mahiru_ch11_start.t088

player: $route_mahiru.mahiru_ch11_start.t089

@wait 1500

> $route_mahiru.mahiru_ch11_start.t090

> $route_mahiru.mahiru_ch11_start.t091

> $route_mahiru.mahiru_ch11_start.t092
> $route_mahiru.mahiru_ch11_start.t093

@wait 800

> *$route_mahiru.mahiru_ch11_start.t094*
> *$route_mahiru.mahiru_ch11_start.t095*

> $route_mahiru.mahiru_ch11_start.t096
> $route_mahiru.mahiru_ch11_start.t097
> $route_mahiru.mahiru_ch11_start.t098

> $route_mahiru.mahiru_ch11_start.t099
> $route_mahiru.mahiru_ch11_start.t100
> $route_mahiru.mahiru_ch11_start.t101
> $route_mahiru.mahiru_ch11_start.t102

@wait 1200

@se wind_rooftop.mp3
@wait 600

mahiru: $route_mahiru.mahiru_ch11_start.t103

mahiru: $route_mahiru.mahiru_ch11_start.t104

@wait 1000

player: $route_mahiru.mahiru_ch11_start.t105

@wait 800

player: $route_mahiru.mahiru_ch11_start.t106

@wait 1000

> $route_mahiru.mahiru_ch11_start.t107
> $route_mahiru.mahiru_ch11_start.t108
> $route_mahiru.mahiru_ch11_start.t109
> $route_mahiru.mahiru_ch11_start.t110
> $route_mahiru.mahiru_ch11_start.t111

> $route_mahiru.mahiru_ch11_start.t112
> $route_mahiru.mahiru_ch11_start.t113

> $route_mahiru.mahiru_ch11_start.t114
> $route_mahiru.mahiru_ch11_start.t115
> $route_mahiru.mahiru_ch11_start.t116

> $route_mahiru.mahiru_ch11_start.t117

@wait 1000

@expr mahiru_no_camera normal

> $route_mahiru.mahiru_ch11_start.t118

> $route_mahiru.mahiru_ch11_start.t119

mahiru: $route_mahiru.mahiru_ch11_start.t120

@wait 1200

> $route_mahiru.mahiru_ch11_start.t121

> $route_mahiru.mahiru_ch11_start.t122

> $route_mahiru.mahiru_ch11_start.t123
> $route_mahiru.mahiru_ch11_start.t124

> $route_mahiru.mahiru_ch11_start.t125
> $route_mahiru.mahiru_ch11_start.t126
> $route_mahiru.mahiru_ch11_start.t127
> $route_mahiru.mahiru_ch11_start.t128

> $route_mahiru.mahiru_ch11_start.t129
> $route_mahiru.mahiru_ch11_start.t130
> $route_mahiru.mahiru_ch11_start.t131

@wait 1500

> *$route_mahiru.mahiru_ch11_start.t132*

@wait 1000

> $route_mahiru.mahiru_ch11_start.t133
> $route_mahiru.mahiru_ch11_start.t134
> $route_mahiru.mahiru_ch11_start.t135

> $route_mahiru.mahiru_ch11_start.t136
> $route_mahiru.mahiru_ch11_start.t137

@wait 1200

mahiru: $route_mahiru.mahiru_ch11_start.t138

player: $route_mahiru.mahiru_ch11_start.t139

mahiru: $route_mahiru.mahiru_ch11_start.t140

@wait 1000

> $route_mahiru.mahiru_ch11_start.t141
> $route_mahiru.mahiru_ch11_start.t142
> $route_mahiru.mahiru_ch11_start.t143

@wait 800

player: $route_mahiru.mahiru_ch11_start.t144

@wait 700

mahiru: $route_mahiru.mahiru_ch11_start.t145

player: $route_mahiru.mahiru_ch11_start.t146

player: $route_mahiru.mahiru_ch11_start.t147

@wait 1000

@expr mahiru_no_camera normal

> $route_mahiru.mahiru_ch11_start.t148
> $route_mahiru.mahiru_ch11_start.t149

mahiru: $route_mahiru.mahiru_ch11_start.t150

@wait 800

> $route_mahiru.mahiru_ch11_start.t151
> $route_mahiru.mahiru_ch11_start.t152

> $route_mahiru.mahiru_ch11_start.t153

> $route_mahiru.mahiru_ch11_start.t154
> $route_mahiru.mahiru_ch11_start.t155
> $route_mahiru.mahiru_ch11_start.t156
> $route_mahiru.mahiru_ch11_start.t157

@wait 1200

@hide mahiru_no_camera fade_out
@wait 500

@bgm stop
@wait 400

@jump mahiru_ch11_stars


// ===================================================================
//  Chapter 11m-A「夜が明けるまでの会話」
// ===================================================================

# mahiru_ch11_stars

@scene rooftop_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 800

> $route_mahiru.mahiru_ch11_stars.t001
> $route_mahiru.mahiru_ch11_stars.t002
> $route_mahiru.mahiru_ch11_stars.t003

@show mahiru_no_camera center normal fade_in

@wait 800

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch11_stars.t004

mahiru: $route_mahiru.mahiru_ch11_stars.t005

@wait 1000

> $route_mahiru.mahiru_ch11_stars.t006
> $route_mahiru.mahiru_ch11_stars.t007

@wait 700

player: $route_mahiru.mahiru_ch11_stars.t008

@wait 600

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_ch11_stars.t009

@wait 600

> $route_mahiru.mahiru_ch11_stars.t010
> $route_mahiru.mahiru_ch11_stars.t011

> $route_mahiru.mahiru_ch11_stars.t012
> $route_mahiru.mahiru_ch11_stars.t013
> $route_mahiru.mahiru_ch11_stars.t014

> $route_mahiru.mahiru_ch11_stars.t015
> $route_mahiru.mahiru_ch11_stars.t016
> $route_mahiru.mahiru_ch11_stars.t017

@wait 700

player: $route_mahiru.mahiru_ch11_stars.t018

mahiru: $route_mahiru.mahiru_ch11_stars.t019

@wait 600

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch11_stars.t020
mahiru: $route_mahiru.mahiru_ch11_stars.t021

@wait 500

> $route_mahiru.mahiru_ch11_stars.t022

@wait 400

player: $route_mahiru.mahiru_ch11_stars.t023

mahiru: $route_mahiru.mahiru_ch11_stars.t024
mahiru: $route_mahiru.mahiru_ch11_stars.t025

@wait 700

> $route_mahiru.mahiru_ch11_stars.t026
> $route_mahiru.mahiru_ch11_stars.t027

@wait 600

player: $route_mahiru.mahiru_ch11_stars.t028

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_ch11_stars.t029
mahiru: $route_mahiru.mahiru_ch11_stars.t030

@wait 500

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_ch11_stars.t031
mahiru: $route_mahiru.mahiru_ch11_stars.t032

mahiru: $route_mahiru.mahiru_ch11_stars.t033
mahiru: $route_mahiru.mahiru_ch11_stars.t034

@wait 1200

> $route_mahiru.mahiru_ch11_stars.t035

> $route_mahiru.mahiru_ch11_stars.t036
> $route_mahiru.mahiru_ch11_stars.t037
> $route_mahiru.mahiru_ch11_stars.t038

> $route_mahiru.mahiru_ch11_stars.t039

@wait 1000

@se wind_rooftop.mp3
@wait 600

mahiru: $route_mahiru.mahiru_ch11_stars.t040

player: $route_mahiru.mahiru_ch11_stars.t041

mahiru: $route_mahiru.mahiru_ch11_stars.t042
mahiru: $route_mahiru.mahiru_ch11_stars.t043

@wait 700

> $route_mahiru.mahiru_ch11_stars.t044

@wait 800

> $route_mahiru.mahiru_ch11_stars.t045
> $route_mahiru.mahiru_ch11_stars.t046

> $route_mahiru.mahiru_ch11_stars.t047
> $route_mahiru.mahiru_ch11_stars.t048

@wait 1000

mahiru: $route_mahiru.mahiru_ch11_stars.t049

player: $route_mahiru.mahiru_ch11_stars.t050

mahiru: $route_mahiru.mahiru_ch11_stars.t051

@wait 1000

> $route_mahiru.mahiru_ch11_stars.t052
> $route_mahiru.mahiru_ch11_stars.t053
> $route_mahiru.mahiru_ch11_stars.t054

> $route_mahiru.mahiru_ch11_stars.t055
> $route_mahiru.mahiru_ch11_stars.t056

@wait 700

player: $route_mahiru.mahiru_ch11_stars.t057

@wait 600

@expr mahiru_no_camera happy

mahiru: $route_mahiru.mahiru_ch11_stars.t058

@wait 1200

@bgm stop
@wait 600

@jump mahiru_ch12_branch


// ===================================================================
//  Chapter 12m「エンディング分岐」
// ===================================================================

# mahiru_ch12_branch

@scene rooftop_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 1000

> $route_mahiru.mahiru_ch12_branch.t001

> $route_mahiru.mahiru_ch12_branch.t002

> $route_mahiru.mahiru_ch12_branch.t003
> $route_mahiru.mahiru_ch12_branch.t004
> $route_mahiru.mahiru_ch12_branch.t005

@show mahiru_no_camera center normal fade_in

@wait 800

mahiru: $route_mahiru.mahiru_ch12_branch.t006

player: $route_mahiru.mahiru_ch12_branch.t007

mahiru: $route_mahiru.mahiru_ch12_branch.t008

mahiru: $route_mahiru.mahiru_ch12_branch.t009
mahiru: $route_mahiru.mahiru_ch12_branch.t010

@wait 1000

> *$route_mahiru.mahiru_ch12_branch.t011*

@wait 600

> $route_mahiru.mahiru_ch12_branch.t012
> $route_mahiru.mahiru_ch12_branch.t013

> $route_mahiru.mahiru_ch12_branch.t014
> $route_mahiru.mahiru_ch12_branch.t015

> $route_mahiru.mahiru_ch12_branch.t016

@wait 800

@jump mahiru_good_end


// ===================================================================
//  Good End「夜明けは、一人では見つけられなかった」
// ===================================================================

# mahiru_good_end

@scene rooftop_night fade
@bgm night_melody.mp3
@se night_insect.mp3
@wait 600

player: $route_mahiru.mahiru_good_end.t001

@wait 1200

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_good_end.t002

@wait 800

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_good_end.t003

@wait 600

> $route_mahiru.mahiru_good_end.t004

> $route_mahiru.mahiru_good_end.t005
> $route_mahiru.mahiru_good_end.t006

@wait 1000

@bgm night_melody.mp3
@wait 600

> $route_mahiru.mahiru_good_end.t007

> $route_mahiru.mahiru_good_end.t008
> $route_mahiru.mahiru_good_end.t009

> $route_mahiru.mahiru_good_end.t010

@wait 1500

> $route_mahiru.mahiru_good_end.t011
> $route_mahiru.mahiru_good_end.t012

mahiru: $route_mahiru.mahiru_good_end.t013

@wait 600

player: $route_mahiru.mahiru_good_end.t014

@wait 500

mahiru: $route_mahiru.mahiru_good_end.t015
mahiru: $route_mahiru.mahiru_good_end.t016

@wait 1000

mahiru: $route_mahiru.mahiru_good_end.t017
mahiru: $route_mahiru.mahiru_good_end.t018

@wait 800

player: $route_mahiru.mahiru_good_end.t019

@wait 600

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_good_end.t020

@wait 800

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_good_end.t021

@wait 600

mahiru: $route_mahiru.mahiru_good_end.t022

mahiru: $route_mahiru.mahiru_good_end.t023

@wait 1500

> *$route_mahiru.mahiru_good_end.t024*

@wait 1000

> $route_mahiru.mahiru_good_end.t025
> $route_mahiru.mahiru_good_end.t026
> $route_mahiru.mahiru_good_end.t027
> $route_mahiru.mahiru_good_end.t028

@wait 800

mahiru: $route_mahiru.mahiru_good_end.t029

player: $route_mahiru.mahiru_good_end.t030

mahiru: $route_mahiru.mahiru_good_end.t031

mahiru: $route_mahiru.mahiru_good_end.t032

@wait 1000

mahiru: $route_mahiru.mahiru_good_end.t033
mahiru: $route_mahiru.mahiru_good_end.t034

@wait 1200

> $route_mahiru.mahiru_good_end.t035
> $route_mahiru.mahiru_good_end.t036
> $route_mahiru.mahiru_good_end.t037

@wait 700

player: $route_mahiru.mahiru_good_end.t038

player: $route_mahiru.mahiru_good_end.t039
player: $route_mahiru.mahiru_good_end.t040
player: $route_mahiru.mahiru_good_end.t041

@wait 1000

mahiru: $route_mahiru.mahiru_good_end.t042

player: $route_mahiru.mahiru_good_end.t043

@wait 800

@expr mahiru_no_camera thinking

mahiru: $route_mahiru.mahiru_good_end.t044

@wait 600

mahiru: $route_mahiru.mahiru_good_end.t045
mahiru: $route_mahiru.mahiru_good_end.t046

@wait 1000

> $route_mahiru.mahiru_good_end.t047
> $route_mahiru.mahiru_good_end.t048

> $route_mahiru.mahiru_good_end.t049
> $route_mahiru.mahiru_good_end.t050

@wait 1200

@bgm stop
@wait 800

@jump mahiru_good_end_dawn


# mahiru_good_end_dawn

@scene rooftop_predawn fade
@bgm quiet_piano_distant.mp3
@se wind_rooftop.mp3
@wait 1200

> $route_mahiru.mahiru_good_end_dawn.t001

> $route_mahiru.mahiru_good_end_dawn.t002

> $route_mahiru.mahiru_good_end_dawn.t003
> $route_mahiru.mahiru_good_end_dawn.t004

@wait 1000

@show mahiru_no_camera center normal fade_in

> $route_mahiru.mahiru_good_end_dawn.t005
> $route_mahiru.mahiru_good_end_dawn.t006

> $route_mahiru.mahiru_good_end_dawn.t007
> $route_mahiru.mahiru_good_end_dawn.t008
> $route_mahiru.mahiru_good_end_dawn.t009
> $route_mahiru.mahiru_good_end_dawn.t010
> $route_mahiru.mahiru_good_end_dawn.t011

> $route_mahiru.mahiru_good_end_dawn.t012

@wait 1000

@se chime_soft.mp3
@wait 500

mahiru: $route_mahiru.mahiru_good_end_dawn.t013

@wait 600

player: $route_mahiru.mahiru_good_end_dawn.t014

mahiru: $route_mahiru.mahiru_good_end_dawn.t015

@wait 800

> $route_mahiru.mahiru_good_end_dawn.t016

> $route_mahiru.mahiru_good_end_dawn.t017

@wait 600

@expr mahiru_no_camera happy

mahiru: $route_mahiru.mahiru_good_end_dawn.t018

player: $route_mahiru.mahiru_good_end_dawn.t019

@wait 700

> $route_mahiru.mahiru_good_end_dawn.t020

@hide mahiru_no_camera fade_out
@wait 400

@scene rooftop_dawn fade
@bgm mahiru_dawn.mp3
@wait 1200

@still mahiru_dawn_two
@wait 1500
@still_hide

@show mahiru_no_camera center happy fade_in

> $route_mahiru.mahiru_good_end_dawn.t021

> $route_mahiru.mahiru_good_end_dawn.t022
> $route_mahiru.mahiru_good_end_dawn.t023

> $route_mahiru.mahiru_good_end_dawn.t024
> $route_mahiru.mahiru_good_end_dawn.t025

> $route_mahiru.mahiru_good_end_dawn.t026
> $route_mahiru.mahiru_good_end_dawn.t027

@wait 1000

mahiru: $route_mahiru.mahiru_good_end_dawn.t028

player: $route_mahiru.mahiru_good_end_dawn.t029

mahiru: $route_mahiru.mahiru_good_end_dawn.t030

@wait 600

> $route_mahiru.mahiru_good_end_dawn.t031

> $route_mahiru.mahiru_good_end_dawn.t032

@wait 1500

player: $route_mahiru.mahiru_good_end_dawn.t033

mahiru: $route_mahiru.mahiru_good_end_dawn.t034

mahiru: $route_mahiru.mahiru_good_end_dawn.t035

mahiru: $route_mahiru.mahiru_good_end_dawn.t036

@wait 1200

> $route_mahiru.mahiru_good_end_dawn.t037

> $route_mahiru.mahiru_good_end_dawn.t038

@wait 800

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_good_end_dawn.t039

@wait 600

mahiru: $route_mahiru.mahiru_good_end_dawn.t040

mahiru: $route_mahiru.mahiru_good_end_dawn.t041

@wait 1500

> $route_mahiru.mahiru_good_end_dawn.t042

> $route_mahiru.mahiru_good_end_dawn.t043
> $route_mahiru.mahiru_good_end_dawn.t044

> $route_mahiru.mahiru_good_end_dawn.t045
> $route_mahiru.mahiru_good_end_dawn.t046

@wait 1200

> $route_mahiru.mahiru_good_end_dawn.t047
> $route_mahiru.mahiru_good_end_dawn.t048
> $route_mahiru.mahiru_good_end_dawn.t049
> $route_mahiru.mahiru_good_end_dawn.t050

> $route_mahiru.mahiru_good_end_dawn.t051

@wait 900

@se chime_soft.mp3
@wait 800

> $route_mahiru.mahiru_good_end_dawn.t052

> $route_mahiru.mahiru_good_end_dawn.t053
> $route_mahiru.mahiru_good_end_dawn.t054
> $route_mahiru.mahiru_good_end_dawn.t055

> *$route_mahiru.mahiru_good_end_dawn.t056*

> $route_mahiru.mahiru_good_end_dawn.t057
> $route_mahiru.mahiru_good_end_dawn.t058
> $route_mahiru.mahiru_good_end_dawn.t059

@wait 800

> *$route_mahiru.mahiru_good_end_dawn.t060*

> $route_mahiru.mahiru_good_end_dawn.t061
> $route_mahiru.mahiru_good_end_dawn.t062
> $route_mahiru.mahiru_good_end_dawn.t063

> $route_mahiru.mahiru_good_end_dawn.t064
> $route_mahiru.mahiru_good_end_dawn.t065
> $route_mahiru.mahiru_good_end_dawn.t066

> $route_mahiru.mahiru_good_end_dawn.t067

@wait 700

> *$route_mahiru.mahiru_good_end_dawn.t068*

> $route_mahiru.mahiru_good_end_dawn.t069
> $route_mahiru.mahiru_good_end_dawn.t070
> $route_mahiru.mahiru_good_end_dawn.t071
> $route_mahiru.mahiru_good_end_dawn.t072

> $route_mahiru.mahiru_good_end_dawn.t073
> $route_mahiru.mahiru_good_end_dawn.t074
> $route_mahiru.mahiru_good_end_dawn.t075
> $route_mahiru.mahiru_good_end_dawn.t076

> $route_mahiru.mahiru_good_end_dawn.t077

@wait 900

> *$route_mahiru.mahiru_good_end_dawn.t078*

@wait 1500

@expr mahiru_no_camera happy

mahiru: $route_mahiru.mahiru_good_end_dawn.t079

player: $route_mahiru.mahiru_good_end_dawn.t080

mahiru: $route_mahiru.mahiru_good_end_dawn.t081

@wait 800

> $route_mahiru.mahiru_good_end_dawn.t082
> $route_mahiru.mahiru_good_end_dawn.t083
> $route_mahiru.mahiru_good_end_dawn.t084

player: $route_mahiru.mahiru_good_end_dawn.t085

mahiru: $route_mahiru.mahiru_good_end_dawn.t086

@wait 700

player: $route_mahiru.mahiru_good_end_dawn.t087

mahiru: $route_mahiru.mahiru_good_end_dawn.t088
mahiru: $route_mahiru.mahiru_good_end_dawn.t089
mahiru: $route_mahiru.mahiru_good_end_dawn.t090

@wait 1000

mahiru: $route_mahiru.mahiru_good_end_dawn.t091

@wait 800

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_good_end_dawn.t092
mahiru: $route_mahiru.mahiru_good_end_dawn.t093

@wait 1000

> $route_mahiru.mahiru_good_end_dawn.t094
> $route_mahiru.mahiru_good_end_dawn.t095

> $route_mahiru.mahiru_good_end_dawn.t096

> $route_mahiru.mahiru_good_end_dawn.t097
> $route_mahiru.mahiru_good_end_dawn.t098

@wait 800

@wait 600

mahiru: $route_mahiru.mahiru_good_end_dawn.t099

player: $route_mahiru.mahiru_good_end_dawn.t100

mahiru: $route_mahiru.mahiru_good_end_dawn.t101

@wait 800

> $route_mahiru.mahiru_good_end_dawn.t102
> $route_mahiru.mahiru_good_end_dawn.t103

@wait 800

> $route_mahiru.mahiru_good_end_dawn.t104
> $route_mahiru.mahiru_good_end_dawn.t105

@wait 600

mahiru: $route_mahiru.mahiru_good_end_dawn.t106

player: $route_mahiru.mahiru_good_end_dawn.t107

mahiru: $route_mahiru.mahiru_good_end_dawn.t108

@wait 600

> $route_mahiru.mahiru_good_end_dawn.t109
> $route_mahiru.mahiru_good_end_dawn.t110

> $route_mahiru.mahiru_good_end_dawn.t111
> $route_mahiru.mahiru_good_end_dawn.t112
> $route_mahiru.mahiru_good_end_dawn.t113

@wait 800

mahiru: $route_mahiru.mahiru_good_end_dawn.t114
mahiru: $route_mahiru.mahiru_good_end_dawn.t115

@wait 600

player: $route_mahiru.mahiru_good_end_dawn.t116

mahiru: $route_mahiru.mahiru_good_end_dawn.t117

@wait 800

> $route_mahiru.mahiru_good_end_dawn.t118

@wait 500

mahiru: $route_mahiru.mahiru_good_end_dawn.t119
mahiru: $route_mahiru.mahiru_good_end_dawn.t120

@wait 700

> $route_mahiru.mahiru_good_end_dawn.t121
> $route_mahiru.mahiru_good_end_dawn.t122

> $route_mahiru.mahiru_good_end_dawn.t123
> $route_mahiru.mahiru_good_end_dawn.t124

@wait 1000

> $route_mahiru.mahiru_good_end_dawn.t125
> $route_mahiru.mahiru_good_end_dawn.t126

@wait 1200

> $route_mahiru.mahiru_good_end_dawn.t127
> $route_mahiru.mahiru_good_end_dawn.t128

@wait 1000

> $route_mahiru.mahiru_good_end_dawn.t129

@wait 1200

> $route_mahiru.mahiru_good_end_dawn.t130
> $route_mahiru.mahiru_good_end_dawn.t131
> $route_mahiru.mahiru_good_end_dawn.t132

@wait 1500

@expr mahiru_no_camera happy

mahiru: $route_mahiru.mahiru_good_end_dawn.t133

player: $route_mahiru.mahiru_good_end_dawn.t134

@wait 1200

> $route_mahiru.mahiru_good_end_dawn.t135
> $route_mahiru.mahiru_good_end_dawn.t136

> $route_mahiru.mahiru_good_end_dawn.t137
> $route_mahiru.mahiru_good_end_dawn.t138

@wait 1200

> $route_mahiru.mahiru_good_end_dawn.t139
> $route_mahiru.mahiru_good_end_dawn.t140

@wait 1500

@hide mahiru_no_camera fade_out
@wait 500

@bgm stop
@wait 800

@jump mahiru_good_end_school


// ===================================================================
//  Good End 後日談「命日の朝に学校へ行く」
// ===================================================================

# mahiru_good_end_school

@scene classroom fade
@bgm daily_life.mp3
@wait 1200

> $route_mahiru.mahiru_good_end_school.t001

> $route_mahiru.mahiru_good_end_school.t002

@wait 800

> $route_mahiru.mahiru_good_end_school.t003
> $route_mahiru.mahiru_good_end_school.t004

@wait 1000

@show sakura left happy fade_in
@show mahiru center normal fade_in

@wait 600

sakura: $route_mahiru.mahiru_good_end_school.t005

mahiru: $route_mahiru.mahiru_good_end_school.t006

@wait 600

> $route_mahiru.mahiru_good_end_school.t007
> $route_mahiru.mahiru_good_end_school.t008

sakura: $route_mahiru.mahiru_good_end_school.t009
sakura: $route_mahiru.mahiru_good_end_school.t010

mahiru: $route_mahiru.mahiru_good_end_school.t011

sakura: $route_mahiru.mahiru_good_end_school.t012

mahiru: $route_mahiru.mahiru_good_end_school.t013

@wait 600

@expr sakura surprised

sakura: $route_mahiru.mahiru_good_end_school.t014

mahiru: $route_mahiru.mahiru_good_end_school.t015

@wait 700

> $route_mahiru.mahiru_good_end_school.t016
> $route_mahiru.mahiru_good_end_school.t017

@expr sakura happy

sakura: $route_mahiru.mahiru_good_end_school.t018
sakura: $route_mahiru.mahiru_good_end_school.t019

@wait 800

> $route_mahiru.mahiru_good_end_school.t020
> $route_mahiru.mahiru_good_end_school.t021

@wait 800

@expr mahiru normal

mahiru: $route_mahiru.mahiru_good_end_school.t022

sakura: $route_mahiru.mahiru_good_end_school.t023

@wait 500

> $route_mahiru.mahiru_good_end_school.t024

mahiru: $route_mahiru.mahiru_good_end_school.t025
mahiru: $route_mahiru.mahiru_good_end_school.t026

@wait 700

@expr sakura surprised

sakura: $route_mahiru.mahiru_good_end_school.t027

@wait 600

> $route_mahiru.mahiru_good_end_school.t028
> $route_mahiru.mahiru_good_end_school.t029

@wait 700

@expr sakura happy

sakura: $route_mahiru.mahiru_good_end_school.t030
sakura: $route_mahiru.mahiru_good_end_school.t031

mahiru: $route_mahiru.mahiru_good_end_school.t032
mahiru: $route_mahiru.mahiru_good_end_school.t033

sakura: $route_mahiru.mahiru_good_end_school.t034

@wait 600

> $route_mahiru.mahiru_good_end_school.t035

sakura: $route_mahiru.mahiru_good_end_school.t036
sakura: $route_mahiru.mahiru_good_end_school.t037

@wait 800

> $route_mahiru.mahiru_good_end_school.t038
> $route_mahiru.mahiru_good_end_school.t039

@wait 800

@hide sakura fade_out
@wait 500

> $route_mahiru.mahiru_good_end_school.t040
> $route_mahiru.mahiru_good_end_school.t041
> $route_mahiru.mahiru_good_end_school.t042

@show kotoha left normal fade_in
@wait 600

> $route_mahiru.mahiru_good_end_school.t043
> $route_mahiru.mahiru_good_end_school.t044

kotoha: $route_mahiru.mahiru_good_end_school.t045

kotoha: $route_mahiru.mahiru_good_end_school.t046

@wait 1000

mahiru: $route_mahiru.mahiru_good_end_school.t047

@wait 500

@expr kotoha normal

> $route_mahiru.mahiru_good_end_school.t048
> $route_mahiru.mahiru_good_end_school.t049

kotoha: $route_mahiru.mahiru_good_end_school.t050

@wait 800

@hide kotoha fade_out
@hide mahiru fade_out
@wait 500

@scene school_gate_autumn_evening fade
@bgm mahiru_theme.mp3
@wait 1000

> $route_mahiru.mahiru_good_end_school.t051

@show mahiru center normal fade_in

@wait 600

mahiru: $route_mahiru.mahiru_good_end_school.t052

@wait 600

player: $route_mahiru.mahiru_good_end_school.t053

@wait 500

mahiru: $route_mahiru.mahiru_good_end_school.t054

@wait 1000

> $route_mahiru.mahiru_good_end_school.t055
> $route_mahiru.mahiru_good_end_school.t056
> $route_mahiru.mahiru_good_end_school.t057

@wait 700

player: $route_mahiru.mahiru_good_end_school.t058

@wait 600

@expr mahiru normal

mahiru: $route_mahiru.mahiru_good_end_school.t059
mahiru: $route_mahiru.mahiru_good_end_school.t060

@wait 1000

> $route_mahiru.mahiru_good_end_school.t061
> $route_mahiru.mahiru_good_end_school.t062

@wait 600

@expr mahiru happy

mahiru: $route_mahiru.mahiru_good_end_school.t063
mahiru: $route_mahiru.mahiru_good_end_school.t064

@wait 1200

> $route_mahiru.mahiru_good_end_school.t065
> $route_mahiru.mahiru_good_end_school.t066

@wait 800

> $route_mahiru.mahiru_good_end_school.t067
> $route_mahiru.mahiru_good_end_school.t068
> $route_mahiru.mahiru_good_end_school.t069
> $route_mahiru.mahiru_good_end_school.t070

> $route_mahiru.mahiru_good_end_school.t071
> $route_mahiru.mahiru_good_end_school.t072

@wait 1200

@hide mahiru fade_out
@wait 600

@still mahiru_rooftop_friends_photo
@ending_intro 理由のない明日へ.mp3 mahiru_good_end 14000

@scene commute_road_autumn_evening fade
@bgm epilogue_sunset_for_each.mp3

> $route_mahiru.mahiru_good_end_school.t073
> $route_mahiru.mahiru_good_end_school.t074

@show mahiru_no_camera center normal fade_in

> $route_mahiru.mahiru_good_end_school.t075
> $route_mahiru.mahiru_good_end_school.t076

@wait 1000

player: $route_mahiru.mahiru_good_end_school.t077

mahiru: $route_mahiru.mahiru_good_end_school.t078

player: $route_mahiru.mahiru_good_end_school.t079

@wait 800

@expr mahiru_no_camera thinking

> $route_mahiru.mahiru_good_end_school.t080

@wait 800

mahiru: $route_mahiru.mahiru_good_end_school.t081

@wait 600

mahiru: $route_mahiru.mahiru_good_end_school.t082

@wait 800

mahiru: $route_mahiru.mahiru_good_end_school.t083

player: $route_mahiru.mahiru_good_end_school.t084

@wait 600

@expr mahiru_no_camera happy

> $route_mahiru.mahiru_good_end_school.t085

mahiru: $route_mahiru.mahiru_good_end_school.t086

mahiru: $route_mahiru.mahiru_good_end_school.t087

@wait 800

> $route_mahiru.mahiru_good_end_school.t088

@wait 600

mahiru: $route_mahiru.mahiru_good_end_school.t089

player: $route_mahiru.mahiru_good_end_school.t090

@wait 800

mahiru: $route_mahiru.mahiru_good_end_school.t091

@wait 1000

@expr mahiru_no_camera thinking

> $route_mahiru.mahiru_good_end_school.t092
> $route_mahiru.mahiru_good_end_school.t093

@wait 800

mahiru: $route_mahiru.mahiru_good_end_school.t094

player: $route_mahiru.mahiru_good_end_school.t095

@wait 1000

> $route_mahiru.mahiru_good_end_school.t096
> $route_mahiru.mahiru_good_end_school.t097

@expr mahiru_no_camera normal

@wait 800

mahiru: $route_mahiru.mahiru_good_end_school.t098

@wait 400

mahiru: $route_mahiru.mahiru_good_end_school.t099

@wait 400

mahiru: $route_mahiru.mahiru_good_end_school.t100

@wait 2500

@hide mahiru_no_camera fade_out
@wait 500

@still mahiru_epilogue fade_in
@click_wait
@end "$route_mahiru.mahiru_good_end_school.end_title"


// ===================================================================
//  Bad End「星は落ちていない。まだ、空にある」
// ===================================================================

# mahiru_bad_end

@scene school_exterior_night fade
@bgm bad_end_loop.mp3
@wait 1000

> $route_mahiru.mahiru_bad_end.t001

> $route_mahiru.mahiru_bad_end.t002

@wait 800

> $route_mahiru.mahiru_bad_end.t003

@wait 600

> $route_mahiru.mahiru_bad_end.t004

@wait 800

> *$route_mahiru.mahiru_bad_end.t005*

@wait 600

> $route_mahiru.mahiru_bad_end.t006
> $route_mahiru.mahiru_bad_end.t007
> $route_mahiru.mahiru_bad_end.t008

> $route_mahiru.mahiru_bad_end.t009
> $route_mahiru.mahiru_bad_end.t010
> $route_mahiru.mahiru_bad_end.t011
> $route_mahiru.mahiru_bad_end.t012

@wait 800

> $route_mahiru.mahiru_bad_end.t013
> $route_mahiru.mahiru_bad_end.t014
> $route_mahiru.mahiru_bad_end.t015
> $route_mahiru.mahiru_bad_end.t016

@wait 600

> $route_mahiru.mahiru_bad_end.t017
> $route_mahiru.mahiru_bad_end.t018
> $route_mahiru.mahiru_bad_end.t019

> $route_mahiru.mahiru_bad_end.t020
> $route_mahiru.mahiru_bad_end.t021
> $route_mahiru.mahiru_bad_end.t022

@wait 1000

> *$route_mahiru.mahiru_bad_end.t023*

@wait 600

> $route_mahiru.mahiru_bad_end.t024

> $route_mahiru.mahiru_bad_end.t025

> $route_mahiru.mahiru_bad_end.t026
> $route_mahiru.mahiru_bad_end.t027

@wait 1500

> *$route_mahiru.mahiru_bad_end.t028*

@wait 1200

> $route_mahiru.mahiru_bad_end.t029
> $route_mahiru.mahiru_bad_end.t030

> $route_mahiru.mahiru_bad_end.t031
> $route_mahiru.mahiru_bad_end.t032

@wait 1200

> $route_mahiru.mahiru_bad_end.t033

> $route_mahiru.mahiru_bad_end.t034

@show mahiru_no_camera center normal fade_in

@wait 600

@expr mahiru_no_camera surprised

mahiru: $route_mahiru.mahiru_bad_end.t035

@wait 800

> $route_mahiru.mahiru_bad_end.t036

> $route_mahiru.mahiru_bad_end.t037
> $route_mahiru.mahiru_bad_end.t038

@wait 700

mahiru: $route_mahiru.mahiru_bad_end.t039

@wait 1200

> $route_mahiru.mahiru_bad_end.t040

> $route_mahiru.mahiru_bad_end.t041

> $route_mahiru.mahiru_bad_end.t042

> $route_mahiru.mahiru_bad_end.t043
> $route_mahiru.mahiru_bad_end.t044

@wait 1000

> *$route_mahiru.mahiru_bad_end.t045*

> $route_mahiru.mahiru_bad_end.t046
> $route_mahiru.mahiru_bad_end.t047
> $route_mahiru.mahiru_bad_end.t048

> $route_mahiru.mahiru_bad_end.t049
> $route_mahiru.mahiru_bad_end.t050
> $route_mahiru.mahiru_bad_end.t051
> $route_mahiru.mahiru_bad_end.t052

> *$route_mahiru.mahiru_bad_end.t053*

@wait 1500

@expr mahiru_no_camera normal

mahiru: $route_mahiru.mahiru_bad_end.t054

@wait 800

mahiru: $route_mahiru.mahiru_bad_end.t055

player: $route_mahiru.mahiru_bad_end.t056

mahiru: $route_mahiru.mahiru_bad_end.t057

@wait 1000

> $route_mahiru.mahiru_bad_end.t058

> $route_mahiru.mahiru_bad_end.t059
> $route_mahiru.mahiru_bad_end.t060
> $route_mahiru.mahiru_bad_end.t061

> $route_mahiru.mahiru_bad_end.t062
> $route_mahiru.mahiru_bad_end.t063

@wait 800

@hide mahiru_no_camera fade_out
@wait 600

@still bad_end_empty_classroom
@wait 1500
@still_hide

@wait 800

> $route_mahiru.mahiru_bad_end.t064

@wait 1000

> *$route_mahiru.mahiru_bad_end.t065*
> *$route_mahiru.mahiru_bad_end.t066*

@wait 800

> *$route_mahiru.mahiru_bad_end.t067*
> *$route_mahiru.mahiru_bad_end.t068*

> *$route_mahiru.mahiru_bad_end.t069*

@wait 1200

> $route_mahiru.mahiru_bad_end.t070
> $route_mahiru.mahiru_bad_end.t071

> $route_mahiru.mahiru_bad_end.t072
> $route_mahiru.mahiru_bad_end.t073
> $route_mahiru.mahiru_bad_end.t074

> $route_mahiru.mahiru_bad_end.t075
> $route_mahiru.mahiru_bad_end.t076

> $route_mahiru.mahiru_bad_end.t077

@wait 1000

> $route_mahiru.mahiru_bad_end.t078

> $route_mahiru.mahiru_bad_end.t079

> $route_mahiru.mahiru_bad_end.t080

> $route_mahiru.mahiru_bad_end.t081

@wait 800

> $route_mahiru.mahiru_bad_end.t082
> $route_mahiru.mahiru_bad_end.t083

> $route_mahiru.mahiru_bad_end.t084
> $route_mahiru.mahiru_bad_end.t085
> $route_mahiru.mahiru_bad_end.t086

> $route_mahiru.mahiru_bad_end.t087
> $route_mahiru.mahiru_bad_end.t088

@wait 1200

> *$route_mahiru.mahiru_bad_end.t089*

@wait 1000

> $route_mahiru.mahiru_bad_end.t090

@wait 800

@bgm stop
@wait 300

@credits bad_end_loop.mp3
@end "$route_mahiru.mahiru_bad_end.end_title"
