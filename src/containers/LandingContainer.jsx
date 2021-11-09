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
            <h3>Think and Make like a musician 🎧</h3>
          </Header>
          <StyledButton
            text="+ Create"
            width={80}
            height={40}
            onClick={modalOpen}
          />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.mainColor.landingNavy};
`;

const Header = styled.div`
  text-align: center;

  h1 {
    display: inline-block;
    margin: 0 auto;
    font-size: 100px;
    font-weight: 600;
    text-transform: uppercase;
    font-family: arial;
    line-height: 100px;
    background-image: linear-gradient(
      to right,
      #00f,
      #00ffd5,
      #51ff00,
      #00ffd5,
      #00f
    );
    text-align: center;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: animate 5s infinite linear;
    background-size: 1000%;
  }

  h3 {
    font-weight: 400;
    color: ${({ theme }) => theme.grayColors.white};
    opacity: 0.6;
  }

  @keyframes animate {
    0% {
      background-position: 0% 0%;
    }

    10% {
      background-position: 10% 10%;
    }

    50% {
      background-position: 50% 50%;
    }

    100% {
      background-position: 100% 100%;
    }

    50% {
      background-position: 50% 50%;
    }

    10% {
      background-position: 10% 10%;
    }

    0% {
      background-position: 0% 0%;
    }
  }
`;

const StyledButton = styled(Button)`
  margin: 30px;
`;

export default LandingContainer;
