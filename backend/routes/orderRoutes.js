const express = require('express');
const { addedOrderItem, getOrder } = require('../controllers/orderContoller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addedOrderItem);
router.route('/:id').get(protect, getOrder);

module.exports = router;
