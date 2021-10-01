import React, { useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ModalContext } from '../../../context/ModalContext';
import Button from '../Button';

const Modal = () => {
  const { isModalOpen, handleModal, modalContent } = useContext(ModalContext);
  const modalRef = useRef();

  const clickModalWrapper = (ev) => {
    if (!modalRef.current || modalRef.current.contains(ev.target)) {
      return;
    }

    handleModal(null);
  };

  const showModal = () => {
    if (!isModalOpen) {
      return null;
    }

    return (
      <ModalWrapper onClick={clickModalWrapper}>
        <Wrapper ref={modalRef}>
          <Button onClick={() => handleModal(null)} text="닫기" />
          {modalContent}
        </Wrapper>
      </ModalWrapper>
    );
  };

  return <>{createPortal(showModal(), document.getElementById('modal'))}</>;
};

const ModalWrapper = styled.div`
  z-index: 1;
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  padding: 30px;
  background: whitesmoke;
`;

export default Modal;
