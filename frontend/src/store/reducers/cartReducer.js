import { INCREASE_CART_ITEM, DECREASE_CART_ITEM, ADD_TO_CART, TOGGLE_DROPDOWN } from '../../actions/types';
import { addCartItem } from '../../helper/addCartItem';

export const cartReducer = (state = { count: 0, showDropdown: false, cartItem: [] }, action) => {
  switch (action.type) {
    case INCREASE_CART_ITEM:
      return { ...state, count: state.count + 1 };
    case DECREASE_CART_ITEM:
      return { ...state, count: state.count === 0 ? 0 : state.count - 1 };
    case TOGGLE_DROPDOWN:
      return { ...state, showDropdown: !state.showDropdown };
    case ADD_TO_CART:
      return { ...state, cartItem: addCartItem(state.cartItem, action.payload) };
    default:
      return state;
  }
};

// return { ...state, cartItem: [...state.cartItem, { itemAdded: true, item: action.payload }] };
