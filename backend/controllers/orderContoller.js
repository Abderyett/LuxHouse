const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

exports.addedOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAdress,
    shippingMethod,
    paymentMethod,
    taxPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Empty cart');
  } else {
    const order = await Order.create({
      user: req.user,
      orderItems,
      shippingAdress,
      shippingMethod,
      paymentMethod,
      taxPrice,
      totalPrice,
    });
    res.status(201).json(order);
  }
});
