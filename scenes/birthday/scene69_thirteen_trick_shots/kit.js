// scenes/birthday/scene69_thirteen_trick_shots/kit.js: the shared kit for "Thirteen Trick Shots": the beat grid, the goal times,
// Housam's growing moustache, the 13-shot counter, the ball, the floodlit stadium, slam text, fireworks and confetti, the cake.
// Everything is a pure function of its arguments.
const TT = (() => {
  const F = LOCATIONS.soccer_field;
  const BPM = 125, OFF = .095, BEAT = 60 / BPM, BARLEN = 4 * BEAT, BAR = n => OFF + n * BARLEN;
  const bpos = t => (t - OFF) / BEAT, hop = (t, ph = 0) => Math.abs(Math.sin(Math.PI * (bpos(t) + ph)));
  const beatK = (t, d = 7) => Math.exp(-frac(bpos(t)) * BEAT * d);             // 1 on every beat, decaying
  const C = { navy: '#0E1636', blue: '#2E5BFF', gold: '#FFD23F', magenta: '#FF3D9A', cyan: '#3DE8FF', lime: '#8CFF5A', orange: '#FF8A2B', white: '#FFFDF8', ink: '#1A1626', red: '#FF3B3B' };
  const FIRE = [C.gold, C.magenta, C.cyan, C.lime, C.orange, '#B98CFF'];

  // The thirteen goals: when the ball hits the net (the shouted number), and when the counter ticks.
  const GOALS = [23.78, 27.36, 31.42, 71.78, 77.08, 80.88, 83.52, 84.72, 88.34, 148.34, 150.92, 154.82, 160.25];
  const SPROUT = .6;                                                            // the moustache grows this long after each goal (in the close-up)
  const goalsAt = t => GOALS.filter(g => t >= g).length;
  const MO = 188.7;                                                             // the moustache appears in the final shot, all at once

  // ---------- helpers ----------
  const items = () => [];
  const drawSorted = (P, list) => list.sort((a, b) => P.depth(b.z) - P.depth(a.z)).forEach(it => it.draw());
  const kickK = (t, t0, d = 7) => (t < t0 ? 0 : Math.exp(-(t - t0) * d));
  const on = (t, a, b, f = .25) => ease(seg(t, a, a + f)) * (1 - ease(seg(t, b - f, b)));
  const slamK = (t, t0) => (t < t0 ? 0 : backOut(seg(t, t0, t0 + .22)));
  const RIG = { danny: [danny, DANNY_UNIT], housam: [housam, HOUSAM_UNIT], alma: [alma, ALMA_UNIT], jenna: [jenna, JENNA_UNIT], safadi: [safadi, SAFADI_UNIT],
    sami: [sami, SAMI_UNIT], jester: [jester, JF_UNIT], robo: [roboSafadi, ROBO_SAFADI_UNIT], neptune: [neptune, NT_UNIT], dragon: [dragon, DRAGON_UNIT],
    clawd: [clawd, CLAWD_UNIT], pearl: [pearl, PP_UNIT], sarah: [sarah, SARAH_UNIT] };
  const put = (who, x, y, kpx, o = {}) => RIG[who][0](x, y, RIG[who][1] * kpx, { t: o.t ?? 0, ...o });
  const shake = (t, hits) => hits.reduce((a, [t0, amt, d = 6]) => { const [x, y] = shakeXY(t, amt * kickK(t, t0, d)); return [a[0] + x, a[1] + y]; }, [0, 0]);

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
  // Fireworks that spell a word: each letter is a ring of sparks laid out on the letter's strokes.
  const GLYPH = {        // 5×7 dot fonts, rows top to bottom
    T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'], E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
    N: ['10001', '11001', '10101', '10101', '10011', '10001', '10001'], A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
    G: ['01111', '10000', '10000', '10111', '10001', '10001', '01110'], R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
    1: ['00100', '01100', '00100', '00100', '00100', '00100', '01110'], 3: ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  };
  function fireWord(word, cx, cy, cell, t, t0, stagger = .09, seed = 0) {
    const n = word.length, w = (n * 6 - 1) * cell;
    [...word].forEach((ch, li) => {
      const g = GLYPH[ch]; if (!g) return;
      const age = t - t0 - li * stagger; if (age < 0) return;
      const ox = cx - w / 2 + li * 6 * cell, col = FIRE[(li + seed) % FIRE.length], hold = 1 - seg(age, 3.2, 4.2);
      if (hold <= 0) return;
      // the rocket trail up to the letter
      if (age < .35) { const u = age / .35, y = lerp(H + 40, cy, easeOut(u)); line([[ox + 2 * cell, y], [ox + 2 * cell, y + 90]], { stroke: rgba(col, .8), lwPx: 4 }); return; }
      const a2 = age - .35, spread = easeOut(seg(a2, 0, .35));
      g.forEach((row, r) => [...row].forEach((b, c) => {
        if (b !== '1') return;
        const tx = ox + c * cell, ty = cy - 3 * cell + r * cell, x = lerp(ox + 2 * cell, tx, spread), y = lerp(cy, ty, spread) + 18 * Math.max(0, a2 - 2.4) ** 2;
        const tw = .75 + .25 * Math.sin(t * 22 + r * 3 + c * 5 + li);
        circle(x, y, cell * .34 * tw * hold + 1, { fill: col, stroke: null, alpha: hold });
        circle(x, y, cell * .16 * hold, { fill: '#FFFFFF', stroke: null, alpha: hold });
      }));
      if (a2 < .15) circle(ox + 2 * cell, cy, cell * 3 * (1 - a2 / .15), { fill: rgba('#FFFFFF', .8), stroke: null });
    });
  }
  // Confetti raining from t0 (screen space), deterministic.
  function confetti(t, t0, n = 90, seed = 3, t1 = Infinity) {
    if (t < t0 || t > t1 + 4) return;
    for (let i = 0; i < n; i++) {
      const age = t - t0 - hash(i + seed) * 1.2 - Math.floor(hash(i * 11 + seed) * 3) * 1.5 * (t1 < Infinity ? 1 : 0); if (age < 0) continue;
      const x = hash(i * 7 + seed) * W + 60 * Math.sin(age * 2 + i), y = -40 + (180 + 160 * hash(i * 5)) * age;
      if (y > H + 40) continue;
      X.save(); X.translate(x, y); X.rotate(age * (3 + 4 * hash(i)) + i);
      X.fillStyle = FIRE[i % FIRE.length]; X.fillRect(-11, -5, 22, 10 * Math.abs(Math.cos(age * 6 + i)) + 2);
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
  function cake(x, y, s, t, candles = 13) {     // (x, y) = bottom centre, s = px per local unit (the cake is 10 wide)
    X.save(); X.translate(x, y); X.scale(s, s);
    const lw = 2.2 / s;
    const tier = (w, h, y0, col, drip) => {
      shape(rectPts(-w / 2, y0 - h, w, h), { fill: col, stroke: PAL.ink, lw });
      shape([...Array(9)].map((_, i) => [-w / 2 + i * w / 8, y0 - h + (i % 2 ? .7 : .3)]).concat([[w / 2, y0 - h], [-w / 2, y0 - h]]), { fill: drip, stroke: PAL.ink, lw });
    };
    tier(10, 3, 0, '#4E7BFF', C.white); tier(7.4, 2.6, -3, '#FFFFFF', '#4E7BFF'); tier(4.8, 2.3, -5.6, '#8BD3FF', C.white);
    // a little soccer ball and the 13 on the front
    X.font = `2px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = C.gold; X.lineWidth = .35; X.strokeStyle = PAL.ink; X.strokeText('13', 0, -1.4); X.fillText('13', 0, -1.4);
    for (let i = 0; i < candles; i++) {
      const cx = -2.1 + i * 4.2 / Math.max(1, candles - 1), top = -7.9 - .9 - (i % 2) * .25;
      shape(rectPts(cx - .1, top, .2, .9 + (i % 2) * .25), { fill: FIRE[i % FIRE.length], stroke: PAL.ink, lw: lw * .5 });
      const f = .3 + .07 * Math.sin(t * 19 + i * 2);
      ellipse(cx, top - .28, .14, f, { fill: C.gold, stroke: null }); ellipse(cx, top - .2, .06, f * .5, { fill: '#FFFFFF', stroke: null });
    }
    X.restore();
  }

  // ---------- Housam's moustache ----------
  // Only in the final shot: it pops on at MO, full handlebar (stage 13) plus the majestic spurt (`extra`).
  // Placed from his face anchors, so it follows turn, tilt and jump: centred between the nose and the mouth.
  function stageAt(t) {
    return t < MO ? 0 : 13 * backOut(seg(t, MO, MO + .45));
  }
  function moustache(A, s, stage, t, extra = 0) {
    if (stage <= .02 && extra <= 0) return;
    const eyeW = Math.hypot(A.eyeR[0] - A.eyeL[0], A.eyeR[1] - A.eyeL[1]);         // ~face width cue (shrinks as he turns)
    const ang = Math.atan2(A.eyeR[1] - A.eyeL[1], A.eyeR[0] - A.eyeL[0]);
    const mx = A.mouth[0], my = A.mouth[1];
    const u = clamp(stage / 13), maj = u + extra;                                     // growth 0 → 1 (→ 2 with the spurt)
    const span = eyeW * (.3 + .55 * u + .35 * extra), thick = s * (.3 + .7 * u + .45 * extra), curl = seg(stage, 8, 13) + extra;
    X.save(); X.translate(mx, my - s * (.55 + .25 * u)); X.rotate(ang);
    if (stage < 2.5 && extra <= 0) {                                                  // the first goals: fuzz
      const n = Math.round(6 + stage * 8);
      for (let i = 0; i < n; i++) {
        const fx = (hash(i * 3.1) - .5) * span * 2, fy = (hash(i * 7.7) - .5) * thick * .9 + Math.abs(fx) * .06;
        circle(fx, fy, s * (.1 + .06 * hash(i)), { fill: '#2B2027', stroke: null, alpha: .55 + .35 * clamp(stage / 2.5) });
      }
      X.restore(); return;
    }
    // each half: a tapered wedge from the centre out to a drooping tip, then (from stage 8) a handlebar curl rolling up and in
    const L = span, droop = thick * .55, lw = Math.max(2, s * .16), N = 16;
    const half = sgn => {
      const top = [], bot = [];
      for (let i = 0; i <= N; i++) {
        const q = i / N, x = sgn * q * L, mid = droop * q * q - thick * .1 * Math.sin(q * Math.PI);
        const hw = thick * .5 * (1 - q) ** .7 + thick * .05;
        top.push([x, mid - hw]); bot.push([x, mid + hw * .85]);
      }
      return [...top, ...bot.reverse()];
    };
    const tip = sgn => [sgn * L, droop];
    const spiral = sgn => {                                                       // the curl: out, up and back in, shrinking
      const r0 = thick * (.5 + .45 * Math.min(curl, 2)), [tx, ty] = tip(sgn), cy = ty - r0, sweep = Math.PI * (1.1 + .6 * Math.min(curl, 1.5)), pts = [];
      for (let i = 0; i <= 24; i++) { const q = i / 24, th = Math.PI / 2 - q * sweep, r = r0 * (1 - .55 * q); pts.push([tx + sgn * r * Math.cos(th), cy + r * Math.sin(th) + r0 * .55 * q * 0]); }
      return pts;
    };
    for (const sg of [-1, 1]) {
      if (curl > .05) {
        const pts = spiral(sg), k = Math.min(curl, 1.6);
        for (let i = 0; i < pts.length - 1; i++) {
          const w = thick * (.42 - .3 * i / pts.length) * Math.min(1, k * 1.3);
          line([pts[i], pts[i + 1]], { stroke: PAL.ink, lwPx: w + lw * 1.6 });
        }
        for (let i = 0; i < pts.length - 1; i++) {
          const w = thick * (.42 - .3 * i / pts.length) * Math.min(1, k * 1.3);
          line([pts[i], pts[i + 1]], { stroke: '#2B2027', lwPx: w });
        }
      }
      shape(half(sg), { fill: '#2B2027', stroke: PAL.ink, lwPx: lw, smooth: true });
    }
    for (const sg of [-1, 1]) line([[sg * span * .16, -thick * .22], [sg * span * .55, droop * .25 - thick * .12]], { stroke: 'rgba(255,255,255,.28)', lwPx: Math.max(1.5, s * .12), smooth: true });
    X.restore();
  }
  // Sparkle when it pops on: a ring of little stars around the lip.
  function sproutFx(A, s, t) {
    for (const g of [MO]) {
      const age = t - g; if (age < 0 || age > .8) continue;
      for (let i = 0; i < 8; i++) {
        const a = i / 8 * TAU, d = s * (5 + 7 * easeOut(age / .6));
        shape(starPts(A.mouth[0] + Math.cos(a) * d, A.mouth[1] - s * .6 + Math.sin(a) * d * .7, s * .7 * (1 - age / .6), .45, 4), { fill: C.gold, stroke: null });
      }
    }
  }
  // Draw Housam with his moustache (and its sprout sparkle).
  function hou(x, y, s, o, t) {
    const A = housam(x, y, s, { t, ...o });
    moustache(A, s, stageAt(t), t, o.extra ?? backOut(seg(t, MO + .25, MO + .9)));
    sproutFx(A, s, t);
    return A;
  }

  // ---------- the ball ----------
  const BR = 11;                                                                    // ball radius, world units
  const ball = (P, x, y, z, spin = 0) => { const [sx, sy, k] = P.p(x, y, z); housamBall(sx, sy, BR * k / 1.35, { spin }); return [sx, sy, k]; };
  // A world flight a → b over [t0, t1] with lift; `curve` bends it sideways (x) mid-flight.
  function flight(t, t0, t1, a, b, apex = 0, curve = 0) {
    const u = clamp((t - t0) / (t1 - t0));
    return [lerp(a[0], b[0], u) + 4 * curve * u * (1 - u), lerp(a[1], b[1], u) + 4 * apex * u * (1 - u), lerp(a[2], b[2], u)];
  }
  // The ball's motion trail: a few fading ghosts along the same flight.
  function trail(P, t, f, n = 6, dt = .025) {
    for (let i = n; i >= 1; i--) { const p = f(t - i * dt); if (!p) continue; const [sx, sy, k] = P.p(...p); circle(sx, sy, BR * k * (1 - i / (n + 2)), { fill: rgba('#FFFFFF', .22 * (1 - i / n)), stroke: null }); }
  }

  // A keyed path: keys [t, x, y, d, apex] (apex = extra height mid-segment, on the segment that ENDS at that key); linear in time.
  function track(t, keys) {
    if (t <= keys[0][0]) return keys[0].slice(1, 4);
    for (let i = 1; i < keys.length; i++) {
      const a = keys[i - 1], b = keys[i];
      if (t < b[0]) { const u = (t - a[0]) / (b[0] - a[0]); return [lerp(a[1], b[1], u), lerp(a[2], b[2], u) + 4 * (b[4] || 0) * u * (1 - u), lerp(a[3], b[3], u)]; }
    }
    return keys[keys.length - 1].slice(1, 4);
  }

  // ---------- the stadium ----------
  // night 0 = afternoon, 1 = floodlit night. The sky and far set darken; the floodlights bloom; the cast stays bright.
  function stadiumBack(P, t, o, night = 0) {
    F.back(P, t, o);
    if (night > 0) {
      X.save(); X.globalAlpha = .62 * night; X.fillStyle = linGrad(0, 0, 0, H, [[0, '#0A0F2E'], [.45, '#1A1A4A'], [1, '#0C1A20']]); X.fillRect(0, 0, W, H); X.restore();
      // stars
      for (let i = 0; i < 60; i++) { const sy = hash(i + 50) * (P.p(0, 0, 1e5)[1] - 40); if (sy < 0) continue; circle(hash(i) * W, sy, 1.5 + 1.5 * hash(i + 9), { fill: '#FFF4D0', stroke: null, alpha: night * (.4 + .4 * Math.sin(t * 3 + i)) }); }
      // floodlight blooms on the four poles
      for (const [x, z] of [[-4700, 1500], [-4700, 7500], [3800, 1500], [3800, 7500]]) {
        if (!P.inside?.(z) && P.depth(z) < 20) continue;
        const [sx, sy, k] = P.p(x, 1800, z); if (sy < -300 || sy > H) continue;
        const r = Math.max(60, 2600 * k);
        X.save(); X.globalAlpha = night * (.85 + .15 * beatK(t, 4)); X.fillStyle = radGrad(sx, sy, 0, r, [[0, 'rgba(255,255,240,.95)'], [.2, 'rgba(255,250,220,.45)'], [1, 'rgba(255,250,220,0)']]); X.fillRect(sx - r, sy - r, 2 * r, 2 * r); X.restore();
      }
      // pools of light on the turf
      X.save(); X.globalAlpha = .16 * night; X.globalCompositeOperation = 'lighter'; X.fillStyle = radGrad(W / 2, H * .8, 0, W * .7, [[0, '#FFFFE8'], [1, 'rgba(255,255,232,0)']]); X.fillRect(0, 0, W, H); X.restore();
    }
  }
  // Light beams sweeping from below (party), screen space.
  function beams(t, k = 1, cols = [C.cyan, C.magenta, C.gold, C.lime]) {
    if (k <= 0) return;
    X.save(); X.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 6; i++) {
      const bx = W * (i + .5) / 6, a = -Math.PI / 2 + .55 * Math.sin(t * 1.3 + i * 1.7);
      X.globalAlpha = .16 * k; X.fillStyle = cols[i % cols.length];
      X.beginPath(); X.moveTo(bx, H + 20); X.lineTo(bx + Math.cos(a - .07) * 2200, H + Math.sin(a - .07) * 2200); X.lineTo(bx + Math.cos(a + .07) * 2200, H + Math.sin(a + .07) * 2200); X.fill();
    }
    X.restore();
  }

  // ---------- HUD: the 13-shot counter and the GOAL slam ----------
  function counter(t, o = {}) {
    const n = goalsAt(t), last = GOALS[n - 1] ?? -9, pop = 1 + .45 * kickK(t, last, 5), k = o.k ?? 1;
    if (k <= .01) return;
    overlay(() => {
      X.save(); X.globalAlpha = k; X.translate(o.x ?? 190, o.y ?? 110);
      X.fillStyle = 'rgba(10,14,40,.78)'; X.beginPath(); X.roundRect(-150, -62, 300, 124, 26); X.fill();
      X.strokeStyle = n === 13 ? C.gold : 'rgba(255,255,255,.35)'; X.lineWidth = 4; X.stroke();
      X.font = `600 22px ${FONT_TALK}`; X.fillStyle = 'rgba(255,255,255,.8)'; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillText('TRICK SHOTS', 0, -36);
      X.restore();
      X.save(); X.globalAlpha = k; X.translate(o.x ?? 190, (o.y ?? 110) + 14); X.scale(pop, pop);
      X.font = `68px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
      X.lineWidth = 12; X.strokeStyle = '#0A0E28'; X.strokeText(`${n}/13`, 0, 0);
      if (kickK(t, last, 3) > .05) { X.shadowColor = C.gold; X.shadowBlur = 30 * kickK(t, last, 3); }
      X.fillStyle = n === 13 ? C.gold : C.white; X.fillText(`${n}/13`, 0, 0);
      X.restore();
    });
  }
  const WORDS = ['ONE!', 'TWO!', 'THREE!', 'FOUR!', 'FIVE!', 'SIX!', 'SEVEN!', 'EIGHT!', 'NINE!', 'TEN!', 'ELEVEN!', 'TWELVE!', 'THIRTEEN!'];
  // On each goal: the number slams in huge, GOAL! under it, and a white flash.
  function goalSlam(t, o = {}) {
    for (let i = 0; i < GOALS.length; i++) {
      const g = GOALS[i], age = t - g; if (age < 0 || age > 1.3) continue;
      const k = slamK(t, g) * (1 - easeIn(seg(age, 1.0, 1.3)));
      overlay(() => {
        bigText(WORDS[i], o.x ?? W / 2, o.y ?? 330, 190, FIRE[i % FIRE.length], k, -.06 + .12 * hash(i), { glow: '#FFFFFF' });
        bigText('GOAL!', o.x ?? W / 2, (o.y ?? 330) + 170, 110, C.white, slamK(t, g + .12) * (1 - easeIn(seg(age, 1.0, 1.3))), .04);
      });
      flash(.55 * kickK(t, g, 9));
    }
  }
  // Net ripple: rings spreading from the point the ball hit (screen space).
  function ripple(x, y, k, t, t0) {
    const age = t - t0; if (age < 0 || age > .7) return;
    for (let i = 0; i < 3; i++) { const a = age - i * .08; if (a < 0) continue; ellipse(x, y, 200 * k * a, 120 * k * a, { fill: null, stroke: rgba('#FFFFFF', .7 * (1 - a / .7)), lwPx: 4 }); }
  }

  return { F, BPM, OFF, BEAT, BARLEN, BAR, bpos, hop, beatK, C, FIRE, GOALS, SPROUT, goalsAt, MO, items, drawSorted, kickK, on, slamK, RIG, put, shake,
    bigText, track, burst, fireWord, confetti, cannon, cake, stageAt, moustache, sproutFx, hou, BR, ball, flight, trail, stadiumBack, beams, counter, WORDS, goalSlam, ripple };
})();
