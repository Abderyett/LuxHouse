const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateJwt');
const User = require('../models/userModel');

//* @desc Auth user/Get Token
//* @route GET api/v1/users/login
//* @access Public
exports.logUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      status: 'success',
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
