import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import styled from 'styled-components';

const data = [
  {
    title: 'Colors',
    iterable: [
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
    iterable: ['Under  $250', [250, 500], [500, 1000], [1000, 2000], [2000, 3000], ['Above - $3000']],
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
        <Content>
          {data.map((el, index) => (
            <div key={index}>
              <Title>
                {el.title}
                <span>
                  <IoIosArrowDown />
                </span>
              </Title>
              <Details>
                {el.iterable &&
                  el.iterable.map((item, i) => {
                    if (item && item.includes('#')) {
                      return <Circle color={item} />;
                    }
                    return (
                      <div key={index}>
                        <input type="checkbox" id={el.title} />
                        <label htmlFor={el.title}> &nbsp;{item}</label>
                      </div>
                    );
                  })}
              </Details>
            </div>
          ))}
        </Content>
      </SingleFilter>
    </>
  );
}

const SingleFilter = styled.article`
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    vertical-align: middle;
    transform: rotate(${({ show }) => (show === true ? '180deg' : '0')});
    transition: all 0.3s ease-in-out;
  }
`;

const Content = styled.div``;
const Details = styled.div``;
const Circle = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-top: 0.5rem;
`;
