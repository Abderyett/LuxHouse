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

//* @desc Update Product
//* @route PUT api/v1/products/:id
//! @access AdminOnly

const updateProduct = asyncHandler(async (req, res) => {
  //* 1-  We find product by ID attached by token in req
  const product = await Product.findById(req.params.id);
  //* 2- Verify if there is product and update it
  if (product) {
    product.name = req.body.name || product.name;

    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.subcategory = req.body.subcategory || product.subcategory;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image[0].url;
    product.Features = req.body.Features || product.Features;
    product.shipping = req.body.shipping || product.shipping;
    product.available = req.body.available || product.available;
    //* 3-  Save and send updated product info to the frontend

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product Not found');
  }
});

//* @desc Create Product
//* @route PUT api/v1/products
//! @access AdminOnly

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Simple Product',
    description: 'Simple Product',
    user: req.user._id,
    price: 999.99,
    subcategory: 'Sofa',
    category: 'Furniture',
    image: [
      {
        url: 'https://www.warmnordic.com/dw/image/v2/BCCS_PRD/on/demandware.static/-/Sites-warmnordic-master-catalog/default/dw7184d277/images/hi-res/Furniture/Mr_olsen/MMROLSENSOFA/2101021/packshot/2101021-warmnordic-furniture-mrolsen-sofa-walnut-oiled-oak-darkturqouise-1700x1700.jpg?sw=1001&sh=1001&sm=fit',
      },
    ],
    Features: ['Smoked solid oak'],
    available: true,
  });
  const newProduct = await product.save();
  res.status(200).json(newProduct);
});

module.exports = {
  getPrducts,
  getSingleProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
