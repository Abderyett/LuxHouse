import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Header } from '../components';
import { color, shadow, rounded } from '../utilities';

export function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [categorieText, setCategorieText] = useState('');

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
      const categories = [...new Set(newArr)];
      setsubCategories(categories);
    }
  }, [products]);

  const filterState = (e) => {
    const text = e.target.textContent.toLowerCase();
    const newProducts = products.filter((el) => el.fields.subcategory === text);
    setProducts(newProducts);
  };

  return (
    <>
      <Header />
      <Container>
        <Div>
          <CategorieWrapper>
            {subCategories.map((el, index) => (
              <Button key={index} type="button" onClick={filterState}>
                {el}
              </Button>
            ))}
          </CategorieWrapper>
        </Div>
      </Container>
    </>
  );
}

const Container = styled.div``;
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
  border-radius: ${rounded.full};
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
    margin-right: 0rem;
  }
`;
