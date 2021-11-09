import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ModalContext } from '../context/ModalContext';
import {
  setTrack,
  setCurrentTrack,
  deleteCurrentTrack,
  updateTrackMute,
} from '../modules/mixEditor';
import { initialSteps } from '../lib/toneSampler';

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

    const selectedInstrumentData = instrument.filter(
      (tool) => tool.name === selectedInstrument,
    );

    const { codeName, bars, steps } = initialSteps(selectedInstrumentData);

    const track = {
      name: selectedInstrument,
      codeName,
      bars,
      steps,
      mute: false,
    };

    dispatch(setTrack({ track }));
    dispatch(setCurrentTrack(tracks.length));
    handleModal(null);
  }, [selectedInstrument]);

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
        dispatch(updateTrackMute(parseInt(trackIndex)));
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
        {tracks &&
          tracks.map((tool, trackIndex) => {
            return (
              <Track
                key={trackIndex}
                id={trackIndex}
                currentTrack={currentTrack}
                className={currentTrack === trackIndex ? null : 'current-track'}
                mute={tool.mute ? tool.mute : null}>
                <div className="effect">
                  <div
                    className="mute"
                    id={`mute-${trackIndex}`}
                    onClick={handleTrack}>
                    M
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
  width: 200px;
  border-right: solid 0.1px #ffffff26;
`;

const AddTrack = styled.div`
  z-index: 1;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 0.1px #ffffff26;
  font-weight: 400;
  color: white;
  background-color: #33393f;
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
  width: 200px;
  height: calc(100vh - 60vh - 40px);
  overflow: scroll;
`;

const Track = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  box-sizing: border-box;
  font-weight: 500;
  color: white;
  background-color: ${(props) =>
    props.id === parseInt(props.currentTrack) ? '#33393f' : '#1b1d21'};
  border-bottom: solid 0.1px #ffffff26;
  transition: background 0.2s;

  .effect {
    width: 50px;
    height: 100%;
  }

  .mute {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    font-weight: 400;
    align-items: center;
    justify-content: center;
    border-right: solid 0.1px #ffffff26;
    transition: background 0.3s, color 0.3s;
    color: ${(props) => (props.mute ? '#4990e2' : null)};

    &:hover {
      color: white;
      background: ${({ theme }) => theme.mainColor.selectiveYellow};
    }
  }

  .tool-name {
    width: 100%;
    height: 100%;
    font-weight: 600;
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
