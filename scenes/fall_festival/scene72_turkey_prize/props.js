// scenes/fall_festival/scene72_turkey_prize/props.js: the two new games of the fall festival, and the grand prize.
// The bean bag toss (a cornhole board, the bags, a stack of pumpkins, a student's popcorn), the HIGH STRIKER (hammer, pad, puck,
// tower, bell, lights), the prize table with the turkey on ice, the frozen turkey itself, confetti and the part-2 title.
// It builds on scene 71's festival (FF, props.js there: booths, banner, hay, leaves, prizes). Namespaced FF2 (one global scope).
// Every function is a pure function of its arguments.
//   FF2.dress(P, t, st)                   the new games as depth-sorted items [{ z, draw }] (add them to FF.dress's list)
//   FF2.turkey(x, y, s, t, o)             THE frozen turkey: (x, y) = the middle of its base, s = px per world unit; o.mist, o.shiver
//   FF2.bag(x, y, r, col, rot)            a bean bag in screen space, r = half size in px
//   FF2.mallet(gx, gy, ang, len, k)       the high-striker hammer: grip end at (gx, gy), pointing at ang, len px to the head
//   FF2.popcorn(x, y, s, t, burst)        a popcorn bucket held at (x, y) (its rim), s = px per world unit; burst = age of the splash
//   FF2.confetti(t, t0, x, y, s, n)       a confetti burst from screen (x, y) · FF2.rain(t, k) confetti falling over the frame
//   FF2.title(t, t0, t1)
const FF2 = (() => {
  const C = FF.C, O = (lw = 1.4) => ({ stroke: C.ink, lwPx: lw });
  const LANE_Z = 1780;                                             // the new games sit in front of scene 71's, on the drop-off road
  const BX = 330, HX = -1000;                                       // the marks: bean bag toss (before its booth), high striker (before the ring toss booth)
  const BOARD = [BX + 290, BX + 400], HOLE = .72, STACK = BX + 520, POPX = BX + 450, POPZ = LANE_Z + 60;
  const PADX = HX + 74, PAD_Y = 26, TX = HX + 150, RAILX = TX - 28, BELL_Y = 532, DX = HX + 330;   // pad, tower, rail, bell, prize table
  const RUNGS = [['WET NOODLE', 100, '#7FC46A'], ['PUMPKIN', 180, '#F2C440'], ['SCARECROW', 260, '#F08A2C'], ['HERO', 340, '#E0533A'], ['CHAMPION!', 420, '#994EC4']];
  const CONF = ['#F2C440', '#D9452F', '#4A8FE0', '#5FA052', '#E86BA8', '#FFFDF6', '#F08A2C'];
  const text = FF.text;

  // ---------- the frozen turkey: world units, (0, 0) = the middle of its base, up is negative ----------
  function turkey(x, y, s, t = 0, o = {}) {
    X.save(); X.translate(x, y); X.rotate(o.ang || 0); X.scale(s, s);
    const sh = o.shiver ? o.shiver * Math.sin(t * 70) * .8 : 0; X.translate(sh, 0);
    const mist = o.mist ?? 1;
    if (mist > 0) for (let i = 0; i < 5; i++) {                    // cold mist rolling off it
      const u = frac(t * .35 + i / 5), mx = (i % 2 ? 1 : -1) * (20 + 16 * u) + 4 * Math.sin(t * 1.3 + i), my = -8 - 30 * u + 6 * Math.sin(i * 2.1);
      shape(ellPts(mx, my, 9 + 12 * u, 5 + 6 * u, 16), { fill: '#F4FBFF', stroke: null, alpha: .38 * mist * Math.sin(Math.PI * u), smooth: true });
    }
    const leg = sd => [[sd * 8, -30], [sd * 13, -41], [sd * 20, -45], [sd * 27, -41], [sd * 26, -32], [sd * 19, -25]];
    const body = ellPts(0, -19, 31, 19.5, 30);
    const ice = linGrad(-25, -45, 22, 2, [[0, '#F2FAFF'], [.45, '#C3E1F1'], [1, '#88B5D2']]);
    for (const sd of [-1, 1]) {                                     // the drumsticks, tucked up and frozen, and their knuckles
      shape(leg(sd), { fill: ice, ...O(1.6), smooth: true });
      for (const dx of [-1.6, 1.6]) circle(sd * 25 + dx, -44.2 + dx * sd * .4, 2.6, { fill: '#F6FBFF', ...O(1.2) });
    }
    shape(body, { fill: ice, ...O(1.8), smooth: true });
    line([[-6, -36], [-2, -26], [0, -14]], { stroke: '#7EA8C6', lwPx: 1.4, smooth: true }); line([[6, -36], [2, -26], [0, -14]], { stroke: '#7EA8C6', lwPx: 1.4, smooth: true });
    X.save(); tracePath(body, true, true); for (const sd of [-1, 1]) tracePath(leg(sd), true, true); X.clip();      // the white net bag
    for (let i = -9; i <= 9; i++) { line([[i * 7 - 30, -50], [i * 7 + 30, 6]], { stroke: '#FFFFFF', lwPx: Math.max(1, 1.1 * s), alpha: .8 }); line([[i * 7 + 30, -50], [i * 7 - 30, 6]], { stroke: '#FFFFFF', lwPx: Math.max(1, 1.1 * s), alpha: .8 }); }
    shape(ellPts(0, -1, 34, 5, 24), { fill: '#FFFFFF', stroke: null, alpha: .35 });
    X.restore();
    shape([[-20, -33], [-25, -24], [-26, -15]], { fill: null, stroke: '#FFFFFF', lwPx: Math.max(2, 2.6 * s), alpha: .75, smooth: true, closed: false });   // shrink-wrap shine
    shape([[-14, -36], [-17, -33]], { fill: null, stroke: '#FFFFFF', lwPx: Math.max(2, 2.2 * s), alpha: .7, closed: false });
    // the net gathered on top, with a clip
    shape([[-4, -36], [0, -44], [4, -36]], { fill: '#FFFFFF', ...O(1.1), alpha: .95 }); shape(rectPts(-3.4, -42, 6.8, 3.4), { fill: C.steel, ...O(1.1) });
    for (const sd of [-1, 1]) line([[0, -44], [sd * 4, -49], [sd * 1, -47]], { stroke: '#FFFFFF', lwPx: Math.max(1, 1.2 * s), smooth: true });
    // the orange label
    shape(rectPts(-16, -17, 30, 12.5), { fill: C.orange, ...O(1.4), smooth: .12 });
    text('FROZEN TURKEY', -1, -13.3, 3.9, '#FFFDF6', { weight: 800 }); text('20 LB', -1, -8.6, 3.6, C.redDk, { weight: 800 });
    // the GRAND PRIZE rosette: pleats, a gold heart, two tails
    X.save(); X.translate(21, -24); X.rotate(.12 + .05 * Math.sin(t * 2.2));
    for (const sd of [-1, 1]) shape([[sd * 1.5, 2], [sd * 5.5, 15], [sd * 3.2, 13], [sd * 1.8, 16], [sd * -1.2, 3]], { fill: sd < 0 ? C.red : C.gold, ...O(1.1) });
    shape(starPts(0, 0, 8.6, .78, 14, t * .2), { fill: C.red, ...O(1.2) }); circle(0, 0, 5.6, { fill: C.gold, ...O(1.1) });
    text('GRAND', 0, -1.3, 2.1, C.redDk, { weight: 800 }); text('PRIZE', 0, 1.5, 2.1, C.redDk, { weight: 800 });
    X.restore();
    for (let i = 0; i < 14; i++) {                                  // frost crystals (some twinkle)
      const a = hash(i * 4.7) * TAU, r = Math.sqrt(hash(i * 9.1)), fx = Math.cos(a) * r * 27, fy = -19 + Math.sin(a) * r * 16;
      if (fx > -17 && fx < 15 && fy > -18 && fy < -4) continue;
      const tw = .6 + .4 * Math.sin(t * 4 + i * 2.3), R = (1.2 + 1.6 * hash(i * 2.2)) * tw;
      shape(starPts(fx, fy, R * 1.6, .25, 4, i), { fill: '#FFFFFF', stroke: null });
    }
    for (let i = 0; i < 9; i++) circle(-26 + i * 6.5, -2.5 + 1.5 * Math.sin(i * 1.7), 1.3, { fill: '#FFFFFF', stroke: null, alpha: .9 });   // frost along the bottom
    X.restore();
  }

  // ---------- small things in screen space ----------
  function bag(x, y, r, col, rot = 0, sq = 1) {
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(1 / Math.sqrt(sq), sq);
    shape([[-r, -r * .9], [0, -r * 1.05], [r, -r * .9], [r * 1.05, 0], [r, r * .9], [0, r * 1.05], [-r, r * .9], [-r * 1.05, 0]], { fill: col, ...O(1.4), smooth: .5 });
    shape([[-r * .7, -r * .62], [r * .7, -r * .62], [r * .7, r * .62], [-r * .7, r * .62]], { fill: null, stroke: '#FFFDF6', lwPx: 1.1, dash: [3, 3], smooth: .4 });
    X.restore();
  }
  function mallet(gx, gy, ang, len, k) {
    const ux = Math.cos(ang), uy = Math.sin(ang), nx = -uy, ny = ux, hx = gx + ux * len, hy = gy + uy * len;
    line([[gx - ux * 6 * k, gy - uy * 6 * k], [hx, hy]], { stroke: C.ink, lwPx: 8 * k + 3 }); line([[gx - ux * 6 * k, gy - uy * 6 * k], [hx, hy]], { stroke: '#D9A866', lwPx: 8 * k });
    line([[gx - ux * 5 * k, gy - uy * 5 * k], [gx + ux * 16 * k, gy + uy * 16 * k]], { stroke: C.red, lwPx: 6 * k });          // the grip tape
    const hw = 24 * k, hd = 15 * k, P4 = (a, b) => [hx + ux * a + nx * b, hy + uy * a + ny * b];
    shape([P4(-hd, -hw), P4(hd, -hw), P4(hd, hw), P4(-hd, hw)], { fill: '#C4533A', ...O(1.8), smooth: .18 });
    for (const b of [-.62, .62]) line([P4(-hd, hw * b), P4(hd, hw * b)], { stroke: C.steel, lwPx: 4 * k + 1 });
    shape([P4(-hd * .6, -hw * .95), P4(-hd * .2, -hw * .95), P4(-hd * .2, -hw * .3), P4(-hd * .6, -hw * .3)], { fill: '#FFFFFF', stroke: null, alpha: .3 });
    return [hx, hy];
  }
  function popcorn(x, y, s, t, burst = null) {                      // (x, y) = the middle of the rim
    const w0 = 13 * s, w1 = 9 * s, h = 20 * s;
    if (burst == null || burst > .15) for (let i = 0; i < 7; i++) circle(x + (i - 3) * 3.4 * s, y - (2.5 + 2.5 * Math.abs(Math.sin(i * 1.9))) * s, 3.2 * s, { fill: '#FFF3C4', ...O(1) });
    shape([[x - w0, y], [x + w0, y], [x + w1, y + h], [x - w1, y + h]], { fill: '#FFFDF6', ...O(1.4) });
    for (let i = 0; i < 4; i++) { const a = -1 + i * .5 + .12, b = a + .25; shape([[x + w0 * a, y], [x + w0 * b, y], [x + w1 * b, y + h], [x + w1 * a, y + h]], { fill: C.red, stroke: null }); }
    shape([[x - w0, y], [x + w0, y], [x + w1, y + h], [x - w1, y + h]], { fill: null, ...O(1.4) });
    if (burst != null && burst < 1.6) for (let i = 0; i < 18; i++) {   // the splash: kernels thrown up, falling back
      const vx = (hash(i * 3.3) - .5) * 90, vy = -70 - 60 * hash(i * 1.7), px = x + vx * burst * s, py = y + (vy * burst + 110 * burst * burst) * s;
      if (py > y + 80 * s) continue;
      circle(px, py, 2.6 * s, { fill: '#FFF3C4', ...O(1), alpha: 1 - seg(burst, 1.2, 1.6) });
    }
  }
  function confetti(t, t0, x, y, s = 1, n = 70, spread = 1) {
    const a = t - t0; if (a < 0 || a > 3.2) return;
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (hash(i * 2.9 + t0) - .5) * 2.4 * spread, v = (600 + 900 * hash(i * 5.1 + t0)) * s, dr = 1.6 + hash(i * 7.7) * 1.4;
      const px = x + Math.cos(ang) * v * (1 - Math.exp(-dr * a)) / dr + 40 * s * Math.sin(a * 5 + i), py = y + Math.sin(ang) * v * (1 - Math.exp(-dr * a)) / dr + 260 * s * a * a * .5 + 90 * s * a;
      const r = (7 + 6 * hash(i * 1.3)) * s, fl = Math.abs(Math.sin(a * 9 + i));
      X.save(); X.translate(px, py); X.rotate(a * 6 + i); X.globalAlpha = 1 - seg(a, 2.6, 3.2);
      X.fillStyle = CONF[i % CONF.length]; X.fillRect(-r / 2, -r * fl / 4, r, Math.max(1, r * fl / 2)); X.restore();
    }
  }
  function rain(t, k = 1, n = 70) {
    if (k <= 0) return;
    for (let i = 0; i < n; i++) {
      const sp = .18 + .16 * hash(i * 4.1), u = frac(hash(i * 2.3) + t * sp), x = hash(i * 6.7) * W + 50 * Math.sin(t * 1.7 + i), y = u * (H + 80) - 40;
      const r = 9 + 7 * hash(i * 3.9), fl = Math.abs(Math.sin(t * 6 + i));
      X.save(); X.translate(x, y); X.rotate(t * 3 + i); X.globalAlpha = k;
      X.fillStyle = CONF[i % CONF.length]; X.fillRect(-r / 2, -r * fl / 4, r, Math.max(1, r * fl / 2)); X.restore();
    }
  }

  // ---------- set pieces on screen-facing planes (world units, y = −Y) ----------
  function pumpkinAt(x, y, r, rot, col = C.orange) {
    X.save(); X.translate(x, -y - r * .82); X.rotate(rot); X.translate(-x, y + r * .82);
    shape(ellPts(x, -y - r * .82, r, r * .82), { fill: col, ...O(1.6), smooth: true });
    for (const f of [-.5, 0, .5]) shape(ellPts(x + f * r, -y - r * .82, r * .3, r * .78), { fill: null, stroke: C.orangeDk, lwPx: 1.3, smooth: true });
    shape([[x - 3, -y - r * 1.6], [x - 4, -y - r * 1.95], [x + 4, -y - r * 2], [x + 3.5, -y - r * 1.6]], { fill: C.stem, ...O(1.2), smooth: .2 });
    X.restore();
  }
  function hay(x, w = 110, h = 46) {
    shape(rectPts(x - w / 2, -h, w, h), { fill: C.straw, ...O(1.6), smooth: .06 }); shape(rectPts(x - w / 2, -h, w, h * .22), { fill: C.strawLt, stroke: null });
    for (let i = 0; i < 8; i++) { const lx = x - w / 2 + 6 + hash(i * 3.3 + x) * (w - 12), ly = -6 - hash(i * 7.1 + x) * (h - 14); line([[lx, ly], [lx + 9, ly - 2]], { stroke: C.strawDk, lwPx: 1.1 }); }
    for (const f of [.28, .72]) line([[x - w / 2 + w * f, -h], [x - w / 2 + w * f, 0]], { stroke: C.woodDk, lwPx: 1.6 });
  }
  function tower(t, st) {
    const lit = st.lights || 0, ding = st.ding;
    // the column, its two posts and guy lines
    for (const sd of [-1, 1]) line([[TX + sd * 45, -490], [TX + sd * 120, 0]], { stroke: C.ink, lwPx: 1, alpha: .6 });
    shape(rectPts(TX - 46, -505, 92, 475), { fill: C.cream, ...O(1.8) });
    shape(rectPts(TX - 46, -505, 10, 475), { fill: C.red, ...O(1.4) }); shape(rectPts(TX + 36, -505, 10, 475), { fill: C.red, ...O(1.4) });
    RUNGS.forEach(([label, y, col], i) => {
      shape(rectPts(TX - 14, -y - 30, 48, 34), { fill: col, ...O(1.2), smooth: .1 });
      line([[TX - 36, -y], [TX - 14, -y]], { stroke: C.ink, lwPx: 1.6 });
      text(label, TX + 10, -y - 13, label.length > 7 ? 7.8 : 10, '#FFFDF6', { font: FONT_SFX, weight: 400, outline: 2.4 });
      if (lit > 0 && st.hit != null && st.hit >= y) shape(rectPts(TX - 14, -y - 30, 48, 34), { fill: '#FFF6B0', stroke: null, alpha: .35 * lit * (.6 + .4 * Math.sin(t * 20 + i)) });
    });
    for (let y = 60; y < 500; y += 20) line([[RAILX - 6, -y], [RAILX - 2, -y]], { stroke: C.inkSoft || C.ink, lwPx: 1, alpha: .6 });
    line([[RAILX, -40], [RAILX, -BELL_Y + 14]], { stroke: C.steelDk, lwPx: 4 }); line([[RAILX, -40], [RAILX, -BELL_Y + 14]], { stroke: C.steel, lwPx: 2 });
    // chasing bulbs up both edges
    for (let i = 0; i < 16; i++) for (const sd of [-1, 1]) {
      const y = -50 - i * 29, on = lit > 0 ? (frac(i / 4 - t * 3) < .5 ? 1 : .25) * lit : 0;
      circle(TX + sd * 41, y, 4.2, { fill: mixCol('#C9A55A', '#FFF7A8', on), ...O(1) });
      if (on > .4) circle(TX + sd * 41, y, 9, { fill: '#FFF7A8', stroke: null, alpha: .35 * on });
    }
    // the bell on top, and the RING THE BELL! sign
    const bw = ding != null ? .22 * boing(ding, 0, 7, 3) : 0;
    if (ding != null && ding < 1.8) for (let i = 0; i < 10; i++) { const a = i * TAU / 10 + ding * 2, r0 = 34, r1 = 34 + 36 * easeOut(seg(ding, 0, .4));
      line([[RAILX + Math.cos(a) * r0, -BELL_Y - 6 + Math.sin(a) * r0], [RAILX + Math.cos(a) * r1, -BELL_Y - 6 + Math.sin(a) * r1]], { stroke: '#FFE066', lwPx: 3.5, alpha: 1 - seg(ding, 1, 1.8) }); }
    X.save(); X.translate(RAILX, -BELL_Y - 26); X.rotate(bw);
    if (ding != null && ding < 2) { X.save(); X.shadowColor = '#FFE066'; X.shadowBlur = 40 * (1 - seg(ding, .5, 2)); }
    shape([[-24, 30], [-20, 10], [-14, -4], [0, -10], [14, -4], [20, 10], [24, 30]], { fill: C.gold, ...O(1.8), smooth: .35 });
    if (ding != null && ding < 2) X.restore();
    shape(rectPts(-26, 28, 52, 6), { fill: '#E0A92E', ...O(1.4), smooth: .2 }); circle(0, 36, 4, { fill: C.goldDk || '#C8961E', ...O(1.1) });
    shape([[-12, 2], [-8, -4], [-6, 16]], { fill: '#FFF4C0', stroke: null, alpha: .7 });
    X.restore();
    shape(rectPts(RAILX - 3, -BELL_Y + 6, 6, 14), { fill: C.steelDk, ...O(1) });
    const sy = -610;
    shape([[TX - 105, sy + 40], [TX - 95, sy - 8], [TX, sy - 26], [TX + 95, sy - 8], [TX + 105, sy + 40], [TX, sy + 28]], { fill: C.red, ...O(2), smooth: .3 });
    text('RING THE BELL!', TX, sy + 6, 25, C.gold, { font: FONT_SFX, weight: 400, outline: 5 });
    line([[TX - 60, sy + 34], [TX - 46, -505]], { stroke: C.ink, lwPx: 1.4 }); line([[TX + 60, sy + 34], [TX + 46, -505]], { stroke: C.ink, lwPx: 1.4 });
    // the puck on its rail
    const py = st.puck ?? 40;
    shape(rectPts(RAILX - 13, -py - 16, 26, 16), { fill: '#3F6FD0', ...O(1.6), smooth: .25 }); line([[RAILX - 8, -py - 12], [RAILX + 2, -py - 12]], { stroke: '#FFFFFF', lwPx: 2, alpha: .7 });
    // the base and the strike pad
    shape(rectPts(TX - 70, -40, 140, 40), { fill: C.red, ...O(1.8) });
    for (let i = 0; i < 5; i++) shape(rectPts(TX - 62 + i * 28, -40, 14, 40), { fill: '#FFFDF6', stroke: null, alpha: .85 });
    shape(rectPts(TX - 70, -40, 140, 40), { fill: null, ...O(1.8) });
    const dip = 7 * (st.padKick || 0);
    shape(rectPts(PADX - 6, -PAD_Y + dip, 12, PAD_Y - dip), { fill: C.steelDk, ...O(1.3) });
    line([[PADX, -PAD_Y + dip], [TX - 70, -18]], { stroke: C.ink, lwPx: 5 }); line([[PADX, -PAD_Y + dip], [TX - 70, -18]], { stroke: C.steel, lwPx: 3 });
    shape(ellPts(PADX, -PAD_Y + dip, 22, 7, 20), { fill: C.red, ...O(1.6), smooth: true }); shape(ellPts(PADX, -PAD_Y + dip - 1, 10, 3, 16), { fill: '#FFFDF6', stroke: null, smooth: true });
    shape(rectPts(TX - 40, -34, 80, 22), { fill: C.cream, ...O(1.2), smooth: .2 }); text('STRIKE!', TX, -23, 14, C.redDk, { font: FONT_SFX, weight: 400 });
  }
  function prizeTable(t, st) {
    // the big sign on two posts
    for (const sd of [-1, 1]) shape(rectPts(DX + sd * 98 - 4, -330, 8, 330), { fill: C.wood, ...O(1.3) });
    shape(rectPts(DX - 125, -345, 250, 128), { fill: C.cream, stroke: C.ink, lwPx: 2.2, smooth: .08 });
    shape(rectPts(DX - 118, -338, 236, 48), { fill: C.red, ...O(1.4), smooth: .1 });
    text('GRAND PRIZE', DX, -313, 32, C.gold, { font: FONT_SFX, weight: 400, outline: 6 });
    text('FROZEN TURKEY', DX, -262, 27, '#3F7FB8', { font: FONT_SFX, weight: 400, outline: 5, outlineCol: '#FFFFFF' });
    for (const sd of [-1, 1]) shape(starPts(DX + sd * 104, -262, 10, .3, 6, t * .5), { fill: '#9ED3F0', ...O(1) });
    if (st.taken) { X.save(); X.translate(DX + 70, -234); X.rotate(-.18 + .03 * Math.sin(t * 3)); shape(rectPts(-46, -14, 92, 28), { fill: C.gold, ...O(1.6), smooth: .2 }); text('WON!', 0, 1, 22, C.redDk, { font: FONT_SFX, weight: 400 }); X.restore(); }
    // the table, the tray of ice
    shape(rectPts(DX - 85, -78, 170, 78), { fill: '#4A8FE0', ...O(1.6) });
    for (let i = 0; i < 7; i++) shape(rectPts(DX - 85 + i * 24.3, -78, 12, 78), { fill: '#FFFFFF', stroke: null, alpha: .35 });
    shape(rectPts(DX - 92, -84, 184, 10), { fill: C.steel, ...O(1.4) });
    for (let i = 0; i < 13; i++) { const cx = DX - 78 + i * 13 + 3 * Math.sin(i * 5), cy = -90 - 5 * Math.abs(Math.sin(i * 2.3)), a = hash(i * 1.1) - .5;
      X.save(); X.translate(cx, cy); X.rotate(a); shape(rectPts(-7, -7, 14, 14), { fill: '#DFF2FB', stroke: '#7EA8C6', lwPx: 1.1, smooth: .2, alpha: .95 }); line([[-4, -4], [1, -4]], { stroke: '#FFFFFF', lwPx: 1.6 }); X.restore(); }
    if (!st.taken) turkey(DX, -92, 1.3, t, { mist: 1 });
    else for (let i = 0; i < 3; i++) { const u = frac(t * .3 + i / 3); shape(ellPts(DX - 30 + i * 30, -100 - 26 * u, 14 + 10 * u, 6, 14), { fill: '#F4FBFF', stroke: null, alpha: .3 * Math.sin(Math.PI * u), smooth: true }); }
  }
  function board(P, st) {                                          // the cornhole board, slanted toward the stack of pumpkins
    const [x0, x1] = BOARD, Z = LANE_Z, y0 = 12, y1 = 52, at = (u, v, lift = 0) => P.p(lerp(x0, x1, u), lerp(y0, y1, u) + lift, Z + v);
    P.plane(Z + 38, () => { shape(rectPts(x1 - 8, -y1, 7, y1), { fill: C.woodDk, ...O(1.2) }); });
    const q = (u0, u1, v0, v1) => [at(u0, v0), at(u1, v0), at(u1, v1), at(u0, v1)];
    shape(q(0, 1, -38, 38), { fill: C.gold, ...O(1.8) });
    shape(q(0, 1, -12, 12), { fill: C.orange, stroke: null });
    shape(q(.06, .94, -34, 34), { fill: null, stroke: '#FFFDF6', lwPx: 1.4, dash: [6, 5] });
    const hole = []; const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L, cx = lerp(x0, x1, HOLE), cy = lerp(y0, y1, HOLE);
    for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; hole.push(P.p(cx + Math.cos(a) * 15 * ux, cy + Math.cos(a) * 15 * uy, Z + Math.sin(a) * 15)); }
    shape(hole, { fill: '#2B1E22', ...O(1.6), smooth: true });
    P.plane(Z - 38, () => {
      shape([[x0, 0], [x0, -y0], [x1, -y1], [x1, -y1 + 12], [x0 + 14, -2]], { fill: C.red, ...O(1.6) });
      shape(rectPts(x1 - 8, -y1 + 10, 7, y1 - 10), { fill: C.woodDk, ...O(1.2) });
      text('TOSS!', lerp(x0, x1, .55), -lerp(y0, y1, .55) + 8, 12, '#FFFDF6', { font: FONT_SFX, weight: 400 });
    });
    return { hole: [cx, cy] };
  }

  // ---------- the new games: depth-sorted items ----------
  function dress(P, t, st = {}) {
    const L = [], add = (z, draw) => L.push({ z, draw: () => { if (P.depth(z) > 40) P.plane(z, draw); } });
    // bean bag toss: the board, the stack of pumpkins (the top one can be knocked off), a hay bale
    L.push({ z: LANE_Z, draw: () => { if (P.depth(LANE_Z - 40) > 40) board(P, st); } });
    add(LANE_Z + 70, () => {
      hay(STACK, 120, 44);
      pumpkinAt(STACK - 26, 44, 24, 0); pumpkinAt(STACK + 26, 44, 24, .05, C.orangeLt);
      const k = st.knock;                                           // the top pumpkin: sits, or tumbles off to the right and rolls away
      if (k == null) pumpkinAt(STACK, 84, 22, 0);
      else { const fall = seg(k, 0, .45), roll = seg(k, .45, 2.2), x = STACK + 70 * fall + 120 * easeOut(roll), y = fall < 1 ? lerp(84, 0, easeIn(fall)) + 30 * Math.sin(Math.PI * fall) * .5 : 14 * Math.abs(Math.sin(Math.PI * 2 * roll)) * (1 - roll);
        pumpkinAt(x, y, 22, 3.5 * fall + 6 * easeOut(roll)); }
    });
    // high striker: the tower, the prize table and its sign
    add(LANE_Z + 10, () => tower(t, st));
    add(LANE_Z + 30, () => prizeTable(t, st));
    // the prizes the kids set down while they swing (on a crate by the mark)
    if (st.pile) add(LANE_Z + 60, () => {
      const x = HX - 200; shape(rectPts(x - 46, -26, 92, 26), { fill: C.wood, ...O(1.4) }); line([[x - 46, -13], [x + 46, -13]], { stroke: C.woodDk, lwPx: 1.2 });
      FF.prize('robot', x - 26, -26, 2.2, t); FF.prize('dragon', x + 2, -26, 2, t); FF.prize('giraffe', x + 30, -26, 2.2, t);
      FF.prize('sword', x + 44, -16, 1.9, t, { ang: .5, glow: .55 + .25 * Math.sin(t * 3) });
    });
    return L;
  }

  function title(t, t0, t1) {
    const k = backOut(seg(t, t0, t0 + .45)) * (1 - easeIn(seg(t, t1 - .35, t1))); if (k <= 0) return;
    overlay(() => {
      X.save(); X.translate(W / 2, 250); X.rotate(-.03); X.scale(k, k);
      text('THE FALL FESTIVAL', 0, 0, 150, C.orange, { font: FONT_SFX, weight: 400, outline: 26, outlineCol: C.ink });
      text('THE FALL FESTIVAL', 0, 0, 150, C.orange, { font: FONT_SFX, weight: 400, outline: 8, outlineCol: C.cream });
      shape(rectPts(-350, 96, 700, 72), { fill: C.cream, stroke: C.ink, lwPx: 6, smooth: .15 });
      text('Part 2 · The Turkey Prize', 0, 134, 44, C.redDk, { weight: 700 });
      X.restore();
    });
  }

  return { LANE_Z, BX, HX, BOARD, HOLE, STACK, POPX, POPZ, PADX, PAD_Y, TX, RAILX, BELL_Y, DX, RUNGS, turkey, bag, mallet, popcorn, confetti, rain, dress, title, board };
})();
