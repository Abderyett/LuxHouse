/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Header, Message, Loader } from '../components';
import { color, shadow, rounded } from '../utilities';
import { getOrderDetails } from '../actions/orderAction';

import { formatter } from '../helper/CurrencyFormat';

export function OrderScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const userDetails = useSelector((state) => state.userDetails);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { user: userInfo } = userDetails;
  const { loading, details, success } = orderDetails;
  const {
    shippingAdress,
    shippingMethod,
    taxPrice,
    totalPrice,
    isPaid,
    isDelivered,
    user,
    orderItems,
    paymentMethod,
  } = details;

  //* Check if user is loged in

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      history.push('/login');
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch]);

  const total = () => {
    if (taxPrice && shippingMethod && totalPrice) {
      return taxPrice + shippingMethod.price + totalPrice;
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MainWrapper>
            <Container>
              <FirstHeading>Your Order Id: {id}</FirstHeading>
              <Line />
              <Wrap>
                <Heading>Shipping Adress</Heading>
                <Content>
                  <b>Adress:</b> &nbsp;{' '}
                  {shippingAdress &&
                    `${shippingAdress.street}, ${shippingAdress.city} ${shippingAdress.postalCode}, ${shippingAdress.country}`}
                </Content>
                <Content>
                  <b>Name: </b> &nbsp;
                  {user && user.name}
                </Content>
                <Content>
                  <b>Email</b> &nbsp;
                  {user && user.email}
                </Content>
                <Line />
                <Heading>Order status</Heading>
                <Content>
                  <Message bg={isPaid ? 'success' : 'danger'}> {isPaid ? 'Paid' : 'Not  Paid'}</Message>
                </Content>
                <Line />
                <Heading>Payment Method</Heading>
                <Content>
                  <b>Method:</b> &nbsp;
                  {paymentMethod && paymentMethod}
                </Content>
                <Line />
                <Heading>Shipping Method</Heading>
                <Content>
                  <b>Choosed Package:</b> &nbsp;
                  {shippingMethod && shippingMethod.shippingPackage}
                </Content>
                <Content>
                  <b>Estimated delivery date:</b> &nbsp;
                  {shippingMethod && shippingMethod.deliveryDate}
                </Content>
                <Line />
                <Heading>Order status</Heading>
                <Content>
                  <Message style={{ marginTop: 0 }} bg={isDelivered ? 'success' : 'danger'}>
                    {' '}
                    {isDelivered ? 'Delivered' : 'Not Delivered'}
                  </Message>
                </Content>
                <Line />
                <Heading>Order Items</Heading>

                {orderItems &&
                  orderItems.map((el) => (
                    <Wrapper key={el._id}>
                      <ImageContent>
                        <Image src={el.image && el.image[0].url} alt={el.name} />
                        {el.name} &nbsp;({el.subcategory})
                      </ImageContent>
                      <PriceContent>
                        {`${el.quantity}  X  ${formatter.format(el.price)} = ${formatter.format(
                          el.quantity * el.price
                        )}`}
                      </PriceContent>
                    </Wrapper>
                  ))}
              </Wrap>
            </Container>
            <CheckoutSection>
              <CheckoutWrapper>
                <CheckoutHeader>Order summary</CheckoutHeader>
                <Line />
                <TotalPrice>
                  <p>Items :</p>
                  <p>{formatter.format(totalPrice)}</p>
                </TotalPrice>
                <Shipping>
                  <p>Shipping :</p>
                  <p>{shippingMethod && formatter.format(shippingMethod.price)}</p>
                </Shipping>
                <Tax>
                  <p>Tax :</p>
                  <p>{taxPrice && formatter.format(taxPrice)}</p>
                </Tax>
                <Total>
                  <p>Total :</p>
                  <p>{formatter.format(total())}</p>
                </Total>
                <BtnWrapper>
                  <Btn type="button">Procced payment</Btn>
                </BtnWrapper>
              </CheckoutWrapper>
            </CheckoutSection>
          </MainWrapper>
        </>
      )}
    </>
  );
}

const MainWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 60% 30%;
`;

const Container = styled.div`
  width: 90%;

  border: 1px solid ${color.grey_400};
  border-radius: ${rounded.md};
  box-shadow: ${shadow.md};
  margin: 3rem;
  padding: 2rem;
  background-color: ${color.white};
  z-index: 1;
`;

//* Heading
const FirstHeading = styled.h4`
  font-family: 'avenir_semi';
  margin-bottom: 3rem;
`;
const Heading = styled.h5`
  font-family: 'avenir_semi';
  padding: 1.5rem 0;
`;
const Line = styled.div`
  width: 100%;

  border-top: 2px solid ${color.grey_300};
`;

const Content = styled.p`
  text-transform: capitalize;
  color: ${color.grey_800};
`;
const PriceContent = styled.p`
  color: ${color.grey_800};
  width: 25%;
`;
const ImageContent = styled.p`
  text-transform: capitalize;
  color: ${color.grey_800};
  width: 70%;
  img {
    vertical-align: middle;
    margin-right: 1rem;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;

//* =================

const Wrap = styled.div`
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Image = styled.img`
  width: 5%;
`;

//* Place Order

const CheckoutSection = styled.section`
  width: 100%;
  margin-top: 3rem;
`;
const CheckoutWrapper = styled.div`
  width: auto;
  height: auto;
  border: 1px solid ${color.grey_400};
  padding: 1rem;
  border-radius: ${rounded.sm};
  box-shadow: ${shadow.md};
  /* margin: 1rem; */
  background-color: ${color.white};
`;
const CheckoutHeader = styled.h3`
  text-align: center;
  font-size: 1.3rem;
  padding: 1rem;
  font-family: 'avenir_semi';
`;

const row = css`
  font-weight: bold;
  font-size: 1.3rem;
  color: ${color.grey_600};
  padding: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${color.grey_400};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalPrice = styled.div`
  ${row}
`;
const Shipping = styled.div`
  ${row}
`;
const Tax = styled.div`
  ${row}
`;
const Total = styled.div`
  ${row}
`;

const Btn = styled.button`
  text-transform: uppercase;
  background-color: ${color.black};
  color: ${color.white};
  padding: 1rem 3rem;
  font-weight: bold;
  border: 1px solid black;
  transition: all 0.6s ease-in-out;
  cursor: pointer;
  font-family: 'avenir_semi';
  letter-spacing: 0.125rem;
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const BtnWrapper = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
