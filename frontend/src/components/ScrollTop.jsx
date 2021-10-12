import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowAltCircleUp } from 'react-icons/fa';

export function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollTo = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  return (
    <>
      <Button type="button" onClick={scrollTo} isVisible={isVisible}>
        <Arrow aria-hidden="true" />
      </Button>
    </>
  );
}

const Button = styled.button`
  background: transparent;
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  cursor: pointer;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const Arrow = styled(FaArrowAltCircleUp)`
  font-size: 2.5rem;
  z-index: 99999;
  position: relative;
`;
