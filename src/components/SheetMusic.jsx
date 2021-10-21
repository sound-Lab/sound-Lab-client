import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SheetMusicBox from './SheetMusicBox';

function SheetMusic() {
  const [startProgressBar, setStartProgressBar] = useState(false);
  const [progressTime, setProgressTime] = useState(8);
  const { tracks, isPlaying, currentTrack, bpm, initialStep } = useSelector(
    (state) => state.mixEditor,
  );

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

    setProgressTime((60 / bpm) * 16);
    setInterval(setStartProgressBar(true), progressTime);
  }, [startProgressBar, bpm, isPlaying]);

  return (
    <Wrapper>
      <Header>
        {initialStep.map((step, index) => {
          if (index % 16 === 0) {
            return <div key={index}>{Math.floor(index / 16) + 1}</div>;
          }
        })}
      </Header>
      <ProgressBarContainer>
        {startProgressBar && <ProgressBar time={progressTime} />}
      </ProgressBarContainer>
      {tracks.map((track, index) => {
        const { midiSteps, name } = track;

        return (
          <Sheet key={index} id={index} currentTrack={currentTrack}>
            {initialStep.map((step, index) => {
              return <SheetMidi key={index} />;
            })}
            {midiSteps.map((midistep, midiindex) => {
              if (midistep) {
                return (
                  <SheetMusicBox
                    key={midiindex}
                    left={midiindex}
                    width={midistep}
                    top={index}
                    currentInstrument={name}
                  />
                );
              }
            })}
          </Sheet>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.article`
  position: relative;
  width: 100vw;
  margin-left: 5px;
  overflow: scroll;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  background-color: #33393e;
  border-bottom: solid 0.1px #ffffff26;
  box-shadow: inset 0px 20px 0px 0px #0c0c0c3b;

  > div {
    width: 25%;
    height: 100%;
    color: white;
    font-weight: 300;
    font-size: 14px;
    border-left: solid 0.1px #ffffff26;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: #ffffff26;
`;

const ProgressBar = styled.div`
  height: 10px;
  background: #ff0404;
  border-bottom: solid 0.1px #ffffff26;
  animation: ${(props) => `progressAnimationStrike ${props.time}s linear`};
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

const Sheet = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  background-color: ${(props) =>
    props.id === parseInt(props.currentTrack) ? '#33393ef8' : '#1b1d21'};
  border-bottom: solid 0.1px #ffffff37;
  transition: background 0.3s;
`;

const SheetMidi = styled.div`
  width: 1.56%;
  height: 100%;
  border-left: solid 0.25px #ffffff14;
`;

export default React.memo(SheetMusic);
