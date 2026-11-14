// scenes/birthday/scene70_nine_moves/opening.js: the opening and the eight teaching shots of "Nine Moves".
//   curtain    a dark stage, spotlights bang on per beat, Alma's silhouette; A · L · M · A · IS · NINE!; lights up; 9 MOVES, LET'S GO!
//   entrance   Alma skips down the floor, bounces, twirls; the whole gang pops up along the back
//   m1 … m8    moveShot(n): Alma slides in beside a friend, teaches the move, and on the shouted number (HIT[n]) the stage
//              re-skins itself, the number slams, a star flies to the DANCE POWER meter and everyone who already knows a move
//              drops in behind to dance the new one
//   dj         DJ Clawd close-up: 3 DOWN, 6 TO GO!; Housam jogs in with his ball
// party.js adds the choruses, the dance break and the finale. scene.js looks shots up by name in N9_SHOTS.
const N9_SHOTS = (() => {
  const { C, FIRE, NINE, CUT, HIT, MOVES, NAMES, BEAT, BARLEN, bpos, beatK, hop, kickK, on, slamK, groove, almaPose, bigText, slamText, burst, pop, cannon, balloon } = N9;
  const S = N9S, TH = S.TH;
  const PARTNERS = [['danny'], ['jester'], ['jenna'], ['housam'], ['robo'], ['neptune', 'pearl'], ['dragon'], ['safadi', 'sami']];
  const TAG = ['DANNY', 'FESTER', 'JENNA', 'HOUSAM', 'ROBO-SAFADI', 'NEPTUNE & PEARL', 'DRAGON', 'THE PROFESSORS'];
  const ALL = PARTNERS.flat();
  // where each friend dances once they know a move (world x, z), behind Alma and her current partner
  const SLOT = { danny: [-330, 230], jenna: [-215, 310], jester: [330, 240], housam: [225, 320], robo: [-455, 340], neptune: [480, 390], pearl: [610, 300], dragon: [-640, 430], safadi: [-560, 170], sami: [560, 150] };
  const FACE = { neptune: { flip: true }, pearl: { flip: true } };
  const HI = t => ({ handR: [4.2 + .5 * wob(t, 1.6), -12.2], handPoseR: 'palm', mouth: 'grin', brows: 'up', tilt: .06, eyes: 'happy' });

  // One staged frame: camera (2D bump and shake on top of the 3D view), backdrop, floor, then the cast in depth order.
  function stg(t, v, th, o, castFn) {
    const [sx, sy] = N9.shake(t, o.shakes || []);
    camBegin(W / 2 - sx, H / 2 - sy, (o.zoom ?? 1.02) * (1 + (o.bump ?? .012) * beatK(t)), o.roll || 0);
    const P = S.view(v);
    layer(() => S.back(P, t, th, o), { blur: o.blur ?? clamp((P.k(0) - 2.3) * 1.5, 0, 3.5) });
    S.floor(P, t, th, o);
    if (o.under) o.under(P);
    const A = castFn ? S.cast(P, castFn(P)) : {};
    if (o.over) o.over(P, A);
    camEnd();
    return { P, A };
  }
  // The gang: those who know a move dance it in a V behind Alma; the rest clap along at the back.
  function troupe(known, fn, o = {}) {
    const list = [], sp = o.spread ?? 1;
    ALL.forEach((w, i) => {
      const ki = known.indexOf(w);
      if (ki >= 0) { const side = ki % 2 ? 1 : -1, rank = (ki >> 1) + 1; list.push({ who: w, x: side * (140 * rank + 30) * sp, z: 105 * rank * sp, o: { ...fn(w, ki), ...(FACE[w] && side > 0 ? FACE[w] : {}) } }); }
      else if (o.rest !== false) { const ri = i - known.length; list.push({ who: w, x: (ri - (ALL.length - known.length - 1) / 2) * 150, z: 600, o: { ...groove(w, 'clap', o.b ?? 0, 1, i), ...(FACE[w] || {}) } }); }
    });
    return list;
  }
  const known = n => PARTNERS.slice(0, n).flat();

  // ---------- curtain ----------
  function curtain(t, lt) {
    const b = bpos(t), NINE_T = 5.65, LET = 1.805, MOVES_T = 6.3, GO_T = 7.4, JUMP_T = 7.8, up = seg(lt, NINE_T - .05, NINE_T + .3), e = lerp(.05 + .22 * seg(lt, 2, 4), 1, up);
    const th = up > .5 ? TH.lilac : TH.night;
    const v = { d: lerp(720, 430, ease(lt / 8)), eye: 110, feetY: 900 };
    const { A } = stg(t, v, th, { energy: e, label: lt > NINE_T - .1 ? '' : 'ALMA ★ 9', shakes: [[NINE_T, 30]], cx: 0,
      under: P => {
        [[-420, 260], [420, 260], [-200, 80], [200, 80]].forEach(([x, z], i) => S.spot(P, x + 60 * Math.sin(t * 1.4 + i), z, 150, FIRE[i], (1 - up) * slamK(lt, .305 + i * BEAT) * (.6 + .4 * beatK(t)), [W / 2 + (i - 1.5) * 380, -100]));
        S.spot(P, 0, 0, 190, '#FFFFFF', lerp(.9, .35, up) * slamK(lt, 0));
      } }, () => {
      const turn = lerp(Math.PI, TAU, ease(seg(lt, NINE_T - .5, NINE_T)));
      const crouch = on(lt, JUMP_T - .4, JUMP_T, .15), jump = lt > JUMP_T ? 5 * Math.sin(Math.PI * seg(lt, JUMP_T, JUMP_T + .5)) : 0;
      const o = lt < NINE_T ? { spin: turn, handL: [-3.2, -5.4], handR: [3.2, -5.4], dy: .25 * hop(t), hairSwing: .5 * Math.sin(b * Math.PI) }
        : lt < MOVES_T ? { ...almaPose('cheer', b, 1, 1), jump: 3 * Math.sin(Math.PI * seg(lt, NINE_T, NINE_T + .6)) }
        : { ...HI(t), power: 1, eyes: 'star', dy: 1.1 * crouch, sq: .12 * crouch, jump };
      return [{ who: 'alma', x: 0, z: 0, o }];
    });
    // her silhouette until the lights come up
    if (up < 1) { X.save(); X.globalAlpha = .7 * (1 - up); X.fillStyle = '#0A0420'; X.fillRect(0, 0, W, H); X.restore();
      const P = S.view(v), [sx, sy, k] = P.p(0, 0, 0);
      layer(() => N9.put('alma', sx, sy, k, { spin: lerp(Math.PI, TAU, ease(seg(lt, NINE_T - .5, NINE_T))), handL: [-3.2, -5.4], handR: [3.2, -5.4], dy: .25 * hop(t), hairSwing: .5 * Math.sin(b * Math.PI), noShadow: true }), { filter: `brightness(${(up * .9).toFixed(2)})` });
      X.save(); X.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 4; i++) { const k2 = (1 - up) * slamK(lt, .305 + i * BEAT) * (.5 + .5 * beatK(t)), bx = W / 2 + (i - 1.5) * 420, a = Math.PI / 2 + .35 * Math.sin(t * 1.6 + i * 2);
        X.globalAlpha = .2 * k2; X.fillStyle = FIRE[i]; X.beginPath(); X.moveTo(bx - 14, -20); X.lineTo(bx + 14, -20); X.lineTo(bx + Math.cos(a) * 1500 + 190, 1400); X.lineTo(bx + Math.cos(a) * 1500 - 190, 1400); X.fill(); }
      X.restore();
      circle(sx, sy - 60 * k, 300 * k / 2, { fill: radGrad(sx, sy - 60 * k, 0, 150 * k, [[0, 'rgba(233,184,255,.35)'], [1, 'rgba(233,184,255,0)']]), stroke: null });
    }
    // A · L · M · A, one letter a beat, then IS … NINE!
    overlay(() => {
      'ALMA'.split('').forEach((ch, i) => { const t0 = LET + i * BEAT, out = 1 - easeIn(seg(lt, 4.1, 4.35));
        bigText(ch, 555 + i * 270, 250 - 500 * (1 - out) + 10 * Math.sin(t * 5 + i), 300, FIRE[i], slamK(lt, t0) * (1 + .08 * beatK(t)), (i - 1.5) * .05, { glow: FIRE[i] }); });
      bigText('IS', W / 2, 250, 170, C.white, slamK(lt, 4.4) * (1 - easeIn(seg(lt, NINE_T - .25, NINE_T - .05))), -.04);
      bigText('NINE!', W / 2, 270, 340, C.gold, slamK(lt, NINE_T) * (1 - easeIn(seg(lt, MOVES_T - .2, MOVES_T))) * (1 + .06 * beatK(t)), -.05, { glow: C.magenta });
      bigText('9 MOVES', 400, 250, 170, C.cyan, slamK(lt, MOVES_T) * (1 - easeIn(seg(lt, 8.1, 8.3))), -.07, { glow: '#FFFFFF' });
      bigText("LET'S GO!", 1500, 270, 190, C.magenta, slamK(lt, GO_T) * (1 - easeIn(seg(lt, 8.1, 8.3))), .06, { glow: '#FFFFFF' });
    });
    'ALMA'.split('').forEach((ch, i) => burst(555 + i * 270, 250, lt - LET - i * BEAT, 260, 18, i * 5));
    burst(W / 2, 270, lt - NINE_T, 620, 46, 2); burst(420, 420, lt - NINE_T - .15, 380, 30, 7); burst(1500, 420, lt - NINE_T - .25, 380, 30, 11);
    if (A.alma) pop('star', A.alma.head[0], A.alma.head[1], lt - NINE_T, 420, 14, 3, NINE, 30);
    cannon(0, H, -1.05, lt, JUMP_T, 50, 2); cannon(W, H, -2.1, lt, JUMP_T, 50, 6);
    flash(.9 * kickK(lt, NINE_T, 6));
  }

  // ---------- entrance ----------
  function entrance(t, lt, dur) {
    const b = bpos(t), az = lerp(520, 0, ease(seg(lt, 0, 1.6)));
    const { A } = stg(t, { d: 540, eye: 110, feetY: 905 }, TH.lilac, { label: 'ALMA ★ 9', cx: 0, cz: az,
      under: P => S.spot(P, 0, az, 170, '#FFFFFF', .5) }, () => {
      const o = lt < 1.6 ? { ...almaSkip((520 - az) / 44), handR: [3.1, -6.4], mouth: 'grin', eyes: 'happy', power: .6 }
        : lt < 2.5 ? almaPose('bounce', b) : lt < 3.25 ? almaPose('twirl', b - 5) : { ...almaPose('disco', 0.3), handR: [4.9, -13.4] };
      const gang = ALL.map((w, i) => { const k = backOut(seg(lt, 1.2 + i * .12, 1.6 + i * .12)); return k <= 0 ? null : { who: w, x: (i - 4.5) * 160, z: 620, y: 700 * (1 - k), o: { ...groove(w, 'cheer', b, 1, i), ...(FACE[w] || {}) } }; });
      return [{ who: 'alma', x: 0, z: az, o }, ...gang];
    });
    if (A.alma) { pop('note', A.alma.head[0], A.alma.head[1], lt - 1.6, 300, 8, 1, [C.purple, C.magenta, C.cyan, C.gold], 26); pop('star', A.alma.head[0], A.alma.head[1], lt - 2.5, 340, 12, 4, NINE, 26); }
    slamText('WHO WANTS TO DANCE?', W / 2, 110, 120, C.white, lt, .3, 1.5, -.03, { glow: C.magenta });
    slamText('ME!', 330, 560, 170, C.gold, lt, 2.0, .9, -.1); slamText('ME!', 1600, 540, 170, C.cyan, lt, 2.5, .9, .1); slamText('ME! ME!', W / 2, 110, 170, C.magenta, lt, 3.0, .95, -.04);
  }

  // ---------- the eight teaching shots ----------
  function extra(n, w, t, lt, u, zo) {
    const post = u >= 0;
    if (w === 'robo') return post ? { eyes: 'heart', hum: false } : { red: .8 * (1 - seg(lt, .8, 1.2)), scan: lt < 1 ? 1 : 0, eyes: lt < 1 ? 'wide' : 'open', hum: true };
    if (w === 'neptune') return { flip: true, trident: true, tridentAng: -1.3 + .25 * Math.sin(t * 6), power: post ? 1 : .25 };
    if (w === 'pearl') return { flip: true };
    if (w === 'dragon' && post) return { ...dragonFlight(t, { speed: 2, lift: 7 * zo }), noShadow: false };
    if (w === 'safadi') return post ? { power: 1, bulb: 1 } : lt < 1 ? { handR: [4.6, -22], handPoseR: 'point', eyes: 'closed', brows: 'up', mouth: lipFlap(t, lt > .2 && lt < .95, 'smirk'), lookX: 0 } : {};
    if (w === 'sami' && post) return { power: 1 };
    if (w === 'jester' && post) return { eyes: 'star' };
    return {};
  }
  function fx(n, t, lt, u, A, P) {
    const post = u >= 0, k0 = P.k(0);
    if (n === 0 && post) for (let i = 0; i < 16; i++) { const y = H + 160 - (u + .25 * hash(i)) * 1250; balloon(hash(i * 3.3) * W, y, 46 + 20 * hash(i * 7), FIRE[i % 6], t, null, i); }
    if (n === 1 && post) { S.discoBall(W / 2 + 330, lerp(-140, 190, backOut(seg(u, 0, .45))), 92, t);
      X.save(); X.globalCompositeOperation = 'lighter'; for (let i = 0; i < 40; i++) { const a = i * 2.4 + t * 1.6; X.fillStyle = rgba(i % 2 ? '#FFFFFF' : C.cyan, .35); X.fillRect(W / 2 + 330 + Math.cos(a) * (200 + i * 22), 190 + Math.sin(a) * (120 + i * 16), 14, 14); } X.restore(); }
    if (n === 2 && post && A.alma && A.jenna) { const cx = (A.alma.head[0] + A.jenna.head[0]) / 2;
      for (let i = 0; i < 34; i++) { const a = i * .7 + t * 7, q = frac(i / 34 + t * .5), z = Math.sin(a); shape(starPts(cx + Math.cos(a) * (330 + 60 * q), 930 - q * 760, 10 + 9 * (z + 1), .4, 4, a), { fill: [C.gold, '#FFFFFF', C.pink, C.cyan][i % 4], stroke: C.ink, lwPx: 2, alpha: .9 }); } }
    if (n === 3 && A.housam) { const s = HOUSAM_UNIT * k0, bob = post ? 26 * hop(t) * k0 / 2.3 : 6 * Math.sin(t * 9); housamBall(A.housam.top[0] + 4 * Math.sin(t * 7), A.housam.top[1] - 1.3 * s - bob, s, { spin: t * 3 }); }
    if (n === 4 && A.robo) { pop('heart', A.robo.head[0], A.robo.head[1] - 60, u, 260, 9, 2, [C.magenta, C.pink, C.red], 26); pop('heart', A.robo.head[0], A.robo.head[1] - 60, u - .5, 260, 9, 5, [C.magenta, C.pink, C.red], 26);
      callout('BEEP. BOOP. *DANCE?*', A.robo.mouth[0], A.robo.mouth[1], lt - .15, { dx: 250, dy: -250, size: 46, cps: 30, hold: .8, kind: 'robot' }); }
    if (n === 5 && post) { const xf = lerp(-500, W + 900, seg(u, 0, 1.0)), pts = [[xf - 1300, H + 20]];
      for (let x = xf - 1300; x <= xf; x += 50) { const q = (x - xf + 1300) / 1300; pts.push([x, H - 60 - 430 * Math.pow(q, 2.2) - 30 * Math.sin(x * .02 + t * 9)]); } pts.push([xf + 60, H - 380], [xf + 20, H + 20]);
      shape(pts, { fill: 'rgba(95,227,240,.38)', stroke: '#FFFFFF', lwPx: 7, smooth: .5 });
      for (let i = 0; i < 14; i++) circle(xf - 40 - i * 60 + 20 * Math.sin(t * 8 + i), H - 430 * Math.pow(1 - i / 22, 2.2) - 90 - 30 * hash(i), 14 + 12 * hash(i * 3), { fill: 'rgba(255,255,255,.5)', stroke: null }); }
    if (n === 6 && post && A.dragon) { burst(A.dragon.head[0], A.dragon.head[1] - 40, u, 420, 30, 3, [C.orange, C.gold, C.red]);
      for (let i = 0; i < 20; i++) { const a = i / 20 * TAU + t * 5, r = 250 * easeOut(seg(u, 0, .4)); circle(W / 2 + Math.cos(a) * r * 2.6, 300 + Math.sin(a) * r, 22 - i * .5, { fill: i % 2 ? C.orange : C.gold, stroke: null, alpha: 1 - seg(u, .7, 1) }); } }
    if (n === 7) { if (A.safadi) callout('Allow me to *EXPLAIN*…', A.safadi.mouth[0], A.safadi.mouth[1], lt - .05, { dx: 150, dy: -280, size: 46, cps: 30, hold: .4 });
      if (A.alma) callout('No! *DANCE!*', A.alma.mouth[0], A.alma.mouth[1], lt - 1.3, { dx: -230, dy: -250, size: 52, cps: 30, hold: .7, kind: 'shout' });
      slamText('9 = 3 × 3 = DANCE!', W / 2, 660, 84, C.white, t, HIT[7] + .2, .75, .02); }
  }
  function moveShot(n) {
    const hit = HIT[n], move = MOVES[n], partners = PARTNERS[n], crew = known(n);
    return (t, lt) => {
      const t0 = t - lt, u = t - hit, pre = hit - t0, b = bpos(t), post = u >= 0, zo = easeOut(seg(u, 0, .28));
      const th = post ? TH[S.THEME_OF[n]] : TH.lilac, teach = seg(lt, .5, 1.2);
      const v = post ? { d: lerp(300, 480, zo), eye: lerp(85, 120, zo), feetY: lerp(905, 895, zo), x: lerp(15, 0, zo) } : { d: lerp(345, 300, lt / pre), eye: 85, feetY: 905, x: 15 };
      const { P, A } = stg(t, v, th, { shakes: [[hit, 26]], label: post ? (u < 1.15 ? '' : NAMES[n]) : `MOVE ${n + 1}`, cx: -85,
        under: P => { S.spot(P, -85, 0, 150, '#FFFFFF', post ? .25 : .5); } }, () => {
        const slide = seg(lt, 0, .5), ax = lerp(-560, -85, backOut(seg(lt, 0, .55)));
        const aO = lt < .5 ? { ...HI(t), hairSwing: -.9 * (1 - slide), lean: .14 * (1 - slide), power: .45, footR: [1.6, -.9] } : almaPose(move, b, post ? 1 : lerp(.6, .9, teach), post ? 1 : .45);
        const list = [{ who: 'alma', x: ax, z: 0, o: aO }];
        partners.forEach((w, i) => {
          const px = partners.length > 1 ? 75 + i * 150 : 100;
          const o = lt < 1 ? { ...groove(w, 'watch', b), lookX: -.8, ...(N9.RIG[w].beast ? {} : { emote: '!', emoteK: on(lt, .15, .95, .12) }) } : groove(w, move, b, post ? 1 : lerp(.4, .8, seg(lt, 1, pre)), i);
          list.push({ who: w, x: px, z: i ? 50 : 0, o: { ...o, ...extra(n, w, t, lt, u, zo) } });
        });
        if (post) crew.forEach((w, i) => { const [x, z0] = SLOT[w], z = z0 * .6, drop = 1 - easeOut(seg(u, .03 * i, .3 + .03 * i)); list.push({ who: w, x, z, y: 520 * drop, o: { ...groove(w, move, b, 1, i), ...(FACE[w] && x > 0 ? FACE[w] : {}) } }); });
        return list;
      });
      fx(n, t, lt, u, A, P);
      if (A.alma) { pop('star', A.alma.head[0], A.alma.head[1], u, 380, 12, n, NINE, 28);
        // the new star flies up to the meter
        const f = seg(u, .05, .55); if (f > 0 && f < 1) { const sx = lerp(A.alma.head[0], 94 + n * 50, ease(f)), sy = lerp(A.alma.head[1], 112, ease(f)) - 260 * 4 * f * (1 - f); overlay(() => { shape(starPts(sx, sy, 34, .5, 5, f * 9), { fill: NINE[n], stroke: C.ink, lwPx: 4 }); circle(sx - 9, sy - 9, 6, { fill: 'rgba(255,255,255,.8)', stroke: null }); }); } }
      cannon(0, H, -1.0, t, hit, 36, n * 3 + 1); cannon(W, H, -2.14, t, hit, 36, n * 3 + 2);
      N9.moveCard(n, TAG[n], t, t0 + .35, hit - .05); N9.moveSlam(t);
    };
  }

  // ---------- DJ Clawd: 3 down, 6 to go ----------
  function dj(t, lt) {
    const b = bpos(t);
    if (lt < 2) {
      stg(t, { d: 560, eye: 0, feetY: 930 }, TH.cosmic, { kb: lerp(2.5, 2.9, lt / 2), blur: 0, label: '', bump: .03, dj: { aL: 1.3 * Math.sin(t * 22), aR: -1.2 * Math.sin(t * 17 + 1), eyes: 'spark', mouth: 'grin', jump: 1.6 * hop(t), holo: .5 } });
      slamText('3 DOWN!', 400, 190, 190, C.gold, lt, .15, 1.75, -.08, { glow: '#FFFFFF' }); slamText('6 TO GO!', 1520, 210, 190, C.cyan, lt, 1.0, .95, .07, { glow: '#FFFFFF' });
      burst(400, 190, lt - .15, 320, 22, 3); burst(1520, 210, lt - 1.0, 320, 22, 8);
    } else {
      const l2 = lt - 2, hx = lerp(900, 100, easeOut(seg(l2, 0, 1.3)));
      const { A, P } = stg(t, { d: lerp(430, 345, ease(l2 / 2)), eye: 95, feetY: 905, x: 15 }, TH.lilac, { label: 'MOVE 4', cx: -85 }, () => [
        { who: 'alma', x: -85, z: 0, o: l2 < 1 ? { ...almaPose('bounce', b), handR: [4.4, -12.4], handPoseR: 'palm' } : almaPose('cheer', b) },
        { who: 'housam', x: hx, z: 0, o: l2 < 1.3 ? { ...housamDribble((900 - hx) / 60), mouth: 'grin', eyes: 'happy', flip: true } : groove('housam', 'cheer', b) },
        ...known(3).map(w => ({ who: w, x: SLOT[w][0], z: SLOT[w][1] + 120, o: groove(w, 'clap', b, 1, 2) }))]);
      if (A.housam && l2 < 1.3) { const s = HOUSAM_UNIT * P.k(0); housamBall(A.housam.footL[0] - 30, A.housam.footL[1] - 1.2 * s - 40 * hop(t, .25), s, { spin: -t * 9 }); }
      slamText('HOUSAM!', 1420, 120, 150, NINE[3], lt, 2.4, 1.4, .05, { glow: '#FFFFFF' });
    }
    flash(.5 * kickK(lt, 2, 9));
  }

  const shots = { curtain, entrance, dj };
  for (let n = 0; n < 8; n++) shots['m' + (n + 1)] = moveShot(n);
  return Object.assign(shots, { _: { stg, troupe, known, PARTNERS, ALL, SLOT, FACE, HI } });
})();
