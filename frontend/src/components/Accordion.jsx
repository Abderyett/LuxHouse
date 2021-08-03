/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { color } from '../utilities';

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
    iterable: [
      ['Under', 250],
      [250, 500],
      [500, 1000],
      [1000, 2000],
      [2000, 3000],
      ['Above', 3000],
    ],
  },
];

export function Accordion() {
  const [activeIndex, setactiveIndex] = useState(null);

  const [selectedColor, setSelectedColor] = useState('1E1D1C');
  const [checked, setChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const toggle = (i) => {
    if (activeIndex === i) {
      return setactiveIndex(null);
    }
    setactiveIndex(i);
  };

  const handleChange = (e, i) => {
    if (selectedIndex === i) {
      return setChecked(null);
    }
    setChecked(true);
  };

  return (
    <>
      <SingleFilter index={activeIndex}>
        <Content>
          {data.map((el, index) => (
            <Container key={index}>
              <Title onClick={() => toggle(index)}>
                {el.title}
                <span>{activeIndex === null ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </Title>
              {activeIndex === index && (
                <Details
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {el.iterable &&
                    el.iterable.map((item, i) => {
                      if (item && item.includes('#')) {
                        return (
                          <Circle key={i} colored={item} onClick={() => setSelectedColor(item)}>
                            {item === selectedColor && <FiCheck />}
                          </Circle>
                        );
                      }
                      return (
                        <Wrapper key={i}>
                          <Price>
                            <input
                              type="checkbox"
                              onClick={() => setSelectedIndex(i)}
                              onChange={(e) => handleChange(e, i)}
                              checked={selectedIndex === i && checked}
                            />
                            <label>
                              {' '}
                              &nbsp;{typeof item[0] === 'string' ? item[0] : `$ ${item[0]}`} - ${item[1]}
                            </label>
                          </Price>
                        </Wrapper>
                      );
                    })}
                </Details>
              )}
            </Container>
          ))}
          <Shipping>
            <label htmlFor="free-shipping">Free Shipping</label>
            <input type="checkbox" id="free-shipping" />
          </Shipping>
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

    transition: all 0.3s ease-in-out;
  }
`;

const Content = styled.div``;
const Details = styled(motion.div)``;
const Container = styled.div`
  margin-top: 1rem;
  border-bottom: 1px solid ${color.warm_grey_100};
  padding: 0 0 1rem 1rem;
`;

const Circle = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${({ colored }) => colored};
  margin-top: 0.5rem;
  display: grid;
  place-items: center;
  svg {
    color: white;
  }
`;

const Shipping = styled.div`
  margin-top: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${color.warm_grey_100};
  display: flex;
  justify-content: space-between;
`;

const Price = styled.div`
  padding-top: 1rem;
`;

const Wrapper = styled.div``;
