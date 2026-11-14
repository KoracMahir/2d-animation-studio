// scenes/birthday/scene70_nine_moves/kit.js: the shared kit for "Nine Moves", Alma's ninth-birthday music video: the beat grid
// and THE TIMING TABLE (every cut and every shouted number), the cast table with one normalized dance vocabulary for every rig,
// slam text, fireworks, confetti, the nine-star DANCE POWER meter and the cake. Everything is a pure function of its arguments.
//
// TIMING: the animation was made before the song, then fitted to it. Every shot reads its times from CUT (when each shot
// starts) and HIT (when each number is shouted), and moves on the beat grid (BPM, OFF). The few times inside a shot that follow
// sung words (the opening letters, the cake, the WHOOSH) are named constants at the top of that shot.
const N9 = (() => {
  const BPM = 120, OFF = .305, BEAT = 60 / BPM, BARLEN = 4 * BEAT, B = n => OFF + n * BARLEN;
  const bpos = t => (t - OFF) / BEAT, hop = (t, ph = 0) => Math.abs(Math.sin(Math.PI * (bpos(t) + ph)));
  const beatK = (t, d = 7) => Math.exp(-frac(bpos(t)) * BEAT * d);             // 1 on every beat, decaying

  // ---------- the timing table (seconds), measured from audio.mp3 ("Nine Moves to the Birthday Sky", made with Gemini) ----------
  // 120.00 bpm, first downbeat 0.305 s. The song keeps the planned bars, but most numbers are shouted late (ONE, FOUR and SEVEN
  // half a beat, EIGHT a whole beat; TWO half a beat early), so each teaching shot now runs to one second after its number.
  const CUT = {
    curtain: 0, entrance: B(4),
    m1: B(6), m2: 16.805, m3: 19.805, chorus1: B(12),
    dj: B(20), m4: B(22), m5: 48.805, m6: B(26), chorus2: B(28),
    danceBreak: B(36), m7: B(44), m8: 92.555,
    build: 97.305, nine: B(52), everybody: B(60), finalPose: B(64), end: B(64) + 3.4,
  };
  const HIT = [15.805, 18.805, 23.305, 47.805, 51.305, 55.305, 91.805, 96.305, CUT.nine];
  const powerAt = t => HIT.filter(h => t >= h).length;
  const MOVES = ['bounce', 'disco', 'twirl', 'floss', 'robot', 'wave', 'dragon', 'professor', 'star'];
  const NAMES = ['THE BOUNCE', 'THE DISCO', 'THE TWIRL', 'THE FLOSS', 'THE ROBOT', 'THE WAVE', 'THE DRAGON', 'THE PROFESSOR', 'THE SUPER STAR'];
  const WORDS = ['ONE!', 'TWO!', 'THREE!', 'FOUR!', 'FIVE!', 'SIX!', 'SEVEN!', 'EIGHT!', 'NINE!'];

  const C = { plum: '#2A0E3D', night: '#150B3A', purple: '#9B6BC0', lilac: '#C7A6DB', sage: '#84A98C', gold: '#FFD23F', magenta: '#FF3D9A', pink: '#FF8AC4',
    cyan: '#3DE8FF', lime: '#8CFF5A', orange: '#FF8A2B', white: '#FFFDF8', ink: '#24122E', red: '#FF3B3B' };
  const FIRE = [C.gold, C.magenta, C.cyan, C.lime, C.orange, '#B98CFF'];
  const NINE = ['#FF5A5F', '#FF8A2B', '#FFD23F', '#8CFF5A', '#3DE8C0', '#3DB8FF', '#7A7BFF', '#B98CFF', '#FF6FC8'];   // one colour per move

  // ---------- little helpers ----------
  const kickK = (t, t0, d = 7) => (t < t0 ? 0 : Math.exp(-(t - t0) * d));
  const on = (t, a, b, f = .25) => ease(seg(t, a, a + f)) * (1 - ease(seg(t, b - f, b)));
  const slamK = (t, t0) => (t < t0 ? 0 : backOut(seg(t, t0, t0 + .22)));
  const shake = (t, hits) => hits.reduce((a, [t0, amt, d = 6]) => { const [x, y] = shakeXY(t, amt * kickK(t, t0, d)); return [a[0] + x, a[1] + y]; }, [0, 0]);

  // ---------- the cast ----------
  // sh / sx: shoulder height and half-width, arm: reach, ft: resting ankle (all in the rig's local units), w: world height.
  const RIG = {
    alma: { fn: alma, u: ALMA_UNIT, sh: -9.5, sx: 2.55, arm: 4.9, ft: [.9, -.55], spin: true },
    jenna: { fn: jenna, u: JENNA_UNIT, sh: -16.3, sx: 3.0, arm: 7.0, ft: [1.25, -.65], spin: true },
    danny: { fn: danny, u: DANNY_UNIT, sh: -14.45, sx: 2.7, arm: 5.5, ft: [1.5, -1.05] },
    housam: { fn: housam, u: HOUSAM_UNIT, sh: -17.45, sx: 2.9, arm: 7.15, ft: [1.5, -1.05] },
    safadi: { fn: safadi, u: SAFADI_UNIT, sh: -15.2, sx: 2.95, arm: 7.2, ft: [1.25, -.8] },
    sami: { fn: sami, u: SAMI_UNIT, sh: -15.2, sx: 2.95, arm: 7.2, ft: [1.25, -.8] },
    robo: { fn: roboSafadi, u: ROBO_SAFADI_UNIT, sh: -15.8, sx: 3.55, arm: 7.3, ft: [1.3, -.9] },
    jester: { fn: jester, u: JF_UNIT, sh: -13.25, sx: 1.95, arm: 5.3, ft: [1.25, -.85] },
    sarah: { fn: sarah, u: SARAH_UNIT, sh: -22.25, sx: 3.05, arm: 9.3, ft: [1.65, -1.05] },
    drg: { fn: dr_g, u: DR_G_UNIT, sh: -23.3, sx: 4.05, arm: 9.9, ft: [1.9, -.9] },
    dragon: { fn: dragon, u: DRAGON_UNIT, beast: true, sc: .85 },
    neptune: { fn: neptune, u: NT_UNIT, beast: true, sc: .7 },
    pearl: { fn: pearl, u: PP_UNIT, beast: true, sc: .7 },
    clawd: { fn: clawd, u: CLAWD_UNIT, beast: true },
  };
  // Draw `who` with feet at screen (x, y); kpx = px per WORLD unit. o.dx side-steps (local units); o.spinX twirls any rig
  // (Alma and Jenna turn for real and show their backs; the others get a paper-flat turn).
  function put(who, x, y, kpx, o = {}) {
    const g = RIG[who], s = g.u * kpx * (g.sc ?? 1), { dx = 0, spinX, ...rest } = o;
    x += dx * s;
    if (spinX !== undefined && g.spin) rest.spin = spinX;
    if (spinX !== undefined && !g.spin) {
      const c = Math.cos(spinX), sc = Math.sign(c || 1) * Math.max(.14, Math.abs(c));
      X.save(); X.translate(x, 0); X.scale(sc, 1); X.translate(-x, 0);
      const A = g.fn(x, y, s, { t: T, ...rest }); X.restore(); return A;
    }
    return g.fn(x, y, s, { t: T, ...rest });
  }

  // One dance vocabulary for every rig: pose options for `move` at beat position b (a float), energy k (0..1).
  // Hands are placed by angle and reach from the shoulder, so the same move fits Alma's short arms and the twins' long ones.
  function groove(who, move, b, k = 1, i = 0) {
    const g = RIG[who];
    if (g.beast) return beast(who, move, b, k, i);
    const S = Math.sin, PI = Math.PI, hp = Math.abs(S(b * PI)), J = g.arm * .5;
    const Hd = (sd, ang, ext = 1) => [sd * (g.sx + Math.cos(ang) * g.arm * ext), g.sh - Math.sin(ang) * g.arm * ext];
    const face = { eyes: 'happy', mouth: 'grin', brows: 'up' };
    switch (move) {
      case 'bounce': return { ...face, mouth: hp > .6 ? 'open' : 'grin', jump: 1.5 * J * k * hp, sq: .1 * k * kick(frac(b), 0, 12) - .05 * k * hp, tilt: .07 * k * S(b * PI), hairSwing: .4 * k * S(b * PI),
        handL: Hd(-1, .15 + .95 * hp * k, .8), handR: Hd(1, .15 + .95 * hp * k, .8), handPoseL: 'fist', handPoseR: 'fist' };
      case 'disco': {
        const ph = frac(b / 2), u = ph < .5 ? easeOut(seg(ph, 0, .09)) : 1 - easeOut(seg(ph, .5, .59));
        return { ...face, eyes: 'open', mouth: u > .5 ? 'open' : 'grin', lookX: lerp(-.4, .7, u), lookY: lerp(.3, -.8, u), dy: .06 * g.arm * hp, lean: lerp(.08, -.08, u) * k, tilt: lerp(.06, -.1, u) * k,
          hairSwing: lerp(.4, -.4, u) * k, handR: mixPt([-g.sx * .7, g.sh + g.arm * .8], Hd(1, 1.02, 1), u), handPoseR: 'point', handL: Hd(-1, -1.05, .72), handPoseL: 'fist',
          footR: [g.ft[0] + .25 * u, g.ft[1] - .5 * (1 - u) * hp] };
      }
      case 'twirl': return { ...face, spinX: b * PI * k, hairSwing: .9 * k * S(b * PI), dy: .04 * g.arm, handL: Hd(-1, .12, 1), handR: Hd(1, .12, 1), handPoseL: 'palm', handPoseR: 'palm' };
      case 'floss': { const f = S(b * PI) * k; return { ...face, eyes: 'open', lookX: -f * .5, lean: -.09 * f, dy: .03 * g.arm, hairSwing: -.45 * f, dx: -.05 * g.arm * f,
        handL: [-.12 * g.arm + .55 * g.arm * f, g.sh + g.arm * .93], handR: [.12 * g.arm + .55 * g.arm * f, g.sh + g.arm * .93], handPoseL: 'fist', handPoseR: 'fist' }; }
      case 'robot': {
        const n = Math.floor(b), e = easeOut(seg(frac(b), 0, .16)), st = j => (((j % 2) + 2) % 2 ? 1 : -1), a = st(n - 1), c = st(n), v = lerp(a, c, e);
        const tgt = (sd, up) => [sd * (g.sx + g.arm * .5), g.sh - up * g.arm * .46];
        return { eyes: 'open', brows: 'normal', mouth: frac(b) < .5 ? 'flat' : 'smile', lookX: .6 * v, tilt: .1 * v * k, lean: .04 * v * k, dy: .03 * g.arm * (1 - e),
          handL: tgt(-1, -v * k), handR: tgt(1, v * k), handPoseL: 'palm', handPoseR: 'palm', hairSwing: .2 * v, breathe: false };
      }
      case 'wave': { const w = u => S(b * PI + u); return { ...face, eyes: 'closed', mouth: 'smile', tilt: .09 * w(0) * k, lean: .05 * w(.6) * k, hairSwing: .45 * w(.5) * k, dy: .04 * g.arm * hp,
        handL: Hd(-1, .55 * w(0) * k, 1), handR: Hd(1, .55 * w(PI) * k, 1), handPoseL: 'palm', handPoseR: 'palm' }; }
      case 'dragon': { const fl = Math.cos(b * PI * 2) * k; return { ...face, eyes: 'wide', mouth: frac(b) < .5 ? 'open' : 'grin', brows: 'angry', jump: 1.1 * J * k * hp, tilt: -.06 * fl, hairSwing: .3 * S(b * PI),
        handL: Hd(-1, .1 + .85 * fl, 1), handR: Hd(1, .1 + .85 * fl, 1), handPoseL: 'palm', handPoseR: 'palm' }; }
      case 'professor': {
        const n = Math.floor(b), e = easeOut(seg(frac(b), 0, .2)), st = j => (((j % 2) + 2) % 2 ? 1 : 0), v = lerp(st(n - 1), st(n), e), sw = 2 * v - 1;
        return { eyes: 'closed', brows: 'up', mouth: 'smirk', tilt: .09 * sw * k, lean: .04 * sw * k, dy: .05 * g.arm * hp, dx: .16 * g.arm * sw * k, hairSwing: .3 * sw,
          handR: mixPt(Hd(1, -.2, .6), Hd(1, 1.2, .95), v * k), handL: mixPt(Hd(-1, -.2, .6), Hd(-1, 1.2, .95), (1 - v) * k), handPoseL: 'point', handPoseR: 'point' };
      }
      case 'star': { const j = S(frac(b / 2) * PI), sq = kick(frac(b / 2), 0, 14) * .15; return { ...face, mouth: j > .5 ? 'open' : 'grin', jump: 3.2 * J * k * j, sq: sq - .06 * j,
        handL: mixPt(Hd(-1, -1.1, .8), Hd(-1, .8, 1), j), handR: mixPt(Hd(1, -1.1, .8), Hd(1, .8, 1), j), handPoseL: 'palm', handPoseR: 'palm',
        footL: mixPt([-g.ft[0], g.ft[1]], [-g.ft[0] - .25 * g.arm, g.ft[1] - .25], j), footR: mixPt(g.ft, [g.ft[0] + .25 * g.arm, g.ft[1] - .25], j), hairSwing: .15 * S(b * PI) }; }
      case 'cheer': return { ...face, mouth: 'open', jump: .7 * J * k * hp, handL: Hd(-1, 1.15 + .15 * S(b * PI + i), 1), handR: Hd(1, 1.15 - .15 * S(b * PI + i), 1), handPoseL: 'palm', handPoseR: 'palm', tilt: .06 * S(b * PI * .5 + i) };
      case 'clap': { const c = kick(frac(b), 0, 9); return { ...face, dy: .05 * g.arm * hp, tilt: .07 * S(b * PI * .5 + i), dx: .1 * g.arm * S(b * PI * .5 + i), hairSwing: .25 * S(b * PI * .5 + i),
        handL: [-.06 * g.arm - .3 * g.arm * (1 - c), g.sh + .32 * g.arm], handR: [.06 * g.arm + .3 * g.arm * (1 - c), g.sh + .32 * g.arm], handPoseL: 'palm', handPoseR: 'palm' }; }
      case 'watch': return { eyes: 'wide', brows: 'up', mouth: 'o', handL: Hd(-1, -1.2, .8), handR: Hd(1, -1.2, .8), dy: .03 * g.arm * hp };
    }
    return {};
  }
  // The dolphins, Dragon and Clawd dance their own way: every move is a bounce with attitude.
  function beast(who, move, b, k, i) {
    const S = Math.sin, PI = Math.PI, hp = Math.abs(S(b * PI)), big = move === 'star' || move === 'cheer' ? 1.6 : 1, sp = move === 'twirl' ? Math.cos(b * PI) : 1;
    if (who === 'dragon') return { wings: .45 + .55 * hp, flap: S(b * PI * 2), jump: 2.4 * k * hp * big, tailSwing: .9 * S(b * PI), headTilt: .12 * S(b * PI), lean: .07 * S(b * PI) * k, mouth: 'grin', eyes: 'happy' };
    if (who === 'neptune') return { sit: 1, dy: 1.7 * k * hp * big, headTilt: .25 * S(b * PI), wag: .5 * S(b * PI * 2), flipNear: .9 * S(b * PI), mouth: 'laugh', eyes: 'happy', turn: sp, crownLift: .5 * hp };
    if (who === 'pearl') return { sit: 1, dy: 1.4 * k * hp * big, headTilt: .2 * S(b * PI + 1), wag: .5 * S(b * PI * 2 + 1), flipNear: .8 * S(b * PI + 1), mouth: 'open', eyes: 'happy', turn: sp, crownLift: .5 * hp };
    return { jump: 1.3 * k * hp * big, aL: 1.1 * S(b * PI), aR: -1.1 * S(b * PI), eyes: 'happy', mouth: 'grin', sq: .08 * kick(frac(b), 0, 12), sx: sp };
  }
  // Alma, the star: the shared move plus her dance powers (rainbow floor ring, sparkles, music notes).
  const almaPose = (move, b, k = 1, power = 1) => ({ ...groove('alma', move, b, k), power, ...(power > .6 && move !== 'robot' && move !== 'professor' && move !== 'wave' ? { eyes: 'star' } : {}) });

  // ---------- text and particles ----------
  // Big title text drawn now (not as an overlay), so it moves with the current transform.
  function bigText(txt, x, y, size, fill, k = 1, rot = 0, o = {}) {
    if (k <= .01) return;
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(k, k);
    X.font = `${size}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
    if (o.alpha !== undefined) X.globalAlpha = o.alpha;
    X.lineWidth = size * .2; X.strokeStyle = o.stroke ?? C.ink; X.strokeText(txt, 0, 0);
    X.fillStyle = o.stroke ?? C.ink; X.fillText(txt, size * .05, size * .07);
    if (o.glow) { X.shadowColor = o.glow; X.shadowBlur = size * .35; }
    X.fillStyle = fill; X.fillText(txt, 0, 0);
    X.restore();
  }
  const slamText = (txt, x, y, size, fill, t, t0, life = 1.2, rot = 0, o = {}) => { const age = t - t0; if (age < 0 || age > life) return; overlay(() => bigText(txt, x, y, size, fill, slamK(t, t0) * (1 - easeIn(seg(age, life - .25, life))), rot, o)); };
  // A firework: n sparks fly out from (cx, cy), slow, fall and fade. Deterministic per seed.
  function burst(cx, cy, age, R, n, seed = 0, cols = FIRE) {
    if (age < 0 || age > 1.6) return;
    const fade = 1 - seg(age, .7, 1.6);
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU + hash(i + seed) * .3, sp = R * (.7 + .3 * hash(i * 3 + seed));
      const d = sp * easeOut(age / .9), x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d + 120 * age * age;
      const tx = cx + Math.cos(a) * d * .82, ty = cy + Math.sin(a) * d * .82 + 120 * age * age * .8, col = cols[(i + seed) % cols.length];
      line([[tx, ty], [x, y]], { stroke: rgba(col, .55 * fade), lwPx: 5 });
      circle(x, y, 7 * fade + 2, { fill: col, stroke: null, alpha: fade });
    }
    if (age < .18) circle(cx, cy, R * .35 * (1 - age / .18), { fill: rgba('#FFFFFF', .9), stroke: null });
  }
  // Fireworks that spell a word: each letter is a rocket that opens into a 5×7 dot glyph.
  const GLYPH = {
    A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'], L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
    M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'], N: ['10001', '11001', '10101', '10101', '10011', '10001', '10001'],
    I: ['01110', '00100', '00100', '00100', '00100', '00100', '01110'], E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
    9: ['01110', '10001', '10001', '01111', '00001', '00001', '01110'], '!': ['00100', '00100', '00100', '00100', '00100', '00000', '00100'],
  };
  function fireWord(word, cx, cy, cell, t, t0, stagger = .09, seed = 0, holdFor = 3.2) {
    const n = word.length, w = (n * 6 - 1) * cell;
    [...word].forEach((ch, li) => {
      const g = GLYPH[ch]; if (!g) return;
      const age = t - t0 - li * stagger; if (age < 0) return;
      const ox = cx - w / 2 + li * 6 * cell, col = FIRE[(li + seed) % FIRE.length], hold = 1 - seg(age, holdFor, holdFor + 1);
      if (hold <= 0) return;
      if (age < .35) { const u = age / .35, y = lerp(H + 40, cy, easeOut(u)); line([[ox + 2 * cell, y], [ox + 2 * cell, y + 90]], { stroke: rgba(col, .8), lwPx: 4 }); return; }
      const a2 = age - .35, spread = easeOut(seg(a2, 0, .35));
      g.forEach((row, r) => [...row].forEach((bit, c) => {
        if (bit !== '1') return;
        const tx = ox + c * cell, ty = cy - 3 * cell + r * cell, x = lerp(ox + 2 * cell, tx, spread), y = lerp(cy, ty, spread) + 18 * Math.max(0, a2 - holdFor + .8) ** 2;
        const tw = .75 + .25 * Math.sin(t * 22 + r * 3 + c * 5 + li);
        circle(x, y, cell * .34 * tw * hold + 1, { fill: col, stroke: null, alpha: hold });
        circle(x, y, cell * .16 * hold, { fill: '#FFFFFF', stroke: null, alpha: hold });
      }));
      if (a2 < .15) circle(ox + 2 * cell, cy, cell * 3 * (1 - a2 / .15), { fill: rgba('#FFFFFF', .8), stroke: null });
    });
  }
  // Confetti raining from t0 (screen space), deterministic.
  function confetti(t, t0, n = 90, seed = 3, cols = FIRE) {
    if (t < t0) return;
    for (let i = 0; i < n; i++) {
      const age = (t - t0 - hash(i + seed) * 1.2); if (age < 0) continue;
      const fall = 180 + 160 * hash(i * 5), x = hash(i * 7 + seed) * W + 60 * Math.sin(age * 2 + i), y = -40 + (fall * age) % (H + 120);
      X.save(); X.translate(x, y); X.rotate(age * (3 + 4 * hash(i)) + i);
      X.fillStyle = cols[i % cols.length]; X.fillRect(-11, -5, 22, 10 * Math.abs(Math.cos(age * 6 + i)) + 2);
      X.restore();
    }
  }
  // A confetti cannon blast from (x, y) toward angle a (screen space).
  function cannon(x, y, a, t, t0, n = 40, seed = 1) {
    const age = t - t0; if (age < 0 || age > 2.4) return;
    for (let i = 0; i < n; i++) {
      const aa = a + (hash(i + seed) - .5) * .7, v = 900 + 700 * hash(i * 3 + seed), d = v * (1 - Math.exp(-age * 2.4)) / 2.4;
      const px = x + Math.cos(aa) * d + 30 * Math.sin(age * 4 + i), py = y + Math.sin(aa) * d + 260 * age * age;
      X.save(); X.translate(px, py); X.rotate(age * 8 + i); X.globalAlpha = 1 - seg(age, 1.8, 2.4);
      X.fillStyle = FIRE[(i + seed) % FIRE.length]; X.fillRect(-10, -4, 20, 8 * Math.abs(Math.cos(age * 7 + i)) + 2); X.restore();
    }
  }
  // A ring of little shapes flying out from a point: 'star' | 'heart' | 'note'.
  function pop(kind, cx, cy, age, R, n = 10, seed = 0, cols = FIRE, size = 22) {
    if (age < 0 || age > 1) return;
    const u = easeOut(age), a0 = 1 - seg(age, .6, 1);
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU + hash(i + seed) * .6, d = R * u * (.6 + .4 * hash(i * 3 + seed)), x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d - 40 * u, col = cols[(i + seed) % cols.length], r = size * (1 - .4 * age);
      if (kind === 'star') shape(starPts(x, y, r, .45, 5, age * 4 + i), { fill: col, stroke: C.ink, lwPx: 2.5, alpha: a0 });
      else if (kind === 'heart') heart(x, y, r, col, a0);
      else note(x, y, r * 2.2, col, a0, i);
    }
  }
  function heart(x, y, r, col, alpha = 1) {
    shape([[x, y + r], [x - r * 1.1, y - r * .05], [x - r * .9, y - r * .8], [x - r * .35, y - r * .95], [x, y - r * .45], [x + r * .35, y - r * .95], [x + r * .9, y - r * .8], [x + r * 1.1, y - r * .05]], { fill: col, stroke: C.ink, lwPx: 2.5, smooth: .5, alpha });
  }
  function note(x, y, size, col, alpha = 1, i = 0) {
    X.save(); X.globalAlpha *= alpha; X.font = `${size}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
    X.lineWidth = size * .14; X.strokeStyle = C.ink; X.strokeText(['♪', '♫', '♬'][i % 3], x, y); X.fillStyle = col; X.fillText(['♪', '♫', '♬'][i % 3], x, y); X.restore();
  }
  // A balloon in screen px: (x, y) is the knot, r the radius; txt is painted on it.
  function balloon(x, y, r, col, t, txt, seed = 0) {
    const sw = 6 * Math.sin(t * 1.7 + seed);
    line([[x, y], [x + sw * .4, y + r * .9], [x - sw, y + r * 1.8], [x + sw * .5, y + r * 2.6]], { stroke: 'rgba(255,255,255,.8)', lwPx: 2.5, smooth: true });
    X.save(); X.translate(x, y); X.rotate(.05 * Math.sin(t * 1.3 + seed));
    shape([[-r * .12, 0], [r * .12, 0], [0, -r * .16]], { fill: col, stroke: C.ink, lwPx: 2.5 });
    ellipse(0, -r * 1.15, r * .86, r, { fill: col, stroke: C.ink, lwPx: 3.5 });
    ellipse(-r * .32, -r * 1.5, r * .16, r * .28, { fill: 'rgba(255,255,255,.6)', stroke: null, rot: .5 });
    if (txt) bigText(txt, 0, -r * 1.1, r * 1.05, C.white, 1, 0, { stroke: C.ink });
    X.restore();
  }
  // The birthday cake: three tiers in Alma's colours, a rainbow on the front and nine candles. lit (0..1) dims the flames.
  function cake(x, y, s, t, lit = 1, candles = 9) {     // (x, y) = bottom centre, s = px per local unit (the cake is 10 wide)
    X.save(); X.translate(x, y); X.scale(s, s);
    const lw = 2.2 / s;
    shape(rectPts(-6.2, -.5, 12.4, .9), { fill: '#FFFDF8', stroke: C.ink, lw, smooth: .3 });
    const tier = (w, h, y0, col, drip) => {
      shape(rectPts(-w / 2, y0 - h, w, h), { fill: col, stroke: C.ink, lw, smooth: .15 });
      shape([...Array(9)].map((_, i) => [-w / 2 + i * w / 8, y0 - h + (i % 2 ? .8 : .3)]).concat([[w / 2, y0 - h], [-w / 2, y0 - h]]), { fill: drip, stroke: C.ink, lw, smooth: .5 });
    };
    tier(10, 3, -.5, C.purple, '#FFFDF8'); tier(7.4, 2.6, -3.5, '#FFFDF8', C.pink); tier(4.8, 2.3, -6.1, C.lilac, '#FFFDF8');
    [C.purple, C.lilac, C.sage].forEach((c, i) => { const r = 1.05 - i * .3, a = []; for (let j = 0; j <= 14; j++) { const an = Math.PI + j / 14 * Math.PI; a.push([Math.cos(an) * r, -3.7 + Math.sin(an) * r]); } line(a, { stroke: c, lw: .28 }); });
    for (let i = 0; i < 6; i++) circle(-4.2 + i * 1.68, -1.6, .28, { fill: FIRE[i % FIRE.length], stroke: C.ink, lw: lw * .6 });
    for (let i = 0; i < candles; i++) {
      const cx = -2.0 + i * 4.0 / Math.max(1, candles - 1), top = -8.4 - 1.0 - (i % 2) * .3;
      shape(rectPts(cx - .13, top, .26, 1.0 + (i % 2) * .3), { fill: NINE[i % 9], stroke: C.ink, lw: lw * .5 });
      if (lit > .02) { const f = (.36 + .08 * Math.sin(t * 19 + i * 2)) * lit;
        circle(cx, top - .3, .9 * lit, { fill: radGrad(cx, top - .3, 0, .9, [[0, 'rgba(255,230,120,.55)'], [1, 'rgba(255,230,120,0)']]), stroke: null });
        ellipse(cx, top - .3, .17, f, { fill: C.gold, stroke: null }); ellipse(cx, top - .22, .07, f * .5, { fill: '#FFFFFF', stroke: null }); }
      else { const sm = frac(t * .6 + i * .13); line([[cx, top - .1], [cx + .2 * Math.sin(sm * 9), top - .1 - 1.6 * sm]], { stroke: rgba('#FFFFFF', .5 * (1 - sm)), lw: .12 }); }
    }
    X.restore();
  }

  // ---------- HUD: the DANCE POWER meter (nine stars) and the number slam ----------
  function meter(t, o = {}) {
    const n = powerAt(t), last = HIT[n - 1] ?? -9, k = o.k ?? 1; if (k <= .01) return;
    overlay(() => {
      X.save(); X.globalAlpha = k; X.translate(o.x ?? 48, (o.y ?? 36) - (1 - k) * 60); X.scale(o.s ?? 1, o.s ?? 1);
      X.fillStyle = 'rgba(24,10,48,.8)'; X.beginPath(); X.roundRect(0, 0, 492, 118, 30); X.fill();
      X.strokeStyle = n === 9 ? C.gold : 'rgba(255,255,255,.4)'; X.lineWidth = 4; X.stroke();
      X.font = `600 22px ${FONT_TALK}`; X.fillStyle = 'rgba(255,255,255,.85)'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText('DANCE POWER', 28, 28);
      X.font = `30px ${FONT_SFX}`; X.textAlign = 'right'; X.fillStyle = n === 9 ? C.gold : C.white; X.fillText(`${n} / 9`, 464, 30);
      for (let i = 0; i < 9; i++) {
        const lit = i < n, age = t - HIT[i], p = lit ? 1 + .9 * kickK(t, HIT[i], 5) : 1, cx = 46 + i * 50, cy = 76;
        const col = n === 9 ? `hsl(${(t * 220 + i * 40) % 360},95%,62%)` : NINE[i];
        X.save(); X.translate(cx, cy); X.scale(p, p); X.rotate(lit ? .5 * kickK(t, HIT[i], 4) : 0);
        if (lit && age < .8) { X.shadowColor = '#FFFFFF'; X.shadowBlur = 30 * (1 - age / .8); }
        shape(starPts(0, 0, 21, .5, 5), { fill: lit ? col : 'rgba(255,255,255,.14)', stroke: lit ? C.ink : 'rgba(255,255,255,.35)', lwPx: 3 });
        if (lit) circle(-6, -6, 4, { fill: 'rgba(255,255,255,.75)', stroke: null });
        X.restore();
      }
      X.restore();
    });
    void last;
  }
  // On each hit: the number slams in huge, the move's name under it, and a white flash.
  function moveSlam(t, o = {}) {
    for (let i = 0; i < 8; i++) {
      const g = HIT[i], age = t - g; if (age < 0 || age > 1.15) continue;
      const out = 1 - easeIn(seg(age, .9, 1.15)), x = o.x ?? W / 2, y = o.y ?? 300;
      overlay(() => {
        bigText(WORDS[i], x, y, 230, NINE[i], slamK(t, g) * out, -.06 + .12 * hash(i), { glow: '#FFFFFF' });
        bigText(NAMES[i], x, y + 180, 104, C.white, slamK(t, g + .1) * out, .03);
      });
      flash(.6 * kickK(t, g, 9));
    }
  }
  // The move card in the lower left while Alma teaches: MOVE n · THE NAME, with the partner's name tag.
  function moveCard(n, who, t, t0, t1) {
    const k = backOut(seg(t, t0, t0 + .3)) * (1 - easeIn(seg(t, t1 - .15, t1))); if (k <= .01) return;
    overlay(() => {
      X.save(); X.translate(70 - (1 - k) * 700, H - 300); X.rotate(-.03);
      X.fillStyle = 'rgba(24,10,48,.82)'; X.beginPath(); X.roundRect(0, 0, 560, 128, 26); X.fill(); X.strokeStyle = NINE[n]; X.lineWidth = 6; X.stroke();
      X.font = `600 26px ${FONT_TALK}`; X.fillStyle = 'rgba(255,255,255,.85)'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillText(`MOVE ${n + 1} OF 9  ·  WITH ${who}`, 30, 34);
      X.font = `66px ${FONT_SFX}`; X.lineJoin = 'round'; X.lineWidth = 12; X.strokeStyle = C.ink; X.strokeText(NAMES[n], 28, 86); X.fillStyle = NINE[n]; X.fillText(NAMES[n], 28, 86);
      X.restore();
    });
  }

  return { BPM, OFF, BEAT, BARLEN, B, bpos, hop, beatK, CUT, HIT, powerAt, MOVES, NAMES, WORDS, C, FIRE, NINE, kickK, on, slamK, shake, RIG, put, groove, almaPose,
    bigText, slamText, burst, fireWord, confetti, cannon, pop, heart, note, balloon, cake, meter, moveSlam, moveCard };
})();
