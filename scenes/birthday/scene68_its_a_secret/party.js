// scenes/birthday/scene68_its_a_secret/party.js: the surprise and the party (111.95–156.8 s), one continuous stage in the block
// meadow: the year-tower in the middle, block stacks around it hiding the whole cast.
//   111.95  countdown   giant 3 · 2 · 1 on the sung numbers; the tower shakes; push in on Danny
//   115.6   surprise    HAPPY BIRTHDAY!: the tower blasts apart into a seven-layer cake; the stacks burst and the whole cast
//                       jumps out; confetti cannons; Dragon and Clawd unfurl the banner
//   119.92  cake        everyone jumps on every HEY!; the twins bring a cloche: real cake. "Today… is SUGAR DAY!"
//   127.89  lift        Housam hoists Danny; Pearl's paper crown flies onto his head; fireworks on HOORAY
//   131.87  blockParty  night falls, Alma's rainbow floor, everybody dances (Dan-ny! Dan-ny!)
//   135.86  dannyMove   Danny tosses the Rubik's cube, solves it on the catch: PUGGLE!
//   139.84  jump        Everybody JUMP!
//   143.83  specials    a special move per beat, fireworks overhead
//   147.81  bonk        Fester juggles candles… BONK. "…story of my life." Everyone laughs.
//   151.4   finale      the cast crowds the lens and points past it: LOOK · BEHIND · YOU! A firework 7. THE END.
Object.assign(SECRET_SHOTS, (() => {
  const { C, FIRE, bigText, slamK, kickK, on, burst, confetti, cake } = SECRET_SHOTS._kit;
  const { RIG: RIG0, yearBlock, candle, TB, B, hop, bpos, BEAT } = SECRET_SHOTS._game;
  const RIG = { ...RIG0, pearl: [pearl, PP_UNIT] };
  const KP = 1.7;
  const put = (who, x, y, o = {}, k = KP) => RIG[who][0](x, y, RIG[who][1] * k, { t: T, ...o });
  const T0 = 111.95, NUMS = [112.40, 113.60, 114.70], SURPRISE = 115.6, HEYS = [117.70, 119.70, 125.74, 127.66], CAKE = 119.92, CLOCHE = 122.2, SUGAR = 122.9;
  const LIFT = 127.89, CROWN = 129.0, HOORAY = 130.69, PARTY = 131.87, MOVE = 135.86, TOSS = 136.4, CATCH = 137.8, JUMP = 139.84, JUMPS = [140.9, 142.3, 142.86, 143.24];
  const SPECIALS = 143.83, BONKP = 147.81, BONKT = 149.8, FINALE = 151.4, WORDS = [[151.52, 'LOOK'], [152.77, 'BEHIND'], [153.34, 'YOU!']], SEVEN = 154.2, THEEND = 155.5, END = 156.8;
  const CX = 1000;                                                         // the tower / cake
  const POS = { safadi: 130, sami: 290, jester: 450, housam: 600, danny: 770, alma: 1250, jenna: 1390, robo: 1545, neptune: 1720, pearl: 1860 };
  const STACKS = [[130, 2], [290, 2], [450, 2], [600, 2], [1250, 2], [1390, 2], [1545, 2], [1720, 2], [1860, 2]];
  const beatHop = (t, ph = 0) => hop(t, ph);
  const jumpOn = (t, times, h = 2.2) => times.reduce((a, j) => Math.max(a, t > j - .08 && t < j + .42 ? h * Math.sin(Math.PI * seg(t, j - .08, j + .42)) : 0), 0);

  // ---------- each character's pose for the moment ----------
  function poseFor(who, t, i) {
    const laugh = on(t, BONKT + .2, FINALE, .2), party = t > PARTY && t < FINALE, specials = t > SPECIALS && t < BONKP;
    const spec = specials ? Math.floor((t - SPECIALS) / BEAT) : -1;
    const hey = jumpOn(t, [...HEYS, ...JUMPS]) + (t > JUMP && t < SPECIALS ? 1.2 * beatHop(t, i * .07) : 0);
    const cheer = { handL: [-4.6, -19], handR: [4.6, -19], handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'open' };
    const dance = (k = 1) => ({ handL: [-5, -17 + 4 * Math.sin(bpos(t) * Math.PI + i)], handR: [5, -17 - 4 * Math.sin(bpos(t) * Math.PI + i)], handPoseL: 'fist', handPoseR: 'fist', eyes: 'happy', mouth: 'grin', jump: .9 * k * beatHop(t, i * .1), tilt: .1 * Math.sin(bpos(t) * Math.PI * .5 + i) });
    let o = { ...cheer, jump: hey };
    if (party) o = { ...dance(), jump: Math.max(hey, .9 * beatHop(t, i * .1)) };
    if (laugh > 0) o = { ...o, eyes: 'happy', mouth: 'open', tilt: .12 * Math.sin(t * 14 + i), jump: 0 };
    // per character
    if (who === 'alma' && party) o = { ...almaDance(t, ['disco', 'twirl', 'star jump', 'floss'][Math.floor((t - PARTY) / 4) % 4], { bpm: 120.45 }), power: 1, eyes: 'star', mouth: 'grin' };
    if (who === 'jenna' && party) o = { ...jennaDance(t, ['bounce', 'disco', 'twirl', 'star jump'][Math.floor((t - PARTY) / 4) % 4], { bpm: 120.45 }), eyes: 'happy', mouth: 'grin' };
    if (who === 'neptune') o = { sit: 1, trident: true, mouth: 'laugh', eyes: 'happy', dy: -hey, power: Math.max(on(t, HOORAY - .2, HOORAY + 1.2, .2), spec === 3 || spec === 7 ? 1 : 0), tridentAng: -1.3 + .3 * Math.sin(t * 3), flip: true };
    if (who === 'pearl') o = { sit: 1, mouth: t > SURPRISE ? 'open' : 'smile', eyes: 'happy', flip: true, dy: -hey * .6, headTilt: .1 * Math.sin(t * 4), point: on(t, CROWN - .4, CROWN + .9, .2), pointAng: -.6 };
    if (who === 'robo') o = { ...o, hum: false, eyes: party ? 'heart' : 'happy', scan: spec === 2 || spec === 7 ? 1 : 0, red: spec === 2 ? .6 : 0 };
    if (who === 'safadi' || who === 'sami') o = { ...o, power: spec === (who === 'safadi' ? 0 : 1) || spec === 7 ? 1 : 0 };
    if (who === 'jester') {
      if (t > BONKP - .2 && t < BONKT + .1) o = { handL: [-4.4, -14 - 3 * Math.max(0, Math.sin(t * 9))], handR: [4.4, -14 - 3 * Math.max(0, -Math.sin(t * 9))], handPoseL: 'cup', handPoseR: 'cup', lookY: -.9, eyes: 'open', mouth: 'grin' };
      if (t > BONKT && t < FINALE) o = { eyes: t < BONKT + 1.2 ? 'swirl' : 'happy', stars: on(t, BONKT, BONKT + 1.6, .1), mouth: t < BONKT + 1.2 ? 'wobble' : 'smirk', handL: [-4.4, -13.2], handR: [4.4, -13.2], tilt: .12, hatAskew: .2 };
    }
    if (t > FINALE && who !== 'neptune' && who !== 'pearl') o = { ...o, handR: [3.5, -17], handPoseR: who === 'jester' ? 'open' : 'point', eyes: 'happy', mouth: 'open', jump: .6 * beatHop(t, i * .1), stars: 0 };
    return o;
  }

  function stage(t) {
    // sky: dusk → party pink after the surprise → night for the dance
    const night = seg(t, PARTY - .4, PARTY + .4), pink = seg(t, SURPRISE, SURPRISE + .5);
    const sky0 = mixCol(mixCol('#3A1A7A', '#FF4FA8', pink), '#120A33', night), sky1 = mixCol(mixCol('#FF7A3D', '#FFC94D', pink), '#4A1A80', night);
    const gy = dmBlockWorld(t, B, { ox: 52000, sky0, sky1 });
    if (night > 0) { X.save(); X.globalAlpha = night; dmStars(t, 120, -20, 0); X.restore(); }
    if (t > SURPRISE) { X.save(); X.translate(CX, gy - 300); X.rotate(t * .3); for (let i = 0; i < 18; i++) { X.rotate(TAU / 18); X.fillStyle = rgba('#FFFFFF', .06 + .06 * pulse(t, 5)); X.beginPath(); X.moveTo(0, 0); X.lineTo(1500, -90); X.lineTo(1500, 90); X.fill(); } X.restore(); }
    return gy;
  }

  function party(t) {
    const push = t < SURPRISE ? ease(seg(t, T0, SURPRISE)) : 1 - ease(seg(t, SURPRISE, SURPRISE + .35));
    const fin = ease(seg(t, FINALE, FINALE + 1.2));
    const [sx0, sy0] = shakeXY(t, 6 * seg(t, T0, SURPRISE) * (t < SURPRISE ? 1 : 0) + 30 * kickK(t, SURPRISE, 5) + 10 * kickK(t, BONKT, 8));
    X.save();
    const zoom = 1 + .28 * push + .3 * fin, zc = t < SURPRISE ? [POS.danny + 60, 470] : t > FINALE ? [W / 2, 120] : [W / 2, 520];
    X.translate(zc[0] + sx0, zc[1] + sy0); X.scale(zoom, zoom); X.translate(-zc[0], -zc[1]);
    const gy = stage(t);
    // the tower (until it blasts apart), then the cake springing up
    if (t < SURPRISE + 1.2) for (let i = 0; i < 7; i++) {
      const x0 = CX - TB / 2, y0 = gy - (i + 1) * TB, u = Math.max(0, t - SURPRISE);
      const [rx, ry] = t < SURPRISE ? shakeXY(t + i, 4 + 10 * seg(t, T0, SURPRISE)) : [0, 0];
      const a = (i % 2 ? 1 : -1) * (.6 + .4 * hash(i)), vx = a * 900, vy = -700 - 300 * hash(i * 3);
      X.save(); X.translate(x0 + TB / 2 + rx + vx * u, y0 + TB / 2 + ry + vy * u + 1400 * u * u); X.rotate(a * 6 * u); yearBlock(i, -TB / 2, -TB / 2, TB, t); X.restore();
    }
    if (t < SURPRISE) { circle(CX, gy - 3.5 * TB, 300 + 80 * pulse(t, 4), { fill: radGrad(CX, gy - 3.5 * TB, 0, 360, [[0, rgba('#FFF2A8', .7)], [1, 'rgba(255,240,160,0)']]), stroke: null }); }
    const ck = backOut(seg(t, SURPRISE + .05, SURPRISE + .5));
    if (ck > 0) { X.save(); X.translate(CX, gy); X.scale(ck, ck); cake(0, 0, 44, t); X.restore(); }
    // the hiding stacks, which burst apart on the surprise
    STACKS.forEach(([x, h], si) => { for (let j = 0; j < h; j++) for (let k = 0; k < 2; k++) {
      const u = Math.max(0, t - SURPRISE - .02 * si); if (u > 1.4) continue;
      const vx = (k ? 1 : -1) * (300 + 200 * hash(si + j)), vy = -500 - 300 * hash(si * 3 + j);
      X.save(); X.translate(x - B / 2 + k * B / 2 + B / 4 + vx * u, gy - (j + .5) * B * .8 + vy * u + 1500 * u * u); X.rotate((k ? 1 : -1) * 5 * u); dmBlock(-B * .4, -B * .4, B * .8, j ? 'leaf' : 'wood'); X.restore();
    } });
    // the cast
    const out = t > SURPRISE, order = ['pearl', 'neptune', 'robo', 'jenna', 'alma', 'safadi', 'sami', 'jester', 'housam'];
    const A = {};
    if (out) order.forEach((who, i) => {
      const leap = seg(t, SURPRISE + .03 * i, SURPRISE + .6 + .03 * i), jy = 260 * Math.sin(Math.PI * leap) * (leap < 1);
      let x = POS[who], o = poseFor(who, t, i);
      // the twins bring the cloche to Danny
      if ((who === 'safadi' || who === 'sami') && t > CAKE && t < LIFT) { const f = ease(seg(t, CAKE, CLOCHE - .2)) * (1 - ease(seg(t, 126.2, LIFT))); x = lerp(POS[who], who === 'safadi' ? 900 : 1080, f); if (f > .02) o = { ...o, ...(t < 126.2 ? { handL: [-4, -14], handR: [4, -14], handPoseL: 'palm', handPoseR: 'palm', ...(who === 'safadi' && t > SUGAR - .1 && t < SUGAR + 2.4 ? { mouth: lipFlap(t, t < SUGAR + 1.4, 'grin') } : {}), ...(who === 'sami' && t > SUGAR + 1.4 ? { handR: [5, -18], handPoseR: 'thumb' } : {}) } : {}) }; }
      // Housam steps over to lift Danny
      if (who === 'housam' && t > LIFT && t < PARTY) { const f = ease(seg(t, LIFT, LIFT + .5)) * (1 - ease(seg(t, PARTY - .4, PARTY))); x = lerp(POS.housam, POS.danny - 20, f); if (f > .5) o = { ...o, handL: [-3, -27], handR: [3, -27], handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'grin', jump: 0 }; }
      A[who] = put(who, x, gy - jy, o, who === 'pearl' || who === 'neptune' ? KP * .95 : KP);
    });
    // the cloche: carried between the twins, lifted at CLOCHE to show the real cake
    if (t > CAKE && t < 126.4 && A.safadi && A.sami) {
      const hx = (A.safadi.handR[0] + A.sami.handL[0]) / 2, hy = Math.min(A.safadi.handR[1], A.sami.handL[1]) + 10, lift = ease(seg(t, CLOCHE, CLOCHE + .4));
      shape(rectPts(hx - 110, hy, 220, 14), { fill: '#E6EEF5', stroke: PAL.ink, lwPx: 3 });
      if (lift > .1) { X.save(); X.translate(hx, hy); cake(0, 0, 11, t); X.restore(); }
      X.save(); X.translate(hx + 60 * lift, hy - 160 * lift); X.rotate(.5 * lift);
      X.beginPath(); X.ellipse(0, 0, 100, 90, 0, Math.PI, TAU); X.closePath(); X.fillStyle = '#D9E2EA'; X.fill(); X.lineWidth = 4; X.strokeStyle = PAL.ink; X.stroke();
      circle(0, -92, 12, { fill: '#C9D3DC', stroke: PAL.ink, lwPx: 3 }); X.restore();
      if (A.safadi) callout('Today… is *SUGAR DAY*!', A.safadi.mouth[0], A.safadi.mouth[1], t - SUGAR, { dx: -60, dy: -260, size: 54, cps: 22, hold: 1.4 });
    }
    // Dragon and Clawd hold the banner across the sky
    const bk = ease(seg(t, SURPRISE + .2, SURPRISE + .9));
    if (out) {
      const dy = 150 + 20 * Math.sin(t * 2), lx = lerp(-200, 330, bk), rx = lerp(W + 200, 1640, bk);
      const D = put('dragon', lx, dy + 120, { ...dragonFlight(t, { speed: 3, lift: 0 }), noShadow: true, eyes: 'happy', mouth: 'grin', fire: 0 }, KP * .8);
      const Cw = put('clawd', rx, dy + 80, { holo: 1, eyes: 'happy', mouth: 'grin', aL: 1.5, noShadow: true }, KP * 2);
      if (bk > .1 && t < FINALE) {
        const y0 = dy - 10, unroll = ease(seg(t, SURPRISE + .6, SURPRISE + 1.2));
        shape([[lx + 60, y0], [rx - 40, y0], [rx - 40, y0 + 120 * unroll], [lx + 60, y0 + 120 * unroll]], { fill: '#FFF6E0', stroke: PAL.ink, lwPx: 4 });
        for (let i = 0; i < 14; i++) shape([[lerp(lx + 60, rx - 40, i / 14), y0 + 120 * unroll], [lerp(lx + 60, rx - 40, (i + 1) / 14), y0 + 120 * unroll], [lerp(lx + 60, rx - 40, (i + .5) / 14), y0 + 120 * unroll + 30 * unroll]], { fill: FIRE[i % 6], stroke: null });
        if (unroll > .5) bigText('HAPPY BIRTHDAY DANNY!', (lx + rx) / 2 + 10, y0 + 60, 84, C.magenta, unroll, 0, { stroke: '#FFFFFF' });
      }
    }
    // Danny
    let dx = POS.danny, dyD = gy, dO = { handL: [-4.4, -12], handR: [4.4, -12], eyes: 'wide', brows: 'up', mouth: 'o', lookX: .7 * Math.sin(t * 2) };
    if (t > NUMS[0]) dO = { ...dO, eyes: 'wide', mouth: 'O', lookX: .6, lookY: -.3 };
    if (t > SURPRISE) dO = { handL: [-4.3, -19.3], handR: [4.3, -19.3], handPoseL: 'palm', handPoseR: 'palm', eyes: t < SURPRISE + 1 ? 'wide' : 'happy', mouth: 'open', brows: 'up', jump: Math.max(jumpOn(t, [...HEYS, ...JUMPS], 2.6), t < SURPRISE + .8 ? 2.5 * Math.sin(Math.PI * seg(t, SURPRISE, SURPRISE + .8)) : 0) };
    if (t > LIFT && t < PARTY && A.housam) { const f = ease(seg(t, LIFT + .3, LIFT + .9)) * (1 - ease(seg(t, PARTY - .4, PARTY))); dx = lerp(POS.danny, (A.housam.handL[0] + A.housam.handR[0]) / 2, f); dyD = lerp(gy, Math.min(A.housam.handL[1], A.housam.handR[1]) + 10, f); }
    if (t > PARTY && t < MOVE) dO = { ...dO, ...{ handL: [-5, -17 + 4 * Math.sin(bpos(t) * Math.PI)], handR: [5, -17 - 4 * Math.sin(bpos(t) * Math.PI)], handPoseL: 'fist', handPoseR: 'fist', jump: 1.2 * beatHop(t), mouth: 'grin' } };
    if (t > MOVE && t < JUMP) { const toss = t > TOSS - .2 && t < CATCH + .1; dO = toss ? { handL: [-3, -21], handR: [3, -21], handPoseL: 'palm', handPoseR: 'palm', lookY: -1, eyes: 'open', brows: 'focused', mouth: 'smirk' } : t > CATCH ? { handL: [-4.3, -19.3], handR: [4.3, -19.3], handPoseL: 'palm', handPoseR: 'palm', eyes: 'happy', mouth: 'grin', jump: 1.6 * beatHop(t) } : { handL: [-3, -14], handR: [3, -14], eyes: 'happy', mouth: 'smirk' }; }
    if (t > SPECIALS && t < FINALE) dO = { ...dO, jump: t < BONKT ? 1.2 * beatHop(t) : 0, ...(t > BONKT + .2 ? { eyes: 'happy', mouth: 'open', tilt: -.12, dy: .2 * Math.abs(Math.sin(t * 10)) } : {}) };
    if (t > FINALE) { dx = lerp(POS.danny, 990, ease(seg(t, FINALE, FINALE + .6))); }
    if (t > FINALE) dO = { handR: [3.5, -17], handPoseR: 'point', handL: [-4.4, -14], eyes: 'happy', mouth: 'open', brows: 'up', jump: .6 * beatHop(t) };
    const dJ = (dO.jump || 0) * DANNY_UNIT * KP * 1.15;               // lift him ourselves: the rig's anchors don't include `jump`, and the crown rides on them
    const DA = put('danny', dx, dyD - dJ, { ...dO, jump: 0 }, KP * 1.15);
    // Pearl's paper crown flies onto Danny's head and stays
    if (t > CROWN && A.pearl) {
      const f = ease(seg(t, CROWN, CROWN + .8)), cxp = lerp(A.pearl.head[0], DA.head[0], f), cyp = lerp(A.pearl.head[1] - 80, DA.top[1] + 4, f) - 260 * 4 * f * (1 - f);
      X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.translate(cxp, cyp); X.rotate((1 - f) * 4); X.scale(zoom, zoom);   // anchors are screen px
      shape([[-46, 0], [-46, -40], [-24, -16], [0, -50], [24, -16], [46, -40], [46, 0]], { fill: C.gold, stroke: PAL.ink, lwPx: 4 });
      for (const [jx, jc] of [[-24, C.magenta], [0, C.cyan], [24, C.lime]]) circle(jx, -8, 6, { fill: jc, stroke: PAL.ink, lwPx: 2 });
      X.restore();
    }
    // the cube trick
    if (t > MOVE && t < JUMP) {
      const f = seg(t, TOSS, CATCH), up = t < TOSS ? 0 : t < CATCH ? 4 * f * (1 - f) : 0;
      const cx = DA.handL[0] + (DA.handR[0] - DA.handL[0]) / 2, cy = Math.min(DA.handL[1], DA.handR[1]) - 30 - 520 * up;
      X.save(); X.translate(cx, cy); X.rotate(t < CATCH ? (t - TOSS) * 9 : 0); dmCube(0, 0, 46, t, t < TOSS ? 0 : t < CATCH ? f : 1, { seed: Math.floor(t * 6) % 9 }); X.restore();
      if (t > CATCH) for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + t * 2, u = seg(t, CATCH, CATCH + .8); shape(starPts(cx + Math.cos(a) * 160 * u, cy + Math.sin(a) * 160 * u, 18, .4, 4), { fill: FIRE[i % 6], stroke: null, alpha: 1 - u }); }
      dmSlam('PUGGLE!', W / 2, 200, 160, C.gold, t, CATCH + .05, 1.6, { shake: 10 });
      dmPop('ooooh…', 1300, 300, 60, '#FFFFFF', t, TOSS + .3, 1.2);
    }
    // Fester's juggled candles, and the BONK
    if (t > BONKP - .2 && t < BONKT + .1 && A.jester) {
      for (let i = 0; i < 3; i++) { const ph = frac(t * 1.25 + i / 3), side = (Math.floor(t * 1.25 + i / 3) + i) % 2 ? 1 : -1, x = A.jester.belly[0] + side * lerp(-60, 60, ph), y = A.jester.top[1] - 40 - 260 * 4 * ph * (1 - ph);
        if (i === 2 && t > BONKT - .5) { const f = seg(t, BONKT - .5, BONKT); candle(lerp(x, A.jester.top[0], f), lerp(y, A.jester.top[1] - 30, f) - 120 * 4 * f * (1 - f), 1, t, i); } else candle(x, y, 1, t, i); }
    }
    if (A.jester) { sfx('BONK!', A.jester.top[0] + 80, A.jester.top[1] - 100, 100, C.gold, t - BONKT, { life: .9 });
      callout('…story of my *life*.', A.jester.mouth[0], A.jester.mouth[1], t - BONKT - .5, { dx: 260, dy: -230, size: 50, hold: 1.2 }); }
    if (t > BONKT + .4 && t < FINALE) dmPop('HA HA HA!', 1250, 330, 80, C.gold, t, BONKT + .4, 1.4);
    // Dragon's flame loop and the specials' fireworks
    if (t > SPECIALS && t < BONKP) { const k = Math.floor((t - SPECIALS) / BEAT); burst(260 + (k * 233) % 1400, 140 + 60 * (k % 3), t - SPECIALS - k * BEAT, 300, 30, k * 3);
      if (k === 4 || k === 7) for (let i = 0; i < 18; i++) { const a = i / 18 * TAU + t * 6, r = 120 * seg(t, SPECIALS + k * BEAT, SPECIALS + k * BEAT + .3); circle(330 + Math.cos(a) * r, 230 + Math.sin(a) * r * .7, 18 - i * .6, { fill: i % 2 ? C.orange : C.gold, stroke: null }); }
      stArcade(['EXPLAIN-O-BEAM!', 'HEALTHY-DOKEN!', 'SCANNER BEAM!', 'WATER RING!', 'DRAGON LOOP!', 'RAINBOW FLOOR!', 'CLAWD SPARKS!', 'ALL TOGETHER!'][Math.min(7, k)], W / 2, 120, 64, FIRE[k % 6]); }
    // fireworks on HOORAY and through the dance
    burst(500, 200, t - HOORAY, 420, 44, 2); burst(1500, 180, t - HOORAY - .3, 420, 44, 5); burst(1000, 120, t - HOORAY - .6, 480, 50, 8);
    if (t > PARTY && t < FINALE) { const k = Math.floor((t - PARTY) / (2 * BEAT)); burst(300 + (k * 457) % 1300, 150 + 70 * (k % 2), t - PARTY - k * 2 * BEAT, 320, 30, k); }
    // surprise: confetti cannons, the slam
    confetti(t, SURPRISE, 140, 9);
    dmSlam('SURPRISE!', W / 2, 330, 220, C.gold, t, SURPRISE + .02, 1.8, { shake: 18 });
    X.restore();
    // the countdown numbers (screen space, over the zoom)
    NUMS.forEach((n, i) => { const k = slamK(t, n) * (1 - easeIn(seg(t, (NUMS[i + 1] ?? SURPRISE) - .1, NUMS[i + 1] ?? SURPRISE))); bigText(['3', '2', '1'][i], 1600, 380, 400, [C.gold, C.cyan, C.magenta][i], k, (i - 1) * .1, { glow: [C.gold, C.cyan, C.magenta][i] }); if (t >= n) burst(1600, 380, t - n, 380, 24, i * 4); });
    flash(.9 * kickK(t, SURPRISE, 5));
    // the finale: LOOK · BEHIND · YOU!, a firework 7, THE END
    if (t > FINALE) {
      WORDS.forEach(([w0, txt], i) => bigText(txt, 640, 120 + i * 150, 115, [C.gold, C.cyan, C.magenta][i], slamK(t, w0) * (1 - seg(t, THEEND - .2, THEEND)) * (1 + .06 * pulse(t, 6)), (i - 1) * .06, { glow: '#FFFFFF' }));
      if (t > SEVEN) { const u = t - SEVEN, pts = []; for (let i = 0; i < 12; i++) pts.push([lerp(1400, 1760, i / 11), 110]); for (let i = 1; i < 16; i++) pts.push([lerp(1760, 1540, i / 15), lerp(110, 520, i / 15)]);
        pts.forEach(([px, py], i) => { const f = easeOut(seg(u, 0, .5)), x = lerp(1600, px, f), y = lerp(330, py, f) + 40 * u * u, a = 1 - seg(u, 1.6, 2.4); circle(x, y, 17, { fill: FIRE[i % 6], stroke: null, alpha: a }); circle(x, y, 7, { fill: '#FFFFFF', stroke: null, alpha: a }); }); }
      if (t > THEEND) { bigText('THE END', W / 2, H / 2, 200, C.gold, slamK(t, THEEND), 0, { glow: C.magenta }); }
      if (t > 155.9) iris(W / 2, H / 2, lerp(1300, 0, easeIn(seg(t, 155.9, END - .05))));
    }
  }

  const n = ['countdown', 'surprise', 'cake', 'lift', 'blockParty', 'dannyMove', 'jump', 'specials', 'bonk', 'finale'];
  return Object.fromEntries(n.map(k => [k, party]));
})());
