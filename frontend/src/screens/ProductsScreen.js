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
          <div>
            <HeaderDetails>
              <span>25 results </span>
              <hr /> <span>Sort By</span>
            </HeaderDetails>
            <GridContainer>
              {categorieText === 'all'
                ? products.map((el) => (
                    <Card key={el._id}>
                      <StyledImg src={el.fields.image[0].url} alt="sofa" />
                      <Title>
                        <h3>{el.fields.name}</h3>
                        <h5>${el.fields.price}</h5>
                      </Title>
                      <Subcategory>{el.fields.subcategory} </Subcategory>
                      <Description>{el.fields.description.substring(0, 100)}...</Description>
                      <BlueCircle />
                    </Card>
                  ))
                : filtredProducts.map((el) => (
                    <Card key={el._id}>
                      <StyledImg src={el.fields.image[0].url} alt="sofa" />
                      <Title>
                        <h3>{el.fields.name}</h3>
                        <h5>${el.fields.price}</h5>
                      </Title>
                      <Subcategory>{el.fields.subcategory} </Subcategory>
                      <Description>{el.fields.description.substring(0, 100)}...</Description>
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

const Container = styled.div``;
const ContentWrapper = styled.div`
  padding-top: 5rem;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 1fr;
`;
const FilterWrapper = styled.div``;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 25rem);

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
  width: 25rem;
  height: 25rem;
  box-shadow: ${shadow.xxl};
  background-color: ${color.white};
  padding-left: 2rem;
  padding-right: 2rem;

  position: relative;
`;
const StyledImg = styled.img`
  width: 14rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 1rem;
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

const Subcategory = styled.p`
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
