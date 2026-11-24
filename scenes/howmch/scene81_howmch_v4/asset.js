// Vertical Howmch short, fourth cut. The scan is a real frame from the app.
asset({
  title: 'Howmch Short v4',
  logline: 'Jenna sees a $4.25 shelf tag, and the real Howmch camera reads it as KM 7.56.',
  files: ['scene.js'],
  docs: 'README.md',
  cast: ['jenna'],
  locations: ['family_kitchen'],
  music: {
    prompt: 'Quiet shop room tone. A soft set-down when the jar lands in the basket. No melody over the price.',
    bpm: 80,
    tonic: 62,
    motif: [0, 2, 4, 2],
    chords: [0, 5],
    sections: [
      { at: 0, energy: .14 },
      { at: 4, energy: .16 },
      { at: 5.6, energy: .15 },
      { at: 10.4, energy: .2 },
    ],
    cues: [{ at: 6.55, type: 'bonk' }],
  },
});
