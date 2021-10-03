import React from 'react';
import styled from 'styled-components';

function MixEditor() {
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  background-color: ${({ theme }) => theme.MainColors.navyBlue};
`;

export default MixEditor;
