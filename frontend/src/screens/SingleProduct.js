/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { color, shadow } from '../utilities';
import { Header } from '../components';

export function SingleProduct() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [photo, setPhoto] = useState([]);
  const [selectedPhoto, setselectedPhoto] = useState('');

  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    setItem(data);
    const arr = data.product.fields.images.map((el) => el.url);
    setPhoto(arr);
    setselectedPhoto(arr[0]);
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        <FirstSection>
          <PhotosSection>
            <SelectedImg img={selectedPhoto} />
            <ImgsWrapper>
              {photo.map((p) => (
                <IMG src={p} />
              ))}
            </ImgsWrapper>
          </PhotosSection>
          <DetailsSection>details</DetailsSection>
        </FirstSection>
        <SecondSection>Second</SecondSection>
      </Container>
    </>
  );
}
const Container = styled.div``;

const FirstSection = styled.section`
  height: 70vh;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 50vw;
`;
const SecondSection = styled.section`
  background-color: ${color.sugar_swi};
  height: 60vh;
`;

const PhotosSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const SelectedImg = styled.div`
  background-image: url(${({ img }) => img});
  width: 500px;
  height: 500px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const ImgsWrapper = styled.div`
  position: absolute;
  top: 92%;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
`;
const IMG = styled.img`
  width: 150px;
  height: 150px;
  border: 7px solid ${color.white};
  box-shadow: ${shadow.lg};
  cursor: pointer;
`;

const DetailsSection = styled.section`
  background-color: ${color.grey_050};
`;
