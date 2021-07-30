import { DECREASE_CART_ITEM, INCREASE_CART_ITEM, TOGGLE_DROPDOWN } from './types';

export const incrementCount = () => (dispatch) => {
  dispatch({
    type: INCREASE_CART_ITEM,
  });
};
export const decrementCount = () => (dispatch) => {
  dispatch({
    type: DECREASE_CART_ITEM,
  });
};
export const toggleCart = () => (dispatch) => {
  dispatch({
    type: TOGGLE_DROPDOWN,
  });
};
