// Howmch supermarket promo. Glen Crown (home, strong) vs Vale Mark (shelf prices).
// Every shot paints the whole frame and is a pure function of t.
(() => {
  const INK = PAL.ink;
  const RATE = 10; // 1 Glen Crown = 10 Vale Marks
  const GOODS = [
    { name: 'MILK', mk: 90, kind: 'milk' },
    { name: 'BREAD', mk: 40, kind: 'bread' },
    { name: 'APPLES', mk: 150, kind: 'apples' },
    { name: 'CHEESE', mk: 200, kind: 'cheese' },
  ];
  const CART_MK = GOODS.reduce((s, g) => s + g.mk, 0); // 480
  const CART_CR = CART_MK / RATE; // 48

  function text(s, x, y, size, col = INK, o = {}) {
    X.save();
    X.font = `${o.weight || 700} ${size}px ${o.font || FONT_TALK}`;
    X.textAlign = o.align || 'center';
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
  function rbox(x, y, w, h, fill, stroke = INK, rad = 14, lw = 3) {
    X.beginPath();
    X.roundRect(x, y, w, h, rad);
    if (fill) { X.fillStyle = fill; X.fill(); }
    if (stroke) { X.lineWidth = lw; X.strokeStyle = stroke; X.stroke(); }
  }
  function fadeIn(lt) { flash(1 - ease(seg(lt, 0, .28)), '#FFF8EC'); }

  function hud(mode) {
    rbox(24, 16, 560, 92, '#FFFDF8', INK, 22, 4);
    text('GLEN', 304, 38, 16, '#8A6A32', { weight: 700 });
    text('Crown  CR', 304, 66, 32, '#8A5A12');
    text('home  ·  strong', 304, 92, 16, '#6E5A40', { weight: 600 });

    rbox(1336, 16, 560, 92, '#FFFDF8', INK, 22, 4);
    text('VALE', 1616, 38, 16, '#1A6E68', { weight: 700 });
    text('Mark  MK', 1616, 66, 32, '#146E68');
    text('shelf prices', 1616, 92, 16, '#3E5E58', { weight: 600 });

    rbox(760, 22, 400, 80, mode === 'after' ? '#E5F6EF' : '#FFF4D2', INK, 18, 4);
    text('HOWMCH', 960, 46, 22, mode === 'after' ? '#0E8F7A' : '#8A5A12');
    text('1 Crown  =  10 Marks', 960, 78, 20, INK, { weight: 600 });
  }
  function caption(kind, line) {
    const after = kind === 'AFTER';
    X.fillStyle = 'rgba(22,14,18,.9)';
    X.fillRect(0, 968, 1920, 112);
    rbox(36, 992, 196, 64, after ? '#0E8F7A' : '#C9364A', null, 32, 0);
    text(kind, 134, 1024, 28, '#FFFDF8');
    text(line, 1100, 1024, 40, '#FFF8EC');
  }

  function market() {
    X.fillStyle = linGrad(0, 0, 0, 1080, [[0, '#D5E8EA'], [.42, '#F4E4C4'], [1, '#CDB892']]);
    X.fillRect(0, 0, 1920, 1080);
    rbox(0, 128, 1920, 18, '#F7FBFB', null, 0, 0);
    for (const x of [280, 760, 1240, 1720]) {
      rbox(x, 146, 220, 16, '#F4F7E8', '#C9D4C4', 8, 2);
      ellipse(x + 110, 168, 90, 10, { fill: 'rgba(255,255,240,.55)', stroke: null });
    }
    // back wall and floor
    rbox(0, 250, 1920, 430, '#F7EDD4', null, 0, 0);
    X.fillStyle = '#E7D3B0';
    X.fillRect(0, 680, 1920, 400);
    for (let i = -1; i < 12; i++) {
      const x = i * 180;
      line([[x, 680], [x + 90, 1080]], { stroke: 'rgba(120,90,50,.28)', lwPx: 3 });
    }
    rbox(70, 168, 420, 64, '#146E68', INK, 12, 4);
    text('VALE MARKET', 280, 200, 32, '#FFF8EC');
  }
  function shelfUnit(x, y, w, h) {
    rbox(x, y, w, h, '#2A6B66', INK, 8, 4);
    rbox(x, y + h - 18, w, 18, '#1C4C49', null, 0, 0);
    rbox(x + 10, y + 8, w - 20, h - 28, '#F6E7C8', null, 4, 0);
  }
  function goodsIcon(kind, x, y, sc = 1) {
    X.save(); X.translate(x, y); X.scale(sc, sc);
    if (kind === 'milk') {
      rbox(-34, -78, 68, 108, '#F7FBFF', INK, 8, 3);
      rbox(-34, -36, 68, 26, '#3C7EBE', null, 0, 0);
      text('MILK', 0, -22, 16, '#F7FBFF');
    } else if (kind === 'bread') {
      ellipse(0, -20, 48, 32, { fill: '#E7A85C', stroke: INK, lwPx: 3 });
      ellipse(0, -28, 30, 14, { fill: '#F2C48A', stroke: null });
      for (let i = -1; i <= 1; i++) line([[i * 16, -36], [i * 16, -8]], { stroke: '#C4843C', lwPx: 3 });
    } else if (kind === 'apples') {
      rbox(-46, -20, 92, 48, '#C9854A', INK, 6, 3);
      for (const [dx, dy] of [[-18, -28], [8, -36], [22, -18], [-8, -16]]) {
        circle(dx, dy, 16, { fill: '#D64545', stroke: INK, lwPx: 2 });
        line([[dx, dy - 16], [dx + 4, dy - 24]], { stroke: '#3E6A32', lwPx: 2 });
      }
    } else {
      shape([[-36, 10], [30, 16], [40, -10], [-8, -48]], { fill: '#F2C14E', stroke: INK, lwPx: 3, smooth: .4 });
      circle(6, -8, 6, { fill: '#E7A3A0', stroke: null });
      circle(18, 2, 5, { fill: '#E7A3A0', stroke: null });
    }
    X.restore();
  }
  function priceTag(x, y, mk, pop = 1, sub = '') {
    const k = .82 + .18 * clamp(pop);
    X.save(); X.translate(x, y); X.scale(k, k);
    rbox(-86, -40, 172, sub ? 92 : 76, '#FFFDF8', INK, 10, 3);
    text(String(mk), -16, sub ? -12 : -2, 40, INK);
    text('MK', 48, sub ? -8 : 2, 22, '#146E68');
    if (sub) text(sub, 0, 28, 16, '#3E5E58', { weight: 600 });
    X.restore();
  }
  function rowOfGoods(y, popAt, t, sc = 1) {
    GOODS.forEach((g, i) => {
      const x = 300 + i * 340;
      shelfUnit(x - 110, y, 220, 150);
      goodsIcon(g.kind, x, y + 78, sc);
      priceTag(x, y + 176, g.mk, backOut(seg(t, popAt + i * .45, popAt + i * .45 + .4)), 'Vale Mark');
    });
  }
  function suitcase(x, y) {
    circle(x - 30, y + 6, 9, { fill: '#2A2428', stroke: INK, lwPx: 2 });
    circle(x + 30, y + 6, 9, { fill: '#2A2428', stroke: INK, lwPx: 2 });
    rbox(x - 48, y - 78, 96, 82, '#C45B4A', INK, 10, 3);
    rbox(x - 48, y - 78, 96, 16, '#9A3E34', null, 8, 0);
    line([[x - 16, y - 78], [x - 16, y - 104], [x + 16, y - 104], [x + 16, y - 78]], { stroke: INK, lwPx: 4 });
    rbox(x + 18, y - 48, 54, 26, '#FFE58A', INK, 4, 2);
    text('GLEN', x + 45, y - 35, 13, INK);
  }
  function traveler(t, x, y, s, o = {}) {
    return sarah(x, y, s, { t, boil: .35, ...o });
  }
  function note(x, y, rot, w, h, lines, age) {
    if (age < 0) return;
    const k = backOut(clamp(age * 3.2));
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(k, k);
    X.fillStyle = 'rgba(60,40,20,.16)';
    X.beginPath(); X.roundRect(-w / 2 + 7, -h / 2 + 8, w, h, 8); X.fill();
    X.fillStyle = '#FFE58A'; X.strokeStyle = INK; X.lineWidth = 3;
    X.beginPath(); X.roundRect(-w / 2, -h / 2, w, h, 8); X.fill(); X.stroke();
    X.fillStyle = 'rgba(255,255,255,.7)';
    X.fillRect(-26, -h / 2 - 10, 52, 16);
    lines.forEach((ln, i) => text(ln[0], 0, -h / 2 + 42 + i * 40, ln[1] || 30, ln[2] || INK));
    X.restore();
  }
  function calculator(x, y, display) {
    rbox(x, y, 250, 300, '#3E4654', INK, 16, 4);
    rbox(x + 16, y + 16, 218, 64, '#D7F5C8', INK, 8, 3);
    text(display, x + 220, y + 48, 32, '#1C3A24', { align: 'right' });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      rbox(x + 18 + c * 56, y + 100 + r * 46, 48, 38, (r === 3 && c === 3) ? '#E07A32' : '#F4F1EA', INK, 6, 2);
    }
  }
  function receipt(x, y, k) {
    X.save(); X.translate(x, y); X.scale(1, k);
    X.fillStyle = 'rgba(40,24,20,.18)';
    X.beginPath(); X.roundRect(10, 12, 420, 520, 8); X.fill();
    X.fillStyle = '#FFFDF8'; X.strokeStyle = INK; X.lineWidth = 3;
    X.beginPath(); X.roundRect(0, 0, 420, 520, 8); X.fill(); X.stroke();
    text('VALE MARKET', 210, 36, 26, '#146E68');
    text('paid in Marks', 210, 66, 16, '#5C6A64', { weight: 600 });
    const rows = [...GOODS.map(g => [g.name, g.mk + ' MK']), ['CART', CART_MK + ' MK']];
    rows.forEach((r, i) => {
      const yy = 112 + i * 42;
      text(r[0], 28, yy, 24, INK, { align: 'left' });
      text(r[1], 392, yy, 24, i === 4 ? '#146E68' : INK, { align: 'right' });
    });
    line([[24, 318], [396, 318]], { stroke: INK, lwPx: 2 });
    text('IN CROWNS', 28, 356, 20, '#8A5A12', { align: 'left' });
    text(CART_CR.toFixed(0) + ' CR', 392, 356, 32, '#8A5A12', { align: 'right' });
    text('her note said 40 CR', 210, 412, 22, '#C9364A');
    rbox(70, 444, 280, 52, '#C9364A', null, 10, 0);
    text('OVERSPENT', 210, 470, 28, '#FFFDF8');
    X.restore();
  }

  function phone(x, y, w, h, drawScreen) {
    rbox(x - 8, y + 10, w, h, 'rgba(20,16,24,.25)', null, 36, 0);
    rbox(x, y, w, h, '#1C2430', INK, 36, 5);
    rbox(x + 22, y + 22, w - 44, h - 44, '#F4F7F2', null, 18, 0);
    rbox(x + w / 2 - 46, y + 30, 92, 10, '#1C2430', null, 5, 0);
    drawScreen(x + 22, y + 56, w - 44, h - 92);
  }

  function arrive(t, lt) {
    const zoom = lerp(1, 1.04, ease(seg(lt, 0, 5)));
    camBegin(960, 560, zoom);
    market();
    rowOfGoods(300, -4, t, .9);
    const x = lerp(280, 760, ease(seg(lt, .15, 3.6)));
    const walking = lt < 3.7;
    const step = Math.sin(lt * 5.2);
    suitcase(x - 170, 908 + (walking ? Math.max(0, step) * 10 : 0));
    traveler(t, x, 930, 12.5, {
      eyes: lt > 4 ? 'wide' : 'open',
      brows: lt > 4 ? 'up' : 'normal',
      mouth: lt > 4.4 ? 'frown' : 'smile',
      lookX: .85,
      dy: walking ? Math.abs(step) * .45 : 0,
      footL: [-1.8, -1.05 - (walking ? Math.max(0, step) * 3.4 : 0)],
      footR: [1.8, -1.05 - (walking ? Math.max(0, -step) * 3.4 : 0)],
      handL: [walking ? -4.2 : -2.8, -15 + (walking ? step * 2.2 : 0)],
      handR: [walking ? 4.2 : 2.6, -15 - (walking ? step * 2.2 : 0)],
    });
    camEnd();
    fadeIn(lt);
    hud('before');
    caption('BEFORE', 'A traveler from Glen arrives in Vale.');
  }

  function shock(t, lt) {
    camBegin(900, 520, 1.06);
    market();
    rowOfGoods(250, 6.3, t, 1);
    traveler(t, 1580, 930, 13, {
      eyes: 'wide', brows: 'up', mouth: 'frown', lean: -.1, lookX: -1, lookY: -.35,
      handL: [-2.2, -23], handPoseL: 'open', handR: [3.4, -15],
    });
    if (lt > 2.6) {
      const k = backOut(seg(lt, 2.6, 3.15));
      X.save(); X.translate(1040, 760); X.rotate(-.08); X.scale(k, k);
      rbox(-170, -48, 340, 96, '#C9364A', INK, 12, 4);
      text('EXPENSIVE?', 0, 0, 36, '#FFFDF8');
      X.restore();
    }
    camEnd();
    fadeIn(lt);
    hud('before');
    caption('BEFORE', 'Every shelf price looks expensive.');
  }

  function math(t, lt) {
    const [sx, sy] = lt > 5.2 ? shakeXY(t, 5) : [0, 0];
    camBegin(960 + sx, 540 + sy, 1.02);
    market();
    // counter
    rbox(80, 760, 1760, 28, '#8A5A3A', INK, 4, 3);
    rbox(120, 788, 40, 150, '#6E4630', null, 4, 0);
    rbox(1700, 788, 40, 150, '#6E4630', null, 4, 0);
    note(280, 390, -.08, 340, 170, [['90 MK / 10', 32], ['= 9 Crowns', 30, '#8A5A12']], lt - .3);
    note(640, 340, .07, 360, 180, [['200 MK x 10', 32], ['= 2,000 ?!', 34, '#C9364A']], lt - 1.6);
    note(460, 600, -.03, 380, 170, [['Cart  480 MK', 30], ['I guess 40 CR', 32, '#8A5A12']], lt - 3.2);
    const display = lt < 1.5 ? '90/10' : lt < 2.8 ? '9' : lt < 4.4 ? '200x10' : lt < 5.6 ? '2000' : '40?';
    calculator(980, 280, display);
    // basket
    rbox(1360, 470, 280, 200, '#C9854A', INK, 16, 4);
    rbox(1320, 450, 360, 36, '#A86830', INK, 8, 3);
    goodsIcon('cheese', 1450, 560, .7);
    goodsIcon('milk', 1540, 570, .55);
    goodsIcon('apples', 1490, 610, .5);
    text('480 MK', 1500, 700, 28, '#FFF8EC', { stroke: INK, sw: 6 });
    traveler(t, 1180, 900, 9.5, {
      lookY: .85, mouth: lt > 5 ? 'frown' : 'flat', brows: lt > 4 ? 'up' : 'normal',
      handR: [2.4, -16], handPoseR: 'fist', lean: .04,
    });
    if (lt > 5.4) receipt(1420, lerp(820, 200, easeOut(seg(lt, 5.4, 6.5))), 1);
    camEnd();
    fadeIn(lt);
    hud('before');
    caption('BEFORE', lt < 5.2 ? 'She converts on notes and a calculator.' : 'Her note said 40 Crowns. She pays 48.');
  }

  function phoneShot(t, lt) {
    camBegin(960, 540, 1);
    market();
    shelfUnit(120, 300, 460, 220);
    goodsIcon('cheese', 350, 430, 1.35);
    priceTag(350, 560, 200, 1, 'Vale Mark');
    text('CHEESE', 350, 280, 28, INK, { stroke: '#FFF8EC', sw: 8 });
    traveler(t, 860, 940, 11.5, {
      lookX: .95, lookY: -.45,
      eyes: lt > 3.6 ? 'happy' : 'wide',
      mouth: lt > 3.6 ? 'grin' : 'flat',
      brows: lt > 3.6 ? 'normal' : 'up',
      phone: true,
      handL: [-2.6, -15.2],
      handR: [5.6, -26.2],
      handPoseR: 'fist',
      tilt: -.08,
    });
    camEnd();

    const slide = easeOut(seg(lt, .15, 1));
    const px = lerp(1980, 1120, slide), py = 150, pw = 700, ph = 780;
    const shown = lt > 3.7;
    const count = shown ? lerp(0, 20, easeOut(seg(lt, 3.7, 4.3))) : 0;
    phone(px, py, pw, ph, (sx, sy, sw, sh) => {
      rbox(sx + 24, sy + 8, sw - 48, 64, '#0E8F7A', null, 14, 0);
      text('HOWMCH', sx + sw / 2 - 40, sy + 40, 32, '#FFFDF8');
      rbox(sx + sw - 168, sy + 22, 110, 36, shown ? '#D7F5C8' : '#F4C9C4', null, 18, 0);
      text(shown ? 'LIVE' : 'CAM', sx + sw - 113, sy + 40, 18, shown ? '#146E40' : '#8A3030');
      // viewfinder
      const vx = sx + 48, vy = sy + 96, vw = sw - 96, vh = 250;
      rbox(vx, vy, vw, vh, '#1C2830', null, 12, 0);
      text('CHEESE', vx + vw / 2, vy + 70, 28, '#F4F7F2');
      text('200 MK', vx + vw / 2, vy + 124, 54, '#FFFDF8');
      text('Vale Mark', vx + vw / 2, vy + 176, 22, '#9FD9CF', { weight: 600 });
      const scanY = vy + 20 + frac(lt * .8) * (vh - 40);
      if (!shown) line([[vx + 16, scanY], [vx + vw - 16, scanY]], { stroke: '#7DFFB2', lwPx: 3 });
      // brackets
      const inset = shown ? 10 : 22;
      X.strokeStyle = '#7DFFB2'; X.lineWidth = 4;
      [[vx + inset, vy + inset, 1, 1], [vx + vw - inset, vy + inset, -1, 1], [vx + inset, vy + vh - inset, 1, -1], [vx + vw - inset, vy + vh - inset, -1, -1]].forEach(([cx, cy, dx, dy]) => {
        line([[cx, cy + dy * 28], [cx, cy], [cx + dx * 28, cy]], { stroke: '#7DFFB2', lwPx: 4 });
      });
      text(shown ? 'IN YOUR MONEY' : 'Reading the tag…', sx + sw / 2, sy + 390, 22, '#5C6A64', { weight: 600 });
      text('Glen Crown', sx + sw / 2, sy + 430, 26, '#8A5A12');
      text(shown ? count.toFixed(2) : '—', sx + sw / 2 - 36, sy + 510, 78, shown ? '#0E8F7A' : '#9AA39A');
      text('CR', sx + sw / 2 + 150, sy + 520, 36, '#0E8F7A');
      if (shown) text('200 Marks  →  20 Crowns', sx + sw / 2, sy + 590, 22, INK, { weight: 600 });
    });
    if (shown) {
      const k = backOut(seg(lt, 3.8, 4.4));
      X.save(); X.translate(350, 680); X.scale(k, k);
      rbox(-150, -36, 300, 72, '#E5F6EF', INK, 12, 3);
      text('20.00 CR', 0, 0, 32, '#0E8F7A');
      X.restore();
    }
    fadeIn(lt);
    hud('after');
    caption('AFTER', shown ? '200 Marks is 20 Crowns, live.' : 'She points Howmch at the shelf tag.');
  }

  function after(t, lt) {
    camBegin(960, 540, lerp(1.02, 1.05, ease(seg(lt, 0, 2))));
    market();
    shelfUnit(180, 280, 240, 160);
    goodsIcon('cheese', 300, 390, .85);
    text('put back', 300, 250, 20, '#6E5A40', { weight: 600 });
    shelfUnit(460, 280, 240, 160);
    text('MILK', 580, 250, 22, INK, { stroke: '#FFF8EC', sw: 7 });
    priceTag(580, 455, 90, 1, 'Vale Mark');
    rbox(470, 548, 220, 48, '#E5F6EF', INK, 10, 3);
    text('= 9.00 CR', 580, 572, 24, '#0E8F7A');
    const hold = easeOut(seg(lt, .2, 1));
    traveler(t, 1040, 940, 12, {
      eyes: 'happy', mouth: 'grin', brows: 'normal', lookX: -.15,
      handL: [-5.4, -12.5], handPoseL: 'fist', handR: [2.8, -15],
    });
    goodsIcon('milk', 1040 - 5.4 * 12 - 36, 940 - 12.5 * 12 + 20, .15 + .7 * hold);
    rbox(1280, 240, 500, 250, '#F8E4E2', INK, 16, 4);
    text('BEFORE', 1530, 280, 22, '#C9364A');
    text('notes guessed 40 CR', 1530, 340, 26, INK);
    text('she paid 48 CR', 1530, 390, 32, '#C9364A');
    text('480 Marks in the cart', 1530, 444, 22, '#5C5348', { weight: 600 });
    rbox(1280, 520, 500, 250, '#E5F6EF', INK, 16, 4);
    text('AFTER', 1530, 560, 22, '#0E8F7A');
    text('milk  90 MK', 1530, 620, 28, INK);
    text('=  9.00 CR', 1530, 680, 40, '#0E8F7A');
    text('Glen Crowns, on the phone', 1530, 730, 20, '#3E5E58', { weight: 600 });
    camEnd();
    fadeIn(lt);
    if (lt > 3.3) {
      const k = easeOut(seg(lt, 3.3, 4));
      X.save(); X.globalAlpha = k;
      rbox(560, 150, 800, 70, '#0E8F7A', INK, 16, 4);
      text('See any price in your money.', 960, 185, 30, '#FFFDF8');
      X.restore();
    }
    hud('after');
    caption('AFTER', 'Howmch shows the price in her money.');
  }

  scene({
    duration: 36,
    fps: 24,
    bpm: 112,
    shots: [
      [0, arrive],
      [6, shock],
      [13, math],
      [21.5, phoneShot],
      [29.5, after],
    ],
  });
})();
