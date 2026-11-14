const TT_SHOTS = {};
// scenes/birthday/scene69_thirteen_trick_shots/lyrics.js: the sung words of "Champion Boy" (audio.mp3, made with Gemini; the
// original is lyria/Champion_Boy_original.mp3) and when they're sung. One row per karaoke line: [first word, last word, lineEnd,
// who, text]. The words in between are spread by length; a word written "WORD@t" is pinned to time t (the shouted numbers).
// who = 'kids' | 'housam' | 'ai' (Clawd, the announcer) | 'prof' (Professor Safadi) sets the colours.
// Times come from Whisper (medium.en) word timestamps; misheard words follow Gemini's lyric sheet. See README.md, "Timing".
// 48.6–64.4 and 105.7–138.3 are instrumental; 176.7–188.2 is the spliced-in groove for Sarah's scene (no vocals).
const TT_LYRICS_RAW = [
  [3.54, 5.34, 5.8, 'kids', "Listen up team, game on, let's go!"],
  [5.88, 7.28, 7.6, 'kids', 'Thirteen shots for the main event show!'],
  [7.52, 9.02, 10.4, 'kids', 'Big thirteen for the champion today!'],
  [14.88, 16.30, 16.6, 'kids', "Housam is ready and he's here to play!"],
  [16.74, 18.22, 18.6, 'housam', "I'm stepping on the pitch, feeling ten feet tall,"],
  [18.78, 20.20, 20.4, 'housam', "thirteen years and I'm ready for the ball!"],
  [20.44, 22.02, 22.3, 'housam', 'Check the clock because the countdown has begun,'],
  [22.36, 23.78, 24.1, 'housam', 'here comes the first one: shot number ONE!@23.78'],
  [24.16, 25.76, 26.1, 'housam', 'We pass it to the left and we drive it through,'],
  [26.26, 27.36, 27.9, 'housam', 'keeper cannot catch it: shot number TWO!@27.36'],
  [27.94, 29.72, 30.0, 'housam', 'Breaking through the defense, wild and free,'],
  [30.18, 31.42, 32.5, 'housam', 'bending in the corner: shot number THREE!@31.42'],
  // chorus 1
  [32.92, 34.90, 35.2, 'kids', 'Thirteen shots, we are hitting the net!'],
  [35.34, 36.76, 37.0, 'kids', 'This is a birthday you will never forget!'],
  [37.10, 39.46, 39.65, 'kids', "Housam is a star and he's taking the crown,"],
  [39.72, 40.32, 40.8, 'kids', 'bringing the house completely down!'],
  [40.94, 42.20, 42.5, 'kids', 'Lift your hands high for the champion boy,'],
  [42.60, 44.02, 44.3, 'kids', 'thirteen reasons for stadium joy!'],
  [44.54, 45.72, 46.1, 'kids', 'Every single shot is a beautiful sight,'],
  [46.36, 48.34, 49.0, 'kids', 'we are owning the field and owning the night!'],
  // verse 2
  [64.46, 66.32, 66.5, 'housam', 'No time to rest, yeah we keep up the pace,'],
  [66.66, 68.24, 68.35, 'housam', 'lacing up my boots with a smile on my face!'],
  [68.40, 69.86, 70.2, 'housam', 'Dribble past the line and we score once more,'],
  [70.38, 71.78, 72.1, 'housam', 'top shelf rocket: shot number FOUR!@71.78'],
  [72.30, 73.46, 73.9, 'kids', 'Shot number FOUR!@73.46'],
  [74.08, 75.26, 75.6, 'housam', 'Flying through the air on a brand new drive,'],
  [75.84, 77.08, 77.4, 'housam', 'hitting with power: shot number FIVE!@77.08'],
  [77.56, 79.08, 79.4, 'housam', 'Lining it up, watch the net just fix,'],
  [79.58, 80.88, 81.2, 'housam', 'upper-ninety stunner: shot number SIX!@80.88'],
  [81.28, 82.72, 83.2, 'housam', "Lucky on the field, but we're making it straight:"],
  [83.40, 84.72, 85.0, 'housam', "number SEVEN'S@83.52 good and here is EIGHT!@84.72"],
  [85.06, 86.40, 86.7, 'housam', "Rolling past the keeper and we're doing fine,"],
  [86.88, 88.34, 88.7, 'housam', 'slipping right through for shot number NINE!@88.34'],
  // chorus 2
  [88.84, 90.06, 90.4, 'kids', 'Thirteen shots, we are hitting the net!'],
  [90.56, 92.12, 92.35, 'kids', 'This is a birthday you will never forget!'],
  [92.44, 96.56, 96.75, 'kids', "Housam is a star and he's taking the crown,"],
  [96.84, 97.48, 97.9, 'kids', 'bringing the house completely down!'],
  [98.02, 99.30, 99.6, 'kids', 'Lift your hands high for the champion boy,'],
  [99.70, 101.14, 101.4, 'kids', 'thirteen reasons for stadium joy!'],
  [101.60, 102.82, 103.3, 'kids', 'Every single shot is a beautiful sight,'],
  [103.54, 105.44, 106.2, 'kids', 'we are owning the field and owning the night!'],
  // bridge
  [138.30, 139.70, 140.2, 'ai', 'Are you ready for the grand finale?'],
  [140.42, 141.40, 141.65, 'ai', 'Let me hear you roar in the valley!'],
  [141.78, 143.38, 143.6, 'prof', 'The physics of this trajectory are simply impeccable.'],
  [143.68, 145.22, 145.7, 'kids', "Let's go, go, go, let's make it spectacular!"],
  [146.08, 147.22, 147.6, 'housam', "Hitting with power and we're aiming high,"],
  [147.78, 149.48, 149.6, 'housam', 'shot number TEN!@148.34 in the blink of an eye!'],
  [149.66, 150.92, 151.3, 'housam', 'Double the power with shot ELEVEN!@150.92'],
  [151.48, 152.96, 153.3, 'kids', 'Rocketing upwards like high up in heaven!'],
  [153.48, 154.82, 155.0, 'housam', 'TWELVE@153.48 hits the crossbar and bounces right in!'],
  [155.16, 156.36, 156.7, 'kids', 'This is the moment we officially win!'],
  [156.84, 158.44, 158.6, 'kids', 'And for the final triumphant scene…'],
  [158.74, 159.82, 160.45, 'kids', 'here is the big one: shot THIRTEEN!@159.82'],
  // final chorus
  [160.68, 162.04, 162.4, 'kids', 'Thirteen shots, we have hit every net!'],
  [162.56, 163.70, 164.0, 'kids', "This is the best that it's gonna get!"],
  [164.28, 165.82, 166.0, 'kids', "Housam is thirteen and he's standing so tall,"],
  [166.18, 167.56, 167.8, 'kids', 'the ultimate champion of football!'],
  [168.00, 169.36, 169.6, 'kids', 'Thirteen shots, thirteen goals for the win,'],
  [169.74, 171.12, 171.4, 'kids', 'let the big celebration begin!'],
  [171.52, 173.02, 173.3, 'kids', 'Shout it out loud for the star of the day:'],
  [173.40, 175.48, 176.3, 'kids', "thirteen big shots and we're here to stay!"],
];

// [lineEnd, who, [[t, word], ...]]: unpinned words share the gaps between pinned ones in proportion to their length.
const TT_LYRICS = TT_LYRICS_RAW.map(([t0, t1, end, who, text]) => {
  const toks = text.split(' ').map(s => { const m = s.match(/^(.*)@([\d.]+)$/); return m ? { w: m[1], at: +m[2] } : { w: s }; });
  toks[0].at ??= t0; toks[toks.length - 1].at ??= t1;
  for (let i = 0; i < toks.length;) {
    let j = i + 1; while (toks[j].at === undefined) j++;
    const span = toks.slice(i, j), wt = span.map(o => o.w.length + 1), tot = wt.reduce((a, b) => a + b, 0);
    let acc = 0; span.forEach((o, k) => { if (k) o.at = toks[i].at + (toks[j].at - toks[i].at) * acc / tot; acc += wt[k]; });
    i = j; if (i === toks.length - 1) break;
  }
  return [end, who, toks.map(o => [o.at, o.w])];
});

const TT_INK = { kids: ['#FFD35C', '#FF9E3D'], housam: ['#8BD3FF', '#3FA9FF'], ai: ['#FF9A5C', '#FF6A3D'], prof: ['#D8B98A', '#B8925A'] };   // [lit, glow]
const TT_NUMBER = /^(ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN'S|EIGHT|NINE|TEN|ELEVEN|TWELVE|THIRTEEN)/;

function ttKaraoke(t) {
  const row = TT_LYRICS.find(([end, , w]) => t >= w[0][0] - .4 && t < end + .25);
  if (!row) return;
  const [end, who, words] = row, t0 = words[0][0], [lit, glow] = TT_INK[who];
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
    X.fillStyle = 'rgba(12,14,30,.58)'; X.beginPath(); X.roundRect(W / 2 - total / 2 - 40, y - size * .72, total + 80, size * 1.36, size * .68); X.fill();
    txt.forEach((s, i) => {
      const ws0 = words[i][0], on = t >= ws0, age = t - ws0, num = TT_NUMBER.test(words[i][1]) && words[i][1] === words[i][1].toUpperCase();
      const pop = on ? 1 + (num ? .5 : .28) * Math.max(0, 1 - age / (num ? .35 : .22)) : 1;
      X.save(); X.translate(x + ws[i] / 2, y - (on ? 6 * Math.max(0, 1 - age / .22) : 0)); X.scale(pop, pop);
      X.lineWidth = size * .2; X.strokeStyle = '#10121F'; X.strokeText(s, -ws[i] / 2, 0);
      if (on) { X.shadowColor = glow; X.shadowBlur = 18 * Math.max(.35, 1 - age / .6); }
      X.fillStyle = on ? (num ? '#FFFFFF' : lit) : 'rgba(255,248,236,.62)'; X.fillText(s, -ws[i] / 2, 0);
      X.restore();
      x += ws[i] + sp;
    });
    X.restore();
  });
}
