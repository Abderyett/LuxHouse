const express = require('express');
const {
  addedOrderItem,
  getOrder,
  updateOrderPayment,
  updateOrderPaymentPaypal,
} = require('../controllers/orderContoller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addedOrderItem);
router.route('/:id').get(protect, getOrder);
router.route('/:id/stripe').get(protect, updateOrderPayment);
router.route('/:id/paypal').put(protect, updateOrderPaymentPaypal);

module.exports = router;
