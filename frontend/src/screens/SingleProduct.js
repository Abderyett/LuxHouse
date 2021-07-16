import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log(id);
  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/products/:${id}`);
  };

  useEffect(() => {}, [product]);

  return <div>Products</div>;
}
