const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have name'],
    },
    email: {
      type: String,
      required: [true, 'User must have email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'User must have password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
