import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './Global';
import { HomeScreen, LoginScreen, RegisterScreen, ContactScreen, ProductsScreen, SingleProduct } from './screens';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/contact" exact component={ContactScreen} />
        <Route path="/products" exact component={ProductsScreen} />
        <Route path="/products/:id" exact component={SingleProduct} />
      </Switch>

      <GlobalStyle />
    </>
  );
}

export default App;
