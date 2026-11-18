// scenes/sami_shorts/scene12_umn/scene.js: the shots of "Umn". Write the synopsis, script and shot list in README.md first.
// Every shot fn(t, lt, dur) paints the WHOLE frame and must be a pure function of t (no state, no Math.random()).
(() => {
  const R = LOCATIONS.umn, JZ = R.MARK.z;
  const LINES = ASSETS.scene.scene12_umn.dialogue;

  const cam = t => ({ x: 0, y: 130, z: 200 + t * 40, f: 1000, hy: 560 });

  const speaking = (who, t) => LINES.some(l => {
    const p = (t - l.at - .2) * l.cps;
    return l.speaker === who && p > 0 && p < l.text.length;
  });

  function opening(t, lt, dur) {
    const P = persp(cam(t));
    layer(() => R.back(P, t, { splitZ: JZ }), { blur: 0 });

    const put = (x, z, rig, unit, pose) => { 
        const [sx, sy, k] = P.p(x, 0, z); 
        return { A: rig(sx, sy, unit * k, pose), s: unit * k }; 
    };

    const samiPose = {
      mouth: lipFlap(t, speaking('sami', t), 'smile'),
      handR: [4.4, -12.2], handPoseR: 'stethoscope', pointerAng: -.95 + .08 * wob(t, .8),
      brows: 'up', lookX: speaking('sami', t) ? 0 : (t > 4 ? -0.5 : 0.5), turn: 0.1
    };
    
    const almaPose = {
      mouth: lipFlap(t, speaking('alma', t), 'smile'),
      turn: 0.3,
      handR: [5, -12], handPoseR: 'palm'
    };

    const housamPose = {
      mouth: lipFlap(t, speaking('housam', t), 'smile'),
      turn: -0.3,
      handL: [-5, -12], handPoseL: 'palm'
    };

    const alm = put(-280, JZ + 20, alma, ALMA_UNIT, almaPose);
    const hou = put(280, JZ + 20, housam, HOUSAM_UNIT, housamPose);
    const sam = put(0, JZ, sami, SAMI_UNIT, samiPose);

    R.front(P, t, { splitZ: JZ + 30 });

    for (const l of LINES) {
      const age = t - l.at;
      if (age < -0.2) continue;
      if (l.speaker === 'sami') callout(l.text, sam.A.head[0] + 5 * sam.s, sam.A.head[1] - sam.s, age, { cps: l.cps, hold: l.hold, maxW: 400 });
      else if (l.speaker === 'alma') callout(l.text, alm.A.head[0] - 5 * alm.s, alm.A.head[1] - alm.s, age, { cps: l.cps, hold: l.hold, maxW: 400, dx: -220, dy: -120 });
      else if (l.speaker === 'housam') callout(l.text, hou.A.head[0] + 5 * hou.s, hou.A.head[1] - hou.s, age, { cps: l.cps, hold: l.hold, maxW: 400, dx: 220, dy: -120 });
    }
  }

  // Shared staging for the farewell; every pose and prop is a function of time.
  const POS = { roudaynah: -390, sarah: -270, jenna: -150, alma: -65, sami: 15, danny: 130, housam: 200, safadi: -255 };
  const RIGS = {
    roudaynah: [roudaynah, ROUDAYNAH_UNIT], sarah: [sarah, SARAH_UNIT],
    jenna: [jenna, JENNA_UNIT], alma: [alma, ALMA_UNIT],
    sami: [sami, SAMI_UNIT], safadi: [safadi, SAFADI_UNIT], danny: [danny, DANNY_UNIT], housam: [housam, HOUSAM_UNIT]
  };
  const raised = t => ease(seg(t, 26, 26.9));
  const lowered = t => ease(seg(t, 44.5, 46.1));
  const greet = t => seg(t, 46.5, 46.9) * (1 - seg(t, 49.8, 50.3));
  const contactY = t => kf(t, [[46.5, 65], [47.1, 72], [47.7, 64], [48.3, 64], [48.9, 70], [49.8, 70]]);
  // Seat tops meet each rig's hips; feet stay on the floor as knees bend.
  const SEATS = {
    jenna: { height: 30, hip: 10, feet: 1.25, ankle: -.65 },
    alma: { height: 14, hip: 4.2, feet: .9, ankle: -.55 },
    danny: { height: 24, hip: 8.25, feet: 1.5, ankle: -1.05 },
    housam: { height: 28, hip: 8.25, feet: 1.5, ankle: -1.05 }
  };

  function farewellPose(who, t) {
    const o = { t, mouth: lipFlap(t, speaking(who, t), 'smile'), lookX: 0, dy: .06 * wob(t, .7) };
    if (who === 'sami') Object.assign(o, { brows: 'up', handR: [5, -12], handPoseR: 'palm' });
    if (who === 'roudaynah') {
      const wave = ease(seg(t, 17.5, 17.9)) * (1 - ease(seg(t, 19.5, 20)));
      Object.assign(o, { lookX: .8, mouth: 'grin', handR: [4.3 + wave * (1 + .9 * Math.sin(t * 10)), -14.5 - wave * 12], brows: 'up' });
    }
    if (who === 'jenna') {
      const funny = t >= 24.1 && t < 26;
      const lift = ease(seg(t, 23.9, 24.4)) * (1 - ease(seg(t, 25.6, 26)));
      Object.assign(o, { lookX: t < 20 ? -.8 : .9, turn: t < 20 ? -.15 : .2,
        eyes: funny ? 'wink' : 'open', mouth: lipFlap(t, speaking(who, t), funny ? 'o' : 'smile'), brows: funny ? 'up' : 'normal',
        blink: Math.max(0, 1 - Math.abs(t - 24.05) / .15),
        handL: [-3.8 - lift, -12 - lift * 9], handR: [3.8 + lift, -12 - lift * 9],
        handPoseL: 'palm', handPoseR: 'palm', tilt: lift * (.12 + .06 * Math.sin(t * 8)) });
    }
    if (who === 'alma') Object.assign(o, { lookX: -.8, turn: -.2,
      eyes: t >= 24.4 && t < 26 ? 'happy' : 'open', mouth: t >= 24.4 && t < 26 ? 'grin' : 'smile' });
    if (who === 'sarah') Object.assign(o, { lookX: .7, lookY: t >= 41.5 ? .45 : 0,
      mouth: lipFlap(t, speaking(who, t), t >= 41.65 ? 'frown' : 'smile'),
      blink: Math.max(0, 1 - Math.abs(t - 41.6) / .15), dy: t >= 41.65 ? .35 : o.dy, tilt: t >= 41.65 ? -.06 : 0 });
    if (who === 'danny') {
      const up = raised(t), down = lowered(t), h = greet(t);
      Object.assign(o, { lookX: t < 20 ? -.9 : .8, lookY: down > 0 && down < 1 ? .6 : 0, brows: 'up', mouth: lipFlap(t, speaking(who, t), 'grin'),
        handL: [-3.2, -10 - 5 * up + 3.1 * down], handR: [3.2, -10 - 5 * up + 3.1 * down],
        handPoseL: 'palm', handPoseR: t >= 48.5 ? 'fist' : 'palm' });
      o.handR = mixPt(o.handR, [3.5, -9.8], seg(t, 46.1, 46.5));
      o.handR = mixPt(o.handR, [(162 - POS.danny) / DANNY_UNIT, -contactY(t) / DANNY_UNIT], h);
      o.handL = mixPt(o.handL, [-3.5, -9.8], seg(t, 46.1, 46.5));
    }
    if (who === 'housam') {
      const h = greet(t);
      Object.assign(o, { lookX: -.8, lookY: .4, turn: -.15, mouth: 'grin', brows: 'up',
        handL: mixPt([-4.05, -10.7], [(162 - POS.housam) / HOUSAM_UNIT, -contactY(t) / HOUSAM_UNIT], h),
        handPoseL: t >= 48.5 ? 'fist' : 'palm' });
    }
    if ((who === 'roudaynah' || who === 'sarah') && t >= 50.5) {
      const step = Math.sin((t - 50.5) * 10), walk = ease(seg(t, 50.5, 50.9));
      Object.assign(o, { lookX: -.9, turn: -.25, lean: -.04 * walk,
        footL: [-1.7 + 1.2 * step * walk, -1 - Math.max(0, step) * walk],
        footR: [1.7 - 1.2 * step * walk, -1 - Math.max(0, -step) * walk],
        handL: [-4.3, -14.5 + step * walk], handR: [4.3, -14.5 - step * walk], dy: .12 * Math.abs(step) });
    }
    if ((who === 'sami' || who === 'safadi') && t >= 29.5) {
      const enter = seg(t, 29.5, 30.5), airborne = 5 * Math.sin(Math.PI * enter);
      Object.assign(o, { jump: airborne, sq: .08 * kick(t, 30.5, 9),
        lookX: .8, turn: .15, brows: 'up', mouth: lipFlap(t, speaking(who, t), 'smile'),
        handR: [5.3, speaking(who, t) ? -18 : -12.6], handPoseR: speaking(who, t) ? 'point' : 'palm',
        handL: [-5.3, -12.4] });
    }
    if (['jenna', 'alma', 'danny', 'housam'].includes(who) && t >= 29.5 && t < 41.5) {
      Object.assign(o, { lookX: -.9, lookY: -.4, mouth: 'flat', brows: 'up',
        eyes: t < 30.6 ? 'wide' : 'open', turn: -.15 });
      // The demonstration stops while the adults speak; the Switch stays held.
      if (who === 'danny') Object.assign(o, { handL: [-3.2, -15], handR: [3.2, -15] });
    }
    if (t >= 54.5) {
      if (who === 'danny' || who === 'housam') {
        const startled = t >= 62.7, empty = ease(seg(t, 72.5, 73.3));
        Object.assign(o, { brows: startled ? 'worried' : 'up',
          blink: Math.max(0, 1 - Math.abs(t - 62.65) / .16),
          mouth: startled ? 'frown' : 'grin', lookX: startled ? -.9 : who === 'danny' ? .5 : -.7,
          lookY: startled ? -.5 : .6,
          handL: mixPt(who === 'danny' ? [-3.2, -15] : [-5.8, -15], [-4, -10], empty),
          handR: mixPt(who === 'danny' ? [3.2, -15] : [-2.8, -14.5], [4, -10], empty),
          handPoseL: 'palm', handPoseR: 'palm' });
        if (who === 'danny' && t < 56) {
          const reach = ease(seg(t, 54.5, 55.2));
          o.handL = mixPt([-3.5, -9.8], [-3.2, -11.9], reach);
          o.handR = mixPt([3.5, -9.8], [3.2, -11.9], reach);
          const lift = ease(seg(t, 55.2, 56));
          o.handL = mixPt(o.handL, [-3.2, -15], lift);
          o.handR = mixPt(o.handR, [3.2, -15], lift);
        }
      }
      if (who === 'jenna' || who === 'alma') {
        const laugh = t >= 68 && t < 69.5, bounce = Math.sin(t * 5 + (who === 'alma' ? 1.5 : 0));
        Object.assign(o, { eyes: laugh ? 'happy' : 'open', mouth: laugh ? 'grin' : 'smile',
          lookX: laugh ? .9 : who === 'jenna' ? .8 : -.8, lookY: laugh ? 0 : .4,
          dy: laugh ? .15 * Math.abs(Math.sin(t * 13)) : .06 * bounce,
          handL: [-2.5, -12.5 + .6 * bounce], handR: [2.5, -12.5 + .6 * bounce],
          handPoseL: 'palm', handPoseR: 'palm' });
      }
      if (who === 'sami' && t >= 62) {
        const anger = ease(seg(t, 62, 62.7)), grab = ease(seg(t, 71, 72.5));
        Object.assign(o, { brows: t >= 62.4 ? 'angry' : 'up',
          blink: Math.max(0, 1 - Math.abs(t - 62.35) / .18),
          mouth: lipFlap(t, speaking(who, t), 'frown', ['O', 'open', 'teeth']),
          lookX: .9, lookY: .4, lean: .06 * anger, sq: .07 * kick(t, 62.7, 5),
          handL: [-4.8, -10], handPoseL: 'fist', handPoseR: t < 71 ? 'point' : 'palm',
          handR: mixPt([5.5, -18], [10, -8.7], grab) });
        if (t >= 72.5) o.handR = mixPt([10, -8.7], [-1, -20], ease(seg(t, 72.5, 74)));
      }
    }
    if (t >= 78) {
      const whisper = ease(seg(t, 78, 78.7)) * (1 - ease(seg(t, 81.3, 82)));
      const thumb = ease(seg(t, 82, 82.4)) * (1 - ease(seg(t, 83.6, 84)));
      const laugh = (ease(seg(t, 84, 84.2)) * (1 - ease(seg(t, 85.5, 86))))
        + (ease(seg(t, 98, 98.2)) * (1 - ease(seg(t, 100.4, 101.1))));
      if (who === 'housam') {
        Object.assign(o, { blink: Math.max(0, 1 - Math.abs(t - 78.25) / .16),
          brows: t < 78.25 ? 'worried' : 'up', eyes: laugh > .4 ? 'happy' : 'open',
          mouth: whisper > .2 ? lipFlap(t, true, 'smirk', ['o', 'flat'])
            : laugh > .2 ? (Math.sin(t * 13) > 0 ? 'open' : 'grin') : 'smirk',
          lean: -.38 * whisper, tilt: .08 * whisper - .06 * laugh,
          lookX: -.9, lookY: t < 86 ? .5 : -.2,
          handL: mixPt([-4, -10], [-3.7, -23.1], whisper),
          handR: [-3, -11], handPoseL: 'palm', handPoseR: 'fist',
          dy: .14 * laugh * Math.abs(Math.sin(t * 13)) });
      }
      if (who === 'danny') {
        const handUp = ease(seg(t, 86, 86.9)) * (1 - ease(seg(t, 89.4, 90)));
        Object.assign(o, { blink: Math.max(0, 1 - Math.abs(t - 78.4) / .16),
          brows: t < 78.4 ? 'worried' : t >= 93 && t < 96.2 ? 'worried' : 'up',
          eyes: 'open', mouth: lipFlap(t, speaking(who, t), t < 86 ? 'smirk' : 'smile'),
          lookX: t < 86 ? .9 : -.9, lookY: t < 86 ? -.3 : -.7,
          turn: t < 86 ? .2 : -.2, lean: .1 * whisper,
          handL: mixPt([-4, -10], [-8, -23], handUp), handPoseL: 'palm',
          handR: mixPt([4, -10], [7, -17.5], thumb), handPoseR: thumb > .2 ? 'thumb' : 'palm' });
      }
      if (who === 'sami') {
        const stare = t >= 93 && t < 96.2;
        Object.assign(o, { handR: mixPt([-1, -20], [-3, -10], ease(seg(t, 78, 79.2))),
          handPoseR: 'palm', handL: [-5, t >= 88 && t < 90 ? -16 : -11], handPoseL: 'palm',
          lean: .025, lookX: .9, lookY: .7,
          brows: t < 88 ? 'angry' : stare ? 'quizzical' : 'focused',
          eyes: stare ? 'narrow' : 'open',
          blink: Math.max(0, 1 - Math.abs(t - 93.05) / .18),
          mouth: lipFlap(t, speaking(who, t), 'flat'), tilt: stare ? .05 : 0 });
      }
    }
    const seat = SEATS[who];
    if (seat && t >= 15) {
      const unit = RIGS[who][1], drop = seat.hip - seat.height / unit;
      o.seated = true;
      // Small breathing/laughing motion remains above a firmly planted seated pose.
      o.dy = drop + Math.min(.08, o.dy || 0);
      o.footL = [-seat.feet - 1, seat.ankle];
      o.footR = [seat.feet + 1, seat.ankle];
      // The girls' IK targets are in body space; boys' arms already inherit dy.
      if (who === 'jenna' || who === 'alma') {
        for (const hand of ['handL', 'handR']) {
          if (o[hand]) o[hand] = [o[hand][0], o[hand][1] + drop];
        }
      } else if (t >= 46.5 && t < 50.3) {
        const hand = who === 'danny' ? 'handR' : 'handL';
        o[hand][1] += (10 / unit - drop) * greet(t);
      }
    }
    return o;
  }

  function nintendoSwitch(x, y, s) {
    X.save(); X.translate(x, y); X.scale(s, s);
    shape(rectPts(-4, -1.8, 8, 3.6), { fill: '#262936', stroke: PAL.ink, lw: .18, smooth: .2 });
    shape(rectPts(-2.8, -1.4, 5.6, 2.8), { fill: '#8BCDE3', stroke: '#111622', lw: .12 });
    shape([[-2.6, 1.1], [-1.4, -.2], [-.5, .6], [.5, -.7], [2.6, 1.1]], { fill: '#6BA863', stroke: null });
    for (const [side, col] of [[-1, '#20B9D5'], [1, '#F25A55']]) {
      shape(rectPts(side < 0 ? -4 : 2.9, -1.8, 1.1, 3.6), { fill: col, stroke: PAL.ink, lw: .14, smooth: .3 });
      circle(side * 3.45, side < 0 ? -.65 : .55, .28, { fill: '#242633', stroke: null });
      circle(side * 3.45, side < 0 ? .65 : -.65, .14, { fill: '#242633', stroke: null });
    }
    X.restore();
  }

  // Two soft toys, sized to fit the girls' hand anchors.
  function stuffie(x, y, s, blob) {
    X.save(); X.translate(x, y); X.scale(s, s);
    const fill = blob ? '#A6DF9C' : '#B99CE6';
    if (!blob) {
      ellipse(-1.5, -3.6, .65, 1.5, { fill, stroke: PAL.ink, lw: .15 });
      ellipse(1.5, -3.6, .65, 1.5, { fill, stroke: PAL.ink, lw: .15 });
    }
    ellipse(0, -1.2, 2.4, blob ? 2 : 2.5, { fill, stroke: PAL.ink, lw: .18 });
    circle(-.8, -1.8, .22, { fill: PAL.ink, stroke: null });
    circle(.8, blob ? -1.5 : -1.8, .22, { fill: PAL.ink, stroke: null });
    line([[-.5, -.8], [0, -.5], [.5, -.8]], { stroke: PAL.ink, lw: .16 });
    X.restore();
  }

  function gathering(t, lt, focus) {
    const wide = focus === 'wide', lecture = focus === 'lecture', request = focus === 'request';
    const cx = request ? 115 : lecture ? -70 : wide ? -75 : focus === 'girls' ? -110 : focus === 'sarah' ? -300 : 165;
    const k = request ? 3.8 + lt * .008 : lecture ? 2.65 + lt * .005 : wide ? 1.95 + lt * .005 : 3.5 + lt * .015;
    const P = persp({ x: cx, y: 120, z: JZ - 1000 / k, f: 1000, hy: 880 - 120 * k });
    layer(() => R.back(P, t, { splitZ: JZ }), { blur: wide ? 0 : 2 });
    const visible = request ? ['sami', 'danny', 'housam'] : lecture ? ['sami', 'safadi', 'jenna', 'alma', 'danny', 'housam'] : wide ? Object.keys(POS).filter(w => w !== 'safadi' || t >= 29.5) : focus === 'girls' ? ['jenna', 'alma'] : focus === 'sarah' ? ['roudaynah', 'sarah'] : ['danny', 'housam'];
    // Audience chairs are present from the cut where Sami starts the show.
    P.plane(JZ, () => {
      for (const [who, seat] of Object.entries(SEATS)) {
        if (!visible.includes(who)) continue;
        const x = POS[who], h = seat.height;
        shape(rectPts(x - 21, -h - 37, 42, 35), { fill: '#7895AC', stroke: PAL.ink, lw: 1.2, smooth: .15 });
        for (const dx of [-19, 16]) {
          shape(rectPts(x + dx, -h, 3, h), { fill: '#596572', stroke: PAL.ink, lw: .8 });
        }
        shape(rectPts(x - 23, -h, 46, 4), { fill: '#456B88', stroke: PAL.ink, lw: 1.2 });
      }
    });
    // A low stand keeps the console visible after Danny releases it.
    P.plane(JZ, () => {
      shape(rectPts(94, -38, 8, 38), { fill: '#79635A', stroke: PAL.ink, lw: 1 });
      shape(rectPts(131, -38, 8, 38), { fill: '#79635A', stroke: PAL.ink, lw: 1 });
      shape(rectPts(88, -41, 57, 5), { fill: '#C49C78', stroke: PAL.ink, lw: 1 });
    });
    const anchors = {};
    // Sami stands slightly behind the children.
    for (const who of ['sami', 'safadi', ...visible.filter(w => w !== 'sami' && w !== 'safadi')]) {
      if (!visible.includes(who)) continue;
      const travel = who === 'roudaynah' || who === 'sarah' ? 650 * ease(seg(t, 50.5, 54.2)) : 0;
      let worldX = POS[who] - travel;
      if (who === 'sami' && t >= 29.5) worldX = lerp(POS.sami, -360, ease(seg(t, 29.5, 30.5)));
      if (who === 'sami' && t >= 62) worldX = lerp(-360, 70, ease(seg(t, 62, 63)));
      if (who === 'safadi') worldX = lerp(-650, POS.safadi, ease(seg(t, 29.5, 30.5)));
      const adult = who === 'sami' || who === 'safadi';
      const depth = adult ? lerp(140, 0, ease(seg(t, 29.5, 30.5))) : 0;
      const [x, y, scale] = P.p(worldX, 0, JZ + depth);
      const [rig, unit] = RIGS[who], s = unit * scale;
      anchors[who] = { A: rig(x, y, s, farewellPose(who, t)), s };
    }
    if (anchors.danny && (t < 72.5 || anchors.sami)) {
      const d = anchors.danny, release = lowered(t);
      const held = [(d.A.handL[0] + d.A.handR[0]) / 2, (d.A.handL[1] + d.A.handR[1]) / 2];
      const resting = P.p(116.5, 43, JZ);
      let xy = t < 46.1 ? mixPt(held, resting, release) : resting;
      if (t >= 54.5) xy = mixPt(resting, held, ease(seg(t, 54.5, 55.2)));
      if (t >= 71 && anchors.sami) {
        const hand = anchors.sami.A.handR;
        // At contact the console meets Sami's palm; thereafter it follows him.
        xy = t < 72.5 ? held : hand;
      }
      nintendoSwitch(xy[0], xy[1], d.s);
    }
    if (t >= 54.5) {
      for (const who of ['jenna', 'alma']) {
        const a = anchors[who];
        if (a) stuffie((a.A.handL[0] + a.A.handR[0]) / 2,
          (a.A.handL[1] + a.A.handR[1]) / 2, a.s, who === 'alma');
      }
    }
    R.front(P, t, { splitZ: JZ + 44.5 });
    for (const l of LINES) {
      const a = anchors[l.speaker];
      if (!a || t < l.at - .2) continue;
      callout(l.text, a.A.head[0], a.A.head[1] - a.s, t - l.at,
        { cps: l.cps, hold: l.hold, kind: l.kind || 'talk', maxW: 450,
          dx: request ? (l.speaker === 'sami' ? -160 : 150) : lecture ? 180 : l.speaker === 'danny' ? -150 : l.speaker === 'sarah' ? 230 : 130,
          dy: request ? (l.speaker === 'danny' ? -350 : -200) : lecture ? -290 : l.speaker === 'danny' ? -230 : -150 });
    }
  }
  // Head-on windshield view: the left-hand driver sits on screen right.
  function carInterior(t) {
    const elapsed = t - 102, push = 1 + .0015 * elapsed;
    const outburst = ease(seg(t, 104, 104.6)) * (1 - ease(seg(t, 109.7, 110.5)));
    X.save(); X.translate(960, 540); X.scale(push, push); X.translate(-960, -540);
    shape(rectPts(0, 0, 1920, 1080), { fill: '#BBDCE8', stroke: null });
    // Passing trees and houses behind the occupants establish a moving car.
    shape(rectPts(0, 440, 1920, 640), { fill: '#B3C99A', stroke: null });
    for (let i = 0; i < 10; i++) {
      const x = ((i * 275 - elapsed * 125) % 2750 + 2750) % 2750 - 400;
      if (i % 3 === 0) {
        shape(rectPts(x, 345, 145, 130), { fill: '#E4CFB9', stroke: '#8A8583', lw: 2 });
        shape([[x - 12, 345], [x + 72, 280], [x + 158, 345]], { fill: '#A77976', stroke: '#8A8583', lw: 2 });
        shape(rectPts(x + 28, 375, 35, 40), { fill: '#9CBCC9', stroke: null });
      } else {
        shape(rectPts(x + 40, 360, 16, 130), { fill: '#A88D78', stroke: null });
        ellipse(x + 48, 340, 68, 90, { fill: i % 2 ? '#7EAA88' : '#99B78C', stroke: null });
      }
    }
    shape([[870, 450], [1050, 450], [1430, 1080], [490, 1080]], { fill: '#8C949A', stroke: null });
    for (let i = 0; i < 5; i++) {
      const y = 450 + ((i * 145 + elapsed * 180) % 725);
      shape(rectPts(952, y, 16, 65), { fill: '#F5E6AC', stroke: null });
    }
    X.save(); X.translate(0, 1.5 * Math.sin(elapsed * 4));
    shape(rectPts(140, 690, 1640, 290), { fill: '#525665', stroke: PAL.ink, lw: 5 });
    for (const x of [580, 1300]) {
      shape(rectPts(x - 215, 410, 430, 540), { fill: '#737584', stroke: PAL.ink, lw: 6, smooth: .1 });
      shape(rectPts(x - 125, 285, 250, 185), { fill: '#888998', stroke: PAL.ink, lw: 5, smooth: .2 });
      line([[x - 178, 490], [x - 178, 830]], { stroke: '#9695A1', lw: 3 });
      line([[x + 178, 490], [x + 178, 830]], { stroke: '#9695A1', lw: 3 });
    }
    const unit = 24, baseY = 1200, driverX = 1300;
    const steering = .035 * Math.sin(elapsed * .8);
    const grip = side => {
      const x = side * 144, y = -52;
      return [driverX + x * Math.cos(steering) - y * Math.sin(steering),
        820 + x * Math.sin(steering) + y * Math.cos(steering)];
    };
    const left = grip(-1), right = grip(1);
    const driver = roudaynah(driverX, baseY, unit, {
      t, noShadow: true, lookX: 0, lookY: 0, eyes: t >= 110.5 ? 'narrow' : 'open',
      brows: t >= 110.5 ? 'worried' : 'normal',
      blink: Math.max(0, 1 - Math.abs(t - 110.45) / .18),
      mouth: lipFlap(t, speaking('roudaynah', t), t >= 110.5 ? 'flat' : 'smile', ['open', 'flat']),
      handL: [(left[0] - driverX) / unit, (left[1] - baseY) / unit],
      handR: [(right[0] - driverX) / unit, (right[1] - baseY) / unit],
      handPoseL: 'fist', handPoseR: 'fist'
    });
    const passenger = sarah(580, baseY, unit, {
      t, noShadow: true, brows: 'angry', eyes: 'open',
      mouth: outburst > .15 ? lipFlap(t, true, 'frown', ['shout', 'shout', 'frown']) : 'frown',
      tilt: outburst * .045 * Math.sin(t * 17), lean: -.025 * outburst,
      hairSwing: .08 * outburst * Math.sin(t * 8), lookX: .8, lookY: t >= 113.5 ? .5 : 0,
      handL: mixPt([-2.9, -14.9], [-5.8, -25.5 + .4 * Math.sin(t * 15)], outburst),
      handR: mixPt([2.9, -14.9], [5.8, -25.5 - .4 * Math.sin(t * 15)], outburst),
      handPoseL: 'fist', handPoseR: 'fist'
    });
    // Belts cross the upper bodies; the dashboard hides seated laps and legs.
    for (const points of [[[490, 650], [660, 890]], [[1390, 635], [1210, 890]]]) {
      line(points, { stroke: PAL.ink, lw: 27 });
      line(points, { stroke: '#555463', lw: 20 });
    }
    shape([[0, 865], [380, 835], [960, 865], [1540, 835], [1920, 865], [1920, 1080], [0, 1080]],
      { fill: '#414654', stroke: PAL.ink, lw: 7, smooth: .15 });
    shape(rectPts(850, 920, 220, 115), { fill: '#252E3B', stroke: '#78808E', lw: 4, smooth: .15 });
    for (let i = 0; i < 5; i++) line([[885, 941 + i * 16], [1035, 941 + i * 16]], { stroke: '#7C8592', lw: 5 });
    // Wheel and hands share the same steering targets, including on seeks.
    X.save(); X.translate(driverX, 820); X.rotate(steering);
    ellipse(0, 0, 165, 110, { fill: null, stroke: '#262B37', lw: 25 });
    ellipse(0, 0, 165, 110, { fill: null, stroke: '#737B87', lw: 10 });
    for (const end of [[-146, -48], [146, -48], [0, 100]]) line([[0, 10], end], { stroke: '#262B37', lw: 24 });
    ellipse(0, 10, 48, 35, { fill: '#626B78', stroke: '#262B37', lw: 5 });
    X.restore();
    for (const hand of [driver.handL, driver.handR]) ellipse(hand[0], hand[1], 19, 15, { fill: RD.skin, stroke: RD.ink, lw: 3 });
    // Roof, windshield pillars and mirror frame the cabin.
    shape([[0, 0], [1920, 0], [1920, 155], [1730, 120], [190, 120], [0, 155]], { fill: '#434956', stroke: PAL.ink, lw: 6 });
    shape([[0, 100], [135, 115], [290, 875], [165, 900], [0, 560]], { fill: '#626875', stroke: PAL.ink, lw: 6 });
    shape([[1920, 100], [1785, 115], [1630, 875], [1755, 900], [1920, 560]], { fill: '#626875', stroke: PAL.ink, lw: 6 });
    line([[960, 120], [960, 165]], { stroke: PAL.ink, lw: 16 });
    shape(rectPts(840, 155, 240, 85), { fill: '#667480', stroke: '#272E3C', lw: 9, smooth: .2 });
    line([[865, 178], [1045, 178]], { stroke: '#B7D5DD', lw: 4 });
    X.restore();
    if (t < 104) {
      shape(rectPts(90, 160, 390, 90), { fill: '#FFF6DB', stroke: PAL.ink, lw: 4, smooth: .1 });
      X.save(); X.font = `600 50px ${FONT_TALK}`; X.textAlign = 'center'; X.textBaseline = 'middle';
      X.fillStyle = PAL.ink; X.fillText('Meanwhile…', 285, 205); X.restore();
    }
    for (const l of LINES) {
      if (l.at < 102 || t < l.at - .2) continue;
      const a = l.speaker === 'sarah' ? passenger : driver;
      callout(l.text, a.head[0], a.head[1], t - l.at,
        { cps: l.cps, hold: l.hold, kind: l.kind || 'talk', maxW: 560,
          dx: l.speaker === 'sarah' ? -35 : 20, dy: -230 });
    }
    X.restore();
  }
  const meanwhileDrive = t => carInterior(t);
  const carOutburst = t => carInterior(t);
  const carReply = t => carInterior(t);

  const farewell = (t, lt) => gathering(t, lt, 'wide');
  const cousins = (t, lt) => gathering(t, lt, 'girls');
  const switchShow = (t, lt) => gathering(t, lt, 'boys');
  const screenTime = (t, lt) => gathering(t, lt, 'lecture');
  const sarahReaction = (t, lt) => gathering(t, lt, 'sarah');
  const handshake = (t, lt) => gathering(t, lt, 'boys');
  const departure = (t, lt) => gathering(t, lt, 'wide');

  const resumePlay = (t, lt) => gathering(t, lt, 'boys');
  const stuffiePlay = (t, lt) => gathering(t, lt, 'girls');
  const angrySami = (t, lt) => gathering(t, lt, 'lecture');
  const girlsLaugh = (t, lt) => gathering(t, lt, 'girls');
  const confiscation = (t, lt) => gathering(t, lt, 'lecture');
  const secretWhisper = (t, lt) => gathering(t, lt, 'boys');
  const secretAgreement = (t, lt) => gathering(t, lt, 'boys');
  const firstChuckle = (t, lt) => gathering(t, lt, 'boys');
  const raisedHand = (t, lt) => gathering(t, lt, 'request');
  const bathroomRequest = (t, lt) => gathering(t, lt, 'request');
  const suspiciousPause = (t, lt) => gathering(t, lt, 'request');
  const lastChuckle = (t, lt) => gathering(t, lt, 'boys');

  scene({ duration: 117, fps: 24, bpm: 100,
    shots: [[0, opening], [15, farewell], [20, cousins], [26, switchShow],
      [29.5, screenTime], [41.5, sarahReaction], [44.5, handshake], [50.5, departure],
      [54.5, resumePlay], [56.5, stuffiePlay], [59.5, resumePlay],
      [62, angrySami], [68, girlsLaugh], [71, confiscation],
      [78, secretWhisper], [82, secretAgreement], [84, firstChuckle],
      [86, raisedHand], [90, bathroomRequest], [93, suspiciousPause], [98, lastChuckle],
      [102, meanwhileDrive], [104, carOutburst], [110.5, carReply]] });
})();
