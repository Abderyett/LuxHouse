import React from 'react';
import PropTypes from 'prop-types';

export function Error({ touched, message }) {
  if (!touched) {
    return <div className="form-message invalid">&nbsp;</div>;
  }
  if (message) {
    return <div className="form-message invalid">{message}</div>;
  }
  return null;
}

Error.propTypes = {
  touched: PropTypes.bool,
  message: PropTypes.string,
};
