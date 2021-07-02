import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './Global';
import { HomeScreen } from './screens';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
      </Switch>

      <GlobalStyle />
    </>
  );
}

export default App;
