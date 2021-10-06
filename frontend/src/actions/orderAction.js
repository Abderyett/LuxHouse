import axios from 'axios';

import {
  ADDED_ORDER_FAIL,
  ADDED_ORDER_SUCCESS,
  ADDED_ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDERS_DETAILS_SUCCESS,
  ORDERS_DETAILS_FAIL,
  ORDERS_DETAILS_REQUEST,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  UPDATE_DELIVERY_ORDER_REQUEST,
  UPDATE_DELIVERY_ORDER_SUCCESS,
  UPDATE_DELIVERY_ORDER_FAIL,
} from './types';

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

export const getOrderDetails = (id) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.get(`/api/v1/orders/${id}`, config);
    localStorage.setItem('orderDetails', JSON.stringify(data._id));

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const getOrdersDetails = () => async (dispatch, getState) => {
  dispatch({
    type: ORDERS_DETAILS_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.get(`/api/v1/orders`, config);
    console.log('orders', data);

    dispatch({
      type: ORDERS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_ORDERS_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.get('/api/v1/orders/all', config);
    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateDeliveryStatus = (id) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_DELIVERY_ORDER_REQUEST,
  });
  const { userInfo } = getState().userLogin;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.get(`/api/v1/orders/delivered/${id}`, config);
    dispatch({
      type: UPDATE_DELIVERY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DELIVERY_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
