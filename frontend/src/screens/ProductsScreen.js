import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Header } from '../components';
import { color, shadow, rounded } from '../utilities';
import { BlueCircle } from '../utilities/svg';

export function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [filtredProducts, setfiltredProducts] = useState([]);
  const [categorieText, setCategorieText] = useState('all');

  const fetchProducts = async () => {
    const { data } = await axios.get('/api/v1/products');
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const newArr = products.map((el) => el.fields.subcategory);
      const categories = ['all', ...new Set(newArr)];
      setsubCategories(categories);
    }
  }, [products]);

  const filterProducts = (category) => {
    if (category === 'all') {
      setfiltredProducts(products);
    } else {
      const newProducts = products.filter((el) => el.fields.subcategory === category);
      setfiltredProducts(newProducts);
    }
  };
  useEffect(() => {
    filterProducts(categorieText);
  }, [categorieText]);

  /* <ul>
            {categorieText === 'all'
              ? products.map((el) => <li key={el._id}>{el.fields.subcategory}</li>)
              : filtredProducts.map((el) => <li key={el._id}>{el.fields.subcategory}</li>)}
          </ul> */

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
            <div>Colors</div>
            <div>Price</div>
            <div>Freeshipping</div>
            <div>Clear Filters</div>
          </FilterWrapper>
          <GridContainer>
            <GridDetails>
              <span>25 results </span>
              <hr /> <span>Sort By</span>
            </GridDetails>
            <GridList>
              <Card>
                <StyledImg
                  src="https://dl.airtable.com/.attachments/d7e4c18656f698beb90a5e84a68bf9e5/721c86bd/2101118-warmnordic-furniture-friedegg-sofa-teak-bluish-1700x1700.png"
                  alt="sofa"
                />
                <Title>
                  <h3>Mr.Olsen</h3>
                  <h5>$3654</h5>
                </Title>
                <Price>Sofa </Price>
                <Description>
                  The Cow Horn Chair is an iconic 1960s chair and a sculptural masterpiece for design lovers....
                </Description>
                <BlueCircle />
              </Card>
            </GridList>
          </GridContainer>
        </ContentWrapper>
      </Container>
    </>
  );
}

const Container = styled.div``;
const ContentWrapper = styled.div`
  padding-top: 5rem;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 1fr;
  place-items: center;
`;
const FilterWrapper = styled.div``;
const GridContainer = styled.div`
  width: 90%;
`;
const GridDetails = styled.div`
  display: flex;
  align-items: center;
  hr {
    width: 65%;
  }
  span {
    padding: 0 1rem;
  }
`;
const GridList = styled.div`
  margin-top: 12rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, 23rem);
`;
const Card = styled.div`
  width: 23rem;
  height: 18rem;
  box-shadow: ${shadow.xxl};
  background-color: ${color.white};
  padding-left: 2rem;
  padding-right: 2rem;
  /* border: 1px solid grey; */
  position: relative;
`;
const StyledImg = styled.img`
  width: 20rem;

  position: absolute;
  top: -11rem;
  left: 1.5rem;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 6rem;
  h5::after {
    content: '';
    background: rgba(66, 153, 225, 0.3);
    height: 10px;
    width: 2.6rem;
    position: absolute;
    bottom: 15px;
    right: 2px;
  }
  h3 {
    font-size: 1.4rem;
    font-family: 'avenir_semi';
  }
`;

const Price = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${color.blue_500};
  font-family: 'playfair_italic';
  font-weight: 900;
  text-transform: uppercase;
`;
const Description = styled.p``;

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
