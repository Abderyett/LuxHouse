/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BsDot } from 'react-icons/bs';
import moment from 'moment';
import { Header } from '../components';
import { color, shadow, rounded } from '../utilities';
import { addedShippingMethod } from '../actions/cartAction';
import sofa from '../utilities/svg/checkoutSofa.svg';
import pendant from '../utilities/svg/pendant.svg';

export function ShippingMethodScreen() {
  const [shippingMethod, setShippingMethod] = useState();
  const [price, setPrice] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const cart = useSelector((state) => state.cart);

  const { user } = userDetails;

  //* Check if user is loged in
  if (!cart.shippingAdress) {
    history.push('/checkout');
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push('/login');
    }
  }, [user]);

  //* Submit  Data to store
  const submitHandler = (e) => {
    e.preventDefault();
    if (shippingMethod && price) {
      dispatch(addedShippingMethod({ shippingPackage: shippingMethod, price }));
    } else {
      history.push('/shippingmethod');
    }

    history.push('/placeorder');
  };
  const getPrice = (word) => {
    const index = word.indexOf('$');
    const iend = word.indexOf('Estimated');
    const newWord = parseInt(word.substring(index + 1, iend - 1));
    setPrice(newWord);
  };

  const standardInfo = (e) => {
    const { standard } = e.currentTarget.dataset;
    setShippingMethod(standard);
    getPrice(e.currentTarget.textContent);
  };

  const premiumInfo = (e) => {
    const { premium } = e.currentTarget.dataset;

    setShippingMethod(premium);
    getPrice(e.currentTarget.textContent);
  };
  const fedexInfo = (e) => {
    const { fedex } = e.currentTarget.dataset;
    setShippingMethod(fedex);
    getPrice(e.currentTarget.textContent);
  };
  const expressInfo = (e) => {
    const { express } = e.currentTarget.dataset;
    setShippingMethod(express);
    getPrice(e.currentTarget.textContent);
  };

  return (
    <>
      <Header />
      <IMG src={sofa} alt="sofa" />
      <Pendant src={pendant} alt="Pendant" />
      <ProgressWrapper>
        <ShippingAdress>Shipping Adress</ShippingAdress>
        <ShippingMethod>Shipping Method</ShippingMethod>
        <Payment>Payement</Payment>
        <PlaceOrder>Place Order</PlaceOrder>
      </ProgressWrapper>
      <Container>
        <FirstHeading>Available Shipping Method</FirstHeading>
        <Line />
        <Wrap>
          <form onSubmit={submitHandler}>
            <InputWrapper>
              <ShippingWrapper>
                <FirstBox
                  data-standard="Standard Shipping"
                  onClick={standardInfo}
                  selected={shippingMethod === 'Standard Shipping' ? 1 : 0}
                >
                  <h4>Standard Shipping</h4>
                  <p>
                    $20
                    <StyledDot /> Estimated Delivery Date {moment().add(100, 'days').format('DD.MM.YYYY')}
                  </p>
                </FirstBox>
                <SecondBox
                  data-premium="Premium Delivery"
                  onClick={premiumInfo}
                  selected={shippingMethod === 'Premium Delivery' ? 1 : 0}
                >
                  <h4>Premium Delivery</h4>
                  <p>
                    $120
                    <StyledDot /> Estimated Delivery Date {moment().add(5, 'days').format('DD.MM.YYYY')}
                  </p>
                </SecondBox>
                <ThirdBox data-fedex="FedEx" onClick={fedexInfo} selected={shippingMethod === 'FedEx' ? 1 : 0}>
                  <h4>FedEx</h4>
                  <p>
                    $70
                    <StyledDot /> Estimated Delivery Date {moment().add(30, 'days').format('DD.MM.YYYY')}
                  </p>
                </ThirdBox>
                <ForthBox
                  data-express="Express Shipping"
                  onClick={expressInfo}
                  selected={shippingMethod === 'Express Shipping' ? 1 : 0}
                >
                  <h4>Express Shipping</h4>
                  <p>
                    $90
                    <StyledDot /> Estimated Delivery Date {moment().add(20, 'days').format('DD.MM.YYYY')}
                  </p>
                </ForthBox>
              </ShippingWrapper>
            </InputWrapper>
            <ButtonWrapper>
              <SubmitBtn disabled={!shippingMethod} type="submit">
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
`;

const FirstHeading = styled.h4`
  font-family: 'avenir_semi';
  margin-bottom: 3rem;
`;
const Line = styled.div`
  width: 100%;

  border-top: 2px solid ${color.grey_300};
`;

const Wrap = styled.div`
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  input {
    margin-bottom: 1rem;
  }
  label {
    span {
      padding-left: 1rem;
      font-size: 1.3rem;
    }
  }
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
  bottom: 0;
  right: 0;
  width: 50%;
`;
const Pendant = styled.img`
  position: absolute;
  top: 0;
  right: 20%;
`;
//* Shipping container

const ShippingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-gap: 1rem;
  margin-top: 1rem;
`;
const box = css`
  border: 2px solid ${color.black};
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: ${rounded.sm};

  &:hover {
    background-color: ${color.black};
    color: ${color.white};
    p {
      color: ${color.white};
    }
  }
  background-color: ${({ selected }) => (selected ? color.black : color.white)};
  color: ${({ selected }) => (selected ? color.white : color.black)};
  p {
    color: ${({ selected }) => (selected ? color.white : color.black)};
  }
`;
const FirstBox = styled.div`
  ${box}
`;
const SecondBox = styled.div`
  ${box}
`;
const ThirdBox = styled.div`
  ${box}
`;
const ForthBox = styled.div`
  ${box}
`;

const StyledDot = styled(BsDot)`
  font-size: 2rem;
  vertical-align: middle;
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
  border-bottom: 2px solid ${color.grey_500};
  padding-bottom: 1rem;
  color: ${color.grey_500};
`;
const PlaceOrder = styled.div`
  width: 10rem;
  border-bottom: 2px solid ${color.grey_500};
  padding-bottom: 1rem;
  color: ${color.grey_500};
`;
