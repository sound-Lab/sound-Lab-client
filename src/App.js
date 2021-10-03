import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { ModalProvider } from './context/ModalContext';

import theme from './theme';
import GlobalStyle from './theme/global';

import Header from './components/Header';
import Landing from './page/Landing';
import MixEditor from './page/MixEditor';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <Header />
          <ModalProvider>
            <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route path="/mixEditor/:musicId">
                <MixEditor />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </ModalProvider>
        </Wrapper>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const Wrapper = styled.section`
  display: block;
`;

export default App;
