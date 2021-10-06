const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productsRoutes = require('./routes/productsRoutes');
const countriesRouter = require('./routes/countriesRouter');
const orderRoute = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const checkoutRoute = require('./routes/checkoutRoute');
const uploadRoutes = require('./routes/uploadRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
require('./utils/init-redis');

dotenv.config();
const app = express();

app.use(morgan('dev'));

connectDB();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  res.send('Home page');
});
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/countries', countriesRouter);
app.use('/api/v1/orders', orderRoute);
app.use('/create-checkout-session', checkoutRoute);
app.use('/api/v1/upload', uploadRoutes);

app.use('*', notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
