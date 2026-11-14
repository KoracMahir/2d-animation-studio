// scenes/birthday/scene68_its_a_secret/asset.js: Danny's seventh-birthday music video (outline and song brief: README.md).
// For now a timed storyboard animatic cut to the song: one card per planned shot, with the karaoke along the bottom.
asset({
  title: "It's a Secret!",
  logline: 'A festive, full-throttle music video for Danny\'s seventh birthday. 3-2-1, LET\'S GO, DANNY! The cast smuggles a secret party across the soccer field behind his back and freezes every time he turns ("NOTHING!"). Clawd warps him into Craft Blocks, Level 7: a sprint, a tower built a block per year, a boss battle and a bicycle-kick GOAL. HAPPY BIRTHDAY! The tower opens into a cake, the cast bursts out, and a dance battle ends on LOOK BEHIND YOU!',
  files: ['lyrics.js', 'opening.js', 'game.js', 'party.js', 'scene.js'], // karaoke · field (0–32 s) · Craft Blocks level (32–112 s) · party (112–157 s) · assembly
  uses: ['scene36_dream_mode'],                 // its Craft Blocks props: dmBlockWorld, dmBlock, dmCreeper, dmBoom, dmSlam, dmCube, stArcade…
  docs: 'README.md',                            // story, song map, shot list, production plan
  audio: 'audio.mp3',                           // "Surprise on Level Seven", made with Gemini (156.8 s; the music ends at about 153.8 s)
  cast: ['danny', 'housam', 'alma', 'jenna', 'safadi', 'sami', 'jester_fester', 'robo_safadi', 'neptune', 'dragon', 'clawd', 'princess_pearl'],
  locations: ['soccer_field'],
});
