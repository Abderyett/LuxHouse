import { createGlobalStyle } from 'styled-components';
import avenirBold from './fonts/Avenir-Bold.woff2';
import avenirRegular from './fonts/Avenir-Regular.woff2';

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: "avenirRegular";
    src: url(${avenirRegular}) format("woff2");
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: "avenirBold";
    src: url(${avenirBold}) format("woff2");
    font-weight: bold;
    font-style: normal;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  border: 0;
}
html {
  font-size: 62.5%;
  font-family:'avenirRegular';
}
body{

  
}
a{
  text-decoration:none;
}

ul{
 list-style-type:none;
}

`;
