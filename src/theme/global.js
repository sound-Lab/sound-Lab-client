import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  html, body {
    width: 100%;
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input {
    outline: none;
  }

  ul, li {
    text-align: center;
    list-style-type: none;
  }

  input, button {
    border: none;
    outline: none;
  }

  .is-active {
    background-color: ${({ theme }) => theme.mainColor.selectiveYellow};
  }

  .is-currentIndex {
    background-color: ${({ theme }) => theme.grayColors.lightGray};
  }
`;

export default GlobalStyle;
