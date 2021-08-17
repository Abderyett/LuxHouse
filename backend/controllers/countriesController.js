const asyncHandler = require('express-async-handler');
const Countries = require('../models/countriesModel');

//* @desc Fetch all Products
//* @route GET api/v1/products
//* @access Public

exports.getCountries = asyncHandler(async (req, res) => {
  const countries = await Countries.find({
    subregion: [
      'Northern Europe',
      'Australia and New Zealand',
      'Northern America',
      'Western Europe',
      'Northern Europe',
      'Southern Europe',
    ],
  });

  res.status(200).send(countries);
});
