import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { color, shadow } from '../utilities';
import { toggleCart } from '../actions/cartAction';

export function CartDropdown() {
  const dispatch = useDispatch();

  return (
    <Container>
      <Content>Content</Content>
      <BtnContainer>
        <Button onClick={() => dispatch(toggleCart())} to="/cart">
          Go to checkout
        </Button>
      </BtnContainer>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 5.5rem;
  right: 1rem;
  width: 17rem;
  height: 20rem;
  box-shadow: ${shadow.xxl};
  padding: 0.75rem;
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
  &:hover {
    background-color: ${color.black};
    color: ${color.white};
  }
`;
