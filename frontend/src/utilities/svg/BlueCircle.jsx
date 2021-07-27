import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from '../Colors';

export function BlueCircle() {
  const [toggle, setToggle] = useState(false);
  return (
    <StyledSvg
      width="50"
      height="50"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M61 32C61 48.0163 48.0163 61 32 61C15.9837 61 3 48.0163 3 32C3 15.9837 15.9837 3 32 3C48.0163 3 61 15.9837 61 32ZM24.1112 36.2811L18.0981 25.866C17.8219 25.3877 17.2103 25.2239 16.7321 25.5L15.866 26C15.3877 26.2761 15.2239 26.8877 15.5 27.366L22.5 39.4904C22.7761 39.9687 23.3877 40.1325 23.866 39.8564L24.1548 39.6897C24.227 39.6678 24.2979 39.6374 24.366 39.5981L47.7487 26.0981C48.227 25.8219 48.3909 25.2103 48.1147 24.732L47.6147 23.866C47.3386 23.3877 46.727 23.2239 46.2487 23.5L24.1112 36.2811Z"
            fill="white"
          />
          <rect x="22" y="37.5" width="29" height="3" rx="1" transform="rotate(-30 22 37.5)" fill="#48BB78" />
          <rect x="23" y="40.3564" width="16" height="3" rx="1" transform="rotate(-120 23 40.3564)" fill="#48BB78" />
          <path
            d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62Z"
            stroke="#48BB78"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <Stroke
            d="M32.3836 62C48.9521 62 62.3836 48.5685 62.3836 32C62.3836 15.4315 48.9521 2 32.3836 2C15.815 2 2.38356 15.4315 2.38356 32C2.38356 48.5685 15.815 62 32.3836 62Z"
            stroke={color.blue_500}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M61 32C61 48.0163 48.0163 61 32 61C15.9837 61 3 48.0163 3 32C3 15.9837 15.9837 3 32 3C48.0163 3 61 15.9837 61 32ZM18.7288 31.5085C18.7288 30.9655 19.1689 30.5254 19.7119 30.5254H31.5085V18.7288C31.5085 18.1859 31.9486 17.7458 32.4915 17.7458C33.0344 17.7458 33.4746 18.1859 33.4746 18.7288V30.5254H45.2712C45.8141 30.5254 46.2542 30.9655 46.2542 31.5085C46.2542 32.0514 45.8141 32.4915 45.2712 32.4915H33.4746V44.2881C33.4746 44.8311 33.0344 45.2712 32.4915 45.2712C31.9486 45.2712 31.5085 44.8311 31.5085 44.2881V32.4915H19.7119C19.1689 32.4915 18.7288 32.0514 18.7288 31.5085Z"
            fill="white"
          />
          <rect x="18" y="30" width="29" height="3" rx="1" fill="black" />
          <rect x="31" y="46" width="29" height="3" rx="1" transform="rotate(-90 31 46)" fill="black" />
        </>
      )}
    </StyledSvg>
  );
}

const Stroke = styled.path`
  transition: all 0.1s ease-in-out;
`;

const StyledSvg = styled.svg`
  position: absolute;
  bottom: -25px;
  right: 30px;
  cursor: pointer;

  &:active {
    ${Stroke} {
      stroke: ${color.green_500};
    }
  }
  &:hover {
    transform: scale(1.1);
  }
`;
