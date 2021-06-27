import React, { useState } from 'react';
import styled from 'styled-components';
import { pagination, color, shadow } from '../utilities';

export function PopularItems() {
  const [data, setData] = useState(pagination());
  const [page, setPage] = useState(0);

  return (
    <CardWrapper>
      <div>
        Popular Items
        <span>1 of 5</span>
      </div>
      {data[page].map((el) => {
        const { id, title, category, img, price, description } = el;
        return (
          <Card key={id}>
            <StyledImg src={img} alt={title} />
            <h4>{title}</h4>
            <p>{category} </p>
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
  grid-template-columns: repeat(auto-fit, 22rem);
`;

const Card = styled.div`
  background-color: ${color.white};
  border-right: 1px solid ${color.grey_300};
  padding: 4rem 2rem;
  transition: all 0.6s ease-in-out;
  cursor: pointer;

  &:last-child {
    border: none;
  }
  &:hover {
    box-shadow: ${shadow.xxl};
    z-index: 2;
  }

  h4 {
    margin-bottom: 1rem;
  }
  p {
    font-size: 0.75rem;
    margin-bottom: 5rem;
  }
`;

const StyledImg = styled.img`
  width: 15rem;
`;
