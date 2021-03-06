/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

import { showModalProduct } from '../actions/userActions';
import { Loader, Message, Header, Modal, Meta } from '../components';
import { color, shadow, rounded } from '../utilities';
import { listProduct, createProductAC } from '../actions/productActions';
import { formatter } from '../helper/CurrencyFormat';
import { CREATE_PRODUCT_RESET, GET_ID } from '../actions/types';

export function ProductsListScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: isLogin } = userLogin;
  const porductList = useSelector((state) => state.porductList);
  const removeSingleProduct = useSelector((state) => state.removeSingleProduct);
  const { success, loading: loadingDelete, error: errorDelete } = removeSingleProduct;
  const createProduct = useSelector((state) => state.createProduct);
  const { success: successCreate, loading: loadingCreate, error: errorCreate, createdProduct } = createProduct;
  const { loading, error, products } = porductList;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    if (!isLogin.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProduct());
    }
  }, [dispatch, isLogin, history, success, createdProduct, successCreate]);

  const addProductHandler = () => {
    dispatch(createProductAC());
  };

  const deleteHandler = (id) => {
    dispatch(showModalProduct());
    dispatch({ type: GET_ID, payload: id });

    console.log('this is from state in productListScreen', id);
  };

  return (
    <>
      <Header />
      <Meta title="Products List" />

      <Heading>Products</Heading>
      {loadingDelete && <Loader />}
      {errorDelete && <Message bg="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message bg="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message bg="danger" mt="4rem">
          {error}
        </Message>
      ) : (
        <>
          <BtnWrapper>
            <Button type="button" onClick={addProductHandler}>
              &#x2b; &nbsp; Add Product
            </Button>
          </BtnWrapper>
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
                    <Td>{product._id}</Td>
                    <Td>{product.name}</Td>
                    <Td>
                      <IMG src={product.image[0].url} alt={product.name} />
                    </Td>
                    <Td>{product.subcategory}</Td>
                    <Td>{formatter.format(product.price)}</Td>
                    <Td>
                      <IconWrapper>
                        <Link to={`/admin/products/${product._id}/edit`}>
                          {' '}
                          <Edit />
                        </Link>
                        <TrashButton type="button" onClick={() => deleteHandler(product._id)}>
                          <Trash />
                        </TrashButton>
                      </IconWrapper>
                    </Td>
                    <Modal text="Do you want to delete this product ?" products="deleteProduct" />
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </>
      )}
    </>
  );
}

const Heading = styled.h2`
  padding-top: 2rem;
  padding-left: 2rem;
  margin-top: 4.5rem;
`;
const TableWrapper = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
  position: relative;
  margin-top: 4rem;
  @media (max-width: 1030px) {
    overflow-x: scroll;
  }
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
const TrashButton = styled.button`
  background: transparent;
`;

const Button = styled.button`
  background: transparent;
  border: 2.5px solid ${color.black};
  border-radius: ${rounded.sm};
  padding: 0.75rem 2rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-family: 'avenir_semi';
  cursor: pointer;

  transition: all 0.6s ease-in-out;
  &:hover {
    background-color: ${color.black};
    color: ${color.white};
  }
`;
const BtnWrapper = styled.button`
  position: absolute;
  right: 10%;
  background: transparent;
`;

const IconWrapper = styled.div`
  display: flex;
`;
