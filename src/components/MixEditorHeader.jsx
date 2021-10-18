import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Tone from 'tone';

import Button from './common/Button';
import Error from './common/Error';

import {
  updatePlay,
  updateRepeat,
  putMusicData,
  updateTitle,
} from '../modules/mixEditor';

function MixEditorHeader() {
  const { tracks, isPlaying, bpm, title, repeat, sampler } = useSelector(
    (state) => state.mixEditor,
  );
  const { musicId } = useParams();
  const stepIndex = useRef(0);
  const dispatch = useDispatch();

  Tone.Transport.bpm.value = bpm;

  useEffect(() => {
    isPlaying ? Tone.Transport.start() : Tone.Transport.stop();

    return () => {
      Tone.Transport.stop();
    };
  }, [isPlaying]);

  useEffect(() => {
    Tone.Transport.cancel();
    Tone.Transport.scheduleRepeat(handleStart, '16n');
  }, [tracks, isPlaying]);

  function saveMusicData() {
    try {
      if (!tracks.length) {
        return;
      }

      dispatch(putMusicData({ tracks, musicId }));
    } catch (error) {
      <Error error={error} />;
    }
  }

  function handleStart() {
    tracks.forEach((track) => {
      if (!track.mute) {
        const { codeName, stepsMap, name } = track;

        stepsMap.forEach((track, index) => {
          const step = track.steps[stepIndex.current];

          if (step === 1) {
            sampler[name].triggerAttackRelease(codeName[index]);
          }
        });
      }
    });

    stepIndex.current =
      stepIndex.current === repeat ? 0 : stepIndex.current + 1;
  }

  function handleTitle(newTitle) {
    dispatch(updateTitle(newTitle));
  }

  function handlePlay(ev) {
    ev.preventDefault();
    const type = ev.target.id;

    switch (type) {
      case 'play':
        dispatch(updatePlay());
        break;

      case 'restart':
        stepIndex.current = 0;
        break;

      case 'repeatRange':
        dispatch(updateRepeat(repeat === 32 ? 64 : 32));
        break;

      default:
        break;
    }
  }

  return (
    <Wrapper>
      <EditorHeader>
        <Exit>
          <a href="/">Exit</a>
        </Exit>
        <Title value={title} onBlur={handleTitle} />
        <StyledSaveButton
          text="Save"
          onClick={saveMusicData}
          width={50}
          height={30}
          fontSize={14}
        />
      </EditorHeader>
      <EditorToolBar>
        <div className="player">
          <StyledPlayButton
            text={'▶️'}
            id="play"
            onClick={handlePlay}
            width={35}
            height={35}
            buttonColor={'black'}
            disabled={isPlaying ? true : false}
          />
          <StyledPlayButton
            text={'II'}
            id="play"
            onClick={handlePlay}
            width={35}
            height={35}
            buttonColor={'black'}
            disabled={isPlaying ? false : true}
          />
          <StyledPlayButton
            text={'◼️'}
            id="restart"
            onClick={handlePlay}
            width={35}
            height={35}
            buttonColor={'black'}
          />
        </div>
        <StyledPlayButton
          text={repeat === 32 ? 'Repeat: A' : 'Repeat: A - B'}
          id="repeatRange"
          onClick={handlePlay}
          width={100}
          height={35}
          buttonColor={'black'}
        />
      </EditorToolBar>
    </Wrapper>
  );
}

MixEditorHeader.propTypes = {
  title: PropTypes.string,
};

const Wrapper = styled.header`
  width: 100vw;
  height: 100px;
  background-color: #33393f;
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: -1px 2px 10px 0px #0c0c0c3b;
`;

const Exit = styled.div`
  margin: 15px;
  width: 40px;
  text-align: center;
  color: white;
  font-size: 15px;
  border-right: solid 1px #969696;
  transition: border-right-color 0.3s, color 0.3s;

  &:hover {
    color: #c20101;
    border-right-color: #c20101;
  }
`;

const Title = styled.input`
  width: 400px;
  height: 30px;
  margin: auto;
  outline: none;
  background: #33393f;
  color: white;
  font-size: 18px;
  text-align: center;
  transition: background 0.3s, box-shadow 0.3s;

  &:hover {
    background: #474747;
  }

  &:focus {
    background: #292929;
  }
`;

const EditorToolBar = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-around;
  margin: 5px;

  .player {
    display: flex;
    justify-content: space-between;
    width: 170px;
  }
`;

const StyledSaveButton = styled(Button)`
  margin: 10px;
`;

const StyledPlayButton = styled(Button)`
  &:hover {
    background-color: ${({ theme }) => theme.grayColors.darkGray};
  }
`;

export default MixEditorHeader;
