/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Error, Header, Footer, Message, Loader, Meta } from '../components';
import { color, shadow, rounded } from '../utilities';
import registerSofa from '../utilities/svg/RegisterSofa.svg';
import { registringUser } from '../actions/userActions';

export function RegisterScreen() {
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.registerUser);
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();
  const { loading, error } = registerUser;

  useEffect(() => {
    let timerId;
    if (error) {
      setShowMessage(true);
      timerId = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  return (
    <>
      <Header />
      <Meta title="Register" />
      <Container>
        <FromContainer>
          <Wrap>
            {loading && <Loader />}
            {showMessage ? <Message bg="danger">{error}</Message> : null}
            <Formik
              initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Please enter valide email adress')
                  .required('Please enter your email adrress'),
                name: Yup.string()
                  .min(2, 'Must at least 2 characters long.')
                  .max(255, 'Name Must less than 255 characters')
                  .required('Please enter your Name'),

                password: Yup.string()
                  .required('Please enter password')
                  .min(5, 'Must at least 5 characters long.')
                  .max(255, 'Name Must less than 255 characters'),
                confirmPassword: Yup.string()
                  .required('Please confirm password')
                  .min(5, 'Must at least 5 characters long.')
                  .max(255, 'Name Must less than 255 characters')
                  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
              })}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                dispatch(registringUser(values.name, values.email, values.password));
                history.push('/products');
                resetForm();
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <Heading>Registred Customers</Heading>
                  <TextHeading>
                    If you have an account with us, plase log in. You can use social netwoks for authorizing here.
                  </TextHeading>
                  <InputWrapper>
                    <Input
                      error={touched.name && errors.name}
                      id="name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder="Your name"
                    />
                    <Error touched={touched.name} message={errors.name} />
                  </InputWrapper>

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
        </FromContainer>
      </Container>
      <Sofa src={registerSofa} alt="pink sofa" />
      <Footer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  background-color: ${color.grey_050};
  justify-content: center;
  align-items: flex-start;
  position: relative;

  @media (max-width: 1030px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FromContainer = styled.div`
  height: 100vh;
  z-index: 3;
  display: grid;

  grid-auto-flow: column;
  place-items: center;
  @media (max-width: 768px) {
    justify-items: start;
    align-items: start;
    margin-top: 1rem;
  }
`;
const Wrap = styled.div`
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Heading = styled.h3`
  font-family: 'avenir_bold';
  line-height: 1rem;
`;
const TextHeading = styled.p`
  color: ${color.grey_700};
  padding-top: 1rem;
  width: 50ch;
`;

const InputWrapper = styled.div``;
const Input = styled.input`
  border-radius: ${rounded.full};
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

  @media (max-width: 768px) {
    width: 90vw;
  }
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.grey_400};
  }
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

const Sofa = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
  @media (max-width: 768px) {
    width: 400px;
  }
`;
