use_bpm 150

use_synth :tb303



live_loop :hard_kick do

  sample :bd_haus

  sleep 0.5

end




live_loop :industrial_hat do

  sample :drum_cymbal_closed

  sleep 0.25

end




live_loop :techno_bass do

  use_synth :tb303

  play :e2

  sleep 0.5

end




with_fx :reverb do

  play_pattern_timed [

  :c4,:e4,:g4,:c5

  ],

  [0.25]

end


