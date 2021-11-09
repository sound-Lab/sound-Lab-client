import React, { useState, useEffect, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Tone from 'tone';

import { ModalContext } from '../context/ModalContext';

import ExitEditorConfirmBox from './ExitEditorConfirmBox';
import BpmInputBox from './BpmInputBox';
import Button from './common/Button';
import Error from './common/Error';

import {
  updatePlay,
  putMusicData,
  upCurrentPart,
  deleteMusicData,
} from '../modules/mixEditor';
import { deleteInstrumentData } from '../modules/instrument';

function MixEditorHeader() {
  const [isSave, setIsSave] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { handleModal } = useContext(ModalContext);
  const { tracks, isPlaying, bpm, sampler, title } = useSelector(
    (state) => state.mixEditor,
  );
  const { musicId } = useParams();
  const stepIndex = useRef(0);
  const history = useHistory();
  const dispatch = useDispatch();

  Tone.context.resume();
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

  useEffect(() => {
    if (!isSave && !isDelete) {
      return null;
    }

    if (isSave) {
      handleModal(null);
      dispatch(putMusicData({ tracks, title, musicId }));
    }

    if (isDelete) {
      handleModal(null);
      dispatch(deleteInstrumentData());
      dispatch(deleteMusicData(musicId));
    }

    return () => {
      setIsSave(false);
      setIsDelete(false);
    };
  }, [isSave, isDelete]);

  useEffect(() => {
    if (!isDelete) {
      return null;
    }

    history.push('/');
  }, [isDelete]);

  function saveMusicData() {
    try {
      if (!tracks.length) {
        return;
      }

      dispatch(putMusicData({ tracks, title, musicId }));
    } catch (error) {
      <Error error={error} />;
    }
  }

  function handleStart() {
    tracks.forEach((track) => {
      if (!track.mute) {
        const { codeName, steps, name } = track;

        steps.forEach((track, index) => {
          const step = track.step[stepIndex.current];

          if (step === 1) {
            sampler[name].triggerAttackRelease(codeName[index], 0.5);
          }

          if (stepIndex.current === 0) {
            dispatch(upCurrentPart('A'));
          }

          if (stepIndex.current === 31) {
            dispatch(upCurrentPart('B'));
          }
        });
      }
    });

    stepIndex.current = stepIndex.current === 63 ? 0 : stepIndex.current + 1;
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
        dispatch(updatePlay());
        break;

      default:
        break;
    }
  }

  function modalOpen() {
    handleModal(
      <ExitEditorConfirmBox onSave={setIsSave} onDelete={setIsDelete} />,
    );
  }

  return (
    <Wrapper>
      <EditorHeader>
        <Exit onClick={modalOpen}>Exit</Exit>
        <Title>{title}</Title>
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
            width={50}
            height={35}
            buttonColor={'black'}
            disabled={isPlaying ? true : false}
          />
          <StyledPlayButton
            text={'◼️'}
            id="restart"
            onClick={handlePlay}
            width={50}
            height={35}
            buttonColor={'black'}
            disabled={isPlaying ? false : true}
          />
        </div>
        <BpmInputBox />
      </EditorToolBar>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100vw;
  height: 100px;
  background-color: ${({ theme }) => theme.grayColors.anchor};
  border-bottom: solid 0.1px ${({ theme }) => theme.grayColors.shadow};
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: -1px 2px 10px 0px ${({ theme }) => theme.grayColors.anchor};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 30px;
  margin: 0 auto;
  outline: none;
  color: ${({ theme }) => theme.grayColors.white};
  font-size: 18px;
  border-bottom: solid 0.5px ${({ theme }) => theme.grayColors.greige};
  transition: border 0.3s;

  &:hover {
    border-bottom: solid 1px;
  }
`;

const Exit = styled.div`
  margin: 15px;
  width: 40px;
  text-align: center;
  color: ${({ theme }) => theme.grayColors.white};
  font-size: 17px;
  border-right: solid 1px ${({ theme }) => theme.grayColors.pewter};
  transition: border-right-color 0.3s, color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.mainColor.orangeRed};
    border-right: solid 2px ${({ theme }) => theme.mainColor.orangeRed};
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
    width: 210px;
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
