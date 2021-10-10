import * as Tone from 'tone';

export function toneSampler(tool) {
  if (!tool) {
    return;
  }

  const sampler = new Tone.Sampler(tool.samplerList).toDestination();
  return sampler;
}

export function initialSteps(codes) {
  if (!codes) {
    return;
  }

  const tracks = codes.flat().map((code) => ({
    name: code,
    steps: Array(32).fill(0),
  }));

  return tracks;
}
