// scenes/fall_festival/scene75_turkey_takeover/shots_c.js: the drop, the final chorus and the victory lap.
//   ding      DING! (HIT.DING) the oven door drops, a blaze of gold, the PERFECT golden bird (TKY 'golden'); TURKEY!
//   beauty    the hero shot on a turning pedestal        nailed   STUFFED IT! NAILED IT! with the YES, CHEF! jumps
//   parade    the bird carried like a trophy               golden2  GOLDEN! JUICY! crash zooms
//   helpers   a dolly past every helper, name tags pop    team · dream   hands up, fireworks, the crane rises
//   judges    the drumroll, Pearl tastes: "It is… PERFECT." (HIT.perfect), 10 · 10 · 10, the room explodes
//   explain   "Allow me to explain…" (HIT.explain) "NO! Just EAT!" (HIT.eat): a drumstick, and he eats
//   feast     everyone round the bird: HAPPY THANKSGIVING! (HIT.happy)
//   endCard   the freeze-frame end card at HIT.final, held to the end: HAPPY THANKSGIVING · THE END
Object.assign(TT_SHOTS, (() => {
  const { C, HIT, CUT, BEAT, BAR, B, bpos, beatK, put, groove, hand, salute, bossy, slam, yesChef, kickK, slamK, bigText, txt } = TT;
  const S = TTS, FIRE = N9.FIRE, { CH, RISER, atC, talk, jetsAt, beatJets, zoomKick, cutFlash, chefCU, lineUp, hands, KIDS } = TT_SHOTS._;
  const { every, EVERY, FACE } = TT_SHOTS._b;
  const GOLD = (t, o = {}) => ({ roast: 1, steam: .8, shine: 1, t, ...o });
  // the bird on a gold pedestal at world (x, z): a draw item for S.stage
  const pedestal = (x, z, t, sc = 1, spin = 0) => ({ z, id: 'bird', draw: P => {
    const [px, py, k] = P.p(x, 0, z), w = 70 * k * sc, h = 80 * k * sc;
    shape([[px - w, py], [px - w * .8, py - h], [px + w * .8, py - h], [px + w, py]], { fill: linGrad(px - w, 0, px + w, 0, [[0, '#B8861A'], [.45, '#FFE9A0'], [1, '#9A6A10']]), stroke: C.ink, lwPx: 4 });
    ellipse(px, py - h, w * .85, 12 * k * sc, { fill: '#FFD23F', stroke: C.ink, lwPx: 4 });
    for (let i = 0; i < 7; i++) { const a = spin + i / 7 * TAU, cx = px + Math.cos(a) * w * .7; if (Math.sin(a) > 0) circle(cx, py - h * .5, 7 * k * sc, { fill: FIRE[i % 6], stroke: C.ink, lwPx: 2 }); }
    return TT.turkey(px, py - h + 4 * k * sc, k * sc, GOLD(t));
  } });
  // additive gold rays from (x, y)
  function rays(t, x, y, k = 1, n = 18, len = 1500) {
    if (k <= .01) return;
    X.save(); X.globalCompositeOperation = 'lighter'; X.translate(x, y); X.rotate(t * .5);
    for (let i = 0; i < n; i++) { X.rotate(TAU / n); X.fillStyle = rgba(i % 2 ? C.gold : '#FFFFFF', .16 * k); X.beginPath(); X.moveTo(0, 0); X.lineTo(len, -90); X.lineTo(len, 90); X.fill(); }
    X.restore();
    circle(x, y, 160 * k, { fill: radGrad(x, y, 0, 160 * k, [[0, rgba('#FFFFFF', .7 * k)], [1, rgba(C.gold, 0)]]), stroke: null });
  }
  const fireworks = (t, t0, every = .45, n = 6, seed = 0) => { for (let i = 0; i < n; i++) { const at = t0 + i * every; N9.burst(220 + hash(i * 3 + seed) * (W - 440), 160 + hash(i * 7 + seed) * 280, t - at, 300 + 160 * hash(i + seed), 30, i + seed); } };

  // ======================= THE DROP =======================
  function ding(t, lt, dur) {
    const b = bpos(t), d0 = HIT.DING, door = easeOut(seg(t, d0, d0 + .3)), blaze = kickK(t, d0, 1.2) * .6 + .4 * door;
    const r = S.stage(t, { d: lerp(500, 400, ease(lt / dur)), z: 150, eye: 120, feetY: 960 }, { floor: 'gold', screen: 'gold', jets: jetsAt([[d0, 0, 1], [HIT.TURKEY2, 0, 1]]), crowdUp: 1, crowdLit: true, shakes: [[d0, 36, 4], [HIT.TURKEY2, 24]], zoom: 1.03 * zoomKick(lt, .18, 4), beams: 1, ray: C.gold,
      under: P => { const [ox, oy, k] = P.p(0, 70, 260); rays(t, ox, oy, blaze); } }, () => [
      { z: 260, id: 'oven', draw: P => { const [ox, oy, k] = P.p(0, 0, 260); return TT.oven(ox, oy, k * 1.25, { door, glow: 1, temp: 'DONE!', dial: .7, inside: (cx, cy, s) => TT.turkey(cx, cy, s * .62, GOLD(t, { platter: true })) }); } },
      ...[['housam', -420, 'cheer'], ['danny', -250, 'star'], ['alma', 250, 'star'], ['jenna', 420, 'cheer'], ['prof', -600, 'cheer'], ['doc', 600, 'cheer']].map(([w, x, m], i) => ({ who: w, x, z: 120, id: w, o: { ...groove(w, m, b, 1, i), eyes: 'star' } })),
    ]);
    slam('DING!', 330, 470, 180, C.gold, t, d0, .9, -.1, { glow: '#FFFFFF' });
    slam('TURKEY!', W / 2 + 140, 230, 280, C.orange, t, d0 + .05, HIT.TURKEY2 - d0 - .05, .04, { glow: C.gold, flash: false });
    if (t >= HIT.TURKEY2) slam('TURKEY!', W / 2 - 60, 250, 320, C.gold, t, HIT.TURKEY2, CUT.golden2 - HIT.TURKEY2 - .03, -.05, { glow: C.orange });
    flash(.9 * kickK(t, d0, 5), '#FFF4C8');
    fireworks(t, d0 + .1, .3, 6, 2); N9.cannon(0, H, -1.0, t, d0, 60, 3); N9.cannon(W, H, -2.14, t, d0, 60, 4);
    TT.speedLines(t, W / 2, 470, kickK(t, d0, 2), { r0: 380, col: C.gold });
  }
  function beauty(t, lt, dur) {
    const b = bpos(t);
    S.stage(t, { d: lerp(330, 250, ease(lt / dur)), z: 0, eye: 120, feetY: 900, x: lerp(-30, 30, lt / dur) }, { floor: 'gold', screen: 'gold', jets: beatJets(.8), crowdUp: 1, crowdLit: true, roll: .03 * Math.sin(b * Math.PI / 2), beams: .8,
      under: P => { const [x, y] = P.p(0, 110, 0); rays(t, x, y, 1); } }, () => [pedestal(0, 0, t, 1, lt * 3)]);
    TT.twinkles(t, W / 2, 430, 520, 30, 9, [C.gold, '#FFFFFF', '#FFF3A8'], 26);
    // a shine sweeping across the bird
    const u = frac(lt / 1.2); overlay(() => { X.save(); X.globalCompositeOperation = 'lighter'; X.globalAlpha = .35; X.translate(lerp(500, 1400, u), 450); X.rotate(.4); X.fillStyle = '#FFFFFF'; X.fillRect(-30, -400, 60, 800); X.restore(); });
    slam('WHAT A BEAUTY!', W / 2, 170, 160, C.gold, t, CUT.beauty + .74, dur - .76, -.03, { flash: false });
    TT.whip(t, lt, 1);
  }
  // A call bar of the final chorus (two orders, two YES, CHEF!s): the gang round the pedestal, jumping on every answer.
  function callBar(t, lt, dur, cut, w1, w2, c1, c2, cam) {
    const b = bpos(t), c = TT.CALL[cut], t0 = c[0], yes = [c[1], c[3]], last = yes.filter(y => t >= y).pop();
    const gang = [['housam', -420, 120], ['danny', -250, 160], ['alma', 250, 160], ['jenna', 420, 120], ['prof', -620, 40], ['doc', 620, 40], ['jester', -110, 330], ['dragon', 140, 360]];
    S.stage(t, cam, { floor: 'gold', screen: 'gold', jets: jetsAt([[yes[0], -1, 1], [yes[1], 1, 1]]), crowdUp: 1, crowdLit: true, shakes: yes.map(y => [y, 16]), zoom: 1.03 * zoomKick(t - (last ?? t0), .1, 7), beams: 1 },
      () => [pedestal(0, 60, t, .85, lt * 2), ...gang.map(([w, x, z], i) => ({ who: w, x, z, id: w, o: last !== undefined && t - last < .4 ? salute(w, 1, b) : { ...groove(w, i % 2 ? 'bounce' : 'cheer', b, 1, i), eyes: 'star' } }))]);
    slam(w1, 560, 200, 200, c1, t, t0, c[2] - t0, -.06); slam(w2, 1360, 200, 200, c2, t, c[2], 2 * BEAT, .06);
    yes.forEach((y, i) => yesChef(t, y, i ? 560 : 1360, 560, .6, BEAT));
    TT.whip(t, lt, -1);
  }
  const nailed = (t, lt, dur) => callBar(t, lt, dur, 'nailed', 'STUFFED IT!', 'NAILED IT!', C.lime, C.magenta, { d: lerp(620, 540, lt / dur), z: 120, eye: 60, feetY: 980 });
  function parade(t, lt, dur) {
    const b = bpos(t), mv = lerp(-260, 260, lt / dur), carriers = [['housam', -130], ['jenna', -40], ['danny', 50], ['alma', 140]];
    const r = S.stage(t, { d: 620, x: mv * .6, z: 120, eye: 80, feetY: 940 }, { floor: 'gold', screen: 'gold', jets: beatJets(1), crowdUp: 1, crowdLit: true, beams: 1, roll: .03 * Math.sin(b * Math.PI / 2) }, () => [
      ...carriers.map(([w, dx], i) => ({ who: w, x: mv + dx, z: 120, y: Math.abs(Math.sin(b * Math.PI + i)) * 6, id: w, o: { handL: hand(w, -1, 1.45, 1), handR: hand(w, 1, 1.45, 1), handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'open', tilt: .05 * Math.sin(b * Math.PI + i) } })),
      { who: 'prof', x: mv - 380, z: 60, o: { ...groove('prof', 'cheer', b, 1, 1) } }, { who: 'doc', x: mv + 380, z: 60, o: { ...groove('doc', 'cheer', b, 1, 2) } },
      { who: 'dragon', x: mv + 10, z: 300, y: 160 + 20 * Math.sin(t * 4), o: { ...dragonFlight(t, { speed: 3, lift: 0 }), noShadow: true } },
    ]);
    // the bird on its platter, held high like a trophy
    const hs = carriers.map(([w]) => r.A[w]).filter(Boolean); if (hs.length) {
      const top = Math.min(...hs.map(a => Math.min(a.handL[1], a.handR[1]))), cx = hs.reduce((a, q) => a + (q.handL[0] + q.handR[0]) / 2, 0) / hs.length, k = r.P.k(120);
      rays(t, cx, top - 60 * k, .7, 14, 900); TT.turkey(cx, top + 4, k * 1.6, GOLD(t, { garnish: 1 })); TT.twinkles(t, cx, top - 50 * k, 140 * k, 16, 3, [C.gold, '#FFFFFF'], 18);
    }
    slam('THE CHAMPION!', W / 2, 180, 150, C.gold, t, CUT.parade + .1, dur - .2, -.03, { flash: false });
    N9.confetti(t, CUT.parade, 90, 7);
  }
  function golden2(t, lt, dur) {
    const b = bpos(t), c = TT.CALL.golden2, t0 = c[0], half = t >= c[2] - .05, l2 = half ? t - c[2] + .05 : lt;
    const cam = half ? { d: 230, z: 0, eye: 100, feetY: 960, x: 40 } : { d: 300, z: 0, eye: 140, feetY: 880, x: -40 };
    S.stage(t, cam, { floor: 'gold', screen: 'gold', jets: jetsAt([[t0, -1, 1], [c[2], 1, 1]]), crowdUp: 1, crowdLit: true, zoom: 1.04 * zoomKick(l2, .2, 7), roll: half ? .05 : -.05, beams: .8,
      under: P => { const [x, y] = P.p(0, 110, 0); rays(t, x, y, 1); } }, () => [pedestal(0, 0, t, 1, lt * 3),
      { who: 'prof', x: -190, z: 60, o: { ...bossy('prof', b), handR: hand('prof', 1, .3, 1), handPoseR: 'thumb', mouth: 'open', eyes: 'happy' } },
      { who: 'doc', x: 190, z: 60, o: { ...bossy('doc', b), handL: hand('doc', -1, .3, 1), handPoseL: 'point', mouth: 'open', eyes: 'happy' } }]);
    if (half) for (let i = 0; i < 8; i++) { const u = frac(lt * 1.5 + i / 8); ellipse(W / 2 + (i - 3.5) * 40, 520 + u * 160, 9, 14, { fill: rgba('#FFE08A', 1 - u), stroke: null }); }
    slam('GOLDEN!', 520, 220, 220, C.gold, t, t0, c[2] - t0, -.06); slam('JUICY!', 1400, 220, 230, C.orange, t, c[2], 2 * BEAT, .06);
    [c[1], c[3]].forEach((y, i) => yesChef(t, y, i ? 520 : 1400, 600, .6, BEAT));
    TT.whip(t, l2, half ? -1 : 1, .1);
  }
  const golden3 = (t, lt, dur) => callBar(t, lt, dur, 'golden3', 'GOLDEN!', 'JUICY!', C.gold, C.orange, { d: lerp(560, 480, lt / dur), z: 120, eye: 220, feetY: 960, x: lerp(120, -120, lt / dur) });
  const NAMES = { prof: 'CHEF SAFADI', doc: 'CHEF SAMI', housam: 'HOUSAM', danny: 'DANNY', alma: 'ALMA', jenna: 'JENNA', jester: 'FESTER', neptune: 'NEPTUNE', pearl: 'PEARL', dragon: 'DRAGON', drg: 'DR. G', roud: 'ROUDAYNAH' };
  function helpers(t, lt, dur) {
    const b = bpos(t), row = ['prof', 'housam', 'neptune', 'danny', 'drg', 'alma', 'dragon', 'jenna', 'roud', 'jester', 'pearl', 'doc'], cx = lerp(-1150, 1150, lt / dur);
    const { A, P } = S.stage(t, { d: 520, x: cx, z: 100, eye: 110, feetY: 930 }, { floor: 'show', jets: beatJets(.8), crowdUp: 1, crowdLit: true, beams: .7,
      under: P => row.forEach((w, i) => { const x = (i - 5.5) * 210; S.FLOOR && N9S.spot(P, x, 100, 90, FIRE[i % 6], Math.max(0, 1 - Math.abs(x - cx) / 400), [W / 2 + (x - cx) * .5, -100]); }) },
      () => row.map((w, i) => ({ who: w, x: (i - 5.5) * 210, z: 100, id: w, o: { ...groove(w, Math.abs((i - 5.5) * 210 - cx) < 200 ? 'star' : 'bounce', b, 1, i), ...(w === 'pearl' ? { flip: true } : {}) } })));
    row.forEach((w, i) => { const a = A[w]; if (!a) return; const x = (i - 5.5) * 210, near = 1 - Math.abs(x - cx) / 300; if (near <= 0) return;
      const top = a.top ?? a.head; overlay(() => { const k = backOut(clamp(near * 1.6)); X.save(); X.translate(top[0], top[1] - 70); X.scale(k, k); TT.pill(-140, -34, 280, 68, FIRE[i % 6], C.ink, 4); txt(NAMES[w], 0, 2, 40, '#FFFFFF', { align: 'center', stroke: C.ink, lw: 6, max: 250 }); X.restore(); }); });
    slam('MEET THE BRIGADE!', W / 2, 160, 130, C.gold, t, CUT.helpers + .1, 1.7, -.02, { flash: false });
  }
  const team = (t, lt, dur) => { hands(t, lt, dur, every('cheer'), { screen: 'gold' }); fireworks(t, CUT.team, .3, 6, 5); };
  function dream(t, lt, dur) {
    const b = bpos(t), u = ease(lt / dur);
    lineUp(t, lt, every('star'), { d: lerp(900, 1500, u), z: 200, eye: lerp(200, 900, u), feetY: lerp(900, 760, u) }, { floor: 'gold', screen: 'gold', crowdUp: 1, beams: 1, jets: beatJets(1), roll: -.04 * u,
      under: P => pedestal(0, 230, t, 1.1, lt * 2).draw(P) });
    fireworks(t, CUT.dream, .25, 8, 11); N9.confetti(t, CUT.dream - .5, 100, 9);
    slam('LIVING THE DREAM!', W / 2, 190, 150, C.gold, t, CUT.dream + .92, dur - .97, .03, { glow: C.magenta, flash: false });
  }

  // ======================= VICTORY LAP =======================
  function judges(t, lt, dur) {
    const b = bpos(t), p = HIT.perfect, wide = easeOut(seg(t, p, p + .4)), bite = p - .75, drum = t >= HIT.drumroll && t < p;
    const v = { d: lerp(300, 680, wide), z: 110, eye: lerp(200, 170, wide), feetY: lerp(860, 900, wide), x: drum ? 4 * Math.sin(t * 60) : 0 };
    const gang = ['housam', 'danny', 'alma', 'jenna', 'prof', 'doc', 'jester', 'neptune'];
    const { A, P } = S.stage(t, v, { floor: t > p ? 'gold' : 'show', screen: t > p ? 'gold' : 'logo', jets: jetsAt([[p, 0, 1], [p + .4, 0, .9]]), crowdUp: t > p ? 1 : 0, crowdLit: t > p, shakes: [[p, 30, 4]], beams: t > p ? 1 : .3, zoom: 1.04 * (drum ? 1 + .05 * seg(t, HIT.drumroll, p) : 1) }, () => [
      { who: 'pearl', x: 0, z: 110, y: 40, id: 'pearl', o: { sit: 1, headTilt: t > p - .3 ? .35 : .15, eyes: t > p ? 'sparkle' : t > bite ? 'closed' : 'open', mouth: t > p ? 'open' : t > bite ? 'smile' : 'flat', brows: 'up', wag: .6 * Math.sin(b * Math.PI * 2) * (t > p ? 1 : .2), crownLift: 1.2 * kickK(t, p, 3), dy: t > p ? 1.4 * Math.abs(Math.sin(b * Math.PI)) : 0 } },
      { z: 60, draw: P => TT.judgesDesk(P, 0, 60, 460) },
      { z: 40, draw: P => { const [x, y, k] = P.p(150, 62, 70); return TT.turkey(x, y, k * .55, GOLD(t)); } },
      ...gang.map((w, i) => ({ who: w, x: (i - 3.5) * 170, z: 400, id: w, o: t > p ? { ...groove(w, 'star', b, 1, i), eyes: 'star' } : { ...groove(w, 'watch', b, 1, i) } })),
    ]);
    if (A.pearl && t > bite - .25 && t < bite) { const u = seg(t, bite - .25, bite), [mx, my] = A.pearl.mouth; circle(lerp(mx + 260, mx, u), lerp(my + 60, my, u) - 80 * Math.sin(Math.PI * u), 16, { fill: C.roast, stroke: C.ink, lwPx: 3 }); }
    if (drum) overlay(() => { const k = seg(t, HIT.drumroll, HIT.drumroll + .2); X.save(); X.translate(W / 2 + 6 * Math.sin(t * 70), 190); X.scale(k, k); txt('DRUMROLL…', 0, 0, 110, '#FFFFFF', { align: 'center', stroke: C.ink, lw: 14, glow: C.magenta }); X.restore(); });
    TT.scoreBug(t, CUT.judges + .1, t > p ? [10, 10, 10] : ['?', '?', '?'], { label: 'SCORE' });
    if (t > p) { overlay(() => { const k = slamK(t, p); X.save(); X.translate(W / 2, 250); X.scale(k, k); shape(starPts(0, 0, 420, .8, 20, t * .6), { fill: C.gold, stroke: C.ink, lwPx: 8 }); X.restore(); bigText('PERFECT.', W / 2, 250, 220, '#FFFFFF', k, -.04, { glow: C.orange }); });
      flash(.8 * kickK(t, p, 5), '#FFF4C8'); fireworks(t, p, .3, 7, 3); N9.cannon(0, H, -1.0, t, p, 60, 5); N9.cannon(W, H, -2.14, t, p, 60, 6); }
    TT.lowerThird(t, CUT.judges + .05, p, 'THE VERDICT', 'Princess Pearl tastes the turkey', '#B46BFF', { w: 640 });
  }
  function explain(t, lt, dur) {
    const b = bpos(t), ex = HIT.explain, eat = HIT.eat, kids = t >= eat, chomp = eat + .42;
    const board = seg(t, ex, ex + .7) * (1 - seg(t, eat, eat + .2));
    const { A } = S.stage(t, { d: lerp(440, 400, lt / dur), z: 60, eye: 120, feetY: 930, x: 0 }, { floor: 'gold', screen: 'gold', jets: jetsAt([[eat, 0, 1]]), crowdUp: 1, crowdLit: true, shakes: [[eat, 24]], zoom: 1.04 * zoomKick(t - eat, .12, 6), beams: .6 }, () => [
      { who: 'prof', x: -20, z: 80, id: 'prof', o: kids ? { eyes: t > chomp ? 'happy' : 'wide', brows: 'up', mouth: t > chomp ? (frac(t * 4) < .5 ? 'grin' : 'open') : 'O', handR: hand('prof', 1, .35, .9), handPoseR: 'fist', handL: hand('prof', -1, -.9, .8), jump: .8 * kickK(t, eat, 5) }
        : { ...TT.bossy('prof', b), brows: 'up', eyes: 'closed', mouth: talk(t, ex, ex + 1.0, 'smirk'), power: seg(t, ex, ex + .3), handR: hand('prof', 1, 1.2, 1), handPoseR: 'point' } },
      ...KIDS.map(([w], i) => { const pop = backOut(seg(t, eat - .05 + i * .05, eat + .2 + i * .05)); return pop <= 0 ? null : { who: w, x: [-310, -190, 170, 300][i], z: -40, y: -200 * (1 - pop), id: w, o: { eyes: 'happy', mouth: 'open', brows: 'angry', handL: hand(w, -1, 1.2, 1), handR: hand(w, 1, 1.2, 1), handPoseL: 'palm', handPoseR: 'palm', jump: .8 * Math.abs(Math.sin(b * Math.PI)) } }; }),
    ]);
    if (A.prof && board > .01) safadiBoard(1180, 190, 600, board, t, { kind: 'atom', title: 'TURKEY THERMODYNAMICS' });
    if (A.prof && kids) TT.drumstick(A.prof.handR[0], A.prof.handR[1] - 40, 46, -.3 + .1 * Math.sin(t * 6));
    if (kids) { overlay(() => { const k = slamK(t, eat); X.save(); X.translate(1380, 260); X.rotate(-.04); X.scale(k, k); shape(starPts(0, 0, 330, .82, 18, t * .7), { fill: C.tvRed, stroke: C.ink, lwPx: 8 }); X.restore(); bigText('NO! JUST EAT!', 1380, 260, 120, '#FFFFFF', k, -.04, { glow: C.gold }); }); flash(.5 * kickK(t, eat, 9)); }
    if (t > chomp) sfx('CHOMP!', (A.prof?.head[0] ?? W / 2) + 220, (A.prof?.head[1] ?? 400) - 60, 130, C.gold, t - chomp);
    TT.whip(t, lt, 1);
  }
  // The feast (also the end card's frozen picture): everyone round the table and the golden bird.
  function feastFrame(t, lt, dur, o = {}) {
    const b = bpos(t), hp = HIT.happy;
    const ring = [['prof', -520, 120], ['housam', -340, 170], ['danny', -170, 200], ['alma', 170, 200], ['jenna', 340, 170], ['doc', 520, 120], ['jester', -470, 380], ['drg', -250, 420], ['roud', 250, 420], ['neptune', 470, 380], ['dragon', -40, 470], ['pearl', 680, 300]];
    return S.stage(t, { d: lerp(860, 760, ease(clamp(lt / (o.len ?? 2.8)))), z: 200, eye: 160, feetY: 900 }, { floor: 'gold', screen: 'gold', jets: jetsAt([[hp, 0, 1], [hp + .45, 0, .9], [HIT.final, 0, 1]]), crowdUp: 1, crowdLit: true, shakes: [[hp, 20], [HIT.final, 24]], beams: 1, roll: .02 * Math.sin(b * Math.PI / 2) }, () => [
      ...ring.map(([w, x, z], i) => ({ who: w, x, z, id: w, o: t >= hp ? { ...groove(w, i % 3 ? 'cheer' : 'star', b, 1, i), eyes: 'happy', mouth: 'open', ...(w === 'pearl' ? { flip: true } : {}) } : { ...groove(w, 'clap', b, 1, i), ...(w === 'pearl' ? { flip: true } : {}) } })),
      { z: 80, draw: P => { const [x, y, k] = P.p(0, 0, 80), w = 340 * k; shape([[x - w, y - 50 * k], [x + w, y - 50 * k], [x + w * .92, y], [x - w * .92, y]], { fill: '#8E4A14', stroke: C.ink, lwPx: 4 }); shape(rectPts(x - w, y - 62 * k, 2 * w, 14 * k), { fill: C.cream, stroke: C.ink, lwPx: 3 });
        TKY.pie(x - 210 * k, y - 60 * k, k * TKY.WORLD * 1.2, { t }); TT.turkey(x, y - 60 * k, k * .9, GOLD(t)); return {}; } },
    ]);
  }
  function feast(t, lt, dur) {
    feastFrame(t, lt, dur);
    if (t >= HIT.happy) { slam('HAPPY THANKSGIVING!', W / 2, 210, 170, C.gold, t, HIT.happy, CUT.endCard - HIT.happy, -.03, { glow: C.orange }); fireworks(t, HIT.happy, .35, 7, 21); N9.confetti(t, HIT.happy, 110, 4); }
    N9.cannon(0, H, -1.0, t, HIT.happy, 60, 7); N9.cannon(W, H, -2.14, t, HIT.happy, 60, 8);
  }
  // The end card: the feast frozen at the final hit, tinted, with the title card over it; sparkles and confetti keep moving.
  function endCard(t, lt, dur) {
    const f = HIT.final - .02;
    feastFrame(f, f - CUT.feast, 3);
    overlay(() => {
      X.fillStyle = 'rgba(30,10,50,.45)'; X.fillRect(0, 0, W, H);
      const k = backOut(seg(lt, 0, .3)), k2 = backOut(seg(lt, .35, .6));
      X.save(); X.translate(W / 2, 430); X.rotate(-.03); X.scale(k, k);
      shape(starPts(0, 0, 560, .86, 24, t * .3), { fill: C.gold, stroke: C.ink, lwPx: 8 }); shape(starPts(0, 0, 500, .88, 24, t * .3 + .1), { fill: C.tvRed, stroke: null });
      X.restore();
      TT.logo(W / 2, 250, 70 * k, t);
      bigText('HAPPY', W / 2, 400, 170, '#FFFFFF', k, -.03, { glow: C.gold });
      bigText('THANKSGIVING!', W / 2, 560, 170, C.gold, k, -.03, { glow: C.orange });
      bigText('THE END', W / 2, 820, 120, '#FFFFFF', k2, .02, { glow: C.magenta });
      txt('A TURKEY TAKEOVER PRODUCTION', W / 2, 920, 34, rgba('#FFFFFF', .9 * k2), { align: 'center', font: FONT_TALK, weight: 700 });
    });
    overlay(() => { TT.twinkles(t, W / 2, 470, 760, 40, 13, [C.gold, '#FFFFFF', C.pink], 30); });
    N9.confetti(t, CUT.endCard - 1, 120, 12);
    flash(.8 * kickK(lt, 0, 7));
  }

  return { ding, beauty, nailed, parade, golden2, golden3, team, dream, helpers, judges, explain, feast, endCard };
})());
