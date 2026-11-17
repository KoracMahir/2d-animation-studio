// scenes/fall_festival/scene73_turkey_trouble/props.js: the props of "Turkey Trouble" (global namespace TT3).
// Everything draws in SCREEN space and is a pure function of its arguments. Unless noted, (x, y) is the screen point the
// prop is held at or rests on, and k is px per WORLD unit (P.k(Z) at the prop's depth); sizes are in world units.
//
//   TT3.dress(rig, kind, x, y, s, o)   a brother with his apron on (kind 'safadi' | 'sami'), flour (o._flour 0..1),
//                                      soot (o._soot 0..1) and Sami's wristwatch (o._watch); returns the rig's anchors + arms
//   TT3.arms(x, y, s, o)               the screen shoulder / elbow / wrist of both arms (the rigs' own IK, replicated)
//   TT3.hairDryer, duck, spoon, watch, beaker, cylinder, pepperJar, flourBag, cloud, puffs, brush, gravyPot, bandAid,
//   TT3.toothpick, parsley, drumstick, frill, garnish, towel, mitt, kettle, chess, glaze, stump, clock, title, continued
const TT3 = (() => {
  const C = {
    ink: PAL.ink, white: '#FFFDF8', cream: '#FFF4DC',
    apronS: '#D9473A', apronSDk: '#A8302A', apronM: '#8ED6B8', apronMDk: '#5BAF8F', pocket: '#FFF4E4', cross: '#E0413A',
    pink: '#F28DB2', pinkDk: '#C9628A', teal: '#4FB3C9', tealDk: '#2E7F95', chrome: '#D8DEE4', chromeDk: '#8E99A4',
    duck: '#FFD23A', duckDk: '#E0A915', beak: '#F28C28', wood: '#D9A86A', woodDk: '#A8743A',
    glass: 'rgba(214,240,255,.55)', glassLn: '#6FA8C8', pepper: '#2B2326', pepperLt: '#5A4C50', flour: '#FBF7EE', flourDk: '#E2D9C6',
    gold: '#E8B23A', goldDk: '#B07A1A', watchFace: '#FFF8E6', bag: '#E9DCC0', bagDk: '#C4B18C',
    glaze: '#C8681C', glazeLt: '#E98A2E', glazeXl: '#FFC266', glazeDk: '#9C4A14', gravy: '#8A4A1E', gravyLt: '#B86A30',
    char: '#211B1E', charLt: '#3E3236', band: '#E8BE96', bandPad: '#F7EDE0', pick: '#E3C08A',
    parsley: '#4E9A3A', parsleyDk: '#2F6E26', parsleyLt: '#7CC25A', cran: '#C2243A', cranDk: '#8C1528', orange: '#F28C28', orangeLt: '#FFC266',
    towelA: '#F4F1E8', towelB: '#D9473A', mitt: '#E8A23A', mittDk: '#B87418', board: '#F3E3C3', boardDk: '#8C5A34',
    smoke: '#5E5560', smokeLt: '#9A929C', kettle: '#E0413A', kettleDk: '#A82A24', water: '#9ED4EC', ice: '#DDF3FB',
  };
  const LWk = k => clamp(k * 1.1, 1.2, 4.2);                                  // outline px for a prop at k px per world unit
  const O = (k, m = 1) => ({ stroke: C.ink, lwPx: LWk(k) * m });
  const rot = (x, y, a, fn) => { X.save(); X.translate(x, y); X.rotate(a || 0); fn(); X.restore(); };

  // ---------- the brothers' arms: the rigs' own arm IK (same numbers as safadi.js / sami.js), in screen px ----------
  function arms(x, y, s, o = {}) {
    const hipY = -8 + (o.dy || 0), lean = o.lean || 0, cl = Math.cos(lean), sl = Math.sin(lean);
    const tl = (px, py) => [px * cl - py * sl, hipY + px * sl + py * cl];
    const air = o.jump || 0, sq = o.sq || 0, r = o.rot || 0;
    const toS = ([lx, ly]) => {                                               // body-local → screen (translate, scale, jump, rot about −12, squash)
      let px = lx * (1 + sq * .55), py = ly * (1 - sq);
      if (r) { const c = Math.cos(r), d = Math.sin(r), yy = py + 12; [px, py] = [px * c - yy * d, px * d + yy * c - 12]; }
      return [x + px * s, y + (py - air) * s];
    };
    const out = {};
    for (const [sd, tg, pose] of [[-1, o.handL || [-4.4, -8.1], o.handPoseL || 'open'], [1, o.handR || [4.4, -8.1], o.handPoseR || 'open']]) {
      const sh = tl(sd * 2.95, -7.2), { joint, end } = ik2(sh, tg, 3.75, 3.45, [sd * .25, 1]);
      const ang = Math.atan2(end[1] - joint[1], end[0] - joint[0]);
      out[sd < 0 ? 'L' : 'R'] = { sh: toS(sh), joint: toS(joint), end: toS(end), tip: toS([end[0] + Math.cos(ang) * 2, end[1] + Math.sin(ang) * 2]), ang, pose, local: { sh, joint, end } };
    }
    return out;
  }
  // a capsule (segment a→b, radius r) as a clockwise polygon, for the arm clip
  function capsule(a, b, r) {
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), pts = [];
    for (let i = 0; i <= 8; i++) { const u = ang - Math.PI / 2 - i / 8 * Math.PI; pts.push([a[0] + Math.cos(u) * r, a[1] + Math.sin(u) * r]); }
    for (let i = 0; i <= 8; i++) { const u = ang + Math.PI / 2 - i / 8 * Math.PI; pts.push([b[0] + Math.cos(u) * r, b[1] + Math.sin(u) * r]); }
    let area = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; area += p[0] * q[1] - q[0] * p[1]; }
    return area < 0 ? pts.reverse() : pts;
  }

  // ---------- the aprons (drawn in the rig's torso frame) ----------
  function apron(x, y, s, o, kind) {
    const lw = clamp(s * .15, 1.6, 5.5) / s, sq = o.sq || 0;
    X.save(); X.translate(x, y); X.scale(s, s); X.translate(0, -(o.jump || 0));
    if (o.rot) { X.translate(0, -12); X.rotate(o.rot); X.translate(0, 12); }
    if (sq) X.scale(1 + sq * .55, 1 - sq);
    X.translate(0, -8 + (o.dy || 0)); X.rotate(o.lean || 0);
    const S = kind === 'safadi', fill = S ? C.apronS : C.apronM, dk = S ? C.apronSDk : C.apronMDk, ink = { stroke: C.ink, lw };
    line([[-1.55, -5.6], [-.95, -8.7]], { stroke: dk, lw: lw * 2.2 }); line([[1.55, -5.6], [.95, -8.7]], { stroke: dk, lw: lw * 2.2 });   // the neck strap
    const body = [[-1.75, -5.9], [1.75, -5.9], [2.05, -2.6], [3.2, -1.5], [3.35, 4.6], [0, 4.85], [-3.35, 4.6], [-3.2, -1.5], [-2.05, -2.6]];
    shape(body, { fill, ...ink, smooth: .25 });
    if (S) for (let i = -3; i <= 3; i++) line([[i * .95, -5.6 + Math.abs(i) * .1], [i * 1.02, 4.5]], { stroke: rgba('#FFFFFF', .22), lw: lw * 1.3 });   // pinstripes
    line([[-3.25, -1.5], [3.25, -1.5]], { stroke: dk, lw: lw * 2.4 });                                        // the waist tie
    for (const sd of [-1, 1]) shape([[sd * 3.2, -1.6], [sd * 4.1, -2.3], [sd * 4.1, -.7]], { fill: dk, ...ink });
    shape(rectPts(-1.55, .3, 3.1, 2.2), { fill: C.pocket, ...ink, smooth: .2 });                              // the pocket
    if (S) { X.font = `800 1.25px ${FONT_TALK}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = C.apronSDk; X.fillText('E=mc²', 0, 1.45); }
    else { shape(rectPts(-.28, .55, .56, 1.7), { fill: C.cross, stroke: null }); shape(rectPts(-.85, 1.12, 1.7, .56), { fill: C.cross, stroke: null }); }
    line([[-3.2, 4.0], [3.2, 4.0]], { stroke: rgba(dk, .6), lw: lw * .9 });
    X.restore();
  }

  // a brother, dressed: the rig, his apron over it, his arms redrawn over the apron; flour and soot on top
  function dress(rig, kind, x, y, s, o) {
    const A0 = {}, armsOnly = !!o._armsOnly, draw = () => {
      if (!armsOnly) { boilSeed(T); const A = rig(x, y, s, o); Object.assign(A0, A); apron(x, y, s, o, kind); }
      const ar = arms(x, y, s, o);
      X.save(); X.beginPath();
      for (const a of [ar.L, ar.R]) {
        const polys = [capsule(a.sh, a.joint, 1.02 * s), capsule(a.joint, a.end, 1.0 * s), capsule(a.end, a.tip, (a.pose === 'point' ? 1.0 : 1.55) * s)];
        if (a.pose === 'point' || a.pose === 'thumb') polys.push(capsule(a.end, [a.end[0] + Math.cos(a.ang) * 3.4 * s, a.end[1] + Math.sin(a.ang) * 3.4 * s], .75 * s));
        for (const p of polys) { X.moveTo(p[0][0], p[0][1]); for (const q of p.slice(1)) X.lineTo(q[0], q[1]); X.closePath(); }
      }
      X.clip(); boilSeed(T); const A2 = rig(x, y, s, { ...o, noShadow: true, emote: undefined, bulb: 0 }); X.restore();
      if (armsOnly) Object.assign(A0, A2);
      if (o._watch) watch(ar.L, s, o.t ?? T);
      A0.arms = ar;
    };
    const f = clamp(o._flour || 0), so = clamp(o._soot || 0);
    if (f > .02 || so > .02) layer(draw, { filter: `saturate(${(1 - .85 * f) * (1 - .4 * so)}) brightness(${(1 + .55 * f) * (1 - .45 * so)}) contrast(${1 - .25 * f})` });
    else draw();
    if (f > .05 && !armsOnly) for (let i = 0; i < 26; i++) {                                                         // flour specks
      const hx = A0.head[0] + (hash(i * 3.1) - .5) * 13 * s, hy = A0.head[1] + (hash(i * 1.7) - .3) * 15 * s;
      circle(hx, hy, (.25 + .3 * hash(i)) * s, { fill: rgba('#FFFFFF', .8 * f), stroke: null });
    }
    if (so > .05 && !armsOnly) for (let i = 0; i < 6; i++) {                                                         // soot smudges
      const hx = A0.head[0] + (hash(i * 7.1 + 2) - .5) * 9 * s, hy = A0.head[1] + (hash(i * 2.3 + 1) - .2) * 7 * s;
      ellipse(hx, hy, 1.3 * s, .7 * s, { fill: rgba('#2A2226', .35 * so), stroke: null, rot: hash(i) });
    }
    return A0;
  }

  // Sami's gold wristwatch on his left forearm (a = TT3.arms(...).L); it ticks
  function watch(a, s, t) {
    const p = mixPt(a.joint, a.end, .78), ang = Math.atan2(a.end[1] - a.joint[1], a.end[0] - a.joint[0]);
    rot(p[0], p[1], ang, () => {
      shape(rectPts(-.45 * s, -.98 * s, .9 * s, 1.96 * s), { fill: C.gold, ...O(s / 6, .7), smooth: .3 });
      circle(0, 0, .72 * s, { fill: C.watchFace, stroke: C.goldDk, lwPx: Math.max(1, s * .16) });
      const h = t * 1.2; line([[0, 0], [Math.cos(h) * .55 * s, Math.sin(h) * .55 * s]], { stroke: C.ink, lwPx: Math.max(1, s * .1) });
    });
  }
  // a watch on its own (the close-up), at screen (x, y), radius r px; hours h (0..12)
  function watchFace(x, y, r, h, t) {
    shape(rectPts(x - r * .55, y - r * 2.1, r * 1.1, r * 4.2), { fill: C.gold, stroke: C.ink, lwPx: Math.max(2, r * .08), smooth: .3 });
    circle(x, y, r, { fill: C.gold, stroke: C.ink, lwPx: Math.max(2, r * .08) }); circle(x, y, r * .82, { fill: C.watchFace, stroke: C.goldDk, lwPx: Math.max(1.5, r * .05) });
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line([[x + Math.sin(a) * r * .68, y - Math.cos(a) * r * .68], [x + Math.sin(a) * r * .78, y - Math.cos(a) * r * .78]], { stroke: C.ink, lwPx: Math.max(1, r * .04) }); }
    const ha = h / 12 * TAU, ma = frac(h) * TAU, sa = (t % 60) / 60 * TAU * 8;
    line([[x, y], [x + Math.sin(ha) * r * .42, y - Math.cos(ha) * r * .42]], { stroke: C.ink, lwPx: Math.max(2, r * .09) });
    line([[x, y], [x + Math.sin(ma) * r * .66, y - Math.cos(ma) * r * .66]], { stroke: C.ink, lwPx: Math.max(1.5, r * .06) });
    line([[x, y], [x + Math.sin(sa) * r * .7, y - Math.cos(sa) * r * .7]], { stroke: C.cross, lwPx: Math.max(1, r * .03) });
  }

  // ---------- thawing ----------
  function hairDryer(x, y, k, ang, on, t, col = 'pink') {                     // held at the grip; ang = where the nozzle points
    const c = col === 'pink' ? [C.pink, C.pinkDk] : [C.teal, C.tealDk], j = on ? jit(.6) : 0;
    rot(x + j, y, ang, () => {
      X.scale(k, k);
      shape([[-4.2, -1], [.2, -1], [-.4, 12], [-3.6, 12]], { fill: c[1], stroke: C.ink, lwPx: LWk(k) });   // the grip (hangs down from the barrel)
      shape(rectPts(-10, -5.5, 22, 11), { fill: c[0], stroke: C.ink, lwPx: LWk(k), smooth: .5 });           // the barrel
      shape([[12, -3.8], [19, -2.8], [19, 2.8], [12, 3.8]], { fill: C.chromeDk, stroke: C.ink, lwPx: LWk(k) });   // the nozzle
      circle(-10, 0, 5, { fill: c[1], stroke: C.ink, lwPx: LWk(k) }); for (let i = 0; i < 3; i++) line([[-12, -2.5 + i * 2.5], [-8, -2.5 + i * 2.5]], { stroke: C.ink, lwPx: LWk(k) * .5 });
      if (on) for (let i = 0; i < 5; i++) {                                     // hot air
        const u = frac(t * 2.6 + i * .2), yy = (i - 2) * 2.2 * (1 + u * 1.5);
        line([[21 + u * 30, yy], [30 + u * 34, yy * 1.08 + Math.sin(t * 30 + i) * 1.2]], { stroke: rgba('#FFFFFF', .85 * (1 - u)), lwPx: Math.max(2, k * 1.4) });
        line([[23 + u * 30, yy + 1], [27 + u * 34, yy + 1.1]], { stroke: rgba('#FFB070', .6 * (1 - u)), lwPx: Math.max(1, k * .8) });
      }
    });
  }
  function duck(x, y, k, o = {}) {                                             // rests on (x, y): the waterline
    rot(x, y, o.rot || 0, () => { X.scale(k, k);
      shape([[-8, -1], [-9, -5], [-6, -7], [2, -6.5], [7, -4], [7, 0], [3, 1.5], [-5, 1.5]], { fill: C.duck, stroke: C.ink, lwPx: LWk(k), smooth: true });
      circle(4, -10, 4, { fill: C.duck, stroke: C.ink, lwPx: LWk(k) });
      shape([[7.5, -10.5], [11, -9.5], [7.5, -8.2]], { fill: C.beak, stroke: C.ink, lwPx: LWk(k) * .8, smooth: .3 });
      circle(5, -11, .9, { fill: C.ink, stroke: null }); shape([[-4, -4], [1, -4.5], [-1, -2]], { fill: C.duckDk, stroke: null }); });
  }
  function kettle(x, y, k, ang = 0, pour = 0, t = 0) {                        // held at the handle; pour 0..1 tips it and pours
    rot(x, y, ang + pour * .9, () => { X.scale(k, k);
      shape([[-8, 4], [8, 4], [10, 14], [-10, 14]], { fill: C.kettle, stroke: C.ink, lwPx: LWk(k), smooth: .4 });
      shape([[9, 9], [17, 3], [18, 4.5], [10, 12]], { fill: C.kettleDk, stroke: C.ink, lwPx: LWk(k) });
      line([[-6, 4], [-4, -2], [4, -2], [6, 4]], { stroke: C.ink, lwPx: LWk(k) * 2.2, smooth: true }); line([[-6, 4], [-4, -2], [4, -2], [6, 4]], { stroke: '#3A3438', lwPx: LWk(k) * 1.2, smooth: true }); });
  }
  function iceSheet(cx, cy, rx, ry, a, t) {                                    // the bath freezing over
    if (a < .01) return;
    ellipse(cx, cy, rx, ry, { fill: rgba(C.ice, .85 * a), stroke: rgba('#FFFFFF', a), lwPx: 2 });
    for (let i = 0; i < 7; i++) { const u = hash(i * 3.3) * TAU, r0 = .2 + .5 * hash(i); line([[cx + Math.cos(u) * rx * r0, cy + Math.sin(u) * ry * r0], [cx + Math.cos(u + .3) * rx * .95, cy + Math.sin(u + .3) * ry * .95]], { stroke: rgba('#FFFFFF', .9 * a), lwPx: 2 }); }
    for (let i = 0; i < 5; i++) { const f = clamp(.5 + .5 * Math.sin(t * 4 + i * 2.1)); shape(starPts(cx + (hash(i + 9) - .5) * rx * 1.4, cy + (hash(i + 4) - .5) * ry * 1.2, 9 * f * a, .2, 4), { fill: '#FFFFFF', stroke: null }); }
  }

  // ---------- the stuffing and the spices ----------
  function spoon(x, y, k, ang = 0) {                                           // held at the end of the handle; points along ang
    rot(x, y, ang, () => { X.scale(k, k); line([[-2, 0], [16, 0]], { stroke: C.ink, lwPx: LWk(k) * 2.6 }); line([[-2, 0], [16, 0]], { stroke: C.wood, lwPx: LWk(k) * 1.4 });
      ellipse(20, 0, 5, 3, { fill: C.wood, stroke: C.ink, lwPx: LWk(k) }); ellipse(20, 0, 3, 1.6, { fill: '#4E9A3A', stroke: null }); });
  }
  function bits(x, y, k, n, seed, t0, t, spread = 30) {                       // kale / broccoli / quinoa flying out of the bowl
    for (let i = 0; i < n; i++) {
      const age = t - t0 - hash(i + seed) * .5; if (age < 0 || age > .8) continue;
      const vx = (hash(i * 2.3 + seed) - .5) * spread, vy = -25 - hash(i * 1.1 + seed) * 25, bx = x + vx * age * k * 2, by = y + (vy * age + 60 * age * age) * k;
      const c = [C.parsley, '#6DB34A', '#E9D6A6', C.parsleyDk][i % 4];
      circle(bx, by, (i % 4 === 2 ? .8 : 1.8) * k, { fill: c, stroke: i % 4 === 2 ? null : C.ink, lwPx: LWk(k) * .5 });
    }
  }
  function beaker(x, y, k, fill = 0, col = C.pepper) {                         // rests on (x, y)
    X.save(); X.translate(x, y); X.scale(k, k);
    if (fill > 0) shape([[-5.6, 0], [5.6, 0], [5.6, -fill * 12], [-5.6, -fill * 12]], { fill: col, stroke: null });
    shape([[-6, 0], [6, 0], [6, -14], [7, -15], [-6.5, -15], [-6, -14]], { fill: C.glass, stroke: C.glassLn, lwPx: LWk(k) });
    for (let i = 1; i < 4; i++) line([[-6, -i * 3.4], [-3, -i * 3.4]], { stroke: C.glassLn, lwPx: LWk(k) * .5 });
    line([[3.5, -12], [3.5, -3]], { stroke: 'rgba(255,255,255,.7)', lwPx: LWk(k) * 1.2 });
    X.restore();
  }
  function cylinder(x, y, k, fill = 0) {                                       // a graduated cylinder, rests on (x, y)
    X.save(); X.translate(x, y); X.scale(k, k);
    shape(rectPts(-5, -1.5, 10, 1.5), { fill: C.glassLn, stroke: C.ink, lwPx: LWk(k) * .7 });
    if (fill > 0) shape(rectPts(-2.4, -1.5 - fill * 22, 4.8, fill * 22), { fill: '#E8C15A', stroke: null });
    shape(rectPts(-2.8, -26, 5.6, 24.5), { fill: C.glass, stroke: C.glassLn, lwPx: LWk(k) });
    for (let i = 1; i < 7; i++) line([[-2.8, -1.5 - i * 3.4], [-.8 - (i % 2), -1.5 - i * 3.4]], { stroke: C.glassLn, lwPx: LWk(k) * .5 });
    X.restore();
  }
  function pepperJar(x, y, k, o = {}) {                                        // held at its middle; o.tilt (rad), o.lid (true: on)
    rot(x, y, o.tilt || 0, () => { X.scale(k, k);
      shape(rectPts(-4.5, -7, 9, 14), { fill: 'rgba(220,235,240,.8)', stroke: C.ink, lwPx: LWk(k), smooth: .2 });
      const lvl = o.full ?? 1; if (lvl > .02) shape(rectPts(-3.8, 6.4 - 12.6 * lvl, 7.6, 12.6 * lvl), { fill: C.pepper, stroke: null });
      shape(rectPts(-4.6, -2, 9.2, 5), { fill: '#F2E4C4', stroke: C.ink, lwPx: LWk(k) * .6 });
      X.font = `900 3.4px ${FONT_TALK}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = C.ink; X.fillText('PEPPER', 0, .5);
      if (o.lid !== false) { shape(rectPts(-5, -10, 10, 3.2), { fill: '#C9D2DA', stroke: C.ink, lwPx: LWk(k), smooth: .3 }); for (let i = -1; i <= 1; i++) circle(i * 2.4, -10, .6, { fill: C.ink, stroke: null }); }
    });
  }
  function lid(x, y, k, a) { rot(x, y, a, () => { X.scale(k, k); shape(rectPts(-5, -1.6, 10, 3.2), { fill: '#C9D2DA', stroke: C.ink, lwPx: LWk(k), smooth: .3 }); }); }
  function flourBag(x, y, k, o = {}) {                                         // rests on (x, y); o.burst 0..1 (torn open)
    X.save(); X.translate(x, y); X.scale(k, k);
    const b = o.burst || 0;
    shape([[-9, 0], [9, 0], [9.5, -18], [7, -21 - b * 3], [3, -19], [0, -22 - b * 4], [-4, -19], [-7, -21 - b * 2], [-9.5, -18]], { fill: C.bag, stroke: C.ink, lwPx: LWk(k), smooth: .15 });
    shape(rectPts(-6.5, -14, 13, 8), { fill: '#FFFDF6', stroke: C.bagDk, lwPx: LWk(k) * .6 });
    X.font = `900 4.2px ${FONT_TALK}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#C0472E'; X.fillText('FLOUR', 0, -10);
    if (b > 0) ellipse(0, -19, 6, 2.2, { fill: C.flour, stroke: null });
    X.restore();
  }
  // a puffy cloud of circles at screen (x, y), radius r px; seed varies the lumps
  function cloud(x, y, r, col, a, seed = 0, t = 0) {
    if (a < .01 || r < 1) return;
    X.save(); X.globalAlpha *= clamp(a);
    for (let i = 0; i < 9; i++) { const u = i / 9 * TAU + hash(seed + i) * .7, d = r * (.35 + .3 * hash(seed + i * 2)), rr = r * (.42 + .25 * hash(seed + i * 3)) * (1 + .04 * Math.sin(t * 2 + i));
      circle(x + Math.cos(u) * d, y + Math.sin(u) * d * .75, rr, { fill: col, stroke: null }); }
    circle(x, y, r * .62, { fill: col, stroke: null });
    X.restore();
  }
  // a burst of puffs spreading from (x, y): age seconds, R px final radius
  function puffs(x, y, R, col, age, life, seed = 0, t = 0, n = 7) {
    if (age < 0 || age > life) return;
    const u = easeOut(clamp(age / (life * .6))), a = 1 - seg(age, life * .55, life);
    for (let i = 0; i < n; i++) { const ang = i / n * TAU + hash(seed + i), d = R * .7 * u * (.6 + .5 * hash(i + seed * 3));
      cloud(x + Math.cos(ang) * d, y + Math.sin(ang) * d * .7 - R * .15 * u, R * (.25 + .3 * u) * (.7 + .5 * hash(i * 2 + seed)), col, a, seed + i * 5, t); }
  }
  function specks(cx, cy, w, h, n, col, seed, a = 1) {                        // pepper or flour specks over a region (screen px)
    if (a < .01) return;
    for (let i = 0; i < n; i++) circle(cx + (hash(i * 2.7 + seed) - .5) * w, cy + (hash(i * 1.9 + seed) - .5) * h, 1.2 + 1.8 * hash(i + seed), { fill: rgba(col, a), stroke: null });
  }

  // ---------- the cover-up ----------
  function brush(x, y, k, ang = 0, wet = 1) {                                  // held at the handle end; bristles along ang
    rot(x, y, ang, () => { X.scale(k, k);
      shape(rectPts(-3, -1.4, 16, 2.8), { fill: '#C9473A', stroke: C.ink, lwPx: LWk(k), smooth: .5 });
      shape(rectPts(13, -2.2, 4, 4.4), { fill: C.chrome, stroke: C.ink, lwPx: LWk(k) });
      shape([[17, -2.4], [24, -2.8], [25.5, 0], [24, 2.8], [17, 2.4]], { fill: wet > .5 ? C.gravyLt : '#E8D2A0', stroke: C.ink, lwPx: LWk(k), smooth: .3 });
      if (wet > .5) circle(26, 2.5, 1, { fill: C.gravy, stroke: null }); });
  }
  function gravyPot(x, y, k) {                                                 // rests on (x, y)
    X.save(); X.translate(x, y); X.scale(k, k);
    shape([[-9, -12], [9, -12], [8, 0], [-8, 0]], { fill: '#5E6E82', stroke: C.ink, lwPx: LWk(k), smooth: .2 });
    ellipse(0, -12, 9, 2.4, { fill: C.gravy, stroke: C.ink, lwPx: LWk(k) }); ellipse(-2, -12.4, 4, .9, { fill: C.gravyLt, stroke: null });
    line([[9, -9], [15, -8]], { stroke: C.ink, lwPx: LWk(k) * 2.2 });
    X.font = `900 3.4px ${FONT_TALK}`; X.textAlign = 'center'; X.fillStyle = '#FFF4DC'; X.fillText('GRAVY', 0, -4.5);
    X.restore();
  }
  function bandAid(x, y, k, ang = 0) {
    rot(x, y, ang, () => { X.scale(k, k); shape(rectPts(-6.5, -2, 13, 4), { fill: C.band, stroke: C.ink, lwPx: LWk(k) * .7, smooth: .5 });
      shape(rectPts(-2.2, -1.7, 4.4, 3.4), { fill: C.bandPad, stroke: null }); for (const sx of [-4.6, -3.4, 3.4, 4.6]) for (const sy of [-.8, .8]) circle(sx, sy, .3, { fill: '#C9997A', stroke: null }); });
  }
  function toothpick(x0, y0, x1, y1, k) { line([[x0, y0], [x1, y1]], { stroke: C.ink, lwPx: Math.max(2.4, k * 1.3) }); line([[x0, y0], [x1, y1]], { stroke: C.pick, lwPx: Math.max(1.2, k * .7) }); }
  function parsley(x, y, k, ang = 0) {                                         // a bunch, held at the stems
    rot(x, y, ang, () => { X.scale(k, k);
      for (let i = -2; i <= 2; i++) line([[0, 0], [i * 1.5, -9]], { stroke: C.parsleyDk, lwPx: LWk(k) * .7 });
      for (let i = 0; i < 9; i++) { const a = -Math.PI / 2 + (i - 4) * .3, r = 10 + 2 * hash(i); circle(Math.cos(a) * r, Math.sin(a) * r, 3.2, { fill: [C.parsley, C.parsleyLt, C.parsleyDk][i % 3], stroke: C.ink, lwPx: LWk(k) * .5 }); } });
  }
  // the detached right drumstick (local turkey units × s; anchor = the joint end). glaze 0..1 paints it
  function drumstick(x, y, s, ang = 0, glaze = 0) {
    rot(x, y, ang, () => { X.scale(s, s); const lw = clamp(s * .32, .9, 4) / s;
      line([[6, -7], [9.5, -12]], { stroke: C.ink, lwPx: (clamp(s * .32, .9, 4)) * 2.6 + 1.1 * s }); line([[6, -7], [9.5, -12]], { stroke: '#BFB3A6', lwPx: 1.1 * s });
      for (const [dx, dy] of [[-.6, .3], [.6, -.4]]) circle(9.5 + dx, -12 + dy, .8, { fill: '#BFB3A6', stroke: C.ink, lwPx: lw * s * .7 });
      const th = [[0, 0], [5, 1], [8.5, -2], [9.2, -6.5], [7.8, -9], [5, -8.5], [1.5, -5]];
      shape(th, { fill: glaze > .5 ? C.glaze : C.char, stroke: C.ink, lwPx: lw * s, smooth: true });
      if (glaze > .5) shape([[5.5, -6.5], [7.5, -5], [7, -2.5], [6, -4.5]], { fill: 'rgba(255,255,255,.55)', stroke: null, smooth: true });
      else for (let i = 0; i < 3; i++) circle(2 + i * 2.2, -3 - (i % 2) * 2, .35, { fill: '#FF7A2A', stroke: null }); });
  }
  function frill(x, y, r, ang = 0) {                                           // a paper frill on a bone tip (screen px radius)
    const pts = []; for (let i = 0; i <= 10; i++) { const a = ang - Math.PI * .5 + (i / 10 - .5) * 2.4, rr = i % 2 ? r * .5 : r; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    shape(pts, { fill: '#FFFFFF', stroke: C.ink, lwPx: Math.max(1.4, r * .12) }); circle(x, y, r * .35, { fill: '#FFFFFF', stroke: C.ink, lwPx: Math.max(1, r * .08) });
  }
  // a heap of parsley, cranberries and orange slices (screen centre, w × h px); n 0..1 how much has landed
  function garnish(cx, cy, w, h, n, seed = 0) {
    const N = Math.round(18 * n);
    for (let i = 0; i < N; i++) { const gx = cx + (hash(i + seed) - .5) * w, gy = cy + (hash(i * 1.7 + seed) - .5) * h, r = h * .2;
      for (let j = 0; j < 4; j++) circle(gx + Math.cos(j * 1.6 + i) * r * .7, gy + Math.sin(j * 1.6 + i) * r * .5, r * .75, { fill: [C.parsley, C.parsleyLt, C.parsleyDk, C.parsley][j], stroke: j ? null : C.parsleyDk, lwPx: 1.2 }); }
    for (let i = 0; i < Math.round(6 * n); i++) { const ox = cx + (hash(i * 4.1 + seed) - .5) * w * .85, oy = cy + (hash(i * 2.9 + seed) - .5) * h * .8, r = h * .3;
      circle(ox, oy, r, { fill: C.orangeLt, stroke: C.ink, lwPx: 1.5 }); circle(ox, oy, r * .72, { fill: C.orange, stroke: null });
      for (let q = 0; q < 4; q++) line([[ox, oy], [ox + Math.cos(q * .8) * r * .7, oy + Math.sin(q * .8) * r * .7]], { stroke: C.orangeLt, lwPx: 1.2 }); }
    for (let i = 0; i < Math.round(12 * n); i++) { const bx = cx + (hash(i * 7.3 + seed) - .5) * w, by = cy + (hash(i * 5.1 + seed) - .5) * h, r = h * .13;
      circle(bx, by, r, { fill: C.cran, stroke: C.cranDk, lwPx: 1 }); circle(bx - r * .3, by - r * .3, r * .3, { fill: 'rgba(255,255,255,.7)', stroke: null }); }
  }
  function towel(x, y, k, t, ph = 0, col = C.towelB) {                         // a tea towel held at one corner, flapping
    const pts = [], w = 24, h = 30;
    for (let i = 0; i <= 6; i++) { const u = i / 6; pts.push([x + u * w * k + Math.sin(t * 16 + ph + u * 3) * 4 * k * u, y + Math.sin(t * 16 + ph + u * 2) * 6 * k * u]); }
    const bot = pts.map(([a, b], i) => [a + Math.sin(t * 16 + ph + i) * 3 * k, b + h * k]).reverse();
    shape([...pts, ...bot], { fill: C.towelA, stroke: C.ink, lwPx: LWk(k), smooth: .3 });
    for (const f of [.25, .75]) { const a = mixPt(pts[0], bot[6], f), b = mixPt(pts[6], bot[0], f); line([a, b], { stroke: col, lwPx: Math.max(2, 2.5 * k) }); }
  }
  function mitt(x, y, k, ang = 0) {                                            // an oven mitt over a hand (screen point = the wrist)
    rot(x, y, ang, () => { X.scale(k, k);
      shape([[-1, -4.5], [8, -5], [11, -2.5], [11, 2.5], [8, 5], [-1, 4.5]], { fill: C.mitt, stroke: C.ink, lwPx: LWk(k), smooth: .4 });
      shape([[4, -5], [7, -8.5], [9.5, -7.5], [8.5, -4]], { fill: C.mitt, stroke: C.ink, lwPx: LWk(k), smooth: .4 });
      shape(rectPts(-2.5, -5, 3, 10), { fill: C.mittDk, stroke: C.ink, lwPx: LWk(k) * .8 });
      for (let i = 0; i < 3; i++) line([[1.5 + i * 2.6, -3.5], [1.5 + i * 2.6, 3.5]], { stroke: C.mittDk, lwPx: LWk(k) * .5 }); });
  }
  // the chessboard on the island top (world quads via P): centre (wx, wz), half-size h
  function chess(P, wx, wy, wz, h, t, moved = 0) {
    const sq = h / 4;
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
      const q = P.poly([[wx - h + i * sq, wy, wz - h + j * sq], [wx - h + (i + 1) * sq, wy, wz - h + j * sq], [wx - h + (i + 1) * sq, wy, wz - h + (j + 1) * sq], [wx - h + i * sq, wy, wz - h + (j + 1) * sq]]);
      if (q) shape(q, { fill: (i + j) % 2 ? '#5A3A26' : C.board, stroke: null });
    }
    const e = P.poly([[wx - h, wy, wz - h], [wx + h, wy, wz - h], [wx + h, wy, wz + h], [wx - h, wy, wz + h]]); if (e) shape(e, { fill: null, stroke: C.boardDk, lwPx: 2.5 });
    const piece = (i, j, col, tall) => { const [sx, sy, k] = P.p(wx - h + (i + .5) * sq, wy, wz - h + (j + .5) * sq);
      shape([[sx - 2.6 * k, sy], [sx + 2.6 * k, sy], [sx + 1.4 * k, sy - tall * k], [sx - 1.4 * k, sy - tall * k]], { fill: col, stroke: C.ink, lwPx: 1.4 }); circle(sx, sy - tall * k - 1.4 * k, 1.8 * k, { fill: col, stroke: C.ink, lwPx: 1.4 }); };
    const list = []; for (let i = 0; i < 8; i++) { list.push([i, 7, '#FFFDF6', i % 4 === 3 ? 9 : 6]); list.push([i, 0, '#3A2A2E', i % 4 === 3 ? 9 : 6]); }
    list.push([4, 5 - 2 * moved, '#FFFDF6', 6]);
    list.sort((a, b) => b[1] - a[1]).forEach(p => piece(...p));
  }
  // the glaze being painted on the burnt bird: TKY.turkey(x, y, s, burnt) frame; wipe 0..1 from left to right
  const BODY = [[-17, -1.5], [-19.5, -8], [-17.5, -15.5], [-11, -21.5], [0, -23.5], [11, -21.5], [17.5, -15.5], [19.5, -8], [17, -1.5], [8, .3], [-8, .3]];
  // the burnt bird's own shapes (turkey.js: BODY made lumpy with seed 7, the thighs, the wings), for the glaze to follow
  const LUMPY = BODY.map(([a, b], i) => [a + (hash(i * 3.7 + 7) - .5) * 1.6, b + (hash(i * 5.3 + 7) - .5) * 1.6]);
  const THIGH = sd => [[sd * 7.5, -2], [sd * 14, -1], [sd * 18.5, -5], [sd * 19.5, -11], [sd * 18, -15.5], [sd * 14.5, -15], [sd * 10, -11], [sd * 7.5, -6.5]];
  const WING = sd => [[sd * 15, -18], [sd * 20.5, -16], [sd * 21.5, -10], [sd * 17, -8]];
  const inset = (pts, k) => { const c = pts.reduce((a, p) => [a[0] + p[0] / pts.length, a[1] + p[1] / pts.length], [0, 0]); return pts.map(([a, b]) => [c[0] + (a - c[0]) * k, c[1] + (b - c[1]) * k]); };
  // the gravy glaze being painted on the burnt bird, in TKY.turkey(x, y, s, 'burnt')'s frame: wipe 0..1 sweeps left → right,
  // following the bird's own silhouette (wings, body, both thighs) with brush strokes, and black still showing at the edges
  function glaze(x, y, s, wipe, t, o = {}) {
    if (wipe <= 0) return;
    const sc = s * .6, edge = -24 + 49 * wipe;
    X.save(); X.translate(x, y); X.scale(sc, sc);
    X.beginPath(); X.rect(-26, -32, edge + 26, 40); X.clip();
    const g = linGrad(0, -23, 0, 0, [[0, C.glazeXl], [.45, C.glazeLt], [1, C.glazeDk]]), lw = 1 / sc;
    const parts = [WING(-1), WING(1), LUMPY, THIGH(-1), ...(o.noRight ? [] : [THIGH(1)])];
    parts.forEach((pts, i) => shape(inset(pts, i === 2 ? .9 : .8), { fill: g, stroke: null, smooth: true, alpha: .96 }));
    // brush strokes: curved bands across the breast and down the thighs, with bristle marks
    for (let i = 0; i < 7; i++) { const yy = -20 + i * 2.8, w = 14 - Math.abs(i - 3) * 1.6;
      line([[-w, yy + .8], [0, yy - .6], [w, yy + .8]], { stroke: rgba(i % 2 ? C.glazeDk : C.glazeXl, .55), lwPx: Math.max(1.4, sc * .7), smooth: true });
      for (let j = 0; j < 3; j++) line([[-w + j * 3, yy + .2 + j * .25], [-w + 5 + j * 3, yy - .2 + j * .25]], { stroke: rgba(C.glazeDk, .35), lwPx: Math.max(1, sc * .25) }); }
    for (const sd of o.noRight ? [-1] : [-1, 1]) line([[sd * 10, -4], [sd * 14, -8], [sd * 16, -12]], { stroke: rgba(C.glazeXl, .6), lwPx: Math.max(1.4, sc * .6), smooth: true });
    ellipse(-6, -17, 4, 1.4, { fill: 'rgba(255,255,255,.7)', stroke: null, rot: -.3 });
    for (let i = 0; i < 4; i++) { const dx = -12 + i * 7, dl = 1.5 + 2 * hash(i * 9) * (.5 + .5 * Math.sin(t * 2 + i)); line([[dx, -.6], [dx, -.6 + dl]], { stroke: C.glazeDk, lwPx: Math.max(1.4, sc * .5) }); circle(dx, -.6 + dl, .55, { fill: C.glazeDk, stroke: null }); }   // drips
    X.restore();
    if (wipe < 1) { X.save(); X.translate(x, y); X.scale(sc, sc); line([[edge, -24], [edge + .6, -12], [edge, 0]], { stroke: rgba(C.gravyLt, .9), lwPx: Math.max(2, sc * 1.2), smooth: true }); X.restore(); }   // the wet leading edge
    for (let i = 0; i < 5; i++) { const f = clamp(.5 + .5 * Math.sin(t * 5 + i * 2.1)); if (wipe > (i + 1) / 6) shape(starPts(x + (-12 + i * 6) * sc, y - (12 + 6 * hash(i)) * sc, 2.2 * sc * f, .2, 4), { fill: '#FFFFFF', stroke: null }); }
  }
  // the turkey-frame region of the right drumstick (to clip it away), and the black stump left behind
  const DRUM_R = [[9.5, .5], [24, .5], [25, -25], [15, -19], [9.5, -11]];
  function withoutDrumstick(x, y, s, fn) {                                     // run fn (draws the burnt bird) with its right drumstick cut away
    const sc = s * .6; X.save(); X.beginPath(); X.rect(-50, -50, W + 100, H + 100);
    const p = DRUM_R.map(([a, b]) => [x + a * sc, y + b * sc]).reverse(); X.moveTo(p[0][0], p[0][1]); p.slice(1).forEach(q => X.lineTo(q[0], q[1])); X.closePath();
    X.clip('evenodd'); fn(); X.restore();
    const st = [[9.5, .2], [16.5, -1.4], [18.8, -8], [17.2, -14.8], [14, -17.2], [9.5, -11]].map(([a, b]) => [x + a * sc, y + b * sc]);
    shape(st, { fill: C.charLt, stroke: C.ink, lwPx: clamp(sc * .32, .9, 4), smooth: .4 });
    circle(x + 15 * sc, y - 8 * sc, 2.4 * sc, { fill: '#5A4C50', stroke: C.ink, lwPx: clamp(sc * .25, .8, 3) });
  }

  // ---------- the clock: the kitchen clock's face, re-drawn (it races through the morning) ----------
  function clock(P, hr, t) {
    if (!P.visible(1299)) return;
    P.plane(1299.3, () => {
      const K = { x: -260, y: 268, r: 17 }, lw = clamp(P.cam.f / 700, .6, 4.5);
      circle(K.x, -K.y, K.r - 1.2, { fill: '#FFF8E8', stroke: null });
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line([[K.x + Math.sin(a) * (K.r - 4), -K.y - Math.cos(a) * (K.r - 4)], [K.x + Math.sin(a) * (K.r - 2), -K.y - Math.cos(a) * (K.r - 2)]], { stroke: C.ink, lwPx: lw * .6 }); }
      const ha = hr / 12 * TAU, ma = frac(hr) * TAU, sa = frac(hr * 60) * TAU;
      line([[K.x, -K.y], [K.x + Math.sin(ha) * K.r * .5, -K.y - Math.cos(ha) * K.r * .5]], { stroke: C.ink, lwPx: lw * 1.6 });
      line([[K.x, -K.y], [K.x + Math.sin(ma) * K.r * .8, -K.y - Math.cos(ma) * K.r * .8]], { stroke: C.ink, lwPx: lw * 1.1 });
      line([[K.x, -K.y], [K.x + Math.sin(sa) * K.r * .82, -K.y - Math.cos(sa) * K.r * .82]], { stroke: '#D9452F', lwPx: lw * .6 });
      circle(K.x, -K.y, 1.2, { fill: C.ink, stroke: null });
    });
  }
  // the oven's backguard display, re-drawn to read 1400° (or anything)
  function display(P, txt, col = '#FF5A2A') {
    if (!P.visible(1286)) return;
    P.plane(1285.4, () => { shape(rectPts(-18, -112, 36, 12), { fill: '#1E2A26', stroke: C.ink, lwPx: 1.2, smooth: .2 });
      X.font = `900 8px ${FONT_TALK}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = col; X.fillText(txt, 0, -105.5); });
  }
  // the dial's MAX marks (plane of the oven front) and a red needle cranked to angle a (rad)
  function dialMarks(P, k) {
    P.plane(1229.4, () => { X.font = `900 3px ${FONT_TALK}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = C.ink;
      X.fillText('OFF', -8.5, -86.8 + 8); X.fillText('MAX', 8.8, -86.8 + 8); });
  }

  // ---------- cards ----------
  function card(txt, sub, c, x = W / 2, y = 190, col = '#F28C28') {
    if (c <= 0) return;
    overlay(() => {
      X.save(); X.translate(x, y); X.rotate(-.03); X.scale(c, c);
      shape(rectPts(-560, -110, 1120, 220), { fill: '#FFF4EC', stroke: PAL.ink, lwPx: 8, smooth: .1 });
      X.font = `100px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
      X.lineWidth = 14; X.strokeStyle = PAL.ink; X.strokeText(txt, 0, sub ? -18 : 8); X.fillStyle = col; X.fillText(txt, 0, sub ? -18 : 8);
      if (sub) { X.font = `700 40px ${FONT_TALK}`; X.fillStyle = PAL.ink; X.fillText(sub, 0, 68); }
      X.restore();
    });
  }
  function continued(c) {
    if (c <= 0) return;
    overlay(() => {
      X.save(); X.translate(W - 420, H - 125); X.rotate(-.05); X.scale(c * .78, c * .78);
      shape(rectPts(-470, -95, 940, 190), { fill: '#FFF4EC', stroke: PAL.ink, lwPx: 8, smooth: .1 });
      X.font = `92px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
      X.lineWidth = 14; X.strokeStyle = PAL.ink; X.strokeText('TO BE CONTINUED...', 0, 8); X.fillStyle = '#F28C28'; X.fillText('TO BE CONTINUED...', 0, 8);
      X.restore();
    });
  }

  return { C, arms, dress, watch, watchFace, hairDryer, duck, kettle, iceSheet, spoon, bits, beaker, cylinder, pepperJar, lid, flourBag, cloud, puffs, specks,
    brush, gravyPot, bandAid, toothpick, parsley, drumstick, frill, garnish, towel, mitt, chess, glaze, withoutDrumstick, clock, display, dialMarks, card, continued };
})();
