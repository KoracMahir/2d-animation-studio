// scenes/fall_festival/scene75_turkey_takeover/shots_b.js: verse 2 (one guest a bar), chorus 2, the kitchen rush and the build.
//   neptune      a rainbow water blast thaws the frozen bird (SPLASH! at HIT.splash)
//   dragonOven   Dragon is the oven: fire into the open oven, the readout climbs to 350° (ROAR at HIT.roar)
//   fester       onions in a cascade… BONK (HIT.bonk), dizzy stars, a grin
//   pearlJudge   the judges' desk, a royal stare, the score bug        drgRules   1 · 2 · 3 ticked on the beat (HIT.rules)
//   roudCode     the recipe projected from her laptop as glowing code  brigade · yesChef2   everybody, and the salute
//   chorus 2     the guests take the orders, the audience on its feet: new angles, a 3-way chop, an overhead circle
//   rush         CHOP! STIR! BASTE! TASTE! (HIT.rush), then the kids' double-time montage (HIT.rush2) with the TURKEY-O-METER
//   build        stuffing in · the dial to 350 · the door shuts · science and the timer · the countdown FIVE … ONE (HIT.count)
Object.assign(TT_SHOTS, (() => {
  const { C, HIT, CUT, BEAT, BAR, B, bpos, beatK, put, groove, hand, salute, bossy, slam, yesChef, kickK, slamK, bigText, txt } = TT;
  const S = TTS, FIRE = N9.FIRE, { CH, RISER, atC, talk, jetsAt, beatJets, zoomKick, cutFlash, station, chefCU, order, lineUp, golden, heard, quad, hands, fuss, KIDS } = TT_SHOTS._;
  const HT = { prof: 180, doc: 180, housam: 165, jenna: 145, alma: 105, danny: 122, jester: 170, drg: 170, roud: 172, dragon: 150, neptune: 135, pearl: 128 };

  // A guest medium shot: the guest at world (gx, 0, gz) beside a counter, a lower-third, a hook for props.
  function guest(t, lt, dur, cfg) {
    const b = bpos(t), h = HT[cfg.who] ?? 160, d = cfg.d ?? lerp(h * 2.6, h * 2.2, ease(lt / dur));
    const r = S.stage(t, { d, x: cfg.camX ?? 80, z: 60, eye: cfg.eye ?? 110, feetY: cfg.feetY ?? 860 }, { floor: cfg.floor ?? 'show', jets: cfg.jets ?? beatJets(.5), crowdUp: 1, roll: .025 * Math.sin(b * Math.PI / 2), zoom: 1.04 * (cfg.zoom ? cfg.zoom(t) : 1), shakes: cfg.shakes, screen: cfg.screen, beams: cfg.beams, under: cfg.under }, () => [
      { who: cfg.who, x: cfg.gx ?? -150, z: cfg.gz ?? 60, y: cfg.gy ?? 0, id: 'g', o: cfg.pose(t, b) },
      ...(cfg.extra ? cfg.extra(t, b) : []),
      cfg.counter === false ? null : { z: -10, draw: P => S.counter(P, cfg.cx ?? 170, -10, cfg.cw ?? 300, { h: CH, label: cfg.label, col: cfg.col }) },
    ]);
    if (cfg.after) cfg.after(t, r.A, r.P);
    TT.lowerThird(t, t - lt + .15, t - lt + dur, cfg.name, cfg.job, cfg.ltCol ?? cfg.col, { w: 600 });
    TT.whip(t, lt, cfg.dir ?? 1);
    return r;
  }
  const birdOn = (P, x, sc = .62, o = {}) => { const [tx, ty, kk] = P.p(x, CH, 25); return TT.turkey(tx, ty, kk * sc, o); };

  // ======================= VERSE 2 =======================
  function neptuneShot(t, lt, dur) {
    const sp = HIT.splash, thaw = ease(seg(t, sp + .1, sp + .9));
    guest(t, lt, dur, { who: 'neptune', name: 'KING NEPTUNE', job: 'Rainbow Rinse · Ruler of the Sink', col: '#2C8FE0', label: 'THAW ZONE', floor: 'cold', gx: -190, cx: 150, screen: thaw > .5 ? 'logo' : 'frozen',
      shakes: [[sp, 18]], zoom: tt => zoomKick(tt - sp, .08, 6),
      pose: (tt, b) => ({ ...groove('neptune', 'bounce', b, .7), trident: true, tridentAng: tt > sp - .3 ? -.55 : -1.3 + .2 * Math.sin(tt * 6), power: ease(seg(tt, CUT.neptune, sp)), mouth: tt > sp ? 'laugh' : 'grin', eyes: tt > sp ? 'happy' : undefined }),
      after: (tt, A, P) => {
        const bird = birdOn(P, 150, .62, { ice: 1 - thaw, t: tt });
        if (A.g?.tridentTip) neptuneBlast(A.g.tridentTip[0], A.g.tridentTip[1], bird.center[0], bird.center[1], seg(tt, sp - .25, sp + 1.0), tt, 46);
        for (let i = 0; i < 18; i++) { const age = tt - sp - .15; if (age < 0 || age > 1.2) continue; const a = -Math.PI / 2 + (hash(i) - .5) * 2.6, v = 500 + 400 * hash(i * 3);
          circle(bird.center[0] + Math.cos(a) * v * age, bird.center[1] + Math.sin(a) * v * age + 900 * age * age, 10 + 8 * hash(i * 5), { fill: `hsla(${(i * 40) % 360},90%,70%,.85)`, stroke: null }); }
      } });
    slam('SPLASH!', 1380, 230, 200, C.cyan, t, sp, 1.0, .06);
    slam('THAWED!', 560, 230, 160, C.gold, t, sp + .7, .9, -.06, { flash: false });
  }
  function dragonOven(t, lt, dur) {
    const r0 = HIT.roar, glow = .3 + .7 * ease(seg(t, r0, r0 + .8)), temp = Math.round(lerp(72, 350, ease(seg(t, r0, r0 + .9))));
    guest(t, lt, dur, { who: 'dragon', name: 'DRAGON', job: 'The Oven · flame-roast specialist', col: C.orange, counter: false, gx: -200, gz: 70, floor: 'red', d: lerp(470, 410, ease(lt / dur)), feetY: 860,
      shakes: [[r0, 26]], zoom: tt => zoomKick(tt - r0, .1, 5),
      pose: (tt, b) => ({ ...groove('dragon', 'bounce', b, .6), wings: tt > r0 - .3 ? 1 : .5, mouth: tt > r0 - .2 && tt < r0 + 1.0 ? 'open' : 'grin', eyes: tt > r0 ? 'happy' : 'open', headTilt: tt > r0 - .2 ? -.15 : 0, lean: tt > r0 - .2 ? .08 : 0, flip: false }),
      extra: () => [{ z: 40, draw: P => { const [ox, oy, k] = P.p(150, 0, 40); return TT.oven(ox, oy, k, { door: .8, glow, temp: `${temp}°`, dial: lerp(.1, .7, glow) }); }, id: 'oven' }],
      after: (tt, A) => { if (A.g?.mouth && A.oven) TT.flameBreath(tt, A.g.mouth[0] + 20, A.g.mouth[1], A.oven.cavity[0], A.oven.cavity[1], seg(tt, r0 - .1, r0 + 1.1), 170); } });
    slam('ROAR!', 520, 220, 200, C.flame, t, r0, .9, -.07);
    if (t > r0 + .8) slam('PREHEATED!', 1340, 240, 130, C.gold, t, r0 + .85, .9, .05, { flash: false });
  }
  function fester(t, lt, dur) {
    const bk = HIT.bonk, c = cascade(Math.min(t, bk - .05), { n: 3, tau: .23, h: 20, t0: CUT.fester - 10 * .23 }), hit = t > bk, grin = t > bk + .45;
    const dz = ease(seg(t, bk, bk + .2)) * (1 - ease(seg(t, bk + .4, bk + .6)));
    const r = guest(t, lt, dur, { who: 'jester', name: 'JESTER FESTER', job: 'Onion Juggler · bonk survivor', col: C.magenta, counter: false, gx: -40, gz: 80, d: lerp(290, 250, ease(lt / dur)), camX: -40, feetY: 1000,
      shakes: [[bk, 20]], zoom: tt => zoomKick(tt - bk, .12, 6),
      pose: (tt, b) => hit ? { handL: [-3.4, -14], handR: [3.4, -14], handPoseL: 'open', handPoseR: 'open', eyes: grin ? 'happy' : 'swirl', mouth: grin ? 'grin' : 'wobble', stars: grin ? .4 : 1, sq: .12 * kickK(tt, bk, 6), dy: .6 * dz, hatSway: [Math.sin(tt * 10) * .5 * (1 - seg(tt, bk, bk + 1)), 0], tilt: grin ? .08 : -.1 + .1 * Math.sin(tt * 8) }
        : { handL: c.handL, handR: c.handR, handPoseL: 'cup', handPoseR: 'cup', eyes: 'open', lookY: -.8, mouth: 'smile', tilt: .02 * Math.sin(tt * 4) },
      after: (tt, A, P) => {
        const [sx, sy, k] = P.p(-40, 0, 80), s = JF_UNIT * k;
        c.balls.forEach((bl, i) => { if (hit && i === 2) return; const fall = hit ? seg(tt, bk, bk + .7) : 0; TT.onion(sx + bl.x * s + fall * (i ? 60 : -60) * k, sy + bl.y * s + fall * fall * 600 * k, 1.9 * s, bl.rot); });
        // the third onion drops straight onto his head
        if (A.g) { const u = seg(tt, bk - .45, bk), ox = A.g.hatBase[0], oy = lerp(-120, A.g.hatBase[1] - 22 * k, easeIn(u)), bounce = hit ? -260 * k * Math.sin(Math.PI * seg(tt, bk, bk + .5)) : 0;
          if (tt > bk - .45) TT.onion(ox + (hit ? 140 * k * seg(tt, bk, bk + .5) : 0), oy + bounce, 2.0 * s, tt * 6); }
      } });
    sfx('BONK!', (r.A.g?.head[0] ?? W / 2) + 160, (r.A.g?.head[1] ?? 400) - 160, 170, C.gold, t - bk);
    if (grin) slam('STILL SMILING!', W / 2 + 330, 240, 110, C.pink, t, bk + .5, .9, .05, { flash: false });
  }
  function pearlJudge(t, lt, dur) {
    const b = bpos(t), stare = seg(t, CUT.pearlJudge + .9, CUT.pearlJudge + 1.1), push = lerp(1, 1.35, easeOut(stare));
    const { P, A } = S.stage(t, { d: lerp(380, 300, ease(lt / dur)), z: 120, eye: 200, feetY: 860, x: 0 }, { floor: 'show', jets: beatJets(.4), crowdUp: 0, zoom: 1.04 * push, screen: 'logo', roll: .02 * Math.sin(b * Math.PI / 2) }, () => [
      { who: 'pearl', x: 0, z: 110, y: 40, id: 'pearl', o: { sit: 1, headTilt: .22 + .04 * Math.sin(b * Math.PI), eyes: stare > .5 ? 'bored' : 'open', brows: stare > .5 ? 'flat' : 'normal', mouth: stare > .5 ? 'flat' : 'smirk', crownLift: .2 * Math.abs(Math.sin(b * Math.PI)), wag: .3 * Math.sin(b * Math.PI * 2), flipNear: .2 * Math.sin(b * Math.PI) } },
      { z: 60, draw: P => TT.judgesDesk(P, 0, 60, 460) },
    ]);
    if (A.pearl && stare > 0) { const [ex, ey] = A.pearl.head; TT.twinkles(t, ex, ey - 120, 110, 10, 4, [C.gold, '#FFFFFF'], 16); }
    if (stare > .5) TT.speedLines(t, W / 2, 420, .6, { r0: 420, col: C.gold });
    TT.lowerThird(t, CUT.pearlJudge + .15, CUT.drgRules, 'PRINCESS PEARL', 'Head Judge · Royal Stare', '#B46BFF', { w: 600 });
    TT.scoreBug(t, CUT.pearlJudge + .4, ['?', '?', '?'], { label: 'SCORE' });
    slam('THE ROYAL STARE', W / 2, 200, 120, C.gold, t, CUT.pearlJudge + .95, .85, -.03, { flash: false });
    TT.whip(t, lt, -1);
  }
  function drgRules(t, lt, dur) {
    const R = HIT.rules, n = R.filter(h => t >= h).length;
    guest(t, lt, dur, { who: 'drg', name: 'DR. G', job: 'Rules & Kitchen Safety', col: '#18A86B', counter: false, gx: -330, gz: 60, camX: 0, d: lerp(440, 400, ease(lt / dur)), feetY: 900,
      pose: (tt, b) => ({ ...dr_gAbility(tt, 'rules', { k: 1 }), clip: { rot: .05, dx: 1.4, dy: -1.6, ticks: n }, mouth: lipFlap(tt, true, 'smile'), dy: .2 * Math.abs(Math.sin(b * Math.PI)) }) });
    overlay(() => {
      const k = backOut(seg(lt, .05, .35)); X.save(); X.translate(1250 + (1 - k) * 900, 470); X.rotate(-.03);
      TT.pill(-430, -230, 860, 460, 'rgba(255,253,248,.96)', '#18A86B', 8);
      txt("DR. G'S KITCHEN RULES", 0, -170, 54, '#18A86B', { align: 'center', stroke: C.ink, lw: 0 });
      ['WASH YOUR HANDS', 'NO TASTING RAW TURKEY', 'HAVE FUN!'].forEach((s, i) => { const y = -70 + i * 110, on = t >= R[i], p = 1 + .5 * kickK(t, R[i], 6);
        X.save(); X.translate(-360, y); X.scale(p, p); circle(0, 0, 40, { fill: on ? '#18A86B' : '#FFFFFF', stroke: C.ink, lwPx: 5 }); txt(String(i + 1), 0, 3, 52, on ? '#FFFFFF' : C.ink, { align: 'center' }); X.restore();
        txt(s, -290, y + 2, 50, C.ink, { max: 560 });
        if (on) line([[300, y - 4], [325, y + 22], [372, y - 34]].map(([x, yy]) => [x, yy]), { stroke: '#18A86B', lwPx: 12 }); });
      X.restore();
    });
    R.forEach((h, i) => slam(['ONE!', 'TWO!', 'THREE!'][i], 1250, 160, 110, '#18A86B', t, h, .42, (i - 1) * .06, { glow: '#FFFFFF' }));
  }
  function roudCode(t, lt, dur) {
    const k = seg(lt, .1, dur - .2);
    guest(t, lt, dur, { who: 'roud', name: 'ROUDAYNAH', job: 'Recipe Engineer · writes it in code', col: '#3DB8FF', counter: false, gx: -300, gz: 60, camX: 0, d: lerp(460, 420, ease(lt / dur)), feetY: 900, screen: 'eq',
      pose: (tt, b) => ({ ...roudaynahAbility(tt, 'coding'), dy: .2 * Math.abs(Math.sin(b * Math.PI)) }),
      after: (tt, A) => { const lp = A.g?.laptop ?? [700, 600];
        X.save(); X.globalCompositeOperation = 'lighter'; X.globalAlpha = .25; X.fillStyle = '#3DB8FF'; X.beginPath(); X.moveTo(lp[0], lp[1]); X.lineTo(870, 760); X.lineTo(870, 200); X.closePath(); X.fill(); X.restore();
        TT.holo(tt, 1290, 770, 820, k); } });
  }
  const EVERY = [['prof', -620, 30, 'bounce'], ['doc', 620, 30, 'bounce'], ['housam', -400, 120, 'bounce'], ['danny', -180, 140, 'bounce'], ['alma', 40, 150, 'bounce'], ['jenna', 250, 130, 'bounce'],
    ['jester', 450, 160, 'disco'], ['neptune', -560, 330, 'bounce'], ['pearl', 560, 330, 'bounce'], ['dragon', -260, 380, 'bounce'], ['drg', 60, 400, 'clap'], ['roud', 330, 390, 'clap']];
  const FACE = { neptune: {}, pearl: { flip: true } };
  const every = (move, extra = {}) => EVERY.map(([w, x, z, m]) => [w, x, z, move ?? m, { ...(FACE[w] || {}), ...(extra[w] || {}) }]);
  function brigade(t, lt, dur, o = {}) {
    const u = ease(lt / dur), back = o.back ? 1 - u : u;
    lineUp(t, lt, every(o.move), { d: lerp(1000, 780, back), x: lerp(-150, 150, lt / dur) * (o.back ? -1 : 1), z: 200, eye: lerp(480, 180, back), feetY: 900 }, { beams: .9, jets: beatJets(.9), crowdUp: 1, crowdLit: !!o.back });
    slam(o.word ?? "EVERYBODY'S COOKING!", W / 2, 190, 140, C.gold, t, o.at ?? CUT.brigade + .05, 1.7, -.03, { glow: C.magenta });
    TT.whip(t, lt, 1);
  }
  function yesChef2(t, lt, dur) {
    const b = bpos(t), y = HIT.yes2, sal = t >= y ? Math.max(.6, Math.exp(-(t - y - .3) * 1.4)) : 0;
    lineUp(t, lt, EVERY.map(([w, x, z, m]) => [w, x, z, (bb, i) => (t >= y ? salute(w, sal, bb) : groove(w, 'bounce', bb, .5, i)), FACE[w] || {}]),
      { d: lerp(780, 680, ease(lt / dur)), z: 200, eye: 120, feetY: 960 }, { beams: t > y ? 1 : .3, jets: jetsAt([[y, 0, 1], [y + .94, 0, .8]]), shakes: [[y, 26]], zoom: 1.03 * zoomKick(t - y, .1, 6) });
    yesChef(t, y, W / 2, 230, 1.15, .8);
    if (t > HIT.best - .02) slam('THIS TURKEY IS THE BEST!', W / 2, 210, 100, C.gold, t, HIT.best, CUT.c2Stuff - HIT.best - .05, .03, { flash: false });
    N9.cannon(0, H, -1.0, t, y, 50, 3); N9.cannon(W, H, -2.14, t, y, 50, 4);
  }

  // ======================= CHORUS 2 =======================
  const rawBird = t => ({ roast: 0, stuff: seg(t, CUT.c2Stuff, CUT.c2Stuff + .8) * .7 });
  const c2Stuff = order({ cut: 'c2Stuff', who: 'jester', kind: 'bird', label: 'STUFFING', col: C.magenta, word: 'STUFF IT!', cam: { d: 330, x: 40, eye: 120, feetY: 1000 }, side: -1, bird: rawBird, birdS: .7, floor: 'rush' });
  // Neptune bastes with a thin rainbow drizzle from his trident.
  function nepBaste(t, cfg) {
    const b = bpos(t);
    const r = S.stage(t, { d: 330, x: 30, z: 60, eye: 120, feetY: 830 }, { floor: 'rush', jets: cfg.jets, shakes: cfg.shakes, zoom: cfg.cam.zoom, crowdUp: 1 }, () => [
      { who: 'neptune', x: -170, z: 90, id: 'n', o: { ...groove('neptune', 'bounce', b, .6), trident: true, tridentAng: -.7 + .1 * Math.sin(t * 8), power: .8, mouth: 'laugh' } },
      { z: -10, draw: P => S.counter(P, 130, -10, 300, { h: CH, label: 'BASTING', col: C.cyan }) },
    ]);
    const bird = birdOn(r.P, 130, .7, { roast: .1, stuff: .7, gloss: .5 + .4 * Math.abs(Math.sin(b * Math.PI)), t });
    if (r.A.n?.tridentTip) neptuneBlast(r.A.n.tridentTip[0], r.A.n.tridentTip[1], bird.center[0], bird.center[1] - 40, .5, t, 16);
    return r;
  }
  const c2Baste = order({ cut: 'c2Baste', who: 'neptune', paint: nepBaste, word: 'BASTE IT!', col: C.cyan, cam: {}, side: 1, dir: -1, yx: 1500, yy: 600 });
  const c2Golden = (t, lt, dur) => golden(t, lt, dur, { cut: 'c2Golden', extra: [{ who: 'pearl', x: -420, z: 160, o: { ...groove('pearl', 'bounce', bpos(t), 1) } }, { who: 'neptune', x: 420, z: 160, o: { ...groove('neptune', 'bounce', bpos(t), 1), flip: true } }] });
  // CHOP IT: three slanted panels, three knives.
  function c2Chop(t, lt, dur) {
    const yesT = TT.YES.c2Chop, three = [['housam', C.lime], ['danny', C.orange], ['jester', C.magenta]];
    TT.split(three.map(([w, col], i) => { const q = TT.SPLIT3[i], [cx] = TT.ctr(q), a = easeOut(seg(lt, i * .08, i * .08 + .15));
      return { clip: q, cx, cy: H / 2 + (1 - a) * (i % 2 ? -900 : 900), sc: .72, fn: () => station(t, { who: w, kind: 'chop', label: 'CHOP', col, cam: { d: 260, x: 0, eye: 110, feetY: 1060 }, w: 200, o: t >= yesT ? salute(w, .9) : {} }) }; }), { lw: 14, edge: C.gold });
    slam('CHOP IT!', W / 2, 180, 210, C.lime, t, CUT.c2Chop, 2 * BEAT, -.05);
    yesChef(t, yesT, W / 2, 620, .7, BEAT + .05);
  }
  function drgStir(t, cfg) {
    const b = bpos(t);
    const r = S.stage(t, { d: 420, x: 0, z: 70, eye: 130, feetY: 860 }, { floor: 'rush', jets: cfg.jets, shakes: cfg.shakes, zoom: cfg.cam.zoom, crowdUp: 1 }, () => [
      { who: 'drg', x: -150, z: 90, id: 'g', o: { holdR: 'spoon', handR: [5.5 + 2 * Math.cos(b * Math.PI), -20 + 1 * Math.sin(b * Math.PI)], handL: [-4.4, -16], mouth: 'grin', eyes: 'happy', brows: 'up', dy: .2 * Math.abs(Math.sin(b * Math.PI)) } },
      { who: 'roud', x: 190, z: 110, id: 'r', o: { ...groove('roud', 'clap', b, 1), mouth: 'grin', eyes: 'happy' } },
      { z: -10, draw: P => S.counter(P, 0, -10, 380, { h: CH, label: 'GRAVY', col: '#18A86B' }) },
    ]);
    const [tx, ty, kk] = r.P.p(-40, CH, 25); TT.pot(t, tx, ty, kk * 1.1, b / 2, { soup: '#B8742A' });
    TT.speedLines(t, tx, ty - 60 * kk, .5, { r0: 160 * kk, n: 26, col: C.gold });
    return r;
  }
  const c2Stir = order({ cut: 'c2Stir', who: 'drg', paint: drgStir, word: 'STIR IT!', col: '#18A86B', cam: {}, side: 1, dir: -1 });
  const c2Heard = (t, lt, dur) => { heard(t, lt, dur, { cut: 'c2Heard', side: -1 }); N9.confetti(t, CUT.c2Heard, 80, 5); };
  const c2Stuff2 = order({ cut: 'c2Stuff2', who: 'alma', kind: 'bird', label: 'STUFFING', col: C.magenta, word: 'STUFF IT!', cam: { d: 260, x: -30, eye: 100, feetY: 1000 }, side: -1, bird: t => ({ roast: .1, stuff: .8 + .2 * seg(t, CUT.c2Stuff2, CUT.c2Stuff2 + .6) }), birdS: .55, birdX: 30, o: { power: 1, eyes: 'star' }, floor: 'rush' });
  const c2Baste2 = order({ cut: 'c2Baste2', who: 'jenna', kind: 'baste', label: 'BUTTER', col: C.orange, word: 'OH YEAH!', cam: { d: 290, x: 40, eye: 120, feetY: 1000 }, side: 1, dir: -1, stuffK: 1, roast: .15, floor: 'rush' });
  // the guests' 2×2: each a solo dancing close-up
  function solo(t, who, move, o = {}) {
    const b = bpos(t), h = HT[who] ?? 160;
    return S.stage(t, { d: h * 1.9, z: 0, eye: 100, feetY: 960, x: 0 }, { floor: o.floor ?? 'rush', jets: beatJets(.7), crowdUp: 1, roll: .03 * Math.sin(b * Math.PI / 2), zoom: 1.04 }, () => [{ who, x: 0, z: 0, id: who, o: { ...groove(who, move, b, 1), ...(o.o || {}) } }]);
  }
  function c2Quad(t, lt, dur) {
    const four = [['neptune', 'bounce', { trident: true, power: .6 }], ['dragon', 'cheer', {}], ['pearl', 'bounce', { flip: true }], ['jester', 'disco', {}]];
    X.fillStyle = C.tvNavy; X.fillRect(0, 0, W, H);
    TT.split(four.map(([w, m, o], i) => { const q = TT.QUAD[i], [cx, cy] = TT.ctr(q), a = easeOut(seg(lt, i * BEAT * .5, i * BEAT * .5 + .2)); if (a < .02) return null;
      return { clip: q, cx: cx + (1 - a) * (i % 2 ? 900 : -900), cy, sc: .52, fn: () => solo(t, w, m, { o }) }; }).filter(Boolean), { lw: 12, edge: C.cyan });
    slam('CRISPY!', 560, 300, 150, C.gold, t, CUT.c2Quad + .1, .9, -.08, { flash: false }); slam('JUICY!', 1360, 800, 150, C.orange, t, CUT.c2Quad + .5, .9, .08, { flash: false });
  }
  // From high above: the brigade in a ring round the turkey table, hands up, the ring turning.
  function c2Hands(t, lt, dur) {
    const b = bpos(t), ring = ['prof', 'housam', 'neptune', 'danny', 'drg', 'alma', 'dragon', 'jenna', 'roud', 'jester', 'pearl', 'doc'];
    S.stage(t, { d: 820, z: 200, eye: 900, feetY: 640, x: 0 }, { floor: 'rush', jets: beatJets(1), crowdUp: 1, roll: .1 * Math.sin(lt * .8), zoom: 1.0 + .08 * ease(lt / dur), beams: .8 }, () => [
      ...ring.map((w, i) => { const a = i / ring.length * TAU + lt * .7, x = 360 * Math.cos(a), z = 200 + 240 * Math.sin(a); return { who: w, x, z, id: w, o: { ...groove(w, 'cheer', b, 1, i), ...(w === 'pearl' || w === 'neptune' ? { flip: Math.cos(a) > 0 } : {}) } }; }),
      { z: 200, draw: P => { const [x, y, k] = P.p(0, 0, 200); shape(ellPts(x, y - 40 * k, 150 * k, 60 * k, 30), { fill: '#3A1670', stroke: C.ink, lwPx: 4 }); TT.turkey(x, y - 55 * k, k * .8, { roast: .2, stuff: 1, truss: .5, gloss: .4, t }); } },
    ]);
    slam('HANDS UP!', W / 2, 190, 200, C.cyan, t, CUT.c2Hands + .05, 1.6, .03);
    N9.cannon(0, H, -1.0, lt, 0, 44, 3); N9.cannon(W, H, -2.14, lt, 0, 44, 4);
  }
  const c2Fuss = (t, lt, dur) => fuss(t, lt, dur, every('bounce').filter((_, i) => i < 9).map(([w, x, z, m, e]) => [w, x * 1.05, z, m, e]), { fireworks: true });

  // ======================= KITCHEN RUSH =======================
  const RUSHW = ['CHOP!', 'STIR!', 'BASTE!', 'TASTE!'], RUSHC = [C.lime, '#18A86B', C.orange, C.gold];
  function rushSlam(t, i) { const h = HIT.rush[i]; slam(RUSHW[i], W / 2, 220, 300, RUSHC[i], t, h, 1.5, (i % 2 ? .06 : -.06), { glow: '#FFFFFF' }); TT.speedLines(t, W / 2, H / 2, kickK(t, h, 3), { r0: 500 }); }
  function rChop(t, lt, dur) {
    const three = [['housam', C.lime], ['jester', C.magenta], ['danny', C.orange]];
    TT.split(three.map(([w, col], i) => { const q = TT.SPLIT3[i], [cx] = TT.ctr(q);
      return { clip: q, cx, cy: H / 2, sc: .72, fn: () => station(t, { who: w, kind: 'chop', label: 'CHOP', col, cam: { d: lerp(280, 230, lt / dur), x: 0, eye: 110, feetY: 1060, roll: .06 * Math.sin(t * 3 + i) }, w: 200, floor: 'rush' }) }; }), { lw: 14, edge: C.lime });
    rushSlam(t, 0);
  }
  function rStir(t, lt, dur) {
    const b = bpos(t);
    const r = S.stage(t, { d: lerp(480, 380, lt / dur), x: 0, z: 70, eye: 300, feetY: 900 }, { floor: 'rush', jets: beatJets(1), crowdUp: 1, roll: .12 * Math.sin(lt * 2.4), zoom: 1.05 * zoomKick(lt, .14, 6) }, () => [
      { who: 'drg', x: -200, z: 90, o: { holdR: 'spoon', handR: [5.5 + 2 * Math.cos(b * Math.PI * 2), -20], handL: [-4.4, -16], mouth: 'open', eyes: 'happy', brows: 'up' } },
      { who: 'alma', x: 170, z: 110, y: RISER('alma'), o: { ...groove('alma', 'twirl', b, 1), power: 1, eyes: 'star' } },
      { z: -10, draw: P => S.counter(P, 0, -10, 420, { h: CH, label: 'STIR STATION', col: '#18A86B' }) },
    ]);
    const [tx, ty, kk] = r.P.p(-30, CH, 25); TT.pot(t, tx, ty, kk * 1.3, b, { soup: '#D9A65A' });
    X.save(); X.globalCompositeOperation = 'lighter'; for (let i = 0; i < 5; i++) { X.beginPath(); X.ellipse(tx, ty - 60 * kk * 1.3, (60 + i * 50) * kk, (16 + i * 13) * kk, 0, t * 6 + i, t * 6 + i + 2); X.strokeStyle = rgba(C.gold, .5 - i * .08); X.lineWidth = 8; X.stroke(); } X.restore();
    rushSlam(t, 1);
  }
  function rBaste(t, lt, dur) {
    TT.split([
      { clip: TT.SPLIT2[0], cx: 470, cy: H / 2, sc: .9, fn: () => station(t, { who: 'jenna', kind: 'baste', label: 'BASTE', col: C.orange, cam: { d: 270, x: 0, eye: 110, feetY: 1000, roll: -.05 }, stuffK: 1, roast: .2, floor: 'rush' }) },
      { clip: TT.SPLIT2[1], cx: 1420, cy: H / 2, sc: .9, fn: () => nepBaste(t, { cam: {}, jets: beatJets(.8) }) },
    ], { lw: 14, edge: C.orange });
    rushSlam(t, 2);
  }
  function rTaste(t, lt, dur) {
    const b = bpos(t), bite = HIT.rush[3] + .35;
    const { A } = S.stage(t, { d: lerp(330, 270, lt / dur), z: 120, eye: 200, feetY: 880 }, { floor: 'rush', jets: beatJets(.8), crowdUp: 1, zoom: 1.05 * zoomKick(lt, .14, 6), screen: 'logo' }, () => [
      { who: 'pearl', x: -40, z: 110, y: 40, id: 'pearl', o: { sit: 1, headTilt: t > bite ? .3 : .1, eyes: t > bite + .2 ? 'happy' : 'open', mouth: t > bite + .2 ? 'smile' : 'o', wag: .6 * Math.sin(b * Math.PI * 2), crownLift: .6 * kickK(t, bite + .2, 3) } },
      { who: 'doc', x: 260, z: 140, id: 'doc', o: { ...bossy('doc', b), handL: hand('doc', -1, .1, 1), handPoseL: 'fist', mouth: 'grin' } },
      { z: 60, draw: P => TT.judgesDesk(P, 0, 60, 460) },
    ]);
    if (A.doc && A.pearl) { const sx = lerp(A.doc.handL[0], A.pearl.mouth[0] + 40, ease(seg(t, HIT.rush[3], bite))), sy = lerp(A.doc.handL[1], A.pearl.mouth[1], ease(seg(t, HIT.rush[3], bite)));
      line([[A.doc.handL[0], A.doc.handL[1]], [sx, sy]], { stroke: C.ink, lwPx: 12 }); line([[A.doc.handL[0], A.doc.handL[1]], [sx, sy]], { stroke: '#DDE5EE', lwPx: 8 });
      ellipse(sx, sy, 34, 18, { fill: '#DDE5EE', stroke: C.ink, lwPx: 4 }); if (t < bite) ellipse(sx, sy - 6, 24, 10, { fill: '#C9984F', stroke: null });
      for (let i = 0; i < 3; i++) N9.pop('heart', A.pearl.head[0], A.pearl.head[1] - 60, t - bite - .2 - i * .3, 220, 7, i, [C.magenta, C.pink, '#FFFFFF'], 24); }
    if (t > bite + .2) slam('MMM!', 1450, 520, 170, C.pink, t, bite + .2, 1.0, .08, { flash: false });
    rushSlam(t, 3);
  }
  // The kids' double-time round: eight cuts, one a word, and the bird visibly comes together (TURKEY-O-METER fills).
  const MONT = [
    { who: 'danny', kind: 'bird', w: 'FASTER!', bird: { roast: 0 } },
    { who: 'jenna', kind: 'baste', w: 'TASTE!', at: 93.4, bird: null, stuffK: .4 },
    { who: 'housam', kind: 'chop', w: 'CHOP!', bird: { stuff: .4 } },
    { who: 'alma', kind: 'stuff', w: 'STIR!', bird: null },
    { who: 'jenna', kind: 'baste', w: 'BASTE!', bird: null, stuffK: 1, roast: .1 },
    { who: 'danny', kind: 'bird', w: 'TASTE!', bird: { stuff: 1, truss: .6 } },
    { who: 'housam', kind: 'bird', w: 'YEAH!', bird: { stuff: 1, truss: 1, gloss: .5 } },
    { who: 'alma', kind: 'bird', w: null, bird: { stuff: 1, truss: 1, gloss: 1, roast: .15 } },
  ];
  function montage(t, lt, dur) {
    const i = clamp(HIT.rush2.filter(h => t >= h).length - 1, 0, 7), m = MONT[i], h = HIT.rush2[i], l2 = t - h, wAt = m.at ?? h;
    station(t, { who: m.who, kind: m.kind, label: { chop: 'CHOP', stuff: 'STIR', baste: 'BASTE', bird: 'TASTE' }[m.kind], col: RUSHC[i % 4], floor: 'rush', bird: m.bird ? { ...m.bird, t } : null, birdS: .6, birdX: m.kind === 'chop' ? 70 : 20, propX: m.kind === 'chop' ? -50 : 0,
      stuffK: m.stuffK, roast: m.roast, cam: { d: 230 + 30 * (i % 3), x: (i % 2 ? 40 : -40), eye: 90 + 40 * (i % 2), feetY: 990, roll: (i % 2 ? .08 : -.08), zoom: 1.04 * zoomKick(l2, .18, 8) }, shakes: [[h, 16]], jets: jetsAt([[h, i % 2 ? 1 : -1, 1]]) });
    if (m.w && t >= wAt) slam(m.w, i % 2 ? 1300 : 500, i % 2 ? 380 : 230, 230, RUSHC[i % 4], t, wAt, (HIT.rush2[i + 1] ?? CUT.ready) - wAt, (i % 2 ? .07 : -.07));
    TT.whip(t, l2, i % 2 ? -1 : 1, .1);
    // the TURKEY-O-METER
    const p = clamp((lt + .6) / dur);
    overlay(() => { X.save(); X.translate(W - 520, 150); TT.pill(0, 0, 480, 90, 'rgba(20,10,46,.85)', C.gold, 4); txt('TURKEY-O-METER', 26, 30, 28, C.gold, { stroke: C.ink, lw: 5 });
      X.fillStyle = '#2B2440'; X.fillRect(26, 52, 428, 24); X.fillStyle = linGrad(26, 0, 454, 0, [[0, '#F6CDBE'], [1, C.roast]]); X.fillRect(26, 52, 428 * p, 24); txt(`${Math.round(p * 100)}%`, 440, 30, 30, '#FFFFFF', { align: 'right', stroke: C.ink, lw: 5 }); X.restore(); });
  }

  // ======================= THE BUILD =======================
  function bStuffing(t, lt, dur) {
    const b = bpos(t), k = seg(lt, 0, dur);
    const { A, P } = S.stage(t, { d: lerp(300, 250, lt / dur), z: 70, eye: 160, feetY: 980, x: 40 }, { floor: 'show', jets: beatJets(.6), crowdUp: 1, roll: .03 * Math.sin(b * Math.PI / 2) }, () => [
      { who: 'doc', x: -120, z: 100, id: 'doc', o: { ...bossy('doc', b), handR: atC('doc', 4.5, 2 + 2 * Math.abs(Math.sin(b * Math.PI))), handPoseR: 'fist', mouth: talk(t, CUT.bStuffing, CUT.bDial - .1, 'grin'), power: .6 } },
      { z: -10, draw: P => S.counter(P, 60, -10, 340, { h: CH, label: 'FINAL STUFFING', col: C.magenta }) },
    ]);
    const bird = birdOn(P, 70, .7, { stuff: lerp(.5, 1, k), truss: 1, gloss: .6, roast: .15, t });
    if (A.doc) { const [hx, hy] = A.doc.handR; line([[hx, hy], [bird.center[0] - 30, bird.center[1] + 30]], { stroke: C.ink, lwPx: 12 }); line([[hx, hy], [bird.center[0] - 30, bird.center[1] + 30]], { stroke: '#DDE5EE', lwPx: 8 }); ellipse(bird.center[0] - 30, bird.center[1] + 30, 30, 16, { fill: '#C9984F', stroke: C.ink, lwPx: 3 }); }
    ['BREAD', 'HERBS', 'LOVE'].forEach((w, i) => { const at = CUT.bStuffing + .6 + i * .4; slam(w, 1250 + i * 0, 220 + i * 120, 110, [C.gold, C.lime, C.pink][i], t, at, dur - .6 - i * .4, (i - 1) * .05, { flash: false }); if (i === 2) N9.pop('heart', 1250, 460, t - at, 200, 8, 2, [C.magenta, C.pink], 24); });
    TT.whip(t, lt, 1);
  }
  function bDial(t, lt, dur) {
    const v = ease(seg(lt, .05, .6)), deg = Math.round(lerp(0, 350, v));   // lands on 350 as the line sings it, then holds
    const r = S.stage(t, { d: lerp(420, 360, lt / dur), z: 80, eye: 140, feetY: 880, x: -60 }, { floor: 'red', jets: beatJets(.6), crowdUp: 1, zoom: 1.04, screen: 'count', count: deg }, () => [
      { who: 'prof', x: -230, z: 110, id: 'prof', o: { ...bossy('prof', bpos(t)), mouth: talk(t, CUT.bDial, CUT.bDoor - .1, 'smirk'), handR: hand('prof', 1, .15, 1), handPoseR: 'fist', eyes: 'glow', power: .7 } },
      { z: 60, draw: P => { const [ox, oy, k] = P.p(110, 0, 60); return TT.oven(ox, oy, k, { door: 0, glow: .5 + .5 * v, temp: `${deg}°`, dial: .7 * v }); }, id: 'oven' },
    ]);
    // the dial in a big inset circle
    overlay(() => { const k = backOut(seg(lt, 0, .25)); X.save(); X.translate(1500, 420); X.scale(k, k); circle(0, 0, 250, { fill: '#1A1430', stroke: C.gold, lwPx: 10 }); TT.dial(0, 0, 200, .7 * v, t); X.restore();
      txt(`${deg}°`, 1500, 740, 130 * k, '#FF5A3A', { align: 'center', stroke: C.ink, lw: 16, glow: '#FF5A3A' }); });
    if (lt > 1.15) slam('NOT ONE DEGREE ABOVE!', 760, 200, 100, C.gold, t, CUT.bDial + 1.15, .7, -.03, { flash: false });
    TT.whip(t, lt, -1);
  }
  function bDoor(t, lt, dur) {
    const b = bpos(t), push = ease(seg(lt, 0, .7)), shut = CUT.bDoor + .95, door = t < shut - .25 ? 1 : 1 - easeIn(seg(t, shut - .25, shut));
    const r = S.stage(t, { d: lerp(760, 640, lt / dur), z: 150, eye: 130, feetY: 900 }, { floor: 'red', jets: jetsAt([[shut, 0, 1]]), crowdUp: 1, shakes: [[shut, 30]], zoom: 1.03 * zoomKick(t - shut, .1, 6), screen: 'logo' }, () => [
      { z: 230, draw: P => { const [ox, oy, k] = P.p(0, 0, 230); return TT.oven(ox, oy, k * 1.15, { door, glow: .8, temp: '350°', dial: .7, inside: (cx, cy, s) => { if (push > .95 || door < 1) TT.turkey(cx, cy, s * .55, { stuff: 1, truss: 1, gloss: .7, roast: .15, platter: true, t }); } }); }, id: 'oven' },
      { who: 'housam', x: lerp(-260, -120, push), z: 120, id: 'h', o: t < shut ? { handR: hand('housam', 1, .1, 1), handL: hand('housam', -1, .15, 1), lean: .1, mouth: 'open', eyes: 'happy' } : groove('housam', 'cheer', b, 1) },
      { who: 'danny', x: lerp(260, 120, push), z: 120, id: 'd', o: t < shut ? { handR: hand('danny', 1, .15, 1), handL: hand('danny', -1, .1, 1), lean: -.1, mouth: 'open', eyes: 'happy' } : groove('danny', 'cheer', b, 1) },
      ...['alma', 'jenna', 'jester', 'neptune', 'dragon', 'prof', 'doc'].map((w, i) => ({ who: w, x: (i - 3) * 190, z: -40 - (i % 2) * 40, id: w, o: { ...groove(w, t > shut ? 'cheer' : 'clap', b, 1, i), ...(w === 'neptune' ? { flip: i > 3 } : {}) } })),
    ]);
    // the tray going in, before the door shuts
    if (push < .95 && r.A.oven) { const [cx, cy] = r.A.oven.door; TT.turkey(cx, cy - 10 + (1 - push) * 120, (r.P.k(230) * 1.15) * .55, { stuff: 1, truss: 1, gloss: .7, roast: .15, t }); }
    slam('SLAM!', 1460, 260, 180, C.gold, t, shut, .8, .07);
    slam('EVERYBODY SHOUT!', W / 2, 160, 130, C.tvRed, t, shut + .3, .8, -.03, { flash: false });
  }
  function bScience(t, lt, dur) {
    const b = bpos(t);
    const { A } = chefCU(t, 'prof', { d: lerp(330, 280, lt / dur), x: 160, talk: true, screen: 'eq', o: (tt, bb) => ({ power: 1, eyes: 'glow', bulb: 1, handR: hand('prof', 1, 1.0, 1), handPoseR: 'point', handL: hand('prof', -1, .3, 1), handPoseL: 'palm' }) });
    if (A.chef) safadiBoard(A.chef.head[0] + 330, 260, 560, seg(lt, .05, 1.5), t, { kind: 'graph', title: 'GOLDEN TIME' });
    // the oven timer card counting down to the countdown
    overlay(() => { const k = backOut(seg(lt, .2, .45)), left = Math.max(0, CUT.countdown - t + 5); X.save(); X.translate(1500, 820); X.scale(k, k); TT.pill(-230, -70, 460, 140, 'rgba(20,10,46,.9)', C.tvRed, 6);
      txt(`0:${String(Math.ceil(left)).padStart(2, '0')}`, 0, 4, 100, '#FF3B3B', { align: 'center', font: '"Courier New", monospace', weight: 700, glow: '#FF3B3B' }); X.restore(); });
    TT.whip(t, lt, 1);
  }
  // FIVE … ONE: one angle per number, the camera and lights winding up, the numbers slamming huge.
  function countdown(t, lt, dur) {
    const C5 = HIT.count, hold = t >= HIT.hold, i = hold ? 1 : C5.filter(h => t >= h).length - 1, h = hold ? HIT.hold : C5[Math.max(0, i)], l2 = t - h, b = bpos(t), wind = lt / dur, n = hold ? 0 : 5 - Math.max(0, i), hk = seg(t, HIT.hold, CUT.ding);
    const NUM = ['FIVE!', 'FOUR!', 'THREE!', 'TWO!', 'ONE!'], NC = [C.cyan, C.lime, C.gold, C.orange, C.tvRed];
    const common = { floor: 'red', screen: 'count', count: n, jets: jetsAt([[h, 0, .9]]), crowdUp: 1, shakes: [[h, 18 + 8 * i]], beams: .4 + .6 * wind, roll: (.03 + .08 * wind) * Math.sin(lt * (2 + 3 * wind)), zoom: 1.04 * zoomKick(l2, .16, 6), energy: .7 + .3 * wind };
    const ovenItem = (x, z, sc, glow) => ({ z, draw: P => { const [ox, oy, k] = P.p(x, 0, z); return TT.oven(ox, oy, k * sc, { door: 0, glow, temp: '350°', dial: .7, window: (cx, cy, s) => TT.turkey(cx, cy, s * .5, { stuff: 1, truss: 1, gloss: .7, roast: .15 + .6 * wind, platter: true, t }) }); } });
    if (i <= 0) lineUp(t, lt, [['prof', -480, 60, 'clap'], ['housam', -290, 110, 'clap'], ['danny', -120, 130, 'clap'], ['alma', 120, 130, 'clap'], ['jenna', 290, 110, 'clap'], ['doc', 480, 60, 'clap']],
      { d: 900, z: 150, eye: 140, feetY: 900 }, { ...common, under: P => { const it = ovenItem(0, 330, 1.3, .9); it.draw(P); } });
    else if (i === 1) S.stage(t, { d: lerp(260, 170, hold ? easeIn(hk) : 0), z: 100, eye: 130, feetY: 1050, x: hold ? 5 * hk * Math.sin(t * 55) : 0 }, { ...common, ...(hold ? { screen: 'count', count: '…' } : {}) }, () => [ovenItem(0, 100, 1.2, 1)]);
    else if (i === 2) heard(t, l2, 2, { cut: 'countdown', side: 1, word: null });
    else if (i === 3) { const r = chefCU(t, 'prof', { d: 380, x: 110, feetY: 1010, talk: false, ...common, o: () => ({ eyes: 'wide', brows: 'up', mouth: 'teeth', handL: hand('prof', -1, 1.3, .6), handR: hand('prof', 1, 1.3, .6), handPoseL: 'fist', handPoseR: 'fist', jump: .6 * Math.abs(Math.sin(b * Math.PI * 2)) }), extra: [{ who: 'doc', x: 230, z: 30, o: { eyes: 'wide', brows: 'up', mouth: 'teeth', handL: hand('doc', -1, 1.3, .6), handR: hand('doc', 1, 1.3, .6), handPoseL: 'fist', handPoseR: 'fist', jump: .6 * Math.abs(Math.sin(b * Math.PI * 2 + 1)) } }] }); void r; }
    else lineUp(t, lt, every('clap', {}).map(([w, x, z, m, e]) => [w, x, z, (bb, j) => ({ ...groove(w, 'bounce', bb, 1, j), sq: .1, dy: 1.2 }), e]), { d: 1100, z: 200, eye: 60, feetY: 880 }, { ...common, under: P => ovenItem(0, 520, 1.4, 1).draw(P) });
    if (hold) overlay(() => bigText('WAIT FOR IT' + '.'.repeat(1 + Math.floor(hk * 3.99)), W / 2, 250, 170, '#FFFFFF', slamK(t, h) * (1 + .1 * hk), -.03, { glow: C.tvRed }));
    else if (t >= C5[0]) overlay(() => bigText(NUM[i], W / 2, 330, 330 + 40 * i, NC[i], slamK(t, h) * (1 + .06 * beatK(t)), (i % 2 ? .06 : -.06), { glow: '#FFFFFF' }));
    flash(.4 * kickK(t, h, 10));
    TT.speedLines(t, W / 2, H / 2, .3 + .7 * wind, { r0: 600 - 200 * wind, col: i >= 3 ? C.gold : '#FFFFFF' });
    TT.whip(t, l2, i % 2 ? -1 : 1, .1);
  }

  // The slow reprise of "Everybody's cooking and nobody's a guest!" (the camera cranes back up) and, after the montage, the brigade cheering the dressed bird.
  const brigade2 = (t, lt, dur) => brigade(t, lt, dur, { back: true, move: 'cheer', word: "NOBODY'S A GUEST!", at: HIT.guest });
  function ready(t, lt, dur) {
    lineUp(t, lt, every('cheer'), { d: lerp(900, 760, ease(lt / dur)), z: 200, eye: 140, feetY: 920 }, { floor: 'rush', beams: 1, jets: beatJets(1), crowdUp: 1, crowdLit: true, roll: .03 * Math.sin(bpos(t) * Math.PI / 2),
      under: P => { const [x, y, k] = P.p(0, 0, 60); shape(ellPts(x, y - 40 * k, 170 * k, 60 * k, 30), { fill: '#3A1670', stroke: C.ink, lwPx: 4 }); TT.turkey(x, y - 55 * k, k * .9, { roast: .15, stuff: 1, truss: 1, gloss: 1, t }); } });
    slam('READY FOR THE OVEN!', W / 2, 190, 140, C.gold, t, CUT.ready + .1, dur - .2, -.03, { glow: C.orange });
    N9.cannon(0, H, -1.0, lt, 0, 50, 3); N9.cannon(W, H, -2.14, lt, 0, 50, 4); N9.confetti(t, CUT.ready, 80, 6);
    TT.whip(t, lt, 1);
  }

  return { neptune: neptuneShot, dragonOven, fester, pearlJudge, drgRules, roudCode, brigade, brigade2, ready, yesChef2,
    c2Stuff, c2Baste, c2Golden, c2Chop, c2Stir, c2Heard, c2Stuff2, c2Baste2, c2Quad, c2Hands, c2Fuss,
    rChop, rStir, rBaste, rTaste, montage, bStuffing, bDial, bDoor, bScience, countdown,
    _b: { HT, guest, birdOn, solo, every, EVERY, FACE, RUSHC } };
})());
