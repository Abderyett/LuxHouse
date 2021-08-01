import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import shelf from '../utilities/svg/shelf.svg';
import { color, shadow, rounded } from '../utilities';

export function CartScreen() {
  const cart = useSelector((state) => state.cart);

  const { cartItem } = cart;
  console.log(cartItem);

  return (
    <>
      <Header />
      <IMG src={shelf} alt="pendent lamp with shelf" />
      <Container>
        <Wrapper>
          <CartItem>
            <Card />
          </CartItem>
          <CheckoutSection>
            <CheckoutWrapper>
              <CheckoutHeader> Subtotal {cartItem.length} items</CheckoutHeader>
              <TotalPrice>$399</TotalPrice>
              <BtnWrapper>
                <Btn to="/checkout">proceed to checkout</Btn>
              </BtnWrapper>
            </CheckoutWrapper>
          </CheckoutSection>
        </Wrapper>
      </Container>
    </>
  );
}

// {cartItem.length > 0 && cartItem.map((el) => <div>{el._id}</div>)}

const Container = styled.div`
  position: relative;
  max-width: 1880px;
  height: 100vh;
  /* z-index: -1; */
  cursor: pointer;
  display: grid;
  justify-content: center;
  align-content: start;
`;

const IMG = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  cursor: pointer;
  width: 20rem;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 60vw;
  display: grid;
  justify-items: center;
  grid-template-columns: 3fr 1fr;
  margin-top: 5rem;
  height: 500px;
  box-shadow: ${shadow.xl};
  border-radius: ${rounded.sm};
  border: 1px solid grey;
  z-index: 3;
`;

const CartItem = styled.section``;

const Card = styled.div``;

const CheckoutSection = styled.section``;
const CheckoutWrapper = styled.div`
  width: 20rem;
  height: 15rem;
  border: 1px solid ${color.grey_400};
  padding: 1rem;
  margin: 1rem;
`;
const CheckoutHeader = styled.h4`
  text-align: center;
  padding-top: 1rem;
`;
const TotalPrice = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${color.grey_600};
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${color.grey_400};
`;

const Btn = styled(Link)`
  text-transform: uppercase;
  background-color: ${color.black};
  color: ${color.white};
  padding: 1rem 2.5rem;
  font-weight: bold;
  border: 1px solid black;
  transition: all 0.6s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const BtnWrapper = styled.div`
  margin-top: 4rem;
`;
