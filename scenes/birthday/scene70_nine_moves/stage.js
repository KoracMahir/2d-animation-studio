// scenes/birthday/scene70_nine_moves/stage.js: THE DANCE DIMENSION, the set of "Nine Moves". A light-up tile floor in true
// perspective (engine/persp.js) under a painted party stage: an LED wall, speaker stacks, a lighting truss and DJ Clawd's booth.
// Each move re-skins it with a THEME (sky, floor pattern and a backdrop motif: balloons, disco flecks, ribbons, pennants,
// neon grid, waves, stars, embers, chalk formulas, rays). The cast dances on the line Z = 0; the camera is N9S.view().
const N9S = (() => {
  const { C, FIRE, NINE, bpos, beatK, hop } = N9;
  const TILE = 150, FAR = 2400, DARK = '#170B33';
  const TH = {
    night: { top: '#0C0626', bot: '#3A1670', a: '#B98CFF', b: '#FF3D9A', floor: 'rainbow', motif: 'stars' },
    lilac: { top: '#6A3FB8', bot: '#F2A6D8', a: '#FFD23F', b: '#C7A6DB', floor: 'ripple', motif: 'stars' },
    bounce: { top: '#2FA8FF', bot: '#FFE46B', a: '#FF6FB0', b: '#FFD23F', floor: 'checker', motif: 'balloons' },
    disco: { top: '#1B0F4A', bot: '#C0249A', a: '#3DE8FF', b: '#FF3D9A', floor: 'rainbow', motif: 'flecks' },
    twirl: { top: '#0E8C8C', bot: '#FFB3D1', a: '#FF7EB6', b: '#FFF3A8', floor: 'ripple', motif: 'ribbons' },
    party: { top: '#FF5FB0', bot: '#FFC94D', a: '#3DE8FF', b: '#8CFF5A', floor: 'rainbow', motif: 'balloons' },
    floss: { top: '#2E7BFF', bot: '#9BF27A', a: '#FFFFFF', b: '#FFD23F', floor: 'rows', motif: 'pennants' },
    robot: { top: '#050B1E', bot: '#0B3C5C', a: '#3DE8FF', b: '#FF3B6B', floor: 'grid', motif: 'neon' },
    wave: { top: '#0B4FA8', bot: '#5FE3F0', a: '#B8F4FF', b: '#FFE46B', floor: 'ripple', motif: 'waves' },
    cosmic: { top: '#12093A', bot: '#7A3BCF', a: '#FFD23F', b: '#3DE8FF', floor: 'rainbow', motif: 'stars' },
    dragon: { top: '#7A1E3A', bot: '#FF9A3D', a: '#FFD23F', b: '#8CFF5A', floor: 'checker', motif: 'embers' },
    prof: { top: '#123B2E', bot: '#2F8A63', a: '#FFFDF8', b: '#FFD23F', floor: 'rows', motif: 'chalk' },
    gold: { top: '#FF8A2B', bot: '#FFF3A8', a: '#FFFFFF', b: '#FF3D9A', floor: 'rainbow', motif: 'rays' },
    finale: { top: '#1A0B4A', bot: '#FF3D8B', a: '#FFD23F', b: '#3DE8FF', floor: 'rainbow', motif: 'stars' },
  };
  const THEME_OF = ['bounce', 'disco', 'twirl', 'floss', 'robot', 'wave', 'dragon', 'prof', 'gold'];   // one per move

  // The camera: the subject stands at world (o.x, 0, o.z); d = distance to it, eye = lens height, feetY = where its feet land.
  function view(o = {}) {
    const d = o.d ?? 560, f = o.f ?? 1000, eye = o.eye ?? 120;
    return persp({ x: o.x ?? 0, y: eye, z: (o.z ?? 0) - d, f, hy: (o.feetY ?? 900) - eye * f / d });
  }

  // ---------- the backdrop: sky, the motif, the stage ----------
  function back(P, t, th, o = {}) {
    const hy = P.cam.hy, e = o.energy ?? 1, b = bpos(t), bk = beatK(t, 6), kb = o.kb ?? clamp(.55 + .28 * P.k(0), .9, 1.9);
    X.fillStyle = linGrad(0, 0, 0, Math.max(hy, 10), [[0, th.top], [1, th.bot]]); X.fillRect(0, 0, W, Math.max(hy, 0) + 2);
    X.fillStyle = DARK; X.fillRect(0, hy, W, H - hy);
    X.save(); X.translate(W / 2 - P.cam.x * .22 * kb, hy); X.scale(kb, kb);
    // sunburst behind everything
    X.save(); X.translate(0, -250); X.rotate(t * .12);
    for (let i = 0; i < 20; i++) { X.rotate(TAU / 20); X.fillStyle = rgba('#FFFFFF', (i % 2 ? .05 : .09) * e * (.6 + .4 * bk)); X.beginPath(); X.moveTo(0, 0); X.lineTo(1700, -120); X.lineTo(1700, 120); X.fill(); }
    X.restore();
    motif(th.motif, t, th, e);
    // speaker stacks
    for (const sd of [-1, 1]) for (let j = 0; j < 2; j++) {
      const x = sd * 610, y = -30 - j * 196;
      shape(rectPts(x - 96, y - 190, 192, 190), { fill: '#221538', stroke: C.ink, lwPx: 4, smooth: .12 });
      const r = 58 * (1 + .14 * bk * e);
      circle(x, y - 80, r, { fill: '#120A22', stroke: th.a, lwPx: 5 }); circle(x, y - 80, r * .42, { fill: mixCol('#3A2A5A', th.b, .5 * bk * e), stroke: C.ink, lwPx: 3 });
      circle(x - 52, y - 160, 16, { fill: '#120A22', stroke: th.a, lwPx: 3 }); circle(x + 52, y - 160, 16, { fill: '#120A22', stroke: th.a, lwPx: 3 });
    }
    // the LED wall: equalizer bars, the label, chase bulbs round the frame
    shape(rectPts(-410, -410, 820, 290), { fill: '#150B2E', stroke: C.ink, lwPx: 6, smooth: .08 });
    for (let i = 0; i < 26; i++) {
      const hgt = 26 + 150 * e * (.25 + .75 * hash(i * 3.3 + Math.floor(b * 2))) * (.45 + .55 * bk), x = -390 + i * 30;
      X.fillStyle = `hsla(${(i * 14 + t * 60) % 360},90%,62%,.5)`; X.fillRect(x, -124 - hgt, 24, hgt);
    }
    const label = o.label ?? 'ALMA ★ 9';
    X.save(); X.font = `120px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
    const lw0 = X.measureText(label).width || 1, ls = Math.min(1, 740 / lw0) * (1 + .04 * bk);
    X.translate(0, -300); X.scale(ls, ls); X.lineWidth = 16; X.strokeStyle = '#0B0518'; X.strokeText(label, 0, 0);
    X.shadowColor = th.b; X.shadowBlur = 30 * e; X.fillStyle = mixCol('#6A5A8A', th.a === '#FFFFFF' ? C.gold : th.a, .35 + .65 * e); X.fillText(label, 0, 0); X.restore();
    for (let i = 0; i < 44; i++) {
      const u = i / 44, per = 2 * (820 + 290), s0 = u * per, p = s0 < 820 ? [-410 + s0, -410] : s0 < 1110 ? [410, -410 + s0 - 820] : s0 < 1930 ? [410 - (s0 - 1110), -120] : [-410, -120 - (s0 - 1930)];
      const onb = (i + Math.floor(b * 2)) % 2 === 0;
      circle(p[0], p[1], 9, { fill: onb ? mixCol('#55406A', FIRE[i % 6], e) : '#3A2A5A', stroke: C.ink, lwPx: 2 });
    }
    // the truss and its lamps
    shape(rectPts(-800, -462, 1600, 26), { fill: '#3B2F55', stroke: C.ink, lwPx: 4 });
    for (let x = -780; x < 780; x += 52) line([[x, -462], [x + 26, -436], [x + 52, -462]], { stroke: '#1E1436', lwPx: 3 });
    const lamps = [-690, -470, -250, 250, 470, 690];
    lamps.forEach((lx, i) => { shape([[lx - 20, -436], [lx + 20, -436], [lx + 30, -398], [lx - 30, -398]], { fill: '#221538', stroke: C.ink, lwPx: 3 }); circle(lx, -396, 14, { fill: mixCol('#55406A', FIRE[i % 6], e), stroke: C.ink, lwPx: 2 }); });
    // the stage riser, DJ Clawd and his booth
    shape(rectPts(-860, -34, 1720, 80), { fill: '#2A1A48', stroke: C.ink, lwPx: 4 });
    for (let x = -840; x < 840; x += 70) circle(x, 6, 9, { fill: (Math.floor(x / 70) + Math.floor(b)) % 2 ? th.a : th.b, stroke: C.ink, lwPx: 2, alpha: .35 + .65 * e });
    if (o.dj !== false) {
      const dj = { ...N9.groove('clawd', 'bounce', b, e), holo: .35, noShadow: true, ...(o.dj || {}) };
      clawd(0, -128 - 0, 15, { t, ...dj });
      const hpy = -128 - 8.6 * 15 - (dj.jump || 0) * 15;
      X.beginPath(); X.arc(0, hpy + 46, 88, Math.PI * 1.08, Math.PI * 1.92); X.lineWidth = 9; X.strokeStyle = C.ink; X.stroke(); X.lineWidth = 5; X.strokeStyle = C.magenta; X.stroke();
      for (const sd of [-1, 1]) shape(rectPts(sd * 84 - 13, hpy + 22, 26, 44), { fill: C.magenta, stroke: C.ink, lwPx: 3, smooth: .4 });
      shape(rectPts(-230, -150, 460, 122), { fill: '#3B2468', stroke: C.ink, lwPx: 5, smooth: .1 });
      shape(rectPts(-230, -150, 460, 20), { fill: th.a, stroke: C.ink, lwPx: 3, alpha: .9 });
      for (const sd of [-1, 1]) { ellipse(sd * 120, -168, 62, 16, { fill: '#120A22', stroke: C.ink, lwPx: 3 }); ellipse(sd * 120, -168, 20, 5, { fill: FIRE[sd > 0 ? 1 : 2], stroke: null });
        const a = t * 5 * sd; line([[sd * 120, -168], [sd * 120 + Math.cos(a) * 56, -168 + Math.sin(a) * 14]], { stroke: 'rgba(255,255,255,.6)', lwPx: 3 }); }
      X.save(); X.font = `40px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = C.white; X.globalAlpha = .9; X.fillText('DJ CLAWD', 0, -84); X.restore();
    }
    // light beams from the lamps (additive)
    if (e > .02) {
      X.save(); X.globalCompositeOperation = 'lighter';
      lamps.forEach((lx, i) => {
        const tx = lx * .5 + 520 * Math.sin(t * 1.15 + i * 1.9), col = i % 2 ? th.a : th.b;
        X.globalAlpha = .13 * e * (.7 + .5 * bk); X.fillStyle = col === '#FFFFFF' ? C.gold : col;
        X.beginPath(); X.moveTo(lx - 8, -396); X.lineTo(lx + 8, -396); X.lineTo(tx + 150, 420); X.lineTo(tx - 150, 420); X.fill();
      });
      X.restore();
    }
    X.restore();
  }

  function motif(kind, t, th, e) {
    const b = bpos(t), bk = beatK(t, 6);
    if (kind === 'balloons') for (let i = 0; i < 16; i++) {
      const x = (hash(i * 1.7) * 2 - 1) * 1050, u = frac(hash(i * 3.1) + t * .06 * (.6 + hash(i))), y = 60 - u * 640;
      N9.balloon(x + 14 * Math.sin(t * 1.3 + i), y - 14 * bk, 34 + 12 * hash(i * 5), FIRE[i % 6], t, null, i);
    }
    else if (kind === 'flecks') {
      for (let i = 0; i < 70; i++) { const a = i * 2.39996 + t * .55, y = -30 - hash(i) * 520, x = Math.sin(a) * 1080, z = Math.cos(a); if (z < 0) continue;
        X.save(); X.translate(x, y); X.rotate(.6); X.fillStyle = rgba(i % 3 ? '#FFFFFF' : th.a, .5 * z * e); X.fillRect(-9, -9, 18, 18); X.restore(); }
      discoBall(0, -452, 62, t);
    }
    else if (kind === 'ribbons') for (let i = 0; i < 4; i++) {
      const pts = []; for (let x = -1150; x <= 1150; x += 46) pts.push([x, -150 - i * 105 + 46 * Math.sin(x * .006 + t * 2.2 + i * 1.3)]);
      line(pts, { stroke: rgba([th.a, th.b, '#FFFFFF', C.gold][i], .75), lwPx: 20 - i * 2, smooth: true });
    }
    else if (kind === 'pennants') for (let r = 0; r < 3; r++) for (let i = -14; i < 14; i++) {
      const x = i * 82 + r * 30, y = -500 + r * 62 + 30 * Math.cos(i * .22) + 4 * Math.sin(t * 3 + i);
      shape([[x, y], [x + 66, y], [x + 33, y + 62]], { fill: [C.white, C.gold, '#2E5BFF', C.magenta][(i + r + 28) % 4], stroke: C.ink, lwPx: 2.5, alpha: .9 });
    }
    else if (kind === 'neon') {
      circle(0, -260, 250, { fill: linGrad(0, -510, 0, -10, [[0, '#FF3B6B'], [1, '#FFD23F']]), stroke: null, alpha: .85 });
      for (let i = 0; i < 7; i++) { X.fillStyle = th.top; X.fillRect(-260, -200 + i * 30 + frac(t * .5) * 30, 520, 5 + i * 2.2); }
      for (let i = -14; i <= 14; i++) line([[i * 30, -8], [i * 190, 140]], { stroke: rgba(th.a, .6), lwPx: 2.5 });
      for (let i = 0; i < 24; i++) { const x = (hash(i * 2.3) * 2 - 1) * 1050, u = frac(hash(i) + t * .25);
        X.save(); X.font = `700 30px "Courier New", monospace`; X.fillStyle = rgba(th.a, .55 * (1 - u)); X.fillText(hash(i + Math.floor(t * 4)) > .5 ? '1' : '0', x, -560 + u * 520); X.restore(); }
    }
    else if (kind === 'waves') {
      for (let l = 0; l < 4; l++) { const pts = [[-1200, 60]]; for (let x = -1200; x <= 1200; x += 50) pts.push([x, -210 + l * 58 - 34 * Math.sin(x * .007 + t * (1.6 + l * .4) + l * 2) - 22 * bk * (l % 2)]); pts.push([1200, 60]);
        shape(pts, { fill: ['#1E7BD8', '#2FA2E8', '#55C8F0', '#9FE8F8'][l], stroke: C.ink, lwPx: 3, smooth: .5, alpha: .92 }); }
      for (let i = 0; i < 26; i++) { const u = frac(hash(i) + t * .12 * (.5 + hash(i * 3))); circle((hash(i * 7) * 2 - 1) * 1050 + 14 * Math.sin(t * 2 + i), -20 - u * 560, 8 + 14 * hash(i * 5), { fill: 'rgba(255,255,255,.18)', stroke: 'rgba(255,255,255,.7)', lwPx: 2 }); }
    }
    else if (kind === 'stars') {
      for (let i = 0; i < 70; i++) circle((hash(i * 1.9) * 2 - 1) * 1100, -20 - hash(i * 4.3) * 600, 2 + 3 * hash(i * 7), { fill: '#FFF4D0', stroke: null, alpha: .35 + .5 * Math.abs(Math.sin(t * 2.2 + i)) });
      for (let i = 0; i < 9; i++) shape(starPts((i - 4) * 230 + 40 * Math.sin(t * .7 + i), -520 + 70 * Math.sin(i * 1.7) + 10 * bk, 20 + 8 * (i % 3), .45, 5, t * .6 + i), { fill: NINE[i], stroke: C.ink, lwPx: 2.5, alpha: .9 });
    }
    else if (kind === 'embers') {
      shape([[-1200, 10], [-1200, -150], [-900, -330], [-700, -180], [-450, -390], [-150, -160], [120, -300], [380, -170], [640, -410], [900, -200], [1200, -320], [1200, 10]], { fill: '#4A1230', stroke: C.ink, lwPx: 4, alpha: .9 });
      for (let i = 0; i < 46; i++) { const u = frac(hash(i) + t * .22 * (.5 + hash(i * 3))); circle((hash(i * 7) * 2 - 1) * 1080 + 30 * Math.sin(t * 2 + i), 0 - u * 600, 4 + 6 * hash(i * 5), { fill: i % 3 ? '#FFB347' : '#FFE46B', stroke: null, alpha: (1 - u) * .9 }); }
    }
    else if (kind === 'chalk') {
      const F = ['9 = 3 × 3', '3² = 9', '8 + 1 = 9', '√81 = 9', 'DANCE = FUN × BEAT', '4 + 5 = 9', '10 − 1 = 9', '18 ÷ 2 = 9', '9 × 1 = 9', 'ALMA = 9 !'];
      X.save(); X.textAlign = 'center'; X.textBaseline = 'middle';
      F.forEach((s, i) => { X.save(); X.translate((i % 5 - 2) * 420 + (i > 4 ? 190 : 0), -520 + Math.floor(i / 5) * 330 + 60 * Math.sin(i * 2.1) + 8 * Math.sin(t * 2 + i)); X.rotate(.08 * Math.sin(i * 3.3));
        X.font = `600 ${44 + 6 * (i % 3)}px ${FONT_TALK}`; X.fillStyle = rgba('#FFFFFF', .62); X.fillText(s, 0, 0); X.restore(); });
      X.restore();
    }
    else if (kind === 'rays') for (let i = 0; i < 40; i++) {
      const a = i / 40 * TAU + t * .4, r = 300 + 500 * frac(hash(i) + t * .5);
      shape(starPts(Math.cos(a) * r, -260 + Math.sin(a) * r * .6, 16 + 10 * hash(i * 3), .4, 4, t + i), { fill: i % 2 ? '#FFFFFF' : C.gold, stroke: null, alpha: .85 });
    }
  }
  function discoBall(x, y, r, t) {
    line([[x, y - r], [x, y - r - 200]], { stroke: C.ink, lwPx: 4 });
    circle(x, y, r, { fill: '#C9D3E8', stroke: C.ink, lwPx: 4 });
    X.save(); X.beginPath(); X.arc(x, y, r, 0, TAU); X.clip();
    for (let j = -4; j <= 4; j++) for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI + (t * .8) % (Math.PI / 6), cx = x + Math.cos(a) * r * Math.cos(j * .32), cy = y + j * r * .22, lit = hash(i * 7 + j * 13 + Math.floor(t * 6));
      X.fillStyle = lit > .7 ? '#FFFFFF' : lit > .4 ? '#9FB2DC' : '#7D8FBE'; X.fillRect(cx - r * .1, cy - r * .09, r * .2 * Math.abs(Math.sin(a)) + 2, r * .17);
    }
    X.restore();
    circle(x - r * .35, y - r * .4, r * .18, { fill: 'rgba(255,255,255,.8)', stroke: null });
  }

  // ---------- the light-up floor ----------
  function tileCol(i, j, b, th, e, o) {
    const mode = th.floor, n = Math.floor(b), hb = Math.floor(b * 2);
    if (mode === 'rainbow') { const lit = .5 + .5 * hash(i * 7.3 + j * 13.1 + n * 3.7); return `hsl(${((i + j) * 26 + n * 47 + 720) % 360},${60 + 30 * e}%,${14 + (26 + 26 * lit) * e}%)`; }
    let lit, col;
    if (mode === 'checker') { const q = (((i + j + n) % 2) + 2) % 2; lit = q ? 1 : .45; col = q ? th.a : th.b; }
    else if (mode === 'ripple') { const r = Math.hypot(i + .5 - (o.cx ?? 0) / TILE, j + .5 - (o.cz ?? 0) / TILE); lit = .5 + .5 * Math.sin(r * 1.25 - b * Math.PI); col = mixCol(th.b, th.a, lit); }
    else if (mode === 'rows') { const q = (((j - hb) % 3) + 3) % 3; lit = q === 0 ? 1 : .45; col = (((i + j) % 2) + 2) % 2 ? th.a : th.b; }
    else { const q = hash(i * 5.1 + j * 31.7 + hb * 1.3); lit = q > .82 ? 1 : .1; col = q > .93 ? th.b : th.a; }
    return mixCol(DARK, col === '#FFFFFF' ? '#E8F0FF' : col, (.16 + .72 * lit) * (.25 + .75 * e));
  }
  function floor(P, t, th, o = {}) {
    const c = P.cam, e = o.energy ?? 1, b = bpos(t), near = c.z + 70;
    const sy = z => c.hy + c.y * c.f / (z - c.z), sx = (x, z) => W / 2 + (x - c.x) * c.f / (z - c.z);
    for (let z1 = FAR; z1 > near; z1 -= TILE) {
      const z0 = Math.max(z1 - TILE, near), yA = sy(z1), yB = sy(z0); if (yA > H + 4) break; if (yB < 0) continue;
      const j = Math.round(z1 / TILE) - 1, kA = c.f / (z1 - c.z), half = Math.ceil((W / 2 / kA + Math.abs(c.x)) / TILE) + 1;
      for (let i = -half; i < half; i++) {
        const xa = sx(i * TILE, z1), xb = sx((i + 1) * TILE, z1), xc = sx((i + 1) * TILE, z0), xd = sx(i * TILE, z0);
        if (Math.max(xb, xc) < 0 || Math.min(xa, xd) > W) continue;
        X.beginPath(); X.moveTo(xa, yA); X.lineTo(xb, yA); X.lineTo(xc, yB); X.lineTo(xd, yB); X.closePath();
        X.fillStyle = tileCol(i, j, b, th, e, o); X.fill();
        X.lineWidth = Math.min(5, 1 + kA * 1.4); X.strokeStyle = 'rgba(14,6,34,.7)'; X.stroke();
      }
    }
    // haze where the floor meets the stage, and a soft sheen
    X.fillStyle = linGrad(0, c.hy, 0, c.hy + 190, [[0, rgba(th.bot, .9)], [1, rgba(th.bot, 0)]]); X.fillRect(0, c.hy, W, 190);
    X.save(); X.globalCompositeOperation = 'lighter'; X.globalAlpha = .1 * e * (.6 + .4 * beatK(t, 5));
    X.fillStyle = radGrad(W / 2, H * .82, 0, W * .6, [[0, '#FFFFFF'], [1, 'rgba(255,255,255,0)']]); X.fillRect(0, c.hy, W, H - c.hy); X.restore();
  }
  // A spotlight: a cone from above onto a pool of light on the floor at world (x, z).
  function spot(P, x, z, r, col, k = 1, from = [W / 2, -200]) {
    if (k <= .01) return;
    const [sx, sy, kk] = P.p(x, 0, z), rx = r * kk, ry = rx * .28;
    X.save(); X.globalCompositeOperation = 'lighter';
    X.globalAlpha = .2 * k; X.fillStyle = col; X.beginPath(); X.moveTo(from[0] - 16, from[1]); X.lineTo(from[0] + 16, from[1]); X.lineTo(sx + rx, sy); X.lineTo(sx - rx, sy); X.fill();
    X.globalAlpha = .5 * k; X.beginPath(); X.ellipse(sx, sy, rx, ry, 0, 0, TAU); X.fill();
    X.restore();
  }
  // Characters in depth order. list: [{ who, x, z, o, sc, y }]; returns their anchors by `id ?? who`.
  function cast(P, list) {
    const A = {};
    list.filter(it => it && P.depth(it.z ?? 0) > 40).sort((p, q) => (q.z ?? 0) - (p.z ?? 0)).forEach(it => {
      const [sx, sy, k] = P.p(it.x, it.y ?? 0, it.z ?? 0);
      A[it.id ?? it.who] = N9.put(it.who, sx, sy, k * (it.sc ?? 1), it.o || {});
      if (it.after) it.after(A[it.id ?? it.who], sx, sy, k);
    });
    return A;
  }
  // Light beams sweeping up from below (screen space, additive): the party look in front of the stage.
  function beams(t, k = 1, cols = [C.cyan, C.magenta, C.gold, C.lime]) {
    if (k <= 0) return;
    X.save(); X.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 6; i++) {
      const bx = W * (i + .5) / 6, a = -Math.PI / 2 + .55 * Math.sin(t * 1.3 + i * 1.7);
      X.globalAlpha = .13 * k; X.fillStyle = cols[i % cols.length];
      X.beginPath(); X.moveTo(bx, H + 20); X.lineTo(bx + Math.cos(a - .07) * 2200, H + Math.sin(a - .07) * 2200); X.lineTo(bx + Math.cos(a + .07) * 2200, H + Math.sin(a + .07) * 2200); X.fill();
    }
    X.restore();
  }
  void hop;
  return { TH, THEME_OF, TILE, view, back, floor, spot, cast, beams, discoBall, motif };
})();
