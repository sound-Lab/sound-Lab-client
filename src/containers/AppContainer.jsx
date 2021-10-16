import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { ModalProvider } from '../context/ModalContext';

import LandingContainer from '../containers/LandingContainer';
import MixEditorContainer from '../containers/MixEditorContainer';

import theme from '../theme';
import GlobalStyle from '../theme/global';

function AppContainer() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <ModalProvider>
          <Switch>
            <Route exact path="/">
              <LandingContainer />
            </Route>
            <Route path="/mixEditor/:musicId">
              <MixEditorContainer />
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

const Wrapper = styled.section`
  display: block;
`;

export default AppContainer;
