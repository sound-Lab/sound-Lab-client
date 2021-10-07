import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <Wrapper>
      <h1>
        <a href="/">Sound LAB</a>
      </h1>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  padding: 10px;
  background-color: ${({ theme }) => theme.grayColors.white};

  a {
    margin: 10px;
    font-size: 30px;
  }
`;

export default Header;
