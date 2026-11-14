# Scene 70: Nine Moves

> A dance-party music video for Alma's ninth birthday. On DJ Clawd's light-up stage, Alma teaches **nine dance moves**, one on every shouted number, each to a different friend. Every move re-skins the stage and lights a star on the **DANCE POWER** meter. **NINE!** is the Super Star: she rockets into a sky of fireworks that spell ALMA, lands in her own party, Dr. G and Dad roll in a cake with nine candles, **WHOOSH**, and even Sarah ends up dancing. Last shot: the group photo, a wink, **HAPPY BIRTHDAY ALMA!**

| | |
|---|---|
| **Length** | 131.7 s · 24 fps · 120.00 bpm, first downbeat 0.305 s, bars of 2 s (`N9.B(n)` in `kit.js`) |
| **Cast** | [Alma](../../../characters/alma/README.md) (the star) · [Danny](../../../characters/danny/README.md) · [Jester Fester](../../../characters/jester_fester/README.md) · [Jenna](../../../characters/jenna/README.md) · [Housam](../../../characters/housam/README.md) · [Robo-Safadi](../../../characters/robo_safadi/README.md) · [King Neptune](../../../characters/neptune/README.md) · [Princess Pearl](../../../characters/princess_pearl/README.md) · [Dragon](../../../characters/dragon/README.md) · [Professor Safadi](../../../characters/safadi/README.md) · [Doctor Sami](../../../characters/sami/README.md) · [Clawd](../../../characters/clawd/README.md) (the DJ) · [Dr. G](../../../characters/dr_g/README.md) · [Sarah](../../../characters/sarah/README.md) |
| **Set** | The Dance Dimension (`stage.js`): a light-up tile floor in true perspective under a painted party stage (LED wall, speaker stacks, lighting truss, DJ Clawd's booth). Fourteen themes: each move has its own sky, floor pattern and backdrop |
| **Look** | The nine-star DANCE POWER meter always on screen; each number slams in huge with the move's name; the friends who already know a move drop in behind to dance the new one, so the party grows. Karaoke along the bottom, as in scenes 68 and 69 |
| **Audio** | `audio.mp3`: "Nine Moves to the Birthday Sky", made with Gemini from [`lyria/PROMPT.txt`](lyria/PROMPT.txt) (133.2 s; the music ends at 130.3 s). The original is also kept in `lyria/` |
| **Status** | Fully animated and fitted to the song. Render: `out/scene70_nine_moves/scene70_nine_moves.mp4` |

## Timing: animated first, then fitted to the song

The animation was made before the song, on a planned 120 bpm grid, with every cut in `N9.CUT` and every shouted number in `N9.HIT` (kit.js). Gemini kept the tempo and the bar structure this time, so fitting it was small:

- **The whole song sits 0.305 s late** (`OFF`): everything moved with the grid.
- **Most numbers are shouted late**: ONE, FOUR and SEVEN half a beat, EIGHT a whole beat; TWO is half a beat early. Each teaching shot now ends one second after its number, so the cuts between them moved (`m2`, `m3`, `m5`, `m8`), and the build starts a second later.
- **The opening letters** come a beat early (A at 1.8 s), and NINE! lands at 5.65 s.
- **The final chorus is shorter than the brief**: no "Alma is nine! HEY!" lines. "Happy birthday, Alma!" is at 108.3, "Make a wish! HEY!" at 109.9, "Blow out the candles" at 111.9, then a slow "one… big… WHOOSH!" (the whoosh at 116.3). So the cake rolls in at 109.6, the close-up on Alma and the candles runs 111.3–117.3, and the firework 9 fills the quiet bars to 120.3.
- **"Everybody: NINE!"** became a single NINE! at 124.6, before Sarah's line.
- **The song sings "Hu-Sam"** (the prompt's spelling, to stop Gemini saying "House-man"); every caption spells it Housam.
- The music ends at 130.3; the iris closes over the tail by 131.7.

Tempo from an onset-strength grid search (120.00 bpm, phase 0.305, no drift). Word times from Whisper medium.en word timestamps, re-run over 4–5 s windows for the build and final chorus; the shouted numbers were then snapped to the half-beat nearest the vocal-band loudness peak.

## The nine moves

| # | Move | With | The stage becomes | Hit |
|---|---|---|---|---|
| 1 | The Bounce | Danny | blue sky and balloons | 15.8 |
| 2 | The Disco | Fester | a disco ball, magenta night | 18.8 |
| 3 | The Twirl | Jenna | teal, ribbons and a sparkle tornado | 23.3 |
| 4 | The Floss | Housam, ball balanced on his head | pennants over green | 47.8 |
| 5 | The Robot | Robo-Safadi (BEEP. BOOP. DANCE?), eyes turn to hearts | neon grid | 51.3 |
| 6 | The Wave | Neptune and Pearl | the sea; a wave crosses the screen | 55.3 |
| 7 | The Dragon | Dragon, who takes off | a red sunset and embers | 91.8 |
| 8 | The Professor | Safadi and Sami ("Allow me to EXPLAIN…" "No! DANCE!") | a chalkboard of ways to make 9 | 96.3 |
| 9 | The Super Star | everybody | gold, then fireworks | 104.3 |

`N9.groove(who, move, beat)` (kit.js) is one dance vocabulary for every rig: hands are placed by angle and reach from the shoulder, so the same move fits Alma's short arms and the twins' long ones. The dolphins, Dragon and Clawd bounce their own way.

## Shot list

| Time | Lyric | Shot |
|---|---|---|
| 0–8.3 | *A! L! M! A! Alma is… NINE! Nine moves. Let's go!* | **curtain**: a dark stage, a spotlight per beat, Alma's silhouette with her back turned; the letters slam in; on NINE! (5.65) she spins round and the lights come up |
| 8.3–12.3 | *Lights on the floor…* | **entrance**: she skips down the floor, bounces, twirls; the gang drops in along the back: ME! ME! |
| 12.3–24.3 | *…move number ONE! TWO! THREE!* | **m1 · m2 · m3** (cuts at 16.8 and 19.8): Alma slides in beside a friend and teaches the move; on the number the stage changes, the star flies to the meter |
| 24.3–40.3 | Chorus 1 | **chorus1**: a new angle every two bars: the V of dancers · Alma close, hearts · the floor from above · HANDS UP! from down low, confetti cannons |
| 40.3–44.3 | *Three moves down. Level up! Six to go!* | **dj**: DJ Clawd close-up, scratching; Housam jogs in with his ball |
| 44.3–56.3 | *…FOUR! FIVE! SIX!* | **m4 · m5 · m6** (cuts at 48.8 and 52.3) |
| 56.3–72.3 | Chorus 2 | **chorus2**: the line · Alma and Jenna twirl together · a circle dance round Alma from above · fountains, and Dragon flies a 9 flag past |
| 72.3–88.3 | *Go, Danny! Go, Jenna! Go, Housam! Go, Fester!* | **danceBreak**: the dance circle, a two-bar solo each: backflips · cartwheels · keepie-uppie · Fester juggles… BONK! (87.3) "…story of my life." |
| 88.3–97.3 | *…SEVEN! … Allow me to explain… No! Just DANCE! … EIGHT!* | **m7 · m8** (cut at 92.55) |
| 97.3–104.3 | *One more move… ONE! TWO! … EIGHT!* | **build**: 8 / 9, ONE MORE MOVE!; from 100.3 eight beats, eight moves and eight themes, counted aloud, while Alma crouches and charges up |
| 104.3–120.3 | *NINE! Super dance power! … Happy birthday, Alma! Make a wish! HEY! Blow out the candles: one… big… WHOOSH!* | **nine**: she rockets off the floor · the sky, nine stars orbiting, ALMA in fireworks (106.3) · she lands; the banner drops (108.3) · Dr. G and Dad roll in the cake, MAKE A WISH! (109.6) · the close-up: 9 CANDLES… ONE… BIG… WHOOSH! (116.3) · a firework 9 (117.3) |
| 120.3–128.3 | *Bounce! Disco! Twirl! Floss! Robot! Wave! Dragon! Shuffle! … NINE!* | **everybody**: the victory lap, a move a beat; then star jumps while Sarah texts: "I'm not dancing." She flosses. SHE IS DANCING! |
| 128.3–131.7 | *Happy birthday, ALMA!* | **finalPose**: the group photo flash on "ALMA!" (129.3), HAPPY BIRTHDAY ALMA!, a wink, iris out on Alma |

## Files

| File | What |
|---|---|
| `kit.js` | `N9`: the beat grid, **`CUT` and `HIT`**, the cast table and `groove`, slam text, fireworks (and firework words), confetti, balloons, the cake, the meter |
| `stage.js` | `N9S`: the Dance Dimension: `view` (camera), `back`, `floor`, `spot`, `cast`, the themes |
| `opening.js` | `N9_SHOTS`: curtain, entrance, the eight teaching shots (`moveShot(n)`), dj |
| `party.js` | chorus1, chorus2, danceBreak, build, nine, everybody, finalPose |
| `lyrics.js` | the karaoke: the sung words and their times, `n9Karaoke(t)` |
| `scene.js` | the shot order, with the meter and karaoke on top |
| `lyria/PROMPT.txt` | the song brief given to Gemini (it spells Housam "Hu-Sam" for pronunciation) |
