import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Tone from 'tone';

import { ModalContext } from '../context/ModalContext';
import {
  setTrack,
  setCurrentTrack,
  deleteCurrentTrack,
  updateTrackMute,
  updateTrackSolo,
} from '../modules/mixEditor';
import { getInstrumentData } from '../modules/instrument';
import { toneSampler, initialSteps } from '../lib/toneSampler';

import ToolSetModal from './ToolSetModal';
import Loading from './common/Loading';

function TrackList() {
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const { tracks, currentTrack } = useSelector((state) => state.mixEditor);
  const { instrument } = useSelector((state) => state.instrument);
  const { isLoading } = useSelector((state) => state.loading);
  const { handleModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedInstrument) {
      return;
    }

    if (instrument[selectedInstrument]) {
      handleModal(null);
      return;
    }

    handleModal(null);
    dispatch(getInstrumentData(selectedInstrument));
  }, [instrument, selectedInstrument]);

  useEffect(async () => {
    if (!instrument[selectedInstrument]) {
      return;
    }

    const { codeName, midiSteps, stepsMap } = initialSteps(
      instrument[selectedInstrument],
    );

    const sampler = toneSampler(instrument[selectedInstrument]);

    const track = {
      name: selectedInstrument,
      codeName,
      midiSteps,
      stepsMap,
      mute: false,
    };

    try {
      await Tone.loaded();
    } catch (error) {
      console.log(error);
    }

    dispatch(setTrack({ track, sampler }));
    dispatch(setCurrentTrack(tracks.length));
  }, [instrument[selectedInstrument]]);

  useEffect(() => {
    setSelectedInstrument(null);
  }, [tracks]);

  function openTrackModal() {
    handleModal(<ToolSetModal onSubmit={setSelectedInstrument} />);
  }

  function handleTrack(ev) {
    const targetTrack = ev.target.id;
    const type = targetTrack.split('-');
    const trackIndex = type[1];

    switch (type[0]) {
      case 'currentTrack':
        dispatch(setCurrentTrack(trackIndex));
        break;

      case 'mute':
        dispatch(updateTrackMute(trackIndex));
        break;

      case 'solo':
        dispatch(updateTrackSolo(trackIndex));
        break;

      case 'delete':
        dispatch(deleteCurrentTrack(trackIndex));
        break;

      default:
        break;
    }
  }

  return (
    <Wrapper>
      <AddTrack onClick={openTrackModal}>+ Add Track</AddTrack>
      <TrackListWrapper>
        {tracks.map((tool, trackIndex) => {
          return (
            <Track key={trackIndex}>
              <div className="effect">
                <div
                  className="mute"
                  id={`mute-${trackIndex}`}
                  onClick={handleTrack}>
                  M
                </div>
                <div
                  className="mute"
                  id={`solo-${trackIndex}`}
                  onClick={handleTrack}>
                  S
                </div>
              </div>
              <div
                className="tool-name"
                id={`currentTrack-${trackIndex}`}
                onClick={handleTrack}>
                {tool.name}
              </div>
              <div
                className="delete"
                id={`delete-${trackIndex}`}
                onClick={handleTrack}>
                x
              </div>
            </Track>
          );
        })}
      </TrackListWrapper>
      {isLoading && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 1;
  width: 200px;
  height: 100%;
  background-color: ${({ theme }) => theme.grayColors.white};
  box-shadow: 5px 0px 16px 0px #0c0c0c3b;
`;

const AddTrack = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 0.5px #4444446c;
  font-weight: 500;
  box-shadow: -1px 2px 10px 0px #0c0c0c3b;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.mainColor.surfieGreen};
    color: ${({ theme }) => theme.grayColors.white};
  }

  &:focus {
    background: #393943;
  }
`;

const TrackListWrapper = styled.div`
  width: 100%;
  height: calc(100% - 12%);
  overflow: scroll;
`;

const Track = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  background-color: #f3f3f399;
  border-bottom: solid 0.5px #41414199;
  overflow: scroll;

  .currentTrack {
    width: 200%;
    border-left: solid 0.5px #ff00004b;
  }

  .effect {
    width: 30px;
    height: 100%;
    border-right: solid 0.5px #4141414c;
  }

  .mute {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s;

    &:hover {
      color: white;
      background: ${({ theme }) => theme.mainColor.selectiveYellow};
    }
  }

  .tool-name {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .delete {
    width: 20%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default TrackList;
