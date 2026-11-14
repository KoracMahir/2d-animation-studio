# Scene 68: It's a Secret!

> A festive, full-throttle music video for Danny's seventh birthday. **3… 2… 1… LET'S GO, DANNY!** While Danny dribbles on the soccer field, the whole cast races behind his back to set up a secret party: cake on Robo-Safadi's hover jets, a banner blasted up a tree by Neptune, Safadi bonked mid-*"Allow me to EXPLAIN—"*. Every time Danny turns around, everyone freezes. *"Hey! What's going on?"* *"NOTHING!"* Then Clawd warps him into **Craft Blocks, Level 7**: a side-scrolling sprint, a creeper chase, a seven-block tower built on the beat, and a boss battle that ends in a bicycle-kick **GOAL!** **3… 2… 1… HAPPY BIRTHDAY!** The tower opens into a giant cake, the cast bursts out, and it turns into a dance battle full of fireworks. To finish: *"LOOK BEHIND YOU!"* That line sends the real Danny to his real surprise.

| | |
|---|---|
| **Length** | 156.8 s · 24 fps · 120.45 bpm, first downbeat at 0.365 s, bars of 1.993 s (`BAR(n)` in `scene.js`) |
| **Cast** | [Danny](../../../characters/danny/README.md) (the star) · [Housam](../../../characters/housam/README.md) · [Alma](../../../characters/alma/README.md) · [Jenna](../../../characters/jenna/README.md) · [Professor Safadi](../../../characters/safadi/README.md) · [Doctor Sami](../../../characters/sami/README.md) · [Clawd](../../../characters/clawd/README.md) · [Jester Fester](../../../characters/jester_fester/README.md) · [Robo-Safadi](../../../characters/robo_safadi/README.md) · [King Neptune](../../../characters/neptune/README.md) · [Princess Pearl](../../../characters/princess_pearl/README.md) · [Dragon](../../../characters/dragon/README.md) |
| **Sets** | Open: the [county soccer field](../../../locations/soccer_field/README.md). Game world: *Craft Blocks* from [scene 36](../../screen_time/scene36_dream_mode/README.md) (`uses: ['scene36_dream_mode']`) |
| **Look** | Like scenes 20b and 36: karaoke along the bottom, title cards slammed on the beat, a camera that never sits still (whip pans, punch-ins on hits, shake on every boom). Palette: bright and saturated all the way through. Sunny field green → neon CRT warp → *Craft Blocks* sky blue and grass → boss-fight red → party neon, confetti and fireworks |
| **Audio** | `audio.mp3`, **"Surprise on Level Seven"**, made with Gemini from [`lyria/PROMPT.txt`](lyria/PROMPT.txt). The music ends at about 153.8 s. The karaoke is in `lyrics.js` |
| **Status** | **Fully animated, 0–156.8 s.** First full render: `out/scene68_its_a_secret/scene68_its_a_secret.mp4`. Series *Happy Birthday, Danny* (`scenes/birthday/`), registered but left out of `movieSeries`. |

## Energy rules

- **No lulls in the picture.** Something explodes, flies or gets kicked every bar, and each beat gets motion. Where the song dips (28–32, 82, 88–92, 110), the picture uses the dip as a held breath before a bigger hit, never as a sad beat.
- **The surprise comes from comedy, not sadness.** Danny never thinks he's been forgotten; he's just one turn too slow to catch the party being set up.

## What the song changed

Gemini didn't follow the prompt everywhere, so the story follows the song:

- **It's longer: 156.8 s, not 120.** Everything up to *"Kick it, Danny!"* (0–68 s) follows the prompt almost exactly.
- **A 44-second instrumental (68–112 s).** It was meant to be a short GOAL and a countdown. Instead it's a full boss battle in six beats: dodge, climb (Clawd's SUPER BOOTS power-up), the ramp launch, a slow-motion windup in the dip at 82 s, then the **bicycle kick GOAL on the loudest bars of the song (84–88 s)**. After that, Sami's *"+1 HEALTH"* gets shushed, a victory lap plants seven candles on the tower, and the tower rumbles toward the countdown.
- **No shouted "SURPRISE!"** The countdown (112.4 / 113.6 / 114.7) runs straight into ***HAPPY BIRTHDAY! HEY!*** at 115.6 s, so the tower blasts open on *HAPPY*.
- **No "One more secret…"** The song ends on ***LOOK BEHIND YOU!*** (151.5–153.3), which is the line that matters.
- **The dance battle is longer** (131.9–151.4): the *Dan-ny!* chant, a dip for Danny's cube move, *Everybody JUMP!*, then an 8-bar solo for the specials and Fester's bonk.

## Open placeholders

- **THE REAL SURPRISE.** *"LOOK BEHIND YOU!"* (151.5 s) points the real Danny to it, so whatever it is should literally be behind him when he watches.
- **Who's in the room.** If he watches at a party, the 3-2-1 at 112.4 s is the cue for the real people to get ready, and *HAPPY BIRTHDAY!* at 115.6 s is when they shout.

## Song map and shot list

| Time | Section | Lyric | Shot |
|---|---|---|---|
| 0–8.3 | Intro | *Three! Two! One!* (1.2 / 2.5 / 3.8) · *LET'S GO, DANNY!* (6.0) | **launch**: a birthday candle's fuse burns across the screen on the countdown. BOOM: the title explodes out, **DANNY · LEVEL 7**, then a whip pan to Danny dribbling onto the sunny soccer field |
| 8.3–16.3 | Verse 1 | *Hide the cake and grab the balloons! Danny's coming back real soon!* | **hideTheCake**: Danny dribbles toward the camera. Behind him the cast sprints across the field: Robo-Safadi hover-jets the cake past, Alma cartwheels with balloons, Dragon swoops off with presents. On every SHH! Danny half-turns and everyone freezes as statues |
| 16.3–24.0 | | *Quick, quick, quick… SHH ×4… the biggest party's going down!* · *"Hey! What's going on?"* (21.9) · *"NOTHING!"* (23.5) | **nearMiss**: Safadi steps up: *"Allow me to EXPLAIN—"* Fester's ball: BONK. Neptune's water blast shoots the banner up a tree. Danny spins around: the whole cast, hands behind backs, grinning: *"NOTHING!"* |
| 24.0–31.85 | Pre-chorus | *Player one: Danny! Loading level SEVEN!* (24.1–26.9) | **warp**: Clawd zooms out of Housam's laptop and fires a prompt beam; PLAYER 1 slams in; the loading bar fills. 28–32 is a thin riser: the neon CRT warp tunnel |
| 31.85–39.8 | Chorus 1 | *It's a secret! SHH! … Run it, jump it, block by block, don't you tell them yet!* | **run**: a side-scrolling sprint across floating *Craft Blocks* platforms, a jump every beat, candle-coins +1. On each SHH! the cast pops up from behind blocks and ducks back down |
| 39.8–48.2 | | *…The biggest, loudest, blockiest surprise you ever met!* | **chase**: little Broccreepers chase him; he kicks one away per beat, then rides out on Dragon's back |
| 48.2–64.1 | Verse 2 | *One block, two block… seven block, LEVEL SEVEN, Danny can't be stopped!* | **build**: a year-block slams down on each count (1 bottle, 2 ball, 3 crayon star, 4 Scratch cat, 5 pumpkin, 6 Rubik's cube, 7 a glowing **7**), with creepers volleyed off between counts. Gold blaze on *LEVEL SEVEN* (61.2) |
| 64.1–68.1 | Boss | *BOSS FIGHT!* (64.5) · *Kick it, Danny! Kick it, Danny!* | **boss**: a red flash. A giant Broccreeper with Robo-Safadi's LED eyes stomps in; every stomp shakes the camera |
| 68.1–72.1 | Boss (instrumental) | | **dodge**: the boss smashes; Danny dodges, slides and flips between falling blocks, a move per beat |
| 72.1–76.1 | | | **climb**: Danny scales the boss block by block; Clawd beams in **SUPER BOOTS!** |
| 76.1–80.1 | | | **powerUp**: boots glowing, he dribbles down the boss's arm like a ramp and launches |
| 80.1–84.1 | | (the dip at 82) | **windup**: mid-air slow motion: the ball hangs, the boss looks up, Danny's eyes narrow |
| 84.1–88.0 | | (the loudest bars) | **bicycle**: snap to speed: the bicycle kick. **GOAL!** BROCCOLI BOOM, screen shake, florets everywhere |
| 88.0–92.0 | | (dip) | **shush**: florets rain; Sami pops out of a block to munch one (+1 HEALTH) and Safadi yanks him back: SHH! |
| 92.0–100.0 | | | **victory**: LEVEL COMPLETE? A victory lap: Danny collects seven candles, one per beat, and plants them on the tower |
| 100.0–112.0 | | (winding down to 110) | **rumble**: dusk turns neon; the tower rumbles and glows brighter every bar; giggles behind the blocks |
| 112.0–115.6 | Countdown | *Three! Two! One!* | **countdown**: giant 3, 2, 1 slam down; the tower shakes; push in on Danny's face |
| 115.6–119.9 | The drop | ***HAPPY BIRTHDAY! HEY! HAPPY BIRTHDAY! HEY!*** | **surprise**: the seven blocks blast open into a seven-layer cake, candles igniting; the whole cast bursts out with confetti cannons; Jenna and Alma unroll **HAPPY BIRTHDAY DANNY!** |
| 119.9–127.9 | Chorus 2 | *Danny, it's your level seven, Danny, it's your day! …* | **cake**: everybody jumps on each HEY! The Safadi twins whip off the cloche: real cake, no broccoli. *"Today… is SUGAR DAY!"* |
| 127.9–131.9 | | *That was the secret all along, hip, hip, HOORAY!* (130.7) | **lift**: Housam and Dragon hoist Danny up; Pearl's paper crown; Neptune's rainbow fireworks on HOORAY |
| 131.9–135.9 | Dance battle | *Dan-ny! Dan-ny! Dan-ny! Dan-ny!* | **blockParty**: Alma's rainbow floor across the meadow; everybody dances |
| 135.9–139.8 | | (dip) | **dannyMove**: Danny tosses the cube, solves it on the catch, goal celebration |
| 139.8–143.8 | | *Everybody JUMP! JUMP! JUMP! JUMP!* | **jump**: the whole cast copies him, jumping on every beat |
| 143.8–147.8 | | (chiptune solo) | **specials**: each beat a special goes off like a firework: Explain-o-Beam, Healthy-doken, Robo's scanner, Neptune's water ring, Dragon's flame loop |
| 147.8–151.4 | | (solo) | **bonk**: Fester juggles birthday candles… BONK. *"…story of my life."* Danny laughs hardest |
| 151.4–156.8 | Finale | ***LOOK BEHIND YOU!*** (151.5–153.3) | **finale**: fireworks; the cast crowds the lens and points past it at the real Danny. A firework **7**, THE END |

## Files

| File | What |
|---|---|
| `lyrics.js` | the karaoke: word times for the whole song, and `secretKaraoke(t)` |
| `opening.js` | the field: `launch`, `hideTheCake`, `nearMiss`, `warp` (0–31.85 s), and the shared prop kit (`_kit`: cake, presents, balloons, banner, fireworks, confetti, big slam text) |
| `game.js` | the Craft Blocks level, side-on in scene 36's block world: `runChase` (31.85–48.19), `build` (48.19–64.13), `boss` (64.13–111.95, one continuous fight) |
| `party.js` | the surprise and the party (111.95–156.8), one continuous stage |
| `scene.js` | the shot list (`CARDS`, one per row of the table above) on the measured beat grid; each card name is swapped for its real shot from `SECRET_SHOTS`, with the karaoke on top. A name with no shot falls back to its storyboard card |
| `lyria/PROMPT.txt` | the song brief given to Gemini |

## What changed while animating

- **The cast hides behind block stacks** around the tower during the countdown, and bursts out when the tower blasts apart into the cake.
- **Dragon and Clawd fly the HAPPY BIRTHDAY DANNY banner** across the sky. Jenna and Alma dance instead.
- **Housam lifts Danny alone** (Dragon is busy with the banner), and Pearl's paper crown flies from her throne-side seat onto his head and stays there to the end.
- **The specials are named on screen** one per beat: Explain-o-Beam, Healthy-doken, scanner beam, water ring, Dragon loop, rainbow floor, Clawd sparks, all together.
- **Finale:** Danny steps to the front of the cake; LOOK / BEHIND / YOU! stack up in the sky over the cast; the firework 7 bursts top right; THE END and an iris.
- **Rig anchors are screen pixels** (they include any camera zoom or shake). Props drawn from them under a zoom (the crown in the finale, the SUPER BOOTS in the windup) are drawn with an identity transform.

## Timing

- **Beat grid.** The onset strength, folded over every tempo from 100 to 140 bpm, peaks at 120.45 bpm with the beat phase at 0.365 s (librosa's beat tracker agrees: 120.2). Sections start on bars: `BAR(n) = 0.365 + n · 1.993`.
- **Words.** Whisper (medium.en, faster-whisper) word timestamps over overlapping 4–8 s windows of the full mix, with misheard words corrected by ear-logic (*"shit"* → SHH!, *"All's fun"* → BOSS FIGHT!). On 68–112 s Whisper only hallucinates "thanks for watching", which confirms it's instrumental. The countdown at 112–115 s is approximate (the windows disagree by about 0.3 s); check it against the audio when that shot is animated.
- Fix a word or a time in `lyrics.js` and the karaoke follows.

## Production notes

- **Reuse first.** Danny's registered poses cover most of his beats: `dribble`, `surprised`, `ready`, `kick`, `block tower`, `builder`, `goal!`, `laugh`, `goofy`, plus the shared fighting poses for the boss battle and dance battle. *Craft Blocks*, the Broccreeper and the block party come from scene 36.
- **New art needed.** The candle-fuse title, the seven year-blocks, the side-scroller platforms and candle-coins, the giant Broccreeper boss, SUPER BOOTS, the cake that opens out of the tower, the banner, the crown and the finale firework 7.
- **Plan (13 days left).** Animate in five chunks: field heist (0–32), game run and build (32–64), the boss battle (64–112), surprise and party (112–151), finale and the real-surprise beat (151–157). Leave the last two days for review and render.
