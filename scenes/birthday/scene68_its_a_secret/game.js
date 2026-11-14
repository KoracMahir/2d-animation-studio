// scenes/birthday/scene68_its_a_secret/game.js: the Craft Blocks level (31.85–111.95 s), side-on in scene 36's block world.
//   runChase  31.85–48.19  land, CRAFT BLOCKS · LEVEL 7, a jump every two beats over block walls for candle-coins; the cast pops
//                          up behind blocks on every SHH!; Broccreepers give chase and Danny back-heels them away; Dragon picks
//                          him up
//   build     48.19–64.13  a year-block slams down on each count (bottle, ball, star, cat, pumpkin, cube, 7); creepers volleyed
//                          away between counts; the tower blazes gold on LEVEL SEVEN
//   boss      64.13–111.95 BOSS FIGHT: the giant Broccreeper with Robo-Safadi's eyes; dodge, climb, SUPER BOOTS, the launch, the
//                          slow-motion windup, the bicycle kick GOAL (84.05, the loudest bars), Sami shushed, the candle victory
//                          lap, and the tower rumbling toward the countdown
// Uses scene 36's props (dmBlockWorld, dmBlock, dmCreeper, dmBroccoli, dmBoom, dmSlam, dmPop, dmCube, stArcade).
Object.assign(SECRET_SHOTS, (() => {
  const { C, FIRE, bigText, slamK, kickK, on, burst, confetti } = SECRET_SHOTS._kit;
  const BEAT = 60 / 120.45, OFF = .365, BAR = n => OFF + n * 4 * BEAT;
  const bpos = t => (t - OFF) / BEAT, hop = (t, ph = 0) => Math.abs(Math.sin(Math.PI * (bpos(t) + ph)));
  const RIG = { danny: [danny, DANNY_UNIT], housam: [housam, HOUSAM_UNIT], alma: [alma, ALMA_UNIT], jenna: [jenna, JENNA_UNIT], safadi: [safadi, SAFADI_UNIT],
    sami: [sami, SAMI_UNIT], jester: [jester, JF_UNIT], robo: [roboSafadi, ROBO_SAFADI_UNIT], neptune: [neptune, NT_UNIT], dragon: [dragon, DRAGON_UNIT], clawd: [clawd, CLAWD_UNIT] };
  const put = (who, x, y, kpx, o = {}) => RIG[who][0](x, y, RIG[who][1] * kpx, { t: T, ...o });
  const KP = 2.0;                                                      // px per world unit for the people in the block world
  const B = 130;                                                        // block size of the meadow
  const run = (t, k = 1.4) => dannyDribble(t * 4.2, k);
  const air = { handL: [-4.6, -18.5], handR: [4.6, -18.5], handPoseL: 'palm', handPoseR: 'palm', footL: [-2.2, -3.2], footR: [2.4, -2.4], eyes: 'happy', mouth: 'open' };
  const shake = (t, t0, amt, d = 6) => shakeXY(t, amt * kickK(t, t0, d));
  function withShake(t, hits, fn) { const [dx, dy] = hits.reduce((a, [t0, amt]) => { const [x, y] = shake(t, t0, amt); return [a[0] + x, a[1] + y]; }, [0, 0]); X.save(); X.translate(dx, dy); fn(); X.restore(); }

  // the seven year-blocks: kind and icon
  const YEARS = [['white', 'bottle'], ['grass', 'ball'], ['yellow', 'star'], ['blue', 'cat'], ['orange', 'pumpkin'], ['red', 'cube'], ['gold', 'seven']];
  function icon(kind, cx, cy, r, t) {
    const lw = Math.max(2.5, r * .06);
    if (kind === 'bottle') { shape(rectPts(cx - r * .32, cy - r * .3, r * .64, r * .95), { fill: '#FFFFFF', stroke: PAL.ink, lwPx: lw }); shape(rectPts(cx - r * .32, cy + r * .2, r * .64, r * .45), { fill: '#BFE6FF', stroke: null }); shape([[cx - r * .2, cy - r * .3], [cx + r * .2, cy - r * .3], [cx, cy - r * .75]], { fill: '#FFB3C7', stroke: PAL.ink, lwPx: lw }); }
    if (kind === 'ball') dannyBall(cx, cy, r / 1.5, { spin: t });
    if (kind === 'star') shape(starPts(cx, cy, r * .85, .45), { fill: C.gold, stroke: PAL.ink, lwPx: lw });
    if (kind === 'cat') { circle(cx, cy + r * .1, r * .62, { fill: '#F6A23B', stroke: PAL.ink, lwPx: lw }); shape([[cx - r * .55, cy - r * .2], [cx - r * .35, cy - r * .8], [cx - r * .1, cy - r * .45]], { fill: '#F6A23B', stroke: PAL.ink, lwPx: lw }); shape([[cx + r * .55, cy - r * .2], [cx + r * .35, cy - r * .8], [cx + r * .1, cy - r * .45]], { fill: '#F6A23B', stroke: PAL.ink, lwPx: lw }); for (const ex of [-.22, .22]) ellipse(cx + ex * r, cy, r * .09, r * .15, { fill: PAL.ink, stroke: null }); }
    if (kind === 'pumpkin') { ellipse(cx, cy + r * .1, r * .8, r * .62, { fill: '#FF8A2B', stroke: PAL.ink, lwPx: lw }); shape(rectPts(cx - r * .08, cy - r * .7, r * .16, r * .25), { fill: '#4C8A2E', stroke: null }); shape([[cx - r * .4, cy - r * .05], [cx - r * .2, cy - r * .25], [cx - r * .05, cy - r * .05]], { fill: PAL.ink, stroke: null }); shape([[cx + r * .4, cy - r * .05], [cx + r * .2, cy - r * .25], [cx + r * .05, cy - r * .05]], { fill: PAL.ink, stroke: null }); shape([[cx - r * .4, cy + r * .2], [cx + r * .4, cy + r * .2], [cx, cy + r * .45]], { fill: PAL.ink, stroke: null }); }
    if (kind === 'cube') dmCube(cx, cy + r * .1, r * .62, t, 1);
    if (kind === 'seven') bigText('7', cx, cy + r * .05, r * 1.6, C.white, 1, 0, { glow: C.orange });
  }
  function yearBlock(i, x, y, size, t, k = 1) { dmBlock(x, y, size, YEARS[i][0], { k }); if (k > .5) icon(YEARS[i][1], x + size / 2, y + size / 2, size * .36 * backOut(seg(k, .5, 1)), t); }
  function candle(x, y, s, t, i) {      // a little birthday candle, (x, y) its base
    shape(rectPts(x - 6 * s, y - 34 * s, 12 * s, 34 * s), { fill: FIRE[i % FIRE.length], stroke: PAL.ink, lwPx: 2.5 });
    for (let j = 0; j < 3; j++) line([[x - 6 * s, y - (8 + 10 * j) * s], [x + 6 * s, y - (13 + 10 * j) * s]], { stroke: 'rgba(255,255,255,.6)', lwPx: 2 });
    const f = 1 + .15 * Math.sin(t * 20 + i);
    ellipse(x, y - 44 * s, 6 * s, 11 * s * f, { fill: C.gold, stroke: null }); ellipse(x, y - 42 * s, 3 * s, 5 * s * f, { fill: '#FFFFFF', stroke: null });
  }
  function popUp(who, x, gy, t, t0, o = {}) {                         // a cast member pops up from behind a 2-block wall, then ducks
    const k = on(t, t0 - .12, t0 + .75, .14);
    if (k > 0) {
      const y = gy - 2 * B + (1 - k) * 330 + 90;
      X.save(); X.beginPath(); X.rect(x - 300, 0, 600, gy - 2 * B + 4); X.clip();
      put(who, x, y, KP, { handR: [1.0, -21], handPoseR: 'point', eyes: 'squeeze', mouth: 'o', ...o });
      X.restore();
      dmPop('SHH!', x, gy - 2 * B - 200, 64, C.cyan, t, t0, .8);
    }
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) dmBlock(x - B + i * B, gy - (j + 1) * B, B, j ? 'leaf' : 'wood');
  }

  // =====================================================================================
  // 31.85–48.19 · runChase
  const LAND = 32.25, SPEED = 520, DX = 640, JUMPS = [...Array(7)].map((_, i) => LAND + .75 + i * 2 * BEAT), KICKS = [40.72, 41.72, 42.71, 43.71];
  const SHHS = [[33.76, 'alma'], [35.71, 'housam'], [41.69, 'jenna'], [43.65, 'neptune']], PICK = 45.2, DROP = 47.9;
  function runChase(t) {
    const ride = seg(t, PICK, DROP), speed = SPEED * (1 + 1.2 * ride), ox = Math.max(0, t - LAND) * SPEED + 1.2 * SPEED * Math.max(0, t - PICK) * ride * .5;
    const gy = dmBlockWorld(t, B, { ox });
    // block walls to jump, each with a candle-coin above it
    let got = 0;
    JUMPS.forEach((j, i) => {
      const wx = DX + (j - LAND) * SPEED - ox, hgt = 1 + (i % 2);
      for (let h = 0; h < hgt; h++) dmBlock(wx - B / 2, gy - (h + 1) * B, B, i % 3 === 2 ? 'stone' : 'wood');
      if (t < j) candle(wx, gy - hgt * B - 150 + 10 * Math.sin(t * 5 + i), 1.4, t, i); else { got++; dmPop('+1', wx, gy - hgt * B - 200, 56, C.gold, t, j, .8); }
    });
    // the cast pop up behind block walls on every SHH!
    SHHS.forEach(([s0, who]) => { popUp(who, 1380 - (t - s0) * SPEED, gy, t, s0, who === 'neptune' ? { sit: 1, trident: true, mouth: 'o', eyes: 'closed' } : {}); });
    // Broccreepers chasing from the left; each meets Danny's back-heel
    KICKS.forEach((k, i) => {
      if (t < k - 1.8 || t > k + .9) return;
      const cx = t < k ? DX - 150 - (k - t) * 420 : DX - 150;
      if (t < k + .05) dmCreeper(cx, gy, B * .7, t, { swell: seg(t, k - .4, k) * .5 });
      dmBoom(cx, gy - B * .8, 160, seg(t, k + .05, k + .8));
      dmPop(['POW!', 'BAM!', 'BOINK!', 'POOF!'][i], cx, gy - 260, 70, C.lime, t, k + .05, .8);
    });
    // Danny: drops in, runs, jumps on the beat; back-heels; then rides off on Dragon
    const fall = 1 - easeIn(seg(t, 31.85, LAND));
    let jy = 0, inAir = false;
    JUMPS.forEach(j => { const f = seg(t, j - .42, j + .42); if (f > 0 && f < 1) { jy = 1.75 * B * 4 * f * (1 - f); inAir = true; } });
    const kickNow = KICKS.find(k => t > k - .15 && t < k + .25);
    if (t < PICK) {
      const y = gy - jy - fall * 900;
      put('danny', DX, y, KP, { ...(inAir || fall > 0 ? air : run(t)), turn: .55, ...(kickNow ? { footL: [-6, -6], handL: [-4, -16], handR: [5, -10], eyes: 'happy', mouth: 'grin', lean: .1 } : {}),
        ...(t < LAND + .2 ? { eyes: 'wide', mouth: 'O' } : {}) });
      if (t > LAND && t < LAND + .5) for (let i = 0; i < 10; i++) { const u = seg(t, LAND, LAND + .5), a = Math.PI + i / 9 * Math.PI; shape(rectPts(DX + Math.cos(a) * 160 * u - 8, gy + Math.sin(a) * 60 * u - 8, 16, 16), { fill: '#8A5A35', stroke: null, alpha: 1 - u }); }
    }
    // Dragon swoops in and carries him away
    const swoop = seg(t, 44.0, PICK);
    if (t > 44.0) {
      const dx = t < PICK ? lerp(W + 200, DX, ease(swoop)) : DX + 300 * ride, dy = t < PICK ? lerp(120, gy - 140, ease(swoop)) : lerp(gy - 140, 150, easeIn(ride));
      const A = put('dragon', dx, dy, KP * .95, { ...dragonFlight(t, { speed: 3, lift: 0 }), flip: true, eyes: 'happy', mouth: 'grin', noShadow: true });
      if (t >= PICK) put('danny', dx + 10, A.belly[1] - 40, KP, { handL: [-5, -20], handR: [4, -12], handPoseL: 'palm', eyes: 'happy', mouth: 'open', turn: .5, footL: [-3, -3], footR: [3, -3], noShadow: true });
    }
    dmSlam('DRAGON RIDE!', W / 2, 220, 110, C.cyan, t, PICK + .1, 1.8);
    // HUD and titles
    stArcade(`CANDLES × ${got}`, 60, 70, 46, C.gold, 'left');
    dmSlam('CRAFT BLOCKS', W / 2, 200, 120, C.white, t, LAND + .05, 2.2, { shake: 8 });
    dmSlam('LEVEL 7', W / 2, 330, 140, C.gold, t, LAND + .55, 1.8, { shake: 8 });
    flash(1 - seg(t, 31.85, 32.6));
  }

  // =====================================================================================
  // 48.19–64.13 · build
  const COUNTS = [48.24, 49.26, 51.90, 53.20, 55.80, 57.17, 59.60], LEVEL7 = 61.17, VOLLEYS = [50.6, 54.7, 58.5], TB = 92, TX0 = 1150;
  function tower(x, gy, t, n, o = {}) {                               // the year-tower: n blocks (fractional = the next one falling)
    const glow = o.glow || 0;
    if (glow > .01) {
      X.save(); X.translate(x + TB / 2, gy - 3.5 * TB); X.rotate(t * .4);
      for (let i = 0; i < 14; i++) { X.rotate(TAU / 14); X.fillStyle = rgba('#FFE066', .22 * glow); X.beginPath(); X.moveTo(0, 0); X.lineTo(1200, -70); X.lineTo(1200, 70); X.fill(); }
      X.restore();
      circle(x + TB / 2, gy - 3.5 * TB, 380 * glow, { fill: radGrad(x + TB / 2, gy - 3.5 * TB, 0, 380 * glow, [[0, rgba('#FFF2A8', .8 * glow)], [1, 'rgba(255,240,160,0)']]), stroke: null });
    }
    for (let i = 0; i < 7; i++) {
      const land = o.lands ? o.lands[i] : -1e9; if (t < land - .4) break;
      const f = easeIn(seg(t, land - .4, land)), y = gy - (i + 1) * TB - (1 - f) * 900, sq = kickK(t, land, 9);
      X.save(); X.translate(x + TB / 2, y + TB); X.scale(1 + .15 * sq, 1 - .15 * sq); X.translate(-x - TB / 2, -y - TB);
      yearBlock(i, x, y, TB, t); X.restore();
      if (t > land && t < land + .45) for (let d = 0; d < 6; d++) { const u = seg(t, land, land + .45); shape(rectPts(x + TB / 2 + (d - 2.5) * 40 * (1 + u) - 7, y + TB - 30 * u, 14, 14), { fill: '#FFFFFF', stroke: null, alpha: 1 - u }); }
    }
  }
  function build(t) {
    const gy = dmBlockWorld(t, B, { ox: 30000 });
    tower(TX0, gy, t, 7, { lands: COUNTS, glow: on(t, LEVEL7 - .1, 66, .3) });
    COUNTS.forEach((c, i) => dmSlam(String(i + 1), 260 + i * 105, 170, 150, FIRE[i % FIRE.length], t, c, 1.1, { shake: 6 }));
    // creepers from the right, volleyed away
    VOLLEYS.forEach((v, i) => {
      if (t < v - 1.6 || t > v + .9) return;
      const cx = t < v ? lerp(W + 100, 1560, seg(t, v - 1.6, v)) : 1560;
      if (t < v + .05) dmCreeper(cx, gy, B * .75, t, { swell: seg(t, v - .3, v) * .6 });
      if (t > v - .28 && t < v) { const f = seg(t, v - .28, v); dannyBall(lerp(760, cx, f), gy - 60 - 180 * 4 * f * (1 - f), 15, { spin: t * 10 }); }
      dmBoom(cx, gy - B * .9, 180, seg(t, v + .02, v + .8));
      dmPop('VOLLEY!', cx, gy - 300, 70, C.lime, t, v, .9);
    });
    // Danny: lands, points every block home, volleys, then celebrates
    const landK = easeIn(seg(t, 48.0, 48.45)), counting = COUNTS.some(c => t > c - .45 && t < c + .3), volley = VOLLEYS.find(v => t > v - .35 && t < v + .2);
    const lvl = t > LEVEL7 - .1;
    const o = lvl ? { handL: [-4.3, -19.3], handR: [4.3, -19.3], handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'grin', jump: 1.6 * hop(t) }
      : volley ? { footR: [5.5, -7], footL: [-1.7, -1.05], handL: [-4.5, -14], handR: [4.3, -15], lean: -.12, mouth: 'grin', brows: 'focused', turn: .5 }
      : counting ? { handR: [3.6, -21], handPoseR: 'point', handL: [-4, -12], lookX: .6, lookY: -.8, mouth: 'open', eyes: 'happy', brows: 'up', jump: .4 * hop(t) }
      : { ...dannyDribble(t * 3, .5), mouth: 'grin', lookX: .5, turn: .3 };
    put('danny', 760, gy - (1 - landK) * 700, KP, o);
    if (t < 48.45) put('dragon', lerp(760, W + 300, seg(t, 48.0, 48.9)), lerp(gy - 300, 80, seg(t, 48.0, 48.9)), KP * .95, { ...dragonFlight(t, { speed: 3, lift: 0 }), flip: false, noShadow: true });
    // Clawd floats by the tower and cheers each block
    const ck = on(t, 49.0, 64.13, .3);
    if (ck > 0) put('clawd', TX0 + 360, 330 + 20 * Math.sin(t * 2.5), KP * 2.2 * ck, { holo: 1, eyes: counting || lvl ? 'spark' : 'happy', mouth: 'grin', aL: 1.2 * hop(t), aR: 1.2 * hop(t, .5), noShadow: true });
    dmSlam('LEVEL 7!', W / 2, 190, 170, C.gold, t, LEVEL7, 1.1, { shake: 12 });
    dmSlam("CAN'T BE STOPPED!", W / 2, 330, 90, C.white, t, 62.17, 1.8);
    flash(.6 * kickK(t, LEVEL7, 5));
  }

  // =====================================================================================
  // 64.13–111.95 · boss: one continuous fight
  const BOSS = 64.13, BTXT = 64.47, DODGES = [...Array(8)].map((_, i) => 68.11 + i * BEAT), STAIRS = [72.35, 73.35, 74.35], BEAM = 73.6, BOOTS = 74.0;
  const ONHEAD = 77.0, BALLTOSS = 78.4, LAUNCH = 79.4, KICK = 84.05, HIT = 84.32, LANDB = 85.7, SAMI_UP = 88.3, SAF_UP = 89.8, YANK = 90.3;
  const LC = 92.1, CANDLES = [...Array(7)].map((_, i) => 92.75 + i * 2 * BEAT), RUMBLE = 99.99, END = 111.95;
  const BX = 1460, BB = 210, TXB = 220;
  const bossHead = (t, gy) => [BX + 18 * Math.sin(t * 3), gy - BB * 2.1 - 40 * hop(t) * (t < LAUNCH ? 1 : 0)];
  function bossDraw(t, gy, o = {}) {
    const [hx, hy] = bossHead(t, gy), by = hy + BB * 2.1;
    dmCreeper(hx, by, BB, t, { swell: o.swell || 0 });
    // Robo-Safadi's LED eyes, glaring red
    for (const ex of [-.32, .08]) { X.save(); X.shadowColor = '#FF2A2A'; X.shadowBlur = 30; shape(rectPts(hx + ex * BB, by - BB * 1.8 + (o.lookUp ? -BB * .06 : 0), BB * .24, BB * .14), { fill: '#FF3B3B', stroke: null }); X.restore(); }
    // a moustache like the professor's
    shape([[hx - BB * .3, by - BB * 1.38], [hx, by - BB * 1.46], [hx + BB * .3, by - BB * 1.38], [hx + BB * .18, by - BB * 1.32], [hx, by - BB * 1.38], [hx - BB * .18, by - BB * 1.32]], { fill: '#3B2530', stroke: null });
  }
  function boss(t) {
    const goalT = HIT, gone = t > goalT;
    // sky: red battle → bright victory → dusk to neon for the rumble
    const sky0 = t < goalT ? '#FF6A5A' : t < RUMBLE ? '#6EC0FF' : mixCol('#6EC0FF', '#3A1A7A', seg(t, RUMBLE, 108));
    const sky1 = t < goalT ? '#FFC07A' : t < RUMBLE ? '#BDE6FF' : mixCol('#BDE6FF', '#FF7A3D', seg(t, RUMBLE, 108));
    const stomps = t < LAUNCH ? [...Array(Math.max(0, Math.floor((Math.min(t, LAUNCH) - BOSS) / BEAT) + 1))].map((_, i) => [BOSS + i * BEAT, 10]) : [];
    const hits = [[BOSS, 26], [HIT, 40], ...stomps.slice(-2), ...DODGES.map(d => [d, 14])];
    const wind = seg(t, 80.07, KICK) * (1 - seg(t, KICK, KICK + .2));     // the slow-motion windup: zoom and letterbox
    withShake(t, hits, () => {
      const zoom = 1 + .35 * ease(wind), [zx, zy] = [960, 330];
      X.save(); X.translate(zx, zy); X.scale(zoom, zoom); X.translate(-zx, -zy);
      const pan = ease(seg(t, BOSS, BOSS + .6)), gy = dmBlockWorld(t, B, { ox: 30000 + 900 * pan, sky0, sky1 });
      // the tower, now at the left
      const txp = lerp(TX0, TXB, pan), rumbleK = seg(t, RUMBLE, END);
      const [rx, ry] = shakeXY(t, 10 * rumbleK * rumbleK);
      X.save(); X.translate(rx, ry); tower(txp, gy, t, 7, { lands: COUNTS, glow: Math.max(on(t, 60, BOSS + .5, .3) * (1 - pan), .25 + .75 * rumbleK * (1 + .2 * pulse(t, 4)) * (t > RUMBLE ? 1 : 0)) });
      // candles planted on top
      CANDLES.forEach((c, i) => { const f = seg(t, c + .1, c + .6); if (f <= 0) return; const tx = txp + 10 + i * 12, ty = gy - 7 * TB; if (f >= 1) candle(tx, ty, .55, t, i); });
      X.restore();
      // the boss
      if (!gone) bossDraw(t, gy, { lookUp: t > LAUNCH, swell: seg(t, KICK, HIT) });
      dmSlam('BOSS FIGHT!', W / 2, 180, 150, '#FF3B3B', t, BTXT, 1.6, { shake: 14 });
      // dodge: a block falls on Danny's spot each beat; he rolls clear
      const dodgeX = i => (i % 2 ? 560 : 780);
      DODGES.forEach((d, i) => { const f = seg(t, d - .35, d); if (t > d + .5 || f <= 0) return; const x = i ? dodgeX(i - 1) : 780; dmBlock(x - 55, lerp(-150, gy - 110, easeIn(f)), 110, 'stone'); if (t > d) dmPop('CRASH!', x, gy - 180, 50, C.white, t, d, .5); });
      // the staircase and the climb
      STAIRS.forEach((s0, i) => { const f = easeIn(seg(t, s0 - .35, s0)); if (f <= 0 || t > HIT + .2) return; for (let h = 0; h <= i; h++) dmBlock(900 + i * 130, lerp(-200 - h * 120, gy - (h + 1) * 120, f), 120, 'wood'); });
      // Danny's position by phase
      let dx = 700, dy = gy, pose = { ...run(t, .4), turn: .4, mouth: 'grin', brows: 'focused' }, scale = KP, rot = 0;
      if (t < 68.11) { dx = 640; pose = { handL: [-4.2, -11.7], handR: [4.2, -11.7], footL: [-2, -1.05], footR: [2, -1.05], brows: 'focused', mouth: 'smirk', dy: .38, turn: .4 }; }
      else if (t < 72.1) { const i = Math.min(7, Math.floor((t - 68.11) / BEAT)), f = frac((t - 68.11) / BEAT); dx = lerp(i ? dodgeX(i - 1) : 780, dodgeX(i), ease(seg(f, .55, .95))); rot = f > .55 && f < .95 ? (dodgeX(i) > (i ? dodgeX(i - 1) : 780) ? 1 : -1) * TAU * ease(seg(f, .55, .95)) : 0; dy = gy - 40 * Math.sin(Math.PI * seg(f, .55, .95)); pose = { ...air, eyes: 'squeeze' }; }
      else if (t < ONHEAD) { const i = STAIRS.filter(s0 => t > s0 + .1).length; dx = i ? 900 + (i - 1) * 130 + 60 : 640; dy = gy - i * 120 - 70 * hop(t); pose = i < 3 ? air : { ...air, eyes: 'happy', handL: [-4, -12], handR: [4, -12] };
        if (t > 75.6) { const f = seg(t, 75.6, ONHEAD); const [hx, hy] = bossHead(t, gy); dx = lerp(1220, hx, f); dy = lerp(gy - 360, hy - BB * .2 + 20, f) - 200 * 4 * f * (1 - f); } }
      else if (t < LAUNCH) { const [hx, hy] = bossHead(t, gy); dx = hx + 40 * Math.sin(t * 5); dy = hy - BB * .2 + 20; pose = { ...dannyDribble(t * 4, 1), mouth: 'grin', brows: 'focused', turn: -.3 }; }
      else if (t < KICK) { const f = easeOut(seg(t, LAUNCH, 80.3)); dx = lerp(BX, 900, f); dy = lerp(gy - BB * 2.4, 470, f) + 20 * Math.sin(t * 2); pose = { ...air, eyes: t > 82.0 ? 'open' : 'happy', brows: t > 82.0 ? 'focused' : 'up', mouth: t > 82 ? 'smirk' : 'open' }; rot = -1.4 * ease(seg(t, 81, KICK)); scale = KP * (1 + .25 * wind); }
      else if (t < LANDB) { const f = seg(t, KICK, LANDB); dx = lerp(900, 700, f); dy = lerp(470, gy, easeIn(f)); rot = lerp(-1.4 - Math.PI, -TAU, ease(seg(t, KICK, KICK + .35))); pose = { ...air, footR: [3, -26], footL: [-2, -6], eyes: 'squeeze', mouth: 'grin' }; }
      else if (t < LC) { dx = 700; pose = { handL: [-4.3, -19.3], handR: [4.3, -19.3], handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'grin', jump: t < 88 ? 1.4 * hop(t) : 0, ...(t > YANK + .2 ? { lookX: .9, eyes: 'open', mouth: 'flat', brows: 'up' } : {}) }; }
      else if (t < RUMBLE) { const ci = CANDLES.findIndex(c => t < c), prevX = i => 520 + i * 150; const i = ci < 0 ? 7 : ci; const x0 = i ? prevX(i - 1) : 700, x1 = i < 7 ? prevX(i) : 380, c0 = i ? CANDLES[i - 1] : LC + .2, c1 = i < 7 ? CANDLES[i] : CANDLES[6] + 1.5;
        const f = seg(t, c0, c1); dx = lerp(x0, x1, ease(f)); const jf = seg(t, c1 - .4, c1 + .1); dy = gy - (i < 7 ? 220 * Math.sin(Math.PI * jf) : 0); pose = jf > 0 && jf < 1 ? air : { ...run(t, .9), turn: x1 > x0 ? .5 : -.5, mouth: 'grin' }; }
      else { dx = 520; pose = { lookX: .8 * Math.sin(t * 1.3), lookY: -.3, brows: 'up', mouth: seg(t, 108, END) > 0 ? 'o' : 'smile', eyes: t > 108 ? 'wide' : 'open', handL: [-4.4, -12], handR: [4.4, -12], dy: .2 * hop(t) }; }
      const bootsOn = t > BOOTS && t < LANDB + .5;
      X.save(); X.translate(dx, dy - 60 * scale); X.rotate(rot); X.translate(-dx, -dy + 60 * scale);
      const A = put('danny', dx, dy, scale, { ...pose, noShadow: rot !== 0 });
      if (bootsOn) for (const f of [A.footL, A.footR]) { X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.shadowColor = C.cyan; X.shadowBlur = 30; ellipse(f[0], f[1], 18, 10, { fill: C.cyan, stroke: PAL.ink, lwPx: 2 }); X.restore(); }
      X.restore();
      // Clawd beams in the SUPER BOOTS and tosses the ball
      const ck = on(t, BEAM - .3, BALLTOSS + 1.2, .25);
      if (ck > 0) {
        const cx = 260 + 60 * Math.sin(t * 2), cy = 250;
        put('clawd', cx, cy, KP * 2.2 * ck, { holo: 1, eyes: 'spark', mouth: 'grin', aR: 1.4, noShadow: true });
        if (t > BEAM && t < BOOTS + .4) { const ft = A.footL, inv = X.getTransform().inverse().transformPoint({ x: ft[0], y: ft[1] }); line([[cx + 40, cy - 40], [inv.x, inv.y]], { stroke: rgba(C.cyan, .7), lwPx: 18 }); line([[cx + 40, cy - 40], [inv.x, inv.y]], { stroke: '#FFFFFF', lwPx: 5 }); }
      }
      dmSlam('SUPER BOOTS!', W / 2, 170, 120, C.cyan, t, BOOTS, 1.6, { shake: 8 });
      // the ball: tossed by Clawd, carried through the launch, hanging in the windup, then the strike
      if (t > BALLTOSS && t < HIT) {
        let bx, by;
        if (t < LAUNCH) { const f = seg(t, BALLTOSS, LAUNCH), ft = X.getTransform().inverse().transformPoint({ x: A.footR[0], y: A.footR[1] }); bx = lerp(300, ft.x, f); by = lerp(250, ft.y - 30, f) - 200 * 4 * f * (1 - f); }
        else if (t < KICK) { bx = dx + 110; by = dy - 120 * scale + 10 * Math.sin(t * 3); }
        else { const f = seg(t, KICK, HIT); const [hx, hy] = bossHead(t, gy); bx = lerp(dx + 60, hx, f); by = lerp(dy - 150, hy - BB * 1.4, f); for (let i = 1; i < 6; i++) circle(lerp(dx + 60, hx, f - i * .06), lerp(dy - 150, hy - BB * 1.4, f - i * .06), 24 - i * 3, { fill: rgba(C.gold, .5 - i * .08), stroke: null }); }
        dannyBall(bx, by, 16, { spin: t * 8 });
      }
      // the GOAL: a huge broccoli boom, pixel debris, florets raining
      const [hx, hy] = [BX, gy - BB * 1.4];
      dmBoom(hx, hy, 520, seg(t, HIT, HIT + 1.3), '#9CFF6A');
      if (t > HIT && t < 92) for (let i = 0; i < 26; i++) { const u = t - HIT, a = -Math.PI * (.05 + .9 * hash(i * 3)), d = 400 + 800 * hash(i); const fx = hx + Math.cos(a) * d * Math.min(u, 1.2), fy = hy + Math.sin(a) * d * Math.min(u, 1.2) * 1.2 + 260 * u * u; if (fy < H + 60) dmBroccoli(fx, fy, 30, u * 6 + i); }
      // Sami pops out for a floret; Safadi yanks him back: SHH!
      const samiK = on(t, SAMI_UP, YANK + .15, .2), safK = on(t, SAF_UP, YANK + .5, .2);
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) dmBlock(1080 - B + i * B, gy - (j + 1) * B, B, j ? 'leaf' : 'wood');
      X.save(); X.beginPath(); X.rect(800, 0, 560, gy - 2 * B + 4); X.clip();
      if (safK > 0) put('safadi', 1180, gy - 2 * B + 150 + (1 - safK) * 330, KP, { handL: [-6, -20], handPoseL: 'fist', handR: [1, -24], handPoseR: 'point', eyes: 'narrow', brows: 'angry', mouth: 'o' });
      if (samiK > 0) { const munch = t > SAMI_UP + .5 && Math.floor(t * 8) % 2; const S = put('sami', 1010, gy - 2 * B + 150 + (1 - samiK) * 330, KP, { handR: [1.5, -22], handPoseR: 'fist', eyes: 'happy', mouth: munch ? 'O' : 'grin' }); if (t < SAMI_UP + .9) dmBroccoli(S.handR[0], S.handR[1] - 20, 24, 0); }
      X.restore();
      dmPop('+1 HEALTH', 1010, gy - 2 * B - 260, 50, '#FF6B9A', t, SAMI_UP + .7, 1.0);
      dmPop('SHH!', 1180, gy - 2 * B - 300, 70, C.cyan, t, YANK, .8);
      if (t > YANK + .4 && t < LC) dmPop('?', 790, gy - 280, 80, C.cyan, t, YANK + .4, 1.4);
      // the victory lap: seven candles over the meadow, each flies to the tower top
      CANDLES.forEach((c, i) => {
        const x = 520 + i * 150, y = gy - 380 + 20 * Math.sin(t * 3 + i);
        if (t > LC && t < c) candle(x, y, 1.2, t, i);
        else if (t >= c && t < c + .6) { const f = ease(seg(t, c, c + .6)); candle(lerp(x, txp + 10 + i * 12, f), lerp(y, gy - 7 * TB, f) - 200 * 4 * f * (1 - f), lerp(1.2, .55, f), t, i); }
        dmPop(`${i + 1}/7`, x, y - 120, 46, C.gold, t, c, .7);
      });
      dmSlam('LEVEL COMPLETE?', W / 2, 180, 120, C.white, t, LC, 2.0, { shake: 6 });
      dmSlam('GOAL!!!', W / 2, 200, 220, C.gold, t, HIT + .05, 2.4, { shake: 20 });
      // the rumble: giggles from behind the blocks, sparkles rising
      if (t > RUMBLE) {
        [[101.0, 1500, 'hee hee!'], [103.5, 1700, 'giggle!'], [105.6, 1250, 'shhh…'], [107.7, 1600, 'hee hee!'], [109.4, 1350, 'psst!']].forEach(([g, x, txt]) => dmPop(txt, x, gy - 250, 46, '#FFE7F5', t, g, 1.1));
        for (let i = 0; i < 30; i++) { const u = frac(hash(i) + (t - RUMBLE) * (.25 + .2 * hash(i * 3))), x = txp + TB / 2 + (hash(i * 7) - .5) * 500, y = gy - u * 900; shape(starPts(x, y, 10 + 10 * rumbleK, .4, 4, t * 2 + i), { fill: FIRE[i % 6], stroke: null, alpha: rumbleK * (1 - u) }); }
        if (t > 108) dmPop('!', 560, gy - 300, 110, C.gold, t, 108.2, 3.6);
      }
      X.restore();
      dmLetterbox(ease(wind));
    });
    flash(.85 * kickK(t, HIT, 5) + .6 * kickK(t, BOSS, 6));
    if (wind > .05 && t < KICK) for (let i = 0; i < 40; i++) { const a = hash(i) * TAU, r0 = 300 + 500 * frac(hash(i * 3) + t * .6), r1 = r0 + 140; line([[960 + Math.cos(a) * r0, 400 + Math.sin(a) * r0], [960 + Math.cos(a) * r1, 400 + Math.sin(a) * r1]], { stroke: rgba('#FFFFFF', .35 * wind), lwPx: 4 }); }
  }

  const sh = { runChase, build, boss };
  return { run: runChase, chase: runChase, build, boss, dodge: boss, climb: boss, powerUp: boss, windup: boss, bicycle: boss, shush: boss, victory: boss, rumble: boss,
    _game: { ...sh, RIG, put, yearBlock, candle, icon, YEARS, TB, B, hop, bpos, BEAT, air } };   // shared with party.js
})());
