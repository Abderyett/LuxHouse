const express = require('express');
const { createCheckoutSession } = require('../controllers/checkoutController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createCheckoutSession);
module.exports = router;
