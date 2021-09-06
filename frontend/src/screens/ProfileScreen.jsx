import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header, Error, Message } from '../components';
import { color, rounded, shadow } from '../utilities';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getOrdersDetails } from '../actions/orderAction';

export function ProfileScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userDetails);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const { user, error } = userDetails;

  const { userInfo } = userLogin;
  const history = useHistory();
  const dispatch = useDispatch();

  let currentValues;
  if (userInfo) {
    currentValues = { email: user.email, name: user.name, password: '', confirmPassword: '' };
  } else {
    currentValues = { email: '', name: '', password: '', confirmPassword: '' };
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUserDetails('profile'));
      dispatch(getOrdersDetails());
    }
  }, [success, userInfo, dispatch, history]);

  return (
    <>
      <Header />
      {error ? (
        <Message mt="4rem" bg="danger">
          {error}
        </Message>
      ) : (
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

                password: Yup.string()

                  .min(5, 'Must at least 5 characters long.')
                  .max(255, 'Name Must less than 255 characters'),
                confirmPassword: Yup.string()

                  .min(5, 'Must at least 5 characters long.')
                  .max(255, 'Name Must less than 255 characters')
                  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
              })}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                dispatch(
                  updateUserProfile({ _id: user.id, name: values.name, email: values.email, password: values.password })
                );
                resetForm();
                setSubmitting(false);
              }}
              enableReinitialize
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form autoComplete="off" onSubmit={handleSubmit}>
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
                      Update
                    </SubmitBtn>
                  </ButtonWrapper>
                </form>
              )}
            </Formik>
          </UserProfile>

          <OrderSection>
            <Heading>My Orders</Heading>
            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Order ID</Th>
                    <Th>Order Date</Th>
                    <Th>Total</Th>
                    <Th>Paid</Th>
                    <Th>Delivred</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>The table body</Td>
                    <Td>with two columns</Td>
                  </tr>
                </tbody>
              </Table>
            </TableWrapper>
          </OrderSection>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 2rem;
  margin-top: 4rem;
`;
const UserProfile = styled.section``;

const OrderSection = styled.section`
  padding-left: 3rem;
`;

const Heading = styled.h3`
  font-family: 'avenir_bold';
  line-height: 1rem;
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

const TableWrapper = styled.div`
  padding-top: 1rem;
`;

const Table = styled.table`
  border: 1px solid ${color.grey_400};
  width: 100%;
`;
const Td = styled.td`
  border-top: 1px solid ${color.grey_400};
  border-bottom: 1px solid ${color.grey_400};
`;
const Th = styled.th`
  padding: 1rem;
  text-align: start;
  text-transform: uppercase;
`;
