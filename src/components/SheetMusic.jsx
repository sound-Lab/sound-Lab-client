import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import * as Tone from 'tone';

function SheetMusic() {
  const { tracks, isPlaying, bpm } = useSelector((state) => state.mixEditor);
  const stepIndex = useRef(0);

  Tone.Transport.bpm.value = bpm;

  useEffect(() => {
    isPlaying ? Tone.Transport.start() : Tone.Transport.stop();

    return () => {
      Tone.Transport.stop();
    };
  }, [isPlaying]);

  useEffect(() => {
    Tone.Transport.cancel();
    Tone.Transport.scheduleRepeat(handleStart, '32n');
  }, [tracks, isPlaying]);

  function handleStart() {
    tracks.forEach((track) => {
      const {
        steps: { codeName, stepsMap },
        sampler,
      } = track;

      stepsMap.forEach((track, index) => {
        const step = track.steps[stepIndex.current];

        if (step === 1) {
          sampler.triggerAttackRelease(codeName[index], 1);
        }
      });
    });

    stepIndex.current = stepIndex.current === 32 ? 0 : stepIndex.current + 1;
  }

  return (
    <Wrapper>
      <SheetHeader>sheet header</SheetHeader>
      <Sheet>
        {tracks.map((track, index) => {
          const { steps } = track;
          return (
            <Track key={`tracks-${index}`}>
              {steps.stepsMap.map((tr, index) => {
                return (
                  <div key={`track-${index}`}>
                    {tr.steps.map((s, stepIndex) => (
                      <Box
                        key={`step-${index}-${stepIndex}`}
                        id={`step-${index}-${stepIndex}`}
                        className={s === 0 ? 'is-currentIndex' : 'is-active'}
                      />
                    ))}
                  </div>
                );
              })}
            </Track>
          );
        })}
      </Sheet>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const SheetHeader = styled.div`
  height: 15%;
`;

const Sheet = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 15%;
`;

const Track = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;

  div {
    display: flex;
    width: 100%;
    height: 1px;
  }
`;

const Box = styled.div``;

export default React.memo(SheetMusic);
