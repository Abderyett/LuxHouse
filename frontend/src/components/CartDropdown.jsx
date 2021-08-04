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
        {cartItem.map((el) => (
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
        ))}
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
  padding: 1.4rem;
  background-color: ${color.white};
  z-index: 999 !important;
`;

const Content = styled.div`
  width: 100%;
  height: 14.5rem;
  overflow-y: auto;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled(Link)`
  text-transform: uppercase;
  background-color: ${color.white};
  color: ${color.black};
  padding: 1rem 2.5rem;
  font-weight: bold;
  border: 1px solid black;
  transition: all 0.6s ease-in-out;
  margin-top: 1rem;
  &:hover {
    background-color: ${color.black};
    color: ${color.white};
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
