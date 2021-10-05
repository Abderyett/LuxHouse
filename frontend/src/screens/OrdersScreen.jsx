/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FcOk } from 'react-icons/fc';

import moment from 'moment';

import { getAllOrders, getOrderDetails } from '../actions/orderAction';
import { Loader, Header } from '../components';
import { color, shadow } from '../utilities';

import { formatter } from '../helper/CurrencyFormat';

export function OrdersScreen() {
  const allOrders = useSelector((state) => state.allOrders);
  const userLogin = useSelector((state) => state.userLogin);

  const userInfo = useSelector((state) => state.userInfo);
  const { user } = userInfo;

  const { userInfo: isLogin } = userLogin;

  const history = useHistory();
  const { error, orders, loading } = allOrders;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin && isLogin.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, user, history, isLogin]);

  return (
    <>
      <Header />

      <OrderSection>
        <Heading>My Orders</Heading>
        {loading ? (
          <Loader />
        ) : (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Order ID</Th>
                  <Th>User</Th>
                  <Th>Order Date</Th>
                  <Th>Total</Th>
                  <Th>Paid</Th>
                  <Th>Delivred</Th>
                  <Th>{}</Th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td>{order._id}</Td>
                      <Td>{order.user.name}</Td>

                      <Td>{moment(order.createdAt).format('MMMM Do YYYY')}</Td>
                      <Td>{formatter.format(order.totalPrice + order.taxPrice)}</Td>
                      <Td>{order.isPaid ? <Check /> : <Times />}</Td>
                      <Td>{order.isDelivered ? <Check /> : <Times />}</Td>
                      <Td>
                        <StyledLink
                          to={`/admin/orders/${order._id}`}
                          onClick={() => dispatch(getOrderDetails(order._id))}
                        >
                          Details
                        </StyledLink>
                      </Td>
                    </Tr>
                  ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </OrderSection>
    </>
  );
}

const Heading = styled.h3`
  font-family: 'avenir_bold';
  line-height: 1rem;
`;

const TableWrapper = styled.div`
  padding-top: 1rem;
`;

const OrderSection = styled.section`
  padding-left: 2rem;
  margin-top: 5rem;
`;

const Table = styled.table`
  border: 1px solid ${color.grey_400};
  width: 90%;
  border-collapse: collapse;
  box-shadow: ${shadow.md};
`;
const Td = styled.td`
  /* border-top: 1px solid ${color.grey_400}; */
  border-bottom: 1px solid ${color.grey_400};
  padding: 1rem;
`;
const Th = styled.th`
  padding: 1rem;
  text-align: start;
  text-transform: uppercase;
  border-bottom: 2px solid ${color.grey_400};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color.grey_700};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  &:hover {
    color: ${color.scallop_shell};
  }
`;
const Tr = styled.tr`
  padding: 1rem;

  &:hover {
    background-color: ${color.grey_100};
    box-shadow: ${shadow.md};
    ${StyledLink} {
      color: ${color.scallop_shell};
    }
  }
`;

const Times = styled(FaRegTimesCircle)`
  color: ${color.red_vivid_500};
  font-size: 1.3rem;
`;
const Check = styled(FcOk)`
  font-size: 1.3rem;
`;
