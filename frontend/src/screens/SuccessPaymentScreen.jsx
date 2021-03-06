import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FcOk } from 'react-icons/fc';
import { emptyCart } from '../actions/cartAction';
import { updateStripePayment } from '../actions/paymentAction';
import { Meta } from '../components';
import { color } from '../utilities';
import { ORDER_DETAILS_RESET, PAYMENT_PAYPAL_RESET } from '../actions/types';

export function SuccessPaymentScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const orderDetails = useSelector((state) => state.orderDetails);

  const orderId = JSON.parse(localStorage.getItem('orderDetails'));

  useEffect(() => {
    dispatch(emptyCart());
    dispatch(updateStripePayment(orderId));
    dispatch({ type: PAYMENT_PAYPAL_RESET });
  }, [dispatch, orderId]);

  useEffect(() => {
    if (orderDetails.success) {
      dispatch({ type: ORDER_DETAILS_RESET });
    }
  }, [orderDetails.success, dispatch]);
  return (
    <>
      <Meta title="Payment Successful" />
      <Container>
        <h4>
          {' '}
          <Check />
          &nbsp; Thank you for your order
        </h4>
        <p>We are currently proccessing your order and will sent you confirmation email shortly</p>
        <BtnWrapper>
          <Btn type="button" onClick={() => history.push('/products')}>
            Continue Shopping
          </Btn>
        </BtnWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  margin-top: 5rem;
  p {
    width: 50ch;
    text-align: center;
    padding-top: 1rem;
    line-height: 2rem;
  }
  h4 {
    text-transform: none;
  }
`;

const Btn = styled.button`
  text-transform: uppercase;
  background-color: ${color.black};
  color: ${color.white};
  padding: 1rem 3rem;
  font-weight: bold;
  border: 1px solid black;
  transition: all 0.6s ease-in-out;
  cursor: pointer;
  font-family: 'avenir_semi';
  letter-spacing: 0.125rem;
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const BtnWrapper = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Check = styled(FcOk)`
  width: 2rem;
  vertical-align: middle;
`;
