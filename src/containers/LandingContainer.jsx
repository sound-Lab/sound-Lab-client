import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ModalContext } from '../context/ModalContext';
import { postMusic } from '../modules/mixEditor';

import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import CreateMusicInputBox from '../components/CreateMusicInputBox';

function LandingContainer() {
  const [titleData, setTitleData] = useState(null);
  const { handleModal } = useContext(ModalContext);
  const { isLoading } = useSelector((state) => state.loading);
  const { id } = useSelector((state) => state.mixEditorReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!titleData) {
      return;
    }

    dispatch(postMusic(titleData.title));
  }, [titleData]);

  useEffect(() => {
    if (isLoading === false) {
      handleModal(null);
      history.push(`/mixEditor/${id}`);
    }
  }, [isLoading]);

  function modalOpen() {
    handleModal(<CreateMusicInputBox onSubmit={setTitleData} />);
  }

  return (
    <Wrapper>
      <Button text="+ Create" onClick={() => modalOpen()}></Button>
      {isLoading && <Loading />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.MainColors.surfieGreen};
`;

export default React.memo(LandingContainer);
