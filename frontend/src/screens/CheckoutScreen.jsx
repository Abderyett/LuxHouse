import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import { Header, Meta } from '../components';
import { color, shadow, rounded } from '../utilities';
import { addedShippingAdress } from '../actions/cartAction';
import sofa from '../utilities/svg/checkoutSofa.svg';
import pendant from '../utilities/svg/pendant.svg';

export function CheckoutScreen() {
  const [countries, setCountries] = useState(JSON.parse(localStorage.getItem('countries')));
  const [city, setCity] = useState([]);
  // toggle Dorpdown
  const [showCountry, setShowCountry] = useState(false);
  const [showState, setShowState] = useState(false);
  //= =============
  const [flagUrl, setFlagUrl] = useState('');

  // state to submit
  const [countryName, setCountryName] = useState('');
  const [selectCity, setSelectCity] = useState();
  const [street, setStreet] = useState('');
  const [postCode, setPostCode] = useState('');
  const [token, setToken] = useState('');
  const [formValidate, setFormValidate] = useState(true);

  // Search Country
  const [term, setTerm] = useState('');
  const [newCountries, setNewCountries] = useState(countries);

  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);
  const { user } = userDetails;
  const { userInfo } = userLogin;
  const { cartItem } = cart;

  //* Check if user is loged in
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (cartItem.length === 0) {
      history.push('/products');
    }
  }, [user, history]);

  // * Fetch countries and flag from Backend

  const getCountries = async () => {
    try {
      const { data } = await axios.get('/api/v1/countries');

      setCountries(data);
      localStorage.setItem('coutries', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  //* Select Country

  const selectedCountry = (event) => {
    setCountryName(event.target.textContent);
    setFlagUrl(event.target.firstChild.src);
  };

  //* Get Access Token & Fetch state relative to selected Country
  const tokenConfig = {
    headers: {
      Accept: 'application/json',
      'api-token': process.env.REACT_APP_GET_TOKEN,
      'user-email': 'com.admi2017@gmail.com',
    },
  };
  const tokenUrl = 'https://www.universal-tutorial.com/api/getaccesstoken';
  const getToken = async () => {
    try {
      const { data } = await axios.get(tokenUrl, tokenConfig);
      setToken(data.auth_token);
    } catch (error) {
      console.log(error);
    }
  };

  const getState = async () => {
    const initialUrl = `https://www.universal-tutorial.com/api/states/Canada`;
    const selectedUrl = `https://www.universal-tutorial.com/api/states/${countryName}`;

    const endPoint = countryName.length === 0 ? initialUrl : selectedUrl;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(endPoint, config);

      setCity(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getState();
  }, [countryName, token]);

  //* Show and hide state, country Dropdown

  const toggleCountrie = () => {
    setShowCountry(!showCountry);
    setShowState(false);
    setTerm('');
    setNewCountries(countries);
  };
  const toggleCities = () => {
    setShowState(!showState);
    setShowCountry(false);
  };

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
    history.push('/shippingmethod');
  };
  useEffect(() => {
    if (selectCity) {
      setFormValidate(false);
    } else {
      setFormValidate(true);
    }
  }, [countryName, selectCity, street, postCode, history]);

  const searchedCountry = (e) => {
    setTerm(e.target.value);
    const newCountry = countries.filter((el) => el.name.toLowerCase().includes(term.toLowerCase()));
    if (term.length > 0) {
      setNewCountries(newCountry);
    } else {
      setNewCountries(countries);
    }
  };

  return (
    <>
      <Meta title="Checkout" />
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
        <FirstHeading>Shipping Adress</FirstHeading>
        <Line />
        <Wrap>
          <Country onClick={toggleCountrie} showCountry={showCountry}>
            {countryName ? (
              <Selected>
                <span>
                  <img src={flagUrl} alt={countryName} />
                  {countryName}
                </span>
              </Selected>
            ) : (
              <Selected>
                <span>
                  <img src="https://www.countryflags.io/ca/shiny/64.png" alt="Canada" />
                  Canada
                </span>
              </Selected>
            )}

            <Arrow />

            <CountryWrapper showCountry={showCountry}>
              <SearchCounrty type="text" onClick={(e) => e.stopPropagation()} onChange={searchedCountry} value={term} />
              {newCountries &&
                newCountries.map((country) => (
                  <ImgWrapper key={country._id} onClick={selectedCountry}>
                    <span>
                      <img src={country.flag} alt={country.name} />

                      {country.name}
                    </span>
                  </ImgWrapper>
                ))}
            </CountryWrapper>
          </Country>
          <State onClick={toggleCities} showState={showState}>
            {selectCity ? <Text>{selectCity}</Text> : <Text>Select City</Text>}
            <Arrow />

            <StateWrapper showState={showState} onClick={(e) => setSelectCity(e.target.textContent)}>
              {city &&
                city.map((c, index) => (
                  <StateWarpp key={index}>
                    <span>{c.state_name}</span>
                  </StateWarpp>
                ))}
            </StateWrapper>
          </State>
          <form onSubmit={submitHandler}>
            <Street
              type="text"
              placeholder="Street"
              name="street"
              value={street}
              required
              onChange={(e) => setStreet(e.target.value)}
            />
            <PostCode
              type="text"
              placeholder="Postal Code"
              name="postCode"
              value={postCode}
              required
              onChange={(e) => setPostCode(e.target.value)}
            />
            <ButtonWrapper>
              <SubmitBtn formValidate={formValidate} disabled={formValidate} type="submit">
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
  width: 40%;

  border: 1px solid ${color.grey_400};
  border-radius: ${rounded.md};
  box-shadow: ${shadow.md};
  margin: 3rem;
  padding: 3rem;
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

//* Styled Input
const styledInput = css`
  border-radius: ${rounded.md};
  height: 3rem;
  width: 35rem;
  max-width: 35rem;
  text-indent: 5%;
  font-size: 1.2rem;
  color: ${color.grey_800};
  font-family: 'avenir_regular';
  box-shadow: ${shadow.lg};
  margin-top: 2rem;
  box-shadow: ${({ error }) => error && `0px 0px 0px 2px ${color.red_vivid_500}`};
  z-index: 1;

  @media (max-width: 768px) {
    width: 90vw;
  }
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.grey_400};
  }
`;

const PostCode = styled.input`
  ${styledInput};
  text-transform: uppercase;
  ::placeholder {
    text-transform: capitalize;
  }
`;

//* =================

//* Select Country Section ========
const Street = styled.input`
  ${styledInput}
  text-transform: capitalize;
`;
const wrapper = css`
  width: auto;
  height: 100%;
  padding-top: 1rem;
  overflow-y: scroll;
  background-color: ${color.white};
  box-shadow: ${shadow.lg};

  margin-top: 0.5rem;
  border-radius: ${rounded.md};

  img {
    width: 40px;

    margin-right: 1rem;

    vertical-align: middle;
  }
`;

const CountryWrapper = styled.div`
  ${wrapper}
  display:${({ showCountry }) => (showCountry ? 'block' : 'none')};

  position: relative;
  height: 20rem;
`;

const Country = styled.div`
  ${styledInput}

  padding-top: 3.1rem;
  position: relative;
  cursor: pointer;
  z-index: 999;

  box-shadow: ${({ showCountry }) => (showCountry ? `0px 0px 0px 2px ${color.grey_400}` : '')};
`;

const Arrow = styled(FaSort)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
//* =============================

const wrapp = css`
  display: grid;
  padding-bottom: 1rem;
  padding-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${color.grey_100};
  }
`;
//* Coutries Flags Wrapper
const ImgWrapper = styled.div`
  ${wrapp}
  &:first-of-type {
    margin-top: 3.5rem;
  }
`;

const StateWarpp = styled.div`
  ${wrapp}
`;

//* State selection =============

const State = styled.div`
  ${styledInput}

  padding-top: 3.1rem;
  position: relative;
  cursor: pointer;
  box-shadow: ${({ showState }) => (showState ? `0px 0px 0px 2px ${color.grey_400}` : '')};
`;
const StateWrapper = styled.div`
  ${wrapper}
  height: 15rem;
  display: ${({ showState }) => (showState ? 'block' : 'none')};
`;

//* Selected Flag and Country ============

const Selected = styled.div`
  position: absolute;
  top: 0.2rem;

  width: 100%;
  span {
    img {
      width: 40px;

      margin-right: 1rem;

      vertical-align: middle;
    }
  }
`;
const Text = styled.p`
  position: absolute;
  top: 0.75rem;
  left: 1rem;
  width: 100%;
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
  cursor: ${({ formValidate }) => (formValidate ? 'not-allowed' : 'pointer')};
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

//* SVG ==========
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
  border-bottom: 2px solid ${color.grey_500};
  padding-bottom: 1rem;
  color: ${color.grey_500};
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

const Div = styled.div``;

const SearchCounrty = styled.input`
  ${styledInput}
  height: 2.5rem;
  width: 28rem;
  position: absolute;
  top: 0;

  background-color: ${color.white};
  box-shadow: 0px 0px 0px 2px ${color.grey_300};
  /* opacity: ${({ show }) => (show ? 1 : 0)}; */

  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.scallop_shell};
  }
`;
