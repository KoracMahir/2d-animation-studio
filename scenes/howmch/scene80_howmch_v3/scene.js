// Howmch vertical short, third cut. Same kitchen and Jenna. The shelf label does not jump.
// Canvas 1080×1920. Prices, the result, and captions stay inside SAFE.
// SHOW_GUIDES draws the safe rect and fake Reels / TikTok / Shorts chrome. Export with it false.
(() => {
  const K = LOCATIONS.family_kitchen, INK = PAL.ink;
  const SHOW_GUIDES = false;
  const SAFE = { l: 90, t: 240, r: 840, b: 1430 };
  const CORAL = '#FF5A45';
  // The sticker stays on this rect in the shelf shot and the camera shot.
  const TAG = { x: 470, y: 752, w: 330, h: 88 };
  const JAR = { x: 600, base: 730 };
  const JX = 230, JY = 1420, JS = 32;
  const HAND = { x: 520, y: 640 };

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
  function rbox(x, y, w, h, fill, stroke, rad = 18, lw = 3) {
    X.beginPath();
    X.roundRect(x, y, w, h, rad);
    if (fill) { X.fillStyle = fill; X.fill(); }
    if (stroke) { X.lineWidth = lw; X.strokeStyle = stroke; X.stroke(); }
  }
  function kitchen(t) {
    const P = persp({ x: 16, y: 118, z: 640, f: 860, hy: 500, dir: 1 });
    K.back(P, t, { time: 'day', islandItems: false, counterItems: false });
  }
  function shelf(wide) {
    const lip = JAR.base + 8;
    const x0 = wide ? -80 : 120;
    const x1 = wide ? 1160 : 1000;
    const face = wide ? 920 : 176;
    shape([[x0 + 36, lip - 92], [x1 - 24, lip - 80], [x1, lip], [x0, lip + 8]], { fill: '#E2C08A', stroke: INK, lwPx: 4, smooth: .04 });
    shape([[x0, lip + 8], [x1, lip], [x1 - 18, lip + face], [x0 + 12, lip + face + 10]], { fill: '#C9965C', stroke: INK, lwPx: 4, smooth: .02 });
    if (!wide) shape([[x0 + 12, lip + face - 28], [x1 - 18, lip + face - 36], [x1 - 26, lip + face + 8], [x0 + 6, lip + face + 16]], { fill: '#A67B45', stroke: null });
  }
  function honeyJar(cx, base, sc = 1) {
    X.save();
    X.translate(cx, base);
    X.scale(sc, sc);
    ellipse(8, 8, 92, 16, { fill: 'rgba(48,28,16,.30)', stroke: null });
    X.beginPath();
    X.roundRect(-84, -228, 168, 228, [22, 22, 54, 54]);
    X.fillStyle = '#F0B429';
    X.fill();
    X.lineWidth = 4 / sc;
    X.strokeStyle = INK;
    X.stroke();
    rbox(-64, -190, 20, 120, 'rgba(255,255,255,.42)', null, 10, 0);
    rbox(-34, -246, 68, 26, '#F3D48A', INK, 6, 3);
    rbox(-62, -268, 124, 28, '#E3B34A', INK, 8, 3);
    ellipse(4, -110, 40, 30, { fill: '#FFE7A0', stroke: INK, lwPx: 3 });
    ellipse(4, -110, 16, 12, { fill: '#F0B429', stroke: INK, lwPx: 2 });
    X.restore();
  }
  function priceTag() {
    const x = TAG.x, y = TAG.y, w = TAG.w, h = TAG.h;
    shape([[x + 10, y + 12], [x + w + 16, y + 22], [x + w + 4, y + h + 18], [x + 4, y + h + 8]], { fill: 'rgba(40,22,12,.32)', stroke: null });
    shape([[x, y], [x + w, y + 12], [x + w - 10, y + h], [x + 8, y + h - 10]], { fill: '#FFFDF8', stroke: INK, lwPx: 3, smooth: .02 });
    X.save();
    X.translate(x + 22, y + h * .52);
    X.rotate(.035);
    text('18,45 KM', 0, 0, 50, INK);
    X.restore();
  }
  function basket(x, y, part) {
    X.save(); X.translate(x, y);
    if (part !== 'front') {
      shape([[-86, -8], [86, -8], [64, 78], [-64, 78]], { fill: '#C9854A', stroke: INK, lwPx: 4, smooth: .25 });
    }
    if (part !== 'back') {
      line([[-96, -8], [96, -8]], { stroke: INK, lwPx: 7 });
      line([[-46, -8], [-32, -40], [32, -40], [46, -8]], { stroke: INK, lwPx: 5 });
      shape([[-86, -8], [86, -8], [78, 18], [-78, 18]], { fill: '#B8743A', stroke: INK, lwPx: 3, smooth: .2 });
    }
    X.restore();
  }
  function jennaAt(t, pose) {
    return jenna(pose.x ?? JX, pose.y ?? JY, JS, {
      t, giraffe: false, boil: .3,
      lookX: pose.lookX ?? 1.2,
      lookY: pose.lookY ?? -.2,
      eyes: pose.eyes || 'wide',
      brows: pose.brows || 'up',
      mouth: pose.mouth || 'o',
      tilt: pose.tilt || 0,
      handR: pose.handR || handOf(JX, JY, HAND.x, HAND.y),
      handPoseR: 'open',
      handL: [-2.4, -8],
    });
  }
  function handOf(px, py, sx, sy) {
    const sc = JS * 1.06;
    return [(sx - px) / sc, (sy - py) / sc];
  }
  function say(x, y, s) {
    X.save();
    X.font = `700 52px ${FONT_TALK}`;
    const w = X.measureText(s).width;
    X.restore();
    rbox(x - 18, y - 38, w + 36, 74, 'rgba(22,16,18,.78)', null, 16, 0);
    text(s, x, y, 52, '#FFFDF8');
  }
  function phone(x, y, sc) {
    X.save(); X.translate(x, y); X.scale(sc, sc);
    rbox(-64, -118, 128, 230, '#1C2430', INK, 16, 4);
    rbox(-52, -102, 104, 186, '#141C22', null, 8, 0);
    [[-36, -70, 1, 1], [36, -70, -1, 1], [-36, 36, 1, -1], [36, 36, -1, -1]].forEach(([cx, cy, dx, dy]) => {
      line([[cx, cy], [cx + dx * 16, cy]], { stroke: '#FFFDF8', lwPx: 3 });
      line([[cx, cy], [cx, cy + dy * 16]], { stroke: '#FFFDF8', lwPx: 3 });
    });
    X.restore();
  }
  function corners(x, y, w, h, inset) {
    const a = 28;
    [[x + inset, y + inset, 1, 1], [x + w - inset, y + inset, -1, 1], [x + inset, y + h - inset, 1, -1], [x + w - inset, y + h - inset, -1, -1]].forEach(([cx, cy, dx, dy]) => {
      line([[cx, cy], [cx + dx * a, cy]], { stroke: CORAL, lwPx: 7 });
      line([[cx, cy], [cx, cy + dy * a]], { stroke: CORAL, lwPx: 7 });
    });
  }
  function resultCard(reveal) {
    const x = 470, y = 560, w = 330, h = 150;
    shape([[x + 120, y + h - 2], [x + 158, y + h - 2], [x + 138, y + h + 14]], { fill: CORAL, stroke: null });
    rbox(x, y, w, h, CORAL, null, 20, 0);
    X.save(); X.globalAlpha = reveal;
    text('$10.37', x + 24, y + 84, 78, '#FFFDF8');
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

  function open(t, lt) {
    kitchen(t);
    shelf(false);
    honeyJar(JAR.x, JAR.base);
    priceTag();
    basket(750, 1288, 'all');
    jennaAt(t, { eyes: 'wide', mouth: 'o', brows: 'up', lookX: 1.15, lookY: -.05 });
    if (lt > .12) say(150, 292, 'What’s that in dollars?');
    guides();
  }

  function raise(t, lt) {
    kitchen(t);
    shelf(false);
    honeyJar(JAR.x, JAR.base);
    priceTag();
    basket(750, 1288, 'all');
    const u = ease(seg(lt, .05, .95));
    const px = lerp(HAND.x, TAG.x + TAG.w * .5, u);
    const py = lerp(1120, TAG.y + 20, u);
    jennaAt(t, {
      eyes: 'wide', mouth: 'flat', brows: 'up', lookX: 1.05, lookY: -.35,
      handR: handOf(JX, JY, px, py + 90),
    });
    phone(px, py, lerp(.72, 2.05, u));
    guides();
  }

  function camera(t, lt) {
    kitchen(t);
    X.fillStyle = 'rgba(18,14,12,.10)';
    X.fillRect(0, 0, 1080, 1920);
    shelf(true);
    honeyJar(JAR.x, JAR.base - 8, 1.55);
    priceTag();
    const lock = easeOut(seg(lt, .12, .62));
    corners(TAG.x + 6, TAG.y + 2, TAG.w - 16, TAG.h - 6, lerp(24, 1, lock));
    rbox(470, 268, 248, 52, '#FFFDF8', INK, 26, 3);
    text('BAM  →  USD', 490, 294, 22, INK);
    if (lt > .62) resultCard(easeOut(seg(lt, .68, 1.12)));
    guides();
  }

  function take(t, lt) {
    kitchen(t);
    const u = ease(seg(lt, .2, 2.4));
    const dx = 150;
    const dy = lerp(0, 520, u) - 90 * Math.sin(u * Math.PI);
    const jx = JAR.x + dx * u;
    const jy = JAR.base + dy;
    shelf(false);
    priceTag();
    basket(JAR.x + dx, 1288, 'back');
    honeyJar(jx, jy);
    basket(JAR.x + dx, 1288, 'front');
    const landed = u > .96;
    jennaAt(t, {
      x: JX + (jx - JAR.x), y: JY + (jy - JAR.base),
      eyes: landed ? 'happy' : 'open',
      mouth: landed ? 'grin' : 'flat',
      brows: 'up',
      lookX: .4, lookY: .35,
      tilt: landed ? Math.sin((lt - 2.6) * 5) * .08 : 0,
      handR: handOf(JX, JY, HAND.x, HAND.y),
    });
    guides();
  }

  function endCard(t, lt) {
    kitchen(t);
    shelf(false);
    basket(540, 780, 'back');
    honeyJar(540, 820, 1.15);
    basket(540, 780, 'front');
    const k = ease(seg(lt, .08, .4));
    X.save(); X.globalAlpha = k;
    text('Howmch', 120, 1088, 88, '#FFFDF8', { stroke: 'rgba(22,16,18,.75)', sw: 12 });
    text('Point at a price.', 120, 1188, 58, '#FFFDF8', { stroke: 'rgba(22,16,18,.75)', sw: 10 });
    text('See it in dollars.', 120, 1268, 58, '#FFFDF8', { stroke: 'rgba(22,16,18,.75)', sw: 10 });
    X.restore();
    guides();
  }

  scene({
    duration: 12,
    fps: 24,
    bpm: 80,
    width: 1080,
    height: 1920,
    shots: [
      [0, open],
      [2, raise],
      [3.3, camera],
      [6.5, take],
      [10.5, endCard],
    ],
  });
})();
