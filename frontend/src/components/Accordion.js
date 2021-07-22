import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import styled from 'styled-components';

const data = [
  {
    title: 'Colors',
    colors: [
      '#1E1D1C',
      '#A04824',
      '#B8B6AC',
      '#7A8187',
      '#2D4136',
      '#CABCAE',
      '#424C4D',
      '#CB895C',
      '#104149',
      '#592E1C',
      '#EDDFD2',
      '#706641',
      '#B99557',
      '#C6B9AA',
      '#2C301F',
      '#F7EDE9',
      '#97A798',
      '#F3DE93',
    ],
  },
  {
    title: 'Price',
    prices: ['Under  $250', [250, 500], [500, 1000], [1000, 2000], [2000, 3000], ['Above - $3000']],
  },
  {
    title: 'Free Shipping',
  },
];

export function Accordion() {
  const [show, setShow] = useState(false);
  return (
    <>
      <SingleFilter show={show} onClick={() => setShow(!show)}>
        <div>
          Colors
          <span>
            <IoIosArrowDown />
          </span>
        </div>
        <ShowedText>
          {show && (
            <>
              <div>color1</div>
              <div>color2</div>
              <div>color3</div>
            </>
          )}
        </ShowedText>
      </SingleFilter>
      <SingleFilter show={show} onClick={() => setShow(!show)}>
        Colors
        <span>
          <IoIosArrowDown />
        </span>
        <ShowedText>
          {show && (
            <>
              <div>color1</div>
              <div>color2</div>
              <div>color3</div>
            </>
          )}
        </ShowedText>
      </SingleFilter>
    </>
  );
}

const SingleFilter = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  svg {
    vertical-align: middle;
    transform: rotate(${({ show }) => (show === true ? '180deg' : '0')});
    transition: all 0.3s ease-in-out;
  }
`;
const ShowedText = styled.div`
  transition: all 1s ease-in-out;
`;
