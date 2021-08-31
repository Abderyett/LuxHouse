import { PAYMENT_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAIL } from '../../actions/types';

export const paymentReducer = (state = { paymentStatus: {} }, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return { loading: true };
    case PAYMENT_SUCCESS:
      return { loading: false, paymentStatus: action.payload };
    case PAYMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
