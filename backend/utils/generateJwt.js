const jwt = require('jsonwebtoken');

exports.generateToken = (id) =>
  jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
