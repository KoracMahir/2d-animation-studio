// Vertical Howmch promo. Glen Crown vs Vale Mark, staged in the family kitchen.
// Frame is 1080×1920 (scene width/height). Every shot is a pure function of t.
(() => {
  const K = LOCATIONS.family_kitchen, INK = PAL.ink;
  const GOODS = [
    { name: 'MILK', mk: 90, x: 430, y: 150, z: 1210 },
    { name: 'BREAD', mk: 40, x: 120, y: 140, z: 1210 },
    { name: 'APPLES', mk: 150, x: 190, y: 155, z: 1200 },
    { name: 'CHEESE', mk: 200, x: 280, y: 145, z: 1205 },
  ];

  function text(s, x, y, size, col = INK, o = {}) {
    X.save();
    X.font = `${o.weight || 700} ${size}px ${o.font || FONT_TALK}`;
    X.textAlign = o.align || 'center';
    X.textBaseline = 'middle';
    if (o.stroke) {
      X.lineJoin = 'round';
      X.lineWidth = o.sw || Math.max(4, size * .16);
      X.strokeStyle = o.stroke;
      X.strokeText(s, x, y);
    }
    X.fillStyle = col;
    X.fillText(s, x, y);
    X.restore();
  }
  function rbox(x, y, w, h, fill, stroke = INK, rad = 16, lw = 3) {
    X.beginPath();
    X.roundRect(x, y, w, h, rad);
    if (fill) { X.fillStyle = fill; X.fill(); }
    if (stroke) { X.lineWidth = lw; X.strokeStyle = stroke; X.stroke(); }
  }
  function hud(after) {
    rbox(16, 22, 348, 112, '#FFFDF8', INK, 20, 4);
    text('GLEN', 190, 48, 16, '#8A6A32');
    text('Crown  CR', 190, 84, 30, '#8A5A12');
    text('home · strong', 190, 114, 16, '#6E5A40', { weight: 600 });
    rbox(716, 22, 348, 112, '#FFFDF8', INK, 20, 4);
    text('VALE', 890, 48, 16, '#1A6E68');
    text('Mark  MK', 890, 84, 30, '#146E68');
    text('shelf prices', 890, 114, 16, '#3E5E58', { weight: 600 });
    rbox(150, 148, 780, 58, after ? '#E5F6EF' : '#FFF4D2', INK, 16, 3);
    text('HOWMCH    ·    1 Crown = 10 Marks', 540, 177, 24, after ? '#0E8F7A' : INK);
  }
  function caption(kind, line) {
    const after = kind === 'AFTER';
    X.fillStyle = 'rgba(22,14,18,.92)';
    X.fillRect(0, 1764, 1080, 156);
    rbox(28, 1804, 196, 76, after ? '#0E8F7A' : '#C9364A', null, 38, 0);
    text(kind, 126, 1842, 26, '#FFFDF8');
    text(line, 620, 1842, 32, '#FFF8EC');
  }
  function fadeIn(lt) { flash(1 - ease(seg(lt, 0, .25)), '#FFF8EC'); }

  function room(P, t, splitZ) {
    const o = { time: 'day', islandItems: false, splitZ };
    K.back(P, t, o);
    return o;
  }
  function sign(P) {
    const [sx, sy, k] = P.p(-20, 248, 1292);
    const s = clamp(k * 14, 16, 34);
    X.save(); X.translate(sx, sy); X.scale(s / 22, s / 22);
    rbox(-150, -28, 300, 56, '#146E68', INK, 10, 3);
    text('VALE MARKET', 0, 0, 26, '#FFF8EC');
    X.restore();
  }
  function tag(P, g, pop, extra) {
    if (pop <= 0 || !P.visible(g.z)) return;
    const [sx, sy, k] = P.p(g.x, g.y, g.z);
    const s = clamp(k / 2.4, .75, 1.45) * (.82 + .18 * pop);
    X.save(); X.translate(sx, sy); X.scale(s, s);
    rbox(-86, -50, 172, extra ? 108 : 84, '#FFFDF8', INK, 12, 3);
    text(g.name, 0, -26, 16, '#146E68');
    text(g.mk + ' MK', 0, 6, 30, INK);
    if (extra) text(extra, 0, 36, 18, '#0E8F7A');
    X.restore();
  }
  function person(P, who, x, z, o) {
    const [sx, sy, k] = P.p(x, 0, z);
    if (who === 'housam') return housam(sx, sy, HOUSAM_UNIT * k, { t: o.t, boil: .35, ...o });
    return jenna(sx, sy, JENNA_UNIT * k, { t: o.t, boil: .4, giraffe: false, ...o });
  }
  function suitcase(P, x, z) {
    const [sx, sy, k] = P.p(x, 0, z);
    X.save(); X.translate(sx, sy); X.scale(k * 1.15, k * 1.15);
    circle(-16, 2, 5, { fill: '#2A2428', stroke: INK, lwPx: 2 });
    circle(16, 2, 5, { fill: '#2A2428', stroke: INK, lwPx: 2 });
    rbox(-26, -46, 52, 46, '#C45B4A', INK, 6, 2);
    rbox(-26, -46, 52, 8, '#9A3E34', null, 4, 0);
    line([[-8, -46], [-8, -60], [8, -60], [8, -46]], { stroke: INK, lwPx: 3 });
    rbox(8, -30, 28, 14, '#FFE58A', INK, 3, 2);
    text('GLEN', 22, -23, 8, INK);
    X.restore();
  }
  function note(x, y, rot, w, h, lines, age) {
    if (age < 0) return;
    const k = backOut(clamp(age * 3));
    X.save(); X.translate(x, y); X.rotate(rot); X.scale(k, k);
    X.fillStyle = 'rgba(60,40,20,.16)';
    X.beginPath(); X.roundRect(-w / 2 + 6, -h / 2 + 8, w, h, 8); X.fill();
    X.fillStyle = '#FFE58A'; X.strokeStyle = INK; X.lineWidth = 3;
    X.beginPath(); X.roundRect(-w / 2, -h / 2, w, h, 8); X.fill(); X.stroke();
    lines.forEach((ln, i) => text(ln[0], 0, -h / 2 + 40 + i * 38, ln[1] || 28, ln[2] || INK));
    X.restore();
  }
  function phone(x, y, w, h, lt) {
    const shown = lt > 3.1;
    const count = shown ? lerp(0, 20, easeOut(seg(lt, 3.1, 3.7))) : 0;
    rbox(x, y, w, h, '#1C2430', INK, 36, 5);
    rbox(x + 18, y + 18, w - 36, h - 36, '#F4F7F2', null, 22, 0);
    rbox(x + 28, y + 36, w - 56, 64, '#0E8F7A', null, 14, 0);
    text('HOWMCH', x + w / 2 - 30, y + 68, 30, '#FFFDF8');
    rbox(x + w - 150, y + 50, 104, 36, shown ? '#D7F5C8' : '#F4C9C4', null, 18, 0);
    text(shown ? 'LIVE' : 'CAM', x + w - 98, y + 68, 18, shown ? '#146E40' : '#8A3030');
    const vx = x + 40, vy = y + 118, vw = w - 80, vh = 250;
    rbox(vx, vy, vw, vh, '#1C2830', null, 14, 0);
    text('CHEESE', vx + vw / 2, vy + 64, 26, '#F4F7F2');
    text('200 MK', vx + vw / 2, vy + 118, 52, '#FFFDF8');
    text('Vale Mark', vx + vw / 2, vy + 172, 22, '#9FD9CF', { weight: 600 });
    if (!shown) {
      const scanY = vy + 24 + frac(lt * .85) * (vh - 48);
      line([[vx + 16, scanY], [vx + vw - 16, scanY]], { stroke: '#7DFFB2', lwPx: 4 });
    }
    text(shown ? 'IN YOUR MONEY' : 'Reading the tag…', x + w / 2, y + 400, 22, '#5C6A64', { weight: 600 });
    text('Glen Crown', x + w / 2, y + 442, 26, '#8A5A12');
    text(shown ? count.toFixed(2) : '—', x + w / 2 - 30, y + 530, 72, shown ? '#0E8F7A' : '#9AA39A');
    text('CR', x + w / 2 + 150, y + 540, 32, '#0E8F7A');
    if (shown) text('200 Marks  →  20 Crowns', x + w / 2, y + 610, 22, INK, { weight: 600 });
  }

  function arrive(t, lt) {
    const P = persp({ x: 10, y: 150, z: lerp(430, 500, ease(seg(lt, 0, 4))), f: 760, hy: 900, dir: 1 });
    const split = 760;
    const o = room(P, t, split);
    sign(P);
    const step = Math.sin(lt * 5);
    const walk = lt < 3.4;
    const hx = lerp(-30, 120, ease(seg(lt, .2, 3.2)));
    const jx = lerp(-180, -20, ease(seg(lt, 0, 2.8)));
    suitcase(P, hx - 55, 790);
    const H = person(P, 'housam', hx, 800, {
      t, lookY: lt > 3 ? -.4 : 0, lookX: .3,
      eyes: lt > 3.4 ? 'wide' : 'open', brows: lt > 3.4 ? 'worried' : 'normal',
      mouth: lt > 3.8 ? 'frown' : 'smile',
      dy: walk ? Math.abs(step) * .25 : 0,
      footL: [-1.5, -1.05 - (walk ? Math.max(0, step) * 2.2 : 0)],
      footR: [1.5, -1.05 - (walk ? Math.max(0, -step) * 2.2 : 0)],
    });
    const J = person(P, 'jenna', jx, 830, {
      t, lookX: .6, lookY: lt > 3 ? -.5 : 0,
      eyes: lt > 3.6 ? 'wide' : 'open', mouth: lt > 3.6 ? 'o' : 'smile', brows: lt > 3.2 ? 'up' : 'normal',
    });
    K.front(P, t, o);
    void H; void J;
    fadeIn(lt);
    hud(false);
    caption('BEFORE', 'Housam and Jenna arrive in Vale.');
  }

  function shock(t, lt) {
    const P = persp({ x: 20, y: 150, z: 460, f: 720, hy: 980, dir: 1 });
    const o = room(P, t, 760);
    sign(P);
    person(P, 'jenna', -110, 820, { t, eyes: 'wide', brows: 'up', mouth: 'o', lookY: -.55, handL: [-2.2, -12] });
    person(P, 'housam', 130, 800, { t, eyes: 'wide', brows: 'worried', mouth: 'frown', lookY: -.5, lean: -.05 });
    K.front(P, t, o);
    GOODS.forEach((g, i) => {
      const k = backOut(seg(t, 6 + i * .4, 6.35 + i * .4));
      if (k <= 0) return;
      const y = 250 + i * 118;
      X.save(); X.translate(540, y); X.scale(.86 + .14 * k, .86 + .14 * k);
      rbox(-250, -48, 500, 96, '#FFFDF8', INK, 16, 4);
      text(g.name, -150, 0, 26, '#146E68');
      text(g.mk + ' MK', 90, 0, 40, INK);
      X.restore();
    });
    if (lt > 3.4) {
      const k = backOut(seg(lt, 3.4, 3.9));
      X.save(); X.translate(540, 760); X.rotate(-.04); X.scale(k, k);
      rbox(-200, -44, 400, 88, '#C9364A', INK, 14, 4);
      text('EXPENSIVE?', 0, 0, 36, '#FFFDF8');
      X.restore();
    }
    fadeIn(lt);
    hud(false);
    caption('BEFORE', 'Every shelf price looks expensive.');
  }

  function calculator(x, y, display) {
    rbox(x, y, 280, 200, '#3E4654', INK, 16, 4);
    rbox(x + 16, y + 14, 248, 52, '#D7F5C8', INK, 8, 3);
    text(display, x + 248, y + 40, 28, '#1C3A24', { align: 'right' });
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
      rbox(x + 18 + c * 64, y + 82 + r * 52, 54, 42, (r === 1 && c === 3) ? '#E07A32' : '#F4F1EA', INK, 6, 2);
    }
  }
  function math(t, lt) {
    const P = persp({ x: 10, y: 150, z: 470, f: 700, hy: 1040, dir: 1 });
    const o = room(P, t, 760);
    person(P, 'jenna', -150, 830, { t, lookX: .7, lookY: -.2, mouth: 'flat', brows: 'worried' });
    person(P, 'housam', 160, 800, {
      t, lookY: .35, brows: 'worried', mouth: lt > 4.5 ? 'frown' : 'flat', eyes: 'open', lean: .04,
      handR: [2.2, -14],
    });
    K.front(P, t, o);
    note(270, 340, -.05, 460, 140, [['90 MK / 10', 30], ['= 9 Crowns', 28, '#8A5A12']], lt - .2);
    note(760, 390, .05, 470, 150, [['200 MK x 10', 30], ['= 2,000 ?!', 32, '#C9364A']], lt - 1.4);
    note(300, 540, -.02, 420, 130, [['Cart  480 MK', 28], ['I guess 40 CR', 30, '#8A5A12']], lt - 2.6);
    const display = lt < 1.2 ? '90/10' : lt < 2.4 ? '9' : lt < 3.6 ? '200x10' : lt < 4.6 ? '2000' : '40?';
    if (lt < 4.6) calculator(620, 560, display);
    if (lt > 4.6) {
      const y = lerp(1600, 1180, easeOut(seg(lt, 4.6, 5.5)));
      X.save(); X.translate(160, y);
      rbox(0, 0, 760, 560, '#FFFDF8', INK, 16, 4);
      text('VALE MARKET', 380, 40, 28, '#146E68');
      text('paid in Marks', 380, 74, 18, '#5C6A64', { weight: 600 });
      GOODS.forEach((g, i) => {
        text(g.name, 36, 130 + i * 48, 26, INK, { align: 'left' });
        text(g.mk + ' MK', 724, 130 + i * 48, 26, INK, { align: 'right' });
      });
      line([[36, 330], [724, 330]], { stroke: INK, lwPx: 2 });
      text('CART  480 MK', 36, 370, 26, '#146E68', { align: 'left' });
      text('IN CROWNS', 36, 430, 22, '#8A5A12', { align: 'left' });
      text('48 CR', 724, 426, 36, '#8A5A12', { align: 'right' });
      text('his note said 40 CR', 380, 480, 24, '#C9364A');
      rbox(190, 504, 380, 40, '#C9364A', null, 10, 0);
      text('OVERSPENT', 380, 524, 22, '#FFFDF8');
      X.restore();
    }
    fadeIn(lt);
    hud(false);
    caption('BEFORE', lt < 4.6 ? 'He converts on notes and a calculator.' : 'His note said 40 Crowns. He pays 48.');
  }

  function phoneShot(t, lt) {
    const P = persp({ x: 0, y: 150, z: 500, f: 680, hy: 1180, dir: 1 });
    const o = room(P, t, 760);
    const cheese = GOODS[3];
    tag(P, cheese, 1, lt > 3.2 ? '20.00 CR' : '');
    const J = person(P, 'jenna', -130, 820, {
      t, lookY: -.85, lookX: .35,
      eyes: lt > 3.2 ? 'happy' : 'wide',
      mouth: lt > 3.2 ? 'grin' : 'o',
      brows: 'up',
      handR: [2.6, -13],
      handPoseR: 'open',
    });
    person(P, 'housam', 150, 800, {
      t, lookX: -.6, lookY: -.45,
      eyes: lt > 3.2 ? 'happy' : 'wide',
      mouth: lt > 3.2 ? 'grin' : 'flat',
      brows: lt > 3.2 ? 'up' : 'worried',
    });
    K.front(P, t, o);
    const slide = easeOut(seg(lt, .1, .8));
    phone(lerp(1100, 150, slide), 230, 780, 680, lt);
    if (J && J.handR) {
      X.save(); X.translate(J.handR[0], J.handR[1]);
      rbox(-16, -28, 32, 48, '#2A3140', INK, 4, 2);
      rbox(-12, -22, 24, 32, '#7DFFB2', null, 2, 0);
      X.restore();
    }
    fadeIn(lt);
    hud(true);
    caption('AFTER', lt > 3.1 ? '200 Marks is 20 Crowns, live.' : 'Jenna points Howmch at the cheese.');
  }

  function after(t, lt) {
    const P = persp({ x: 10, y: 150, z: 480, f: 700, hy: 1120, dir: 1 });
    const o = room(P, t, 760);
    sign(P);
    person(P, 'jenna', -130, 830, { t, eyes: 'happy', mouth: 'grin', brows: 'up' });
    person(P, 'housam', 150, 800, { t, eyes: 'happy', mouth: 'grin', brows: 'up' });
    K.front(P, t, o);
    rbox(70, 250, 940, 200, '#F8E4E2', INK, 18, 4);
    text('BEFORE', 540, 292, 22, '#C9364A');
    text('notes guessed 40 CR', 540, 348, 32, INK);
    text('he paid 48 CR', 540, 400, 36, '#C9364A');
    rbox(70, 470, 940, 220, '#E5F6EF', INK, 18, 4);
    text('AFTER', 540, 514, 22, '#0E8F7A');
    text('milk  90 MK', 540, 572, 32, INK);
    text('=  9.00 CR', 540, 630, 44, '#0E8F7A');
    if (lt > 2.2) {
      const k = easeOut(seg(lt, 2.2, 2.8));
      X.save(); X.globalAlpha = k;
      rbox(120, 720, 840, 72, '#0E8F7A', INK, 16, 4);
      text('See any price in your money.', 540, 756, 30, '#FFFDF8');
      X.restore();
    }
    fadeIn(lt);
    hud(true);
    caption('AFTER', 'Howmch shows the price in her money.');
  }

  scene({
    duration: 28,
    fps: 24,
    bpm: 116,
    width: 1080,
    height: 1920,
    shots: [
      [0, arrive],
      [5.5, shock],
      [11.5, math],
      [18.2, phoneShot],
      [24, after],
    ],
  });
})();
