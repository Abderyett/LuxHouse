import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from '../utilities';

export function Error({ touched, message }) {
  if (!touched) {
    return <Errors>&nbsp;</Errors>;
  }
  if (message) {
    return <Errors>{message}</Errors>;
  }
  return null;
}

Error.propTypes = {
  touched: PropTypes.bool,
  message: PropTypes.string,
};

const Errors = styled.div`
  color: ${color.red_vivid_500};
  font-size: 1rem;
  padding-top: 1rem;
`;
