// scenes/birthday/scene70_nine_moves/scene.js: the shot list of "Nine Moves", cut to audio.mp3 (131.7 s, 120 bpm, first downbeat 0.305 s).
// Every cut time comes from N9.CUT (kit.js): retime the video there. The DANCE POWER meter and the karaoke ride on top of every shot.
(() => {
  const { CUT, meter } = N9;
  const ORDER = ['curtain', 'entrance', 'm1', 'm2', 'm3', 'chorus1', 'dj', 'm4', 'm5', 'm6', 'chorus2', 'danceBreak', 'm7', 'm8', 'build', 'nine', 'everybody', 'finalPose'];
  const hud = fn => (t, lt, dur) => { fn(t, lt, dur); meter(t, { k: easeOut(seg(t, 6.3, 6.7)) * (1 - seg(t, CUT.finalPose + .8, CUT.finalPose + 1)) }); n9Karaoke(t); };
  scene({ duration: CUT.end, fps: 24, bpm: N9.BPM, beatOffset: N9.OFF,   // id, title, music: see asset.js
    shots: ORDER.map(name => [CUT[name], hud(N9_SHOTS[name])]) });
})();
