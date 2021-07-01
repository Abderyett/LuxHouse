import React from 'react';
import styled from 'styled-components';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { color } from '../utilities';
import sofa from '../assets/hero_sofa.png';
import lamp from '../assets/hero_lamp.png';

export function Hero() {
  return (
    <StyledSection>
      <Firstcolor initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 1 }} />
      <Secondcolor initial={{ y: '-100%' }} animate={{ y: 0 }} transition={{ duration: 1 }} />
      <HangLamp
        src={lamp}
        alt="hanging lamp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <Sofa src={sofa} alt="grey sofa" />
      <HeroText
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: '-60%', y: '-20%', opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span>Lapan</span> sofas collection
      </HeroText>
      <NewCollection type="button" initial={{ x: '-1000%' }} animate={{ x: 0 }} transition={{ duration: 1, delay: 3 }}>
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

const Secondcolor = styled(motion.div)`
  background-color: ${color.ecru};
  height: 100%;
  width: 50%;
  float: right;
`;
const Firstcolor = styled(motion.div)`
  background-color: ${color.sugar_swi};
  height: 100%;
  width: 50%;
  float: left;
`;

const HangLamp = styled(motion.img)`
  width: 250px;
  position: absolute;
  top: 0;
  right: 10%;
  @media (max-width: 900px) {
    width: 200px;
    right: 0;
  }

  @media (max-width: 800px) {
    width: 180px;
    right: 0;
  }
`;
const Sofa = styled.img`
  width: 900px;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  @media (max-width: 1080px) {
    width: 800px;
    left: 50%;
  }
  @media (max-width: 950px) {
    width: 780px;
    left: 50%;
  }
  @media (max-width: 800px) {
    width: 700px;
    left: 50%;
  }
  @media (max-width: 650px) {
    width: 700px;
    left: 90%;
  }
`;

const HeroText = styled(motion.h1)`
  font-size: 4.8rem;
  color: ${color.black};
  width: 15ch;
  text-transform: uppercase;
  font-family: 'avenir_semi';
  position: absolute;
  top: 37%;
  left: 35%;
  padding-left: 2rem;

  transform: translate(-50%, -50%);
  @media (max-width: 1170px) {
    font-size: 4rem;
  }
  @media (max-width: 950px) {
    font-size: 3.5rem;
    left: 38%;
  }
  @media (max-width: 800px) {
    font-size: 3rem;
    left: 40%;
  }
  @media (max-width: 650px) {
    font-size: 2.5rem;
    left: 50%;
  }
  span {
    font-family: 'playfair_italic';
    color: ${color.blue_grey_400};
  }
`;

const NewCollection = styled(motion.button)`
  position: absolute;
  bottom: 5rem;
  right: 0;
  background-color: ${color.black};
  padding: 1rem 2rem;
  cursor: pointer;
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
  }
`;
const StyledArrow = styled(HiOutlineArrowNarrowRight)`
  color: ${color.white};
  font-size: 1.5rem;
  cursor: pointer;
  vertical-align: middle;
  margin-left: 1rem;
`;
