/* eslint-disable node/no-unsupported-features/es-syntax */

const dotenv = require('dotenv');
const colors = require('colors');
const Order = require('./models/orderModel');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const connectDB = require('./config/db');
const products = require('./data/products.json');
const users = require('./data/user');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const newProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(newProducts);
    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
