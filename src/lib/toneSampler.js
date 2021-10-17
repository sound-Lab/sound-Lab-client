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

export function initialSteps(instrument) {
  if (!instrument) {
    return;
  }

  const tracks = {};
  const { codes } = instrument[0];

  tracks.codeName = codes;
  tracks.midiSteps = Array(16).fill(0);
  tracks.stepsMap = codes.map((code) => ({
    name: code,
    steps: Array(64).fill(0),
  }));

  return tracks;
}
