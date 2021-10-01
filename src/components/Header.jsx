import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <Wrapper>
      <Text>Sound LAB</Text>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  height: 40px;
  padding: 10px;
  background-color: ${({ theme }) => theme.grayColors.white};
`;

const Text = styled.span`
  margin-right: 10px;
  font-size: 30px;
`;

export default Header;
