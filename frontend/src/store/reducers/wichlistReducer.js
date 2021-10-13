import { ADD_TO_WICHLIST, EMPTY_WICHLIST, REMOVE_FROM_WICHLIST } from '../../actions/types';

export const wichlistReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WICHLIST:
      return { ...state, items: action.payload };

    default:
      return state;
  }
};
