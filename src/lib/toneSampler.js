import * as Tone from 'tone';

export function toneSampler(tool) {
  if (!tool.length) {
    return;
  }

  const instrumentList = [...tool];

  const sampler = instrumentList.map((sound) => {
    const newSound = {};
    newSound[sound.name] = new Tone.Sampler(sound.samplerList).toDestination();

    return newSound;
  });

  return sampler;
}

function Tracks(tracks) {
  this.codeName = tracks.codeName;
  this.bars = tracks.bars || Array(16).fill(0);
  this.steps =
    tracks.steps ||
    tracks.codes.map((code) => ({
      name: code,
      step: Array(64).fill(0),
    }));
}

function TracksFactory() {}

TracksFactory.prototype.tracksClass = Tracks;
TracksFactory.prototype.createSteps = function (tracks) {
  return new this.tracksClass(tracks);
};

const stepsFactory = new TracksFactory();

export function initialSteps(instrument) {
  if (!instrument) {
    return;
  }

  const { codes } = instrument[0];
  if (instrument[0].name === 'piano') {
    const pianoCode = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
    const tracks = stepsFactory.createSteps({
      codeName: pianoCode,
      type: instrument[0].name,
      codes: pianoCode,
    });

    return tracks;
  }

  const tracks = stepsFactory.createSteps({
    codeName: codes,
    type: instrument[0].name,
    codes,
  });

  return tracks;
}
