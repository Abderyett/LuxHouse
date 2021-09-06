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

//* @desc Update order to paid
//* @route GET api/v1/orders/:id/pay
//* @access Private
exports.updateOrderPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//* @desc Update payment for paypal
//* @route GET api/v1/orders/:id/paypal
//* @access Private
exports.updateOrderPaymentPaypal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_adress: req.body.payer.email_adress,
    };
    await order.save();
    res.status(200).json({
      status: 'success',
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//* @desc Get All Orders
//* @route GET api/v1/orders
//* @access Private

exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user });

  if (orders) {
    const filtredOrder = orders.map((order) => ({
      id: order._id,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
      createdAt: order.createdAt,
      totalPrice: order.totalPrice,
      taxPrice: order.taxPrice,
    }));
    res.status(200).json(filtredOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
