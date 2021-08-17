/* eslint-disable eqeqeq */
const jwt = require('jsonwebtoken');

const redisClient = require('../utils/init-redis');

exports.protect = (req, res, next) => {
  //* 1- Getting token in Header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //* 2 Verification Token

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
        return res.send('Invalid Token');
      }

      req.user = decode.id;

      redisClient.get(decode.id, (error, reply) => {
        if (error || !reply) {
          throw new Error('Unauthorized');
        }
      });
      next();
    });
  } else {
    res.status(401).send('You are not loged in');
  }

  //* 3-Verify With Redis

  //* 4- Check if user has changed password after token was issued
};
