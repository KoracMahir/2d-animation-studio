// scenes/birthday/scene69_thirteen_trick_shots/finale.js: halftime to the end (105.7–192.26 s).
//   halftime     105.7–121.6  Safadi's tactics board ("Allow me to EXPLAIN!"), then Housam's halftime freestyle, the crowd counting
//   megaDefense  121.6–138.2  the defense assembles a bar at a time: MEGA Robo-Safadi, Dragon on the crossbar, Neptune's water
//                             wall, the twin towers; then the standoff
//   grandFinale  138.2–146.0  Clawd on the big screen; Safadi's hologram trajectory, "simply impeccable"; LET'S GO
//   shot10       146.0–149.29 a power shot through the water wall
//   shot11       149.29–151.87 a rocket up to heaven and down over Dragon
//   shot12       151.87–155.77 off the crossbar, off MEGA Robo's head, in
//   shot13       155.77–160.5 the Fibonacci spiral (1, 1, 2, 3, 5, 8, 13) and the backflip bicycle kick that rides it
//   surprise     160.5–169.7  the net rips into HAPPY 13th HOUSAM! · #10 flips to #13 · the cast storms the pitch, lifts him,
//                             and Dragon brings the cake
//   teenager     169.7–176.7  fireworks spell TEENAGER over Housam, then the whole cast under the fireworks
//   sarah        176.7–188.2  Sarah drops in: "Welcome to the club." "Yeah bro… I mean sis." "Whatever."
//   finalShot    188.2–192.26 the moustache pops on, majestic; HAPPY BIRTHDAY HOUSAM!
Object.assign(TT_SHOTS, (() => {
  const { C, FIRE, GOALS, hop, bpos, beatK, kickK, slamK, on, bigText, burst, track, BAR, BEAT, cannon, confetti, fireWord, cake, MO } = TT;
  const { sp, sorted, who, hou, ballAt } = PITCH, { goalShot, REST, mix, runPose, kickPose, closeUp } = GOALS_KIT;
  const cheerArms = (t, ph = 0) => { const u = hop(t, ph); return { handL: [-5.5, -20 - 4 * u], handR: [5.5, -20 - 4 * u], handPoseL: 'palm', handPoseR: 'palm', jump: .35 * u, eyes: 'happy', mouth: u > .5 ? 'open' : 'grin' }; };
  const SEATED = new Set(['pearl', 'neptune']);
  const cheer = (w, t, i) => ({ t, ...cheerArms(t, i * .21), ...(SEATED.has(w) ? { jump: 0 } : {}) });
  const putAt = (c, w, x, d, o, y = 0, sc = 1) => { const [sx, sy, k] = sp(c, x, y, d); return TT.put(w, sx, sy, k * sc, o); };

  // =====================================================================================
  // 105.7–121.6 · halftime
  const FREE = BAR(58);                                  // 113.46: the freestyle starts
  function board(x, y, w, h, t, t0) {                    // Safadi's tactics board, chalk arrows slamming in on each beat
    shape(rectPts(x - 14, y - 14, w + 28, h + 28), { fill: '#8A5A34', stroke: PAL.ink, lwPx: 4 });
    shape(rectPts(x, y, w, h), { fill: '#24453A', stroke: null });
    const ch = 'rgba(255,255,255,.85)', n = Math.floor((t - t0) / BEAT);
    X.save(); X.font = `46px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = ch;
    X.fillText('THE PLAN', x + w / 2, y + 44);
    const Os = [[.78, .35], [.78, .65], [.62, .5], [.5, .3], [.5, .7]];
    Os.forEach(([u, v], i) => { if (n > i) { circle(x + u * w, y + v * h, 22, { fill: null, stroke: ch, lwPx: 5 }); } });
    if (n > 5) { const p = [[x + .12 * w, y + .55 * h], [x + .3 * w, y + .3 * h], [x + .55 * w, y + .45 * h], [x + .9 * w, y + .5 * h]]; line(p, { stroke: C.gold, lwPx: 6, smooth: true }); X.fillStyle = C.gold; X.fillText('X', x + .12 * w, y + .6 * h); }
    if (n > 8) { X.font = `58px ${FONT_SFX}`; X.fillStyle = C.red; X.save(); X.translate(x + w / 2, y + h * .82); X.rotate(-.08); X.fillText('STOP HIM!', 0, 0); X.restore(); }
    X.restore();
  }
  function halftime(t, lt) {
    if (t < FREE) {
      const c = { x: -2400, z: 2.6, y: 0 };
      PITCH.back(c, t, { cheer: .7, goal: false, phones: true, board: 'HALF TIME  ·  HOUSAM 9  ·  DEFENDERS 0  ·  ' });
      board(720, 300, 760, 440, t, 105.9);
      const L = [{ d: .5, draw: () => { const A = putAt(c, 'safadi', -2700, .5, { t, mouth: lipFlap(t, t > 106.0 && t < 108.6 || t > 109.2 && t < 111.4, 'smile'), handR: [5.6, -24], handPoseR: 'point', handL: [-4.6, -14], brows: 'up', eyes: 'open' });
        if (t > 106.0 && t < 109.0) callout('Allow me to EXPLAIN!', A.head[0] + 40, A.head[1] - 60, t - 106.0);
        if (t > 109.2 && t < 113.4) callout('Nobody scores THIRTEEN!', A.head[0] + 40, A.head[1] - 60, t - 109.2); } }];
      [['sami', -2050, .7], ['robo', -1800, .75], ['jester', -2250, .78]].forEach(([w, x, d], i) => L.push({ d, draw: () => putAt(c, w, x, d, { t, eyes: 'open', mouth: 'smile', jump: .15 * hop(t, i * .3), tilt: .08 * Math.sin(bpos(t) * Math.PI) }) }));
      sorted(L);
      TT.counter(t);
      return;
    }
    // the freestyle: around the world, neck stall, rainbow flicks; the crowd counts every touch
    const c = { x: -1250, z: 3.1, y: 10 }, n = Math.floor((t - FREE) / BEAT) + 1;
    PITCH.back(c, t, { cheer: 1, goal: false, phones: true, hands: .3, board: 'HALF TIME SHOW  ·  FREESTYLE  ·  ' });
    const ph = frac((t - FREE) / BEAT), trick = Math.floor(n / 4) % 4;
    let bx = -1220, by = 30 + 90 * Math.sin(Math.PI * ph), o = { ...REST, handL: [-5.2, -14], handR: [5.2, -14], brows: 'focused', mouth: 'grin', lookY: .3 };
    if (trick === 0) o.footR = mix(REST.footR, [1.9, -4.6], 1 - clamp(by / 60));
    if (trick === 1) { bx = -1250 + 60 * Math.cos(ph * TAU); by = 40 + 30 * Math.sin(ph * TAU); o.footR = [1.6, -4.5]; o.footL = [-1.4, -1.05]; }
    if (trick === 2) { by = 300 + 30 * Math.sin(t * 6); bx = -1250; o = { ...o, tilt: .1, lean: .15, handL: [-6.5, -18], handR: [6.5, -18], lookY: -.5, dy: 2 }; }
    if (trick === 3) { by = 30 + 220 * Math.sin(Math.PI * ph); bx = -1250 + lerp(-60, 60, ph); o.footR = ph < .2 ? [-.6, -5] : REST.footR; }
    const L = [{ d: .5, draw: () => hou(c, -1250, .5, o, t) }, { d: .47, draw: () => ballAt(c, bx, by, .47, t * 9) }];
    [['danny', -1750, .8], ['jenna', -800, .82], ['alma', -650, .78]].forEach(([w, x, d], i) => L.push({ d, draw: () => putAt(c, w, x, d, cheer(w, t, i)) }));
    sorted(L);
    overlay(() => { bigText(String(n), W / 2 + 520, 300, 200, FIRE[n % FIRE.length], 1 + .4 * kickK(t, FREE + (n - 1) * BEAT, 6), -.05, { glow: C.white });
      bigText(['KEEPIE-UPPIE', 'AROUND THE WORLD', 'NECK STALL!', 'RAINBOW FLICK'][trick], W / 2 + 520, 450, 64, C.white, 1, .03); });
    TT.counter(t);
  }

  // =====================================================================================
  // the defense, shared by megaDefense and shots 10–12
  const WALL_X = -430;
  function waterWall(c, t, k = 1, hole = 0) {
    if (k <= .01) return;
    const h = 300 * k, a = sp(c, WALL_X, 0, .18), b = sp(c, WALL_X, 0, .82), b2 = sp(c, WALL_X, h, .82), a2 = sp(c, WALL_X, h, .18);
    X.save(); X.globalAlpha = .55;
    shape([a, b, b2, a2], { fill: linGrad(0, a2[1], 0, a[1], [[0, '#BFF1FF'], [1, '#2E8BFF']]), stroke: null }); X.restore();
    for (let i = 0; i < 10; i++) { const u = frac(i / 10 + t * .8), p = sp(c, WALL_X, h * (1 - u), lerp(.2, .8, hash(i))); circle(p[0], p[1], 6, { fill: '#FFFFFF', stroke: null, alpha: .6 }); }
    if (hole > 0) { const p = sp(c, WALL_X, 150, .55); for (let i = 0; i < 18; i++) { const a3 = i / 18 * TAU, d = 160 * easeOut(hole) * p[2]; circle(p[0] + Math.cos(a3) * d, p[1] + Math.sin(a3) * d * .7, 12 * (1 - hole), { fill: '#DFF7FF', stroke: null }); } }
  }
  // which defenders are in and how: k values 0..1
  function defense(c, t, L, o = {}) {
    const robo = o.robo ?? 1, dragonK = o.dragon ?? 1, wall = o.wall ?? 1, twins = o.twins ?? 1;
    if (robo > 0) L.push({ d: .5, draw: () => putAt(c, 'robo', -60, .5, { t, eyes: 'wide', mouth: 'grin', handL: [-6, -19], handR: [6, -19], handPoseL: 'palm', handPoseR: 'palm', jump: .1 * hop(t), ...(o.roboO || {}) }, 0, lerp(.4, 1.6, easeOut(robo))) });
    if (dragonK > 0) L.push({ d: .52, draw: () => putAt(c, 'dragon', 0, .5, { t, eyes: 'happy', mouth: 'grin', ...(o.dragonO || {}) }, lerp(700, 244, easeOut(dragonK))) });
    if (wall > 0) {
      L.push({ d: .3, draw: () => waterWall(c, t, wall, o.hole ?? 0) });
      L.push({ d: .95, draw: () => putAt(c, 'neptune', -700, .95, { t, eyes: 'happy', mouth: 'grin', ...(o.neptuneO || {}) }) });
    }
    if (twins > 0) [['safadi', -800, .28, -1], ['sami', -800, .72, 1]].forEach(([w, x, d, sd]) => L.push({ d, draw: () => putAt(c, w, x + sd * 800 * (1 - easeOut(twins)) * 0, d, { t, handL: [-6.2, -24], handR: [6.2, -24], handPoseL: 'palm', handPoseR: 'palm', eyes: 'open', brows: 'focused', mouth: 'flat', ...(o.twinsO || {}) }, 0, 1 + .12 * easeOut(twins) * 0) }));
  }

  // 121.6–138.2 · megaDefense
  const DEF = [BAR(63), BAR(64), BAR(65), BAR(66)], STANDOFF = BAR(67);
  function megaDefense(t, lt) {
    const stand = t >= STANDOFF;
    const c = stand ? { x: lerp(-900, -700, seg(t, STANDOFF, 138.2)), z: lerp(1.5, 1.9, ease(seg(t, STANDOFF, 138.2))), y: 40 } : { x: -350, z: 2.0, y: 60 };
    const [sx0, sy0] = TT.shake(t, DEF.map(a => [a, 26, 5]));
    X.save(); X.translate(sx0, sy0);
    const set = { cheer: .6, phones: true, board: 'DEFENSE  ·  DEFENSE  ·  ' };
    PITCH.back(c, t, set);
    const L = [];
    const k = i => t < DEF[i] - .3 ? 0 : seg(t, DEF[i] - .3, DEF[i] + .1);
    defense(c, t, L, { robo: k(0), dragon: k(1), wall: k(2), twins: k(3) });
    if (t < DEF[0]) L.push({ d: .5, draw: () => putAt(c, 'robo', -60, .5, { t, eyes: 'wide', mouth: 'o' }, 0, .9) });
    if (stand) {
      const hx = -1500;
      L.push({ d: .5, draw: () => hou(c, hx, .5, t < 135.5 ? { handL: [-1, -13], handR: [1, -13], handPoseL: 'fist', handPoseR: 'fist', brows: 'focused', mouth: 'smirk', eyes: 'open' } : { ...GOALS_KIT.CELEB.flex(t), eyes: 'open', brows: 'focused' }, t) });
      L.push({ d: .47, draw: () => ballAt(c, hx + 40, 0, .47) });
    }
    sorted(L);
    PITCH.front(c, t, set);
    X.restore();
    const labels = ['MEGA KEEPER!', 'DRAGON BAR!', 'WATER WALL!', 'TWIN TOWERS!'];
    DEF.forEach((a, i) => overlay(() => bigText(labels[i], W / 2, 230, 130, FIRE[i], slamK(t, a) * (1 - seg(t, a + 1.6, a + 1.9)), -.04, { glow: C.white })));
    if (stand) {
      // the standoff: lightning between them, a zoom on every beat
      const k2 = beatK(t, 6), [ax, ay] = sp(c, -1500, 120, .5), [bx2, by2] = sp(c, -500, 150, .5);
      X.save(); X.globalAlpha = .5 + .5 * k2; const pts = []; for (let i = 0; i <= 10; i++) pts.push([lerp(ax + 80, bx2 - 80, i / 10), lerp(ay, by2, i / 10) + (i % 10 ? (hash(i + Math.floor(t * 12)) - .5) * 80 : 0)]);
      line(pts, { stroke: C.cyan, lwPx: 8 }); line(pts, { stroke: '#FFFFFF', lwPx: 3 }); X.restore();
      overlay(() => { bigText('1 vs 5', W / 2, 220, 150, C.white, slamK(t, STANDOFF), -.03); bigText('4 TO GO', W / 2, 360, 110, C.gold, slamK(t, STANDOFF + 1.9), .04, { glow: C.white }); });
    }
    TT.counter(t);
  }

  // =====================================================================================
  // 138.2–146.0 · grandFinale
  function grandFinale(t, lt) {
    if (t < 141.7) {
      const c = { x: -400, z: 1.7, y: 260 };
      PITCH.back(c, t, { cheer: t > 140.4 ? 1 : .6, phones: true, hands: t > 140.4 ? 1 : 0, goal: false });
      TT.bigScreen(t, t < 140.4 ? 'READY?!' : 'ROAR!!!', 1.6, { y: 330 });
      if (t > 140.4) overlay(() => bigText('ROAR!', W / 2, 720, 170, C.orange, slamK(t, 140.42), -.04, { glow: C.white }));
      TT.counter(t); return;
    }
    if (t < 143.6) {
      // Safadi's hologram: the trajectory, with glowing equations
      const c = { x: -1100, z: 3.0, y: 40 };
      PITCH.back(c, t, { cheer: .5, goal: false });
      const L = [{ d: .5, draw: () => putAt(c, 'safadi', -1350, .5, { t, mouth: lipFlap(t, t < 143.4, 'smile'), handR: [5.8, -24], handPoseR: 'point', handL: [-4.6, -14], eyes: 'wide', brows: 'up' }) }];
      sorted(L);
      const u = seg(t, 141.8, 143.2), pts = []; for (let i = 0; i <= 40 * u; i++) { const q = i / 40; pts.push([760 + q * 1050, 760 - 560 * 4 * q * (1 - q) + 120 * q]); }
      X.save(); X.shadowColor = C.cyan; X.shadowBlur = 24; if (pts.length > 1) line(pts, { stroke: C.cyan, lwPx: 8, smooth: true }); X.restore();
      ['y = v·t − ½gt²', 'θ = 27°', 'v = 33 m/s', '∑ = 13'].forEach((eq, i) => { const a = 141.9 + i * .35; if (t > a) { X.save(); X.globalAlpha = seg(t, a, a + .2); X.font = `46px ${FONT_TALK}`; X.fillStyle = C.cyan; X.shadowColor = C.cyan; X.shadowBlur = 14; X.fillText(eq, 1100 + 180 * (i % 2), 200 + i * 70); X.restore(); } });
      overlay(() => bigText('IMPECCABLE!', W / 2 + 200, 520, 120, C.gold, slamK(t, 143.0), -.05, { glow: C.white }));
      TT.counter(t); return;
    }
    // LET'S GO, GO, GO: Housam steps up to the defense, everyone pumped
    const c = { x: lerp(-1300, -900, ease(seg(t, 143.6, 146))), z: 2.2, y: 30 };
    PITCH.back(c, t, { cheer: 1, phones: true, hands: .5 });
    const L = []; defense(c, t, L);
    L.push({ d: .5, draw: () => hou(c, -1500, .5, { handL: [-6, -26], handR: [6, -26], handPoseL: 'fist', handPoseR: 'fist', eyes: 'happy', mouth: 'open', jump: .4 * hop(t) }, t) });
    L.push({ d: .47, draw: () => ballAt(c, -1460, 6 * hop(t), .47) });
    sorted(L); PITCH.front(c, t, {});
    [143.68, 144.08, 144.24].forEach((a, i) => overlay(() => bigText('GO!', W / 2 - 350 + i * 350, 260, 160, FIRE[i], slamK(t, a), -.06 + .06 * i, { glow: C.white })));
    TT.counter(t);
  }

  // =====================================================================================
  // 146.0–149.29 · shot 10: a power shot through the water wall
  const K10 = GOALS[9] - .5, THRU = K10 + .25;
  const shot10 = goalShot({
    g: GOALS[9], kick: K10, hx: -1100, hd: .5, target: [130, .58], apex: 10,
    pre: t => { const [hx] = track(t, [[146.0, -1600, 0, .5], [K10 - .1, -1100, 0, .5]]); return { hx, hd: .5, o: runPose((hx + 1600) / 45, { mouth: 'grin' }), ball: [hx + 40, 0, .47] }; },
    keeper: { who: 'robo', d: .5, dive: -1, late: true, scale: 1.6 },
    others: [{ who: 'dragon', x: 0, d: .52, y: 244, o: t => ({ eyes: t > GOALS[9] ? 'wide' : 'happy', mouth: t > GOALS[9] ? 'o' : 'grin' }) },
      { who: 'neptune', x: -700, d: .95, o: t => ({ eyes: t > THRU ? 'wide' : 'happy', mouth: t > THRU ? 'o' : 'grin' }) },
      { who: 'safadi', x: -800, d: .28, o: t => ({ handL: [-6.2, -24], handR: [6.2, -24], eyes: 'open', mouth: 'flat' }) }, { who: 'sami', x: -800, d: .72, o: t => ({ handL: [-6.2, -24], handR: [6.2, -24], eyes: 'open', mouth: 'flat' }) }],
    fx: (t, c, L) => { L.push({ d: .3, draw: () => waterWall(c, t, 1, t > THRU ? seg(t, THRU, THRU + .5) : 0) }); if (t > THRU) { const [x, y] = sp(c, WALL_X, 280, .5); sfx('SPLASH!', x, y - 60, 90, C.cyan, t - THRU, { life: 1 }); } },
    pose: 'flex',
  });

  // 149.29–151.87 · shot 11: up to heaven, and down over Dragon on the bar
  const K11 = GOALS[10] - 1.05;
  const shot11 = goalShot({
    g: GOALS[10], kick: K11, hx: -1000, hd: .5, target: [200, .42],
    pre: t => ({ hx: -1000, hd: .5, o: { handL: [-4.6, -12], handR: [4.6, -12], mouth: 'smirk', brows: 'focused', eyes: 'open', lookX: .4 }, ball: [-960, 0, .47] }),
    path: t => { const u = clamp((t - K11) / (GOALS[10] - K11)); if (t > GOALS[10]) { const dt = t - GOALS[10]; return [lerp(40, 160, easeOut(seg(dt, 0, .35))), Math.max(0, 200 - 900 * dt * dt), .42]; } return [lerp(-960, 40, u), 2000 * Math.sin(Math.PI * u) * (1 - u * .1) + lerp(0, 200, u), lerp(.47, .42, u)]; },
    keeper: { who: 'robo', d: .5, dive: 1, late: true, scale: 1.6, o: t => ({ lookY: -1 }) },
    others: [{ who: 'dragon', x: 0, d: .52, y: 244, o: t => ({ eyes: 'wide', mouth: 'o', lookY: -1, headTilt: -.2 }) }],
    cam: (t, hx, b, fol) => { const z = lerp(2.2, 1.6, Math.sin(Math.PI * fol)); return { x: lerp(-700, -330, fol), z, y: t < GOALS[10] ? Math.max(0, b[1] - 200) : 20 }; },
    fx: (t, c) => { if (t > K11 + .2 && t < GOALS[10]) overlay(() => bigText('TO HEAVEN!', W / 2, 200, 120, C.gold, slamK(t, K11 + .25), -.04, { glow: C.white })); },
    pose: 'eureka',
  });

  // 151.87–155.77 · shot 12: off the crossbar, off MEGA Robo's head, in
  const K12 = 153.0, BAR_HIT = 153.48, HEAD = 154.15;
  const shot12 = goalShot({
    g: GOALS[11], kick: K12, hx: -1100, hd: .5, target: [60, .5],
    pre: t => { const [hx] = track(t, [[151.87, -1500, 0, .5], [K12 - .1, -1100, 0, .5]]); return { hx, hd: .5, o: runPose((hx + 1500) / 45), ball: [hx + 40, 0, .47] }; },
    path: t => t < BAR_HIT ? track(t, [[K12, -1060, 0, .47], [BAR_HIT, 0, 244, .5, 40]]) : t < HEAD ? track(t, [[BAR_HIT, 0, 244, .5], [HEAD, -60, 420, .5, 160]]) : t < GOALS[11] ? track(t, [[HEAD, -60, 420, .5], [GOALS[11], 60, 60, .5, 60]]) : [lerp(60, 160, easeOut(seg(t, GOALS[11], GOALS[11] + .35))), Math.max(0, 60 - 600 * (t - GOALS[11]) ** 2), .5],
    keeper: { who: 'robo', d: .5, dive: 0, scale: 1.6, o: t => ({ eyes: t > HEAD ? 'squeeze' : 'wide', mouth: 'o', tilt: t > HEAD ? .2 * Math.sin(t * 20) * kickK(t, HEAD, 2) : 0 }) },
    others: [{ who: 'dragon', x: 0, d: .52, y: 244, o: t => ({ eyes: t > BAR_HIT ? 'squeeze' : 'happy', mouth: 'o', jump: t > BAR_HIT ? 3 * kickK(t, BAR_HIT, 3) : 0 }) }],
    cam: (t, hx, b, fol) => ({ x: lerp(-750, -250, ease(seg(t, K12, BAR_HIT))), z: 2.3, y: 80 * seg(t, K12, BAR_HIT) }),
    fx: (t, c) => { [[BAR_HIT, 'CLANG!', 0, 244], [HEAD, 'BONK!', -60, 420]].forEach(([a, w, x, y]) => { if (t > a) { const [sx, sy] = sp(c, x, y, .5); sfx(w, sx + 60, sy - 70, 90, a === HEAD ? C.magenta : C.gold, t - a, { life: 1.1 }); } }); },
    pose: 'laugh',
  });

  // =====================================================================================
  // 155.77–160.5 · shot 13: the Fibonacci spiral and the backflip bicycle kick
  const FIB = [1, 1, 2, 3, 5, 8, 13], SQ0 = 156.0, K13 = 158.74, RIDE = [158.95, 159.82], G13 = GOALS[12];
  // squares and quarter arcs, built outward from the inner point (math coords, y up): each arc turns left
  const SPIRAL = (() => {
    let P = [0, 0], u = [1, 0]; const sq = [], arcs = [];
    for (const r of FIB) {
      const n = [-u[1], u[0]], Cc = [P[0] + r * n[0], P[1] + r * n[1]], v0 = [-n[0] * r, -n[1] * r], v1 = [u[0] * r, u[1] * r];
      sq.push([Cc, [Cc[0] + v0[0], Cc[1] + v0[1]], [Cc[0] + v0[0] + v1[0], Cc[1] + v0[1] + v1[1]], [Cc[0] + v1[0], Cc[1] + v1[1]]]);
      const pts = []; for (let i = 0; i <= 12; i++) { const a = i / 12 * Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a); pts.push([Cc[0] + v0[0] * ca + v1[0] * sa, Cc[1] + v0[1] * ca + v1[1] * sa]); }
      arcs.push(pts); P = [Cc[0] + v1[0], Cc[1] + v1[1]]; u = n;
    }
    return { sq, arcs, end: P };
  })();
  // fit the tiling into a box in the sky (screen space, y down)
  const BOX = (() => { const pts = SPIRAL.sq.flat(); const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]; })();
  const fit = (() => { const [x0, x1, y0, y1] = BOX, sc = Math.min(1300 / (x1 - x0), 640 / (y1 - y0)), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    return ([x, y]) => [W / 2 + 60 + (x - cx) * sc, 400 - (y - cy) * sc]; })();
  const SP_PTS = SPIRAL.arcs.flatMap(a => a).reverse().map(fit);     // outer end → inner point
  const spAt = q => { const i = clamp(q) * (SP_PTS.length - 1), j = Math.floor(i), a = SP_PTS[j], b = SP_PTS[Math.min(j + 1, SP_PTS.length - 1)]; return [lerp(a[0], b[0], i - j), lerp(a[1], b[1], i - j)]; };
  function shot13(t, lt) {
    const c = { x: -700, z: lerp(1.75, 1.6, seg(t, 155.77, K13)), y: 120 };
    const [sx0, sy0] = TT.shake(t, [[G13, 34], [K13, 12]]);
    X.save(); X.translate(sx0, sy0);
    const set = { cheer: t > G13 ? 1 : .8, phones: true, bulge: t > G13 ? kickK(t, G13, 3) : 0 };
    PITCH.back(c, t, set);
    const hx = -1080, flip = seg(t, K13 - .45, K13 + .35), hy = 150 * Math.sin(Math.PI * flip);
    const G = sp(c, 40, 170, .45), f = fit;
    // the golden squares slam in on the beats, the spiral glows
    SPIRAL.sq.forEach((q, i) => {
      const a = SQ0 + i * .44; if (t < a) return;
      const k = slamK(t, a), pts = q.map(f), cx = pts.reduce((s2, p) => s2 + p[0], 0) / 4, cy = pts.reduce((s2, p) => s2 + p[1], 0) / 4;
      X.save(); X.translate(cx, cy); X.scale(k, k); X.translate(-cx, -cy);
      shape(pts, { fill: rgba(C.gold, .12 + .1 * kickK(t, a, 4)), stroke: rgba(C.gold, .9), lwPx: 4 });
      X.font = `${Math.max(30, Math.min(150, Math.hypot(pts[0][0] - pts[1][0], pts[0][1] - pts[1][1]) * .45))}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = rgba('#FFFFFF', .85); X.fillText(String(FIB[i]), cx, cy);
      X.restore();
      X.save(); X.shadowColor = C.gold; X.shadowBlur = 20; line(SPIRAL.arcs[i].map(f), { stroke: C.gold, lwPx: 7 }); X.restore();
    });
    const L = [];
    defense(c, t, L, { roboO: { eyes: t > G13 ? 'squeeze' : 'wide', mouth: 'o', lookY: -.8 }, dragonO: { eyes: 'wide', mouth: 'o' }, twinsO: { eyes: 'wide', mouth: 'o', lookY: -.8 } });
    const o = t < K13 - .45 ? { ...REST, handL: [-5.2, -14], handR: [5.2, -14], brows: 'focused', mouth: 'smirk', lookY: -.6 } : { rot: -TAU * ease(flip), footR: [2.5, -9], footL: [-1.6, -4], handL: [-6, -10], handR: [6, -10], eyes: 'squeeze', mouth: 'grin' };
    L.push({ d: .5, draw: () => hou(c, hx, .5, o, t, hy) });
    sorted(L);
    // the ball: juggled up, then it rides the spiral into the goal
    let bxy;
    const foot = sp(c, hx + 40, t < K13 - .45 ? 30 + 60 * hop(t) : lerp(60, hy + 110, seg(t, K13 - .45, K13)), .47);
    if (t < K13) bxy = foot.slice(0, 2);
    else if (t < RIDE[0]) bxy = mix(foot, SP_PTS[0], ease(seg(t, K13, RIDE[0])));
    else if (t < RIDE[1]) bxy = spAt(ease(seg(t, RIDE[0], RIDE[1])));
    else if (t < G13) bxy = mix(SP_PTS[SP_PTS.length - 1], G, easeIn(seg(t, RIDE[1], G13)));
    if (t > RIDE[0] && t < G13) for (let i = 1; i < 10; i++) { const q = seg(t - i * .03, RIDE[0], RIDE[1]); if (q <= 0) continue; const p = t - i * .03 < RIDE[1] ? spAt(ease(q)) : SP_PTS[SP_PTS.length - 1]; circle(p[0], p[1], 26 - 2 * i, { fill: rgba(C.gold, .55 - i * .05), stroke: null }); }
    if (bxy) housamBall(bxy[0], bxy[1], TT.BR * c.z * .8 / 1.35, { spin: t * 16 });
    PITCH.front(c, t, set);
    if (t > G13) { burst(G[0], G[1], t - G13, 500, 40, 13); TT.ripple(G[0], G[1], 2.5, t, G13); }
    X.restore();
    overlay(() => { if (t > SQ0 && t < RIDE[1]) bigText('FIBONACCI!', W / 2, 990, 90, C.gold, slamK(t, SQ0 + .1), -.03, { glow: C.white }); });
    TT.counter(t);
    TT.goalSlam(t, { y: 300 });
  }

  // =====================================================================================
  // 160.5–169.7 · surprise
  const RIP = 160.5, FLIP = 162.56, STORM = 164.28, CAKE_IN = 166.6, BLOW = 168.0;
  const SURPRISE_CAST = [['danny', -380, .3], ['jenna', 380, .32], ['alma', -560, .55], ['safadi', 560, .6], ['sami', -760, .7], ['robo', 760, .74], ['jester', -200, .85], ['neptune', 220, .95], ['pearl', -980, .95], ['clawd', 900, .4]];
  function jerseyNumber(A, s, t) {                        // the number on his chest: 10, flipping over to 13
    const f = seg(t, FLIP, FLIP + .45), sx = Math.abs(Math.cos(f * Math.PI)), txt = f < .5 ? '10' : '13';
    X.save(); X.translate(A.chest[0], A.chest[1] + .6 * s); X.scale(Math.max(.05, sx), 1);
    X.font = `${Math.round(5.2 * s)}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
    X.lineWidth = s * .7; X.strokeStyle = '#1C2E66'; X.strokeText(txt, 0, 0); X.fillStyle = f >= .5 ? C.gold : '#425DA0'; X.fillText(txt, 0, 0);
    X.restore();
  }
  function surprise(t, lt) {
    if (t < FLIP) {
      // the net rips; the banner unrolls across the goal; SURPRISE!
      const c = { x: 0, z: 2.2, y: 170 };
      PITCH.back(c, t, { cheer: 1, phones: true });
      const u = easeOut(seg(t, RIP, RIP + .7)), a = sp(c, 0, 244, .2), b = sp(c, 0, 244, .8), h = (b[1] - sp(c, 0, 0, .8)[1]) * -u;
      PITCH.front(c, t, {});
      const gm = (a[0] + b[0]) / 2, bx0 = gm - 520, bx1 = gm + 520, by0 = 300, by1 = by0 + 560 * u;
      if (u > .01) { shape(rectPts(bx0, by0, bx1 - bx0, by1 - by0), { fill: '#FFF6E0', stroke: PAL.ink, lwPx: 5 }); for (let i = 0; i < 9; i++) circle(lerp(bx0, bx1, i / 8), by0 + 18, 9, { fill: FIRE[i % 6], stroke: null }); }
      if (u > .5) { const bh = by1 - by0, bw = bx1 - bx0, mx = (bx0 + bx1) / 2; X.save(); X.globalAlpha = seg(u, .5, 1); X.textAlign = 'center'; X.textBaseline = 'middle';
        X.font = `${Math.round(Math.min(bh * .3, bw * .16))}px ${FONT_SFX}`; X.fillStyle = C.magenta; X.fillText('HAPPY 13th', mx, by0 + bh * .34);
        X.font = `${Math.round(Math.min(bh * .32, bw * .17))}px ${FONT_SFX}`; X.fillStyle = C.blue; X.fillText('HOUSAM!', mx, by0 + bh * .72); X.restore(); }
      for (let i = 0; i < 14; i++) { const ag = t - RIP; if (ag > 0 && ag < 1) { const an = i / 14 * TAU; line([[(a[0] + b[0]) / 2 + Math.cos(an) * 120 * ag, a[1] + 120 + Math.sin(an) * 120 * ag], [(a[0] + b[0]) / 2 + Math.cos(an) * 260 * ag, a[1] + 120 + Math.sin(an) * 260 * ag]], { stroke: '#FFFFFF', lwPx: 5 }); } }
      cannon(0, H, -1.0, t, RIP + .2, 60, 2); cannon(W, H, -2.1, t, RIP + .2, 60, 5);
      confetti(t, RIP + .3, 90);
      overlay(() => bigText('SURPRISE!', W / 2, 165, 180, C.gold, slamK(t, RIP + .25), -.05, { glow: C.white }));
      flash(.7 * kickK(t, RIP, 6));
      TT.counter(t); return;
    }
    if (t < STORM) {
      // close: the jersey number flips 10 → 13
      X.fillStyle = linGrad(0, 0, 0, H, [[0, '#2E5BFF'], [1, '#0E1636']]); X.fillRect(0, 0, W, H);
      X.save(); X.translate(W / 2, 540); X.rotate(t * .4); for (let i = 0; i < 18; i++) { X.rotate(TAU / 18); X.fillStyle = rgba(i % 2 ? '#FFFFFF' : C.gold, .1); X.beginPath(); X.moveTo(0, 0); X.lineTo(1500, -120); X.lineTo(1500, 120); X.fill(); } X.restore();
      const s = 30, A = TT.hou(W / 2 - 40, 1330, s, { handL: [-2.6, -15], handR: [2.6, -15], handPoseL: 'point', handPoseR: 'point', eyes: 'wide', mouth: 'grin', brows: 'up', lookY: .6 }, t);
      jerseyNumber(A, s, t);
      overlay(() => { bigText('#10', 380, 330, 120, '#8FA8E8', 1 - seg(t, FLIP, FLIP + .3), -.05); bigText('NOW #13!', W - 400, 330, 120, C.gold, slamK(t, FLIP + .45), .05, { glow: C.white }); });
      confetti(t, FLIP - 2, 70, 9);
      TT.counter(t); return;
    }
    // the cast storms the pitch, lifts him up; Dragon flies in the cake
    const c = { x: -200, z: 2.0, y: 60 + 40 * seg(t, STORM, STORM + 1) };
    PITCH.back(c, t, { cheer: 1, phones: true, goal: false, banners: [['HAPPY 13th!', -900, C.magenta], ['HOUSAM #13', 200, C.blue]] });
    const L = [], lift = easeOut(seg(t, STORM + .4, STORM + 1.2));
    SURPRISE_CAST.forEach(([w, dx, d], i) => {
      const a2 = ease(seg(t, STORM + i * .06, STORM + .7 + i * .06)), x = -200 + dx * a2 + (1 - a2) * (dx < 0 ? -1600 : 1600);
      L.push({ d, draw: () => putAt(c, w, x, d, w === 'clawd' ? { t, eyes: 'happy', mouth: 'grin' } : cheer(w, t, i), w === 'clawd' ? 220 : 0, w === 'clawd' ? 2 : 1) });
    });
    // Danny and Jenna under him, hoisting
    L.push({ d: .5, draw: () => { const A = hou(c, -200, .5, { handL: [-6.4, -26], handR: [6.4, -26], handPoseL: 'fist', handPoseR: 'fist', eyes: 'happy', mouth: 'open', footL: [-2, -3], footR: [2, -3] }, t, 110 * lift + 14 * hop(t)); const [, , k] = sp(c, -200, 0, .5); jerseyNumber(A, HOUSAM_UNIT * k, t); } });
    // Dragon brings the cake
    if (t > CAKE_IN - 1.4) L.push({ d: .2, draw: () => {
      const x = lerp(1400, 260, easeOut(seg(t, CAKE_IN - 1.4, CAKE_IN))), y = 200 + 30 * Math.sin(t * 3);
      const A = putAt(c, 'dragon', x, .2, { t, ...dragonFlight(t, { speed: 2.6, lift: 0 }), eyes: 'happy', mouth: 'grin' }, y);
      const [, , k] = sp(c, x, 0, .2), s = DRAGON_UNIT * k, lit = t < BLOW + .3 ? 13 : 0;
      cake((A.pawL[0] + A.pawR[0]) / 2, (A.pawL[1] + A.pawR[1]) / 2 + 1.5 * s, s * 1.2, t, lit);
      if (t > BLOW + .3) for (let i = 0; i < 6; i++) { const ag = t - BLOW - .3 - i * .05; if (ag > 0) circle((A.pawL[0] + A.pawR[0]) / 2 + (i - 3) * 10, (A.pawL[1] + A.pawR[1]) / 2 - 8 * s - 80 * ag, 12 + 20 * ag, { fill: rgba('#DDDDDD', .5 * (1 - seg(ag, 0, 1.4))), stroke: null }); }
    } });
    sorted(L);
    PITCH.front(c, t, { goal: false });
    confetti(t, STORM, 80, 4);
    overlay(() => { bigText('STANDING TALL!', W / 2, 200, 120, C.gold, slamK(t, STORM + .5) * (1 - seg(t, CAKE_IN - .5, CAKE_IN - .2)), -.04, { glow: C.white });
      bigText('MAKE A WISH!', W / 2, 200, 120, C.magenta, slamK(t, CAKE_IN + .2) * (1 - seg(t, BLOW + .2, BLOW + .4)), .04, { glow: C.white });
      bigText('WHOOOSH!', W / 2, 200, 130, C.cyan, slamK(t, BLOW + .3), -.04, { glow: C.white }); });
    TT.counter(t);
  }

  // =====================================================================================
  // 169.7–176.7 · teenager: TEENAGER in fireworks, and the moustache goes majestic
  const TEEN = 169.74, MAJ = 170.0, WIDE = 171.52, STAY = 173.4;
  function teenager(t, lt) {
    if (t < WIDE) {
      // close-up: Housam under TEENAGER
      X.fillStyle = linGrad(0, 0, 0, H, [[0, '#0A0F2E'], [1, '#2B1A6E']]); X.fillRect(0, 0, W, H);
      for (let i = 0; i < 40; i++) circle(hash(i) * W, hash(i + 40) * 500, 2, { fill: '#FFF4D0', stroke: null, alpha: .6 });
      fireWord('TEENAGER', W / 2, 200, 30, t, TEEN, .08);
      const s = 34, A = TT.hou(W / 2, 1530, s, { ...GOALS_KIT.CELEB.laugh(t), eyes: t > MAJ + .4 ? 'happy' : 'wide' }, t);
      if (t > MAJ) for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + t, d = 380 + 40 * Math.sin(t * 5 + i); shape(starPts(A.mouth[0] + Math.cos(a) * d, A.mouth[1] + Math.sin(a) * d * .6, 22, .45), { fill: FIRE[i % FIRE.length], stroke: null }); }
      overlay(() => bigText('13!', 360, 620, 150, C.gold, slamK(t, MAJ + .5), -.04, { glow: C.white }));
      TT.counter(t); return;
    }
    // wide: the whole cast, fireworks everywhere, 13s in the sky
    const c = { x: -200, z: 1.9, y: 80 };
    PITCH.back(c, t, { cheer: 1, phones: true, goal: false, hands: 1, banners: [['HAPPY 13th!', -900, C.magenta], ['TEENAGER!', 200, C.blue]] });
    for (let i = 0; i < 10; i++) burst(150 + hash(i * 3) * (W - 300), 90 + hash(i * 7) * 260, t - (WIDE + i * BEAT), 240 + 80 * hash(i), 26, i * 5);
    if (t > STAY) fireWord('13', W / 2, 190, 34, t, STAY);
    const L = SURPRISE_CAST.map(([w, dx, d], i) => ({ d, draw: () => putAt(c, w, -200 + dx * 1.3, d, w === 'clawd' ? { t, eyes: 'happy', mouth: 'grin' } : cheer(w, t, i), w === 'clawd' ? 220 : 0, w === 'clawd' ? 2 : 1) }));
    L.push({ d: .2, draw: () => putAt(c, 'dragon', 600, .2, { t, ...dragonFlight(t, { speed: 2.6, lift: 0 }) }, 330) });
    L.push({ d: .5, draw: () => hou(c, -200, .5, { handL: [-6.4, -26], handR: [6.4, -26], handPoseL: 'fist', handPoseR: 'fist', eyes: 'happy', mouth: 'open', jump: .4 * hop(t) }, t) });
    sorted(L);
    beams(t);
    confetti(t, WIDE - 1, 70, 6);
    TT.counter(t);
  }
  const beams = (t) => TT.beams(t, .8);

  // =====================================================================================
  // 176.7–188.2 · sarah: the groove, and the exchange
  const LAND = 177.4, S1 = [178.0, 180.0], H1 = [180.4, 181.3], H2 = [181.6, 183.2], S2 = [183.6, 185.0], LAUGH = 185.0;
  function sarahShot(t, lt) {
    const c = { x: -200, z: lerp(3.2, 3.6, ease(seg(t, 176.7, 188.2))), y: 10 };
    PITCH.back(c, t, { cheer: .7, phones: true, goal: false, banners: [['HAPPY 13th!', -900, C.magenta], ['TEENAGER!', 200, C.blue]] });
    const L = [];
    // the cast behind, cracking up at the end
    [['danny', -800, .85], ['jenna', 420, .9], ['alma', -620, .95], ['jester', 640, .88]].forEach(([w, x, d], i) => L.push({ d, draw: () => putAt(c, w, x, d, t > LAUGH ? { t, eyes: 'happy', mouth: 'open', jump: .3 * hop(t, i * .2), handL: [-4, -9], handR: [4, -9] } : { t, eyes: 'open', mouth: 'smile', lookX: i % 2 ? -.6 : .6 }) }));
    // Housam, majestic
    const hTalk = (t > H1[0] && t < H1[1]) || (t > H2[0] && t < H2[1]);
    L.push({ d: .5, draw: () => { const A = hou(c, -420, .5, { mouth: lipFlap(t, hTalk, 'grin'), eyes: t > H2[0] - .1 && t < H2[1] ? 'squeeze' : 'open', brows: t > H2[0] ? 'up' : 'normal', lookX: .6,
      handR: t > LAUGH ? [1.9, -21.2] : [4.6, -12], handPoseR: t > LAUGH ? 'point' : 'open', handL: [-4.6, -12], tilt: t > H2[0] && t < H2[1] ? .08 : 0 }, t);
      if (t > H1[0] && t < H1[1] + .6) callout('Yeah bro…', A.head[0] - 40, A.head[1] - 80, t - H1[0]);
      if (t > H2[0] && t < S2[0]) callout('I mean… sis.', A.head[0] - 40, A.head[1] - 80, t - H2[0]); } });
    // Sarah drops in from above
    const drop = seg(t, 176.7, LAND), sy = 900 * (1 - easeIn(drop)), sTalk = (t > S1[0] && t < S1[1]) || (t > S2[0] && t < S2[1]);
    L.push({ d: .5, draw: () => {
      const texting = t > S2[1];
      const A = putAt(c, 'sarah', 20, .5, texting ? { t, ...sarahAbility(t, 'texting'), phone: true } : { t, mouth: lipFlap(t, sTalk, 'smirk'), eyes: t > S2[0] ? 'closed' : 'open', brows: 'normal', lookX: -.6, phone: true, sq: .3 * kickK(t, LAND, 8),
        handL: t > S1[0] && t < S1[1] ? [-5.6, -18] : [-3, -10], handPoseL: 'palm' }, sy);
      if (t > S1[0] && t < S1[1] + .6) callout('Welcome to the club.', A.head[0] + 40, A.head[1] - 80, t - S1[0]);
      if (t > S2[0] && t < S2[1] + .8) callout('Whatever.', A.head[0] + 40, A.head[1] - 80, t - S2[0]);
    } });
    sorted(L);
    if (t > LAND && t < LAND + .8) { const [lx, ly] = sp(c, 20, 0, .5); for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, d = 200 * easeOut(seg(t, LAND, LAND + .8)); circle(lx + Math.cos(a) * d, ly + Math.sin(a) * d * .3, 10, { fill: FIRE[i % 6], stroke: null, alpha: 1 - seg(t, LAND, LAND + .8) }); } }
    if (t > LAUGH) overlay(() => { bigText('HA', 330, 300 + 30 * hop(t), 120, C.gold, slamK(t, LAUGH), -.2); bigText('HA', W - 330, 260 + 30 * hop(t, .5), 120, C.magenta, slamK(t, LAUGH + .25), .2); bigText('HA!', W / 2, 200 + 30 * hop(t, .25), 140, C.cyan, slamK(t, LAUGH + .5), 0); });
    TT.counter(t);
  }

  // 188.2–192.26 · finalShot: the moustache pops on, and HAPPY BIRTHDAY HOUSAM!
  function finalShot(t, lt) {
    const c = { x: -230, z: lerp(3.4, 4.4, easeOut(seg(t, 188.2, MO + .3))), y: lerp(-20, 40, easeOut(seg(t, 188.2, MO + .3))) };
    PITCH.back(c, t, { cheer: 1, phones: true, goal: false, hands: 1 });
    for (let i = 0; i < 8; i++) burst(160 + hash(i * 3) * (W - 320), 110 + hash(i * 7) * 220, t - (MO + .1 + i * .28), 300, 28, i * 7);
    const row = [['danny', -700, .7], ['jenna', -520, .75], ['sarah', 60, .72], ['alma', 240, .78], ['jester', -860, .85], ['robo', 420, .85]];
    const L = row.map(([w, x, d], i) => ({ d, draw: () => putAt(c, w, x, d, cheer(w, t, i)) }));
    L.push({ d: .45, draw: () => { const k = seg(t, MO, MO + .4);
      hou(c, -230, .45, k > 0 ? { handL: [-6.4, -26], handR: [6.4, -26], handPoseL: 'fist', handPoseR: 'fist', eyes: 'happy', mouth: 'grin', jump: .25 * hop(t) } : { handL: [-4.6, -12], handR: [4.6, -12], eyes: 'happy', mouth: 'grin' }, t); } });
    sorted(L);
    flash(.5 * kickK(t, MO, 7));
    confetti(t, MO, 90, 8);
    overlay(() => { bigText('HAPPY BIRTHDAY', W / 2, 180, 140, C.gold, slamK(t, MO + .4), -.03, { glow: C.white }); bigText('HOUSAM!', W / 2, 330, 170, C.magenta, slamK(t, MO + .7), .03, { glow: C.white }); });
    if (t > 191.4) iris(W / 2, 450, lerp(1300, 0, ease(seg(t, 191.4, 192.2))));
  }

  return { halftime, megaDefense, grandFinale, shot10, shot11, shot12, shot13, surprise, teenager, sarah: sarahShot, finalShot };
})());
