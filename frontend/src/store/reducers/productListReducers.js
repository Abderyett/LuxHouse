import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  GET_ID,
} from '../../actions/types';

export const productListReducer = (state = { products: [], loading: false }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {}, loading: false }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const removeSingleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_REQUEST:
      return { loading: true };
    case REMOVE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REMOVE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const selectedIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ID:
      return { id: action.payload };

    default:
      return state;
  }
};
