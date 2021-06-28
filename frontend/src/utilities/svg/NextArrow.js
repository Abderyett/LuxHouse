import React from 'react';
import styled from 'styled-components';

export function NextArrow() {
  return (
    <StyledSvg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="30" cy="30" r="28.5" stroke="#9fb3c8" strokeWidth="2" />
      <path
        d="M44.7185 31.1681C45.1079 30.7765 45.1061 30.1433 44.7145 29.7539L38.3328 23.4077C37.9412 23.0183 37.308 23.0201 36.9186 23.4117C36.5292 23.8033 36.5309 24.4365 36.9225 24.8259L42.5952 30.4669L36.9541 36.1396C36.5647 36.5312 36.5665 37.1643 36.9581 37.5538C37.3497 37.9432 37.9829 37.9414 38.3723 37.5498L44.7185 31.1681ZM17.4934 31.537L44.0122 31.463L44.0066 29.463L17.4878 29.537L17.4934 31.537Z"
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
  margin-left: 2rem;

  &:active {
    ${Circle} {
      stroke: #f4df21;
    }
  }
`;
