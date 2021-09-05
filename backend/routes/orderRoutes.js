const express = require('express');
const {
  addedOrderItem,
  getOrder,
  updateOrderPayment,
  updateOrderPaymentPaypal,
  getOrders,
} = require('../controllers/orderContoller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addedOrderItem).get(protect, getOrders);
router.route('/:id').get(protect, getOrder);
router.route('/:id/stripe').get(protect, updateOrderPayment);
router.route('/:id/paypal').put(protect, updateOrderPaymentPaypal);

module.exports = router;
