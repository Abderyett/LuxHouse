import React from 'react';
import styled from 'styled-components';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { color } from '../utilities';
import sofa from '../assets/hero_sofa.png';
import lamp from '../assets/hero_lamp.png';

export function Hero() {
  return (
    <StyledSection>
      <Secondcolor />
      <HangLamp src={lamp} alt="hanging lamp" />
      <Sofa src={sofa} alt="grey sofa" />
      <HeroText>
        <span>Lapan</span> sofas collection
      </HeroText>
      <NewCollection type="button">
        <a href="/newcollection"> New Collection</a>
        <span>
          <StyledArrow />
        </span>
      </NewCollection>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  height: 100vh;
  position: relative;
`;

const Secondcolor = styled.div`
  background-color: ${color.sugar_swi};
  height: 100%;
  width: 50%;
  float: right;
`;

const HangLamp = styled.img`
  width: 250px;
  position: absolute;
  top: 0;
  right: 200px;
`;
const Sofa = styled.img`
  width: 900px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const HeroText = styled.h1`
  font-size: 4.8rem;
  color: ${color.black};
  width: 15ch;
  text-transform: uppercase;
  font-family: 'avenir_semi';
  position: absolute;
  top: 37%;
  left: 35%;
  transform: translate(-50%, -50%);
  span {
    font-family: 'playfair_italic';
    color: ${color.blue_grey_400};
  }
`;

const NewCollection = styled.button`
  position: absolute;
  bottom: 100px;
  right: 0;
  background-color: ${color.black};
  padding: 1rem 2rem;
  &:hover {
    svg {
      transform: translateX(5px);
      transition: all 0.3s ease-in-out;
    }
  }

  a {
    color: ${color.white};
    font-family: 'avenir_regular';
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
const StyledArrow = styled(HiOutlineArrowNarrowRight)`
  color: ${color.white};
  font-size: 1.5rem;
  cursor: pointer;
  vertical-align: middle;
  margin-left: 1rem;
`;
