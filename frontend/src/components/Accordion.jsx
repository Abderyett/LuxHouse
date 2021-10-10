/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { color } from '../utilities';
import { selectColor, selectPrice, selectShipping } from '../actions/productActions';

export function Accordion() {
  const [activeIndex, setactiveIndex] = useState(null);
  const [colorsList, setColorsList] = useState([]);

  const [checked, setChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const porductList = useSelector((state) => state.porductList);
  const filterProduct = useSelector((state) => state.filterProduct);

  const { color: pickedColor, price: selectedPrice, freeShipping } = filterProduct;
  const [selectedColor, setSelectedColor] = useState(pickedColor);
  const dispatch = useDispatch();
  const data = [
    {
      title: 'Colors',
      iterable: colorsList,
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

  useEffect(() => {
    const colors = porductList.products.map((el) => el.colors);
    const flat = colors.flat();
    const uniqueColors = [...new Set(flat)];
    setColorsList(uniqueColors);
  }, [porductList, pickedColor, selectPrice, freeShipping]);

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

  const colorsHandler = (item) => {
    setSelectedColor(item);
    dispatch(selectColor(item));
  };
  const priceHandler = (event, index, price) => {
    handleChange(event, index);

    dispatch(selectPrice(price));
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
                  <ColorWrapper>
                    {el.iterable &&
                      el.iterable.map((item, i) => {
                        if (item && item.includes('#')) {
                          return (
                            <Circle key={i} colored={item} onClick={() => colorsHandler(item)}>
                              {item === selectedColor && pickedColor.length > 0 ? <FiCheck /> : ''}
                            </Circle>
                          );
                        }

                        return (
                          <Wrapper key={i}>
                            <Price>
                              <input
                                type="checkbox"
                                value={item}
                                onClick={() => setSelectedIndex(i)}
                                onChange={(event) => priceHandler(event, i, item)}
                                checked={selectedIndex === i && checked && selectedPrice.length > 0}
                                id={i}
                              />
                              <PriceLabel htmlFor={i}>
                                {' '}
                                &nbsp;{typeof item[0] === 'string' ? item[0] : `$ ${item[0]}`} - ${item[1]}
                              </PriceLabel>
                            </Price>
                          </Wrapper>
                        );
                      })}
                  </ColorWrapper>
                </Details>
              )}
            </Container>
          ))}
          <Shipping>
            <label htmlFor="free-shipping">Free Shipping</label>
            <input
              type="checkbox"
              id="free-shipping"
              checked={freeShipping}
              onChange={(e) => dispatch(selectShipping(e.target.checked))}
            />
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
  /* display: inline-block; */
  /* margin-right: 1rem; */
`;

const ColorWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Wrapper = styled.div``;

const PriceLabel = styled.label`
  font-size: 0.9rem;
`;
