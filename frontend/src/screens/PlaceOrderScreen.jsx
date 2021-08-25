/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../components';
import { color, shadow, rounded } from '../utilities';
import { addedShippingMethod } from '../actions/cartAction';
import sofa from '../utilities/svg/checkoutSofa.svg';

export function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const cart = useSelector((state) => state.cart);
  const { user } = userDetails;
  const { shippingMethod, shippingAdress, cartItem, payment } = cart;

  //* Check if user is loged in
  if (!shippingAdress && !shippingMethod && !payment) {
    history.push('/cart');
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push('/login');
    }
  }, [user]);

  //* Submit  Data to store
  const submitHandler = (e) => {
    e.preventDefault();

    history.push('/placeorder');
  };

  return (
    <>
      <Header />
      <IMG src={sofa} alt="sofa" />

      <ProgressWrapper>
        <ShippingAdress>Shipping Adress</ShippingAdress>
        <ShippingMethod>Shipping Method</ShippingMethod>
        <Payment>Payement</Payment>
        <PlaceOrder>Place Order</PlaceOrder>
      </ProgressWrapper>
      <Container>
        <FirstHeading>Place Order</FirstHeading>
        <Line />
        <Wrap>
          <form onSubmit={submitHandler}>
            <Heading>Shipping Adress</Heading>
            <Content>
              <b>Adress:</b> &nbsp;{' '}
              {shippingAdress &&
                `${shippingAdress.street}, ${shippingAdress.city} ${shippingAdress.postalCode}, ${shippingAdress.country}`}
            </Content>
            <Line />
            <Heading>Payment Method</Heading>
            <Content>
              <b>Method:</b> &nbsp;
              {payment && payment}
            </Content>
            <Line />
            <Heading>Shipping Method</Heading>
            <Content>
              <b>Choosed Package:</b> &nbsp;
              {shippingMethod && shippingMethod.shippingPackage}
            </Content>
            <Content>
              <b>Estimated delivery date:</b> &nbsp;
              {shippingMethod && shippingMethod.deliveryDate}
            </Content>
            <Line />
            <Heading>Order Items</Heading>

            {cartItem.map((el) => (
              <Wrapper key={el._id}>
                <ImageContent>
                  <Image src={el.image && el.image[0].url} alt={el.name} />
                  {el.name} &nbsp;({el.subcategory})
                </ImageContent>
                <PriceContent>
                  {el.quantity} X $ {el.price} = $ {el.quantity * el.price}
                </PriceContent>
              </Wrapper>
            ))}

            <ButtonWrapper>
              <SubmitBtn disabled type="submit">
                Continue
              </SubmitBtn>
            </ButtonWrapper>
          </form>
        </Wrap>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 50%;

  border: 1px solid ${color.grey_400};
  border-radius: ${rounded.md};
  box-shadow: ${shadow.md};
  margin: 3rem;
  padding: 2rem;
  background-color: ${color.white};
  z-index: 99;
`;

//* Heading
const FirstHeading = styled.h4`
  font-family: 'avenir_semi';
  margin-bottom: 3rem;
`;
const Heading = styled.h5`
  font-family: 'avenir_semi';
  padding: 1.5rem 0;
`;
const Line = styled.div`
  width: 100%;

  border-top: 2px solid ${color.grey_300};
`;

const Content = styled.p`
  text-transform: capitalize;
  color: ${color.grey_800};
`;
const PriceContent = styled.p`
  color: ${color.grey_800};
  width: 25%;
`;
const ImageContent = styled.p`
  text-transform: capitalize;
  color: ${color.grey_800};
  width: 70%;
  img {
    vertical-align: middle;
    margin-right: 1rem;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;

//* =================

const Wrap = styled.div`
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Image = styled.img`
  width: 5%;
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
  bottom: -50%;
  right: 0;
  width: 50%;
  z-index: -1;
`;

//* Progress Bar

const ProgressWrapper = styled.div`
  display: flex;
  padding: 3rem 3rem 0 3rem;
`;
const ShippingAdress = styled.div`
  width: 11rem;
  border-bottom: 2px solid ${color.scallop_shell};
  padding-bottom: 1rem;
  color: ${color.scallop_shell};
`;

const ShippingMethod = styled.div`
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
  border-bottom: 2px solid ${color.scallop_shell};
  padding-bottom: 1rem;
  color: ${color.scallop_shell};
`;
