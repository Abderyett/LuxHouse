/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Header } from '../components';
import { color, shadow, rounded } from '../utilities';
import { addOrder, getOrderDetails } from '../actions/orderAction';
import sofa from '../utilities/svg/checkoutSofa.svg';
import { formatter } from '../helper/CurrencyFormat';

export function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const addedOrder = useSelector((state) => state.addedOrder);
  const { user } = userDetails;
  const { shippingMethod, shippingAdress, cartItem, payment } = cart;
  const { order, success } = addedOrder;

  //* Check if user is loged in

  if (!userInfo) {
    history.push('/login');
    if (cartItem.length === 0) {
      history.push('/products');
    }
  }

  // useEffect(() => {

  // }, [shippingAdress, shippingMethod, payment, cartItem, user, history]);

  useEffect(() => {}, [user, history]);

  const totalItems = () => (cartItem === [] ? 0 : cartItem.reduce((acc, item) => acc + item.quantity * item.price, 0));
  const tax = () => {
    if (payment === 'Paypal') {
      return totalItems() * 0.17;
    }
    return 0;
  };
  const total = () => totalItems() + tax() + shippingMethod.price;

  //* Submit  Data to store
  const submitHandler = () => {
    dispatch(
      addOrder({
        orderItems: cartItem,
        shippingAdress,
        shippingMethod,
        paymentMethod: payment,
        taxPrice: (totalItems() * 0.17).toFixed(2),
        totalPrice: totalItems(),
      })
    );
  };
  useEffect(() => {
    if (success) {
      dispatch(getOrderDetails(order._id));
      history.push(`order/${order._id}`);
    }
  }, [success, history]);
  if (!shippingAdress && !shippingMethod && !payment) {
    return (
      <TextWrapper>
        <h3>Shipping Adress & Method is missing</h3>

        <StyledLink to="/checkout"> &larr; Back to Cart</StyledLink>
      </TextWrapper>
    );
  }
  return (
    <>
      <Header />
      <IMG src={sofa} alt="sofa" />

      <ProgressWrapper>
        <ShippingAdress>Shipping Adress</ShippingAdress>
        <ShippingMethod>Shipping Method</ShippingMethod>
        <Payment>Payement</Payment>
        <PlaceOrder>Place Order</PlaceOrder>
      </ProgressWrapper>
      <MainWrapper>
        <Container>
          <FirstHeading>Place Order</FirstHeading>
          <Line />
          <Wrap>
            <Heading>Shipping Adress</Heading>
            <Content>
              <b>Adress:</b> &nbsp;{' '}
              {shippingAdress &&
                `${shippingAdress.street}, ${shippingAdress.city} ${shippingAdress.postalCode}, ${shippingAdress.country}`}
            </Content>
            <Line />
            <Heading>Payment Method</Heading>
            <Content>
              <b>Method:</b> &nbsp;
              {payment && payment}
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
            <Heading>Order Items</Heading>

            {cartItem.map((el) => (
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
            <CheckoutHeader>Order summary</CheckoutHeader>
            <Line />
            <TotalPrice>
              <p>Items :</p>
              <p>{formatter.format(totalItems())}</p>
            </TotalPrice>
            <Shipping>
              <p>Shipping :</p>
              <p>{shippingMethod && formatter.format(shippingMethod.price)}</p>
            </Shipping>
            {payment === 'Paypal' && (
              <Tax>
                <p>Tax :</p>
                <p>{formatter.format(tax())}</p>
              </Tax>
            )}
            <Total>
              <p>Total :</p>
              <p>{formatter.format(total())}</p>
            </Total>
            <BtnWrapper>
              <Btn type="button" onClick={submitHandler}>
                place order
              </Btn>
            </BtnWrapper>
          </CheckoutWrapper>
        </CheckoutSection>
      </MainWrapper>
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

//* ==========================

const IMG = styled.img`
  position: absolute;
  bottom: -50%;
  right: 0;
  width: 50%;
  z-index: -1;
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
  border-bottom: 2px solid ${color.scallop_shell};
  padding-bottom: 1rem;
  color: ${color.scallop_shell};
`;
const Payment = styled.div`
  width: 11rem;
  border-bottom: 2px solid ${color.scallop_shell};
  padding-bottom: 1rem;
  color: ${color.scallop_shell};
`;
const PlaceOrder = styled.div`
  width: 10rem;
  border-bottom: 2px solid ${color.scallop_shell};
  padding-bottom: 1rem;
  color: ${color.scallop_shell};
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

// Wrapper

const TextWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 5rem;
`;

const StyledLink = styled(Link)`
  padding-top: 3rem;
  font-size: 1.2rem;
  color: ${color.grey_700};
  &:hover {
    color: ${color.scallop_shell};
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;
