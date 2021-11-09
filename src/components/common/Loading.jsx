import React from 'react';
import styled from 'styled-components';

function Loading() {
  return (
    <Wrapper>
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0%;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.grayColors.black};
  opacity: 0.3;

  .loader {
    width: 30px;
    height: 30px;
    position: relative;
    display: inline-block;
    top: 50%;
    left: calc(50% - 19px);
    border: 4px solid ${({ theme }) => theme.mainColor.navyBlue};
    animation: loader 2s infinite ease;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(180deg);
    }

    50% {
      transform: rotate(180deg);
    }

    75% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
