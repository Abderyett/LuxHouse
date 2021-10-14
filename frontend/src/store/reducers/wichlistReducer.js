/* eslint-disable no-case-declarations */
import { ADD_TO_WICHLIST, EMPTY_WICHLIST, REMOVE_FROM_WICHLIST } from '../../actions/types';

export const wichlistReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WICHLIST:
      const itemToAdd = action.payload;
      const existItem = state.items.find((item) => item.id === itemToAdd._id);
      if (existItem) {
        return { ...state, items: state.existItem.map((el) => (el.id === existItem.id ? itemToAdd : el)) };
      }
      return { ...state, items: [...state.items, itemToAdd] };

    default:
      return state;
  }
};
