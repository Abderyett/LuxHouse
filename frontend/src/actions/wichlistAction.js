import axios from 'axios';
import { ADD_TO_WICHLIST, EMPTY_WICHLIST, REMOVE_FROM_WICHLIST } from './types';

export const addToWichlist = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  console.log(data);
  dispatch({
    type: ADD_TO_WICHLIST,
    payload: {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      subcategory: data.subcategory,
      description: data.description,
    },
  });

  localStorage.setItem('wichlist', JSON.stringify(getState().wichlist.items));
};

export const removeFromWichlist = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_WICHLIST,
    payload: id,
  });
  localStorage.setItem('wichlist', JSON.stringify(getState().cart.cartItem));
};
export const emptyWichList = () => (dispatch) => {
  dispatch({
    type: EMPTY_WICHLIST,
  });
  localStorage.removeItem('wichlist');
};
