// locations/family_kitchen/turkey.js: the Thanksgiving turkey prop kit (global namespace TKY; see README.md → Turkey kit).
//
// Everything here draws in SCREEN space and is a pure function of its arguments (animated bits use o.t, hash(), never
// Math.random). (x, y) is the point where the prop rests (its bottom centre), s is px per local unit (scale with P.k(Z):
// s = P.k(Z) × TKY.WORLD; TKY.WORLD = 1.25 world units per local unit makes the golden bird ~50 × 33 world units, a big
// 20 lb turkey next to a 170-unit person).
// Local axes: x right, y DOWN (negative is up), origin at the rest point. Every function returns screen-px anchors.
//
//   TKY.turkey(x, y, s, o)        the bird, ~40 × 26 local units. o.state: 'frozen' | 'raw' | 'burnt' | 'fixed' | 'carved' | 'golden'
//   TKY.platter(x, y, s, o)       an oval silver platter, 60 × 9 (o.garnish: a ring of parsley and cranberries)
//   TKY.cloche(x, y, s, o)        a silver dome with a knob, 50 × 34 (o.lift 0..1 raises and tips it)
//   TKY.pan(x, y, s, o)           a roasting pan, 54 × 14
//   TKY.stuffingBowl(x, y, s, o)  green "healthy stuffing" (kale, broccoli, quinoa) in a bowl, 26 × 14
//   TKY.pie(x, y, s, o)           a pumpkin pie with whipped cream, 30 × 9 (o.slices 0..8 left)
//   TKY.plate(x, y, s, o)         a dinner plate, 28 × 5 (o.slice: a grim slice of the carved turkey, o.eaten 0..1)
//   TKY.SIZE                      the local sizes above, { turkey: [40, 26], … }

const TKY = (() => {
  const C = {
    ink: PAL.ink, white: '#FFFDF8', cream: '#FFF4DC',
    gold: '#D9892F', goldLt: '#F2B04E', goldXl: '#FFD98A', goldDk: '#A85A1E', goldXd: '#7A3E14',
    raw: '#F6C7B8', rawLt: '#FCE0D6', rawDk: '#E3A08F',
    ice: '#BFE3F2', iceLt: '#E8F7FD', iceDk: '#86C2DD', iceXd: '#5A9CC0', frostPink: '#E4D6E6',
    char: '#211B1E', charLt: '#3E3236', charGrey: '#5A4C50', ember: '#FF7A2A', emberLt: '#FFC24A',
    glaze: '#C8681C', glazeLt: '#E98A2E', glazeDk: '#9C4A14',
    parsley: '#4E9A3A', parsleyDk: '#2F6E26', parsleyLt: '#7CC25A', cran: '#C2243A', cranDk: '#8C1528', orange: '#F28C28', orangeLt: '#FFC266',
    kale: '#2F6E3A', kaleLt: '#4E9A4A', broc: '#6DB34A', brocDk: '#4E8A34', quinoa: '#E9D6A6', quinoaDk: '#C9AE78',
    silver: '#C9D2DA', silverLt: '#EEF3F7', silverDk: '#8D99A5', silverXd: '#65707C',
    band: '#E8BE96', bandPad: '#F7EDE0', wood: '#E3C08A', red: '#D9452F', redDk: '#A8301F', label: '#F08A2C',
    pan: '#2F4A6B', panLt: '#4F6E92', panDk: '#1E3048', pie: '#D9792A', pieDk: '#B65E1C', crust: '#E8B46A', crustDk: '#C08A44',
    plate: '#FBF7EE', plateDk: '#E4DCCB',
  };
  const SIZE = { turkey: [40, 26], platter: [60, 9], cloche: [50, 34], pan: [54, 14], stuffingBowl: [26, 14], pie: [30, 9], plate: [28, 5] };
  const LW = s => clamp(s * .32, .9, 4);
  const O = (s, k = 1) => ({ stroke: C.ink, lwPx: LW(s) * k });
  // A local→screen mapper for anchors: (x, y) rest point, s scale, rot, squash (sx, sy).
  const mapper = (x, y, s, rot, sx, sy) => (lx, ly) => { const a = lx * sx * s, b = ly * sy * s, c = Math.cos(rot), d = Math.sin(rot); return [x + a * c - b * d, y + a * d + b * c]; };
  function begin(x, y, s, o) {
    const sq = o.squash || 0, sx = 1 / Math.sqrt(1 + sq), sy = 1 + sq;
    X.save(); if (o.alpha != null) X.globalAlpha *= clamp(o.alpha); X.translate(x, y); X.rotate(o.rot || 0); X.scale(s * sx, s * sy);
    return mapper(x, y, s, o.rot || 0, sx, sy);
  }
  const end = () => X.restore();
  function txt(s, x, y, size, col, o = {}) { X.save(); X.font = `${o.weight ?? 800} ${size}px ${o.font ?? FONT_TALK}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = col; X.fillText(s, x, y); X.restore(); }
  function glow(x, y, r, col, a) { if (a < .01) return; X.save(); X.globalCompositeOperation = 'lighter'; ellipse(x, y, r, r, { fill: radGrad(x, y, 0, r, [[0, rgba(col, a)], [1, rgba(col, 0)]]), stroke: null }); X.restore(); }
  const twinkle = (t, i) => clamp(.5 + .5 * Math.sin(t * 3.1 + i * 2.3) * Math.sin(t * 1.7 + i));
  function sparkle(cx, cy, r, s, col = '#FFFFFF') { shape(starPts(cx, cy, r, .22, 4), { fill: col, stroke: null }); }
  function crystal(cx, cy, r, s) { for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3; line([[cx - Math.cos(a) * r, cy - Math.sin(a) * r], [cx + Math.cos(a) * r, cy + Math.sin(a) * r]], { stroke: '#FFFFFF', lwPx: Math.max(.8, LW(s) * .6) }); } circle(cx, cy, r * .25, { fill: '#FFFFFF', stroke: null }); }

  // ---------- the bird's shapes (local units, origin at the bottom centre) ----------
  const BODY = [[-17, -1.5], [-19.5, -8], [-17.5, -15.5], [-11, -21.5], [0, -23.5], [11, -21.5], [17.5, -15.5], [19.5, -8], [17, -1.5], [8, .3], [-8, .3]];
  const thigh = sd => [[sd * 7.5, -2], [sd * 14, -1], [sd * 18.5, -5], [sd * 19.5, -11], [sd * 18, -15.5], [sd * 14.5, -15], [sd * 10, -11], [sd * 7.5, -6.5]];
  const TIP = sd => [sd * 21.5, -21];                                                   // the bone tip, where the frill goes
  function lumpy(pts, amt, seed) { return pts.map(([a, b], i) => [a + (hash(i * 3.7 + seed) - .5) * amt, b + (hash(i * 5.3 + seed) - .5) * amt]); }
  function drumstick(sd, s, fill, o = {}) {
    const [tx, ty] = TIP(sd), bone = o.bone || '#F4EBDD';
    line([[sd * 16.5, -14.5], [tx, ty]], { stroke: C.ink, lwPx: LW(s) * 2.6 + 2.2 * s * .5 }); line([[sd * 16.5, -14.5], [tx, ty]], { stroke: bone, lwPx: 2.2 * s * .5 });
    for (const [dx, dy] of [[-.9, .5], [.9, -.6]]) circle(tx + sd * dx * .6 + dx * .3, ty + dy, 1.25, { fill: bone, ...O(s, .7) });
    shape(thigh(sd), { fill, ...O(s), smooth: true });
    if (o.shine !== false) shape([[sd * 15, -12.5], [sd * 17.5, -10], [sd * 17, -6.5], [sd * 16, -9.5]], { fill: o.shineCol || 'rgba(255,255,255,.45)', stroke: null, smooth: true });
  }
  function frill(sd, s, col = '#FFFFFF') {
    const [tx, ty] = TIP(sd), pts = [];
    for (let i = 0; i <= 10; i++) { const a = -Math.PI * .5 + (i / 10 - .5) * 2.4 + (sd < 0 ? -.75 : .75), r = i % 2 ? 1.6 : 3.1; pts.push([tx + Math.cos(a) * r, ty + Math.sin(a) * r]); }
    shape(pts, { fill: col, ...O(s, .7) });
    circle(tx, ty, 1.1, { fill: col, ...O(s, .5) });
  }
  function wings(s, fill) { for (const sd of [-1, 1]) shape([[sd * 15, -18], [sd * 20.5, -16], [sd * 21.5, -10], [sd * 17, -8]], { fill, ...O(s), smooth: true }); }
  function bodyGrad(top, mid, bot) { return linGrad(0, -23.5, 0, 0, [[0, top], [.55, mid], [1, bot]]); }
  function steamCurls(t, k, s, y0 = -24, spread = 12) {
    if (k < .01) return;
    for (let i = 0; i < 4; i++) { const u = frac(t * .45 + i * .25), a = k * Math.sin(Math.PI * u) * .85, x0 = (i - 1.5) * spread / 1.5, pts = [];
      for (let j = 0; j <= 8; j++) { const v = j / 8; pts.push([x0 + Math.sin(v * 5 + t * 2 + i) * 2.2 * (.4 + v), y0 - u * 14 - v * 10]); }
      line(pts, { stroke: rgba('#FFFFFF', a), lwPx: Math.max(1.5, s * .9), smooth: true }); }
  }
  function smokeCurls(t, k, s, y0 = -14, spread = 8) {
    if (k < .01) return;
    for (let i = 0; i < 6; i++) { const u = frac(t * .3 + hash(i) ), x0 = (hash(i + 3) - .5) * spread * 2, pts = [];
      for (let j = 0; j <= 10; j++) { const v = j / 10; pts.push([x0 + Math.sin(v * 6 + t * 1.6 + i) * 3 * (.3 + v + u), y0 - u * 22 - v * 16]); }
      line(pts, { stroke: rgba('#4A4248', k * .75 * Math.sin(Math.PI * u)), lwPx: Math.max(2, s * (1.4 + u * 1.6)), smooth: true });
      line(pts, { stroke: rgba('#8A8288', k * .45 * Math.sin(Math.PI * u)), lwPx: Math.max(1, s * (.6 + u * .8)), smooth: true }); }
  }
  function mist(t, k, s, w = 20) {                                                         // cold mist rolling off and sinking
    if (k < .01) return;
    for (let i = 0; i < 8; i++) { const u = frac(t * .25 + hash(i * 2.2)), sd = i % 2 ? 1 : -1, cx = sd * (w * .5 + u * 9) + (hash(i) - .5) * w, cy = -2 + u * 4;
      ellipse(cx, cy, 4 + u * 6, 1.6 + u * 1.8, { fill: rgba('#EAF8FF', k * .55 * Math.sin(Math.PI * u)), stroke: null }); }
  }
  function garnish(s, t, cx, cy, w, h, wear = 0, seed = 0) {                               // a heap of parsley, cranberries and orange slices
    const slide = wear * 6;
    for (let i = 0; i < Math.round(w * 1.1); i++) { const gx = cx + (hash(i + seed) - .5) * w, gy = cy + (hash(i * 1.7 + seed) - .5) * h + slide * hash(i + 9);
      for (let j = 0; j < 4; j++) circle(gx + Math.cos(j * 1.6 + i) * 1.3, gy + Math.sin(j * 1.6 + i) * 1, 1.5, { fill: [C.parsley, C.parsleyLt, C.parsleyDk, C.parsley][j], stroke: j ? null : C.parsleyDk, lwPx: LW(s) * .4 }); }
    for (let i = 0; i < Math.round(w * .35); i++) { const ox = cx + (hash(i * 4.1 + seed) - .5) * w * .9, oy = cy + (hash(i * 2.9 + seed) - .5) * h + slide * hash(i * 3 + 2);
      circle(ox, oy, 2.2, { fill: C.orangeLt, ...O(s, .5) }); circle(ox, oy, 1.6, { fill: C.orange, stroke: null }); for (let k = 0; k < 4; k++) line([[ox, oy], [ox + Math.cos(k * .8) * 1.6, oy + Math.sin(k * .8) * 1.6]], { stroke: C.orangeLt, lwPx: LW(s) * .3 }); }
    for (let i = 0; i < Math.round(w * .6); i++) { const bx = cx + (hash(i * 7.3 + seed) - .5) * w, by = cy + (hash(i * 5.1 + seed) - .5) * h + slide * (.5 + hash(i));
      circle(bx, by, .95, { fill: C.cran, stroke: C.cranDk, lwPx: LW(s) * .3 }); circle(bx - .3, by - .3, .3, { fill: 'rgba(255,255,255,.7)', stroke: null }); }
  }
  function cracks(s, list, col, w = .6) { list.forEach(pts => line(pts, { stroke: col, lwPx: Math.max(.8, LW(s) * w) })); }
  const CRACKS = [[[-12, -18], [-9, -15], [-10, -12], [-6, -9]], [[4, -21], [6, -17], [3, -14], [7, -11], [5, -7]], [[-15, -8], [-11, -6], [-12, -3]], [[12, -16], [15, -13], [13, -10]], [[-3, -6], [0, -3], [-2, -1]]];
  function embers(t, s, n, spread, seed = 0) {
    for (let i = 0; i < n; i++) { const ex = (hash(i * 3.3 + seed) - .5) * spread[0], ey = -2 - hash(i * 1.9 + seed) * spread[1], f = twinkle(t * 1.3, i + seed);
      glow(ex, ey, 2.2, C.ember, .5 * f); circle(ex, ey, .5 + .3 * f, { fill: mixCol(C.ember, C.emberLt, f), stroke: null }); }
  }
  function bandAid(cx, cy, ang, s) {
    X.save(); X.translate(cx, cy); X.rotate(ang);
    shape(rectPts(-5, -1.5, 10, 3), { fill: C.band, ...O(s, .6), smooth: .5 }); shape(rectPts(-1.7, -1.3, 3.4, 2.6), { fill: C.bandPad, stroke: null });
    for (const sx of [-3.6, -2.6, 2.6, 3.6]) for (const sy of [-.6, .6]) circle(sx, sy, .22, { fill: '#C9997A', stroke: null });
    X.restore();
  }
  function toothpick(x0, y0, x1, y1, s) { line([[x0, y0], [x1, y1]], { stroke: C.ink, lwPx: Math.max(1.6, s * .55) }); line([[x0, y0], [x1, y1]], { stroke: C.wood, lwPx: Math.max(1, s * .35) }); }

  // ---------- the turkey ----------
  function turkey(x, y, s, o = {}) {
    const st = o.state || 'golden', t = o.t ?? 0;
    const scale = st === 'burnt' ? .6 : st === 'fixed' ? .66 : st === 'carved' ? .8 : 1;
    const wobble = st === 'raw' ? (o.wobble ?? .5) * .05 * Math.sin(t * 9) : 0;
    const M = begin(x, y, s, { ...o, squash: (o.squash || 0) + wobble });
    const ss = s * scale;                                                                // px per unit inside the shrunken bird
    X.save(); X.scale(scale, scale);
    const A = {};
    if (st === 'frozen') drawFrozen(ss, t, o);
    else if (st === 'raw') drawRaw(ss, t, o);
    else if (st === 'burnt') drawBurnt(ss, t, o);
    else if (st === 'fixed') drawFixed(ss, t, o);
    else if (st === 'carved') drawCarved(ss, t, o);
    else drawGolden(ss, t, o);
    X.restore();
    end();
    const L = (lx, ly) => M(lx * scale, ly * scale);
    Object.assign(A, { top: L(0, -23.5), centre: L(0, -11), center: L(0, -11), cavity: L(0, st === 'carved' ? -9 : -12), drumstickL: L(...TIP(-1)), drumstickR: L(...TIP(1)), base: [x, y],
      width: 40 * scale * s, height: 26 * scale * s, scale });
    if (st === 'fixed' && o.drumstickOff) A.drumstickR = L(27, -3);
    if (st === 'carved') { A.watch = L(9, 1.5); A.iceCore = L(0, -10); A.stuffing = L(-4, 1); }
    if (st === 'frozen' && o.wrap !== false) { A.label = L(-2, -12); A.rosette = L(11, -16); A.knot = L(0, -27); }
    return A;
  }
  function drawGolden(s, t, o) {
    wings(s, C.goldDk);
    shape(BODY, { fill: bodyGrad(C.goldXl, C.goldLt, C.goldDk), ...O(s), smooth: true });
    shape([[-17, -4], [-8, -1], [8, -1], [17, -4], [17, -1.5], [8, .3], [-8, .3], [-17, -1.5]], { fill: rgba(C.goldXd, .45), stroke: null, smooth: true });
    for (let i = 0; i < 14; i++) { const a = (hash(i * 2.1) - .5) * 30, b = -4 - hash(i * 3.7) * 16; ellipse(a, b, 1.2, .5, { fill: rgba(C.goldDk, .35), stroke: null, rot: hash(i) * 3 }); }   // crispy skin
    shape([[-9, -19], [-3, -21.5], [2, -20.5], [-5, -17.5], [-9, -15]], { fill: 'rgba(255,255,255,.55)', stroke: null, smooth: true });   // juicy highlights
    shape([[6, -18], [9, -18.5], [7.5, -16]], { fill: 'rgba(255,255,255,.5)', stroke: null, smooth: true });
    for (const sd of [-1, 1]) drumstick(sd, s, linGrad(0, -16, 0, 0, [[0, C.goldLt], [1, C.goldDk]]));
    for (const sd of [-1, 1]) frill(sd, s);
    for (let i = 0; i < 5; i++) { const dx = (hash(i * 9.1) - .5) * 26, dy = -6 - hash(i * 4.4) * 14; ellipse(dx, dy, .7, 1.1, { fill: 'rgba(255,240,200,.8)', stroke: null }); }   // glistening drops
    const sp = clamp(o.sparkle ?? 0);
    if (sp > .01) for (let i = 0; i < 7; i++) { const f = twinkle(t, i) * sp, a = i / 7 * TAU + .4, r = 22 + hash(i) * 6;
      X.save(); X.globalAlpha *= f; sparkle(Math.cos(a) * r, -12 + Math.sin(a) * r * .75, 1.6 + f * 1.8, s, i % 2 ? '#FFF3B0' : '#FFFFFF'); X.restore(); glow(Math.cos(a) * r, -12 + Math.sin(a) * r * .75, 2.6, '#FFE08A', .25 * f); }
    steamCurls(t, clamp(o.steam ?? .6), s);
  }
  function drawRaw(s, t, o) {
    wings(s, C.rawDk);
    shape(BODY, { fill: bodyGrad(C.rawLt, C.raw, C.rawDk), ...O(s), smooth: true });
    for (let i = 0; i < 40; i++) { const a = (hash(i * 1.3) - .5) * 32, b = -3 - hash(i * 2.9) * 18; circle(a, b, .35, { fill: rgba(C.rawDk, .8), stroke: null }); }   // goosebumps
    shape([[-8, -19], [-3, -21], [0, -19.5], [-6, -16.5]], { fill: 'rgba(255,255,255,.55)', stroke: null, smooth: true });
    line([[-1, -21], [0, -14], [-.5, -6]], { stroke: rgba(C.rawDk, .9), lwPx: LW(s) * .5, smooth: true });                    // the breastbone crease
    for (const sd of [-1, 1]) drumstick(sd, s, C.raw, { bone: C.rawLt });
    for (const sd of [-1, 1]) circle(TIP(sd)[0], TIP(sd)[1], 1.6, { fill: C.rawLt, ...O(s, .6) });
    const fr = clamp(o.frost ?? 0); if (fr > .01) for (let i = 0; i < 8; i++) { X.save(); X.globalAlpha *= fr; crystal((hash(i * 2.5) - .5) * 28, -4 - hash(i * 3.9) * 16, 1.3, s); X.restore(); }
    steamCurls(t, clamp(o.steam ?? 0), s);
  }
  function drawFrozen(s, t, o) {
    const wrap = o.wrap !== false, fr = clamp(o.frost ?? 1);
    if (!wrap) {                                                                           // unwrapped but still frozen solid: pale blue-pink, icicles
      wings(s, mixCol(C.frostPink, C.iceDk, .4));
      shape(BODY, { fill: bodyGrad('#F2EEF8', C.frostPink, mixCol(C.iceDk, C.frostPink, .4)), ...O(s), smooth: true });
      for (let i = 0; i < 12; i++) { const a = (hash(i * 1.9) - .5) * 30, b = -4 - hash(i * 2.3) * 17; ellipse(a, b, 3 + hash(i) * 2, 1.4, { fill: rgba('#FFFFFF', .55), stroke: null, rot: hash(i + 4) * 3 }); }
      for (const sd of [-1, 1]) drumstick(sd, s, mixCol(C.frostPink, C.ice, .35), { bone: C.iceLt });
      for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { const ix = sd * (18.3 + k * .9), iy = -10.5 + k * 2.2; shape([[ix - .8, iy], [ix + .8, iy], [ix + sd * .3, iy + 2.2 + hash(k + sd) * 1.6]], { fill: C.iceLt, ...O(s, .5) }); }   // icicles off the wings
      for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { const ix = sd * (12 + k * 2.4), iy = -1.6 - k * .6; shape([[ix - .7, iy], [ix + .7, iy], [ix, iy + 1.4]], { fill: C.iceLt, ...O(s, .5) }); }   // and the drumsticks
      for (const sd of [-1, 1]) { const [tx, ty] = TIP(sd); shape([[tx - .8, ty + 1], [tx + .8, ty + 1], [tx, ty + 4]], { fill: C.iceLt, ...O(s, .5) }); }
      for (let i = 0; i < 9; i++) { X.save(); X.globalAlpha *= fr * (.6 + .4 * twinkle(t, i)); crystal((hash(i * 2.5) - .5) * 30, -5 - hash(i * 3.9) * 16, 1.4, s); X.restore(); }
      mist(t, fr, s);
      return;
    }
    // a rock-hard bird in shrink-wrap and a white net bag, a label and a GRAND PRIZE rosette
    wings(s, C.iceDk);
    shape(BODY, { fill: bodyGrad(C.iceLt, C.ice, C.iceDk), ...O(s), smooth: true });
    for (const sd of [-1, 1]) drumstick(sd, s, C.ice, { bone: C.iceLt, shineCol: 'rgba(255,255,255,.7)' });
    for (let i = 0; i < 14; i++) { const a = (hash(i * 1.9) - .5) * 32, b = -3 - hash(i * 2.3) * 18; ellipse(a, b, 2.6 + hash(i) * 2.4, 1.1, { fill: rgba('#FFFFFF', .6), stroke: null, rot: hash(i + 4) * 3 }); }   // frost bloom
    const wrapPts = [[-20, 0], [-22, -9], [-20.5, -17], [-14, -23], [-4, -25.5], [-1.6, -27], [1.6, -27], [4, -25.5], [14, -23], [20.5, -17], [22, -9], [20, 0], [8, 1.2], [-8, 1.2]];
    shape(wrapPts, { fill: 'rgba(235,248,255,.32)', stroke: rgba(C.iceXd, .9), lwPx: LW(s) * .8, smooth: true });
    for (const [pts, a] of [[[[-15, -20], [-9, -22], [-12, -18]], .7], [[[13, -19], [17, -15], [15, -20]], .6], [[[-18, -6], [-17, -12], [-16, -5]], .5]]) shape(pts, { fill: rgba('#FFFFFF', a), stroke: null, smooth: true });   // plastic glints
    for (let i = 0; i < 6; i++) line([[-14 + i * 5.5, -23 + Math.abs(i - 2.5) * 1.2], [-12 + i * 5, -18.5 + hash(i) * 2]], { stroke: rgba('#FFFFFF', .55), lwPx: LW(s) * .5 });   // wrinkles
    // the net bag: a diamond mesh clipped to the bird, gathered at a knot on top with a loop
    X.save(); X.beginPath(); tracePath(wrapPts, true, true); X.clip();
    for (let k = -8; k <= 8; k++) { line([[k * 4.2 - 14, 2], [k * 4.2 + 14, -28]], { stroke: rgba('#FFFFFF', .9), lwPx: Math.max(1, LW(s) * .55) }); line([[k * 4.2 + 14, 2], [k * 4.2 - 14, -28]], { stroke: rgba('#FFFFFF', .9), lwPx: Math.max(1, LW(s) * .55) }); }
    X.restore();
    shape([[-1.8, -26.5], [1.8, -26.5], [2.6, -30], [-2.6, -30]], { fill: '#FFFFFF', ...O(s, .6), smooth: .3 });
    shape(ellPts(0, -32.5, 2.2, 2.6), { fill: null, stroke: C.ink, lwPx: LW(s) * 1.4 }); shape(ellPts(0, -32.5, 2.2, 2.6), { fill: null, stroke: '#FFFFFF', lwPx: LW(s) * .7 });
    shape(rectPts(-2.4, -27.6, 4.8, 1.6), { fill: C.red, ...O(s, .5) });              // the clip
    // the label
    X.save(); X.translate(-2, -12); X.rotate(-.06);
    shape(rectPts(-10.5, -4.2, 21, 8.4), { fill: C.label, ...O(s, .8), smooth: .08 }); shape(rectPts(-9.6, -3.4, 19.2, 6.8), { fill: null, stroke: '#FFFFFF', lwPx: LW(s) * .5 });
    txt('FROZEN TURKEY', 0, -1.1, 2.15, '#FFFFFF', { font: FONT_SFX, weight: 400 }); txt('· 20 LB ·', 0, 1.9, 2.3, '#3B2530', { weight: 900 });
    X.restore();
    // the GRAND PRIZE rosette
    X.save(); X.translate(11, -16); X.rotate(.15);
    for (const [sd, c] of [[-1, C.red], [1, C.gold]]) shape([[sd * .8, 1], [sd * 3.8, 9], [sd * 2.4, 8.2], [sd * 1.6, 10], [sd * -.6, 2]], { fill: c, ...O(s, .6) });
    const pl = []; for (let i = 0; i < 24; i++) { const a = i / 24 * TAU, r = i % 2 ? 4.4 : 5.2; pl.push([Math.cos(a) * r, Math.sin(a) * r]); } shape(pl, { fill: C.red, ...O(s, .7) });
    circle(0, 0, 3.6, { fill: C.goldLt, ...O(s, .6) }); circle(0, 0, 3, { fill: null, stroke: C.goldDk, lwPx: LW(s) * .4 });
    txt('GRAND', 0, -.75, 1.35, C.redDk, { weight: 900 }); txt('PRIZE', 0, .85, 1.35, C.redDk, { weight: 900 });
    X.restore();
    for (let i = 0; i < 10; i++) { X.save(); X.globalAlpha *= fr * (.55 + .45 * twinkle(t, i)); crystal((hash(i * 2.5 + 1) - .5) * 34, -3 - hash(i * 3.9 + 1) * 20, 1.2 + hash(i) * .8, s); X.restore(); }
    for (let i = 0; i < 3; i++) { const f = twinkle(t * 1.4, i + 7) * fr; X.save(); X.globalAlpha *= f; sparkle(-14 + i * 13, -22 + (i % 2) * 8, 1.4 + f, s); X.restore(); }
    mist(t, fr, s, 24);
  }
  function drawBurnt(s, t, o) {
    const B = lumpy(BODY, 1.6, 7);
    wings(s, C.char);
    shape(B, { fill: linGrad(0, -23, 0, 0, [[0, C.charLt], [1, C.char]]), ...O(s), smooth: true });
    for (const sd of [-1, 1]) drumstick(sd, s, C.char, { bone: '#3A3034', shine: false });
    for (const sd of [-1, 1]) circle(TIP(sd)[0], TIP(sd)[1], 1.5, { fill: '#2A2226', ...O(s, .6) });
    cracks(s, CRACKS, C.charGrey, .8);
    cracks(s, [[[4, -21], [6, -17], [3, -14]], [[-15, -8], [-11, -6]]], rgba(C.ember, .8 + .2 * twinkle(t, 3)), .45);
    shape([[-8, -19], [-4, -21], [-2, -19.5], [-6, -17]], { fill: 'rgba(160,150,160,.25)', stroke: null, smooth: true });   // a dull ashy sheen
    for (let i = 0; i < 10; i++) circle((hash(i * 6.1) - .5) * 30, -3 - hash(i * 2.7) * 17, .6, { fill: '#6A5C60', stroke: null });   // ash flecks
    embers(t, s, 9, [30, 18]);
    smokeCurls(t, clamp(o.smoke ?? .7), s, -18, 10);
  }
  function drawFixed(s, t, o) {
    const wear = clamp(o.wear || 0), B = lumpy(BODY, 1.6, 7);
    // the burnt bird under a too-shiny painted glaze
    wings(s, mixCol(C.glazeDk, C.char, wear * .7));
    shape(B, { fill: C.char, ...O(s), smooth: true });
    X.save(); X.beginPath(); tracePath(B, true, true); X.clip();
    X.globalAlpha *= 1 - wear * .25;
    shape(B, { fill: linGrad(0, -23, 0, 0, [[0, C.glazeLt], [.6, C.glaze], [1, C.glazeDk]]), stroke: null, smooth: true });
    X.globalAlpha = 1;
    for (let i = 0; i < 9; i++) { const y0 = -21 + i * 2.4, pts = []; for (let j = 0; j <= 6; j++) pts.push([-18 + j * 6, y0 + Math.sin(j * 1.3 + i) * 1.1 + j * .2]);   // visible brush strokes
      line(pts, { stroke: rgba(i % 2 ? C.glazeLt : C.glazeDk, .7), lwPx: Math.max(1, s * .55), smooth: true }); }
    for (let i = 0; i < 5; i++) line([[-15 + i * 7, -20 + hash(i) * 3], [-12 + i * 7, -16 + hash(i + 1) * 4]], { stroke: rgba('#FFD38A', .6), lwPx: Math.max(.8, s * .3) });   // brush bristle marks
    // wear: the glaze cracks and flakes, the black shows through
    if (wear > .01) { for (let i = 0; i < Math.round(3 + wear * 9); i++) { const cx = (hash(i * 4.7) - .5) * 30, cy = -4 - hash(i * 3.1) * 17, r = (1.2 + hash(i * 2.2) * 2.8) * (.4 + wear);
        shape(Array.from({ length: 8 }, (_, j) => { const a = j / 8 * TAU, rr = r * (.6 + hash(i * 9 + j) * .6); return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * .8]; }), { fill: C.char, stroke: C.glazeDk, lwPx: LW(s) * .4 }); }
      cracks(s, CRACKS.slice(0, Math.round(1 + wear * 4)), C.char, .7); }
    X.restore();
    shape(B, { fill: null, ...O(s), smooth: true });
    shape([[-10, -20], [-4, -22.5], [3, -21.5], [-3, -19], [-9, -16.5]], { fill: 'rgba(255,255,255,.8)', stroke: null, smooth: true });   // the TOO-shiny highlights
    shape([[8, -19], [12, -17.5], [9.5, -16.5]], { fill: 'rgba(255,255,255,.75)', stroke: null, smooth: true });
    sparkle(-6, -20.5, 1.8, s); sparkle(10, -18, 1.2, s);
    // the left drumstick: glazed and frilled
    drumstick(-1, s, mixCol(C.glaze, C.char, wear * .6), { bone: '#E8DCC8', shineCol: 'rgba(255,255,255,.75)' }); frill(-1, s);
    // the right drumstick: re-attached with a band-aid and toothpicks (or fallen off)
    if (!o.drumstickOff) {
      drumstick(1, s, mixCol(C.glaze, C.char, wear * .6), { bone: '#E8DCC8', shineCol: 'rgba(255,255,255,.75)' }); frill(1, s);
      toothpick(10.5, -13.5, 16, -6.5, s); toothpick(12, -4, 17.5, -11, s); toothpick(9, -8, 15.5, -9.5, s);
      bandAid(13.2, -9.6, -.85, s);
    } else {
      X.save(); X.translate(26, -1); X.rotate(1.9); X.translate(-16, 8); drumstick(1, s, mixCol(C.glaze, C.char, .3), { bone: '#E8DCC8' }); frill(1, s); bandAid(13.2, -9.6, -.85, s); X.restore();
      shape([[9, -12], [12, -15], [15, -11], [13, -6], [9.5, -7]], { fill: C.char, ...O(s, .7), smooth: true });   // the black stump shows
      toothpick(11, -10, 14.5, -14.5, s);
    }
    // heaps of garnish hiding the worst, sliding off with wear
    garnish(s, t, -9, -3 + wear * 2, 14, 5, wear, 1); garnish(s, t, 9, -2 + wear * 2, 12, 4, wear, 5); garnish(s, t, 0, -21 + wear * 5, 9, 3, wear, 9);
    if (wear > .6) embers(t, s, Math.round((wear - .6) * 12), [26, 14], 4);
    smokeCurls(t, clamp(o.smoke ?? 0), s, -18, 8);
    steamCurls(t, clamp(o.steam ?? 0), s);
  }
  function drawCarved(s, t, o) {
    const B = lumpy(BODY, 1.6, 7);
    wings(s, C.char);
    shape(B, { fill: linGrad(0, -23, 0, 0, [[0, C.charLt], [1, C.char]]), stroke: C.ink, lwPx: LW(s) * 1.4, smooth: true });
    cracks(s, CRACKS.slice(0, 3), C.charGrey, .8);
    for (const [gx, gy] of [[-12, -17], [11, -19], [-15, -7]]) shape(ellPts(gx, gy, 2.2, 1.2, 8), { fill: C.glaze, stroke: null });   // flakes of the paint-on glaze
    // the cut: a thick charcoal crust, a thin grey ring, the icy blue still-frozen centre
    const cut = [[-12, -2], [-13.5, -9], [-10, -16], [-2, -19], [6, -17.5], [12, -12], [12.5, -5], [9, -1]];
    shape(cut, { fill: C.char, stroke: C.ink, lwPx: LW(s), smooth: true });
    const ring = cut.map(([a, b]) => [a * .82, -1.6 + (b + 1.6) * .84]); shape(ring, { fill: '#8C7E78', stroke: null, smooth: true });
    const core = cut.map(([a, b]) => [a * .68, -2.6 + (b + 2.6) * .7]); shape(core, { fill: linGrad(0, -15, 0, -2, [[0, C.iceLt], [.5, C.ice], [1, C.iceDk]]), stroke: rgba(C.iceXd, .8), lwPx: LW(s) * .5, smooth: true });
    for (let i = 0; i < 6; i++) line([[-6 + i * 2.4, -12 + hash(i) * 2], [-4.5 + i * 2.2, -6 - hash(i + 2) * 2]], { stroke: rgba('#FFFFFF', .75), lwPx: Math.max(.8, LW(s) * .5) });   // frost streaks
    for (let i = 0; i < 4; i++) { X.save(); X.globalAlpha *= .6 + .4 * twinkle(t, i); crystal(-5 + i * 3.6, -9 - (i % 2) * 3, 1, s); X.restore(); }
    // an ice cube frozen in the middle, with a sparkle
    shape([[-2, -10], [1.6, -11.2], [3.6, -9], [3.4, -5.6], [-.2, -4.6], [-2.2, -6.6]], { fill: rgba('#EAF9FF', .9), stroke: C.iceXd, lwPx: LW(s) * .6 });
    line([[-2, -10], [1.4, -8.4], [3.6, -9]], { stroke: C.iceXd, lwPx: LW(s) * .4 }); line([[1.4, -8.4], [-.2, -4.6]], { stroke: C.iceXd, lwPx: LW(s) * .4 });
    const f = twinkle(t * 1.6, 2); X.save(); X.globalAlpha *= .4 + .6 * f; sparkle(2.4, -10.4, 2 + 1.4 * f, s); X.restore(); glow(2.4, -10.4, 4, '#CFF3FF', .5 * f);
    // the right drumstick still on (black), the left one carved away (a stump)
    drumstick(1, s, C.char, { bone: '#3A3034', shine: false });
    shape([[-15, -10], [-18, -12], [-19.5, -8], [-17, -4], [-14, -5]], { fill: C.char, ...O(s, .8), smooth: true }); shape([[-17.5, -9.5], [-18.5, -8], [-17, -6]], { fill: C.iceDk, stroke: null, smooth: true });
    // the green "healthy stuffing" spilling onto the platter, with a wristwatch half-buried in it
    stuffingHeap(s, t, -4, 1.2, 26, 5, 3);
    stuffingHeap(s, t, 2, 2.6, 16, 2.4, 11, true);
    X.save(); X.translate(9, 1.5); X.scale(1.5, 1.5); watch(0, 0, s * 1.5, t, .5); X.restore();
    steamCurls(t, clamp(o.steam ?? 0), s); smokeCurls(t, clamp(o.smoke ?? 0), s, -16, 8);
    mist(t, clamp(o.frost ?? .3), s, 16);
  }
  // A heap of kale, broccoli florets and quinoa (local units, centred at (cx, cy), w × h).
  function stuffingHeap(s, t, cx, cy, w, h, seed = 0, front = false) {
    const n = Math.round(w * (front ? .35 : .55));
    if (!front) shape(Array.from({ length: 14 }, (_, i) => { const a = Math.PI + i / 13 * Math.PI; return [cx + Math.cos(a) * w / 2, cy + Math.sin(a) * h * 1.1 + (i % 2) * .4]; }).concat([[cx + w / 2, cy + .8], [cx - w / 2, cy + .8]]), { fill: C.kale, stroke: C.ink, lwPx: LW(s) * .7, smooth: .3 });
    for (let i = 0; i < n; i++) { const kx = cx + (hash(i * 3.1 + seed) - .5) * w * .9, ky = cy - hash(i * 1.7 + seed) * h * .9, a = hash(i + seed) * TAU;   // kale: curly dark leaves
      const pts = []; for (let j = 0; j < 10; j++) { const an = j / 10 * TAU, r = (j % 2 ? 1.1 : 2) * (.8 + hash(i * 7 + j) * .4); pts.push([kx + Math.cos(an + a) * r * 1.2, ky + Math.sin(an + a) * r * .8]); }
      shape(pts, { fill: i % 3 ? C.kale : C.kaleLt, stroke: C.ink, lwPx: LW(s) * .35, smooth: .6 }); line([[kx - 1, ky], [kx + 1, ky - .3]], { stroke: C.kaleLt, lwPx: LW(s) * .35 }); }
    for (let i = 0; i < Math.round(n * .6); i++) { const bx = cx + (hash(i * 5.7 + seed + 2) - .5) * w * .8, by = cy - .5 - hash(i * 2.3 + seed + 2) * h * .9;   // broccoli florets
      shape([[bx - .5, by + 2.2], [bx + .5, by + 2.2], [bx + .4, by], [bx - .4, by]], { fill: '#A8D47A', stroke: C.ink, lwPx: LW(s) * .3 });
      for (let j = 0; j < 4; j++) circle(bx + (j - 1.5) * .8, by - .4 - (j % 2) * .6, 1, { fill: j % 2 ? C.broc : C.brocDk, stroke: C.ink, lwPx: LW(s) * .25 }); }
    for (let i = 0; i < n * 3; i++) circle(cx + (hash(i * 1.1 + seed + 5) - .5) * w, cy - hash(i * .9 + seed + 5) * h * .8 + .5, .32, { fill: i % 3 ? C.quinoa : C.quinoaDk, stroke: null });   // quinoa
  }
  function watch(cx, cy, s, t, bury = .45) {                                              // a wristwatch, half-buried
    X.save(); X.translate(cx, cy); X.rotate(-.35);
    shape([[-5.5, -1], [-2.2, -1.2], [-2.2, 1.2], [-5.5, 1]], { fill: '#6A4129', ...O(s, .5) }); shape([[2.2, -1.2], [5.8, -1.4], [6, .8], [2.2, 1.2]], { fill: '#6A4129', ...O(s, .5) });
    circle(0, 0, 2.6, { fill: '#E2A93B', ...O(s, .7) }); circle(0, 0, 2, { fill: '#FFFDF6', stroke: null });
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; circle(Math.cos(a) * 1.6, Math.sin(a) * 1.6, .12, { fill: C.ink, stroke: null }); }
    const ha = t * .02, ma = t * .3; line([[0, 0], [Math.sin(ha) * 1, -Math.cos(ha) * 1]], { stroke: C.ink, lwPx: LW(s) * .5 }); line([[0, 0], [Math.sin(ma) * 1.5, -Math.cos(ma) * 1.5]], { stroke: C.ink, lwPx: LW(s) * .35 });
    shape(rectPts(2.5, -.4, .8, .8), { fill: '#E2A93B', stroke: null }); shape([[-1.2, -1.4], [-.4, -1.8], [-.8, -1]], { fill: 'rgba(255,255,255,.7)', stroke: null });
    X.restore();
    if (bury > 0) for (let i = 0; i < 6; i++) { const kx = cx - 4 + i * 1.8, ky = cy + 1.4 - Math.sin(i / 5 * Math.PI) * 1.4 * bury; shape(ellPts(kx, ky, 1.6, 1, 8), { fill: i % 2 ? C.kale : C.kaleLt, stroke: C.ink, lwPx: LW(s) * .3 }); }
  }

  // ---------- serving pieces ----------
  function platter(x, y, s, o = {}) {
    const M = begin(x, y, s, o);
    ellipse(0, -3.6, 30, 6.4, { fill: C.silverDk, ...O(s) });
    ellipse(0, -4.6, 30, 6, { fill: linGrad(-30, 0, 30, 0, [[0, C.silver], [.35, C.silverLt], [.6, C.silver], [1, C.silverDk]]), ...O(s) });
    ellipse(0, -4.8, 24, 4.4, { fill: linGrad(0, -9, 0, 0, [[0, C.silverDk], [1, C.silverLt]]), stroke: C.silverXd, lwPx: LW(s) * .5 });
    for (let i = 0; i < 18; i++) { const a = i / 18 * TAU; circle(Math.cos(a) * 27, -4.6 + Math.sin(a) * 5.2, .5, { fill: C.silverXd, stroke: null }); }   // beaded rim
    shape([[-20, -7.4], [-10, -8.6], [-14, -7.8]], { fill: 'rgba(255,255,255,.8)', stroke: null, smooth: true });
    if (o.garnish) { for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, gx = Math.cos(a) * 25, gy = -4.8 + Math.sin(a) * 4.6; if (Math.sin(a) < -.2) continue;
      for (let j = 0; j < 3; j++) circle(gx + (j - 1) * 1.2, gy - .6, 1.4, { fill: [C.parsley, C.parsleyLt, C.parsleyDk][j], stroke: null }); if (i % 2) circle(gx, gy - 1.6, .9, { fill: C.cran, stroke: C.cranDk, lwPx: LW(s) * .3 }); else { circle(gx, gy - 1.2, 1.8, { fill: C.orangeLt, ...O(s, .4) }); circle(gx, gy - 1.2, 1.3, { fill: C.orange, stroke: null }); } } }
    end();
    return { top: M(0, -5), rimL: M(-30, -4.6), rimR: M(30, -4.6), base: [x, y] };
  }
  function cloche(x, y, s, o = {}) {
    const lift = clamp(o.lift || 0), M = begin(x, y, s, o);
    X.save(); X.translate(lift * 4, -lift * 34); X.rotate(-lift * .35);
    const dome = [[-24, 0], [-23, -9], [-18, -19], [-9, -26], [0, -28], [9, -26], [18, -19], [23, -9], [24, 0]];
    shape(dome, { fill: linGrad(-24, 0, 24, 0, [[0, C.silverDk], [.3, C.silverLt], [.55, C.silver], [1, C.silverXd]]), ...O(s), smooth: true });
    shape([[-17, -17], [-11, -23], [-6, -25], [-13, -18], [-17, -10]], { fill: 'rgba(255,255,255,.7)', stroke: null, smooth: true });
    ellipse(0, 0, 24.5, 2.2, { fill: C.silverDk, ...O(s, .8) });
    shape([[-2.2, -28], [2.2, -28], [1.4, -30], [-1.4, -30]], { fill: C.silverDk, ...O(s, .7) }); circle(0, -32, 2.6, { fill: C.silverLt, ...O(s, .8) });
    shape([[-1.4, -33], [0, -34], [-.4, -32.6]], { fill: '#FFFFFF', stroke: null });
    X.restore();
    end();
    const kx = lift * 4, ky = -lift * 34;
    return { knob: M(kx, ky - 32), rim: M(kx, ky), top: M(kx, ky - 28), base: [x, y], lift };
  }
  function pan(x, y, s, o = {}) {
    const M = begin(x, y, s, o);
    for (const sd of [-1, 1]) shape([[sd * 25, -11], [sd * 30, -11.5], [sd * 30.5, -8], [sd * 26, -7.5]], { fill: C.silverDk, ...O(s, .8), smooth: .3 });
    ellipse(0, -11, 26, 4.2, { fill: C.panDk, ...O(s) });
    shape([[-26, -11], [26, -11], [23, 0], [-23, 0]], { fill: linGrad(0, -11, 0, 0, [[0, C.panLt], [1, C.pan]]), ...O(s), smooth: .1 });
    for (let i = 0; i < 26; i++) circle(-22 + (i % 13) * 3.6 + (i > 12 ? 1.8 : 0), -8 + (i > 12 ? 4 : 0), .35, { fill: 'rgba(255,255,255,.7)', stroke: null });   // speckled enamel
    shape([[-24, -10.4], [24, -10.4], [24, -9.4], [-24, -9.4]], { fill: 'rgba(255,255,255,.35)', stroke: null });
    end();
    return { top: M(0, -8), rimL: M(-26, -11), rimR: M(26, -11), base: [x, y] };
  }
  function stuffingBowl(x, y, s, o = {}) {
    const fill = clamp(o.fill ?? 1), M = begin(x, y, s, o), t = o.t ?? 0;
    if (fill > .02) stuffingHeap(s, t, 0, -9, 22, 3 + fill * 5, 21);
    shape([[-13, -9], [13, -9], [10.5, -2], [6, 0], [-6, 0], [-10.5, -2]], { fill: linGrad(0, -9, 0, 0, [[0, '#F7F2E6'], [1, '#D9CDB4']]), ...O(s), smooth: .25 });
    ellipse(0, -9, 13, 1.6, { fill: fill > .02 ? C.kale : '#E8E0CC', ...O(s, .7) });
    for (let i = 0; i < 7; i++) circle(-9 + i * 3, -5.2, .7, { fill: C.parsley, stroke: null });   // a painted band
    steamCurls(t, clamp(o.steam ?? 0), s * .6, -14, 6);
    end();
    return { top: M(0, -9 - fill * 7), base: [x, y] };
  }
  function pie(x, y, s, o = {}) {
    const n = clamp(Math.round(o.slices ?? 8), 0, 8), M = begin(x, y, s, o), t = o.t ?? 0;
    ellipse(0, -2.4, 15.5, 4.6, { fill: '#C9C2B6', ...O(s) });                                // the tin
    shape([[-15.5, -2.4], [15.5, -2.4], [14, -.4], [-14, -.4]], { fill: '#B4ADA0', stroke: null });
    const cy = -4.4, rx = 14, ry = 4.4;
    if (n > 0) {
      const a0 = -Math.PI / 2 + (8 - n) / 8 * TAU, a1 = -Math.PI / 2 + TAU;
      if (n < 8) {                                                                        // the cut faces of the remaining pie
        const pts = [[0, cy], [0, cy + 2.4]]; for (let i = 0; i <= 12; i++) { const a = lerp(a0, a1, i / 12); if (Math.sin(a) > -.05) pts.push([Math.cos(a) * rx, cy + Math.sin(a) * ry + 2.4]); }
        shape([[0, cy], [Math.cos(a0) * rx, cy + Math.sin(a0) * ry], [Math.cos(a0) * rx, cy + Math.sin(a0) * ry + 2.4], [0, cy + 2.4]], { fill: C.pieDk, ...O(s, .6) });
      }
      shape([[Math.cos(a0) * rx, cy + 2.4 + Math.sin(a0) * ry], ...Array.from({ length: 25 }, (_, i) => { const a = lerp(a0, a1, i / 24); return [Math.cos(a) * rx, cy + Math.sin(a) * ry + (Math.sin(a) > 0 ? 2.4 : 0)]; })], { fill: C.crustDk, stroke: null });
      const top = [[0, cy]]; for (let i = 0; i <= 24; i++) { const a = lerp(a0, a1, i / 24); top.push([Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
      shape(top, { fill: C.crust, ...O(s), closed: true });
      const fil = [[0, cy]]; for (let i = 0; i <= 24; i++) { const a = lerp(a0, a1, i / 24); fil.push([Math.cos(a) * rx * .82, cy + Math.sin(a) * ry * .78]); }
      shape(fil, { fill: linGrad(0, cy - ry, 0, cy + ry, [[0, '#E98A3A'], [1, C.pie]]), stroke: C.pieDk, lwPx: LW(s) * .5 });
      for (let i = 0; i < 16; i++) { const a = -Math.PI / 2 + i / 16 * TAU; if (a < a0 - .01) continue; circle(Math.cos(a) * rx * .91, cy + Math.sin(a) * ry * .91, .9, { fill: mixCol(C.crust, '#FFFFFF', .2), stroke: null }); }   // crimped edge
      for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i + .5) / 8 * TAU; if (i < 8 - n) continue; const cx = Math.cos(a) * rx * .55, ccy = cy + Math.sin(a) * ry * .55;   // whipped cream dollops
        shape([[cx - 2, ccy + .6], [cx - 1.8, ccy - .6], [cx - .6, ccy - 1.2], [cx - .2, ccy - 2.4], [cx + .5, ccy - 1.2], [cx + 1.8, ccy - .7], [cx + 2, ccy + .6]], { fill: '#FFFDF8', stroke: C.ink, lwPx: LW(s) * .35, smooth: .5 });
        line([[cx - 1.2, ccy - .2], [cx + .2, ccy - 1], [cx + 1.2, ccy - .1]], { stroke: '#E8DCC8', lwPx: LW(s) * .3, smooth: true }); }
    }
    steamCurls(t, clamp(o.steam ?? 0), s * .5, -8, 6);
    end();
    return { top: M(0, -6), base: [x, y], slices: n };
  }
  function plate(x, y, s, o = {}) {
    const M = begin(x, y, s, o), t = o.t ?? 0, eaten = clamp(o.eaten || 0);
    ellipse(0, -2, 14, 3.6, { fill: C.plateDk, ...O(s) });
    ellipse(0, -2.6, 14, 3.4, { fill: C.plate, ...O(s) }); ellipse(0, -2.6, 9.5, 2.2, { fill: null, stroke: C.plateDk, lwPx: LW(s) * .6 });
    ellipse(0, -2.6, 12, 2.9, { fill: null, stroke: rgba(C.label, .8), lwPx: LW(s) * .5 });
    if (o.slice) {                                                                        // a grim slice of the carved turkey: black crust, blue frozen middle, green stuffing
      const k = 1 - eaten * .75;
      if (k > .05) { X.save(); X.translate(-1, -3.6); X.scale(k, k);
        const wedge = [[-6.5, .8], [-5, -1.8], [-1.5, -4], [2.5, -4.4], [5.5, -2.6], [6.5, .8]];
        shape(wedge, { fill: C.char, ...O(s, .8), smooth: .45 });
        shape(wedge.map(([a, b]) => [a * .78, .6 + (b - .6) * .7]), { fill: '#8C7E78', stroke: null, smooth: .45 });
        shape(wedge.map(([a, b]) => [a * .58, .5 + (b - .5) * .48]), { fill: C.ice, stroke: C.iceXd, lwPx: LW(s) * .3, smooth: .45 });
        crystal(-.6, -.7, .8, s); crystal(1.8, -.4, .5, s);
        for (const [cx, cy] of [[-4, -2.6], [3.4, -3.4]]) line([[cx - .8, cy], [cx + .8, cy + .5]], { stroke: C.charGrey, lwPx: LW(s) * .4 });
        X.restore(); }
      stuffingHeap(s, t, 5.5, -2.6, 6 * (1 - eaten * .6), 1.4, 31);
      if (eaten > .2) for (let i = 0; i < 5; i++) circle(-6 + hash(i * 3) * 12, -3 + hash(i * 5) * 1.6, .35, { fill: i % 2 ? C.quinoa : C.char, stroke: null });   // crumbs
    }
    end();
    return { top: M(0, -3.2), base: [x, y] };
  }

  return { SIZE, WORLD: 1.25, C, turkey, platter, cloche, pan, stuffingBowl, pie, plate, stuffingHeap: (x, y, s, o = {}) => { const M = begin(x, y, s, o); stuffingHeap(s, o.t ?? 0, 0, 0, o.w ?? 20, o.h ?? 5, o.seed ?? 0); end(); return { top: M(0, -(o.h ?? 5)) }; } };
})();
