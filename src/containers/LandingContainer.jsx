import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ModalContext } from '../context/ModalContext';
import { postMusic } from '../modules/mixEditor';

import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import CreateMusicInputBox from '../components/CreateMusicInputBox';

function LandingContainer() {
  const [titleData, setTitleData] = useState(null);
  const { handleModal } = useContext(ModalContext);
  const { isLoading } = useSelector((state) => state.loading);
  const { id, error } = useSelector((state) => state.mixEditor);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!titleData) {
      return null;
    }

    try {
      dispatch(postMusic(titleData.title));
    } catch (error) {
      return <Error error={error} />;
    }
  }, [titleData]);

  useEffect(() => {
    if (!id || !titleData) {
      return null;
    }

    if (error) {
      return null;
    }

    history.push(`/mixEditor/${id}`);

    return () => {
      handleModal(null);
    };
  }, [id, isLoading, error]);

  function modalOpen() {
    handleModal(<CreateMusicInputBox onSubmit={setTitleData} />);
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header>
            <h1>Sound LAB</h1>
          </Header>
          <Button text="+ Create" onClick={modalOpen}></Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;

  background-color: ${({ theme }) => theme.mainColor.surfieGreen};
`;

const Header = styled.div``;

export default LandingContainer;
