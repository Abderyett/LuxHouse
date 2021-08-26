import { ADDED_ORDER_FAIL, ADDED_ORDER_SUCCESS, ADDED_ORDER_REQUEST } from '../../actions/types';

export const addedOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ADDED_ORDER_REQUEST:
      return { loading: true };
    case ADDED_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case ADDED_ORDER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
