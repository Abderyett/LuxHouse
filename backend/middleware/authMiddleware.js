const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

exports.protect = asyncHandler(async (req, res, next) => {
  //* 1- Getting token in Header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  }
  if (!token) {
    res.status(401);
    throw new Error('You are not loged in');
  }

  //* 2 Verification Token
  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded.id;
  } catch (error) {
    throw new Error('Invalid Token');
  }

  //* 3- Check if user still exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    res.status(401);
    throw new Error('The user belonging to this token does no longer exist.');
  }

  //* 4- Check if user has changed password after token was issued

  next();
});
