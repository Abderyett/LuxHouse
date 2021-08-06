const asyncHandler = require('express-async-handler');

//* @desc Auth user/Get Token
//* @route GET api/v1/users/login
//* @access Public
exports.logUser = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success' });
});
