const express = require('express');
const {
  logUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
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
router.route('/:id').delete(protect, isAdmin, deleteUser);

module.exports = router;
