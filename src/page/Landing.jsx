import React, { useContext } from 'react';
import styled from 'styled-components';

import { ModalContext } from '../context/ModalContext';
import Button from '../components/common/Button';

function Landing() {
  const { handleModal } = useContext(ModalContext);

  const modalOpen = () => {
    handleModal(<Modal text="Modal"></Modal>);
  };

  return (
    <Wrapper className="landing">
      Landing page
      <Button text="+ Create" onClick={() => modalOpen()}></Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: yellow;
`;

const Modal = styled.div`
  background-color: yellow;
`;

export default Landing;
