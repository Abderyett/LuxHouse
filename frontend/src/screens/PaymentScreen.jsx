/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import { VscDebugStackframeDot } from 'react-icons/vsc';
import { Header } from '../components';
import { color, shadow, rounded } from '../utilities';
import { addedShippingAdress } from '../actions/cartAction';
import sofa from '../utilities/svg/checkoutSofa.svg';
import pendant from '../utilities/svg/pendant.svg';

export function PaymentScreen() {
  // state to submit
  const [countryName, setCountryName] = useState('');
  const [selectCity, setSelectCity] = useState();
  const [street, setStreet] = useState('');
  const [postCode, setPostCode] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  //* Check if user is loged in

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push('/login');
    }
  }, [user]);

  // * Fetch countries and flag from Backend

  //* Submit  Data to store
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addedShippingAdress({
        country: countryName.length === 0 ? 'Canada' : countryName,
        city: selectCity,
        street,
        postalCode: postCode,
      })
    );
    history.push('/payment');
  };

  return (
    <>
      <Header />
      <IMG src={sofa} alt="sofa" />
      <Pendant src={pendant} alt="Pendant" />
      <Container>
        <FirstHeading>Payment Method</FirstHeading>
        <Line />
        <Wrap>
          <form onSubmit={submitHandler}>
            <InputWrapper>
              <div>
                <input
                  type="checkbox"
                  id="street"
                  name="street"
                  value={street}
                  required
                  onChange={(e) => setStreet(e.target.value)}
                />

                <label htmlFor="street">Credit Card</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="postCode"
                  name="postCode"
                  value={postCode}
                  required
                  onChange={(e) => setPostCode(e.target.value)}
                />
                <label htmlFor="postCode"> Paypal</label>

              </div>

            </InputWrapper>
            <ButtonWrapper>
              <SubmitBtn type="submit">Continue</SubmitBtn>
            </ButtonWrapper>
          </form>
        </Wrap>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 40%;

  border: 1px solid ${color.grey_400};
  border-radius: ${rounded.md};
  box-shadow: ${shadow.md};
  margin: 3rem;
  padding: 2rem;
`;

const FirstHeading = styled.h4`
  font-family: 'avenir_semi';
  margin-bottom: 3rem;
`;
const Line = styled.div`
  width: 90%;

  border-top: 2px solid ${color.grey_300};
`;

const Wrap = styled.div`
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
const InputWrapper = styled.div`
display:flex;
flex-direction: column;
margin-top:1rem;
input{
  margin-bottom:1rem;
}
label{
  padding-left:1rem;
  font-size:1.3rem;
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
