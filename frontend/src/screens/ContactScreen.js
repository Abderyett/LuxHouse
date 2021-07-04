import React from 'react';
import styled, { css } from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Header, Error } from '../components';
import { color, rounded, shadow } from '../utilities';
import contactImg from '../assets/contact_image.jpg';

export function ContactScreen() {
  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <ContactImg>
            <h1>
              We <br />
              are here <br />
              to help you !
            </h1>
          </ContactImg>
          <FromContainer>
            <Wrap>
              <Formik
                initialValues={{ email: '', question: '' }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Please enter valide email adress')
                    .required('Please enter your email adrress'),

                  question: Yup.string().required('Please enter text').min(3, 'Must at least 3 characters long.'),
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
                    <Heading>You can write to us</Heading>
                    <TextHeading>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, onsectetur adipisicing elit.
                        Quos,
                      </p>
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
                      />
                      <Error touched={touched.email} message={errors.email} />
                    </InputWrapper>
                    <InputWrapper>
                      <Textarea
                        id="question"
                        rows="5"
                        cols="33"
                        error={touched.question && errors.question}
                        name="question"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Your question"
                      />
                      <Error touched={touched.question} message={errors.question} />
                    </InputWrapper>

                    <ButtonWrapper>
                      <SubmitBtn type="submit" disabled={isSubmitting}>
                        send
                      </SubmitBtn>
                    </ButtonWrapper>
                  </form>
                )}
              </Formik>
            </Wrap>
          </FromContainer>
        </Wrapper>
      </Container>
    </>
  );
}

const Wrapper = styled.div`
  width: 90vw;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: repeat(2, 1fr);
`;

const Container = styled.div`
  height: 100vh;
  background: ${color.grey_050};

  /* @media (max-width: 1030px) {
    flex-direction: column;
  } */
`;
const ContactImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${contactImg});
  background-size: cover;
  position: relative;

  h1 {
    text-transform: uppercase;
    font-family: 'avenir_bold';
    color: ${color.white};
    position: absolute;
    bottom: 0;
    padding-left: 3rem;
    padding-bottom: 3rem;
    font-size: 4rem;
    line-height: 4.2rem;
  }
`;

const FromContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  @media (max-width: 1030px) {
    width: 100vw;
    height: 85vh;
  }
`;
const Wrap = styled.div`
  padding: 4rem 2rem;
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
const Inputstyle = css`
  border-radius: ${rounded.full};

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
const Input = styled.input`
  ${Inputstyle}
  height: 3rem;
`;
const Textarea = styled.textarea`
  ${Inputstyle}
  border-radius: ${rounded.xl};
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
  a {
    text-decoration: none;
    color: ${color.black};
  }
  &:hover {
    background: ${color.white};
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`;
