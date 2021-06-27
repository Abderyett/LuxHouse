import React, { useState } from 'react';
import styled from 'styled-components';
import { BsPlusCircle } from 'react-icons/bs';
import { pagination, color, shadow } from '../utilities';

export function PopularItems() {
  const [data, setData] = useState(pagination());
  const [page, setPage] = useState(0);

  return (
    <CardWrapper>
      <Heading>
        <h2>Popular Items</h2>
        <span>
          {page + 1} of {data.length}
        </span>
      </Heading>
      {data[page].map((el) => {
        const { id, title, category, img, price, description } = el;
        return (
          <Card key={id}>
            <StyledImg src={img} alt={title} />
            <Title>
              <h3>{title}</h3>
              <h5>${price}</h5>
            </Title>
            <p>{category} </p>
            <StyledCircle />
          </Card>
        );
      })}
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
  h2 {
    font-family: 'avenir_semi';
    width: 2ch;
    line-height: 3.5rem;
  }
`;

const Heading = styled.div`
  span {
    color: ${color.grey_700};
  }
`;

const Card = styled.div`
  background-color: ${color.white};
  border-right: 1px solid ${color.grey_300};
  padding: 0 1rem 0 2rem;
  transition: all 0.6s ease-in-out;
  cursor: pointer;
  position: relative;
  &:last-child {
    border: none;
  }
  &:hover {
    box-shadow: ${shadow.xxl};
    z-index: 2;
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

const StyledCircle = styled(BsPlusCircle)`
  font-size: 3rem;
  position: absolute;
  bottom: -24px;
  right: 24px;
`;
