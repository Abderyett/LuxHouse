/* eslint-disable no-shadow */
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHeart } from 'react-icons/fi';
import { pagination, color, shadow } from '../utilities';
import { Circle, NextArrow, PrevArrow, Dots } from '../utilities/svg';

export function PopularItems() {
  const [data, setData] = useState(pagination());
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  return (
    <CardWrapper>
      <Heading>
        <h2>Popular Items</h2>
        <div>
          {page + 1} of {data.length}
        </div>
        <button type="button" onClick={prevPage}>
          <PrevArrow />
        </button>
        <button type="button" onClick={nextPage}>
          <NextArrow />
        </button>
      </Heading>

      {data[page].map((el) => {
        const { id, title, category, img, price, description } = el;
        return (
          <Card key={id}>
            <Heart />
            <StyledImg src={img} alt={title} />
            <Title>
              <h3>{title}</h3>
              <h5>${price}</h5>
            </Title>
            <p>{category} </p>
            <Circle />
          </Card>
        );
      })}
      <StyedDots>
        <Dots />
      </StyedDots>
    </CardWrapper>
  );
}

const CardWrapper = styled.section`
  background: ${color.sugar_swi};
  width: 100%;
  padding: 0 3rem;
  margin-left: auto;
  margin-right: auto;
  margin: 10rem 0;
  display: grid;
  height: 100vh;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 20rem);
  position: relative;
  h2 {
    font-family: 'avenir_semi';
    width: 2ch;
    line-height: 3.5rem;
  }
`;

const Heart = styled(FiHeart)`
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  &:active {
    color: red;
    fill: red;
  }
`;

const Heading = styled.div`
  div {
    color: ${color.grey_700};
    margin-bottom: 5rem;
  }
  button {
    background: transparent;
  }
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  background-color: ${color.white};
  border-right: 1px solid ${color.grey_300};
  padding: 0 1rem 0 2rem;
  transition: all 0.6s ease-in-out;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:last-child {
    border: none;
  }
  &:hover {
    box-shadow: ${shadow.xxl};
    z-index: 2;

    ${Heart} {
      opacity: 1;
    }
  }

  h3 {
    font-size: 1.4rem;
    font-family: 'avenir_semi';
    span {
      font-family: 'avenir_regular';
    }
  }
  p {
    font-size: 1rem;
    margin-bottom: 5rem;
    color: #f4df21;
    font-family: 'playfair_italic';
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const StyledImg = styled.img`
  width: 15rem;
  padding-bottom: 2rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  h5::after {
    content: '';
    background: rgba(244, 223, 33, 0.3);
    height: 10px;
    width: 2.5rem;
    position: absolute;
    bottom: 15px;
    right: 2px;
  }
`;

const StyedDots = styled.div`
  position: absolute;
  bottom: 22%;
  left: 25%;
  z-index: 0;
`;
