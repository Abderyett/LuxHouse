import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaSort } from 'react-icons/fa';
import { Header, Error } from '../components';
import { color, shadow, rounded } from '../utilities';

export function CheckoutScreen() {
  const [countries, setCountries] = useState(null);
  const [showCountry, setShowCountry] = useState(false);
  const [countryName, setCountryName] = useState();
  const [flagUrl, setFlagUrl] = useState('');

  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push('/login');
    }
  }, [user]);

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

  const selectedCountry = (event) => {
    setCountryName(event.target.textContent);
    setFlagUrl(event.target.firstChild.src);
  };

  return (
    <>
      <Header />
      <Container>
        <FirstHeading>Shipping Adress</FirstHeading>
        <Line />
        <Wrap>
          <Country onClick={() => setShowCountry(!showCountry)}>
            {countryName ? (
              <Selected>
                <span>
                  <img src={flagUrl} alt={countryName} />
                  {countryName}
                </span>
              </Selected>
            ) : (
              <Text>Select country</Text>
            )}
            <Arrow />
            {showCountry && (
              <CountryWrapper>
                {countries &&
                  countries.map((country) => (
                    <ImgWrapper onClick={selectedCountry}>
                      <span>
                        <img src={country.flag} alt={country.name} />

                        {country.name}
                      </span>
                    </ImgWrapper>
                  ))}
              </CountryWrapper>
            )}
          </Country>
          <Formik
            initialValues={{ country: '', state: '', street: '', postalCode: '' }}
            validationSchema={Yup.object({
              country: Yup.string().required('Please select your country'),
              name: Yup.string().required('Please select your State'),
              street: Yup.string().required('Please enter your Street'),
              postalCode: Yup.string().required('Please enter your Postal Code'),
            })}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              resetForm();
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                {/* <InputWrapper>
                  <StyledField
                    as="select"
                    id="country"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  >
                    {countries && countries.map((country) => <option>{country.name}</option>)}
                  </StyledField>
                  <Error touched={touched.name} message={errors.name} />
                </InputWrapper> */}

                <InputWrapper>
                  <Input
                    error={touched.email && errors.email}
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Your email"
                  />
                  <Error touched={touched.email} message={errors.email} />
                </InputWrapper>
                <InputWrapper className="password-input">
                  <Input
                    error={touched.password && errors.password}
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Your password"
                  />
                  <Error touched={touched.password} message={errors.password} />
                </InputWrapper>
                <InputWrapper className="password-input">
                  <Input
                    error={touched.confirmPassword && errors.confirmPassword}
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder="Confirm  password"
                  />
                  <Error touched={touched.confirmPassword} message={errors.confirmPassword} />
                </InputWrapper>

                <ButtonWrapper>
                  <SubmitBtn className="submit-btn" type="submit" disabled={isSubmitting}>
                    register
                  </SubmitBtn>
                </ButtonWrapper>
              </form>
            )}
          </Formik>
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

const InputWrapper = styled.div``;

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
const Input = styled.input`
  ${styledInput}
`;

// const StyledField = styled.select`
//   ${styledInput}
// `;
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
const CountryWrapper = styled.div`
  width: 100%;
  height: 400px;
  padding-top: 1rem;
  overflow-y: scroll;
  background-color: ${color.white};
  box-shadow: ${shadow.lg};
  z-index: 99999;
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

const ImgWrapper = styled.div`
  display: grid;
  padding-bottom: 1rem;
  padding-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${color.grey_100};
  }
`;

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
