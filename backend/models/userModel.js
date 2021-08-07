const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

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
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (entredPassword) {
  return await bcrypt.compare(entredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
