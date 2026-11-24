// Howmch vertical short. Same kitchen and kids as the first TikTok cut, new edit.
// Canvas 1080×1920. Prices, captions, and the brand stay inside SAFE.
// SHOW_GUIDES draws the safe rect and fake Reels / TikTok / Shorts chrome. Export with it false.
(() => {
  const K = LOCATIONS.family_kitchen, INK = PAL.ink;
  const SHOW_GUIDES = false;
  const SAFE = { l: 90, t: 240, r: 840, b: 1430 };
  const CORAL = '#FF5A45';
  // The label rect is shared by the shelf shot and the camera shot so the price does not jump.
  const LABEL = { x: 210, y: 530, w: 470, h: 148 };
  const CARD = { x: 210, y: 760, w: 470, h: 250 };
  const JX = 40, JY = 1290, JS = 30;
  const HX = 860, HY = 1420, HS = 22;
  const HOLD = [8.2, -16.8];

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
    const P = persp({ x: 10, y: 150, z: 520, f: 760, hy: 640, dir: 1 });
    const o = { time: 'day', islandItems: false };
    K.back(P, t, o);
  }
  function honeyJar(cx, top) {
    rbox(cx - 58, top, 116, 22, '#E3B34A', INK, 8, 3);
    rbox(cx - 40, top + 16, 80, 18, '#F4D48A', INK, 4, 3);
    X.beginPath();
    X.roundRect(cx - 86, top + 28, 172, 168, [16, 16, 46, 46]);
    X.fillStyle = '#F6C94A';
    X.fill();
    X.lineWidth = 4;
    X.strokeStyle = INK;
    X.stroke();
    rbox(cx - 68, top + 48, 20, 96, 'rgba(255,255,255,.4)', null, 10, 0);
  }
  function labelAt(x, y) {
    rbox(x, y, LABEL.w, LABEL.h, '#FFFDF8', INK, 14, 4);
    text('18,45 KM', x + 28, y + LABEL.h / 2, 62, INK);
  }
  function product(dx, dy) {
    const x = LABEL.x + dx, y = LABEL.y + dy;
    honeyJar(x + 150, y + LABEL.h - 30);
    labelAt(x, y);
  }
  function basket(x, y) {
    X.save(); X.translate(x, y);
    shape([[-70, -20], [70, -20], [54, 70], [-54, 70]], { fill: '#C9854A', stroke: INK, lwPx: 4, smooth: .3 });
    line([[-78, -20], [78, -20]], { stroke: INK, lwPx: 6 });
    line([[-40, -20], [-28, -48], [28, -48], [40, -20]], { stroke: INK, lwPx: 5 });
    X.restore();
  }
  function housamClose(t, pose) {
    housam(HX, HY, HS, {
      t, boil: .3,
      lookX: -1.1, lookY: pose.lookY ?? -.55,
      eyes: pose.eyesH || 'wide',
      brows: pose.browsH || 'worried',
      mouth: pose.mouthH || 'flat',
      tilt: pose.tiltH || 0,
    });
  }
  function jennaClose(t, pose) {
    return jenna(pose.x ?? JX, pose.y ?? JY, JS, {
      t, giraffe: false, boil: .35,
      lookX: 1.15, lookY: pose.lookY ?? -.15,
      eyes: pose.eyes || 'wide', brows: pose.brows || 'up', mouth: pose.mouth || 'o',
      tilt: pose.tilt || 0,
      handR: pose.handR || [9.4, -16.6],
      handPoseR: 'open',
      handL: [-2.2, -9],
    });
  }
  function caption(y, lines) {
    const size = 58, gap = 70;
    const h = lines.length * gap + 12;
    rbox(96, y - 44, 720, h, 'rgba(22,16,18,.58)', null, 16, 0);
    lines.forEach((ln, i) => text(ln, 116, y + i * gap, size, '#FFFDF8'));
  }
  function corners(x, y, w, h, inset) {
    const a = 34;
    X.strokeStyle = '#FFFDF8';
    [[x + inset, y + inset, 1, 1], [x + w - inset, y + inset, -1, 1], [x + inset, y + h - inset, 1, -1], [x + w - inset, y + h - inset, -1, -1]].forEach(([cx, cy, dx, dy]) => {
      line([[cx, cy], [cx + dx * a, cy]], { stroke: '#FFFDF8', lwPx: 7 });
      line([[cx, cy], [cx, cy + dy * a]], { stroke: '#FFFDF8', lwPx: 7 });
    });
  }
  function bamChip() {
    rbox(210, 268, 292, 62, '#FFFDF8', INK, 31, 3);
    text('BAM  →  USD', 232, 299, 26, INK);
  }
  function coralCard(reveal) {
    const x = CARD.x, y = CARD.y, w = CARD.w, h = CARD.h;
    shape([[x + 46, y - 16], [x + 78, y - 16], [x + 62, y + 2]], { fill: CORAL, stroke: null });
    rbox(x, y, w, h, CORAL, null, 22, 0);
    text('18,45 KM', x + 32, y + 52, 32, 'rgba(255,253,248,.92)');
    if (reveal > .02) {
      X.save(); X.globalAlpha = reveal;
      text('$10.37', x + 32, y + 148, 86, '#FFFDF8');
      X.restore();
    }
  }
  function phoneGraphic(x, y, sc) {
    X.save(); X.translate(x, y); X.scale(sc, sc);
    rbox(-70, -130, 140, 250, '#1C2430', INK, 18, 4);
    rbox(-58, -112, 116, 200, '#1A242C', null, 8, 0);
    line([[-40, -80], [-40, -58]], { stroke: '#FFFDF8', lwPx: 4 });
    line([[-40, -80], [-18, -80]], { stroke: '#FFFDF8', lwPx: 4 });
    line([[40, -80], [40, -58]], { stroke: '#FFFDF8', lwPx: 4 });
    line([[40, -80], [18, -80]], { stroke: '#FFFDF8', lwPx: 4 });
    line([[-40, 40], [-40, 18]], { stroke: '#FFFDF8', lwPx: 4 });
    line([[-40, 40], [-18, 40]], { stroke: '#FFFDF8', lwPx: 4 });
    line([[40, 40], [40, 18]], { stroke: '#FFFDF8', lwPx: 4 });
    line([[40, 40], [18, 40]], { stroke: '#FFFDF8', lwPx: 4 });
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
      text('9:41', 36, 78, 28, '#FFF', { align: 'left' });
      X.fillRect(0, 1580, 1080, 340);
      text('@shop', 120, 1660, 28, '#FFF');
      for (let i = 0; i < 4; i++) {
        circle(990, 760 + i * 130, 36, { fill: 'rgba(20,20,20,.55)', stroke: '#FFF', lwPx: 3 });
      }
      X.restore();
    });
  }

  function openPrice(t, lt) {
    kitchen(t);
    housamClose(t, { eyesH: 'wide', browsH: 'worried', mouthH: 'flat', lookY: -.45 });
    product(0, 0);
    basket(450, 1100);
    jennaClose(t, { eyes: 'wide', mouth: 'o', brows: 'up', lookY: -.15, handR: HOLD });
    if (lt > .15) caption(286, ['Wait, how much is that', 'in dollars?']);
    guides();
  }

  function raisePhone(t, lt) {
    kitchen(t);
    housamClose(t, { eyesH: 'wide', browsH: 'up', mouthH: 'flat', lookY: -.5 });
    product(0, 0);
    basket(450, 1100);
    const lift = ease(seg(lt, .05, 1.15));
    const A = jennaClose(t, {
      eyes: 'wide', mouth: 'flat', brows: 'up', lookY: -.35,
      handR: [lerp(HOLD[0], 7.4, lift), lerp(HOLD[1], -19.6, lift)],
    });
    if (A.handR) phoneGraphic(A.handR[0] + 10, A.handR[1] - 70, lerp(.5, 1.05, lift));
    guides();
  }

  function camera(t, lt) {
    kitchen(t);
    X.fillStyle = 'rgba(12,14,18,.38)';
    X.fillRect(0, 0, 1080, 1920);
    product(0, 0);
    const lock = easeOut(seg(lt, .15, .55));
    corners(LABEL.x - 18, LABEL.y - 18, LABEL.w + 36, LABEL.h + 36, lerp(28, 6, lock));
    bamChip();
    coralCard(easeOut(seg(lt, .85, 1.45)));
    // Phone bezel sits on the screen edge. The price stays in the safe rect.
    X.strokeStyle = '#1C2430'; X.lineWidth = 28;
    X.strokeRect(14, 14, 1052, 1892);
    guides();
  }

  function take(t, lt) {
    kitchen(t);
    const step = ease(seg(lt, .35, 2.3));
    const dx = lerp(0, 40, step);
    const dy = lerp(0, 290, step) - 50 * Math.sin(step * Math.PI);
    housamClose(t, {
      eyesH: step > .55 ? 'happy' : 'open',
      browsH: 'normal', mouthH: step > .55 ? 'smile' : 'flat',
      lookY: .1, tiltH: step > .85 ? Math.sin((step - .85) * 12) * .1 : 0,
    });
    product(dx, dy);
    basket(450, 1100);
    jennaClose(t, {
      x: JX + dx, y: JY + dy,
      eyes: step > .55 ? 'happy' : 'open',
      mouth: step > .55 ? 'grin' : 'flat',
      brows: 'up', lookY: .15,
      tilt: step > .85 ? Math.sin((step - .85) * 12) * .08 : 0,
      handR: HOLD,
    });
    guides();
  }

  function endCard(t, lt) {
    camera(t, 4);
    const k = ease(seg(lt, .15, .5));
    X.save(); X.globalAlpha = k;
    rbox(108, 1128, 700, 168, 'rgba(22,16,18,.62)', null, 18, 0);
    text('Howmch', 132, 1188, 64, '#FFFDF8');
    text('See prices in your currency.', 132, 1258, 36, '#FFFDF8');
    X.restore();
  }

  scene({
    duration: 16,
    fps: 24,
    bpm: 84,
    width: 1080,
    height: 1920,
    shots: [
      [0, openPrice],
      [2, raisePhone],
      [3.4, camera],
      [9, take],
      [13, endCard],
    ],
  });
})();
