import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  html, body {
    width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
