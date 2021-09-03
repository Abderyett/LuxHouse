const express = require('express');
const {
  addedOrderItem,
  getOrder,
  updateOrderPayment,
} = require('../controllers/orderContoller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addedOrderItem);
router.route('/:id').get(protect, getOrder);
router.route('update/:id').get(protect, updateOrderPayment);

module.exports = router;
