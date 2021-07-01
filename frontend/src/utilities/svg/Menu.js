import React from 'react';
import styled from 'styled-components';

export function Menu() {
  return (
    <StyledSvg width="45" height="45" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 43C30 44.1046 29.1046 45 28 45H9.5C8.39543 45 7.5 44.1046 7.5 43V42C7.5 40.8954 8.39543 40 9.5 40H28C29.1046 40 30 40.8954 30 42V43ZM52.5 30.5C52.5 31.6046 51.6046 32.5 50.5 32.5H9.5C8.39543 32.5 7.5 31.6046 7.5 30.5V29.5C7.5 28.3954 8.39543 27.5 9.5 27.5H50.5C51.6046 27.5 52.5 28.3954 52.5 29.5V30.5ZM52.5 18C52.5 19.1046 51.6046 20 50.5 20H32C30.8954 20 30 19.1046 30 18V17C30 15.8954 30.8954 15 32 15H50.5C51.6046 15 52.5 15.8954 52.5 17V18Z"
        fill="black"
      />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg``;
