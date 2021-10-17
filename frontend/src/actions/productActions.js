import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  SELECT_COLOR,
  SELECT_PRICE,
  SELECT_SHIPPING,
  CLEAR_FILTER,
} from './types';

export const listProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get('https://lux-house.herokuapp.com/api/v1/products');
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const detailProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`https://lux-house.herokuapp.com/api/v1/products/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// ? ------------------------  REMOVE PRODUCT ADMIN ONLY-----------------

export const removeProduct = (id) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    dispatch({
      type: REMOVE_PRODUCT_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`https://lux-house.herokuapp.com/api/v1/products/${id}`, config);

    dispatch({
      type: REMOVE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// ? ------------------------  CREATE PRODUCT ADMIN ONLY-----------------

export const createProductAC = () => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`https://lux-house.herokuapp.com/api/v1/products`, {}, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// ? ------------------------  UPDATE PRODUCT ADMIN ONLY-----------------

export const updateProductAC = (id, product) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().userLogin;
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`https://lux-house.herokuapp.com/api/v1/products/${id}`, product, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const selectColor = (color) => (dispatch) => {
  dispatch({
    type: SELECT_COLOR,
    payload: color,
  });
};
export const selectPrice = (price) => (dispatch) => {
  dispatch({
    type: SELECT_PRICE,
    payload: price,
  });
};
export const selectShipping = (shipping) => (dispatch) => {
  dispatch({
    type: SELECT_SHIPPING,
    payload: shipping,
  });
};
export const clearFilters = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTER,
  });
};
