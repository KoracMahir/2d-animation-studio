// Scene 74 props (namespace TF4): the cutlery, the served food, the gags and the cards of "The Thanksgiving Feast".
// Everything draws in SCREEN space and is a pure function of its arguments. k = px per world unit (P.k(Z)) unless noted;
// (x, y) is a screen point; angles are screen radians (0 = right, +PI/2 = down). Animated bits take t.
//
//   TF4.knife(hx, hy, k, ang, o)        carving knife held at the hand (o.bend 0..1 bends the blade, o.glint)
//   TF4.carvFork(hx, hy, k, ang)        two-tine carving fork
//   TF4.fork(hx, hy, k, ang, o)         a dinner fork (o.bend 0..1, o.bite: 'turkey' | 'pie' | 'stuff' | 'watch')
//   TF4.drumstick(x, y, k, rot, o)      the band-aided drumstick (o.bite 0..1: bite marks)
//   TF4.slice(x, y, k, rot, o)          a loose slice of the carved turkey (o.burn 0..1 extra charred, smoking)
//   TF4.watch(x, y, k, t, o)            the doctor's wristwatch hanging by its strap from (x, y) (o.ring 0..1 alarm shake)
//   TF4.flame(x0, y0, x1, y1, k, t, a)  Dragon's flame from his mouth to a target
//   TF4.mist(x, y, k, t, a)             cold mist rolling off something frozen
//   TF4.napkinLump(x, y, k)             a napkin with something suspicious under it
//   TF4.piePlate(x, y, s, t, o)         a plate with a slice of pumpkin pie and whipped cream (s = TKY scale; o.eaten 0..1)
//   TF4.plateStack(x, y, s, n, t)       n untouched turkey plates stacked up (s = TKY scale)
//   TF4.formula(x, y, size, k)          the professor's floating chalk formula
//   TF4.thought(x, y, w, k, t)          the twins' shared thought: two tall chef's hats and a neon TURKEY TAKEOVER
//   TF4.queasy(x, y, size, t, a)        wavy queasy lines over a face
//   TF4.frost(x, y, w, a)               frost creeping over someone who just bit a frozen turkey
//   TF4.hearts(x, y, size, t, a, seed)  little rising hearts
//   TF4.confetti(t, a)                  autumn leaves and sparkles falling over the frame (the dessert lift)
//   TF4.title(t, a, b) · TF4.tbc(c)     the title card and TO BE CONTINUED…
const TF4 = (() => {
  const C = {
    ink: PAL.ink, steel: '#C9D0D8', steelLt: '#F2F5F8', steelDk: '#7E8893', handle: '#6A3B22', handleLt: '#8E5234', gold: '#E4AE3E',
    char: '#211B1E', charLt: '#3E3236', grey: '#8C7E78', ice: '#BFE3F2', iceLt: '#E8F7FD', iceDk: '#86C2DD', iceXd: '#5A9CC0',
    glaze: '#C8681C', band: '#E8BE96', bandPad: '#F7EDE0', bone: '#E8DCC8', kale: '#2F6E3A', kaleLt: '#4E9A4A',
    pie: '#D9792A', pieLt: '#E98A3A', pieDk: '#B65E1C', crust: '#E8B46A', crustDk: '#C08A44', cream: '#FFFDF8', creamDk: '#E8DCC8',
    flame: '#FF8A2A', flameLt: '#FFD24A', flameXl: '#FFF6C8', napkin: '#C8402A', napkinLt: '#E0613F', neon: '#FF4FA8', neonB: '#56E8FF',
    paper: '#FFF4EC', orange: '#E8742A', heart: '#F0507A', leaf: ['#D9452F', '#E8742A', '#E4AE3E', '#A8501E'],
  };
  const lw = (k, m = 1) => clamp(k * .9 * m, .9, 5);
  const O = (k, m = 1) => ({ stroke: C.ink, lwPx: lw(k, m) });
  function frame(x, y, k, ang, fn) { X.save(); X.translate(x, y); X.rotate(ang); X.scale(k, k); fn(); X.restore(); }

  // ---------- cutlery ----------
  function knife(hx, hy, k, ang, o = {}) {                                 // local: x along the blade (world units), handle behind the hand
    const b = clamp(o.bend || 0);
    frame(hx, hy, k, ang, () => {
      const L = 34, bl = []; for (let i = 0; i <= 10; i++) { const u = i / 10, x = 3 + u * L, dy = b * 9 * u * u; bl.push([x, dy - 2.4 * (1 - u * .85)]); }
      const tip = [3 + L, b * 9], br = []; for (let i = 10; i >= 0; i--) { const u = i / 10, x = 3 + u * L, dy = b * 9 * u * u; br.push([x, dy + 1.6]); }
      shape([...bl, tip, ...br], { fill: linGrad(0, -3, 0, 2, [[0, C.steelLt], [.5, C.steel], [1, C.steelDk]]), ...O(k, .7), smooth: .2 });
      if (o.glint) { const g = clamp(o.glint); shape(starPts(20, -1, 5 * g, 1.2 * g, 4), { fill: '#FFFFFF', stroke: null }); }
      shape(rectPts(1.5, -3, 2.5, 6), { fill: C.gold, ...O(k, .6) });
      shape([[-12, -2.2], [1.5, -2.6], [1.5, 2.6], [-12, 2.2], [-13.2, 0]], { fill: C.handle, ...O(k, .7), smooth: .2 });
      for (const x of [-9, -4]) circle(x, 0, .8, { fill: C.gold, stroke: null });
    });
  }
  function carvFork(hx, hy, k, ang) {
    frame(hx, hy, k, ang, () => {
      line([[2, 0], [16, 0]], { stroke: C.ink, lwPx: lw(k, .7) + 2.2 * k }); line([[2, 0], [16, 0]], { stroke: C.steel, lwPx: 2.2 * k });
      for (const d of [-1, 1]) { line([[15, 0], [18, d * 2.2], [27, d * 2.2]], { stroke: C.ink, lwPx: lw(k, .7) + 1.3 * k }); line([[15, 0], [18, d * 2.2], [27, d * 2.2]], { stroke: C.steelLt, lwPx: 1.3 * k }); }
      shape([[-10, -2], [2, -2.4], [2, 2.4], [-10, 2], [-11, 0]], { fill: C.handle, ...O(k, .7), smooth: .2 });
    });
  }
  function fork(hx, hy, k, ang, o = {}) {                                  // a dinner fork, 17 world units, held near its end
    const b = clamp(o.bend || 0);
    frame(hx, hy, k, ang, () => {
      const L = 13, pts = []; for (let i = 0; i <= 8; i++) { const u = i / 8; pts.push([-4 + u * L, b * 7 * u * u]); }
      line(pts, { stroke: C.ink, lwPx: lw(k, .6) + 1.5 * k, smooth: true }); line(pts, { stroke: C.steel, lwPx: 1.5 * k, smooth: true });
      const e = pts[8], a = Math.atan2(pts[8][1] - pts[7][1], pts[8][0] - pts[7][0]);
      X.save(); X.translate(e[0], e[1]); X.rotate(a);
      shape([[0, -1.8], [1.5, -2], [1.5, 2], [0, 1.8]], { fill: C.steel, ...O(k, .5) });
      for (let i = 0; i < 4; i++) { const yy = -1.6 + i * 1.07, curl = b * (i - 1.5) * 1.6; line([[1.2, yy], [5.5, yy + curl]], { stroke: C.ink, lwPx: lw(k, .5) + .7 * k }); line([[1.2, yy], [5.5, yy + curl]], { stroke: C.steelLt, lwPx: .7 * k }); }
      if (o.bite === 'turkey') { shape([[3, -3], [6.5, -3.2], [7.5, 1.8], [2.5, 2.2]], { fill: C.char, ...O(k, .5), smooth: .4 }); shape([[4, -1.4], [6, -1.5], [6.2, .8], [3.8, 1]], { fill: C.ice, stroke: null, smooth: .4 }); }
      if (o.bite === 'pie') { shape([[2.5, -2.6], [7, -3], [7.6, 2.2], [2.4, 2.4]], { fill: C.pieLt, ...O(k, .5), smooth: .4 }); ellipse(5, -3, 2.4, 1.6, { fill: C.cream, ...O(k, .35) }); }
      if (o.bite === 'stuff') for (let i = 0; i < 4; i++) circle(3.5 + (i % 2) * 2.2, -1.2 + Math.floor(i / 2) * 2.2, 1.5, { fill: i % 2 ? C.kale : C.kaleLt, ...O(k, .35) });
      X.restore();
      shape([[-9, -1.2], [-4, -1.4], [-4, 1.4], [-9, 1.2], [-9.8, 0]], { fill: C.steelDk, ...O(k, .5), smooth: .3 });
    });
  }

  // ---------- the food ----------
  function bandAid(cx, cy, a, k) {
    X.save(); X.translate(cx, cy); X.rotate(a);
    shape(rectPts(-5, -1.6, 10, 3.2), { fill: C.band, ...O(k, .45), smooth: .5 }); shape(rectPts(-1.8, -1.2, 3.6, 2.4), { fill: C.bandPad, stroke: null });
    for (let i = 0; i < 3; i++) circle(-3.6 + i * .6, -.4 + (i % 2) * .8, .18, { fill: '#B88E6A', stroke: null });
    X.restore();
  }
  function drumstick(x, y, k, rot, o = {}) {                               // local origin at the bone tip (where the hand holds it); meat to +x
    const bite = clamp(o.bite || 0);
    frame(x, y, k, rot, () => {
      line([[0, 0], [9, 0]], { stroke: C.ink, lwPx: lw(k, .7) + 2.6 * k }); line([[0, 0], [9, 0]], { stroke: C.bone, lwPx: 2.6 * k });
      for (const [dx, dy] of [[-.6, -1], [-.6, 1]]) circle(dx, dy, 1.4, { fill: C.bone, ...O(k, .5) });
      shape([[-1.2, -2.4], [1.6, -1.4], [1.6, 1.4], [-1.2, 2.4]], { fill: '#FFFFFF', ...O(k, .4) });       // the paper frill
      const meat = [[8, -3], [13, -5.5], [19, -5], [22, -1.5], [21, 3], [16, 5], [10, 3.6], [8, 2]];
      shape(meat, { fill: C.char, ...O(k, .8), smooth: true });
      shape([[10, -3], [15, -4.6], [19, -3.6], [17, -1.6], [12, -1.4]], { fill: rgba(C.glaze, .85), stroke: null, smooth: true });   // what is left of the paint
      if (bite > .05) for (let i = 0; i < 3; i++) circle(21 - i * 2.2, -3 + i * 2.2, 1.6 * bite, { fill: '#5A4C50', stroke: null });
      bandAid(13.5, .8, -.5, k);
      line([[11, -4], [17, 3.6]], { stroke: C.ink, lwPx: lw(k, .5) + .9 * k }); line([[11, -4], [17, 3.6]], { stroke: '#E3C08A', lwPx: .9 * k });   // a toothpick
    });
  }
  function slice(x, y, k, rot, o = {}) {                                   // origin: bottom centre of the wedge (about 13 × 8 world units)
    const burn = clamp(o.burn || 0);
    frame(x, y, k, rot, () => {
      const w = [[-6.5, 0], [-5, -3.2], [-1.5, -6], [3, -6.4], [6, -3.6], [6.5, 0]];
      shape(w, { fill: C.char, ...O(k, .8), smooth: .45 });
      shape(w.map(([a, b]) => [a * .78, -.2 + b * .72]), { fill: mixCol(C.grey, C.char, burn), stroke: null, smooth: .45 });
      shape(w.map(([a, b]) => [a * .56, -.3 + b * .46]), { fill: mixCol(C.ice, C.char, burn * .8), stroke: rgba(C.iceXd, 1 - burn), lwPx: lw(k, .3), smooth: .45 });
      if (burn < .5) for (const [a, b] of [[-1, -1.4], [1.4, -1.8]]) shape(starPts(a, b, .9, .25, 4), { fill: '#FFFFFF', stroke: null });
    });
    if (burn > .3) for (let i = 0; i < 4; i++) { const u = frac(o.t * .7 + i / 4), sx = x + Math.sin(o.t * 2 + i) * 3 * k, sy = y - (6 + u * 26) * k;
      circle(sx, sy, (2 + u * 4) * k, { fill: rgba('#5A5458', .45 * (1 - u) * burn), stroke: null }); }
  }
  function watch(x, y, k, t, o = {}) {                                     // hanging by the strap from (x, y)
    const ring = clamp(o.ring || 0), sw = (o.swing ?? .25) * Math.sin(t * 3.4) + ring * .25 * Math.sin(t * 40);
    frame(x, y, k, sw, () => {
      shape([[-1.2, 0], [1.2, 0], [1.2, 6], [-1.2, 6]], { fill: '#6A4129', ...O(k, .5) });
      const cy = 9.2;
      circle(0, cy, 3.6, { fill: '#E2A93B', ...O(k, .7) }); circle(0, cy, 2.8, { fill: '#FFFDF6', stroke: null });
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; circle(Math.cos(a) * 2.25, cy + Math.sin(a) * 2.25, .16, { fill: C.ink, stroke: null }); }
      const ha = t * .02, ma = t * .9; line([[0, cy], [Math.sin(ha) * 1.4, cy - Math.cos(ha) * 1.4]], { stroke: C.ink, lwPx: lw(k, .45) }); line([[0, cy], [Math.sin(ma) * 2.1, cy - Math.cos(ma) * 2.1]], { stroke: '#C3222F', lwPx: lw(k, .35) });
      shape([[-1.2, 12.4], [1.2, 12.4], [1.2, 17], [-1.2, 17]], { fill: '#6A4129', ...O(k, .5) });
      for (let i = 0; i < 3; i++) shape(ellPts(-1.6 + i * 1.6, 15 + (i % 2), 1.4, .9, 8), { fill: i % 2 ? C.kale : C.kaleLt, ...O(k, .3) });   // a bit of kale still stuck to it
      shape([[-1.6, cy - 2], [-.6, cy - 2.6], [-1, cy - 1.4]], { fill: 'rgba(255,255,255,.75)', stroke: null });
    });
    if (ring > .05) for (let i = 0; i < 3; i++) { const a = -2.2 + i * .45, r = (6 + i * 3.4) * k; line([[x + Math.cos(a) * r, y + 9 * k + Math.sin(a) * r], [x + Math.cos(a) * (r + 3 * k), y + 9 * k + Math.sin(a) * (r + 3 * k)]], { stroke: rgba('#FFE066', ring), lwPx: lw(k, .9) });
      line([[x - Math.cos(a) * r, y + 9 * k + Math.sin(a) * r], [x - Math.cos(a) * (r + 3 * k), y + 9 * k + Math.sin(a) * (r + 3 * k)]], { stroke: rgba('#FFE066', ring), lwPx: lw(k, .9) }); }
  }
  function flame(x0, y0, x1, y1, k, t, a) {
    if (a < .02) return;
    const d = Math.hypot(x1 - x0, y1 - y0), ang = Math.atan2(y1 - y0, x1 - x0);
    X.save(); X.translate(x0, y0); X.rotate(ang); X.globalAlpha *= clamp(a * 1.4);
    for (const [col, wk] of [[C.flame, 1], [C.flameLt, .62], [C.flameXl, .3]]) {
      const pts = [[0, 0]]; for (let i = 0; i <= 10; i++) { const u = i / 10, w = (2 + u * 12) * k * wk * (1 + .18 * Math.sin(t * 30 + i * 2)); pts.push([u * d * a, -w]); }
      for (let i = 10; i >= 0; i--) { const u = i / 10, w = (2 + u * 12) * k * wk * (1 + .18 * Math.sin(t * 27 + i * 3)); pts.push([u * d * a, w]); }
      shape(pts, { fill: col, stroke: col === C.flame ? C.ink : null, lwPx: lw(k, .5), smooth: .5 });
    }
    for (let i = 0; i < 6; i++) { const u = frac(t * 2.2 + i / 6); circle(u * d * a, Math.sin(i * 2.4 + t * 9) * 10 * k * u, (1 + 2 * (1 - u)) * k, { fill: C.flameLt, stroke: null }); }
    X.restore();
  }
  function mist(x, y, k, t, a, w = 30) {                                   // cold puffs that roll out and sink
    if (a < .02) return;
    for (let i = 0; i < 9; i++) { const u = frac(t * .45 + hash(i * 2.3)), dx = (hash(i) - .5) * w * k + Math.sin(t + i) * 4 * k + (hash(i + 4) - .5) * u * 30 * k, dy = -u * 6 * k + u * u * 10 * k;
      ellipse(x + dx, y + dy, (5 + u * 9) * k, (3 + u * 4) * k, { fill: rgba('#EAF8FF', a * .5 * Math.sin(Math.PI * u)), stroke: null }); }
  }
  function napkinLump(x, y, k) {
    shape([[-10, 0], [-9, -4], [-4, -7.5], [3, -7], [8.5, -4.5], [10, 0], [4, 1.2], [-4, 1.2]].map(([a, b]) => [x + a * k, y + b * k]), { fill: C.napkin, ...O(k, .7), smooth: .5 });
    line([[x - 6 * k, y - 4 * k], [x - 1 * k, y - 6 * k], [x + 5 * k, y - 4.5 * k]], { stroke: C.napkinLt, lwPx: lw(k, .7), smooth: true });
    line([[x + 7 * k, y - 2 * k], [x + 9.5 * k, y + .5 * k]], { stroke: '#8C2A1C', lwPx: lw(k, .6) });
  }
  function pieWedge(s, eaten) {                                            // on a plate, TKY local units (y down)
    const g = 1 - clamp(eaten) * .8; if (g < .12) return;
    X.save(); X.translate(-.5, -3.6); X.scale(g, g);
    shape([[-7, 1], [6.5, 1], [6.5, -1.4], [-7, -1.4]], { fill: C.pieDk, stroke: C.ink, lwPx: clamp(s * .3, .8, 3), smooth: .1 });
    shape([[-7, -1.4], [6.5, -1.4], [5.5, -3.2], [-6, -3.4]], { fill: linGrad(0, -3, 0, -1, [[0, C.pieLt], [1, C.pie]]), stroke: C.ink, lwPx: clamp(s * .3, .8, 3) });
    shape([[6.5, 1], [8.5, .4], [8.5, -1.8], [6.5, -1.4]], { fill: C.crust, stroke: C.ink, lwPx: clamp(s * .3, .8, 3) });
    shape([[-2.4, -3], [-2.2, -4.4], [-.8, -5.2], [-.2, -6.6], [.6, -5.2], [2, -4.6], [2.4, -3]], { fill: C.cream, stroke: C.ink, lwPx: clamp(s * .25, .7, 2.4), smooth: .5 });
    X.restore();
  }
  function piePlate(x, y, s, t, o = {}) {
    const A = TKY.plate(x, y, s, { t });
    X.save(); X.translate(x, y); X.scale(s, s); pieWedge(s, o.eaten || 0);
    if ((o.eaten || 0) > .3) for (let i = 0; i < 5; i++) circle(-6 + hash(i * 3 + 1) * 12, -3 + hash(i * 7) * 1.4, .35, { fill: i % 2 ? C.crust : C.pie, stroke: null });
    X.restore();
    return A;
  }
  function plateStack(x, y, s, n, t) {
    for (let i = 0; i < n; i++) { const wob = Math.sin(t * 2.2 + i * .7) * .25 * i / Math.max(1, n); TKY.plate(x + wob * s, y - i * 2.1 * s, s, { slice: i === n - 1, t }); }
  }

  // ---------- gags and effects ----------
  function formula(x, y, size, k) {                                         // chalk, appearing left to right (k 0..1)
    if (k <= 0) return;
    const txt = '4 h × 350° = 1 h × 1400°';
    overlay(() => {
      X.save(); X.translate(x, y); X.rotate(-.03 + .02 * Math.sin(T * 1.3));
      X.font = `700 ${size}px ${FONT_TALK}`; X.textAlign = 'left'; X.textBaseline = 'middle';
      const wFull = X.measureText(txt).width, n = Math.floor(txt.length * clamp(k * 1.25));
      X.globalAlpha = clamp(k * 4) * (k > .97 ? 1 : 1);
      X.shadowColor = 'rgba(127,227,255,.9)'; X.shadowBlur = size * .5;
      X.lineWidth = size * .14; X.strokeStyle = 'rgba(35,67,58,.85)'; X.lineJoin = 'round';
      const s = txt.slice(0, n); X.strokeText(s, -wFull / 2, 0); X.fillStyle = '#FFFDF4'; X.fillText(s, -wFull / 2, 0);
      if (k > .8) { X.shadowBlur = 0; const u = ease(seg(k, .8, 1)); line([[-wFull / 2 - 10, size * .7], [-wFull / 2 - 10 + (wFull + 20) * u, size * .7]], { stroke: '#FFD66B', lwPx: size * .1 }); }
      X.restore();
    });
  }
  function chefHat(x, y, sz, tilt, col = '#FFFFFF') {                      // a tall toque: (x, y) = the band's bottom centre, sz = band width px
    X.save(); X.translate(x, y); X.rotate(tilt); X.scale(sz / 20, sz / 20);
    shape([[-10, 0], [10, 0], [10, -9], [-10, -9]], { fill: col, stroke: C.ink, lwPx: 2.6, smooth: .1 });
    const puff = [[-10, -9], [-15, -16], [-14, -28], [-8, -36], [-3, -33], [0, -40], [5, -35], [9, -37], [15, -28], [16, -17], [10, -9]];
    shape(puff, { fill: col, stroke: C.ink, lwPx: 2.6, smooth: .7 });
    for (const xx of [-5, 0, 5]) line([[xx, -10], [xx * 1.3, -26]], { stroke: '#E3DCD2', lwPx: 1.6 });
    line([[-10, -3], [10, -3]], { stroke: '#E3DCD2', lwPx: 1.4 });
    X.restore();
  }
  function thought(x, y, w, k, t) {                                         // a cloud with two tall chef's hats and a neon sign
    if (k <= 0) return;
    overlay(() => {
      X.save(); X.translate(x, y); const g = backOut(clamp(k)); X.scale(g, g);
      const h = w * .52, puffs = 14;
      for (let pass = 0; pass < 2; pass++) for (let i = 0; i < puffs; i++) { const a = i / puffs * TAU, r = w * .085 * (1 + .25 * hash(i));
        ellipse(Math.cos(a) * w * .44, Math.sin(a) * h * .44, r * 1.6, r * 1.3, pass ? { fill: '#FFFDF8', stroke: null } : { fill: '#FFFDF8', stroke: C.ink, lwPx: 6 }); }
      ellipse(0, 0, w * .46, h * .44, { fill: '#FFFDF8', stroke: null });
      // the dream: a TV-studio glow, two toques side by side, the sign
      ellipse(0, h * .02, w * .34, h * .3, { fill: radGrad(0, 0, 0, w * .36, [[0, 'rgba(255,214,107,.55)'], [1, 'rgba(255,214,107,0)']]), stroke: null });
      for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t * .6; shape(starPts(Math.cos(a) * w * .3, Math.sin(a) * h * .26, 9, 3, 4), { fill: '#FFD66B', stroke: null, alpha: .5 + .5 * Math.sin(t * 5 + i) }); }
      chefHat(-w * .1, h * .02, w * .13, -.12 + .05 * Math.sin(t * 3)); chefHat(w * .1, h * .02, w * .13, .12 - .05 * Math.sin(t * 3 + 1));
      const flick = (Math.sin(t * 23) > -.85 || t % 2 > .3) ? 1 : .35;
      X.font = `${Math.round(w * .085)}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle';
      X.shadowColor = C.neon; X.shadowBlur = 24 * flick; X.lineWidth = 6; X.strokeStyle = '#7A1E52'; X.strokeText('TURKEY TAKEOVER', 0, h * .2);
      X.fillStyle = flick > .5 ? '#FFD1EC' : '#E89ABF'; X.fillText('TURKEY TAKEOVER', 0, h * .2);
      X.shadowColor = C.neonB; X.shadowBlur = 16 * flick; X.strokeStyle = C.neonB; X.lineWidth = 3;
      shape(rectPts(-w * .36, h * .2 - w * .065, w * .72, w * .13), { fill: null, stroke: C.neonB, lwPx: 3, smooth: .2 });
      X.restore();
    });
  }
  function queasy(x, y, size, t, a) {
    if (a < .02) return;
    for (let j = 0; j < 3; j++) { const pts = []; for (let i = 0; i <= 8; i++) pts.push([x - size + i * size / 4, y - j * size * .45 + Math.sin(t * 7 + i * 1.4 + j) * size * .09]);
      line(pts, { stroke: rgba('#3C8A2E', a * .85), lwPx: Math.max(2, size * .07), smooth: true }); }
  }
  function frost(x, y, w, a) {
    if (a < .02) return;
    for (let i = 0; i < 5; i++) { const xx = x - w / 2 + (i + .5) * w / 5, l = w * (.1 + .08 * hash(i * 3)) * a;
      shape([[xx - w * .03, y], [xx + w * .03, y], [xx, y + l]], { fill: rgba('#E8F7FD', .95), stroke: rgba('#5A9CC0', .9), lwPx: 2 }); }
    line([[x - w / 2, y], [x + w / 2, y]], { stroke: rgba('#E8F7FD', .9 * a), lwPx: Math.max(3, w * .04), cap: 'round' });
    for (let i = 0; i < 4; i++) shape(starPts(x - w * .4 + i * w * .27, y - w * .18 - (i % 2) * w * .1, w * .05 * a, w * .015 * a, 6), { fill: '#FFFFFF', stroke: null });
  }
  function hearts(x, y, size, t, a, seed = 0) {
    if (a < .02) return;
    for (let i = 0; i < 4; i++) { const u = frac(t * .6 + i / 4 + seed * .13), hx = x + Math.sin(u * 6 + i + seed) * size * .6, hy = y - u * size * 3, r = size * .22 * (1 - u * .4);
      shape([[hx, hy + r], [hx - r * 1.1, hy - r * .1], [hx - r * .9, hy - r * .8], [hx - r * .35, hy - r * .9], [hx, hy - r * .45], [hx + r * .35, hy - r * .9], [hx + r * .9, hy - r * .8], [hx + r * 1.1, hy - r * .1]],
        { fill: C.heart, stroke: C.ink, lwPx: Math.max(1.5, size * .04), smooth: .5, alpha: a * Math.sin(Math.PI * u) }); }
  }
  function confetti(t, a) {
    if (a < .02) return;
    overlay(() => { for (let i = 0; i < 46; i++) { const u = frac(t * (.16 + hash(i) * .12) + hash(i * 2.7)), x = hash(i * 1.3) * W + Math.sin(t * 1.4 + i) * 60, y = -40 + u * (H + 80), r = 10 + hash(i * 5) * 12;
      X.save(); X.globalAlpha = a; X.translate(x, y); X.rotate(t * (1 + hash(i)) * 2 + i);
      if (i % 3) shape([[0, -r], [r * .55, -r * .2], [r * .3, r * .6], [0, r], [-r * .3, r * .6], [-r * .55, -r * .2]], { fill: C.leaf[i % 4], stroke: C.ink, lwPx: 1.6, smooth: .3 });
      else shape(starPts(0, 0, r * .7, r * .25, 4), { fill: '#FFE066', stroke: null });
      X.restore(); } });
  }
  function title(t, a, b) {
    const c = backOut(seg(t, a, a + .5)) * (1 - easeIn(seg(t, b - .4, b))); if (c <= 0) return;
    overlay(() => {
      X.save(); X.translate(W / 2, 170); X.rotate(-.02); X.scale(c, c);
      shape(rectPts(-520, -92, 1040, 184), { fill: C.paper, stroke: C.ink, lwPx: 8, smooth: .12 });
      shape(rectPts(-500, -74, 1000, 148), { fill: null, stroke: C.orange, lwPx: 4, smooth: .12, dash: [14, 10] });
      X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
      X.font = `34px ${FONT_SFX}`; X.fillStyle = '#A8501E'; X.fillText('FALL FESTIVAL · PART 4', 0, -40);
      X.font = `86px ${FONT_SFX}`; X.lineWidth = 12; X.strokeStyle = C.ink; X.strokeText('THE THANKSGIVING FEAST', 0, 22); X.fillStyle = C.orange; X.fillText('THE THANKSGIVING FEAST', 0, 22);
      X.restore();
      for (const [lx, ly, r, i] of [[W / 2 - 560, 110, 30, 0], [W / 2 + 560, 230, 26, 1], [W / 2 - 540, 240, 22, 2], [W / 2 + 545, 105, 20, 3]]) {
        X.save(); X.translate(lx, ly); X.rotate(Math.sin(t * 2 + i) * .3); X.scale(c, c);
        shape([[0, -r], [r * .55, -r * .2], [r * .3, r * .6], [0, r], [-r * .3, r * .6], [-r * .55, -r * .2]], { fill: C.leaf[i], stroke: C.ink, lwPx: 3, smooth: .3 }); X.restore(); }
    });
  }
  function tbc(c) {
    if (c <= 0) return;
    overlay(() => {
      X.save(); X.translate(W - 420, H - 125); X.rotate(-.05); X.scale(c * .78, c * .78);
      shape(rectPts(-470, -95, 940, 190), { fill: C.paper, stroke: C.ink, lwPx: 8, smooth: .1 });
      X.font = `92px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
      X.lineWidth = 14; X.strokeStyle = C.ink; X.strokeText('TO BE CONTINUED...', 0, 8); X.fillStyle = C.orange; X.fillText('TO BE CONTINUED...', 0, 8);
      X.restore();
    });
  }

  return { C, knife, carvFork, fork, drumstick, slice, watch, flame, mist, napkinLump, piePlate, plateStack, formula, chefHat, thought, queasy, frost, hearts, confetti, title, tbc };
})();
