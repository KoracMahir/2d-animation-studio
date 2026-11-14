# Scene 69: Thirteen Trick Shots

> A stadium-anthem music video for Housam's thirteenth birthday, cut to **"Champion Boy"**. Under the floodlights, Housam scores **thirteen trick goals**, one on every shouted number, past Keeper Fester, the Safadi twins, Robo-Safadi, Dragon and King Neptune. Goal 13 is a backflip bicycle kick that rides a golden **Fibonacci spiral** (1, 1, 2, 3, 5, 8, 13). **SURPRISE!** The net turns into a HAPPY 13th HOUSAM! banner, his #10 flips to **#13**, the cast storms the pitch and lifts him, and Dragon flies in a cake with 13 candles. Fireworks spell **TEENAGER**. Then Sarah drops in: *"Welcome to the club."* *"Yeah bro… I mean sis."* *"Whatever."* In the last shot a majestic handlebar moustache pops onto Housam's face: **HAPPY BIRTHDAY HOUSAM!**

| | |
|---|---|
| **Length** | 192.26 s · 24 fps · 125 bpm, first downbeat 0.095 s, bars of 1.92 s (`TT.BAR(n)` in `kit.js`) |
| **Cast** | [Housam](../../../characters/housam/README.md) (the star) · [Jester Fester](../../../characters/jester_fester/README.md) · [Professor Safadi](../../../characters/safadi/README.md) · [Doctor Sami](../../../characters/sami/README.md) · [Robo-Safadi](../../../characters/robo_safadi/README.md) · [Dragon](../../../characters/dragon/README.md) · [King Neptune](../../../characters/neptune/README.md) · [Princess Pearl](../../../characters/princess_pearl/README.md) · [Danny](../../../characters/danny/README.md) · [Jenna](../../../characters/jenna/README.md) · [Alma](../../../characters/alma/README.md) · [Clawd](../../../characters/clawd/README.md) · [Sarah](../../../characters/sarah/README.md) |
| **Set** | A floodlit night stadium, drawn side-on like a TV broadcast or a soccer video game (`pitch.js`). The rigs always face the lens, so every shot runs left to right toward the goal |
| **Look** | A trick-shot counter (0/13 → 13/13) always on screen, LED boards scrolling, a packed crowd that jumps on the beat, does the wave, and puts its hands up on cue. Each number slams in huge with GOAL!, then a **TRICK SHOT n / 13** celebration close-up. Karaoke along the bottom, as in scene 68 |
| **Audio** | `audio.mp3`: "Champion Boy", made with Gemini from [`lyria/PROMPT.txt`](lyria/PROMPT.txt) (the original is `lyria/Champion_Boy_original.mp3`, 180.8 s). I spliced six bars of the song's own instrumental (107.62–119.14) in at 176.74, so Sarah's scene plays over a full groove. The song's real ending follows at 188.2 |
| **Status** | Fully animated, 0–192.26 s. Render: `out/scene69_thirteen_trick_shots/scene69_thirteen_trick_shots.mp4` |

## What the song changed

Gemini wrote its own song again: 3:00 at 125 bpm, not 2:08 at 120.

- **The numbers moved.** Goals 1–3 come in verse 1, 4–9 in verse 2 (with seven and eight a beat apart), and 10–13 in the bridge. The world tour from the old plan became a single stadium, since the user asked for a mostly soccer video.
- **Two long instrumentals**: 48.6–64.4 is the solo run past every defender, and 105.7–138.3 is halftime (Safadi's tactics board, then Housam's freestyle with the crowd counting touches) plus the **mega defense** assembling a bar at a time.
- **The name is sung "Hussam"**, as the prompt asked, but every caption and title spells it Housam.
- **No vocal gap for Sarah**, hence the splice.

## Shot list

| Time | Lyric | Shot | Goal |
|---|---|---|---|
| 0–3.4 | (drums) | **lightsOn**: a dark stadium; the floodlights bang on one per beat; 13 TRICK SHOTS | |
| 3.4–9.6 | *Listen up team… thirteen shots… big thirteen for the champion today!* | **chant**: the whole cast at the pitch side, chanting; Clawd on the big screen | |
| 9.6–14.7 | (instrumental) | **tunnel**: Housam walks out through smoke, pyro on the beat, flashbulbs; HOUSAM #10 | |
| 14.7–20.4 | *Hussam is ready… ten feet tall…* | **walkout**: he goes TEN FEET TALL for a beat; "Keeper Fester is HERE!"; the ball comes in | |
| 20.4–24.73 | *…shot number ONE!* (23.78) | **shot1**: keepie-uppie volley; Fester dives the wrong way | 1 |
| 24.73–28.31 | *We pass it to the left… TWO!* (27.36) | **shot2**: one-two with Danny, low through Fester's legs | 2 |
| 28.31–32.6 | *Breaking through the defense… THREE!* (31.42) | **shot3**: OLÉ past Safadi, NUTMEG on Sami, bent into the top corner | 3 |
| 32.6–48.6 | Chorus 1 | **chorus1**: knee slide · the cast piles in · a crown (STAR!) · BRING THE HOUSE DOWN · HANDS UP · the wave · the big screen shows the score · OWN THE NIGHT fireworks | |
| 48.6–64.4 | (instrumental) | **theRun**: the length of the pitch: hops Sami's slide, rainbow-flicks Safadi, spins past Robo, ducks Dragon's wing; the twins BONK into each other | |
| 64.4–74.0 | *No time to rest… lacing up my boots… FOUR!* (71.78) | **shot4**: LACES TIED!, a top-shelf rocket past Robo-Safadi | 4 |
| 74.0–78.03 | *Flying through the air… FIVE!* (77.08) | **shot5**: Jenna's cross, the flying header past Fester | 5 |
| 78.03–81.83 | *…upper-ninety stunner: SIX!* (80.88) | **shot6**: a free kick over the wall of Danny, Alma and Jenna past Sami | 6 |
| 81.83–85.67 | *Number SEVEN's good and here is EIGHT!* (83.52, 84.72) | **shot78**: Clawd zaps the ball ×2; two goals a beat apart past Safadi | 7, 8 |
| 85.67–89.3 | *Rolling past the keeper… NINE!* (88.34) | **shot9**: a slow roller; Robo-Safadi SCANNING…, through his legs, ERROR! | 9 |
| 89.3–105.7 | Chorus 2 | **chorus2**: chorus 1 again, plus Neptune's fountains, Pearl, Dragon flying a 13 flag | |
| 105.7–121.6 | (halftime) | **halftime**: "Allow me to EXPLAIN!" "Nobody scores THIRTEEN!"; then the freestyle, a touch counted per beat | |
| 121.6–138.2 | (the build) | **megaDefense**: MEGA KEEPER · DRAGON BAR · WATER WALL · TWIN TOWERS; then the standoff, 1 VS 5, 4 TO GO | |
| 138.2–146.0 | *Are you ready for the grand finale?… simply impeccable… let's go, go, go!* | **grandFinale**: Clawd on the big screen; Safadi's hologram trajectory; GO! GO! GO! | |
| 146.0–149.29 | *…shot number TEN!* (148.34) | **shot10**: SPLASH through Neptune's water wall | 10 |
| 149.29–151.87 | *Double the power with shot ELEVEN!* (150.92) | **shot11**: up TO HEAVEN and down over Dragon on the crossbar | 11 |
| 151.87–155.77 | *TWELVE hits the crossbar and bounces right in!* | **shot12**: CLANG off the bar, BONK off MEGA Robo's head, in (154.82) | 12 |
| 155.77–160.5 | *…here is the big one: shot THIRTEEN!* | **shot13**: the golden squares 1, 1, 2, 3, 5, 8, 13 and the spiral; the backflip bicycle kick (158.74); the ball rides the spiral in (160.25) | **13** |
| 160.5–169.7 | *Thirteen shots, we have hit every net!… standing so tall…* | **surprise**: SURPRISE! banner · #10 → #13 close-up · the cast storms the pitch and lifts him · Dragon's cake, MAKE A WISH!, WHOOOSH | |
| 169.7–176.7 | *Let the big celebration begin!…* | **teenager**: TEENAGER in fireworks over Housam; the whole cast under a sky of fireworks and a firework 13 | |
| 176.7–188.2 | (spliced groove) | **sarah**: Sarah drops from the sky. "Welcome to the club." · "Yeah bro…" "I mean… sis." · "Whatever." (back to her phone) · HA HA HA! | |
| 188.2–192.26 | (the song's last hit) | **finalShot**: the camera pushes in; the moustache pops on (188.7), majestic, curls and all; HAPPY BIRTHDAY HOUSAM!; iris | |

## The moustache

Housam gets his moustache only in the last shot. `TT.MO` (188.7 s) pops on a full handlebar and its majestic spurt, with a sparkle. Every shot draws Housam through `TT.hou` / `PITCH.hou`, so moving `MO` moves the moment everywhere. A first cut grew it a level per goal; the user preferred it at the end.

## Files

| File | What |
|---|---|
| `lyrics.js` | the karaoke: line times (whole words pinned where they're shouted), `ttKaraoke(t)` |
| `kit.js` | `TT`: the beat grid, the goal times, the moustache (`MO`), the counter, GOAL slams, fireworks (and firework words), confetti, the cake |
| `pitch.js` | `PITCH`: the side-on stadium (sky and floodlights, the crowd, LED boards, the pitch, the goal split so keepers stand inside it) |
| `goals.js` | `GOALS_KIT.goalShot(spec)`: the template every goal uses (trick, strike, keeper, flight, net, slam), and the TRICK SHOT n / 13 close-up |
| `opening.js` · `match.js` · `finale.js` | the shots, 0–32.6 · 32.6–105.7 · 105.7–192.26 |
| `scene.js` | the shot list (`CARDS`) swapping in the real shots by name, with the karaoke on top |
| `lyria/PROMPT.txt` | the song brief given to Gemini |

## Timing

Tempo from an onset-strength grid search (125.00 bpm, phase 0.095). Word times from Whisper medium.en word timestamps, with 4-second windows over the gaps; misheard words follow Gemini's lyric sheet. Windows over 48.6–64.4 and 105.7–138.3 only hallucinated "thanks for watching", which confirmed they're instrumental.
