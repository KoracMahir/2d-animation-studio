// Scene 74: "The Thanksgiving Feast", the fourth scene of the Fall Festival series. Thanksgiving night in the family
// kitchen's dining view (dir: -1): all twelve at the long table. The Safadi brothers carry in their turkey under a cloche
// and brag (thermodynamics, zero-fat stuffing); TA-DA, it gleams. The knife goes CLANK, the band-aided drumstick falls off,
// the bird cracks open (charcoal crust, a frozen blue centre, a wristwatch in the stuffing) and everyone gets a slice.
// Ten guests, ten bites, ten reactions; the brothers defend every flaw; the plates slide back into a stack. Roudaynah and
// Dr. G bring out pumpkin pies: DESSERT! The brothers promise the PERFECT turkey next time. "You shall see!" To be continued.
// Blocking: the ten guests sit at their seats (CAST.seat, see README.md → Seating plan); the hosts stand behind the table
// in the middle (seats 5 and 6 are theirs) with the turkey on its platter in front of them. Every shot is a pure function of t.
(() => {
  const K = LOCATIONS.family_kitchen, LINES = ASSETS.scene.scene74_thanksgiving_feast.dialogue, C = TF4.C, WU = TKY.WORLD;

  // ---------- timing: the start of every line and action beat (see README.md) ----------
  const T = { OPEN: 0, HAPPY: 4, HUNGRY: 7, ANY: 8.9, FEAST: 11.7, ENTER: 14.8, LADIES: 14.9, DRAGONS: 18, HOSTS: 19.9, SET: 20.4, THERMO: 20.9, FORMULA: 25.3,
    STUFF: 30, DRUM: 34.3, ROLL: 35.3, LIFT: 37.7, TADA: 37.9, OOH: 39.4, BANDAID: 41.2, GARNISH: 43.8, ALLOW: 45.6, STRIKE: 47.5, DROP: 47.9, SELF: 48.9,
    SAW: 51.8, FIRM: 52.5, CRACK: 55.3, BLUE: 56.5, HUNGRY2: 58.8, SERVE: 59.5, BON: 63.3,
    FEST: 65.3, STORY: 67.3, HOUS: 70.8, COEF: 73.5, ALMA: 76.9, DELI: 78.9, JEN: 81.2, NOTH: 82.3, DAN: 85.3, POPS: 86.5,
    SICLE: 88.7, NBITE: 91, BLAST: 92.2, WATER: 93.9, LEAVE: 96.5, FLAME: 98.5, GBITE: 100.1, GREEN: 100.9, NOPE: 101.9,
    DRG: 104.5, RULE: 105.5, KALE: 109.3, ROU: 111.9, ORIG: 113.5, PEARL: 116.7, COOK: 118.6,
    MAILLARD: 123.1, VITA: 126.9, IRON: 130.6, DONE: 133.9, ALARM: 136.3, BACK: 137.1, MORE: 142.6, BBITE: 144.3,
    QDESS: 147.7, DESSERT: 150.5, PIES: 151.5, PSERVE: 152.9, NOW: 154.9, FIN: 157.6, CHEERS: 160, PROMISE: 164.1, PERFECT: 167.6, SEE: 170.8,
    THINK: 173.3, FREEZE: 176.6, END: 180 };

  // ---------- the cast: rig, scale, height (for K.seatY), seat (or the host's X behind the table), head half-width, family ----------
  const CAST = {
    neptune: { rig: neptune, unit: NT_UNIT, h: 190, seat: 0, hw: 3.2, fam: 'nep' },
    alma: { rig: alma, unit: ALMA_UNIT, h: 120, seat: 1, hw: 8, fam: 'alma' },
    princess_pearl: { rig: pearl, unit: PP_UNIT, h: 180, seat: 2, hw: 3, fam: 'pearl' },
    danny: { rig: danny, unit: DANNY_UNIT, h: 122, seat: 3, hw: 6, fam: 'kid' },
    roudaynah: { rig: roudaynah, unit: ROUDAYNAH_UNIT, h: 172, seat: 4, hw: 7, fam: 'rou' },
    safadi: { rig: safadi, unit: SAFADI_UNIT, h: 177, host: 48, hw: 6.6, fam: 'bro' },
    sami: { rig: sami, unit: SAMI_UNIT, h: 177, host: -48, hw: 6.6, fam: 'bro' },
    dr_g: { rig: dr_g, unit: DR_G_UNIT, h: 170, seat: 7, hw: 8, fam: 'drg' },
    housam: { rig: housam, unit: HOUSAM_UNIT, h: 168, seat: 8, hw: 6, fam: 'kid' },
    jenna: { rig: jenna, unit: JENNA_UNIT, h: 135, seat: 9, hw: 6, fam: 'jenna' },
    jester_fester: { rig: jester, unit: JF_UNIT, h: 170, seat: 10, hw: 5, fam: 'jf' },
    dragon: { rig: dragon, unit: DRAGON_UNIT, h: 170, seat: 11, hw: 7, fam: 'drag' },
  };
  const NAMES = Object.keys(CAST), GUESTS = NAMES.filter(n => CAST[n].host == null), KIDS = ['alma', 'danny', 'housam', 'jenna'];
  const ACCENT = { safadi: PAL.crimson, sami: '#2E7D6A', housam: '#425DA0', danny: '#2E7D9A', jenna: '#D0508E', alma: '#994EC4', jester_fester: '#A8284C',
    neptune: '#2B7FD4', princess_pearl: '#D0508E', dragon: '#3C8A2E', dr_g: '#5B3E9A', roudaynah: '#C2406E' };
  const HOSTY = 10, HOSTZ = 140, TKZ = 218, TKX = 0;                          // the hosts stand a little raised (they are standing); the turkey's spot
  const at = n => { const c = CAST[n]; if (c.host != null) return { x: c.host, y: HOSTY, z: HOSTZ }; const s = K.SEATS[c.seat]; return { x: s.x, y: K.seatY(c.h), z: s.z, end: !!s.end }; };
  const headY = n => at(n).y + .78 * CAST[n].h;
  const plateHome = n => { const s = K.SEATS[CAST[n].seat]; return s.end ? { x: s.x > 0 ? 412 : -412, z: 255 } : { x: s.x, z: 226 }; };
  const Y_PLATE = 77.6;
  const platterY = t => Y_PLATE + 26 * (1 - ease(seg(t, T.HOSTS - .2, T.SET)));

  // ---------- helpers ----------
  const textLen = l => l.text.replace(/\*/g, '').length;
  const lineEnd = l => l.at + .25 + textLen(l) / l.cps + l.hold;
  const speaking = (who, t) => LINES.some(l => { if (l.speaker !== who || l.kind === 'think') return false; const p = (t - l.at - .2) * l.cps; return p > 0 && p < textLen(l); });
  const curLine = t => LINES.find(l => !l.silentBubble && t > l.at && t < lineEnd(l));
  const inW = (t, a, b) => t >= a && t < b;
  const on = (t, a, b, r = .3) => ease(seg(t, a, a + r)) * (1 - ease(seg(t, b - r, b)));
  const bounce = (t, f = 10, ph = 0) => Math.abs(Math.sin(t * f + ph));
  const TALK = { bro: undefined, jf: undefined, alma: undefined, jenna: undefined, kid: ['grin', 'open', 'o', 'smile', 'open'], nep: ['grin', 'open', 'o', 'laugh', 'smile'],
    pearl: ['open', 'o', 'smile', 'open', 'flat'], drag: ['grin', 'open', 'o', 'smile'], drg: ['grin', 'open', 'o', 'smile'], rou: ['grin', 'open', 'smile', 'open'] };
  // expressions, translated to each rig's vocabulary
  const FACE = {
    happy: { _: { eyes: 'happy', mouth: 'grin', brows: 'up' }, pearl: { eyes: 'happy', mouth: 'smile', brows: 'up' } },
    smile: { _: { eyes: 'open', mouth: 'smile', brows: 'normal' } },
    gasp: { _: { eyes: 'wide', mouth: 'O', brows: 'up' }, kid: { eyes: 'wide', mouth: 'o', brows: 'up' }, nep: { eyes: 'wide', mouth: 'o', brows: 'up' }, pearl: { eyes: 'wide', mouth: 'o', brows: 'up' },
      drag: { eyes: 'wide', mouth: 'o', brows: 'up' }, drg: { eyes: 'wide', mouth: 'o', brows: 'up' }, rou: { eyes: 'wide', mouth: 'open', brows: 'up' } },
    wince: { _: { eyes: 'squeeze', mouth: 'teeth', brows: 'worried' }, kid: { eyes: 'squeeze', mouth: 'wobble', brows: 'worried' }, alma: { eyes: 'squeeze', mouth: 'wobble', brows: 'worried' },
      jenna: { eyes: 'squeeze', mouth: 'wobble', brows: 'worried' }, nep: { eyes: 'closed', mouth: 'frown', brows: 'worried' }, pearl: { eyes: 'closed', mouth: 'frown', brows: 'flat' },
      drag: { eyes: 'closed', mouth: 'pout', brows: 'normal' }, drg: { eyes: 'closed', mouth: 'frown', brows: 'worried' }, rou: { eyes: 'closed', mouth: 'frown', brows: 'worried' } },
    deadpan: { _: { eyes: 'open', mouth: 'flat', brows: 'normal' }, bro: { eyes: 'narrow', mouth: 'flat', brows: 'normal' }, nep: { eyes: 'smug', mouth: 'flat', brows: 'normal' },
      pearl: { eyes: 'bored', mouth: 'flat', brows: 'flat' }, drag: { eyes: 'open', mouth: 'pout', brows: 'normal' }, drg: { eyes: 'narrow', mouth: 'flat', brows: 'normal' }, rou: { eyes: 'narrow', mouth: 'flat', brows: 'normal' } },
    laugh: { _: { eyes: 'happy', mouth: 'open', brows: 'up' }, nep: { eyes: 'happy', mouth: 'laugh', brows: 'up' } },
    worried: { _: { eyes: 'open', mouth: 'wobble', brows: 'worried' }, nep: { eyes: 'open', mouth: 'frown', brows: 'worried' }, pearl: { eyes: 'open', mouth: 'frown', brows: 'worried' },
      drag: { eyes: 'open', mouth: 'pout', brows: 'normal' }, drg: { eyes: 'open', mouth: 'flat', brows: 'worried' }, rou: { eyes: 'open', mouth: 'flat', brows: 'worried' } },
    polite: { _: { eyes: 'open', mouth: 'smile', brows: 'worried' }, drag: { eyes: 'open', mouth: 'smile', brows: 'normal' }, pearl: { eyes: 'bored', mouth: 'flat', brows: 'flat' } },
  };
  const F = (n, kind) => { const f = FACE[kind], fam = CAST[n].fam; return { ...(f[fam] || f._) }; };

  // ---------- the turkey, the plates, the pies: their state at t ----------
  const SERVE_ORDER = ['neptune', 'alma', 'princess_pearl', 'danny', 'roudaynah', 'dr_g', 'housam', 'jenna', 'jester_fester', 'dragon'];
  const BACK_ORDER = ['neptune', 'dragon', 'alma', 'jester_fester', 'princess_pearl', 'jenna', 'danny', 'housam', 'roudaynah', 'dr_g'];
  const STACK = { x: 72, z: 262 };
  const PIE_HOME = [{ who: 'roudaynah', x: 150, z: 286 }, { who: 'dr_g', x: -150, z: 286 }];
  const PIE_OF = n => (CAST[n].seat <= 4 ? 0 : 1);
  function plateAt(n, t) {                                                     // the served plate: where it is, and what is on it
    if (CAST[n].host != null) return null;
    const h = plateHome(n), i = SERVE_ORDER.indexOf(n), t0 = T.SERVE + .32 * i, u = ease(seg(t, t0, t0 + .55));
    if (t < t0) return null;
    const from = { x: clamp(h.x, -60, 60) * .9, z: 262 }, j = BACK_ORDER.indexOf(n), b0 = T.BACK + .5 * j, v = seg(t, b0, b0 + .9);
    let x = lerp(from.x, h.x, u), z = lerp(from.z, h.z, u), y = Y_PLATE;
    if (v > 0) { const e = ease(v); x = lerp(h.x, STACK.x, e); z = lerp(h.z, STACK.z, e); y = Y_PLATE + j * 2.4 * ease(seg(v, .7, 1)); }
    return { x, z, y, stacked: v >= 1, j, moving: (u > 0 && u < 1) || (v > 0 && v < 1) };
  }
  function piePlateAt(n, t) {
    if (CAST[n].host != null) return null;
    const i = SERVE_ORDER.indexOf(n), t0 = T.PSERVE + .14 * i; if (t < t0) return null;
    const p = PIE_HOME[PIE_OF(n)], h = plateHome(n), u = easeOut(seg(t, t0, t0 + .45));
    return { x: lerp(p.x, h.x, u), z: lerp(p.z + 4, h.z, u), eaten: clamp((t - (T.NOW - 1 + i * .55)) / 14) * .9 };
  }
  const pieSlices = (k, t) => 8 - SERVE_ORDER.filter((n, i) => PIE_OF(n) === k && t >= T.PSERVE + .14 * i).length;
  function pieAt(k, t) {                                                       // in Roudaynah's / Dr. G's hands, then on the table
    const p = PIE_HOME[k], t0 = T.PIES + k * .3;
    if (t < T.QDESS + 1.2) return null;
    if (t < t0) return { held: p.who };
    const u = seg(t, t0, t0 + .55);
    return { x: p.x, z: p.z, u, land: t0 + .55 };
  }

  // ---------- poses ----------
  const fork = {};                                                              // filled per frame: who holds a fork, how (screen-space drawing after the table)
  function pose(n, t, g) {
    const c = CAST[n], fam = c.fam, a = g.a, host = c.host != null, talk = speaking(n, t), say = m => talk ? lipFlap(t, true, m, TALK[fam]) : m;
    const ph = NAMES.indexOf(n) * 1.7, L = g.L, kid = KIDS.includes(n);
    const o = { t, eyes: 'open', brows: 'normal', mouth: 'smile', lookX: 0, lookY: 0, dy: .12 * Math.sin(t * 1.6 + ph) };
    if (fam === 'nep' || fam === 'pearl') Object.assign(o, { sit: 1, dy: .05 * Math.sin(t * 1.6 + ph) });
    if (fam === 'drag') Object.assign(o, { wings: .25, noShadow: true });
    const set = p => Object.assign(o, p), is = (...ns) => ns.includes(n);
    const face = k => set(F(n, k));
    // where to look: the speaker, or the action (the turkey at X 0, Z 218)
    const look = (fx, fy = 0) => set({ lookX: clamp((a.x - fx) / 140, -.85, .85), lookY: fy });
    const ln = curLine(t);
    if (ln && ln.speaker !== n && CAST[ln.speaker]) look(at(ln.speaker).x, 0);
    // hand helpers (local units of this rig)
    const edgeY = -(76 - a.y) / c.unit;                                         // the table's far edge, in local y
    const handsUp = (k = 1) => set({ handL: [-5, edgeY - 4 * k], handR: [5, edgeY - 4 * k], handPoseL: 'palm', handPoseR: 'palm' });
    const tableHands = () => set({ handL: [-4.4, edgeY - .4], handR: [4.4, edgeY - .4], handPoseL: 'fist', handPoseR: 'fist' });

    // ===== 1. the table =====
    if (t < T.ENTER) {
      if (!host) {
        set({ ...F(n, 'smile') });
        const chat = Math.sin(t * 1.1 + ph * 2.1) > .2;                         // happy chatter: mouths and glances to a neighbour
        if (t < T.HAPPY) { set({ lookX: Math.sin(ph * 3.3) > 0 ? .6 : -.6, mouth: chat ? lipFlap(t + ph, true, 'smile', TALK[fam]) : 'smile', eyes: chat ? 'open' : 'happy' }); }
        if (inW(t, T.HAPPY, T.HUNGRY - .2)) { face('happy'); set({ lookX: 0, mouth: say(F(n, 'laugh').mouth), jump: (kid ? 1.2 : .5) * bounce(t, 7, ph) * on(t, T.HAPPY, T.HUNGRY, .3) }); if (fam !== 'nep' && fam !== 'pearl' && fam !== 'drag') handsUp(1); if (fam === 'nep') set({ flipNear: -.8 }); }
        if (t >= T.HUNGRY - .2) set({ mouth: 'smile', eyes: 'open' });
        if (is('danny') && t >= T.HUNGRY - .2) { set({ ...F(n, 'happy'), mouth: say('grin'), handR: [4.6, edgeY - 5.5], handPoseR: 'fist', handL: [-4.6, edgeY - 5.5], handPoseL: 'fist', jump: .6 * bounce(t, 8) * on(t, T.HUNGRY - .2, T.ANY + 1) });
          fork[n] = { hand: 'R', ang: -Math.PI / 2 + .1, bite: null }; fork[n + '2'] = { hand: 'L', ang: -Math.PI / 2 - .1, knife: true }; }
        if (is('dragon') && inW(t, T.ANY - .2, T.FEAST)) set({ ...F(n, 'happy'), mouth: say('grin'), wings: .5, flap: .6 * Math.sin(t * 9), jump: .4 * bounce(t, 6), lookX: .3 });
        if (is('princess_pearl') && t >= T.FEAST - .2) set({ eyes: t > T.FEAST + 2.2 && t < T.FEAST + 2.6 ? 'closed' : 'bored', mouth: say('flat'), brows: 'flat', headTilt: .18 * ease(seg(t, T.FEAST - .2, T.FEAST + .4)), lookX: .2 });
        if (is('neptune') && inW(t, T.FEAST, T.ENTER)) set({ eyes: 'smug', mouth: 'smirk', headTilt: .12 });
      }
    }
    // ===== 2. the grand entrance: the platter, the brag, TA-DA =====
    else if (t < T.GARNISH) {
      if (!host) {
        set(F(n, 'smile'));
        if (t < T.HOSTS) set({ lookX: .8, lookY: 0, brows: 'up', mouth: 'grin' });           // everyone turns to the archway
        else if (!ln || CAST[ln.speaker].host != null) look(0, .1);
        if (inW(t, T.ROLL, T.LIFT + .1)) {                                                   // the drumroll on the table
          const d = Math.sin(t * 34 + ph), d2 = Math.sin(t * 34 + ph + Math.PI);
          if (fam === 'nep' || fam === 'pearl') set({ flipNear: .45 * d, dy: .1 * d });
          else if (fam === 'drag') set({ jump: .35 * Math.abs(d), flap: .3 * d });
          else set({ handL: [-4.2, edgeY - .2 - 1.3 * Math.max(0, d)], handR: [4.2, edgeY - .2 - 1.3 * Math.max(0, d2)], handPoseL: 'fist', handPoseR: 'fist' });
          set({ eyes: 'wide', mouth: 'grin', brows: 'up' }); look(0, .3);
        }
        if (inW(t, T.LIFT, T.BANDAID)) { face(t < T.OOH + .1 ? 'gasp' : 'happy'); set({ mouth: t >= T.OOH && t < T.OOH + 1.4 ? F(n, 'gasp').mouth : 'grin', dy: -.25 * on(t, T.LIFT, T.BANDAID, .3) }); look(0, .3);
          if (fam === 'nep') set({ eyes: 'sparkle' }); if (fam === 'pearl') set({ eyes: 'sparkle', headTilt: 0 }); if (is('alma', 'jenna')) set({ eyes: 'star' }); if (is('jester_fester')) set({ eyes: 'star' }); }
        if (inW(t, T.BANDAID, T.GARNISH)) { look(0, .3); if (is('danny')) set({ eyes: t < T.BANDAID + .9 ? 'squeeze' : 'open', brows: 'focused', mouth: say('flat'), lean: -.08, handR: [5.5, edgeY - 4], handPoseR: 'point', lookY: .4 }); }
      } else {
        const sf = is('safadi'), sd = sf ? 1 : -1;
        set({ lookX: 0, mouth: say('smile'), brows: 'up' });
        if (t < T.SET + .4 && g.platter) {                                                 // holding the platter; setting it down
          const r = sf ? g.platter.rimL : g.platter.rimR; set({ [sf ? 'handR' : 'handL']: L(r[0], r[1]), [sf ? 'handPoseR' : 'handPoseL']: 'open', lookX: -sd * .4, lookY: .3 });
        }
        if (sf) {
          if (inW(t, T.THERMO, T.FORMULA)) { const p = .45 * on(t, T.THERMO + .2, T.STUFF - .3, .5); set({ handR: [5.8, -21.4], handPoseR: 'point', eyes: inW(t, 21.6, 23.4) ? 'closed' : (p > .3 ? 'glow' : 'open'), mouth: say('smirk'), power: p, lookX: .2 }); }
          if (inW(t, T.FORMULA, T.STUFF)) { const p = .5 * on(t, T.THERMO + .2, T.STUFF - .2, .5); set({ handR: [5.4, -14], handPoseR: 'palm', handL: [-5.6, -20.6], handPoseL: 'point', eyes: p > .3 ? 'glow' : 'open', mouth: say('grin'), power: p, lookX: -.2, lookY: -.5 }); }
          if (inW(t, T.STUFF, T.DRUM)) set({ lookX: -.8, mouth: 'smirk' });
          if (inW(t, T.DRUM, T.LIFT)) set({ handL: [-5.3, -12.6], handR: [5.3, -12.6], handPoseL: 'palm', handPoseR: 'palm', mouth: 'grin', lookX: -.5 });
          if (inW(t, T.LIFT, T.BANDAID)) set({ handL: [-6, -17], handR: [6, -17], handPoseL: 'palm', handPoseR: 'palm', mouth: say('grin'), eyes: inW(t, T.OOH, T.BANDAID) ? 'happy' : 'open', jump: .8 * kick(t, T.LIFT, 3) });
          if (inW(t, T.BANDAID, T.GARNISH)) set({ lookX: .8, mouth: 'smile', brows: 'up' });
        } else {
          if (inW(t, T.THERMO, T.STUFF)) set({ lookX: .8, mouth: 'grin', eyes: inW(t, 23.5, 24.6) ? 'happy' : 'open', tilt: .05 * Math.sin(t * 2) });
          if (inW(t, T.STUFF, T.DRUM)) { const p = .45 * on(t, T.STUFF + .1, T.DRUM - .2, .5); set({ handL: [-5.3, -12.6], handR: [5.3, -12.6], handPoseL: 'palm', handPoseR: 'palm', mouth: say('grin'), power: p, eyes: p > .3 ? 'glow' : 'open', lookX: .2 }); }
          if (inW(t, T.DRUM, T.LIFT + .6) && g.cloche) { set({ handL: L(g.cloche.knob[0], g.cloche.knob[1] + 4 * g.s), handPoseL: 'fist', handR: [5.3, -13.6], handPoseR: 'point', mouth: say('grin'), lookX: .3 }); }
          if (inW(t, T.LIFT + .6, T.BANDAID)) set({ handL: [-6, -17], handR: [6, -17], handPoseL: 'palm', handPoseR: 'palm', mouth: say('grin'), eyes: inW(t, T.OOH, T.BANDAID) ? 'happy' : 'open', jump: .8 * kick(t, T.LIFT + .6, 3) });
          if (inW(t, T.BANDAID, T.GARNISH)) set({ lookX: .9, mouth: 'smile' });
        }
      }
    }
    // ===== 3. the carving =====
    else if (t < T.FEST) {
      if (!host) {
        set(F(n, 'polite')); look(0, .3);
        if (inW(t, T.STRIKE, T.STRIKE + .5) || inW(t, T.DROP + .2, T.DROP + .8)) face('gasp');
        if (inW(t, T.SAW, T.CRACK)) { face(Math.sin(t * 22) > 0 ? 'wince' : 'worried'); set({ lookX: o.lookX * .5 }); }
        if (inW(t, T.CRACK, T.CRACK + .9)) { face('gasp'); set({ dy: .5 * on(t, T.CRACK, T.CRACK + .9, .2), lean: (a.x > 0 ? 1 : -1) * .06 }); }
        if (inW(t, T.CRACK + .9, T.SERVE)) set(F(n, 'worried'));
        if (is('jenna') && inW(t, T.BLUE - .2, T.HUNGRY2)) set({ eyes: 'wide', mouth: say('o'), brows: 'up', handR: [3.4, edgeY - 4.6], handPoseR: 'point', lookY: .5 });
        if (t >= T.SERVE) { const p = plateAt(n, t); set({ ...F(n, 'polite'), lookY: p && !p.moving ? .6 : .3, lookX: p && !p.moving ? 0 : o.lookX }); }
        if (is('jester_fester') && t >= T.SERVE) set({ mouth: 'grin', eyes: 'open', brows: 'up' });
      } else {
        const sf = is('safadi');
        set({ mouth: say('smile'), brows: 'up', lookX: 0, lookY: .4 });
        const k = g.knife;
        if (sf && k) set({ handR: L(k.hand[0], k.hand[1]), handPoseR: 'fist', handL: L(k.fhand[0], k.fhand[1]), handPoseL: 'fist', lookX: .4, lookY: .5, mouth: say(k.mood || 'smile'), eyes: k.eyes || 'open', brows: k.brows || 'up' });
        if (sf && inW(t, T.ALLOW - .2, T.STRIKE)) set({ eyes: 'closed', mouth: say('smirk'), lookY: 0 });
        if (sf && inW(t, T.SELF, T.SAW)) set({ lookX: -.2, lookY: -.1, mouth: say('grin'), eyes: 'open', brows: 'up' });
        if (!sf) {
          if (inW(t, T.GARNISH, T.ALLOW)) set({ mouth: say('grin'), eyes: inW(t, 44.6, 45.2) ? 'wink' : 'open', handR: [5.3, -13], handPoseR: 'thumb', lookX: .2, lookY: 0 });
          if (inW(t, T.STRIKE, T.SELF)) set({ eyes: 'wide', mouth: 'teeth', brows: 'worried', lookX: .5, lookY: .5 });
          if (inW(t, T.SELF, T.SAW)) set({ mouth: 'grin', lookX: .8 });
          if (inW(t, T.FIRM, T.CRACK)) set({ mouth: say('grin'), brows: 'worried', emote: 'sweat', emoteK: on(t, T.FIRM, T.CRACK, .3), lookX: -.2, lookY: 0 });
          if (inW(t, T.CRACK, T.HUNGRY2)) set({ eyes: t < T.CRACK + .8 ? 'wide' : 'open', mouth: t < T.CRACK + .8 ? 'o' : 'grin', brows: 'up', lookX: .3, lookY: .5 });
          if (inW(t, T.HUNGRY2, T.BON)) { set({ mouth: say('grin'), eyes: 'open', brows: 'up', lookX: .3 }); const sw = seg(t, T.SERVE, T.SERVE + 3.4); if (sw > 0 && sw < 1) set({ handL: [-6 + 3 * Math.sin(sw * 30), -12.6], handPoseL: 'palm', handR: [6 - 3 * Math.sin(sw * 30 + 1.5), -12.6], handPoseR: 'palm' }); }
          if (t >= T.BON) set({ mouth: 'grin', lookX: .6 });
        } else {
          if (inW(t, T.CRACK + .9, T.HUNGRY2)) set({ mouth: 'grin', brows: 'worried', emote: 'sweat', emoteK: on(t, T.CRACK + .9, T.SERVE, .3), lookX: -.6, lookY: 0 });
          if (t >= T.HUNGRY2) set({ mouth: say('grin'), eyes: 'open', brows: 'up', lookX: -.3, lookY: 0, ...(t >= T.BON ? { handL: [-5.3, -12.6], handR: [5.3, -12.6], handPoseL: 'palm', handPoseR: 'palm' } : {}) });
        }
      }
    }
    // ===== 4. the tasting: ten reactions =====
    else if (t < T.MAILLARD) {
      const GAG = [[T.FEST, T.HOUS, 'jester_fester'], [T.HOUS, T.ALMA, 'housam'], [T.ALMA, T.JEN, 'alma'], [T.JEN, T.DAN, 'jenna'], [T.DAN, T.SICLE, 'danny'], [T.SICLE, T.LEAVE, 'neptune'],
        [T.LEAVE, T.DRG, 'dragon'], [T.DRG, T.ROU, 'dr_g'], [T.ROU, T.PEARL, 'roudaynah'], [T.PEARL, T.MAILLARD, 'princess_pearl']];
      const gag = GAG.find(q => inW(t, q[0], q[1])), who = gag?.[2], g0 = gag?.[0], done = GAG.findIndex(q => q[2] === n) >= 0 && GAG.findIndex(q => q[2] === n) < GAG.indexOf(gag);
      set(F(n, 'polite')); if (who) look(at(who).x, 0);
      if (done) set({ ...F(n, 'deadpan'), mouth: F(n, 'polite').mouth });             // after their own bite: no second one
      if (host) { set({ mouth: 'grin', brows: 'up', eyes: 'open' }); if (who) look(at(who).x, 0); set({ lookY: .2 }); }
      // the hosts' reactions: smiles that tighten
      if (host && who) { const sec = t - g0; if (sec > 1.2) set({ brows: 'worried', mouth: sec % 3 < 1.4 ? 'grin' : 'teeth', emote: 'sweat', emoteK: .7 * on(t, g0 + 1.2, gag[1], .3) }); }
      // neighbours react to the gag next to them
      if (who && who !== n && !host && Math.abs(at(who).x - a.x) < 160) { const sec = t - g0; if (sec > .6 && sec < 2.4) face('gasp'); else if (sec >= 2.4) face(kid ? 'laugh' : 'polite'); look(at(who).x, .1); if (sec >= 2.4 && kid) set({ dy: .2 * bounce(t, 9, ph) }); }
      const LB = () => { const p = g.plateS; return p ? L(p[0], g.edgeS - .8 * g.s) : [4, edgeY - .8]; };   // the hand at the plate (just above the far edge; the fork reaches down)
      const MO = () => g.mouthL ? [g.mouthL[0] + 1.2, g.mouthL[1] + 1.4] : [2, edgeY - 6];      // the hand at the mouth
      const toMouth = (t0, t1, t2, t3) => { const u = ease(seg(t, t0, t1)) * (1 - ease(seg(t, t2, t3))); return mixPt(LB(), MO(), u); };
      // ---- Fester: the drumstick, a CRUNCH, a tooth DING, the story of his life ----
      if (n === 'jester_fester' && inW(t, T.FEST, T.MAILLARD)) {
        const up = ease(seg(t, T.FEST, T.FEST + .6)), hold = t < T.STORY ? 1 : 1 - ease(seg(t, T.STORY, T.STORY + .4));
        set({ handR: mixPt(LB(), [MO()[0] + 1.5, MO()[1] + .6], up * hold), handPoseR: 'fist', mouth: t < T.FEST + .6 ? 'O' : 'teeth', eyes: 'open', brows: 'up', lookX: -.3, lookY: .1 });
        fork[n] = { hand: 'R', drumstick: true, ang: lerp(.3, -2.5, up * hold), bite: t > T.FEST + .7 };
        if (inW(t, T.FEST + .7, T.STORY)) set({ eyes: t < T.FEST + 1.3 ? 'squeeze' : 'swirl', mouth: t < T.FEST + 1.3 ? 'teeth' : 'wobble', stars: .8 * on(t, T.FEST + 1.1, T.STORY, .3), hatSway: [.6 * Math.sin(t * 30) * kick(t, T.FEST + .7, 3), 0], brows: 'worried', tilt: .1 * Math.sin(t * 8) * on(t, T.FEST + 1.1, T.STORY) });
        if (inW(t, T.STORY, T.HOUS)) set({ handL: [-5.2, -16], handR: [5.2, -16], handPoseL: 'open', handPoseR: 'open', eyes: 'open', mouth: say('smile'), brows: 'worried', hatDroop: .5 * ease(seg(t, T.STORY, T.STORY + .6)), lookX: 0, lookY: 0, tilt: -.08 });
        if (t >= T.HOUS) set({ ...F(n, 'deadpan'), hatDroop: .25 });
      }
      // ---- Housam: the fork bends; the slice bounces; a header; physics ----
      if (n === 'housam' && inW(t, T.HOUS, T.MAILLARD)) {
        const poke = ease(seg(t, T.HOUS, T.HOUS + .4));
        if (t < T.HOUS + 1.2) { set({ handR: mixPt([4.6, edgeY - 3], LB(), poke), handPoseR: 'fist', brows: 'focused', mouth: 'flat', lookY: .7, lookX: 0 }); fork[n] = { hand: 'R', ang: Math.PI / 2 - .2, bend: ease(seg(t, T.HOUS + .4, T.HOUS + .7)) }; }
        else if (t < T.COEF) { set({ handR: [5.2, edgeY - 5], handPoseR: 'fist', eyes: 'wide', brows: 'up', mouth: 'o', lookY: t < 72.4 ? -.6 : .5 }); fork[n] = { hand: 'R', ang: -Math.PI / 2 + .3, bend: 1 };
          const hd = kick(t, 72.5, 7); set({ tilt: -.12 * hd, dy: -.6 * hd, eyes: inW(t, 72.45, 72.9) ? 'squeeze' : 'wide', mouth: inW(t, 72.45, 72.9) ? 'smile' : 'o' }); }
        else { set({ handR: [5.8, -26], handPoseR: 'point', eyes: 'open', brows: 'up', mouth: say('smirk'), lookX: .2, lookY: 0 }); fork[n] = { hand: 'L', ang: -Math.PI / 2, bend: 1, held: [-4.6, edgeY - 3] }; set({ handL: [-4.6, edgeY - 3], handPoseL: 'fist' }); }
        if (t >= T.ALMA) set({ ...F(n, 'deadpan'), handR: undefined, handL: undefined }), delete fork[n];
      }
      // ---- Alma: hides it under her napkin ----
      if (n === 'alma' && inW(t, T.ALMA, T.MAILLARD)) {
        if (t < T.ALMA + 1) set({ lookX: Math.sin((t - T.ALMA) * 7) > 0 ? .8 : -.8, eyes: 'open', mouth: 'flat', brows: 'up' });
        else if (t < T.DELI) { const u = ease(seg(t, T.ALMA + 1, T.ALMA + 1.8)); set({ handL: mixPt([-3.4, edgeY + 1], LB(), u), handR: mixPt([3.4, edgeY + 1], LB(), u), handPoseL: 'open', handPoseR: 'open', lookY: .7, lookX: 0, mouth: 'smile', brows: 'up' }); }
        else set({ handL: [-1.1, -11.6], handR: [1.1, -11.6], handPoseL: 'open', handPoseR: 'open', eyes: talk ? 'happy' : 'happy', mouth: say('smile'), blush: 1, lookX: 0, tilt: .08 * Math.sin(t * 2) });
        if (t >= T.JEN) set({ handL: undefined, handR: undefined, eyes: 'open', mouth: 'smile', blush: .8 });
      }
      // ---- Jenna: her giraffe says no, thank you ----
      if (n === 'jenna' && inW(t, T.JEN, T.MAILLARD)) {
        if (t < T.DAN) { const u = ease(seg(t, T.JEN, T.JEN + .7)), shake = inW(t, T.JEN + .7, T.NOTH + 1.3) ? Math.sin(t * 16) * 1.3 : 0;
          set({ handL: [-3.2 + shake, edgeY - 6.5], handPoseL: 'grip', handR: mixPt(LB(), [-3.2 + shake + 2.6, edgeY - 8.4], u), handPoseR: 'fist', lookX: -.7, lookY: -.1, mouth: say('smile'), brows: 'up', tilt: -.06 });
          fork[n] = { hand: 'R', ang: lerp(Math.PI / 2, Math.PI + .4, u), bite: 'turkey' }; }
        else set({ handL: undefined, handR: undefined });
      }
      // ---- Danny: TINK, TINK. It's a popsicle. ----
      if (n === 'danny' && inW(t, T.DAN, T.MAILLARD)) {
        if (t < T.SICLE) { const tap = Math.max(kick(t, 85.7, 9), kick(t, 86.1, 9)), u = ease(seg(t, T.DAN, T.DAN + .3));
          set({ handR: mixPt([4.4, edgeY - 3], [LB()[0], LB()[1] - 1.5 + 1.5 * (1 - tap)], u), handPoseR: 'fist', lookY: t < T.POPS ? .7 : 0, lookX: t < T.POPS ? 0 : 0, ...F(n, 'deadpan'), mouth: say('flat'), brows: t < T.POPS ? 'focused' : 'normal' });
          fork[n] = { hand: 'R', ang: Math.PI / 2 - .4 }; }
      }
      // ---- Neptune: a turkey-sicle; a CRUNCH; a rainbow water blast down the hatch ----
      if (n === 'neptune' && inW(t, T.SICLE, T.MAILLARD)) {
        if (t < T.NBITE) set({ eyes: talk ? 'wink' : 'happy', mouth: say('laugh'), headTilt: .25, lookX: .4, crownTilt: .1 * Math.sin(t * 9) });
        else if (t < T.WATER) { const b = ease(seg(t, T.NBITE, T.NBITE + .3)) * (1 - ease(seg(t, T.NBITE + .5, T.NBITE + .8)));
          set({ rot: .22 * b, headTilt: -.2 * b, mouth: t < T.NBITE + .3 ? 'open' : (t < T.BLAST ? 'frown' : 'open'), eyes: t < T.NBITE + .3 ? 'open' : 'wide', brows: 'worried', crownTilt: .35 * ease(seg(t, T.NBITE + .3, T.NBITE + .6)),
            trident: t > T.BLAST - .5, tridentAng: -2.1, power: .9 * on(t, T.BLAST - .5, T.WATER, .4), emote: t < T.BLAST ? '!' : undefined, emoteK: on(t, T.NBITE + .3, T.BLAST, .15) }); }
        else set({ eyes: talk ? 'open' : 'happy', mouth: say('grin'), brows: 'up', crownTilt: .35, headTilt: .15, lookX: .3, trident: t < T.WATER + 1, tridentAng: -1.3, power: .3 * (1 - seg(t, T.WATER, T.WATER + 1)) });
        if (t >= T.LEAVE) set({ ...F(n, 'deadpan'), crownTilt: .3, trident: false, power: 0 });
      }
      // ---- Dragon: a little more roasting; a chomp; even greener ----
      if (n === 'dragon' && inW(t, T.LEAVE, T.MAILLARD)) {
        if (t < T.FLAME - .5) set({ ...F(n, 'happy'), mouth: say('grin'), wings: .6, flap: .5 * Math.sin(t * 8), lookX: -.2 });
        else if (t < T.GBITE) set({ mouth: t < T.FLAME ? 'pout' : 'open', cheeks: true, eyes: t < T.FLAME ? 'closed' : 'happy', headTilt: -.2, lookX: .3, lookY: .6, wings: .5 });
        else if (t < T.NOPE) { const b = ease(seg(t, T.GBITE, T.GBITE + .3)) * (1 - ease(seg(t, T.GBITE + .4, T.GBITE + .7)));
          set({ lean: -.18 * b, headTilt: -.35 * b, mouth: t < T.GBITE + .4 ? 'open' : (Math.sin(t * 14) > 0 ? 'pout' : 'o'), eyes: t < T.GREEN ? 'closed' : 'wide', brows: 'up', cheeks: true, wings: .2 }); }
        else set({ eyes: 'open', mouth: say('pout'), brows: 'normal', wings: .15, lookX: 0 });
        if (t >= T.DRG) set({ ...F(n, 'polite') });
      }
      // ---- Dr. G: the wristwatch; rule number one; but she loves the kale ----
      if (n === 'dr_g' && inW(t, T.DRG, T.MAILLARD)) {
        if (t < T.RULE) { const u = ease(seg(t, T.DRG, T.DRG + .4)), lift = ease(seg(t, T.DRG + .4, T.DRG + .9));
          set({ holdR: 'spoon', handR: mixPt(mixPt([4.4, edgeY], LB(), u), [3.6, edgeY - 8], lift), lookY: lift > .5 ? -.2 : .7, lookX: lift > .5 ? -.3 : 0, eyes: lift > .5 ? 'wide' : 'open', mouth: lift > .5 ? 'o' : 'smile', brows: 'up' }); }
        else if (t < T.KALE) set({ holdR: 'spoon', handR: [3.6, edgeY - 8], handL: [-6.8, -28.6 + .25 * Math.sin(t * 5)], handPoseL: 'point', rules: on(t, T.RULE, T.KALE, .4), mouth: say('smile'), eyes: 'open', brows: 'stern', lookX: .2 });
        else set({ holdR: 'spoon', handR: [3.6, edgeY - 6], hearts: on(t, T.KALE, T.ROU, .4), mouth: say('grin'), eyes: talk ? 'open' : 'happy', brows: 'up', lookX: 0 });
        if (t >= T.ROU) set({ holdR: undefined, handR: undefined, hearts: 0, ...F(n, 'polite') });
      }
      // ---- Roudaynah: a brave bite; very original (with love) ----
      if (n === 'roudaynah' && inW(t, T.ROU, T.MAILLARD)) {
        if (t < T.ORIG) { set({ handR: toMouth(T.ROU, T.ROU + .5, T.ROU + .8, T.ROU + 1.2), handPoseR: 'fist', eyes: t < T.ROU + .6 ? 'open' : (t < T.ROU + 1.6 ? 'closed' : 'wide'), mouth: t < T.ROU + .6 ? 'open' : (Math.sin(t * 13) > 0 ? 'flat' : 'smile'), brows: t > T.ROU + .6 ? 'worried' : 'up', lookY: .2 });
          fork[n] = { hand: 'R', ang: lerp(Math.PI / 2, -2.2, ease(seg(t, T.ROU, T.ROU + .5)) * (1 - ease(seg(t, T.ROU + .8, T.ROU + 1.2)))), bite: t < T.ROU + .55 ? 'turkey' : null }; }
        else set({ love: on(t, T.ORIG, T.PEARL, .4), mouth: say('smile'), eyes: talk ? 'open' : 'happy', brows: 'up', handL: [-4.6, -19.5], handR: [4.6, -19.5], handPoseL: 'open', handPoseR: 'open', lookX: 0 });
        if (t >= T.PEARL) set({ love: 0, handL: undefined, handR: undefined });
      }
      // ---- Princess Pearl: one regal nibble. ANOTHER COOK. ----
      if (n === 'princess_pearl' && inW(t, T.PEARL, T.MAILLARD)) {
        if (t < T.COOK) { const b = ease(seg(t, T.PEARL + .1, T.PEARL + .35)) * (1 - ease(seg(t, T.PEARL + .45, T.PEARL + .7)));
          set({ rot: .2 * b, headTilt: -.1 * b + .2 * ease(seg(t, T.PEARL + .7, T.PEARL + 1.2)), mouth: b > .3 ? 'o' : 'flat', eyes: inW(t, T.PEARL + 1, T.PEARL + 1.6) ? 'closed' : 'bored', brows: 'flat', lookX: .2 }); }
        else set({ eyes: 'angry', brows: 'angry', mouth: say('frown'), headTilt: .25, point: ease(seg(t, T.COOK, T.COOK + .4)), pointAng: -1.1, crownTilt: .05 * Math.sin(t * 20) * on(t, T.COOK + 2, T.COOK + 3) });
      }
      // everyone else's plate: polite, untouched
    }
    // ===== 5. talking around it; the plates come back; the brothers taste it =====
    else if (t < T.QDESS) {
      if (!host) {
        set(F(n, 'deadpan'));
        if (ln && CAST[ln.speaker]) look(at(ln.speaker).x, 0);
        if (is('princess_pearl')) set({ headTilt: .2, eyes: inW(t, 125.5, 126.2) || inW(t, 131, 131.6) ? 'closed' : 'bored' });
        if (is('neptune')) set({ crownTilt: .3 });
        if (is('jester_fester')) set({ hatDroop: .25, eyes: 'open', mouth: 'smile', brows: 'worried' });
        if (is('dr_g') && t < T.IRON + 1.2) set({ holdR: 'spoon', handR: [3.6, edgeY - 7 + .5 * Math.sin(t * 2)], mouth: 'smile', eyes: 'open', brows: 'up', lookX: .5 });
        if (inW(t, T.ALARM, T.ALARM + 1)) face('gasp');
        const p = plateAt(n, t); if (p && p.moving) set({ lookY: .5, lookX: 0, ...F(n, 'polite') });
        if (t >= T.MORE - .2) { look(0, 0); set(F(n, 'polite')); }
        if (inW(t, T.BBITE + .4, T.QDESS)) { face('gasp'); look(0, 0); if (kid) set({ handL: [-1.4, edgeY - 5], handR: [1.4, edgeY - 5], handPoseL: 'open', handPoseR: 'open' }); }
      } else {
        const sf = is('safadi');
        set({ mouth: say('grin'), brows: 'up', eyes: 'open', lookX: sf ? -.2 : .2 });
        if (sf && inW(t, T.MAILLARD, T.VITA)) { const p = .4 * on(t, T.MAILLARD, T.VITA, .4); set({ handR: [5.8, -21.4], handPoseR: 'point', power: p, eyes: p > .25 ? 'glow' : 'open', mouth: say('smirk') }); }
        if (!sf && inW(t, T.VITA, T.IRON)) { const p = .4 * on(t, T.VITA, T.IRON, .4); set({ handL: [-5.3, -12.6], handR: [5.3, -12.6], handPoseL: 'palm', handPoseR: 'palm', power: p, eyes: p > .25 ? 'glow' : 'open', mouth: say('grin') }); }
        if (!sf && inW(t, T.IRON - .3, T.BACK + 2)) { set({ lookX: .8, mouth: say('grin'), handL: [-6, -15], handPoseL: 'fist' }); if (t > T.IRON + 1.2) fork.sami = { watch: true, hand: 'L' }; }
        if (sf && inW(t, T.DONE, T.BACK)) set({ handR: [5.3, -12.6], handPoseR: 'palm', mouth: say('grin'), lookX: -.5 });
        if (inW(t, T.ALARM, T.ALARM + 1.2)) set({ eyes: 'wide', brows: 'up', mouth: 'teeth', jump: .6 * kick(t, T.ALARM, 5) });
        if (inW(t, T.BACK, T.MORE)) { set({ eyes: 'open', mouth: 'grin', brows: 'worried', lookY: .5, emote: 'sweat', emoteK: on(t, T.BACK + 1, T.MORE, .3) }); const j = Math.floor((t - T.BACK) / .5); const who = BACK_ORDER[clamp(j, 0, 9)]; look(at(who).x, .3); }
        if (inW(t, T.MORE, T.BBITE)) set({ lookX: sf ? -.7 : .7, mouth: say('smile'), brows: 'up', eyes: 'open' });
        if (t >= T.BBITE - .3) { const u = ease(seg(t, T.BBITE - .3, T.BBITE + .2)), st = g.stackTop;
          const handTo = st ? mixPt(L(st[0], Math.min(st[1], g.edgeS) - 1.5 * g.s), g.mouthL ? [g.mouthL[0] + (sf ? 1 : -1), g.mouthL[1] + 1.5] : [2, -18], u) : [sf ? 3 : -3, -16];
          set({ [sf ? 'handR' : 'handL']: handTo, [sf ? 'handPoseR' : 'handPoseL']: 'fist', mouth: t < T.BBITE + .35 ? 'O' : 'teeth', eyes: t < T.BBITE + .4 ? 'open' : 'wide', brows: t < T.BBITE + .4 ? 'up' : 'worried', lookX: 0, lookY: t < T.BBITE ? .4 : 0, emote: undefined });
          fork[n] = { hand: sf ? 'R' : 'L', ang: lerp(Math.PI / 2, sf ? -2.5 : -.64, u), bite: u > .5 && t < T.BBITE + .5 ? 'turkey' : null }; }
      }
    }
    // ===== 6. dessert! =====
    else if (t < T.PROMISE) {
      if (!host) {
        set(F(n, 'smile'));
        if (ln && CAST[ln.speaker]) look(at(ln.speaker).x, 0);
        if (t < T.DESSERT) set({ ...F(n, 'polite'), brows: 'up' });
        if (is('roudaynah') && t < T.PIES) { const u = ease(seg(t, T.QDESS + .9, T.QDESS + 1.5)); set({ handL: [-5.6, lerp(edgeY + 2, edgeY - 6, u)], handR: [5.6, lerp(edgeY + 2, edgeY - 6, u)], handPoseL: 'open', handPoseR: 'open', mouth: say('grin'), eyes: talk ? 'open' : 'happy', brows: 'up', lookX: -.3 }); }
        if (is('dr_g') && t < T.PIES + .3 && t > T.QDESS + 1) { const u = ease(seg(t, T.QDESS + 1.2, T.QDESS + 1.8)); set({ handL: [-6.4, lerp(edgeY + 2, edgeY - 7, u)], handR: [6.4, lerp(edgeY + 2, edgeY - 7, u)], handPoseL: 'open', handPoseR: 'open', mouth: 'grin', eyes: 'happy', brows: 'up', lookX: .5 }); }
        if (inW(t, T.DESSERT, T.PIES + .2)) { face('happy'); set({ mouth: say(F(n, 'laugh').mouth), jump: (kid ? 1.6 : .7) * bounce(t, 8, ph), lookX: 0 }); if (!['nep', 'pearl', 'drag', 'drg', 'rou'].includes(fam)) handsUp(1.2); if (fam === 'nep') set({ flipNear: -1 }); if (fam === 'drag') set({ wings: 1, flap: Math.sin(t * 12) }); if (is('alma')) set({ eyes: 'star', power: .6 }); }
        if (t >= T.PIES + .2) {                                                // the happy feast: forks fly
          const pp = piePlateAt(n, t), eat = pp ? clamp((t - (T.PSERVE + .6 + SERVE_ORDER.indexOf(n) * .14)) / .3) : 0, cyc = frac((t + ph * .37) * .62), u = eat * (cyc < .45 ? ease(cyc / .45) : 1 - ease((cyc - .45) / .55));
          set({ ...F(n, 'happy'), mouth: talk ? say('grin') : (u > .7 ? F(n, 'gasp').mouth : (cyc > .5 && cyc < .8 ? 'smile' : 'grin')), eyes: talk ? 'open' : (cyc > .5 ? 'happy' : 'open'), dy: .15 * Math.sin(t * 6 + ph) });
          if (!['nep', 'pearl', 'drag'].includes(fam)) { const hp = g.plateS ? L(g.plateS[0], g.edgeS - .8 * g.s) : [4, edgeY - .8], mp = g.mouthL ? [g.mouthL[0] + 1.4, g.mouthL[1] + 1.6] : [2, edgeY - 6];
            if (is('dr_g', 'roudaynah') && t < T.PSERVE + .3) {} else { set({ handR: mixPt(hp, mp, u), handPoseR: 'fist' }); fork[n] = { hand: 'R', ang: lerp(Math.PI / 2 + .2, -2.3, u), bite: u > .4 ? 'pie' : null }; } }
          if (fam === 'nep') set({ flipNear: -.6 * u, rot: .08 * u, headTilt: .1 });
          if (fam === 'pearl') set({ rot: .12 * u, headTilt: .15 - .1 * u, eyes: 'happy', mouth: talk ? say('smile') : 'smile' });
          if (fam === 'drag') set({ lean: -.12 * u, headTilt: -.2 * u, wings: .4, flap: .3 * Math.sin(t * 6) });
          if (is('alma')) set({ power: .35, eyes: talk ? 'open' : 'star' });
          if (is('princess_pearl') && inW(t, T.NOW, T.FIN)) set({ headTilt: .2, rot: 0, eyes: talk ? 'happy' : 'happy', mouth: say('smile'), brows: 'up' });
          if (is('neptune') && inW(t, T.FIN, T.CHEERS)) set({ eyes: 'happy', mouth: say('laugh'), headTilt: .25, flipNear: -.9, crownTilt: .2 * Math.sin(t * 10), rot: 0 });
          if (is('jester_fester') && inW(t, T.CHEERS, T.PROMISE)) { set({ handR: [5.6, -22], handPoseR: 'fist', eyes: talk ? 'open' : 'happy', mouth: say('grin'), brows: 'up', hatDroop: 0, hatSway: [.4 * Math.sin(t * 9), 0], jump: .5 * bounce(t, 7) }); fork[n] = { hand: 'R', ang: -Math.PI / 2 + .2, bite: null }; }
          if (inW(t, T.CHEERS + 1.5, T.PROMISE) && !is('jester_fester')) { if (fam === 'drg') set({ hearts: .9, eyes: 'happy', mouth: 'grin', handL: [-.9, -19.4], handPoseL: 'fist' }); if (fam === 'rou') set({ love: .8, eyes: 'happy', mouth: 'grin' }); if (kid && t > T.CHEERS + 2.5) set({ jump: .8 * bounce(t, 8, ph) }); }
        }
      } else {
        const sf = is('safadi');
        set({ mouth: 'teeth', eyes: 'wide', brows: 'worried', lookX: 0 });
        if (t >= T.QDESS + .4) set({ eyes: 'open', mouth: 'smile', brows: 'up', lookX: sf ? .5 : .2 });
        if (!sf && inW(t, T.QDESS + .2, T.QDESS + 1.3) && g.cloche) set({ handL: L(g.cloche.knob[0], g.cloche.knob[1] + 4 * g.s), handPoseL: 'fist' });
        if (t >= T.DESSERT) { set({ ...F(n, 'happy'), mouth: say('open'), handL: [-6, -18], handR: [6, -18], handPoseL: 'palm', handPoseR: 'palm', jump: .9 * kick(t, T.DESSERT, 2.5) });
          if (t > T.PSERVE) set({ handL: [-5.3, -12.6], handR: [5.3, -12.6], mouth: 'grin', eyes: 'happy', lookX: sf ? -.4 : .4 }); }
        if (t > T.CHEERS) set({ lookX: sf ? .6 : -.6, mouth: 'grin', brows: 'up' });
      }
    }
    // ===== 7. the promise =====
    else {
      if (!host) {
        set(F(n, 'happy')); look(0, 0);
        if (t < T.SEE) set({ mouth: 'smile', eyes: 'open' });
        if (t >= T.SEE + .8) { face('laugh'); set({ dy: .25 * bounce(t, 9, ph), jump: kid ? .5 * bounce(t, 8, ph) : 0 }); if (kid) set({ handL: [-1.4, edgeY - 4.5], handR: [1.4, edgeY - 4.5], handPoseL: 'open', handPoseR: 'open' }); }
        const pp = piePlateAt(n, t); if (pp && t < T.SEE && !['nep', 'pearl', 'drag'].includes(fam)) { fork[n] = { hand: 'R', ang: Math.PI / 2 + .2, bite: null }; set({ handR: g.plateS ? L(g.plateS[0] + 1.5 * g.s, g.edgeS - .8 * g.s) : [4, edgeY - .8], handPoseR: 'fist' }); }
      } else {
        const sf = is('safadi'), tt = Math.min(t, T.FREEZE);
        set({ mouth: say('smile'), eyes: 'open', brows: 'up', lookX: sf ? -.3 : .3 });
        if (sf && inW(tt, T.PROMISE, T.PERFECT)) set({ handR: [1.6, -14.5], handPoseR: 'palm', handL: [-5.3, -12.6], handPoseL: 'palm', eyes: inW(tt, 165.4, 166.6) ? 'closed' : 'open', mouth: say('smile'), lookX: 0 });
        if (!sf && inW(tt, T.PERFECT, T.SEE)) { const p = .4 * on(tt, T.PERFECT, T.SEE, .4); set({ handR: [5.8, -21.4], handPoseR: 'point', power: p, eyes: p > .25 ? 'glow' : 'open', mouth: say('grin'), lookX: 0 }); }
        if (inW(tt, T.SEE, T.THINK)) set({ ...F(n, 'happy'), mouth: say('grin'), brows: 'angry', handL: [-5.5, -19], handR: [5.5, -19], handPoseL: 'fist', handPoseR: 'fist', jump: 1.2 * kick(tt, T.SEE + .2, 3), lookX: 0 });
        if (tt >= T.THINK) { const k = ease(seg(tt, T.THINK, T.THINK + .5)); set({ lookX: (sf ? -.85 : .85) * k + (1 - k) * 0, turn: (sf ? -.35 : .35) * k, mouth: 'smirk', eyes: tt > T.THINK + .9 ? 'closed' : 'open', brows: 'up', tilt: (sf ? -.06 : .06) * k, bulb: backOut(seg(tt, T.THINK + .5, T.THINK + .8)) }); }
      }
    }
    return o;
  }

  // ---------- drawing the cast ----------
  const MOUTH = {};                                                              // each rig's mouth in local units (measured once; a pure function of the rig)
  function mouthLocal(n) {
    if (MOUTH[n] !== undefined) return MOUTH[n];
    const c = CAST[n]; if (['nep', 'pearl', 'drag'].includes(c.fam)) return (MOUTH[n] = null);
    const A = measure(() => c.rig(0, 0, 10, { t: 0, sit: 1 })); return (MOUTH[n] = A && A.mouth ? [A.mouth[0] / 10, A.mouth[1] / 10] : null);
  }
  function drawChar(P, n, t, R) {
    const c = CAST[n], a = at(n), [sx, sy, k] = P.p(a.x, a.y, a.z), s = c.unit * k;
    if (sx < -500 || sx > W + 500) return;
    const sl = n === 'jenna' ? s * JENNA_SCALE : s, L = (x, y) => [(x - sx) / sl, (y - sy) / sl];
    const ph = plateAt(n, t), pp = piePlateAt(n, t), plateW = pp || ph, pS = plateW ? P.p(plateW.x, Y_PLATE, plateW.z) : null;
    const g = { P, a, s: sl, L, edgeS: P.p(a.x, 76, 200)[1], mouthL: mouthLocal(n), plateS: pS, platter: R.platterS, cloche: R.clocheS, knife: n === 'safadi' ? R.knife : null, giraffe: R.giraffe, stackTop: R.stackTop };
    let o = pose(n, t, g);
    if (R.freeze) o = { ...o, boil: 0, blink: 0 };
    const draw = () => c.rig(sx, sy, s, o);
    const queasy = n === 'dragon' ? clamp(seg(t, T.GREEN, T.GREEN + .6)) * (1 - seg(t, T.DRG + .5, T.DRG + 1.5)) : 0;
    const paint = () => K.seated(P, a, draw);
    const A = queasy > .02 ? (() => { let r; layer(() => { r = paint(); }, { filter: `saturate(${1 + 1.2 * queasy}) brightness(${1 - .3 * queasy}) hue-rotate(${-25 * queasy}deg)` }); return r; })() : paint();
    R.A[n] = A; R.S[n] = s; R.O[n] = o;
    if (n === 'jenna' && A.giraffe) R.giraffe = A.giraffe;
  }

  // ---------- the table top: platter, turkey, cloche, plates, pies (called by the set's onTable hook, depth-sorted) ----------
  function turkeyDraw(P, t, R) {
    if (t < T.HOSTS - .2) return;                                                // still in the hosts' hands (the entrance)
    const [px, py, pk] = P.p(TKX, platterY(t), TKZ), s = pk * WU;
    let x = px, y = py;
    const A = TKY.platter(x, y, s, { garnish: true });
    R.platterS = A;
    const st = turkeyState(t), tx = A.top[0], ty = A.top[1];
    if (st.state === 'carved') {                                                 // mirrored, so the stump is where the band-aided drumstick fell off
      X.save(); X.translate(tx, 0); X.scale(-1, 1); TKY.turkey(0, ty, s, { state: 'carved', t, frost: st.frost }); X.restore();
      if (t < T.SERVE + 2.6) TF4.drumstick(tx - 20 * s, ty + 1 * s, pk, Math.PI - .25, {});            // the fallen drumstick, lying on the platter until it is served
      if (t > T.SERVE) TKY.stuffingHeap(tx - 9 * s, ty + 2.4 * s, s, { w: 9, h: 3, seed: 4, t });        // the watch went out with a spoonful of stuffing
    } else TKY.turkey(tx, ty, s, { state: 'fixed', t, wear: st.wear, drumstickOff: st.off });
    if (st.state === 'carved') TF4.mist(tx, ty - 6 * s, pk, t, st.frost * 1.3, 34);
    // the cloche: on until the lift, held up, then (after the brothers' bite) back over the bird
    const cl = clocheState(t);
    if (cl) R.clocheS = TKY.cloche(x, y - 5 * s, s, { lift: cl.lift, alpha: t >= T.QDESS ? ease(seg(t, T.QDESS + .2, T.QDESS + .45)) : 1 });
    // a flash of gleam at TA-DA
    if (inW(t, T.LIFT + .3, T.LIFT + 2.2)) for (let i = 0; i < 6; i++) { const u = frac(t * 1.3 + i / 6), a = i * 1.05; shape(starPts(tx + Math.cos(a) * 26 * s * (.6 + u * .5), ty - 12 * s + Math.sin(a) * 14 * s * (.6 + u * .5), (1.5 + 2.5 * Math.sin(Math.PI * u)) * s, s * .45, 4), { fill: '#FFF6C8', stroke: null, alpha: on(t, T.LIFT + .3, T.LIFT + 2.2) }); }
  }
  function turkeyState(t) {
    if (t < T.CRACK) return { state: 'fixed', wear: t < T.STRIKE ? 0 : t < T.SAW ? .12 : .12 + .8 * ease(seg(t, T.SAW, T.CRACK)), off: t >= T.DROP + .15 };
    return { state: 'carved', frost: .35 + .65 * kick(t, T.CRACK, .9) };
  }
  function clocheState(t) {
    if (t < T.LIFT) return { lift: 0 };
    if (t < T.LIFT + 2.2) return { lift: ease(seg(t, T.LIFT, T.LIFT + .5)) };
    if (t >= T.QDESS + .2) return { lift: 1 - ease(seg(t, T.QDESS + .2, T.QDESS + 1)) };
    return null;
  }
  function tableTop(P, t, R) {
    const items = [{ z: TKZ, draw: () => turkeyDraw(P, t, R) }];
    for (const n of GUESTS) {
      const p = plateAt(n, t), pp = piePlateAt(n, t);
      if (p) items.push({ z: p.stacked ? STACK.z + p.j * .01 : p.z, draw: () => servedPlate(P, t, n, p, R) });
      if (pp) items.push({ z: pp.z + .5, draw: () => { const [x, y, k] = P.p(pp.x, Y_PLATE, pp.z); TF4.piePlate(x, y, k * WU, t, { eaten: pp.eaten }); } });
    }
    for (let i = 0; i < 2; i++) { const pa = pieAt(i, t); if (pa && pa.u != null) items.push({ z: pa.z, draw: () => pieDraw(P, t, i, pa, R) }); }
    items.sort((a, b) => P.depth(b.z) - P.depth(a.z)).forEach(it => it.draw());
  }
  function servedPlate(P, t, n, p, R) {
    const [x, y, k] = P.p(p.x, p.y, p.z), s = k * WU;
    let slice = true;
    if (n === 'jester_fester' && !p.stacked) slice = false;
    if (n === 'housam' && inW(t, T.HOUS + 1.2, 73.1)) slice = false;
    if (n === 'alma' && t > T.ALMA + 1.7 && !p.stacked) slice = false;
    if (n === 'dragon' && inW(t, T.FLAME, T.BACK)) slice = false;
    const eaten = n === 'neptune' && t > T.NBITE + .3 ? .3 : n === 'roudaynah' && t > T.ROU + .55 ? .25 : n === 'princess_pearl' && t > T.PEARL + .4 ? .08 : n === 'dragon' && t > T.GBITE + .4 ? .4 : 0;
    TKY.plate(x, y, s, { slice, eaten, t });
    if (n === 'jester_fester' && !p.stacked && t < T.FEST + .1) TF4.drumstick(x - 8 * s, y - 4 * s, k * .95, -.12, {});
    if (n === 'alma' && t > T.ALMA + 1.7 && !p.stacked) TF4.napkinLump(x, y - 2.5 * s, k * .9);
    if (n === 'dragon' && inW(t, T.FLAME, T.BACK)) TF4.slice(x - 1 * s, y - 2.6 * s, k * .95, 0, { burn: clamp((t - T.FLAME) / 1.1), t });
    if (n === 'dr_g' && t < T.DRG + .4 && !p.stacked) { X.save(); X.globalAlpha = .9; TKY.stuffingHeap(x + 4 * s, y - 2.8 * s, s * .8, { w: 6, h: 2, seed: 7, t }); X.restore(); circle(x + 5.6 * s, y - 4.4 * s, 1.1 * s, { fill: '#E2A93B', stroke: PAL.ink, lwPx: 1.4 }); }
    if (n === 'housam' && inW(t, T.HOUS + 1.2, 73.1)) R.houseSlice = { x, y, k };
    if (n === 'housam' && t >= 73.1) {}
  }
  function pieDraw(P, t, i, pa, R) {
    const [x, y, k] = P.p(pa.x, Y_PLATE, pa.z), s = k * WU, A = R.pieHand?.[i];
    if (pa.u < 1 && A) { const u = ease(pa.u), hx = lerp(A[0], x, u), hy = lerp(A[1], y, u) - Math.sin(Math.PI * u) * 30 * k; TKY.pie(hx, hy, s, { slices: 8, t, steam: .5 }); return; }
    const sq = .25 * boing(t, pa.land, 4, 6); TKY.pie(x, y, s, { slices: pieSlices(i, t), t, steam: .6, squash: -sq });
  }

  // ---------- the set, the cast, the props over them ----------
  const SET = { time: 'evening', thanksgiving: true };
  function stage(t, camO, o = {}) {
    const P = persp({ dir: -1, ...camO }), R = { A: {}, S: {}, O: {}, freeze: o.freeze };
    for (const k in fork) delete fork[k];
    R.knife = carveRig(P, t);
    // measure the platter and cloche first (the hosts' hands go to them)
    R.stackTop = (() => { const q = P.p(STACK.x, Y_PLATE + 9 * 2.4, STACK.z); return [q[0], q[1] - 3 * q[2] * WU]; })();
    if (t >= T.HOSTS - .2) { const [px, py, pk] = P.p(TKX, platterY(t), TKZ), s = pk * WU; R.platterS = { rimL: [px - 30 * s, py - 4.6 * s], rimR: [px + 30 * s, py - 4.6 * s], top: [px, py - 5 * s] };
      const cl = clocheState(t); if (cl) { const ky = -cl.lift * 34; R.clocheS = { knob: [px + cl.lift * 4 * s, py - 5 * s + (ky - 32) * s] }; } }
    const so = { ...SET, onTable: () => tableTop(P, t, R) };
    layer(() => K.back(P, t, { ...so, splitZ: 150 }), { blur: o.blur || 0 });
    const far = NAMES.filter(n => !at(n).end && !(o.walk && CAST[n].host != null)).sort((p, q) => P.depth(at(q).z) - P.depth(at(p).z));
    far.forEach(n => drawChar(P, n, t, R));
    K.front(P, t, { ...so, splitZ: 150, toZ: 190 });
    NAMES.filter(n => at(n).end).forEach(n => drawChar(P, n, t, R));
    // the pies in Roudaynah's and Dr. G's hands (before they fly to the table)
    R.pieHand = [];
    for (let i = 0; i < 2; i++) { const pa = pieAt(i, t), w = PIE_HOME[i].who, A = R.A[w]; if (pa && A) { R.pieHand[i] = [(A.handL[0] + A.handR[0]) / 2, (A.handL[1] + A.handR[1]) / 2 + .6 * R.S[w]]; if (pa.held) { const k = P.k(165); TKY.pie(R.pieHand[i][0], R.pieHand[i][1], k * WU, { slices: 8, t, steam: .7 }); } } }
    K.front(P, t, { ...so, splitZ: 190 });
    if (o.walk) hostsWalk(P, t, R);
    overTable(P, t, R);
    return { P, R };
  }

  // the professor's knife and carving fork: where his hands go, and the blade's angle and bend
  function carveRig(P, t) {
    if (t < T.ALLOW - .3 || t > T.SERVE + .4) return null;
    const [px, py, pk] = P.p(TKX, Y_PLATE, TKZ), s = pk * WU, top = [px, py - 5 * s - 15.5 * s], k = pk;
    const raise = ease(seg(t, T.ALLOW - .3, T.ALLOW + .6)) * (1 - ease(seg(t, T.STRIKE - .25, T.STRIKE)));
    let hand = [px + 16 * k, top[1] - 26 * k - raise * 40 * k], ang = Math.PI / 2 + .9 - raise * 1.9, bend = 0, mood = 'smile', eyes = 'open', brows = 'up';
    const fhand = [px - 22 * k, top[1] - 10 * k - raise * 34 * k];
    if (t >= T.STRIKE) { const b = kick(t, T.STRIKE, 5); hand = [hand[0], hand[1] - 18 * k * b]; ang += -.6 * b; bend = .55 * clamp((t - T.STRIKE) / .15) * (1 - seg(t, T.SELF, T.SAW)); mood = t < T.SELF ? 'teeth' : 'grin'; eyes = t < T.STRIKE + .6 ? 'wide' : 'open'; }
    if (inW(t, T.SAW, T.CRACK)) { const sw = Math.sin((t - T.SAW) * 13); hand = [px + 10 * k + sw * 14 * k, top[1] - 16 * k + 4 * k * seg(t, T.SAW, T.CRACK)]; ang = Math.PI / 2 + .75 + .08 * sw; bend = 0; mood = 'teeth'; eyes = Math.sin(t * 13) > 0 ? 'squeeze' : 'open'; brows = 'worried'; }
    if (t >= T.CRACK) { const u = ease(seg(t, T.CRACK, T.CRACK + .5)); hand = [px + 18 * k + 8 * k * u, top[1] - 22 * k - 14 * k * u]; ang = Math.PI / 2 + .9 - .9 * u; mood = 'o'; eyes = 'wide'; if (t > T.CRACK + .9) { mood = 'grin'; eyes = 'open'; brows = 'worried'; } }
    const glint = inW(t, T.ALLOW + .3, T.STRIKE - .3) ? on(t, T.ALLOW + .3, T.ALLOW + 1.5, .3) : 0;
    return { hand, fhand, ang, bend, mood, eyes, brows, k, glint, fang: Math.PI / 2 + .5 - raise * 1.2 };
  }

  // the entrance: the brothers walk in through the archway with the cloche on the platter between them
  function hostsWalk(P, t, R) {
    const u = seg(t, T.ENTER, T.HOSTS), d = lerp(0, 300, easeOut(u)), cx = -640 + d, z = 600 - 40 * u, k = P.k(z);
    const pS = P.p(cx, 112, z), s = k * WU, rimL = [pS[0] - 30 * s, pS[1] - 4.6 * s], rimR = [pS[0] + 30 * s, pS[1] - 4.6 * s];
    for (const [n, dx, rim, side] of [['sami', -56, rimR, 'L'], ['safadi', 56, rimL, 'R']]) {
      const c = CAST[n], [sx, sy] = P.p(cx + dx, 0, z), ss = c.unit * k, walk = (n === 'safadi' ? safadiWalk : samiWalk)(d / 58 + (n === 'sami' ? .5 : 0), 1 - ease(seg(u, .85, 1)));
      const talk = speaking(n, t), L = (x, y) => [(x - sx) / ss, (y - sy) / ss];
      const o = { t, ...walk, turn: .3, mouth: talk ? lipFlap(t, true, 'grin') : 'grin', brows: 'up', eyes: 'open', lookX: .5, ['hand' + side]: L(rim[0], rim[1]), ['handPose' + side]: 'open',
        ['hand' + (side === 'L' ? 'R' : 'L')]: side === 'L' ? [5.3, -12.6] : [-5.8, -21.4], ['handPose' + (side === 'L' ? 'R' : 'L')]: side === 'L' ? 'palm' : 'point' };
      R.A[n] = c.rig(sx, sy, ss, o); R.S[n] = ss;
    }
    TKY.platter(pS[0], pS[1], s, { garnish: true }); TKY.cloche(pS[0], pS[1] - 5 * s, s, {});
    shape(starPts(pS[0] - 10 * s, pS[1] - 30 * s, 6 * s * (.6 + .4 * Math.sin(t * 6)), 1.6 * s, 4), { fill: '#FFFFFF', stroke: null });
  }

  // things over the table: cutlery in hands, flying food, flames, blasts, sfx
  function overTable(P, t, R) {
    const A = R.A, S = R.S;
    // the knife and carving fork
    const kn = R.knife;
    if (kn && A.safadi) { TF4.carvFork(A.safadi.handL[0], A.safadi.handL[1], kn.k, kn.fang); TF4.knife(A.safadi.handR[0], A.safadi.handR[1], kn.k, kn.ang, { bend: kn.bend, glint: kn.glint }); }
    // cutlery in the guests' hands
    for (const key in fork) { const f = fork[key], n = key.replace(/2$/, ''), a = A[n]; if (!a) continue;
      const k = S[n] / CAST[n].unit, h = f.held ? a['hand' + f.hand] : a['hand' + f.hand];
      if (f.watch) { TF4.watch(h[0], h[1] - 2 * k, k * 1.2, t, { ring: inW(t, T.ALARM, T.ALARM + 1.2) ? 1 : 0 }); continue; }
      if (f.drumstick) { TF4.drumstick(h[0], h[1], k * .95, f.ang, { bite: f.bite ? 1 : 0 }); continue; }
      if (f.knife) { X.save(); TF4.knife(h[0], h[1], k * .55, f.ang, {}); X.restore(); continue; }
      TF4.fork(h[0], h[1], k, f.ang, { bend: f.bend || 0, bite: f.bite || null }); }
    // Dr. G's watch, dangling from her spoon
    if (A.dr_g && R.O.dr_g?.holdR === 'spoon' && t > T.DRG + .6 && t < T.IRON + 1.2) { const h = A.dr_g.handR, k = S.dr_g / CAST.dr_g.unit; TF4.watch(h[0] + 3 * k, h[1] - 1 * k, k * 1.2, t, {}); }
    // Housam's slice: up, a header, back down
    if (A.housam && inW(t, T.HOUS + 1.2, 73.1) && R.houseSlice) { const p = R.houseSlice, hd = [A.housam.top[0], A.housam.top[1] - .5 * S.housam];
      const u1 = seg(t, T.HOUS + 1.2, 72.5), u2 = seg(t, 72.5, 73.1), pt = t < 72.5 ? [lerp(p.x, hd[0], u1), lerp(p.y, hd[1], u1) - Math.sin(Math.PI * u1) * 80] : [lerp(hd[0], p.x, u2), lerp(hd[1], p.y, u2) - Math.sin(Math.PI * u2) * 120];
      TF4.slice(pt[0], pt[1], p.k * 1.1, t * 9, { t }); }
    // Neptune's rainbow water blast, down the hatch
    if (A.neptune && A.neptune.tridentTip && inW(t, T.BLAST, T.BLAST + 1.6)) { const k = seg(t, T.BLAST, T.BLAST + 1.6), tip = A.neptune.tridentTip, m = A.neptune.mouth; neptuneBlast(tip[0], tip[1], m[0], m[1], k, t, 26 * S.neptune / 10); }
    // Dragon's flame onto his slice
    if (A.dragon && inW(t, T.FLAME, T.FLAME + 1.3)) { const p = plateAt('dragon', t), [x, y, k] = P.p(p.x, Y_PLATE + 3, p.z); TF4.flame(A.dragon.mouth[0], A.dragon.mouth[1], x, y, k, t, on(t, T.FLAME, T.FLAME + 1.3, .25)); }
    if (A.dragon) { const q = clamp(seg(t, T.GREEN, T.GREEN + .6)) * (1 - seg(t, T.DRG - 1, T.DRG)); TF4.queasy(A.dragon.head[0], A.dragon.head[1] - 6 * S.dragon, 4 * S.dragon, t, q); }
    // the brothers frozen mid-chew: frost on their chins
    for (const n of ['safadi', 'sami']) if (A[n] && inW(t, T.BBITE + .5, T.QDESS + .6)) TF4.frost(A[n].mouth[0], A[n].mouth[1] + 1.8 * S[n], 7 * S[n], ease(seg(t, T.BBITE + .5, T.BBITE + 1.3)) * (1 - ease(seg(t, T.QDESS, T.QDESS + .6))));
    // the professor's formula
    if (A.safadi && inW(t, T.FORMULA - .1, T.STUFF)) { const k = seg(t, T.FORMULA, T.FORMULA + 2.2) * (1 - ease(seg(t, T.STUFF - .4, T.STUFF))); const s = S.safadi; TF4.formula((A.safadi.head[0] + (A.sami ? A.sami.head[0] : A.safadi.head[0] + 400)) / 2, A.safadi.top[1] - 2.5 * s, 7 * s, k); }
    // the twins' thought
    if (A.safadi && A.sami && t >= T.THINK + .6) { const tt = Math.min(t, T.FREEZE), k = seg(tt, T.THINK + .6, T.THINK + 1.2), x = (A.safadi.top[0] + A.sami.top[0]) / 2, y = Math.min(A.safadi.top[1], A.sami.top[1]);
      for (const [n, f] of [['safadi', .35], ['sami', .6]]) { const a = A[n].top, b = [x, y - 120]; for (let i = 0; i < 3; i++) { const u = .25 + i * .22; if (k > i * .2) overlay(() => circle(lerp(a[0], b[0], u), lerp(a[1], b[1], u) - 40 * u, 10 + 7 * i, { fill: '#FFFDF8', stroke: PAL.ink, lwPx: 4 })); } }
      TF4.thought(x, Math.max(200, y - 250), 640, k, tt); }
    // sound effects (only on the hits, and only when the thing is in frame)
    const fx = (txt, p, size, col, t0, life = 1) => { if (p && t >= t0 && t < t0 + life && p[0] > -100 && p[0] < W + 100) sfx(txt, p[0], p[1], size, col, t - t0, { life }); };
    const tk = R.platterS ? [R.platterS.top[0], R.platterS.top[1] - 40] : null, mo = n => A[n] ? [A[n].mouth[0] + 60, A[n].mouth[1] - 50] : null, pl = n => { const p = plateAt(n, t); if (!p) return null; const q = P.p(p.x, Y_PLATE, p.z); return [q[0], q[1] - 40]; };
    fx('TA-DA!', tk && [tk[0], tk[1] - 120], 120, '#FFE066', T.LIFT + .1, 1.3);
    fx('CLANK!', tk && [tk[0] + 120, tk[1] - 60], 92, '#FFFDF6', T.STRIKE, 1);
    fx('CLUNK!', tk && [tk[0] - 170, tk[1] + 20], 70, '#E3C08A', T.DROP + .35, .9);
    fx('CRACK!', tk && [tk[0], tk[1] - 90], 110, '#BFE3F2', T.CRACK, 1.2);
    if (inW(t, T.SAW, T.CRACK)) for (let i = 0; i < 4; i++) fx('scritch', tk && [tk[0] + (i % 2 ? -90 : 110), tk[1] - 70 - (i % 2) * 30], 46, '#FFFDF6', T.SAW + .2 + i * .85, .7);
    fx('CRUNCH!', mo('jester_fester'), 90, '#FFFDF6', T.FEST + .7, 1);
    if (A.jester_fester && inW(t, T.FEST + 1.1, T.FEST + 1.9)) { const m = A.jester_fester.mouth, s = S.jester_fester, g = Math.sin(Math.PI * seg(t, T.FEST + 1.1, T.FEST + 1.9)); shape(starPts(m[0] + .6 * s, m[1] + .2 * s, 2.4 * s * g, .5 * s * g, 4), { fill: '#FFFFFF', stroke: PAL.ink, lwPx: 2 }); fx('DING!', [m[0] - 5 * s, m[1] - 7 * s], 64, '#FFE066', T.FEST + 1.1, .9); }
    fx('BOING!', A.housam && [A.housam.handR[0] + 70, A.housam.handR[1] - 40], 76, '#FFFDF6', T.HOUS + .45, .9);
    fx('BONK!', A.housam && [A.housam.top[0] + 90, A.housam.top[1] - 10], 80, '#FFE066', 72.5, .9);
    fx('TINK!', pl('danny'), 58, '#BFE3F2', 85.7, .5); fx('TINK!', pl('danny') && [pl('danny')[0] + 50, pl('danny')[1] - 30], 58, '#BFE3F2', 86.1, .6);
    fx('CRUNCH!', mo('neptune'), 86, '#FFFDF6', T.NBITE + .3, .9);
    fx('GULP! GULP!', mo('neptune') && [mo('neptune')[0] + 40, mo('neptune')[1] - 80], 70, '#7FD8FF', T.BLAST + .5, 1.2);
    fx('FWOOSH!', pl('dragon') && [pl('dragon')[0] + 130, pl('dragon')[1] - 120], 92, '#FFB23A', T.FLAME + .1, 1.1);
    fx('CHOMP!', mo('dragon'), 78, '#FFFDF6', T.GBITE + .35, .8);
    fx('CLINK!', A.dr_g && [A.dr_g.handR[0] - 90, A.dr_g.handR[1] - 60], 64, '#FFE066', T.DRG + .5, .8);
    fx('crunch...', mo('roudaynah'), 54, '#FFFDF6', T.ROU + .6, .9);
    fx('BRRRING!', A.sami && [A.sami.handL[0] - 220, A.sami.handL[1] - 60], 70, '#FFE066', T.ALARM, 1.2);
    fx('CRUNCH!', A.safadi && A.sami && [(A.safadi.mouth[0] + A.sami.mouth[0]) / 2, A.safadi.mouth[1] - 120], 96, '#FFFDF6', T.BBITE + .4, 1);
    for (let i = 0; i < 2; i++) { const pa = pieAt(i, t); if (pa && pa.land) { const q = P.p(pa.x, Y_PLATE, pa.z); fx('PLOP!', [q[0], q[1] - 70], 70, '#FFFDF6', pa.land, .8); } }
  }

  // ---------- bubbles: beside the speaker; from the edge when the speaker is out of frame ----------
  function bubbles(t, R, bo = {}) {
    const A = R.A, S = R.S;
    for (const l of LINES) {
      if (l.silentBubble) continue;
      const age = t - l.at; if (age < 0 || age > 12) continue;
      const c = { size: bo.size || 50, maxW: bo.maxW || 660, cps: l.cps, hold: l.hold, kind: l.kind, accent: ACCENT[l.speaker] };
      if (l.group) { const ms = l.group.map(n => A[n]).filter(a => a && a.mouth[0] > 40 && a.mouth[0] < W - 40);
        if (ms.length > 1) { const top = Math.min(...ms.map(m => Math.min((m.top || m.head)[1], (m.crown || m.head)[1]))); callout(l.text, ms.reduce((a, m) => a + m.mouth[0], 0) / ms.length, top - 10, age, { ...c, size: c.size * 1.25, dx: 0, dy: bo.groupDy ?? -Math.min(170, top - 90) }); continue; } }
      const a = A[l.speaker], s = S[l.speaker];
      if (a && a.mouth[0] > 40 && a.mouth[0] < W - 40 && a.mouth[1] > 30 && a.mouth[1] < H) {
        const side = bo.side?.[l.speaker] ?? (a.mouth[0] < W * .5 ? 1 : -1), top = Math.min((a.top || a.head)[1], (a.crown || a.head)[1]);
        callout(l.text, a.mouth[0] + side * CAST[l.speaker].hw * s * .9, a.mouth[1] - .4 * s, age, { ...c, dx: side * (bo.far || 300), dy: bo.dy ?? Math.min(-140, top - a.mouth[1] - 90) });
      } else callout(l.text, bo.edgeX ?? -30, bo.edgeY ?? H * .3, age, { ...c, dx: (bo.edgeX ?? -30) < W / 2 ? 420 : -420, dy: -120 });
    }
  }

  // ---------- cameras (dining view, dir -1: +X is screen-left) ----------
  const drift = (t, a = 1) => [8 * a * Math.sin(t * .23), 5 * a * Math.sin(t * .31)];
  const fixed = (c, push = 0) => (t, lt) => { const [ox, oy] = drift(t); return { ...c, x: c.x + ox, z: c.z - push * lt, hy: c.hy + oy }; };
  function aim(n, o = {}) {                                                       // a medium close shot of one guest, head at screen y sy
    const a = at(n), hY = headY(n), dist = o.dist ?? 200, f = o.f ?? 1000, k = f / dist, cy = hY + (o.up ?? 14);
    return { x: a.x + (o.dx ?? 0), y: cy, z: a.z + dist, f, hy: (o.sy ?? 520) - (cy - hY) * k };
  }
  const WIDE = (t, lt) => { const u = ease(seg(t, 0, T.HAPPY + 2)); const [ox, oy] = drift(t); return { x: ox, y: lerp(215, 165, u), z: lerp(840, 790, u), f: lerp(600, 720, u), hy: lerp(470, 535, u) + oy }; };
  const MED = fixed({ x: 0, y: 230, z: 760, f: 1200, hy: 215 }, 4);
  const CLOSE = fixed({ x: 0, y: 132, z: 640, f: 1400, hy: 450 }, 5);
  const HEAD = fixed({ x: 270, y: 128, z: 520, f: 1050, hy: 470 }, 4);
  const FOOT = fixed({ x: -270, y: 128, z: 520, f: 1050, hy: 470 }, 4);
  const HOSTCAM = fixed({ x: 0, y: 172, z: 480, f: 1000, hy: 330 }, 6);
  const CARVE = fixed({ x: 0, y: 150, z: 405, f: 1100, hy: 330 }, 3);
  const TURKEY = fixed({ x: 0, y: 145, z: 390, f: 1100, hy: 345 }, 5);
  const ARCH = fixed({ x: -250, y: 150, z: 830, f: 720, hy: 545 }, 3);
  const single = (n, o) => { const c = aim(n, o); return fixed(c, o?.push ?? 3); };

  const shot = (camFn, blur, bo = {}, extra) => (t, lt, dur) => { const { R } = stage(t, camFn(t, lt, dur), { blur, walk: bo.walk }); bubbles(t, R, bo); if (extra) extra(t, R); };
  const opening = shot(WIDE, 0, { size: 46 }, t => TF4.title(t, .4, 3.8));
  const arch = shot(ARCH, 0, { walk: true, far: 260 });
  const med = shot(MED, 0, { size: 46 });
  const close = shot(CLOSE, .8, { size: 48 });
  const head = shot(HEAD, 1.2, {});
  const foot = shot(FOOT, 1.2, {});
  const hosts = shot(HOSTCAM, 1.6, { far: 330, side: { safadi: 1, sami: -1 } });
  const carve = shot(CARVE, 2.2, { far: 330, side: { safadi: 1, sami: -1 } });
  const turkeyShot = shot(TURKEY, 2.6, { far: 330 });
  const one = (n, o = {}, bo = {}) => shot(single(n, o), 2.6, { far: 320, dy: -330, ...bo });
  const dessert = shot(MED, 0, { size: 46 }, (t, R) => TF4.confetti(t, on(t, T.DESSERT, T.DESSERT + 4.3, .3)));
  const dessertClose = shot(CLOSE, .8, { size: 48 }, (t, R) => TF4.confetti(t, .5 * on(t, T.CHEERS + 1.4, T.PROMISE + .2, .4)));

  // ---------- the ending: the twins' shared thought, freeze, TO BE CONTINUED, iris ----------
  const ENDCAM = (t, lt) => { const u = ease(seg(t, T.THINK, T.FREEZE)); const [ox, oy] = drift(Math.min(t, T.FREEZE)); return { x: ox, y: 172, z: lerp(480, 450, u), f: 1000, hy: lerp(440, 560, u) + oy }; };
  function ending(t) {
    const tt = Math.min(t, T.FREEZE), { R } = stage(tt, ENDCAM(tt), { blur: 1.6, freeze: t > T.FREEZE });
    bubbles(tt, R, { far: 330 });
    if (t < T.FREEZE) return;
    flash(.6 * kick(t, T.FREEZE, 8));
    TF4.tbc(backOut(seg(t, T.FREEZE + .3, T.FREEZE + .7)));
    const A = R.A, cx = A.safadi && A.sami ? (A.safadi.head[0] + A.sami.head[0]) / 2 : W / 2, cy = A.safadi ? A.safadi.head[1] - 60 : H / 2;
    iris(cx, cy, lerp(1500, 0, easeIn(seg(t, T.END - 2.2, T.END - .3))));
  }

  scene({ duration: T.END, fps: 24, bpm: 112,              // id, title, dialogue, music: see asset.js
    shots: [
      // 1. the table
      [0, opening], [T.HUNGRY - .1, close], [T.ANY - .1, foot], [T.FEAST - .1, head],
      // 2. the grand entrance
      [T.ENTER, arch], [T.HOSTS, hosts], [T.FORMULA, close], [T.STUFF, hosts], [T.DRUM, close], [T.LIFT, turkeyShot], [T.OOH, med], [T.BANDAID, one('danny', { dx: -30 })],
      // 3. the carving
      [T.GARNISH, carve], [T.SAW, close], [T.CRACK - .3, turkeyShot], [T.BLUE - .1, one('jenna', { dx: 40 })], [T.HUNGRY2 - .1, med],
      // 4. the tasting
      [T.FEST - .1, one('jester_fester', { dx: 30 })], [T.HOUS - .1, one('housam', { dx: -20, sy: 470 })], [T.ALMA - .1, one('alma', { dx: -20 })], [T.JEN - .1, one('jenna', { dx: 30 })],
      [T.DAN - .1, one('danny', { dx: -20 })], [T.SICLE - .1, one('neptune', { dx: -80 })], [T.LEAVE - .1, one('dragon', { dx: 55 })], [T.DRG - .1, one('dr_g', { dx: -40 })],
      [T.ROU - .1, one('roudaynah', { dx: 40 })], [T.PEARL - .1, one('princess_pearl', { dx: -60 })],
      // 5. talking around it
      [T.MAILLARD - .1, hosts], [T.VITA - .1, foot], [T.IRON - .1, one('dr_g', { dx: 60 })], [T.DONE - .1, hosts], [T.BACK - .1, med], [T.BBITE - .3, carve],
      // 6. dessert
      [T.QDESS - .1, one('roudaynah', { dx: -50 })], [T.DESSERT - .1, dessert], [T.NOW - .1, one('princess_pearl', { dx: -60 })], [T.FIN - .1, one('neptune', { dx: -80 })], [T.CHEERS - .1, one('jester_fester', { dx: 70 }, { side: { jester_fester: -1 } })], [T.CHEERS + 2.5, dessertClose],
      // 7. the promise
      [T.PROMISE - .1, hosts], [T.SEE - .1, close], [T.THINK, ending],
    ] });
})();
