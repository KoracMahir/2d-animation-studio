// scenes/birthday/scene68_its_a_secret/scene.js: a timed storyboard animatic for "It's a Secret!", cut to the real song,
// "Surprise on Level Seven" (audio.mp3, 156.8 s, 120.45 bpm, first downbeat 0.365 s; song map and shot list: README.md).
// One card per planned shot: the palette for that moment, Danny in the shot's pose, the shot name, the section and what
// happens, with the karaoke (lyrics.js) along the bottom. A dot pulses on every beat. Replace cards with real shots one by
// one. Every card is a pure function of t.
(() => {
  const SONG_BPM = 120.45, OFF = .365, BARLEN = 240 / SONG_BPM, BAR = n => OFF + n * BARLEN;   // BAR(n): start of bar n (0-based)
  const DURATION = 156.8;
  // [start, shot, section, lyric / cue, what happens, Danny's pose, sky top, sky bottom]
  const CARDS = [
    [0, 'launch', 'Intro', 'Three! Two! One!  ·  BOOM  ·  LET\'S GO, DANNY!', 'A candle fuse burns on the countdown; DANNY · LEVEL 7 explodes out; whip pan to the field.', 'goal!', '#FFB547', '#FF5E7E'],
    [BAR(4), 'hideTheCake', 'Verse 1', 'Hide the cake and grab the balloons!', 'Danny dribbles; behind him the cast sprints with cake, balloons, presents. On every SHH! they freeze.', 'dribble', '#7FD3FF', '#7BDB6A'],
    [BAR(8), 'nearMiss', 'Verse 1', '"Hey! What\'s going on?"  "NOTHING!"', '"Allow me to EXPLAIN—" BONK. Neptune blasts the banner up a tree. Danny spins (21.9): NOTHING! (23.5)', 'surprised', '#8ADBFF', '#6FD25E'],
    [24.0, 'warp', 'Pre-chorus', 'Player one: Danny! Loading level SEVEN!', 'Clawd zooms out of the laptop, PLAYER 1 slams in; 28–32 the song thins to a riser: the neon CRT warp tunnel.', 'programmer', '#3B1E8C', '#E0369A'],
    [31.85, 'run', 'Chorus 1', "It's a secret! SHH! Run it, jump it…", 'Side-scrolling sprint across Craft Blocks, a jump every beat, candle-coins +1!', 'dribble', '#6CC8FF', '#8EE07A'],
    [39.8, 'chase', 'Chorus 1', 'The biggest, loudest, blockiest surprise…', 'Broccreepers chase; Danny kicks one off per beat, then rides Dragon out.', 'kick', '#5CBFFF', '#7CD86A'],
    [BAR(24), 'build', 'Verse 2', 'One block, two block… LEVEL SEVEN!', 'A year-block slams down per count; Danny volleys creepers off the tower. Gold blaze on SEVEN (61.2).', 'block tower', '#55B8FF', '#FFD35C'],
    [BAR(32), 'boss', 'Boss', 'BOSS FIGHT!  Kick it, Danny!', 'Red flash. A giant Broccreeper with Robo-Safadi eyes stomps in; camera shakes on every stomp.', 'ready', '#FF4A4A', '#7A1240'],
    [BAR(34), 'dodge', 'Boss · instrumental', '(instrumental)', 'The boss smashes; Danny dodges, slides and flips between falling blocks, one move per beat.', 'goofy', '#FF5A4A', '#8A1546'],
    [BAR(36), 'climb', 'Boss · instrumental', '(instrumental)', 'Danny scales the boss block by block; Clawd beams in a power-up: SUPER BOOTS!', 'builder', '#FF6A3D', '#7A1240'],
    [BAR(38), 'powerUp', 'Boss · instrumental', '(instrumental)', 'Boots glowing, Danny dribbles down the boss\'s arm like a ramp and launches into the air.', 'dribble', '#FF8A3D', '#9A1C5A'],
    [BAR(40), 'windup', 'Boss · instrumental', '(the music dips at 82)', 'Mid-air slow motion: the ball hangs, the boss looks up, Danny\'s eyes narrow.', 'ready', '#FFB04D', '#B0285E'],
    [BAR(42), 'bicycle', 'Boss · instrumental', '(the loudest bars of the song)', 'Snap to speed: the bicycle kick. GOAL! BROCCOLI BOOM, the screen shakes, florets everywhere.', 'kick', '#FFE14D', '#FF6A3D'],
    [BAR(44), 'shush', 'Boss · instrumental', '(the music dips)', 'Florets rain; Sami pops out of a block to munch one (+1 HEALTH) and Safadi yanks him back: SHH!', 'laugh', '#FFD84D', '#FF8A3D'],
    [BAR(46), 'victory', 'Boss · instrumental', '(instrumental)', 'LEVEL COMPLETE? A victory lap: Danny collects seven candles, one per beat, and plants them on his tower.', 'goal!', '#7FD3FF', '#FFD35C'],
    [BAR(50), 'rumble', 'Boss · instrumental', '(the music winds up to the countdown)', 'Dusk turns neon; the tower rumbles and glows brighter every bar; the hidden cast giggles behind the blocks.', 'surprised', '#6A3BCF', '#FF7A3D'],
    [BAR(56), 'countdown', 'Countdown', 'Three! Two! One!', 'Giant 3, 2, 1 slam down; the tower shakes; push in on Danny\'s face.', 'surprised', '#FF9A3D', '#C2185B'],
    [115.6, 'surprise', 'The drop', 'HAPPY BIRTHDAY! HEY!', 'No shouted SURPRISE in the song: the drop is HAPPY BIRTHDAY. The tower blasts open into a cake; the whole cast bursts out.', 'goal!', '#FF5FB0', '#FFC94D'],
    [BAR(60), 'cake', 'Chorus 2', 'Danny, it\'s your level seven…', 'Everyone jumps on HEY! The twins whip off the cloche: real cake. "SUGAR DAY!"', 'laugh', '#FF7EC2', '#FFD95C'],
    [BAR(64), 'lift', 'Chorus 2', 'That was the secret all along, hip hip hooray!', 'Danny hoisted up; Pearl\'s paper crown; Neptune\'s rainbow fireworks on HOORAY (130.7).', 'goal!', '#9B7BFF', '#FF8AD0'],
    [BAR(66), 'blockParty', 'Dance battle', 'Dan-ny! Dan-ny!', "Alma's rainbow floor; everybody dances.", 'goal!', '#5B4BFF', '#FF4FA8'],
    [BAR(68), 'dannyMove', 'Dance battle', '(the music dips)', "Danny's move: cube toss, solved on the catch, goal celebration.", 'goofy', '#6A3BFF', '#FF6A9E'],
    [BAR(70), 'jump', 'Dance battle', 'Everybody JUMP! JUMP! JUMP!', 'The whole cast copies Danny, jumping on every beat.', 'goal!', '#7448FF', '#FF4FA8'],
    [BAR(72), 'specials', 'Dance battle', '(chiptune solo)', 'Each bar a special goes off like a firework: Explain-o-Beam, Healthy-doken, Neptune\'s water ring, Dragon\'s flame loop.', 'goal!', '#5B4BFF', '#FF7FB8'],
    [BAR(74), 'bonk', 'Dance battle', '(solo)', 'Fester juggles birthday candles… BONK. "…story of my life." Danny laughs hardest.', 'laugh', '#7448FF', '#FF7FB8'],
    [151.4, 'finale', 'Finale', 'LOOK BEHIND YOU!', 'Fireworks; the cast crowds the lens and points past it at the real Danny. A firework 7, THE END.', 'hello', '#2B1A6E', '#FF3D8B'],
  ];
  const ends = CARDS.map((c, i) => (CARDS[i + 1] ? CARDS[i + 1][0] : DURATION));
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  function card(i) {
    const [t0, name, section, lyric, what, pose, top, bot] = CARDS[i], t1 = ends[i];
    return (t, lt) => {
      // sky, grid floor and a beat pulse
      X.fillStyle = linGrad(0, 0, 0, H, [[0, top], [1, bot]]); X.fillRect(0, 0, W, H);
      const dark = name === 'hold';
      if (!dark) {
        X.fillStyle = 'rgba(255,255,255,.14)';
        for (let x = 0; x < W; x += 120) X.fillRect(x, 820, 2, H - 820);
        X.fillRect(0, 820, W, 3);
      }
      // Danny, in the shot's pose, bouncing on the beat
      if (pose) {
        const s = 22, bounce = 8 * pulse(t, 5);
        drawPose(CHARACTERS.danny, pose, 560, 900 - bounce, s, t);
      } else {
        const blink = frac(t * .7) < .08 ? .15 : 1;
        [-28, 28].forEach(dx => ellipse(W / 2 + dx, 520, 12, 16 * blink, { fill: '#FFFDF8', stroke: null }));
      }
      // the card text (screen space, above everything)
      const fade = 1 - .6 * seg(t, t1 - .15, t1);           // readable from the first frame, so scrubbing to a shot shows its card
      overlay(() => {
        X.save(); X.globalAlpha = clamp(fade);
        const ink = dark ? '#C9B8C2' : PAL.ink, x0 = 980;
        X.textAlign = 'left'; X.textBaseline = 'alphabetic';
        X.fillStyle = rgba('#FFFDF8', dark ? .06 : .82);
        X.beginPath(); X.roundRect(x0 - 40, 150, 920, 640, 36); X.fill();
        X.fillStyle = ink;
        X.font = `600 30px ${FONT_TALK}`;
        X.fillText(`${mmss(t0)}–${mmss(t1)}  ·  ${section.toUpperCase()}  ·  bar ${Math.round((t0 - OFF) / BARLEN) + 1}`, x0, 220);
        X.font = `92px ${FONT_SFX}`; X.fillStyle = dark ? '#E9D7E0' : PAL.crimson;
        X.fillText(name, x0, 330);
        X.fillStyle = ink; X.font = `italic 600 40px ${FONT_TALK}`;
        wrap(lyric, x0, 420, 840, 50);
        X.font = `500 32px ${FONT_TALK}`;
        wrap(what, x0, 560, 840, 44);
        X.restore();
        // header and beat dot
        X.save();
        X.font = `600 26px ${FONT_TALK}`; X.fillStyle = dark ? '#8C7A86' : rgba(PAL.ink, .7); X.textAlign = 'left';
        X.fillText("IT'S A SECRET!  ·  storyboard animatic  ·  Surprise on Level Seven  ·  120.45 bpm", 60, 70);
        X.beginPath(); X.arc(W - 80, 60, 10 + 10 * pulse(t, 8), 0, TAU); X.fillStyle = dark ? '#8C7A86' : PAL.crimson; X.fill();
        X.restore();
      });
    };
  }
  function wrap(txt, x, y, maxW, lh) {
    let lineTxt = '';
    for (const w of txt.split(' ')) {
      const test = lineTxt ? lineTxt + ' ' + w : w;
      if (X.measureText(test).width > maxW && lineTxt) { X.fillText(lineTxt, x, y); y += lh; lineTxt = w; } else lineTxt = test;
    }
    if (lineTxt) X.fillText(lineTxt, x, y);
  }

  const withKaraoke = fn => (t, lt, dur) => { fn(t, lt, dur); secretKaraoke(t); };
  scene({ duration: DURATION, fps: 24, bpm: SONG_BPM, beatOffset: OFF,   // id, title, audio: see asset.js
    shots: CARDS.map((c, i) => [c[0], withKaraoke(SECRET_SHOTS[c[1]] ?? card(i))]) });   // real shots (opening.js) replace their cards by name
})();
