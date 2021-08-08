const express = require('express');
const {
  logUser,
  getUserProfile,
  registerUser,
} = require('../controllers/useController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

//* @desc Auth user/Get Token
//* @route GET api/v1/users/login
//* @access Public

router.post('/login', logUser);
router.route('/profile').get(protect, getUserProfile);
router.post('/', registerUser);

module.exports = router;
