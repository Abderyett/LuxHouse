const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

exports.protect = asyncHandler(async (req, res, next) => {
  //* 1- Getting token in Header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401);
    throw new Error('You are not loged in');
  }

  //* 2 Verification Token

  try {
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded.id;
  } catch (error) {
    console.log('Invalid token');
  }

  //* 3- Check if user still exist

  //* 4- Check if user has changed password after token was issued

  next();
});
