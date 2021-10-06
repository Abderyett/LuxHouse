/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productActions';
import { addItem } from '../actions/cartAction';
import { Header, Accordion, Loader, Message } from '../components';
import { color, shadow, rounded } from '../utilities';
import { BlueCircle, CheckCircle } from '../utilities/svg';
import { ORDER_DETAILS_RESET, ADDED_ORDER_RESET } from '../actions/types';

export function ProductsScreen() {
  const dispatch = useDispatch();
  const porductList = useSelector((state) => state.porductList);
  const cartItem = useSelector((state) => state.cart.cartItem);

  const { loading, error, products } = porductList;

  const [subCategories, setsubCategories] = useState([]);
  const [filtredProducts, setfiltredProducts] = useState([]);
  const [categorieText, setCategorieText] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    dispatch(listProduct());
    dispatch({ type: ORDER_DETAILS_RESET });
    dispatch({ type: ADDED_ORDER_RESET });
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const newArr = products.map((el) => el.subcategory);
      const categories = ['all', ...new Set(newArr)];
      setsubCategories(categories);
      setfiltredProducts(products);
    }
    setSearchedProducts(products);
  }, [products]);

  const filterProducts = (category) => {
    if (category === 'all') {
      setfiltredProducts(products);
    } else {
      const newProducts = products.filter((el) => el.subcategory === category);
      setfiltredProducts(newProducts);
    }
  };
  useEffect(() => {
    filterProducts(categorieText);
  }, [categorieText]);

  const isAddedProduct = (id) => {
    const val = cartItem.length > 0 && cartItem.find((el) => el._id === id);

    const newVal = val && val.itemAdded;
    return newVal;
  };

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
    const searchedProduct = filtredProducts.filter((el) => el.name === searchTerm);
    if (searchTerm.length === 0) {
      setSearchedProducts(products);
    } else {
      setSearchedProducts(searchedProduct);
    }
  };

  console.log('FiltredProducts', filtredProducts);
  console.log('SearchedProducts', searchedProducts);

  return (
    <>
      <Header productList />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message mt="4rem" bg="danger">
          {error}
        </Message>
      ) : (
        <Container>
          <Div>
            <CategorieWrapper>
              {subCategories.map((el, index) => (
                <Button key={index} type="button" onClick={(e) => setCategorieText(e.target.textContent.toLowerCase())}>
                  {el}
                </Button>
              ))}
            </CategorieWrapper>
          </Div>
          <ContentWrapper>
            <FilterWrapper>
              <Input type="text" value={searchTerm} onChange={searchHandler} />
              <Accordion />

              <ClearBtn type="button">Clear Filters</ClearBtn>
            </FilterWrapper>
            <div>
              <HeaderDetails>
                <span>
                  {filtredProducts && filtredProducts.length === 0
                    ? products.length
                    : filtredProducts && filtredProducts.length}{' '}
                  Results{' '}
                </span>
                <hr /> <span>Sort By</span>
              </HeaderDetails>

              <GridContainer>
                {filtredProducts.map((el) => (
                  <Card key={el._id}>
                    <Link to={`/products/${el._id}`}>
                      <StyledImg src={el.image && el.image[0].url} alt={el.subcategory} />
                      <Title>
                        <h3>{el.name}</h3>
                        <PriceText category={el.category}>${el.price}</PriceText>
                      </Title>
                      <Subcategory category={el.category}>{el.subcategory} </Subcategory>
                      <Description>{el.description.substring(0, 100)}...</Description>
                    </Link>
                    <IconWrapper type="button" onClick={() => dispatch(addItem(el))}>
                      {isAddedProduct(el._id) === true ? <CheckCircle /> : <BlueCircle />}
                    </IconWrapper>
                  </Card>
                ))}
              </GridContainer>
            </div>
          </ContentWrapper>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  background-color: rgba(240, 244, 248, 0.5);
  height: 100%;
  padding-bottom: 5rem;
`;
const ContentWrapper = styled.div`
  padding-top: 5rem;

  display: grid;
  grid-template-columns: 20% 1fr;
`;
const FilterWrapper = styled.div`
  padding-left: 4rem;
  article {
    width: 90%;
    padding: 1rem 0.5rem;
  }
`;

const ClearBtn = styled.button`
  background: ${color.red_500};
  color: ${color.white};
  padding: 0.5rem;
  border-radius: ${rounded.xxl};
  margin-top: 1rem;
  margin-left: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 21rem);
  grid-gap: 2.5rem;
  width: 90%;
  place-content: center;
  justify-content: center;
  justify-items: stretch;
`;
const HeaderDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  hr {
    width: 75%;
  }
  span {
    padding: 0 1rem;
  }
`;

const Card = styled.div`
  width: 20rem;
  height: 24rem;
  box-shadow: ${shadow.xxl};
  background-color: ${color.white};
  padding-left: 2rem;
  padding-right: 2rem;
  cursor: pointer;
  position: relative;
`;
const StyledImg = styled.img`
  width: 15rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  color: ${color.grey_800};
  &:active {
    color: ${color.grey_800};
  }

  h3 {
    font-size: 1.2rem;
    font-family: 'avenir_semi';
  }
`;
const PriceText = styled.h5`
  color: ${color.grey_800};
  &::after {
    content: '';
    background: ${({ category }) =>
      category === 'furniture'
        ? 'rgba(66, 153, 225, 0.3)'
        : category === 'lighting'
        ? 'rgba(244, 223, 33, 0.3)'
        : `rgba(72, 187, 120, 0.3)`};
    height: 10px;
    width: 2.6rem;
    position: absolute;
    bottom: 15px;
    right: 2px;
  }
`;

const Subcategory = styled.p`
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: ${({ category }) =>
    category === 'furniture'
      ? 'rgba(66, 153, 225, 1)'
      : category === 'lighting'
      ? 'rgba(244, 223, 33, 1)'
      : `rgba(72, 187, 120, 1)`};
  font-family: 'playfair_italic';
  font-weight: 900;
  text-transform: uppercase;
`;
const Description = styled.p`
  font-size: 0.8rem;
`;

const CategorieWrapper = styled.div`
  display: flex;
  height: 5rem;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100vw;
  border-bottom: 1px solid ${color.warm_grey_100};

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const Button = styled.button`
  color: ${color.grey_700};
  border-radius: ${rounded.xxl};
  padding: 0.5rem;
  text-transform: capitalize;
  border: 1px solid #dedede;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: rgba(244, 244, 244, 0.9);
  }
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 100%;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #fff 100%);
  }
`;

const IconWrapper = styled.button`
  background-color: transparent;
`;

const Input = styled.input`
  border-radius: ${rounded.md};
  height: 2rem;
  width: 13rem;
  max-width: 13rem;
  text-indent: 5%;
  font-size: 1.2rem;
  color: ${color.grey_800};
  font-family: 'avenir_regular';
  box-shadow: ${shadow.lg};
  margin-top: 1rem;
  box-shadow: 0px 0px 0px 2px ${color.grey_300};
  margin-left: 1.5rem;
  @media (max-width: 768px) {
    width: 90vw;
  }
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 2px ${color.grey_600};
  }
`;
