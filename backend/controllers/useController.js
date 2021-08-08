const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateJwt');
const User = require('../models/userModel');

//* @desc Auth user/Get Token
//* @route POST api/v1/users/login
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

//* @desc Get profile
//* @route GET api/v1/users/Profile
//* @access Private

exports.getUserProfile = asyncHandler(async (req, res) => {
  const profile = await User.findById(req.user);

  if (profile) {
    res.status(200).json({
      _id: profile._id,
      name: profile.name,
      email: profile.email,
      isAdmin: profile.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User already exist');
  }
});

//* @desc Create User
//* @route POST api/v1/users
//* @access Public

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error('User already');
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(200).json({
      status: 'success',
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
});
