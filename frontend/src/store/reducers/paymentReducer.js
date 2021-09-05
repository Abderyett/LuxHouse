import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  PAYMENT_STRIPE_UPDATE_REQUEST,
  PAYMENT_STRIPE_UPDATE_SUCCESS,
  PAYMENT_STRIPE_UPDATE_FAIL,
  PAYMENT_PAYPAL_UPDATE_REQUEST,
  PAYMENT_PAYPAL_UPDATE_SUCCESS,
  PAYMENT_PAYPAL_UPDATE_FAIL,
  PAYMENT_PAYPAL_RESET,
  PAYMENT_STRIPE_RESET,
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
export const updateStripePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_STRIPE_UPDATE_REQUEST:
      return { loading: true };
    case PAYMENT_STRIPE_UPDATE_SUCCESS:
      return { loading: false, paymentStatus: action.payload, success: true };
    case PAYMENT_STRIPE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_STRIPE_RESET:
      return {};

    default:
      return state;
  }
};
export const updatePaypalPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_PAYPAL_UPDATE_REQUEST:
      return { loading: true };
    case PAYMENT_PAYPAL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PAYMENT_PAYPAL_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_PAYPAL_RESET:
      return {};

    default:
      return state;
  }
};
