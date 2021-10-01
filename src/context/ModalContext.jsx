import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import Modal from '../components/common/Modal';

const ModalContext = createContext();
const { Provider } = ModalContext;

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpened] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleModal = (content) => {
    setIsModalOpened(!isModalOpen);

    if (content) {
      setModalContent(content);
    }
  };

  return (
    <Provider value={{ isModalOpen, handleModal, modalContent }}>
      {children}
      <Modal />
    </Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ModalContext, ModalProvider };
