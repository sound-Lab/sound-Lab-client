import React, { useState, useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getDrumData } from '../../api/music';

import { ModalContext } from '../../context/ModalContext';
import ToolSetModal from './ToolSetModal';

function AddTrackContainer({ setDrum }) {
  const [trackData, setTrackData] = useState([]);
  const { handleModal } = useContext(ModalContext);

  const { mutate } = useMutation(getDrumData, {
    onSuccess: (result) => {
      setDrum(result);
    },
  });

  useEffect(() => {
    if (!trackData.length) {
      return;
    }

    mutate();
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

AddTrackContainer.propTypes = {
  setDrum: PropTypes.any,
};

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
