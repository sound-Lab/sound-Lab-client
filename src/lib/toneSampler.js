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
    tracks.midiSteps = Array(16).fill(0);
    tracks.stepsMap = codes.map((code) => ({
      name: code,
      steps: Array(64).fill(0),
    }));
  } else {
    tracks.codeName = noteName;
    tracks.midiSteps = Array(64).fill(0);
    tracks.stepsMap = noteName.map((code) => ({
      name: code,
      steps: Array(512).fill(0),
    }));
  }

  return tracks;
}
