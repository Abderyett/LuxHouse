/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { showModal } from '../actions/userActions';
import { Loader, Message, Header, Modal } from '../components';
import { color, shadow } from '../utilities';
import { listProduct } from '../actions/productActions';
import { formatter } from '../helper/CurrencyFormat';

export function ProductsListScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: isLogin } = userLogin;
  const porductList = useSelector((state) => state.porductList);
  const { loading, error, products } = porductList;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin && isLogin.isAdmin) {
      dispatch(listProduct());
    } else {
      history.push('/login');
    }
  }, [dispatch, isLogin, history]);

  return (
    <>
      <Header />

      <Heading>Products</Heading>
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
                <Th>Product Id</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Subcategory</Th>
                <Th>Price</Th>

                <Th>{}</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <Tr key={product._id}>
                  <Td>{`${product._id.substring(0, 10)}...`}</Td>
                  <Td>{product.name}</Td>
                  <Td>
                    <IMG src={product.image[0].url} alt={product.name} />
                  </Td>
                  <Td>{product.subcategory}</Td>
                  <Td>{formatter.format(product.price)}</Td>
                  <Td>
                    <span>
                      <Link to={`/admin/products/${product._id}`}>
                        {' '}
                        <Edit />
                      </Link>
                      <Button type="button" onClick={() => dispatch(showModal())}>
                        <Trash />
                      </Button>
                    </span>
                  </Td>
                  <Modal text="Do you want to delete this product ?" id={product._id} />
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

const IMG = styled.img`
  width: 5rem;
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
