import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store/store';
import App from './App';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Router>
  </Provider>,
  document.getElementById('root')
);
