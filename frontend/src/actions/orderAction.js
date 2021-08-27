import axios from 'axios';

import { ADDED_ORDER_FAIL, ADDED_ORDER_SUCCESS, ADDED_ORDER_REQUEST } from './types';

export const addOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ADDED_ORDER_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.post('/api/v1/orders', order, config);
    dispatch({
      type: ADDED_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADDED_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
