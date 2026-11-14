// scenes/birthday/scene68_its_a_secret/lyrics.js: the sung words of "Surprise on Level Seven" (audio.mp3, made with Gemini) with
// their start times in seconds. One row per karaoke line: [lineEnd, who, [[t, word], ...]]; who = 'kids', 'danny' or 'game'
// (the announcer), which sets the colour the words light up in. A line shows from just before its first word until lineEnd.
// Times come from Whisper (medium.en) word timestamps over overlapping 4–8 s windows; misheard words are corrected
// ("shit" → SHH!, "All's fun" → BOSS FIGHT!). 68–112 s is instrumental. See README.md, "Timing".
const SECRET_LYRICS = [
  // intro
  [4.6, 'kids', [[1.24, 'Three!'], [2.50, 'Two!'], [3.80, 'One!']]],
  [8.0, 'game', [[6.04, "Let's"], [6.60, 'go,'], [7.10, 'Danny!']]],
  // verse 1
  [11.6, 'kids', [[8.10, 'Hide'], [8.22, 'the'], [8.47, 'cake'], [8.73, 'and'], [8.98, 'grab'], [9.21, 'the'], [9.42, 'balloons!']]],
  [15.6, 'kids', [[12.02, "Danny's"], [12.57, 'coming'], [12.84, 'back'], [13.20, 'real'], [13.42, 'soon!']]],
  [18.1, 'kids', [[16.00, 'Quick,'], [16.44, 'quick,'], [16.56, 'quick,'], [16.86, "don't"], [17.02, 'make'], [17.24, 'a'], [17.36, 'sound!']]],
  [19.5, 'kids', [[18.22, 'Shh,'], [18.52, 'shh,'], [19.00, 'shh,'], [19.26, 'shh!']]],
  [21.8, 'kids', [[19.60, 'The'], [19.88, 'biggest'], [20.37, "party's"], [21.01, 'going'], [21.28, 'down!']]],
  [23.4, 'danny', [[21.94, 'Hey!'], [22.58, "What's"], [22.79, 'going'], [22.90, 'on?']]],
  [24.0, 'kids', [[23.53, 'NOTHING!']]],
  // pre-chorus
  [25.7, 'game', [[24.14, 'Player'], [24.38, 'one:'], [24.92, 'Danny!']]],
  [28.2, 'game', [[25.90, 'Loading'], [26.38, 'level'], [26.88, 'SEVEN!']]],
  // chorus 1
  [33.6, 'kids', [[31.96, "It's"], [32.54, 'a'], [32.69, 'secret!']]],
  [34.2, 'kids', [[33.76, 'SHH!']]],
  [35.6, 'kids', [[34.30, "It's"], [34.54, 'a'], [34.68, 'secret!']]],
  [36.1, 'kids', [[35.71, 'SHH!']]],
  [39.6, 'kids', [[36.30, 'Run'], [36.46, 'it,'], [36.82, 'jump'], [36.88, 'it,'], [37.34, 'block'], [37.37, 'by'], [37.62, 'block,'], [38.00, "don't"], [38.46, 'you'], [38.58, 'tell'], [38.92, 'them'], [39.16, 'yet!']]],
  [41.5, 'kids', [[39.90, "It's"], [40.49, 'a'], [40.67, 'secret!']]],
  [41.9, 'kids', [[41.69, 'SHH!']]],
  [43.5, 'kids', [[42.10, "It's"], [42.50, 'a'], [42.65, 'secret!']]],
  [43.95, 'kids', [[43.65, 'SHH!']]],
  [47.9, 'kids', [[44.00, 'The'], [44.13, 'biggest,'], [44.68, 'loudest,'], [45.30, 'blockiest'], [45.87, 'surprise'], [46.36, 'you'], [46.63, 'ever'], [46.98, 'met!']]],
  // verse 2: the build
  [51.5, 'danny', [[48.24, 'One'], [48.52, 'block,'], [49.26, 'two'], [49.44, 'block,'], [50.24, 'stack'], [50.34, 'them'], [50.62, 'to'], [50.86, 'the'], [51.08, 'sky!']]],
  [55.5, 'danny', [[51.90, 'Three'], [52.45, 'block,'], [53.20, 'four'], [53.45, 'block,'], [54.24, 'watch'], [54.33, 'the'], [54.57, 'creepers'], [55.06, 'fly!']]],
  [59.4, 'danny', [[55.80, 'Five'], [56.49, 'block,'], [57.17, 'six'], [57.38, 'block,'], [58.16, 'kick'], [58.28, 'them'], [58.62, 'off'], [58.86, 'the'], [59.06, 'top!']]],
  [64.0, 'danny', [[59.60, 'Seven'], [60.45, 'block,'], [61.17, 'LEVEL'], [61.41, 'SEVEN,'], [62.17, 'Danny'], [62.42, "can't"], [62.87, 'be'], [63.01, 'stopped!']]],
  // boss
  [66.0, 'game', [[64.47, 'BOSS'], [65.16, 'FIGHT!']]],
  [68.4, 'kids', [[66.25, 'Kick'], [66.31, 'it,'], [66.53, 'Danny!'], [67.19, 'Kick'], [67.33, 'it,'], [67.59, 'Danny!']]],
  // (68–112 s: instrumental) · countdown
  [115.4, 'kids', [[112.40, 'Three!'], [113.60, 'Two!'], [114.70, 'One!']]],
  // chorus 2
  [118.0, 'kids', [[115.64, 'HAPPY'], [116.50, 'BIRTHDAY!'], [117.70, 'HEY!']]],
  [120.4, 'kids', [[118.15, 'HAPPY'], [118.50, 'BIRTHDAY!'], [119.70, 'HEY!']]],
  [121.9, 'kids', [[120.50, 'Danny,'], [120.82, "it's"], [120.94, 'your'], [121.06, 'level'], [121.45, 'seven!']]],
  [123.5, 'kids', [[122.00, 'Danny,'], [122.77, "it's"], [122.88, 'your'], [123.05, 'day!']]],
  [126.0, 'kids', [[123.62, 'HAPPY'], [124.48, 'BIRTHDAY!'], [125.74, 'HEY!']]],
  [128.0, 'kids', [[126.12, 'HAPPY'], [126.46, 'BIRTHDAY!'], [127.66, 'HEY!']]],
  [131.6, 'kids', [[128.12, 'That'], [128.27, 'was'], [128.45, 'the'], [128.59, 'secret'], [128.93, 'all'], [129.32, 'along!'], [129.85, 'Hip,'], [130.30, 'hip,'], [130.69, 'HOORAY!']]],
  // dance battle
  [136.0, 'kids', [[132.22, 'Dan-ny!'], [133.10, 'Dan-ny!'], [134.01, 'Dan-ny!'], [135.18, 'Dan-ny!']]],
  [144.0, 'kids', [[140.05, 'Everybody'], [140.90, 'JUMP!'], [142.30, 'JUMP!'], [142.86, 'JUMP!'], [143.24, 'JUMP!']]],
  // finale
  [155.0, 'kids', [[151.52, 'LOOK'], [152.77, 'BEHIND'], [153.34, 'YOU!']]],
];

const SECRET_INK = { kids: ['#FFC266', '#FF9E3D'], danny: ['#8BD3FF', '#3FA9FF'], game: ['#9BEA5A', '#7CFF6B'] };   // [lit, glow]

function secretKaraoke(t) {
  const row = SECRET_LYRICS.find(([end, , w]) => t >= w[0][0] - .4 && t < end + .25);
  if (!row) return;
  const [end, who, words] = row, t0 = words[0][0], [lit, glow] = SECRET_INK[who];
  const k = easeOut(seg(t, t0 - .4, t0 - .12)) * (1 - easeIn(seg(t, end, end + .25)));
  if (k < .02) return;
  overlay(() => {
    const size = 62, y = H - 92 + (1 - k) * 40;
    X.save(); X.font = `${size}px ${FONT_SFX}`; X.textBaseline = 'middle'; X.textAlign = 'left'; X.lineJoin = 'round';
    const txt = words.map(w => w[1].toUpperCase()), sp = size * .32, ws = txt.map(s => X.measureText(s).width);
    const total = ws.reduce((a, b) => a + b, 0) + sp * (txt.length - 1), sc = Math.min(1, (W - 160) / total);
    X.translate(W / 2, y); X.scale(sc, sc); X.translate(-W / 2, -y);
    let x = W / 2 - total / 2;
    X.globalAlpha = k;
    X.fillStyle = 'rgba(20,10,24,.55)'; X.beginPath(); X.roundRect(W / 2 - total / 2 - 40, y - size * .72, total + 80, size * 1.36, size * .68); X.fill();
    txt.forEach((s, i) => {
      const ws0 = words[i][0], on = t >= ws0, age = t - ws0, pop = on ? 1 + .28 * Math.max(0, 1 - age / .22) : 1;
      X.save(); X.translate(x + ws[i] / 2, y - (on ? 6 * Math.max(0, 1 - age / .22) : 0)); X.scale(pop, pop);
      X.lineWidth = size * .2; X.strokeStyle = '#1C0F1A'; X.strokeText(s, -ws[i] / 2, 0);
      if (on) { X.shadowColor = glow; X.shadowBlur = 18 * Math.max(.35, 1 - age / .6); }
      X.fillStyle = on ? lit : 'rgba(255,248,236,.62)'; X.fillText(s, -ws[i] / 2, 0);
      X.restore();
      x += ws[i] + sp;
    });
    X.restore();
  });
}
