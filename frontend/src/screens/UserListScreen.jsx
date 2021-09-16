/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { FaRegTimesCircle, FaTrashAlt } from 'react-icons/fa';
import { FcOk } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import { getUsersList, showModal } from '../actions/userActions';
import { Loader, Message, Header, Modal } from '../components';
import { color, shadow } from '../utilities';
import { GET_ID } from '../actions/types';

export function UsersListScreen() {
  const usersList = useSelector((state) => state.usersList);
  const userLogin = useSelector((state) => state.userLogin);
  const deleteUser = useSelector((state) => state.deleteUser);
  const userInfo = useSelector((state) => state.userInfo);
  const { user } = userInfo;

  const { userInfo: isLogin } = userLogin;
  const { success: successDelete } = deleteUser;
  const history = useHistory();
  const { error, users, loading } = usersList;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin && isLogin.isAdmin) {
      dispatch(getUsersList());
    } else {
      history.push('/login');
    }
  }, [dispatch, successDelete, user, history, isLogin]);

  const deleteHandler = (id) => {
    dispatch(showModal());
    dispatch({ type: GET_ID, payload: id });
  };

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
              {users.map((usr) => (
                <Tr key={usr._id}>
                  <Td>{usr._id}</Td>
                  <Td>{usr.name}</Td>
                  <Td>
                    <A href={`mailto:${usr.email}`}>{usr.email}</A>
                  </Td>
                  <Td>{usr.isAdmin ? <Check /> : <Times />}</Td>
                  <Td>
                    <span>
                      <Link to={`/admin/user/${usr._id}`}>
                        {' '}
                        <Edit />
                      </Link>
                      <Button type="button" onClick={() => deleteHandler(usr._id)}>
                        <Trash />
                      </Button>
                    </span>
                  </Td>
                  <Modal text="Do you want to delete this user ?" />
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

const Trash = styled(FaTrashAlt)`
  margin-left: 1.5rem;
  font-size: 1.2rem;
  color: ${color.red_vivid_500};
  cursor: pointer;
`;
const Edit = styled(FiEdit)`
  font-size: 1.2rem;
  color: ${color.grey_700};
`;

const Button = styled.button`
  background: transparent;
`;
