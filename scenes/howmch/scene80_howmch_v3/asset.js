// Vertical Howmch short, third cut: she notices a shelf price, aims the phone, and gets the dollars.
asset({
  title: 'Howmch Short v3',
  logline: 'Jenna finds a honey jar marked 18,45 KM, points Howmch at the shelf label, and reads $10.37.',
  files: ['scene.js'],
  docs: 'README.md',
  cast: ['jenna'],
  locations: ['family_kitchen'],
  music: {
    prompt: 'Quiet shop room tone. A small chime when the camera locks the price, then a soft set-down as the jar goes into the basket.',
    bpm: 80,
    tonic: 62,
    motif: [0, 2, 4, 2],
    chords: [0, 5],
    sections: [
      { at: 0, energy: .14 },
      { at: 3.3, energy: .18 },
      { at: 6.5, energy: .16 },
      { at: 10.5, energy: .2 },
    ],
    cues: [
      { at: 4.05, type: 'ding' },
      { at: 8.95, type: 'bonk' },
    ],
  },
});
