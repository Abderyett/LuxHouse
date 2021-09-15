/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Header, Loader, Message, Error } from '../components';
import { getUser, updateUserAC } from '../actions/userActions';
import { color, rounded, shadow } from '../utilities';
import { USER_UPDATE_RESET } from '../actions/types';

export function UserScreen() {
  const userInfo = useSelector((state) => state.userInfo);
  const { loading, user, error } = userInfo;
  const updateUser = useSelector((state) => state.updateUser);
  const { success } = updateUser;
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUser(id));
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userslist');
    }
  }, [dispatch, success, id, history]);

  let currentValues;
  if (user) {
    currentValues = { email: user.email, name: user.name, isAdmin: user.isAdmin };
  } else {
    currentValues = { email: '', name: '', isAdmin: '' };
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message bg="danger">{error}</Message>
      ) : (
        <>
          <Header />
          <Container>
            <UserProfile>
              <Formik
                initialValues={currentValues}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Please enter valide email adress')
                    .required('Please enter your email adrress'),
                  name: Yup.string()
                    .min(2, 'Must at least 2 characters long.')
                    .max(255, 'Name Must less than 255 characters')
                    .required('Please enter your Name'),
                })}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                  setSubmitting(true);
                  const newUser = updateUserAC(id, { name: values.name, email: values.email, isAdmin: values.isAdmin });

                  dispatch(newUser);

                  resetForm();
                  setSubmitting(false);
                }}
                enableReinitialize
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <Back to="/admin/userslist"> &larr; Go Back</Back>

                    <Heading>User Profile</Heading>

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
                    <InputWrapper>
                      <label htmlFor="isAdmin">
                        <input
                          id="isAdmin"
                          type="checkbox"
                          name="isAdmin"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.isAdmin}
                        />{' '}
                        &nbsp; Is Admin
                      </label>
                    </InputWrapper>

                    <ButtonWrapper>
                      <SubmitBtn className="submit-btn" type="submit" disabled={isSubmitting}>
                        Update
                      </SubmitBtn>
                    </ButtonWrapper>
                  </form>
                )}
              </Formik>
            </UserProfile>
          </Container>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
  margin-top: 4rem;
`;
const UserProfile = styled.section``;

const Heading = styled.h3`
  font-family: 'avenir_bold';
  line-height: 1rem;
  margin-top: 3rem;
`;

const InputWrapper = styled.div``;
const Input = styled.input`
  border-radius: ${rounded.md};
  height: 3rem;
  width: 25rem;
  max-width: 30rem;
  text-indent: 5%;
  font-size: 1.2rem;
  color: ${color.grey_800};
  font-family: 'avenir_regular';
  box-shadow: ${shadow.lg};
  margin-top: 1rem;
  box-shadow: ${({ error }) =>
    error ? `0px 0px 0px 2px ${color.red_vivid_500}` : `0px 0px 0px 2px ${color.grey_300}`};

  @media (max-width: 768px) {
    width: 90vw;
  }
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.grey_600};
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
  transition: all 0.6s ease-in-out;
  &:hover {
    background-color: ${color.black};
    color: ${color.white};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const Back = styled(Link)`
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: ${color.grey_700};
  &:hover {
    color: ${color.scallop_shell};
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;
