import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Tone from 'tone';

import Button from './common/Button';
import SoundBoxMap from './common/SoundBoxMap';

import { initialSteps } from '../lib/toneSampler';
import { noteName } from '../lib/midipath';

Tone.Transport.bpm.value = 120;

function Sequencer({ instrument }) {
  const codesName = noteName.flat();
  const [tracks, setTracks] = useState(initialSteps(codesName));
  const [playing, setPlaying] = useState(false);
  const stepIndex = useRef(0);

  useEffect(() => {
    playing ? Tone.Transport.start() : Tone.Transport.stop();

    return () => {
      Tone.Transport.stop();
    };
  }, [playing]);

  useEffect(() => {
    Tone.Transport.cancel();
    Tone.Transport.scheduleRepeat(handleStart, '32n');
  }, [tracks]);

  function handleStart() {
    tracks.forEach((track, index) => {
      const step = track.steps[stepIndex.current];

      if (step === 1) {
        instrument.triggerAttackRelease(codesName[index], 1);
      }
    });

    stepIndex.current = stepIndex.current === 31 ? 0 : stepIndex.current + 1;
  }

  function handleHat() {
    setPlaying((playing) => !playing);
  }

  const updateStep = useCallback(
    function (codes, stepIndex) {
      const newTracks = [...tracks];

      newTracks[codes].steps[stepIndex] =
        newTracks[codes].steps[stepIndex] === 0 ? 1 : 0;

      setTracks(newTracks);

      instrument.triggerAttackRelease(codesName[codes], 1);
    },
    [tracks, setTracks],
  );

  return (
    <Wrapper>
      <SoundBoxMap tracks={tracks} updateStep={updateStep} />
      <Button
        text={playing ? 'II' : '▶️'}
        onClick={handleHat}
        width={40}
        height={35}
      />
    </Wrapper>
  );
}

Sequencer.propTypes = {
  instrument: PropTypes.any,
};

const Wrapper = styled.div`
  position: fixed;
  right: 0;
  width: 80%;
  height: 35%;
  display: flex;
  margin: 10px 0px 15px 0px;
  background-color: darkblue;
`;

export default React.memo(Sequencer);
