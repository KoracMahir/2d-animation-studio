// scenes/fall_festival/scene75_turkey_takeover/timing.js: THE TIMING TABLE of "Turkey Takeover" (the music-video finale of
// Fall Festival). Every cut (CUT), every shouted hit (HIT), every chorus answer (YES, CALL) and every sung word (LYRICS) lives
// here and nowhere else.
//
// The picture was animated first to the song brief (song/PROMPT.md), then RE-FITTED to the recording (audio.mp3, made with
// Gemini): the song came out at a steady 130 bpm (not 128), first downbeat 0.175 s, bar = 1.846 s, and its form differs from
// the brief (see README.md, "How the song differs from the brief"). Times are seconds in audio.mp3, measured from Whisper
// (large-v3) word timestamps and the vocal-band energy of the recording; B(n) is bar n of the song's own grid.
//
// Namespace: everything in this scene hangs off TT (one global scope for every file: see README.md at the repo root).
const TT = (() => {
  const BPM = 130, OFF = 0.175, BEAT = 60 / BPM, BAR = 4 * BEAT;       // 0.4615 s · 1.846 s
  const B = n => OFF + n * BAR, b = n => OFF + n * BEAT;               // bar n / beat n (both may be fractional)
  const bpos = t => (t - OFF) / BEAT;                                  // beat position (float)
  const beatK = (t, d = 7) => Math.exp(-frac(bpos(t)) * BEAT * d);     // 1 on every beat, decaying
  const barK = (t, d = 4) => Math.exp(-frac(bpos(t) / 4) * BAR * d);   // 1 on every downbeat, decaying
  const D = 27 * BAR;                                                  // chorus 2 is chorus 1 exactly 27 bars later (49.85 s)

  // ---------- the shots, in order (start times in seconds; the next one's start is this one's end) ----------
  const CH1 = { Stuff: 23.92, Baste: 25.3, Golden: 26.4, Chop: 27.75, Stir: 28.9, Heard: 29.9, Stuff2: 31.4, Baste2: 32.55, Quad: 33.25, Hands: 35.15, Fuss: 36.8 };
  const CUT = {
    // intro (bars 0–3): the announcer speaks over the daydream; the beat starts on bar 1
    daydream: 0, title: B(1), entrance: B(3),
    // verse 1 (bars 4–12): six lines, an instrumental bar (the 2×2), "Everybody to your stations", YES, CHEF!
    cardProf: 7.4, cardDoc: 9.12, science: 11.05, healthy: 12.88, stationsA: 14.9, stationsB: 16.72, stationsAll: 18.6, toStations: 19.95, yesChef1: 22.1,
    // chorus 1 (bars 13–20)
    ...Object.fromEntries(Object.entries(CH1).map(([k, v]) => ['c1' + k, v])),
    // inspection (bars 21–26): the beat drops out for "Wait. What is THIS?", FROZEN!, Sorry, Chef!, the crowd cheers
    inspect: 38.6, frozen: 43.85, sorry: 44.85, crowdFix: 46.3,
    // verse 2 (bars 27–33): one guest a line; then the song breathes (bars 34–36) and repeats its last line slowly (37–39)
    neptune: 48.15, dragonOven: 51.45, fester: 53.55, pearlJudge: 55.2, drgRules: 56.85, roudCode: 58.8, brigade: 61.0,
    helpers: 62.9, brigade2: 68.5, yesChef2: 71.75,
    // chorus 2 (bars 40–47)
    ...Object.fromEntries(Object.entries(CH1).map(([k, v]) => ['c2' + k, v + D])),
    // kitchen rush (bars 48–53)
    rChop: 88.3, rStir: 88.82, rBaste: 89.55, rTaste: 90.5, montage: 92.0, ready: 97.55,
    // the build (bars 54–60): four lines, the countdown, one held bar of near silence
    bStuffing: 99.4, bDial: 101.2, bDoor: 103.15, bScience: 104.95, countdown: 107.1,
    // the drop (bars 61–68): bar 61 is the DING and the TURKEY! screams; the final chorus runs bars 62–68, a line a bar
    ding: 112.75, golden2: 114.42, beauty: 116.82, nailed: 118.2, parade: 119.92, golden3: 121.92, team: 123.78, dream: 125.5,
    // the verdict and the ending (bars 69–71), then the last hit and its tail
    judges: 127.2, explain: 128.9, feast: 130.88, endCard: 132.1,
    end: 135,
  };

  // ---------- the hits (seconds): shouts, sound effects and graphics pinned to them ----------
  const HIT = {
    announcer: 0.05, TURKEY: b(8), TAKE: b(10), OVER: b(11), bell: [5.75, 5.98], cook: 6.12,   // 3.87 · 4.79 · 5.25
    stations: 19.96, yes1: 22.3,
    wait: 39.0, what: 39.72, its: 42.15, FROZEN: 43.88, sorry: 44.9, fix: 46.4,
    splash: 50.4, roar: 52.5, bonk: 54.6,
    rules: [58.3, 58.5, 58.7],                                          // Dr. G's one, two, three (sung fast)
    guest: 69.9, yes2: 71.9, best: 72.8,
    rush: [88.35, 88.85, 90.18, 90.5],                                  // CHOP! STIR! … BASTE! TASTE! (the chefs)
    rush2: [92.0, 92.92, 93.87, 94.33, 94.79, 95.25, 95.72, 96.63],     // the montage cuts; the kids sing on cuts 2–5, YEAH! on 6
    count: [107.22, 107.62, 108.46, 109.1, 110.02],                     // FIVE FOUR THREE TWO ONE
    hold: 110.95,                                                       // the held bar before the DING
    DING: B(61), TURKEY2: 113.5,                                        // 112.79
    drumroll: 127.25, perfect: 128.2, explain: 128.95, eat: 130.2, happy: 130.95, final: 132.1,
  };
  // The chorus answers. YES: the kids' YES, CHEF! inside an order shot (absent = the song has no answer there).
  // CALL: the two orders and two answers of a final-chorus call bar [order 1, yes 1, order 2, yes 2].
  const Y1 = { Stuff: 24.55, Baste: 25.98, Chop: 28.24, Stuff2: 31.95 };
  const YES = { ...Object.fromEntries(Object.entries(Y1).map(([k, v]) => ['c1' + k, v])), ...Object.fromEntries(Object.entries(Y1).map(([k, v]) => ['c2' + k, v + D])) };
  const CALL = { golden2: [114.47, 115.03, 115.78, 116.37], nailed: [118.25, 118.7, 119.15, 119.55], golden3: [121.96, 122.4, 122.87, 123.26] };
  const yesTimes = [...Object.values(YES), ...Object.values(CALL).flatMap(c => [c[1], c[3]]), HIT.yes1, HIT.yes2].sort((x, y) => x - y);
  const orderTimes = [...['Stuff', 'Baste', 'Chop', 'Stir', 'Stuff2', 'Baste2'].flatMap(k => [CUT['c1' + k], CUT['c2' + k]]), ...Object.values(CALL).flatMap(c => [c[0], c[2]])].sort((x, y) => x - y);

  // ---------- the karaoke: one row per line [first word, last word, line end, who, text] ----------
  // Words between pins are spread by length; "WORD@t" pins a word to t; a word starting with ~ is the kids' answer
  // (coloured as kids inside a chefs' line). who = ann | prof | doc | chefs | kids | all | pearl.
  // The words are what the recording sings (Whisper, checked against the brief where it mishears).
  const f = x => x.toFixed(2);
  const chorus = o => [
    [23.95 + o, 24.8 + o, 25.25 + o, 'chefs', `Stuff@${f(23.95 + o)} it! ~YES,@${f(24.55 + o)} ~CHEF!@${f(24.8 + o)}`],
    [25.35 + o, 26.14 + o, 26.38 + o, 'chefs', `Baste@${f(25.35 + o)} it! ~YES,@${f(25.98 + o)} ~CHEF!@${f(26.14 + o)}`],
    [26.42 + o, 27.52 + o, 27.72 + o, 'chefs', `Golden on the outside, come@${f(27.14 + o)} and taste it!`],
    [27.78 + o, 28.5 + o, 28.88 + o, 'chefs', `Chop@${f(27.78 + o)} it! ~YES,@${f(28.24 + o)} ~CHEF!@${f(28.5 + o)}`],
    [28.95 + o, 29.15 + o, 29.4 + o, 'chefs', 'Stir it!'],
    [29.45 + o, 31.16 + o, 31.38 + o, 'chefs', `Turkey takeover,@${f(29.8 + o)} everybody@${f(30.38 + o)} heard it!`],
    [31.42 + o, 32.18 + o, 32.5 + o, 'chefs', `Stuff@${f(31.42 + o)} it! ~YES,@${f(31.95 + o)} ~CHEF!@${f(32.18 + o)}`],
    [32.6 + o, 32.8 + o, 33.2 + o, 'kids', 'Oh yeah!'],
    [33.3 + o, 34.9 + o, 35.12 + o, 'chefs', `Crispy, juicy,@${f(33.74 + o)} nobody@${f(34.16 + o)} can waste it!`],
    [35.2 + o, 36.44 + o, 36.8 + o, 'chefs', `Hands up high if@${f(35.8 + o)} you're cooking with us,`],
    [36.86 + o, 38.28 + o, (o ? 38.32 : 38.58) + o, 'chefs', `turkey takeover,@${f(37.18 + o)} no@${f(37.72 + o)} fuss, no@${f(38.18 + o)} fuss!`],
  ];
  const callRow = (c, w1, w2, end) => [c[0], c[3] + .24, end, 'chefs', `${w1.replace(/^(\S+)/, `$1@${f(c[0])}`)} ~YES,@${f(c[1])} ~CHEF!@${f(c[1] + .25)} ${w2.replace(/^(\S+)/, `$1@${f(c[2])}`)} ~YES,@${f(c[3])} ~CHEF!`];
  const RAW = [
    [HIT.announcer, 1.26, 1.9, 'ann', 'Live from the Safadi kitchen!'],
    [HIT.TURKEY, HIT.OVER, 5.9, 'kids', `TURKEY!@${f(HIT.TURKEY)} TAKE!@${f(HIT.TAKE)} OVER!@${f(HIT.OVER)}`],
    [HIT.cook, 6.5, 7.2, 'chefs', "Let's cook!"],
    // verse 1
    [7.38, 8.76, 9.02, 'prof', 'Aprons on, the clock is ticking, hear the kitchen roar,'],
    [9.08, 10.56, 10.95, 'doc', "last time we burned the turkey, now we're back for more!"],
    [11.08, 12.42, 12.8, 'prof', "I'm the chef of science, every gram is weighed,"],
    [12.86, 14.42, 14.85, 'doc', "I'm the chef of healthy, and the stuffing's freshly made!"],
    [14.9, 16.2, 16.6, 'prof', 'Housam on the chopping board, Danny@15.76 on the pans,'],
    [16.7, 17.96, 18.5, 'doc', 'Alma on the spices, Jenna,@17.42 wash your hands!'],
    [HIT.stations, 21.68, 22.1, 'chefs', 'Everybody to your stations,@20.82 do@21.26 it right away!'],
    [22.28, 23.58, 23.88, 'chefs', "~YES,@22.28 ~CHEF!@22.54 That's@23.00 the turkey way!"],
    ...chorus(0),
    // inspection
    [HIT.wait, 40.08, 40.7, 'prof', `Wait.@${f(HIT.wait)} What@${f(HIT.what)} is THIS?`],
    [HIT.its, HIT.FROZEN, 44.5, 'doc', `It's…@${f(HIT.its)} FROZEN!@${f(HIT.FROZEN)}`],
    [44.6, 45.75, 46.3, 'kids', 'Sorry,@44.60 Chef!@45.75'],
    // verse 2
    [49.44, 51.14, 51.45, 'prof', 'Neptune, wash@50.10 that turkey with a rainbow wave,'],
    [51.52, 53.06, 53.5, 'doc', "Dragon, you're the oven: give@52.52 it flame, be brave!"],
    [53.62, 55.02, 55.2, 'prof', 'Fester, juggle onions, keep@54.50 them in the air,'],
    [55.24, 56.62, 56.85, 'doc', 'Princess Pearl is judging with a royal stare!'],
    [56.88, HIT.rules[2], 58.82, 'prof', `Doctor G has rules for us: one,@${f(HIT.rules[0])} two,@${f(HIT.rules[1])} three,@${f(HIT.rules[2])}`],
    [58.86, 60.4, 60.9, 'doc', 'Roudaynah wrote the recipe in code,@60.10 for free!'],
    [61.0, 62.34, 62.9, 'chefs', "Everybody's cooking and nobody's@61.84 a guest!"],
    [68.85, 71.04, 71.6, 'chefs', `Everybody's cooking@69.28 and nobody's@${f(HIT.guest)} a guest!@71.04`],
    [71.88, 73.46, 73.75, 'chefs', `~YES,@71.88 ~CHEF!@72.33 This@${f(HIT.best)} turkey is the best!`],
    ...chorus(D),
    // kitchen rush
    [HIT.rush[0], HIT.rush[1], 89.6, 'chefs', `CHOP!@${f(HIT.rush[0])} STIR!@${f(HIT.rush[1])}`],
    [HIT.rush[2], HIT.rush[3], 91.4, 'chefs', `BASTE!@${f(HIT.rush[2])} TASTE!@${f(HIT.rush[3])}`],
    [93.4, 93.55, 93.82, 'chefs', 'TASTE!'],
    [HIT.rush2[2], HIT.rush2[5], 95.68, 'kids', ['Chop!', 'Stir!', 'Baste!', 'Taste!'].map((w, i) => `${w}@${f(HIT.rush2[2 + i])}`).join(' ')],
    [HIT.rush2[6], HIT.rush2[6] + .2, 96.9, 'all', 'YEAH!'],
    // the build
    [99.6, 101.06, 101.2, 'doc', 'Stuffing going in now: bread@100.44 and herbs and love,'],
    [101.22, 102.84, 103.15, 'prof', 'three-fifty on@101.58 the dial,@102.06 not@102.36 one degree above!'],
    [103.18, 104.62, 104.95, 'doc', 'Close the oven door now, everybody@104.42 shout,'],
    [105.0, 106.62, 107.05, 'prof', "science says it's ready when the timer runs out!"],
    ...['FIVE!', 'FOUR!', 'THREE!', 'TWO!', 'ONE!'].map((w, i) => [HIT.count[i], HIT.count[i] + .2, (HIT.count[i + 1] ?? 110.9) - .06, 'all', w]),
    // the drop: the DING and two TURKEY! screams own bar 61, then seven lines on bars 62–68
    [HIT.DING, HIT.TURKEY2, 114.3, 'all', `TURKEY!@${f(HIT.DING)} TURKEY!@${f(HIT.TURKEY2)}`],
    callRow(CALL.golden2, 'Golden!', 'Juicy!', 116.82),
    [116.9, 117.78, 118.15, 'chefs', 'Look at that turkey, what@117.56 a beauty!'],
    callRow(CALL.nailed, 'Stuffed it!', 'Nailed it!', 119.88),
    [119.95, 121.68, 121.9, 'chefs', 'Turkey takeover, and@120.92 we never failed it!'],
    callRow(CALL.golden3, 'Golden!', 'Juicy!', 123.75),
    [123.82, 125.14, 125.48, 'all', 'Hands up high, we@124.44 did it as a team,'],
    [125.54, 126.86, 127.2, 'all', 'turkey takeover, living@126.45 the dream!'],
    // the verdict
    [127.3, HIT.perfect, 128.85, 'pearl', `It@127.30 is…@127.42 PERFECT!@${f(HIT.perfect)}`],
    [128.92, 129.63, 130.1, 'prof', 'Allow me to explain…'],
    [HIT.eat, HIT.eat + .2, 130.85, 'kids', 'NO!'],
    [HIT.happy, 131.35, 132.05, 'all', `Happy@${f(HIT.happy)} Thanksgiving!@131.35`],
  ];
  const LYRICS = RAW.map(([t0, t1, end, who, text]) => {
    const toks = text.split(' ').map(s => { let kid = false; if (s[0] === '~') { kid = true; s = s.slice(1); } const m = s.match(/^(.*)@([\d.]+)$/); return m ? { w: m[1], at: +m[2], kid } : { w: s, kid }; });
    toks[toks.length - 1].at ??= t1; toks[0].at ??= t0;
    for (let i = 0; i < toks.length - 1;) {
      let j = i + 1; while (toks[j].at === undefined) j++;
      const span = toks.slice(i, j), wt = span.map(o => o.w.length + 1), tot = wt.reduce((a, c) => a + c, 0);
      let acc = 0; span.forEach((o, k) => { if (k) o.at = toks[i].at + (toks[j].at - toks[i].at) * acc / tot; acc += wt[k]; });
      i = j;
    }
    return [end, who, toks.map(o => [o.at, o.w, o.kid])];
  });

  return { BPM, OFF, BEAT, BAR, B, b, bpos, beatK, barK, CUT, HIT, YES, CALL, yesTimes, orderTimes, LYRICS };
})();
