import axios from 'axios';
import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  PAYMENT_UPDATE_REQUEST,
  PAYMENT_UPDATE_SUCCESS,
  PAYMENT_UPDATE_FAIL,
} from './types';

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

export const updatePayment = (id) => async (dispatch, getState) => {
  dispatch({
    type: PAYMENT_UPDATE_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.get(`/api/v1/orders/update/${id}`, config);

    dispatch({
      type: PAYMENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
