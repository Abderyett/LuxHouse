const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

//* @desc Add new Order
//* @route POST api/v1/orders
//* @access Private
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

//* @desc Get order by ID
//* @route GET api/v1/orders/:id
//* @access Private

exports.getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate('user', 'name email ');

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

exports.updateOrderPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (order) {
    order.isPaid = true;
    await order.save();
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
