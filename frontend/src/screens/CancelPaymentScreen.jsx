import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FcCancel } from 'react-icons/fc';
import { color } from '../utilities';

export function CancelPaymentScreen() {
  const history = useHistory();

  return (
    <Container>
      <h4>
        <CancelIcon /> &nbsp; Payment failed
      </h4>
      <p>Payment was not successful</p>
      <BtnWrapper>
        <Btn type="button" onClick={() => history.push('/products')}>
          Continue Shopping
        </Btn>
      </BtnWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  margin-top: 5rem;
  p {
    width: 50ch;
    text-align: center;
    padding-top: 1rem;
    line-height: 2rem;
  }
  h4 {
    text-transform: none;
  }
`;

const Btn = styled.button`
  text-transform: uppercase;
  background-color: ${color.black};
  color: ${color.white};
  padding: 1rem 3rem;
  font-weight: bold;
  border: 1px solid black;
  transition: all 0.6s ease-in-out;
  cursor: pointer;
  font-family: 'avenir_semi';
  letter-spacing: 0.125rem;
  font-size: 1.1rem;
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

const CancelIcon = styled(FcCancel)`
  width: 2rem;
  vertical-align: middle;
`;
