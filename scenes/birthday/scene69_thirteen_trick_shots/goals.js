// scenes/birthday/scene69_thirteen_trick_shots/goals.js: the goal-shot template used by all thirteen goals, and the moustache
// celebration close-up that follows each one.
//   goalShot(spec)  one continuous side-on shot: the approach or trick, the strike, the ball's flight past the keeper into the
//                   net, the GOAL slam; then (from goal + .5 s) a punch-in celebration close-up: TRICK SHOT n / 13.
// spec: { g (ball in the net), kick (the strike; default g − .5), hx/hd (Housam at the strike), run: [t, x] (dribble in from x
//         starting at t; omit to stand), pre(t) (optional: { hx, hd, o, ball } before the strike, for juggles and flicks),
//         target: [y, d] where it crosses the goal line, apex, curve (bend in d), keeper: { who, d, dive (±1 along d), late,
//         o }, others: [{ who, x, d, o: t => opts, y }], night, cheer, banners, cam(t) (override), fx(t, c) (extra drawing),
//         pose: per-shot celebration in the close-up ('fist' | 'eureka' | 'flex' | 'wink' | 'laugh') }
const GOALS_KIT = (() => {
  const { C, FIRE, GOALS, SPROUT, kickK, slamK, on, bigText, burst, beatK, hop } = TT;
  const { sp, sorted, who, hou, ballAt, GOAL } = PITCH;
  const mix = (a, b, k) => [lerp(a[0], b[0], clamp(k)), lerp(a[1], b[1], clamp(k))];
  const REST = { footL: [-1.5, -1.05], footR: [1.5, -1.05], handL: [-4.05, -10.7], handR: [4.05, -10.7] };

  // Housam's strike (right foot, toward screen right): windup, strike, follow-through.
  function kickPose(t, kick, o = {}) {
    const w = ease(seg(t, kick - .32, kick - .08)), s = ease(seg(t, kick - .08, kick + .04)), f = 1 - ease(seg(t, kick + .3, kick + .75));
    const footR = s > 0 ? mix(REST.footR, [4.6, -8.4], f) : mix(REST.footR, [-.4, -4.6], w);
    return { ...REST, footR,
      lean: -.13 * s * f + .06 * w * (1 - s), rot: -.05 * s * f, handL: [-5.4, -15.4], handR: [5.4, -12.6], handPoseL: 'open', handPoseR: 'open',
      brows: 'focused', mouth: s > 0 ? 'grin' : 'flat', lookX: .6, lookY: .2, ...o };
  }
  const runPose = (p, o = {}) => ({ ...housamDribble(p, 1), brows: 'focused', mouth: 'smirk', lookX: .5, lookY: .3, ...o });

  // A keeper in the goal mouth: bounces ready, then dives along d (dive ±1), late or wrong way.
  function keeperDraw(c, t, k, at) {
    const dive = ease(seg(t, at, at + .35)), d = k.d + k.dive * .16 * dive, x = -55, y = 90 * Math.sin(Math.PI * seg(t, at, at + .5)) * dive;
    const ready = { handL: [-5.2, -15], handR: [5.2, -15], handPoseL: 'palm', handPoseR: 'palm', footL: [-2.4, -1.05], footR: [2.4, -1.05], eyes: 'wide', mouth: 'o', brows: 'up' };
    const o = { t, ...ready, jump: .25 * hop(t) * (1 - dive), rot: k.dive * -1.05 * dive, handL: [-5.6, -20], handR: [5.6, -20], ...(k.o?.(t) || {}) };
    if (dive > .9) o.eyes = 'squeeze';
    return { d, draw: () => { const [sx, sy, kk] = sp(c, x, y, d); TT.put(k.who, sx, sy, kk * (k.scale ?? 1), o); } };
  }

  // The ball's path for a goal shot: at Housam's feet (or the trick's ball), then the flight, then into the net.
  function ballPos(t, spec, hx, hd) {
    const { kick, g } = spec, [ty, td] = spec.target ?? [150, .4];
    const a = spec.pre ? (spec.pre(kick).ball) : [hx + 42, 0, hd - .03];
    if (t < kick) return spec.pre ? spec.pre(t).ball : [hx + 42 + 12 * Math.sin(TT.bpos(t) * Math.PI), 6 * hop(t), hd - .03];
    if (spec.path && t < g + .4) return spec.path(t);
    if (t < g) { const u = (t - kick) / (g - kick); return [lerp(a[0], 40, u), lerp(a[1], ty, u) + 4 * (spec.apex ?? 40) * u * (1 - u), lerp(a[2], td, u) + 4 * (spec.curve ?? 0) * u * (1 - u)]; }
    const dt = t - g, r = easeOut(seg(dt, 0, .35));
    return [lerp(40, 165, r), Math.max(0, ty - 900 * dt * dt), td];
  }

  // ---------- the close-up: TRICK SHOT n of 13 ----------
  const CELEB = {
    fist: t => ({ handR: [6.6, -29], handPoseR: 'fist', handL: [-5.4, -14], eyes: 'happy', mouth: 'grin', jump: .2 * hop(t) }),
    point: t => ({ handL: [-1.6, -21.5], handR: [1.6, -21.5], handPoseL: 'point', handPoseR: 'point', eyes: 'wide', mouth: 'grin', lookY: .5 }),
    eureka: t => ({ handR: [4.1, -26], handPoseR: 'point', eyes: 'wide', brows: 'up', mouth: 'grin', jump: .3 * hop(t) }),
    flex: t => ({ handL: [-6.4, -20], handR: [6.4, -20], handPoseL: 'fist', handPoseR: 'fist', eyes: 'happy', mouth: 'grin', brows: 'focused' }),
    wink: t => ({ handR: [2.4, -21.5], handPoseR: 'point', eyes: 'wink', mouth: 'smirk', brows: 'up', tilt: .08 }),
    laugh: t => ({ handL: [-5.2, -24], handR: [5.2, -24], handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'open', jump: .35 * hop(t) }),
    stroke: t => ({ handR: [1.9, -21.2], handPoseR: 'point', handL: [-5, -13], eyes: 'closed', mouth: 'smirk', brows: 'up', tilt: -.06 }),
  };
  function closeUp(t, n, pose = 'fist', tStart) {
    const g = GOALS[n - 1], age = t - tStart, col = n >= 10 ? C.gold : n >= 4 ? C.magenta : C.blue;
    // background: beat rays and a glow
    X.fillStyle = linGrad(0, 0, 0, H, [[0, mixCol(col, '#0E1636', .45)], [1, '#0E1636']]); X.fillRect(0, 0, W, H);
    X.save(); X.translate(W / 2, 520); X.rotate(t * .35);
    for (let i = 0; i < 18; i++) { X.rotate(TAU / 18); X.fillStyle = rgba(i % 2 ? '#FFFFFF' : col, .1 + .08 * beatK(t, 5)); X.beginPath(); X.moveTo(0, 0); X.lineTo(1500, -120); X.lineTo(1500, 120); X.fill(); }
    X.restore();
    // Housam, big, from the chest up
    const push = 1 + .06 * easeOut(seg(age, 0, .5)), s = 33 * push;
    const A = TT.hou(W / 2 + 280, 1470 + 30 * (push - 1), s, { ...CELEB[pose](t), lookX: 0 }, t);
    // "TRICK SHOT n / 13" pops in
    const k = slamK(t, g + SPROUT + .05);
    overlay(() => {
      bigText('TRICK SHOT', 400, 330, 84, C.white, k, -.06);
      bigText(`${n} / 13`, 400, 440, 120, n >= 10 ? C.gold : C.cyan, slamK(t, g + SPROUT + .15), .04, { glow: C.white });
    });
    return A;
  }

  // ---------- the goal shot ----------
  function goalShot(spec) {
    spec.kick ??= spec.g - .5;
    const n = GOALS.indexOf(spec.g) + 1, CUT = spec.cut ?? spec.g + .5;
    return (t, lt, dur) => {
      const tStart = t - lt;
      if (t >= CUT && !spec.noClose) { closeUp(t, n, spec.pose ?? 'fist', CUT); TT.counter(t); return; }
      // Housam's position and pose
      let hx = spec.hx, hd = spec.hd ?? .5, hy = 0, o;
      if (spec.pre && t < spec.kick) { const p = spec.pre(t); hx = p.hx ?? hx; hd = p.hd ?? hd; hy = p.hy ?? 0; o = p.o; }
      else if (spec.post && t >= spec.kick) { const p = spec.post(t); hx = p.hx ?? hx; hd = p.hd ?? hd; hy = p.hy ?? 0; o = p.o; }
      else if (spec.run && t < spec.kick - .3) {
        const [ta, xa] = spec.run, u = ease(seg(t, ta, spec.kick - .3)); hx = lerp(xa, spec.hx, u);
        o = runPose((hx - xa) / 45);
      } else o = kickPose(t, spec.kick, spec.kickO || {});
      const b = ballPos(t, spec, hx, hd);
      // camera: on Housam, then it rides the ball to the goal
      const fol = ease(seg(t, spec.kick - .05, spec.g - .05));
      const c = spec.cam ? spec.cam(t, hx, b, fol) : { x: lerp(hx + 200, -230, fol), z: lerp(3.0, 2.4, fol) * (1 + .05 * kickK(t, spec.g, 3)), y: lerp(-30, 10, fol) };
      const [sx0, sy0] = TT.shake(t, [[spec.g, 22], [spec.kick, 8]]);
      X.save(); X.translate(sx0, sy0);
      const bulge = kickK(t, spec.g, 5) * (t >= spec.g ? 1 : 0);
      const set = { cheer: t >= spec.g ? 1 : spec.cheer ?? .55, night: spec.night ?? 1, banners: spec.banners ?? [['HOUSAM #10', -900, C.blue], ['13!', -100, C.magenta]], bulge, phones: (spec.night ?? 1) > .5 };
      PITCH.back(c, t, set);
      const L = [];
      if (spec.keeper) L.push(keeperDraw(c, t, spec.keeper, spec.keeper.late ? spec.g - .12 : spec.kick + .05));
      (spec.others || []).forEach(q => L.push({ d: q.d, draw: () => { const [sx, sy, k] = sp(c, q.x, q.y ?? 0, q.d); TT.put(q.who, sx, sy, k * (q.scale ?? 1), { t, ...q.o(t) }); } }));
      L.push({ d: hd, draw: () => hou(c, hx, hd, o, t, hy) });
      L.push({ d: b[2] - .001, draw: () => { if (t >= spec.kick && t < spec.g) TT.trail({ p: (x, y, z) => sp(c, x, y + TT.BR, z) }, t, tt => tt >= spec.kick ? ballPos(tt, spec, hx, hd) : null); ballAt(c, b[0], b[1], b[2], t * (t > spec.kick ? 14 : 4)); } });
      spec.fx?.(t, c, L, { hx, hd, b });

      sorted(L);
      PITCH.front(c, t, set);
      if (t >= spec.g) { const [rx, ry, rk] = sp(c, 60, (spec.target ?? [150])[0], (spec.target ?? [0, .4])[1]); TT.ripple(rx, ry, rk * 1.5, t, spec.g); burst(rx, ry - 40, t - spec.g, 340, 26, n * 3); }
      X.restore();
      TT.counter(t);
      TT.goalSlam(t, { y: 300 });
    };
  }
  return { goalShot, closeUp, kickPose, runPose, keeperDraw, REST, CELEB, mix };
})();
