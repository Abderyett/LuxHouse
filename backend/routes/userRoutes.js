const express = require('express');
const {
  logUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
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
router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUser)
  .put(protect, isAdmin, updateUser);

module.exports = router;
