/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillHeartFill, BsHeart, BsHeartFill } from 'react-icons/bs';
import { clearFilters, listProduct } from '../actions/productActions';
import { addToWichlist } from '../actions/wichlistAction';
import { addItem } from '../actions/cartAction';
import { Header, Loader, Message, Accordion, ScrollTop, Meta } from '../components';
import { color, shadow, rounded } from '../utilities';
import { BlueCircle, CheckCircle } from '../utilities/svg';
import { ORDER_DETAILS_RESET, ADDED_ORDER_RESET } from '../actions/types';

export function ProductsScreen() {
  const dispatch = useDispatch();
  const porductList = useSelector((state) => state.porductList);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const filterProduct = useSelector((state) => state.filterProduct);
  const { color: pickedColor, price: selectedPrice, freeShipping } = filterProduct;
  const wichlist = useSelector((state) => state.wichlist);
  const { loading, error, products } = porductList;
  const { items } = wichlist;

  const [subCategories, setsubCategories] = useState([]);
  const [filtredProducts, setfiltredProducts] = useState([]);
  const [categorieText, setCategorieText] = useState('all');
  const [searchTerm, setSearchTerm] = useState();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('highest');
  const [Hearts, setHearts] = useState(false);
  const ref = useRef();
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

  useEffect(() => {
    if (categorieText === 'all') {
      setSearchedProducts(products);
    } else if (subCategories.includes(categorieText)) {
      setSearchedProducts(filtredProducts);
      const newProducts = filtredProducts.filter((el) => el.subcategory === categorieText);

      setSearchedProducts(newProducts);
    }
  }, [categorieText, subCategories, filtredProducts, products]);

  const isAddedProduct = (id) => {
    const val = cartItem.length > 0 && cartItem.find((el) => el._id === id);

    const newVal = val && val.itemAdded;
    return newVal;
  };

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
    const filtred = filtredProducts.filter((el) => el.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
    if (searchTerm) {
      setSearchedProducts(filtredProducts);
    }
    setSearchedProducts(filtred);
  };

  const selectedSort = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === 'lowest') {
      setSearchedProducts(filtredProducts);
      setSearchedProducts(searchedProducts.sort((a, b) => a.price - b.price));
    } else if (e.target.value === 'highest') {
      setSearchedProducts(filtredProducts);
      setSearchedProducts(searchedProducts.sort((a, b) => b.price - a.price));
    } else if (e.target.value === 'name-a') {
      setSearchedProducts(filtredProducts);
      const tempProducts = searchedProducts.sort((a, b) => a.name.localeCompare(b.name));
      setSearchedProducts(tempProducts);
    } else if (e.target.value === 'name-z') {
      setSearchedProducts(filtredProducts);
      const tempProducts = searchedProducts.sort((a, b) => b.name.localeCompare(a.name));
      setSearchedProducts(tempProducts);
    }
  };

  useEffect(() => {
    setSearchedProducts(filtredProducts);
    if (pickedColor !== 'all') {
      const tempProducts = filtredProducts.filter((product) => product.colors.find((c) => c === pickedColor));
      console.log('tempProducts', tempProducts);
      setSearchedProducts(tempProducts);
    }
  }, [pickedColor]);

  useEffect(() => {
    if (freeShipping) {
      const tempProducts = searchedProducts.filter((product) => product.shipping === true);
      setSearchedProducts(tempProducts);
    } else {
      setSearchedProducts(filtredProducts);
    }
  }, [freeShipping]);
  useEffect(() => {
    if (selectedPrice && selectedPrice[0] === 'Under') {
      const tempProducts = filtredProducts.filter((product) => product.price <= selectedPrice[1]);
      setSearchedProducts(tempProducts);
    } else if (selectedPrice && selectedPrice[0] === 'Above') {
      const tempProducts = filtredProducts.filter((product) => product.price >= selectedPrice[1]);
      setSearchedProducts(tempProducts);
    } else {
      const tempProducts = filtredProducts.filter(
        (product) => product.price >= selectedPrice[0] && product.price <= selectedPrice[1]
      );
      setSearchedProducts(tempProducts);
    }
  }, [selectedPrice]);

  const clearHandler = () => {
    dispatch(clearFilters());
    dispatch(listProduct());
  };

  const wichlistHandler = (id) => {
    dispatch(addToWichlist(id));
  };

  return (
    <>
      <Header productList />
      <Meta title="Products | Experience our selection of designer furniture" />
      <ScrollTop />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message mt="4rem" bg="danger">
          {error}
        </Message>
      ) : (
        <Container>
          <Div>
            <CategorieWrapper ref={ref}>
              {subCategories.map((el, index) => (
                <Button key={index} type="button" onClick={(e) => setCategorieText(e.target.textContent.toLowerCase())}>
                  {el}
                </Button>
              ))}
            </CategorieWrapper>
          </Div>
          <ContentWrapper>
            <FilterWrapper>
              <Input type="text" value={searchTerm} onChange={searchHandler} placeholder="Search" />
              <Accordion />

              <ClearBtn type="button" onClick={clearHandler}>
                Clear Filters
              </ClearBtn>
            </FilterWrapper>
            <div>
              <HeaderDetails>
                <ResultsNumber>
                  {searchedProducts && searchedProducts.length === 0
                    ? searchedProducts.length
                    : searchedProducts && searchedProducts.length}{' '}
                  Results{' '}
                </ResultsNumber>
                <hr /> <SortText>Sort By</SortText>{' '}
                <Select value={sortBy} id="sort" onChange={selectedSort}>
                  <option value="highest">Price (Highest) &nbsp;</option>
                  <option value="lowest">Price (Lowest) &nbsp;</option>
                  <option value="name-a">Name (A -Z) &nbsp;</option>
                  <option value="name-z">Name (Z-A) &nbsp;</option>
                </Select>
              </HeaderDetails>

              <GridContainer>
                {searchedProducts.map((el) => (
                  <Card key={el._id}>
                    <HeartBtn type="button" onClick={() => wichlistHandler(el._id)}>
                      {wichlist.items.find((x) => x.id === el._id) ? <HeartFill /> : <Heart />}
                    </HeartBtn>
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
  padding-bottom: 5rem;
  margin-top: 4.5rem;
`;
const ContentWrapper = styled.div`
  padding-top: 5rem;

  display: grid;
  grid-template-columns: 24% 1fr;
  @media (max-width: 1030px) {
    grid-template-columns: 1fr;
    padding-top: 2rem;
  }
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
  cursor: pointer;
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
    width: 56%;
    @media (max-width: 1030px) {
      width: 30%;
    }
  }
  @media (max-width: 1030px) {
    margin-top: 2rem;
  }
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
  @media (max-width: 1030px) {
    padding-right: 2rem;
    padding-left: 2rem;
    justify-content: flex-start;
  }

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
  &:focus {
    background-color: ${color.black};
    color: ${color.white};
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
  font-size: 1rem;
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
//* Select ===================

const Select = styled.select`
  appearance: none;

  background-color: transparent;
  border: none;

  margin: 0;

  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  border: 1px solid ${color.grey_400};
  border-radius: ${rounded.md};
  padding: 0.5rem;
  position: relative;
  @media (max-width: 1030px) {
    margin-right: 1rem;
  }

  &:focus {
    outline: none;
    border: 1px solid ${color.grey_600};
  }
`;

const SortText = styled.span`
  display: inline-block;
  width: 7ch;
  margin-left: 1rem;
`;
const ResultsNumber = styled.span`
  display: inline-block;
  width: 10ch;
  margin-left: 3rem;
  margin-right: 1rem;
`;

const HeartFill = styled(BsFillHeartFill)`
  color: ${color.red_vivid_500};
`;
const HeartBtn = styled.button`
  background: transparent;
  position: absolute;
  top: 1rem;
  right: 2rem;
  z-index: 99999;
  cursor: pointer;
  opacity: 0;
  svg {
    font-size: 1.5rem;
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
  &:hover {
    ${HeartBtn} {
      opacity: 1;
    }
  }
`;

const Heart = styled(BsHeart)``;
