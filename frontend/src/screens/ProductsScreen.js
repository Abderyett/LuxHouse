import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Header } from '../components';

export function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/v1/products');
    setProducts(data);
    console.log(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Header />
      <Container>Products</Container>
    </>
  );
}

const Container = styled.div``;
