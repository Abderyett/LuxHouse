import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './Global';
import { Header, Footer, Hero } from './components';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>

      <Footer />
      <GlobalStyle />
    </>
  );
}

export default App;
