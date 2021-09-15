const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  getPrducts,
  getSingleProducts,
  deleteProduct,
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

router
  .route('/:id')
  .get(getSingleProducts)
  .delete(protect, isAdmin, deleteProduct);

module.exports = router;
