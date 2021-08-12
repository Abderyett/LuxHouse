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

//* @desc Create User
//* @route POST api/v1/users/register
//* @access Public

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error('User already exists');
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
    throw new Error("User Profile Doesn't exist");
  }
});

//* @desc Update User
//* @route PUT api/v1/users/Porfile
//* @access Public

exports.updateUserProfile = asyncHandler(async (req, res) => {
  //* 1-  We find user by ID attached by token in req
  const user = await User.findById(req.user);
  //* 2- Verify if there is user and update it
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    //* 3-  Save and send updated user info to the frontend

    const updatedUser = await user.save();

    res.status(200).json({
      status: 'success',
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User Not found');
  }
});
