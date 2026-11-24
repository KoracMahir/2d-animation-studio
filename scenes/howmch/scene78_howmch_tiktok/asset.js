// scenes/howmch/scene78_howmch_tiktok/asset.js
asset({
  title: 'Howmch, vertical',
  logline: 'Housam and Jenna reach Vale Market. Sticky notes get the cart wrong. Howmch reads the cheese tag live in Glen Crowns.',
  files: ['scene.js'],
  docs: 'README.md',
  cast: ['housam', 'jenna'],
  locations: ['family_kitchen'],
  music: {
    prompt: 'Bright vertical-ad cartoon: a curious shop entrance, a worried counting pulse, then a clean relieved chime when the phone reads the price.',
    bpm: 116,
    tonic: 69,
    motif: [0, 4, 7, 4, 2, 5, 4, 0],
    chords: [0, 5, 3, 4],
    sections: [
      { at: 0, energy: .36 },
      { at: 5.5, energy: .52 },
      { at: 11.5, energy: .42 },
      { at: 16.2, energy: .64 },
      { at: 18.2, energy: .55 },
      { at: 21.4, energy: .82 },
      { at: 24, energy: .7 },
    ],
    cues: [
      { at: 6.2, type: 'plip' },
      { at: 7.1, type: 'plip' },
      { at: 8.0, type: 'plip' },
      { at: 8.9, type: 'plip' },
      { at: 16.4, type: 'bonk' },
      { at: 21.5, type: 'ding' },
      { at: 26.2, type: 'harp' },
    ],
  },
});
