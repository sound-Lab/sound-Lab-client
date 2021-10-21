import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Tone from 'tone';

import { updateStep, upCurrentPart } from '../modules/mixEditor';

import Button from './common/Button';

function StepSequencer() {
  const { tracks, isPlaying, currentTrack, bpm, repeat, sampler, currentPart } =
    useSelector((state) => state.mixEditor);
  const [startProgressBar, setStartProgressBar] = useState(false);
  const [progressTime, setProgressTime] = useState(8);
  const dispatch = useDispatch();

  const newTrack = tracks[currentTrack];
  const { codeName, stepsMap, midiSteps, name } = newTrack;

  Tone.Transport.bpm.value = bpm;

  useEffect(() => {
    if (isPlaying) {
      setStartProgressBar(true);
    }

    return () => {
      setStartProgressBar(false);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    setProgressTime((60 / bpm) * 8);
    setInterval(setStartProgressBar(true), progressTime);
  }, [startProgressBar, bpm, repeat]);

  function updateStepTrack(codes, stepIndex) {
    const newMidiStep = [...midiSteps];
    const newStep = [...stepsMap];
    let setIndexSet = stepIndex;

    if (currentPart === 'B') {
      setIndexSet = setIndexSet + 32;
    }

    newStep[codes].steps[setIndexSet] =
      newStep[codes].steps[setIndexSet] === 0 ? 1 : 0;

    const midiBox = Math.floor(setIndexSet / 4);

    const targetMidi = [];
    newStep.map((note) => {
      const { steps } = note;
      const targetSteps = steps.slice(midiBox * 4, midiBox * 4 + 4);

      return targetMidi.push(...targetSteps);
    });

    if (targetMidi.indexOf(1) >= 0) {
      newMidiStep[midiBox] = 1;
    } else {
      newMidiStep[midiBox] = 0;
    }

    sampler[name].triggerAttackRelease(codeName[codes], 1);

    newTrack.midiSteps = newMidiStep;

    dispatch(updateStep({ currentTrack, newTrack }));
  }

  function togglePart() {
    const part = currentPart === 'A' ? 'B' : 'A';
    dispatch(upCurrentPart(part));
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
    <>
      <Header />
      <Wrapper>
        <ButtonContainer>
          <Button
            text={currentPart}
            onClick={togglePart}
            width={100}
            height={35}
          />
          <Button text={'reset'} onClick={resetStep} width={100} height={35} />
        </ButtonContainer>
        <Sequencer>
          <ProgressBarContainer>
            {startProgressBar && isPlaying && (
              <ProgressBar time={progressTime} />
            )}
          </ProgressBarContainer>

          {stepsMap &&
            stepsMap.map((track, index) => {
              const stepPart =
                currentPart === 'A'
                  ? track.steps.slice(0, 32)
                  : track.steps.slice(32, 64);

              return (
                <SoundBox key={`track-${index}`}>
                  {stepPart.map((step, stepIndex) => {
                    return (
                      <div
                        key={`step-${index}-${stepIndex}`}
                        id={`step-${index}-${stepIndex}`}
                        onClick={() => {
                          updateStepTrack(index, stepIndex);
                        }}
                        className={step === 0 ? null : 'is-active'}
                      />
                    );
                  })}
                </SoundBox>
              );
            })}
        </Sequencer>
      </Wrapper>
    </>
  );
}
const Header = styled.div`
  width: 100%;
  height: 10px;
  box-sizing: content-box;
  border-top: solid 1px #ffffff26;
  border-bottom: solid 1px #ffffff26;
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  background-color: #0000008d;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
  border-right: solid 1px #ffffff26;
  background-color: #33393f;
`;

const Sequencer = styled.div`
  width: calc(100% - 200px);
  height: 100%;
  box-sizing: border-box;
  padding: 20px 40px 20px 40px;
  overflow: scroll;
`;

const SoundBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  > div {
    width: 35px;
    height: 35px;
    background-color: #33393f;
    box-sizing: border-box;
    border: solid 1px;
    border-radius: 4px;
    cursor: pointer;

    &:nth-child(4n) {
      margin-right: 1%;
    }

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
  }
`;

const ProgressBarContainer = styled.div`
  width: 99%;
  height: 10px;
  margin-bottom: 20px;
  background: #ffffff26;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  border-bottom: solid 0.1px #ffffff26;
  background: #ff0404;
  animation: ${(props) => {
    return `progressAnimationStrike ${props.time}s linear`;
  }};
  animation-iteration-count: infinite;

  @keyframes progressAnimationStrike {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

export default React.memo(StepSequencer);
