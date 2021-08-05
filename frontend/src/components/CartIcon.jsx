import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../utilities/svg/ShoppingIcon.svg';
import { color } from '../utilities';

export function CartIcon() {
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;

  return (
    <Container>
      <StyledShoppingIcon />
      <span>{cartItem === [] ? 0 : cartItem.reduce((acc, item) => acc + item.quantity, 0)} </span>
    </Container>
  );
}

const Container = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    position: absolute;
    bottom: 15px;
    right: 5px;
    font-size: 10px !important;
    background-color: ${color.scallop_shell};
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledShoppingIcon = styled(ShoppingIcon)`
  width: 22px;
  height: 22px;
`;
