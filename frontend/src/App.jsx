import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './Global';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ContactScreen,
  ProductsScreen,
  SingleProduct,
  CartScreen,
  ProfileScreen,
  CheckoutScreen,
  PaymentScreen,
  ShippingMethodScreen,
  PlaceOrderScreen,
  OrderScreen,
  SuccessPaymentScreen,
  CancelPaymentScreen,
  UsersListScreen,
  UserScreen,
  ProductsListScreen,
} from './screens';

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
        <Route path="/cart" exact component={CartScreen} />
        <Route path="/profile" exact component={ProfileScreen} />
        <Route path="/checkout" exact component={CheckoutScreen} />
        <Route path="/payment" exact component={PaymentScreen} />
        <Route path="/shippingmethod" exact component={ShippingMethodScreen} />
        <Route path="/placeorder" exact component={PlaceOrderScreen} />
        <Route path="/order/:id" exact component={OrderScreen} />
        <Route path="/success" component={SuccessPaymentScreen} />
        <Route path="/canceled" component={CancelPaymentScreen} />
        <Route path="/admin/userslist" component={UsersListScreen} />
        <Route path="/admin/user/:id" component={UserScreen} />
        <Route path="/admin/products" component={ProductsListScreen} />
      </Switch>

      <GlobalStyle />
    </>
  );
}

export default App;
