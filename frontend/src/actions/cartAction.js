import {
  DECREASE_CART_ITEM,
  INCREASE_CART_ITEM,
  TOGGLE_DROPDOWN,
  ADD_TO_CART,
  INCREASE_CART_QUANTITY,
  DECREASE_CART_QUANTITY,
  REMOVE_FROM_CART,
  TOGGLE_PROFILE_DROPDOWN,
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
