import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ModalContext } from '../context/ModalContext';
import { setInstrument } from '../modules/mixEditor';

import ToolSetModal from './ToolSetModal';

function TrackList() {
  const [trackData, setTrackData] = useState(null);
  const { tracks } = useSelector((state) => state.mixEditor);
  const { handleModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!trackData) {
      return;
    }

    dispatch(setInstrument(trackData));
    handleModal(null);
  }, [trackData]);

  function openTrackModal() {
    handleModal(<ToolSetModal onSubmit={setTrackData} />);
  }

  return (
    <Wrapper>
      <button onClick={openTrackModal}>+ Add Track</button>
      {tracks.map((tool, index) => {
        return <Track key={index}>{tool.title}</Track>;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.grayColors.white};

  button {
    width: 100%;
    height: 40px;
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
