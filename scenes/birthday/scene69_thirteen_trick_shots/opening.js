// scenes/birthday/scene69_thirteen_trick_shots/opening.js: the kickoff and the first three goals (0–32.6 s).
//   lightsOn  0–3.4     the dark stadium; the floodlights bang on, one per beat; 13 TRICK SHOTS slams in
//   chant     3.4–9.6   "Listen up team…": the whole cast at the pitch side, chanting; Clawd on the big screen
//   tunnel    9.6–14.7  Housam walks out of the tunnel through smoke, pyro on the beat, phones flashing
//   walkout   14.7–20.4 "Housam is ready… ten feet tall": he goes ten feet tall for a beat; Fester takes the goal
//   shot1     20.4–24.73 keepie-uppie volley; Fester dives the wrong way
//   shot2     24.73–28.31 one-two with Danny, then low through Fester's legs
//   shot3     28.31–32.6 through the Safadi twins, bent into the top corner
Object.assign(TT_SHOTS, (() => {
  const { C, FIRE, GOALS, hop, bpos, beatK, kickK, slamK, on, bigText, burst, track, BAR } = TT;
  const { sp, sorted, who, hou, ballAt } = PITCH, { goalShot, REST, mix, runPose, kickPose } = GOALS_KIT;
  const cheerArms = (t, ph = 0) => { const u = hop(t, ph); return { handL: [-5.5, -20 - 4 * u], handR: [5.5, -20 - 4 * u], handPoseL: 'palm', handPoseR: 'palm', jump: .35 * u, eyes: 'happy', mouth: u > .5 ? 'open' : 'grin' }; };

  // The big screen over the stands (screen space): Clawd and a caption.
  function bigScreen(t, cap, k = 1, o = {}) {
    if (k <= .01) return;
    const cx = o.x ?? W / 2, cy = o.y ?? 170, w = 560 * k, h = 260 * k;
    X.save(); X.fillStyle = '#05070F'; X.beginPath(); X.roundRect(cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, 18); X.fill();
    X.fillStyle = linGrad(0, cy - h / 2, 0, cy + h / 2, [[0, '#1B2A8A'], [1, '#3B1E8C']]); X.fillRect(cx - w / 2, cy - h / 2, w, h);
    X.beginPath(); X.rect(cx - w / 2, cy - h / 2, w, h); X.clip();
    for (let y = cy - h / 2; y < cy + h / 2; y += 6) { X.fillStyle = 'rgba(0,0,0,.12)'; X.fillRect(cx - w / 2, y, w, 2); }
    if (o.face) TT.hou(cx - w * .27, cy + h * 1.55, 13 * k, { eyes: 'happy', mouth: 'grin', handR: [5.5, -27], handPoseR: 'fist' }, t);
    else clawd(cx - w * .3, cy + h * .38, 12 * k, { t, eyes: 'happy', mouth: hop(t) > .5 ? 'open' : 'grin', handR: [2.6, -9], jump: .2 * hop(t) });
    X.font = `${Math.round(64 * k)}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = FIRE[Math.floor(bpos(t)) % FIRE.length];
    X.shadowColor = X.fillStyle; X.shadowBlur = 20 * beatK(t, 4);
    X.fillText(cap, cx + w * .14, cy);
    X.restore();
  }
  TT.bigScreen = bigScreen;

  // =====================================================================================
  // 0–3.4 · lightsOn
  const LIGHTS = [BAR(0) + 2 * TT.BEAT, BAR(0) + 3 * TT.BEAT, BAR(1)], ALL = BAR(1) + 1 * TT.BEAT;
  function lightsOn(t) {
    const lit = LIGHTS.filter(a => t >= a).length, c = { x: -1100 + 120 * t, z: 1.3 - .05 * t, y: 60 };
    const set = { cheer: t >= ALL ? 1 : .15, lights: lit, phones: true, banners: [['HOUSAM #10', -1500, C.blue], ['13!', -500, C.magenta]] };
    PITCH.back(c, t, set); PITCH.front(c, t, set);
    LIGHTS.forEach(a => flash(.35 * kickK(t, a, 8), '#FFF6D8'));
    flash(.6 * kickK(t, ALL, 5));
    overlay(() => {
      const k = slamK(t, ALL);
      bigText('13', W / 2, 420, 300, C.gold, k, -.05, { glow: C.white });
      bigText('TRICK SHOTS', W / 2, 610, 140, C.white, slamK(t, ALL + .15), .03);
    });
    TT.counter(t, { k: seg(t, ALL + .3, ALL + .6) });
  }

  // =====================================================================================
  // 3.4–9.6 · chant: the cast along the pitch side, chanting on the beat
  const CAST = [['danny', -2500, .62], ['jenna', -2250, .7], ['alma', -2000, .62], ['safadi', -1720, .72], ['sami', -1450, .66],
    ['robo', -1180, .74], ['jester', -900, .64], ['neptune', -600, .78], ['pearl', -300, .74], ['dragon', 20, .82]];
  function chant(t, lt) {
    const c = { x: lerp(-2350, -150, ease(lt / 6.2)), z: 2.7, y: -10 };
    const set = { cheer: 1, phones: true, banners: [['HOUSAM #10', -1500, C.blue], ['13!', -500, C.magenta], ['GO HOUSAM!', -2600, C.orange]] };
    PITCH.back(c, t, set);
    const L = CAST.map(([w, x, d], i) => ({ d, draw: () => who(c, w, x, d, { t, ...cheerArms(t, i * .21), ...(w === 'pearl' || w === 'neptune' ? { jump: 0 } : {}) }) }));
    sorted(L);
    PITCH.front(c, t, { ...set, goal: false });
    const caps = [[3.4, '13 SHOTS'], [5.88, 'MAIN EVENT'], [7.52, 'BIG 13!']], cap = caps.filter(([a]) => t >= a).pop()[1];
    bigScreen(t, cap, 1 + .04 * beatK(t, 6));
    TT.counter(t);
  }

  // =====================================================================================
  // 9.6–14.7 · tunnel: Housam walks out
  const OUT = 10.4, MID = 13.6;
  function tunnel(t, lt) {
    const c = { x: lerp(-2350, -2050, ease(seg(t, 9.6, 14.7))), z: lerp(2.6, 2.2, ease(seg(t, 9.6, 14.7))), y: 70 };
    const set = { cheer: t > OUT ? 1 : .6, phones: true, goal: false, banners: [['HOUSAM #10', -2500, C.blue], ['13!', -1700, C.magenta]] };
    PITCH.back(c, t, set);
    // the tunnel mouth in the far side, and smoke
    const [tx, ty, tk] = sp(c, -2400, 0, 1.02);
    shape([[tx - 150 * tk, ty], [tx - 150 * tk, ty - 220 * tk], [tx, ty - 290 * tk], [tx + 150 * tk, ty - 220 * tk], [tx + 150 * tk, ty]], { fill: '#05060C', stroke: '#9AA3C8', lwPx: 6 });
    for (let i = 0; i < 14; i++) {
      const a = (t - 9.6) * (.3 + .2 * hash(i)) + hash(i * 3), x = tx + (hash(i * 7) - .5) * 700 * tk + 120 * Math.sin(a * 2), y = ty - 40 * tk - 160 * tk * frac(a * .4);
      const r = (130 + 90 * hash(i)) * tk, al = .3 * (1 - frac(a * .4)); X.fillStyle = radGrad(x, y, 0, r, [[0, rgba('#DDE4FF', al)], [1, rgba('#DDE4FF', 0)]]); X.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
    // pyro jets on the beat once he's out
    if (t > 11.6) for (const dx of [-560, 560]) {
      const k = kickK(t, OFF_BEAT(t), 5), [px, py, pk] = sp(c, -2400 + dx, 0, .95);
      for (let j = 0; j < 6; j++) ellipse(px + 20 * pk * Math.sin(t * 30 + j), py - (60 + 70 * j) * pk * k * 1.6, (36 - 4 * j) * pk, (70 - 6 * j) * pk * k, { fill: [C.gold, C.orange, '#FF5A2B'][j % 3], stroke: null, alpha: .85 * k });
    }
    // Housam walks from the tunnel toward us, ball under his arm
    const u = ease(seg(t, OUT, MID)), hx = lerp(-2400, -2150, u), hd = lerp(1.0, .45, u), walking = t > OUT && t < MID;
    const p = (hd - 1) / -.03;
    const o = walking ? { ...housamDribble(p, .7), handR: [4.4, -12.5], handPoseR: 'palm', handL: [-4.6, -11], mouth: 'smirk', brows: 'focused', eyes: 'open' }
      : t >= MID ? { handR: [4.4, -12.5], handPoseR: 'palm', handL: [-5.4, -25], handPoseL: 'fist', mouth: 'grin', eyes: 'happy', jump: .2 * hop(t) } : { handR: [4.4, -12.5], handPoseR: 'palm', mouth: 'smirk', brows: 'focused' };
    const L = [{ d: hd, draw: () => { const A = hou(c, hx, hd, o, t); const [, , k] = sp(c, hx, 0, hd); housamBall(A.handR[0] + 1.6 * HOUSAM_UNIT * k, A.handR[1] - .4 * HOUSAM_UNIT * k, HOUSAM_UNIT * k, {}); } }];
    sorted(L);
    // flashbulbs
    for (let i = 0; i < 18; i++) { const f = frac(t * 1.7 + hash(i)); if (f < .06) circle(hash(i * 5) * W, 120 + hash(i * 9) * 420, 26, { fill: '#FFFFFF', stroke: null, alpha: 1 - f / .06 }); }
    if (t > MID) overlay(() => { bigText('HOUSAM', W / 2 + 330, 300, 150, C.white, slamK(t, MID), -.04); bigText('#10', W / 2 + 330, 440, 130, C.gold, slamK(t, MID + .15), .05, { glow: C.white }); });
    TT.counter(t);
  }
  const OFF_BEAT = t => TT.OFF + Math.floor(bpos(t)) * TT.BEAT;

  // =====================================================================================
  // 14.7–20.4 · walkout: "ten feet tall", Fester takes the goal, the ball comes in
  const TALL = 17.8, TOSS = 18.9, CATCH = 19.7;
  function walkout(t, lt) {
    const c = { x: lerp(-1450, -1150, ease(seg(t, 14.7, 20.4))), z: lerp(3.4, 3.0, ease(seg(t, 14.7, 20.4))), y: kf(t, [[14.7, -10], [17.6, -40], [18.4, 70], [20.4, -30]]) };
    const set = { cheer: .9, phones: true, banners: [['HOUSAM #10', -1500, C.blue], ['13!', -800, C.magenta]] };
    PITCH.back(c, t, set);
    const grow = 1 + .9 * Math.sin(Math.PI * seg(t, TALL - .1, TALL + 1.0)) ** .6;
    const juggle = t > CATCH;
    const ballP = t < TOSS ? null : t < CATCH ? track(t, [[TOSS, -960, 140, .6], [CATCH, -1230, 30, .48, 140]]) : [-1220, 25 + 70 * hop(t), .48];
    const low = ballP ? 1 - clamp(ballP[1] / 60) : 0;
    const o = juggle ? { ...REST, footR: mix(REST.footR, [1.9, -4.6], low), handL: [-5.2, -14], handR: [5.2, -14], lookY: .4, brows: 'focused', mouth: 'smile' }
      : t > TALL - .1 && t < TALL + 1.0 ? { handL: [-6.5, -26], handR: [6.5, -26], handPoseL: 'fist', handPoseR: 'fist', mouth: 'open', eyes: 'wide', brows: 'up' }
      : { handL: [-5.3, -12], handR: [5.3, -12], mouth: lt > .2 && lt < 1.7 ? 'grin' : 'smirk', eyes: 'open', brows: 'focused', lookX: -.3, jump: .12 * hop(t) };
    const L = [{ d: .5, draw: () => { const [sx, sy, k] = sp(c, -1250, 0, .5); TT.hou(sx, sy, HOUSAM_UNIT * k * grow, o, t); } }];
    // Fester: bounds in with the ball, tosses it, and runs off to the goal
    const fx = kf(t, [[14.7, -700], [16.0, -1020], [TOSS, -980], [20.4, 200]]), fd = .62;
    L.push({ d: fd, draw: () => { const A = who(c, 'jester', fx, fd, { t, handR: t < TOSS ? [4, -14] : [5, -22], handL: [-4.5, -14], mouth: lipFlap(t, t > 15.0 && t < 16.8, 'grin'), eyes: 'happy', jump: .3 * hop(t) });
      if (t < TOSS) { const [, , k] = sp(c, fx, 0, fd); housamBall(A.handR[0], A.handR[1] - 1.2 * JF_UNIT * k, HOUSAM_UNIT * k, {}); }
      if (t > 15.0 && t < 17.2) callout('Keeper Fester is HERE!', A.head[0], A.head[1] - 40, t - 15.0); } });
    if (ballP) L.push({ d: ballP[2], draw: () => ballAt(c, ...ballP, t * 6) });
    sorted(L);
    PITCH.front(c, t, set);
    if (t > TALL - .1 && t < TALL + 1.1) overlay(() => bigText('10 FEET TALL!', W / 2 - 300, 260, 110, C.gold, slamK(t, TALL), -.06, { glow: C.white }));
    TT.counter(t);
  }

  // =====================================================================================
  // 20.4–24.73 · shot 1: keepie-uppie, then a volley; Fester dives the wrong way
  const shot1 = goalShot({
    g: GOALS[0], kick: GOALS[0] - .5, hx: -1250, hd: .5, target: [175, .34], apex: 30,
    pre: t => {
      const up = seg(t, GOALS[0] - .9, GOALS[0] - .55), h = hop(t) * 70 + 20 + 120 * Math.sin(Math.PI * up), low = 1 - clamp(h / 60);
      return { hx: -1250, hd: .5, ball: [-1250 + 34, h, .47], o: { ...REST, footR: mix(REST.footR, [1.9, -4.6], low), handL: [-5.2, -14], handR: [5.2, -14], lookX: .3, lookY: clamp(.6 - h / 120, -1, 1), brows: 'focused', mouth: 'smile' } };
    },
    keeper: { who: 'jester', d: .5, dive: 1 }, pose: 'fist',
  });

  // 24.73–28.31 · shot 2: one-two with Danny, then low through Fester's legs
  const P2 = 25.25, R2 = 25.95, K2 = GOALS[1] - .45;
  const h2 = t => track(t, [[24.73, -1900, 0, .5], [P2, -1650, 0, .5], [K2 - .1, -1050, 0, .5]]);
  const shot2 = goalShot({
    g: GOALS[1], kick: K2, hx: -1050, hd: .5, target: [20, .5], apex: 0,
    pre: t => {
      const [hx] = h2(t), ball = t < P2 ? [hx + 40, 0, .47] : t < R2 ? track(t, [[P2, -1610, 0, .47], [R2 - .3, -1300, 0, .16], [R2, -1300, 0, .16]]) : track(t, [[R2, -1290, 0, .16], [K2, -1008, 0, .47]]);
      const passing = on(t, P2 - .2, P2 + .15, .08);
      return { hx, hd: .5, ball, o: { ...runPose((hx + 1900) / 45), footR: passing > .5 ? [3.6, -4.5] : housamDribble((hx + 1900) / 45, 1).footR, handPoseL: 'point', handL: t > P2 && t < R2 ? [-6.2, -18] : [-4.6, -11] } };
    },
    keeper: { who: 'jester', d: .5, dive: 0, o: t => ({ jump: 1.1 * on(t, K2 + .05, GOALS[1] + .5, .12), footL: [-3.6, -2.5], footR: [3.6, -2.5], rot: 0, eyes: 'wide', mouth: 'o' }) },
    others: [{ who: 'danny', x: -1300, d: .16, o: t => { const kk = on(t, R2 - .25, R2 + .1, .08); return { footR: kk > .5 ? [3.2, -4] : [1.4, -1.05], handL: t < R2 ? [-5, -20] : [-4, -12], handPoseL: 'palm', eyes: 'happy', mouth: 'grin', jump: t > GOALS[1] ? .4 * hop(t) : 0 }; } }],
    pose: 'eureka',
  });

  // 28.31–32.6 · shot 3: through the Safadi twins, bent into the top corner
  const PASS_SAF = 29.05, PASS_SAMI = 29.95, K3 = GOALS[2] - .5;
  const h3 = t => track(t, [[28.31, -1850, 0, .5], [PASS_SAF, -1300, 0, .44], [PASS_SAMI, -900, 0, .56], [K3 - .15, -620, 0, .5]]);
  const beaten = (t, at, dir) => { const sp1 = easeOut(seg(t, at, at + .7)); return { rot: dir * TAU * sp1 * (t < at + .7 ? 1 : 0) + (t >= at + .7 ? dir * .25 : 0), eyes: t > at ? 'squeeze' : 'open', mouth: t > at ? 'o' : 'flat', handL: [-6, -16], handR: [6, -16], handPoseL: 'palm', handPoseR: 'palm', brows: 'focused' }; };
  const shot3 = goalShot({
    g: GOALS[2], kick: K3, hx: -620, hd: .5, target: [205, .3], apex: 60, curve: -.16,
    pre: t => { const [hx, , hd] = h3(t), p = (hx + 1850) / 45; return { hx, hd, ball: [hx + 40 + 10 * Math.sin(p * Math.PI), 0, hd - .03], o: runPose(p, { mouth: 'grin' }) }; },
    keeper: { who: 'jester', d: .5, dive: 1, late: true },
    others: [{ who: 'safadi', x: -1180, d: .54, o: t => beaten(t, PASS_SAF, 1) }, { who: 'sami', x: -780, d: .46, o: t => beaten(t, PASS_SAMI, -1) }],
    fx: (t, c) => { [[PASS_SAF, -1180, .54, 'OLÉ!'], [PASS_SAMI, -780, .46, 'NUTMEG!']].forEach(([a, x, d, w]) => { const [sx, sy, k] = sp(c, x, 230, d); sfx(w, sx, sy - 60, 80, C.gold, t - a, { life: .9 }); }); },
    pose: 'wink',
  });

  return { lightsOn, chant, tunnel, walkout, shot1, shot2, shot3 };
})());
