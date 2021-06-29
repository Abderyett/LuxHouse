import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './Global';
import { Header, Footer, Hero, Features, PopularItems, BlogSection } from './components';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <PopularItems />
        <BlogSection />
      </main>

      <Footer />
      <GlobalStyle />
    </>
  );
}

export default App;
