// scenes/fall_festival/scene75_turkey_takeover/kit.js: the kit of "Turkey Takeover": the cast helper (the brothers in chef whites
// and tall toques, Roudaynah and the audience kids added to scene 70's dance vocabulary), the TV-show graphics (LIVE bug, show
// clock, lower-thirds, freeze-frame name cards, score bug, split screens, speed lines, whip-pans, slams), the effects (flame jets,
// sparkles, steam, the flame breath, the icy flash) and the karaoke line. Everything is a pure function of its arguments and t.
Object.assign(TT, (() => {
  const { BEAT, BAR, B, bpos, beatK, LYRICS } = TT;
  const C = { ...N9.C, steel: '#C3CEDB', steelDk: '#6F7D8F', steelLt: '#EEF3F8', ice: '#A6ECFF', iceDk: '#3FA9DA', flame: '#FF7A1A', fire: '#FFB52E',
    tvRed: '#FF2E4D', tvNavy: '#140A2E', roast: '#D9862E', roastDk: '#8E4A14', cream: '#FFF4DC' };
  const kickK = N9.kickK, slamK = N9.slamK, on = N9.on, bigText = N9.bigText, slamText = N9.slamText;

  // ---------- the cast ----------
  // Roudaynah joins scene 70's rig table (shoulder, arm reach and ankle in her local units) so groove() can move her too.
  N9.RIG.roud ??= { fn: roudaynah, u: ROUDAYNAH_UNIT, sh: -24.5, sx: 3.2, arm: 9.6, ft: [1.7, -1] };
  // The brothers' chef whites: a palette swap on their own rigs (jacket, trousers and shirt go white; the professor keeps a red
  // neckerchief-tie, the doctor a blue one; black kitchen clogs), then the tall pleated toque with its badge.
  const WHITES = {
    prof: [() => SF, { suit: '#FFFFFF', suitDk: '#D2D9E4', suitLt: '#F6F8FB', shirt: '#FFFFFF', shirtDk: '#E2E6EC', tie: '#E5332F', tieDk: '#A61E1B', shoe: '#2B2230', shoeDk: '#17121A', shoeLt: '#4A3E52', button: '#C9A23A' }, 'atom', 'safadi'],
    doc: [() => SM, { suit: '#FFFFFF', suitDk: '#D2D9E4', suitLt: '#F6F8FB', shirt: '#FFFFFF', shirtDk: '#E2E6EC', tie: '#2C8FE0', tieDk: '#1C5C99', shoe: '#2B2230', shoeDk: '#17121A', shoeLt: '#4A3E52', button: '#C9A23A' }, 'cross', 'sami'],
  };
  function withPal(pal, over, fn) {
    const keep = {}; for (const k in over) { keep[k] = pal[k]; pal[k] = over[k]; }
    try { return fn(); } finally { Object.assign(pal, keep); }
  }
  // The toque: (top) = the top of the head, (head) = its centre, both screen px; s = px per local unit of the rig.
  function toque(top, head, s, badge, o = {}) {
    const ux = top[0] - head[0], uy = top[1] - head[1], ang = Math.atan2(uy, ux) + Math.PI / 2, r = 7.2 * s;
    const sway = (o.toqueSway ?? 0);
    X.save(); X.translate(top[0], top[1]); X.rotate(ang + sway); X.scale(r / 10, r / 10);
    const ink = C.ink, lwPx = Math.max(2, 3.2 * Math.min(1.6, s / 3));
    const tall = o.toqueTall ?? 1;
    // the puff: a cloud of five lobes, taller than it is wide
    const puff = [[-6.2, 1.6], [-8.2, -4], [-7.6, -10 * tall], [-4.2, -14.6 * tall], [0, -16 * tall], [4.2, -14.6 * tall], [7.6, -10 * tall], [8.2, -4], [6.2, 1.6]];
    shape(puff, { fill: '#FFFFFF', stroke: ink, lwPx, smooth: .9 });
    withBoil(0, () => {
      [-3.4, 0, 3.4].forEach(x => line([[x * .9, 1.0], [x * 1.15, -7 * tall], [x * .8, -13 * tall]], { stroke: 'rgba(120,135,160,.55)', lwPx: lwPx * .8, smooth: true }));
      ellipse(-3.8, -9 * tall, 2.2, 3.4, { fill: 'rgba(255,255,255,.9)', stroke: null, rot: -.3 });
    });
    // the pleated band
    shape([[-6.4, 4.2], [-6.6, -.4], [6.6, -.4], [6.4, 4.2]], { fill: '#F4F6FA', stroke: ink, lwPx, smooth: .15 });
    withBoil(0, () => { for (let i = -5; i <= 5; i += 1.25) line([[i, 3.9], [i * 1.02, -.2]], { stroke: 'rgba(120,135,160,.5)', lwPx: lwPx * .6 }); });
    // the badge
    if (badge === 'atom') {
      circle(0, 1.9, 2.15, { fill: '#2A4FA8', stroke: ink, lwPx: lwPx * .8 });
      X.save(); X.translate(0, 1.9); for (let i = 0; i < 3; i++) { ellipse(0, 0, 1.7, .62, { fill: null, stroke: '#9FE6FF', lwPx: lwPx * .55, rot: i * Math.PI / 3 + (o.t ?? T) * 1.5 }); } X.restore();
      circle(0, 1.9, .42, { fill: C.gold, stroke: null });
    } else {
      circle(0, 1.9, 2.15, { fill: '#FFFFFF', stroke: ink, lwPx: lwPx * .8 });
      shape([[-.5, .3], [.5, .3], [.5, 1.4], [1.6, 1.4], [1.6, 2.4], [.5, 2.4], [.5, 3.5], [-.5, 3.5], [-.5, 2.4], [-1.6, 2.4], [-1.6, 1.4], [-.5, 1.4]], { fill: '#E5332F', stroke: null });
    }
    X.restore();
  }
  // Draw `who` with feet at screen (x, y); kpx = px per world unit. who: any N9 rig id, or prof | doc (the chefs) | roud | student.
  function put(who, x, y, kpx, o = {}) {
    if (WHITES[who]) {
      const [pal, over, badge, id] = WHITES[who], s = SAFADI_UNIT * kpx * (o.sc ?? 1);
      const A = withPal(pal(), over, () => N9.put(id, x, y, kpx * (o.sc ?? 1), o));
      if (A?.top && A?.head && !o.noToque) toque(A.top, A.head, s, badge, o);
      return A;
    }
    if (who === 'student') return student(x, y, STUDENT_UNIT * kpx * (o.look?.h ?? 1), { t: T, ...o });
    return N9.put(who, x, y, kpx, o);
  }
  const RID = { prof: 'safadi', doc: 'sami' };
  const groove = (who, move, b, k = 1, i = 0) => N9.groove(RID[who] ?? who, move, b, k, i);
  // Shoulder-relative hand helper (local units): angle 0 = straight out sideways, PI/2 = straight up.
  const RIGOF = w => N9.RIG[RID[w] ?? w];
  const hand = (who, sd, ang, ext = 1) => { const g = RIGOF(who); return [sd * (g.sx + Math.cos(ang) * g.arm * ext), g.sh - Math.sin(ang) * g.arm * ext]; };
  // The salute for YES, CHEF!: right hand snaps to the brow, chest out, a hop (k = 0..1 snap, decays after).
  function salute(who, k, b = 0) {
    const g = RIGOF(who); if (!g || g.beast) return groove(who, 'cheer', b, 1);
    const up = clamp(k);
    return { eyes: 'happy', mouth: 'open', brows: 'up', jump: 1.2 * up * g.arm * .3, sq: -.05 * up, tilt: -.04 * up,
      handR: mixPt(hand(who, 1, -1.1, .8), [g.sx * .55, g.sh - g.arm * .78], up), handPoseR: 'palm',
      handL: mixPt(hand(who, -1, -1.2, .8), hand(who, -1, -1.35, .85), up), handPoseL: 'fist' };
  }
  // The chefs' bossy point at camera.
  function bossy(who, b, k = 1) {
    const hp = Math.abs(Math.sin(b * Math.PI));
    return { eyes: 'open', brows: 'angry', mouth: hp > .5 ? 'open' : 'teeth', lean: .06 * k, dy: .2 * hp, tilt: .05 * Math.sin(b * Math.PI),
      handR: hand(who, 1, .25 + .2 * hp, 1.0), handPoseR: 'point', handL: hand(who, -1, -1.0, .75), handPoseL: 'fist' };
  }

  // ---------- TV graphics (all screen space, drawn as overlays) ----------
  function pill(x, y, w, h, fill, stroke = null, lw = 4) { X.beginPath(); X.roundRect(x, y, w, h, h / 2); X.fillStyle = fill; X.fill(); if (stroke) { X.strokeStyle = stroke; X.lineWidth = lw; X.stroke(); } }
  function txt(s, x, y, size, fill, o = {}) {
    X.save(); X.font = `${o.weight ?? ''} ${size}px ${o.font ?? FONT_SFX}`; X.textAlign = o.align ?? 'left'; X.textBaseline = 'middle'; X.lineJoin = 'round';
    if (o.max) { const w = X.measureText(s).width; if (w > o.max) { X.translate(x, y); X.scale(o.max / w, 1); X.translate(-x, -y); } }
    if (o.stroke) { X.lineWidth = o.lw ?? size * .18; X.strokeStyle = o.stroke; X.strokeText(s, x, y); }
    if (o.glow) { X.shadowColor = o.glow; X.shadowBlur = o.blur ?? size * .4; }
    X.fillStyle = fill; X.fillText(s, x, y); X.restore();
  }
  // The little flame-turkey logo (screen px, r = radius).
  function logo(x, y, r, t) {
    X.save(); X.translate(x, y);
    for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .32, l = r * (1.25 + .18 * Math.sin(t * 9 + i * 2)); shape([[Math.cos(a - .13) * r * .7, Math.sin(a - .13) * r * .7], [Math.cos(a) * l, Math.sin(a) * l], [Math.cos(a + .13) * r * .7, Math.sin(a + .13) * r * .7]], { fill: i % 2 ? C.fire : C.flame, stroke: null }); }
    circle(0, 0, r, { fill: C.tvRed, stroke: C.ink, lwPx: Math.max(2, r * .1) });
    ellipse(0, r * .1, r * .6, r * .45, { fill: C.roast, stroke: C.ink, lwPx: Math.max(1.5, r * .06) });
    [-1, 1].forEach(sd => { line([[sd * r * .45, -r * .05], [sd * r * .7, -r * .45]], { stroke: C.roastDk, lwPx: r * .2 }); circle(sd * r * .72, -r * .48, r * .12, { fill: '#FFFFFF', stroke: C.ink, lwPx: 1.5 }); });
    X.restore();
  }
  // Top-left: logo + TURKEY TAKEOVER + a blinking red LIVE pill. Top-right: the show clock (2:15 down to 0:00). k fades it.
  function hud(t, k = 1) {
    if (k <= .01) return;
    overlay(() => {
      X.save(); X.globalAlpha = k; X.translate(0, -(1 - k) * 80);
      pill(36, 30, 560, 78, 'rgba(20,10,46,.82)', 'rgba(255,255,255,.35)', 3);
      logo(78, 69, 27, t);
      txt('TURKEY TAKEOVER', 118, 62, 36, '#FFFFFF', { stroke: C.ink, lw: 6 });
      txt('THE SAFADI KITCHEN', 120, 92, 17, 'rgba(255,255,255,.75)', { font: FONT_TALK, weight: 700 });
      pill(470, 48, 104, 40, C.tvRed);
      if (frac(t * 1.07) < .62) circle(492, 68, 8, { fill: '#FFFFFF', stroke: null });
      txt('LIVE', 508, 69, 25, '#FFFFFF');
      const left = Math.max(0, TT.CUT.end - t), mm = Math.floor(left / 60), ss = Math.floor(left % 60);
      pill(W - 250, 30, 214, 78, 'rgba(20,10,46,.82)', 'rgba(255,255,255,.35)', 3);
      circle(W - 205, 69, 24, { fill: '#FFFFFF', stroke: C.ink, lwPx: 3 });
      const a = -Math.PI / 2 + frac(t) * TAU; line([[W - 205, 69], [W - 205 + Math.cos(a) * 18, 69 + Math.sin(a) * 18]], { stroke: C.tvRed, lwPx: 4 });
      txt(`${mm}:${String(ss).padStart(2, '0')}`, W - 168, 70, 46, left < 15 ? C.gold : '#FFFFFF', { stroke: C.ink, lw: 7 });
      X.restore();
    });
  }
  // A lower-third: NAME in a big bar, the job in a strip under it; slides in at t0, out at t1. Sits above the karaoke line.
  function lowerThird(t, t0, t1, name, job, col = C.tvRed, o = {}) {
    const k = backOut(seg(t, t0, t0 + .28)) * (1 - easeIn(seg(t, t1 - .2, t1))); if (k <= .01) return;
    overlay(() => {
      const x0 = (o.x ?? 70) - (1 - k) * 900, y0 = o.y ?? H - 330;
      X.save(); X.translate(x0, y0); X.transform(1, 0, -.18, 1, 0, 0);
      X.fillStyle = col; X.fillRect(0, 0, o.w ?? 640, 92);
      X.fillStyle = 'rgba(255,255,255,.22)'; X.fillRect(0, 0, o.w ?? 640, 14);
      X.fillStyle = C.tvNavy; X.fillRect(30, 92, (o.w ?? 640) - 60, 52);
      X.fillStyle = C.gold; X.fillRect(30, 92, 14, 52);
      X.restore();
      txt(name, x0 + 40, y0 + 50, 64, '#FFFFFF', { stroke: C.ink, lw: 9, max: (o.w ?? 640) - 70 });
      txt(job, x0 + 52, y0 + 119, 30, C.gold, { font: FONT_TALK, weight: 700, max: (o.w ?? 640) - 110 });
    });
  }
  // The freeze-frame name card: the picture goes still and tinted, a big slanted card slams across with name and job.
  function nameCard(t, t0, name, job, col, side = 1) {
    const age = t - t0; if (age < 0) return;
    const k = backOut(seg(age, 0, .25));
    overlay(() => {
      X.save(); X.translate(W / 2 + side * (1 - k) * 1400, 0);
      X.globalAlpha = .9; X.fillStyle = col;
      X.beginPath(); X.moveTo(side > 0 ? 760 - W / 2 : -W / 2, 640); X.lineTo(side > 0 ? W / 2 : 1160 - W / 2, 600); X.lineTo(side > 0 ? W / 2 : 1100 - W / 2, 860); X.lineTo(side > 0 ? 700 - W / 2 : -W / 2, 900); X.fill();
      X.globalAlpha = 1; X.restore();
      const cx = side > 0 ? 1360 : 560;
      X.save(); X.translate(side * (1 - k) * 1400, 0);
      txt(name, cx, 715, 120, '#FFFFFF', { align: 'center', stroke: C.ink, lw: 16, max: 820 });
      txt(job, cx, 815, 46, C.gold, { align: 'center', stroke: C.ink, lw: 8, max: 760 });
      X.restore();
    });
  }
  // A score bug: three judges' cards (top right, under the clock).
  function scoreBug(t, t0, scores, o = {}) {
    const k = backOut(seg(t, t0, t0 + .3)); if (k <= .01) return;
    overlay(() => {
      X.save(); X.translate(W - 520 + (1 - k) * 600, o.y ?? 130);
      pill(0, 0, 484, 90, 'rgba(20,10,46,.85)', C.gold, 4);
      txt(o.label ?? 'JUDGES', 30, 46, 30, C.gold, { stroke: C.ink, lw: 5 });
      scores.forEach((v, i) => { const x = 210 + i * 88, p = 1 + .5 * kickK(t, t0 + .2 + i * .15, 6); X.save(); X.translate(x + 34, 45); X.scale(p, p);
        X.fillStyle = '#FFFFFF'; X.fillRect(-32, -32, 64, 64); X.strokeStyle = C.ink; X.lineWidth = 4; X.strokeRect(-32, -32, 64, 64);
        txt(String(v), 0, 3, 46, v >= 10 ? C.tvRed : C.ink, { align: 'center' }); X.restore(); });
      X.restore();
    });
  }
  // A split screen: panels = [{ fn, clip: [[x,y]…] (screen polygon), cx, cy, sc }]; each fn paints a full frame that is scaled
  // by sc around the panel centre (cx, cy). Overlays from inside a panel would escape the clip, so panel painters use bigText.
  function split(panels, o = {}) {
    panels.forEach(p => {
      X.save(); X.beginPath(); p.clip.forEach(([x, y], i) => (i ? X.lineTo(x, y) : X.moveTo(x, y))); X.closePath(); X.clip();
      X.translate(p.cx, p.cy); X.scale(p.sc, p.sc); X.translate(-(p.fx ?? W / 2), -(p.fy ?? H / 2));
      p.fn(); X.restore();
    });
    panels.forEach(p => { shape(p.clip, { fill: null, stroke: o.ink ?? C.ink, lwPx: (o.lw ?? 16) + 10 }); shape(p.clip, { fill: null, stroke: p.edge ?? o.edge ?? '#FFFFFF', lwPx: o.lw ?? 16 }); });
  }
  // Common split layouts (screen polygons): two slanted halves, three slanted thirds, a 2×2 quad.
  const SPLIT2 = [[[0, 0], [1080, 0], [840, H], [0, H]], [[1080, 0], [W, 0], [W, H], [840, H]]];
  const SPLIT3 = [[[0, 0], [720, 0], [560, H], [0, H]], [[720, 0], [1360, 0], [1200, H], [560, H]], [[1360, 0], [W, 0], [W, H], [1200, H]]];
  const QUAD = [[[0, 0], [W / 2, 0], [W / 2, H / 2], [0, H / 2]], [[W / 2, 0], [W, 0], [W, H / 2], [W / 2, H / 2]], [[0, H / 2], [W / 2, H / 2], [W / 2, H], [0, H]], [[W / 2, H / 2], [W, H / 2], [W, H], [W / 2, H]]];
  const ctr = poly => [poly.reduce((a, p) => a + p[0], 0) / poly.length, poly.reduce((a, p) => a + p[1], 0) / poly.length];

  // Speed lines: radial streaks toward (cx, cy), k = strength; or horizontal streaks (o.dir) for a whip-pan.
  function speedLines(t, cx, cy, k = 1, o = {}) {
    if (k <= .01) return;
    overlay(() => {
      X.save(); X.globalAlpha = clamp(k) * (o.alpha ?? .55); const n = o.n ?? 60, f = Math.floor(t * 24);
      for (let i = 0; i < n; i++) {
        const a = hash(i * 3.1 + f * .37) * TAU, r0 = (o.r0 ?? 360) + 260 * hash(i * 7 + f), r1 = r0 + 300 + 600 * hash(i * 11 + f);
        X.strokeStyle = o.col ?? '#FFFFFF'; X.lineWidth = 3 + 8 * hash(i * 5 + f); X.beginPath();
        X.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * .8); X.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 * .8); X.stroke();
      }
      X.restore();
    });
  }
  function whip(t, lt, dir = 1, dur = .16) {
    const k = 1 - seg(lt, 0, dur); if (k <= 0) return;
    overlay(() => {
      X.save(); X.globalAlpha = .75 * k; const f = Math.floor(t * 24);
      for (let i = 0; i < 46; i++) { const y = hash(i * 1.3 + f) * H, len = 400 + 900 * hash(i * 2.9), x = (hash(i * 5.7 + f) * (W + len)) - len;
        X.fillStyle = i % 3 ? 'rgba(255,255,255,.7)' : rgba(C.gold, .8); X.fillRect(dir > 0 ? x : W - x - len, y, len, 3 + 10 * hash(i * 7)); }
      X.restore();
    });
  }
  // Camera helpers: a 2D push on top of the 3D view, with shake on the hits and a bump on every beat.
  const shake = (t, hits) => N9.shake(t, hits);
  // Little sparkle star (4 points).
  function sparkle(x, y, r, col = '#FFFFFF', rot = 0, alpha = 1) {
    if (r <= .5 || alpha <= .01) return;
    shape([[x, y - r], [x + r * .22, y - r * .22], [x + r, y], [x + r * .22, y + r * .22], [x, y + r], [x - r * .22, y + r * .22], [x - r, y], [x - r * .22, y - r * .22]].map(([px, py]) => { const dx = px - x, dy = py - y; return [x + dx * Math.cos(rot) - dy * Math.sin(rot), y + dx * Math.sin(rot) + dy * Math.cos(rot)]; }),
      { fill: col, stroke: null, alpha });
  }
  // A cloud of twinkles around (cx, cy) of radius R.
  function twinkles(t, cx, cy, R, n = 18, seed = 0, cols = ['#FFFFFF', C.gold, '#FFF3A8'], size = 16) {
    for (let i = 0; i < n; i++) {
      const a = hash(i + seed) * TAU + t * (.4 + hash(i * 3 + seed)), d = R * Math.sqrt(hash(i * 7 + seed)), tw = Math.abs(Math.sin(t * (3 + 3 * hash(i * 5)) + i));
      sparkle(cx + Math.cos(a) * d, cy + Math.sin(a) * d * .8, size * (.4 + .8 * tw), cols[i % cols.length], t * 2 + i, .3 + .7 * tw);
    }
  }
  // Steam wisps rising from (x, y): w px wide, h px tall.
  function steam(t, x, y, w, h, k = 1, n = 4) {
    if (k <= .01) return;
    for (let i = 0; i < n; i++) {
      const u = frac(t * .55 + i / n), px = x + (i - (n - 1) / 2) * w / n, pts = [];
      for (let j = 0; j <= 8; j++) { const v = j / 8; pts.push([px + Math.sin(v * 5 + t * 3 + i * 2) * w * .08 * (1 + v), y - (u * .4 + v * .6) * h]); }
      line(pts, { stroke: rgba('#FFFFFF', .55 * k * Math.sin(Math.PI * u)), lwPx: Math.max(4, w * .06), smooth: true });
    }
  }
  // A flame jet from (x, y) straight up, h px tall (k = 0..1 burst). Additive-looking layered tongues.
  function flameJet(t, x, y, h, k, w = 0) {
    if (k <= .02) return;
    w = w || h * .22;
    const f = Math.floor(t * 30), hh = h * k;
    [[C.tvRed, 1, 1], [C.flame, .82, .78], [C.fire, .62, .55], ['#FFF3B0', .38, .3]].forEach(([col, sx, sy], li) => {
      const pts = [[x - w * sx * .5, y]];
      for (let i = 1; i <= 6; i++) { const v = i / 6, jw = (hash(f * 1.3 + i * 7 + li) - .5) * w * .4; pts.push([x - w * sx * .5 * (1 - v * .85) + jw, y - hh * sy * v]); }
      pts.push([x + (hash(f + li) - .5) * w * .3, y - hh * sy * (1.08 + .1 * hash(f * 3 + li))]);
      for (let i = 6; i >= 1; i--) { const v = i / 6, jw = (hash(f * 2.1 + i * 5 + li) - .5) * w * .4; pts.push([x + w * sx * .5 * (1 - v * .85) + jw, y - hh * sy * v]); }
      pts.push([x + w * sx * .5, y]);
      shape(pts, { fill: col, stroke: null, smooth: .6, alpha: .95 });
    });
    for (let i = 0; i < 10; i++) { const u = frac(hash(i) + t * 1.6); circle(x + (hash(i * 3) - .5) * w * 1.4, y - hh * (.6 + u * .7), 4 + 6 * hash(i * 5), { fill: C.fire, stroke: null, alpha: (1 - u) * k }); }
  }
  // A cone of dragon fire from (x0, y0) toward (x1, y1); k = 0..1 over the breath.
  function flameBreath(t, x0, y0, x1, y1, k, w = 120) {
    if (k <= 0 || k >= 1) return;
    const reach = easeOut(seg(k, 0, .3)), fade = 1 - seg(k, .8, 1), ang = Math.atan2(y1 - y0, x1 - x0), len = Math.hypot(x1 - x0, y1 - y0) * reach, f = Math.floor(t * 30);
    X.save(); X.translate(x0, y0); X.rotate(ang); X.globalAlpha = fade;
    [[C.tvRed, 1], [C.flame, .75], [C.fire, .5], ['#FFF6C8', .25]].forEach(([col, sc], li) => {
      const pts = [[0, -w * .08 * sc]];
      for (let i = 1; i <= 8; i++) { const v = i / 8, r = w * sc * (.15 + .85 * v) * .5 * (1 + .25 * (hash(f + i * 3 + li) - .5)); pts.push([len * v, -r]); }
      pts.push([len * 1.08, 0]);
      for (let i = 8; i >= 1; i--) { const v = i / 8, r = w * sc * (.15 + .85 * v) * .5 * (1 + .25 * (hash(f * 2 + i * 5 + li) - .5)); pts.push([len * v, r]); }
      pts.push([0, w * .08 * sc]);
      shape(pts, { fill: col, stroke: null, smooth: .5 });
    });
    X.restore();
  }
  // Rotating red siren light wash (the inspection), k strength.
  function siren(t, k = 1) {
    if (k <= .01) return;
    overlay(() => {
      X.save(); X.globalCompositeOperation = 'lighter';
      for (const sd of [-1, 1]) { const a = t * 7 * sd, cx = W / 2 + sd * 780, cy = 110;
        X.globalAlpha = .28 * k; X.fillStyle = sd > 0 ? '#FF2040' : '#FF6A20';
        X.beginPath(); X.moveTo(cx, cy); X.arc(cx, cy, 2600, a - .25, a + .25); X.closePath(); X.fill(); }
      X.globalAlpha = .12 * k * (.5 + .5 * Math.sin(t * 14)); X.fillStyle = '#FF2040'; X.fillRect(0, 0, W, H);
      X.restore();
    });
  }
  // The icy flash: a white-blue flash with frost creeping in from the corners.
  function icy(t, t0, k = 1) {
    const age = t - t0; if (age < 0) return;
    const fl = Math.exp(-age * 5) * k, fr = clamp(1 - seg(age, 1.4, 1.9)) * k;
    overlay(() => {
      if (fl > .01) { X.globalAlpha = fl; X.fillStyle = '#E6FAFF'; X.fillRect(0, 0, W, H); X.globalAlpha = 1; }
      if (fr > .01) {
        X.save(); X.globalAlpha = fr;
        X.fillStyle = radGrad(W / 2, H / 2, H * .35, H * 1.05, [[0, 'rgba(190,240,255,0)'], [1, 'rgba(190,240,255,.5)']]); X.fillRect(0, 0, W, H);
        X.strokeStyle = 'rgba(255,255,255,.9)'; X.lineWidth = 4;
        [[0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1]].forEach(([x, y, sx, sy], c) => {
          for (let i = 0; i < 7; i++) { const a = (i / 6) * Math.PI / 2, L = (160 + 200 * hash(i + c * 9)) * easeOut(seg(age, 0, .4));
            const ex = x + sx * Math.cos(a) * L, ey = y + sy * Math.sin(a) * L; X.beginPath(); X.moveTo(x, y); X.lineTo(ex, ey); X.stroke();
            for (let j = 1; j < 3; j++) { const mx = lerp(x, ex, j / 3), my = lerp(y, ey, j / 3), bl = L * .22; X.beginPath(); X.moveTo(mx, my); X.lineTo(mx + sx * Math.cos(a + .6) * bl, my + sy * Math.sin(a + .6) * bl); X.moveTo(mx, my); X.lineTo(mx + sx * Math.cos(a - .6) * bl, my + sy * Math.sin(a - .6) * bl); X.stroke(); } }
        });
        X.restore();
      }
    });
  }
  // A big beat-pinned word slam with a white flash on it (overlay).
  function slam(word, x, y, size, col, t, t0, life = .9, rot = 0, o = {}) {
    slamText(word, x, y, size, col, t, t0, life, rot, { glow: o.glow ?? '#FFFFFF', ...o });
    if (o.flash !== false) flash(.35 * kickK(t, t0, 10));
  }
  // A "YES, CHEF!" sticker: starburst + text, popping on the hit.
  function yesChef(t, t0, x, y, size = 1, life = .95) {
    const age = t - t0; if (age < 0 || age > life) return;
    const k = slamK(t, t0) * (1 - easeIn(seg(age, life - .2, life)));
    overlay(() => {
      X.save(); X.translate(x, y); X.rotate(-.06 + .03 * Math.sin(t * 20)); X.scale(k * size, k * size);
      shape(starPts(0, 0, 260, .78, 16, t * .8), { fill: C.gold, stroke: C.ink, lwPx: 7 });
      shape(starPts(0, 0, 222, .8, 16, t * .8 + .1), { fill: C.tvRed, stroke: null });
      X.restore();
      bigText('YES, CHEF!', x, y, 112 * size, '#FFFFFF', k, -.06, { glow: C.gold });
    });
    flash(.25 * kickK(t, t0, 12));
  }

  // ---------- the karaoke line ----------
  const INK = { ann: ['#9FE6FF', '#3DB8FF'], prof: ['#FFC96B', '#FF8A2B'], doc: ['#9FF0C8', '#2FD39A'], chefs: ['#FFE08A', '#FF9E3D'], kids: ['#FF8AD8', '#FF3D9A'], all: ['#FFFFFF', '#FFD23F'], pearl: ['#F3B8FF', '#C46BFF'] };
  const SHOUT = /^(TURKEY|TAKE|OVER|YES|CHEF|THIS|FROZEN|CHOP|STIR|BASTE|TASTE|FIVE|FOUR|THREE|TWO|ONE|PERFECT|NO|EAT)[!.,?…]*$/;
  function karaoke(t, o = {}) {
    const live = LYRICS.filter(([end, , w]) => t >= w[0][0] - .4 && t < end + .25);
    const row = live.filter(r => t >= r[2][0][0] - .1).pop() ?? live[0];
    if (!row) return;
    const [end, who, words] = row, t0 = words[0][0];
    const k = easeOut(seg(t, t0 - .4, t0 - .12)) * (1 - easeIn(seg(t, end, end + .25)));
    if (k < .02) return;
    overlay(() => {
      const size = 58, y = (o.y ?? H - 78) + (1 - k) * 40;
      X.save(); X.font = `${size}px ${FONT_SFX}`; X.textBaseline = 'middle'; X.textAlign = 'left'; X.lineJoin = 'round';
      const tx = words.map(w => w[1].toUpperCase()), sp = size * .3, ws = tx.map(s => X.measureText(s).width);
      const total = ws.reduce((a, c) => a + c, 0) + sp * (tx.length - 1), sc = Math.min(1, (W - 200) / total);
      X.translate(W / 2, y); X.scale(sc, sc); X.translate(-W / 2, -y);
      let x = W / 2 - total / 2;
      X.globalAlpha = k;
      X.fillStyle = 'rgba(16,8,36,.66)'; X.beginPath(); X.roundRect(W / 2 - total / 2 - 40, y - size * .72, total + 80, size * 1.36, size * .68); X.fill();
      // the singer's tag
      const tag = { ann: 'ANNOUNCER', prof: 'CHEF SAFADI', doc: 'CHEF SAMI', chefs: 'THE CHEFS', kids: 'THE BRIGADE', all: 'EVERYBODY', pearl: 'PRINCESS PEARL' }[who];
      X.font = `700 22px ${FONT_TALK}`; X.fillStyle = INK[who][1]; X.fillText(tag, W / 2 - total / 2 - 20, y - size * .98);
      X.font = `${size}px ${FONT_SFX}`;
      tx.forEach((s, i) => {
        const [ws0, , kid] = words[i], on1 = t >= ws0, age = t - ws0, shout = SHOUT.test(words[i][1].toUpperCase()), [lit, glow] = INK[kid ? 'kids' : who];
        const pop = on1 ? 1 + (shout ? .45 : .26) * Math.max(0, 1 - age / (shout ? .32 : .22)) : 1;
        X.save(); X.translate(x + ws[i] / 2, y - (on1 ? 6 * Math.max(0, 1 - age / .22) : 0)); X.scale(pop, pop);
        X.lineWidth = size * .2; X.strokeStyle = '#130820'; X.strokeText(s, -ws[i] / 2, 0);
        if (on1) { X.shadowColor = glow; X.shadowBlur = 18 * Math.max(.35, 1 - age / .6); }
        X.fillStyle = on1 ? (shout ? '#FFFFFF' : lit) : 'rgba(255,248,236,.6)'; X.fillText(s, -ws[i] / 2, 0);
        X.restore();
        x += ws[i] + sp;
      });
      X.restore();
    });
  }

  return { C, kickK, slamK, on, bigText, slamText, put, groove, hand, salute, bossy, toque, withPal, WHITES, pill, txt, logo, hud, lowerThird, nameCard, scoreBug,
    split, SPLIT2, SPLIT3, QUAD, ctr, speedLines, whip, shake, sparkle, twinkles, steam, flameJet, flameBreath, siren, icy, slam, yesChef, karaoke, INK };
})());
