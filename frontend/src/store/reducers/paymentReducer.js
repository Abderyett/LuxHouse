import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  PAYMENT_UPDATE_REQUEST,
  PAYMENT_UPDATE_SUCCESS,
  PAYMENT_UPDATE_FAIL,
} from '../../actions/types';

export const paymentReducer = (state = { paymentStatus: {} }, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return { loading: true };
    case PAYMENT_SUCCESS:
      return { loading: false, paymentStatus: action.payload, isPaid: true };
    case PAYMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const updatePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_UPDATE_REQUEST:
      return { loading: true };
    case PAYMENT_UPDATE_SUCCESS:
      return { loading: false, paymentStatus: action.payload, success: true };
    case PAYMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
