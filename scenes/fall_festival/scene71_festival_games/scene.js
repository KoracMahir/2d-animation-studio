// Scene 71: "Festival Games", the first scene of the Fall Festival series. In front of Dove Creek Elementary, dressed for the
// festival (props.js), the Safadi brothers show the kids how the games are won, and lose every one of them.
// Ring toss: the professor hits a peg, then rings a pumpkin; the doctor's ring slips backward onto the professor's head. The
// professor explains the mechanics on a floating chalkboard, the doctor prescribes rest, and Alma and Jenna ring every peg.
// Archery: the doctor pops a balloon and shoots the scarecrow's hat, then changes the subject to posture and water; the
// professor's arrow goes plop; Housam hits the bullseye and Danny splits his arrow. The kids leave with a glow-in-the-dark
// sword, a giraffe, a plush dragon and a robot. "This time... we win!" To be continued.
// Blocking: each game is a lane along X (the player on the mark at the left, the target 400 to the right), the others in a
// group to the left of the mark. Shots cut whenever the player changes. Every shot is a pure function of t.
(() => {
  const D = LOCATIONS.dces, LINES = ASSETS.scene.scene71_festival_games.dialogue, C = FF.C;
  const Z = FF.LANE_Z, RX = FF.RINGX, AX = FF.ARCHX;
  const ACCENT = { housam: '#425DA0', danny: '#2E7D9A', jenna: '#D0508E', alma: '#994EC4', safadi: PAL.crimson, sami: '#2E7D6A' };
  const HEADW = { safadi: 6.6, sami: 6.6, jenna: 4.6, alma: 6.6, housam: 3.6, danny: 4.6 };

  // ---------- timing: the start of every line and action beat (see README.md) ----------
  const T = { OPEN: 0, FEST: 3.6, PRIZES: 7.4, WANT: 10, SCIENCE: 13.3, STEADY: 18.1, S1: 21.4, PRACTICE: 24.1, S2: 26.8, PUMPKIN: 29.6, MYTURN: 32.8, M1: 35.9,
    AHEM: 38.9, TORUS: 42.1, MARGIN: 47, CUFF: 52.8, CANI: 58.2, AL: 60.1, WIN1: 63.6, METOO: 64.9, JE: 66.4, PRIZE1: 68.7, SWORD: 70, GIRAFFE: 73.4, IMPROB: 75.9,
    ACT2: 79.5, ARCHERY: 81.9, M2: 85.4, M3: 88.4, SCARE: 91.4, POSTURE: 94.9, WATER: 100.5, SUBJECT: 104.2, ASIDE: 108.1, S3: 112.2, LOST: 115.1, HTURN: 118.9,
    HO: 120.5, WATCH: 123.2, DA: 125.1, PRIZE2: 128.3, DRAGON: 129.8, ROBOT: 132, THEORY: 134.5, NOBODY: 137.1, NEXT: 141.5, WEWIN: 144.9, LAUGH: 148.2, FREEZE: 149.8, END: 155 };

  // ---------- the cast: rig, scale, hand positions (local units) and the slot in the group (offset from the mark) ----------
  const CAST = {
    safadi: { rig: safadi, unit: SAFADI_UNIT, rest: [4.4, -8.1], sh: -13, up: -17, side: 6, slot: [-520, 80] },
    sami: { rig: sami, unit: SAMI_UNIT, rest: [4.4, -8.1], sh: -13, up: -17, side: 6, slot: [-400, 85] },
    alma: { rig: alma, unit: ALMA_UNIT, rest: [3.2, -9.6], sh: -8.5, up: -15, side: 5.2, slot: [-330, 15] },
    danny: { rig: danny, unit: DANNY_UNIT, rest: [3.5, -9.8], sh: -12.5, up: -20, side: 6, slot: [-250, 20] },
    jenna: { rig: jenna, unit: JENNA_UNIT, rest: [3.2, -11.5], sh: -12.5, up: -19, side: 6, slot: [-170, 12] },
    housam: { rig: housam, unit: HOUSAM_UNIT, rest: [4.05, -10.7], sh: -15, up: -24, side: 5.2, slot: [-90, 25] },
  };
  const NAMES = Object.keys(CAST), KIDS = ['alma', 'danny', 'jenna', 'housam'];
  const laneX = t => t < T.ACT2 ? RX : AX;
  // who stands on the mark, and when
  const MARKS = [[T.S1, T.MYTURN, 'safadi'], [T.MYTURN, T.AHEM, 'sami'], [T.AL, T.JE, 'alma'], [T.JE, T.PRIZE1, 'jenna'],
    [T.ACT2, T.ASIDE, 'sami'], [T.ASIDE, T.HTURN, 'safadi'], [T.HO, T.WATCH, 'housam'], [T.DA, T.PRIZE2, 'danny']];
  const markWho = t => MARKS.find(m => t >= m[0] && t < m[1])?.[2];
  const at = (n, t) => markWho(t) === n ? { x: laneX(t), z: Z, mark: true } : { x: laneX(t) + CAST[n].slot[0], z: Z + CAST[n].slot[1] };

  // ---------- helpers ----------
  const textLen = l => l.text.replace(/\*/g, '').length;
  const speaking = (who, t) => LINES.some(l => { if (l.speaker !== who) return false; const p = (t - l.at - .2) * l.cps; return p > 0 && p < textLen(l); });
  const curSpeaker = t => LINES.find(l => !l.silentBubble && t > l.at && t < l.at + .25 + textLen(l) / l.cps + l.hold)?.speaker;
  const inW = (t, a, b) => t >= a && t < b;
  const on = (t, a, b, r = .3) => ease(seg(t, a, a + r)) * (1 - ease(seg(t, b - r, b)));
  const bounce = (t, f = 10, ph = 0) => Math.abs(Math.sin(t * f + ph));
  const arc = (S, E, u, h) => [lerp(S[0], E[0], u), lerp(S[1], E[1], u) + h * 4 * u * (1 - u), lerp(S[2], E[2], u)];

  // ---------- ring toss: every ring thrown ----------
  const THROWS = [
    { who: 'safadi', t0: T.S1 + .3, kind: 'bounce', peg: 1, col: C.red },
    { who: 'safadi', t0: T.S2 + .3, kind: 'pumpkin', col: C.blue },
    { who: 'sami', t0: T.M1 + .4, kind: 'head', col: C.gold, fl: .9 },
    { who: 'alma', t0: T.AL + .15, kind: 'peg', peg: 0, col: C.purple, fl: .6 },
    { who: 'alma', t0: T.AL + 1.1, kind: 'peg', peg: 1, col: C.green, fl: .6 },
    { who: 'alma', t0: T.AL + 2.05, kind: 'peg', peg: 2, col: C.red, fl: .6 },
    { who: 'jenna', t0: T.JE + .4, kind: 'peg', peg: 1, col: C.pink, stack: 1 },
  ].map(th => ({ ...th, rel: th.t0 + .6, land: th.t0 + .6 + (th.fl || .8) }));
  const [TS1, TS2, TM1, , , TA3, TJ] = THROWS;
  const relH = n => -lerp(CAST[n].sh, CAST[n].up, .5) * CAST[n].unit;
  function ringAt(th, t) {                                                    // a thrown ring: in flight, on the ground, or where it ended up
    if (t < th.rel) return { state: 'hand' };
    const S = th.kind === 'head' ? [RX - 40, 75, Z] : [RX + 55, relH(th.who), Z];
    const E = th.kind === 'pumpkin' ? [FF.PUMPKIN[0], FF.PUMPKIN[1], Z] : th.kind === 'head' ? [RX + CAST.safadi.slot[0], 180, Z + CAST.safadi.slot[1]] : [FF.PEGS[th.peg], FF.PEG_TOP + 4, Z];
    if (t < th.land) { const u = seg(t, th.rel, th.land); return { state: 'fly', p: arc(S, E, u, th.kind === 'head' ? 150 : th.kind === 'pumpkin' ? 120 : 90), sq: .25 + .6 * Math.abs(Math.sin(u * 9)) }; }
    const v = t - th.land;
    if (th.kind === 'bounce') { const G = [E[0] + 100, 3, Z - 28]; return v < .55 ? { state: 'fly', p: arc(E, G, v / .55, 50), sq: .3 + .6 * Math.abs(Math.sin(v * 14)) } : { state: 'fly', p: G, sq: .3 }; }
    return { state: th.kind };
  }

  // ---------- archery: every arrow shot ----------
  const SHOTS = [
    { who: 'sami', t0: T.M2 + .3, kind: 'balloon', fletch: C.teal },
    { who: 'sami', t0: T.M3 + .3, kind: 'hat', fletch: C.teal },
    { who: 'safadi', t0: T.S3 + .4, kind: 'plop', fletch: C.red },
    { who: 'housam', t0: T.HO + .3, kind: 'bull', fletch: C.blue },
    { who: 'danny', t0: T.DA + .5, kind: 'split', fletch: C.teal },
  ].map(s => ({ ...s, rel: s.t0 + 1.1, land: s.t0 + 1.1 + (s.kind === 'plop' ? .7 : .45) }));
  const [AB, AH, AP, AU, AS] = SHOTS;
  const bowY = n => -(CAST[n].sh - 1) * CAST[n].unit;
  const BOWLEN = { safadi: 104, sami: 104, housam: 96, danny: 78 };
  function arrowAt(s, t, P) {                                                 // an arrow in flight (or lying where it fell): screen tail and head
    const S = [AX + 75, bowY(s.who), Z], k = P.k(Z);
    const E = { balloon: [FF.BALLOON[0], FF.BALLOON[1], Z + 12], hat: [FF.HAT[0] - 9, FF.HAT[1], Z + 20], bull: [FF.TARGET[0] - 2, FF.TARGET[1], Z], split: [FF.TARGET[0] - 2, FF.TARGET[1], Z], plop: [AX + 112, 3, Z - 12] }[s.kind];
    if (t < s.rel) return null;
    const u = (t - s.rel) / (s.land - s.rel);
    if (s.kind === 'plop') {
      if (t > T.HTURN) return null;
      const uu = clamp(u), [hx, hy] = P.p(lerp(S[0] + 40, E[0], uu), lerp(S[1], E[1], easeIn(uu)), E[2]), a = Math.PI + .12 - 1.1 * Math.sin(Math.PI * uu) + (u > 1 ? .06 * boing(t, s.land, 4, 5) : 0);
      return { head: [hx, hy], tail: [hx + Math.cos(a) * 62 * k, hy + Math.sin(a) * 62 * k], k };
    }
    if (u >= (s.kind === 'balloon' ? 2.6 : 1)) return null;
    const h = s.kind === 'hat' ? 46 : s.kind === 'balloon' ? 0 : 14, pos = v => P.p(...arc(S, E, v, h)), a = pos(u), b = pos(u - .04);
    const d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1;
    return { head: [a[0], a[1]], tail: [a[0] - (a[0] - b[0]) / d * 62 * k, a[1] - (a[1] - b[1]) / d * 62 * k], k };
  }

  // the state of the games, for the props
  function gameState(t) {
    const pegRings = [[], [], []];
    for (const th of THROWS) if (th.kind === 'peg' && t >= th.land) pegRings[th.peg].push({ col: th.col, y: lerp(FF.PEG_TOP, FF.TABLE_Y + 5 + 8 * (th.stack || 0), easeOut(seg(t, th.land, th.land + .22))) });
    const arrows = [];
    if (t >= AU.land) arrows.push({ y: 0, age: t - AU.land, fletch: AU.fletch, split: t >= AS.land ? t - AS.land : null });
    if (t >= AS.land) arrows.push({ y: 0, age: t - AS.land, fletch: AS.fletch });
    return { pegRings, pumpkinRing: t >= TS2.land ? TS2.col : null, pop: t >= AB.land ? t - AB.land : null, hat: t >= AH.land ? t - AH.land : null, arrows,
      thunk: t >= AS.land ? t - AS.land : t >= AU.land ? t - AU.land : null,
      gone: { sword: t > T.PRIZE1 + .3, giraffe: t > T.PRIZE1 + .3, dragon: t > T.PRIZE2 + .3, robot: t > T.PRIZE2 + .3 } };
  }
  const DINGS = [...THROWS.filter(th => th.kind === 'peg').map(th => th.land), T.WIN1, AU.land, AS.land, T.PRIZE1 + .3, T.PRIZE2 + .3];
  const cheer = t => DINGS.reduce((m, d) => Math.max(m, kick(t, d, 3.5)), 0);

  // ---------- poses ----------
  function throwPose(c, t, th, slip) {                                        // wind up behind, then sling the arm forward
    const w = ease(seg(t, th.t0, th.t0 + .55)), f = easeOut(seg(t, th.t0 + .55, th.t0 + .8)), back = 1 - ease(seg(t, th.t0 + 1.5, th.t0 + 2));
    if (t < th.t0 - .01 || back <= 0) return {};
    const hx = lerp(lerp(c.side * .6, -c.side * (slip ? .75 : .4), w), c.side * 1.25, f), hy = lerp(lerp(c.sh, c.sh + (slip ? -2.5 : 2.5), w), lerp(c.sh, c.up, .5), f);
    return { handR: [lerp(c.rest[0], hx, back), lerp(c.rest[1], hy, back)], handPoseR: 'fist', lean: (-.09 * w + .2 * f) * back, brows: 'focused' };
  }
  function archerPose(c, t, s) {                                              // bow arm out toward the target, string hand drawing back to the chin
    const r = ease(seg(t, s.t0 - .6, s.t0 - .1)) * (1 - ease(seg(t, s.rel + 1.1, s.rel + 1.6))), d = ease(seg(t, s.t0, s.t0 + .8)), f = seg(t, s.rel, s.rel + .12);
    if (r <= 0) return {};
    const bowH = [lerp(c.rest[0], c.side * 1.2, r), lerp(c.rest[1], c.sh - 1, r)];
    const strH = f > 0 ? [lerp(-c.side * .25, -c.side * .7, f), c.sh - 1.5] : [lerp(lerp(-c.rest[0], c.side * .7, r), -c.side * .25, d), lerp(c.rest[1], c.sh - .8, r)];
    return { handR: bowH, handPoseR: 'fist', handL: strH, handPoseL: f > 0 ? 'open' : 'fist', lean: -.05 * d * r, brows: 'focused', lookX: .8, lookY: 0 };
  }

  function pose(n, t, a) {
    const c = CAST[n], adult = n === 'safadi' || n === 'sami', talk = speaking(n, t), say = m => talk ? lipFlap(t, true, m) : m;
    const big = adult || n === 'alma' || n === 'jenna' ? 'O' : 'open', ph = NAMES.indexOf(n) * 1.3;
    const o = { mouth: say('smile'), brows: 'normal', eyes: 'open', lookX: .55, lookY: 0, turn: a.mark ? .3 : .12, handL: [-c.rest[0], c.rest[1]], handR: [c.rest[0], c.rest[1]], handPoseL: 'open', handPoseR: 'open' };
    if (n === 'jenna') o.giraffe = t > T.PRIZE1 + .3;
    const set = p => Object.assign(o, p), is = (...ns) => ns.includes(n), kid = !adult;
    const up2 = (k = 1) => ({ handL: [-c.side * .9, lerp(c.sh, c.up, k)], handR: [c.side * .9, lerp(c.sh, c.up, k)], handPoseL: 'fist', handPoseR: 'fist' });
    const point = { handR: [c.side * 1.2, c.sh], handPoseR: 'point' }, fingerUp = { handR: [c.side * .55, c.up - 1], handPoseR: 'point' };
    const laugh = { eyes: 'happy', mouth: 'open', dy: .2 * bounce(t, 10, ph) }, gasp = { eyes: 'wide', mouth: big, brows: 'up' };
    const deadpan = { eyes: 'narrow', mouth: say('flat'), brows: 'normal' };
    const sp = curSpeaker(t);
    if (sp && sp !== n) set({ lookX: clamp((at(sp, t).x - a.x) / 150, -.8, .8) });
    const hop = cheer(t);
    if (kid && hop > .05 && !a.mark) set({ jump: 1.3 * hop * bounce(t, 9, ph), eyes: 'happy', mouth: 'grin', brows: 'up' });

    if (t < T.S1) {                                                           // arriving: the kids want prizes, the brothers are sure of themselves
      if (kid) set({ brows: 'up', jump: .5 * bounce(t, 5, ph) * on(t, .4, T.SCIENCE, .4) });
      if (is('alma') && inW(t, T.FEST, T.PRIZES)) set({ ...up2(.8), handPoseL: 'palm', handPoseR: 'palm', eyes: talk ? 'open' : 'star', jump: 1.2 * bounce(t, 6) });
      if (is('housam') && inW(t, T.PRIZES, T.SCIENCE)) set({ ...point, mouth: say('grin') });
      if (is('danny') && inW(t, T.WANT, T.SCIENCE)) set({ ...up2(1), eyes: 'wide', mouth: say(big), jump: 1.6 * bounce(t, 7) });
      if (t >= T.SCIENCE) {
        if (kid) set({ lookX: -.7, mouth: 'smile', jump: 0 });
        if (is('safadi')) set(t < T.STEADY ? { ...fingerUp, brows: 'up', eyes: inW(t, 15.6, T.STEADY) ? 'closed' : 'open', mouth: say('smirk'), power: .25 * on(t, 15, T.STEADY, .4), lookX: .5 } : { mouth: 'smirk', lookX: .6 });
        if (is('sami')) set(t < T.STEADY ? { lookX: -.6, mouth: 'grin' } : { handL: [-3, -13], handR: [3, -13], handPoseL: 'palm', handPoseR: 'palm', eyes: inW(t, 18.8, 20.2) ? 'closed' : 'open', mouth: say('grin'), brows: 'up' });
      }
    } else if (t < T.MYTURN) {                                                // the professor's two throws
      if (is('safadi')) {
        set({ lookX: .7, brows: 'focused', mouth: 'flat', ...throwPose(c, t, TS1), ...throwPose(c, t, TS2) });
        if (inW(t, TS1.land, T.PRACTICE) || inW(t, TS2.land, TS2.land + 1)) set({ ...gasp, brows: 'worried', mouth: 'o' });
        if (inW(t, T.PRACTICE, T.S2)) set({ ...fingerUp, eyes: 'closed', mouth: say('smirk'), brows: 'up', lookX: -.3, turn: 0 });
        if (t > TS2.land + 1) set({ ...deadpan, brows: 'worried', lookX: .8, emote: 'sweat', emoteK: on(t, TS2.land + 1, T.MYTURN, .3) });
      } else {
        set({ lookX: .8 });
        if (inW(t, TS1.land + .2, T.PRACTICE + 1) || t > TS2.land + .2) set(kid ? laugh : { eyes: 'happy', mouth: 'grin' });
        if (is('jenna') && t >= T.PUMPKIN) set({ ...point, eyes: 'open', mouth: say('smirk'), dy: 0 });
      }
    } else if (t < T.AHEM) {                                                  // the doctor's turn: the ring slips out backward
      if (is('sami')) {
        set({ lookX: .7, mouth: say('grin'), brows: 'up' });
        if (t < T.M1) set({ handL: [-1.5, -13], handPoseL: 'thumb' });
        set(throwPose(c, t, TM1, true));
        if (inW(t, TM1.rel + .25, TM1.land)) set({ eyes: 'wide', mouth: 'o', brows: 'up', lookX: .3, lookY: .4, emote: '?', emoteK: on(t, TM1.rel + .25, TM1.land + .2, .15) });
        if (t >= TM1.land) set({ lookX: -.9, turn: -.25, eyes: 'wide', mouth: 'teeth', brows: 'worried', handR: [c.rest[0], c.rest[1]], handPoseR: 'open', lean: 0 });
      } else if (is('safadi')) {
        set({ lookX: .7, mouth: 'smirk', brows: 'quizzical' });
        if (t >= TM1.land) set({ sq: .16 * boing(t, TM1.land, 3, 5), eyes: t < TM1.land + .5 ? 'squeeze' : 'narrow', mouth: 'flat', brows: 'normal', lookX: .5 });
      } else {
        set({ lookX: .8 });
        if (inW(t, TM1.rel, TM1.land)) set({ ...gasp, lookX: 0, lookY: -.7 });
        if (t >= TM1.land) set({ ...(t < TM1.land + .4 ? gasp : laugh), lookX: -.8 });
      }
    } else if (t < T.CANI) {                                                  // the explanation, and the prescription
      if (is('safadi')) {
        const pw = .45 * on(t, T.TORUS - .3, T.CUFF - .3, .5);
        set({ lookX: .4, brows: 'up' });
        if (t < T.TORUS) set({ handR: [1.3, -15.5], handPoseR: 'fist', eyes: t < T.AHEM + 1 ? 'closed' : 'open', mouth: say('flat'), brows: 'normal' });
        else if (t < T.MARGIN) set({ power: pw, eyes: pw > .3 ? 'glow' : 'open', handR: [6.2, -15.6], handPoseR: 'palm' });
        else if (t < T.CUFF) set({ power: pw, eyes: pw > .3 ? 'glow' : 'open', ...(t < 50.2 ? { handL: [-1.3, -14], handR: [1.3, -14], handPoseL: 'point', handPoseR: 'point' } : { handL: [-6, -12], handR: [6, -12], handPoseL: 'palm', handPoseR: 'palm', brows: 'worried' }) });
        else set({ lookX: .6, eyes: inW(t, 55.5, 57.6) ? 'closed' : 'open', mouth: 'flat', tilt: inW(t, 55.5, 57.6) ? .04 * Math.sin(t * 6) : 0 });
      } else if (is('sami')) {
        set({ lookX: -.7, brows: 'up' });
        if (t < T.CUFF) set({ eyes: inW(t, 44, 46) || inW(t, 49, 51) ? 'closed' : 'open', tilt: .04 * Math.sin(t * 3), mouth: 'smile' });
        else set({ lookX: .3, power: .35 * on(t, T.CUFF, T.CANI - .2, .5), handL: [3.4, -15.2], handPoseL: 'palm', lean: .05 * Math.sin(t * 4), ...(t > 55.6 ? { handR: [5.6, -13.5], handPoseR: 'thumb', mouth: say('grin') } : {}) });
      } else set({ lookX: -.8, mouth: 'flat', brows: t > T.TORUS + 2 ? 'worried' : 'normal', eyes: is('danny') && inW(t, 48, T.CUFF) ? 'closed' : 'open', tilt: is('danny') && inW(t, 48, T.CUFF) ? .1 : 0 });
    } else if (t < T.ACT2) {                                                  // the girls ring every peg
      if (is('alma')) {
        if (t < T.AL) set({ handR: [c.side * .6, c.up - 2], handPoseR: 'palm', brows: 'up', jump: .8 * bounce(t, 7), lookX: -.6 });
        else if (a.mark) {
          set({ lookX: .8, brows: 'angry', mouth: 'grin' });
          for (const th of THROWS) if (th.who === 'alma') set(throwPose(c, t, th));
          set({ brows: 'angry' });
          if (t > TA3.land) set({ ...up2(1), eyes: 'star', mouth: big, brows: 'up', jump: 1.6 * bounce(t, 7), lean: 0 });
        }
      }
      if (is('jenna')) {
        if (inW(t, T.METOO, T.JE)) set({ handR: [c.side * .6, c.up - 1], handPoseR: 'palm', jump: 1.2 * bounce(t, 8), mouth: say('grin'), brows: 'up' });
        if (a.mark) { set({ lookX: .8, mouth: 'grin', brows: 'up', jump: 1.2 * kick(t, T.JE + .05, 5), ...throwPose(c, t, TJ) }); set({ brows: 'up' });
          if (t > TJ.land) set({ ...up2(1), eyes: 'star', mouth: big, jump: 1.6 * bounce(t, 7), lean: 0 }); }
      }
      if (adult && inW(t, T.CANI, T.AL)) set({ lookX: .6, mouth: 'smirk', brows: 'quizzical' });
      if (adult && inW(t, T.AL, T.IMPROB)) set({ lookX: .8, ...(t > THROWS[3].land ? gasp : {}), ...(t > TA3.land ? { emote: '!', emoteK: on(t, TA3.land, TA3.land + 1.4, .15) } : {}) });
      if (t >= T.PRIZE1 + .3) {
        if (is('alma')) set({ handR: [c.side * 1.3, c.up + 3], handPoseR: 'fist', _sword: .18 + .1 * Math.sin(t * 3), eyes: inW(t, T.PRIZE1, T.GIRAFFE) && !talk ? 'star' : 'open', mouth: say('grin'), brows: 'up', jump: 1.1 * bounce(t, 6) * on(t, T.PRIZE1 + .3, T.GIRAFFE, .3) });
        if (is('jenna')) set({ eyes: inW(t, T.GIRAFFE, T.IMPROB) && !talk ? 'happy' : 'open', mouth: say('grin'), tilt: .06 * Math.sin(t * 4) * on(t, T.GIRAFFE, T.IMPROB, .3) });
        if (is('danny') && inW(t, T.SWORD, T.GIRAFFE)) set({ lookX: -.7, brows: 'worried', mouth: 'o', jump: 0, eyes: 'wide' });
      }
      if (t >= T.IMPROB) {
        if (is('safadi')) set({ ...deadpan, lookX: .3, lookY: -.15, emote: undefined });
        if (is('sami')) set({ lookX: -.7, mouth: 'smirk', brows: 'up', eyes: 'open', emote: undefined });
        if (kid) set({ lookX: -.8, ...(talk ? {} : { eyes: 'happy', mouth: 'grin' }) });
      }
    } else if (t < T.ASIDE) {                                                 // archery: the doctor shoots a balloon and a scarecrow, then changes the subject
      if (is('alma')) set({ _sword: .22, handR: [c.side * 1.35, c.sh + 1], handPoseR: 'fist' });
      if (is('sami')) {
        set({ lookX: .7, brows: 'up', mouth: say('grin') });
        if (inW(t, T.ARCHERY, T.M2)) set({ handR: [5, -18], handPoseR: 'fist', lookX: -.3, turn: 0, jump: .5 * kick(t, T.ARCHERY + .1, 4) });
        set({ ...archerPose(c, t, AB), ...archerPose(c, t, AH) });
        if (inW(t, AB.land, T.M3)) set({ ...gasp, mouth: 'o', lookY: -.6 });
        if (inW(t, AH.land, T.POSTURE)) set({ eyes: 'wide', mouth: 'teeth', brows: 'worried', lookX: .8, emote: 'sweat', emoteK: on(t, AH.land, T.POSTURE, .3) });
        if (inW(t, T.POSTURE, T.SUBJECT)) { const pw = .4 * on(t, T.POSTURE + .5, T.SUBJECT - .2, .5);
          set({ lookX: -.4, turn: -.1, power: pw, eyes: pw > .3 ? 'glow' : 'open', brows: 'up', mouth: say('grin'), handL: [-3.4, -19], handPoseL: 'point', ...(inW(t, 97.8, T.WATER) ? { handL: [-4.6, -9.5], handPoseL: 'fist', lean: -.07 } : {}) });
          if (t >= T.WATER) set({ handL: [-c.rest[0], c.rest[1]], handPoseL: 'open', handR: [6.2, -15.6], handPoseR: 'palm', lookX: .3 }); }
        if (t >= T.SUBJECT) set({ lookX: -.8, turn: -.2, eyes: 'wide', mouth: 'teeth', brows: 'worried' });
      } else {
        set({ lookX: .8 });
        if (inW(t, AB.land, AB.land + .5) || inW(t, AH.land, AH.land + .5)) set(gasp);
        if (inW(t, AB.land + .5, T.M3) || inW(t, AH.land + .5, T.SCARE)) set(kid ? laugh : { eyes: 'happy', mouth: 'grin' });
        if (is('safadi')) set({ mouth: o.mouth === 'smile' ? 'smirk' : o.mouth });
        if (is('danny') && inW(t, T.SCARE, T.POSTURE)) set({ ...point, mouth: say('grin'), eyes: 'open', dy: 0, jump: .6 * bounce(t, 7) });
        if (kid && !is('danny') && inW(t, T.SCARE, T.POSTURE)) set(laugh);
        if (kid && inW(t, T.POSTURE, T.SUBJECT)) set({ mouth: 'flat', brows: 'normal', ...(inW(t, 98.2, T.WATER) ? { lean: -.05, brows: 'up', eyes: 'wide' } : {}) });
        if (is('housam') && t >= T.SUBJECT) set({ handR: [c.side, c.sh + 3], handPoseR: 'palm', eyes: inW(t, T.SUBJECT, T.SUBJECT + 1) ? 'closed' : 'open', mouth: say('smirk'), brows: 'up' });
        if (kid && !is('housam') && t >= T.SUBJECT + 1.5) set({ eyes: 'happy', mouth: 'grin', dy: .15 * bounce(t, 8, ph) });
      }
    } else if (t < T.PRIZE2) {                                                // the professor's arrow goes plop; Housam and Danny do not miss
      if (is('alma')) set({ _sword: .22, handR: [c.side * 1.35, c.sh + 1], handPoseR: 'fist' });
      if (is('safadi')) {
        if (a.mark) {
          set({ lookX: .7, brows: 'up' });
          if (t < T.S3) set({ handL: [-3.4, -19], handPoseL: 'point', power: .3 * on(t, T.ASIDE + .8, T.S3, .4), lookX: -.2, turn: .1 });
          set(archerPose(c, t, AP));
          if (t >= AP.rel) set({ lookX: .5, lookY: seg(t, AP.rel, AP.land) * .8, eyes: t < AP.land + .5 ? 'wide' : 'narrow', mouth: say('flat'), brows: t > T.LOST ? 'worried' : 'up', emote: 'sweat', emoteK: on(t, AP.land + .3, T.HTURN, .3) });
        } else set({ lookX: .8, ...(t > AU.land ? { ...gasp, emote: '!', emoteK: on(t, AU.land, AU.land + 1.2, .15) } : {}) });
      } else if (is('sami')) {
        set({ lookX: .8 });
        if (inW(t, AP.land + .2, T.HTURN)) set({ eyes: 'happy', mouth: 'open', dy: .25 * bounce(t, 10), handL: [-5.2, -12], handR: [5.2, -12] });
        if (t > AU.land) set(gasp);
      } else {
        set({ lookX: .8 });
        if (inW(t, AP.land + .2, T.HTURN) && !a.mark) set(laugh);
        if (is('housam')) {
          if (inW(t, T.HTURN, T.HO)) set({ handR: [c.side * .6, c.up], handPoseR: 'fist', mouth: say('grin'), brows: 'up' });
          if (a.mark) { set({ mouth: 'smirk', ...archerPose(c, t, AU) }); if (t > AU.land) set({ handL: [-c.side * .8, c.up], handPoseL: 'fist', eyes: 'happy', mouth: 'grin', brows: 'up', jump: 1.4 * kick(t, AU.land + .05, 3) }); }
        }
        if (is('danny')) {
          if (inW(t, T.WATCH, T.DA)) set({ handR: [1.2, c.sh], handPoseR: 'point', mouth: say('grin'), brows: 'up', jump: 1.1 * bounce(t, 8), eyes: 'open', lookX: -.3 });
          if (a.mark) { set({ mouth: 'smirk', ...archerPose(c, t, AS) }); if (inW(t, AS.t0, AS.rel)) set({ eyes: 'closed', brows: 'up', lookX: 0 });       // eyes closed: showing off
            if (t > AS.land) set({ ...up2(1), eyes: 'happy', mouth: 'grin', brows: 'up', jump: 1.6 * bounce(t, 7), lean: 0 }); }
        }
      }
    } else {                                                                  // the prizes, the excuses, the next game
      set({ lookX: adult ? .6 : -.3 });
      if (sp && sp !== n) set({ lookX: clamp((at(sp, t).x - a.x) / 150, -.8, .8) });
      if (is('alma')) set({ _sword: .22, handR: [c.side * 1.35, c.sh + 1], handPoseR: 'fist', mouth: say('grin') });
      if (is('jenna')) set({ mouth: say('grin') });
      if (is('housam')) set({ handL: [-2.4, c.sh + 2], handPoseL: 'fist', _dragon: true, mouth: say('grin'), ...(inW(t, T.DRAGON, T.ROBOT) ? { handL: [-c.side * .8, c.up * .8], brows: 'up', jump: .9 * bounce(t, 6) } : {}) });
      if (is('danny')) set({ handL: [-1.8, c.sh + 1], handR: [1.8, c.sh + 1], handPoseL: 'fist', handPoseR: 'fist', _robot: true, mouth: say('grin'),
        ...(inW(t, T.ROBOT, T.THEORY) ? { handL: [-2.2, c.up], handR: [2.2, c.up], eyes: talk ? 'wide' : 'happy', brows: 'up', jump: 1.3 * bounce(t, 7) } : {}) });
      if (adult && t < T.DRAGON) set({ ...gasp, lookX: t > T.PRIZE2 + .8 ? (is('safadi') ? .8 : -.8) : .7, turn: t > T.PRIZE2 + .8 ? (is('safadi') ? .25 : -.25) : .12, emote: '!', emoteK: on(t, T.PRIZE2, T.PRIZE2 + 1.3, .15) });
      if (adult && inW(t, T.DRAGON, T.THEORY)) set({ mouth: 'flat', brows: 'worried' });
      if (inW(t, T.THEORY, T.NOBODY)) { if (is('safadi')) set({ ...fingerUp, eyes: t > T.THEORY + .9 ? 'closed' : 'open', mouth: say('smirk'), brows: 'up', lookX: .3 }); if (is('sami')) set({ lookX: -.8, brows: 'quizzical', mouth: 'flat' }); }
      if (inW(t, T.NOBODY, T.NEXT)) { if (is('sami')) set({ handR: [1.6, -13], handPoseR: 'stethoscope', lookX: .2, brows: 'up', mouth: say('smirk'), eyes: inW(t, 140, 141.2) ? 'wink' : 'open' }); if (is('safadi')) set({ lookX: .7, eyes: inW(t, 139.6, 141.2) ? 'closed' : 'open', tilt: inW(t, 139.6, 141.2) ? .05 * Math.sin(t * 7) : 0, mouth: 'smile' }); }
      if (kid && inW(t, T.THEORY, T.NEXT) && !talk) set({ eyes: 'happy', mouth: 'grin', dy: .15 * bounce(t, 8, ph) });
      if (inW(t, T.NEXT, T.WEWIN)) {
        if (is('alma')) set({ handR: [c.side * 1.3, c.up + 1], _sword: .85, eyes: talk ? 'open' : 'star', brows: 'up', jump: 1.2 * bounce(t, 7), lookX: .7 });
        else set({ lookX: .8, brows: 'up', ...(kid ? { jump: .7 * bounce(t, 7, ph) } : { mouth: 'smirk' }) });
      }
      if (t >= T.WEWIN) {
        if (adult) { const k = on(t, T.WEWIN + .5, T.END, .25); set({ lookX: lerp(is('safadi') ? .8 : -.8, .5, k), turn: is('safadi') ? .2 : -.2, brows: 'angry', mouth: say('grin'), eyes: 'open',
          ...(k > .3 ? { ...up2(1.1), jump: 1.4 * kick(t, T.WEWIN + .75, 3) + (t > T.LAUGH ? .5 * bounce(t, 6, ph) : 0), mouth: say(t < T.LAUGH ? 'O' : 'grin') } : {}) }); }
        else { set({ lookX: -.7 }); if (t >= T.LAUGH - .4) set({ ...laugh, jump: .9 * bounce(t, 8, ph) }); if (is('alma')) set({ handR: [c.side * .8, c.up], _sword: -.12 + .1 * Math.sin(t * 5) }); }
      }
    }
    return o;
  }

  // ---------- drawing a character, with whatever is in its hands ----------
  function drawChar(P, n, a, t, A, S, fz) {
    const c = CAST[n], p = { ...pose(n, t, a), t, ...fz }, [sx, sy, k] = P.p(a.x, 0, a.z), s = c.unit * k;
    const Ax = A[n] = c.rig(sx, sy, s, p); S[n] = s;
    if (a.mark && t < T.ACT2) {                                               // the next ring, in the throwing hand
      const i = THROWS.findIndex(q => q.who === n && t < q.rel), prev = THROWS[i - 1];
      if (i >= 0 && !(prev && prev.who === n && t < prev.rel + .2)) FF.ring(Ax.handR[0], Ax.handR[1] + .5 * s, 15 * k, 7 * k, THROWS[i].col, { rot: .35 });
    }
    if (a.mark && t >= T.ACT2) {                                              // the bow, and the arrow on the string
      const cur = SHOTS.find(q => q.who === n && t >= q.t0 - .9 && t < q.rel), len = BOWLEN[n] * k, hx = Ax.handR[0], hy = Ax.handR[1];
      const nock = cur && t >= cur.t0 - .1 ? [Ax.handL[0], Ax.handL[1]] : null, n0 = nock || [hx - len * .16, hy];
      FF.bow(hx, hy, len, nock);
      if (cur) FF.arrow(n0[0], n0[1], n0[0] + 62 * k, n0[1] - (cur.kind === 'balloon' ? 9 * k * seg(t, cur.t0, cur.rel) : 0), k, { fletch: cur.fletch });
    }
    if (n === 'safadi' && t >= TM1.land && t < T.ACT2) FF.ring(Ax.top[0] + .3 * s, Ax.top[1] + .9 * s - 14 * k * kick(t, TM1.land, 9), 17 * k, 5.5 * k, TM1.col, { rot: -.12 });   // the doctor's ring
    const pop = t0 => backOut(seg(t, t0 + .3, t0 + .7));
    if (p._sword != null && t > T.PRIZE1 + .3) FF.prize('sword', Ax.handR[0], Ax.handR[1] + .8 * s, s * .46, t, { ang: p._sword, k: pop(T.PRIZE1), glow: fz ? 1 : .6 + .3 * Math.sin(t * 5) });
    if (p._dragon && t > T.PRIZE2 + .3) FF.prize('dragon', Ax.handL[0] - .6 * s, Ax.handL[1] + 3.2 * s, s * .56, t, { k: pop(T.PRIZE2), ang: -.08 });
    if (p._robot && t > T.PRIZE2 + .3) FF.prize('robot', (Ax.handL[0] + Ax.handR[0]) / 2, (Ax.handL[1] + Ax.handR[1]) / 2 + 3 * s, s * .62, t, { k: pop(T.PRIZE2) });
  }

  // festival-goers behind the games: [X, Z, seed]
  const CROWD = [[-1445, 2015, 3], [-1350, 2052, 8], [-530, 2060, 12], [-20, 2040, 21], [150, 2062, 5], [1260, 2010, 17], [1405, 2050, 9]];
  function drawStudent(P, [x, z, seed], t) {
    const look = studentLook(seed), [sx, sy, k] = P.p(x, 0, z), hop = cheer(t);
    student(sx, sy, STUDENT_UNIT * k * look.h, { look, seed, t, lookX: clamp((laneX(t) + 200 - x) / 500, -.8, .8), mouth: hop > .1 ? 'grin' : 'smile', eyes: hop > .1 ? 'happy' : 'open',
      jump: 1.2 * hop * bounce(t, 8, seed), dy: .12 * Math.sin(t * 2 + seed), ...(hop > .1 ? { handL: [-4.3, -19], handR: [4.3, -19] } : {}) });
  }

  // ---------- the stage, for a camera ----------
  function stage(t, camO, blur, o = {}) {
    const P = persp(camO), A = {}, S = {}, items = [], fz = o.freeze ? { boil: 0 } : null, wide = camO.z < 1250;
    for (const n of NAMES) { const a = at(n, t); if (P.depth(a.z) > 40) items.push({ z: a.z, draw: () => drawChar(P, n, a, t, A, S, fz) }); }
    for (const c of CROWD) if (P.depth(c[1]) > 40) items.push({ z: c[1], draw: () => drawStudent(P, c, t) });
    items.push(...FF.dress(P, t, gameState(t)));
    items.sort((p, q) => q.z - p.z);
    layer(() => { D.back(P, t, wide ? { splitZ: 1400 } : {}); FF.grade(); }, { blur });
    items.forEach(it => it.draw());
    if (wide) D.front(P, t, { splitZ: 1400 });
    overWorld(t, P, A, S);
    FF.leaves(t);
    return { A, S, P };
  }
  // things over everyone: rings and arrows in the air, the chalkboards, the sound effects
  function overWorld(t, P, A, S) {
    const vis = P.depth(Z) > 40, k = P.k(Z), W3 = (x, y, z = Z) => P.p(x, y, z);
    const fx = (txt, x, y, size, col, t0, life = 1) => { if (vis && t >= t0 && t < t0 + life) { const [sx, sy] = W3(x, y); sfx(txt, sx, sy, size, col, t - t0, { life }); } };
    if (vis && t < T.ACT2) for (const th of THROWS) { const r = ringAt(th, t); if (r.p) { const [sx, sy, rk] = P.p(...r.p); FF.ring(sx, sy, 15 * rk, 15 * rk * r.sq, th.col, { rot: r.sq > .31 ? .3 * Math.sin(t * 20) : 0 }); } }
    if (vis && t >= T.ACT2) for (const s of SHOTS) { const a = arrowAt(s, t, P); if (a) FF.arrow(a.tail[0], a.tail[1], a.head[0], a.head[1], a.k, { fletch: s.fletch }); }
    // the professor's chalkboard, the doctor's chart
    if (inW(t, T.TORUS - .3, T.CUFF - .2) && P.depth(Z + 80) > 40) { const [bx, by, bk] = P.p(RX - 235, 300, Z + 80); safadiBoard(bx, by, 250 * bk * (1 - ease(seg(t, T.CUFF - .5, T.CUFF - .2))), seg(t, T.TORUS - .3, T.TORUS + 3.2), t, { kind: 'graph', title: 'RING TOSS MECHANICS' }); }
    if (inW(t, T.WATER - .3, T.SUBJECT - .1) && vis) { const [bx, by, bk] = W3(AX + 255, 235); samiBoard(bx, by, 230 * bk * (1 - ease(seg(t, T.SUBJECT - .4, T.SUBJECT - .1))), seg(t, T.WATER - .3, T.WATER + 2.6), t, { kind: 'none', title: "DOCTOR'S ORDERS" });
      const out = 1 - ease(seg(t, T.SUBJECT - .4, T.SUBJECT - .1)), u = 2.3 * bk * out;                // eight glasses of water, chalked on one by one
      for (let i = 0; i < 8; i++) { const g = backOut(seg(t, T.WATER + .5 + i * .22, T.WATER + .75 + i * .22)) * out; if (g <= 0) continue;
        const gx = bx + ((i % 4) - 1.5) * 22 * u, gy = by + (i < 4 ? -4 : 22) * u, w = 6.5 * u * g, h = 16 * u * g;
        shape([[gx - w * .8, gy - h / 2 + h * .3], [gx + w * .8, gy - h / 2 + h * .3], [gx + w * .65, gy + h / 2], [gx - w * .65, gy + h / 2]], { fill: '#7CC8F2', stroke: null, alpha: .9 });
        line([[gx - w, gy - h / 2], [gx - w * .65, gy + h / 2], [gx + w * .65, gy + h / 2], [gx + w, gy - h / 2]], { stroke: '#F4F7F2', lwPx: Math.max(2, 1.1 * u) }); } }
    // sound effects
    fx('CLANK!', FF.PEGS[1], 150, 70, '#FFFDF6', TS1.land);
    fx('PLOP!', FF.PUMPKIN[0] - 20, 130, 66, C.orangeLt, TS2.land);
    fx('OOPS!', RX + 20, 215, 60, '#FFFDF6', TM1.rel + .1, .8);
    if (A.safadi && t >= TM1.land) sfx('BONK!', A.safadi.top[0] + 5 * S.safadi, A.safadi.top[1] - 1.5 * S.safadi, 78, PAL.goldLt, t - TM1.land, { life: 1 });
    THROWS.filter(th => th.kind === 'peg').forEach((th, i) => fx('DING!', FF.PEGS[th.peg] + 10, 150 + 22 * (i % 3), 64, C.gold, th.land, .8));
    fx('POP!', FF.BALLOON[0], FF.BALLOON[1] + 50, 84, '#FFFDF6', AB.land);
    fx('THUNK!', FF.HAT[0] - 70, FF.HAT[1] + 55, 66, C.strawLt, AH.land);
    fx('TWANG...', AX + 95, 150, 54, '#FFFDF6', AP.rel, .8); fx('plop.', AX + 150, 50, 50, '#FFFDF6', AP.land, 1.1);
    fx('BULLSEYE!', FF.TARGET[0] - 60, 205, 84, C.gold, AU.land, 1.3);
    fx('CRACK!', FF.TARGET[0] - 50, 200, 96, '#FF6B6B', AS.land, 1.2);
    for (const [n, t0] of [['alma', T.PRIZE1], ['jenna', T.PRIZE1], ['housam', T.PRIZE2], ['danny', T.PRIZE2]]) if (A[n] && inW(t, t0 + .3, t0 + 1.2)) sfx('✦', A[n].top[0], A[n].top[1] - 3 * S[n], 70, '#FFE066', t - t0 - .3, { life: .9 });
  }

  // ---------- bubbles: beside the speaker; from the left edge when the speaker is out of frame ----------
  function bubbles(t, A, S, o = {}) {
    for (const l of LINES) {
      if (l.silentBubble) continue;
      const age = t - l.at; if (age < 0 || age > 10) continue;
      const c = { size: o.size || 48, maxW: o.maxW || 640, cps: l.cps, hold: l.hold, kind: l.kind, accent: ACCENT[l.speaker] };
      if (l.group) { const ms = l.group.map(n => A?.[n]).filter(a => a && a.mouth[0] > 0 && a.mouth[0] < W);
        if (ms.length > 1) { callout(l.text, ms.reduce((a, m) => a + m.mouth[0], 0) / ms.length, Math.min(...ms.map(m => m.mouth[1])) - 40, age, { ...c, size: c.size * 1.25, dx: 0, dy: o.groupDy ?? -230 }); continue; } }
      const a = A?.[l.speaker], s = S?.[l.speaker];
      if (a && a.mouth[0] > 60 && a.mouth[0] < W - 60 && a.mouth[1] > 40 && a.mouth[1] < H) {
        const side = o.side?.[l.speaker] ?? (a.mouth[0] < W * .5 ? 1 : -1);
        callout(l.text, a.mouth[0] + side * HEADW[l.speaker] * s * .9, a.mouth[1] - .6 * s, age, { ...c, dx: side * (o.far || 260), dy: o.dy ?? -210 });
      } else callout(l.text, -30, o.edgeY ?? H * .42, age, { ...c, dx: 400, dy: -150 });
    }
  }

  // ---------- cameras: offsets from the mark of the current lane ----------
  const drift = t => [9 * Math.sin(t * .23), 5 * Math.sin(t * .31)];
  const cam = (dx, y, z, hy, f = 1000) => t => { const [ox, oy] = drift(t); return { x: laneX(t) + dx + ox, y, z, f, hy: hy + oy }; };
  const ESTAB = t => { const u = ease(seg(t, 0, 3.6)); return { x: lerp(120, -330, u), y: lerp(560, 300, u), z: lerp(260, 900, u), f: 900, hy: lerp(300, 470, u) }; };
  const LANE = cam(-60, 170, 1360, 588, 830);                                 // the group, the mark and the target
  const THROW = cam(215, 125, 1440, 600);                                     // ring toss: the mark, the pegs, the pumpkin
  const THROWA = cam(255, 130, 1420, 600);                                    // archery: the mark, the target, the balloons, the scarecrow
  const PEGS = cam(400, 95, 1640, 560), BULL = cam(405, 100, 1610, 560);      // close on the pegs; close on the target
  const GROUP = cam(-250, 120, 1585, 640);                                    // the group, the kids in front
  const PROF = cam(-430, 140, 1575, 646);                                     // the brothers at the back of the group
  const MARKC = cam(80, 130, 1570, 610);                                      // the player on the mark, room for a chart beside him
  const FINALE = cam(-300, 130, 1560, 632);                                   // everyone and their prizes
  const BOOTH = t => { const [ox, oy] = drift(t); return { x: RX + 430 + ox, y: 150, z: lerp(1700, 1760, ease(seg(t, T.PRIZES, T.WANT))), f: 1000, hy: 500 + oy }; };

  const shot = (camFn, blur, bo, extra) => t => { const r = stage(t, camFn(t), blur); bubbles(t, r.A, r.S, bo); if (extra) extra(t, r); };
  const opening = shot(ESTAB, 0, {}, t => FF.title(t, .5, 3.5));
  const lane = shot(LANE, .6, { size: 44, far: 220, dy: -190 }, t => FF.card('NEXT GAME: ARCHERY', on(t, T.ACT2 + .1, T.ARCHERY + .4, .3)));
  const laneSlip = shot(LANE, .6, { size: 44, far: 220, dy: -230, side: { sami: -1 } });
  const group = shot(GROUP, 1.6, { far: 240, dy: -220, side: { housam: -1, jenna: -1, alma: 1, danny: 1 } });
  const prof = shot(PROF, 1.6, { far: 250, dy: -230, side: { safadi: -1, sami: 1 }, groupDy: -250 });
  const booth = shot(BOOTH, .4, { size: 50, edgeY: H * .5 });
  const throwR = shot(THROW, 1.2, { far: 230, dy: -230, side: { safadi: -1, alma: -1, jenna: -1 }, edgeY: H * .3 });
  const throwA = shot(THROWA, 1.2, { far: 230, dy: -230, side: { safadi: -1, sami: -1 }, edgeY: H * .3 });
  const pegs = shot(PEGS, 2.4, {}, t => sfx('WINNER!', W / 2, 190, 150, '#FFE066', t - T.WIN1 - .1, { life: 1.3 }));
  const bull = shot(BULL, 2.4, {});
  const markShot = shot(MARKC, 1.8, { far: 240, dy: -240, side: { sami: -1 } });

  // ---------- the ending: the laugh, freeze, TO BE CONTINUED, iris, and a sword that really does glow in the dark ----------
  function ending(t) {
    const tt = Math.min(t, T.FREEZE), { A, S } = stage(tt, FINALE(tt), .8, { freeze: t > T.FREEZE });
    bubbles(tt, A, S, { far: 240, dy: -220 });
    if (t < T.FREEZE) return;
    flash(.6 * kick(t, T.FREEZE, 8));
    overlay(() => {
      const c = backOut(seg(t, T.FREEZE + .3, T.FREEZE + .7)); if (c <= 0) return;
      X.save(); X.translate(W - 420, H - 125); X.rotate(-.05); X.scale(c * .78, c * .78);
      shape(rectPts(-470, -95, 940, 190), { fill: '#FFF4EC', stroke: PAL.ink, lwPx: 8, smooth: .1 });
      X.font = `92px ${FONT_SFX}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.lineJoin = 'round';
      X.lineWidth = 14; X.strokeStyle = PAL.ink; X.strokeText('TO BE CONTINUED...', 0, 8); X.fillStyle = C.orange; X.fillText('TO BE CONTINUED...', 0, 8);
      X.restore();
    });
    const hand = A.alma.handR, s = S.alma;
    iris(hand[0], hand[1] - 6 * s, lerp(1500, 0, easeIn(seg(t, T.END - 3.4, T.END - 2))));
    const g = ease(seg(t, T.END - 2.6, T.END - 1.9)) * (1 - ease(seg(t, T.END - .5, T.END)));
    if (g > 0) overlay(() => { X.save(); X.globalAlpha = g; FF.prize('sword', hand[0], hand[1] + .8 * s, s * .46, t, { ang: -.12, glow: 1 }); X.restore(); });
  }

  scene({ duration: T.END, fps: 24, bpm: 126,              // id, title, dialogue, music: see asset.js
    shots: [
      // arriving
      [0, opening], [T.FEST, group], [T.PRIZES - .1, booth], [T.WANT, group], [T.SCIENCE, prof],
      // ring toss
      [T.S1, throwR], [T.PUMPKIN - .1, lane], [T.MYTURN, laneSlip], [T.AHEM, prof], [T.CANI, group],
      [T.AL, throwR], [T.WIN1, pegs], [T.METOO, group], [T.JE, throwR], [T.PRIZE1, lane], [T.SWORD, group], [T.IMPROB, prof],
      // archery
      [T.ACT2, lane], [T.M2, throwA], [T.SCARE, group], [T.POSTURE, markShot], [T.SUBJECT, group],
      [T.ASIDE, throwA], [T.HTURN, group], [T.HO, throwA], [T.WATCH, group], [T.DA, throwA], [AS.land, bull], [T.PRIZE2, prof],
      // the prizes
      [T.DRAGON, group], [T.THEORY, prof], [T.NEXT, group], [T.WEWIN, prof], [T.LAUGH, ending],
    ] });
})();
