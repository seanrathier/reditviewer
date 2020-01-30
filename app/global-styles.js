import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    min-height: calc(100vh - 48px);
    line-height: 1;
    font-family: IBMPlexSans, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  body {
    ffont-family: IBMPlexSans, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: IBMPlexSans, Arial, sans-serif;
  }`;

export default GlobalStyle;
