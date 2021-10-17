/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { BiRightArrowAlt } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs';
import { useStripe } from '@stripe/react-stripe-js';
import { PayPalButton } from 'react-paypal-button-v2';
import { Header, Message, Loader, Meta } from '../components';
import { color, shadow, rounded } from '../utilities';
import { getOrderDetails } from '../actions/orderAction';
import { formatter } from '../helper/CurrencyFormat';
import { proceedPayment, updatePaypalPayment } from '../actions/paymentAction';

export function OrderScreen() {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const userDetails = useSelector((state) => state.userDetails);
  const payment = useSelector((state) => state.payment);
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const updatePaypalState = useSelector((state) => state.updatePaypalPayment);
  const { user: userInfo } = userDetails;
  const { loading, details } = orderDetails;
  const { loading: loadingPaypal, success } = updatePaypalState;

  //* Check if user is loged in

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      history.push('/login');
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id]);

  useEffect(() => {
    if (success) {
      history.push('/success');
      // dispatch({ type: ADDED_ORDER_RESET });
    }
  }, [dispatch, id, success]);

  const total = () => {
    if (details.paymentMethod && details.paymentMethod === 'Paypal') {
      return details.taxPrice + details.shippingMethod.price + details.totalPrice;
    }
    return details.shippingMethod.price + details.totalPrice;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const line_items = details.orderItems.map((el) => ({
      quantity: el.quantity,
      price_data: {
        unit_amount: el.price * 100,
        currency: 'usd',
        tax_behavior: 'exclusive',

        product_data: {
          name: `${el.name} ${el.subcategory}`,
          images: [el.image[0].url],
        },
      },
    }));
    const item = {
      line_items,
      customer_email: details.user.email,
    };

    dispatch(proceedPayment(item));
  };
  useEffect(() => {
    if (payment.paymentStatus && Object.entries(payment.paymentStatus).length > 0) {
      const redirect = async () => {
        const { error } = await stripe.redirectToCheckout({ sessionId: payment.paymentStatus.sessionId });
        if (error) {
          console.log(error);
        }
      };
      redirect();
    }
  }, [payment]);

  // Paypal

  const successPaymentHandler = (paymentResult) => {
    dispatch(updatePaypalPayment(id, paymentResult));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Meta title="Order Status" />

          <MainWrapper>
            <Container>
              <FirstHeading>Your Order Id: {id}</FirstHeading>
              <Line />
              <Wrap>
                <Heading>Shipping Adress</Heading>
                <Content>
                  <b>Adress:</b> &nbsp;{' '}
                  {details.shippingAdress &&
                    `${details.shippingAdress.street}, ${details.shippingAdress.city} ${details.shippingAdress.postalCode}, ${details.shippingAdress.country}`}
                </Content>
                <Content>
                  <b>Name: </b> &nbsp;
                  {details.user && details.user.name}
                </Content>
                <Content style={{ textTransform: 'none' }}>
                  <b>Email</b> &nbsp;
                  {details.user && details.user.email}
                </Content>
                <Line />
                <Heading>Order status</Heading>
                <Content>
                  <Message mt="0" bg={details.isPaid ? 'success' : 'danger'}>
                    {' '}
                    {details.isPaid ? 'Paid' : 'Not  Paid'}
                  </Message>
                </Content>
                <Line />
                <Heading>Payment Method</Heading>
                <Content>
                  <b>Method:</b> &nbsp;
                  {details.paymentMethod}
                </Content>
                <Line />
                <Heading>Shipping Method</Heading>
                <Content>
                  <b>Choosed Package:</b> &nbsp;
                  {details.shippingMethod.shippingPackage}
                </Content>
                <Content>
                  <b>Estimated delivery date:</b> &nbsp;
                  {details.shippingMethod.deliveryDate}
                </Content>
                <Line />
                <Heading>Delivery status</Heading>
                <Content>
                  <Message mt="0" bg={details.isDelivered ? 'success' : 'danger'}>
                    {' '}
                    {details.isDelivered ? 'Delivered' : 'Not Delivered'}
                  </Message>
                </Content>
                <Line />
                <Heading>Order Items</Heading>

                {details.orderItems.map((el) => (
                  <Wrapper key={el._id}>
                    <ImageContent>
                      <Image src={el.image && el.image[0].url} alt={el.name} />
                      {el.name} &nbsp;({el.subcategory})
                    </ImageContent>
                    <PriceContent>
                      {`${el.quantity}  X  ${formatter.format(el.price)} = ${formatter.format(el.quantity * el.price)}`}
                    </PriceContent>
                  </Wrapper>
                ))}
              </Wrap>
            </Container>
            <CheckoutSection>
              <CheckoutWrapper>
                <form onSubmit={submitHandler}>
                  <CheckoutHeader>Order summary</CheckoutHeader>
                  <Line />
                  <TotalPrice>
                    <p>Items :</p>
                    <p>{formatter.format(details.totalPrice)}</p>
                  </TotalPrice>
                  <Shipping>
                    <p>Shipping :</p>
                    <p>{formatter.format(details.shippingMethod.price)}</p>
                  </Shipping>
                  {details.paymentMethod === 'Paypal' && (
                    <Tax>
                      <p>Tax :</p>
                      <p>{formatter.format(details.taxPrice)}</p>
                    </Tax>
                  )}

                  <Total>
                    <p>Total :</p>
                    <p>{formatter.format(total())}</p>
                  </Total>
                  {details.paymentMethod !== 'Paypal' ? (
                    <BtnWrapper isPaid={details.isPaid}>
                      <Btn type="submit">
                        <span>
                          <Card />
                        </span>
                        Pay now
                        <span>
                          <Arrow />
                        </span>
                      </Btn>
                    </BtnWrapper>
                  ) : sdkReady || loadingPaypal ? (
                    <Loader />
                  ) : details.isPaid ? (
                    ''
                  ) : (
                    <PayPalButton amount={total()} onSuccess={successPaymentHandler} />
                  )}
                </form>
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
  @media (max-width: 1030px) {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    place-items: center;
  }
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
  text-transform: capitalize;
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
const Arrow = styled(BiRightArrowAlt)`
  opacity: 0;
  color: ${color.white};
  font-size: 1.5rem;
  vertical-align: middle;
`;
const BtnWrapper = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  display: ${({ isPaid }) => (isPaid ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;

  &:hover {
    ${Arrow} {
      opacity: 1;
      transform: translateX(5px);
      transition: all 0.6s ease-in-out;
    }
  }
`;
const Card = styled(BsCreditCard)`
  color: ${color.white};
  font-size: 1.5rem;
  vertical-align: middle;
  margin-right: 1rem;
`;
