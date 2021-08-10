import {
  ADD_TO_CART,
  TOGGLE_DROPDOWN,
  INCREASE_CART_QUANTITY,
  DECREASE_CART_QUANTITY,
  REMOVE_FROM_CART,
  TOGGLE_PROFILE_DROPDOWN,
} from '../../actions/types';

import { addCartItem, incrementQty, decrementQty, removeItem } from '../../helper';

export const cartReducer = (
  state = { count: 0, showDropdown: false, cartItem: [], toggleProfileDropDown: false },
  action
) => {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return { ...state, showDropdown: !state.showDropdown };
    case TOGGLE_PROFILE_DROPDOWN:
      return { ...state, toggleProfileDropDown: !state.toggleProfileDropDown };

    case ADD_TO_CART:
      return { ...state, cartItem: addCartItem(state.cartItem, action.payload) };

    case INCREASE_CART_QUANTITY:
      return { ...state, cartItem: incrementQty(state.cartItem, action.payload) };

    case DECREASE_CART_QUANTITY:
      return { ...state, cartItem: decrementQty(state.cartItem, action.payload) };

    case REMOVE_FROM_CART:
      return { ...state, cartItem: removeItem(state.cartItem, action.payload) };
    default:
      return state;
  }
};
