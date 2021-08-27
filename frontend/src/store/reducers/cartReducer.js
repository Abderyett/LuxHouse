import { addedShippingAdress } from '../../actions/cartAction';
import {
  ADD_TO_CART,
  TOGGLE_DROPDOWN,
  INCREASE_CART_QUANTITY,
  DECREASE_CART_QUANTITY,
  REMOVE_FROM_CART,
  TOGGLE_PROFILE_DROPDOWN,
  ADDED_SHIPPING_ADRESS,
  ADDED_PAYMENT_METHOD,
  ADDED_SHIPPING_METHOD,
  EMPTY_CART,
} from '../../actions/types';

import { addCartItem, incrementQty, decrementQty, removeItem } from '../../helper';

export const cartReducer = (
  state = {
    count: 0,
    showDropdown: false,
    cartItem: [{ product_id: '' }],
    toggleProfileDropDown: false,
    shippingAdress: {},
    shippingMethod: {},
    payment: '',
  },
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
    case ADDED_SHIPPING_ADRESS:
      return { ...state, shippingAdress: action.payload };
    case ADDED_SHIPPING_METHOD:
      return { ...state, shippingMethod: action.payload };
    case ADDED_PAYMENT_METHOD:
      return { ...state, payment: action.payload };
    case EMPTY_CART:
      return {};
    default:
      return state;
  }
};
