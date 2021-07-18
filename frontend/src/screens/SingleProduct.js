/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { BsXCircle } from 'react-icons/bs';
import ImageZoom from 'react-medium-image-zoom';
import { color, shadow, rounded } from '../utilities';
import { Header } from '../components';
import { Heart, Equipement, Dimension } from '../utilities/svg';
import 'react-medium-image-zoom/dist/styles.css';
import { formatter } from '../helper/CurrencyFormat';

export function SingleProduct() {
  const { id } = useParams();

  const [item, setItem] = useState({});
  const [photo, setPhoto] = useState([]);
  const [selectedPhoto, setselectedPhoto] = useState('');

  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    setItem(data.product.fields);
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
            <ImageZoom>
              <SelectedImg img={selectedPhoto} />
            </ImageZoom>
            <ImgsWrapper>
              {photo.map((p, index) => (
                <IMG key={index} src={p} onClick={() => setselectedPhoto(p)} />
              ))}
            </ImgsWrapper>
          </PhotosSection>
          <DetailsSection>
            <DetailWrapper>
              <DetailHeader>
                <Price>
                  <h3>{item.name}</h3>
                  <p>{formatter.format(item.price)}</p>
                </Price>
                <Text>{item.subcategory}</Text>
                <DescriptionText>{item.description && item.description.substring(0, 149)}</DescriptionText>
              </DetailHeader>
              <ColorWrapper>
                {item.colors && 'Textures/Colors styles :'}
                {item.colors && item.colors.map((c) => <Color texture={c} />)}
              </ColorWrapper>

              <ButtonWrapper>
                <div>
                  {item.shipping === 'true' ? <FiCheckCircle /> : <BsXCircle />} &nbsp;
                  <span>{item.shipping === 'true' ? 'Available' : 'Not available'} for delivery</span>
                </div>

                <CartBtn>
                  <Heart />
                  <Button>
                    {' '}
                    Add to cart{' '}
                    <span>
                      <AiOutlinePlusCircle />
                    </span>{' '}
                    &nbsp; 1
                    <span>
                      &nbsp;
                      <AiOutlineMinusCircle />
                    </span>
                  </Button>
                </CartBtn>
              </ButtonWrapper>
            </DetailWrapper>
          </DetailsSection>
        </FirstSection>
        <SecondSection>
          <Description>
            <h4>Description</h4>
            <p> {item.description}</p>
          </Description>
          <Features>
            {' '}
            <h4>Features</h4>
            <FirstFeature>
              {' '}
              <Equipement /> <span>{item.Features[0]}</span>
            </FirstFeature>
            <SecondFeature>
              {' '}
              <Dimension /> <span>{item.Features[1]}</span>
            </SecondFeature>
          </Features>
        </SecondSection>
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

// First Section Photos
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
  cursor: zoom-in;
`;

const ImgsWrapper = styled.div`
  position: absolute;
  top: 92%;
  left: 10%;
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

// First Section details
const DetailWrapper = styled.div`
  display: grid;
  padding: 0 5.5rem;
`;

const DetailsSection = styled.section`
  background-color: rgba(240, 244, 248, 0.3);
  padding-top: 7rem;
`;
const DetailHeader = styled.div`
  padding-bottom: 1.5rem;

  h3 {
    font-family: 'avenir_semi';
  }
`;
const Price = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'avenir_semi';
  p {
    padding-left: 60%;
    position: relative;
    font-size: 1.8rem;
    color: black;
    &::after {
      content: '';
      background: rgba(244, 223, 33, 0.3);
      height: 15px;
      width: 4.5rem;
      position: absolute;
      bottom: 5px;
      right: 2px;
    }
  }
`;

const Text = styled.p`
  color: ${color.grey_500};
  text-transform: capitalize;
  font-style: italic;
`;

const DescriptionText = styled.p`
  color: Black;
  width: 55ch;
  font-size: 1.3rem;
  line-height: 2.5rem;
`;

const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${color.black};
  font-size: 1.2rem;
`;
const Color = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${rounded.full};
  background: ${({ texture }) => texture};
  box-shadow: ${shadow.lg};
  margin-left: 1.5rem;
  cursor: pointer;
  display: grid;
  place-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;

  svg {
    font-size: 1.5rem;
    vertical-align: middle;
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;
const Button = styled.button`
  border-radius: ${rounded.full};
  padding: 0.7rem;
  background: transparent;
  border: 2px solid black;
  text-transform: uppercase;
  font-family: 'avenir_semi';
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartBtn = styled.div`
  display: flex;
  align-items: center;
`;

const SecondSection = styled.section`
  background-color: ${color.sugar_swi};
  height: 100%;
  padding: 10rem 4rem;
  display: flex;
`;
const Description = styled.div`
  width: 60vw;
  h4 {
    font-family: 'avenir_semi';
  }
  p {
    width: 80ch;
    line-height: 2.5rem;
  }
`;
const Features = styled.div`
  width: 40vw;
`;

const position = css`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  span {
    padding-left: 1rem;
  }
`;

const FirstFeature = styled.div`
  ${position}
`;
const SecondFeature = styled.div`
  ${position}
`;
