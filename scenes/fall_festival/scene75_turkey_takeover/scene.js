// scenes/fall_festival/scene75_turkey_takeover/scene.js: the shot list of "Turkey Takeover", cut to the song brief (song/PROMPT.md:
// 135 s, 128 bpm). Every cut time comes from TT.CUT (timing.js): retime the video there. The TV graphics (LIVE bug, show clock)
// and the karaoke ride on top of every shot except the lead-in daydream and the end card.
(() => {
  const { CUT } = TT;
  const ORDER = Object.keys(CUT).filter(k => k !== 'end').sort((a, b) => CUT[a] - CUT[b]);
  const missing = ORDER.filter(k => !TT_SHOTS[k]);
  if (missing.length) console.warn('scene75: shots not written yet:', missing.join(', '));
  const hudK = t => easeOut(seg(t, CUT.title + .3, CUT.title + .7)) * (1 - easeIn(seg(t, CUT.endCard - .15, CUT.endCard)));
  const wrap = name => (t, lt, dur) => {
    (TT_SHOTS[name] ?? TT_SHOTS.placeholder)(t, lt, dur);
    TT.hud(t, hudK(t));
    if (name !== 'endCard') TT.karaoke(t);
  };
  scene({ duration: CUT.end, fps: 24, bpm: TT.BPM, beatOffset: TT.OFF,   // id, title, music: see asset.js
    shots: ORDER.map(name => [CUT[name], wrap(name)]) });
})();
