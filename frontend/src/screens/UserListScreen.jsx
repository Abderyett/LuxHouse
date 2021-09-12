/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FcOk } from 'react-icons/fc';
import { getUsersList } from '../actions/userActions';
import { Loader, Message, Header } from '../components';
import { color, shadow } from '../utilities';

export function UsersListScreen() {
  const usersList = useSelector((state) => state.usersList);
  const { error, users, loading } = usersList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Heading>Users</Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message bg="danger" mt="4rem">
          {error}
        </Message>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>User Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Admin</Th>

                <Th>{}</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>
                    <A href={`mailto:${user.email}`}>{user.email}</A>
                  </Td>
                  <Td>{user.isAdmin ? <Check /> : <Times />}</Td>
                  <Td>
                    <StyledLink to={`/user/${user._id}/edit`}>Details</StyledLink>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </>
  );
}

const Heading = styled.h2`
  padding-top: 2rem;
  padding-left: 2rem;
`;
const TableWrapper = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
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
const A = styled.a`
  text-decoration: none;
  color: ${color.grey_700};
`;
