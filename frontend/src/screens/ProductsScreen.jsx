/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productActions';
import { Header, Accordion } from '../components';
import { color, shadow, rounded } from '../utilities';
import { BlueCircle } from '../utilities/svg';

export function ProductsScreen() {
  const dispatch = useDispatch();

  const [subCategories, setsubCategories] = useState([]);
  const [filtredProducts, setfiltredProducts] = useState([]);
  const [categorieText, setCategorieText] = useState('all');
  const porductList = useSelector((state) => state.porductList);
  const { loading, error, products } = porductList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const newArr = products.map((el) => el.subcategory);
      const categories = ['all', ...new Set(newArr)];

      setsubCategories(categories);
    }
  }, [products]);

  const filterProducts = (category) => {
    if (category === 'all') {
      setfiltredProducts(products);
    } else {
      const newProducts = products.filter((el) => el.subcategory === category);
      setfiltredProducts(newProducts);
    }
  };

  // const getColor=()=>{
  //   const arr = products.map((el) => el.colors);
  // const filtredArr = arr.filter((el) => el && el);

  // const flatted = filtredArr.reduce((acc, curVal) => acc.concat(curVal), []);
  // const unique = [...new Set(flatted)];

  // }

  useEffect(() => {
    filterProducts(categorieText);
  }, [categorieText]);

  return (
    <>
      <Header />
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
            <Accordion />

            <ClearBtn type="button">Clear Filters</ClearBtn>
          </FilterWrapper>
          <div>
            <HeaderDetails>
              <span>{filtredProducts.length === 0 ? products.length : filtredProducts.length} Results </span>
              <hr /> <span>Sort By</span>
            </HeaderDetails>
            <GridContainer>
              {categorieText === 'all'
                ? products.map((el) => (
                    <Card key={el._id}>
                      <Link to={`/products/${el._id}`}>
                        <StyledImg src={el.image[0].url} alt={el.subcategory} />
                        <Title>
                          <h3>{el.name}</h3>
                          <PriceText category={el.category}>${el.price}</PriceText>
                        </Title>
                        <Subcategory category={el.category}>{el.subcategory} </Subcategory>
                        <Description>{el.description.substring(0, 100)}...</Description>
                      </Link>
                      <BlueCircle />
                    </Card>
                  ))
                : filtredProducts.map((el) => (
                    <Card key={el._id}>
                      <Link to={`/products/${el._id}`}>
                        <StyledImg src={el.image[0].url} alt={el.subcategory} />
                        <Title>
                          <h3>{el.name}</h3>
                          <PriceText category={el.category}>${el.price}</PriceText>
                        </Title>
                        <Subcategory category={el.category}>{el.subcategory}</Subcategory>
                        <Description>{el.description.substring(0, 100)}...</Description>
                      </Link>
                      <BlueCircle />
                    </Card>
                  ))}
            </GridContainer>
          </div>
        </ContentWrapper>
      </Container>
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
  grid-template-columns: repeat(auto-fit, 23rem);

  grid-gap: 2.5rem;
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
