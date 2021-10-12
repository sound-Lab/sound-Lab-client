import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as Tone from 'tone';

import { ModalContext } from '../context/ModalContext';
import { setTrack, setCurrentTrack } from '../modules/mixEditor';
import { getInstrumentData } from '../modules/instrument';
import { toneSampler, initialSteps } from '../lib/toneSampler';

import ToolSetModal from './ToolSetModal';

function TrackList() {
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const { instrument } = useSelector((state) => state.instrument);
  const { tracks } = useSelector((state) => state.mixEditor);
  const { handleModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedInstrument) {
      return;
    }

    handleModal(null);

    if (instrument[selectedInstrument]) {
      return;
    }

    dispatch(getInstrumentData(selectedInstrument));

    return () => {
      handleModal();
    };
  }, [selectedInstrument]);

  useEffect(async () => {
    if (!instrument[selectedInstrument]) {
      return;
    }
    const steps = initialSteps(instrument[selectedInstrument]);
    const sampler = toneSampler(instrument[selectedInstrument]);
    const track = { name: selectedInstrument, sampler, steps };

    try {
      await Tone.loaded();
    } catch (error) {
      console.log(error);
    }

    dispatch(setTrack(track));
    dispatch(setCurrentTrack(tracks.length));
  }, [instrument[selectedInstrument], selectedInstrument]);

  function openTrackModal() {
    handleModal(<ToolSetModal onSubmit={setSelectedInstrument} />);
  }

  return (
    <Wrapper>
      <button onClick={openTrackModal}>+ Add Track</button>
      {tracks.map((tool, index) => {
        return <Track key={index}>{tool.name}</Track>;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 20%;
  height: 100%;
  background-color: ${({ theme }) => theme.grayColors.white};

  button {
    width: 100%;
    height: 15%;
    font-size: medium;

    &:hover {
      background-color: ${({ theme }) => theme.MainColors.selectiveYellow};
      color: ${({ theme }) => theme.grayColors.white};
    }
  }
`;

const Track = styled.li`
  height: 40px;
  margin: auto;
  background-color: ${({ theme }) => theme.grayColors.lightGray};

  &:hover {
    background-color: ${({ theme }) => theme.MainColors.surfieGreen};
    color: ${({ theme }) => theme.grayColors.white};
  }
`;

export default TrackList;
