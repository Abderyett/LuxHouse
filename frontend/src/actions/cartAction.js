import {
  DECREASE_CART_ITEM,
  INCREASE_CART_ITEM,
  TOGGLE_DROPDOWN,
  ADD_TO_CART,
  INCREASE_CART_QUANTITY,
  DECREASE_CART_QUANTITY,
  REMOVE_FROM_CART,
} from './types';

export const incrementCount = () => (dispatch, getState) => {
  dispatch({
    type: INCREASE_CART_ITEM,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};
export const decrementCount = () => (dispatch, getState) => {
  dispatch({
    type: DECREASE_CART_ITEM,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};
export const toggleCart = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_DROPDOWN,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};

export const addItem = (item) => (dispatch, getState) => {
  dispatch({ type: ADD_TO_CART, payload: item });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};

export const incrementCartItem = (cartItem, getState) => (dispatch) => {
  dispatch({
    type: INCREASE_CART_QUANTITY,
    payload: cartItem,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItem));
};

export const decrementCartItem = (cartItem, getState) => (dispatch) => {
  dispatch({
    type: DECREASE_CART_QUANTITY,
    payload: cartItem,
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
