const express = require('express');
const {
  logUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require('../controllers/useController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', logUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/register', registerUser);

module.exports = router;
