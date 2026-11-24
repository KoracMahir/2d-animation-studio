// scenes/howmch/scene77_howmch_market/asset.js
asset({
  title: 'Howmch at the Market',
  logline: 'A traveler from Glen reaches Vale, misreads supermarket prices by hand, then lets Howmch show each tag in Crowns.',
  files: ['scene.js'],
  docs: 'README.md',
  cast: ['sarah'],
  locations: [],
  music: {
    prompt: 'Light promotional cartoon: a curious walk into a shop, a worried calculating pulse, then a bright relieved jingle when the phone reads the price.',
    bpm: 112,
    tonic: 67,
    motif: [0, 2, 4, 7, 4, 2, 5, 4],
    chords: [0, 5, 3, 4],
    sections: [
      { at: 0, energy: .34 },
      { at: 6, energy: .5 },
      { at: 13, energy: .4 },
      { at: 18.4, energy: .62 },
      { at: 21.5, energy: .52 },
      { at: 25.2, energy: .8 },
      { at: 29.5, energy: .7 },
    ],
    cues: [
      { at: 7.1, type: 'plip' },
      { at: 8.2, type: 'plip' },
      { at: 9.3, type: 'plip' },
      { at: 10.4, type: 'plip' },
      { at: 18.6, type: 'bonk' },
      { at: 25.3, type: 'ding' },
      { at: 33.2, type: 'harp' },
    ],
  },
});
