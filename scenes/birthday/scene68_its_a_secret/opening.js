// scenes/birthday/scene68_its_a_secret/opening.js: the first four real shots of "It's a Secret!" (0–31.85 s).
//   launch       0–8.33    the candle fuse, 3-2-1, BOOM, DANNY · LEVEL 7, LET'S GO, whip pan to the field
//   hideTheCake  8.33–16.31 Danny dribbles at the lens; behind him the cast smuggles the party across the pitch and
//                           freezes like statues every time he glances back
//   nearMiss     16.31–24.0 "Allow me to EXPLAIN—" BONK · SHH ×4 · Neptune blasts the banner sky-high · "Hey! What's going
//                           on?" · the whole cast, hands behind backs: "NOTHING!"
//   warp         24.0–31.85 Danny's laptop, Clawd pops out: PLAYER 1, LOADING LEVEL 7, then the neon block tunnel
// scene.js swaps these in for the storyboard cards by name (SECRET_SHOTS). Every shot is a pure function of t.
const SECRET_SHOTS = (() => {
  const F = LOCATIONS.soccer_field;
  const C = { plum: '#2A0E3D', magenta: '#FF3D9A', gold: '#FFD23F', cyan: '#3DE8FF', lime: '#8CFF5A', orange: '#FF8A2B', white: '#FFFDF8', ink: '#2A1622' };
  const FIRE = [C.gold, C.magenta, C.cyan, C.lime, C.orange, '#B98CFF'];

  // ---------- little helpers ----------
  const items = () => [];
  const drawSorted = (P, list) => list.sort((a, b) => P.depth(b.z) - P.depth(a.z)).forEach(it => it.draw());
  const kickK = (t, t0, d = 7) => (t < t0 ? 0 : Math.exp(-(t - t0) * d));
  const on = (t, a, b, f = .25) => ease(seg(t, a, a + f)) * (1 - ease(seg(t, b - f, b)));
  // Big title text drawn right now (not as an overlay), so it moves with whatever transform the shot has set.
  function bigText(txt, x, y, size, fill, k = 1, rot = 0, o = {}) {
    if (k <= .01) return;
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(k, k);
    X.font = `${size}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
    X.lineWidth = size * .2; X.strokeStyle = o.stroke ?? C.ink; X.strokeText(txt, 0, 0);
    X.fillStyle = C.ink; X.fillText(txt, size * .05, size * .07);
    if (o.glow) { X.shadowColor = o.glow; X.shadowBlur = size * .35; }
    X.fillStyle = fill; X.fillText(txt, 0, 0);
    X.restore();
  }
  const slamK = (t, t0) => (t < t0 ? 0 : backOut(seg(t, t0, t0 + .22)));   // 0 → overshoot → 1
  // A firework: n sparks fly out from (cx, cy), slow down, fall and fade. Deterministic per seed.
  function burst(cx, cy, age, R, n, seed = 0, cols = FIRE) {
    if (age < 0 || age > 1.6) return;
    const life = 1.6, fade = 1 - seg(age, .7, life);
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU + hash(i + seed) * .3, sp = R * (.7 + .3 * hash(i * 3 + seed));
      const d = sp * easeOut(age / .9), x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d + 120 * age * age;
      const tx = cx + Math.cos(a) * d * .82, ty = cy + Math.sin(a) * d * .82 + 120 * age * age * .8;
      const col = cols[(i + seed) % cols.length];
      line([[tx, ty], [x, y]], { stroke: rgba(col, .55 * fade), lwPx: 5 });
      circle(x, y, 7 * fade + 2, { fill: col, stroke: null, alpha: fade });
    }
    if (age < .18) circle(cx, cy, R * .35 * (1 - age / .18), { fill: rgba('#FFFFFF', .9), stroke: null });
  }
  // Confetti raining from t0 (screen space). n pieces, deterministic.
  function confetti(t, t0, n = 90, seed = 3) {
    if (t < t0) return;
    for (let i = 0; i < n; i++) {
      const age = t - t0 - hash(i + seed) * 1.2; if (age < 0) continue;
      const x = hash(i * 7 + seed) * W + 60 * Math.sin(age * 2 + i), y = -40 + (180 + 160 * hash(i * 5)) * age;
      if (y > H + 40) continue;
      X.save(); X.translate(x, y); X.rotate(age * (3 + 4 * hash(i)) + i);
      X.fillStyle = FIRE[i % FIRE.length]; X.fillRect(-11, -5, 22, 10 * Math.abs(Math.cos(age * 6 + i)) + 2);
      X.restore();
    }
  }
  // Props, drawn in screen space with s = px per local unit.
  function cake(x, y, s, t) {            // (x, y) = bottom centre
    X.save(); X.translate(x, y); X.scale(s, s);
    const lw = 2.2 / s;
    const tier = (w, h, y0, col, drip) => {
      shape(rectPts(-w / 2, y0 - h, w, h), { fill: col, stroke: PAL.ink, lw });
      shape([...Array(9)].map((_, i) => [-w / 2 + i * w / 8, y0 - h + (i % 2 ? .7 : .3)]).concat([[w / 2, y0 - h], [-w / 2, y0 - h]]), { fill: drip, stroke: PAL.ink, lw });
    };
    tier(10, 3, 0, '#FF8FC4', C.white); tier(7.4, 2.6, -3, '#FFF3D6', '#FF8FC4'); tier(4.8, 2.3, -5.6, '#8BD3FF', C.white);
    for (let i = 0; i < 7; i++) {
      const cx = -2.1 + i * .7, top = -7.9 - .9;
      shape(rectPts(cx - .14, top, .28, .9), { fill: FIRE[i % FIRE.length], stroke: PAL.ink, lw: lw * .6 });
      const f = .35 + .08 * Math.sin(t * 19 + i * 2);
      ellipse(cx, top - .3, .17, f, { fill: C.gold, stroke: null });
      ellipse(cx, top - .22, .08, f * .5, { fill: '#FFFFFF', stroke: null });
    }
    X.restore();
  }
  function present(x, y, s, col, rib, ang = 0) {   // (x, y) = centre
    X.save(); X.translate(x, y); X.rotate(ang); X.scale(s, s);
    const lw = 2.2 / s;
    shape(rectPts(-2.2, -1.8, 4.4, 3.6), { fill: col, stroke: PAL.ink, lw });
    shape(rectPts(-.35, -1.8, .7, 3.6), { fill: rib, stroke: null }); shape(rectPts(-2.2, -.3, 4.4, .6), { fill: rib, stroke: null });
    ellipse(-.6, -2.2, .7, .45, { fill: rib, stroke: PAL.ink, lw: lw * .7, rot: -.4 }); ellipse(.6, -2.2, .7, .45, { fill: rib, stroke: PAL.ink, lw: lw * .7, rot: .4 });
    X.restore();
  }
  function balloons(hx, hy, s, t, n = 4) {
    for (let i = 0; i < n; i++) {
      const bx = hx + (i - (n - 1) / 2) * 3.4 * s + 1.2 * s * Math.sin(t * 2.1 + i), by = hy - (11 + 2.2 * (i % 2)) * s + .6 * s * Math.sin(t * 2.7 + i * 1.7);
      line([[hx, hy], [lerp(hx, bx, .5) + 1.4 * s * Math.sin(t * 3 + i), lerp(hy, by, .5)], [bx, by + 2.3 * s]], { stroke: rgba(PAL.ink, .7), lwPx: 1.6, smooth: true });
      ellipse(bx, by, 1.8 * s, 2.3 * s, { fill: FIRE[(i + 1) % FIRE.length], stroke: PAL.ink, lwPx: 2.2 });
      ellipse(bx - .6 * s, by - .8 * s, .35 * s, .6 * s, { fill: 'rgba(255,255,255,.6)', stroke: null, rot: -.3 });
    }
  }
  function banner(x0, y0, x1, y1, s, unroll, txt = 'HAPPY BIRTHDAY DANNY!') {   // a rolled-up banner between two hands
    if (unroll < .05) { line([[x0, y0], [x1, y1]], { stroke: PAL.ink, lwPx: 1.6 * s + 4 }); line([[x0, y0], [x1, y1]], { stroke: '#FFE7A8', lwPx: 1.6 * s }); return; }
    const h = 4 * s * unroll;
    shape([[x0, y0], [x1, y1], [x1, y1 + h], [x0, y0 + h]], { fill: '#FFF6E0', stroke: PAL.ink, lwPx: 2.2 });
    if (unroll > .5) { X.save(); X.font = `${Math.round(2.2 * s)}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = C.magenta; X.globalAlpha = seg(unroll, .5, 1); X.fillText(txt, (x0 + x1) / 2, (y0 + y1) / 2 + h / 2); X.restore(); }
  }
  // Freeze windows: the cast's clock stops while Danny glances back.
  const castClock = (t, wins) => t - wins.reduce((acc, [a, b]) => acc + clamp(t - a, 0, b - a), 0);
  const frozen = (t, wins) => wins.some(([a, b]) => t >= a && t < b);

  // =====================================================================================
  // 0–8.33 · launch
  const COUNT = [1.24, 2.50, 3.80], BOOM = 4.35, NAME = 4.6, LEVEL = 5.1, GO = [6.04, 6.60, 7.10], WHIP = 7.35, CUT = 8.33;
  const fusePt = f => [lerp(140, 960, f), 960 - 60 * Math.sin(f * Math.PI * 3) * (1 - f) - 40 * f];
  function launchCard(t) {
    const boom = t >= BOOM, flashK = kickK(t, BOOM, 4);
    // sky: plum night, then the party gradient after the BOOM
    const top = boom ? mixCol('#3B0F5C', '#FF3D9A', ease(seg(t, BOOM, BOOM + .6))) : '#1A0828', bot = boom ? mixCol('#120420', '#FFB23F', ease(seg(t, BOOM, BOOM + .6))) : '#2E0E44';
    X.fillStyle = linGrad(0, 0, 0, H, [[0, top], [1, bot]]); X.fillRect(0, 0, W, H);
    // beat rays after the boom
    if (boom) { X.save(); X.translate(W / 2, 470); X.rotate(t * .25); for (let i = 0; i < 16; i++) { X.rotate(TAU / 16); X.fillStyle = rgba('#FFFFFF', .07 + .07 * pulse(t, 5)); X.beginPath(); X.moveTo(0, 0); X.lineTo(1400, -110); X.lineTo(1400, 110); X.fill(); } X.restore(); }
    // stars before
    if (!boom) for (let i = 0; i < 70; i++) circle(hash(i) * W, hash(i + 50) * 700, 2 + 2 * hash(i + 9) * (.5 + .5 * Math.sin(t * 5 + i)), { fill: '#FFF4D0', stroke: null, alpha: .8 });
    // the fuse and its spark, then the rocket
    const fF = seg(t, .3, 3.95);
    if (t < BOOM) {
      const pts = [...Array(40)].map((_, i) => fusePt(i / 39));
      line(pts.filter((_, i) => i / 39 >= fF), { stroke: '#C9A26A', lwPx: 8, smooth: true });
      const [sx, sy] = fusePt(fF);
      for (let i = 0; i < 10; i++) { const a = hash(i + Math.floor(t * 24)) * TAU, d = 20 + 30 * hash(i * 3 + Math.floor(t * 24)); line([[sx, sy], [sx + Math.cos(a) * d, sy + Math.sin(a) * d]], { stroke: FIRE[i % 6], lwPx: 3 }); }
      circle(sx, sy, 14 + 4 * Math.sin(t * 40), { fill: '#FFF6C2', stroke: null });
      // the rocket waits at the end of the fuse, then climbs
      const rk = easeIn(seg(t, 3.95, BOOM)), rx = 960, ry = lerp(930, 470, rk);
      X.save(); X.translate(rx, ry); X.rotate(.04 * Math.sin(t * 30) * rk);
      shape([[-26, 40], [26, 40], [26, -60], [0, -100], [-26, -60]], { fill: C.magenta, stroke: PAL.ink, lwPx: 4 });
      shape(rectPts(-26, -20, 52, 18), { fill: C.gold, stroke: null });
      bigText('7', 0, 12, 46, C.white, 1);
      if (rk > 0) for (let i = 0; i < 8; i++) circle((hash(i + Math.floor(t * 30)) - .5) * 30, 50 + i * 16, 14 - i * 1.4, { fill: i < 3 ? '#FFF2A8' : C.orange, stroke: null, alpha: 1 - i / 9 });
      X.restore();
    }
    // the countdown: each number slams in on its word with a small burst and a kick of camera shake
    COUNT.forEach((c, i) => {
      const k = slamK(t, c) * (1 - easeIn(seg(t, (COUNT[i + 1] ?? BOOM) - .12, (COUNT[i + 1] ?? BOOM)))), [dx, dy] = shakeXY(t, 14 * kickK(t, c, 9));
      if (t >= c) burst(960 + dx, 470 + dy, t - c, 360, 22, i * 5, [FIRE[i], FIRE[i + 2], C.white]);
      bigText(['3', '2', '1'][i], 960 + dx, 470 + dy, 380, [C.gold, C.cyan, C.magenta][i], k, (i - 1) * .08, { glow: [C.gold, C.cyan, C.magenta][i] });
    });
    // BOOM: the big burst, two side bursts, the title and confetti
    if (boom) {
      burst(960, 470, t - BOOM, 760, 64, 1); burst(420, 330, t - BOOM - .25, 420, 36, 7); burst(1500, 300, t - BOOM - .45, 420, 36, 11);
      burst(700, 220, t - 5.9, 360, 30, 13); burst(1260, 240, t - 6.5, 360, 30, 17); burst(960, 180, t - 7.0, 420, 40, 19);
      confetti(t, BOOM, 110);
      const punch = 1 + .09 * GO.reduce((a, g) => a + kickK(t, g, 9), 0), [dx, dy] = shakeXY(t, 20 * kickK(t, BOOM, 5));
      bigText('DANNY', 960 + dx, 430 + dy, 250, C.white, slamK(t, NAME) * punch, -.05, { glow: C.magenta });
      bigText('LEVEL 7', 960 + dx, 650 + dy, 170, C.gold, slamK(t, LEVEL) * punch, .04, { glow: C.orange });
      sfxBoom(t);
    }
    if (flashK > .01) { X.fillStyle = rgba('#FFFFFF', flashK * .9); X.fillRect(0, 0, W, H); }
  }
  const sfxBoom = t => sfx('BOOM!', 1500, 820, 130, C.gold, t - BOOM, { life: 1.2, rot: .1 });
  function launch(t) {
    if (t < WHIP) return launchCard(t);
    // whip pan: the title card flies off to the left, the field slides in from the right, with speed streaks
    // (a moving clip edge, not a translate: blurred set layers composite in screen space)
    const k = easeIn(seg(t, WHIP, CUT)), edge = W * (1 - k * 1.05);
    hideTheCake(Math.max(t, CUT - .2));
    X.save(); X.beginPath(); X.rect(-10, -10, edge + 10, H + 20); X.clip(); X.translate(-k * W * 1.05, 0); launchCard(t); X.restore();
    line([[edge, -10], [edge, H + 10]], { stroke: C.white, lwPx: 18 });
    for (let i = 0; i < 26; i++) {
      const y = hash(i + 3) * H, len = 300 + 600 * hash(i * 5), x = W - ((k * 2.2 + hash(i)) % 1.4) * (W + len);
      line([[x, y], [x + len, y]], { stroke: rgba('#FFFFFF', .35 * Math.sin(k * Math.PI)), lwPx: 4 + 10 * hash(i * 9) });
    }
  }

  // =====================================================================================
  // 8.33–16.31 · hideTheCake: Danny dribbles at the lens down the sunny pitch; the cast smuggles the party behind him.
  const HC = [8.33, 16.31], FREEZE = [[11.55, 12.45], [15.2, 16.4]];
  const dannyZ = t => 3900 - 120 * (t - HC[0]);
  function crossing(te, a, b, x0, x1) { return { k: seg(te, a, b), x: lerp(x0, x1, seg(te, a, b)), live: te > a - .01 && te < b + .01 }; }
  function hideTheCake(t) {
    const dz = dannyZ(t), te = castClock(t, FREEZE), fz = frozen(t, FREEZE);
    const P = persp({ x: 60 * Math.sin((t - HC[0]) * .7), y: 105, z: dz - 300, f: 950, hy: 560 + 6 * pulse(t, 6), dir: 1 });
    const setO = { crowd: .5, cheer: .25, wind: 1.2, splitZ: dz - 60 };
    layer(() => F.back(P, t, setO), { blur: 2.2 });
    const L = items();
    const glance = Math.max(...FREEZE.map(([a, b]) => on(t, a - .15, b, .2)));
    // Robo-Safadi hovers the cake across, left to right
    const rb = crossing(te, 8.5, 12.4, -1300, 1300), rbZ = dz + 480;
    if (rb.live) L.push({ z: rbZ, draw: () => {
      const [sx, sy, k] = P.p(rb.x, 60 + 12 * Math.sin(te * 5), rbZ), s = ROBO_SAFADI_UNIT * k;
      const A = roboSafadi(sx, sy, s, { t: te, hover: 1, turn: .45, handL: [-3.6, -21], handR: [3.6, -21], handPoseL: 'palm', handPoseR: 'palm', eyes: fz ? 'wide' : 'happy', mouth: fz ? 'o' : 'grin', hum: !fz });
      cake((A.handL[0] + A.handR[0]) / 2, (A.handL[1] + A.handR[1]) / 2 - .4 * s, s * .9, te);
    } });
    // Alma skips right to left with a bunch of balloons
    const al = crossing(te, 9.2, 13.6, 1100, -1100), alZ = dz + 420;
    if (al.live) L.push({ z: alZ, draw: () => {
      const [sx, sy, k] = P.p(al.x, 0, alZ), s = ALMA_UNIT * k;
      const A = alma(sx, sy, s, { t: te, ...almaSkip((1100 - al.x) / 44), handR: [2.6, -17], handPoseR: 'fist', turn: -.4, eyes: fz ? 'wide' : 'happy', mouth: fz ? 'o' : 'grin', hairSwing: -.4 });
      balloons(A.handR[0], A.handR[1], s, te);
    } });
    // Jenna cartwheels-and-skips left to right with a present
    const je = crossing(te, 10.4, 14.4, -1100, 1100), jeZ = dz + 330;
    if (je.live) L.push({ z: jeZ, draw: () => {
      const [sx, sy, k] = P.p(je.x, 0, jeZ), s = JENNA_UNIT * k;
      const A = jenna(sx, sy, s, { t: te, ...jennaSkip((je.x + 1100) / 44), handL: [-2.6, -16], handR: [2.6, -16], handPoseL: 'palm', handPoseR: 'palm', turn: .4, eyes: fz ? 'wide' : 'happy', mouth: fz ? 'o' : 'grin' });
      present((A.handL[0] + A.handR[0]) / 2, (A.handL[1] + A.handR[1]) / 2 - 1.6 * s, s * 1.05, C.cyan, C.magenta, .1 * Math.sin(te * 6));
    } });
    // Dragon swoops over with two presents in his paws
    const dr = crossing(te, 10.8, 14.8, -1700, 1700), drZ = dz + 820;
    if (dr.live) L.push({ z: drZ, draw: () => {
      const [sx, sy, k] = P.p(dr.x, 300 + 40 * Math.sin(te * 2), drZ), s = DRAGON_UNIT * k;
      const A = dragon(sx, sy, s, { t: te, ...dragonFlight(te, { speed: fz ? 0 : 2.8, lift: 0 }), rot: .06, eyes: fz ? 'wide' : 'happy', mouth: fz ? 'o' : 'grin' });
      present(A.pawL[0], A.pawL[1] + 1.4 * s, s * .9, C.gold, C.magenta, -.2); present(A.pawR[0], A.pawR[1] + 1.4 * s, s * .9, C.lime, '#B98CFF', .2);
    } });
    // Housam and Doctor Sami jog the rolled-up banner right to left
    const hs = crossing(te, 12.2, 16.3, 1300, -1500), hsZ = dz + 520;
    if (hs.live) {
      const hx = hs.x, sxw = hs.x + 420; let Ah = null, As = null, sh = 0;
      L.push({ z: hsZ, draw: () => {
        const [sx, sy, k] = P.p(hx, 0, hsZ), s = HOUSAM_UNIT * k; sh = s;
        Ah = housam(sx, sy, s, { t: te, ...housamDribble((1300 - hx) / 50), handR: [4, -20], handPoseR: 'fist', turn: -.4, eyes: fz ? 'wide' : 'happy', mouth: fz ? 'o' : 'grin' });
        const [qx, qy, qk] = P.p(sxw, 0, hsZ + 10), ss = SAMI_UNIT * qk;
        As = sami(qx, qy, ss, { t: te, ...samiWalk((1300 - hx) / 58, 1), handL: [-4.4, -21], handPoseL: 'fist', turn: -.4, eyes: fz ? 'wide' : 'happy', mouth: fz ? 'o' : 'grin' });
        banner(Ah.handR[0], Ah.handR[1], As.handL[0], As.handL[1], s, 0);
      } });
    }
    // the ball, a step in front of Danny, and Danny himself, dribbling at the lens
    const p = (t - HC[0]) * 120 / 46;
    const bz = dz - 38, bounce = 7 * Math.abs(Math.sin(p * Math.PI));
    L.push({ z: dz, draw: () => {
      const [sx, sy, k] = P.p(0, 0, dz), s = DANNY_UNIT * k;
      danny(sx, sy, s, { t, ...dannyDribble(p, 1 - .6 * glance), turn: .75 * glance, lookX: .95 * glance, lookY: -.1 * glance,
        brows: glance > .5 ? 'focused' : 'up', mouth: glance > .5 ? 'flat' : 'grin', eyes: glance > .5 ? 'open' : 'happy' });
    } });
    L.push({ z: bz, draw: () => { const [bx, by, bk] = P.p(26 * Math.sin(p * Math.PI * .5), 11 + bounce, bz); dannyBall(bx, by, DANNY_UNIT * bk, { radius: 2.6, spin: p * 2 }); } });
    drawSorted(P, L);
    F.front(P, t, setO);
    // freeze gags: a "SHH!" and statue lines
    FREEZE.forEach(([a], i) => sfx(i ? 'FREEZE!' : 'SHH!', 1450, 300, 84, C.cyan, t - a, { life: .8, rot: -.08 }));
  }

  // =====================================================================================
  // 16.31–24.0 · nearMiss: Danny juggles up front; behind him the cast is almost caught.
  const NM = [16.31, 24.0], EXPLAIN = 16.5, TOSS = 17.05, BONK = 17.62, SHH = [18.22, 18.52, 19.00, 19.26], BLAST = 20.37, HEY = 21.94, NOTHING = 23.53;
  const BACK = 1880;
  const LINE = { jester: -620, alma: -400, jenna: -190, housam: 40, sami: 260, robo: 480, neptune: 720 };
  function nearMiss(t) {
    const push = ease(seg(t, HEY, HEY + .8)), punch = kickK(t, NOTHING, 6), [sxk, syk] = shakeXY(t, 16 * punch);
    const P = persp({ x: lerp(-20, 40, push) + sxk, y: 120 + syk, z: lerp(1170, 1240, push) + 40 * punch, f: 1000, hy: 590, dir: 1 });
    const setO = { crowd: .5, cheer: .2, wind: 1.2, splitZ: 1450 };
    layer(() => F.back(P, t, setO), { blur: 1.4 });
    const L = items(), lineup = t >= HEY, nothing = on(t, NOTHING, 24.6, .1);
    const innocent = { handL: [-2.2, -11], handR: [2.2, -11], handPoseL: 'fist', handPoseR: 'fist' };
    const hush = (i, Hl) => { const k = on(t, SHH[i] - .08, SHH[i] + .9, .1); return k > .01 ? { handR: [1.0, -Hl * k + -11 * (1 - k)], handPoseR: 'point', jump: .8 * kickK(t, SHH[i], 8), eyes: 'squeeze', mouth: 'o' } : {}; };
    const scurry = (i) => (lineup ? 0 : 60 * Math.sin(t * 7 + i * 1.7));
    const face = (base) => lineup ? { eyes: nothing > .5 ? 'happy' : 'open', mouth: nothing > .5 ? 'open' : 'grin', lookY: nothing > .5 ? 0 : -.8, jump: 1.2 * nothing } : base;
    // Jester Fester, tossing the ball and shrugging
    L.push({ z: BACK, draw: () => {
      const [sx, sy, k] = P.p(LINE.jester + scurry(0), 0, BACK), s = JF_UNIT * k;
      const shrug = on(t, 17.9, 19.3, .2), toss = on(t, TOSS - .3, TOSS + .25, .1);
      jester(sx, sy, s, { t, ...(lineup ? innocent : {}), ...(toss > 0 ? { handR: [5, -22], handPoseR: 'open' } : {}),
        ...(shrug > 0 && !lineup ? { handL: [-4.4, -13.2], handR: [4.4, -13.2], brows: 'worried', mouth: 'smirk', tilt: .15, emote: '?', emoteK: shrug } : {}), ...face({ mouth: 'grin' }) });
    } });
    // the kids and the doctor
    [['alma', 0, 20], ['jenna', 1, 20], ['housam', 2, 25], ['sami', 3, 24]].forEach(([n, i, Hl]) => {
      const z = n === 'sami' ? BACK + 60 : BACK;
      L.push({ z, draw: () => {
        const xw = LINE[n] + scurry(i + 1);
        const [sx, sy, k] = P.p(xw, 0, z), rig = { alma, jenna, housam, sami }[n], unit = { alma: ALMA_UNIT, jenna: JENNA_UNIT, housam: HOUSAM_UNIT, sami: SAMI_UNIT }[n];
        const holdBanner = (n === 'housam') && t < BLAST + .1;
        rig(sx, sy, unit * k, { t, ...(lineup ? innocent : {}), ...(holdBanner ? { handL: [-3.5, -26], handPoseL: 'fist' } : {}), ...hush(i, Hl), ...face({ mouth: 'grin' }) });
      } });
    });
    // Professor Safadi marches up to Danny, gets bonked, and Sami drags him back into line
    const safX = t < BONK ? lerp(760, 120, ease(seg(t, NM[0], EXPLAIN + .4))) : lerp(120, 370, ease(seg(t, 18.0, 18.9)));
    const safZ = t < BONK ? lerp(BACK, 1750, ease(seg(t, NM[0], EXPLAIN + .4))) : lerp(1750, BACK + 30, ease(seg(t, 18.0, 18.9)));
    let safHead = null;
    L.push({ z: safZ, draw: () => {
      const [sx, sy, k] = P.p(safX, 0, safZ), s = SAFADI_UNIT * k, ex = on(t, EXPLAIN, BONK, .15), dazed = on(t, BONK, 19.6, .1);
      const talk = t > EXPLAIN + .2 && t < BONK;
      const A = safadi(sx, sy, s, { t, ...(t < EXPLAIN + .4 ? safadiWalk((safX - 760) / -58, 1) : {}),
        ...(ex > 0 ? { handR: [6.2, -25], handPoseR: 'point', brows: 'up', power: .5 * ex } : {}),
        ...(dazed > 0 ? { eyes: 'squeeze', brows: 'worried', mouth: 'wobble', tilt: .18 * Math.sin(t * 9) * dazed } : { mouth: lipFlap(t, talk, 'smile') }),
        ...(lineup ? { ...innocent, ...face({}) } : {}) });
      safHead = A.head;
      callout('Allow me to *EXPLAIN*—', A.mouth[0], A.mouth[1], t - EXPLAIN, { dx: 330, dy: -230, size: 52, cps: 30, dur: BONK - EXPLAIN + .15, kind: 'shout' });
      if (dazed > .05) for (let i = 0; i < 4; i++) { const a = t * 6 + i * TAU / 4; shape(starPts(A.head[0] + Math.cos(a) * 5 * s, A.top[1] - .5 * s + Math.sin(a) * 1.4 * s, 1.1 * s, .45), { fill: C.gold, stroke: PAL.ink, lwPx: 2, alpha: dazed }); }
    } });
    // Robo-Safadi with the cake behind his back, and King Neptune with his trident
    L.push({ z: BACK + 40, draw: () => {
      const [sx, sy, k] = P.p(LINE.robo + scurry(5), 0, BACK + 40), s = ROBO_SAFADI_UNIT * k;
      roboSafadi(sx, sy, s, { t, ...innocent, eyes: lineup ? 'happy' : 'open', mouth: lineup && nothing > .5 ? 'open' : 'grin', jump: 1.2 * nothing, antenna: .2 * Math.sin(t * 4) });
    } });
    L.push({ z: BACK + 80, draw: () => {
      const [sx, sy, k] = P.p(LINE.neptune, 0, BACK + 80), s = NT_UNIT * k, pw = on(t, BLAST - .5, BLAST + .7, .15);
      const A = neptune(sx, sy, s, { sit: 1, flip: true, trident: true, power: pw, tridentAng: lerp(-1.3, -2.3, pw), mouth: pw > .3 || nothing > .5 ? 'laugh' : 'grin', eyes: lineup && nothing < .5 ? 'smug' : undefined, dy: -1.2 * nothing });
      // the water blast: from the trident tip up and left, at the banner over Housam's head
      if (pw > .05 && A.tridentTip && t < BLAST + .7) {
        const [tx, ty] = A.tridentTip, f = seg(t, BLAST - .25, BLAST + .05), ex = lerp(tx, P.p(LINE.housam, 280, BACK)[0], f), ey = lerp(ty, P.p(LINE.housam, 280, BACK)[1], f);
        line([[tx, ty], [lerp(tx, ex, .5), Math.min(ty, ey) - 80], [ex, ey]], { stroke: rgba('#3DB8FF', .9 * pw), lwPx: 26, smooth: true });
        line([[tx, ty], [lerp(tx, ex, .5), Math.min(ty, ey) - 80], [ex, ey]], { stroke: rgba('#E8FBFF', pw), lwPx: 9, smooth: true });
      }
    } });
    // the banner: held up by Housam until the blast, then it rockets into the sky, unrolling
    L.push({ z: BACK - 10, draw: () => {
      const fly = easeIn(seg(t, BLAST, BLAST + 1.1)), [hx, hy, hk] = P.p(LINE.housam - 30, 210 + 1600 * fly, BACK - 10), s = HOUSAM_UNIT * hk;
      if (hy < -200) return;
      X.save(); X.translate(hx, hy); X.rotate(-.4 * fly + .05 * Math.sin(t * 5)); banner(-9 * s, 0, 9 * s, 0, s, seg(t, BLAST + .1, BLAST + .6)); X.restore();
    } });
    // Danny, up front: keepy-uppy, then "Hey! What's going on?"
    const jug = t < HEY, bp = (t - NM[0]) * 2.4, kneeUp = Math.max(0, Math.sin(bp * Math.PI));
    L.push({ z: 1500, draw: () => {
      const [sx, sy, k] = P.p(-170, 0, 1500), s = DANNY_UNIT * k, turnK = ease(seg(t, HEY - .2, HEY + .25)), sus = on(t, NOTHING + .2, 26, .2);
      const A = danny(sx, sy, s, { t, ...(jug ? { footR: [1.8, -1.05 - 5 * kneeUp], handL: [-5, -13], handR: [5, -13], lookY: .6, mouth: 'grin', brows: 'focused' } :
        { turn: .8 * turnK * (1 - .6 * on(t, NOTHING - .1, 26, .15)), lookX: .9, handL: [-5.5, -15], handR: [5.5, -15], handPoseL: 'palm', handPoseR: 'palm',
          eyes: sus > .5 ? 'open' : 'wide', brows: sus > .5 ? 'focused' : 'up', mouth: lipFlap(t, t > HEY && t < HEY + 1.1, sus > .5 ? 'smirk' : 'o') }) });
      const by = jug ? 11 + 60 * Math.abs(Math.sin(bp * Math.PI)) + 20 * kneeUp : 11 + 40 * kickK(t, HEY, 5) * Math.abs(Math.cos((t - HEY) * 9));
      const [bx, byy, bk] = P.p(-170 + (jug ? 46 : 80), by, 1470);
      dannyBall(bx, byy, DANNY_UNIT * bk, { radius: 2.6, spin: t * 6 });
      if (sus > .3) sfx('?', A.head[0] + 9 * s, A.top[1], 90, C.cyan, t - NOTHING - .5, { life: 1.6 });
    } });
    drawSorted(P, L);
    F.front(P, t, setO);
    // the ball from Fester's hand to Safadi's head: BONK
    if (t >= TOSS && t < BONK + .5) {
      const [fx, fy] = P.p(LINE.jester, 260, BACK), f = seg(t, TOSS, BONK);
      const tx = safHead ? safHead[0] : 960, ty = safHead ? safHead[1] - 40 : 300;
      const bx = t < BONK ? lerp(fx, tx, f) : tx + 400 * (t - BONK), by = t < BONK ? lerp(fy, ty, f) - 300 * 4 * f * (1 - f) : ty - 500 * (t - BONK) + 1200 * (t - BONK) ** 2;
      jugglerBall(bx, by, 22, '#E2412E', t * 8);
    }
    sfx('BONK!', (safHead ? safHead[0] : 960) + 120, (safHead ? safHead[1] : 300) - 160, 96, C.gold, t - BONK, { life: .9 });
    SHH.forEach((s0, i) => { const xw = LINE[['alma', 'jenna', 'housam', 'sami'][i]]; const [x, y] = P.p(xw, 330, BACK); sfx('SHH!', x, y, 58, C.cyan, t - s0, { life: .7, rot: (i % 2 ? .1 : -.1) }); });
    sfx('SPLOOSH!', 1300, 300, 92, '#7FD8FF', t - BLAST, { life: 1.0 });
    if (nothing > 0) bigText('NOTHING!', 1180, 260, 150, C.gold, slamK(t, NOTHING) * (1 - seg(t, 23.95, 24.0)), .06, { glow: C.orange });
  }

  // =====================================================================================
  // 24.0–31.85 · warp: the laptop, Clawd, PLAYER 1, LOADING LEVEL 7, and the neon block tunnel.
  const WP = [24.0, 31.85], CLAWD = 24.14, P1 = 24.92, LOAD = 25.9, SEVEN = 26.88, TUNNEL = 27.25, WHITE = 31.25;
  function warpDesk(t) {
    const P = persp({ x: -120, y: 85, z: 1500 - 250 + 25 * seg(t, WP[0], TUNNEL), f: 1000, hy: 560, dir: 1 });
    const setO = { crowd: .5, cheer: .2, wind: 1.2, splitZ: 1460 };
    layer(() => F.back(P, t, setO), { blur: 3.5 });
    F.front(P, t, setO);
    const [sx, sy, k] = P.p(-250, 0, 1500), s = DANNY_UNIT * k;
    const open = ease(seg(t, WP[0], WP[0] + .3)), sevenK = kickK(t, SEVEN, 4);
    const A = danny(sx, sy, s, { t, handL: [-4.4, -11.2], handR: [4.4, -11.2], handPoseL: 'palm', handPoseR: 'palm', lookY: .5,
      eyes: t > SEVEN ? 'wide' : 'happy', brows: 'up', mouth: t > SEVEN ? 'open' : 'grin', jump: .6 * sevenK });
    dannyLaptop(sx, A.handL[1] - .2 * s, s, { open });
    // Clawd bursts out of the screen as a hologram and waves
    const pop = seg(t, CLAWD, CLAWD + .35), ck = backOut(pop);
    if (pop > 0) {
      const cx = sx + lerp(0, 17, ease(seg(t, CLAWD, CLAWD + .5))) * s, cy = A.handL[1] - lerp(4, 14, ck) * s;
      for (let i = 0; i < 6; i++) line([[sx - 3 * s + i * 1.2 * s, A.handL[1] - 3.6 * s], [cx - 3 * s + i * 1.2 * s, cy]], { stroke: rgba(C.cyan, .25 * pop), lwPx: 3 });
      clawd(cx, cy, CLAWD_UNIT / DANNY_UNIT * s * 1.1 * ck, { t, holo: 1, aR: 1.2 + .45 * Math.sin(t * 9), mouth: lipFlap(t, t < SEVEN + .3, 'grin'), eyes: t > SEVEN ? 'spark' : 'happy', bounce: .5 });
    }
    // PLAYER 1, then the loading bar and the big 7
    const p1 = slamK(t, P1) * (1 - ease(seg(t, LOAD - .2, LOAD)));
    bigText('PLAYER 1: DANNY', 1250, 250, 120, C.cyan, p1, -.04, { glow: C.cyan });
    if (t >= LOAD) {
      const fill = easeIn(seg(t, LOAD, SEVEN)), bx = 900, by = 230, bw = 780;
      X.save(); X.globalAlpha = 1 - seg(t, TUNNEL - .15, TUNNEL);
      bigText('LOADING LEVEL…', bx + bw / 2, by - 70, 70, C.white, 1);
      shape(rectPts(bx, by, bw, 70), { fill: '#120A20', stroke: C.cyan, lwPx: 6 });
      const n = Math.floor(fill * 14);
      for (let i = 0; i < n; i++) shape(rectPts(bx + 10 + i * 54.6, by + 10, 48, 50), { fill: FIRE[i % FIRE.length], stroke: null });
      X.restore();
      bigText('7', 1290, 560, 420, C.gold, slamK(t, SEVEN) * (1 + .1 * pulse(t, 6)), .05, { glow: C.magenta });
      burst(1290, 560, t - SEVEN, 520, 40, 23);
    }
    if (sevenK > .02) { X.fillStyle = rgba('#FFFFFF', sevenK * .7); X.fillRect(0, 0, W, H); }
  }
  function tunnel(t) {
    const u = t - TUNNEL, speed = 1 + 2.5 * seg(t, TUNNEL, WHITE);
    X.fillStyle = '#07020F'; X.fillRect(0, 0, W, H);
    const cx = W / 2 + 40 * Math.sin(u * 1.3), cy = H / 2 + 30 * Math.cos(u * 1.1);
    // rings of neon blocks rushing at the lens
    for (let r = 0; r < 18; r++) {
      const ph = frac(r / 18 + u * .35 * speed), z = Math.pow(ph, 2.4), size = 40 + z * 1900, rot = u * .4 + r * .12, col = FIRE[r % FIRE.length];
      X.save(); X.translate(cx, cy); X.rotate(rot);
      X.globalAlpha = clamp(ph * 3) * (1 - seg(ph, .85, 1));
      X.strokeStyle = col; X.lineWidth = 3 + 18 * z; X.shadowColor = col; X.shadowBlur = 24;
      X.strokeRect(-size / 2, -size / 2 * .62, size, size * .62);
      for (let b = 0; b < 8; b++) { const a = b / 8 * TAU + r; const bs = 10 + 70 * z; X.fillStyle = FIRE[(b + r) % 6]; X.fillRect(Math.cos(a) * size * .5 - bs / 2, Math.sin(a) * size * .31 - bs / 2, bs, bs); }
      X.restore();
    }
    // pixel streaks
    for (let i = 0; i < 70; i++) {
      const a = hash(i) * TAU, ph = frac(hash(i * 3) + u * (.5 + hash(i * 7)) * speed), d0 = 60 + ph * ph * 1300, d1 = d0 + 40 + 220 * ph;
      line([[cx + Math.cos(a) * d0, cy + Math.sin(a) * d0], [cx + Math.cos(a) * d1, cy + Math.sin(a) * d1]], { stroke: rgba(FIRE[i % 6], .8), lwPx: 2 + 6 * ph });
    }
    // Danny tumbles in, cheering, shrinking toward the centre; Clawd zips round him
    const shrink = lerp(1, .22, easeIn(seg(t, TUNNEL + .6, WHITE))), s = 13 * shrink * (1 + .05 * pulse(t, 6));
    X.save(); X.translate(cx, cy + 200 * shrink); X.rotate(u * 2.2);
    danny(0, 0, s, { t, handL: [-4.3, -19.3], handR: [4.3, -19.3], handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'open', brows: 'up', footL: [-2.4, -3], footR: [2.6, -1.5] });
    X.restore();
    const ca = u * 5, cr = 330 * shrink;
    clawd(cx + Math.cos(ca) * cr, cy + Math.sin(ca) * cr * .6 + 60 * shrink, 10 * shrink, { t, holo: 1, eyes: 'spark', mouth: 'grin', aL: 1.3, aR: 1.3, rot: ca });
    bigText('LEVEL 7', W / 2, 150, 110, C.gold, slamK(t, 29.3) * (1 - seg(t, WHITE - .2, WHITE)) * (1 + .08 * pulse(t, 6)), 0, { glow: C.magenta });
    const wk = seg(t, WHITE, WP[1]);
    if (wk > 0) { X.fillStyle = rgba('#FFFFFF', easeIn(wk)); X.fillRect(0, 0, W, H); }
  }
  function warp(t) {
    if (t < TUNNEL) return warpDesk(t);
    if (t < TUNNEL + .35) {                          // the screen dissolves into pixels
      warpDesk(TUNNEL - .01);
      const k = seg(t, TUNNEL, TUNNEL + .35), n = 48;
      for (let i = 0; i < n * 27; i++) if (hash(i * 1.31) < k) { X.fillStyle = FIRE[i % 6]; X.fillRect((i % n) * 40, Math.floor(i / n) * 40, 40, 40); }
      return;
    }
    tunnel(t);
  }

  return { launch, hideTheCake, nearMiss, warp,
    _kit: { C, FIRE, bigText, slamK, kickK, on, burst, confetti, cake, present, balloons, banner } };   // shared with game.js and party.js
})();
