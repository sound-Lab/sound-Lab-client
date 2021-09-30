import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import theme from './theme';
import GlobalStyle from './theme/global';

import Button from './components/common/Button';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper className="App">
        <header className="App-header"></header>
        <Button></Button>
      </AppWrapper>
      <GlobalStyle />
    </ThemeProvider>
  );
}

const AppWrapper = styled.div`
  height: auto;
  background-color: aqua;
`;

export default App;
