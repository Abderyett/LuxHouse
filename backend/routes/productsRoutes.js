const express = require('express');

const {
  getPrducts,
  getSingleProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} = require('../controllers/productsController.js');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

//* @desc Fetch all Products
//* @route GET api/v1/products
//* @access Public

router.route('/').get(getPrducts).post(protect, isAdmin, createProduct);

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
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

module.exports = router;
