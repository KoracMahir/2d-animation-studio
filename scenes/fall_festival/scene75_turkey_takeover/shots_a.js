// scenes/fall_festival/scene75_turkey_takeover/shots_a.js: the intro, verse 1, chorus 1 and the inspection break.
//   daydream     the feast room: the brothers, the band-aided charcoal turkey, two idea bulbs, a thought bubble with a TV in it,
//                and the TV switches on
//   title        the studio wide, a crane swoop; TURKEY! TAKE! OVER! slam in with the flame towers
//   entrance     DING DING: the chefs stride through the smoke, LET'S COOK!
//   cardProf · cardDoc     freeze-frame name cards                      science · healthy   the chefs' own lines
//   stationsA · stationsB  split screens of the four kids at their stations    toStations   the sprint     yesChef1   the salute
//   chorus 1     an order shot every two beats (STUFF IT / BASTE IT / CHOP IT / STIR IT) with the kids' YES, CHEF!, plus golden,
//                heard (the audience), quad (2×2 split), hands, fuss
//   inspect · frozen · sorry     "Wait. What is THIS?" … "FROZEN!" … "Sorry, Chef!"
// The shared helpers (station, order, chefCU, lineUp…) are on TT_SHOTS._ for shots_b.js and shots_c.js.
const TT_SHOTS = (() => {
  const { C, HIT, CUT, BEAT, BAR, B, bpos, beatK, put, groove, hand, salute, bossy, slam, yesChef, kickK, slamK, bigText, txt } = TT;
  const S = TTS, FIRE = N9.FIRE;
  const CH = 55;                                        // counter height (world units): kitchen counters sized for the kids' rigs
  const U = w => (N9.RIG[{ prof: 'safadi', doc: 'sami' }[w] ?? w]?.u ?? 5);
  const RISER = w => (w === 'prof' || w === 'doc' ? 0 : 24);      // the kids stand on a hidden step behind the counters
  const atC = (w, x, lift = 1) => [x, -(CH - RISER(w)) / U(w) - lift];     // a hand target just above the counter top (local units)
  const talk = (t, a, b2, rest = 'grin') => lipFlap(t, t > a && t < b2, rest);
  const jetsAt = hits => (t, sd) => Math.max(0, ...hits.map(([h, side = 0, k = 1]) => (side === 0 || side === sd ? k * kickK(t, h, 2.2) * (t >= h ? 1 : 0) : 0)));
  const beatJets = (k = .55) => (t, sd) => k * Math.exp(-frac(bpos(t) / 2 + (sd > 0 ? .5 : 0)) * 2 * BEAT * 2.5);
  const zoomKick = (lt, a = .12, d = 7) => 1 + a * kickK(lt, 0, d);
  const cutFlash = (lt, k = .4) => flash(k * kickK(lt, 0, 12));

  // ---------- one kid (or chef) at a station: paints the whole frame ----------
  // cfg: who, kind (chop | pan | spice | wash | stir | stuff | baste | weigh), label, col, cam {d, x, eye, feetY, roll},
  //      extra (more cast items), o (pose overrides), hitAt (an action accent, scene time), word
  function station(t, cfg) {
    const who = cfg.who, b = bpos(t), kind = cfg.kind, z = 75, cam = cfg.cam ?? {};
    const u = U(who), top = -CH / u;
    let pose = { eyes: 'happy', mouth: 'grin', brows: 'up' };
    const chopU = Math.abs(Math.sin(b * Math.PI * 2));          // four chops a beat… a blur
    if (kind === 'chop') pose = { ...pose, eyes: 'open', brows: 'angry', mouth: 'teeth', handR: atC(who, 2.4, .5 + 1.5 * chopU), handPoseR: 'fist', handL: atC(who, -2.6, .6), handPoseL: 'palm', dy: .15 * chopU, lean: .05 };
    if (kind === 'pan') pose = { ...pose, mouth: 'open', handR: atC(who, 3.4, 2.2 + 1.2 * Math.abs(Math.sin(b * Math.PI))), handPoseR: 'fist', handL: hand(who, -1, .9 + .2 * Math.sin(b * Math.PI), 1), handPoseL: 'palm', jump: .6 * Math.abs(Math.sin(b * Math.PI)) };
    if (kind === 'spice') pose = { ...pose, eyes: 'star', power: 1, handR: hand(who, 1, .05 + .3 * Math.sin(b * Math.PI * 2), 1), handPoseR: 'fist', handL: hand(who, -1, .3, .9), handPoseL: 'palm', tilt: .06 * Math.sin(b * Math.PI) };
    if (kind === 'wash') { const r = Math.sin(t * 18); pose = { ...pose, eyes: 'closed', mouth: 'smile', handR: atC(who, .6 + .5 * r, 2.4), handL: atC(who, -.6 + .5 * r, 2.6), handPoseL: 'palm', handPoseR: 'palm', tilt: .05 * Math.sin(b * Math.PI) }; }
    if (kind === 'stir') pose = { ...pose, mouth: 'open', handR: atC(who, 1.2 + 1.4 * Math.cos(b * Math.PI), 4.2 + .5 * Math.sin(b * Math.PI)), handPoseR: 'fist', handL: atC(who, -3.0, .8), handPoseL: 'palm', dy: .1 * Math.abs(Math.sin(b * Math.PI)) };
    if (kind === 'bird') pose = { ...pose, eyes: 'happy', mouth: 'open', handR: atC(who, 1.4, 2 + 2.2 * Math.abs(Math.sin(b * Math.PI))), handPoseR: 'palm', handL: atC(who, -1.4, 2 + 2.2 * Math.abs(Math.cos(b * Math.PI))), handPoseL: 'palm', lean: .05 };
    if (kind === 'stuff') pose = { ...pose, eyes: 'happy', mouth: 'open', handR: atC(who, 1.8, 3 + 3 * Math.abs(Math.sin(b * Math.PI))), handPoseR: 'palm', handL: atC(who, -1.8, 3 + 3 * Math.abs(Math.cos(b * Math.PI))), handPoseL: 'palm' };
    if (kind === 'baste') pose = { ...pose, eyes: 'happy', handR: atC(who, 2.2 + 1.2 * Math.sin(b * Math.PI), 2.4), handPoseR: 'fist', handL: atC(who, -2.6, .8), handPoseL: 'palm' };
    if (kind === 'weigh') pose = { ...pose, eyes: 'glow', power: 1, bulb: .5 + .5 * Math.abs(Math.sin(b * Math.PI / 2)), mouth: 'smirk', handR: atC(who, 2.0, 1.0), handPoseR: 'point', handL: hand(who, -1, 1.1, 1), handPoseL: 'point' };
    if (cfg.o) pose = { ...pose, ...(typeof cfg.o === 'function' ? cfg.o(t, b) : cfg.o) };
    const v = { d: cam.d ?? 330, x: cam.x ?? 0, z, eye: cam.eye ?? 120, feetY: (cam.feetY ?? 1000) - 135 };   // counters sit clear of the karaoke line
    const { A, P } = S.stage(t, v, { floor: cfg.floor ?? 'show', roll: cam.roll ?? .02 * Math.sin(b * Math.PI / 4), zoom: (cam.zoom ?? 1.04), jets: cfg.jets ?? beatJets(.45), shakes: cfg.shakes, screen: cfg.screen, crowdUp: cfg.crowdUp, bump: .02 }, () => [
      { who, x: 0, z, y: RISER(who), o: pose, id: 'me' },
      ...(cfg.extra ?? []),
      { z: 0, draw: P => S.counter(P, 0, 0, cfg.w ?? 230, { h: CH, label: cfg.label, col: cfg.col }), id: 'ctr' },
    ]);
    const me = A.me, ctr = A.ctr, [tx, ty, kk] = P.p(cfg.propX ?? 0, CH, 35), [hx, hy] = me?.handR ?? [tx, ty];
    // the props on the counter and in the hand
    if (cfg.bird) TT.turkey(tx + (cfg.birdX ?? 0) * kk, ty, kk * (cfg.birdS ?? .62), { t, ...(typeof cfg.bird === 'function' ? cfg.bird(t) : cfg.bird) });
    if (kind === 'chop') { TT.board(tx, ty, kk); for (let i = 0; i < 4; i++) TT.veg(t, tx + (i - 1.5) * 18 * kk, ty - 6 * kk, kk, frac(b * 2 + i * .25) * .9, 3, i * 7 + Math.floor(b * 2)); if (!cfg.saluting) TT.knife(hx, hy, kk * 1.4, .25 - .7 * chopU, 1); TT.speedLines(t, hx, hy, .7, { r0: 160 * kk, n: 30 }); }
    if (kind === 'pan') { const fb = Math.max(kickK(t, cfg.hitAt ?? -9, 1.6), .35 * Math.exp(-frac(b / 2) * 2 * BEAT * 3)); TT.pan(t, hx - 50 * kk, hy + 4 * kk, kk, { tip: -.15 + .1 * Math.sin(b * Math.PI), flambe: fb }); }
    if (kind === 'spice') { TT.spices(t, tx - 20 * kk, ty, kk, 4); if (!cfg.saluting) TT.shaker(t, hx, hy, kk, -2.4 + .4 * Math.sin(b * Math.PI * 2), '#FF5A3A'); TT.twinkles(t, hx, hy + 30 * kk, 90 * kk, 26, 3, [C.gold, '#FF5A3A', '#FFFFFF', C.magenta], 12 * kk); }
    if (kind === 'wash') TT.sink(t, tx, ty, kk, { bubbles: 18 });
    if (kind === 'stir') { const sp = TT.pot(t, tx, ty, kk * .9, b / 2); void sp; }
    if (kind === 'stuff') TT.bowl(t, tx, ty, kk * (who === 'prof' || who === 'doc' ? .6 : .7), .8, frac(b) * 1.0);
    if (kind === 'baste') { TT.bowl(t, tx - 40 * kk, ty, kk * .6, .5); TT.turkey(tx + 30 * kk, ty, kk * .55, { roast: cfg.roast ?? 0, stuff: cfg.stuffK ?? 0, gloss: .3 + .3 * Math.abs(Math.sin(b * Math.PI)), platter: true }); if (!cfg.saluting) TT.baster(t, hx, hy, kk, .6 - .4 * Math.sin(b * Math.PI)); }
    if (kind === 'weigh') { shape(rectPts(tx - 40 * kk, ty - 14 * kk, 80 * kk, 14 * kk), { fill: '#2B2440', stroke: C.ink, lwPx: 3, smooth: .2 });
      txt(`${(1000 + 0.01 * Math.floor(hash(Math.floor(t * 12)) * 99)).toFixed(2)} g`, tx, ty - 7 * kk, 12 * kk, '#7CFF8A', { align: 'center', font: '"Courier New", monospace', weight: 700, glow: '#7CFF8A', blur: 8 });
      TT.bowl(t, tx, ty - 14 * kk, kk * .55, .9); }
    if (cfg.after) cfg.after(t, A, P);
    return { A, P, ctr };
  }

  // ---------- a chef close-up: bossy talk to camera ----------
  function chefCU(t, who, o = {}) {
    const b = bpos(t), sd = who === 'prof' ? -1 : 1, d = o.d ?? 250, k = 1000 / d;
    const pose = { ...bossy(who, b), mouth: lipFlap(t, o.talk ?? true, 'grin'), ...(o.o ? o.o(t, b) : {}) };
    return S.stage(t, { d, x: (o.x ?? -sd * 60), z: 0, eye: o.eye ?? 140, feetY: o.feetY ?? (330 + 175 * k) }, { floor: o.floor ?? 'show', count: o.count, roll: o.roll ?? .03 * Math.sin(b * Math.PI / 2), zoom: o.zoom ?? 1.05, jets: o.jets ?? beatJets(.5), screen: o.screen, shakes: o.shakes, crowdUp: o.crowdUp }, () => [
      { who, x: 0, z: 0, o: pose, id: 'chef' }, ...(o.extra ?? []),
    ]);
  }

  // ---------- an order shot (two beats): the action with the word slammed, then YES, CHEF! on the second beat ----------
  function order(cfg) {
    return (t, lt) => {
      const yesT = TT.YES[cfg.cut] ?? 1e9, ys = clamp((t - yesT) / .12), sal = ys * Math.exp(-Math.max(0, t - yesT - .2) * 2.5);
      const r = (cfg.paint ?? station)(t, { ...cfg, saluting: t >= yesT, cam: { ...cfg.cam, zoom: (cfg.cam?.zoom ?? 1.04) * zoomKick(lt, .14, 8) }, shakes: [[CUT[cfg.cut], 14], [yesT, 10]],
        o: (tt, bb) => ({ ...(typeof cfg.o === 'function' ? cfg.o(tt, bb) : cfg.o || {}), ...(t >= yesT ? salute(cfg.who, Math.max(.6, sal), bb) : {}) }), jets: jetsAt([[CUT[cfg.cut], cfg.side ?? -1, .9], [yesT, -(cfg.side ?? -1), .9]]) });
      slam(cfg.word, cfg.wx ?? W / 2, cfg.wy ?? 150, cfg.size ?? 180, cfg.col ?? C.gold, t, CUT[cfg.cut], 2 * BEAT, cfg.rot ?? -.05, { glow: '#FFFFFF' });
      if (yesT < 1e8) yesChef(t, yesT, cfg.yx ?? (cfg.wx && cfg.wx < W / 2 ? 1480 : 1500), cfg.yy ?? 560, .62, BEAT + .05);
      TT.whip(t, lt, cfg.dir ?? 1, .12);
      return r;
    };
  }

  // ---------- the line-up: everyone in a row, dancing (who: [[id, x, z, move]]) ----------
  function lineUp(t, lt, who, v, o = {}) {
    const b = bpos(t);
    return S.stage(t, v, { floor: o.floor ?? 'show', count: o.count, crowdLit: o.crowdLit, jets: o.jets ?? beatJets(.7), crowdUp: o.crowdUp ?? 1, roll: o.roll ?? 0, zoom: o.zoom ?? 1.03, beams: o.beams, shakes: o.shakes, screen: o.screen, under: o.under, over: o.over },
      () => who.map(([w, x, z, move, extra], i) => ({ who: w, x, z, id: w, o: { ...(typeof move === 'function' ? move(b, i) : groove(w, move, b, 1, i)), ...(extra || {}) } })));
  }

  // ======================= INTRO =======================
  // The feast room (reality): a warm wall, a window with falling leaves, the table and the ruined bird.
  function feastRoom(t, P0) {
    X.fillStyle = linGrad(0, 0, 0, H, [[0, '#F6B26B'], [1, '#C8683A']]); X.fillRect(0, 0, W, H);
    shape(rectPts(1180, 120, 520, 400), { fill: '#8FD3F4', stroke: '#6B3A1F', lwPx: 14 }); line([[1440, 120], [1440, 520]], { stroke: '#6B3A1F', lwPx: 10 }); line([[1180, 320], [1700, 320]], { stroke: '#6B3A1F', lwPx: 10 });
    for (let i = 0; i < 14; i++) { const u = frac(hash(i) + t * .3), lx = 1180 + hash(i * 3) * 520 + 40 * Math.sin(t * 2 + i), ly = 120 + u * 400;
      X.save(); X.beginPath(); X.rect(1180, 120, 520, 400); X.clip(); ellipse(lx, ly, 14, 8, { fill: ['#E2572B', '#F0A030', '#B8461A'][i % 3], stroke: null, rot: t * 3 + i }); X.restore(); }
    for (let i = 0; i < 9; i++) { const x0 = 80 + i * 120; shape([[x0, 60], [x0 + 100, 60], [x0 + 50, 150]], { fill: ['#E2572B', '#F0A030', '#8E4A14'][i % 3], stroke: C.ink, lwPx: 3 }); }
    line([[60, 60], [1180, 60]], { stroke: C.ink, lwPx: 4 });
  }
  function daydream(t, lt, dur) {
    const b = bpos(t), bulbT = .45, cloudT = .8, zoomT = 1.35, z = ease(seg(lt, zoomT, dur));
    const bub = [W / 2, 300];
    camBegin(lerp(W / 2, bub[0], z), lerp(H / 2, bub[1], z), (1.04 + .015 * beatK(t)) * lerp(1, 5.5, easeIn(seg(lt, zoomT, dur))), 0);
    feastRoom(t);
    const k = 3.6, fy = 990;
    const look = lt < bulbT ? 0 : 1, lk = ease(seg(lt, bulbT - .1, bulbT + .1));
    put('safadi', 640, fy, k, { mouth: lt < bulbT ? 'flat' : 'grin', eyes: lt < bulbT ? 'open' : 'wide', brows: lt < bulbT ? 'worried' : 'up', lookX: lerp(.4, .8, lk), lookY: lerp(.6, -.2, lk), bulb: ease(seg(lt, bulbT, bulbT + .2)), handR: [4.6, -22 + 1.5 * Math.sin(b * Math.PI)], handPoseR: 'point', dy: .2 * Math.abs(Math.sin(b * Math.PI)), tilt: .04 * look });
    put('sami', 1280, fy, k, { mouth: lt < bulbT ? 'flat' : 'grin', eyes: lt < bulbT ? 'open' : 'wide', brows: lt < bulbT ? 'worried' : 'up', lookX: lerp(-.4, -.8, lk), lookY: lerp(.6, -.2, lk), bulb: ease(seg(lt, bulbT + .1, bulbT + .3)), handL: [-4.6, -22 + 1.5 * Math.sin(b * Math.PI + 1)], handPoseL: 'point', dy: .2 * Math.abs(Math.sin(b * Math.PI + 1)), tilt: -.04 * look });
    // the table and the charcoal turkey with its band-aid
    shape(rectPts(-40, 860, W + 80, 260), { fill: '#8E4A14', stroke: C.ink, lwPx: 5 }); shape(rectPts(-40, 860, W + 80, 40), { fill: '#FFF4DC', stroke: C.ink, lwPx: 4 });
    TT.turkey(W / 2, 900, 2.4, { burnt: 1, bandaid: true, smoke: 1 - ease(seg(lt, cloudT, cloudT + .4)), t });
    // the thought bubble with the show on a TV inside it
    const ck = backOut(seg(lt, cloudT, cloudT + .35));
    if (ck > .01) {
      [[760, 640, 16], [830, 560, 26]].forEach(([x, y, r], i) => circle(x + 330 * (i ? .3 : .1), y, r * ck, { fill: '#FFFFFF', stroke: C.ink, lwPx: 4 }));
      X.save(); X.translate(bub[0], bub[1]); X.scale(ck * (1 + .03 * beatK(t)), ck * (1 + .03 * beatK(t)));
      const lobes = []; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; lobes.push([Math.cos(a) * 330 + Math.cos(a * 3) * 18, Math.sin(a) * 200 + Math.sin(a * 2) * 12]); }
      shape(lobes, { fill: '#FFFFFF', stroke: C.ink, lwPx: 6, smooth: 1 });
      shape(rectPts(-210, -140, 420, 270), { fill: '#2B2440', stroke: C.ink, lwPx: 6, smooth: .08 });
      const on = seg(lt, cloudT + .25, cloudT + .45);
      X.save(); X.beginPath(); X.rect(-190, -122, 380, 234); X.clip();
      X.fillStyle = linGrad(0, -122, 0, 112, [[0, '#2A0B4E'], [1, '#C0249A']]); X.fillRect(-190, -122, 380, 234 * on + 2);
      if (on > .5) { TT.logo(0, -40, 46, t); txt('TURKEY', 0, 34, 54, C.gold, { align: 'center', stroke: C.ink, lw: 8 }); txt('TAKEOVER', 0, 84, 46, C.pink, { align: 'center', stroke: C.ink, lw: 8 }); }
      for (let y = -122; y < 112; y += 8) { X.fillStyle = 'rgba(0,0,0,.12)'; X.fillRect(-190, y, 380, 3); }
      X.restore();
      line([[-120, 130], [-150, 180]], { stroke: C.ink, lwPx: 6 }); line([[120, 130], [150, 180]], { stroke: C.ink, lwPx: 6 });
      X.restore();
    }
    camEnd();
    // the TV switching on: a white line opens into the studio
    const sw = seg(lt, dur - .2, dur);
    if (sw > 0) overlay(() => { X.fillStyle = '#FFFFFF'; const hh = H * easeIn(sw); X.globalAlpha = .9; X.fillRect(0, H / 2 - hh / 2 - 6, W, hh + 12); X.globalAlpha = 1; });
    if (lt > bulbT && lt < bulbT + .8) TT.slamText('IDEA!', W / 2, 560, 150, C.gold, t, CUT.daydream + bulbT, .8, -.05, { glow: '#FFFFFF' });
  }

  function title(t, lt, dur) {
    const b = bpos(t), u = ease(seg(lt, 0, 2.2)), words = [['TURKEY!', HIT.TURKEY, C.gold, -1], ['TAKE!', HIT.TAKE, C.pink, 1], ['OVER!', HIT.OVER, C.cyan, -1]];
    const v = { d: lerp(1500, 980, u), x: lerp(-500, 0, u), z: 200, eye: lerp(700, 210, u), feetY: lerp(1000, 940, u) };
    const neon = clamp(seg(lt, .05, .35) * (frac(lt * 9) > .3 || lt > .5 ? 1 : .2));
    S.stage(t, v, { neon, roll: lerp(-.06, 0, u), zoom: 1.02 * (1 + .1 * Math.max(...words.map(w => kickK(t, w[1], 7)))), crowdUp: 1, crowdLit: false,
      jets: jetsAt([[CUT.title, 0, .7], ...words.map(([, h, , sd]) => [h, sd, 1]), [HIT.OVER + .01, 0, 1]]), shakes: words.map(w => [w[1], 22]),
      beams: .8 });
    S.crane(t, 220, 1, .9); S.crane(t + 1.3, W - 220, -1, .9);
    // the announcer's banner, then the three words
    const bk = backOut(seg(lt, .15, .45)) * (1 - easeIn(seg(t, HIT.TURKEY - .25, HIT.TURKEY - .05)));
    if (bk > .01) overlay(() => { X.save(); X.translate(W / 2, 250); X.scale(bk, bk); TT.pill(-560, -70, 1120, 140, 'rgba(20,10,46,.85)', C.gold, 6); txt('LIVE FROM THE SAFADI KITCHEN', 0, 4, 72, '#FFFFFF', { align: 'center', stroke: C.ink, lw: 10, max: 1040 }); X.restore(); });
    words.forEach(([w, h, col, sd], i) => {
      const k = slamK(t, h); if (k <= 0) return;
      overlay(() => bigText(w, [W / 2, 700, 1260][i], [200, 420, 420][i], [240, 200, 200][i], col, k * (1 + .05 * beatK(t)), [-.04, -.07, .07][i], { glow: '#FFFFFF' }));
      flash(.45 * kickK(t, h, 10));
    });
    N9.burst(W / 2, 300, t - HIT.OVER, 700, 50, 3); N9.cannon(0, H, -1.0, t, HIT.OVER, 50, 2); N9.cannon(W, H, -2.14, t, HIT.OVER, 50, 5);
  }

  function entrance(t, lt, dur) {
    const b = bpos(t), walk = ease(seg(lt, 0, .9)), z = lerp(260, 0, walk), pose = lt > HIT.cook - CUT.entrance;
    const stride = sd => ({ ...safadiWalk((260 - z) / 58, 1 - walk), mouth: 'grin', eyes: 'open', brows: 'angry' });
    S.stage(t, { d: lerp(470, 360, ease(lt / dur)), eye: 70, z: 0, feetY: 990 }, { floor: 'red', roll: .02 * Math.sin(b * Math.PI / 2), zoom: 1.03 * zoomKick(t - HIT.cook, .12, 6), jets: jetsAt([[CUT.entrance, 0, 1], [HIT.cook, 0, 1]]), crowdUp: 1, shakes: [[HIT.cook, 24]], beams: .9,
      under: P => { // the smoke the chefs stride out of
        for (let i = 0; i < 14; i++) { const [sx, sy, k] = P.p((i - 6.5) * 80, 40 + 50 * hash(i), 520), r = (90 + 60 * hash(i * 3)) * k * (1 + .2 * lt); const px = sx + 30 * Math.sin(t + i), al = .45 * (1 - seg(lt, .3, 1.5)); circle(px, sy, r, { fill: radGrad(px, sy, 0, r, [[0, rgba('#FFFFFF', al)], [1, rgba('#FFFFFF', 0)]]), stroke: null }); } } }, () => [
      { who: 'prof', x: -110, z, id: 'prof', o: pose ? { ...bossy('prof', b), handR: hand('prof', 1, 1.25, 1), handPoseR: 'fist', handL: hand('prof', -1, -.7, .9), mouth: 'open', jump: 1.2 * Math.sin(Math.PI * seg(t, HIT.cook, HIT.cook + .4)) } : stride(-1) },
      { who: 'doc', x: 110, z, id: 'doc', o: pose ? { ...bossy('doc', b), handL: hand('doc', -1, 1.25, 1), handPoseL: 'fist', handR: hand('doc', 1, -.7, .9), mouth: 'open', jump: 1.2 * Math.sin(Math.PI * seg(t, HIT.cook, HIT.cook + .4)) } : { ...stride(1), flip: false } },
    ]);
    HIT.bell.forEach((h, i) => TT.slamText('DING!', i ? 1520 : 400, 200, 130, C.gold, t, h, .4, i ? .12 : -.12, { glow: '#FFFFFF' }));
    slam("LET'S COOK!", W / 2, 200, 230, C.tvRed, t, HIT.cook, 1.4, -.04, { glow: C.gold });
    N9.cannon(0, H, -1.0, t, HIT.cook, 46, 8); N9.cannon(W, H, -2.14, t, HIT.cook, 46, 9);
    cutFlash(lt, .6);
  }

  // ======================= VERSE 1 =======================
  // A chef close-up with a freeze-frame name card slammed across it (the picture holds still under the card for a moment).
  function card(who, name, job, col, side) {
    return (t, lt, dur) => {
      const f0 = CUT[who === 'prof' ? 'cardProf' : 'cardDoc'] + .45, f1 = f0 + .8, frozen = t >= f0 && t < f1, tf = frozen ? f0 : t;
      chefCU(tf, who, { d: lerp(260, 215, ease(lt / dur)), x: side * 90, talk: true, zoom: 1.05 * (frozen ? 1.12 : 1), roll: frozen ? -.03 * side : undefined,
        o: () => (frozen ? { t: tf } : {}) });
      if (frozen) overlay(() => { X.fillStyle = rgba(col, .22); X.fillRect(0, 0, W, H); });
      if (frozen) TT.speedLines(t, W / 2, H / 2, .9, { r0: 520, col: '#FFFFFF' });
      if (t >= f0) TT.nameCard(t, f0, name, job, col, side);
      flash(.5 * kickK(t, f0, 10));
      TT.whip(t, lt, side, .14);
    };
  }
  const cardProf = card('prof', 'CHEF SAFADI', 'Thermodynamics · Turkey Science', C.tvRed, 1);
  const cardDoc = card('doc', 'CHEF SAMI', 'Healthy Stuffing · M.D.', '#18A86B', -1);

  function science(t, lt, dur) {
    station(t, { who: 'prof', kind: 'weigh', label: 'SCIENCE LAB', col: C.cyan, cam: { d: lerp(310, 270, lt / dur), x: lerp(-80, 60, lt / dur), eye: 130, feetY: 1000 }, screen: 'eq',
      o: (tt) => ({ mouth: talk(tt, CUT.science, CUT.healthy - .2, 'smirk') }) });
    TT.lowerThird(t, CUT.science + .2, CUT.healthy, 'EVERY GRAM', 'is weighed · 1,000.00 g exactly', '#2A4FA8', { w: 600 });
    TT.whip(t, lt, 1);
  }
  function healthy(t, lt, dur) {
    const b = bpos(t);
    station(t, { who: 'doc', kind: 'stuff', label: 'FRESH & HEALTHY', col: C.lime, cam: { d: lerp(270, 310, lt / dur), x: lerp(70, -40, lt / dur), eye: 130, feetY: 1000 },
      o: tt => ({ power: 1, eyes: 'happy', mouth: talk(tt, CUT.healthy, CUT.stationsA - .2, 'grin') }),
      after: (tt, A, P) => { const [tx, ty, kk] = P.p(0, CH, 35); for (let i = 0; i < 4; i++) TT.veg(tt, tx, ty - 30 * kk, kk, frac(b + i * .25), 4, i * 5 + Math.floor(b)); } });
    if (lt > .9) overlay(() => { const k = backOut(seg(lt, .9, 1.15)); X.save(); X.translate(1540, 300); X.rotate(-.18); X.scale(k, k);
      X.strokeStyle = '#18A86B'; X.lineWidth = 12; X.beginPath(); X.roundRect(-250, -70, 500, 140, 20); X.stroke(); txt('FRESHLY MADE!', 0, 4, 72, '#18A86B', { align: 'center' }); X.restore(); });
    TT.whip(t, lt, -1);
  }
  // A two-panel split of two stations (scene time drives both); the second panel slides in at t2.
  function stations(a, b2, t2) {
    return (t, lt, dur) => {
      const sl = easeOut(seg(t, t2 - .1, t2 + .2));
      const P2 = TT.SPLIT2.map(p => p.map(([x, y]) => [x, y]));
      const second = P2[1].map(([x, y]) => [x + (1 - sl) * 1100, y]);
      const first = sl > .02 ? P2[0] : [[0, 0], [W, 0], [W, H], [0, H]];
      const [c1, c2] = [TT.ctr(first), TT.ctr(second)];
      TT.split([
        { clip: first, cx: c1[0], cy: H / 2, sc: sl > .02 ? .92 : 1, fn: () => station(t, { ...a, cam: { ...a.cam, d: lerp(a.cam.d, a.cam.d - 40, lt / dur) } }) },
        ...(sl > .02 ? [{ clip: second, cx: c2[0], cy: H / 2, sc: .92, fn: () => station(t, { ...b2, cam: { ...b2.cam, d: lerp(b2.cam.d, b2.cam.d - 40, lt / dur) } }) }] : []),
      ], { lw: 14, edge: C.gold });
      TT.lowerThird(t, CUT[a.cutName] + .15, CUT[a.cutName] + dur, a.name, a.job, a.col, { w: 520, y: H - 300, x: 50 });
      TT.lowerThird(t, t2 + .1, CUT[a.cutName] + dur, b2.name, b2.job, b2.col, { w: 520, y: 70 + 40, x: 1150 });
      TT.whip(t, lt, 1);
    };
  }
  const stationsA = stations(
    { cutName: 'stationsA', who: 'housam', kind: 'chop', label: 'CHOPPING', col: C.lime, cam: { d: 300, x: 0, eye: 120, feetY: 1000 }, name: 'HOUSAM', job: 'Chopping · at blur speed' },
    { who: 'danny', kind: 'pan', label: 'PANS', col: C.orange, cam: { d: 260, x: 0, eye: 100, feetY: 1000 }, hitAt: CUT.stationsA + 1.4, name: 'DANNY', job: 'Pans · Flambé', col2: C.orange }, CUT.stationsA + .94);
  const stationsB = stations(
    { cutName: 'stationsB', who: 'alma', kind: 'spice', label: 'SPICES', col: C.magenta, cam: { d: 280, x: 0, eye: 110, feetY: 1000 }, name: 'ALMA', propX: -45, job: 'Spices · sparkle grade' },
    { who: 'jenna', kind: 'wash', label: 'WASH STATION', col: C.cyan, cam: { d: 290, x: 0, eye: 120, feetY: 1000 }, name: 'JENNA', job: 'Hand-washing officer' }, CUT.stationsB + .94);

  const KIDS = [['housam', 'CHOPPING', C.lime], ['danny', 'PANS', C.orange], ['alma', 'SPICES', C.magenta], ['jenna', 'WASH', C.cyan]];
  function toStations(t, lt, dur) {
    const b = bpos(t), pan = ease(seg(lt, 0, dur));
    S.stage(t, { d: 820, x: lerp(-520, 360, pan), z: 80, eye: 150, feetY: 900 }, { jets: beatJets(.7), crowdUp: 1, roll: .02 * Math.sin(b * Math.PI / 2) }, () => [
      ...KIDS.map(([w], i) => { const xs = (i - 1.5) * 300, arrive = CUT.toStations + .25 + i * .2, run = ease(seg(t, arrive - .7, arrive)), x = lerp(xs + (i % 2 ? 1400 : -1400), xs, run);
        return { who: w, x, z: 110, y: RISER(w), id: w, o: run < 1 ? { ...groove(w, 'bounce', b * 2, 1, i), lean: (i % 2 ? -.18 : .18), flip: i % 2 === 1 } : { ...groove(w, 'cheer', b, 1, i) } }; }),
      ...KIDS.map(([, lab, col], i) => ({ z: 30, draw: P => S.counter(P, (i - 1.5) * 300, 30, 240, { h: CH, label: lab, col }) })),
    ]);
    TT.speedLines(t, W / 2, H / 2, 1 - seg(lt, .8, 1.4), { r0: 480 });
    if (lt < .9) overlay(() => { X.globalAlpha = .5 * (1 - lt / .9); for (let i = 0; i < 30; i++) { X.fillStyle = '#FFFFFF'; X.fillRect(hash(i + Math.floor(t * 24)) * W, hash(i * 3) * H, 300, 4); } X.globalAlpha = 1; });
    KIDS.forEach(([w], i) => { const at = CUT.toStations + .25 + i * .2; TT.slamText(['GO!', 'GO!', 'GO!', 'GO!'][i], 300 + i * 440, 180, 110, FIRE[i], t, at, .5, (i % 2 ? .1 : -.1), { glow: '#FFFFFF' }); });
  }
  function yesChef1(t, lt, dur) {
    const b = bpos(t), y = HIT.yes1, sk = clamp((t - y) / .12), sal = t >= y ? Math.max(.65, Math.exp(-(t - y - .3) * 1.2)) : 0;
    S.stage(t, { d: lerp(400, 340, ease(lt / dur)), z: 110, eye: 100, feetY: 900 }, { jets: jetsAt([[y, 0, 1], [y + .9, 0, .8]]), crowdUp: 1, shakes: [[y, 26]], zoom: 1.03 * zoomKick(t - y, .1, 6), beams: t > y ? 1 : 0 }, () => [
      ...KIDS.map(([w], i) => ({ who: w, x: (i - 1.5) * 190, z: 150, y: RISER(w), id: w, o: t >= y ? salute(w, sal * sk, b) : { ...groove(w, 'bounce', b, .6, i), eyes: 'open', mouth: 'o' } })),
      ...KIDS.map(([, lab, col], i) => ({ z: 70, draw: P => S.counter(P, (i - 1.5) * 190, 70, 170, { h: CH, label: lab, col }) })),
      { who: 'prof', x: -430, z: -40, id: 'prof', o: { ...bossy('prof', b), mouth: t > y + .5 ? 'grin' : 'open', handR: hand('prof', 1, .2, 1), handPoseR: 'thumb' } },
      { who: 'doc', x: 430, z: -40, id: 'doc', o: { ...bossy('doc', b), mouth: t > y + .5 ? 'grin' : 'open', handL: hand('doc', -1, .2, 1), handPoseL: 'point', handR: hand('doc', 1, -1, .8) } },
    ]);
    yesChef(t, y, W / 2, 230, 1.15, .62);
    N9.cannon(0, H, -1.0, t, y, 50, 3); N9.cannon(W, H, -2.14, t, y, 50, 4);
    if (t > y + .66) slam("THAT'S THE TURKEY WAY!", W / 2, 150, 110, C.gold, t, y + .68, dur - (y + .68 - CUT.yesChef1), .03, { flash: false });   // after the sticker has gone
    TT.whip(t, lt, -1);
  }

  // ======================= CHORUS 1 =======================
  const c1Stuff = order({ cut: 'c1Stuff', who: 'alma', kind: 'stuff', label: 'STUFFING', col: C.magenta, word: 'STUFF IT!', cam: { d: 270, x: 40, eye: 110, feetY: 990 }, side: -1 });
  const c1Baste = order({ cut: 'c1Baste', who: 'jenna', kind: 'baste', label: 'BUTTER', col: C.orange, word: 'BASTE IT!', cam: { d: 300, x: -50, eye: 130, feetY: 1000 }, side: 1, dir: -1, wx: W / 2 + 120 });
  const c1Chop = order({ cut: 'c1Chop', who: 'housam', kind: 'chop', label: 'CHOPPING', col: C.lime, word: 'CHOP IT!', cam: { d: 280, x: 60, eye: 120, feetY: 1080 }, side: -1 });
  const c1Stir = order({ cut: 'c1Stir', who: 'danny', kind: 'stir', label: 'GRAVY', col: C.cyan, word: 'STIR IT!', cam: { d: 250, x: -40, eye: 100, feetY: 1000 }, side: 1, dir: -1 });
  const c1Stuff2 = order({ cut: 'c1Stuff2', who: 'prof', kind: 'stuff', label: 'PRECISION STUFFING', col: C.cyan, word: 'STUFF IT!', cam: { d: 330, x: -60, eye: 150, feetY: 1080 }, side: 1, o: { power: 1 } });
  const c1Baste2 = order({ cut: 'c1Baste2', who: 'doc', kind: 'baste', label: 'HEALTHY BASTE', col: C.lime, word: 'OH YEAH!', cam: { d: 330, x: 60, eye: 150, feetY: 1080 }, side: -1, dir: -1 });

  function golden(t, lt, dur, o = {}) {
    const b = bpos(t), walk = lt / dur;
    S.stage(t, { d: lerp(560, 430, ease(walk)), z: 0, eye: 70, feetY: 960, x: lerp(-60, 60, walk) }, { floor: 'gold', jets: beatJets(.8), crowdUp: 1, roll: .03 * Math.sin(b * Math.PI / 2), beams: .7, screen: o.screen ?? 'logo',
      under: P => { X.save(); X.globalCompositeOperation = 'lighter'; X.translate(W / 2, 420); X.rotate(t * .4); for (let i = 0; i < 16; i++) { X.rotate(TAU / 16); X.fillStyle = rgba(C.gold, .1); X.beginPath(); X.moveTo(0, 0); X.lineTo(1400, -110); X.lineTo(1400, 110); X.fill(); } X.restore(); } }, () => [
      { who: 'prof', x: -130, z: 0, id: 'prof', o: { ...groove('prof', 'professor', b), mouth: 'open', eyes: 'happy' } },
      { who: 'doc', x: 130, z: 0, id: 'doc', o: { ...groove('doc', 'professor', b + 1), mouth: 'open', eyes: 'happy' } },
      ...(o.extra ?? []),
    ]);
    TT.twinkles(t, W / 2, 500, 700, 40, 2, [C.gold, '#FFFFFF', '#FFF3A8'], 22);
    slam('GOLDEN!', W / 2, 180, 220, C.gold, t, CUT[o.cut ?? 'c1Golden'], 1.0, -.04, { glow: C.orange });
    slam('TASTE IT!', W / 2, 190, 200, '#FFFFFF', t, CUT[o.cut ?? 'c1Golden'] + .9, .6, .04, { glow: C.gold });
    TT.whip(t, lt, 1);
  }
  const c1Golden = (t, lt, dur) => golden(t, lt, dur, { cut: 'c1Golden' });

  // The audience reverse: the camera turns to the bleachers; the crowd is on its feet (lit) and a crane swings through.
  function heard(t, lt, dur, o = {}) {
    const b = bpos(t);
    S.stage(t, { d: 520, x: lerp(-700, -300, ease(lt / dur)) * (o.side ?? 1), z: 760, eye: 260, feetY: 1100 }, { crowdUp: 1, crowdLit: true, jets: beatJets(1), blur: 0, roll: .04 * Math.sin(b * Math.PI / 2), zoom: 1.05, beams: .6 });
    S.crane(t, o.side < 0 ? W - 260 : 260, o.side < 0 ? -1 : 1, 1.1);
    if (o.word !== null) { const at = o.at ?? t - lt + .5; slam(o.word ?? 'EVERYBODY HEARD IT!', W / 2, 200, 130, C.gold, t, at, t - lt + dur - at - .05, -.03, { glow: C.magenta }); }
    for (let i = 0; i < 6; i++) N9.pop('heart', 300 + i * 260, 600, frac(lt * .9 + i * .17), 200, 6, i, [C.magenta, C.pink, '#FFFFFF'], 22);
    TT.whip(t, lt, -1);
  }
  const c1Heard = (t, lt, dur) => heard(t, lt, dur, { cut: 'c1Heard', side: 1 });

  // A 2×2 of the four kids (close), CRISPY! JUICY! stickers.
  function quad(t, lt, dur, cast4, words) {
    X.fillStyle = TT.C.tvNavy; X.fillRect(0, 0, W, H);
    const order4 = [0, 1, 2, 3], appear = i => easeOut(seg(lt, i * .07, i * .07 + .18));
    TT.split(order4.filter(i => appear(i) > .02).map(i => {
      const [w, kind, lab, col] = cast4[i], q = TT.QUAD[i], [cx, cy] = TT.ctr(q);
      return { clip: q, cx: cx + (1 - appear(i)) * (i % 2 ? 900 : -900), cy, sc: .55, fn: () => station(t, { who: w, kind, label: lab, col, cam: { d: 230, x: 0, eye: 110, feetY: 1230 }, extra: [], hitAt: CUT.c1Quad + .2 }) };
    }), { lw: 12, edge: C.gold });
    words.forEach(([w, at, x, y, col]) => slam(w, x, y, 150, col, t, at, .9, (x < W / 2 ? -.08 : .08), { flash: false }));
  }
  const c1Quad = (t, lt, dur) => quad(t, lt, dur, [['housam', 'chop', 'CHOPPING', C.lime], ['danny', 'pan', 'PANS', C.orange], ['alma', 'spice', 'SPICES', C.magenta], ['jenna', 'baste', 'BUTTER', C.cyan]],
    [['CRISPY!', CUT.c1Quad + .1, 560, 300, C.gold], ['JUICY!', CUT.c1Quad + .5, 1360, 800, C.orange]]);

  const GANG1 = [['housam', -330, 120, 'cheer'], ['danny', -110, 160, 'cheer'], ['alma', 110, 160, 'cheer'], ['jenna', 330, 120, 'cheer'], ['prof', -560, 20, 'cheer'], ['doc', 560, 20, 'cheer']];
  function hands(t, lt, dur, gang, o = {}) {
    lineUp(t, lt, gang, { d: lerp(760, 640, lt / dur), z: 100, eye: 30, feetY: 990 }, { beams: 1, jets: beatJets(1), roll: .02 * Math.sin(bpos(t) * Math.PI / 2), screen: o.screen });
    N9.cannon(0, H, -1.0, lt, 0, 44, 3); N9.cannon(W, H, -2.14, lt, 0, 44, 4); N9.cannon(0, H, -1.0, lt, 2 * BEAT * 2, 44, 5); N9.cannon(W, H, -2.14, lt, 2 * BEAT * 2, 44, 6);
    slam('HANDS UP!', W / 2, 200, 200, C.cyan, t, t - lt + .05, 1.6, .03, { glow: '#FFFFFF' });
    TT.whip(t, lt, 1);
  }
  const c1Hands = (t, lt, dur) => hands(t, lt, dur, GANG1);
  // The instrumental bar of verse 1: all four stations at once. After "Sorry, Chef!": the crowd roars, the show goes on.
  const stationsAll = (t, lt, dur) => { quad(t, lt, dur, [['housam', 'chop', 'CHOPPING', C.lime], ['danny', 'pan', 'PANS', C.orange], ['alma', 'spice', 'SPICES', C.magenta], ['jenna', 'wash', 'WASH STATION', C.cyan]], [['THE BRIGADE!', CUT.stationsAll + .35, W / 2, H / 2, C.gold]]); };
  const crowdFix = (t, lt, dur) => { heard(t, lt, dur, { side: -1, word: 'WE CAN FIX IT!', at: HIT.fix }); N9.confetti(t, HIT.fix, 70, 3); };

  function fuss(t, lt, dur, gang, o = {}) {
    const b = bpos(t), t0 = t - lt;
    lineUp(t, lt, gang, { d: 720, x: lerp(-150, 150, lt / dur), z: 100, eye: 140, feetY: 930 }, { beams: .6, jets: jetsAt([[t0 + 2 * BEAT, 0, 1], [t0 + 3 * BEAT, 0, 1]]), shakes: [[t0 + 2 * BEAT, 16], [t0 + 3 * BEAT, 16]], screen: o.screen });
    slam('NO FUSS!', 560, 220, 170, C.gold, t, t0 + 2 * BEAT, .5, -.08); slam('NO FUSS!', 1360, 220, 170, C.pink, t, t0 + 3 * BEAT, .6, .08);
    if (o.fireworks) { N9.burst(400, 260, lt - .2, 360, 30, 1); N9.burst(1500, 240, lt - .6, 360, 30, 5); N9.burst(W / 2, 160, lt - 1.1, 460, 40, 9); }
    TT.whip(t, lt, -1);
  }
  const GANGL = [['prof', -620, 60, 'bounce'], ['housam', -370, 120, 'bounce'], ['danny', -130, 140, 'bounce'], ['alma', 130, 140, 'bounce'], ['jenna', 370, 120, 'bounce'], ['doc', 620, 60, 'bounce']];
  const c1Fuss = (t, lt, dur) => fuss(t, lt, dur, GANGL);

  // ======================= INSPECTION =======================
  function inspect(t, lt, dur) {
    const b = bpos(t), lid = ease(seg(t, CUT.inspect + .05, CUT.inspect + .4)), lean = ease(seg(t, HIT.wait - .1, HIT.wait + .3)), tap = HIT.its;
    const push = ease(lt / dur);
    const { A, P } = S.stage(t, { d: lerp(420, 300, push), z: 60, eye: 160, feetY: 900, x: lerp(-30, 30, push) }, { floor: 'red', screen: 'count', count: '?', jets: () => 0, crowdUp: 0, wallBot: '#3A0B1E', shakes: [[CUT.inspect, 12], [tap, 16]], zoom: 1.04 * zoomKick(t - tap, .06, 8) }, () => [
      { who: 'prof', x: -170, z: 110, id: 'prof', o: { eyes: lean > .5 ? 'wide' : 'open', brows: lean > .5 ? 'quizzical' : 'up', mouth: talk(t, HIT.wait, HIT.what + .7, 'o'), lean: .14 * lean, handR: hand('prof', 1, -.2 + .4 * lean, 1), handPoseR: 'fist', handL: hand('prof', -1, -1.1, .8), emote: t > HIT.wait + .3 ? '?' : undefined, emoteK: seg(t, HIT.wait + .3, HIT.wait + .5) } },
      { who: 'doc', x: 170, z: 110, id: 'doc', o: { eyes: t > tap ? 'wide' : 'open', brows: 'up', mouth: talk(t, tap, tap + .6, 'o'), handL: t > tap - .3 ? atC('doc', -1.5, 2 + 3 * (1 - kickK(t, tap, 8))) : hand('doc', -1, -1.1, .8), handPoseL: 'fist', handR: hand('doc', 1, -1.1, .8), jump: .8 * kickK(t, tap, 6) } },
      { z: 0, draw: P => S.counter(P, 0, 0, 420, { h: CH, label: 'INSPECTION', col: C.tvRed }) },
    ]);
    const [tx, ty, kk] = P.p(0, CH, 35);
    TT.turkey(tx, ty, kk * .8, { ice: 1, t, sq: .02 * kickK(t, tap, 8) });
    // the cloche lifts off
    if (lid < 1) { const ly = ty - 50 * kk - lid * 260 * kk; X.save(); X.globalAlpha = 1 - seg(lid, .7, 1); ellipse(tx, ly, 70 * kk, 55 * kk, { fill: linGrad(tx - 70 * kk, 0, tx + 70 * kk, 0, [[0, '#8996A8'], [.4, '#F2F6FA'], [1, '#7C899B']]), stroke: C.ink, lwPx: 4 }); X.restore(); }
    // the professor's magnifying glass, his eye huge in it
    if (A.prof && lean > .05) { const mx = lerp(A.prof.handR[0], tx - 30 * kk, lean), my = lerp(A.prof.handR[1], ty - 60 * kk, lean), r = 46 * kk;
      line([[A.prof.handR[0], A.prof.handR[1]], [mx - r * .6, my + r * .6]], { stroke: C.ink, lwPx: 10 * kk + 3 }); line([[A.prof.handR[0], A.prof.handR[1]], [mx - r * .6, my + r * .6]], { stroke: '#6B3A1F', lwPx: 8 * kk });
      circle(mx, my, r, { fill: 'rgba(200,240,255,.35)', stroke: C.ink, lwPx: 6 }); circle(mx, my, r - 5, { fill: null, stroke: C.gold, lwPx: 5 });
      TT.sparkle(mx + r * .2, my - r * .1, r * .3, '#FFFFFF', t * 3, .9); }
    TT.siren(t, 1);
    sfx('CLONK!', tx + 120 * kk, ty - 120 * kk, 130, C.ice, t - tap);
    slam('WAIT.', 400, 200, 160, '#FFFFFF', t, HIT.wait, .6, -.08, { glow: C.tvRed, flash: false });
    slam('WHAT IS THIS?', W / 2 + 200, 210, 150, C.gold, t, HIT.what, 1.2, .04, { glow: C.tvRed, flash: false });
    slam("IT'S…", W / 2, 210, 170, C.ice, t, tap, 1.3, -.04, { glow: '#FFFFFF', flash: false });
    TT.whip(t, lt, 1);
  }
  function frozen(t, lt, dur) {
    const b = bpos(t), cz = easeOut(seg(lt, 0, .18));
    const { P, A } = S.stage(t, { d: lerp(500, 230, cz), z: 60, eye: lerp(160, 190, cz), feetY: lerp(900, 1060, cz), x: 0 }, { floor: 'cold', screen: 'frozen', wallTop: '#03122A', wallBot: '#0B3A6A', ray: '#7FE3FF', jets: () => 0, crowdUp: 1, shakes: [[HIT.FROZEN, 34, 4]], zoom: 1.04 * zoomKick(lt, .2, 5), roll: .04 * Math.sin(lt * 9) * kickK(lt, 0, 2), beamCols: [C.ice, '#FFFFFF'] }, () => [
      { who: 'prof', x: -230, z: 110, id: 'prof', o: { eyes: 'wide', brows: 'up', mouth: 'O', handL: hand('prof', -1, .9, 1), handR: hand('prof', 1, .9, 1), handPoseL: 'palm', handPoseR: 'palm', jump: 1.5 * kickK(lt, 0, 4) } },
      { who: 'doc', x: 230, z: 110, id: 'doc', o: { eyes: 'wide', brows: 'up', mouth: 'O', handL: hand('doc', -1, .9, 1), handR: hand('doc', 1, .9, 1), handPoseL: 'palm', handPoseR: 'palm', jump: 1.5 * kickK(lt, .05, 4) } },
      { z: 0, draw: P => S.counter(P, 0, 0, 520, { h: CH, label: 'FROZEN SOLID', col: C.ice }) },
    ]);
    const [tx, ty, kk] = P.p(0, CH, 35);
    TT.turkey(tx, ty, kk * 1.05, { ice: 1, t, sq: -.04 * kickK(lt, 0, 6) });
    // frost on the chefs: little icicles hanging off their toques
    ['prof', 'doc'].forEach(w => { const a = A[w]; if (!a) return; for (let i = 0; i < 5; i++) { const x = a.top[0] + (i - 2) * 22 * kk, y = a.top[1] - 10 * kk; shape([[x - 6, y], [x + 6, y], [x, y + 30 * kk * (.6 + .4 * hash(i))]], { fill: '#E8FBFF', stroke: '#7FC8E8', lwPx: 2 }); } });
    TT.icy(t, HIT.FROZEN, 1);
    slam('FROZEN!', W / 2, 230, 290, C.ice, t, HIT.FROZEN, dur - .1, -.05, { glow: '#FFFFFF', stroke: '#0B2A4A' });
    for (let i = 0; i < 26; i++) { const u = frac(hash(i) + lt * .5); TT.sparkle(hash(i * 3) * W, u * H, 10 + 10 * hash(i * 5), '#FFFFFF', lt * 2 + i, .8 * (1 - u)); }
  }
  function sorry(t, lt, dur) {
    const b = bpos(t), s0 = HIT.sorry;
    lineUp(t, lt, KIDS.map(([w], i) => [w, (i - 1.5) * 220, 140, (bb, j) => ({ eyes: 'happy', mouth: 'grin', brows: 'worried', tilt: .1 * Math.sin(bb * Math.PI + j), handL: hand(w, -1, 1.7, .55), handR: hand(w, 1, 1.7, .55), handPoseL: 'palm', handPoseR: 'palm', dy: .3 * Math.abs(Math.sin(bb * Math.PI)), jump: .8 * Math.abs(Math.sin(bb * Math.PI)) * seg(t, s0, s0 + .1) })]),
      { d: lerp(520, 440, lt / dur), z: 140, eye: 110, feetY: 960 }, { floor: 'cold', screen: 'frozen', crowdUp: 1, jets: beatJets(.5), beams: .5, roll: .03 * Math.sin(b * Math.PI / 2) });
    overlay(() => { const k = slamK(t, s0); if (k <= 0) return; X.save(); X.translate(W / 2, 230); X.rotate(-.05); X.scale(k, k); shape(starPts(0, 0, 330, .82, 18, t * .5), { fill: C.pink, stroke: C.ink, lwPx: 7 }); X.restore(); bigText('SORRY, CHEF!', W / 2, 230, 140, '#FFFFFF', k, -.05, { glow: C.magenta }); });
    for (let i = 0; i < 4; i++) N9.pop('heart', 520 + i * 300, 520, lt - .4 - i * .15, 180, 6, i, [C.magenta, C.pink, '#FFFFFF'], 22);
    // the whip-pan out to Neptune
    TT.whip(t, dur - lt, 1, .2);
  }

  const shots = { daydream, title, entrance, cardProf, cardDoc, science, healthy, stationsA, stationsB, toStations, yesChef1,
    c1Stuff, c1Baste, c1Golden, c1Chop, c1Stir, c1Heard, c1Stuff2, c1Baste2, c1Quad, c1Hands, c1Fuss, inspect, frozen, sorry, stationsAll, crowdFix };
  shots._ = { CH, U, RISER, atC, talk, jetsAt, beatJets, zoomKick, cutFlash, station, chefCU, order, lineUp, golden, heard, quad, hands, fuss, KIDS, GANG1, GANGL };
  return shots;
})();
TT_SHOTS.placeholder = (t, lt) => TT_SHOTS._.lineUp(t, lt, TT_SHOTS._.GANGL, { d: 900, z: 100, eye: 140, feetY: 900 }, {});
