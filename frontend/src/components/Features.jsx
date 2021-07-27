import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import featuresData from '../featureData';
import { color, shadow } from '../utilities';

export function Features() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        transition: {
          duration: 2,
        },
      });
    }
  }, [inView]);
  return (
    <FeatureSection ref={ref} animate={animation} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
      {featuresData.map((el) => {
        const { id, feature, featureIcon, arrowIcon, description } = el;
        return (
          <Card key={id}>
            <FeatureIcon> {featureIcon}</FeatureIcon>
            <h5>{feature}</h5>
            <p>{description} </p>
            <Arrow> {arrowIcon}</Arrow>
          </Card>
        );
      })}
    </FeatureSection>
  );
}

const FeatureSection = styled(motion.section)`
  width: 100%;
  padding: 0 3rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, 19rem);
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin-top: 5rem;
  }
`;

const Card = styled.div`
  background-color: ${color.white};
  border-right: 1px solid ${color.grey_300};
  padding: 4rem 2rem;
  transition: all 0.6s ease-in-out;
  cursor: pointer;
  @media (max-width: 768px) {
    border: none;
    border-bottom: 1px solid ${color.grey_300};
  }
  &:last-child {
    border: none;
  }
  &:hover {
    box-shadow: ${shadow.xxl};
    z-index: 2;
    svg {
      color: ${color.grey_700};
      transition: all 0.6s ease-in-out;
    }
  }

  h5 {
    width: 5ch;
    margin-bottom: 1rem;
  }
  p {
    font-size: 0.75rem;
    margin-bottom: 5rem;
  }
`;

const Arrow = styled.span`
  stroke-width: 0.01px;
  transition: all 0.6s ease-in-out;
  font-size: 3rem;
  color: ${color.grey_500};
  text-align: center;
`;

const FeatureIcon = styled.span`
  font-size: 3rem;
  color: ${color.grey_500};
  font-weight: 200;
  stroke-width: 0.01px;
`;
