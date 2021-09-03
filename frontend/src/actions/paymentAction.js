import axios from 'axios';
import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  PAYMENT_STRIPE_UPDATE_REQUEST,
  PAYMENT_STRIPE_UPDATE_SUCCESS,
  PAYMENT_STRIPE_UPDATE_FAIL,
  PAYMENT_PAYPAL_UPDATE_REQUEST,
  PAYMENT_PAYPAL_UPDATE_SUCCESS,
  PAYMENT_PAYPAL_UPDATE_FAIL,
} from './types';

//! PROCEED FOR PAYMENT USING STRIPE  =================

export const proceedPayment = (item) => async (dispatch, getState) => {
  dispatch({
    type: PAYMENT_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.post('/create-checkout-session', item, config);

    dispatch({
      type: PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

//! STRIPE   =================

export const updateStripePayment = (id) => async (dispatch, getState) => {
  dispatch({
    type: PAYMENT_STRIPE_UPDATE_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.get(`/api/v1/orders/${id}/stripe`, config);

    dispatch({
      type: PAYMENT_STRIPE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_STRIPE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

//! PAYPAL=================

export const updatePaypalPayment = (orderId, paymentResult) => async (dispatch, getState) => {
  dispatch({
    type: PAYMENT_PAYPAL_UPDATE_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.put(`/api/v1/orders/${orderId}/paypal`, paymentResult, config);

    dispatch({
      type: PAYMENT_PAYPAL_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_PAYPAL_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
