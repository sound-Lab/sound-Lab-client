import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SheetMusicBox from './SheetMusicBox';

function SheetMusic() {
  const [startProgressBar, setStartProgressBar] = useState(false);
  const [progressTime, setProgressTime] = useState(8);
  const [progressBarEndPoint, setProgressBarEndPoint] = useState(50);
  const { tracks, isPlaying, bpm, initialStep, repeat } = useSelector(
    (state) => state.mixEditor,
  );
  const midi = Array(4).fill(0);

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

    const progressBarTime = repeat === 63 ? 16 : 8;

    setProgressBarEndPoint(repeat === 63 ? 100 : 50);
    setProgressTime((60 / bpm) * progressBarTime);
    setInterval(setStartProgressBar(true), progressTime);
  }, [startProgressBar, bpm, repeat]);

  return (
    <Wrapper>
      <Header>
        {midi.map((step, index) => {
          return <div key={index}>{index + 1}</div>;
        })}
      </Header>
      <ProgressBarContainer>
        {startProgressBar && (
          <ProgressBar time={progressTime} width={progressBarEndPoint} />
        )}
      </ProgressBarContainer>
      {tracks.map((step, index) => {
        const { midiSteps } = step;

        return (
          <Sheet key={index} id={index}>
            {initialStep.map((step, index) => {
              return <SheetMidi key={index}></SheetMidi>;
            })}
            {midiSteps.map((midistep, midiindex) => {
              return (
                <SheetMusicBox
                  key={midiindex}
                  left={midiindex}
                  width={midistep}
                  top={index}
                />
              );
            })}
          </Sheet>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #6b6a6a5a;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  background: #ffffffa7;

  > div {
    width: 25%;
    height: 100%;
    border: 0.2px solid #000000dd;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.25);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #ff0404;
  animation: ${(props) => `progressAnimationStrike ${props.time}s linear`};
  animation-iteration-count: infinite;

  @keyframes progressAnimationStrike {
    from {
      width: 0;
    }
    to {
      width: ${(props) => `${props.width}%`};
    }
  }
`;

const Sheet = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  background: white;
  border-bottom: 0.3px solid #575656;
`;

const SheetMidi = styled.div`
  width: 1.56%;
  height: 100%;
  border-top: 0.1px solid #f0f0f111;
  border-left: 0.1px solid #7979797a;
`;

export default React.memo(SheetMusic);
