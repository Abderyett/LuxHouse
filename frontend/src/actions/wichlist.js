import { ADD_TO_WICHLIST, EMPTY_WICHLIST, REMOVE_FROM_WICHLIST } from './types';

export const addToWichlist = (item) => (dispatch, getState) => {
  dispatch({ type: ADD_TO_WICHLIST, payload: item });
  localStorage.setItem('wichlist', JSON.stringify(getState().cart.cartItem));
};

export const removeFromWichlist = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_WICHLIST,
    payload: id,
  });
  localStorage.setItem('wichlist', JSON.stringify(getState().cart.cartItem));
};
export const emptyWichList = () => (dispatch) => {
  dispatch({
    type: EMPTY_WICHLIST,
  });
  localStorage.removeItem('wichlist');
};
