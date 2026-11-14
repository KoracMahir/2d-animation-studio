// scenes/birthday/scene69_thirteen_trick_shots/match.js: the middle of the match (32.6–105.7 s).
//   chorus1  32.6–48.6   knee slide · the cast piles in · a crown for the star · HOUSE DOWN · hands high · the wave ·
//                        the big screen shows his moustache · fireworks over the night
//   theRun   48.6–64.4   the instrumental: a solo run the length of the pitch, a defender beaten every two bars
//   shot4    64.4–74.0   laces tied, past the line, a top-shelf rocket past Robo-Safadi
//   shot5    74.0–78.03  Jenna's cross, the flying header past Fester
//   shot6    78.03–81.83 a free kick over the wall of Danny, Alma and Jenna into the upper ninety past Sami
//   shot78   81.83–85.67 Clawd doubles the ball: SEVEN and EIGHT a beat apart past Safadi
//   shot9    85.67–89.3  a slow roller; Robo-Safadi scans it… it slips through his legs
//   chorus2  89.3–105.7  the chorus again, bigger: Neptune's fountains, Dragon's 13 flag
Object.assign(TT_SHOTS, (() => {
  const { C, FIRE, GOALS, hop, bpos, beatK, kickK, slamK, on, bigText, burst, track, BAR, cannon } = TT;
  const { sp, sorted, who, hou, ballAt } = PITCH, { goalShot, REST, mix, runPose, kickPose } = GOALS_KIT;
  const cheerArms = (t, ph = 0) => { const u = hop(t, ph); return { handL: [-5.5, -20 - 4 * u], handR: [5.5, -20 - 4 * u], handPoseL: 'palm', handPoseR: 'palm', jump: .35 * u, eyes: 'happy', mouth: u > .5 ? 'open' : 'grin' }; };
  const SEATED = new Set(['pearl', 'neptune']);
  const cheer = (w, t, i) => ({ t, ...cheerArms(t, i * .21), ...(SEATED.has(w) ? { jump: 0 } : {}) });

  function crown(x, y, s, t, k = 1) {               // (x, y) = bottom centre on the head
    if (k <= .01) return;
    X.save(); X.translate(x, y); X.scale(s * k, s * k);
    shape([[-3, 0], [-3.4, -3.2], [-1.6, -1.6], [0, -4], [1.6, -1.6], [3.4, -3.2], [3, 0]], { fill: C.gold, stroke: PAL.ink, lw: .3 });
    for (const [cx, col] of [[-1.7, C.magenta], [0, C.cyan], [1.7, C.lime]]) circle(cx, -.8, .45, { fill: col, stroke: PAL.ink, lw: .15 });
    circle(-1.1 + 2.2 * frac(t * .7), -2 + Math.sin(t * 4), .25, { fill: '#FFFFFF', stroke: null, alpha: .9 });
    X.restore();
  }

  // =====================================================================================
  // the chorus (twice): one function, keyed to that chorus's line times
  const CAST = [['danny', -260, .32], ['jenna', 260, .34], ['alma', -470, .56], ['safadi', 480, .62], ['sami', -680, .7], ['robo', 700, .74], ['jester', -120, .82], ['dragon', 140, .9]];
  function chorus(K, second) {
    return (t, lt) => {
      const seg8 = ['net', 'forget', 'crown', 'down', 'hands', 'joy', 'sight', 'night'].filter(k => t >= K[k]).pop();
      const set = { cheer: 1, phones: true, banners: [['HOUSAM #10', -900, C.blue], ['13!', 200, C.magenta], ['GOAT', -1600, C.orange]], goal: false };
      const [sx0, sy0] = TT.shake(t, [[K.down, 30, 3], [K.down + TT.BEAT, 20, 4], [K.down + 2 * TT.BEAT, 20, 4]]);
      X.save(); X.translate(sx0, sy0);
      if (seg8 === 'net') {
        // the knee slide: across the pitch toward the corner flag, sparks off the grass
        const u = easeOut(seg(t, K.net, K.forget)), hx = lerp(-1200, -100, u), c = { x: hx + 100, z: 3.0, y: -20 };
        PITCH.back(c, t, set);
        const L = [{ d: .4, draw: () => { const A = hou(c, hx, .4, { dy: 5.5 * (1 - seg(t, K.forget - .4, K.forget)), footL: [-3.4, -3.6], footR: [3.4, -3.6], handL: [-6.8, -21], handR: [6.8, -21], handPoseL: 'fist', handPoseR: 'fist', lean: -.08, mouth: 'open', eyes: 'happy', brows: 'up' }, t);
          for (let i = 0; i < 10; i++) { const a = frac(t * 3 + hash(i)), [gx, gy] = sp(c, hx - 60 - 260 * a, 0, .4); circle(gx, gy - 30 * Math.sin(a * Math.PI), 7 * (1 - a), { fill: i % 2 ? '#B9F07A' : '#FFFFFF', stroke: null }); } } }];
        if (second) L.push({ d: .9, draw: () => who(c, 'neptune', hx - 600, .9, { t, ...cheerArms(t), jump: 0 }) });
        sorted(L); PITCH.front(c, t, set);
        cannon(0, H, -1.0, t, K.net + .2, 50, 2); cannon(W, H, -2.1, t, K.net + .2, 50, 5);
      } else if (seg8 === 'forget' || seg8 === 'crown' || seg8 === 'down') {
        // the cast piles in round him; a crown drops on his head; the house comes down
        const c = { x: -100 + 40 * Math.sin(t), z: seg8 === 'forget' ? 2.5 : 2.9, y: seg8 === 'crown' ? 30 : -10 };
        PITCH.back(c, t, { ...set, cheer: seg8 === 'down' ? 1 : .9 });
        const arrive = i => ease(seg(t, K.forget + i * .1, K.forget + .5 + i * .1));
        const L = CAST.map(([w, dx, d], i) => ({ d, draw: () => who(c, w, -100 + dx * arrive(i) + (1 - arrive(i)) * (dx < 0 ? -1400 : 1400), d, cheer(w, t, i)) }));
        let A = null;
        L.push({ d: .5, draw: () => { A = hou(c, -100, .5, { handL: [-6.4, -26], handR: [6.4, -26], handPoseL: 'fist', handPoseR: 'fist', eyes: 'happy', mouth: 'grin', jump: .3 * hop(t) }, t);
          const [, , k] = sp(c, -100, 0, .5), s = HOUSAM_UNIT * k, drop = seg(t, K.crown, K.crown + .5);
          if (t >= K.crown) crown(A.top[0], lerp(A.top[1] - 700, A.top[1] + .9 * s, easeOut(drop)), s * .9, t); } });
        if (second) L.push({ d: 1.0, draw: () => who(c, 'pearl', -900, 1.0, { t, ...cheerArms(t, .3), jump: 0 }) });
        sorted(L); PITCH.front(c, t, set);
        if (seg8 === 'crown') overlay(() => { bigText('STAR!', W / 2 + 430, 260, 150, C.gold, slamK(t, K.crown + .45), -.06, { glow: C.white }); for (let i = 0; i < 9; i++) { const a = t * 1.2 + i / 9 * TAU; shape(starPts(W / 2 + Math.cos(a) * 520, 470 + Math.sin(a) * 300, 22 + 8 * beatK(t), .45), { fill: FIRE[i % FIRE.length], stroke: null }); } });
        if (seg8 === 'down') overlay(() => { bigText('BRING THE', W / 2, 220, 110, C.white, slamK(t, K.down), -.05); bigText('HOUSE DOWN!', W / 2, 350, 150, C.magenta, slamK(t, K.down + .2), .04, { glow: C.white }); });
      } else if (seg8 === 'hands' || seg8 === 'joy') {
        // the lineup: everyone hands high, then the wave rolls round the stands
        const c = { x: lerp(-300, 100, seg(t, K.hands, K.sight)), z: 2.0, y: 10 };
        PITCH.back(c, t, { ...set, hands: seg8 === 'hands' ? 1 : 0, wave: seg8 === 'joy' ? K.joy : undefined });
        const row = [['danny', -900], ['jenna', -700], ['alma', -500], ['housam', -300], ['safadi', -60], ['sami', 180], ['robo', 420], ['jester', 640], ['dragon', 900]];
        const L = row.map(([w, x], i) => {
          const wv = seg8 === 'joy' ? Math.exp(-Math.pow((i - (t - K.joy) * 6) / 1.1, 2)) : 0;
          const o = { t, handL: [-5.6, -27 - 3 * hop(t)], handR: [5.6, -27 - 3 * hop(t)], handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'open', jump: seg8 === 'hands' ? .2 * hop(t, i * .1) : 1.1 * wv };
          return { d: .5, draw: () => w === 'housam' ? hou(c, x, .5, o, t) : who(c, w, x, .5, o) };
        });
        if (second) L.push({ d: .95, draw: () => who(c, 'neptune', -1150, .95, { t, ...cheerArms(t), jump: 0 }) }, { d: .95, draw: () => who(c, 'pearl', 1150, .95, { t, ...cheerArms(t, .4), jump: 0 }) });
        sorted(L); PITCH.front(c, t, set);
        if (seg8 === 'hands') overlay(() => bigText('HANDS UP!', W / 2, 230, 150, C.cyan, slamK(t, K.hands + .1), -.04, { glow: C.white }));
        if (seg8 === 'joy') overlay(() => bigText('STADIUM JOY!', W / 2, 230, 140, C.gold, slamK(t, K.joy + .1), .04, { glow: C.white }));
      } else if (seg8 === 'sight') {
        // the stands and the big screen: his moustache, live
        const c = { x: -200 + 60 * (t - K.sight), z: 1.7, y: 220 };
        PITCH.back(c, t, { ...set, hands: .6 });
        PITCH.front(c, t, set);
        TT.bigScreen(t, second ? '9 / 13' : '3 / 13', 1.5, { face: true, y: 300 });
        overlay(() => bigText('BEAUTIFUL!', W / 2, 640, 130, C.magenta, slamK(t, K.sight + .3), -.04, { glow: C.white }));
      } else {
        // owning the night: a wide shot, fireworks over the floodlights, Housam centre stage
        const c = { x: -100, z: 1.6, y: 30 };
        PITCH.back(c, t, set);
        const L = CAST.map(([w, dx, d], i) => ({ d, draw: () => who(c, w, -100 + dx * 1.6, d, cheer(w, t, i)) }));
        L.push({ d: .5, draw: () => hou(c, -100, .5, { handL: [-6.4, -26], handR: [6.4, -26], handPoseL: 'fist', handPoseR: 'fist', eyes: 'happy', mouth: 'grin', jump: .3 * hop(t) }, t) });
        if (second) L.push({ d: .2, draw: () => { const [fx, fy, fk] = sp(c, -100 + 700 * Math.sin(t * .8), 520, .2); TT.put('dragon', fx, fy, fk, { t, ...dragonFlight(t, { speed: 2.4 }), eyes: 'happy', mouth: 'grin' }); flag(fx + 60 * fk * 10, fy - 40 * fk * 10, fk * 10, t); } });
        sorted(L); PITCH.front(c, t, set);
        for (let i = 0; i < 8; i++) { const a = K.night + .15 + i * TT.BEAT; burst(200 + hash(i * 3) * (W - 400), 120 + hash(i * 7) * 260, t - a, 260 + 80 * hash(i), 26, i * 5); }
        overlay(() => bigText('OWN THE NIGHT!', W / 2, 260, 120, C.white, slamK(t, K.night + .2), -.03, { glow: C.cyan }));
      }
      X.restore();
      if (second && seg8 !== 'sight') fountains(t, K.net);
      TT.counter(t);
    };
  }
  function flag(x, y, s, t) {                         // a waving 13 flag held up by a pole
    line([[x, y], [x, y - 30 * s]], { stroke: '#7A5A3A', lwPx: 1.6 * s });
    const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push([x + u * 34 * s, y - 30 * s + 3 * s * Math.sin(t * 7 - u * 5) * u]); }
    for (let i = 12; i >= 0; i--) { const u = i / 12; pts.push([x + u * 34 * s, y - 10 * s + 3 * s * Math.sin(t * 7 - u * 5) * u]); }
    shape(pts, { fill: C.blue, stroke: PAL.ink, lwPx: 2.5 });
    X.save(); X.font = `${Math.round(14 * s)}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#FFFFFF'; X.fillText('13', x + 17 * s, y - 20 * s); X.restore();
  }
  // Neptune's fountains: arcs of water from the bottom corners on every beat (screen space)
  function fountains(t, t0) {
    if (t < t0) return;
    for (const side of [-1, 1]) for (let j = 0; j < 14; j++) {
      const age = frac(bpos(t) * .5 + j / 14) * 2 * TT.BEAT * 2, x0 = side < 0 ? 40 : W - 40, vx = -side * (420 + 40 * (j % 3)), vy = -1500;
      const x = x0 + vx * age, y = H + vy * age + 1900 * age * age;
      if (y > H + 30) continue;
      circle(x, y, 14 - 6 * age, { fill: j % 2 ? '#8BE0FF' : '#FFFFFF', stroke: null, alpha: .85 });
    }
  }
  const chorus1 = chorus({ net: 32.6, forget: 35.3, crown: 37.1, down: 39.72, hands: 40.9, joy: 42.6, sight: 44.5, night: 46.36 }, false);
  const chorus2 = chorus({ net: 89.3, forget: 90.56, crown: 92.44, down: 96.84, hands: 98.02, joy: 99.7, sight: 101.6, night: 103.54 }, true);

  // =====================================================================================
  // 48.6–64.4 · theRun: the length of the pitch, a defender every two bars
  const RUN0 = 48.6, RUN1 = 64.4, X0 = -8600, X1 = -1700;
  const runX = t => lerp(X0, X1, (t - RUN0) / (RUN1 - RUN0));
  const BEATEN = [   // [time, who, x offset where he waits, move, reaction]
    [BAR(26), 'sami', 'SLIDE TACKLE?', 'hop'], [BAR(28), 'safadi', 'RAINBOW FLICK!', 'flick'], [BAR(30), 'robo', 'SPIN!', 'spin'],
    [BAR(32), 'dragon', 'UNDER THE WING!', 'duck'],
  ];
  const BONK = BAR(33.5);
  function theRun(t) {
    const hx = runX(t), c = { x: hx + 170, z: 2.7, y: -20 };
    PITCH.back(c, t, { cheer: .9, phones: true, goal: false, banners: [['HOUSAM #10', -6000, C.blue], ['13!', -4200, C.magenta], ['GO!', -2600, C.orange]] });
    const L = [];
    // Housam: running with the ball; a trick at each defender
    let o = runPose((hx - X0) / 46, { mouth: 'grin' }), hy = 0, bx = hx + 42, by = 0, bd = .47;
    for (const [at, , , mv] of BEATEN) {
      const k = on(t, at - .35, at + .35, .12);
      if (mv === 'hop' && k > 0) { hy = 70 * Math.sin(Math.PI * seg(t, at - .35, at + .35)); o = { ...o, footL: [-2.4, -4.5], footR: [2.4, -4.5], handL: [-6, -18], handR: [6, -18] }; by = hy * .9; }
      if (mv === 'flick' && k > 0) { const u = seg(t, at - .35, at + .45); by = 200 * Math.sin(Math.PI * u); bx = hx + lerp(-30, 140, u); o = { ...o, footR: u < .3 ? [-.5, -5] : o.footR }; }
      if (mv === 'spin' && k > 0) o = { ...o, rot: TAU * seg(t, at - .35, at + .35), handL: [-6.5, -15], handR: [6.5, -15] };
      if (mv === 'duck' && k > 0) o = { ...o, dy: 6 * k, footL: [-3.2, -3], footR: [3.2, -3], lean: .12 * k };
    }
    L.push({ d: .5, draw: () => hou(c, hx, .5, o, t, hy) });
    L.push({ d: bd - .001, draw: () => ballAt(c, bx + 10 * Math.sin(bpos(t) * Math.PI), by + 5 * hop(t), bd, t * 8) });
    // the defenders: each waits a little ahead, and is left spinning
    BEATEN.forEach(([at, w], i) => {
      const x0 = runX(at) + 40, d = w === 'dragon' ? .62 : .56, u = seg(t, at - .1, at + .9);
      if (t > at + 2.5) return;
      const o2 = { t, handL: [-6, -16], handR: [6, -16], handPoseL: 'palm', handPoseR: 'palm', eyes: t > at ? 'squeeze' : 'wide', mouth: t > at ? 'o' : 'flat', brows: 'focused',
        rot: t > at ? (w === 'dragon' ? .2 * Math.sin(t * 8) : TAU * easeOut(u) + (u >= 1 ? .35 : 0)) : 0 };
      if (w === 'sami') Object.assign(o2, { rot: t > at - .4 ? -1.35 : 0, footL: [-3, -6], dy: t > at - .4 ? 4 : 0 });     // the slide tackle, flat on the grass
      if (w === 'dragon') Object.assign(o2, { wingsOpen: 1, handL: [-7, -12], handR: [7, -12] });
      L.push({ d, draw: () => who(c, w, x0 + (w === 'sami' ? -120 * seg(t, at - .5, at) : 0), d, o2, w === 'dragon' && t > at - .3 ? 160 * on(t, at - .3, at + .5) : 0) });
    });
    // the twins come in from both sides… and bonk into each other
    const tw = seg(t, BONK - 1.0, BONK);
    if (t > BONK - 1.0 && t < BONK + 3) {
      const xs = runX(BONK) + 30;
      [['safadi', -1, .5], ['sami', 1, .6]].forEach(([w, side, d]) => {
        const x = t < BONK ? xs + side * 400 * (1 - ease(tw)) : xs + side * 70 * easeOut(seg(t, BONK, BONK + .4));
        L.push({ d, draw: () => who(c, w, x, d, { t, rot: t > BONK ? side * .9 * easeOut(seg(t, BONK, BONK + .4)) : 0, eyes: t > BONK ? 'squeeze' : 'wide', mouth: 'o', handL: [-6, -20], handR: [6, -20] }) });
      });
    }
    sorted(L);
    PITCH.front(c, t, { goal: false });
    BEATEN.forEach(([at, , w2]) => overlay(() => bigText(w2, W / 2, 230, 110, C.gold, slamK(t, at) * (1 - seg(t, at + 1.3, at + 1.6)), -.04, { glow: C.white })));
    overlay(() => { const k = slamK(t, BONK) * (1 - seg(t, BONK + 1.6, BONK + 2)); bigText('BONK!', W / 2 + 120, 280, 170, C.magenta, k, .06, { glow: C.white }); });
    if (t > BONK) { const [bx2, by2] = sp(c, runX(BONK) + 30, 280, .55); for (let i = 0; i < 5; i++) { const a = t * 5 + i / 5 * TAU; shape(starPts(bx2 + Math.cos(a) * 110, by2 + Math.sin(a) * 30, 20, .45), { fill: C.gold, stroke: null }); } }
    TT.counter(t);
  }

  // =====================================================================================
  // 64.4–74.0 · shot 4: laces, past the line, top-shelf rocket past Robo-Safadi
  const LACE = [66.66, 68.24], K4 = GOALS[3] - .45;
  const h4 = t => track(t, [[64.4, -1700, 0, .5], [LACE[0], -1580, 0, .5], [LACE[1], -1580, 0, .5], [K4 - .1, -900, 0, .5]]);
  const shot4 = goalShot({
    g: GOALS[3], kick: K4, hx: -900, hd: .5, target: [228, .62], apex: 50,
    pre: t => {
      const [hx] = h4(t), lacing = t > LACE[0] && t < LACE[1];
      const o = lacing ? { dy: 4.5, lean: .2, footL: [-2.6, -3.2], footR: [2.2, -1.05], handL: [1.2, -4], handR: [2.8, -4], eyes: 'closed', mouth: 'smirk', brows: 'focused', lookY: 1 } : runPose((hx + 1700) / 45, { mouth: 'grin' });
      return { hx, hd: .5, o, ball: lacing ? [hx - 60, 0, .47] : [hx + 40, 0, .47] };
    },
    keeper: { who: 'robo', d: .5, dive: -1 },
    fx: (t, c) => { if (t > LACE[0] && t < LACE[1] + .3) { const [x, y] = sp(c, -1560, 20, .5); sfx('LACES TIED!', x + 40, y - 300, 70, C.cyan, t - LACE[0], { life: 1.4 }); for (let i = 0; i < 6; i++) { const a = t * 14 + i; circle(x + Math.cos(a) * 60, y + Math.sin(a) * 20, 6, { fill: '#FFFFFF', stroke: null, alpha: .8 }); } } },
    pose: 'flex',
  });

  // 74.0–78.03 · shot 5: Jenna's cross, the flying header past Fester
  const CROSS = 75.5, K5 = GOALS[4] - .45;
  const shot5 = goalShot({
    g: GOALS[4], kick: K5, hx: -700, hd: .45, target: [120, .55], apex: 10,
    pre: t => {
      const [hx] = track(t, [[74.0, -1500, 0, .45], [K5 - .45, -820, 0, .45], [K5, -700, 0, .45]]), dive = seg(t, K5 - .45, K5);
      const ball = t < CROSS ? [-500 + 30 * Math.sin(t * 7), 0, .1] : track(t, [[CROSS, -480, 0, .1], [K5, -690, 165, .44, 260]]);
      const o = dive > 0 ? { rot: -1.35 * ease(dive), handL: [-6, -20], handR: [6, -20], footL: [-2, -6], footR: [2, -6], eyes: 'wide', mouth: 'grin', brows: 'focused' } : runPose((hx + 1500) / 45, { lookX: .8 });
      return { hx, hd: .45, hy: 80 * Math.sin(Math.PI * .5 * dive), o, ball };
    },
    post: t => ({ hx: -700 + 120 * easeOut(seg(t, K5, K5 + .4)), hy: 80 * (1 - seg(t, K5, K5 + .5)), o: { rot: -1.35 * (1 - ease(seg(t, K5 + .3, K5 + .7))), handL: [-6, -20], handR: [6, -20], eyes: 'happy', mouth: 'grin' } }),
    keeper: { who: 'jester', d: .5, dive: -1, late: true },
    others: [{ who: 'jenna', x: -500, d: .1, o: t => ({ footR: on(t, CROSS - .25, CROSS + .1, .08) > .5 ? [3.4, -5] : [1.4, -1.05], handL: [-5, -18], handR: t > CROSS ? [5.5, -22] : [4, -12], eyes: 'happy', mouth: 'grin', jump: t > GOALS[4] ? .4 * hop(t) : 0 }) }],
    pose: 'eureka',
  });

  // 78.03–81.83 · shot 6: a free kick over the wall into the upper ninety past Sami
  const K6 = GOALS[5] - .55;
  const wallJump = t => .9 * on(t, K6 + .05, K6 + .55, .1);
  const shot6 = goalShot({
    g: GOALS[5], kick: K6, hx: -1350, hd: .5, target: [236, .28], apex: 150, curve: -.2,
    pre: t => {
      const [hx] = track(t, [[78.03, -1520, 0, .5], [K6 - 1.0, -1520, 0, .5], [K6 - .1, -1390, 0, .5]]);
      const o = t < K6 - 1.0 ? { handL: [-4.6, -12], handR: [4.6, -12], mouth: 'smirk', brows: 'focused', eyes: 'open', lookX: .8, tilt: -.05 } : runPose((hx + 1520) / 40);
      return { hx, hd: .5, o, ball: [-1310, 0, .47] };
    },
    keeper: { who: 'sami', d: .45, dive: -1, late: true },
    others: [['danny', -880, .42], ['alma', -860, .5], ['jenna', -840, .58]].map(([w, x, d]) => ({ who: w, x, d, o: t => ({ handL: [-1.6, -9], handR: [1.6, -9], handPoseL: 'fist', handPoseR: 'fist', jump: wallJump(t), eyes: t > K6 ? 'wide' : 'squeeze', mouth: 'o' }) })),
    cam: (t, hx, b, fol) => ({ x: lerp(-1100, -330, fol), z: lerp(2.5, 2.4, fol), y: lerp(-20, 30, fol) }),
    pose: 'fist',
  });

  // 81.83–85.67 · shots 7 and 8: Clawd doubles the ball; two goals a beat apart past Safadi
  const K7 = GOALS[6] - .5, K8 = GOALS[7] - .5, SPLIT = 82.4;
  const ball7 = t => t < K7 ? [-1000 + 40, 0, .47] : t < GOALS[6] ? track(t, [[K7, -960, 0, .47], [GOALS[6], 40, 150, .33]]) : [lerp(40, 160, easeOut(seg(t, GOALS[6], GOALS[6] + .35))), Math.max(0, 150 - 900 * (t - GOALS[6]) ** 2), .33];
  const shot78 = goalShot({
    g: GOALS[7], kick: K8, hx: -1000, hd: .5, target: [140, .68], apex: 30,
    pre: t => {
      const k7 = t > K7 - .3 ? kickPose(t, K7) : { handL: [-4.6, -12], handR: [4.6, -12], mouth: 'grin', eyes: 'happy', brows: 'up', lookX: .3 };
      return { hx: -1000, hd: .5, o: t > K7 + .7 ? kickPose(t, K8) : k7, ball: t < SPLIT ? [-958, 0, .47] : [-958, 0, .52] };
    },
    keeper: { who: 'safadi', d: .5, dive: -1, late: false, o: t => t > GOALS[6] + .1 ? { rot: 1.1 * ease(seg(t, GOALS[6] + .1, GOALS[6] + .4)) } : {} },
    fx: (t, c, L) => {
      // Clawd hovers in, zaps, and there are two balls
      const [cx, cy, ck] = sp(c, -1150, 260 + 20 * Math.sin(t * 4), .7);
      L.push({ d: .7, draw: () => { clawd(cx, cy, CLAWD_UNIT * ck * 2.2, { t, eyes: 'happy', mouth: 'grin', handR: [2.6, -9] }); if (t > SPLIT && t < SPLIT + .4) { const [bx, by] = sp(c, -958, 20, .5); line([[cx + 20, cy - 40], [bx, by]], { stroke: C.cyan, lwPx: 8 * (1 - (t - SPLIT) / .4) }); } } });
      if (t >= SPLIT) L.push({ d: ball7(t)[2] - .002, draw: () => { const b = ball7(t); X.save(); X.globalAlpha = t < GOALS[6] + 1.2 ? 1 : 0; ballAt(c, ...b, t * 12); X.restore(); } });
      if (t > SPLIT && t < SPLIT + 1.2) { const [x, y] = sp(c, -958, 200, .5); sfx('×2!', x, y - 60, 110, C.cyan, t - SPLIT, { life: 1.1 }); }
    },
    cam: (t, hx, b, fol) => ({ x: lerp(-900, -330, ease(seg(t, K7 - .1, GOALS[6] - .1))), z: 2.4, y: 0 }),
    pose: 'laugh',
  });

  // 85.67–89.3 · shot 9: a slow roller; Robo-Safadi scans it… through his legs
  const K9 = GOALS[8] - 1.5;
  const shot9 = goalShot({
    g: GOALS[8], kick: K9, hx: -900, hd: .5, target: [0, .5], apex: 0,
    pre: t => ({ hx: -900, hd: .5, ball: [-860, 0, .47], o: { handL: [-4.6, -12], handR: [4.6, -12], mouth: 'smirk', brows: 'up', eyes: 'open', lookX: .4, jump: .1 * hop(t) } }),
    post: t => ({ o: { ...kickPose(t, K9), footR: mix([2.2, -2.5], REST.footR, seg(t, K9 + .2, K9 + .6)), lean: 0, rot: 0, mouth: t > K9 + .5 ? 'grin' : 'smirk', handL: [-4.6, -12], handR: [5.2, -20], handPoseR: 'point' } }),
    keeper: { who: 'robo', d: .5, dive: 0, o: t => ({ footL: [-3.6, -1.05], footR: [3.6, -1.05], eyes: t > GOALS[8] ? 'squeeze' : 'wide', rot: t > GOALS[8] ? .15 * Math.sin(t * 30) : 0 }) },
    cam: (t, hx, b, fol) => ({ x: lerp(-650, -330, ease(seg(t, K9, GOALS[8]))), z: 2.3, y: 0 }),
    fx: (t, c) => {
      if (t > K9 + .2 && t < GOALS[8]) {         // the scanner beams
        const [ex, ey] = sp(c, -55, 215, .5), [bx, by] = sp(c, ...ballPos9(t));
        for (const dy of [-6, 6]) line([[ex, ey + dy], [bx, by]], { stroke: rgba(C.red, .6), lwPx: 4 });
        const [x, y] = sp(c, -55, 300, .5); sfx('SCANNING…', x, y - 40, 60, C.red, t - K9 - .2, { life: 9 });
      }
      if (t > GOALS[8]) { const [x, y] = sp(c, -55, 300, .5); sfx('ERROR!', x, y - 40, 90, C.red, t - GOALS[8], { life: 1.2 }); }
    },
    pose: 'wink',
  });
  const ballPos9 = t => [lerp(-860, 40, (t - K9) / (GOALS[8] - K9)), TT.BR, .47];

  return { chorus1, theRun, shot4, shot5, shot6, shot78, shot9, chorus2 };
})());
