import {
  ADDED_ORDER_FAIL,
  ADDED_ORDER_SUCCESS,
  ADDED_ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from '../../actions/types';

export const addedOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ADDED_ORDER_REQUEST:
      return { loading: true };
    case ADDED_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ADDED_ORDER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { details: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, success: true, details: action.payload };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
