// scenes/birthday/scene69_thirteen_trick_shots/scene.js: the shot list of "Thirteen Trick Shots", cut to "Champion Boy" (audio.mp3,
// 192.3 s, 125 bpm, first downbeat 0.095 s; song map: README.md). Each card name is swapped for its real shot from TT_SHOTS
// (opening.js, match.js, finale.js), with the karaoke (lyrics.js) on top; a name with no shot yet shows its storyboard card.
// Every shot is a pure function of t.
(() => {
  const SONG_BPM = TT.BPM, OFF = TT.OFF, BARLEN = TT.BARLEN;
  const DURATION = 192.26;
  // [start, shot, section, lyric / cue, what happens, Housam's pose, goals by the end, sky top, sky bottom]
  const CARDS = [
    [0, 'lightsOn', 'Intro', '(drums, whistle)', 'Night falls on the county field; the floodlights bang on, one per beat; the scoreboard reads TRICK SHOTS 0/13.', 'rest', 0, '#0E1636', '#2E5BFF'],
    [3.4, 'chant', 'Kickoff chant', "Listen up team, game on, let's go! Thirteen shots…", 'The whole cast packs the bleachers, chanting; Clawd on the scoreboard screen: 13 TRICK SHOTS.', 'hello', 0, '#1A2A7A', '#4C7BE0'],
    [9.6, 'tunnel', 'Kickoff chant', '(instrumental)', 'Smoke and flashbulbs: Housam walks out of the tunnel, ball under his arm; the crowd goes wild.', 'ready', 0, '#2B3F8F', '#4C7BE0'],
    [14.7, 'walkout', 'Verse 1', "Housam is ready… ten feet tall… thirteen years and I'm ready for the ball!", 'Low hero angle; he juggles, flicks the ball up, catches it on his neck. Fester takes the goal.', 'juggle', 0, '#3F62C8', '#7BB2FF'],
    [20.4, 'shot1', 'Verse 1', 'Check the clock… shot number ONE!', 'A keepie-uppie volley; Fester dives the wrong way. GOAL 1.', 'kick', 1, '#3F62C8', '#7BB2FF'],
    [24.73, 'shot2', 'Verse 1', 'We pass it to the left… shot number TWO!', 'One-two with Danny on the left; a driven shot through Fester\'s legs. GOAL 2.', 'dribble', 2, '#3F62C8', '#7BB2FF'],
    [28.31, 'shot3', 'Verse 1', 'Breaking through the defense… bending in the corner: THREE!', 'He weaves past the Safadi twins and bends it into the top corner. GOAL 3.', 'kick', 3, '#3F62C8', '#7BB2FF'],
    [32.6, 'chorus1', 'Chorus 1', 'Thirteen shots, we are hitting the net!…', 'Knee slide; the stands party; hands up on "lift your hands high".', 'laugh', 3, '#FF8A3D', '#FFD35C'],
    [48.6, 'theRun', 'Instrumental', '(16 s instrumental)', 'The solo run: from his own box the length of the pitch past Sami, Safadi, Robo-Safadi and Dragon, a skill move per bar.', 'dribble', 3, '#6CC8FF', '#7BDB6A'],
    [64.4, 'shot4', 'Verse 2', 'No time to rest… top shelf rocket: shot number FOUR!', 'Laces done in a blur, a rocket into the top shelf past Robo-Safadi. GOAL 4 (and again on the echo).', 'kick', 4, '#5CBFFF', '#6FD25E'],
    [74.0, 'shot5', 'Verse 2', 'Flying through the air… shot number FIVE!', 'Jenna crosses; Housam\'s flying header. GOAL 5.', 'kick', 5, '#5CBFFF', '#6FD25E'],
    [78.03, 'shot6', 'Verse 2', 'Lining it up… upper-ninety stunner: SIX!', 'A free kick over a wall of Danny, Alma and Jenna, into the upper ninety past Sami. GOAL 6.', 'ready', 6, '#5CBFFF', '#6FD25E'],
    [81.83, 'shot78', 'Verse 2', "Number SEVEN's good and here is EIGHT!", 'Clawd doubles the ball: two shots, two goals, one beat apart. Safadi saves neither. GOALS 7 and 8.', 'kick', 8, '#5CBFFF', '#6FD25E'],
    [85.67, 'shot9', 'Verse 2', 'Rolling past the keeper… shot number NINE!', 'A slow roll; Robo-Safadi scans it… it slips through his legs. GOAL 9.', 'laugh', 9, '#5CBFFF', '#6FD25E'],
    [89.3, 'chorus2', 'Chorus 2', 'Thirteen shots, we are hitting the net!…', 'Dusk; a stadium party: the wave, Neptune\'s fountains, Dragon flies a 13 flag.', 'laugh', 9, '#FF6A3D', '#7A3BCF'],
    [105.7, 'halftime', 'Instrumental', '(halftime)', 'Floodlights on. Professor Safadi\'s tactics board: "Allow me to EXPLAIN…" the plan to stop the last four.', 'thinking', 9, '#1E1A5C', '#4C3BCF'],
    [121.6, 'megaDefense', 'Instrumental', '(the build)', 'The defense assembles, one stomp per bar: MEGA Robo-Safadi in goal, Dragon on the crossbar, Neptune\'s water wall, the twins.', 'ready', 9, '#1E1A5C', '#7A3BCF'],
    [138.2, 'grandFinale', 'Bridge', 'Are you ready for the grand finale? … simply impeccable.', 'Clawd on the big screen; Safadi\'s hologram trajectory: "The physics of this trajectory are simply impeccable."', 'math genius', 9, '#1E1A5C', '#FF3D8B'],
    [146.0, 'shot10', 'Bridge', 'Shot number TEN in the blink of an eye!', 'A power shot straight through Neptune\'s water wall. GOAL 10.', 'kick', 10, '#1E1A5C', '#2E5BFF'],
    [149.29, 'shot11', 'Bridge', 'Double the power with shot ELEVEN!', 'A rocket up and over Dragon on the crossbar. GOAL 11.', 'kick', 11, '#1E1A5C', '#2E5BFF'],
    [151.87, 'shot12', 'Bridge', 'TWELVE hits the crossbar and bounces right in!', 'Off the bar, off MEGA Robo\'s head, in. GOAL 12.', 'surprised', 12, '#1E1A5C', '#2E5BFF'],
    [155.77, 'shot13', 'Bridge', 'Here is the big one: shot THIRTEEN!', 'A golden Fibonacci spiral in the sky; the backflip bicycle kick rides it past everyone. GOAL 13.', 'kick', 13, '#1E1A5C', '#FFB547'],
    [160.5, 'surprise', 'Final chorus', 'Thirteen shots, we have hit every net!…', 'The net rips into HAPPY 13th HOUSAM! #10 flips to #13; the cast storms the pitch with the cake.', 'surprised', 13, '#FF5FB0', '#FFC94D'],
    [169.7, 'teenager', 'Final chorus', 'Let the big celebration begin!…', 'Fireworks spell TEENAGER over Housam; the whole cast under a sky of fireworks.', 'laugh', 13, '#2B1A6E', '#FF3D8B'],
    [176.7, 'sarah', 'Groove (no vocals)', 'Sarah: "Welcome to the club." Housam: "Yeah bro… I mean sis." Sarah: "Whatever."', 'Sarah drops in from the stands, phone in hand; the exchange; the cast cracks up.', 'laugh', 13, '#3A1E7A', '#FF5FA0'],
    [188.2, 'finalShot', 'Ending', '(final hit)', 'The moustache pops on, majestic; HAPPY BIRTHDAY HOUSAM!', 'hello', 13, '#2B1A6E', '#FF3D8B'],
  ];
  const ends = CARDS.map((c, i) => (CARDS[i + 1] ? CARDS[i + 1][0] : DURATION));
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  function card(i) {
    const [t0, name, section, lyric, what, pose, goals, top, bot] = CARDS[i], t1 = ends[i];
    return (t, lt) => {
      X.fillStyle = linGrad(0, 0, 0, H, [[0, top], [1, bot]]); X.fillRect(0, 0, W, H);
      X.fillStyle = 'rgba(255,255,255,.14)';
      for (let x = 0; x < W; x += 120) X.fillRect(x, 820, 2, H - 820);
      X.fillRect(0, 820, W, 3);
      drawPose(CHARACTERS.housam, pose, 520, 920 - 8 * pulse(t, 5), 20, t);
      overlay(() => {
        X.save(); X.globalAlpha = clamp(1 - .6 * seg(t, t1 - .15, t1));
        const ink = PAL.ink, x0 = 980;
        X.textAlign = 'left'; X.textBaseline = 'alphabetic';
        X.fillStyle = rgba('#FFFDF8', .84);
        X.beginPath(); X.roundRect(x0 - 40, 150, 920, 680, 36); X.fill();
        X.fillStyle = ink; X.font = `600 30px ${FONT_TALK}`;
        X.fillText(`${mmss(t0)}–${mmss(t1)}  ·  ${section.toUpperCase()}  ·  bar ${Math.round((t0 - OFF) / BARLEN) + 1}`, x0, 220);
        X.font = `92px ${FONT_SFX}`; X.fillStyle = PAL.crimson; X.fillText(name, x0, 330);
        X.fillStyle = ink; X.font = `italic 600 38px ${FONT_TALK}`;
        const y = wrap(lyric, x0, 410, 840, 48);
        X.font = `500 31px ${FONT_TALK}`; wrap(what, x0, y + 70, 840, 42);
        X.restore();
        // header, goal counter and beat dot
        X.save();
        X.font = `600 26px ${FONT_TALK}`; X.fillStyle = rgba(PAL.ink, .75); X.textAlign = 'left';
        X.fillText('THIRTEEN TRICK SHOTS  ·  storyboard card  ·  Champion Boy  ·  125 bpm', 60, 70);
        X.font = `84px ${FONT_SFX}`; X.textAlign = 'center'; X.lineJoin = 'round';
        X.lineWidth = 14; X.strokeStyle = '#1C0F1A'; X.strokeText(`${goals}/13`, 220, 220);
        X.fillStyle = goals === 13 ? '#FFD35C' : '#FFFDF8'; X.fillText(`${goals}/13`, 220, 220);
        X.beginPath(); X.arc(W - 80, 60, 10 + 10 * pulse(t, 8), 0, TAU); X.fillStyle = PAL.crimson; X.fill();
        X.restore();
      });
    };
  }
  function wrap(txt, x, y, maxW, lh) {               // returns the baseline of the last line
    let lineTxt = '';
    for (const w of txt.split(' ')) {
      const test = lineTxt ? lineTxt + ' ' + w : w;
      if (X.measureText(test).width > maxW && lineTxt) { X.fillText(lineTxt, x, y); y += lh; lineTxt = w; } else lineTxt = test;
    }
    if (lineTxt) X.fillText(lineTxt, x, y);
    return y;
  }

  const withKaraoke = fn => (t, lt, dur) => { fn(t, lt, dur); ttKaraoke(t); };
  scene({ duration: DURATION, fps: 24, bpm: SONG_BPM, beatOffset: OFF,   // id, title, audio: see asset.js
    shots: CARDS.map((c, i) => [c[0], withKaraoke(TT_SHOTS[c[1]] ?? card(i))]) });   // real shots replace their cards by name
})();
