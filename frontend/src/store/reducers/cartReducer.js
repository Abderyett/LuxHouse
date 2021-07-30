import { INCREASE_CART_ITEM, DECREASE_CART_ITEM, ADD_CART } from '../../actions/types';

export const cartReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREASE_CART_ITEM:
      return { count: state.count + 1 };
    case DECREASE_CART_ITEM:
      return { count: state.count === 0 ? 0 : state.count - 1 };

    default:
      return state;
  }
};

export const addCart = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case ADD_CART:
      return {
        cartItem: action.payload,
      };

    default:
      return state;
  }
};
