// scenes/birthday/scene70_nine_moves/lyrics.js: the sung words of "Nine Moves to the Birthday Sky" (audio.mp3, made with Gemini)
// and when they're sung. One row per karaoke line: [first word, last word, lineEnd, who, text]. The words in between are
// spread by length; a word written "WORD@t" is pinned to time t (the shouted numbers and letters).
// who = 'kids' | 'alma' | 'ai' (DJ Clawd) | 'prof' (Professor Safadi) sets the colours.
// Times come from Whisper (medium.en) word timestamps, with the shouts snapped to the beat grid (120 bpm, downbeat 0.305 s);
// misheard words follow Gemini's lyric sheet. The song sings the name "Hu-Sam"; captions spell it Housam. See README.md, "Timing".
const N9_LYRICS_RAW = [
  [1.8, 3.3, 3.8, 'kids', 'A!@1.8 L!@2.3 M!@2.8 A!@3.3'],
  [4.3, 5.65, 6.15, 'kids', 'Alma is… NINE!@5.65'],
  [6.3, 7.7, 8.1, 'ai', "Nine moves. Let's@7.36 go!@7.7"],
  [8.36, 9.8, 10.1, 'alma', 'Lights on the floor and the beat drops in,'],
  [10.24, 11.6, 12.2, 'alma', 'follow my feet, let the party begin!'],
  [12.42, 13.72, 14.2, 'alma', 'Danny, jump up and touch the sun,'],
  [14.44, 15.8, 16.0, 'alma', "bounce, bounce, bounce: that's@15.2 move number ONE!@15.8"],
  [16.04, 17.22, 17.5, 'alma', 'Fester, point up to the sky so blue,'],
  [17.6, 18.8, 19.6, 'alma', "disco, disco: that's@18.26 move number TWO!@18.8"],
  [19.84, 21.2, 21.6, 'alma', 'Jenna, spin with me, wild and free,'],
  [21.86, 23.3, 24.0, 'alma', "twirl, twirl, twirl: that's@22.62 move number THREE!@23.3"],
  // chorus 1
  [24.22, 25.6, 26.0, 'kids', 'Nine! Nine! Alma is nine!'],
  [26.06, 27.7, 28.0, 'kids', "The dance floor's glowing, it's her time to shine!"],
  [28.04, 29.7, 30.0, 'kids', "Nine big moves and we're learning them all,"],
  [30.04, 31.5, 31.8, 'kids', 'happy birthday, Alma, have a ball!'],
  [31.86, 33.6, 34.0, 'kids', 'Nine! Nine! Alma is nine!'],
  [34.12, 35.7, 36.0, 'kids', 'Jump in the middle and get in line!'],
  [36.04, 37.7, 38.0, 'kids', 'Hands up high, let the sparkles fly,'],
  [38.06, 39.5, 40.0, 'kids', 'shout it out loud to the birthday sky!'],
  [40.26, 41.56, 42.0, 'ai', 'Three moves down. Level@41.4 up!'],
  [42.12, 43.18, 43.7, 'kids', 'Six to@42.94 go!'],
  // verse 2
  [43.86, 45.82, 46.1, 'alma', 'Housam, swing@44.84 your arms across the floor,'],
  [46.18, 47.8, 48.2, 'alma', "floss, floss, floss: that's@47.14 move number FOUR!@47.8"],
  [47.9, 49.04, 49.5, 'alma', 'Robo-Safadi, come@48.64 alive,'],
  [49.58, 51.3, 51.55, 'alma', "beep, boop, beep: that's@50.64 move number FIVE!@51.3"],
  [51.62, 53.18, 53.5, 'alma', 'Neptune and Pearl, splash into the mix,'],
  [53.6, 55.3, 56.0, 'alma', "wave, wave, wave: that's@54.7 move number SIX!@55.3"],
  // chorus 2
  [56.18, 57.7, 58.0, 'kids', 'Nine! Nine! Alma is nine!'],
  [58.08, 59.7, 60.0, 'kids', "The dance floor's glowing, it's her time to shine!"],
  [60.02, 61.7, 62.0, 'kids', "Nine big moves and we're learning them all,"],
  [62.1, 63.6, 64.0, 'kids', 'happy birthday, Alma, have a ball!'],
  [64.1, 65.7, 66.0, 'kids', 'Nine! Nine! Alma is nine!'],
  [66.14, 67.7, 68.0, 'kids', 'Jump in the middle and get in line!'],
  [68.08, 69.7, 70.0, 'kids', 'Hands up high, let the sparkles fly,'],
  [70.04, 71.6, 72.1, 'kids', 'shout it out loud to the birthday sky!'],
  // the dance circle
  [72.26, 74.24, 75.2, 'kids', 'Go, Danny!@73.2 Go,@74.1 Danny!'],
  [76.74, 78.22, 79.2, 'kids', 'Go, Jenna!@77.22 Go,@78.06 Jenna!'],
  [80.38, 82.8, 83.6, 'kids', 'Go, Housam!@81.1 Go,@81.9 Housam!'],
  [84.6, 86.22, 87.2, 'kids', 'Go, Fester!@85.1 Go,@86.1 Fester!'],
  // verse 3
  [88.26, 89.86, 90.05, 'alma', 'Dragon, flap your wings up to heaven,'],
  [90.1, 91.8, 92.2, 'alma', "roar, roar, roar: that's@91.18 move number SEVEN!@91.8"],
  [92.26, 93.16, 93.75, 'prof', 'Allow me@92.88 to explain…'],
  [93.84, 94.24, 94.75, 'kids', 'No! Just DANCE!'],
  [94.86, 96.3, 96.55, 'alma', "Professor shuffle: that's@95.72 move number EIGHT!@96.3"],
  // the build
  [96.6, 98.22, 99.2, 'alma', 'One more move…@97.26 the@97.66 biggest one…'],
  [100.3, 103.8, 104.2, 'kids', 'ONE!@100.3 TWO!@100.8 THREE!@101.3 FOUR!@101.8 FIVE!@102.3 SIX!@102.8 SEVEN!@103.3 EIGHT!@103.8'],
  [104.3, 105.4, 106.2, 'kids', 'NINE!@104.3 Super dance power!'],
  // the final chorus (shorter than the brief: straight to the cake)
  [106.36, 107.62, 108.1, 'kids', 'Super dance power, watch@107.34 her shine!'],
  [108.3, 109.24, 109.8, 'kids', 'Happy birthday,@108.82 Alma!'],
  [109.9, 110.8, 111.3, 'kids', 'Make a wish!@110.42 HEY!@110.8'],
  [111.86, 113.34, 114.3, 'kids', 'Blow out@112.58 the@113.04 candles:'],
  [114.7, 115.9, 116.9, 'kids', 'one… big…@115.15 WHOOSH!@115.9'],
  // the victory lap
  [120.3, 123.8, 124.2, 'kids', 'Bounce!@120.3 Disco!@120.8 Twirl!@121.3 Floss!@121.8 Robot!@122.3 Wave!@122.8 Dragon!@123.3 Shuffle!@123.8'],
  [124.6, 124.6, 125.4, 'kids', 'NINE!'],
  [128.3, 129.3, 130.6, 'kids', 'Happy birthday,@128.8 ALMA!@129.3'],
];
const N9_LYRICS = N9_LYRICS_RAW.map(([t0, t1, end, who, text]) => {
  const toks = text.split(' ').map(s => { const m = s.match(/^(.*)@([\d.]+)$/); return m ? { w: m[1], at: +m[2] } : { w: s }; });
  toks[toks.length - 1].at ??= t1; toks[0].at ??= t0;
  for (let i = 0; i < toks.length - 1;) {
    let j = i + 1; while (toks[j].at === undefined) j++;
    const span = toks.slice(i, j), wt = span.map(o => o.w.length + 1), tot = wt.reduce((a, b) => a + b, 0);
    let acc = 0; span.forEach((o, k) => { if (k) o.at = toks[i].at + (toks[j].at - toks[i].at) * acc / tot; acc += wt[k]; });
    i = j;
  }
  return [end, who, toks.map(o => [o.at, o.w])];
});
const N9_INK = { kids: ['#FFD35C', '#FF9E3D'], alma: ['#E9B8FF', '#B46BFF'], ai: ['#FF9A5C', '#FF6A3D'], prof: ['#D8B98A', '#B8925A'] };   // [lit, glow]
const N9_SHOUT = /^(ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|HEY|WHOOSH|ALMA|DANCE)[!…,]*$/;

function n9Karaoke(t) {
  const live = N9_LYRICS.filter(([end, , w]) => t >= w[0][0] - .4 && t < end + .25);
  const row = live.filter(r => t >= r[2][0][0] - .1).pop() ?? live[0];   // a new line takes over as soon as it is sung
  if (!row) return;
  const [end, who, words] = row, t0 = words[0][0], [lit, glow] = N9_INK[who];
  const k = easeOut(seg(t, t0 - .4, t0 - .12)) * (1 - easeIn(seg(t, end, end + .25)));
  if (k < .02) return;
  overlay(() => {
    const size = 60, y = H - 90 + (1 - k) * 40;
    X.save(); X.font = `${size}px ${FONT_SFX}`; X.textBaseline = 'middle'; X.textAlign = 'left'; X.lineJoin = 'round';
    const txt = words.map(w => w[1].toUpperCase()), sp = size * .32, ws = txt.map(s => X.measureText(s).width);
    const total = ws.reduce((a, b) => a + b, 0) + sp * (txt.length - 1), sc = Math.min(1, (W - 160) / total);
    X.translate(W / 2, y); X.scale(sc, sc); X.translate(-W / 2, -y);
    let x = W / 2 - total / 2;
    X.globalAlpha = k;
    X.fillStyle = 'rgba(20,10,40,.6)'; X.beginPath(); X.roundRect(W / 2 - total / 2 - 40, y - size * .72, total + 80, size * 1.36, size * .68); X.fill();
    txt.forEach((s, i) => {
      const ws0 = words[i][0], on = t >= ws0, age = t - ws0, num = N9_SHOUT.test(words[i][1]);
      const pop = on ? 1 + (num ? .5 : .28) * Math.max(0, 1 - age / (num ? .35 : .22)) : 1;
      X.save(); X.translate(x + ws[i] / 2, y - (on ? 6 * Math.max(0, 1 - age / .22) : 0)); X.scale(pop, pop);
      X.lineWidth = size * .2; X.strokeStyle = '#150A24'; X.strokeText(s, -ws[i] / 2, 0);
      if (on) { X.shadowColor = glow; X.shadowBlur = 18 * Math.max(.35, 1 - age / .6); }
      X.fillStyle = on ? (num ? '#FFFFFF' : lit) : 'rgba(255,248,236,.62)'; X.fillText(s, -ws[i] / 2, 0);
      X.restore();
      x += ws[i] + sp;
    });
    X.restore();
  });
}
