const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: false },
        subcategory: { type: String, required: false },
        quantity: { type: Number, required: false },
        image: { type: Array, required: false },
        price: { type: Number, required: false },
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: 'Product',
        },
      },
    ],

    shippingAdress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    shippingMethod: {
      shippingPackage: { type: String, required: true },
      price: { type: Number, required: true, default: 0.0 },
      deliveryDate: { type: String, required: true },
    },
    paymentMethod: {
      type: 'String',
      required: true,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_Time: { type: String },
      email_adress: { type: String },
    },
    taxPrice: { type: Number, required: true, default: 0.0 },

    totalPrice: { type: Number, required: true, default: 0.0 },

    isPaid: { type: Boolean, required: true, default: false },

    paidAt: { type: Date },

    isDelivered: { type: Boolean, required: true, default: false },

    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
