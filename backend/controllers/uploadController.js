const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateJwt');

//* @desc Upload Images Cloudinary
//* @route POST api/v1/users/register
//* @access Public

exports.uploadController = asyncHandler(async (req, res) => {
  const data = req.body.uri;

  res.json(data);
});
