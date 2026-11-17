// Scene 72: "The Turkey Prize", the second scene of the Fall Festival series. Same festival, same afternoon, same gang.
// Bean bag toss: the professor's bag sails over the board and knocks a pumpkin off its stack (and his lucky ring rolls away);
// the doctor's bag lands in a student's popcorn. "Basic fluid dynamics." "It's in the literature." Housam kicks his bag in,
// Alma throws hers over her shoulder. High striker: the professor explains F = m·a and reaches WET NOODLE; the doctor lifts
// "with the knees" and tips over backward, so all four kids swing one hammer, ring the bell and win the grand prize: a
// frozen turkey. It is passed around like a hot potato, sticks to the doctor's hands, and the brothers promise a scientific
// Thanksgiving turkey and the healthiest stuffing. The kids are worried. "You shall see!" To be continued.
// Blocking as in scene 71: each game is a lane along X (the player on the mark, the game to the right, the others in a group
// to the left), on FF2.LANE_Z in front of scene 71's games. Shots cut whenever the player changes. Pure functions of t.
(() => {
  const D = LOCATIONS.dces, LINES = ASSETS.scene.scene72_turkey_prize.dialogue, C = FF.C;
  const Z = FF2.LANE_Z, BX = FF2.BX, HX = FF2.HX;
  const ACCENT = { housam: '#425DA0', danny: '#2E7D9A', jenna: '#D0508E', alma: '#994EC4', safadi: PAL.crimson, sami: '#2E7D6A' };
  const HEADW = { safadi: 6.6, sami: 6.6, jenna: 4.6, alma: 6.6, housam: 3.6, danny: 4.6 };

  // ---------- timing: the start of every line and action beat (see README.md) ----------
  const T = { OPEN: 0, WEWIN: 3.8, HALO: 7.2, LUCK: 9.6, RULES: 11.8, S1: 14.5, WIND: 18.4, STRAIGHT: 21.9, MYTURN: 25.3, M1: 28.4, LIT: 32,
    HTURN: 37.5, HO: 38.9, WATCH: 42, AL: 43.4, WIN1: 46, CHEER: 47.4, LUCKB: 49.2, CONTAG: 51.4,
    ACT2: 54.6, LOOK: 55.2, TOWER: 57.7, PHYS: 61.6, FMA: 64.5, OBSERVE: 69.2, S2: 70.4, THEORY: 73.8, NOODLE: 76.8, KNEES: 79.7, M2: 83.5, REST: 87, MISCAL: 90,
    CANWE: 93.3, TOGETHER: 95, KIDS: 97, ROCKET: 99, WINNER: 101.6, PRIZE: 104, COLD: 105, SOLID: 106.9, CATCH: 109, POTATO: 110.9, STUCK: 113.2, THERMO: 115.5,
    PROMISE: 118.6, BEST: 122.6, ROOTED: 125.9, STUFF: 130.7, KALE: 134.2, WORRY: 137.1, UHOH: 137.6, EVER: 139.6, STAT: 142.6, PIZZA: 145.6, SEE: 147.9, LAUGH: 150.6, FREEZE: 152.2, END: 158 };

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
  const laneX = t => t < T.ACT2 ? BX : HX;
  const MARKS = [[T.S1, T.STRAIGHT, 'safadi'], [T.MYTURN, T.HTURN, 'sami'], [T.HO, T.WATCH, 'housam'], [T.AL, T.CHEER, 'alma'],
    [T.FMA, T.NOODLE, 'safadi'], [T.KNEES, T.CANWE, 'sami']];
  const SWINGPOS = { housam: [-100, 26], alma: [-62, 8], jenna: [-26, -6], danny: [10, -18] };          // all four on one hammer (from HX)
  const TABLEPOS = { housam: [-150, -12], danny: [-72, -20], jenna: [96, -16], alma: [160, -8] };     // around the prize table (from FF2.DX)
  const markWho = t => MARKS.find(m => t >= m[0] && t < m[1])?.[2];
  const at = (n, t) => {
    if (KIDS.includes(n) && t >= T.KIDS && t < T.PRIZE) return { x: HX + SWINGPOS[n][0], z: Z + SWINGPOS[n][1], swing: true };
    if (KIDS.includes(n) && t >= T.PRIZE && t < T.PROMISE) return { x: FF2.DX + TABLEPOS[n][0], z: Z + TABLEPOS[n][1], table: true };
    return markWho(t) === n ? { x: laneX(t), z: Z, mark: true } : { x: laneX(t) + CAST[n].slot[0], z: Z + CAST[n].slot[1] };
  };
  const holding = t => !(t >= T.KIDS && t < T.PROMISE);                 // the kids' prizes: in hand, or on the crate while they swing and the turkey goes round

  // ---------- helpers ----------
  const textLen = l => l.text.replace(/\*/g, '').length;
  const speaking = (who, t) => LINES.some(l => { if (l.speaker !== who) return false; const p = (t - l.at - .2) * l.cps; return p > 0 && p < textLen(l); });
  const curSpeaker = t => LINES.find(l => !l.silentBubble && t > l.at && t < l.at + .25 + textLen(l) / l.cps + l.hold)?.speaker;
  const inW = (t, a, b) => t >= a && t < b;
  const on = (t, a, b, r = .3) => ease(seg(t, a, a + r)) * (1 - ease(seg(t, b - r, b)));
  const bounce = (t, f = 10, ph = 0) => Math.abs(Math.sin(t * f + ph));
  const arc = (S, E, u, h) => [lerp(S[0], E[0], u), lerp(S[1], E[1], u) + h * 4 * u * (1 - u), lerp(S[2], E[2], u)];
  const deg = d => d * Math.PI / 180;

  // ---------- bean bag toss: every bag thrown ----------
  const HOLEW = [lerp(FF2.BOARD[0], FF2.BOARD[1], FF2.HOLE), lerp(12, 52, FF2.HOLE) + 3, Z];
  const relH = n => -lerp(CAST[n].sh, CAST[n].up, .5) * CAST[n].unit;
  const POPLOOK = studentLook(14), POPRIM = 12.5 * STUDENT_UNIT * POPLOOK.h;
  const B0 = { who: 'safadi', t0: T.S1 + .3, col: C.red }, B1 = { who: 'sami', t0: T.M1 + .3, col: C.blue };
  [B0, B1].forEach(b => { b.rel = b.t0 + .6; b.land = b.rel + (b === B0 ? .85 : 1); });
  const HK = { drop: T.HO + .25, taps: [T.HO + .5, T.HO + .85, T.HO + 1.2, T.HO + 1.55], land: T.HO + 2.3, col: C.green };
  const TAPP = [[BX + 16, 12], [BX + 12, 46], [BX + 16, 12], [BX + 24, 26]];
  const AK = { rel: T.AL + .95, land: T.AL + 1.75, col: C.purple };
  function bagAt(t) {                                                        // every bag in the air (or lying where it ended up): world points
    const out = [];
    if (t >= B0.rel && t < T.ACT2) {
      const S = [BX + 55, relH('safadi'), Z], E = [FF2.STACK, 106, Z + 70];
      if (t < B0.land) out.push({ p: arc(S, E, seg(t, B0.rel, B0.land), 170), col: B0.col, rot: t * 9 });
      else { const v = t - B0.land; out.push({ p: v < .4 ? arc(E, [FF2.STACK - 4, 86, Z + 70], v / .4, 20) : [FF2.STACK - 4, 86, Z + 70], col: B0.col, rot: .3 }); }
    }
    if (t >= B1.rel && t < T.ACT2 && t < B1.land) out.push({ p: arc([BX + 55, relH('sami'), Z], [FF2.POPX, POPRIM + 4, FF2.POPZ], seg(t, B1.rel, B1.land), 240), col: B1.col, rot: t * 11 });
    if (t >= HK.drop && t < HK.land + .2) {                                  // Housam: drop, three taps, a volley
      const hold = [BX + 22, 58, Z - 4], K = HK.taps;
      let p;
      if (t < K[0]) p = [lerp(hold[0], TAPP[0][0], seg(t, HK.drop, K[0])), lerp(hold[1], TAPP[0][1], easeIn(seg(t, HK.drop, K[0]))), Z - 4];
      else if (t < K[3]) { const i = K.findIndex((k, j) => t >= k && t < K[j + 1]); p = arc([...TAPP[i], Z - 4], [...TAPP[i + 1], Z - 4], seg(t, K[i], K[i + 1]), 42); }
      else if (t < HK.land) p = arc([...TAPP[3], Z - 4], HOLEW, seg(t, K[3], HK.land), 95);
      else p = [HOLEW[0], HOLEW[1] - 30 * seg(t, HK.land, HK.land + .2), Z];
      out.push({ p, col: HK.col, rot: t * 8, sink: t >= HK.land ? seg(t, HK.land, HK.land + .2) : 0 });
    }
    if (t >= AK.rel && t < AK.land + .2) {
      const p = t < AK.land ? arc([BX + 22, 108, Z - 4], HOLEW, seg(t, AK.rel, AK.land), 150) : [HOLEW[0], HOLEW[1] - 30 * seg(t, AK.land, AK.land + .2), Z];
      out.push({ p, col: AK.col, rot: -t * 8, sink: t >= AK.land ? seg(t, AK.land, AK.land + .2) : 0 });
    }
    return out;
  }
  const RING_OFF = B0.rel + .05;                                             // the professor's lucky ring (scene 71's) flies off on the throw and rolls away
  function ringAt(t) {
    if (t < RING_OFF || t > T.STRAIGHT) return null;
    const S = [BX + 2, 182, Z], G = [BX - 80, 15, Z - 10];
    if (t < RING_OFF + .5) return { p: arc(S, G, seg(t, RING_OFF, RING_OFF + .5), 50), flat: true };
    const v = t - RING_OFF - .5;
    return { p: [G[0] - 230 * v - 20 * v * v, 15 + 6 * Math.abs(Math.sin(v * 9)) * Math.exp(-v * 2), G[2]], roll: v };
  }

  // ---------- the high striker: the hammer, the puck, the bell ----------
  const HL = 88;                                                              // grip centre to the head centre (world units)
  const REST = { G: [HX + 17, 101], phi: deg(-75) }, UP = { G: [HX + 33, 128], phi: deg(118) }, HIT = { G: [HX + 1, 90], phi: deg(-35) };
  const DROP = { G: [HX - 26, 23], phi: deg(-5) };
  const SAFHIT = T.S2 + 1.1, KIDHIT = T.KIDS + 1.8, DING = T.ROCKET + .45, SAMIFALL = [T.M2 + 1.8, T.M2 + 2.4];
  const mixH = (a, b, u) => ({ G: [lerp(a.G[0], b.G[0], u), lerp(a.G[1], b.G[1], u)], phi: lerp(a.phi, b.phi, u) });
  const KHIT = { G: [HX - 8, 74], phi: deg(-22) };
  const UPK = { G: [HX - 38, 110], phi: deg(104) };
  function hammerAt(t) {                                                      // the hammer in the world: grip centre G, direction phi (grip → head)
    if (t < T.ACT2) return null;
    if (inW(t, T.S2, T.S2 + 3)) {
      if (t < T.S2 + .8) return mixH(REST, UP, ease(seg(t, T.S2, T.S2 + .8)));
      if (t < T.S2 + .95) return { G: [UP.G[0], UP.G[1] + 4 * seg(t, T.S2 + .8, T.S2 + .95)], phi: UP.phi + deg(4) * seg(t, T.S2 + .8, T.S2 + .95) };
      if (t < SAFHIT) return mixH({ G: [UP.G[0], UP.G[1] + 4], phi: UP.phi + deg(4) }, HIT, easeIn(seg(t, T.S2 + .95, SAFHIT)));
      if (t < T.S2 + 2.2) return { G: [HIT.G[0], HIT.G[1] + 3 * kick(t, SAFHIT, 9)], phi: HIT.phi + deg(5) * kick(t, SAFHIT, 9) };
      return mixH(HIT, REST, ease(seg(t, T.S2 + 2.2, T.S2 + 2.9)));
    }
    if (inW(t, T.M2, T.CANWE)) return null;                                   // the doctor's lift: drawn from his hands (see samiHammer)
    if (inW(t, T.KIDS, T.PRIZE)) {
      const k0 = T.KIDS;
      if (t < k0 + .4) return REST;
      if (t < k0 + 1.4) return mixH(REST, UPK, ease(seg(t, k0 + .4, k0 + 1.4)));
      if (t < k0 + 1.6) return { G: [UPK.G[0], UPK.G[1] + 8 * Math.sin(Math.PI * seg(t, k0 + 1.4, k0 + 1.6))], phi: UPK.phi + deg(6) * seg(t, k0 + 1.4, k0 + 1.6) };
      if (t < KIDHIT) return mixH({ G: UPK.G, phi: UPK.phi + deg(6) }, KHIT, easeIn(seg(t, k0 + 1.6, KIDHIT)));
      if (t < T.ROCKET) return { G: [KHIT.G[0], KHIT.G[1] + 4 * kick(t, KIDHIT, 9)], phi: KHIT.phi };
      return DROP;
    }
    return REST;
  }
  const headOf = h => [h.G[0] + Math.cos(h.phi) * HL, h.G[1] + Math.sin(h.phi) * HL];
  function puckY(t) {
    if (t < SAFHIT || t >= T.PRIZE) return 40;
    if (t < T.S2 + 3) { if (t < SAFHIT + .7) return lerp(40, 116, easeOut(seg(t, SAFHIT, SAFHIT + .7))) + 3 * Math.sin(seg(t, SAFHIT + .5, SAFHIT + 1.1) * 30) * (t > SAFHIT + .5 ? 1 : 0);
      return lerp(116, 40, easeIn(seg(t, SAFHIT + 1.1, SAFHIT + 1.7))) + 4 * Math.abs(Math.sin(seg(t, SAFHIT + 1.7, SAFHIT + 2.1) * 9)) * (1 - seg(t, SAFHIT + 1.7, SAFHIT + 2.1)); }
    if (t < KIDHIT) return 40;
    if (t < DING) return lerp(40, FF2.BELL_Y - 34, easeOut(seg(t, KIDHIT + .2, DING)));
    return FF2.BELL_Y - 34 - 6 * Math.abs(Math.sin((t - DING) * 12)) * Math.exp(-(t - DING) * 3);
  }

  // ---------- the frozen turkey: where it is (world), who holds it ----------
  const TS = 1.35, TW = 31 * TS, TH = 16 * TS;                               // the prize is BIG: its scale, half width, grip height
  const HOLDY = { danny: 22, housam: 56, jenna: 36, alma: 28, safadi: 72, sami: 72 };
  const holdPt = (n, t) => { const a = at(n, t); return [a.x, HOLDY[n], a.z - 14]; };
  const HOPS = [[T.SOLID + .1, T.SOLID + .55, 'danny', 'housam'], [T.SOLID + .8, T.SOLID + 1.35, 'housam', 'jenna'], [T.SOLID + 1.55, T.SOLID + 2, 'jenna', 'alma']];
  const THROWT = T.CATCH + 1.2, SAFCATCH = T.POTATO + .5, TOSS2 = [T.POTATO + 1.4, T.POTATO + 1.9];
  function turkeyAt(t) {
    if (t < T.PRIZE + .3) return null;                                        // on the ice (drawn with the prize table)
    const lift = T.PRIZE + .3, tbl = [FF2.DX, 92, Z + 30];
    if (t < T.PRIZE + .75) return { p: arc(tbl, holdPt('danny', t), seg(t, lift, T.PRIZE + .75), 25), by: [] };
    if (t < T.POTATO) {
      for (const [a, b, f, to] of HOPS) if (inW(t, a, b)) return { p: arc(holdPt(f, t), holdPt(to, t), seg(t, a, b), 70), by: [], spin: seg(t, a, b) };
      if (t < HOPS[0][0]) return { p: holdPt('danny', t), by: ['danny'], shiver: t > T.COLD - .2 ? 1 : .4 };
      if (t < HOPS[1][0]) return { p: holdPt('housam', t), by: ['housam'], shiver: .6 };
      if (t < HOPS[2][0]) return { p: holdPt('jenna', t), by: ['jenna'], shiver: .6 };
      const ah = holdPt('alma', t);
      if (t < THROWT - .4) return { p: ah, by: ['alma'], shiver: .5 };
      if (t < THROWT) { const u = ease(seg(t, THROWT - .4, THROWT)); return { p: [ah[0] + 25 * u, ah[1] + 50 * u, ah[2]], by: ['alma'] }; }
      return { p: arc([ah[0] + 25, ah[1] + 50, ah[2]], [ah[0] - 900, 300, ah[2] - 60], seg(t, THROWT, THROWT + .8), 120), by: [], spin: seg(t, THROWT, THROWT + .8) * 2 };
    }
    const sp = holdPt('safadi', t), mp = holdPt('sami', t);
    if (t < SAFCATCH) return { p: arc([sp[0] + 520, 260, sp[2] - 40], sp, seg(t, T.POTATO, SAFCATCH), 60), by: [], spin: seg(t, T.POTATO, SAFCATCH) };
    if (t < TOSS2[0]) { const v = t - SAFCATCH, hop = v < .9 ? 30 * Math.abs(Math.sin(Math.PI * v / .45)) : 0; return { p: [sp[0] + hop, sp[1] + hop, sp[2]], by: hop > 6 ? [] : ['safadi'] }; }
    if (t < TOSS2[1]) return { p: arc(sp, mp, seg(t, TOSS2[0], TOSS2[1]), 55), by: [] };
    if (t < T.PROMISE) { const sh = t > T.STUCK - .3 && t < T.THERMO + 1.5 ? 7 * Math.sin(t * 26) : 0; return { p: [mp[0] + sh, mp[1] + Math.abs(sh) * .6, mp[2]], by: ['sami'], shiver: .4 }; }
    const mid = [(sp[0] + mp[0]) / 2, 78, Math.min(sp[2], mp[2]) - 4];
    const lift2 = t >= T.LAUGH ? 92 * backOut(seg(t, T.LAUGH, T.LAUGH + .5)) : 14 * on(t, T.PROMISE, T.BEST, .4);
    return { p: [mid[0], mid[1] + lift2 + (t > T.LAUGH ? 6 * bounce(Math.min(t, T.FREEZE), 6) : 0), mid[2]], by: ['safadi', 'sami'], pair: true };
  }

  // the state of the games, for the props
  function gameState(t) {
    return { knock: t >= B0.land && t < T.ACT2 ? t - B0.land : null, puck: puckY(t), ding: t >= DING && t < T.PRIZE ? t - DING : null,
      lights: t >= DING ? 1 : t >= T.ACT2 ? .0 : 0, hit: t >= DING ? 999 : null, padKick: Math.max(kick(t, SAFHIT, 9), kick(t, KIDHIT, 9)),
      taken: t >= T.PRIZE + .3, pile: t >= T.KIDS && t < T.PROMISE };
  }
  const DINGS = [HK.land, AK.land, T.WIN1, DING, T.WINNER, T.PRIZE + .75];
  const cheer = t => DINGS.reduce((m, d) => Math.max(m, kick(t, d, 3.2)), 0);

  // ---------- poses ----------
  function throwPose(c, t, t0) {                                              // scene 71's: wind up behind, then sling the arm forward
    const w = ease(seg(t, t0, t0 + .55)), f = easeOut(seg(t, t0 + .55, t0 + .8)), back = 1 - ease(seg(t, t0 + 1.5, t0 + 2));
    if (t < t0 - .01 || back <= 0) return {};
    const hx = lerp(lerp(c.side * .6, -c.side * .4, w), c.side * 1.25, f), hy = lerp(lerp(c.sh, c.sh + 2.5, w), lerp(c.sh, c.up, .5), f);
    return { handR: [lerp(c.rest[0], hx, back), lerp(c.rest[1], hy, back)], handPoseR: 'fist', lean: (-.09 * w + .2 * f) * back, brows: 'focused' };
  }
  const toLocal = (n, a, w, air = 0) => [(w[0] - a.x) / CAST[n].unit, air - w[1] / CAST[n].unit];      // a world point (same depth) → local units

  function pose(n, t, a) {
    const c = CAST[n], adult = n === 'safadi' || n === 'sami', talk = speaking(n, t), say = m => talk ? lipFlap(t, true, m) : m;
    const big = adult || n === 'alma' || n === 'jenna' ? 'O' : 'open', ph = NAMES.indexOf(n) * 1.3;
    const o = { mouth: say('smile'), brows: 'normal', eyes: 'open', lookX: .55, lookY: 0, turn: a.mark ? .3 : .12, handL: [-c.rest[0], c.rest[1]], handR: [c.rest[0], c.rest[1]], handPoseL: 'open', handPoseR: 'open' };
    const set = p => Object.assign(o, p), is = (...ns) => ns.includes(n), kid = !adult;
    if (n === 'jenna') o.giraffe = holding(t);
    if (kid && holding(t)) {                                                  // the prizes from part 1
      if (is('alma')) set({ handR: [c.side * 1.35, c.sh + 1], handPoseR: 'fist', _sword: .22 });
      if (is('housam')) set({ handL: [-2.4, c.sh + 2], handPoseL: 'fist', _dragon: true });
      if (is('danny')) set({ handL: [-1.8, c.sh + 1], handR: [1.8, c.sh + 1], handPoseL: 'fist', handPoseR: 'fist', _robot: true });
    }
    const up2 = (k = 1) => ({ handL: [-c.side * .9, lerp(c.sh, c.up, k)], handR: [c.side * .9, lerp(c.sh, c.up, k)], handPoseL: 'fist', handPoseR: 'fist' });
    const point = { handR: [c.side * 1.2, c.sh], handPoseR: 'point' }, fingerUp = { handR: [c.side * .55, c.up - 1], handPoseR: 'point' }, fingerUpL = { handL: [-c.side * .55, c.up - 1], handPoseL: 'point' };
    const laugh = { eyes: 'happy', mouth: 'open', dy: .2 * bounce(t, 10, ph) }, gasp = { eyes: 'wide', mouth: big, brows: 'up' };
    const deadpan = { eyes: 'narrow', mouth: say('flat'), brows: 'normal' };
    const sp = curSpeaker(t);
    if (sp && sp !== n) set({ lookX: clamp((at(sp, t).x - a.x) / 150, -.8, .8) });
    const hop = cheer(t);
    if (kid && hop > .05 && !a.mark && !a.swing) set({ jump: 1.3 * hop * bounce(t, 9, ph), eyes: 'happy', mouth: 'grin', brows: 'up' });
    const keepPrize = () => { if (is('danny') && o._robot) set({ handL: [-1.8, c.sh + 1], handR: [1.8, c.sh + 1], handPoseL: 'fist', handPoseR: 'fist' }); };

    if (t < T.S1) {                                                           // the vow, the halo, the rules
      if (inW(t, T.WEWIN, T.HALO)) {
        if (adult) { const k = on(t, T.WEWIN + .3, T.HALO, .25); set({ turn: is('safadi') ? .2 : -.2, lookX: is('safadi') ? .5 : -.4, brows: 'angry', mouth: say('grin'), ...(k > .3 ? { ...up2(1.1), jump: 1.3 * kick(t, T.WEWIN + .6, 3) } : {}) }); }
        else set({ eyes: 'happy', mouth: 'grin', jump: .6 * bounce(t, 7, ph), lookX: -.7 });
      }
      if (t < T.WEWIN && kid) set({ eyes: 'happy', mouth: 'grin', lookX: -.6, jump: .4 * bounce(t, 6, ph) });
      if (t < T.WEWIN && adult) set({ ...up2(.9), brows: 'angry', mouth: 'grin', lookX: is('safadi') ? .4 : -.4 });
      if (inW(t, T.HALO, T.LUCK)) {
        if (is('jenna')) set({ handR: [c.side * .5, c.up + 1], handPoseR: 'point', mouth: say('smirk'), lookX: -.8, brows: 'up' });
        else if (kid) set({ ...laugh, lookX: -.7 });
        if (is('safadi')) set({ lookY: -.5, eyes: 'open', brows: 'quizzical', mouth: 'o' });
        if (is('sami')) set({ lookX: -.6, mouth: 'grin', eyes: 'happy' });
      }
      if (inW(t, T.LUCK, T.RULES)) {
        if (is('safadi')) set({ handR: [3.6, -26.5], handPoseR: 'palm', handL: [-3.6, -26.5], handPoseL: 'palm', eyes: t > T.LUCK + .5 ? 'closed' : 'open', mouth: say('smirk'), brows: 'up', tilt: -.04 });
        else if (kid) set({ lookX: -.8, mouth: 'grin', eyes: 'happy', dy: .12 * bounce(t, 8, ph) });
        else set({ lookX: -.7, mouth: 'smirk', brows: 'quizzical' });
      }
      if (t >= T.RULES) {
        if (is('alma')) set({ handL: [-c.side * 1.1, c.sh], handPoseL: 'point', mouth: say('grin'), brows: 'up', lookX: .8, jump: .5 * bounce(t, 7) });
        else set({ lookX: .8, ...(adult ? { mouth: 'smirk', brows: 'up' } : { brows: 'up' }) });
      }
    } else if (t < T.MYTURN) {                                                // the professor's bag
      if (is('safadi')) {
        set({ lookX: .7, brows: 'focused', mouth: 'flat', ...throwPose(c, t, B0.t0) });
        if (inW(t, B0.rel, B0.land + .3)) set({ lookY: -.4, eyes: 'wide', mouth: 'o', brows: 'up' });
        if (inW(t, B0.land + .3, T.WIND)) set({ ...gasp, brows: 'worried', mouth: 'teeth', lookX: .8, ...(t > B0.land + 1 ? { handL: [-3.4, -27], handPoseL: 'palm', lookY: -.6, eyes: 'wide', mouth: 'o', emote: '?', emoteK: on(t, B0.land + 1, T.WIND, .2) } : {}) });
        if (inW(t, T.WIND, T.STRAIGHT)) set({ ...fingerUp, eyes: t > T.WIND + .6 ? 'closed' : 'open', mouth: say('smirk'), brows: 'up', lookX: -.3, turn: 0, power: .25 * on(t, T.WIND + .3, T.STRAIGHT, .4) });
      } else {
        set({ lookX: .8 });
        if (inW(t, B0.land, B0.land + .4)) set(gasp);
        if (inW(t, B0.land + .4, T.WIND)) set(kid ? laugh : { eyes: 'happy', mouth: 'grin', handL: [-1, -18], handPoseL: 'palm' });
        if (t >= T.STRAIGHT) {
          if (is('housam')) set({ handR: [c.side, c.sh + 2], handPoseR: 'palm', lookY: -.5, eyes: 'open', mouth: say('smirk'), brows: 'up', lookX: -.4 });
          else if (kid) set({ eyes: 'happy', mouth: 'grin', lookY: -.3, dy: .12 * bounce(t, 8, ph) });
          if (adult) set({ lookY: -.5, brows: 'worried', mouth: 'flat' });
        }
      }
      keepPrize();
    } else if (t < T.HTURN) {                                                 // the doctor's bag, and the literature
      if (is('sami')) {
        set({ lookX: .7, mouth: say('grin'), brows: 'up' });
        if (t < T.M1) set({ handL: [-1.5, -13], handPoseL: 'thumb', jump: .4 * kick(t, T.MYTURN + .2, 4) });
        set(throwPose(c, t, B1.t0));
        if (inW(t, B1.rel, B1.land)) set({ lookY: -.6, lookX: .8, eyes: 'wide', mouth: 'o' });
        if (inW(t, B1.land, T.LIT)) set({ eyes: 'wide', mouth: 'teeth', brows: 'worried', lookX: .8, emote: 'sweat', emoteK: on(t, B1.land, T.LIT, .3) });
        if (t >= T.LIT) { const pw = .4 * on(t, T.LIT + .3, T.HTURN - .2, .5); set({ ...fingerUpL, handR: [5.3, -12.6], handPoseR: 'palm', lookX: -.3, turn: -.1, power: pw, eyes: pw > .3 ? 'glow' : 'open', mouth: say('grin'), brows: 'up' }); }
      } else {
        set({ lookX: .8 });
        if (inW(t, B1.land, B1.land + .4)) set(gasp);
        if (inW(t, B1.land + .4, T.LIT)) set(kid ? laugh : { eyes: 'happy', mouth: 'grin' });
        if (t >= T.LIT && kid) set({ mouth: 'flat', brows: 'normal', eyes: inW(t, 35.2, 36.4) && is('jenna', 'housam') ? 'closed' : 'open', ...(is('danny') && t > 35 ? { tilt: .08 } : {}) });
        if (t >= T.LIT && is('safadi')) set({ tilt: .03 * Math.sin(t * 5), mouth: 'smirk', eyes: inW(t, 33, 35) ? 'closed' : 'open' });
      }
      keepPrize();
    } else if (t < T.CHEER) {                                                 // Housam kicks one in; Alma throws one over her shoulder
      if (is('housam')) {
        if (t < T.HO) set({ handR: [c.side * .6, c.up], handPoseR: 'fist', mouth: say('grin'), brows: 'up', jump: .6 * kick(t, T.HTURN + .2, 4) });
        else if (a.mark) {
          const K = HK.taps, tap = i => kick(t, K[i], 10);
          set({ lookX: .3, lookY: .5, brows: 'focused', mouth: 'smirk', handR: [c.side * 1.1, -14], handPoseR: 'open' });
          if (t < HK.drop) set({ handR: [4.2, -11], handPoseR: 'fist' });
          const knee = tap(1), toe = Math.max(tap(0), tap(2));
          let foot = [1.3, -.8 - 2.2 * toe - 7 * knee];
          if (t >= K[2] + .1 && t < HK.land) { const wb = ease(seg(t, K[2] + .1, K[3] - .02)), kk = easeOut(seg(t, K[3] - .02, K[3] + .2)), rb = ease(seg(t, K[3] + .4, HK.land));
            foot = [lerp(lerp(1.3, -2.6, wb), 5.8, kk) * (1 - rb) + 1.3 * rb, lerp(lerp(-.8, -5, wb), -8, kk) * (1 - rb) - .8 * rb]; set({ lean: -.12 * kk * (1 - rb), lookX: .8, lookY: -.2 }); }
          set({ footR: foot });
          if (t >= HK.land) set({ handL: [-c.side * .8, c.up], handPoseL: 'fist', eyes: 'happy', mouth: 'grin', brows: 'up', jump: 1.4 * kick(t, HK.land + .05, 3), lookX: -.3 });
        }
      }
      if (is('alma')) {
        if (inW(t, T.WATCH, T.AL)) set({ eyes: inW(t, T.WATCH + .8, T.AL) ? 'wink' : 'open', mouth: say('grin'), brows: 'up', lookX: -.6, handL: [-c.side * .6, c.up], handPoseL: 'palm' });
        if (a.mark) {
          const tw = ease(seg(t, T.AL, T.AL + .5)), back = ease(seg(t, AK.land + .15, AK.land + .6));
          const w = ease(seg(t, T.AL + .55, AK.rel - .1)), f = easeOut(seg(t, AK.rel - .1, AK.rel + .1));
          set({ spin: TAU * tw, turn: -.7 * (1 - back), lookX: lerp(-.9, .6, back), eyes: t < AK.land ? 'closed' : 'star', mouth: 'smirk', brows: 'up',
            handL: [-c.side * 1.2, c.sh + 1], handPoseL: 'fist', _swordL: true, _sword: -.5,
            handR: [lerp(lerp(c.rest[0], 2.4, w), 3.6, f), lerp(lerp(c.rest[1], -5, w), -16.5, f)], handPoseR: 'fist' });
          if (t > AK.land) set({ handR: [c.side * .9, c.up], handPoseR: 'fist', mouth: 'O', jump: 1.6 * bounce(t, 7) * on(t, AK.land, T.CHEER, .2) });
        }
      }
      if (adult) {
        set({ lookX: .8 });
        if (inW(t, HK.land, T.WATCH) || inW(t, AK.land, T.CHEER)) set({ ...gasp, emote: '!', emoteK: Math.max(on(t, HK.land, HK.land + 1.2, .15), on(t, AK.land, AK.land + 1.2, .15)) });
        if (inW(t, T.HTURN, T.HO)) set({ mouth: 'smirk', brows: 'quizzical' });
      }
      if (kid && !a.mark && inW(t, T.HO, T.CHEER)) set({ lookX: .8 });
      keepPrize();
    } else if (t < T.ACT2) {                                                  // two for two; beginner's luck
      if (is('danny')) set({ handL: [-2.2, c.up], handR: [2.2, c.up], eyes: talk ? 'wide' : 'happy', brows: 'up', mouth: say('grin'), jump: 1.3 * bounce(t, 7) * on(t, T.CHEER, T.LUCKB, .2) });
      else if (kid) set({ eyes: 'happy', mouth: 'grin', jump: .8 * bounce(t, 7, ph) * on(t, T.CHEER, T.LUCKB, .2), lookX: -.2 });
      if (kid && t >= T.LUCKB) set({ lookX: -.8, mouth: talk ? o.mouth : 'smirk', eyes: 'open' });
      if (is('safadi')) set(t < T.LUCKB ? { ...gasp, lookX: .7 } : { handL: [-1.6, -11], handR: [1.6, -11], handPoseL: 'fist', handPoseR: 'fist', ...deadpan, lookX: .3, lookY: -.2, turn: .1 });
      if (is('sami')) set(t < T.LUCKB ? { ...gasp, lookX: .7 } : t < T.CONTAG ? { lookX: -.8, mouth: 'smirk', brows: 'up' } : { ...fingerUp, lookX: .4, mouth: say('grin'), brows: 'up', eyes: inW(t, 53.4, 54.4) ? 'closed' : 'open' });
      if (is('housam') && t >= T.CONTAG + 1) set({ eyes: 'happy', mouth: 'grin', dy: .15 * bounce(t, 8, ph) });
      keepPrize();
    } else if (t < T.FMA) {                                                   // the high striker; the grand prize
      set({ lookX: .8 });
      if (is('danny') && inW(t, T.LOOK, T.PHYS)) set({ handL: [-2.2, c.up], handR: [2.2, c.up], eyes: 'wide', brows: 'up', mouth: say('grin'), jump: 1.2 * bounce(t, 7) * on(t, T.LOOK, T.TOWER, .2) });
      if (kid && inW(t, T.TOWER, T.PHYS)) set({ ...gasp, lookY: -.3 });
      if (is('housam') && inW(t, T.TOWER, T.PHYS)) set({ mouth: say('O'), handR: [c.side * 1.1, c.sh], handPoseR: 'point' });
      if (t >= T.PHYS) {
        if (is('safadi')) set({ ...fingerUp, mouth: say('smirk'), brows: 'up', eyes: inW(t, 63, 64.3) ? 'closed' : 'open', lookX: .3, power: .2 * on(t, 62, T.FMA, .4) });
        if (is('sami')) set({ lookX: -.7, mouth: 'grin', brows: 'up' });
        if (kid) set({ lookX: -.8, mouth: 'smile', brows: 'up' });
      }
      keepPrize();
    } else if (t < T.KNEES) {                                                 // the professor: physics, then WET NOODLE
      if (is('safadi')) {
        const h = hammerAt(t), hand = toLocal(n, a, h.G);
        if (t < T.OBSERVE) { const pw = .45 * on(t, T.FMA + .2, T.OBSERVE, .5); set({ handR: hand, handPoseR: 'fist', handL: [-6.2, -15.6], handPoseL: 'palm', lookX: -.5, turn: -.1, power: pw, eyes: pw > .3 ? 'glow' : 'open', mouth: say('grin'), brows: 'up' }); }
        else {
          set({ handR: [hand[0] + .6, hand[1]], handL: [hand[0] - .6, hand[1] + .4], handPoseR: 'fist', handPoseL: 'fist', lookX: .7, brows: 'focused', mouth: say('smirk') });
          if (inW(t, T.S2, SAFHIT)) set({ eyes: t > T.S2 + .6 ? 'squeeze' : 'open', mouth: 'teeth', brows: 'angry', sq: -.06 * seg(t, T.S2 + .4, T.S2 + .9), lean: -.06 * ease(seg(t, T.S2, T.S2 + .8)) + .12 * seg(t, T.S2 + .95, SAFHIT) });
          if (inW(t, SAFHIT, SAFHIT + 1.1)) set({ sq: .1 * kick(t, SAFHIT, 7), eyes: 'wide', mouth: 'o', brows: 'up', lookX: .8, lookY: -.6 * seg(t, SAFHIT, SAFHIT + .5), lean: .1 });
          if (inW(t, SAFHIT + 1.1, T.THEORY)) set({ eyes: 'narrow', mouth: 'flat', brows: 'worried', lookX: .8, lookY: -.6 + .9 * seg(t, SAFHIT + 1.1, SAFHIT + 1.7), emote: 'sweat', emoteK: on(t, SAFHIT + 1.4, T.THEORY + .4, .3) });
          if (t >= T.THEORY) set({ ...fingerUpL, ...deadpan, eyes: t > T.THEORY + 1 ? 'closed' : 'narrow', lookX: .2, turn: .1 });
        }
      } else {
        set({ lookX: .8 });
        if (inW(t, SAFHIT, SAFHIT + .5)) set({ ...gasp, lookY: -.4 });
        if (inW(t, SAFHIT + 1.3, T.NOODLE)) set(kid ? { eyes: 'happy', mouth: 'grin', dy: .12 * bounce(t, 8, ph) } : { mouth: 'smirk', brows: 'quizzical' });
        if (t >= T.NOODLE) {
          if (is('jenna')) set({ handR: [c.side * 1.2, c.sh], handPoseR: 'point', mouth: say('smirk'), brows: 'up', lookX: .8 });
          else if (kid) set(laugh);
          if (is('sami')) set({ eyes: 'happy', mouth: 'open', dy: .2 * bounce(t, 10), handL: [-1, -18], handPoseL: 'palm' });
        }
      }
      keepPrize();
    } else if (t < T.CANWE) {                                                 // the doctor lifts with the knees, and tips over
      if (is('sami') && a.mark) {
        const h = hammerAt(t) || REST, hand = toLocal(n, a, h.G);
        set({ handR: hand, handPoseR: 'fist', handL: [-4.6, -12], handPoseL: 'open', lookX: .4, mouth: say('grin'), brows: 'up' });
        if (inW(t, T.KNEES, T.M2)) { const sq = on(t, T.KNEES + 1.6, T.M2 + .1, .35); set({ ...(sq < .1 ? fingerUpL : { handL: [-5.2, -10], handPoseL: 'palm' }), dy: 3 * sq, lookX: sq > .1 ? .1 : -.3, lookY: sq * .5, eyes: talk ? 'open' : 'happy' }); }
      } else if (is('sami')) {
      } else {
        set({ lookX: .8 });
        if (inW(t, SAMIFALL[0], SAMIFALL[1] + .5)) set({ ...gasp, lookX: .5 });
        if (inW(t, SAMIFALL[1] + .5, T.MISCAL)) set(kid ? laugh : { eyes: 'squeeze', mouth: 'teeth', brows: 'worried' });
        if (t >= T.MISCAL) {
          if (is('safadi')) set({ handR: [c.side * 1.1, c.sh + 1], handPoseR: 'palm', ...deadpan, brows: 'up', eyes: t > T.MISCAL + 1.2 ? 'closed' : 'narrow', lookX: .7 });
          else set({ lookX: -.8, lookY: -.3, mouth: 'flat', brows: 'normal', eyes: 'narrow' });
        }
      }
      keepPrize();
    } else if (t < T.PRIZE) {                                                 // can we try? all together: DING!
      if (t < T.KIDS) {
        if (is('danny') && t < T.TOGETHER) set({ handL: [-2.2, c.up], handR: [2.2, c.up], eyes: 'wide', brows: 'up', mouth: say('grin'), jump: 1 * bounce(t, 8) });
        if (is('alma') && t >= T.TOGETHER) set({ handR: [c.side * .9, c.up], _sword: -.12, eyes: talk ? 'open' : 'star', brows: 'up', mouth: say('grin'), jump: 1.1 * bounce(t, 7) });
        if (kid && t >= T.TOGETHER && !is('alma')) set({ eyes: 'happy', mouth: 'grin', brows: 'up', lookX: -.4, jump: .7 * bounce(t, 7, ph) });
        if (adult) set({ lookX: .8, mouth: 'smirk', brows: 'quizzical', ...(is('sami') ? { handL: [-3, -16], handPoseL: 'palm', tilt: -.05, eyes: 'narrow' } : {}) });
      } else if (a.swing) {                                                   // all four on the handle
        const h = hammerAt(t), Gw = h.G, ux = Math.cos(h.phi), uy = Math.sin(h.phi), lift = seg(t, T.KIDS + .4, T.KIDS + 1.4), air = 2.2 * Math.sin(Math.PI * seg(t, T.KIDS + 1.35, T.KIDS + 1.75));
        const shW = [a.x, -c.sh * c.unit]; let d = (shW[0] - Gw[0]) * ux + (shW[1] - Gw[1]) * uy; d = clamp(d, -26, 34);
        const gw = [Gw[0] + ux * d, Gw[1] + uy * d], hl = toLocal(n, a, [gw[0] - ux * 4, gw[1] - uy * 4], air), hr = toLocal(n, a, [gw[0] + ux * 4, gw[1] + uy * 4], air);
        set({ handL: hl, handR: hr, handPoseL: 'fist', handPoseR: 'fist', jump: air, lookX: .6, lookY: -.3 * lift, brows: is('danny', 'housam') ? 'focused' : 'angry', mouth: 'grin', eyes: 'open', dy: t < T.KIDS + .5 ? .8 * seg(t, T.KIDS, T.KIDS + .3) : 0 });
        if (inW(t, T.KIDS + .4, T.KIDS + 1.3)) set({ eyes: 'squeeze', mouth: is('danny', 'housam') ? 'frown' : 'wobble' });
        if (t >= KIDHIT) set({ eyes: 'wide', mouth: big, brows: 'up', lookX: .8, lookY: -.6 });
        if (t >= T.ROCKET) set({ ...up2(1), eyes: is('alma') ? 'star' : 'happy', mouth: 'grin', brows: 'up', jump: 1.6 * bounce(t, 7, ph), lookY: -.3, lookX: .3 });
      } else if (adult) {
        set({ lookX: .8 });
        if (t >= KIDHIT) set({ ...gasp, lookY: -.4, emote: '!', emoteK: on(t, KIDHIT + .1, T.PRIZE, .2) });
        if (t >= T.WINNER) set({ eyes: 'wide', mouth: 'O', brows: 'up', lookY: -.2, ...(is('sami') ? { handL: [-4.6, -15.6], handR: [4.6, -15.6], handPoseL: 'palm', handPoseR: 'palm' } : { handR: [1.2, -18.5], handPoseR: 'palm' }) });
      }
    } else if (t < T.PROMISE) {                                               // the frozen turkey: c-c-cold! then the hot potato
      const tk = turkeyAt(t);
      if (kid && a.table) {
        set({ lookX: .3, brows: 'up', mouth: 'grin' });
        const holder = tk && tk.by.includes(n), next = tk && !tk.by.length && HOPS.some(([s, e, f, to]) => to === n && inW(t, s - .3, e));
        if (holder || (t < T.PRIZE + .75 && is('danny'))) {
          const p = tk ? tk.p : [FF2.DX, 92, Z + 30];
          set({ handL: toLocal(n, a, [p[0] - TW, p[1] + TH]), handR: toLocal(n, a, [p[0] + TW, p[1] + TH]), handPoseL: 'palm', handPoseR: 'palm', eyes: 'squeeze', mouth: 'wobble', brows: 'worried', dy: .25 * Math.sin(t * 60), lookX: 0, lookY: .4 });
          if (is('danny') && inW(t, T.PRIZE + .75, T.PRIZE + 1.2)) set({ sq: .14 * kick(t, T.PRIZE + .75, 6), eyes: 'wide', mouth: 'O' });
          if (is('alma') && t >= T.CATCH) set({ eyes: 'open', brows: 'angry', mouth: say('grin'), lookX: -.8, turn: -.3, lean: t > THROWT - .4 ? -.1 : 0 });
        } else if (next) set({ handL: [-c.side * .8, c.sh - 1], handR: [c.side * .8, c.sh - 1], handPoseL: 'palm', handPoseR: 'palm', eyes: 'wide', mouth: big, lookX: (tk.p[0] - a.x) / 140 });
        else if (t < T.PRIZE + .3) set({ ...up2(1), eyes: 'happy', mouth: 'grin', jump: 1.2 * bounce(t, 8, ph), lookX: .2 });
        else {
          const had = HOPS.find(([s, e, f]) => f === n && t > s); const shake = had && t < had[1] + 1.3;
          set(shake ? { handL: [-1.2, c.up + 3], handR: [1.2, c.up + 3], handPoseL: 'palm', handPoseR: 'palm', eyes: 'squeeze', mouth: 'o', tilt: .05 * Math.sin(t * 30) } : { lookX: tk ? clamp((tk.p[0] - a.x) / 140, -.8, .8) : .3, eyes: 'happy', mouth: 'grin', brows: 'up' });
          if (t > THROWT) set({ lookX: -.8, ...up2(1), eyes: 'happy', mouth: 'open', jump: .8 * bounce(t, 8, ph) });
        }
        if (t >= T.COLD && t < T.SOLID && !holder) set({ eyes: 'happy', mouth: 'open', dy: .15 * bounce(t, 9, ph) });
      } else if (adult) {
        set({ lookX: .8 });
        if (t >= T.POTATO) {
          const mine = tk && tk.by.includes(n), coming = tk && !tk.by.length && (is('safadi') ? t < SAFCATCH + .95 : inW(t, TOSS2[0] - .2, TOSS2[1]));
          if (mine || (is('safadi') && inW(t, SAFCATCH, TOSS2[0]))) {
            const p = tk.p, aa = at(n, t);
            set({ handL: toLocal(n, aa, [p[0] - TW, p[1] + TH]), handR: toLocal(n, aa, [p[0] + TW, p[1] + TH]), handPoseL: 'palm', handPoseR: 'palm', lookX: 0, lookY: .5 });
            if (is('safadi')) set({ eyes: 'wide', mouth: 'O', brows: 'up', sq: .1 * kick(t, SAFCATCH, 6), lean: -.06 * kick(t, SAFCATCH, 4) });
            if (is('sami')) { set({ sq: .1 * kick(t, TOSS2[1], 6), eyes: t > T.STUCK - .3 ? 'squeeze' : 'wide', mouth: t > T.STUCK - .3 ? say('teeth') : 'O', brows: 'worried', lean: .04 * Math.sin(t * 26) * (t > T.STUCK - .3 ? 1 : 0) });
              if (t > T.STUCK + 1.6) set({ emote: 'sweat', emoteK: on(t, T.STUCK + 1.6, T.PROMISE, .3) }); }
          } else if (coming) set({ handL: [-5, -13], handR: [5, -13], handPoseL: 'palm', handPoseR: 'palm', eyes: 'wide', mouth: big, brows: 'up', lookX: is('safadi') ? .8 : -.8 });
          if (is('safadi') && t > TOSS2[1]) set({ lookX: .8, mouth: 'grin', eyes: 'open' });
          if (is('safadi') && t >= T.THERMO) set({ ...fingerUp, eyes: t > T.THERMO + .7 ? 'closed' : 'open', mouth: say('smirk'), brows: 'up', lookX: .5, power: .3 * on(t, T.THERMO + .3, T.PROMISE, .4) });
        }
      }
    } else if (t < T.WORRY) {                                                 // the promise
      if (adult) {
        const tk = turkeyAt(t), p = tk.p, inner = is('safadi') ? 'handR' : 'handL';
        set({ [inner]: toLocal(n, a, [p[0] + (is('safadi') ? -TW : TW), p[1] + TH]), [inner === 'handR' ? 'handPoseR' : 'handPoseL']: 'palm', lookX: is('safadi') ? .2 : -.2, mouth: say('grin'), brows: 'up', turn: is('safadi') ? .15 : -.15 });
        if (is('safadi')) {
          if (t < T.BEST) set({ handL: [-5.4, -13], handPoseL: 'palm', eyes: t > T.PROMISE + 2.2 ? 'closed' : 'open', lookX: .5 });
          else if (t < T.ROOTED) set({ handL: [-3.8, -15.4], handPoseL: 'fist', eyes: t > T.BEST + .6 && t < T.BEST + 2.4 ? 'closed' : 'open', tilt: -.04 });
          else if (t < T.STUFF) { const pw = .5 * on(t, T.ROOTED + .2, T.STUFF - .2, .5); set({ handL: [-6.2, -15.6], handPoseL: 'palm', lookX: -.5, power: pw, eyes: pw > .3 ? 'glow' : 'open' }); }
          else set({ lookX: .7, mouth: 'smile', ...(t > T.KALE ? { brows: 'quizzical', mouth: 'flat' } : {}) });
        } else {
          if (t < T.STUFF) set({ lookX: -.6, eyes: inW(t, T.ROOTED + 1, T.ROOTED + 3) ? 'closed' : 'open', tilt: .03 * Math.sin(t * 3) });
          else if (t < T.KALE) { const pw = .45 * on(t, T.STUFF + .2, T.WORRY, .5); set({ handR: [6.2, -15.6], handPoseR: 'palm', lookX: .5, power: pw, eyes: pw > .3 ? 'glow' : 'open' }); }
          else { const k = Math.floor((t - T.KALE) / .62); set({ handR: [5.6 - (k % 2), -18 + 2 * (k % 2)], handPoseR: k % 2 ? 'fist' : 'point', lookX: .4, power: .45 * on(t, T.STUFF + .2, T.WORRY, .5), eyes: 'happy', jump: .5 * kick(t, T.KALE + k * .62, 6) }); }
        }
      } else {
        set({ lookX: -.8, mouth: 'smile', brows: 'up' });
        if (t > T.ROOTED + 2) set({ brows: 'normal', mouth: 'flat' });
        if (t > T.KALE + .4) set({ brows: 'worried', mouth: is('danny') ? 'frown' : 'o', eyes: 'wide' });
        keepPrize();
      }
    } else if (t < T.SEE) {                                                   // the kids trade looks
      if (kid) {
        const order = ['alma', 'danny', 'jenna', 'housam'], i = order.indexOf(n), glance = Math.floor((t - T.WORRY) * 1.6 + i) % 2 ? .8 : -.8;
        set({ brows: 'worried', eyes: 'open', mouth: 'flat', lookX: sp && sp !== n ? o.lookX : glance, tilt: .04 * Math.sin(t * 2 + ph) });
        if (is('alma') && inW(t, T.UHOH, T.EVER)) set({ mouth: say('o'), eyes: 'wide' });
        if (is('jenna') && inW(t, T.EVER, T.STAT)) set({ mouth: say('o'), handR: [c.side * .6, c.sh], handPoseR: 'palm' });
        if (is('housam') && inW(t, T.STAT, T.PIZZA)) set({ ...fingerUp, mouth: say('flat'), eyes: t > T.STAT + .5 ? 'narrow' : 'open', brows: 'normal' });
        if (is('danny') && t >= T.PIZZA) set({ mouth: say('grin'), brows: 'up', eyes: 'happy', jump: .6 * kick(t, T.PIZZA + .1, 4), handL: [-2, c.up], handR: [2, c.up] });
        if (!is('danny') && t > T.PIZZA + 1) set({ ...laugh, brows: 'up' });
      } else {
        const tk = turkeyAt(t), p = tk.p, inner = is('safadi') ? 'handR' : 'handL';
        set({ [inner]: toLocal(n, a, [p[0] + (is('safadi') ? -TW : TW), p[1] + TH]), [inner === 'handR' ? 'handPoseR' : 'handPoseL']: 'palm', lookX: is('safadi') ? .3 : -.3, mouth: 'grin', eyes: 'happy', brows: 'up', turn: is('safadi') ? .15 : -.15, tilt: .04 * Math.sin(t * 2.5 + ph) });
      }
      keepPrize();
    } else {                                                                  // you shall see!
      if (adult) {
        const tk = turkeyAt(Math.min(t, T.FREEZE)), p = tk.p, inner = is('safadi') ? 'handR' : 'handL', outer = is('safadi') ? 'handL' : 'handR';
        set({ [inner]: toLocal(n, a, [p[0] + (is('safadi') ? -TW : TW), p[1] + TH]), [inner === 'handR' ? 'handPoseR' : 'handPoseL']: 'palm',
          [outer]: [is('safadi') ? -c.side * .9 : c.side * .9, c.up], [outer === 'handL' ? 'handPoseL' : 'handPoseR']: 'fist',
          brows: 'angry', mouth: say(t < T.LAUGH ? 'O' : 'grin'), eyes: 'open', lookX: is('safadi') ? .5 : -.5, turn: is('safadi') ? .15 : -.15, jump: t > T.LAUGH ? .4 * bounce(Math.min(t, T.FREEZE), 6, ph) : 0 });
      } else { set({ lookX: -.6 }); if (t >= T.LAUGH - .5) set({ ...laugh, brows: 'up', jump: .9 * bounce(Math.min(t, T.FREEZE), 8, ph) }); if (is('alma')) set({ handR: [c.side * .8, c.up], _sword: -.12 + .1 * Math.sin(t * 5) }); keepPrize(); }
    }
    return o;
  }

  // ---------- drawing a character, with whatever is in its hands ----------
  function drawChar(P, n, a, t, A, S, fz) {
    const c = CAST[n], p = { ...pose(n, t, a), t, ...fz }, [sx, sy, k] = P.p(a.x, 0, a.z), s = c.unit * k;
    let Ax;
    if (n === 'sami' && a.mark && inW(t, T.M2, T.CANWE)) Ax = drawSamiLift(P, a, t, p, sx, sy, s, k);
    else Ax = c.rig(sx, sy, s, p);
    A[n] = Ax; S[n] = s;
    if (n === 'safadi' && t < RING_OFF) FF.ring(Ax.top[0] + .3 * s, Ax.top[1] + .9 * s, 17 * k, 5.5 * k, C.gold, { rot: -.12 + .04 * Math.sin(t * 2) });   // part 1's ring, still on his head
    if (a.mark && t < T.ACT2) {                                               // the bag about to be thrown
      const mine = n === 'safadi' ? B0 : n === 'sami' ? B1 : null;
      if (mine && t < mine.rel) FF2.bag(Ax.handR[0], Ax.handR[1] - .3 * s, 10 * k, mine.col, .3);
      if (n === 'housam' && t < HK.drop) FF2.bag(Ax.handR[0], Ax.handR[1] + .2 * s, 10 * k, HK.col, -.2);
      if (n === 'alma' && t < AK.rel) FF2.bag(Ax.handR[0], Ax.handR[1] - .3 * s, 9.5 * k, AK.col, .4);
    }
    if (holding(t)) {
      if (p._sword != null) { const hd = p._swordL ? Ax.handL : Ax.handR; FF.prize('sword', hd[0], hd[1] + .8 * s, s * .46, t, { ang: p._sword, glow: fz ? 1 : .6 + .3 * Math.sin(t * 5) }); }
      if (p._dragon) FF.prize('dragon', Ax.handL[0] - .6 * s, Ax.handL[1] + 3.2 * s, s * .56, t, { ang: -.08 });
      if (p._robot) FF.prize('robot', (Ax.handL[0] + Ax.handR[0]) / 2, (Ax.handL[1] + Ax.handR[1]) / 2 + 3 * s, s * .62, t);
    }
  }
  // the doctor's lift: strain with the head on the ground, up over his head, and over backward (the body turns about his feet)
  function drawSamiLift(P, a, t, p, sx, sy, s, k) {
    const [f0, f1] = SAMIFALL, up = ease(seg(t, T.M2 + 1.1, f0)), fall = easeIn(seg(t, f0 + .15, f1)), land = boing(t, f1, 5, 6) * (t > f1 ? 1 : 0);
    const ang = -1.42 * fall + .05 * land, lift = 4.3 * s * Math.sin(-ang);
    const strain = t < T.M2 + 1.1 ? 1 : 1 - up;
    const head = [HX + 38, 15], phiS = deg(-75) + deg(-14) * Math.sin(Math.PI * seg(t, T.M2, T.M2 + 1.1)) * strain;
    let q = { ...p, noShadow: fall > .05 };
    if (t < T.M2 + 1.1) {                                                    // heave: the head stays on the ground
      const G = [head[0] - Math.cos(phiS) * HL, head[1] - Math.sin(phiS) * HL], hl = toLocal('sami', a, G);
      const shake = .25 * Math.sin(t * 50);
      q = { ...q, handR: [hl[0] + .6, hl[1] + shake], handL: [hl[0] - .6, hl[1] + .5 + shake], handPoseR: 'fist', handPoseL: 'fist', dy: 2.6, eyes: 'squeeze', mouth: 'teeth', brows: 'angry', lean: -.05, lookX: .3, emote: 'sweat', emoteK: on(t, T.M2 + .3, T.M2 + 1.3, .2), blush: .9 };
    } else {
      const hand = [lerp(1.2, 5.4, up), lerp(-13.5, -21.5, up)];
      q = { ...q, handR: [hand[0] + .5, hand[1]], handL: [hand[0] - .5, hand[1] + .3], handPoseR: 'fist', handPoseL: 'fist', dy: 2.6 * (1 - up), eyes: fall > 0 ? 'wide' : 'open', mouth: fall > 0 ? 'O' : 'grin', brows: 'up', lookX: -.3, lookY: -.6, lean: -.1 * up };
      if (t > f1) q = { ...q, handR: [6.2, -17], handL: [-6.2, -17], handPoseR: 'open', handPoseL: 'open', eyes: t < f1 + 1 ? 'squeeze' : 'closed', mouth: 'wobble', brows: 'worried', lean: 0, lookY: 0, emote: undefined };
      if (t >= T.REST) q = { ...q, handL: [-5, -18], handPoseL: 'thumb', eyes: 'closed', mouth: speaking('sami', t) ? lipFlap(t, true, 'grin') : 'grin', brows: 'up' };
    }
    if (fall > .05) ellipse(sx - 14 * s * fall, sy + .2 * s, 5 + 14 * s * fall, .9 * s, { fill: 'rgba(40,20,30,.28)', stroke: null });
    const body = () => { X.save(); X.translate(sx, sy - lift); X.rotate(ang); const r = sami(0, 0, s, q); X.restore(); return r; };
    const raised = t >= T.M2 + 1.1 && t < f1, Ax = raised ? measure(body) : body();
    // the hammer: on the ground; in his hands, up (behind him); then down behind him
    let grip = mixPt(Ax.handL, Ax.handR, .5), hd;
    if (t < T.M2 + 1.1) hd = P.p(head[0], head[1], Z);
    else if (t < f1) { const ph = deg(-75) + (deg(118) - deg(-75)) * up + deg(60) * fall, screenA = -ph + ang; hd = [grip[0] + Math.cos(screenA) * HL * k, grip[1] + Math.sin(screenA) * HL * k]; }
    else { grip = P.p(HX - 360, 8, Z); hd = P.p(HX - 268, 15, Z); }
    FF2.mallet(grip[0], grip[1], Math.atan2(hd[1] - grip[1], hd[0] - grip[0]), Math.hypot(hd[0] - grip[0], hd[1] - grip[1]), k);
    if (raised) body();
    if (t > f1 + .2) for (let i = 0; i < 3; i++) { const aa = t * 4 + i * TAU / 3, cx = Ax.head[0], cy = Ax.head[1] - 4 * s; shape(starPts(cx + Math.cos(aa) * 6 * s, cy + Math.sin(aa) * 2 * s, 1.3 * s, .45, 5, aa), { fill: '#FFE066', stroke: C.ink, lwPx: 1.4 }); }
    return Ax;
  }

  // festival-goers behind the games (scene 71's crowd) and the popcorn kid by the bean bag toss
  const CROWD = [[-1445, 2015, 3], [-1350, 2052, 8], [-530, 2060, 12], [-20, 2040, 21], [150, 2062, 5], [1260, 2010, 17], [1405, 2050, 9]];
  function drawStudent(P, [x, z, seed], t, extra = {}) {
    const look = extra.look || studentLook(seed), [sx, sy, k] = P.p(x, 0, z), hop = cheer(t);
    return student(sx, sy, STUDENT_UNIT * k * look.h, { look, seed, t, lookX: clamp((laneX(t) + 200 - x) / 500, -.8, .8), mouth: hop > .1 ? 'grin' : 'smile', eyes: hop > .1 ? 'happy' : 'open',
      jump: 1.2 * hop * bounce(t, 8, seed), dy: .12 * Math.sin(t * 2 + seed), ...(hop > .1 ? { handL: [-4.3, -19], handR: [4.3, -19] } : {}), ...extra.pose });
  }
  function drawPopcornKid(P, t) {
    const land = t - B1.land, hit = t >= B1.land, [sx, sy, k] = P.p(FF2.POPX, 0, FF2.POPZ), s = STUDENT_UNIT * k * POPLOOK.h;
    const munch = hit && land > 1.1, chew = munch ? Math.floor(land * 2.2) % 2 : 0;
    const A = student(sx, sy, s, { look: POPLOOK, seed: 14, t, lookX: hit && land < 1.1 ? 0 : -.5, lookY: hit && land < 1.1 ? .5 : 0,
      eyes: hit ? (land < 1.1 ? 'wide' : 'happy') : 'open', mouth: hit ? (land < 1.1 ? 'O' : chew ? 'grin' : 'o') : 'smile', brows: hit && land < 1.1 ? 'up' : 'normal',
      handL: [-1.4, -12.5], handPoseL: 'fist', handR: munch && chew ? [.6, -19.5] : [4, -9.5], handPoseR: 'fist', sq: hit ? .1 * kick(t, B1.land, 7) : 0, dy: .1 * Math.sin(t * 2) });
    FF2.popcorn(A.handL[0] + 3 * s, A.handL[1] - .4 * s, k, t, hit ? land : null);
    if (hit) FF2.bag(A.handL[0] + 3 * s, A.handL[1] - 3 * k, 6.5 * k, B1.col, .5, .8);
    return A;
  }

  // ---------- the stage, for a camera ----------
  function stage(t, camO, blur, o = {}) {
    const P = persp(camO), A = {}, S = {}, items = [], fz = o.freeze ? { boil: 0 } : null, wide = camO.z < 1250;
    for (const n of NAMES) { const a = at(n, t); if (P.depth(a.z) > 40) items.push({ z: a.z, draw: () => drawChar(P, n, a, t, A, S, fz) }); }
    for (const c of CROWD) if (P.depth(c[1]) > 40) items.push({ z: c[1], draw: () => drawStudent(P, c, t) });
    if (t < T.ACT2 && P.depth(FF2.POPZ) > 40) items.push({ z: FF2.POPZ, draw: () => { A.pop = drawPopcornKid(P, t); } });
    const st = gameState(t), hm = hammerAt(t);
    const behind = h => h && (Math.sin(h.phi) > .3 || inW(t, T.KIDS + .4, KIDHIT - .06));
    if (behind(hm) && P.depth(Z) > 40) items.push({ z: Z + 2, draw: () => drawHammer(P, hm) });   // raised: behind the swinger's head
    items.push(...FF.dress(P, t, { gone: { sword: true, giraffe: true, dragon: true, robot: true } }), ...FF2.dress(P, t, st));
    items.sort((p, q) => q.z - p.z);
    layer(() => { D.back(P, t, wide ? { splitZ: 1400 } : {}); FF.grade(); }, { blur });
    items.forEach(it => it.draw());
    if (wide) D.front(P, t, { splitZ: 1400 });
    overWorld(t, P, A, S);
    FF.leaves(t);
    return { A, S, P };
  }

  function drawHammer(P, h) {
    const k = P.k(Z), ge = P.p(h.G[0] - Math.cos(h.phi) * 22, h.G[1] - Math.sin(h.phi) * 22, Z - 6), hd = P.p(...headOf(h), Z - 6);
    FF2.mallet(ge[0], ge[1], Math.atan2(hd[1] - ge[1], hd[0] - ge[0]), Math.hypot(hd[0] - ge[0], hd[1] - ge[1]), k);
  }
  // chalk drawn on a floating board (same pop and wobble as safadiBoard / samiBoard)
  function chalkOn(x, y, w, k, t, fn) {
    if (k <= 0) return; const h = w * .62, pop = backOut(seg(k, 0, .2)), d = seg(k, .2, 1), U = w / 100;
    X.save(); X.translate(x, y + wob(t, .35) * w * .01); X.scale(pop, pop); X.translate(-w / 2, -h / 2);
    X.shadowColor = '#7FE3FF'; X.shadowBlur = U * 1.2; fn(U, d); X.restore();
  }
  const chalkTxt = (txt, x, y, size, a, d, col = '#FFFDF4') => { if (d < a) return; X.globalAlpha = seg(d, a, a + .12); X.font = `700 ${size}px ${SF_CHALK}`; X.textAlign = 'center'; X.textBaseline = 'middle'; X.fillStyle = col; X.fillText(txt, x, y); X.globalAlpha = 1; };
  const chalkLine = (pts, a, b, d, U, col = '#FFFDF4') => { const f = seg(d, a, b); if (f > 0) line(f < 1 ? polySlice(pts, 0, f) : pts, { stroke: col, lwPx: Math.max(2, U * .9) }); };

  // things over everyone: bags, the ring, the hammer, the turkey, the boards, the sound effects, the confetti
  function overWorld(t, P, A, S) {
    const vis = P.depth(Z) > 40, k = P.k(Z), W3 = (x, y, z = Z) => P.p(x, y, z);
    const fx = (txt, x, y, size, col, t0, life = 1) => { if (vis && t >= t0 && t < t0 + life) { const [sx, sy] = W3(x, y); sfx(txt, sx, sy, size, col, t - t0, { life }); } };
    if (vis && t < T.ACT2) {
      for (const b of bagAt(t)) { const [sx, sy, bk] = P.p(...b.p); if (b.sink) { X.save(); X.globalAlpha = 1 - b.sink; } FF2.bag(sx, sy, 10 * bk * (1 - .5 * (b.sink || 0)), b.col, b.rot, 1); if (b.sink) X.restore(); }
      const r = ringAt(t); if (r) { const [sx, sy, rk] = P.p(...r.p); FF.ring(sx, sy - (r.flat ? 0 : 15 * rk), 15 * rk, r.flat ? 6 * rk : 15 * rk, C.gold, { rot: r.flat ? .3 * Math.sin(t * 20) : 0 }); }
    }
    const h = hammerAt(t);
    if (vis && h && !(Math.sin(h.phi) > .3 || inW(t, T.KIDS + .4, KIDHIT - .06))) drawHammer(P, h);
    const tk = turkeyAt(t);
    if (tk && P.depth(tk.p[2]) > 40) { const [sx, sy, tkk] = P.p(...tk.p); FF2.turkey(sx, sy, tkk * TS, t, { shiver: tk.shiver || 0, ang: tk.spin ? Math.sin(tk.spin * Math.PI) * .5 : 0 }); }
    // the boards: F = m·a; turkey thermodynamics; healthy stuffing
    if (inW(t, T.FMA, T.OBSERVE) && vis) { const [bx, by, bk] = W3(HX - 250, 290, Z + 60), w = 270 * bk * (1 - ease(seg(t, T.OBSERVE - .35, T.OBSERVE))), kk = seg(t, T.FMA, T.FMA + 3.2);
      safadiBoard(bx, by, w, kk, t, { kind: 'none', title: 'HIGH STRIKER PHYSICS' });
      chalkOn(bx, by, w, kk, t, (U, d) => {
        chalkTxt('F = m · a', 28 * U, 30 * U, 11 * U, .1, d, '#FFD66B');
        chalkLine([[58 * U, 50 * U], [96 * U, 36 * U]], .35, .55, d, U); chalkLine([[70 * U, 56 * U], [76 * U, 45 * U], [82 * U, 56 * U], [70 * U, 56 * U]], .3, .45, d, U);
        chalkLine([[59 * U, 26 * U], [59 * U, 44 * U], [55 * U, 39 * U], [59 * U, 44 * U], [63 * U, 39 * U]], .55, .7, d, U);
        chalkLine([[93 * U, 31 * U], [93 * U, 19 * U], [89 * U, 24 * U], [93 * U, 19 * U], [97 * U, 24 * U]], .7, .85, d, U, '#FFD66B');
        chalkTxt('BELL!', 81 * U, 22 * U, 6.5 * U, .85, d); chalkTxt('F', 65 * U, 31 * U, 7 * U, .6, d); chalkTxt('(a lever)', 28 * U, 46 * U, 7 * U, .5, d);
      }); }
    if (inW(t, T.ROOTED - .2, T.STUFF - .1) && A.safadi) { const s = S.safadi, bx = A.safadi.head[0] - 17 * s, by = A.safadi.head[1] + 1 * s, w = 22 * s * (1 - ease(seg(t, T.STUFF - .4, T.STUFF - .1))), kk = seg(t, T.ROOTED - .2, T.ROOTED + 3.6);
      safadiBoard(bx, by, w, kk, t, { kind: 'none', title: 'TURKEY SCIENCE' });
      chalkOn(bx, by, w, kk, t, (U, d) => {
        chalkLine([...ellPts(50 * U, 38 * U, 16 * U, 10 * U, 30, Math.PI), [34 * U, 38 * U]], .05, .4, d, U);
        chalkLine([[40 * U, 30 * U], [36 * U, 23 * U], [33 * U, 22 * U]], .3, .4, d, U); chalkLine([[60 * U, 30 * U], [64 * U, 23 * U], [67 * U, 22 * U]], .3, .4, d, U);
        for (let i = 0; i < 3; i++) { const x0 = (34 + i * 16) * U; chalkLine([[x0, 58 * U], [x0 + 2 * U, 54 * U], [x0 - 2 * U, 51 * U], [x0, 48 * U]], .45 + i * .08, .55 + i * .08, d, U, '#FFB25E'); }
        chalkTxt('Q = m · c · ΔT', 50 * U, 22 * U, 7.5 * U, .7, d, '#FFD66B'); chalkTxt('350°F', 84 * U, 40 * U, 6.5 * U, .85, d);
      }); }
    if (inW(t, T.STUFF - .2, T.WORRY) && A.sami) { const s = S.sami, bx = A.sami.head[0] + 17 * s, by = A.sami.head[1] + 1 * s, w = 22 * s * (1 - ease(seg(t, T.WORRY - .4, T.WORRY))), kk = seg(t, T.STUFF - .2, T.STUFF + 1.2);
      samiBoard(bx, by, w, kk, t, { kind: 'none', title: 'HEALTHY STUFFING' });
      const g = i => backOut(seg(t, T.KALE + .1 + i * .62, T.KALE + .45 + i * .62)) * (1 - ease(seg(t, T.WORRY - .4, T.WORRY)));
      chalkOn(bx, by, w, kk, t, (U, d) => {
        const k0 = g(0), k1 = g(1), k2 = g(2);
        if (k0 > 0) { X.save(); X.translate(22 * U, 38 * U); X.scale(k0, k0); for (let i = 0; i < 5; i++) shape(ellPts((i - 2) * 3 * U, -Math.abs(i - 2) * -2 * U - 4 * U, 4.5 * U, 9 * U, 14, (i - 2) * .35), { fill: '#4F9A3E', stroke: '#2E5E24', lwPx: 1.4, smooth: true }); line([[0, 8 * U], [0, -6 * U]], { stroke: '#CFE8B0', lwPx: 2 }); X.restore(); chalkTxt('KALE', 22 * U, 54 * U, 6 * U, 0, 1); }
        if (k1 > 0) { X.save(); X.translate(50 * U, 40 * U); X.scale(k1, k1); shape([[-12 * U, -2 * U], [12 * U, -2 * U], [8 * U, 8 * U], [-8 * U, 8 * U]], { fill: '#C98A5A', stroke: '#7A4E2E', lwPx: 1.4 }); for (let i = 0; i < 16; i++) circle((hash(i * 3.1) - .5) * 20 * U, -3 * U - hash(i * 5.3) * 5 * U, 1.3 * U, { fill: '#F2E2B4', stroke: null }); X.restore(); chalkTxt('QUINOA', 50 * U, 54 * U, 6 * U, 0, 1); }
        if (k2 > 0) { X.save(); X.translate(78 * U, 38 * U); X.scale(k2, k2); shape(rectPts(-2 * U, 0, 4 * U, 9 * U), { fill: '#8FC46A', stroke: '#2E5E24', lwPx: 1.2 }); for (const [dx, dy, r] of [[-5, -2, 5], [5, -2, 5], [0, -6, 6], [-2, 1, 4], [3, 1, 4]]) circle(dx * U, dy * U, r * U, { fill: '#3F8A3A', stroke: '#2E5E24', lwPx: 1.2 }); X.restore(); chalkTxt('BROCCOLI', 78 * U, 54 * U, 6 * U, 0, 1); }
      }); }
    // sound effects (only on hits)
    if (t < T.ACT2) {
      fx('BONK!', FF2.STACK - 10, 150, 72, C.orangeLt, B0.land);
      fx('POOF!', FF2.POPX, POPRIM + 60, 70, '#FFF3C4', B1.land, .9);
      fx('SWISH!', HOLEW[0], 120, 72, '#FFFDF6', HK.land, .9); fx('DING!', HOLEW[0] + 40, 160, 62, C.gold, HK.land + .05, .8);
      fx('SWISH!', HOLEW[0], 120, 72, '#FFFDF6', AK.land, .9); fx('DING!', HOLEW[0] + 40, 160, 62, C.gold, AK.land + .05, .8);
      if (A.safadi && inW(t, RING_OFF, RING_OFF + .8)) sfx('ping!', A.safadi.top[0] - 2 * S.safadi, A.safadi.top[1] - 2 * S.safadi, 46, '#FFFDF6', t - RING_OFF, { life: .8 });
    } else {
      fx('WHAM!', FF2.PADX + 40, 75, 80, '#FFFDF6', SAFHIT, .9); fx('boop.', FF2.RAILX + 70, 120, 50, '#FFFDF6', SAFHIT + 1.15, 1);
      fx('THUD!', HX + 40, 95, 80, C.orangeLt, SAMIFALL[1], 1);
      fx('WHAM!!', FF2.PADX + 40, 85, 100, '#FFE066', KIDHIT, 1);
      fx('DING!', FF2.RAILX + 80, FF2.BELL_Y + 10, 120, '#FFE066', DING, 1.2);
      fx('THUNK!', FF2.DX - 70, 120, 66, '#DFF2FB', T.PRIZE + .75, .9);
      if (A.safadi && inW(t, SAFCATCH, SAFCATCH + .9)) sfx('OOF!', A.safadi.head[0] + 6 * S.safadi, A.safadi.head[1] - 5 * S.safadi, 66, '#DFF2FB', t - SAFCATCH, { life: .9 });
    }
    if (vis && t >= DING && t < T.PRIZE) { const [bx, by] = W3(FF2.RAILX, FF2.BELL_Y); FF2.confetti(t, DING, bx, by, k * .9, 90); FF2.confetti(t, DING + .25, bx, by, k * .7, 50, .8); }
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
      } else callout(l.text, o.edgeX ?? -30, o.edgeY ?? H * .42, age, { ...c, dx: o.edgeX > W / 2 ? -400 : 400, dy: -150 });
    }
  }

  // ---------- cameras: offsets from the mark of the current lane ----------
  const drift = t => [9 * Math.sin(t * .23), 5 * Math.sin(t * .31)];
  const cam = (dx, y, dz, hy, f = 1000) => t => { const [ox, oy] = drift(t); return { x: laneX(t) + dx + ox, y, z: Z - dz, f, hy: hy + oy }; };
  const ESTAB = t => { const u = ease(seg(t, 0, T.WEWIN)); return { x: lerp(650, BX - 260, u), y: lerp(560, 260, u), z: lerp(300, 1100, u), f: 900, hy: lerp(300, 520, u) }; };
  const LANE = cam(-60, 170, 480, 600, 800);                                  // the group, the mark and the game
  const THROW = cam(235, 120, 385, 610);                                      // bean bag: the mark, the board, the pumpkins, the popcorn
  const BOARDC = cam(305, 95, 300, 470);                                     // close on the board
  const GROUP = cam(-250, 120, 295, 640);                                     // the group, the kids in front
  const PROF = cam(-430, 140, 305, 646);                                      // the brothers at the back of the group
  const MARKC = cam(80, 130, 310, 610);                                       // the player on the mark, room beside him
  const FMAC = cam(-140, 140, 330, 612);                                      // the professor on the mark, his board to the left
  const STRIKE = cam(110, 150, 380, 565);                                     // the mark, the pad, the lower tower, the prize table
  const WIDE = cam(-40, 220, 410, 520, 720);                                  // the whole high striker, bell and all
  const TWO = cam(-415, 140, 300, 650);                                       // the brothers and the turkey
  const FINALE = cam(-300, 130, 330, 628);                                    // everyone, the prizes, the turkey
  const TABLEC = t => { const [ox, oy] = drift(t); return { x: FF2.DX - 10 + ox, y: 120, z: Z - 340 + 25 * seg(t, T.PRIZE, T.POTATO), f: 1000, hy: 600 + oy }; };
  const TOWERC = t => { const [ox] = drift(t), u = ease(seg(t, T.TOWER, T.TOWER + 2.6)); return { x: HX + 250 + ox, y: lerp(470, 230, u), z: Z - 420, f: 1000, hy: 540 }; };
  const ROCKETC = t => { const [ox] = drift(t), u = easeOut(seg(t, T.ROCKET - .1, DING + .05)), [sx, sy] = shakeXY(t, 14 * kick(t, DING, 5)); return { x: FF2.TX - 20 + ox + sx * .3, y: lerp(160, 460, u), z: Z - 390, f: 1000, hy: 540 + sy * .3 }; };

  const shot = (camFn, blur, bo, extra) => t => { const r = stage(t, camFn(t), blur); bubbles(t, r.A, r.S, bo); if (extra) extra(t, r); };
  const shaken = (camFn, hits) => t => { const c = camFn(t), a = hits.reduce((m, [h, amt]) => Math.max(m, amt * kick(t, h, 6)), 0), [dx, dy] = shakeXY(t, a); return { ...c, x: c.x + dx * .4, hy: c.hy + dy }; };
  const opening = shot(ESTAB, 0, {}, t => FF2.title(t, .4, T.WEWIN - .1));
  const lane = shot(LANE, .6, { size: 44, far: 220, dy: -190 }, t => FF.card('NEXT GAME: HIGH STRIKER', on(t, T.ACT2 + .1, T.TOWER, .3)));
  const group = shot(GROUP, 1.6, { far: 240, dy: -220, side: { housam: -1, jenna: -1, alma: 1, danny: 1 } });
  const prof = shot(PROF, 1.6, { far: 250, dy: -230, side: { safadi: -1, sami: 1 }, groupDy: -250, edgeX: W + 30 });
  const throwB = shot(shaken(THROW, [[B0.land, 6]]), 1.2, { far: 230, dy: -230, side: { safadi: -1, sami: -1, alma: -1, housam: -1 }, edgeY: H * .3 });
  const boardc = shot(BOARDC, 2.2, {}, t => { sfx('WINNER!', W / 2, 200, 150, '#FFE066', t - T.WIN1 - .1, { life: 1.3 }); FF2.confetti(t, T.WIN1 + .05, W / 2, H * .62, 1, 70); });
  const markShot = shot(MARKC, 1.8, { far: 240, dy: -240, side: { sami: -1 } });
  const fmaShot = shot(FMAC, 1.8, { far: 240, dy: -250, side: { safadi: 1 } });
  const strike = shot(shaken(STRIKE, [[SAFHIT, 10], [SAMIFALL[1], 14], [KIDHIT, 22]]), 1.2, { far: 240, dy: -240, side: { safadi: -1, sami: 1 }, edgeY: H * .3 },
    t => { flash(.55 * kick(t, KIDHIT, 9)); });
  const wide = shot(WIDE, .4, { size: 44, far: 200, dy: -180 }, t => { if (t >= T.WINNER) { FF2.rain(t, on(t, T.WINNER, T.PRIZE, .3)); sfx('WINNER!', W / 2, 170, 160, '#FFE066', t - T.WINNER - .05, { life: 1.6 }); } });
  const towerShot = shot(TOWERC, .6, { edgeY: H * .62, size: 50 });
  const rocket = shot(ROCKETC, .8, {}, t => { flash(.5 * kick(t, DING, 8)); FF2.rain(t, .9 * seg(t, DING + .2, DING + .8)); });
  const tableShot = shot(TABLEC, 1.6, { far: 230, dy: -230, side: { danny: 1, housam: -1, jenna: 1, alma: -1 } });
  const twoShot = shot(TWO, 2, { far: 260, dy: -250, side: { safadi: -1, sami: 1 } });
  const potato = shot(PROF, 1.6, { far: 250, dy: -250, side: { safadi: -1, sami: 1 } });

  // ---------- the ending: everyone, freeze, TO BE CONTINUED, iris on the frosty turkey ----------
  function ending(t) {
    const tt = Math.min(t, T.FREEZE), { A, S, P } = stage(tt, FINALE(tt), .8, { freeze: t > T.FREEZE });
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
    const tk = turkeyAt(T.FREEZE), [tx, ty, tkk] = P.p(...tk.p), cy = ty - 24 * TS * tkk;
    iris(tx, cy, lerp(1500, 0, easeIn(seg(t, T.END - 3.6, T.END - 2.1))));
    const g = ease(seg(t, T.END - 2.7, T.END - 2)) * (1 - ease(seg(t, T.END - .5, T.END)));
    if (g > 0) overlay(() => { X.save(); X.globalAlpha = g; FF2.turkey(tx, ty, tkk * TS, t, { mist: 1 });
      for (let i = 0; i < 4; i++) { const a = t * 1.5 + i * TAU / 4, tw = .5 + .5 * Math.sin(t * 5 + i); shape(starPts(tx + Math.cos(a) * 40 * tkk, cy + Math.sin(a) * 26 * tkk, 9 * tkk * tw + 2, .25, 4, 0), { fill: '#FFFFFF', stroke: null }); }
      X.restore(); });
  }

  scene({ duration: T.END, fps: 24, bpm: 132,              // id, title, dialogue, music: see asset.js
    shots: [
      // the vow, the halo, the rules
      [0, opening], [T.WEWIN, prof], [T.HALO, group], [T.LUCK, prof], [T.RULES, group],
      // bean bag toss
      [T.S1, throwB], [T.STRAIGHT, group], [T.MYTURN, lane], [T.M1, throwB], [T.LIT, markShot],
      [T.HTURN, group], [T.HO, throwB], [T.WATCH, group], [T.AL, throwB], [T.WIN1, boardc], [T.CHEER, group], [T.LUCKB, prof],
      // the high striker
      [T.ACT2, lane], [T.TOWER, towerShot], [T.PHYS, prof], [T.FMA, fmaShot], [T.S2, strike], [T.NOODLE, group], [T.KNEES, strike], [T.MISCAL, wide],
      [T.CANWE, group], [T.KIDS, strike], [T.ROCKET, rocket], [T.WINNER, wide],
      // the frozen turkey
      [T.PRIZE, tableShot], [T.POTATO, potato], [T.PROMISE, twoShot], [T.WORRY, group], [T.SEE, prof], [T.LAUGH, ending],
    ] });
})();
