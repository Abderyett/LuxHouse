/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, rounded } from '../utilities';

export function Message({ bg, children }) {
  return <Alert bg={bg}>{children}</Alert>;
}

const Alert = styled.div`
  height: 4rem;
  background-color: ${({ bg }) =>
    bg === 'danger' ? `${color.red_100}` : bg === 'success' ? `${color.green_200}` : `${color.blue_200}`};
  margin: 0 auto;
  width: 100%;
  margin-top: 4rem;
  border-radius: ${rounded.md};
  color: ${({ bg }) =>
    bg === 'danger' ? `${color.red_400}` : bg === 'success' ? `${color.green_600}` : `${color.blue_500}`};
  padding: 1.5rem;
  margin-bottom: 3rem;
`;

Message.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.element,
};
