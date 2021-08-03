import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { Header } from '../components';
import shelf from '../utilities/svg/shelf.svg';
import { color, shadow, rounded } from '../utilities';

export function CartScreen() {
  const cart = useSelector((state) => state.cart);

  const { cartItem } = cart;

  return (
    <>
      <Header />
      <IMG src={shelf} alt="pendent lamp with shelf" />
      <Container>
        <Wrapper>
          <CartItem>
            <Card>
              {cartItem.length > 0 &&
                cartItem.map((el) => (
                  <>
                    <CardWrapper key={el._id}>
                      <CarImg>
                        <img src={el.image[0].url} alt={el.subcategory} />
                      </CarImg>
                      <p>{el.name}</p>
                      <IconWrapper>
                        <AiOutlinePlusCircle />
                        &nbsp;
                        <span>{el.quantity}</span>
                        &nbsp;
                        <AiOutlineMinusCircle />
                      </IconWrapper>
                      <p>$ {el.price}</p>
                      <IconTrash>
                        <BsTrash />
                      </IconTrash>
                    </CardWrapper>
                  </>
                ))}
            </Card>
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

// {
//   cartItem.length > 0 && cartItem.map((el) => <div>{el._id}</div>);
// }

const Container = styled.div`
  position: relative;
  max-width: 1880px;
  height: 100vh;
  /* z-index: -1; */
  cursor: pointer;
  display: grid;
  justify-content: start;
  align-content: start;
  margin-left: 10rem;
`;

//* SVG

const IMG = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  cursor: pointer;
  width: 20rem;
`;
//* Wrapper

const Wrapper = styled.div`
  max-width: 1200px;
  width: 70vw;
  display: grid;
  justify-items: center;
  grid-template-columns: 65% 1fr;

  margin-top: 5rem;

  z-index: 3;
  position: relative;

  svg {
    color: ${color.grey_700};
    width: 2rem;
  }
`;

//*  Card

const CartItem = styled.section`
  width: 100%;
`;

const Card = styled.div`
  height: 5rem;
  padding: 1rem;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: ${color.white};
  box-shadow: ${shadow.lg};
  border-radius: ${rounded.sm};
  margin-top: 1rem;
  align-items: center;
  p {
    margin-bottom: 0;
  }
`;

const CarImg = styled.div`
  width: 4rem;

  img {
    width: 4rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
    vertical-align: top;
    color: ${color.grey_700};
  }
`;

const IconTrash = styled.div`
  svg {
    &:hover {
      color: ${color.red_vivid_500};
    }
  }
`;

//* Checkout
const CheckoutSection = styled.section`
  width: 100%;
`;
const CheckoutWrapper = styled.div`
  width: auto;
  height: 15rem;
  border: 1px solid ${color.grey_400};
  padding: 1rem;
  margin: 1rem;
`;
const CheckoutHeader = styled.h4`
  text-align: center;
  font-size: 1.3rem;
  padding-top: 1rem;
`;
const TotalPrice = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
  color: ${color.grey_600};
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${color.grey_400};
`;

const Btn = styled(Link)`
  text-transform: uppercase;
  background-color: ${color.black};
  color: ${color.white};
  padding: 1rem 3rem;
  font-weight: bold;
  border: 1px solid black;
  transition: all 0.6s ease-in-out;

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
