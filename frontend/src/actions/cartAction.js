import { INCREASE, DECREASE } from './types';

export const incrementCount = () => (dispatch) => {
  dispatch({
    type: INCREASE,
  });
};
export const decrementCount = () => (dispatch) => {
  dispatch({
    type: DECREASE,
  });
};
