/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { BsXCircle } from 'react-icons/bs';
import ImageZoom from 'react-medium-image-zoom';
import { useSelector, useDispatch } from 'react-redux';
import { color, shadow, rounded } from '../utilities';
import { Header, Loader, Message } from '../components';
import { Heart, Equipement, Dimension } from '../utilities/svg';
import 'react-medium-image-zoom/dist/styles.css';
import { formatter } from '../helper/CurrencyFormat';
import { detailProduct } from '../actions/productActions';
import { incrementCartItem, decrementCartItem } from '../actions/cartAction';
import { addToWichlist } from '../actions/wichlistAction';

export function SingleProduct() {
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const num = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [selectedPhoto, setselectedPhoto] = useState(null);
  const { loading, error, product } = productDetail;

  const quantity = () => {
    const val = num.cartItem.find((el) => el._id === id);
    if (val && val.quantity) {
      return val.quantity;
    }
    return 0;
  };

  useEffect(() => {
    dispatch(detailProduct(id));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message mt="4rem" bg="danger">
          {error}
        </Message>
      ) : (
        <Container>
          <FirstSection>
            <PhotosSection>
              <ImageZoom>
                <SelectedImg img={selectedPhoto === null ? product.images && product.images[0].url : selectedPhoto} />
              </ImageZoom>
              <ImgsWrapper>
                {product.images &&
                  product.images.map((p) => <IMG key={p._id} src={p.url} onClick={() => setselectedPhoto(p.url)} />)}
              </ImgsWrapper>
            </PhotosSection>
            <DetailsSection>
              <DetailWrapper>
                <DetailHeader>
                  <Price>
                    <h3>{product && product.name}</h3>
                    <p>{product && formatter.format(product.price)}</p>
                  </Price>
                  <Text>{product && product.subcategory}</Text>
                  <DescriptionText>
                    {product && product.description && product.description.substring(0, 149)}
                  </DescriptionText>
                </DetailHeader>
                <ColorWrapper>
                  <b>{product && product.colors && 'Textures/Colors styles :'}</b>
                  {product && product.colors && product.colors.map((c, index) => <Color key={index} texture={c} />)}
                </ColorWrapper>

                <ButtonWrapper>
                  <div>
                    {product && product.shipping ? <FiCheckCircle /> : <BsXCircle />} &nbsp;
                    <span>{product && product.shipping ? 'Available' : 'Not available'} for delivery</span>
                  </div>

                  {/* !Cart buttons */}

                  <CartBtn>
                    <button
                      style={{ background: 'transparent' }}
                      type="button"
                      onClick={() => dispatch(addToWichlist(id))}
                    >
                      <Heart id={id} />
                    </button>

                    {product && product.shipping && (
                      <Button>
                        {' '}
                        Add to cart
                        <span onClick={() => dispatch(incrementCartItem(product))}>
                          <PlusIcon />
                        </span>{' '}
                        &nbsp; {quantity()}
                        <span onClick={() => dispatch(decrementCartItem(product))}>
                          &nbsp;
                          <MinusIcon />
                        </span>
                      </Button>
                    )}
                  </CartBtn>

                  {/* !Cart buttons */}
                </ButtonWrapper>
              </DetailWrapper>
            </DetailsSection>
          </FirstSection>
          <SecondSection>
            <Description>
              <h4>Description</h4>
              <p> {product && product && product.description}</p>
            </Description>
            <Features>
              {' '}
              <h4>Features</h4>
              <FirstFeature>
                {' '}
                <Equipement /> <span>{product && product.Features && product.Features[0]}</span>
              </FirstFeature>
              <SecondFeature>
                {' '}
                <Dimension /> <span>{product && product.Features && product.Features[1]}</span>
              </SecondFeature>
            </Features>
          </SecondSection>
        </Container>
      )}
    </>
  );
}
const Container = styled.div``;

const FirstSection = styled.section`
  height: 70vh;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 50vw;
  @media (max-width: 1030px) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
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

  @media (max-width: 500px) {
    width: 90vw;
    height: 400px;
    margin: 0 auto;
  }
`;

const ImgsWrapper = styled.div`
  position: absolute;
  top: 92%;
  left: 10%;
  display: flex;
  margin-right: 1rem;
  overflow-x: auto;
  width: 100%;
  @media (max-width: 1030px) {
    top: 100%;
    /* padding-bottom: 4rem; */
  }
  @media (max-width: 600px) {
    grid-gap: 0.75rem;
  }
`;
const IMG = styled.img`
  width: 150px;
  height: 150px;
  border: 7px solid ${color.white};
  box-shadow: ${shadow.xl};
  cursor: pointer;
`;

// First Section details
const DetailWrapper = styled.div`
  display: grid;
  padding: 0 5.5rem;
  @media (max-width: 1268px) {
    padding: 0 2rem;
  }
  @media (max-width: 1030px) {
    padding: 2rem;
    margin-top: 2rem;
  }
`;

const DetailsSection = styled.section`
  background-color: rgba(240, 244, 248, 0.3);
  padding-top: 7rem;
`;
const DetailHeader = styled.div`
  padding-bottom: 1.5rem;
  @media (max-width: 1268px) {
    padding: 0;
  }
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
    position: relative;
    font-size: 1.3rem;
    color: black;
    &::after {
      content: '';
      background: rgba(244, 223, 33, 0.3);
      height: 12px;
      width: 4rem;
      position: absolute;
      bottom: 0px;
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

  font-size: 1rem;
  line-height: 2.5rem;
`;

const ColorWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: ${color.black};
  font-size: 1rem;
  @media (max-width: 600px) {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0.5rem;
  }
`;
const Color = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: ${rounded.full};
  background: ${({ texture }) => texture};
  box-shadow: ${shadow.lg};

  margin-left: 1.5rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  @media (max-width: 600px) {
    margin-left: 0rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  @media (max-width: 1268px) {
    padding-top: 1rem;
  }
  @media (max-width: 1045px) {
    flex-direction: column;
    align-items: flex-start;
  }

  svg {
    font-size: 1.3rem;
    vertical-align: middle;

    cursor: pointer;
  }
`;
const PlusIcon = styled(AiOutlinePlusCircle)`
  margin-left: 0.5rem;
`;
const MinusIcon = styled(AiOutlineMinusCircle)`
  margin-left: 0.5rem;
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
  cursor: pointer;
`;

const CartBtn = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1268px) {
    margin-top: 1rem;
  }
`;

const SecondSection = styled.section`
  background-color: ${color.sugar_swi};
  height: 100%;
  padding: 10rem 4rem;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-gap: 1rem;
  @media (max-width: 1030px) {
    padding: 2rem;
  }
  @media (max-width: 984px) {
    grid-template-columns: 1fr;
  } ;
`;
const Description = styled.div`
  h4 {
    font-family: 'avenir_semi';
  }
  p {
    line-height: 2.5rem;
  }
`;
const Features = styled.div``;

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
