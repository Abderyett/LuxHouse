import axios from 'axios';
import { PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAIL } from './types';

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
