const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'User must have name'],
    },
    price: {
      type: Number,
      required: [true, 'User must have price'],
    },
    image: {
      type: String,
      required: [true, 'User must have password'],
    },
    images: {
      type: Array,
    },

    description: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
    },
    Features: {
      type: Array,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    stars: {
      type: Number,
      default: 0,
    },
    subcategory: {
      type: String,
      required: true,
    },
    shipping: {
      type: Boolean,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
