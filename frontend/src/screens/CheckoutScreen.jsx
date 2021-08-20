import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import { Header } from '../components';
import { color, shadow, rounded } from '../utilities';

export function CheckoutScreen() {
  const [countries, setCountries] = useState(null);
  // toggle Dorpdown
  const [showCountry, setShowCountry] = useState(false);
  const [showState, setShowState] = useState(false);
  //= =============
  const [countryName, setCountryName] = useState('');
  const [flagUrl, setFlagUrl] = useState('');

  const [city, setCity] = useState([]);
  const [selectCity, setSelectCity] = useState();

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

  const getCountries = async () => {
    try {
      const { data } = await axios.get('/api/v1/countries');
      setCountries(data);
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

  //* Fetch state relative to selected Country
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_STATE_TOKEN}`,
    },
  };

  const initialUrl = `https://www.universal-tutorial.com/api/states/canada`;
  const selectedUrl = `https://www.universal-tutorial.com/api/states/${countryName}`;

  const endPoint = countryName.length === 0 ? initialUrl : selectedUrl;
  const getState = async () => {
    try {
      const { data } = await axios.get(endPoint, config);
      setCity(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getState();
  }, [countryName]);

  //* Show and hide state, country Dropdown

  const countryHandler = () => {
    setShowCountry(!showCountry);
    setShowState(false);
  };
  const stateHandler = () => {
    setShowState(!showState);
    setShowCountry(false);
  };

  return (
    <>
      <Header />
      <Container>
        <FirstHeading>Shipping Adress</FirstHeading>
        <Line />
        <Wrap>
          <Country onClick={countryHandler}>
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
                  <img src="https://restcountries.eu/data/can.svg" alt="Canada" />
                  Canada
                </span>
              </Selected>
            )}

            <Arrow />
            {showCountry && (
              <CountryWrapper>
                {countries &&
                  countries.map((country) => (
                    <ImgWrapper key={country._id} onClick={selectedCountry}>
                      <span>
                        <img src={country.flag} alt={country.name} />

                        {country.name}
                      </span>
                    </ImgWrapper>
                  ))}
              </CountryWrapper>
            )}
          </Country>
          <State onClick={stateHandler}>
            {selectCity || <Text>Select State</Text>}
            <Arrow />
            {showState && (
              <StateWrapper onClick={(e) => setSelectCity(e.target.textContent)}>
                {city &&
                  city.map((c, index) => (
                    <ImgWrapper key={index}>
                      <span>{c.state_name}</span>
                    </ImgWrapper>
                  ))}
              </StateWrapper>
            )}
          </State>

          <Input type="text" placeholder="Street" />
          <Input type="text" placeholder="Postal Code" />
        </Wrap>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 60vw;

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
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

//* Styled Input
const styledInput = css`
  border-radius: ${rounded.md};
  height: 3rem;
  width: 30rem;
  max-width: 30rem;
  text-indent: 5%;
  font-size: 1.2rem;
  color: ${color.grey_800};
  font-family: 'avenir_regular';
  box-shadow: ${shadow.lg};
  margin-top: 1rem;
  box-shadow: ${({ error }) => error && `0px 0px 0px 2px ${color.red_vivid_500}`};
  z-index: 0;

  @media (max-width: 768px) {
    width: 90vw;
  }
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.grey_400};
  }
`;
//* =================

//* Select Country Section ========
const Input = styled.input`
  ${styledInput}
`;
const wrapper = css`
  width: 100%;
  height: 400px;
  padding-top: 1rem;
  overflow-y: scroll;
  background-color: ${color.white};
  box-shadow: ${shadow.lg};
  z-index: 99;
  margin-top: 0.5rem;
  border-radius: ${rounded.md};

  img {
    width: 8%;

    margin-right: 1rem;
    border: 1px solid ${color.grey_300};
    border-radius: ${rounded.sm};
    vertical-align: middle;
  }
`;

const CountryWrapper = styled.div`
  ${wrapper}
`;

const Country = styled.div`
  ${styledInput}

  padding-top: 3.1rem;
  position: relative;
  cursor: pointer;
`;

const Arrow = styled(FaSort)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
//* =============================

//* Coutries Flags Wrapper
const ImgWrapper = styled.div`
  display: grid;
  padding-bottom: 1rem;
  padding-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${color.grey_100};
  }
`;
//* State selection =============

const State = styled.div`
  ${styledInput}

  padding-top: 3.1rem;
  position: relative;
  cursor: pointer;
`;
const StateWrapper = styled.div`
  ${wrapper}
`;

//* Selected Flag and Country ============

const Selected = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 1rem;
  span {
    img {
      width: 8%;

      margin-right: 1rem;
      border: 1px solid ${color.grey_300};
      border-radius: ${rounded.sm};
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

const Select = styled.select`
  ${styledInput}
`;

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
  &:hover {
    background-color: ${color.white};
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 1rem;
`;
