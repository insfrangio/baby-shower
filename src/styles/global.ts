import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  html, body, #__next {
    height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #b2bec3;
    color: #222;
  }

  .ant-layout {
    min-height: 100%;
  }
`;

export default GlobalStyles;