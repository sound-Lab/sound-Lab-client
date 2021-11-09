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
        const { bars, name } = track;

        return (
          <Sheet key={index} id={index} currentTrack={currentTrack}>
            {initialStep.map((step, index) => {
              return <SheetMidi key={index} />;
            })}
            {bars.map((bar, barIndex) => {
              if (bar) {
                return (
                  <SheetMusicBox
                    key={barIndex}
                    left={barIndex}
                    width={bar}
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
  background-color: ${({ theme }) => theme.grayColors.steel};
  border-bottom: solid 0.1px ${({ theme }) => theme.grayColors.shadow};
  box-shadow: inset 0px 20px 0px 0px
    ${({ theme }) => theme.grayColors.blackCharcoal};

  > div {
    width: 25%;
    height: 100%;
    color: ${({ theme }) => theme.grayColors.white};
    font-weight: 300;
    font-size: 14px;
    border-left: solid 0.1px ${({ theme }) => theme.grayColors.shadow};
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.grayColors.shadow};
`;

const ProgressBar = styled.div`
  height: 10px;
  background: ${({ theme }) => theme.mainColor.orangeRed};
  border-bottom: solid 0.1px ${({ theme }) => theme.grayColors.shadow};
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
  border-bottom: solid 0.1px ${({ theme }) => theme.grayColors.shadowLight};
  transition: background 0.3s;
`;

const SheetMidi = styled.div`
  width: 1.56%;
  height: 100%;
  border-left: solid 0.25px ${({ theme }) => theme.grayColors.shadowDark};
`;

export default React.memo(SheetMusic);
