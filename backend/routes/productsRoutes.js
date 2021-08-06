const express = require('express');

const {
  getPrducts,
  getSingleProducts,
} = require('../controllers/productsController.js');

const router = express.Router();

//* @desc Fetch all Products
//* @route GET api/v1/products
//* @access Public

router.route('/').get(getPrducts);

// @desc Fetch Single Category
//@route GET api/v1/products/categories
// @access Public

// router.get(
//   '/category',
//   asyncHandler(async (req, res) => {
//     const products = await Product.find().distinct('subcategory');
//     res.status(200).send(products);
//   })
// );

//* @desc Fetch Single Product
//* @route GET api/v1/products/:id
//* @access Public

router.get('/:id', getSingleProducts);

module.exports = router;
