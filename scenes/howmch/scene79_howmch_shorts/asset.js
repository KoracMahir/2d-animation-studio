// Vertical Howmch short: a Bosnian shelf price, then the camera reads it in dollars.
asset({
  title: 'Howmch Short',
  logline: 'A close look at an 18,45 KM shelf label, then Howmch shows $10.37 while the camera stays on that label.',
  files: ['scene.js'],
  docs: 'README.md',
  cast: ['housam', 'jenna'],
  locations: ['family_kitchen'],
  music: {
    prompt: 'Quiet shop ambience: soft room tone, a little warmth, no melody over the price. One small focus chime when the camera locks the amount.',
    bpm: 84,
    tonic: 62,
    motif: [0, 2, 4, 2],
    chords: [0, 5],
    sections: [
      { at: 0, energy: .16 },
      { at: 3.4, energy: .2 },
      { at: 4.6, energy: .22 },
      { at: 9, energy: .18 },
      { at: 13, energy: .24 },
    ],
    cues: [{ at: 4.65, type: 'ding' }],
  },
});
