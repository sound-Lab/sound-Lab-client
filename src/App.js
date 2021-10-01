import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { ModalProvider } from './context/ModalContext';

import theme from './theme';
import GlobalStyle from './theme/global';

import Landing from './page/Landing';
import Header from './components/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <ModalProvider>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </ModalProvider>
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  height: auto;
`;

export default App;
