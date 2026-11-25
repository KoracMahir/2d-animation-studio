// First four seconds of a Howmch Reel. The shelf price and the real app share one screen point.
// The new amount is the recording's own coral card, sprung into place, then held still.
// SHOW_GUIDES draws the safe rect. Export with it false.
(() => {
  const K = LOCATIONS.family_kitchen, INK = PAL.ink, ME = ASSETS.scene.scene83_howmch_open;
  const SHOW_GUIDES = false;
  const SAFE = { l: 90, t: 240, r: 840, b: 1430 };
  const TAG = { x: 700, y: 1000 };
  // Screen point shared by the illustrated "4" and the "4" in the recording.
  const LOCK = { x: 540, y: 960 };
  // Big "4" measured in app-frame.png. Both shots aim this point at LOCK.
  const APP = { srcW: 444, srcH: 960, fourX: 209.2, fourY: 576.6, scale: 2.2 };
  const CARD = { x: 14, y: 456, w: 285, h: 123, rad: 22 };
  const JX = 400, JY = 1480, JS = 31;
  const SC = JS * 1.06;
  const SHOT = new Image();
  SHOT.src = `${ME.dir}/../scene81_howmch_v4/app-frame.png`;
  SHOT.alt = '';
  document.body.appendChild(SHOT);

  function text(s, x, y, size, col = INK, o = {}) {
    X.save();
    X.font = `${o.weight || 700} ${size}px ${o.font || FONT_TALK}`;
    X.textAlign = o.align || 'left';
    X.textBaseline = 'middle';
    if (o.stroke) {
      X.lineJoin = 'round';
      X.lineWidth = o.sw || Math.max(4, size * .14);
      X.strokeStyle = o.stroke;
      X.strokeText(s, x, y);
    }
    X.fillStyle = col;
    X.fillText(s, x, y);
    X.restore();
  }
  function rbox(x, y, w, h, fill, stroke, rad = 10, lw = 3) {
    X.beginPath();
    X.roundRect(x, y, w, h, rad);
    if (fill) { X.fillStyle = fill; X.fill(); }
    if (stroke) { X.lineWidth = lw; X.strokeStyle = stroke; X.stroke(); }
  }
  function kitchen(t) {
    const P = persp({ x: 16, y: 118, z: 640, f: 860, hy: 500, dir: 1 });
    K.back(P, t, { time: 'day', islandItems: false, counterItems: false });
  }
  function rail() {
    const lip = 930;
    shape([[-240, lip - 86], [1320, lip - 62], [1360, lip + 6], [-280, lip + 18]], { fill: '#E2C08A', stroke: INK, lwPx: 4, smooth: .04 });
    shape([[-280, lip + 18], [1360, lip + 6], [1320, lip + 158], [-240, lip + 170]], { fill: '#C9965C', stroke: INK, lwPx: 4 });
    shape([[-220, lip + 136], [1300, lip + 126], [1280, lip + 168], [-240, lip + 178]], { fill: '#A67B45', stroke: null });
  }
  function priceTag() {
    const w = 300, h = 168, x = TAG.x - w / 2, y = TAG.y - h / 2;
    ellipse(TAG.x + 8, y + h + 6, w * .4, 11, { fill: 'rgba(40,24,12,.2)', stroke: null });
    rbox(x, y, w, h, 'rgba(232,242,246,.72)', 'rgba(70,96,108,.95)', 7, 3);
    line([[x + 8, y + 3.5], [x + w - 8, y + 3.5]], { stroke: 'rgba(255,255,255,.95)', lwPx: 4 });
    const px = x + 12, py = y + 16, pw = w - 24, ph = h - 28;
    rbox(px, py, pw, ph, '#FFE14A', INK, 3, 3);
    text('Special', TAG.x, py + 24, 28, '#1A1A1A', { align: 'center' });
    text('$', px + 16, py + ph - 50, 48, '#1A1A1A');
    text('4', px + 64, py + ph - 38, 102, '#1A1A1A');
    text('25', px + 158, py + ph - 96, 44, '#1A1A1A');
  }
  function honeyJar(cx, cy) {
    X.save();
    X.translate(cx, cy);
    ellipse(8, 108, 86, 14, { fill: 'rgba(48,28,16,.28)', stroke: null });
    X.beginPath();
    X.roundRect(-78, -92, 156, 200, [20, 20, 48, 48]);
    X.fillStyle = '#F0B429';
    X.fill();
    X.lineWidth = 4;
    X.strokeStyle = INK;
    X.stroke();
    rbox(-58, -60, 18, 110, 'rgba(255,255,255,.4)', null, 8, 0);
    rbox(-32, -112, 64, 24, '#F3D48A', INK, 6, 3);
    rbox(-58, -136, 116, 28, '#E3B34A', INK, 8, 3);
    ellipse(2, -8, 36, 26, { fill: '#FFE7A0', stroke: INK, lwPx: 3 });
    ellipse(2, -8, 14, 10, { fill: '#F0B429', stroke: INK, lwPx: 2 });
    X.restore();
  }
  function basket(x, y, part) {
    X.save(); X.translate(x, y);
    if (part !== 'front') shape([[-96, 0], [96, 0], [72, 86], [-72, 86]], { fill: '#C9854A', stroke: INK, lwPx: 4, smooth: .25 });
    if (part !== 'back') {
      line([[-108, 0], [108, 0]], { stroke: INK, lwPx: 8 });
      line([[-52, 0], [-36, -36], [36, -36], [52, 0]], { stroke: INK, lwPx: 5 });
      shape([[-96, 0], [96, 0], [88, 22], [-88, 22]], { fill: '#B8743A', stroke: INK, lwPx: 3, smooth: .2 });
    }
    X.restore();
  }
  // World point of the illustrated "4", matching the text layout in priceTag.
  const FOUR = { x: TAG.x - 44, y: TAG.y + 34 };
  function store(t, z) {
    X.fillStyle = '#F1E6D2';
    X.fillRect(0, 0, 1080, 1920);
    camBegin(FOUR.x, FOUR.y, z);
    X.fillStyle = '#F1E6D2';
    X.fillRect(-800, -800, 2600, 2200);
    X.fillStyle = '#E4CBA4';
    X.fillRect(-800, 1400, 2600, 1600);
    kitchen(t);
    rail();
    priceTag();
    basket(608, 1148, 'back');
    honeyJar(700, 790);
    jenna(JX, JY, JS, {
      t, giraffe: false, boil: .12,
      lookX: .35, lookY: .15,
      eyes: 'wide', brows: 'up', mouth: 'o',
      handR: [2.3, -10.3], handPoseR: 'hip',
      handL: [-2.2, -10.4], handPoseL: 'hip',
    });
    basket(608, 1148, 'front');
    camEnd();
  }
  function say() {
    const s = 'What’s $4.25 in my money?';
    const size = 40;
    X.save();
    X.font = `700 ${size}px ${FONT_TALK}`;
    const w = X.measureText(s).width;
    X.restore();
    const boxW = Math.min(w + 44, SAFE.r - SAFE.l - 16);
    const x = Math.round((SAFE.l + SAFE.r - boxW) / 2);
    const y = SAFE.b - 86;
    rbox(x, y, boxW, 64, 'rgba(22,16,18,.88)', null, 16, 0);
    text(s, x + boxW / 2, y + 32, size, '#FFFDF8', { align: 'center' });
  }
  function guides() {
    if (!SHOW_GUIDES) return;
    overlay(() => {
      X.save();
      X.strokeStyle = '#FF2D8A'; X.lineWidth = 3; X.setLineDash([10, 8]);
      X.strokeRect(SAFE.l, SAFE.t, SAFE.r - SAFE.l, SAFE.b - SAFE.t);
      X.setLineDash([]);
      X.fillStyle = '#FF2D8A';
      X.fillRect(LOCK.x - 8, LOCK.y - 2, 16, 4);
      X.fillRect(LOCK.x - 2, LOCK.y - 8, 4, 16);
      X.restore();
    });
  }
  function placeApp() {
    const s = APP.scale;
    return { s, ox: LOCK.x - APP.fourX * s, oy: LOCK.y - APP.fourY * s };
  }
  function drawApp() {
    const { s, ox, oy } = placeApp();
    X.fillStyle = '#07080c';
    X.fillRect(0, 0, 1080, 1920);
    if (SHOT.complete && SHOT.naturalWidth) X.drawImage(SHOT, ox, oy, APP.srcW * s, APP.srcH * s);
    return { s, ox, oy };
  }
  // product-card-progressive-assemble: the new price springs 1.18 → 1, then stops.
  function priceSpring(u) {
    if (u >= 1) return 1;
    const damp = Math.exp(-7 * u);
    return 1 + 0.18 * damp * Math.cos(u * 9);
  }
  function coral(sc, placed) {
    if (sc <= 1.002 || !(SHOT.complete && SHOT.naturalWidth)) return;
    const { s, ox, oy } = placed;
    const cx = ox + (CARD.x + CARD.w / 2) * s;
    const cy = oy + (CARD.y + CARD.h / 2) * s;
    X.save();
    X.translate(cx, cy);
    X.scale(sc, sc);
    X.translate(-cx, -cy);
    X.beginPath();
    X.roundRect(ox + CARD.x * s, oy + CARD.y * s, CARD.w * s, CARD.h * s, CARD.rad * s);
    X.clip();
    X.drawImage(SHOT, ox, oy, APP.srcW * s, APP.srcH * s);
    X.restore();
  }

  function shelf(t, lt) {
    const z = lerp(1.5, 1.72, ease(seg(lt, 0.15, 1.25)));
    store(t, z);
    say();
    guides();
  }
  function arrive(t, lt) {
    const placed = drawApp();
    coral(priceSpring(seg(lt, 0, 0.42)), placed);
    say();
    guides();
  }
  function hold() {
    drawApp();
    say();
    guides();
  }

  scene({
    duration: 4,
    fps: 24,
    bpm: 80,
    width: 1080,
    height: 1920,
    shots: [
      [0, shelf],
      [1.7, arrive],
      [2.15, hold],
    ],
  });
})();
