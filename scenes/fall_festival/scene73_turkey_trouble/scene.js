// Scene 73: "Turkey Trouble", the third scene of the Fall Festival series. Thanksgiving morning in the family kitchen: the
// Safadi brothers cook the frozen prize turkey and mess it up, one confident step at a time. It is frozen solid (two hair
// dryers, a hot bath and a rubber duck later, the outside counts as thawed), the doctor's healthy stuffing swallows his
// wristwatch, the pepper lid falls off, a sneeze sets off the flour, and the slippery bird ricochets round the kitchen onto
// the professor's head. One hour at 1400°: charcoal. The cover-up (fanning, gravy paint, a band-aid on a drumstick, heaps of
// garnish) makes it perfect, from the front. The doorbell rings. "Nobody will know." To be continued.
// Blocking: behind the island the brothers stand on hidden step stools (ISLY), so the island hides them below the waist and
// their hands work on its top; at the sink, the oven and in front of the island they stand on the floor. Shots cut between
// those places; nobody has to walk except the professor's blind stumble. Every shot is a pure function of t.
(() => {
  const K = LOCATIONS.family_kitchen, LINES = ASSETS.scene.scene73_turkey_trouble.dialogue, C = TT3.C, TC = TKY.C, TW = TKY.WORLD;
  const ACCENT = { safadi: PAL.crimson, sami: '#2E7D6A' };
  const RIG = { safadi, sami };

  // ---------- timing: the start of every line and action beat (see README.md) ----------
  const T = { OPEN: 0, LIFT: 3.6, THUD: 6.0, GUESTS: 7.6, WATCHIN: 8.5, THERMO: 10.9, KNOCK: 14.4, K1: 14.7, K2: 15.25, STETH: 16.4, PULSE: 18.4,
    DRY1: 20.6, DRY2: 23.2, FUSE: 26.0, BATH: 27.0, POUR: 27.4, DUCK: 28.6, ICE: 30.4, UNWRAP: 32.6, RIP: 33.3, THAWED: 35.0,
    STUFF: 40.2, HEALTHY: 40.6, ZERO: 44.7, ZFUN: 47.5, ZFAT: 49.7, STUFFIN: 52.0, ARMIN: 53.6, ARMOUT: 55.4, NOTICE: 56.2, SHRUG: 58.6,
    SPICE: 60.8, CHEM: 61.4, TAP: 65.6, LIDOFF: 66.6, AHH: 68.3, CHOO: 70.8, BLESS: 73.4, THANKS: 75.5, SHAKE: 77.6,
    SLIP: 78.6, SQUIRT: 79.5, RICO: 79.9, LAMP: 80.5, FRIDGE: 81.2, HEAD: 82.2, BLIND: 82.6, PULL: 87.4, POP: 88.6, FLOOR: 89.4,
    FIVE: 90.2, NOTSCI: 92.5, MEDIC: 95.0, PAN: 97.4, CALC: 98.0, SCI: 102.9, DIAL: 104.6, CRANK: 105.6, MAXED: 107.4,
    WAIT: 108.8, SMOKE: 112.5, TOAST: 118.6, DING: 121.6, DOOR: 123.2, REVEAL: 124.8, FACES: 126.4, IDEA: 129.6,
    FAN: 131.2, PAINT: 135.0, SNAP: 139.6, SCALPEL: 140.6, PARSLEY: 142.6, FIX: 144.8, GARN: 147.8, TADA: 150.6,
    BELL: 153.0, NOBODY: 153.9, NOBODY2: 156.6, DROP: 160.6, BACK: 161.6, GRIN: 162.2, FREEZE: 163.4, END: 168 };

  // ---------- helpers ----------
  const textLen = l => l.text.replace(/\*/g, '').length;
  const speaking = (who, t) => LINES.some(l => { if (l.speaker !== who) return false; const p = (t - l.at - .2) * l.cps; return p > 0 && p < textLen(l); });
  const inW = (t, a, b) => t >= a && t < b;
  const on = (t, a, b, r = .3) => ease(seg(t, a, a + r)) * (1 - ease(seg(t, b - r, b)));
  const bounce = (t, f = 10, ph = 0) => Math.abs(Math.sin(t * f + ph));
  const arc = (S, E, u, h) => [lerp(S[0], E[0], u), lerp(S[1], E[1], u) + h * 4 * u * (1 - u), lerp(S[2], E[2], u)];

  // ---------- places ----------
  const ISLZ = 985, ISLY = 36, TK = [0, 92, 905];                             // behind the island (on step stools); the turkey's spot on the island
  const SPOT = {
    isl: { safadi: [-92, ISLY, ISLZ], sami: [92, ISLY, ISLZ] },
    sit: { safadi: [-112, -8, ISLZ], sami: [112, -8, ISLZ] },                   // sitting low behind the island, waiting
    sink: { safadi: [-385, 0, 1150], sami: [-135, 0, 1150] },
    oven: { safadi: [-100, 0, 1160], sami: [100, 0, 1160] },
    faces: { safadi: [-58, 0, 1160], sami: [58, 0, 1160] },
    front: { safadi: [-62, 0, 770], sami: [62, 0, 770] },
  };
  // the professor's blind stumble in front of the island: [t, x, z]
  const STUMBLE = [[T.BLIND, -40, 770], [83.6, -150, 760], [84.6, -40, 735], [85.6, 120, 760], [86.6, 40, 745], [T.PULL, -20, 755], [T.POP + .6, -20, 755]];
  const SAMI_CHASE = [[T.BLIND, 120, 780], [84.0, 60, 790], [85.4, -60, 770], [86.4, 150, 790], [T.PULL, 60, 760], [T.POP, 70, 760], [T.FLOOR, 120, 765], [T.FIVE, 120, 760]];
  function at(n, t) {
    const pt = p => ({ x: p[0], y: p[1], z: p[2] });
    if (inW(t, T.BATH, T.UNWRAP) || inW(t, T.FAN, T.PAINT)) return { ...pt(SPOT.sink[n]), place: 'sink' };
    if (inW(t, T.DIAL, T.WAIT) || inW(t, T.DOOR, T.FACES)) return { ...pt(SPOT.oven[n]), place: 'oven' };
    if (inW(t, T.FACES, T.FAN)) return { ...pt(SPOT.faces[n]), place: 'oven' };
    if (inW(t, T.SLIP, T.PAN)) {
      if (t >= T.BLIND) { const path = n === 'safadi' ? STUMBLE : SAMI_CHASE; const x = kf(t, path.map(([a, b]) => [a, b])), z = kf(t, path.map(([a, , c]) => [a, c]));
        return { x, y: 0, z, place: 'front' }; }
      const p = SPOT.front[n]; return { x: p[0] + (n === 'safadi' && t > T.SQUIRT ? kf(t, [[T.SQUIRT, 0], [T.HEAD - .2, 22]]) : 0), y: 0, z: p[2], place: 'front' };
    }
    if (inW(t, T.WAIT, T.DOOR)) { const p = SPOT.sit[n], up = 44 * ease(seg(t, T.DING, T.DING + .3)); return { x: p[0], y: p[1] + up, z: p[2], place: 'island' }; }
    const p = SPOT.isl[n], lean = n === 'sami' ? -44 * on(t, T.FIX - .4, T.TADA, .4) : 0;
    const rise = t < T.LIFT + 1.5 ? kf(t, [[T.LIFT - .01, -150], [T.LIFT + 1.4, 0]], backOut) : 0;
    return { x: p[0] + lean, y: p[1] + rise, z: p[2], place: 'island' };
  }
  const behind = a => a.place === 'island';

  // the clock on the kitchen wall races through the morning (hours on a 12-hour face)
  const hour = t => kf(t, [[0, 10.95], [T.WAIT, 11.4], [T.DING, 13.1], [T.BELL, 13.995], [T.BELL + .3, 14], [T.END, 14.05]], x => x);

  // ---------- the turkey: where it is and how it looks ----------
  const SQ_S = [T.SQUIRT, [-10, 118, 765]], LAMPP = [90, 205, 905], FRIDGEP = [455, 150, 1210];
  function flight(t) {                                                         // the slippery bird's ricochet: lamp, fridge, the professor's head
    const headP = [-18, 205, 770];
    if (t < T.LAMP) return arc(SQ_S[1], LAMPP, seg(t, T.SQUIRT, T.LAMP), 40);
    if (t < T.FRIDGE) return arc(LAMPP, FRIDGEP, seg(t, T.LAMP, T.FRIDGE), 30);
    return arc(FRIDGEP, headP, seg(t, T.FRIDGE, T.HEAD), 110);
  }
  const bird = t => {                                                          // the turkey's look (TKY options) at time t
    if (t < T.REVEAL) return { state: 'frozen', wrap: t < T.RIP, frost: t < T.RIP ? 1 : .7, t };
    if (t < T.TADA) return { state: 'burnt', smoke: t < T.FAN ? .9 : t < T.PAINT ? .5 : .25, t };
    return { state: 'fixed', drumstickOff: inW(t, T.DROP, T.BACK), steam: .3, t };
  };
  const ricoWobble = t => .6 * Math.sin(t * 9);

  // ---------- poses ----------
  const U = 6;
  function W2L(P, a, w) {                                                      // a world point → the rig's local units (for hand targets)
    const [sx, sy] = P.p(...w), [ox, oy, k] = P.p(a.x, a.y, a.z), s = U * k;
    return [(sx - ox) / s, (sy - oy) / s];
  }
  function pose(n, t, P, a) {
    const S = n === 'safadi', talk = speaking(n, t), say = m => talk ? lipFlap(t, true, m) : m, other = S ? 1 : -1;
    const o = { t, mouth: say('smile'), brows: 'normal', eyes: 'open', lookX: .45 * other, lookY: 0, turn: .12 * other,
      handL: [-4.4, -8.1], handR: [4.4, -8.1], handPoseL: 'open', handPoseR: 'open', _flour: flour(t), _soot: soot(t), _watch: !S && t < T.ARMIN + .5 };
    const set = p => Object.assign(o, p), L = w => W2L(P, a, w);
    const inner = S ? 'handR' : 'handL', outer = S ? 'handL' : 'handR', innerP = S ? 'handPoseR' : 'handPoseL', outerP = S ? 'handPoseL' : 'handPoseR';
    const sd = S ? -1 : 1;                                                     // which side of the turkey (−X for the professor)
    const lookTurkey = { lookX: -.6 * sd, lookY: .45 };
    const edge = () => set({ [inner]: L([a.x - sd * 30, 96, 958]), [outer]: L([a.x + sd * 26, 96, 962]), [innerP]: 'fist', [outerP]: 'fist' });   // hands resting on the island's far edge
    const fingerUp = { [S ? 'handR' : 'handL']: [5.8 * -sd, -21.4], [S ? 'handPoseR' : 'handPoseL']: 'point' };
    const laughK = { eyes: 'happy', mouth: 'open', dy: .2 * bounce(t, 10, S ? 0 : 1) };
    if (behind(a) && t < T.WAIT) edge();

    if (t < T.GUESTS) {                                                       // the lift and the THUD
      const lift = seg(t, T.LIFT, T.THUD), ty = kf(t, [[T.LIFT, 60], [T.LIFT + 1.6, 168], [T.THUD - .45, 175], [T.THUD, 122]]), tz = kf(t, [[T.LIFT, 975], [T.THUD - .45, 970], [T.THUD, 905]]);
      if (t < T.THUD) set({ [inner]: L([-sd * 25, ty - 6, tz]), [outer]: L([-sd * 8, ty + 18, tz]), [innerP]: 'fist', [outerP]: 'fist', eyes: 'squeeze', mouth: 'teeth', brows: 'worried', lean: .05 * sd * Math.sin(t * 7),
        emote: 'sweat', emoteK: on(t, T.LIFT + .6, T.THUD, .2), dy: .3 * Math.sin(t * 12) * lift });
      else { const k = kick(t, T.THUD, 4); set({ sq: .14 * boing(t, T.THUD, 3, 5), eyes: t < T.THUD + .5 ? 'wide' : 'happy', mouth: t < T.THUD + .5 ? 'O' : 'grin', brows: 'up', ...(t > T.THUD + .25 ? { [inner]: [-sd * 5.4 + jit(.5), -14 + jit(.5)], [innerP]: 'open', [outer]: [sd * 5.4 + jit(.5), -14 + jit(.5)], [outerP]: 'open', mouth: 'wobble', eyes: 'squeeze' } : {}), lookY: .3 * k });
        if (t > T.THUD + 1.1) set({ eyes: 'happy', mouth: 'grin' }); }
    } else if (t < T.KNOCK) {                                                 // "the guests arrive at two" · "Thermodynamics"
      if (!S) { set({ lookX: -.5, brows: 'worried', mouth: say('o') });
        if (t < T.THERMO) set({ handL: [-2.2, -14.6], handPoseL: 'fist', handR: [-1.2, -14.2], handPoseR: 'point', lookY: .3, lookX: -.3 });
        else set({ lookX: -.7, brows: 'quizzical', mouth: 'flat' }); }
      else { set({ lookX: .6, mouth: 'smile' });
        if (t >= T.THERMO) set({ ...fingerUp, eyes: inW(t, T.THERMO + .8, T.KNOCK - .3) ? 'closed' : 'open', mouth: say('smirk'), brows: 'up', lookX: .2, turn: 0, power: .3 * on(t, T.THERMO + .4, T.KNOCK, .4) }); }
    } else if (t < T.DRY1) {                                                  // CLONK · "No pulse."
      if (S) {
        if (t < T.STETH) { const kn = Math.max(kick(t, T.K1, 9), kick(t, T.K2, 9)), up = 1 - kn;
          set({ handR: L([-4, 126 + 10 * up * (t < T.K2 + .1 ? 1 : 0), 905]), handPoseR: 'fist', ...lookTurkey, brows: 'focused', mouth: 'flat' });
          if (t > T.K2 + .35) set({ handR: [5.5 + jit(.4), -15 + jit(.4)], handPoseR: 'open', eyes: 'squeeze', mouth: 'teeth', brows: 'worried', emote: 'sweat', emoteK: on(t, T.K2 + .35, T.STETH + .6, .2) }); }
        else set({ lookX: .6, lookY: .3, brows: 'up', mouth: 'o', lean: .06, ...(t > T.PULSE + 1.1 ? { eyes: 'narrow', mouth: 'flat', brows: 'normal' } : {}) });
      } else {
        set({ ...lookTurkey, brows: 'up' });
        if (t >= T.STETH) { set({ handL: L([14, 110, 905]), handPoseL: 'stethoscope', eyes: t < T.PULSE ? 'closed' : 'narrow', lookY: .2, tilt: .08, brows: t < T.PULSE ? 'focused' : 'normal', mouth: say('flat'), lean: -.05 });
          if (t > T.PULSE + 1.4) set({ lookX: -.6, lookY: 0, tilt: 0 }); }
      }
    } else if (t < T.BATH) {                                                  // the hair dryers
      const blow = t < T.FUSE, shake = blow ? jit(.25) : 0;
      if (S) set({ handR: L([-52 + shake, 128, 915]), handPoseR: 'fist', ...lookTurkey, brows: 'focused', mouth: blow ? 'teeth' : 'O', eyes: blow ? 'open' : 'wide', lean: .05 });
      else if (t >= T.DRY2) set({ handL: L([52 + shake, 132, 915]), handPoseL: 'fist', ...lookTurkey, brows: 'angry', mouth: blow ? 'grin' : 'O', eyes: blow ? 'open' : 'wide', lean: -.05 });
      else set({ lookX: -.6, lookY: .3, brows: 'quizzical', mouth: 'flat', ...(t > T.DRY2 - .9 ? { brows: 'up', mouth: 'grin', handR: [5.5, -16], handPoseR: 'point', bulb: backOut(seg(t, T.DRY2 - .9, T.DRY2 - .6)) * (1 - seg(t, T.DRY2 - .2, T.DRY2)) } : {}) });
      if (!blow) set({ emote: 'sweat', emoteK: on(t, T.FUSE + .2, T.BATH, .2), lookY: 0, lookX: S ? .5 : -.5 });
    } else if (t < T.UNWRAP) {                                                // the hot bath (at the sink)
      if (S) { set({ lookX: .7, lookY: .3 });
        if (inW(t, T.DUCK - .6, T.DUCK + .4)) set({ handR: L([-265, 128 - 14 * seg(t, T.DUCK - .6, T.DUCK), 1262]), handPoseR: 'fist', brows: 'up', mouth: 'grin' });
        if (t > T.DUCK + .4) set({ handR: [5, -14], handPoseR: 'thumb', mouth: 'smirk', brows: 'up' }); }
      else { set({ lookX: -.6, lookY: .4, mouth: 'smile' });
        if (inW(t, T.BATH, T.DUCK)) set({ handL: L([-205, 138, 1255]), handPoseL: 'fist', brows: 'focused', mouth: 'smirk' }); }
      if (t >= T.ICE) { const k = seg(t, T.ICE, T.ICE + .4); set({ eyes: 'wide', mouth: 'O', brows: 'up', lean: -.08 * k * (S ? -1 : 1), handR: S ? [4.6, -15.6] : o.handR, handPoseR: 'open' });
        if (t > T.ICE + 1) set({ lookX: S ? .8 : -.8, lookY: 0, mouth: 'flat', eyes: 'narrow' }); }
    } else if (t < T.STUFF) {                                                 // the wrap comes off · "the outside is thawed"
      if (S) {
        if (t < T.RIP) set({ handR: L([-2, 126, 905]), handPoseR: 'fist', ...lookTurkey, brows: 'angry', mouth: 'teeth', lean: .04 });
        else if (t < T.THAWED) { const k = easeOut(seg(t, T.RIP, T.RIP + .3)); set({ handR: [lerp(3, 6.5, k), lerp(-15, -22, k)], handPoseR: 'fist', lean: -.12 * kick(t, T.RIP, 3), eyes: 'wide', brows: 'up', mouth: 'O', lookX: .2, lookY: -.4 }); }
        else { const tap = inW(t, T.THAWED, T.THAWED + 1.5) ? .5 + .5 * Math.sin(t * 18) : 0;
          set({ handR: L([-8, 120 + 4 * tap, 905]), handPoseR: 'point', ...lookTurkey, mouth: say('smile'), brows: 'up' });
          if (t > T.THAWED + 1.6) set({ ...fingerUp, handR: [5.6, -20.6], eyes: inW(t, 37.5, 39.4) ? 'closed' : 'open', lookX: .2, lookY: 0, mouth: say('smirk') }); }
      } else {
        set({ handL: L([22, 108, 905]), handPoseL: 'fist', ...lookTurkey, mouth: 'smile', brows: 'up' });
        if (t > T.RIP && t < T.THAWED) set({ eyes: 'wide', mouth: 'o' });
        if (t > T.THAWED) set({ lookX: -.6, lookY: 0, brows: 'quizzical', mouth: 'flat' });
        if (t > 38.6) set({ handR: [5.4, -15], handPoseR: 'thumb', mouth: 'grin', brows: 'up', eyes: 'happy' });
      }
    } else if (t < T.SPICE) {                                                 // the healthy stuffing, and the watch
      if (!S) {
        if (t < T.STUFFIN) {                                                  // presenting the bowl, stirring
          set({ handL: [-3.2, -13.4], handR: [3.4, -13.6], handPoseL: 'fist', handPoseR: 'fist', brows: 'up', mouth: say('grin'), lookX: -.4, _bowl: true });
          if (t >= T.HEALTHY) { const st = t * 9; set({ handR: [2.2 + Math.cos(st) * 1.3, -15.4 + Math.sin(st) * .5], _spoon: true }); }
          if (inW(t, T.ZERO, T.ZFUN)) set({ eyes: 'closed', tilt: -.06, brows: 'up' });
          if (inW(t, T.ZFUN, T.ZFAT)) set({ lookX: -.7, eyes: 'open', mouth: 'flat', brows: 'worried', handR: [3.4, -13.6], _spoon: false });
          if (t >= T.ZFAT) set({ lookX: 0, turn: 0, mouth: say('flat'), brows: 'normal', eyes: 'narrow', handR: [3.4, -13.6], _spoon: false });
        } else if (t < T.NOTICE) {                                            // stuffing the bird: three scoops, then the deep reach
          const scoop = t < T.ARMIN ? frac((t - T.STUFFIN) / .53) : 0;
          if (t < T.ARMIN) { const p = scoop < .5 ? ease(scoop * 2) : 1 - ease((scoop - .5) * 2); set({ handL: L([lerp(62, 8, p), lerp(106, 112, p), lerp(932, 906, p)]), handPoseL: 'fist' }); }
          else if (t < T.ARMOUT) set({ handL: L([2, 104 + 2 * Math.sin(t * 14), 902]), handPoseL: 'fist', lean: -.12, eyes: 'squeeze', mouth: 'teeth', brows: 'focused', _under: true });
          else { const k = easeOut(seg(t, T.ARMOUT, T.ARMOUT + .3)); set({ handL: [lerp(-2, -4.6, k), lerp(-12, -15.6, k)], handPoseL: 'open', eyes: 'happy', mouth: 'grin', lean: .05 * kick(t, T.ARMOUT, 4) }); }
          set({ ...lookTurkey, mouth: o.mouth === 'smile' ? 'grin' : o.mouth, handR: L([64, 98, 940]), handPoseR: 'fist' });
        } else {                                                              // the bare wrist
          set({ handL: [-1.6, -15.8], handPoseL: 'fist', lookX: -.35, lookY: .45, eyes: 'wide', brows: 'up', mouth: 'o' });
          if (t > 57.4) set({ ...lookTurkey, eyes: 'wide', mouth: 'flat', brows: 'worried' });
          if (t > 58.0) set({ lookX: 0, lookY: 0, turn: 0, eyes: 'open', mouth: 'flat', brows: 'up' });
          if (t > T.SHRUG) { const k = ease(seg(t, T.SHRUG, T.SHRUG + .3)) * (1 - ease(seg(t, 59.6, 59.9))); set({ handL: [lerp(-1.6, -6, k), lerp(-15.8, -12.5, k)], handR: [lerp(4.4, 6, k), lerp(-8.1, -12.5, k)], handPoseL: 'palm', handPoseR: 'palm', mouth: 'smile', brows: 'up', dy: -.3 * k }); }
          if (t > 59.6) set({ lookX: .3, lookY: -.6, mouth: 'o', eyes: 'open', emote: 'music', emoteK: on(t, 59.6, T.SPICE + .4, .2), tilt: .04 * Math.sin(t * 5) });
        }
      } else {
        set({ lookX: .55, mouth: say('smile') });
        if (inW(t, T.ZFUN, T.ZFAT)) set({ eyes: 'narrow', mouth: say('smirk'), brows: 'quizzical' });
        if (t >= T.STUFFIN) set({ lookX: -.6, lookY: .35, turn: -.15, mouth: 'smile', brows: 'focused', handR: L([-60, 112, 930]), handPoseR: 'fist', handL: L([-80, 100, 935]), handPoseL: 'fist', _cyl: true });   // busy with his glassware
        if (inW(t, T.ARMIN, T.ARMOUT)) set({ lookX: .6, lookY: .3, turn: .1, mouth: 'teeth', brows: 'worried' });
      }
    } else if (t < T.SLIP) {                                                  // seasoning by science · the sneeze · white
      if (S) {
        if (t < T.LIDOFF) { set({ handR: L([-30, 138, 912]), handPoseR: 'fist', handL: L([-52, 128, 925]), handPoseL: 'point', ...lookTurkey, lookX: .3, mouth: say('smirk'), brows: 'up', _jar: { tilt: .6, lid: true } });
          if (t >= T.TAP) { const tp = Math.max(kick(t, T.TAP, 10), kick(t, 66.1, 10)); set({ handL: L([-44, 140 + 4 * (1 - tp), 912]), brows: 'focused', mouth: 'flat' }); } }
        else if (t < T.AHH) { const k = easeOut(seg(t, T.LIDOFF, T.LIDOFF + .25)); set({ handR: L([lerp(-30, -6, k), lerp(138, 146, k), 908]), handPoseR: 'fist', handL: L([-52, 128, 925]), handPoseL: 'open', eyes: 'wide', mouth: 'O', brows: 'up', ...lookTurkey, _jar: { tilt: lerp(.6, 2.6, k), lid: false, full: 1 - seg(t, T.LIDOFF, T.LIDOFF + .5) } }); }
        else if (t < T.CHOO) { const k = ease(seg(t, T.AHH, T.CHOO - .15)); set({ tilt: -.18 * k, lean: -.1 * k, eyes: 'squeeze', mouth: say('O'), brows: 'up', lookY: -.3, handL: [-4.6, -15 - 2 * k], handR: [4.6, -15 - 2 * k], dy: -.4 * k, jump: .4 * k }); }
        else if (t < T.BLESS) { const k = kick(t, T.CHOO, 4); set({ lean: .22 * k, tilt: .2 * k, eyes: 'squeeze', mouth: t < T.CHOO + .5 ? 'O' : 'flat', brows: 'normal', sq: -.12 * k }); }
        else set({ eyes: t > T.THANKS ? 'narrow' : 'open', blink: inW(t, 74.3, 74.5) || inW(t, 76.6, 76.8) ? 1 : 0, mouth: say('flat'), lookX: .5, brows: 'normal' });
      } else {
        set({ ...lookTurkey, mouth: 'smile', brows: 'up' });
        if (inW(t, T.LIDOFF, T.AHH)) set({ eyes: 'wide', mouth: 'o' });
        if (inW(t, T.AHH, T.CHOO)) set({ lookX: -.8, lookY: 0, eyes: 'wide', brows: 'worried', mouth: 'teeth', lean: .1 * seg(t, T.AHH, T.CHOO), handR: [5.2, -15.5], handL: [-5.2, -15.5], handPoseL: 'palm', handPoseR: 'palm' });
        if (inW(t, T.CHOO, T.BLESS)) set({ eyes: 'squeeze', mouth: 'flat', brows: 'normal', lookY: 0 });
        if (t >= T.BLESS) set({ eyes: 'open', blink: inW(t, 73.9, 74.1) || inW(t, 77.0, 77.2) ? 1 : 0, mouth: say('flat'), lookX: -.6, lookY: 0, brows: 'normal' });
      }
      if (t >= T.SHAKE) set({ tilt: .12 * Math.sin((t - T.SHAKE) * 30) * (1 - seg(t, T.SHAKE, T.SHAKE + .7)), eyes: 'squeeze', mouth: 'wobble' });
    } else if (t < T.PAN) {                                                   // the escape: squirt, ricochet, the blind stumble, POP, five-second rule
      if (t < T.SQUIRT) { const k = kick(t, T.SQUIRT - .3, 3);
        set({ [inner]: L([-sd * 20, 112 + 2 * Math.sin(t * 20) * k, 760]), [outer]: L([-sd * 6, 100, 758]), [innerP]: 'fist', [outerP]: 'fist', mouth: 'grin', brows: 'up', lookX: -.5 * sd, lookY: .4, ...(t > T.SQUIRT - .5 ? { eyes: 'squeeze', mouth: 'teeth' } : {}) }); }
      else if (t < T.HEAD) { const f = P.p(...flight(t)), me = P.p(a.x, 150, a.z);
        set({ lookX: clamp((f[0] - me[0]) / 300, -1, 1), lookY: clamp((f[1] - me[1]) / 300, -1, 1), eyes: 'wide', mouth: 'O', brows: 'up', handL: [-5, -17], handR: [5, -17], handPoseL: 'open', handPoseR: 'open' }); }
      else if (t < T.PULL || S) {
        if (S) {                                                              // the turkey on his head: blind, arms out
          const dist = Math.abs(kf(t, STUMBLE.map(([a, b]) => [a, b])) - kf(t - .01, STUMBLE.map(([a, b]) => [a, b]))) * 100;
          const walking = t > T.BLIND && t < T.PULL, stepP = (t - T.BLIND) * 2.6;
          set({ ...(walking ? safadiWalk(stepP, .8) : {}), handL: [-4.8 + .4 * Math.sin(t * 6), -16.5], handR: [4.8 + .4 * Math.sin(t * 6 + 1), -16.2], handPoseL: 'open', handPoseR: 'open', mouth: 'wobble', brows: 'worried', eyes: 'closed',
            lean: .06 * Math.sin(t * 4), sq: t < T.HEAD + .4 ? .12 * boing(t, T.HEAD, 3, 5) : 0 });
          if (t >= T.PULL && t < T.POP) set({ sq: -.12 * seg(t, T.PULL, T.POP), lean: .1, handL: [-5, -15], handR: [5, -15] });
          if (t >= T.POP) { set({ eyes: t < T.FLOOR ? 'squeeze' : 'wide', mouth: t < T.FLOOR ? 'O' : 'flat', brows: 'up', sq: .12 * boing(t, T.POP, 3, 5), handL: [-4.6, -15.6], handR: [4.6, -15.6], lookX: .5, lookY: .3 });
            if (t >= T.FIVE) set({ eyes: 'narrow', brows: 'quizzical', lookX: .6, lookY: 0, handL: [1.2, -11.8], handR: [-1.2, -12.2], handPoseL: 'fist', handPoseR: 'fist', mouth: 'flat' });
            if (t >= T.NOTSCI) set({ handR: [5.4, -18.5 + .6 * Math.sin(t * 14)], handPoseR: 'point', mouth: say('flat'), brows: 'angry' });
            if (t >= T.MEDIC) set({ handR: [-1.2, -12.2], handPoseR: 'fist', brows: 'quizzical', mouth: 'flat' }); }
          if (t > 84.4 && t < 85.0) set({ emote: '?', emoteK: on(t, 84.4, 85.4, .15) });
        } else {
          const walking = t > T.BLIND && t < T.PULL;
          set({ ...(walking ? samiWalk((t - T.BLIND) * 2.8, .9) : {}), lookX: -.6, eyes: 'wide', mouth: 'o', brows: 'worried', handL: [-5, -15.5], handR: [5, -15.5] });
          if (inW(t, 85.2, 85.8)) set({ handL: [-6.5, -18], handR: [-2, -18], lean: -.15, mouth: 'teeth' });
        }
      } else {                                                                // the doctor: pull, POP, pick it up, blow on it
        if (t < T.POP) { const pl = seg(t, T.PULL, T.POP); set({ handL: [-5.8, -22], handR: [-3.2, -22.5], handPoseL: 'fist', handPoseR: 'fist', lean: -.18 * pl, eyes: 'squeeze', mouth: 'teeth', brows: 'angry', footR: [2.6, -1.2] }); }
        else if (t < T.FIVE) { const k = kick(t, T.POP, 4); set({ lean: -.25 * k, dy: 1.2 * k, eyes: t < T.FLOOR ? 'wide' : 'open', mouth: 'O', brows: 'up', lookX: .3, lookY: .5,
          ...(t > T.FLOOR + .3 ? { dy: 2.6 * on(t, T.FLOOR + .3, T.FIVE + .2, .25), handR: [4, -3.5 + 3 * seg(t, T.FIVE - .2, T.FIVE)], handPoseR: 'fist', lookY: .8 } : {}) }); }
        else { set({ handR: [3.4, -11.2], handL: [-3.2, -11], handPoseR: 'fist', handPoseL: 'fist', _hold: true, mouth: say('o'), brows: 'up', lookX: -.2, lookY: .2 });
          if (t < T.FIVE + .6) set({ mouth: 'o', eyes: 'closed' });
          if (t >= T.NOTSCI) set({ lookX: -.7, mouth: 'smile', brows: 'quizzical' });
          if (t >= T.MEDIC) set({ handL: [-5.2, -15], handPoseL: 'thumb', mouth: say('grin'), eyes: talk ? 'open' : 'happy', brows: 'up', lookX: -.5 }); }
      }
    } else if (t < T.WAIT) {                                                  // the oven calculation · the dial
      if (a.place === 'island') {
        if (S) { set({ mouth: say('smile'), brows: 'up', lookX: -.3, lookY: -.3, power: .55 * on(t, T.CALC - .3, T.SCI, .5), eyes: 'open', handL: [-6, -16.2], handPoseL: 'palm' });
          if (o.power > .3) set({ eyes: 'glow' }); }
        else set({ lookX: -.7, lookY: -.3, brows: 'up', mouth: 'smile', eyes: inW(t, 100.8, 102.4) ? 'happy' : 'open' });
        if (t >= T.SCI) set({ [S ? 'handR' : 'handL']: [S ? 5.4 : -5.4, -22], [S ? 'handPoseR' : 'handPoseL']: 'fist', mouth: say('grin'), brows: 'angry', eyes: 'open', jump: .8 * kick(t, T.SCI + .2, 4), power: 0 });
      } else {                                                                // at the oven
        if (S) { const turnD = t > T.CRANK ? Math.sin((t - T.CRANK) * 14) * .25 : 0;
          set({ handR: L([4 + turnD * 4, 80, 1226]), handPoseR: 'fist', lookX: .6, lookY: .5, brows: 'focused', mouth: 'grin', eyes: t > T.MAXED ? 'happy' : 'open' });
          if (t > T.MAXED) set({ handR: [5.4, -16.5], handPoseR: 'thumb', mouth: 'grin', brows: 'up', lookX: .5, lookY: 0 }); }
        else { set({ lookX: -.6, lookY: .5, brows: 'up', mouth: 'smile', handL: L([-14, 46 + 6 * seg(t, T.DIAL, T.DIAL + .4), 1215 - 25 * seg(t, T.DIAL, T.DIAL + .4)]), handPoseL: 'fist', _mittL: true, _mittR: true });
          if (t > T.DIAL + .6) set({ handL: [-4.6, -12.5], handR: [5.2, -14], handPoseR: 'thumb', mouth: 'grin', lookX: -.5, lookY: .2 }); }
      }
    } else if (t < T.DOOR) {                                                  // waiting: chess, a doze, smoke · DING
      if (S) { set({ eyes: t > 110.6 ? 'closed' : 'open', tilt: t > 110.6 ? .12 + .04 * Math.sin(t * 1.6) : 0, mouth: t > 110.6 ? (Math.sin(t * 1.6) > 0 ? 'o' : 'flat') : 'smile', lookY: .6, lookX: .2, dy: 0,
          handR: L([-60, 98, 935]), handL: L([-115, 98, 940]), handPoseR: 'fist', handPoseL: 'fist' }); }
      else { const mv = on(t, 111.6, 113, .35); set({ lookY: .6, lookX: -.2, brows: 'focused', mouth: 'flat', handL: L([lerp(60, 8, mv), 98 + 8 * mv, lerp(935, 918, mv)]), handPoseL: 'fist', handR: L([115, 98, 940]), handPoseR: 'fist', eyes: inW(t, 114, 115) ? 'closed' : 'open' });
        if (t > 115.6) set({ lookX: -.6, lookY: 0, brows: 'quizzical', mouth: 'smile' });
        if (t >= T.TOAST) set({ lookY: -.5, lookX: .2, mouth: say('o'), brows: 'quizzical', tilt: -.05 }); }
      if (t >= T.DING) { const k = kick(t, T.DING, 3); set({ eyes: 'wide', mouth: 'O', brows: 'up', tilt: 0, lookX: S ? .5 : -.5, lookY: -.3, handL: [-5.6, -19], handR: [5.6, -19], handPoseL: 'open', handPoseR: 'open', jump: 1.2 * k, emote: '!', emoteK: on(t, T.DING, T.DOOR, .15) }); }
    } else if (t < T.FAN) {                                                   // the door, the charcoal, the faces, the idea
      if (t < T.FACES) {
        const cough = t > T.DOOR + .5 ? .3 * bounce(t, 11, S ? 0 : 1) * (1 - seg(t, T.REVEAL, T.REVEAL + .6)) : 0;
        if (S) set({ lookX: .6, lookY: .5, eyes: t < T.REVEAL ? 'squeeze' : 'wide', mouth: t < T.REVEAL ? 'O' : 'o', brows: 'up', dy: cough, handL: [-1.2, -16], handPoseL: 'fist', handR: [4.6, -15.6] });
        else set({ handL: L([-10, 66 - 50 * ease(seg(t, T.DOOR + .1, T.DOOR + .55)), 1229 - 50 * ease(seg(t, T.DOOR + .1, T.DOOR + .55))]), handPoseL: 'fist', _mittL: true, _mittR: true, lookX: -.6, lookY: .5,
          eyes: t < T.REVEAL ? 'squeeze' : 'wide', mouth: t < T.REVEAL ? 'O' : 'o', brows: 'up', dy: cough });
      } else {                                                                // the two faces
        const lk = inW(t, 127.9, 128.9) ? (S ? .8 : -.8) : 0;
        set({ eyes: 'open', mouth: 'flat', brows: 'normal', lookX: lk, lookY: lk ? 0 : .7, turn: lk * .3, blink: inW(t, S ? 127.1 : 127.5, S ? 127.3 : 127.7) ? 1 : 0 });
        if (!S) set({ handL: L([2, 100, 1112]), handR: L([62, 100, 1112]), handPoseL: 'fist', handPoseR: 'fist', _mittL: true, _mittR: true, _panHeld: true });
        if (S && inW(t, 128.9, T.IDEA)) set({ mouth: 'wobble', brows: 'worried' });
        if (t >= T.IDEA) { const b = backOut(seg(t, S ? T.IDEA : T.IDEA + .4, (S ? T.IDEA : T.IDEA + .4) + .3)); set({ bulb: b * (1 - seg(t, T.FAN - .3, T.FAN)), eyes: b > .5 ? 'wide' : 'open', brows: 'up', mouth: b > .5 ? 'grin' : 'flat', lookX: t > 130.4 ? (S ? .8 : -.8) : 0, lookY: 0, jump: .5 * kick(t, S ? T.IDEA : T.IDEA + .4, 5) }); }
      }
    } else if (t < T.PAINT) {                                                 // fanning the smoke out of the window
      const w = Math.sin(t * 13 + (S ? 0 : 1.7));
      set({ [S ? 'handR' : 'handL']: [S ? 4.2 + 1.6 * w : -4.2 - 1.6 * w, -20.5 + 1.2 * w], [S ? 'handPoseR' : 'handPoseL']: 'fist', [S ? 'handL' : 'handR']: [S ? -4.4 : 4.4, -12], eyes: 'squeeze', mouth: 'teeth', brows: 'worried', lookX: S ? .5 : -.5, lookY: -.4, lean: .05 * w, _towel: true,
        dy: .25 * bounce(t, 8, S ? 0 : 1) });
    } else if (t < T.BELL) {                                                  // the cover-up: paint, snap, surgery, garnish, ta-da
      if (t < T.SNAP) {
        if (S) { const u = seg(t, T.PAINT + .4, T.SNAP - .2), dip = Math.max(on(t, 136.6, 137.2, .2), on(t, 138.0, 138.6, .2)), st = Math.sin(t * 16);
          const bx = lerp(-22, 16, u), by = 112 + 8 * st;
          set({ handR: L(dip > .1 ? [lerp(bx, 40, dip), lerp(by, 100, dip), lerp(902, 925, dip)] : [bx - 18, by, 902]), handPoseR: 'fist', _brush: true, ...lookTurkey, lookX: .2, brows: 'focused', mouth: 'teeth', lean: .04 * st }); }
        else set({ handL: L([40, 100, 925]), handPoseL: 'fist', _pot: true, ...lookTurkey, mouth: 'grin', brows: 'up' });
      } else if (t < T.FIX) {
        if (S) { set({ lookX: .5, lookY: .2, eyes: t < T.SNAP + .6 ? 'wide' : 'open', mouth: t < T.SNAP + .6 ? 'O' : 'smile', brows: 'up' });
          if (inW(t, T.PARSLEY - .8, T.PARSLEY + .3)) { const k = ease(seg(t, T.PARSLEY - .8, T.PARSLEY - .3)); set({ handR: L([lerp(-40, 48, k), lerp(120, 132, k), 930]), handPoseR: 'fist', _parsley: t < T.PARSLEY - .3, mouth: 'grin' }); } }
        else { set({ lookX: -.4, lookY: .4, eyes: t < T.SNAP + .6 ? 'wide' : 'open', mouth: t < T.SNAP + .6 ? 'O' : 'flat', brows: 'up', handL: L([56, 122, 925]), handPoseL: 'fist', _drum: true });
          if (t >= T.SCALPEL) set({ handR: L([46, 130, 932]), handPoseR: 'palm', eyes: 'narrow', brows: 'focused', mouth: say('flat'), lookX: 0, lookY: 0, turn: 0, power: .3 * on(t, T.SCALPEL, T.FIX, .4) });
          if (t >= T.PARSLEY - .3) set({ handPoseR: 'fist', _parsleyM: true, lookX: .3, lookY: .6, brows: 'normal', eyes: 'narrow' });
          if (t >= T.PARSLEY) set({ mouth: say('flat'), lookX: 0, lookY: 0 }); }
      } else if (t < T.TADA) {
        if (!S) {
          if (t < T.GARN) { const pk = Math.max(kick(t, 145.2, 8), kick(t, 145.7, 8), kick(t, 146.2, 8)), cr = ease(seg(t, T.FIX, T.FIX + .45));
            set({ handL: L([lerp(56, 20, cr), lerp(122, 108, cr), lerp(925, 930, cr)]), handPoseL: 'fist', _drum: t < T.FIX + .45, ...lookTurkey, brows: 'focused', mouth: 'teeth', eyes: 'narrow', power: .3 * on(t, T.FIX - .2, T.GARN, .3) });
            if (t < 146.4) set({ handR: L([32 + 3 * pk, 130 + 4 * pk, 942]), handPoseR: 'point' });                         // pushing in the toothpicks
            else if (t < 146.8) set({ handR: L([lerp(40, 32, seg(t, 146.4, 146.8)), 132, 942]), handPoseR: 'fist', _band: true });   // the band-aid, peeled
            else if (t < 147.2) set({ handR: L([28, 120, 940]), handPoseR: 'palm' });                                          // pressed on
            else set({ handR: [5.2, -15], handPoseR: 'thumb', handL: [-4.6, -13.5], mouth: 'grin', eyes: 'happy', brows: 'up' }); }
          else { const th = frac((t - T.GARN) / .5); set({ handR: L([lerp(40, 14, th), 118 + 10 * Math.sin(th * Math.PI), 905]), handPoseR: 'fist', handL: [-4.6, -14], ...lookTurkey, mouth: 'grin', brows: 'up' }); }
        } else {
          if (t < T.GARN) set({ lookX: .6, lookY: .4, mouth: 'teeth', brows: 'worried', handR: [1.2, -19.5], handPoseR: 'open', emote: 'sweat', emoteK: on(t, 145.4, T.GARN, .2) });
          else { const th = frac((t - T.GARN) / .45 + .3); set({ handR: L([lerp(-40, -12, th), 118 + 10 * Math.sin(th * Math.PI), 905]), handPoseR: 'fist', handL: [-4.6, -14], ...lookTurkey, mouth: 'grin', brows: 'up' }); }
        }
      } else {                                                                // TA-DA!
        const k = backOut(seg(t, T.TADA, T.TADA + .35));
        set({ [inner]: [-sd * lerp(4.4, 6.2, k), lerp(-8.1, -16, k)], [outer]: [sd * lerp(4.4, 6.6, k), lerp(-8.1, -18.6, k)], [innerP]: 'palm', [outerP]: 'palm', eyes: 'happy', mouth: 'grin', brows: 'up', lookX: 0, turn: 0, jump: .7 * kick(t, T.TADA, 4) });
      }
    } else {                                                                  // the doorbell · "nobody will know" · the drumstick drops
      set({ lookX: -.6, lookY: 0, turn: -.15, brows: 'up', mouth: say('grin'), eyes: 'open' });
      if (t < T.NOBODY) set({ eyes: 'wide', mouth: 'o', jump: .8 * kick(t, T.BELL, 4), handL: [-4.8, -15.4], handR: [4.8, -15.4] });
      if (S && inW(t, T.NOBODY, T.DROP)) set({ lookX: .3, turn: 0, mouth: say('smirk'), eyes: inW(t, 155, 156.2) ? 'closed' : 'open', [inner]: [4.6, -13], [innerP]: 'thumb' });
      if (!S && inW(t, T.NOBODY, T.NOBODY2)) set({ lookX: -.5, mouth: 'smile' });
      if (!S && inW(t, T.NOBODY2, T.DROP)) set({ ...fingerUp, handL: [-5.6, -21], lookX: -.2, turn: 0, mouth: say('grin'), eyes: inW(t, 158.4, 159.4) ? 'closed' : 'open' });
      if (t >= T.DROP) { set({ ...lookTurkey, eyes: 'wide', mouth: 'teeth', brows: 'worried', emote: 'sweat', emoteK: on(t, T.DROP + .2, T.FREEZE + 2, .2), handL: [-4.6, -14], handR: [4.6, -14], handPoseL: 'open', handPoseR: 'open' });
        if (!S && inW(t, T.DROP + .5, T.BACK + .2)) set({ handL: L([34, 98 + 8 * seg(t, T.BACK - .3, T.BACK), 900]), handPoseL: 'fist' }); }
      if (t >= T.GRIN) set({ lookX: 0, lookY: 0, turn: 0, eyes: 'open', mouth: 'teeth', brows: 'up', [inner]: [-sd * 4, -14.5], [innerP]: 'thumb' });
    }
    if (o.lookX == null) o.lookX = 0;
    return o;
  }
  const flour = t => t < T.CHOO + .2 ? 0 : kf(t, [[T.CHOO + .2, 0], [T.CHOO + .5, 1], [T.SHAKE, 1], [T.SHAKE + .5, .5], [T.PAN, .3], [T.END, .3]]);
  const soot = t => t < T.DOOR + .5 ? 0 : kf(t, [[T.DOOR + .5, 0], [T.REVEAL, .7], [T.FAN, .55], [T.END, .45]]);

  // ---------- the kitchen at time t (pass the same options to back and front) ----------
  function kitchen(t) {
    const ovOn = t >= T.CRANK, dial = kf(t, [[T.CRANK - .2, 0], [T.CRANK + .3, .45], [106.4, .7], [107.0, .9], [T.MAXED, 1.32], [T.FACES, 1.32], [T.FACES + .1, 0]]);
    const glow = kf(t, [[T.CRANK, .5], [T.MAXED, .9], [T.SMOKE, 1], [T.REVEAL, 1], [T.FACES, .6]]);
    const door = t < T.DOOR ? (inW(t, T.DIAL, T.DIAL + .5) ? .85 * (1 - ease(seg(t, T.DIAL, T.DIAL + .45))) : 0) : ease(seg(t, T.DOOR + .1, T.DOOR + .55));
    const plume = kf(t, [[T.SMOKE, 0], [T.DING, .85], [T.REVEAL, 1], [T.FACES + 1, .6], [T.PAINT, 0]]);
    const haze = kf(t, [[T.SMOKE + 1, 0], [T.DING, .65], [T.REVEAL, .9], [T.FAN, .85], [T.PAINT, .3], [T.END, .25]]);
    const mess = kf(t, [[T.CHOO, 0], [T.CHOO + .4, .45], [T.POP, .45], [T.POP + .2, .55], [T.REVEAL, .6], [T.GARN, .62], [T.TADA, .72]]);
    return { time: 'morning', mess, smoke: haze, steam: kf(t, [[T.POUR, 0], [T.POUR + 1, .55], [T.ICE, .55], [T.ICE + .6, 0]]),
      oven: { on: ovOn && t < T.FACES, glow: t < T.FACES ? glow : 0, door, smoke: plume, dial: t >= T.CRANK - .2 ? dial : 0 } };
  }

  // ---------- the island top, drawn by the set's onIsland hook ----------
  function island(P, t) {
    const pS = (w) => P.p(...w), k905 = P.k(TK[2]);
    if (inW(t, T.WAIT, T.DOOR)) TT3.chess(P, 0, 92.4, 922, 26, t, ease(seg(t, 112.3, 112.9)));
    // the flour bag, until the sneeze (it bursts)
    if (inW(t, T.SPICE, T.SLIP)) { const [x, y, k] = pS([-42, 92, 878]); TT3.flourBag(x, y, k, { burst: t > T.CHOO + .1 ? 1 : 0 }); }
    // glassware
    if (inW(t, T.STUFFIN, T.SLIP)) { const [x, y, k] = pS([-62, 92, 935]); TT3.beaker(x, y, k, t > T.TAP ? .25 : .05); const [x2, y2, k2] = pS([-84, 92, 925]); TT3.cylinder(x2, y2, k2, .5); }
    // the stuffing bowl, set down
    if (inW(t, T.STUFFIN, T.SPICE)) { const [x, y, k] = pS([64, 92, 940]); TKY.stuffingBowl(x, y, k * TW, { fill: 1 - .6 * seg(t, T.STUFFIN, T.ARMOUT) }); }
    // the turkey (and its pan or platter)
    const onIsland = inW(t, T.THUD, T.BATH) || inW(t, T.UNWRAP, T.SQUIRT - .9) || inW(t, T.PAN, T.DIAL) || t >= T.PAINT;
    if (!onIsland) return;
    let [x, y, k] = pS(TK); const s = k * TW;
    if (inW(t, T.THUD, T.THUD + .5)) y += -14 * k * Math.abs(Math.sin((t - T.THUD) * 14)) * (1 - seg(t, T.THUD, T.THUD + .5));
    if (inW(t, T.PAN, T.DIAL)) { const A = TKY.pan(x, y, s); [x, y] = A.top; }
    if (t >= T.PAINT) { const A = TKY.platter(x, y, s, { garnish: t >= T.TADA }); [x, y] = A.top; }
    drawBird(P, t, x, y, s);
  }
  function drawBird(P, t, x, y, s, extra = {}) {
    const b = { ...bird(t), ...extra };
    if (b.state === 'burnt' && t >= T.PAINT) return coverUp(t, x, y, s, b, P);
    const A = TKY.turkey(x, y, s, b);
    if (b.state === 'frozen') {
      if (t >= 52.4) for (let i = 0; i < 5; i++) circle(A.base[0] + (i - 2) * 2.6 * s, A.base[1] - (1.6 + hash(i * 5) * 1.6) * s, (.7 + .5 * hash(i)) * s, { fill: [TC.kale, TC.broc, TC.quinoa][i % 3], stroke: PAL.ink, lwPx: 1.2 });   // stuffing poking out
      if (t >= T.LIDOFF + .1) TT3.specks(A.top[0], A.top[1] + 6 * s, 26 * s, 8 * s, 60, C.pepper, 3, clamp(seg(t, T.LIDOFF, T.LIDOFF + .4)));
      if (t >= T.LIDOFF + .1 && t < T.CHOO) { const h = seg(t, T.LIDOFF, T.LIDOFF + .4); ellipse(A.top[0], A.top[1] + 2 * s, 9 * s * h, 3.2 * s * h, { fill: C.pepper, stroke: null }); }
      if (t >= T.CHOO + .1) TT3.specks(A.centre[0], A.centre[1], 36 * s, 22 * s, 70, '#FFFFFF', 7, .85);
      if (inW(t, T.DRY1, T.FUSE)) for (let i = 0; i < 4; i++) { const u = frac(t * 1.3 + i * .25); line([[A.base[0] + (i - 1.5) * 9 * s, A.base[1]], [A.base[0] + (i - 1.5) * 9 * s, A.base[1] + (2 + u * 3) * s]], { stroke: rgba('#9ED4EC', .8 * (1 - u)), lwPx: 2 }); }
    }
    return A;
  }
  // the burnt bird during the cover-up: glaze, the snapped drumstick, toothpicks, band-aid, garnish, frills
  function coverUp(t, x, y, s, b, P) {
    const sc = s * .6, gone = t >= T.SNAP;
    const draw = () => TKY.turkey(x, y, s, b);
    const back = t >= T.FIX + .45;
    if (gone) TT3.withoutDrumstick(x, y, s, draw); else draw();
    TT3.glaze(x, y, s, seg(t, T.PAINT + .4, T.SNAP - .2), t, { noRight: gone });
    if (inW(t, T.SNAP, T.SNAP + .55) && P) {                                     // the snapped drumstick flies off to the doctor's side
      const u = seg(t, T.SNAP, T.SNAP + .55), [hx, hy] = P.p(56, 118, 925);
      TT3.drumstick(lerp(x + 9.5 * sc, hx, u), lerp(y - sc, hy, u) - 90 * sc * Math.sin(u * Math.PI), sc, u * 9, 1);
    }
    if (back) {                                                     // re-attached: toothpicks, then the band-aid
      TT3.drumstick(x + 9.5 * sc, y - 1 * sc, sc, 0, 1);
      [[145.2, -1.5], [145.7, 0], [146.2, 1.5]].forEach(([tt, d]) => { if (t >= tt) TT3.toothpick(x + (12 + d) * sc, y - (5 + d) * sc, x + (19 + d) * sc, y - (10 + d * .6) * sc, sc); });
      if (t >= 146.8) TT3.bandAid(x + 15 * sc, y - 7 * sc, sc * .8, -.7);
    }
    if (t >= T.GARN) { const n = seg(t, T.GARN, T.GARN + 1.6); TT3.garnish(x - 2 * sc, y - 3 * sc, 34 * sc, 7 * sc, n, 1); TT3.garnish(x - 4 * sc, y - 20 * sc, 14 * sc, 5 * sc, clamp(n * 1.4 - .4), 5); }
    for (const [tt, lx, ly] of [[149.4, -21.5, -21], [149.8, 21.5, -21]]) if (t >= tt) TT3.frill(x + lx * sc, y + ly * sc, 3.4 * sc * backOut(seg(t, tt, tt + .2)), lx < 0 ? -.75 : .75);
    return { top: [x, y - 23.5 * sc], centre: [x, y - 11 * sc], base: [x, y], drumstickR: [x + 21.5 * sc, y - 21 * sc] };
  }

  // ---------- drawing a brother, with whatever is in his hands ----------
  function drawChar(P, n, a, t, A, S, o = {}) {
    const p = { ...pose(n, t, P, a), ...(o.freeze ? { boil: 0 } : {}) }, [sx, sy, k] = P.p(a.x, a.y, a.z), s = U * k;
    A[n] = TT3.dress(RIG[n], n, sx, sy, s, p); S[n] = s; A[n]._p = p; A[n]._a = a;
    return A[n];
  }
  // the props in a brother's hands (drawn over the island)
  function handProps(P, t, n, Ax, s) {
    const p = Ax._p, k = s / U, hR = Ax.handR, hL = Ax.handL, side = n === 'safadi' ? 1 : -1;
    if (inW(t, T.DRY1, T.BATH) && (n === 'safadi' || t >= T.DRY2)) {           // the hair dryers
      const h = n === 'safadi' ? hR : hL, ang = n === 'safadi' ? .45 : Math.PI - .45;
      X.save(); X.translate(h[0], h[1]); if (n !== 'safadi') X.scale(-1, 1); TT3.hairDryer(2 * k, -10 * k, k, .45, t < T.FUSE, t, n === 'safadi' ? 'pink' : 'teal'); X.restore();
      if (inW(t, T.FUSE, T.FUSE + 1)) TT3.puffs(h[0] + side * 22 * k, h[1] - 10 * k, 14 * k, C.smokeLt, t - T.FUSE, 1, n === 'safadi' ? 2 : 5, t, 4);
    }
    if (p._bowl) { const m = mixPt(hL, hR, .5); TKY.stuffingBowl(m[0], m[1] + 3 * k, k * TW, {}); if (p._spoon) { TT3.spoon(hR[0], hR[1], k, -1.9); TT3.bits(m[0], m[1] - 12 * k, k, 14, Math.floor(t * 2), t - frac(t * 2) / 2, t, 40); } }
    if (p._cyl) TT3.pepperJar(hR[0], hR[1] - 6 * k, k, { tilt: .3, lid: true });
    if (p._jar) { TT3.pepperJar(hR[0], hR[1] - 6 * k, k, p._jar);
      if (t >= T.LIDOFF) { const u = seg(t, T.LIDOFF, T.LIDOFF + .45), [tx, ty] = P.p(TK[0], 92, TK[2]); TT3.lid(lerp(hR[0] - 6 * k, tx - 40 * k, u), lerp(hR[1] - 18 * k, ty, easeIn(u)) - 20 * k * Math.sin(u * Math.PI), k, u * 5); } }
    if (n === 'safadi' && inW(t, T.RIP, T.THAWED + .3)) { const fl = 1 - seg(t, T.THAWED, T.THAWED + .3);   // the torn shrink-wrap and net, held up
      X.save(); X.globalAlpha = fl; shape(ellPts(hR[0] + 4 * k, hR[1] - 16 * k, 16 * k, 20 * k, 14, .3).map(([x, y], i) => [x + (hash(i) - .5) * 6 * k, y + (hash(i + 3) - .5) * 6 * k]), { fill: 'rgba(235,246,252,.85)', stroke: PAL.ink, lwPx: 2 });
      for (let i = 0; i < 5; i++) line([[hR[0] - 8 * k + i * 4 * k, hR[1] - 32 * k], [hR[0] - 4 * k + i * 4 * k, hR[1] - 2 * k]], { stroke: 'rgba(255,255,255,.9)', lwPx: 1.5 });
      shape(rectPts(hR[0] - 6 * k, hR[1] - 20 * k, 14 * k, 7 * k), { fill: '#F08A2C', stroke: PAL.ink, lwPx: 1.5 }); X.restore(); }
    if (p._brush) TT3.brush(hR[0], hR[1], k, .2 + .15 * Math.sin(t * 16), 1);
    if (p._pot) TT3.gravyPot(hL[0], hL[1] + 4 * k, k);
    if (p._parsley) TT3.parsley(hR[0], hR[1], k, .3);
    if (p._parsleyM) TT3.parsley(hR[0], hR[1] - 2 * k, k, -.3);
    if (p._drum && t >= T.SNAP + .55) TT3.drumstick(hL[0] - 6 * k, hL[1] + 6 * k, k * TW * .75, -.4, 1);
    if (p._band) TT3.bandAid(hR[0] - 2 * k, hR[1] - 4 * k, k * TW * .6 * .8, -.5);
    if (p._towel) { const h = n === 'safadi' ? hR : hL; TT3.towel(h[0] - (n === 'safadi' ? 0 : 24 * k), h[1], k, t, n === 'safadi' ? 0 : 2); }
    for (const [key, h, ang] of [['_mittL', hL, Math.PI], ['_mittR', hR, 0]]) if (p[key]) TT3.mitt(h[0], h[1], k * .9, Ax.arms[key === '_mittL' ? 'L' : 'R'].ang);
  }

  // ---------- the stage, for a camera ----------
  function stage(t, camO, blur = 0, o = {}) {
    const P = persp(camO), A = {}, S = {}, ko = kitchen(t);
    const places = { safadi: at('safadi', t), sami: at('sami', t) };
    const pl = places.safadi.place, split = pl === 'island' ? 960 : pl === 'front' ? 700 : 1140;
    const opts = { ...ko, splitZ: split, ...(pl === 'oven' || pl === 'sink' ? { toZ: 960 } : {}), onIsland: (P2, tt) => island(P2, t), inOven: (P2, tt) => inOven(P2, t) };
    layer(() => {
      K.back(P, t, opts);
      TT3.clock(P, hour(t), t);
      if (t >= T.MAXED && t < T.FACES) TT3.display(P, '1400°');
      TT3.dialMarks(P);
    }, { blur });
    // in front of the island: the turkey on the floor goes under the characters
    if (pl === 'front' && inW(t, T.FLOOR, T.FIVE)) { const [x, y, k] = P.p(150 - 6 * seg(t, T.FLOOR, T.FLOOR + .4), 0, 700); TKY.turkey(x, y - 4 * k * Math.abs(Math.sin((t - T.FLOOR) * 9)) * (1 - seg(t, T.FLOOR, T.FLOOR + .6)), k * TW, { ...bird(t), rot: .3 * (1 - seg(t, T.FLOOR, T.FLOOR + .6)) }); }
    const order = ['safadi', 'sami'].filter(n => !o.hide?.includes(n) && P.depth(places[n].z) > 40 && t >= T.LIFT).sort((p, q) => places[q].z - places[p].z);
    for (const n of order) drawChar(P, n, places[n], t, A, S, o);
    // the turkey held behind the island during the lift (the island hides it while it is low)
    if (inW(t, T.LIFT, T.THUD)) { const ty = kf(t, [[T.LIFT, 60], [T.LIFT + 1.6, 168], [T.THUD - .45, 175], [T.THUD, 122]]), tz = kf(t, [[T.LIFT, 975], [T.THUD - .45, 970], [T.THUD, 905]]);
      const [x, y, k] = P.p(0, ty - 16, tz); TKY.turkey(x, y, k * TW, { ...bird(t), rot: .05 * Math.sin(t * 7) }); }
    K.front(P, t, opts);
    // arms over the island top (clipped above its front edge), then the props in hand
    const yFront = P.p(0, 92, ISLAND_Z0())[1];
    for (const n of order) { const Ax = A[n]; if (!Ax) continue; const a = Ax._a;
      if (behind(a) && !Ax._p._under && t < T.WAIT && t > T.LIFT + .9 && !o.noOver) { X.save(); X.beginPath(); X.rect(0, 0, W, yFront); X.clip(); const [sx, sy] = P.p(a.x, a.y, a.z); TT3.dress(RIG[n], n, sx, sy, S[n], { ...Ax._p, _armsOnly: true }); X.restore(); }
      handProps(P, t, n, Ax, S[n]); }
    overWorld(t, P, A, S);
    return { A, S, P };
  }
  const ISLAND_Z0 = () => K.ISLAND.z0;

  // the oven's inside: the pan and the bird on the rack
  function inOven(P, t) {
    if (!(t >= T.DIAL && t < T.FACES)) return;
    const [x, y, k] = P.p(K.OVEN.inside.x, K.OVEN.rack, K.OVEN.inside.z), s = k * TW, A = TKY.pan(x, y, s);
    const b = bird(t); TKY.turkey(A.top[0], A.top[1], s, t < T.REVEAL ? { ...b, frost: .4 } : { ...b, smoke: 1 });
    if (t < T.REVEAL && t > T.SMOKE) ellipse(A.top[0], A.top[1] - 14 * s, 20 * s, 12 * s, { fill: rgba('#2A2226', .6 * seg(t, T.SMOKE, T.DING)), stroke: null });
  }

  // ---------- things over everything: the turkey in flight, clouds, the sound effects ----------
  function overWorld(t, P, A, S) {
    const W3 = w => P.p(...w), vis = z => P.depth(z) > 40;
    const fx = (txt, w, size, col, t0, life = 1, op = {}) => { if (t >= t0 && t < t0 + life && vis(w[2])) { const [sx, sy] = W3(w); sfx(txt, sx, sy, size, col, t - t0, { life, ...op }); } };
    const fxA = (txt, an, dx, dy, size, col, t0, life = 1) => { if (an && t >= t0 && t < t0 + life) sfx(txt, an[0] + dx, an[1] + dy, size, col, t - t0, { life }); };
    // the turkey in the hands, in the air, on the professor's head, in the doctor's hands
    if (inW(t, T.SLIP, T.SQUIRT)) { const [x, y, k] = W3([0, 102, 758]); TKY.turkey(x, y, k * TW, { ...bird(t), squash: -.08 * kick(t, T.SQUIRT - .3, 3) }); }
    if (inW(t, T.SQUIRT + .08, T.HEAD)) for (let i = 4; i >= 1; i--) { const tt = Math.max(T.SQUIRT, t - i * .045), w = flight(tt); if (!vis(w[2])) continue; const [x, y, k] = W3(w);   // a motion trail
      X.save(); X.globalAlpha = .13 * (5 - i); TKY.turkey(x, y + 16 * k, k * TW, { ...bird(t), rot: (tt - T.SQUIRT) * 9 }); X.restore(); }
    if (inW(t, T.SQUIRT + .05, T.HEAD)) { const a0 = W3(flight(t - .16)), a1 = W3(flight(t)); for (let i = -1; i <= 1; i++) line([[a0[0] + i * 14, a0[1] + 20 * a0[2] + i * 14], [a1[0] + i * 10, a1[1] + 20 * a1[2] + i * 10]], { stroke: rgba('#FFFFFF', .85), lwPx: 5 }); }
    if (inW(t, T.SQUIRT, T.HEAD)) { const w = flight(t); if (vis(w[2])) { const [x, y, k] = W3(w); TKY.turkey(x, y + 16 * k, k * TW, { ...bird(t), rot: (t - T.SQUIRT) * 9, squash: .2 * Math.max(kick(t, T.LAMP, 8), kick(t, T.FRIDGE, 8)) }); } }
    if (A.safadi && inW(t, T.HEAD, T.POP)) { const hd = A.safadi.top, s = S.safadi, k = s / U, pull = seg(t, T.PULL, T.POP);
      TKY.turkey(hd[0] + .4 * s, hd[1] - 1.6 * s - 2.5 * s * pull, k * TW, { ...bird(t), rot: Math.PI + .1 * Math.sin(t * 5), squash: -.1 * pull }); }
    if (A.sami && inW(t, T.POP, T.FLOOR)) { const [x0, y0] = A.safadi ? A.safadi.top : [W / 2, 300], [x1, y1] = W3([150, 0, 700]), u = seg(t, T.POP, T.FLOOR), k = P.k(740);
      TKY.turkey(lerp(x0, x1, u), lerp(y0, y1, u) - 260 * k * Math.sin(u * Math.PI), k * TW, { ...bird(t), rot: Math.PI + u * 8 }); }
    if (A.sami && A.sami._p._hold) { const m = mixPt(A.sami.handL, A.sami.handR, .5), k = S.sami / U; TKY.turkey(m[0], m[1] + 8 * k, k * TW, bird(t)); }
    if (A.sami && A.sami._p._panHeld) { const m = mixPt(A.sami.handL, A.sami.handR, .5), k = S.sami / U, B = TKY.pan(m[0], m[1] + 6 * k, k * TW); TKY.turkey(B.top[0], B.top[1], k * TW, { ...bird(t), smoke: .9 }); }

    // the sink: water, the bird, the duck, the steam, the ice
    if (inW(t, T.BATH, T.UNWRAP) && vis(1268)) {
      const [x, y, k] = W3([-260, 92, 1268]), s = k * TW;
      X.save(); X.beginPath(); X.rect(x - 60 * k, y - 80 * k, 120 * k, 80 * k + 4 * k); X.clip();
      TKY.turkey(x, y + 8 * k + 1.5 * k * Math.sin(t * 3), s, bird(t));
      X.restore();
      const ice = seg(t, T.ICE, T.ICE + .5);
      ellipse(x, y + 1 * k, 40 * k, 6 * k, { fill: rgba(ice > .5 ? '#DDF3FB' : '#9ED4EC', .75), stroke: rgba('#FFFFFF', .8), lwPx: 2 });
      TT3.iceSheet(x, y + 1 * k, 40 * k, 6 * k, ice, t);
      if (t >= T.DUCK) { const dk = ice > .5 ? 0 : 1; TT3.duck(x + 14 * k + dk * 3 * k * Math.sin(t * 2), y - 12 * k + dk * 1.5 * k * Math.sin(t * 3), k * 1.1, { rot: (ice > .5 ? .25 : .08 * Math.sin(t * 2.5)) }); }
      if (inW(t, T.DUCK - .6, T.DUCK) && A.safadi) TT3.duck(A.safadi.handR[0], A.safadi.handR[1] + 4 * k, k * 1.1);
      if (A.sami && inW(t, T.BATH, T.DUCK)) { const h = A.sami.handL; TT3.kettle(h[0] + 4 * k, h[1] - 2 * k, k, 0, ease(seg(t, T.POUR, T.POUR + .4)) * (1 - ease(seg(t, T.DUCK - .5, T.DUCK - .1))), t);
        if (inW(t, T.POUR + .3, T.DUCK - .4)) for (let i = 0; i < 4; i++) { const u = frac(t * 3 + i * .25); line([[h[0] - 14 * k, h[1] + 6 * k], [lerp(h[0] - 14 * k, x + 22 * k, u), lerp(h[1] + 6 * k, y, u)]], { stroke: rgba('#BFE6F7', .8), lwPx: Math.max(3, 3 * k) }); } }
      if (t < T.ICE) for (let i = 0; i < 4; i++) { const u = frac(t * .6 + i * .25); TT3.cloud(x + (i - 1.5) * 18 * k + Math.sin(t + i) * 6 * k, y - 20 * k - u * 90 * k, (10 + u * 14) * k, '#FFFFFF', .5 * Math.sin(Math.PI * u) * seg(t, T.POUR, T.POUR + 1), i, t); }
      fx('SPLASH!', [-200, 150, 1268], 62, '#BFE6F7', T.POUR + .2, .9);
      fx('squeak!', [-230, 135, 1268], 48, PAL.goldLt, T.DUCK, .9);
      fx('CRACKLE!', [-260, 160, 1268], 70, '#DDF3FB', T.ICE, 1.1);
    }
    // the pepper cloud, the sneeze, the flour explosion
    if (inW(t, T.LIDOFF, T.SLIP)) {
      const [px, py, pk] = W3([0, 125, 905]);
      X.save(); X.globalAlpha = .7; TT3.puffs(px, py - 14 * pk, 30 * pk, C.pepperLt, t - T.LIDOFF - .2, 2.2, 3, t, 6); X.restore();
      if (inW(t, T.AHH, T.CHOO)) TT3.specks(px, py - 40 * pk, 80 * pk, 30 * pk, 30, C.pepper, Math.floor(t * 6), .6);
      const [fx0, fy0, fk] = W3([-42, 105, 878]);
      if (t >= T.CHOO + .1) { const age = t - T.CHOO - .1;
        TT3.puffs(fx0, fy0, 420 * fk, '#FFFFFF', age, 1.9, 11, t, 9);
        TT3.puffs(W / 2, H / 2, 900, C.flour, age - .1, 1.25, 17, t, 8);
        flash(.9 * kick(t, T.CHOO + .12, 3));
        TT3.specks(W / 2, H / 2 - 100 * (1 - seg(t, T.CHOO, T.SLIP)), W * 1.1, H * .9, 140, '#FFFFFF', 21, .6 * (1 - seg(t, T.BLESS + 2, T.SLIP)));
      }
      if (A.safadi) { const m = A.safadi.mouth; if (inW(t, T.CHOO, T.CHOO + .5)) for (let i = 0; i < 6; i++) { const u = seg(t, T.CHOO, T.CHOO + .4); line([[m[0] + 20, m[1]], [m[0] + 20 + (60 + i * 20) * u, m[1] + (i - 2) * 30 * u]], { stroke: rgba('#FFFFFF', .9 * (1 - u)), lwPx: 6 }); } }
      if (A.safadi) sfx('AH-CHOO!', A.safadi.head[0] + 3 * S.safadi, A.safadi.head[1] - 4 * S.safadi, 118, '#FFFDF6', t - T.CHOO, { life: 1.3 });
      fx('FWUMP!', [0, 150, 905], 66, C.pepperLt, T.LIDOFF + .15, .9);
      if (t >= T.SHAKE && A.safadi) for (const n of ['safadi', 'sami']) TT3.puffs(A[n].head[0], A[n].head[1], 34 * S[n] / U, '#FFFFFF', t - T.SHAKE, .9, n === 'safadi' ? 4 : 8, t, 6);
    }
    // thawing: clonks, the stethoscope, the dryers
    fx('CLONK!', [0, 150, 905], 76, '#DDF3FB', T.K1, .5); fx('CLONK!', [-10, 160, 905], 84, '#DDF3FB', T.K2, .8);
    fx('THUD!', [0, 140, 905], 96, PAL.goldLt, T.THUD, 1);
    fx('WHIRRR', [-60, 165, 905], 54, '#FFFDF6', T.DRY1 + .3, 1.6); fx('WHIRRRRR!', [60, 170, 905], 64, '#FFFDF6', T.DRY2 + .3, 1.6);
    fx('PFFT.', [0, 175, 905], 70, C.smokeLt, T.FUSE, 1);
    fx('drip.', [0, 82, 880], 44, '#9ED4EC', 24.8, .8);
    fx('RRRIP!', [-20, 160, 905], 84, '#FF9A9A', T.RIP, .9);
    fx('tok tok', [-10, 140, 905], 46, '#FFFDF6', T.THAWED + .2, .9);
    fx('SQUISH!', [0, 130, 905], 58, TC.broc, 52.4, .5); fx('SQUISH!', [10, 136, 905], 58, TC.broc, 52.95, .5); fx('SQUELCH!', [0, 140, 905], 66, TC.broc, T.ARMIN + .1, 1);
    fx('POP!', [20, 130, 905], 70, '#FFFDF6', T.ARMOUT, .7);
    fx('tap', [-44, 150, 912], 40, '#FFFDF6', T.TAP, .4); fx('tap', [-44, 150, 912], 40, '#FFFDF6', 66.1, .4);
    // the escape
    fx('SQUIRT!', [0, 150, 758], 80, '#FFFDF6', T.SQUIRT, .8);
    fx('CLANG!', [90, 225, 905], 80, PAL.goldLt, T.LAMP, .8); fx('BONK!', [430, 190, 1210], 84, '#FFFDF6', T.FRIDGE, .8);
    fxA('THWOMP!', A.safadi?.top, 120, -40, 84, PAL.goldLt, T.HEAD, .9);
    fxA('POP!', A.safadi?.top, -40, -60, 110, '#FFFDF6', T.POP, .9);
    fx('SPLAT!', [150, 10, 700], 76, PAL.goldLt, T.FLOOR, .9);
    // the oven
    for (const [i, tt] of [105.6, 106.0, 106.4, 106.8, 107.2].entries()) fx('click', [32 + i * 6, 96 + i * 4, 1229], 34 + i * 3, '#FFFDF6', tt, .35);
    fx('CLICK!', [40, 110, 1229], 64, '#FF9A4A', T.MAXED, .9);
    fx('DING!', [0, 150, 1229], 110, PAL.goldLt, T.DING, 1.1);
    fx('BEEP! BEEP!', [-150, 215, 1050], 70, '#FF6B6B', T.DING + .3, 1.6);
    fx('WHOOMPH!', [0, 120, 1200], 110, '#D8D2DA', T.DOOR + .4, 1.1);
    if (inW(t, T.DOOR + .3, T.FACES + .4) && vis(1229)) { const [x, y, k] = W3([0, 50, 1215]), age = t - T.DOOR - .3; TT3.puffs(x, y - 40 * k, 230 * k, C.smoke, age, 1.7, 13, t, 9); TT3.puffs(x, y - 30 * k, 160 * k, C.smokeLt, age - .2, 1.6, 23, t, 7); }
    // zzz
    if (A.safadi && inW(t, 110.8, T.DING)) for (let i = 0; i < 3; i++) { const u = frac(t * .5 + i / 3), [hx, hy] = A.safadi.top; overlay(() => { X.save(); X.globalAlpha = Math.sin(Math.PI * u); X.font = `${40 + 30 * u}px ${FONT_SFX}`; X.fillStyle = '#FFFDF6'; X.strokeStyle = PAL.ink; X.lineWidth = 6; X.strokeText('z', hx - 40 - u * 60 + 10 * Math.sin(u * 7), hy - u * 160); X.fillText('z', hx - 40 - u * 60 + 10 * Math.sin(u * 7), hy - u * 160); X.restore(); }); }
    // the cover-up
    fx('SLAP!', [-10, 140, 905], 56, TC.glazeLt, 135.8, .5); fx('SLAP!', [12, 145, 905], 56, TC.glazeLt, 137.6, .5); fx('SLAP!', [0, 140, 905], 56, TC.glazeLt, 139.0, .5);
    fx('SNAP!', [40, 150, 905], 92, '#FF9A9A', T.SNAP, .9);
    fx('SLAP!', [48, 160, 930], 60, TC.parsleyLt, T.PARSLEY - .3, .7);
    fx('tok!', [30, 140, 900], 46, '#FFFDF6', 145.2, .4); fx('tok!', [34, 146, 900], 46, '#FFFDF6', 145.7, .4); fx('tok!', [38, 152, 900], 46, '#FFFDF6', 146.2, .4);
    fx('pop!', [-30, 150, 905], 46, '#FFFDF6', 149.4, .4); fx('pop!', [30, 150, 905], 46, '#FFFDF6', 149.8, .4);
    if (inW(t, T.TADA, T.TADA + 1.4) && vis(905)) { const [x, y, k] = W3([0, 112, 905]); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t, r = (40 + 30 * seg(t, T.TADA, T.TADA + 1)) * k, f = 1 - seg(t, T.TADA + .6, T.TADA + 1.4);
      shape(starPts(x + Math.cos(a) * r, y + Math.sin(a) * r * .6, 9 * k * f, .25, 4), { fill: '#FFE066', stroke: null }); } flash(.5 * kick(t, T.TADA, 8)); }
    fx('TA-DA!', [0, 175, 905], 104, PAL.goldLt, T.TADA + .1, 1.4);
    fx('DING-DONG!', [-120, 200, 900], 84, PAL.goldLt, T.BELL, 1.4);
    fx('plonk.', [40, 100, 905], 56, '#FFFDF6', T.DROP, .8); fx('click!', [30, 120, 905], 50, '#FFFDF6', T.BACK, .6);
  }

  // ---------- bubbles: beside the speaker; from the edge when the speaker is out of frame ----------
  function bubbles(t, A, S, o = {}) {
    for (const l of LINES) {
      if (l.silentBubble) continue;
      const age = t - l.at; if (age < 0 || age > 12) continue;
      const c = { size: o.size || 50, maxW: o.maxW || 620, cps: l.cps, hold: l.hold, kind: l.kind, accent: ACCENT[l.speaker] };
      if (l.group) { const ms = l.group.map(n => A?.[n]).filter(a => a && a.mouth[0] > 0 && a.mouth[0] < W);
        if (ms.length > 1) { callout(l.text, ms.reduce((a, m) => a + m.mouth[0], 0) / ms.length, Math.min(...ms.map(m => m.mouth[1])) - 40, age, { ...c, size: c.size * 1.3, dx: 0, dy: o.groupDy ?? -200 }); continue; } }
      const a = A?.[l.speaker], s = S?.[l.speaker];
      if (a && a.mouth[0] > 60 && a.mouth[0] < W - 60 && a.mouth[1] > 40 && a.mouth[1] < H) {
        const side = o.side?.[l.speaker] ?? (l.speaker === 'safadi' ? 1 : -1);
        callout(l.text, a.mouth[0] + side * 6.6 * s * .9, a.mouth[1] - .6 * s, age, { ...c, dx: side * (o.far || 250), dy: o.dy ?? -190 });
      } else callout(l.text, l.speaker === 'safadi' ? -30 : W + 30, o.edgeY ?? H * .3, age, { ...c, dx: l.speaker === 'safadi' ? 420 : -420, dy: -100 });
    }
  }

  // ---------- cameras ----------
  const drift = t => [10 * Math.sin(t * .23), 6 * Math.sin(t * .31)];
  // behind the island: eye y, camera z, and the screen y of the brothers' hair tops (Y ISLY + 177)
  const camI = (z0, z1, top, x = 0, a = 0, b = 1, y = 175) => t => { const [ox, oy] = drift(t), z = lerp(z0, z1, ease(seg(t, a, b))), k = 1000 / (ISLZ - z);
    return { x: x + ox, y, z, f: 1000, hy: top - (y - (ISLY + 177)) * k + oy }; };
  const camF = (x0, z0, z1, feet, y, a = 0, b = 1, f = 1000, Z = 770) => t => { const [ox, oy] = drift(t), z = lerp(z0, z1, ease(seg(t, a, b))), k = f / (Z - z);
    return { x: x0 + ox, y, z, f, hy: feet - y * k + oy }; };
  const OPENC = t => { const u = ease(seg(t, 0, T.LIFT)); return { x: 30 * Math.sin(t * .3), y: lerp(200, 170, u), z: lerp(330, 470, u), f: 620, hy: lerp(500, 525, u) }; };
  const ISLM = camI(700, 730, 170, 0, T.LIFT, T.THUD + 4);                    // the island medium: both brothers, the turkey between them
  const ISLM2 = camI(710, 740, 170, 0, T.UNWRAP, T.STUFF);
  const ISLM3 = camI(720, 745, 165, 0, T.STUFF, T.STUFFIN);
  const ISLK = camI(740, 770, 140, 0, T.KNOCK, T.BATH);                        // closer: the knocks, the stethoscope, the dryers
  const STUFFC = camI(760, 790, 120, 50, T.STUFFIN, T.NOTICE);                 // close on the doctor and the bird
  const WRIST = camI(740, 770, 150, 20, T.NOTICE, T.SPICE);
  const SPICEC = camI(740, 770, 130, -40, T.SPICE, T.AHH);                     // close on the professor and his glassware
  const CHOOC = camI(720, 690, 170, 0, T.AHH, T.SLIP);
  const SINKC = t => { const [ox, oy] = drift(t); return { x: -260 + ox, y: 172, z: lerp(900, 930, ease(seg(t, T.BATH, T.UNWRAP))), f: 1000, hy: 230 + oy }; };
  const FANC = t => { const [ox, oy] = drift(t); return { x: -260 + ox, y: 160, z: 880, f: 1000, hy: 300 + oy + 8 * Math.sin(t * 9) }; };
  const FRONTC = camF(0, 500, 530, 1000, 115, T.SLIP, T.SQUIRT);
  const RICOC = t => { const [ox, oy] = drift(t), x = kf(t, [[T.RICO, 80], [T.FRIDGE, 230], [T.HEAD, 90]]), k = 1050 / (770 - 335); return { x: x + ox, y: 150, z: 335, f: 1050, hy: 1010 - 150 * k + oy }; };
  const STUMBLEC = camF(0, 420, 440, 1010, 112, T.BLIND, T.PULL);
  const FIVEC = camF(40, 480, 520, 1040, 115, T.FIVE, T.PAN);
  const CALCC = camI(680, 700, 290, 0, T.PAN, T.DIAL);
  const OVENC = t => { const [ox, oy] = drift(t), z = lerp(900, 930, ease(seg(t, T.DIAL, T.WAIT))), k = 1000 / (1160 - z); return { x: ox, y: 95, z, f: 1000, hy: 1040 - 95 * k + oy }; };
  const OVEN2 = t => { const [ox, oy] = drift(t), z = lerp(890, 920, ease(seg(t, T.DOOR, T.FACES))), k = 1000 / (1160 - z); return { x: ox, y: 95, z, f: 1000, hy: 1040 - 95 * k + oy }; };
  const WAITC = t => { const [ox, oy] = drift(t), z = lerp(700, 730, ease(seg(t, T.WAIT, T.DOOR))), k = 1000 / (ISLZ - z); return { x: ox, y: 215, z, f: 1000, hy: 255 - (215 - 169) * k + oy }; };
  const FACESC = t => { const [ox, oy] = drift(t), z = lerp(980, 1000, ease(seg(t, T.FACES, T.FAN))), k = 1000 / (1160 - z); return { x: ox * .5, y: 150, z, f: 1000, hy: 440 - (150 - 142) * k + oy * .5 }; };
  const PAINTC = camI(770, 790, 120, 0, T.PAINT, T.SCALPEL, 150);
  const SURGC = camI(700, 720, 170, 20, T.SCALPEL, T.FIX);
  const FIXC = camI(780, 800, 115, 15, T.FIX, T.TADA, 150);
  const TADAC = camI(720, 745, 170, 0, T.TADA, T.END);

  const shot = (camFn, blur, bo, extra) => t => { const r = stage(t, camFn(t), blur); bubbles(t, r.A, r.S, bo); if (extra) extra(t, r); };
  const opening = shot(OPENC, 0, {}, t => TT3.card('TURKEY TROUBLE', 'Fall Festival · part 3', backOut(seg(t, .4, .8)) * (1 - ease(seg(t, 3.0, 3.4)))));
  const islM = shot(ISLM, 1.4, {});
  const islK = shot(ISLK, 1.8, {});
  const islM2 = shot(ISLM2, 1.4, {});
  const islM3 = shot(ISLM3, 1.4, {});
  const stuffC = shot(STUFFC, 2.2, {});
  const wrist = shot(WRIST, 2, {});
  const spiceC = shot(SPICEC, 2.2, { far: 260 });
  const chooC = shot(CHOOC, 1.4, {});
  const sinkS = shot(SINKC, 1.6, {});
  const fanS = shot(FANC, 1.6, {});
  const frontS = shot(FRONTC, .8, {});
  const ricoS = shot(RICOC, 0, {});
  const stumbleS = shot(STUMBLEC, .8, {});
  const fiveS = shot(FIVEC, 1.2, {});
  const ovenS = shot(OVENC, 1.4, {});
  const oven2 = shot(OVEN2, 1.4, {});
  const waitS = shot(WAITC, .6, { dy: -170 });
  const facesS = shot(FACESC, 2.6, {});
  const paintS = shot(PAINTC, 2.2, {});
  const surgS = shot(SURGC, 1.8, {});
  const fixS = shot(FIXC, 2.4, {});
  const tadaS = shot(TADAC, 1.4, {});
  const calcS = shot(CALCC, 1.4, { side: { safadi: 1 } }, (t, r) => {                // the chalkboard: 4 h × 350° = 1 h × 1400°
    const k = seg(t, T.CALC - .3, T.CALC + 3.6) * (1 - ease(seg(t, T.DIAL - .5, T.DIAL - .1)));
    if (k <= 0 || !r.A.safadi) return;
    const bx = 330, by = 330, w = 540;
    safadiBoard(bx, by, w * (1 - ease(seg(t, T.DIAL - .5, T.DIAL - .1))), k, t, { kind: 'none', title: 'TURKEY SCIENCE' });
    const d = seg(k, .2, 1), U2 = w / 100;
    const row = (txt, yy, a, col = SF.chalk) => { if (d < a) return; X.save(); X.globalAlpha = seg(d, a, a + .15); X.font = `700 ${7.5 * U2}px ${SF_CHALK}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = col; X.shadowColor = SF.glow; X.shadowBlur = U2; X.fillText(txt, bx, by + (yy - 31) * U2); X.restore(); };
    row('4 h  ×  350°', 26, .05); row('=', 36, .35); row('1 h  ×  1400° !', 46, .5, SF.glowGold);
    if (d > .8) { const f = backOut(seg(d, .8, 1)); line([[bx - 32 * U2, by + 21 * U2], [bx + 32 * U2, by + 22 * U2]], { stroke: SF.glowGold, lwPx: 3 * f }); }
  });

  // the watch close-up: 10:58 on Thanksgiving morning
  function watchIns(t) {
    const P = persp(ISLK(t)); layer(() => K.back(P, t, { ...kitchen(t), splitZ: 0 }), { blur: 6 });
    const c = backOut(seg(t, T.WATCHIN, T.WATCHIN + .25)), x = W / 2 + 10 * Math.sin(t * .8), y = H / 2 + 20;
    X.save(); X.translate(x, y); X.scale(c, c); X.translate(-x, -y);
    shape([[x - 1100, y - 20], [x + 520, y - 40], [x + 640, y - 10], [x + 690, y + 80], [x + 640, y + 170], [x + 520, y + 190], [x - 1100, y + 170]], { fill: '#F3C6A8', stroke: PAL.ink, lwPx: 6, smooth: .25 });   // his forearm and fist
    for (let i = 0; i < 3; i++) line([[x + 560 + i * 30, y + 10 + i * 4], [x + 600 + i * 26, y + 150 - i * 6]], { stroke: PAL.ink, lwPx: 4 });
    shape([[x - 1100, y - 60], [x - 330, y - 70], [x - 300, y + 80], [x - 330, y + 220], [x - 1100, y + 230]], { fill: '#FDFDFD', stroke: PAL.ink, lwPx: 6, smooth: .2 });   // the white coat cuff
    TT3.watchFace(x, y + 70, 170, hour(t), t * 6);
    X.restore();
    const tap = kick(t, 9.3, 6) + kick(t, 9.8, 6);
    shape([[x - 60, y - 280 + 30 * tap], [x + 40, y - 200 + 30 * tap], [x + 10, y - 150 + 30 * tap], [x - 110, y - 230 + 30 * tap]], { fill: '#F3C6A8', stroke: PAL.ink, lwPx: 6, smooth: .5 });   // a tapping finger
    if (t > 9.3) sfx('tap tap!', x + 260, y - 260, 60, '#FFFDF6', t - 9.3, { life: .9 });
    bubbles(t, null, null, { edgeY: H * .22 });
  }

  // ---------- the ending: freeze, TO BE CONTINUED, iris on the turkey ----------
  function ending(t) {
    const tt = Math.min(t, T.FREEZE), r = stage(tt, TADAC(tt), 1.4, { freeze: t > T.FREEZE });
    bubbles(tt, r.A, r.S, {});
    if (t < T.FREEZE) return;
    flash(.6 * kick(t, T.FREEZE, 8));
    TT3.continued(backOut(seg(t, T.FREEZE + .3, T.FREEZE + .7)));
    const [x, y, k] = r.P.p(0, 108, TK[2]);
    iris(x, y, lerp(1500, 0, easeIn(seg(t, T.END - 3, T.END - .6))));
  }

  scene({ duration: T.END, fps: 24, bpm: 132,                // id, title, dialogue, music: see asset.js
    shots: [
      // morning: the prize turkey, and confidence
      [0, opening], [T.LIFT, islM], [T.WATCHIN, watchIns], [T.THERMO - .3, islM],
      // frozen solid
      [T.KNOCK, islK], [T.BATH, sinkS], [T.UNWRAP, islM2],
      // the healthy stuffing, and the watch
      [T.STUFF, islM3], [T.STUFFIN, stuffC], [T.NOTICE, wrist],
      // seasoning by science
      [T.SPICE, spiceC], [T.AHH, chooC],
      // the turkey escapes
      [T.SLIP, frontS], [T.RICO, ricoS], [T.BLIND, stumbleS], [T.FIVE, fiveS],
      // the oven calculation
      [T.PAN, calcS], [T.DIAL, ovenS], [T.WAIT, waitS],
      // disaster
      [T.DOOR, oven2], [T.FACES, facesS],
      // the cover-up
      [T.FAN, fanS], [T.PAINT, paintS], [T.SCALPEL - .2, surgS], [T.FIX, fixS], [T.TADA, tadaS],
      // the button
      [T.FREEZE, ending],
    ] });
})();
