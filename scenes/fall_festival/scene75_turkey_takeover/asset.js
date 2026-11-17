// scenes/fall_festival/scene75_turkey_takeover/asset.js: the music-video finale of Fall Festival (story, song map, shot list: README.md).
// The picture was animated to the song brief (song/PROMPT.md), then re-fitted to the recording: 130 bpm, first downbeat 0.175 s.
// Every cut, hit and caption time is in timing.js (README.md, "How the song differs from the brief").
asset({
  title: 'Fall Festival 5 · Turkey Takeover',
  logline: 'The brothers daydream their way to redemption: Professor Safadi and Doctor Sami become bossy celebrity TV chefs hosting TURKEY TAKEOVER, a loud, glittering reality cooking show, and the whole gang is their kitchen brigade. "YES, CHEF!" Housam chops at blur speed, Danny flambés, Alma spices, Jenna washes her hands; the turkey turns out FROZEN ("Sorry, Chef!"), so Neptune thaws it with a rainbow wave, Dragon becomes the oven, Fester juggles onions (BONK), Princess Pearl judges, Dr. G has three rules and Roudaynah codes the recipe. A kitchen rush, a countdown, DING: a perfect golden stuffed turkey. "It is... PERFECT." "Allow me to explain..." "NO! Just EAT!" Happy Thanksgiving!',
  files: ['timing.js', 'kit.js', 'set.js', 'props.js', 'shots_a.js', 'shots_b.js', 'shots_c.js', 'scene.js'],   // THE timing table and karaoke · TV graphics, chefs' whites, cast helper · the studio kitchen · turkey, oven, station props · intro to verse 2 · chorus 2 to the build · the drop and the finale · assembly
  docs: 'README.md',
  uses: ['scene70_nine_moves'],                 // N9: put / groove (one dance vocabulary for every rig), bigText, slamText, burst, confetti, cannon, pop; N9S: view, floor, spot, cast
  cast: ['safadi', 'sami', 'housam', 'alma', 'jenna', 'danny', 'jester_fester', 'neptune', 'princess_pearl', 'dragon', 'dr_g', 'roudaynah', 'student'],
  locations: ['family_kitchen'],                // only for its TKY turkey kit (the frozen prize, the cover-up and the golden bird); the set is the invented TV studio (set.js)
  audio: 'audio.mp3',                           // "Ready, Set, Turkey!", made with Gemini from song/PROMPT.md (136.4 s; the music ends at 132.5 s, its tail by 135 s)
});
