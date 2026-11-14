// scenes/fall_festival/scene71_festival_games/props.js: the fall festival in front of Dove Creek Elementary.
// Booths, banner, bunting, hay bales, pumpkins, a scarecrow, the ring-toss table, the archery target, the prizes and the falling leaves.
// Everything is namespaced FF (scripts share one global scope). Every function is a pure function of its arguments.
//   FF.dress(P, t, st)                  the festival as depth-sorted items [{ z, draw }]; st is the state of the games (see scene.js)
//   FF.ring(x, y, rx, ry, col, o)       a toss ring in screen space (o.half: 'back' | 'front' to thread it on a peg)
//   FF.arrow(x0, y0, x1, y1, u)         an arrow from tail to head; u = px per world unit
//   FF.bow(hx, hy, len, nock)           a bow held at (hx, hy); nock = where the string is pulled to (null: at rest)
//   FF.prize(kind, x, y, s, t, o)       'sword' | 'giraffe' | 'dragon' | 'robot' | 'teddy'; (x, y) = its base, s = px per local unit
//   FF.leaves(t) · FF.grade() · FF.title(t) · FF.card(text, k)
const FF = (() => {
  const C = {
    ink: '#3D3237', cream: '#FFF4DC', white: '#FFFDF6', orange: '#F08A2C', orangeDk: '#C8641A', orangeLt: '#FFB25E', red: '#D9452F', redDk: '#A8301F',
    gold: '#F2C440', straw: '#E8C66A', strawDk: '#C49A3C', strawLt: '#F5DC8E', wood: '#9A6A44', woodDk: '#6F4A30', green: '#5FA052', stem: '#6E7B3A',
    blue: '#4A8FE0', purple: '#994EC4', pink: '#E86BA8', teal: '#3BA99C', steel: '#B9C2CC', steelDk: '#7C8794', glow: '#8CFF9A',
  };
  const LEAF = ['#E8742A', '#D9452F', '#F2B33A', '#B5532A', '#F08A2C'];
  const O = (lw = 1.4) => ({ stroke: C.ink, lwPx: lw });
  const LANE_Z = 1880, RINGX = -700, ARCHX = 560;                       // the game lane; where the thrower / archer stands in each game
  const PEGS = [365, 400, 435].map(d => RINGX + d), PEG_TOP = 112, TABLE_Y = 72, PUMPKIN = [RINGX + 560, 46];   // peg X; the gag pumpkin (X, top)
  const TARGET = [ARCHX + 420, 95], HAT = [ARCHX + 592, 203], BALLOON = [ARCHX + 452, 292];                    // bullseye; scarecrow hat; red balloon

  function text(s, x, y, size, col, o = {}) {
    X.save(); X.font = `${o.weight ?? 700} ${size}px ${o.font ?? FONT_TALK}`; X.textAlign = o.align ?? 'center'; X.textBaseline = 'middle';
    if (o.outline) { X.lineJoin = 'round'; X.lineWidth = o.outline; X.strokeStyle = o.outlineCol ?? C.ink; X.strokeText(s, x, y); }
    X.fillStyle = col; X.fillText(s, x, y); X.restore();
  }

  // ---------- small things in screen space ----------
  function ring(x, y, rx, ry, col, o = {}) {
    const a0 = o.half === 'back' ? Math.PI : 0, a1 = o.half === 'front' ? Math.PI : TAU, w = Math.max(2.5, rx * .28);
    X.save(); X.lineCap = 'round';
    for (const [c, lw] of [[C.ink, w + 3], [col, w]]) { X.beginPath(); X.ellipse(x, y, rx, Math.max(ry, 1), o.rot || 0, a0, a1); X.strokeStyle = c; X.lineWidth = lw; X.stroke(); }
    X.restore();
  }
  function arrow(x0, y0, x1, y1, u, o = {}) {
    const d = Math.hypot(x1 - x0, y1 - y0) || 1, ux = (x1 - x0) / d, uy = (y1 - y0) / d, nx = -uy, ny = ux;
    line([[x0, y0], [x1, y1]], { stroke: C.ink, lwPx: Math.max(3, 3.4 * u) }); line([[x0, y0], [x1, y1]], { stroke: o.col || '#D9B27A', lwPx: Math.max(1.6, 2 * u) });
    if (!o.noHead) shape([[x1 + ux * 7 * u, y1 + uy * 7 * u], [x1 + nx * 3.2 * u, y1 + ny * 3.2 * u], [x1 - nx * 3.2 * u, y1 - ny * 3.2 * u]], { fill: C.steel, ...O(1.2) });
    for (const sd of [-1, 1]) shape([[x0 + ux * 2 * u, y0 + uy * 2 * u], [x0 - ux * 3 * u + nx * sd * 4.5 * u, y0 - uy * 3 * u + ny * sd * 4.5 * u], [x0 + ux * 9 * u + nx * sd * 4.5 * u, y0 + uy * 9 * u + ny * sd * 4.5 * u], [x0 + ux * 12 * u, y0 + uy * 12 * u]],
      { fill: o.fletch || C.red, ...O(1) });
  }
  function bow(hx, hy, len, nock) {
    const top = [hx - len * .16, hy - len / 2], bot = [hx - len * .16, hy + len / 2];
    const limb = [top, [hx - len * .02, hy - len * .3], [hx + len * .03, hy], [hx - len * .02, hy + len * .3], bot];
    line(nock ? [top, nock, bot] : [top, bot], { stroke: '#F4EFE4', lwPx: Math.max(1.2, len * .012) });
    line(limb, { stroke: C.ink, lwPx: Math.max(5, len * .075), smooth: true }); line(limb, { stroke: C.wood, lwPx: Math.max(3, len * .05), smooth: true });
    line([[hx + len * .02, hy - len * .08], [hx + len * .02, hy + len * .08]], { stroke: C.red, lwPx: Math.max(3.5, len * .06) });
  }

  // ---------- the prizes: local units, (0, 0) at the base, y up is negative ----------
  function prize(kind, x, y, s, t = 0, o = {}) {
    X.save(); X.translate(x, y); X.rotate(o.ang || 0); X.scale(s * (o.k ?? 1), s * (o.k ?? 1));
    if (kind === 'sword') {
      const g = o.glow ?? .5;
      X.save(); X.shadowColor = C.glow; X.shadowBlur = 10 + 40 * g;
      shape([[-1.2, -5], [-1.2, -25], [0, -28], [1.2, -25], [1.2, -5]], { fill: mixCol('#B9FFC2', '#E9FFEC', g), stroke: '#3E9A52', lwPx: 1.6 });
      if (g > .7) shape([[-1.2, -5], [-1.2, -25], [0, -28], [1.2, -25], [1.2, -5]], { fill: '#F4FFF5', stroke: null });
      X.restore();
      line([[0, -7], [0, -24]], { stroke: '#FFFFFF', lwPx: 1.2, alpha: .8 });
      shape(rectPts(-3.6, -5.6, 7.2, 1.6), { fill: C.gold, ...O(1.4), smooth: .2 });
      shape(rectPts(-.9, -4, 1.8, 4.6), { fill: '#4A4458', ...O(1.4) }); circle(0, 1, 1.2, { fill: C.gold, ...O(1.2) });
    } else if (kind === 'giraffe') {
      for (const lx of [-3, -1.2, 1.2, 3]) shape(rectPts(lx - .6, -3.4, 1.2, 3.4), { fill: '#F4C84A', ...O(1.1) });
      shape([[2, -5.5], [3.2, -14], [5.4, -14.2], [4.6, -4.5]], { fill: '#F9D560', ...O(1.3), smooth: .2 });
      shape(ellPts(0, -5, 4.6, 3), { fill: '#F9D560', ...O(1.3), smooth: true });
      shape(ellPts(5.2, -15.4, 2.6, 1.8), { fill: '#F9D560', ...O(1.3), smooth: true });
      for (const hx of [3.9, 5.2]) { line([[hx, -16.8], [hx - .2, -18.6]], { stroke: C.ink, lwPx: 1.4 }); circle(hx - .2, -18.8, .5, { fill: C.wood, stroke: null }); }
      for (const [sx, sy, r] of [[-2, -5.6, 1], [.6, -4.2, .9], [2.6, -6.4, .8], [3.6, -9.5, .7], [4.2, -12.2, .6]]) circle(sx, sy, r, { fill: '#C98A3A', stroke: null });
      circle(5.9, -15.8, .4, { fill: C.ink, stroke: null }); line([[-4.5, -5.5], [-6, -3.5]], { stroke: C.ink, lwPx: 1.3 });
    } else if (kind === 'dragon') {
      for (const sd of [-1, 1]) shape([[sd * 3, -8], [sd * 8.5, -12.5], [sd * 7.5, -8], [sd * 8.5, -5], [sd * 3.5, -4.5]], { fill: '#B8402E', ...O(1.2), smooth: .15 });
      shape([[3.5, -2], [7, -1], [8.5, -3.5], [6.5, -2.6]], { fill: '#E0533A', ...O(1.1), smooth: true });
      shape(ellPts(0, -4.8, 4.8, 4.8), { fill: '#E0533A', ...O(1.3), smooth: true }); shape(ellPts(0, -4, 2.9, 3.2), { fill: '#FFD27A', stroke: null, smooth: true });
      for (const sd of [-1, 1]) shape([[sd * 1.6, -14.6], [sd * 2.6, -17.6], [sd * 3.2, -14]], { fill: '#FFD27A', ...O(1) });
      shape(ellPts(0, -12, 4, 3.4), { fill: '#E0533A', ...O(1.3), smooth: true });
      for (const sd of [-1, 1]) { circle(sd * 1.5, -12.6, .65, { fill: C.ink, stroke: null }); circle(sd * 1, -10.4, .3, { fill: C.redDk, stroke: null }); }
      line([[-1.2, -10.9], [0, -10.2], [1.2, -10.9]], { stroke: C.ink, lwPx: 1.1, smooth: true });
    } else if (kind === 'robot') {
      for (const sd of [-1, 1]) { shape(rectPts(sd * 2 - 1, -3, 2, 3), { fill: C.steelDk, ...O(1.1) }); line([[sd * 4, -8.5], [sd * 6, -5.5]], { stroke: C.ink, lwPx: 3 }); line([[sd * 4, -8.5], [sd * 6, -5.5]], { stroke: C.steel, lwPx: 1.6 }); }
      shape(rectPts(-4, -10.4, 8, 7.4), { fill: C.steel, ...O(1.3), smooth: .12 }); shape(rectPts(-2.4, -8.8, 4.8, 3), { fill: '#3A4658', ...O(1) });
      circle(-1.1, -7.3, .6, { fill: C.gold, stroke: null }); circle(1.1, -7.3, .6, { fill: '#6FE08A', stroke: null });
      shape(rectPts(-3.2, -15.6, 6.4, 5), { fill: '#D5DBE2', ...O(1.3), smooth: .15 });
      X.save(); X.shadowColor = '#FF5A4A'; X.shadowBlur = 8; for (const sd of [-1, 1]) circle(sd * 1.4, -13.4, .75, { fill: '#FF4A3A', stroke: null }); X.restore();
      line([[-1.2, -11.6], [1.2, -11.6]], { stroke: C.ink, lwPx: 1.1 }); line([[0, -15.6], [0, -17.8]], { stroke: C.ink, lwPx: 1.3 }); circle(0, -18.3, .8, { fill: C.red, ...O(1) });
    } else {                                                            // a teddy, to fill the racks
      const f = o.col || '#B5814F';
      for (const sd of [-1, 1]) { circle(sd * 2.6, -10.6, 1.3, { fill: f, ...O(1.1) }); shape(ellPts(sd * 3.4, -4.6, 1.5, 1.2), { fill: f, ...O(1.1), smooth: true }); shape(ellPts(sd * 2, -.9, 1.6, 1.1), { fill: f, ...O(1.1), smooth: true }); }
      shape(ellPts(0, -3.8, 3.4, 3.6), { fill: f, ...O(1.3), smooth: true }); shape(ellPts(0, -8.6, 3.2, 2.8), { fill: f, ...O(1.3), smooth: true });
      shape(ellPts(0, -7.8, 1.3, 1), { fill: '#F3DDB8', stroke: null, smooth: true }); for (const sd of [-1, 1]) circle(sd * 1.2, -9.2, .4, { fill: C.ink, stroke: null });
    }
    X.restore();
  }

  // ---------- set pieces, drawn in world units on a screen-facing plane (x = X, y = −Y) ----------
  function hay(x, w = 110, h = 46, y = 0) {
    shape(rectPts(x - w / 2, -y - h, w, h), { fill: C.straw, ...O(1.6), smooth: .06 });
    shape(rectPts(x - w / 2, -y - h, w, h * .22), { fill: C.strawLt, stroke: null });
    for (let i = 0; i < 9; i++) { const lx = x - w / 2 + 6 + hash(i * 3.3 + x) * (w - 12), ly = -y - 6 - hash(i * 7.1 + x) * (h - 14); line([[lx, ly], [lx + 9, ly - 2]], { stroke: C.strawDk, lwPx: 1.1 }); }
    for (const f of [.28, .72]) line([[x - w / 2 + w * f, -y - h], [x - w / 2 + w * f, -y]], { stroke: C.woodDk, lwPx: 1.6 });
  }
  function pumpkin(x, r = 26, y = 0, col = C.orange) {
    shape(ellPts(x, -y - r * .82, r, r * .82), { fill: col, ...O(1.6), smooth: true });
    for (const f of [-.5, 0, .5]) shape(ellPts(x + f * r, -y - r * .82, r * .3, r * .78), { fill: null, stroke: C.orangeDk, lwPx: 1.3, smooth: true });
    shape([[x - 3, -y - r * 1.6], [x - 4, -y - r * 1.95], [x + 4, -y - r * 2], [x + 3.5, -y - r * 1.6]], { fill: C.stem, ...O(1.2), smooth: .2 });
  }
  function tree(x, h, t, seed) {
    const sw = 5 * Math.sin(t * .9 + seed);
    shape([[x - h * .035, 0], [x - h * .025 + sw * .3, -h * .5], [x + h * .025 + sw * .3, -h * .5], [x + h * .035, 0]], { fill: C.woodDk, ...O(1.4) });
    [[0, -.72, .3, 0], [-.2, -.6, .22, 1], [.2, -.6, .23, 2], [-.1, -.85, .2, 3], [.13, -.84, .19, 4], [0, -.52, .2, 0]].forEach(([dx, dy, r, c], i) =>
      shape(ellPts(x + dx * h + sw * (1 + i * .1), dy * h, r * h, r * h * .92, 14), { fill: LEAF[(c + seed) % 5], stroke: i < 3 ? C.ink : null, lwPx: 1.4, smooth: true }));
  }
  function bunting(x0, y0, x1, y1, t, seed = 0) {
    const pts = []; for (let i = 0; i <= 16; i++) { const u = i / 16; pts.push([lerp(x0, x1, u), -lerp(y0, y1, u) + 60 * Math.sin(Math.PI * u) + 3 * Math.sin(t * 1.7 + u * 6 + seed)]); }
    line(pts, { stroke: C.ink, lwPx: 1.3 });
    for (let i = 0; i < 16; i++) { const a = pts[i], b = pts[i + 1], m = [(a[0] + b[0]) / 2 + 4 * Math.sin(t * 2.3 + i), (a[1] + b[1]) / 2 + 44];
      shape([a, b, m], { fill: [C.orange, C.gold, C.red, C.cream, C.green][(i + seed) % 5], ...O(1.1) }); }
  }
  function tent(x, t, o) {                                              // a striped booth, 350 wide: counter, sign and a rack of prizes
    const hw = 175, post = 235, top = 325, col = o.col;
    shape(rectPts(x - hw + 12, -post, hw * 2 - 24, post - 85), { fill: mixCol(col, '#2B2233', .62), ...O(1.4) });
    (o.rack || []).forEach((kd, i) => { if (!kd) return; const px = x - hw + 60 + i * (hw * 2 - 120) / Math.max(1, o.rack.length - 1);
      line([[px, -post + 2], [px, -post + 26]], { stroke: '#D8D0C0', lwPx: 1.1 });
      prize(kd, px, kd === 'sword' ? -108 : -100, kd === 'sword' ? 3.6 : 4.6, t, { ang: Math.sin(t * 1.3 + i) * .05, glow: .55 + .25 * Math.sin(t * 3 + i), col: i % 2 ? '#B5814F' : '#E7A7C4' }); });
    for (const sd of [-1, 1]) shape(rectPts(x + sd * (hw - 8) - 6, -post, 12, post), { fill: C.white, ...O(1.4) });
    shape(rectPts(x - hw, -85, hw * 2, 85), { fill: col, ...O(1.6) });
    for (let i = 0; i < 7; i++) shape(rectPts(x - hw + 25 + i * 50, -85, 25, 85), { fill: C.white, stroke: null, alpha: .85 });
    shape(rectPts(x - hw - 8, -93, hw * 2 + 16, 12), { fill: C.wood, ...O(1.4) });
    const roof = [[x - hw - 22, -post], [x - 70, -top], [x + 70, -top], [x + hw + 22, -post]];
    shape(roof, { fill: C.white, ...O(1.8) });
    for (let i = 0; i < 4; i++) { const u0 = (i * 2 + .5) / 8, u1 = (i * 2 + 1.5) / 8;
      shape([[lerp(x - hw - 22, x + hw + 22, u0), -post], [lerp(x - 70, x + 70, u0), -top], [lerp(x - 70, x + 70, u1), -top], [lerp(x - hw - 22, x + hw + 22, u1), -post]], { fill: col, stroke: null }); }
    shape(roof, { fill: null, ...O(1.8) });
    for (let i = 0; i < 8; i++) { const sx = x - hw - 22 + i * (hw * 2 + 44) / 8, sw = (hw * 2 + 44) / 8; shape([[sx, -post], [sx + sw, -post], [sx + sw, -post + 20], [sx + sw / 2, -post + 34], [sx, -post + 20]], { fill: i % 2 ? col : C.white, ...O(1.2), smooth: .1 }); }
    shape(rectPts(x - 118, -post - 44, 236, 50), { fill: C.cream, ...O(1.6), smooth: .1 });
    text(o.sign, x, -post - 19, o.sign.length > 10 ? 27 : 33, col === C.gold ? C.redDk : mixCol(col, '#2B2233', .25), { font: FONT_SFX, weight: 400 });
  }
  function scarecrow(x, t, arrowAge) {
    const sw = .03 * Math.sin(t * 1.6) + (arrowAge != null ? .09 * boing(arrowAge, 0, 3, 4) : 0);
    X.save(); X.translate(x, 0); X.rotate(sw); X.translate(-x, 0);
    shape(rectPts(x - 4, -150, 8, 150), { fill: C.wood, ...O(1.4) }); shape(rectPts(x - 62, -136, 124, 8), { fill: C.wood, ...O(1.4) });
    shape([[x - 60, -142], [x - 22, -146], [x + 22, -146], [x + 60, -142], [x + 60, -122], [x + 24, -124], [x + 26, -70], [x - 26, -70], [x - 24, -124], [x - 60, -122]], { fill: '#C4533A', ...O(1.6), smooth: .05 });
    for (const lx of [-12, 0, 12]) line([[x + lx, -144], [x + lx, -72]], { stroke: '#8E3324', lwPx: 1.3 }); for (const ly of [-128, -108, -88]) line([[x - 24, ly], [x + 24, ly]], { stroke: '#8E3324', lwPx: 1.3 });
    for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) line([[x + sd * 60, -132], [x + sd * (72 + i * 2), -144 + i * 8]], { stroke: C.strawDk, lwPx: 1.6 });
    for (let i = 0; i < 6; i++) line([[x - 20 + i * 8, -70], [x - 23 + i * 9, -56]], { stroke: C.strawDk, lwPx: 1.6 });
    shape(ellPts(x, -166, 21, 22), { fill: '#EBD3A2', ...O(1.6), smooth: true });
    for (const sd of [-1, 1]) line([[x + sd * 8 - 3, -173], [x + sd * 8 + 3, -167]], { stroke: C.ink, lwPx: 1.8 }), line([[x + sd * 8 + 3, -173], [x + sd * 8 - 3, -167]], { stroke: C.ink, lwPx: 1.8 });
    line([[x - 9, -158], [x - 4, -154], [x + 4, -154], [x + 9, -158]], { stroke: C.ink, lwPx: 1.6, smooth: true }); shape([[x - 3, -164], [x + 3, -164], [x, -159]], { fill: C.orange, ...O(1) });
    shape(ellPts(x, -184, 38, 7), { fill: C.straw, ...O(1.6), smooth: true }); shape([[x - 19, -186], [x - 15, -214], [x + 15, -214], [x + 19, -186]], { fill: C.straw, ...O(1.6), smooth: .1 });
    shape(rectPts(x - 18, -193, 36, 6), { fill: C.red, stroke: null });
    if (arrowAge != null) arrow(x - 70, -HAT[1] + 9, x - 9, -HAT[1], 1, { fletch: C.teal });
    X.restore();
  }

  // ---------- the festival: depth-sorted items ----------
  function dress(P, t, st = {}) {
    const L = [], add = (z, draw) => L.push({ z, draw: () => { if (P.depth(z) > 40) P.plane(z, draw); } });
    // the banner between the canopy piers, and bunting out to two poles on the lawn
    add(2238, () => {
      for (const sd of [-1, 1]) line([[sd * 545, -488], [sd * 600, -540]], { stroke: C.ink, lwPx: 1.3 }), line([[sd * 545, -398], [sd * 600, -380]], { stroke: C.ink, lwPx: 1.3 });
      const w = i => 5 * Math.sin(t * 1.4 + i * .8), top = [], bot = []; for (let i = 0; i <= 10; i++) { top.push([-545 + i * 109, -490 + w(i)]); bot.unshift([-545 + i * 109, -396 + w(i + 1)]); }
      shape([...top, ...bot], { fill: C.cream, stroke: C.orangeDk, lwPx: 3 });
      text('FALL FESTIVAL', 0, -441 + w(5), 78, C.orange, { font: FONT_SFX, weight: 400, outline: 9, outlineCol: C.ink });
      for (const sd of [-1, 1]) { pumpkin(sd * 440, 26, 414); shape(starPts(sd * 495, -470, 16, .45, 5, t * .4), { fill: LEAF[1], ...O(1.1) }); }
    });
    add(2150, () => { for (const sd of [-1, 1]) { shape(rectPts(sd * 1500 - 5, -430, 10, 430), { fill: C.white, ...O(1.3) }); circle(sd * 1500, -436, 9, { fill: C.gold, ...O(1.2) }); bunting(sd * 1500, 428, sd * 606, 545, t, sd > 0 ? 2 : 0); } });
    [[-1260, 2340, 470, 0], [-1960, 2480, 560, 2], [1760, 2470, 540, 1], [940, 2400, 400, 3]].forEach(([x, z, h, s]) => add(z, () => tree(x, h, t, s)));
    // the booths on the front sidewalk
    const gone = st.gone || {};
    add(2075, () => tent(RINGX + 430, t, { col: C.red, sign: 'RING TOSS', rack: ['teddy', gone.sword ? null : 'sword', gone.giraffe ? null : 'giraffe', 'teddy'] }));
    add(2076, () => tent(185, t, { col: C.gold, sign: 'BEAN BAG TOSS', rack: ['teddy', 'teddy', 'teddy'] }));
    add(2077, () => tent(ARCHX + 330, t, { col: C.blue, sign: 'ARCHERY', rack: [gone.dragon ? null : 'dragon', 'teddy', gone.robot ? null : 'robot', 'teddy'] }));
    // hay bales and pumpkins
    add(2010, () => { hay(RINGX - 700); hay(RINGX - 640, 110, 46, 46); pumpkin(RINGX - 770, 30); pumpkin(RINGX - 600, 20, 92, C.orangeLt); hay(-95, 120); pumpkin(-95, 24, 46); pumpkin(-30, 18, 0, C.orangeLt); hay(1400, 120); pumpkin(1470, 28); pumpkin(1400, 20, 46); });
    add(1975, () => { hay(ARCHX + 420, 150, 50); hay(ARCHX + 420, 120, 50, 50); });        // the backstop behind the target
    // the throwing lines
    L.push({ z: 2049, draw: () => { for (const x of [RINGX + 48, ARCHX + 48]) { const q = P.poly([[x, .5, LANE_Z - 75], [x + 7, .5, LANE_Z - 75], [x + 7, .5, LANE_Z + 75], [x, .5, LANE_Z + 75]]); if (q) shape(q, { fill: C.white, stroke: null, alpha: .9 }); } } });
    // ring toss: the table, three pegs, the rings on them, and a pumpkin a little too far away
    L.push({ z: LANE_Z, draw: () => {
      if (P.depth(LANE_Z - 40) < 40) return;
      const x0 = RINGX + 335, x1 = RINGX + 465, top = P.poly([[x0, TABLE_Y, LANE_Z - 38], [x1, TABLE_Y, LANE_Z - 38], [x1, TABLE_Y, LANE_Z + 38], [x0, TABLE_Y, LANE_Z + 38]]);
      P.plane(LANE_Z - 38, () => { shape(rectPts(x0, -TABLE_Y, x1 - x0, TABLE_Y), { fill: C.orange, ...O(1.6) });
        for (let i = 0; i < 6; i++) shape([[x0 + i * 21.7, -TABLE_Y], [x0 + (i + 1) * 21.7, -TABLE_Y], [x0 + (i + .5) * 21.7, -TABLE_Y + 15]], { fill: C.cream, ...O(1.1) }); });
      if (top) shape(top, { fill: C.orangeLt, ...O(1.6) });
      const k = P.k(LANE_Z);
      PEGS.forEach((px, i) => {
        const rs = (st.pegRings || [])[i] || [], at = y => P.p(px, y, LANE_Z);
        rs.forEach(r => { const [sx, sy] = at(r.y); ring(sx, sy, 15 * k, 5 * k, r.col, { half: 'back' }); });
        const [bx, by] = at(TABLE_Y), [tx, ty] = at(PEG_TOP);
        line([[bx, by], [tx, ty]], { stroke: C.ink, lwPx: 7 * k + 3 }); line([[bx, by], [tx, ty]], { stroke: '#F4EFE4', lwPx: 7 * k }); circle(tx, ty, 5.5 * k, { fill: C.red, ...O(1.4) });
        rs.forEach(r => { const [sx, sy] = at(r.y); ring(sx, sy, 15 * k, 5 * k, r.col, { half: 'front' }); });
      });
    } });
    add(LANE_Z + 1, () => { pumpkin(PUMPKIN[0], 27); });
    if (st.pumpkinRing) L.push({ z: LANE_Z + .5, draw: () => { const [sx, sy, k] = P.p(PUMPKIN[0], PUMPKIN[1] - 2, LANE_Z); ring(sx, sy, 15 * k, 5 * k, st.pumpkinRing, { half: 'front' }); } });
    // archery: the target on its easel, the balloons tied behind it, the scarecrow
    add(LANE_Z + 12, () => { const [bx, by] = [BALLOON[0], -BALLOON[1]], post = [TARGET[0] + 62, -150];
      shape(rectPts(post[0] - 3, -150, 6, 150), { fill: C.wood, ...O(1.2) });
      [[0, 0, C.red], [34, -26, C.gold], [62, 8, C.blue]].forEach(([dx, dy, c], i) => {
        const sx = bx + dx + 5 * Math.sin(t * 1.3 + i * 2), sy = by + dy + 3 * Math.sin(t * 1.7 + i);
        line([[sx, sy + 30], [lerp(sx, post[0], .5) + 4, lerp(sy + 30, post[1], .5) + 8], post], { stroke: C.ink, lwPx: 1.1, smooth: true });
        if (i === 0 && st.pop != null) { if (st.pop < .35) for (let j = 0; j < 7; j++) { const a = j * TAU / 7, r = 20 + 120 * st.pop; shape(ellPts(sx + Math.cos(a) * r, sy + Math.sin(a) * r, 7, 4, 8, a), { fill: c, ...O(1), alpha: 1 - st.pop / .35 }); } return; }
        shape(ellPts(sx, sy, 25, 30), { fill: c, ...O(1.5), smooth: true }); shape(ellPts(sx - 8, sy - 10, 5, 8, 10, -.5), { fill: '#FFFFFF', stroke: null, alpha: .5, smooth: true });
        shape([[sx - 4, sy + 30], [sx + 4, sy + 30], [sx, sy + 36]], { fill: c, ...O(1) }); });
    });
    add(LANE_Z, () => {
      const [cx, cy] = [TARGET[0], -TARGET[1]], hit = st.thunk != null ? 5 * boing(st.thunk, 0, 5, 6) : 0;
      for (const sd of [-1, 1]) line([[cx + 6 + sd * 6, cy - 30], [cx + 10 + sd * 34, 0]], { stroke: C.ink, lwPx: 5 }), line([[cx + 6 + sd * 6, cy - 30], [cx + 10 + sd * 34, 0]], { stroke: C.wood, lwPx: 3 });
      X.save(); X.translate(cx + hit, cy);
      shape(ellPts(9, 0, 33, 58), { fill: C.strawDk, ...O(1.6), smooth: true });
      [[1, C.white], [.8, '#3A3A44'], [.6, C.blue], [.4, C.red], [.2, C.gold]].forEach(([f, c]) => shape(ellPts(0, 0, 33 * f, 58 * f), { fill: c, stroke: C.ink, lwPx: f === 1 ? 1.6 : .9, smooth: true }));
      (st.arrows || []).forEach(a => {
        const wb = .12 * boing(a.age, 0, 6, 5);
        if (a.split != null) { const s = easeOut(seg(a.split, 0, .25));          // split down the middle: the two halves peel apart
          for (const sd of [-1, 1]) line([[-2, a.y], [-24, a.y + sd * 10 * s], [-46, a.y + sd * 30 * s], [-58, a.y + sd * 52 * s]], { stroke: C.ink, lwPx: 3.2, smooth: true }), line([[-2, a.y], [-24, a.y + sd * 10 * s], [-46, a.y + sd * 30 * s], [-58, a.y + sd * 52 * s]], { stroke: '#D9B27A', lwPx: 1.7, smooth: true });
          return; }
        X.save(); X.translate(-1, a.y); X.rotate(wb + (a.tilt || 0)); arrow(-64, 0, -2, 0, 1, { fletch: a.fletch, noHead: true }); X.restore();
      });
      X.restore();
    });
    add(LANE_Z + 20, () => scarecrow(ARCHX + 600, t, st.hat));
    return L;
  }

  // ---------- full-frame things ----------
  function grade() { X.save(); X.globalCompositeOperation = 'multiply'; X.fillStyle = '#FFE6C4'; X.globalAlpha = .55; X.fillRect(0, 0, W, H); X.restore(); }   // a warm autumn afternoon
  function leaves(t, n = 28) {
    for (let i = 0; i < n; i++) {
      const sp = .045 + .05 * hash(i * 7.7), u = frac(hash(i * 3.1) + t * sp), x = frac(hash(i * 1.9) + t * .012 * (hash(i + .5) - .3)) * (W + 120) - 60 + 70 * Math.sin(t * .9 + i * 2.1);
      const y = u * (H + 100) - 50, r = 9 + 9 * hash(i * 5.3), a = t * (1 + hash(i * 2.7)) * 1.6 + i, fl = .35 + .65 * Math.abs(Math.sin(t * 2.2 + i));
      X.save(); X.translate(x, y); X.rotate(a); X.scale(1, fl);
      shape([[-r, 0], [-r * .3, -r * .55], [r, 0], [-r * .3, r * .55]], { fill: LEAF[i % 5], stroke: C.ink, lwPx: 1, smooth: .25, alpha: .92 });
      line([[-r, 0], [r * .8, 0]], { stroke: C.ink, lwPx: .8, alpha: .5 }); X.restore();
    }
  }
  function title(t, t0, t1) {
    const k = backOut(seg(t, t0, t0 + .45)) * (1 - easeIn(seg(t, t1 - .35, t1))); if (k <= 0) return;
    overlay(() => {
      X.save(); X.translate(W / 2, 250); X.rotate(-.03); X.scale(k, k);
      text('THE FALL FESTIVAL', 0, 0, 150, C.orange, { font: FONT_SFX, weight: 400, outline: 26, outlineCol: C.ink });
      text('THE FALL FESTIVAL', 0, 0, 150, C.orange, { font: FONT_SFX, weight: 400, outline: 8, outlineCol: C.cream });
      shape(rectPts(-330, 96, 660, 72), { fill: C.cream, stroke: C.ink, lwPx: 6, smooth: .15 });
      text('Part 1 · Festival Games', 0, 134, 44, C.redDk, { weight: 700 });
      X.restore();
    });
  }
  function card(txt, k, o = {}) {
    if (k <= 0) return;
    overlay(() => {
      X.save(); X.font = `64px ${FONT_SFX}`; const w = X.measureText(txt).width + 90;
      X.translate(lerp(-w, 70, backOut(k)), 80); X.rotate(-.02);
      shape(rectPts(0, 0, w, 104), { fill: C.cream, stroke: C.ink, lwPx: 7, smooth: .12 });
      text(txt, w / 2, 56, 64, o.ink || C.orangeDk, { font: FONT_SFX, weight: 400 });
      X.restore();
    });
  }

  return { C, LANE_Z, RINGX, ARCHX, PEGS, PEG_TOP, TABLE_Y, PUMPKIN, TARGET, HAT, BALLOON, text, ring, arrow, bow, prize, dress, grade, leaves, title, card };
})();
