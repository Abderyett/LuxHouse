import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ShoppingIcon } from '../utilities/svg/ShoppingIcon.svg';

export function CartIcon() {
  return (
    <Container>
      <StyledShoppingIcon />
      <span>0</span>
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
    bottom: 9px;
    font-size: 11px !important;
  }
`;

const StyledShoppingIcon = styled(ShoppingIcon)`
  width: 22px;
  height: 22px;
  vertical-align: middle;
`;
