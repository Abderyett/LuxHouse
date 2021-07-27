const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const router = express.Router();

//* @desc Fetch all Products
//* @route GET api/v1/products
//* @access Public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).send(products);
  })
);

//* @desc Fetch Single Product
//* @route GET api/v1/products/:id
//* @access Public

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id);

    if (!products) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cannot find this product',
      });
    }
    res.status(200).json({
      status: 'success',
      products,
    });
  })
);

module.exports = router;
