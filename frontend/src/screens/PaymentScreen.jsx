import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from '../components';
import { color, shadow, rounded } from '../utilities';
import { addedPaymentMethod } from '../actions/cartAction';
import sofa from '../utilities/svg/checkoutSofa.svg';
import pendant from '../utilities/svg/pendant.svg';

export function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const { user } = userDetails;

  //* Check if user is loged in
  // if (!cart.ShippingAdress) {
  //   history.push('/checkout');
  // }

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push('/login');
    }
  }, [user]);

  // * Fetch countries and flag from Backend

  //* Submit  Data to store
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addedPaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <Header />
      <IMG src={sofa} alt="sofa" />
      <Pendant src={pendant} alt="Pendant" />
      <ProgressWrapper>
        <SignIn>Signin</SignIn>
        <ShippingAdress>Shipping</ShippingAdress>
        <Payment>Payement</Payment>
        <PlaceOrder>Place Order</PlaceOrder>
      </ProgressWrapper>
      <Container>
        <FirstHeading>Payment Method</FirstHeading>
        <Line />
        <Wrap>
          <form onSubmit={submitHandler}>
            <InputWrapper>
              <div>
                <label htmlFor="street">
                  <input
                    id="street"
                    type="radio"
                    name="group1"
                    value="Credit Card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                    checked
                  />
                  <span>Credit Card</span>
                </label>
              </div>

              <div>
                <label htmlFor="postCode">
                  <input
                    id="postCode"
                    type="radio"
                    name="group1"
                    value="Paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  />
                  <span>Paypal</span>
                </label>
              </div>
            </InputWrapper>
            <ButtonWrapper>
              <SubmitBtn type="submit">Continue</SubmitBtn>
            </ButtonWrapper>
          </form>
        </Wrap>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 40%;

  border: 1px solid ${color.grey_400};
  border-radius: ${rounded.md};
  box-shadow: ${shadow.md};
  margin: 3rem;
  padding: 2rem;
`;

const FirstHeading = styled.h4`
  font-family: 'avenir_semi';
  margin-bottom: 3rem;
`;
const Line = styled.div`
  width: 90%;

  border-top: 2px solid ${color.grey_300};
`;

const Wrap = styled.div`
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  input {
    margin-bottom: 1rem;
  }
  label {
    span {
      padding-left: 1rem;
      font-size: 1.3rem;
    }
  }
`;

//* ==========================

const SubmitBtn = styled.button`
  background: transparent;
  border: 2.5px solid ${color.black};
  border-radius: ${rounded.sm};
  padding: 0.75rem 4rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-family: 'avenir_semi';
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.6s ease-in-out;
  &:hover {
    background-color: ${color.black};
    color: ${color.white};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 1rem;
`;

const IMG = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
`;
const Pendant = styled.img`
  position: absolute;
  top: 0;
  right: 20%;
`;

//* Progress Bar

const ProgressWrapper = styled.div`
  display: flex;
  padding: 3rem 3rem 0 3rem;
`;
const SignIn = styled.div`
  width: 11rem;
  border-bottom: 2px solid ${color.scallop_shell};
  padding-bottom: 1rem;
  color: ${color.scallop_shell};
`;

const ShippingAdress = styled.div`
  width: 11rem;
  border-bottom: 2px solid ${color.scallop_shell};
  padding-bottom: 1rem;
  color: ${color.scallop_shell};
`;
const Payment = styled.div`
  width: 11rem;
  border-bottom: 2px solid ${color.scallop_shell};
  padding-bottom: 1rem;
  color: ${color.scallop_shell};
`;
const PlaceOrder = styled.div`
  width: 10rem;
  border-bottom: 2px solid ${color.grey_300};
  padding-bottom: 1rem;
`;
