/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled, { css } from 'styled-components';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { Error } from '../components';
import { color, shadow, rounded } from '../utilities';
import pendantLamp from '../utilities/svg/pendant_lamp.svg';
import sofa from '../utilities/svg/sofa.svg';

export function LoginScreen() {
  return (
    <Container>
      <RegisterContainer>
        <FirstPendant src={pendantLamp} alt="pendant Lamp" />
        <Sofa src={sofa} alt="sofa" />
        <RgisterWrapper>
          <h2>New customer</h2>
          <p>You will have the oportunity to create an account and track your order once you complete your purchase</p>

          <SubmitBtn className="submit-btn" type="submit">
            CREATE AN ACCOUNT
          </SubmitBtn>
        </RgisterWrapper>
      </RegisterContainer>
      <FromContainer>
        <Wrap>
          <Formik
            initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Please enter valide email adress').required('Please enter your email adrress'),

              password: Yup.string()
                .required('Please enter password')
                .min(5, 'Must at least 5 characters long.')
                .max(255, 'Name Must less than 255 characters'),
            })}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              setTimeout(() => {
                alert(JSON.stringify(values), null, 2);
                resetForm();
                setSubmitting(false);
              }, 1000);
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
                    error={touched.email && errors.email}
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Your email"
                    className={touched.email && errors.email ? 'has-error' : null}
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
                    className={touched.password && errors.password ? 'has-error' : null}
                  />
                  <Error touched={touched.password} message={errors.password} />
                  <ResetPassword>
                    <Link className="password-reset" to="/reset">
                      Forgot your password?
                    </Link>
                  </ResetPassword>
                </InputWrapper>
                <Social>
                  <StyledButton type="submit">
                    <span>
                      <FaFacebookF />
                    </span>
                    Facebook
                  </StyledButton>
                  <StyledButton google="google" type="submit">
                    <span>
                      <FaGoogle />
                    </span>
                    Google
                  </StyledButton>
                </Social>
                <ButtonWrapper>
                  <SubmitBtn className="submit-btn" type="submit" disabled={isSubmitting}>
                    sign in
                  </SubmitBtn>
                </ButtonWrapper>
              </form>
            )}
          </Formik>
        </Wrap>
      </FromContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const FromContainer = styled.div`
  /* background-color: ${color.grey_050}; */
  height: 100vh;
  width: 50vw;
  display: grid;
  grid-auto-flow: column;
  place-items: center;
`;
const Wrap = styled.div`
  padding: 4rem 2rem;
`;
const RegisterContainer = styled.div`
  height: 100vh;
  width: 50vw;
  background-color: ${color.ecru};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  h2 {
    font-family: 'avenir_bold';
    margin-bottom: 1rem;
  }
  p {
    width: 40ch;
    padding-bottom: 2rem;
  }
`;

const FirstPendant = styled.img`
  position: absolute;
  top: 0;
  left: 5%;
`;
const Sofa = styled.img`
  position: absolute;
  bottom: 0;
`;

const RgisterWrapper = styled.div`
  margin-bottom: 30%;
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
  height: 3.5rem;
  width: 30rem;
  max-width: 30rem;
  text-indent: 5%;
  font-size: 1.2rem;
  color: ${color.grey_800};
  font-family: 'avenir_regular';
  box-shadow: ${shadow.lg};
  margin-top: 0.5rem;
  box-shadow: ${({ error }) => error && `0px 0px 0px 2px ${color.red_vivid_500}`};

  @media (max-width: 768px) {
    width: 90vw;
  }
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.grey_400};
  }
`;
const ResetPassword = styled.div`
  a {
    text-decoration: underline;
    color: ${color.grey_600};
    display: flex;
    justify-content: flex-end;
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
`;

const Button = css`
  background-color: ${({ google }) => (google ? '#DB4437' : '#4267b2')};
  color: ${color.white};
  border-radius: ${rounded.full};
  padding: 1rem 3.5rem;
  font-size: 1.1rem;
  font-family: 'avenir_semi';
  margin-left: ${({ google }) => (google ? '20px' : '0')};
  @media (max-width: 768px) {
    margin-top: ${({ google }) => (google ? '20px' : '0')};
    margin-left: 0;
  }
`;
const StyledButton = styled.button`
  ${Button}
  width:50%;
  @media (max-width: 768px) {
    width: 60%;
  }

  span {
    vertical-align: middle;
    padding-right: 1rem;
    font-size: 1.1rem;
  }
  cursor: pointer;
  &:hover {
    background-color: ${({ google }) => (google ? 'rgba(219, 68, 55,0.9)' : 'rgba(66,103,178,0.9)')};
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0 2rem 0;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`;
