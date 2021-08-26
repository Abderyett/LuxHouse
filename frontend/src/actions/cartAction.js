import {
  TOGGLE_DROPDOWN,
  ADD_TO_CART,
  INCREASE_CART_QUANTITY,
  DECREASE_CART_QUANTITY,
  REMOVE_FROM_CART,
  TOGGLE_PROFILE_DROPDOWN,
  ADDED_SHIPPING_ADRESS,
  ADDED_PAYMENT_METHOD,
  ADDED_SHIPPING_METHOD,
} from './types';

export const toggleCart = () => (dispatch) => {
  dispatch({
    type: TOGGLE_DROPDOWN,
  });
};

export const addItem = (item) => (dispatch, getState) => {
  dispatch({ type: ADD_TO_CART, payload: item });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};

export const incrementCartItem = (item) => (dispatch, getState) => {
  dispatch({
    type: INCREASE_CART_QUANTITY,
    payload: item,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};

export const decrementCartItem = (item) => (dispatch, getState) => {
  dispatch({
    type: DECREASE_CART_QUANTITY,
    payload: item,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};

export const removeItem = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};

export const toggleProfileDropdown = () => (dispatch) => {
  dispatch({
    type: TOGGLE_PROFILE_DROPDOWN,
  });
};

export const addedShippingAdress = (data) => (dispatch) => {
  dispatch({
    type: ADDED_SHIPPING_ADRESS,
    payload: data,
  });
};
export const addedShippingMethod = (data) => (dispatch) => {
  dispatch({
    type: ADDED_SHIPPING_METHOD,
    payload: data,
  });
};
export const addedPaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: ADDED_PAYMENT_METHOD,
    payload: data,
  });
};
