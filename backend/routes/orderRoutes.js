const express = require('express');
const { addedOrderItem } = require('../controllers/orderContoller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addedOrderItem);

module.exports = router;
