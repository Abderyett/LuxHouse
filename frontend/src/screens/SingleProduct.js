import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return <p>Single page</p>;
}
