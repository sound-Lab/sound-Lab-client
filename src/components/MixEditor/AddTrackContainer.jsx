import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { ModalContext } from '../../context/ModalContext';
import ToolSetModal from './ToolSetModal';

function AddTrackContainer() {
  const [trackData, setTrackData] = useState([]);
  const { handleModal } = useContext(ModalContext);

  useEffect(() => {
    if (!trackData.length) {
      return;
    }

    handleModal(null);
  }, [trackData]);

  function openTrackModal() {
    handleModal(<ToolSetModal onSubmit={setTrackData} />);
  }

  return (
    <Wrapper>
      <button onClick={openTrackModal}>+ Add Track</button>
      {trackData.map((tool, index) => {
        return <Track key={index}>{tool}</Track>;
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

export default AddTrackContainer;
