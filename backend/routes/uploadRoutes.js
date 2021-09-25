const express = require('express');
const {
  uploadController,
  uploadMultipleController,
} = require('../controllers/uploadController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, isAdmin, uploadController);
router.post('/multiple', protect, isAdmin, uploadMultipleController);

module.exports = router;
