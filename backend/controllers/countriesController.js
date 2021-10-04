const asyncHandler = require('express-async-handler');
const countries = require('../data/countries');

//* @desc Fetch all Products
//* @route GET api/v1/countries
//* @access Public

exports.getCountries = asyncHandler(async (req, res) => {
  res.status(200).send(countries);
});
