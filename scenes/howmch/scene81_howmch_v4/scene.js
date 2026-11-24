// Howmch vertical short, fourth cut. The camera view is a real frame of the app, not a redraw.
// Canvas 1080×1920. The yellow tag stays put across the cut into that frame.
// SHOW_GUIDES draws the safe rect and fake Reels / TikTok / Shorts chrome. Export with it false.
(() => {
  const K = LOCATIONS.family_kitchen, INK = PAL.ink, ME = ASSETS.scene.scene81_howmch_v4;
  const SHOW_GUIDES = false;
  const SAFE = { l: 90, t: 240, r: 840, b: 1430 };
  // The illustrated tag's center. The camera stays aimed here, so the push-in does not slide the price.
  const FOCUS = { x: 540, y: 1000 };
  const JX = 280, JY = 1480, JS = 31;
  const SC = JS * 1.06;
  const Z_IN = 1.32;
  // Real frame: yellow-tag center measured at (220.5, 479.5) inside the 444×960 recording.
  const APP = { srcW: 444, srcH: 960, tagX: 220.5, tagY: 479.5 };
  const SHOT = new Image();
  SHOT.src = `${ME.dir}/app-frame.png`;
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
  function worldOf(sx, sy, z) {
    return [FOCUS.x + (sx - 540) / z, FOCUS.y + (sy - 960) / z];
  }
  function handLocal(wx, wy) {
    return [(wx - JX) / SC, (wy - JY) / SC];
  }
  function kitchen(t) {
    const P = persp({ x: 16, y: 118, z: 640, f: 860, hy: 500, dir: 1 });
    K.back(P, t, { time: 'day', islandItems: false, counterItems: false });
  }
  function shelf() {
    const lip = 930;
    shape([[80, lip - 78], [1040, lip - 70], [1080, lip], [40, lip + 8]], { fill: '#E2C08A', stroke: INK, lwPx: 4, smooth: .04 });
    shape([[40, lip + 8], [1080, lip], [1060, lip + 150], [56, lip + 158]], { fill: '#C9965C', stroke: INK, lwPx: 4 });
    shape([[56, lip + 128], [1060, lip + 122], [1048, lip + 158], [48, lip + 166]], { fill: '#A67B45', stroke: null });
  }
  // Yellow paper in a clear holder. Bottom of the holder sits on the rail.
  function priceTag() {
    const w = 300, h = 168, x = FOCUS.x - w / 2, y = FOCUS.y - h / 2;
    ellipse(FOCUS.x + 8, y + h + 6, w * .4, 11, { fill: 'rgba(40,24,12,.2)', stroke: null });
    rbox(x, y, w, h, 'rgba(232,242,246,.72)', 'rgba(70,96,108,.95)', 7, 3);
    line([[x + 8, y + 3.5], [x + w - 8, y + 3.5]], { stroke: 'rgba(255,255,255,.95)', lwPx: 4 });
    const px = x + 12, py = y + 16, pw = w - 24, ph = h - 28;
    rbox(px, py, pw, ph, '#FFE14A', INK, 3, 3);
    text('Special', FOCUS.x, py + 24, 28, '#1A1A1A', { align: 'center' });
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
    if (part !== 'front') {
      shape([[-96, 0], [96, 0], [72, 86], [-72, 86]], { fill: '#C9854A', stroke: INK, lwPx: 4, smooth: .25 });
    }
    if (part !== 'back') {
      line([[-108, 0], [108, 0]], { stroke: INK, lwPx: 8 });
      line([[-52, 0], [-36, -36], [36, -36], [52, 0]], { stroke: INK, lwPx: 5 });
      shape([[-96, 0], [96, 0], [88, 22], [-88, 22]], { fill: '#B8743A', stroke: INK, lwPx: 3, smooth: .2 });
    }
    X.restore();
  }
  function girl(t, pose) {
    const jar = pose.jar;
    const eyes = pose.eyes || { x: JX, y: JY - 22 * SC };
    const dx = (jar[0] - eyes.x) / 160, dy = (jar[1] - eyes.y) / 180;
    return jenna(JX, JY, JS, {
      t, giraffe: false, boil: .15,
      lookX: clamp(dx, -1.3, 1.3),
      lookY: clamp(dy, -1.1, 1.1),
      eyes: pose.face || 'wide',
      brows: 'up',
      mouth: pose.mouth || 'o',
      handR: handLocal(pose.hand[0], pose.hand[1]),
      handPoseR: pose.grip ? 'grip' : 'palm',
      handL: [-2.2, -10.4],
      handPoseL: 'hip',
    });
  }
  function say(s) {
    X.save();
    X.font = `700 44px ${FONT_TALK}`;
    const w = X.measureText(s).width;
    X.restore();
    const x = 300, y = 292;
    rbox(x - 16, y - 32, Math.min(w + 32, SAFE.r - x), 64, 'rgba(22,16,18,.82)', null, 14, 0);
    text(s, x, y, 44, '#FFFDF8');
  }
  function phone(x, y, sc) {
    X.save(); X.translate(x, y); X.scale(sc, sc);
    rbox(-70, -128, 140, 248, '#1C2430', INK, 18, 4);
    rbox(-56, -110, 112, 198, '#10161c', null, 8, 0);
    X.restore();
  }
  function guides() {
    if (!SHOW_GUIDES) return;
    overlay(() => {
      X.save();
      X.strokeStyle = '#FF2D8A'; X.lineWidth = 3; X.setLineDash([10, 8]);
      X.strokeRect(SAFE.l, SAFE.t, SAFE.r - SAFE.l, SAFE.b - SAFE.t);
      X.setLineDash([]);
      X.fillStyle = 'rgba(0,0,0,.45)';
      X.fillRect(0, 0, 1080, 150);
      text('9:41', 36, 78, 28, '#FFF');
      X.fillRect(0, 1580, 1080, 340);
      text('@shop', 120, 1660, 28, '#FFF');
      for (let i = 0; i < 4; i++) circle(990, 760 + i * 130, 36, { fill: 'rgba(20,20,20,.55)', stroke: '#FFF', lwPx: 3 });
      X.restore();
    });
  }
  function withCam(z, draw) {
    camBegin(FOCUS.x, FOCUS.y, z);
    draw();
    camEnd();
  }
  // The jar rides on the hand until the fingers open, then it stays in the basket.
  const HOME = { hand: [455, 760], jar: [540, 790] };
  function carry(k) {
    const grip = k < .8;
    const heldHand = kf(Math.min(k, .8), [
      [0, HOME.hand],
      [.16, [428, 690]],
      [.42, [392, 880]],
      [.8, [372, 1096]],
    ]);
    const parked = [442, 1124];
    const jar = grip ? [heldHand[0] + 70, heldHand[1] + 28] : parked;
    const u = grip ? 0 : (k - .8) / .2;
    const hand = grip ? heldHand : [lerp(heldHand[0], 292, u), lerp(heldHand[1], 1210, u)];
    return { hand, jar, grip };
  }
  const BASKET = { x: 448, y: 1148 };

  function store(t, z, pose) {
    withCam(z, () => {
      kitchen(t);
      shelf();
      priceTag();
      basket(BASKET.x, BASKET.y, 'back');
      honeyJar(pose.jar[0], pose.jar[1]);
      girl(t, pose);
      basket(BASKET.x, BASKET.y, 'front');
    });
  }

  function open(t, lt) {
    const z = lerp(1.05, Z_IN, ease(seg(lt, .25, 1.25)));
    store(t, z, { ...HOME, grip: false, face: 'wide', mouth: 'o' });
    if (lt > .35) say('What’s that in marks?');
    guides();
  }

  function raise(t, lt) {
    store(t, Z_IN, {
      hand: worldOf(lerp(430, 540, ease(lt)), lerp(1180, 1080, ease(lt)), Z_IN),
      jar: HOME.jar,
      grip: false,
      face: 'wide',
      mouth: 'flat',
    });
    const u = ease(seg(lt, .05, .85));
    phone(540, lerp(1380, 960, u), lerp(.85, 2.9, u));
    guides();
  }

  function app() {
    const s = 2, ox = 540 - APP.tagX * s, oy = 960 - APP.tagY * s;
    X.fillStyle = '#07080c';
    X.fillRect(0, 0, 1080, 1920);
    if (SHOT.complete && SHOT.naturalWidth) X.drawImage(SHOT, ox, oy, APP.srcW * s, APP.srcH * s);
    guides();
  }

  function take(t, lt) {
    const k = ease(seg(lt, .05, 1.05));
    const c = carry(k);
    store(t, Z_IN, { ...c, face: k > .9 ? 'happy' : 'open', mouth: k > .9 ? 'smile' : 'flat' });
    guides();
  }

  function hold(t) {
    const done = carry(1);
    store(t, Z_IN, { ...done, grip: false, face: 'happy', mouth: 'smile' });
    guides();
  }

  function endCard(t, lt) {
    hold(t);
    const a = ease(seg(lt, .08, .4));
    X.save(); X.globalAlpha = a;
    text('Howmch', 140, 1296, 76, '#FFFDF8', { stroke: 'rgba(22,16,18,.82)', sw: 12 });
    text('See prices in your currency.', 140, 1376, 42, '#FFFDF8', { stroke: 'rgba(22,16,18,.82)', sw: 9 });
    X.restore();
  }

  scene({
    duration: 12,
    fps: 24,
    bpm: 80,
    width: 1080,
    height: 1920,
    shots: [
      [0, open],
      [3, raise],
      [4, app],
      [5.6, take],
      [6.8, hold],
      [10.4, endCard],
    ],
  });
})();
