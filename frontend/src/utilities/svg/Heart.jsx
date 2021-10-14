import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { color } from '..';

export function Heart({ id }) {
  const [clicked, setClicked] = useState(false);
  const wichlist = useSelector((state) => state.wichlist);
  const verifyItem = wichlist.items.find((el) => el.id === id);
  useEffect(() => {
    if (verifyItem) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [wichlist.items]);
  return (
    <StyledSvg
      width="35"
      height="35"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      clicked={clicked}
    >
      <path
        d="M38.415 18.3265L38.3965 18.2693L38.3712 18.2146C36.9264 15.0912 33.8706 13.2604 30.5173 13.3127C29.4026 13.3302 28.2606 13.555 27.1385 14.0028L27.0961 14.0198L27.0553 14.0405C26.2735 14.4387 25.5748 14.9416 24.9622 15.546C21.9057 12.74 16.8608 12.4593 13.4198 15.5614L13.3925 15.5861L13.3671 15.6126C10.4091 18.7023 10.5173 23.5244 12.27 27.2408L12.2816 27.2654L12.2945 27.2894C14.3756 31.1432 18.4197 34.5878 22.0234 37.3273L22.0303 37.3325L22.0373 37.3377C22.171 37.4357 22.3251 37.5619 22.5191 37.7213L22.5263 37.7272C22.7099 37.878 22.9225 38.0526 23.1435 38.2189C23.5619 38.5336 24.1496 38.9298 24.798 39.0537L24.9338 39.0797L25.0716 39.0678C25.3717 39.0419 25.6593 38.9232 25.8686 38.8236C26.1021 38.7125 26.3543 38.5673 26.6104 38.4061C27.124 38.0828 27.717 37.6545 28.3133 37.1961C29.4994 36.2843 30.7622 35.204 31.5572 34.4652C33.2652 33.0101 34.9577 31.3269 36.3841 29.3597C38.6142 26.3614 39.7102 22.3285 38.415 18.3265ZM1 25C1 11.7452 11.7452 1 25 1C38.2548 1 49 11.7452 49 25C49 38.2548 38.2548 49 25 49C11.7452 49 1 38.2548 1 25Z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </StyledSvg>
  );
}
Heart.propTypes = {
  id: PropTypes.string,
};

const StyledSvg = styled.svg`
  cursor: pointer;
  margin-right: 1rem;
  path {
    fill: ${({ clicked }) => (clicked ? `${color.red_200}` : `${color.white}`)};
  }
  &:active path {
    fill: ${color.red_200};
  }
`;
