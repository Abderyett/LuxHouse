import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function CheckoutScreen() {
  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push('/login');
    }
  }, [user]);
  return <div>Checkout</div>;
}
