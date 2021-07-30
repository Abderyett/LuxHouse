import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ShoppingIcon } from '../utilities/svg/ShoppingIcon.svg';

export function CartIcon() {
  return (
    <Container>
      <StyledShoppingIcon />
      <span>10</span>
    </Container>
  );
}

const Container = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    position: absolute;
    bottom: 10px;
    font-size: 12px;
  }
`;

const StyledShoppingIcon = styled(ShoppingIcon)`
  width: 25px;
  height: 25px;
`;
