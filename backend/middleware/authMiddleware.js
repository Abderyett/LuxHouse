const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const redisClient = require('../utils/init-redis');

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

  let decoded;

  try {
    decoded = await jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded.id;
  } catch (error) {
    throw new Error('Invalid Token');
  }

  //* 3-Verify With Redis

  redisClient.get(decoded.id, (err, reply) => {
    if (err || !reply) {
      res.status(401).send('Unauthorized');
    }
    if (reply != token) {
      res.status(401).send('Token is not in store');
    }
  });

  //* 4- Check if user has changed password after token was issued

  next();
});
