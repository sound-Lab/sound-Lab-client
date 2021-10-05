import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Tone from 'tone';

import Button from '../common/Button';

const drums = new Tone.Sampler({
  a0: 'https://soundlabsample.s3.ap-northeast-2.amazonaws.com/Crash01.wav',
  b0: 'https://soundlabsample.s3.ap-northeast-2.amazonaws.com/HfHat.wav',
  c0: 'https://soundlabsample.s3.ap-northeast-2.amazonaws.com/OpHat01.wav',
  d0: 'https://soundlabsample.s3.ap-northeast-2.amazonaws.com/Snr01.wav',
  e0: 'https://soundlabsample.s3.ap-northeast-2.amazonaws.com/Tom01.wav',
  f0: 'https://soundlabsample.s3.ap-northeast-2.amazonaws.com/clap.wav',
  g0: 'https://soundlabsample.s3.ap-northeast-2.amazonaws.com/Kick03.wav',
}).toDestination();

const trackIndex = ['a0', 'b0', 'c0', 'd0', 'e0', 'f0', 'g0'];
const tracks = ['Crash', 'HfHat', 'OpHat', 'Snare', 'Tom', 'Clap', 'Kick'];
Tone.Transport.bpm.value = 80;

function generateSteps() {
  const steps = Array(16).fill(0);

  return steps;
}

const initialSteps = tracks.map((sound) => ({
  name: sound,
  steps: generateSteps(),
}));

function Drum() {
  const [playing, setPlaying] = useState(false);
  const [tracks, setTracks] = useState(initialSteps);
  const [currentIndex, setCurrentIndex] = useState(0);
  const stepIndex = useRef(0);

  useEffect(() => {
    playing ? Tone.Transport.start() : Tone.Transport.stop();
  }, [playing]);

  useEffect(() => {
    Tone.Transport.cancel();
    Tone.Transport.scheduleRepeat(handleStart, '16n');
  }, [tracks]);

  function handleStart() {
    tracks.forEach((track, index) => {
      const step = track.steps[stepIndex.current];

      if (step === 1) {
        drums.triggerAttack(trackIndex[index]);
      }
    });

    stepIndex.current = stepIndex.current === 15 ? 0 : stepIndex.current + 1;
    setCurrentIndex(stepIndex.current);
  }

  function handleHat() {
    setPlaying((playing) => !playing);
  }

  const updateStep = useCallback(
    function (trackIndex, stepIndex) {
      const newTracks = [...tracks];

      newTracks[trackIndex].steps[stepIndex] =
        newTracks[trackIndex].steps[stepIndex] === 0 ? 1 : 0;

      setTracks(newTracks);
    },
    [tracks, setTracks],
  );

  return (
    <>
      <Wrapper>
        <DrumColumns>
          {tracks.map((track, index) => {
            return (
              <DrumColumnBox key={index} id={track}>
                {track.name}
              </DrumColumnBox>
            );
          })}
        </DrumColumns>
        <DrumRows>
          {tracks.map((track, index) => {
            return (
              <div key={`track-${index}`}>
                {track.steps.map((s, stepIndex) => {
                  return (
                    <DrumRowBox
                      key={`step-${index}-${stepIndex}`}
                      id={`step-${index}-${stepIndex}`}
                      onClick={() => {
                        updateStep(index, stepIndex);
                      }}
                      className={
                        s === 0 || currentIndex === stepIndex
                          ? 'is-currentIndex'
                          : 'is-active'
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </DrumRows>
        <Button
          text={playing ? 'II' : '▶️'}
          onClick={handleHat}
          width={40}
          height={35}
        />
        <Button text={'Add'} onClick={handleHat} width={40} height={35} />
      </Wrapper>
    </>
  );
}

Drum.propTypes = {
  data: PropTypes.array,
};

const Wrapper = styled.div`
  display: flex;
  align-content: space-between;
  margin: 20px;
  background-color: darkblue;
`;

const DrumColumns = styled.ul`
  display: grid;
  width: 10%;
  margin-right: 10px;
`;

const DrumColumnBox = styled.div`
  width: 100%;
  background-color: white;
  border: solid 0.01em;
  border-color: ${({ theme }) => theme.MainColors.navyBlue};
`;

const DrumRows = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  div {
    display: flex;
    flex-direction: row;
    border: solid 0.01em;
    border-color: ${({ theme }) => theme.MainColors.navyBlue};
    width: 100%;
    height: 100%;
  }
`;

const DrumRowBox = styled.div`
  background-color: white;
  cursor: 'pointer';
`;

export default Drum;
