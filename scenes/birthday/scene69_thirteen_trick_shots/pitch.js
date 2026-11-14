// scenes/birthday/scene69_thirteen_trick_shots/pitch.js: the side-on "broadcast" stadium for the trick shots.
// The rigs always face the lens, so the action runs left → right along the screen toward a goal on the right, like a side-view
// soccer game. World: x along the pitch in cm (the goal line is x 0, the pitch runs to −x), y up in cm, d across the pitch
// (0 = the near touchline side of the action, 1 = the far side, 1 d = 1500 cm). The goal mouth spans d .26–.74.
// A camera is { x (world x at screen centre), z (px per cm at d 0), y (world height at the ground line) }.
const PITCH = (() => {
  const { C, FIRE, beatK, hop } = TT;
  const GY = 860, DROP = 120, GOAL = { d0: .26, d1: .74, h: 244, net: 190 };
  const kd = (c, d) => c.z * (1 - .3 * d);
  // world → screen: [sx, sy, k]
  const sp = (c, x, y = 0, d = .5) => { const k = kd(c, d); return [W / 2 + (x - c.x) * k, GY + DROP * (.5 - d) * c.z - (y - (c.y || 0)) * k, k]; };
  const quad = (c, x0, x1, d0, d1, fill) => { const a = sp(c, x0, 0, d0), b = sp(c, x1, 0, d0), e = sp(c, x1, 0, d1), f = sp(c, x0, 0, d1); shape([a, b, e, f], { fill, stroke: null }); };

  // fans: deterministic rows of little people in the stands, bouncing with cheer
  const SHIRTS = ['#2E5BFF', '#FFFFFF', '#FFD23F', '#FF3D9A', '#3DE8FF', '#FF8A2B', '#8CFF5A', '#B98CFF', '#E8433B'];
  const SKIN = ['#F2C9A8', '#DCA887', '#B97C5A', '#8A5A3C', '#F6D7BE'];
  function stands(c, t, o) {
    const par = .55, cx = c.x * par, k = .5 + .16 * c.z, top = sp(c, 0, 0, 1)[1] - 50 * (.6 + .3 * c.z);       // stands' front edge (above the boards)
    const rows = 7, rowH = 46 * k * 1.4;
    // the stand structure
    X.fillStyle = o.night > .5 ? '#1B1F3A' : '#3B4A6B'; X.fillRect(0, top - rows * rowH - 30 * k, W, rows * rowH + 40 * k);
    for (let r = 0; r < rows; r++) {
      const y = top - r * rowH, spacing = 38 * k * 1.4, x0 = W / 2 - ((cx * k * 1.4) % spacing) - spacing * Math.ceil(W / 2 / spacing) - spacing;
      X.fillStyle = r % 2 ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.08)'; X.fillRect(0, y - rowH, W, rowH);
      for (let x = x0, i = 0; x < W + spacing; x += spacing, i++) {
        const id = Math.round((x - x0) / spacing) + Math.round(cx * k * 1.4 / spacing) + r * 997;
        if (hash(id * 1.3) < .08) continue;                                     // a few empty seats
        const wv = o.wave !== undefined ? Math.exp(-Math.pow((x - (-300 + (t - o.wave) * 1500)) / 160, 2)) : 0;
        const ch = Math.max((o.cheer ?? .4) * (.6 + .4 * hash(id)), o.hands ?? 0, wv), jump = ch * 12 * k * hop(t, hash(id * 3)) * (hash(id * 5) > .3 ? 1 : 0) + wv * 40 * k;
        const shirt = o.blue ? (hash(id * 7) < .6 ? '#2E5BFF' : '#FFFFFF') : SHIRTS[Math.floor(hash(id * 7) * SHIRTS.length)];
        const fx = x + (hash(id * 11) - .5) * 8 * k, fy = y - jump;
        shape(rectPts(fx - 11 * k, fy - 34 * k, 22 * k, 30 * k), { fill: shirt, stroke: null });
        if (ch > .55 && (hash(id * 13) > .4 || (o.hands ?? 0) > .5 || wv > .4)) { line([[fx - 9 * k, fy - 30 * k], [fx - 14 * k, fy - 58 * k]], { stroke: shirt, lwPx: 6 * k }); line([[fx + 9 * k, fy - 30 * k], [fx + 14 * k, fy - 58 * k]], { stroke: shirt, lwPx: 6 * k }); }
        circle(fx, fy - 46 * k, 12 * k, { fill: SKIN[Math.floor(hash(id * 17) * SKIN.length)], stroke: null });
        if (hash(id * 19) > .6) shape(rectPts(fx - 10 * k, fy - 56 * k, 20 * k, 7 * k), { fill: '#2B2027', stroke: null });
        if (o.phones && hash(id * 23) > .7) { circle(fx + 12 * k, fy - 60 * k, 3 * k, { fill: '#FFFFFF', stroke: null, alpha: .6 + .4 * Math.sin(t * 6 + id) }); }
      }
    }
    // a few big banners in the crowd
    (o.banners || []).forEach(([txt, wx, col], i) => {
      const bx = W / 2 + (wx * par - cx) * k * 1.4, by = top - (2.5 + i % 2) * rowH;
      if (bx < -400 || bx > W + 400) return;
      X.save(); X.translate(bx, by + 6 * Math.sin(t * 3 + i)); X.rotate(.03 * Math.sin(t * 2 + i));
      X.fillStyle = col; X.fillRect(-150 * k * 1.4, -34 * k * 1.4, 300 * k * 1.4, 64 * k * 1.4);
      X.font = `${40 * k * 1.4}px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = '#FFFFFF'; X.fillText(txt, 0, 0); X.restore();
    });
    return top;
  }
  function boards(c, t, o) {
    const a = sp(c, -1e4, 0, 1), y = a[1], h = 46 * (.6 + .3 * c.z);
    X.fillStyle = '#0B0E1E'; X.fillRect(0, y - h, W, h);
    const msg = o.board ?? '13 TRICK SHOTS  ·  HOUSAM #10  ·  ', size = h * .62;
    X.save(); X.beginPath(); X.rect(0, y - h, W, h); X.clip();
    X.font = `${size}px ${FONT_SFX}`; X.textBaseline = 'middle'; X.textAlign = 'left';
    const wMsg = X.measureText(msg).width, off = ((c.x * c.z * .72 + t * 140) % wMsg + wMsg) % wMsg;
    const col = FIRE[Math.floor(TT.bpos(t) / 4) % FIRE.length];
    X.shadowColor = col; X.shadowBlur = 14 * beatK(t, 5);
    X.fillStyle = col; for (let x = -off; x < W; x += wMsg) X.fillText(msg, x, y - h / 2);
    X.restore();
  }
  function turf(c, t, o) {
    const far = sp(c, 0, 0, 1)[1];
    X.fillStyle = o.night > .5 ? '#2F7A3A' : '#4FA84A'; X.fillRect(0, far, W, H - far);
    const left = c.x - W / 2 / kd(c, -1.5) - 600, right = c.x + W / 2 / kd(c, -1.5) + 600;
    for (let x = Math.floor(left / 500) * 500; x < right; x += 500) if (Math.round(x / 500) % 2) quad(c, x, x + 500, -2, 1, o.night > .5 ? '#358542' : '#5BB653');
    // markings
    const L = (x0, x1, d0, d1) => line([sp(c, x0, 0, d0), sp(c, x1, 0, d1)], { stroke: 'rgba(255,255,255,.85)', lwPx: Math.max(2, 5 * c.z) });
    L(0, 0, -.2, 1.2); L(-550, -550, .13, .87); L(-550, 0, .13, .13); L(-550, 0, .87, .87);
    L(-1650, -1650, -.18, 1.18); L(-1650, 0, -.18, -.18); L(-1650, 0, 1.18, 1.18);
    L(-4500, -4500, -2, 1.3);
    const ps = sp(c, -1100, 0, .5); ellipse(ps[0], ps[1], 7 * ps[2], 4 * ps[2], { fill: 'rgba(255,255,255,.85)', stroke: null });
    // the arc of the D
    const arc = []; for (let i = 0; i <= 20; i++) { const a = -.9 + 1.8 * i / 20; arc.push(sp(c, -1100 - 915 * Math.cos(a), 0, .5 + 915 * Math.sin(a) / 1500)); }
    line(arc.filter(p => true).filter((p, i) => true).filter((_, i) => { const a = -.9 + 1.8 * i / 20; return -1100 - 915 * Math.cos(a) < -1650; }), { stroke: 'rgba(255,255,255,.85)', lwPx: Math.max(2, 5 * c.z) });
  }
  function sky(c, t, o) {
    const n = o.night ?? 0;
    const top = mixCol(mixCol('#4FA8F0', '#FF7A4A', clamp(n * 2)), '#0A0F2E', clamp(n * 2 - 1)), bot = mixCol(mixCol('#BFE6FF', '#FFC266', clamp(n * 2)), '#26205A', clamp(n * 2 - 1));
    X.fillStyle = linGrad(0, 0, 0, GY, [[0, top], [1, bot]]); X.fillRect(0, 0, W, H);
    if (n > .6) for (let i = 0; i < 50; i++) circle(hash(i) * W, hash(i + 50) * 300, 1.5 + 1.5 * hash(i + 9), { fill: '#FFF4D0', stroke: null, alpha: (n - .6) * 2 * (.5 + .4 * Math.sin(t * 3 + i)) });
    // floodlight towers far behind the stands
    for (const wx of [-6000, -1500, 3000]) {
      const sx = W / 2 + (wx * .3 - c.x * .3) * c.z * .5, base = sp(c, 0, 0, 1)[1] - 380 * c.z * .62;
      if (sx < -200 || sx > W + 200) continue;
      const hh = 520 * c.z * .5;
      line([[sx, base], [sx, base - hh]], { stroke: '#2A2F4A', lwPx: 10 * c.z * .5 + 3 });
      shape(rectPts(sx - 60 * c.z * .5, base - hh - 50 * c.z * .5, 120 * c.z * .5, 50 * c.z * .5), { fill: '#2A2F4A', stroke: null });
    }
  }
  // the goal, split so characters can stand inside it: back = back post, back and roof netting; front = near post, crossbar, side netting
  function net(c, x0, x1, d0, d1, y0, y1, n = 10) {
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      line([sp(c, lerp(x0, x1, u), y0, lerp(d0, d1, u)), sp(c, lerp(x0, x1, u), y1, lerp(d0, d1, u))], { stroke: 'rgba(255,255,255,.55)', lwPx: 1.6 });
      line([sp(c, x0, lerp(y0, y1, u), d0), sp(c, x1, lerp(y0, y1, u), d1)], { stroke: 'rgba(255,255,255,.55)', lwPx: 1.6 });
    }
  }
  function goalBack(c, t, bulge = 0) {
    const { d0, d1, h, net: N } = GOAL, B = N * (1 + .35 * bulge);
    net(c, B, B, d0, d1, 0, h * .8);                                           // back panel
    net(c, 0, B, d1, d1, 0, h);                                                // far side panel
    const post = (d) => { const a = sp(c, 0, 0, d), b = sp(c, 0, h, d); line([a, b], { stroke: PAL.ink, lwPx: 9 * a[2] + 4 }); line([a, b], { stroke: '#FFFFFF', lwPx: 9 * a[2] }); };
    post(d1);
  }
  function goalFront(c, t, bulge = 0) {
    const { d0, d1, h, net: N } = GOAL, B = N * (1 + .35 * bulge);
    net(c, 0, B, d0, d0, 0, h);                                                // near side panel
    const bar = [sp(c, 0, h, d0), sp(c, 0, h, d1)];
    line(bar, { stroke: PAL.ink, lwPx: 9 * bar[0][2] + 4 }); line(bar, { stroke: '#FFFFFF', lwPx: 9 * bar[0][2] });
    const a = sp(c, 0, 0, d0), b = sp(c, 0, h, d0); line([a, b], { stroke: PAL.ink, lwPx: 10 * a[2] + 4 }); line([a, b], { stroke: '#FFFFFF', lwPx: 10 * a[2] });
  }
  // the whole set behind the action (everything but the near goal frame)
  const TOWERS = [-6000, -1500, 3000];
  const towerTop = (c, wx) => [W / 2 + (wx * .3 - c.x * .3) * c.z * .5, sp(c, 0, 0, 1)[1] - 380 * c.z * .62 - 520 * c.z * .5 - 25 * c.z * .5];
  function blooms(c, t, o) {
    const n = o.night ?? 1, lit = o.lights ?? 3;
    if (lit < 3) { X.fillStyle = rgba('#03050F', .8 * (1 - lit / 3)); X.fillRect(0, 0, W, H); }
    TOWERS.forEach((wx, i) => {
      const on = clamp(lit - i); if (on <= 0 || n < .3) return;
      const [sx, sy] = towerTop(c, wx); if (sx < -500 || sx > W + 500) return;
      const r = 380 * c.z * .5 * (1 + .08 * beatK(t, 4)) * (1 + .6 * Math.max(0, 1 - (lit - i) * 3) * 0);
      X.save(); X.globalAlpha = on * clamp((n - .3) * 1.6); X.fillStyle = radGrad(sx, sy, 0, r, [[0, 'rgba(255,255,240,1)'], [.25, 'rgba(255,250,220,.45)'], [1, 'rgba(255,250,220,0)']]); X.fillRect(sx - r, sy - r, 2 * r, 2 * r); X.restore();
      // a beam down onto the pitch
      X.save(); X.globalAlpha = .1 * on * n; X.globalCompositeOperation = 'lighter'; X.fillStyle = '#FFF6D8';
      X.beginPath(); X.moveTo(sx - 20, sy); X.lineTo(sx + 20, sy); X.lineTo(sx + 600, H); X.lineTo(sx - 600, H); X.fill(); X.restore();
    });
  }
  function back(c, t, o = {}) {
    o.night ??= 1;
    sky(c, t, o);
    stands(c, t, o);
    boards(c, t, o);
    turf(c, t, o);
    blooms(c, t, o);
    if (o.goal !== false) goalBack(c, t, o.bulge ?? 0);
  }
  function front(c, t, o = {}) { if (o.goal !== false) goalFront(c, t, o.bulge ?? 0); }
  // draw a list of {d, draw} back to front
  const sorted = list => list.sort((a, b) => b.d - a.d).forEach(it => it.draw());
  // place a cast member at world (x, d) on the ground (or y above it)
  const who = (c, name, x, d, o = {}, y = 0) => { const [sx, sy, k] = sp(c, x, y, d); return TT.put(name, sx, sy, k, o); };
  const hou = (c, x, d, o, t, y = 0) => { const [sx, sy, k] = sp(c, x, y, d); return TT.hou(sx, sy, HOUSAM_UNIT * k, o, t); };
  const ballAt = (c, x, y, d, spin = 0) => { const [sx, sy, k] = sp(c, x, y + TT.BR, d); housamBall(sx, sy, TT.BR * k / 1.35, { spin }); return [sx, sy, k]; };
  return { GY, GOAL, sp, kd, back, front, goalBack, goalFront, sorted, who, hou, ballAt };
})();
