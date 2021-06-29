import { createGlobalStyle } from 'styled-components';
import josfinRegular from './fonts/josefinsans-regular-webfont.woff2';
import josfinBold from './fonts/josefinsans-bold-webfont.woff2';
import avenirBold from './fonts/Avenir-Bold.woff2';
import avenirRegular from './fonts/Avenir-Regular.woff2';
import playFairRegular from './fonts/playfairdisplay-regular-webfont.woff2';
import playFairBold from './fonts/playfairdisplay-bold-webfont.woff2';
import playFairItalic from './fonts/playfairdisplay-italic-webfont.woff2';
import avenirSemi from './fonts/metropolis-medium-webfont.woff2';
import { color } from './utilities';

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'josefin_bold';
    src: url(${josfinBold}) format('woff2');
        
    font-weight: bold;
    font-style: normal;

}

@font-face {
    font-family: 'josefin_regular';
    src: url(${josfinRegular}) format('woff2');
       
    font-weight: normal;
    font-style: normal;

}
@font-face {
    font-family: "avenir_regular";
    src: url(${avenirRegular}) format("woff2");
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: "avenir_bold";
    src: url(${avenirBold}) format("woff2");
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: "avenir_semi";
    src: url(${avenirSemi}) format("woff2");
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'playfair_bold';
    src: url(${playFairBold}) format('woff2');
         
    font-weight: bold;
    font-style: normal;

}




@font-face {
    font-family: 'playfair_italic';
    src: url(${playFairItalic}) format('woff2');
         
    font-weight: normal;
    font-style: italic;

}




@font-face {
    font-family: 'playfair_regular';
    src: url(${playFairRegular}) format('woff2');
         
    font-weight: normal;
    font-style: normal;

}


*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  border: 0;
}

body{

  font-family: 'avenir_regular',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  
 
  /* line-height: 1.5; */
  font-size: 0.875rem;
  
}
hr {
  border: none;
  border-top: 1px solid ${color.grey_600};
}
h1,
h2,
h3,
h4,
h5 {
  
  text-transform: capitalize;
  /* line-height: 1.25; */
  margin-bottom: 0.75rem;
}
h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.5rem;
}
h4 {
  font-size: 1.25rem;
}
h5 {
  font-size: 0.875rem;
}
p {
  margin-bottom: 1.25rem;
  color: ${color.grey_700};
}
ul{
  list-style-type: none;
}
a{
  text-decoration:none;
}
@media screen and (min-width: 800px) {
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1rem;
  }
  body {
    font-size: 1rem;
  }
  h1,
  h2,
  h3,
  h4 {
    line-height: 1;
  }
}

`;
