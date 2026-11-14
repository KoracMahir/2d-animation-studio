// scenes/birthday/scene70_nine_moves/party.js: the choruses, the dance break and the finale of "Nine Moves".
//   chorus1     eight bars, a new angle every two: the V of dancers · Alma close, hearts · the floor from above · hands up
//   chorus2     the same with seven dancers: the line · Alma and Jenna twirl · a circle dance from above · fountains and Dragon's flag
//   danceBreak  the dance circle, a two-bar solo each: Danny's backflips, Jenna's cartwheels, Housam's keepie-uppie, Fester juggles… BONK
//   build       ONE MORE MOVE! then eight beats, eight moves, counted out loud while Alma charges up
//   nine        NINE! she rockets into the sky (ALMA in fireworks), lands in the party, Dr. G and Dad roll the cake in, MAKE A WISH, WHOOSH, a firework 9
//   everybody   the victory lap: all eight moves, one a beat; then star jumps, and Sarah is definitely not dancing
//   finalPose   the group photo: HAPPY BIRTHDAY ALMA!, a wink, iris out
Object.assign(N9_SHOTS, (() => {
  const { C, FIRE, NINE, CUT, HIT, MOVES, NAMES, BEAT, BARLEN, bpos, beatK, hop, kickK, on, slamK, groove, almaPose, bigText, slamText, burst, fireWord, confetti, cannon, pop, balloon, cake, put } = N9;
  const S = N9S, TH = S.TH, { stg, troupe, known, ALL, SLOT, FACE, HI } = N9_SHOTS._;
  const barOf = lt => Math.floor(lt / BARLEN + 1e-6);
  const cutFlash = lt => flash(.3 * kickK(lt % (2 * BARLEN), 0, 12));

  // ---------- the choruses ----------
  function chorus(t, lt, who, seq, th0, second) {
    const b = bpos(t), bar = barOf(lt), part = bar >> 1, l2 = lt - part * 2 * BARLEN, move = seq[bar % seq.length];
    let A = {};
    if (part === 0) {                       // the V, pushing in
      ({ A } = stg(t, { d: lerp(second ? 700 : 600, second ? 600 : 500, l2 / 4), eye: 125, feetY: 900 }, th0, { label: 'ALMA IS 9!', cx: 0 }, () => [
        { who: 'alma', x: 0, z: 0, o: almaPose(move, b) }, ...troupe(who, w => groove(w, move, b), { b })]));
    } else if (part === 1) {                // Alma close (with Jenna the second time)
      const m2 = bar % 2 ? (second ? 'wave' : 'cheer') : 'twirl';
      ({ A } = stg(t, { d: lerp(330, 290, l2 / 4), eye: 80, feetY: 915, x: second ? 60 : 0 }, th0, { label: 'ALMA IS 9!', cx: 0, roll: .03 * Math.sin(b * Math.PI / 2) }, () => [
        { who: 'alma', x: 0, z: 0, o: almaPose(m2, b) },
        second ? { who: 'jenna', x: 130, z: 20, o: groove('jenna', m2, b) } : null,
        { who: 'danny', x: -190, z: 150, o: groove('danny', 'bounce', b) }, { who: 'jester', x: 250, z: 190, o: groove('jester', 'disco', b) },
        ...(second ? [{ who: 'housam', x: -320, z: 240, o: groove('housam', 'floss', b) }, { who: 'robo', x: 400, z: 280, o: { ...groove('robo', 'robot', b), eyes: 'heart' } }] : [{ who: 'jenna', x: 150, z: 120, o: groove('jenna', 'twirl', b) }])]));
      if (A.alma) for (let i = 0; i < 4; i++) pop('heart', A.alma.head[0], A.alma.head[1] - 40, l2 - i * 1.0, 360, 8, i * 3, [C.magenta, C.pink, '#FFFFFF'], 26);
    } else if (part === 2) {                // from above: the floor ripples out from her; the second time the gang circles her
      const th = { ...th0, floor: 'ripple', a: th0.a === '#FFFFFF' ? C.gold : th0.a };
      ({ A } = stg(t, { d: lerp(700, 620, l2 / 4), eye: 330, feetY: 800 }, th, { label: 'ALMA IS 9!', cx: 0, cz: 0, roll: .05 * Math.sin(l2 * .8) }, () => [
        { who: 'alma', x: 0, z: 0, o: almaPose(second ? 'star' : move, b) },
        ...(second ? who.map((w, i) => { const a = i / who.length * TAU + l2 * .9; return { who: w, x: 320 * Math.cos(a), z: 170 + 200 * Math.sin(a), o: { ...groove(w, 'bounce', b, 1, i), ...(FACE[w] && Math.cos(a) > 0 ? FACE[w] : {}) } }; })
          : troupe(who, w => groove(w, move, b), { b, spread: 1.15 }))]));
    } else {                                // hands up, from down low; cannons, fountains, Dragon's flag
      ({ A } = stg(t, { d: lerp(520, 440, l2 / 4), eye: 45, feetY: 950 }, th0, { label: 'ALMA IS 9!', cx: 0, bump: .02,
        under: P => { if (second) for (let i = 0; i < 6; i++) { const [fx, fy, k] = P.p((i - 2.5) * 260, 0, 560), hgt = 520 * k * (.35 + .65 * Math.abs(Math.sin(b * Math.PI / 2 + i * .5)));
          X.fillStyle = linGrad(0, fy - hgt, 0, fy, [[0, 'rgba(255,255,255,.9)'], [1, rgba(NINE[i + 2], .75)]]); X.beginPath(); X.moveTo(fx - 22 * k, fy); X.quadraticCurveTo(fx - 30 * k, fy - hgt, fx, fy - hgt * 1.05); X.quadraticCurveTo(fx + 30 * k, fy - hgt, fx + 22 * k, fy); X.fill(); } } }, () => [
        { who: 'alma', x: 0, z: 0, o: bar % 2 || l2 < 3.4 ? almaPose('cheer', b) : { ...almaPose('disco', .3) } }, ...troupe(who, (w, i) => groove(w, 'cheer', b, 1, i), { b, spread: .9 })]));
      cannon(0, H, -1.0, l2, 0, 44, 3); cannon(W, H, -2.14, l2, 0, 44, 4); cannon(0, H, -1.0, l2, 2, 44, 5); cannon(W, H, -2.14, l2, 2, 44, 6);
      if (second) { const dx = lerp(-300, W + 300, l2 / 4), dy0 = 210 + 30 * Math.sin(t * 3);
        const D = put('dragon', dx, dy0 + 150, 1.15, { ...dragonFlight(t, { speed: 3, lift: 0 }), noShadow: true });
        const fx0 = dx - 190, fl = [[fx0, dy0 - 40], [fx0 - 220, dy0 - 60 + 16 * Math.sin(t * 9)], [fx0 - 220, dy0 + 70 + 16 * Math.sin(t * 9 + 1)], [fx0, dy0 + 90]];
        shape(fl, { fill: C.magenta, stroke: C.ink, lwPx: 4, smooth: .3 }); bigText('9', fx0 - 115, dy0 + 20 + 10 * Math.sin(t * 9), 120, C.gold, 1); void D; }
    }
    slamText(second ? 'NINE! NINE!' : 'GO ALMA!', W / 2, 120, 150, C.gold, lt, 4.05, 1.0, -.04, { glow: C.magenta });
    slamText('HANDS UP!', W / 2, 240, 190, C.cyan, lt, 12.05, 1.2, .04, { glow: '#FFFFFF' });
    burst(380, 230, lt - 12.1, 360, 26, 4); burst(1540, 230, lt - 12.3, 360, 26, 9); burst(960, 150, lt - 14.0, 460, 36, 12);
    if (part) cutFlash(lt);
    return A;
  }
  const chorus1 = (t, lt) => chorus(t, lt, known(3), ['bounce', 'disco', 'twirl', 'cheer', 'bounce', 'twirl'], TH.party, false);
  const chorus2 = (t, lt) => chorus(t, lt, known(6), ['floss', 'robot', 'twirl', 'wave', 'star', 'star'], TH.cosmic, true);

  // ---------- the dance circle ----------
  const SOLO = [['danny', 'GO DANNY!', 'BACKFLIPS!'], ['jenna', 'GO JENNA!', 'CARTWHEELS!'], ['housam', 'GO HOUSAM!', 'KEEPIE-UPPIE!'], ['jester', 'GO FESTER!', 'JUGGLING!']];
  function danceBreak(t, lt, dur) {
    const b = bpos(t), n = Math.min(3, Math.floor(lt / (dur / 4))), l2 = lt - n * dur / 4, sb = l2 / BEAT, [who, shout, trick] = SOLO[n], bonk = n === 3 ? 3.0 : 99;
    const ring = ALL.filter(w => w !== who), laugh = l2 > bonk + .15;
    let sx0 = 0, ball = null;
    const { A, P } = stg(t, { d: lerp(430, 370, l2 / 4), eye: 100, feetY: 915, x: 30 * Math.sin(l2 * .8) }, TH.party, { label: l2 < 1.9 ? '' : shout, cx: 0, cz: 60, shakes: [[t - l2 + bonk, n === 3 ? 22 : 0]],
      under: P => S.spot(P, sx0, 60, 210, '#FFFFFF', .55) }, () => {
      let o, x = 0;
      if (n === 0) { const f = frac(sb / 2); o = { ...groove('danny', 'cheer', b), jump: 15 * Math.sin(Math.PI * f), rot: -TAU * ease(seg(f, .12, .88)), sq: .14 * kick(f, 0, 14) }; }
      else if (n === 1) { const tr = Math.sin(sb * Math.PI / 4); x = 250 * tr; o = { ...groove('jenna', 'cheer', b), rot: tr * TAU * 1.5, jump: 2.5 * hop(t), eyes: 'happy', mouth: 'open' }; }
      else if (n === 2) { const c = Math.floor(sb) % 3, f = frac(sb), kk = kick(f, 0, 9);
        o = { eyes: 'open', lookY: -.6, brows: 'up', mouth: 'grin', handL: [-6.5, -15], handR: [6.5, -15], dy: .3 * hop(t), ...(c === 0 ? { footR: [1.9, -1.05 - 4.5 * kk] } : c === 1 ? { footL: [-1.2, -1.05 - 6.5 * kk], lean: .06 } : { jump: 2.2 * kk, tilt: -.1 * kk }) };
        ball = [[.35, 7], [-.25, 13], [0, 34]][c].concat([[.35, 7], [-.25, 13], [0, 34]][(c + 1) % 3], f); }
      else { const jg = l2 < bonk; o = jg ? { handL: [-4.4, -13 - 2.4 * Math.max(0, Math.sin(sb * Math.PI * 2))], handR: [4.4, -13 - 2.4 * Math.max(0, -Math.sin(sb * Math.PI * 2))], handPoseL: 'cup', handPoseR: 'cup', lookY: -.9, eyes: 'open', mouth: 'grin', dy: .2 * hop(t) }
        : { eyes: l2 < bonk + .35 ? 'swirl' : 'happy', stars: on(l2, bonk, 4, .08), mouth: l2 < bonk + .35 ? 'wobble' : 'smirk', handL: [-4.6, -12.6], handR: [4.6, -12.6], tilt: .14, hatAskew: .25, sq: .25 * kickK(l2, bonk, 9) }; }
      sx0 = x;
      const crowd = ring.map((w, i) => { const a = (i / (ring.length - 1) - .5) * 2.5; return { who: w, x: 640 * Math.sin(a), z: 150 + 400 * Math.cos(a), o: { ...(laugh ? { ...groove(w, 'cheer', b * 2, .5, i), tilt: .12 * Math.sin(t * 14 + i) } : groove(w, i % 2 ? 'clap' : 'cheer', b, 1, i)), ...(FACE[w] && Math.sin(a) > 0 ? FACE[w] : {}) } }; });
      return [{ who, x, z: 60, o }, { who: 'alma', x: -250, z: 0, o: laugh ? { ...almaPose('cheer', b * 2, .6), tilt: .1 * Math.sin(t * 14) } : almaPose(n % 2 ? 'cheer' : 'bounce', b) }, ...crowd];
    });
    const a = A[who], k0 = P.k(60);
    if (ball && a) { const [x0, h0, x1, h1, f] = ball, s = HOUSAM_UNIT * k0, base = (a.footL[1] + a.footR[1]) / 2 + .6 * s;
      housamBall(a.head[0] + lerp(x0, x1, f) * s * 4, base - lerp(h0, h1, f) * s - 5 * s * 4 * f * (1 - f), s, { spin: t * 8 }); }
    if (n === 3 && a) { const s = JF_UNIT * k0;
      for (let i = 0; i < 3; i++) { const ph = frac(sb / 1.5 + i / 3), sd = (Math.floor(sb / 1.5 + i / 3) + i) % 2 ? 1 : -1; let x = a.belly[0] + sd * lerp(-4.4, 4.4, ph) * s, y = a.top[1] + 9 * s - 13 * s * 4 * ph * (1 - ph);
        if (l2 > bonk - .5) { const f = seg(l2, bonk - .5, bonk), g = Math.max(0, l2 - bonk); x = lerp(x, a.top[0] + (i - 1) * 90 * g * 3, f); y = lerp(y, a.top[1] + 2 * s, f) - 300 * f * (1 - f) * (i === 0 ? 1 : .2) + (i === 0 ? -260 * g + 900 * g * g : 1200 * g * g + (1 - f) * 0); }
        circle(x, y, 1.0 * s, { fill: JUGGLE_COLS[i], stroke: C.ink, lwPx: 4 }); circle(x - .3 * s, y - .3 * s, .28 * s, { fill: 'rgba(255,255,255,.6)', stroke: null }); }
      sfx('BONK!', a.top[0] + 150, a.top[1] - 60, 130, C.gold, l2 - bonk, { life: .8 });
      callout('…story of my *life*.', a.mouth[0], a.mouth[1], l2 - bonk - .12, { dx: 330, dy: -210, size: 46, cps: 40, hold: .35 }); }
    if (n === 0 && a) for (let i = 0; i < 2; i++) pop('star', a.belly[0], a.belly[1] + 140, l2 - i * 2 * BEAT - .02, 260, 10, i, NINE, 22);
    if (n === 1 && a) for (let i = 0; i < 12; i++) { const q = i / 12; shape(starPts(a.belly[0] - Math.sign(Math.cos(sb * Math.PI / 4)) * q * 260, a.belly[1] + 30 * Math.sin(q * 9 + t * 8), 20 * (1 - q), .4, 4, t * 5 + i), { fill: [C.pink, C.gold, '#FFFFFF'][i % 3], stroke: null, alpha: 1 - q }); }
    slamText(shout, W / 2, 210, 200, NINE[n * 2 + 1], l2, .03, 1.5, -.05 + .1 * (n % 2), { glow: '#FFFFFF' });
    slamText(trick, W / 2, 380, 96, C.white, l2, .6, 1.3, .02);
    if (n < 3) for (let i = 0; i < 4; i++) slamText(String(i + 1), 1640, 330, 190, FIRE[i], l2, 2 + i * BEAT, BEAT * .95, .06);
    flash(.4 * kickK(l2, 0, 10));
  }

  // ---------- the build ----------
  function build(t, lt, dur) {
    const b = bpos(t), cnt = 8 * BEAT, first = dur - cnt;   // the count is the last eight beats
    if (lt < first) {
      const { A } = stg(t, { d: lerp(640, 500, ease(lt / first)), eye: 115, feetY: 900 }, TH.night, { energy: lerp(.35, .7, lt / first), label: '', cx: 0,
        under: P => S.spot(P, 0, 0, 200, '#FFFFFF', .6) }, () => [
        { who: 'alma', x: 0, z: 0, o: { ...almaPose('bounce', b, .5, .5 + .5 * lt / first), eyes: 'happy' } }, ...troupe(ALL, (w, i) => ({ ...groove(w, 'clap', b, 1, i), lookX: w === 'neptune' || w === 'pearl' ? 0 : (i % 2 ? -.8 : .8) }), { b, spread: 1.05 })]);
      overlay(() => { const p = 1 + .1 * beatK(t);
        bigText('8', W / 2 - 150, 260, 300, C.white, slamK(lt, .05) * p, -.05, { glow: C.cyan }); bigText('/ 9', W / 2 + 150, 280, 220, 'rgba(255,255,255,.55)', slamK(lt, .2) * p, .03);
        bigText('ONE MORE MOVE!', W / 2, 520, 150, C.gold, slamK(lt, .3) * (1 - easeIn(seg(lt, first - .3, first))) * p, -.02, { glow: C.magenta }); });
      void A;
    } else {
      const l2 = lt - first, q = Math.min(7, Math.floor(l2 / (cnt / 8))), f = (l2 - q * cnt / 8) / (cnt / 8), charge = l2 / cnt, move = MOVES[q];
      const { A } = stg(t, { d: 600 - q * 34 - 20 * f, eye: 110, feetY: 900 }, TH[S.THEME_OF[q]], { label: '', cx: 0, bump: .03, shakes: [[t - l2 + cnt - .25, 14, 3]],
        under: P => { const [sx, sy, k] = P.p(0, 0, 0); circle(sx, sy - 60 * k, (140 + 460 * charge) * k * .5, { fill: radGrad(sx, sy - 60 * k, 0, (140 + 460 * charge) * k * .5, [[0, rgba('#FFFFFF', .25 + .5 * charge)], [.5, rgba('#FFE3F4', .3 * charge)], [1, 'rgba(255,255,255,0)']]), stroke: null }); } }, () => [
        { who: 'alma', x: 0, z: 0, o: q < 7 ? { ...almaPose(move, b, 1, 1), dy: .9 * charge } : { power: 1, eyes: 'squeeze', mouth: 'grin', brows: 'angry', dy: 1.4 + 1.1 * f, sq: .16 + .2 * f, handL: [-3.4, -5.5], handR: [3.4, -5.5], handPoseL: 'fist', handPoseR: 'fist' } },
        ...troupe(ALL, (w, i) => groove(w, move, b, 1, i), { b, spread: 1.05 })]);
      overlay(() => bigText(String(q + 1), q % 2 ? 1500 : 420, 300, 330 + 30 * q, NINE[q], backOut(seg(f, 0, .3)) * (1 - easeIn(seg(f, .8, 1))), q % 2 ? .08 : -.08, { glow: '#FFFFFF' }));
      // the riser: streaks rushing in to her
      if (A.alma) for (let i = 0; i < 26; i++) { const a = i / 26 * TAU + i, u = frac(hash(i) + t * (1.2 + 1.5 * charge)), r0 = 1150 * (1 - u), r1 = r0 + 90 + 120 * charge;
        line([[A.alma.chest[0] + Math.cos(a) * r0, A.alma.chest[1] + Math.sin(a) * r0], [A.alma.chest[0] + Math.cos(a) * r1, A.alma.chest[1] + Math.sin(a) * r1]], { stroke: rgba('#FFFFFF', .2 + .5 * charge * u), lwPx: 3 + 5 * charge }); }
      flash(.35 * kickK(f * cnt / 8, 0, 14) + .5 * easeIn(seg(l2, cnt - .2, cnt)));
    }
  }

  // ---------- NINE! ----------
  function nine(t, lt, dur) {
    const b = bpos(t), bar = barOf(lt), LAND = 4, CAKE = 5.3, WISH = 5.7, CLOSE = 7, INHALE = 10.3, WHOOSH = 12, FW = 13, HEY = 6.7;   // seconds after NINE!, on the sung words
    const everyone = [...ALL], hey = [HEY].reduce((m, h) => Math.max(m, lt > h - .06 && lt < h + .44 ? Math.sin(Math.PI * seg(lt, h - .06, h + .44)) : 0), 0);
    if (lt < 2) {                                           // the launch
      const up = easeIn(seg(lt, .02, .7));
      const { A, P } = stg(t, { d: lerp(430, 640, easeOut(seg(lt, 0, .5))), eye: lerp(90, 60, seg(lt, 0, .6)), feetY: 925 }, TH.gold, { label: '', cx: 0, bump: .03, shakes: [[t - lt, 40, 3]],
        under: P => { for (let i = 0; i < 4; i++) { const u = seg(lt, i * .14, i * .14 + 1.1); if (u <= 0 || u >= 1) continue; const q = P.floorCircle(0, 0, 1500 * easeOut(u), 0, 40); if (q) shape(q.map(p => [p[0], p[1]]), { fill: null, stroke: rgba('#FFFFFF', 1 - u), lwPx: 16 * (1 - u) + 2 }); } } }, () => [
        { who: 'alma', x: 0, z: 0, y: 1400 * up, o: { ...almaPose('star', 1, 1, 1), jump: 0, handL: [-5, -12.2], handR: [5, -12.2], footL: [-2.1, -.8], footR: [2.1, -.8], mouth: 'open' } },
        ...troupe(everyone, (w, i) => ({ ...groove(w, 'cheer', b, 1, i), lookY: -1 }), { b, spread: 1.1 })]);
      if (lt < 1.2) { const [sx, sy] = P.p(0, 1400 * up, 0); for (let i = 0; i < 16; i++) { const u = frac(i / 16 + t * 3); shape(starPts(sx + (hash(i) - .5) * 160, sy + u * 700, 26 * (1 - u), .4, 4, t * 6 + i), { fill: NINE[i % 9], stroke: null, alpha: 1 - u }); } }
      void A;
      overlay(() => { bigText('NINE!', W / 2, 330, 420, C.gold, slamK(lt, 0) * (1 + .06 * beatK(t)) * (1 - easeIn(seg(lt, 1.8, 2))), -.05, { glow: C.magenta });
        bigText('SUPER DANCE POWER!', W / 2, 610, 130, C.white, slamK(lt, .5) * (1 - easeIn(seg(lt, 1.8, 2))), .02, { glow: C.cyan }); });
      burst(W / 2, 330, lt, 760, 60, 1); burst(300, 300, lt - .2, 420, 34, 5); burst(1620, 300, lt - .3, 420, 34, 9);
      cannon(0, H, -1.0, lt, 0, 70, 3); cannon(W, H, -2.14, lt, 0, 70, 4);
      flash(kickK(lt, 0, 8));
    } else if (lt < LAND) {                                // in the sky
      const l2 = lt - 2;
      X.fillStyle = linGrad(0, 0, 0, H, [[0, '#0B0530'], [.6, '#3A1680'], [1, '#C0249A']]); X.fillRect(0, 0, W, H);
      for (let i = 0; i < 90; i++) circle(hash(i * 1.9) * W, hash(i * 4.3) * H, 2 + 3 * hash(i * 7), { fill: '#FFF4D0', stroke: null, alpha: .35 + .5 * Math.abs(Math.sin(t * 2.2 + i)) });
      for (let i = 0; i < 30; i++) { const y = frac(hash(i) + t * 1.4) * (H + 300) - 150; line([[hash(i * 3) * W, y], [hash(i * 3) * W, y + 150]], { stroke: 'rgba(255,255,255,.22)', lwPx: 4 }); }
      fireWord('ALMA', W / 2, 215, 26, l2, .05, .1, 1, 3);
      const cx = W / 2, cy = 690, ring = i => { const a = i / 9 * TAU + l2 * 1.6; return [cx + Math.cos(a) * 560, cy + Math.sin(a) * 250, Math.sin(a)]; };
      for (let i = 0; i < 9; i++) { const [x, y, z] = ring(i); if (z < 0) shape(starPts(x, y, 46 + 14 * z, .5, 5, t * 2 + i), { fill: NINE[i], stroke: C.ink, lwPx: 4 }); }
      circle(cx, cy, 420, { fill: radGrad(cx, cy, 0, 420, [[0, 'rgba(255,227,244,.6)'], [1, 'rgba(233,184,255,0)']]), stroke: null });
      put('alma', cx, 1010 + 26 * Math.sin(l2 * 4), 4.4, { ...almaPose('wave', b, 1, 1), eyes: 'star', mouth: 'open', noShadow: true, hairSwing: .5 * Math.sin(l2 * 3), footL: [-1.6, -1.2], footR: [1.7, -.7] });
      for (let i = 0; i < 9; i++) { const [x, y, z] = ring(i); if (z >= 0) shape(starPts(x, y, 46 + 14 * z, .5, 5, t * 2 + i), { fill: NINE[i], stroke: C.ink, lwPx: 4 }); }
      burst(260, 300, l2 - .5, 380, 30, 3); burst(1660, 320, l2 - 1.0, 380, 30, 8); burst(300, 760, l2 - 1.4, 300, 24, 12);
      flash(.5 * kickK(l2, 0, 8));
    } else if (lt < CLOSE) {                               // she lands in the party; the cake rolls in
      const l2 = lt - LAND, fall = 1 - easeIn(seg(l2, 0, .3)), landed = l2 > .3, cl = lt - CAKE, cart = lt < CAKE ? 9999 : lerp(900, 55, easeOut(seg(cl, 0, 1.3)));
      const med = ease(seg(lt, CAKE - .1, CAKE + .5)), sees = lt > CAKE + .5;
      const { A, P } = stg(t, { d: lerp(600, 400, med), eye: lerp(120, 95, med), feetY: 900, x: lerp(0, -40, med) }, TH.finale, { label: '', cx: 0, shakes: [[t - l2 + .3, 30]] }, () => [
        { who: 'alma', x: lerp(0, -200, med), z: 0, y: 1300 * fall, o: !landed ? { ...almaPose('star', 1, 1, 1), jump: 0 } : sees ? { eyes: lt > CAKE + 1.1 ? 'heart' : 'wide', brows: 'up', mouth: lt > CAKE + 1.1 ? 'grin' : 'O', handL: [-1.1, -11.6], handR: [1.1, -11.6], handPoseL: 'palm', handPoseR: 'palm', power: 1, jump: 1.6 * hey, lookX: .7 }
          : { ...almaPose(bar % 2 ? 'cheer' : 'bounce', b, 1, 1), sq: .3 * kickK(l2, .3, 9), jump: Math.max(1.5 * N9.RIG.alma.arm * .5 * hop(t), 3 * hey) } },
        ...troupe(everyone, (w, i) => ({ ...groove(w, lt > CAKE ? 'clap' : bar % 2 ? 'cheer' : 'bounce', b, 1, i), ...(N9.RIG[w].beast ? {} : { jump: Math.max(groove(w, 'cheer', b, 1, i).jump * (lt > CAKE ? 0 : 1), 5 * hey) }) }), { b, spread: 1.15 }).filter(it => it.who !== 'safadi'),
        lt >= CAKE ? { who: 'drg', x: cart + 150, z: 50, o: { handL: [-8, -17], handR: [-3, -17], handPoseL: 'grip', handPoseR: 'grip', eyes: 'happy', mouth: 'grin', dy: .35 * Math.abs(Math.sin(cl * 9)) * (cl < 1.3 ? 1 : 0), lookX: -.6 } } : null,
        lt >= CAKE ? { who: 'safadi', x: cart + 290, z: 50, o: cl < 1.4 ? { ...safadiWalk(cl * 3.2), eyes: 'happy', mouth: 'grin', handL: [-7, -12] } : { ...groove('safadi', 'clap', b), mouth: 'grin' } } : { who: 'safadi', x: 620, z: 330, o: groove('safadi', bar % 2 ? 'cheer' : 'bounce', b) }]);
      if (lt >= CAKE) drawCart(P, cart, t, 1, A);
      // the banner between two bunches of balloons
      const bk = backOut(seg(l2, .5, 1.1)), by = lerp(-260, 250, bk) + 8 * Math.sin(t * 3);
      for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) balloon(W / 2 + sd * (760 + i * 44), by + 60 - i * 34 + 240, 52, FIRE[(i + (sd > 0 ? 3 : 0)) % 6], t, i === 1 ? '9' : null, i + sd);
      X.save(); X.translate(W / 2, by); X.rotate(.012 * Math.sin(t * 2));
      shape([[-720, -64], [720, -64], [690, 0], [720, 64], [-720, 64], [-690, 0]], { fill: '#FFF6E0', stroke: C.ink, lwPx: 5 });
      for (let i = 0; i < 24; i++) shape([[-720 + i * 60, 64], [-660 + i * 60, 64], [-690 + i * 60, 104]], { fill: NINE[i % 9], stroke: C.ink, lwPx: 2.5 });
      bigText('HAPPY 9th BIRTHDAY ALMA!', 0, 4, 96, C.magenta, 1, 0, { stroke: '#FFFFFF' }); X.restore();
      if (A.alma && landed) pop('star', A.alma.head[0], A.alma.head[1] + 150, l2 - .3, 520, 18, 2, NINE, 30);
      slamText('HEY!', 1560, 300, 170, C.cyan, lt, HEY, .3, .1);
      slamText('MAKE A WISH!', W / 2, 470, 170, C.gold, lt, WISH, 1.0, -.03, { glow: C.magenta });
      confetti(lt, LAND + .3, 110, 5);
      burst(360, 260, l2 - .35, 400, 30, 6); burst(1560, 260, l2 - .5, 400, 30, 2);
      flash(.8 * kickK(l2, 0, 6) + .4 * kickK(lt, CAKE, 10));
    } else if (lt < FW) {                                  // the wish and the WHOOSH
      const l2 = lt - CLOSE, blow = lt - WHOOSH, out = seg(blow, .05, .3), inh = ease(seg(lt, INHALE, WHOOSH - .1)), wishing = lt > INHALE - .4;
      const { A, P } = stg(t, { d: lerp(262, 225, l2 / (FW - CLOSE)), eye: 62, feetY: 960, x: -35 }, TH.finale, { label: '', cx: 0, shakes: [[t - blow, 12]] }, () => [
        { who: 'alma', x: -165, z: 0, o: blow < 0 && !wishing ? { eyes: 'heart', brows: 'up', mouth: 'grin', handL: [-1.1, -11.6], handR: [1.1, -11.6], handPoseL: 'palm', handPoseR: 'palm', lookX: .8, power: 1, dy: .3 * hop(t), tilt: .06 * Math.sin(b * Math.PI / 2) }
          : blow < 0 ? { eyes: 'closed', brows: 'up', mouth: inh > .5 ? 'o' : 'smile', handL: [-.6, -10.4], handR: [.6, -10.4], handPoseL: 'fist', handPoseR: 'fist', lean: -.12 * inh, tilt: -.1 * inh, sq: -.07 * inh, power: .5, blush: 1 }
          : { eyes: blow < .45 ? 'squeeze' : 'star', mouth: blow < .45 ? 'o' : 'grin', brows: 'up', lean: .2 * (1 - seg(blow, .3, .7)), handL: [-3.4, -6], handR: [3.4, -6], power: 1, hairSwing: -.6 * (1 - seg(blow, .2, .8)), jump: blow > .5 ? 2 * Math.sin(Math.PI * seg(blow, .5, 1)) : 0 } },
        { who: 'drg', x: 180, z: 50, o: { handL: [-8, -17], handR: [-3, -17], handPoseL: 'grip', handPoseR: 'grip', eyes: 'happy', mouth: blow > .3 ? 'open' : 'grin', lookX: -.6 } },
        { who: 'danny', x: -300, z: 150, o: groove('danny', blow > .3 ? 'cheer' : 'watch', b) }, { who: 'jenna', x: 330, z: 170, o: groove('jenna', blow > .3 ? 'cheer' : 'watch', b) }]);
      drawCart(P, 55, t, 1 - out, A, blow);
      if (blow > 0 && A.alma) { for (let i = 0; i < 9; i++) { const u = seg(blow, i * .02, .35 + i * .02); if (u > 0 && u < 1) line([[A.alma.mouth[0] + 40 + 380 * u, A.alma.mouth[1] + (i - 4) * 14 * (1 + u)], [A.alma.mouth[0] + 130 + 430 * u, A.alma.mouth[1] + (i - 4) * 18 * (1 + u)]], { stroke: rgba('#FFFFFF', .8 * (1 - u)), lwPx: 6 }); }
        const [cx, cy] = P.p(55, 118, 0); for (let i = 0; i < 9; i++) { const u = seg(blow, .2 + i * .03, 1); if (u > 0) shape(starPts(cx + (i - 4) * 34 + 60 * Math.sin(u * 5 + i), cy - 520 * u, 26 * (1 - .5 * u), .45, 5, u * 6 + i), { fill: NINE[i], stroke: C.ink, lwPx: 3, alpha: 1 - seg(u, .8, 1) }); } }
      sfx('WHOOSH!', W / 2 + 260, 300, 170, C.cyan, blow, { life: .9 });
      slamText('9 CANDLES…', W / 2, 220, 120, C.white, lt, CLOSE + .2, 2.2, -.02);
      slamText('ONE…', 760, 230, 150, C.gold, lt, WHOOSH - 1.6, 1.5, -.05); slamText('BIG…', 1160, 250, 170, C.magenta, lt, WHOOSH - 1.15, 1.05, .05);
      flash(.35 * kickK(l2, 0, 10) + .5 * kickK(blow, 0, 8));
    } else {                                               // a firework 9
      const l2 = lt - FW;
      const { A } = stg(t, { d: lerp(640, 540, l2 / 3), eye: 70, feetY: 940 }, TH.finale, { label: '', cx: 0, bump: .025 }, () => [
        { who: 'alma', x: 0, z: 0, o: almaPose('cheer', b) }, ...troupe(everyone, (w, i) => groove(w, 'cheer', b, 1, i), { b, spread: 1.1 }), { who: 'drg', x: -250, z: 420, o: dr_gAbility(t, 'kind') }]);
      void A;
      X.save(); X.globalAlpha = .35; X.fillStyle = '#0B0530'; X.fillRect(0, 0, W, 520); X.restore();
      fireWord('9', W / 2, 290, 46, l2, .02, 0, 0, 3);
      burst(360, 240, l2 - .1, 430, 40, 3); burst(1560, 240, l2 - .35, 430, 40, 7); burst(620, 420, l2 - .9, 320, 26, 9); burst(1300, 420, l2 - 1.15, 320, 26, 13); burst(960, 160, l2 - 1.5, 520, 44, 1);
      confetti(lt, FW, 90, 8);
      flash(.5 * kickK(l2, 0, 8));
    }
  }
  // The party cart with the cake on it; cart = world x. Returns nothing; flames lit (0..1) bend away from Alma when she blows.
  function drawCart(P, cartX, t, lit, A, blow = -1) {
    const [x, y, k] = P.p(cartX, 0, 0), top = y - 58 * k, w = 150 * k;
    for (const sd of [-1, 1]) { line([[x + sd * w * .42, top], [x + sd * w * .42, y - 9 * k]], { stroke: C.ink, lwPx: 9 * k / 2 + 3 }); line([[x + sd * w * .42, top], [x + sd * w * .42, y - 9 * k]], { stroke: '#E8E0F4', lwPx: 9 * k / 2 }); circle(x + sd * w * .42, y - 8 * k, 8 * k, { fill: '#3B2F55', stroke: C.ink, lwPx: 3 }); circle(x + sd * w * .42, y - 8 * k, 3 * k, { fill: C.gold, stroke: null }); }
    shape(rectPts(x - w / 2, top - 7 * k, w, 9 * k), { fill: C.pink, stroke: C.ink, lwPx: 4, smooth: .3 });
    for (let i = 0; i < 9; i++) shape([[x - w / 2 + i * w / 9, top + 2 * k], [x - w / 2 + (i + 1) * w / 9, top + 2 * k], [x - w / 2 + (i + .5) * w / 9, top + 13 * k]], { fill: NINE[i], stroke: C.ink, lwPx: 2.5 });
    if (lit > .05) { X.save(); X.globalCompositeOperation = 'lighter'; circle(x, top - 62 * k, 150 * k, { fill: radGrad(x, top - 62 * k, 0, 150 * k, [[0, rgba('#FFE08A', .5 * lit)], [1, 'rgba(255,224,138,0)']]), stroke: null }); X.restore(); }
    X.save(); if (blow > 0 && blow < .3) { X.translate(x, top); X.transform(1, 0, .25 * Math.sin(blow / .3 * Math.PI), 1, 0, 0); X.translate(-x, -top); }
    cake(x, top - 7 * k, 9.2 * k, t, lit); X.restore();
  }

  // ---------- the victory lap ----------
  function everybody(t, lt, dur) {
    const b = bpos(t), half = dur / 2, everyone = [...ALL];
    if (lt < half) {
      const q = Math.min(7, Math.floor(lt / (half / 8))), f = (lt - q * half / 8) / (half / 8), move = MOVES[q], close = q % 2;
      stg(t, close ? { d: 380, eye: 80, feetY: 915 } : { d: 640, eye: 125, feetY: 900 }, TH[S.THEME_OF[q]], { label: '', cx: 0, bump: .03, roll: close ? .04 * (q % 4 === 1 ? 1 : -1) : 0 }, () => [
        { who: 'alma', x: 0, z: 0, o: almaPose(move, b) }, ...troupe(everyone, (w, i) => groove(w, move, b, 1, i), { b, spread: close ? .85 : 1.1 })]);
      overlay(() => { const k = backOut(seg(f, 0, .3)) * (1 - easeIn(seg(f, .85, 1)));
        bigText(String(q + 1), 250, 330, 300, NINE[q], k, -.08, { glow: '#FFFFFF' }); bigText(NAMES[q].replace('THE ', '') + '!', W / 2 + 120, 250, 170, C.white, k, .03, { glow: NINE[q] }); });
      flash(.3 * kickK(f * half / 8, 0, 14));
    } else {
      const l2 = lt - half, pan = on(l2, .8, 3.7, .5), SAY = 1.1, DANCE = 2.2, sd = l2 > DANCE;
      const { A } = stg(t, { d: lerp(620, 520, pan), eye: 110, feetY: 900, x: 190 * pan }, TH.gold, { label: '', cx: 0, bump: .02 }, () => [
        { who: 'alma', x: 0, z: 0, o: almaPose('star', b) }, ...troupe(everyone, (w, i) => groove(w, 'star', b, 1, i), { b, spread: 1.1 }),
        { who: 'drg', x: -300, z: 430, o: groove('drg', 'cheer', b) },
        { who: 'sarah', x: 470, z: -40, o: sd ? { ...groove('sarah', 'floss', b), phone: true, mouth: l2 > DANCE + 1 ? 'grin' : 'smirk', eyes: l2 > DANCE + 1 ? 'happy' : 'open', flip: true }
          : { ...sarahAbility(t, 'texting'), footR: [1.65, -1.05 - .9 * kick(frac(b), 0, 8)], tilt: .08 + .05 * Math.sin(b * Math.PI), flip: true } }]);
      if (A.sarah) { callout("I'm *not* dancing.", A.sarah.mouth[0], A.sarah.mouth[1], l2 - SAY, { dx: -330, dy: -230, size: 50, cps: 32, hold: .5 });
        pop('note', A.sarah.head[0], A.sarah.head[1] - 40, l2 - DANCE, 300, 8, 3, [C.cyan, C.gold, C.magenta], 26); }
      slamText('SHE IS DANCING!', W / 2 - 200, 250, 150, C.gold, l2, DANCE + .5, 1.4, -.04, { glow: C.magenta });
      slamText('NINE!', W / 2, 260, 260, C.white, l2, .3, .75, .02, { glow: C.cyan });
      confetti(lt, half, 90, 4); burst(380, 260, l2 - .3, 400, 30, 2); burst(1540, 260, l2 - .5, 400, 30, 6);
      flash(.5 * kickK(l2, 0, 8));
    }
  }

  // ---------- the group photo ----------
  function finalPose(t, lt, dur) {
    const SNAP = 1.0, WINK = 1.7, IRIS = dur - .85, b = lt < SNAP ? bpos(t) : bpos(t - lt + SNAP) + .5, hold = lt >= SNAP;
    const everyone = [...ALL];
    const { A } = stg(t, { d: lerp(600, 350, ease(seg(lt, 0, dur))), eye: lerp(110, 80, ease(seg(lt, 0, dur))), feetY: 915 }, TH.finale, { label: hold ? '' : 'ALMA ★ 9', cx: 0, bump: hold ? 0 : .02, shakes: [[t - lt + SNAP, 16]] }, () => [
      { who: 'alma', x: 0, z: 0, o: { ...almaPose('cheer', hold ? .5 : b, 1, 1), jump: hold ? 0 : undefined, eyes: lt > WINK && lt < WINK + .9 ? 'wink' : 'star', mouth: 'grin', handR: [4.2 + (hold ? .5 * wob(t, 1.6) : 0), -12.2], handL: [-4.4, -11.5], tilt: hold ? .07 : 0 } },
      ...everyone.map((w, i) => { const sd = i % 2 ? 1 : -1, rank = (i >> 1) + 1; return { who: w, x: sd * (88 * rank + 40), z: 55 * rank + 30, o: { ...groove(w, 'cheer', hold ? .5 : b, 1, i), ...(N9.RIG[w].beast ? {} : { jump: hold ? 0 : undefined }), ...(FACE[w] && sd > 0 ? FACE[w] : {}), tilt: hold ? .08 * sd : 0 } }; }),
      { who: 'drg', x: -120, z: 400, o: dr_gAbility(t, 'kind') }, { who: 'sarah', x: 470, z: 330, o: { ...groove('sarah', 'cheer', hold ? .5 : b), phone: true } }]);
    overlay(() => { const p = 1 + .04 * Math.sin(t * 6);
      bigText('HAPPY BIRTHDAY', W / 2, 200, 150, C.gold, slamK(lt, SNAP + .05) * p, -.03, { glow: C.magenta }); bigText('ALMA!', W / 2, 370, 230, C.white, slamK(lt, SNAP + .3) * p, .03, { glow: C.cyan });
      const k = slamK(lt, SNAP + .6); if (k > .01) { X.save(); X.translate(1560, 380); X.rotate(.2 + .05 * Math.sin(t * 4)); X.scale(k, k); shape(starPts(0, 0, 150, .55, 9, t * .5), { fill: C.magenta, stroke: C.ink, lwPx: 7 }); bigText('9', 0, 8, 190, C.gold, 1); X.restore(); } });
    if (A.alma) { pop('heart', A.alma.head[0] + 110, A.alma.head[1] - 20, lt - WINK, 260, 8, 2, [C.magenta, C.pink, '#FFFFFF'], 28); if (lt > IRIS) iris(A.alma.head[0], A.alma.head[1], lerp(1500, 0, easeIn(seg(lt, IRIS, dur - .08)))); }
    confetti(lt, 0, 80, 6); burst(330, 420, lt - SNAP - .1, 360, 28, 3); burst(1590, 520, lt - SNAP - .35, 360, 28, 8);
    flash(1.1 * kickK(lt, SNAP, 7));
  }

  return { chorus1, chorus2, danceBreak, build, nine, everybody, finalPose };
})());
