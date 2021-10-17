import {
  ADDED_ORDER_FAIL,
  ADDED_ORDER_SUCCESS,
  ADDED_ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
  ADDED_ORDER_RESET,
  ORDERS_DETAILS_FAIL,
  ORDERS_DETAILS_SUCCESS,
  ORDERS_DETAILS_REQUEST,
  ORDERS_DETAILS_RESET,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  UPDATE_DELIVERY_ORDER_REQUEST,
  UPDATE_DELIVERY_ORDER_SUCCESS,
  UPDATE_DELIVERY_ORDER_FAIL,
  UPDATE_DELIVERY_ORDER_RESET,
} from '../../actions/types';

export const addedOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ADDED_ORDER_REQUEST:
      return { loading: true };
    case ADDED_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ADDED_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case ADDED_ORDER_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true, details: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, success: true, details: action.payload };

    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
export const ordersDetailsReducer = (state = { loading: true, orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDERS_DETAILS_SUCCESS:
      return { ...state, loading: false, success: true, orders: action.payload };

    case ORDERS_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDERS_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const allOrdersReducer = (state = { loading: true, orders: {} }, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_ORDERS_SUCCESS:
      return { ...state, loading: false, success: true, orders: action.payload };

    case GET_ALL_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deliveryUpdateReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case UPDATE_DELIVERY_ORDER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_DELIVERY_ORDER_SUCCESS:
      return { ...state, loading: false, success: true };

    case UPDATE_DELIVERY_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_DELIVERY_ORDER_RESET:
      return {};

    default:
      return state;
  }
};
