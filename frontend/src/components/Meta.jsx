import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}
Meta.defaultProps = {
  title: 'Scandinavian quality design | Shop furniture, lamps and accessories',
  description:
    "Experience our great selection of designer furniture and lamps from the 50's and 60's as well as modern design.",
  keywords:
    'Nordic design, design, furniture, lamps, designer lamps, designer furniture, danish design, hans olsen, e-commerce, store',
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};
