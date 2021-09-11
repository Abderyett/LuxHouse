/* eslint-disable eqeqeq */
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const redisClient = require('../utils/init-redis');

exports.protect = asyncHandler(async (req, res, next) => {
  //* 1- Getting token in Header

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      redisClient.get(decoded.id, (error, reply) => {
        if (error || !reply) {
          throw new Error('Unauthorized');
        }
      });
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);

      res.status(401).send('Not Authorized Token');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
