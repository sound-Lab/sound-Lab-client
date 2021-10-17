import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ModalContext } from '../context/ModalContext';
import { postMusic } from '../modules/mixEditor';

import CreateMusicInputBox from '../components/CreateMusicInputBox';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

function LandingContainer() {
  const [titleData, setTitleData] = useState(null);
  const { handleModal } = useContext(ModalContext);
  const { isLoading } = useSelector((state) => state.loading);
  const { id } = useSelector((state) => state.mixEditor);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!titleData) {
      return null;
    }

    try {
      dispatch(postMusic(titleData.title));
    } catch (error) {
      <Error error={error} />;
    }
  }, [titleData]);

  useEffect(() => {
    if (!id || !titleData) {
      return null;
    }

    history.push(`/mixEditor/${id}`);

    return () => {
      handleModal(null);
    };
  }, [id, isLoading]);

  function modalOpen() {
    handleModal(<CreateMusicInputBox onSubmit={setTitleData} />);
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <Button text="+ Create" onClick={modalOpen}></Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.mainColor.surfieGreen};
`;

export default LandingContainer;
