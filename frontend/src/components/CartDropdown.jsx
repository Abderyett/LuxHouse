import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { color, shadow } from '../utilities';
import { toggleCart } from '../actions/cartAction';

export function CartDropdown() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { cartItem } = cart;

  return (
    <Container>
      <Content>
        {cartItem.length === 0 ? (
          <EmptyText>Your cart is empty</EmptyText>
        ) : (
          cartItem.map((el) => (
            <Wrapper key={el.id}>
              <ImgWrapper>
                <img src={el.image[0].url} alt={el.subcategory} />
              </ImgWrapper>
              <Text>
                <p>{el.name}</p>
                <p>
                  {el.quantity} X ${el.price}
                </p>
              </Text>
            </Wrapper>
          ))
        )}
      </Content>
      <BtnContainer>
        <Button onClick={() => dispatch(toggleCart())} to="/cart">
          Go to checkout
        </Button>
      </BtnContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 5.5rem;
  right: 1rem;
  width: 20rem;
  height: 22rem;
  box-shadow: ${shadow.xxl};
  padding: 1rem;
  background-color: ${color.white};
  z-index: 999 !important;
`;

const Content = styled.div`
  width: 100%;
  height: 14.5rem;
  padding: 0.5rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled(Link)`
  text-transform: uppercase;
  background-color: ${color.black};
  color: ${color.white};
  padding: 1rem 2.5rem;
  font-weight: bold;
  border: 1px solid black;
  transition: all 0.6s ease-in-out;
  margin-top: 1rem;
  &:hover {
    background-color: ${color.white};
    color: ${color.black};
  }
`;

const Wrapper = styled.div`
  display: flex;

  align-items: center;
`;

const ImgWrapper = styled.div`
  img {
    width: 5rem;
    margin-right: 1.5rem;
  }
`;

const Text = styled.div`
  p {
    color: ${color.grey_800};
    font-weight: bold;
  }
`;

const EmptyText = styled.p`
  padding: 3rem;
  font-weight: bold;
  font-size: 1.2rem;
`;
