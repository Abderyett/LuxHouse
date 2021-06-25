import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './Global';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />

      <main>
        <h1>Hello from The App Component</h1>
      </main>

      <Footer />
      <GlobalStyle />
    </>
  );
}

export default App;
