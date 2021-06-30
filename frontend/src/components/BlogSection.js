import React from 'react';
import styled, { css } from 'styled-components';
import diningRoom from '../assets/dining_room.jpg';
import livingRoom from '../assets/living_room.jpg';
import bathroom from '../assets/bathroom.jpg';
import { color } from '../utilities';

export function BlogSection() {
  return (
    <>
      <Heading>
        <h2>Our cozy blog</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla dolor provident officiis incidunt, magnam
          quisquam et iste accusantium labore veritatis!
        </p>
      </Heading>
      <ImgWrapper>
        <a href="/">
          <FirstImg>
            <FirstText>
              <h4>Why did reed karkoff walk away from his brand?</h4>
              <p>Robert Ford | 3 min ago</p>
            </FirstText>
          </FirstImg>
        </a>
        <a href="/">
          <SecondImg>
            <SecondText>
              <h4>Hot look: a fun random beauty report straight from the buyer</h4>
              <p>Jesse Lingard | 9 min ago</p>
            </SecondText>
          </SecondImg>
        </a>
        <a href="/">
          <ThirdImg>
            <ThirdText>
              <h4>How Lux home can improve the look of your house?</h4>
              <p>jack grealish | 20 min ago</p>
            </ThirdText>
          </ThirdImg>
        </a>
      </ImgWrapper>
    </>
  );
}

const Heading = styled.div`
  font-family: 'avenir_semi';
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-transform: none;
    padding-bottom: 1rem;
  }
  p {
    width: 70ch;
    padding-bottom: 1rem;
    font-size: 1.2rem;
    @media (max-width: 950px) {
      width: 50ch;
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      width: 40ch;
      font-size: 0.8rem;
    }
  }
`;

const ImgWrapper = styled.div`
  max-width: 1400px;
  display: grid;
  grid-gap: 3rem;

  margin-left: auto;
  margin-right: auto;
  grid-auto-flow: row;
  position: relative;
  @media (max-width: 768px) {
    grid-gap: 1rem;
  }
`;
const Img = css`
  height: 30rem;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 1s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
  @media (max-width: 768px) {
    background-size: 100vw;
  }
`;

const FirstImg = styled.div`
  background-image: url(${diningRoom});
  ${Img}
  background-position: left 100% bottom 40%;
  position: relative;
  @media (max-width: 768px) {
    height: 18rem;
  }
  &::after {
    content: '';
    position: absolute;
    left: 0rem;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, ${color.sugar_swi} 100%);
  }
`;

const EmbededText = css`
  z-index: 3;
  position: absolute;
  font-family: 'avenir_semi';
  right: 0;
  top: 30%;
  @media (max-width: 768px) {
    left: 5%;
  }

  h4 {
    color: ${color.black};
    font-size: 1.8rem;
    width: 24ch;
    color: ${color.grey_800};
    line-height: 2.5rem;
    @media (max-width: 768px) {
      font-size: 1.2rem;
      line-height: 1.8rem;
    }
  }
  p {
    text-transform: uppercase;
    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }
`;
const FirstText = styled.div`
  ${EmbededText}
`;

const SecondImg = styled.div`
  background-image: url(${bathroom});
  ${Img}
  background-position: left 100% bottom 0;
  position: relative;
  @media (max-width: 768px) {
    height: 14rem;
  }
`;
const SecondText = styled.div`
  ${EmbededText}
  left: 5rem;
  top: 45%;
  h4 {
    color: ${color.white};
  }
  p {
    color: ${color.white};
  }
`;

const ThirdImg = styled.div`
  background-image: url(${livingRoom});
  ${Img}
  background-position: right 100% bottom 30%;
  position: relative;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    height: 14rem;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 70rem;
    height: 100%;
    background-image: linear-gradient(to right, ${color.sugar_swi} 0%, rgba(255, 255, 255, 0) 100%);
  }
`;

const ThirdText = styled.div`
  ${EmbededText}
  left: 5rem;
  top: 45%;
`;
