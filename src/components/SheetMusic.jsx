import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SheetMusicBox from './SheetMusicBox';

function SheetMusic() {
  const [startProgressBar, setStartProgressBar] = useState(false);
  const [progressTime, setProgressTime] = useState(8);
  const { tracks, isPlaying, bpm, initialStep } = useSelector(
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

    setProgressTime((bpm / 60) * 4);
    setInterval(setStartProgressBar(true), progressTime);
  }, [startProgressBar]);

  return (
    <Wrapper>
      <Header>
        {midi.map((step, index) => {
          return <div key={index}>{index + 1}</div>;
        })}
      </Header>
      <ProgressBarContainer>
        {startProgressBar && <ProgressBar time={progressTime} />}
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
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;

  > div {
    width: 25%;
    height: 100%;
    border: 0.2px solid red;
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
  background: #ff0000;
  animation: ${(props) => `progressAnimationStrike ${props.time}s linear`};

  @keyframes progressAnimationStrike {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const Sheet = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  border-bottom: 0.1px solid red;
`;

const SheetMidi = styled.div`
  width: 6.25%;
  height: 100%;
  border-top: 0.1px solid red;
  border-left: 0.1px solid red;
`;

export default React.memo(SheetMusic);
