import React, { useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ModalContext } from '../../context/ModalContext';

function Modal() {
  const { isModalOpen, handleModal, modalContent } = useContext(ModalContext);
  const modalRef = useRef();

  function closeModal(ev) {
    if (!modalRef.current || modalRef.current.contains(ev.target)) {
      return;
    }

    handleModal(null);
  }

  function showModal() {
    if (!isModalOpen) {
      return null;
    }

    return (
      <>
        <ModalShadow onClick={closeModal} />
        <ModalContainer ref={modalRef}>
          <CloseButton onClick={() => handleModal(null)}>X</CloseButton>
          {modalContent}
        </ModalContainer>
      </>
    );
  }

  return <>{createPortal(showModal(), document.getElementById('modal'))}</>;
}

const ModalShadow = styled.div`
  z-index: 4;
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
`;

const ModalContainer = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: calc(100% - 50%);
  left: calc(100% - 50%);
  width: 500px;
  height: calc(100% - 200px);
  background-color: white;
  transform: translate(-50%, -50%) scale(0);
  animation: show 0.25s ease forwards;

  @keyframes show {
    to {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  border: solid 1px;
  background-color: white;
`;

export default Modal;
