import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Tone from 'tone';

import { updateStep } from '../modules/mixEditor';

import Button from './common/Button';

function StepSequencer() {
  const { tracks, currentTrack, bpm, repeat, sampler } = useSelector(
    (state) => state.mixEditor,
  );
  const newTrack = tracks[currentTrack];
  const { codeName, stepsMap, midiSteps } = newTrack;
  const [playing, setPlaying] = useState(false);
  const [partToggle, setPartToggle] = useState('A');
  const stepIndexRef = useRef(0);
  const dispatch = useDispatch();

  Tone.Transport.bpm.value = bpm;

  useEffect(() => {
    playing ? Tone.Transport.start() : Tone.Transport.stop();
    Tone.Transport.clear();
    return () => {
      Tone.Transport.stop();
    };
  }, [playing]);

  useEffect(() => {
    Tone.Transport.cancel();
    Tone.Transport.scheduleRepeat(handleStart, '16n');
  }, [playing]);

  function handleStart() {
    stepsMap.forEach((track, index) => {
      const step = track.steps[stepIndexRef.current];

      if (step === 1) {
        sampler[currentTrack].triggerAttackRelease(codeName[index]);
      }
    });

    if (stepIndexRef.current >= 32) {
      setPartToggle('B');
    }

    if (stepIndexRef.current < 32) {
      setPartToggle('A');
    }

    stepIndexRef.current =
      stepIndexRef.current === repeat ? 0 : stepIndexRef.current + 1;
  }

  function updateStepTrack(codes, stepIndex) {
    const newMidiStep = [...midiSteps];
    const newStep = [...stepsMap];
    let setIndexSet = stepIndex;

    if (partToggle === 'B') {
      setIndexSet = setIndexSet + 32;
    }

    const midiBox = Math.ceil(setIndexSet / 4);
    newMidiStep[midiBox] = 1;

    newStep[codes].steps[setIndexSet] =
      newStep[codes].steps[setIndexSet] === 0 ? 1 : 0;

    sampler[currentTrack].triggerAttackRelease(codeName[codes], 1);

    newTrack.midiSteps = newMidiStep;
    dispatch(updateStep({ currentTrack, newTrack }));
  }

  function togglePart() {
    setPartToggle((part) => (part === 'A' ? 'B' : 'A'));
  }

  function handleHat() {
    setPlaying((playing) => !playing);
  }

  function resetStep() {
    const resetMidiStep = Array(16).fill(0);
    const resetStep = [...stepsMap];

    resetStep.forEach((codeSteps) => {
      codeSteps.steps = [];
      codeSteps.steps = Array(64).fill(0);
    });

    newTrack.midiSteps = resetMidiStep;
    dispatch(updateStep({ currentTrack, newTrack }));
  }

  return (
    <Wrapper>
      <ButtonContainer>
        <Button
          text={playing ? 'II' : '▶️'}
          onClick={handleHat}
          width={40}
          height={35}
        />
        <Button
          text={partToggle === 'A' ? 'A' : 'B'}
          onClick={togglePart}
          width={40}
          height={35}
        />
        <Button text={'reset'} onClick={resetStep} width={40} height={35} />
      </ButtonContainer>
      <SoundBoxContainer>
        {stepsMap &&
          stepsMap.map((track, index) => {
            const stepPart =
              partToggle === 'A'
                ? track.steps.slice(0, 32)
                : track.steps.slice(32, 64);

            return (
              <div key={`track-${index}`}>
                {stepPart.map((step, stepIndex) => (
                  <SoundBox
                    key={`step-${index}-${stepIndex}`}
                    id={`step-${index}-${stepIndex}`}
                    onClick={() => {
                      updateStepTrack(index, stepIndex);
                    }}
                    className={step === 0 ? null : 'is-active'}
                  />
                ))}
              </div>
            );
          })}
      </SoundBoxContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  margin: 20px;
  background-color: #33393e;
`;

const ButtonContainer = styled.ul`
  width: 10%;
  margin-right: 10px;
`;

const SoundBoxContainer = styled.div`
  width: 100vh;
  height: 100vh;

  div {
    width: 980px;
    height: 30px;
    display: flex;
    border: solid 3px #33393e;
  }
`;

const SoundBox = styled.div`
  background-color: #ffffffc5;
  border-radius: 50%;
  cursor: pointer;

  @keyframes scaleUp {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.2, 1.2);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes scaleDown {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(0.8, 0.8);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  &:hover {
    background: ${({ theme }) => theme.mainColor.surfieGreen};
    animation-name: scaleDown;
    animation-duration: 0.15s;
  }

  &.is-active {
    background: ${({ theme }) => theme.mainColor.orangeRed};
    animation-name: scaleUp;
    animation-duration: 0.15s;
  }
`;

export default React.memo(StepSequencer);
