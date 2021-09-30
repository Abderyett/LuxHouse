const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
  url: {
    type: String,
  },
});

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Product must have name'],
    },
    image: {
      type: [imgSchema],
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Product must have price'],
    },
    images: [imgSchema],

    description: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      required: [true, 'Product must have name'],
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
      default: false,
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
