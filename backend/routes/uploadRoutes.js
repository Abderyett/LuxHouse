const express = require('express');
const { uploadController } = require('../controllers/uploadController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, isAdmin, uploadController);

module.exports = router;
