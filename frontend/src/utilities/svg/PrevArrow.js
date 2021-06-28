import React from 'react';
import styled from 'styled-components';

export function PrevArrow() {
  return (
    <StyledSvg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle r="28.5" transform="matrix(-1 0 0 1 30 30)" stroke="#9fb3c8" strokeWidth="2" />
      <path
        d="M15.2815 31.1681C14.8921 30.7765 14.8939 30.1433 15.2855 29.7539L21.6672 23.4077C22.0588 23.0183 22.692 23.0201 23.0814 23.4117C23.4708 23.8033 23.4691 24.4365 23.0774 24.8259L17.4048 30.4669L23.0459 36.1396C23.4353 36.5312 23.4335 37.1643 23.0419 37.5538C22.6503 37.9432 22.0171 37.9414 21.6277 37.5498L15.2815 31.1681ZM42.5066 31.537L15.9878 31.463L15.9934 29.463L42.5122 29.537L42.5066 31.537Z"
        fill="black"
      />
    </StyledSvg>
  );
}

const Circle = styled.circle`
  transition: all 0.1s ease-in-out;
`;

const StyledSvg = styled.svg`
  cursor: pointer;

  &:active {
    ${Circle} {
      stroke: #f4df21;
    }
  }
`;
