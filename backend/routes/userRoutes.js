const express = require('express');
const {
  logUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} = require('../controllers/useController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', logUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/register', registerUser);
router.route('/').get(protect, isAdmin, getUsers);

module.exports = router;
