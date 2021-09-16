const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateJwt');
const User = require('../models/userModel');
const redisClient = require('../utils/init-redis');

//* @desc Auth user/Get Token
//* @route POST api/v1/users/login
//* @access Public
exports.logUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Please Provide Email and Password');
  }

  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password))) {
    const { id } = user;

    const token = generateToken(id);
    redisClient.SET(id, token, 'EX', 2 * 24 * 60 * 60, (err, reply) => {
      if (err || !reply) {
        console.log(err.message);
      }
    });
    res.status(200).json({
      status: 'success',
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
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
    const { id } = user;
    const token = generateToken(id);
    redisClient.SET(id, token, 'EX', 2 * 24 * 60 * 60, (err, reply) => {
      if (err || !reply) {
        res.status(401).send('Unauthorized');
      }
    });
    res.status(200).json({
      status: 'success',
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
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
    const { id } = profile;
    const token = generateToken(id);
    redisClient.SET(id, token, 'EX', 2 * 24 * 60 * 60, (err, reply) => {
      if (err || !reply) {
        res.status(401).send('Unauthorized');
      }
    });
    res.status(200).json({
      _id: profile._id,
      name: profile.name,
      email: profile.email,
      isAdmin: profile.isAdmin,
      token: token,
    });
  } else {
    res.status(404);
    throw new Error("User Profile Doesn't exist");
  }
});

//* @desc Update User
//* @route PUT api/v1/users/Porfile
//* @access Private

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
    const { id } = updatedUser;
    const token = generateToken(id);
    redisClient.SET(id, token, (err, reply) => {
      if (err || !reply) {
        res.status(401).send('Unauthorized');
      }
    });
    res.status(200).json({
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

//* @desc Get Users
//* @route GET api/v1/users
//! @access Private/Admin

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    return res.status(200).json(users);
  }
  res.status(404);
  throw new Error("User Profile Doesn't exist");
});

//* @desc Delete User
//* @route DELETE api/v1/users/:id
//! @access Private/Admin

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json('User removed');
  }
  res.status(404);
  throw new Error('User Not Found');
});

//* @desc Get User By ID
//* @route GET api/v1/users/:id
//! @access Private/Admin

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User  Doesn't exist");
  }
});

//* @desc Update User
//* @route PUT api/v1/users/:id
//! @access AdminOnly

exports.updateUser = asyncHandler(async (req, res) => {
  //* 1-  We find user by ID attached by token in req
  const user = await User.findById(req.params.id);
  //* 2- Verify if there is user and update it
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    //* 3-  Save and send updated user info to the frontend

    const updatedUser = await user.save();

    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not found');
  }
});
