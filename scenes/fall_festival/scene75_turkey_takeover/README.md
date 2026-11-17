# Scene 75: Fall Festival 5 · Turkey Takeover

> The music-video finale of Fall Festival. The brothers daydream their way to redemption: Professor Safadi and Doctor Sami become bossy celebrity TV chefs hosting **TURKEY TAKEOVER**, a loud, glittering reality cooking show, and the whole gang is their kitchen brigade. "YES, CHEF!" The turkey turns out FROZEN ("Sorry, Chef!"), every guest pitches in with their powers, a kitchen rush, a countdown, **DING**: a perfect golden stuffed turkey. "It is… PERFECT." "Allow me to explain…" "NO! Just EAT!" Happy Thanksgiving!

| | |
|---|---|
| **Length** | 135.0 s · 24 fps · 130 bpm, first downbeat 0.175 s, bars of 1.846 s (`TT.B(n)` in `timing.js`) |
| **Cast** | [Professor Safadi](../../../characters/safadi/README.md) and [Doctor Sami](../../../characters/sami/README.md) (the chefs, in whites and toques) · [Housam](../../../characters/housam/README.md) · [Danny](../../../characters/danny/README.md) · [Alma](../../../characters/alma/README.md) · [Jenna](../../../characters/jenna/README.md) · [Jester Fester](../../../characters/jester_fester/README.md) · [King Neptune](../../../characters/neptune/README.md) · [Princess Pearl](../../../characters/princess_pearl/README.md) · [Dragon](../../../characters/dragon/README.md) · [Dr. G](../../../characters/dr_g/README.md) · [Roudaynah](../../../characters/roudaynah/README.md) · the studio audience ([student](../../../characters/student/README.md) rigs) |
| **Set** | The TURKEY TAKEOVER studio (`set.js`), invented: an LED floor in perspective, a giant LED screen with the show's neon logo, flame towers, two banks of bleachers with a cheering audience, a lighting truss with sweeping beams, a hanging show clock, stainless stations, an oven, a judges' desk, camera cranes. The lead-in is the family's feast room, painted flat |
| **Turkey** | The series' turkey kit `TKY` ([family kitchen README, "Turkey kit"](../../../locations/family_kitchen/README.md)) draws the band-aided cover-up (`fixed`), the frozen festival prize (`frozen`) and the perfect bird (`golden`), so the bird matches the other Fall Festival scenes; `props.js` draws only the in-between kitchen states the kit has no look for (raw → stuffed → trussed → basted). `family_kitchen` is in `locations` only so the kit loads |
| **Audio** | `audio.mp3`: "Ready, Set, Turkey!", made with Gemini from [`song/PROMPT.md`](song/PROMPT.md). 136.4 s; the music ends at 132.5 s and its tail by 135 s. The picture was animated to the brief, then re-fitted to the recording (below) |
| **Borrows** | `uses: ['scene70_nine_moves']`: `N9.put` / `N9.groove` (one dance vocabulary for every rig; Roudaynah is added to its rig table), `bigText`, `slamText`, `burst`, `confetti`, `cannon`, `pop`, `shake`; `N9S.view`, `N9S.floor`, `N9S.spot`, `N9S.beams` |

## Synopsis

At the feast nobody could eat the brothers' charcoal-and-ice turkey. Staring at the band-aided bird, both get the same idea (two idea bulbs) and a thought bubble with a TV in it switches on: the rest is their daydream. Live from the Safadi kitchen: TURKEY! TAKE! OVER! The chefs stride out of the smoke ("Let's cook!") and get freeze-frame name cards; the kids snap to their stations (Housam chopping at blur speed, Danny flambéing, Alma in a sparkle cloud of spices, Jenna washing her hands) and salute: YES, CHEF! The chorus fires an order every two beats. Then the chefs lift the cloche: "Wait. What is THIS?" *clonk* "It's… FROZEN!" (the wrapped festival prize, crash zoom, icy flash). "Sorry, Chef!" No problem: Neptune thaws it with a rainbow wave, Dragon becomes the oven, Fester juggles onions (BONK, still smiling), Princess Pearl judges with a royal stare, Dr. G ticks off three rules and Roudaynah projects the recipe as code. Chorus 2 hands the orders to the guests; the kitchen rush (CHOP! STIR! BASTE! TASTE!) builds the bird on a TURKEY-O-METER; stuffing in, 350° on the dial, the door slams, FIVE… ONE… **DING**: the oven drops open in a blaze of gold. The brigade dances the final chorus and parades the bird like a trophy. At the judges' desk, a drumroll, Pearl tastes: "It is… PERFECT." 10 · 10 · 10. The professor starts to explain; the kids hand him a drumstick: "NO! Just EAT!" CHOMP. Everyone round the table: HAPPY THANKSGIVING! Freeze-frame end card, THE END. No wake-up: it ends on the high.

## Song and section map

Times are seconds in `audio.mp3`; bars are the song's own 130 bpm grid.

| Time | Bars | Section | What the picture does |
|---|---|---|---|
| 0:00–0:07.4 | 0–3 | Intro | the announcer over the daydream lead-in, TV switch-on (2.02), TURKEY! TAKE! OVER! (3.87 · 4.79 · 5.25), the chefs' entrance, LET'S COOK! (6.12) |
| 0:07.4–0:23.9 | 4–12 | Verse 1 | name cards, the chefs' lines, split-screen stations, a 2×2 of all four stations over the instrumental bar (18.6), the sprint (19.95), YES, CHEF! (22.3) |
| 0:23.9–0:38.6 | 13–20 | Chorus 1 | order shots cut on the sung orders, the kids' YES, CHEF! where the song has one; golden, the audience, a 2×2, hands up, no fuss |
| 0:38.6–0:48.2 | 21–26 | Inspection | the beat drops out: "Wait. What is THIS?" (39.0), CLONK "It's…" (42.15), FROZEN! (43.88), Sorry, Chef! (44.6–45.75), the crowd cheers: WE CAN FIX IT! |
| 0:48.2–1:02.9 | 27–33 | Verse 2 | one guest a line (Neptune charges up over the cheer; SPLASH 50.4) |
| 1:02.9–1:13.8 | 34–39 | Breather and reprise | the song thins to near silence: the roll call, MEET THE BRIGADE! (62.9); the line again, slowly (68.85); YES, CHEF! (71.9) |
| 1:13.8–1:28.3 | 40–47 | Chorus 2 | chorus 1 exactly 27 bars later, with the guests |
| 1:28.3–1:39.4 | 48–53 | Kitchen rush | CHOP! STIR! (88.35 · 88.85), BASTE! TASTE! (90.18 · 90.5), the montage with the TURKEY-O-METER; the kids' Chop! Stir! Baste! Taste! one a beat (93.87–95.25), YEAH!, READY FOR THE OVEN! |
| 1:39.4–1:52.75 | 54–60 | The build | stuffing, the dial, the door, science and the timer, FIVE (107.22) FOUR (107.62) THREE (108.46) TWO (109.1) ONE (110.02), then a held bar: WAIT FOR IT… |
| 1:52.75–2:07.2 | 61–68 | The drop | DING (112.79), TURKEY! twice; then a line a bar: GOLDEN! JUICY! · what a beauty · STUFFED IT! NAILED IT! · the parade · GOLDEN! JUICY! · hands up · the crane rises |
| 2:07.2–2:15 | 69–72 | Verdict and ending | "It is… PERFECT!" (128.2), "Allow me to explain…" (128.9), NO! (130.2), Happy Thanksgiving! (130.95), the last hit and end card (132.1) to 135 |

## How the song differs from the brief

- **Tempo:** a steady 130 bpm, not 128; first downbeat at 0.175 s.
- **Verse 1** has an extra instrumental bar before "Everybody to your stations".
- **Choruses:** the answers are not on beats 2 and 4. Each order shot cuts on its sung word; "Stir it!" has no answer, and the third call bar sings "Stuff it! YES, CHEF! Oh yeah!" (no second "Baste it!").
- **Inspection:** the beat drops out (the brief asked it not to), "FROZEN!" lands 2.6 s later than planned, and a crowd cheer fills two bars before verse 2.
- **Verse 2** is followed by about 5 s of near silence, then the last line is sung again, slowly.
- **Kitchen rush** is six bars, not eight, and sparse: two pairs of chef shouts, one stray "Taste!", the kids' four words once (one a beat), "Yeah!".
- **Countdown:** the five numbers are uneven, then one bar of near silence before the DING. "TURKEY!" is screamed twice.
- **Ending:** nine seconds instead of fifteen. No drumroll; the kids shout only "NO!" (the "NO! JUST EAT!" sticker stays as a picture gag, the caption says "NO!").
- **Least certain captions:** "BASTE!" at 90.18 and "Nailed it! YES, CHEF!" at 119.15 are inferred (Whisper could not make them out); the title shout, FROZEN!, Sorry, Chef! and the countdown were placed from the vocal-band energy and are good to about ±0.15 s.

## Shot list

Every start time is in `TT.CUT` (timing.js); the function of the same name is in `shots_a.js` / `shots_b.js` / `shots_c.js`.

Start times change with the fit; `TT.CUT` is the source. In order:

`daydream` · `title` · `entrance` · `cardProf` · `cardDoc` · `science` · `healthy` · `stationsA` · `stationsB` · **`stationsAll`** (new: the 2×2 of all four stations) · `toStations` · `yesChef1` · `c1Stuff` `c1Baste` `c1Golden` `c1Chop` `c1Stir` `c1Heard` `c1Stuff2` `c1Baste2` `c1Quad` `c1Hands` `c1Fuss` · `inspect` · `frozen` · `sorry` · **`crowdFix`** (new: the audience reverse, WE CAN FIX IT!) · `neptune` `dragonOven` `fester` `pearlJudge` `drgRules` `roudCode` · `brigade` · **`helpers`** (the name-tag dolly, now the roll call) · **`brigade2`** (new: the reprise, the crane rises) · `yesChef2` · `c2Stuff` … `c2Fuss` · `rChop` `rStir` `rBaste` `rTaste` · `montage` (cuts on `HIT.rush2`) · **`ready`** (new: READY FOR THE OVEN!) · `bStuffing` `bDial` `bDoor` `bScience` · `countdown` (with the WAIT FOR IT… hold from `HIT.hold`) · `ding` · `golden2` `beauty` `nailed` `parade` `golden3` `team` `dream` · `judges` · `explain` · `feast` · `endCard`.

The HUD (logo + LIVE bug top-left, the show clock top-right) and the karaoke line ride on every shot from the title on (`scene.js`).

## Timing notes

- **One table:** every cut (`TT.CUT`, seconds), every hit (`TT.HIT`), the chorus answers (`TT.YES` for order shots, `TT.CALL` for the final chorus's call bars) and every sung word (`RAW` → `TT.LYRICS`) is in `timing.js`. Shots read their times from there, never from literals.
- Karaoke rows: `[first word, last word, line end, who, text]`; `WORD@t` pins a word, words between pins are spread by length, `~WORD` is the kids' answer inside a chefs' line. `who` colours the line and its tag: ann · prof · doc · chefs · kids · all · pearl.
- **How it was measured:** tempo and downbeat from an onset-strength grid search over the low band (130.00 bpm, phase steady to the end); words from Whisper large-v3 word timestamps (whole song, then the shouted stretches again in short windows); shouts placed on the vocal-band (500–4000 Hz) energy at 40 ms steps.
- Chorus 2 is chorus 1 plus 27 bars (`D`), to within 0.1 s on every word.

## Refitting to another take

Replace `audio.mp3`, re-measure as above, and edit `BPM`, `OFF`, `CUT`, `HIT`, `YES`, `CALL` and the `RAW` rows in `timing.js`. Then render contact sheets round each hit and check the karaoke against the audio in the studio.

## Files

| File | What |
|---|---|
| `timing.js` | `TT`: the beat grid, **`CUT`, `HIT` and the karaoke lyrics**: the one table to re-fit |
| `kit.js` | the cast helper (chef whites by palette swap + toques with atom / red-cross badges; Roudaynah in the dance vocabulary), salute and bossy poses, TV graphics (HUD, lower-thirds, name cards, score bug, split screens, speed lines, whip-pans, YES, CHEF! sticker), effects (flame jets, flame breath, siren, icy flash, steam, sparkles), the karaoke |
| `set.js` | `TTS`: the studio (wall, screen, bleachers + audience, truss and beams, flame towers, clock), counters, crane, `stage()` and depth-sorted `cast()` |
| `props.js` | the turkey (TKY for frozen / cover-up / golden, own drawing for the kitchen states), oven, dial, board, knife, veg, pan + flambé, pot, bowl, spices, sink, baster, onion, recipe hologram, judges' desk, drumstick |
| `shots_a.js` | intro, verse 1, chorus 1, inspection (and the shared shot helpers on `TT_SHOTS._`) |
| `shots_b.js` | verse 2, chorus 2, kitchen rush, the build |
| `shots_c.js` | the drop, the final chorus, the victory lap, the end card |
| `scene.js` | the shot order from `CUT`, with the HUD and karaoke on top |
| `song/PROMPT.md` | the song brief |
| `audio.mp3` | the song |

## Checking

```bash
node render.mjs --scene=scene75_turkey_takeover --sheet=0.3,4.3,6.3,8.6,16.3,21.2 --cols=3 --out=out/check/scene75/intro.jpg
node render.mjs --scene=scene75_turkey_takeover --clip=75:90      # the rush
node render.mjs --scene=scene75_turkey_takeover --clip=104:112    # the drop
```
