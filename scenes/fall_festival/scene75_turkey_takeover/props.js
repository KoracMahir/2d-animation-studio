// scenes/fall_festival/scene75_turkey_takeover/props.js: the kitchen props of "Turkey Takeover". Every prop is drawn at screen
// (x, y) = its floor/base point with kpx = px per WORLD unit (so props sit in the set at s = P.k(Z)), and is a pure function of t.
//   turkey     the bird through every state: burnt + band-aid (the lead-in), FROZEN (ice), raw, stuffed, trussed, basted, golden
//   oven       the big stainless show oven: door (0 shut … 1 open), window glow, the dial
//   board · knife · veg · pan · pot · bowl · spices · sink · baster · onion · holo (Roudaynah's projected recipe) · dial · judgesDesk
Object.assign(TT, (() => {
  const { C, sparkle, twinkles, steam, txt } = TT;
  const INK = C.ink;

  // ---------- THE TURKEY ----------
  // o: roast 0 raw … 1 golden · stuff 0..1 (stuffing in the cavity) · truss 0..1 · gloss 0..1 (basted) · ice 0..1 (frozen)
  //    frills (paper frills on the drumsticks) · burnt · bandaid · steam · shine (sparkles) · platter (default true) · rot · sq · size
  function turkeyOwn(x, y, kpx, o = {}) {
    const t = o.t ?? T, s = kpx * 4.6 * (o.size ?? 1), roast = o.roast ?? 0, ice = o.ice ?? 0, burnt = o.burnt ?? 0, gloss = o.gloss ?? 0;
    const lw = Math.max(2, 3.4 * Math.min(2, kpx));
    X.save(); X.translate(x, y); X.rotate(o.rot || 0); X.scale(s * (1 + (o.sq || 0)), s * (1 - (o.sq || 0)));
    const LW = lw / s;
    // platter + garnish
    if (o.platter !== false) {
      ellipse(0, -.2, 11.8, 2.9, { fill: '#9AA6B6', stroke: INK, lw: LW });
      ellipse(0, -.6, 10.6, 2.4, { fill: linGrad(0, -3, 0, 1.8, [[0, '#FFFFFF'], [1, '#C9D3DE']]), stroke: INK, lw: LW * .8 });
      if ((o.garnish ?? roast) > .6) for (let i = 0; i < 9; i++) { const a = Math.PI * (.05 + .9 * i / 8), gx = Math.cos(a) * 9.4, gy = -.6 + Math.sin(a) * 1.7;
        i % 3 === 1 ? circle(gx, gy, .9, { fill: '#FF8A2B', stroke: INK, lw: LW * .6 }) : ellipse(gx, gy, 1.3, .7, { fill: '#5FA040', stroke: INK, lw: LW * .6, rot: a }); }
    }
    let skin = mixCol('#F6CDBE', '#D88A30', roast), dark = mixCol('#E3A593', '#9A4E17', roast), lite = mixCol('#FFE6DA', '#FFC870', roast);
    skin = mixCol(skin, '#2A2024', burnt); dark = mixCol(dark, '#120C10', burnt); lite = mixCol(lite, '#4A3A40', burnt);
    skin = mixCol(skin, '#BDEBFF', ice * .85); dark = mixCol(dark, '#5AAED8', ice * .85); lite = mixCol(lite, '#F2FCFF', ice * .85);
    // wings tucked behind
    for (const sd of [-1, 1]) shape([[sd * 5.6, -3.0], [sd * 8.3, -4.6], [sd * 8.0, -6.6], [sd * 6.0, -6.4]], { fill: dark, stroke: INK, lw: LW, smooth: .6 });
    // the body
    const body = [[-7, -1.2], [-7.7, -3.8], [-6.5, -6.6], [-3.7, -8.4], [0, -8.9], [3.7, -8.4], [6.5, -6.6], [7.7, -3.8], [7, -1.2], [3.4, -.5], [-3.4, -.5]];
    shape(body, { fill: linGrad(0, -9, 0, -.5, [[0, lite], [.45, skin], [1, dark]]), stroke: INK, lw: LW * 1.1, smooth: .55 });
    // roast texture / goosebumps
    withBoil(0, () => { for (let i = 0; i < 14; i++) { const px = (hash(i * 3.7) * 2 - 1) * 5.5, py = -2.5 - hash(i * 5.1) * 5.4;
      circle(px, py, .22, { fill: rgba(burnt > .5 ? '#000000' : roast > .5 ? '#7A3A0A' : '#D99A8A', .45), stroke: null }); } });
    // the gloss (basting) and its highlight
    ellipse(-2.6, -6.5, 3.0, 1.2, { fill: rgba('#FFFFFF', .22 + .5 * gloss + .25 * ice), stroke: null, rot: -.32 });
    if (gloss > .05) { ellipse(2.8, -7.1, 1.2, .5, { fill: rgba('#FFFFFF', .6 * gloss), stroke: null, rot: .3 }); ellipse(-4.9, -4.3, .7, 1.4, { fill: rgba('#FFFFFF', .35 * gloss), stroke: null, rot: .2 }); }
    // the stuffing in the cavity, between the drumsticks
    const st = o.stuff ?? 0;
    if (st > .02) {
      const h = 2.6 * st;
      shape([[-3.2, -1.0], [-3.4, -1.2 - h * .6], [-2.2, -1.2 - h], [-.8, -1.6 - h * 1.1], [.8, -1.4 - h * 1.15], [2.3, -1.2 - h], [3.4, -1.2 - h * .55], [3.2, -1.0]], { fill: '#C9984F', stroke: INK, lw: LW * .9, smooth: .7 });
      for (let i = 0; i < 12; i++) { const px = (hash(i * 2.3) * 2 - 1) * 2.6, py = -1.4 - hash(i * 4.1) * h * .9;
        i % 4 === 0 ? circle(px, py, .32, { fill: '#C3222F', stroke: null }) : i % 2 ? ellipse(px, py, .4, .18, { fill: '#5FA040', stroke: null, rot: i }) : shape(rectPts(px - .35, py - .3, .7, .6), { fill: '#E7C27D', stroke: rgba(INK, .5), lw: LW * .4 }); }
    }
    // the drumsticks (frills on the bone ends)
    for (const sd of [-1, 1]) {
      const leg = [[sd * 3.6, -1.4], [sd * 5.9, -1.6], [sd * 7.9, -4.0], [sd * 8.3, -6.0], [sd * 7.2, -6.8], [sd * 5.6, -5.4], [sd * 3.9, -3.4]];
      shape(leg, { fill: linGrad(0, -7, 0, -1, [[0, lite], [.5, skin], [1, dark]]), stroke: INK, lw: LW, smooth: .55 });
      ellipse(sd * 6.3, -4.6, .9, .4, { fill: rgba('#FFFFFF', .25 + .45 * gloss), stroke: null, rot: sd * -.8 });
      const bx = sd * 8.5, by = -7.4;
      shape([[sd * 7.4, -6.4], [bx, by], [bx + sd * .4, by - .6], [bx + sd * .9, by - .1], [sd * 8.0, -6.2]], { fill: mixCol('#FFF8EE', '#9FD8F0', ice), stroke: INK, lw: LW * .8, smooth: .4 });
      const fr = o.frills ?? 0;
      if (fr > .02) { X.save(); X.translate(bx + sd * .35, by - .2); X.rotate(sd * .7); X.scale(fr, fr);
        shape([[-.9, .6], [-1.0, -.6], [-.6, -1.4], [-.3, -.7], [0, -1.6], [.3, -.7], [.6, -1.4], [1.0, -.6], [.9, .6]], { fill: '#FFFFFF', stroke: INK, lw: LW * .8 });
        line([[-.9, .1], [.9, .1]], { stroke: C.tvRed, lw: .25 }); X.restore(); }
    }
    // the truss: kitchen string looping both drumsticks
    const tr = o.truss ?? 0;
    if (tr > .02) {
      const pts = [[-7.4, -5.9], [-4, -4.9 + .6 * (1 - tr)], [0, -4.7], [4, -4.9 + .6 * (1 - tr)], [7.4, -5.9]];
      X.save(); X.globalAlpha = clamp(tr * 1.5); line(pts, { stroke: INK, lw: .5, smooth: true }); line(pts, { stroke: '#FFFFFF', lw: .3, smooth: true, dash: [.5, .4] }); line(pts, { stroke: C.tvRed, lw: .3, smooth: true, dash: [.4, .5] });
      for (const sd of [-1, 1]) ellipse(sd * 7.5, -6.0, .7, .4, { fill: null, stroke: '#FFFFFF', lw: .25, rot: sd * .7 }); X.restore();
    }
    // FROZEN: a block of ice, frost, icicles
    if (ice > .02) {
      X.save(); X.globalAlpha = ice;
      shape([[-9.6, -.6], [-10.2, -6], [-8.6, -10.6], [-2, -11.6], [5, -11.2], [9.8, -9.4], [10.4, -4], [9.6, -.6]], { fill: 'rgba(200,240,255,.36)', stroke: '#E8FBFF', lw: LW * 1.2, smooth: .25 });
      line([[-7.6, -9.6], [-4.4, -10.6]], { stroke: 'rgba(255,255,255,.85)', lw: .35 }); line([[6.4, -9.8], [8.8, -7.4]], { stroke: 'rgba(255,255,255,.85)', lw: .35 });
      for (let i = 0; i < 9; i++) { const ix = -6 + i * 1.5, iy = -1.0 - .3 * Math.sin(i), L = .9 + 1.0 * hash(i * 3); shape([[ix - .35, iy], [ix + .35, iy], [ix, iy + L]], { fill: '#E8FBFF', stroke: '#7FC8E8', lw: LW * .5 }); }
      for (let i = 0; i < 16; i++) { const px = (hash(i * 9.1) * 2 - 1) * 8, py = -1.5 - hash(i * 4.4) * 9; sparkle(px, py, .5 + .5 * Math.abs(Math.sin(t * 5 + i)), '#FFFFFF', i, .9); }
      X.restore();
    }
    // burnt + band-aid (the lead-in's ruined bird)
    if (burnt > .02) {
      X.save(); X.globalAlpha = burnt;
      for (let i = 0; i < 6; i++) ellipse((hash(i) * 2 - 1) * 5, -3 - hash(i * 3) * 5, 1.1, .6, { fill: 'rgba(0,0,0,.45)', stroke: null, rot: i });
      if (o.bandaid) { X.save(); X.translate(1.6, -6.3); X.rotate(-.5);
        shape(rectPts(-2.4, -.7, 4.8, 1.4), { fill: '#F3C49A', stroke: INK, lw: LW * .8, smooth: .45 }); shape(rectPts(-.8, -.6, 1.6, 1.2), { fill: '#E2A878', stroke: null });
        for (let i = 0; i < 4; i++) circle(-1.7 + (i % 2) * .35 + (i > 1 ? 3.0 : 0), -.2 + (i % 2) * .4, .09, { fill: '#B07A50', stroke: null }); X.restore(); }
      X.restore();
    }
    X.restore();
    if ((o.steam ?? 0) > .02) steam(t, x, y - 9 * s, 10 * s, 14 * s, o.steam, 5);
    if ((o.smoke ?? 0) > .02) { for (let i = 0; i < 5; i++) { const u = frac(t * .4 + i / 5); circle(x + (i - 2) * 2.2 * s + Math.sin(t * 2 + i) * s, y - (9 + 12 * u) * s, (1.4 + 2.2 * u) * s, { fill: rgba('#4A4048', .5 * (1 - u) * o.smoke), stroke: null }); } }
    if ((o.shine ?? 0) > .02) twinkles(t, x, y - 5 * s, 11 * s, 16, 7, ['#FFFFFF', C.gold, '#FFF3A8'], 2.4 * s * o.shine);
    return { top: [x, y - 9 * s], center: [x, y - 4.5 * s], s };
  }

  // The series' turkey kit (TKY, locations/family_kitchen/turkey.js) draws the frozen festival prize, the band-aided cover-up
  // and the perfect golden bird, so the bird looks the same in every Fall Festival scene. turkeyOwn() above draws only the
  // in-between kitchen states the kit has no look for (raw → stuffed → trussed → basted); a thaw crossfades kit → own.
  const KSC = 1.45;                                   // kit scale: the kit's bird at the same screen size as turkeyOwn's
  function turkey(x, y, kpx, o = {}) {
    const t = o.t ?? T, ice = o.ice ?? 0, s = kpx * TKY.WORLD * KSC * (o.size ?? 1);
    const kit = (state, extra = {}) => {
      let rx = x, ry = y;
      if (o.platter !== false && !extra.noPlatter) [rx, ry] = TKY.platter(x, y, s, { garnish: state === 'golden', t, alpha: extra.alpha }).top;
      else if (o.platter !== false) ry = y - 5 * s;
      const A = TKY.turkey(rx, ry, s, { state, t, rot: o.rot, squash: -(o.sq || 0), steam: o.steam, sparkle: o.shine, smoke: o.smoke, wrap: o.wrap, wear: o.wear, ...extra });
      return { top: A.top, center: A.centre, s: kpx * 4.6 * (o.size ?? 1) };
    };
    if ((o.burnt ?? 0) > .5) return kit('fixed', { wear: o.wear ?? .3 });
    if (ice >= .99) return kit('frozen');
    if ((o.roast ?? 0) >= .9) return kit('golden', { steam: o.steam ?? .6, sparkle: o.shine ?? 0 });
    const r = turkeyOwn(x, y, kpx, { ...o, ice: 0 });
    if (ice > .01) kit('frozen', { wrap: false, alpha: ice, noPlatter: true });
    return r;
  }

  // ---------- THE OVEN ----------
  // (x, y) = bottom centre; about 150 world units wide and 160 tall. door 0 shut … 1 open (drops down), glow 0..1, temp label.
  function oven(x, y, kpx, o = {}) {
    const t = o.t ?? T, s = kpx, w = 150 * s, h = 160 * s, door = clamp(o.door ?? 0), glow = o.glow ?? .5, lw = Math.max(2, 3.5 * Math.min(2, kpx));
    const x0 = x - w / 2, y0 = y - h;
    shape(rectPts(x0, y0, w, h), { fill: linGrad(x0, 0, x0 + w, 0, [[0, '#7C899B'], [.25, '#E6ECF3'], [.6, '#AEB9C7'], [1, '#6F7D8F']]), stroke: INK, lwPx: lw, smooth: .04 });
    // control strip, dial and the digital readout
    shape(rectPts(x0 + 8 * s, y0 + 8 * s, w - 16 * s, 30 * s), { fill: '#1A1430', stroke: INK, lwPx: lw * .7 });
    dial(x0 + 28 * s, y0 + 23 * s, 11 * s, o.dial ?? .7, t);
    txt(o.temp ?? '350°', x0 + w - 22 * s, y0 + 24 * s, 20 * s, '#FF5A3A', { align: 'right', font: '"Courier New", monospace', weight: 700, glow: '#FF5A3A', blur: 10 * s });
    // the oven cavity (seen when the door opens) with its glow
    const cx0 = x0 + 12 * s, cy0 = y0 + 48 * s, cw = w - 24 * s, ch = h - 62 * s;
    shape(rectPts(cx0, cy0, cw, ch), { fill: radGrad(x, cy0 + ch * .55, 0, cw * .8, [[0, mixCol('#3A1A10', '#FFE08A', glow)], [.6, mixCol('#2A1010', '#FF8A2B', glow)], [1, '#1A0A0A']]), stroke: INK, lwPx: lw * .8 });
    for (let i = 0; i < 2; i++) line([[cx0 + 6 * s, cy0 + ch * (.45 + i * .3)], [cx0 + cw - 6 * s, cy0 + ch * (.45 + i * .3)]], { stroke: mixCol('#444', '#FFB060', glow), lwPx: lw * .6 });
    if (o.inside) o.inside(x, cy0 + ch * .78, s);
    // the door, hinged at the bottom: shut it covers the cavity; it swings down toward the camera
    if (door < .98) {
      const dh = ch * Math.cos(door * Math.PI / 2), dy = cy0 + ch - dh;
      shape(rectPts(cx0 - 4 * s, dy, cw + 8 * s, dh + 2 * s), { fill: linGrad(0, dy, 0, dy + dh, [[0, '#DDE5EE'], [1, '#8E9AAA']]), stroke: INK, lwPx: lw * .9, smooth: .04 });
      if (dh > 20 * s) {
        const wx = cx0 + 16 * s, wy = dy + dh * .22, ww = cw - 32 * s, wh = dh * .56;
        shape(rectPts(wx, wy, ww, wh), { fill: radGrad(x, wy + wh / 2, 0, ww * .7, [[0, mixCol('#2A1A20', '#FFC86B', glow)], [1, mixCol('#120A10', '#B8461A', glow)]]), stroke: INK, lwPx: lw * .7 });
        line([[wx + ww * .1, wy + wh * .2], [wx + ww * .3, wy + wh * .1]], { stroke: 'rgba(255,255,255,.5)', lwPx: lw * .8 });
        if (o.window) { X.save(); X.beginPath(); X.rect(wx, wy, ww, wh); X.clip(); o.window(x, wy + wh * .92, s); X.restore(); }
        shape(rectPts(cx0 + 20 * s, dy + 6 * s, cw - 40 * s, 7 * s), { fill: '#3B3550', stroke: INK, lwPx: lw * .6, smooth: .5 });
      }
    } else {
      shape(rectPts(cx0 - 4 * s, cy0 + ch, cw + 8 * s, 16 * s), { fill: '#8E9AAA', stroke: INK, lwPx: lw * .8 });
    }
    // feet
    for (const sd of [-1, 1]) shape(rectPts(x + sd * (w / 2 - 16 * s) - 8 * s, y - 2 * s, 16 * s, 6 * s), { fill: '#2B2440', stroke: null });
    return { door: [x, cy0 + ch], cavity: [x, cy0 + ch * .6], top: [x, y0], w, h };
  }
  // An oven dial: v 0..1 turns it from OFF to MAX; a little 350 marker at .7.
  function dial(x, y, r, v, t) {
    circle(x, y, r, { fill: '#E6ECF3', stroke: INK, lwPx: Math.max(2, r * .12) });
    for (let i = 0; i <= 10; i++) { const a = Math.PI * (.75 + 1.5 * i / 10); line([[x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78], [x + Math.cos(a) * r * .95, y + Math.sin(a) * r * .95]], { stroke: i === 7 ? C.tvRed : INK, lwPx: Math.max(1, r * (i === 7 ? .12 : .06)) }); }
    const a = Math.PI * (.75 + 1.5 * clamp(v));
    shape([[x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8], [x + Math.cos(a + 2.4) * r * .25, y + Math.sin(a + 2.4) * r * .25], [x + Math.cos(a - 2.4) * r * .25, y + Math.sin(a - 2.4) * r * .25]], { fill: C.tvRed, stroke: INK, lwPx: Math.max(1, r * .06) });
    circle(x, y, r * .2, { fill: '#2B2440', stroke: null });
  }

  // ---------- small props (screen px at kpx = px per world unit) ----------
  function board(x, y, kpx) { const s = kpx; shape(rectPts(x - 42 * s, y - 6 * s, 84 * s, 7 * s), { fill: '#C98A4B', stroke: INK, lwPx: Math.max(2, 3 * s) , smooth: .2 }); shape(rectPts(x - 42 * s, y - 6 * s, 84 * s, 2.5 * s), { fill: '#E2A866', stroke: null }); }
  function knife(x, y, kpx, ang = 0, blur = 0) {
    const s = kpx;
    X.save(); X.translate(x, y); X.rotate(ang);
    if (blur > .05) for (let i = 1; i <= 4; i++) { X.save(); X.rotate(-i * .18 * blur); X.globalAlpha = .18; shape([[0, -2 * s], [34 * s, -3 * s], [40 * s, 0], [0, 3 * s]], { fill: '#FFFFFF', stroke: null }); X.restore(); }
    shape(rectPts(-14 * s, -2.6 * s, 14 * s, 5.2 * s), { fill: '#3B2530', stroke: INK, lwPx: 2, smooth: .3 });
    shape([[0, -3 * s], [30 * s, -3.4 * s], [38 * s, 0], [30 * s, 3 * s], [0, 3 * s]], { fill: linGrad(0, -3 * s, 0, 3 * s, [[0, '#FFFFFF'], [1, '#9AA6B6']]), stroke: INK, lwPx: 2 });
    X.restore();
  }
  // Chopped vegetables: n pieces flying up from (x, y) on each chop (age since the chop).
  function veg(t, x, y, kpx, age, n = 8, seed = 0) {
    if (age < 0 || age > 1) return;
    const s = kpx;
    for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (hash(i + seed) - .5) * 2.2, v = (60 + 80 * hash(i * 3 + seed)) * s, px = x + Math.cos(a) * v * age, py = y + Math.sin(a) * v * age + 180 * s * age * age;
      const col = ['#5FA040', '#FF8A2B', '#F5E6A8', '#8BD06A'][(i + seed) % 4]; X.save(); X.translate(px, py); X.rotate(age * 9 + i); shape(rectPts(-3 * s, -3 * s, 6 * s, 6 * s), { fill: col, stroke: INK, lwPx: 1.5, alpha: 1 - seg(age, .7, 1) }); X.restore(); }
  }
  // A frying pan, handle to the right; flambé 0..1 fires a column of flame out of it.
  function pan(t, x, y, kpx, o = {}) {
    const s = kpx, tip = o.tip ?? 0;
    X.save(); X.translate(x, y); X.rotate(tip);
    line([[24 * s, -3 * s], [62 * s, -9 * s]], { stroke: INK, lwPx: 10 * s + 3 }); line([[24 * s, -3 * s], [62 * s, -9 * s]], { stroke: '#3B2530', lwPx: 8 * s });
    ellipse(0, 0, 28 * s, 8 * s, { fill: '#2B2440', stroke: INK, lwPx: Math.max(2, 3 * s) });
    ellipse(0, -1.5 * s, 23 * s, 5.5 * s, { fill: '#4A4060', stroke: null });
    for (let i = 0; i < 6; i++) { const u = frac(t * 3 + i * .17); circle((hash(i) * 2 - 1) * 16 * s, -2 * s - u * 10 * s, 2 * s * (1 - u), { fill: '#FFE08A', stroke: null }); }
    X.restore();
    if ((o.flambe ?? 0) > .02) TT.flameJet(t, x, y - 4 * s, 170 * s * o.flambe, 1, 46 * s);
  }
  // A stock pot with a spoon; stir = phase in turns.
  function pot(t, x, y, kpx, stir = 0, o = {}) {
    const s = kpx, a = stir * TAU;
    shape(rectPts(x - 34 * s, y - 46 * s, 68 * s, 46 * s), { fill: linGrad(x - 34 * s, 0, x + 34 * s, 0, [[0, '#6F7D8F'], [.4, '#E6ECF3'], [1, '#6F7D8F']]), stroke: INK, lwPx: Math.max(2, 3 * s), smooth: .1 });
    ellipse(x, y - 46 * s, 34 * s, 9 * s, { fill: o.soup ?? '#E7B460', stroke: INK, lwPx: Math.max(2, 3 * s) });
    for (let i = 0; i < 3; i++) { const r = (8 + i * 9) * s; X.save(); X.beginPath(); X.ellipse(x, y - 46 * s, r, r * .26, 0, a + i, a + i + 2.4); X.strokeStyle = 'rgba(255,255,255,.55)'; X.lineWidth = 3; X.stroke(); X.restore(); }
    const sx = x + Math.cos(a) * 18 * s, sy = y - 46 * s + Math.sin(a) * 4.5 * s;
    line([[sx, sy], [sx + 18 * s, sy - 58 * s]], { stroke: INK, lwPx: 7 * s + 3 }); line([[sx, sy], [sx + 18 * s, sy - 58 * s]], { stroke: '#C98A4B', lwPx: 6 * s });
    for (const sd of [-1, 1]) line([[x + sd * 34 * s, y - 38 * s], [x + sd * 42 * s, y - 40 * s]], { stroke: INK, lwPx: 5 * s + 2 });
    if (o.steam !== false) steam(t, x, y - 50 * s, 50 * s, 70 * s, .8, 3);
    return { spoon: [sx + 18 * s, sy - 58 * s] };
  }
  // A mixing bowl of stuffing (fill 0..1), with bread cubes dropping in on `drop` (age since a toss).
  function bowl(t, x, y, kpx, fill = 1, drop = -1) {
    const s = kpx;
    shape([[x - 40 * s, y - 34 * s], [x + 40 * s, y - 34 * s], [x + 30 * s, y - 4 * s], [x + 14 * s, y], [x - 14 * s, y], [x - 30 * s, y - 4 * s]], { fill: linGrad(0, y - 34 * s, 0, y, [[0, '#FF8AC4'], [1, '#C0249A']]), stroke: INK, lwPx: Math.max(2, 3 * s), smooth: .4 });
    ellipse(x, y - 34 * s, 40 * s, 9 * s, { fill: '#7A1D6A', stroke: INK, lwPx: Math.max(2, 3 * s) });
    if (fill > .02) { ellipse(x, y - 34 * s - 3 * s * fill, 34 * s, 7 * s, { fill: '#D9A65A', stroke: null });
      for (let i = 0; i < 14; i++) { const px = x + (hash(i) * 2 - 1) * 28 * s, py = y - 36 * s - hash(i * 3) * 6 * s * fill; i % 3 ? shape(rectPts(px - 3 * s, py - 3 * s, 6 * s, 6 * s), { fill: '#EBC782', stroke: INK, lwPx: 1.2 }) : circle(px, py, 2 * s, { fill: '#5FA040', stroke: null }); } }
    if (drop >= 0 && drop < .6) for (let i = 0; i < 6; i++) { const u = drop / .6, px = x + (hash(i * 7) * 2 - 1) * 20 * s, py = lerp(y - 110 * s, y - 38 * s, u * u) - hash(i) * 20 * s;
      shape(rectPts(px - 3.5 * s, py - 3.5 * s, 7 * s, 7 * s), { fill: '#EBC782', stroke: INK, lwPx: 1.5 }); }
  }
  // Spice jars in a row; the shaken one sprays a sparkle cloud.
  function spices(t, x, y, kpx, n = 4) {
    const s = kpx, cols = ['#FF5A3A', '#FFD23F', '#5FA040', '#B98CFF', '#FF8A2B'];
    for (let i = 0; i < n; i++) { const jx = x + (i - (n - 1) / 2) * 20 * s;
      shape(rectPts(jx - 7 * s, y - 22 * s, 14 * s, 22 * s), { fill: rgba('#FFFFFF', .6), stroke: INK, lwPx: 2, smooth: .2 }); shape(rectPts(jx - 6 * s, y - 14 * s, 12 * s, 13 * s), { fill: cols[i % 5], stroke: null });
      shape(rectPts(jx - 7.5 * s, y - 27 * s, 15 * s, 6 * s), { fill: '#3B2530', stroke: INK, lwPx: 1.5 }); }
  }
  function shaker(t, x, y, kpx, ang = 0, col = '#FF5A3A') {
    const s = kpx; X.save(); X.translate(x, y); X.rotate(ang);
    shape(rectPts(-8 * s, -26 * s, 16 * s, 26 * s), { fill: rgba('#FFFFFF', .8), stroke: INK, lwPx: 2, smooth: .2 }); shape(rectPts(-7 * s, -16 * s, 14 * s, 15 * s), { fill: col, stroke: null });
    shape(rectPts(-8.5 * s, -32 * s, 17 * s, 7 * s), { fill: '#C9D3DE', stroke: INK, lwPx: 1.5 }); X.restore();
  }
  // A sink with a tap: water runs; soap bubbles rise around (x, y).
  function sink(t, x, y, kpx, o = {}) {
    const s = kpx;
    shape(rectPts(x - 46 * s, y - 8 * s, 92 * s, 10 * s), { fill: '#7C899B', stroke: INK, lwPx: 2.5, smooth: .3 });
    line([[x + 30 * s, y - 8 * s], [x + 30 * s, y - 58 * s], [x + 6 * s, y - 62 * s], [x + 2 * s, y - 52 * s]], { stroke: INK, lwPx: 8 * s + 3 }); line([[x + 30 * s, y - 8 * s], [x + 30 * s, y - 58 * s], [x + 6 * s, y - 62 * s], [x + 2 * s, y - 52 * s]], { stroke: '#DDE5EE', lwPx: 6 * s });
    for (let i = 0; i < 4; i++) line([[x + 2 * s + Math.sin(t * 20 + i) * s, y - 50 * s], [x + 2 * s + (i - 1.5) * 1.5 * s, y - 8 * s]], { stroke: 'rgba(160,220,255,.8)', lwPx: 2.5 * s });
    for (let i = 0; i < (o.bubbles ?? 14); i++) { const u = frac(hash(i) + t * (.35 + .3 * hash(i * 3))), bx = x + (hash(i * 5) * 2 - 1) * 70 * s + Math.sin(t * 2 + i) * 6 * s, by = y - 20 * s - u * 170 * s, r = (4 + 7 * hash(i * 7)) * s * (o.size ?? 1);
      circle(bx, by, r, { fill: 'rgba(255,255,255,.18)', stroke: rgba('#FFFFFF', .85 * (1 - u)), lwPx: 2 }); circle(bx - r * .35, by - r * .35, r * .22, { fill: rgba('#FFFFFF', .8 * (1 - u)), stroke: null }); }
  }
  // A basting brush held at (x, y): ang tilts it; drip drops golden butter.
  function baster(t, x, y, kpx, ang = 0) {
    const s = kpx; X.save(); X.translate(x, y); X.rotate(ang);
    line([[0, 0], [0, 44 * s]], { stroke: INK, lwPx: 6 * s + 3 }); line([[0, 0], [0, 44 * s]], { stroke: '#C98A4B', lwPx: 5 * s });
    shape([[-6 * s, 44 * s], [6 * s, 44 * s], [8 * s, 62 * s], [-8 * s, 62 * s]], { fill: '#FFD23F', stroke: INK, lwPx: 2, smooth: .3 });
    X.restore();
  }
  function onion(x, y, r, rot = 0) {
    X.save(); X.translate(x, y); X.rotate(rot);
    shape([[0, -r * 1.25], [r * .55, -r * .7], [r, 0], [r * .7, r * .75], [0, r], [-r * .7, r * .75], [-r, 0], [-r * .55, -r * .7]], { fill: '#C78BD6', stroke: INK, lwPx: Math.max(2, r * .12), smooth: .8 });
    line([[0, -r * 1.1], [r * .3, r * .8]], { stroke: 'rgba(255,255,255,.45)', lwPx: Math.max(1.5, r * .08), smooth: true }); line([[0, -r * 1.1], [-r * .3, r * .8]], { stroke: 'rgba(90,30,110,.35)', lwPx: Math.max(1.5, r * .08) });
    line([[0, -r * 1.25], [r * .1, -r * 1.55]], { stroke: '#5FA040', lwPx: Math.max(2, r * .14) });
    X.restore();
  }
  // Roudaynah's projected recipe: a glowing code panel at screen (x, y), w px wide, k 0..1 (types itself out).
  const CODE = ['const turkey = thaw(frozenTurkey);', 'turkey.stuff(bread, herbs, love);', 'turkey.truss().baste(butter);', 'oven.set(350);', 'while (!turkey.golden) wait();', 'serve(turkey); // everyone helps'];
  function holo(t, x, y, w, k) {
    if (k <= .01) return;
    const h = w * .62, pop = backOut(seg(k, 0, .2));
    X.save(); X.translate(x, y); X.scale(pop, pop);
    X.save(); X.globalAlpha = .85; X.fillStyle = 'rgba(10,40,70,.82)'; X.beginPath(); X.roundRect(-w / 2, -h, w, h, 18); X.fill(); X.restore();
    X.strokeStyle = '#7FE3FF'; X.lineWidth = 4; X.shadowColor = '#7FE3FF'; X.shadowBlur = 24; X.beginPath(); X.roundRect(-w / 2, -h, w, h, 18); X.stroke(); X.shadowBlur = 0;
    txt('recipe.js', -w / 2 + 22, -h + 30, w * .045, '#9FF0C8', { font: '"Courier New", monospace', weight: 700 });
    const shown = (k - .15) / .85 * CODE.join('').length; let acc = 0;
    CODE.forEach((ln, i) => { const n = clamp(shown - acc, 0, ln.length); acc += ln.length; if (n <= 0) return;
      txt(ln.slice(0, Math.floor(n)), -w / 2 + 26, -h + 76 + i * w * .075, w * .042, i % 2 ? '#FFE08A' : '#BDF4FF', { font: '"Courier New", monospace', weight: 700, glow: '#3DB8FF', blur: 8 }); });
    if (frac(t * 2) < .5) { X.fillStyle = '#FFFFFF'; X.fillRect(w / 2 - 50, -40, 14, 26); }
    X.restore();
  }
  // The judges' desk (world units): a long gold-trimmed desk with three name plates (screen px).
  function judgesDesk(P, x, z, w = 420, plates = ['PEARL', '', '']) {
    const p = (X0, Y0, Z0) => P.p(X0, Y0, Z0), h = 62, d = 60;
    const fl = p(x - w / 2, 0, z), fr = p(x + w / 2, 0, z), tl = p(x - w / 2, h, z), tr = p(x + w / 2, h, z), bl = p(x - w / 2, h, z + d), br = p(x + w / 2, h, z + d), k = tl[2];
    shape([tl, tr, br, bl].map(q => q.slice(0, 2)), { fill: '#3A1670', stroke: INK, lwPx: 3 });
    shape([tl, tr, fr, fl].map(q => q.slice(0, 2)), { fill: linGrad(0, tl[1], 0, fl[1], [[0, '#7A1D6A'], [1, '#2A0B4E']]), stroke: INK, lwPx: 3 });
    X.fillStyle = C.gold; X.fillRect(tl[0], tl[1], tr[0] - tl[0], 10 * k); X.fillRect(fl[0], fl[1] - 10 * k, fr[0] - fl[0], 10 * k);
    txt('JUDGES', (tl[0] + tr[0]) / 2, lerp(tl[1], fl[1], .55), clamp(40 * k, 14, 80), C.gold, { align: 'center', stroke: INK, lw: clamp(7 * k, 3, 12) });
    return { top: [(tl[0] + tr[0]) / 2, tl[1]], k, tl, tr };
  }
  // A drumstick held up (the victory lap): screen px, r = size.
  function drumstick(x, y, r, rot = 0) {
    X.save(); X.translate(x, y); X.rotate(rot);
    shape([[-r * .5, 0], [-r * .7, -r * 1.1], [0, -r * 1.7], [r * .7, -r * 1.1], [r * .5, 0]], { fill: C.roast, stroke: INK, lwPx: Math.max(2, r * .1), smooth: .7 });
    shape(rectPts(-r * .14, 0, r * .28, r * .7), { fill: '#FFF8EE', stroke: INK, lwPx: Math.max(1.5, r * .07) });
    circle(-r * .14, r * .78, r * .14, { fill: '#FFF8EE', stroke: INK, lwPx: 1.5 }); circle(r * .14, r * .78, r * .14, { fill: '#FFF8EE', stroke: INK, lwPx: 1.5 });
    ellipse(-r * .25, -r * 1.05, r * .15, r * .32, { fill: 'rgba(255,255,255,.4)', stroke: null, rot: .3 });
    X.restore();
  }
  return { turkey, oven, dial, board, knife, veg, pan, pot, bowl, spices, shaker, sink, baster, onion, holo, judgesDesk, drumstick };
})());
