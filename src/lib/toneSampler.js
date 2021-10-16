import { noteName } from './midipath';
import * as Tone from 'tone';

export function toneSampler(tool) {
  if (!tool) {
    return;
  }

  const sampler = new Tone.Sampler(tool.samplerList).toDestination();
  return sampler;
}

export function initialSteps(instrument) {
  if (!instrument) {
    return;
  }

  const tracks = {};
  const { name, codes } = instrument;

  if (name === 'drum') {
    tracks.codeName = codes;
    tracks.stepsMap = codes.map((code) => ({
      name: code,
      steps: Array(16).fill(0),
    }));
  } else {
    tracks.codeName = noteName.flat();
    tracks.stepsMap = noteName.flat().map((code) => ({
      name: code,
      steps: Array(32).fill(0),
    }));
  }

  return tracks;
}
