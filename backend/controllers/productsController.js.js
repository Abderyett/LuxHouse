const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

//* @desc Fetch all Products
//* @route GET api/v1/products
//* @access Public

const getPrducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(200).send(products);
});

//* @desc Fetch Single Product
//* @route GET api/v1/products/:id
//* @access Public

const getSingleProducts = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);

  if (!products) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cannot find this product',
    });
  }
  res.status(200).json(products);
});

//* @desc Delete Product
//* @route GET api/v1/products/:id
//! @access Private AdminOnly

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json('Product deleted successfully');
  } else {
    res.status(404).json('Product Not Found');
  }
});

module.exports = { getPrducts, getSingleProducts, deleteProduct };

//* @desc Update Product
//* @route PUT api/v1/products/:id
//! @access AdminOnly

exports.updateProduct = asyncHandler(async (req, res) => {
  //* 1-  We find product by ID attached by token in req
  const product = await Product.findById(req.params.id);
  //* 2- Verify if there is product and update it
  if (product) {
    product.name = req.body.name || product.name;
    product._id = req.body._id || product._id;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.subcategory = req.body.subcategory || product.subcategory;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image[0].url;
    product.shipping = req.body.shipping || product.shipping;
    product.available = req.body.available || product.available;
    //* 3-  Save and send updated product info to the frontend

    const updatedProduct = await product.save();

    res.status(200).json({
      name: updatedProduct.name,
      _id: updatedProduct._id,
      description: updatedProduct.description,
      price: updatedProduct.price,
      subcategory: updatedProduct.subcategory,
      category: updatedProduct.category,
      image: updatedProduct.image,
      shipping: updatedProduct.shipping,
      available: updatedProduct.available,
    });
  } else {
    res.status(404);
    throw new Error('Product Not found');
  }
});
