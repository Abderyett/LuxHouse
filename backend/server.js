const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productsRoutes = require('./routes/productsRoutes');
const countriesRouter = require('./routes/countriesRouter');
const orderRoute = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
require('./utils/init-redis');

dotenv.config();
const app = express();
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home page');
});
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/countries', countriesRouter);
app.use('api/v1/orders', orderRoute);

app.use('*', notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
