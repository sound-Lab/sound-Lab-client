import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { ModalContext } from '../context/ModalContext';

import Button from '../components/common/Button';
import CreateMusicInputBox from '../components/CreateMusicInputBox';

function Landing() {
  const [titleData, setTitleData] = useState(null);
  const { handleModal } = useContext(ModalContext);

  useEffect(() => {
    if (!titleData) {
      return;
    }

    handleModal(null);
  }, [titleData]);

  function modalOpen() {
    handleModal(<CreateMusicInputBox onSubmit={setTitleData} />);
  }

  return (
    <Wrapper>
      <Button text="+ Create" onClick={() => modalOpen()}></Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.MainColors.surfieGreen};
`;

export default Landing;
