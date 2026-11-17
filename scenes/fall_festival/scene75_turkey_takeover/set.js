// scenes/fall_festival/scene75_turkey_takeover/set.js: THE TURKEY TAKEOVER STUDIO, the invented TV studio kitchen the brothers
// daydream. A glittering LED floor in true perspective (scene 70's N9S.floor), and at world Z = BZ the back wall: a giant LED
// screen with the show's neon logo, flame towers that fire on the hits, two banks of bleachers full of a cheering studio
// audience (student rigs, darkened to silhouettes), a lighting truss whose beams sweep the floor, and a hanging show clock.
// The kitchen stations are stainless counters placed per shot (counter). TTS.stage() frames one shot: camera, set, cast.
const TTS = (() => {
  const { C, put, flameJet, logo, txt } = TT, { bpos, beatK } = TT;
  const BZ = 1000;                                                    // the back wall's depth
  const FLOOR = {
    show: { bot: '#2A0E4E', a: '#FFD23F', b: '#FF3D9A', floor: 'checker' },
    rush: { bot: '#3A0B2E', a: '#FF8A2B', b: '#3DE8FF', floor: 'rainbow' },
    cold: { bot: '#0B2A4A', a: '#A6ECFF', b: '#3D7BFF', floor: 'ripple' },
    gold: { bot: '#5A2A08', a: '#FFD23F', b: '#FFFFFF', floor: 'ripple' },
    red: { bot: '#3A0614', a: '#FF2E4D', b: '#FF8A2B', floor: 'grid' },
  };
  const view = o => N9S.view(o);
  const LOOK = [...Array(40)].map((_, i) => studentLook(101 + i * 7));

  // ---------- the back wall (world units, drawn in a frame pinned at (0, 0, BZ)) ----------
  function back(P, t, o = {}) {
    const [bx, by, bk] = P.p(0, 0, BZ), b = bpos(t), bk1 = beatK(t, 6), e = o.energy ?? 1;
    const left = -bx / bk - 60, right = (W - bx) / bk + 60, top = -by / bk - 60;
    X.save(); X.translate(bx, by); X.scale(bk, bk);
    // wall
    X.fillStyle = linGrad(0, top, 0, 0, [[0, o.wallTop ?? '#0A0520'], [1, o.wallBot ?? '#2B1158']]); X.fillRect(left, top, right - left, -top + 4);
    // sunburst behind the screen
    X.save(); X.translate(0, -420); X.rotate(t * .15);
    for (let i = 0; i < 24; i++) { X.rotate(TAU / 24); X.fillStyle = rgba(o.ray ?? '#FF3D9A', (i % 2 ? .05 : .1) * e * (.6 + .4 * bk1)); X.beginPath(); X.moveTo(0, 0); X.lineTo(2400, -150); X.lineTo(2400, 150); X.fill(); }
    X.restore();
    // vertical light columns
    for (let i = -9; i <= 9; i++) { const x = i * 190; X.fillStyle = rgba(i % 2 ? '#3DE8FF' : '#FF3D9A', .05 + .05 * Math.max(0, Math.sin(b * Math.PI / 2 + i))); X.fillRect(x - 18, top, 36, -top); }
    // the bleachers and the audience
    bleachers(t, o, -1); bleachers(t, o, 1);
    // the truss, lamps and the hanging clock
    shape(rectPts(-1900, -905, 3800, 34), { fill: '#3B2F55', stroke: C.ink, lwPx: 3 });
    for (let x = -1880; x < 1880; x += 68) line([[x, -905], [x + 34, -871], [x + 68, -905]], { stroke: '#1E1436', lwPx: 2.5 });
    const lamps = [-1500, -1100, -700, -300, 300, 700, 1100, 1500];
    lamps.forEach((lx, i) => { shape([[lx - 26, -871], [lx + 26, -871], [lx + 36, -826], [lx - 36, -826]], { fill: '#221538', stroke: C.ink, lwPx: 3 }); circle(lx, -824, 16, { fill: mixCol('#55406A', N9.FIRE[i % 6], e), stroke: C.ink, lwPx: 2 }); });
    // the LED screen
    screen(t, o);
    // flame towers
    for (const sd of [-1, 1]) {
      const x = sd * 560;
      shape([[x - 34, 0], [x - 26, -330], [x + 26, -330], [x + 34, 0]], { fill: linGrad(x - 34, 0, x + 34, 0, [[0, '#5E6B7E'], [.5, '#DDE5EE'], [1, '#5E6B7E']]), stroke: C.ink, lwPx: 3 });
      shape(rectPts(x - 46, -352, 92, 26), { fill: '#2B2440', stroke: C.ink, lwPx: 3 });
      for (let j = 0; j < 6; j++) circle(x, -40 - j * 50, 7, { fill: (j + Math.floor(b * 2)) % 3 ? '#55406A' : C.fire, stroke: null });
      const jk = o.jets ? o.jets(t, sd) : 0;
      if (jk > .02) flameJet(t, x, -352, 520, jk, 110);
    }
    // beams from the truss lamps (additive)
    if (e > .02) {
      X.save(); X.globalCompositeOperation = 'lighter';
      lamps.forEach((lx, i) => {
        const tx = lx * .45 + 700 * Math.sin(t * 1.25 + i * 1.7), col = o.beamCols ? o.beamCols[i % o.beamCols.length] : [C.gold, C.magenta, C.cyan, '#FFFFFF'][i % 4];
        X.globalAlpha = .11 * e * (.7 + .5 * bk1); X.fillStyle = col;
        X.beginPath(); X.moveTo(lx - 10, -824); X.lineTo(lx + 10, -824); X.lineTo(tx + 190, 700); X.lineTo(tx - 190, 700); X.fill();
      });
      X.restore();
    }
    X.restore();
  }
  function bleachers(t, o, sd) {
    const b = bpos(t), up = o.crowdUp ?? 0, rows = 3, ex = o.energy ?? 1;
    for (let r = rows - 1; r >= 0; r--) {
      const y = -120 - r * 150, x0 = sd * 660, x1 = sd * 1900;
      shape([[x0, y], [x1, y], [x1, y + 120], [x0, y + 120]], { fill: '#1A0E36', stroke: C.ink, lwPx: 3 });
      for (let i = 0; i < 18; i++) { const x = lerp(x0, x1, (i + .5) / 18); circle(x, y + 10, 6, { fill: (i + r + Math.floor(b * 2)) % 2 ? N9.FIRE[(i + r) % 6] : '#3A2A5A', stroke: null, alpha: .9 * ex }); }
    }
    // the audience: student rigs, darkened (a nested layer), clapping or on their feet with hands up
    layer(() => {
      for (let r = rows - 1; r >= 0; r--) for (let i = 0; i < 7; i++) {
        const n = (sd > 0 ? 20 : 0) + r * 7 + i, L = LOOK[n % LOOK.length], x = sd * (760 + i * 165 + (r % 2) * 70), y = -120 - r * 150 + 2;
        const ph = b * Math.PI + n * .7, hp = Math.abs(Math.sin(ph)), clap = Math.exp(-frac(b + hash(n) * .1) * 6);
        const hands = up > .5 ? { handL: [-4.4 - 1.2 * Math.sin(ph), -20 + .8 * hp], handR: [4.4 + 1.2 * Math.sin(ph + 1), -20 + .8 * hp], handPoseL: 'palm', handPoseR: 'palm' }
          : { handL: [-.6 - 2.2 * (1 - clap), -12.8], handR: [.6 + 2.2 * (1 - clap), -12.8], handPoseL: 'palm', handPoseR: 'palm' };
        student(x, y, 4.2 * 1.05, { look: L, seed: n, ...hands, jump: up * 1.6 * hp, eyes: 'happy', mouth: 'open', noShadow: true, flip: sd < 0 && i % 2 === 0, t });
      }
    }, { filter: o.crowdLit ? 'brightness(.9) saturate(1.05)' : 'brightness(.5) saturate(.75)' });
  }
  // The LED screen: kind = logo | frozen | count | gold | eq
  function screen(t, o) {
    const kind = o.screen ?? 'logo', b = bpos(t), bk1 = beatK(t, 6), sx = 470, y0 = -680, y1 = -170;
    shape(rectPts(-sx - 24, y0 - 24, 2 * sx + 48, y1 - y0 + 48), { fill: '#120A26', stroke: C.ink, lwPx: 5 });
    const bg = { logo: ['#2A0B4E', '#7A1D6A'], frozen: ['#0B3A6A', '#7FD8FF'], count: ['#3A0614', '#9A1530'], gold: ['#8A4A08', '#FFD23F'], eq: ['#0B1A3A', '#3A1670'] }[kind] ?? ['#2A0B4E', '#7A1D6A'];
    X.fillStyle = linGrad(0, y0, 0, y1, [[0, bg[0]], [1, bg[1]]]); X.fillRect(-sx, y0, 2 * sx, y1 - y0);
    X.save(); X.beginPath(); X.rect(-sx, y0, 2 * sx, y1 - y0); X.clip();
    for (let i = 0; i < 30; i++) { const h = 30 + 140 * (.3 + .7 * hash(i * 3.3 + Math.floor(b * 2))) * (.4 + .6 * bk1), x = -sx + 10 + i * 31.5;
      X.fillStyle = `hsla(${(i * 12 + t * 50) % 360},90%,62%,.28)`; X.fillRect(x, y1 - h, 24, h); }
    const cy = (y0 + y1) / 2;
    if (kind === 'logo' || kind === 'eq') {
      logo(0, cy - 105, 78 * (1 + .05 * bk1), t);
      X.save(); X.font = `120px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
      const glowK = o.neon ?? 1;
      [['TURKEY', cy + 30, '#FFD23F'], ['TAKEOVER', cy + 150, '#FF5FB0']].forEach(([s, y, col]) => {
        X.lineWidth = 16; X.strokeStyle = '#0B0518'; X.strokeText(s, 0, y);
        X.shadowColor = col; X.shadowBlur = 40 * glowK * (.7 + .3 * bk1); X.fillStyle = mixCol('#4A3A5A', col, glowK); X.fillText(s, 0, y); X.shadowBlur = 0;
      });
      X.restore();
    } else if (kind === 'frozen') {
      txt('FROZEN!', 0, cy, 190, '#E8FBFF', { align: 'center', stroke: '#0B2A4A', lw: 22, glow: '#7FE3FF' });
      for (let i = 0; i < 26; i++) sparkleW((hash(i) * 2 - 1) * sx, y0 + hash(i * 3) * (y1 - y0), 12 + 10 * Math.abs(Math.sin(t * 4 + i)));
    } else if (kind === 'count') {
      txt(String(o.count ?? 5), 0, cy + 10, 400 * (1 + .1 * bk1), '#FFFFFF', { align: 'center', stroke: '#3A0614', lw: 30, glow: '#FF2E4D' });
    } else if (kind === 'gold') {
      logo(0, cy - 60, 120 * (1 + .06 * bk1), t);
      txt('PERFECT!', 0, cy + 150, 120, '#FFFFFF', { align: 'center', stroke: '#5A2A08', lw: 16, glow: '#FFD23F' });
    }
    X.restore();
    // chase bulbs around the screen
    const per = 2 * (2 * sx + (y1 - y0)), n = 60;
    for (let i = 0; i < n; i++) {
      const s0 = i / n * per, w = 2 * sx + 24, h = y1 - y0 + 24;
      const p = s0 < w ? [-sx - 12 + s0, y0 - 12] : s0 < w + h ? [sx + 12, y0 - 12 + s0 - w] : s0 < 2 * w + h ? [sx + 12 - (s0 - w - h), y1 + 12] : [-sx - 12, y1 + 12 - (s0 - 2 * w - h)];
      circle(p[0], p[1], 9, { fill: (i + Math.floor(b * 2)) % 2 === 0 ? N9.FIRE[i % 6] : '#3A2A5A', stroke: C.ink, lwPx: 2 });
    }
    // the hanging show clock
    shape(rectPts(-150, -830, 300, 110), { fill: '#0B0518', stroke: C.ink, lwPx: 4, smooth: .1 });
    line([[-110, -871], [-110, -830]], { stroke: '#3B2F55', lwPx: 6 }); line([[110, -871], [110, -830]], { stroke: '#3B2F55', lwPx: 6 });
    const left = Math.max(0, TT.CUT.end - t), mm = Math.floor(left / 60), ss = Math.floor(left % 60);
    txt(`${mm}:${String(ss).padStart(2, '0')}`, 0, -773, 84, '#FF3B3B', { align: 'center', font: '"Courier New", monospace', weight: 700, glow: '#FF3B3B', blur: 18 });
  }
  const sparkleW = (x, y, r) => TT.sparkle(x, y, r, '#FFFFFF', 0, .9);

  // ---------- stations: a stainless counter (world x, front face z, width w; top at 92, depth d) ----------
  function counter(P, x, z, w, o = {}) {
    const h = o.h ?? 92, d = o.d ?? 70;
    const p = (X0, Y0, Z0) => P.p(X0, Y0, Z0);
    const fl = p(x - w / 2, 0, z), fr = p(x + w / 2, 0, z), tl = p(x - w / 2, h, z), tr = p(x + w / 2, h, z), bl = p(x - w / 2, h, z + d), br = p(x + w / 2, h, z + d);
    const k = tl[2];
    shape([tl.slice(0, 2), tr.slice(0, 2), br.slice(0, 2), bl.slice(0, 2)], { fill: linGrad(0, bl[1], 0, tl[1], [[0, '#AEB9C7'], [1, '#F2F6FA']]), stroke: C.ink, lwPx: 3 });
    shape([tl.slice(0, 2), tr.slice(0, 2), fr.slice(0, 2), fl.slice(0, 2)], { fill: linGrad(tl[0], 0, tr[0], 0, [[0, '#8996A8'], [.3, '#D7DFE9'], [.55, '#A9B5C4'], [1, '#7C899B']]), stroke: C.ink, lwPx: 3 });
    // brushed lines and a kick plate
    for (let i = 1; i < 6; i++) { const yy = lerp(tl[1], fl[1], i / 6); line([[tl[0] + 6, yy], [tr[0] - 6, yy]], { stroke: 'rgba(255,255,255,.18)', lwPx: 2 }); }
    shape([[fl[0], fl[1] - 12 * k], [fr[0], fr[1] - 12 * k], fr.slice(0, 2), fl.slice(0, 2)], { fill: '#2B2440', stroke: null });
    // the LED strip and the station label
    const col = o.col ?? C.magenta, sy = lerp(tl[1], fl[1], .22), sh = Math.max(6, 22 * k);
    X.save(); X.globalAlpha = .9; X.fillStyle = col; X.shadowColor = col; X.shadowBlur = 20; X.fillRect(tl[0] + 4, sy - sh / 2, tr[0] - tl[0] - 8, sh); X.restore();
    if (o.label) txt(o.label, (tl[0] + tr[0]) / 2, lerp(tl[1], fl[1], .55), clamp(34 * k, 14, 70), '#FFFFFF', { align: 'center', stroke: C.ink, lw: clamp(7 * k, 3, 12), max: (tr[0] - tl[0]) * .9 });
    return { top: [(tl[0] + tr[0] + bl[0] + br[0]) / 4, (tl[1] + tr[1] + bl[1] + br[1]) / 4], k, tl, tr };
  }

  // ---------- cast and props in depth order ----------
  // items: [{ who, x, z, y, o, id, after(A, sx, sy, k) }] for characters, or [{ z, draw(P) }] for props; nearer (smaller z) last.
  function cast(P, items) {
    const A = {};
    items.filter(it => it && P.depth(it.z ?? 0) > 40).sort((p, q) => (q.z ?? 0) - (p.z ?? 0)).forEach(it => {
      if (it.draw) { const r = it.draw(P, A); if (it.id) A[it.id] = r; return; }
      const [sx, sy, k] = P.p(it.x ?? 0, it.y ?? 0, it.z ?? 0);
      A[it.id ?? it.who] = put(it.who, sx, sy, k * (it.sc ?? 1), it.o || {});
      if (it.after) it.after(A[it.id ?? it.who], sx, sy, k);
    });
    return A;
  }
  // One staged frame: a 2D camera (shake, beat bump, roll, zoom) on top of the 3D view; the floor and wall (blurred when
  // close); then under(P), the cast and props in depth order, over(P, A).
  function stage(t, v, o = {}, items = null) {
    const [sx, sy] = TT.shake(t, o.shakes || []);
    camBegin(W / 2 - sx + (o.panX ?? 0), H / 2 - sy, (o.zoom ?? 1.03) * (1 + (o.bump ?? .014) * beatK(t)), o.roll || 0);
    const P = view(v);
    layer(() => { N9S.floor(P, t, FLOOR[o.floor ?? 'show'] ?? o.floor, o); back(P, t, o); }, { blur: o.blur ?? clamp((P.k(0) - 2.2) * 1.6, 0, 4) });
    if (o.under) o.under(P);
    const A = items ? cast(P, typeof items === 'function' ? items(P) : items) : {};
    if (o.over) o.over(P, A);
    camEnd();
    if (o.beams) N9S.beams(t, o.beams);
    return { P, A };
  }
  // A camera crane in the foreground (screen space): base at (x, H), the arm swinging, a camera with a red tally light.
  function crane(t, x, sd = 1, k = 1) {
    const a = -.32 + .14 * Math.sin(t * .9), L = 560 * k, px = x, py = H - 150 * k, ex = px + sd * Math.cos(a) * L, ey = py + Math.sin(a) * L;
    const bx = px - sd * Math.cos(a) * 200 * k, by = py - Math.sin(a) * 200 * k;
    X.save(); X.globalAlpha = .94;
    shape([[px - 60 * k, H + 10], [px, py], [px + 60 * k, H + 10]], { fill: '#0B0518', stroke: null });
    line([[bx, by], [ex, ey]], { stroke: '#0B0518', lwPx: 22 * k }); line([[bx, by], [ex, ey]], { stroke: '#2B2440', lwPx: 8 * k });
    shape(rectPts(bx - 40 * k, by - 30 * k, 80 * k, 60 * k), { fill: '#0B0518', stroke: null });
    shape(rectPts(ex - 50 * k, ey - 36 * k, 100 * k, 72 * k), { fill: '#120A22', stroke: '#3B2F55', lwPx: 4 });
    circle(ex + sd * 62 * k, ey, 26 * k, { fill: '#1E1436', stroke: '#3B2F55', lwPx: 4 });
    circle(ex - sd * 30 * k, ey - 30 * k, 8 * k, { fill: frac(t * 1.5) < .6 ? '#FF2E4D' : '#5A0A18', stroke: null });
    X.restore();
  }
  return { BZ, FLOOR, view, back, screen, counter, cast, stage, crane };
})();
