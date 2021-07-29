import React from 'react';
import styled from 'styled-components';
import { color } from '../utilities';

export function Loader() {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: 'auto', display: 'block', shapeRendering: 'auto' }}
      width="81px"
      height="81px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="50" cy="50" r="0" fill="none" stroke={color.blue_grey_700} strokeWidth="2">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7857142857142856s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="0s"
        />
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1.7857142857142856s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="0s"
        />
      </circle>
      <circle cx="50" cy="50" r="0" fill="none" stroke={color.blue_grey_600} strokeWidth="2">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7857142857142856s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="-0.8928571428571428s"
        />
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1.7857142857142856s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="-0.8928571428571428s"
        />
      </circle>
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  margin-top: 50rem;
`;
