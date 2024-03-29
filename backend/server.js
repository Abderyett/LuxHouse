const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productsRoutes = require('./routes/productsRoutes');
const countriesRouter = require('./routes/countriesRouter');
const orderRoute = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
// const checkoutRoute = require('./routes/checkoutRoute');
const uploadRoutes = require('./routes/uploadRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

app.use(morgan('dev'));

connectDB();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: true }));

// app.get('/api/config/paypal', (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/countries', countriesRouter);
app.use('/api/v1/orders', orderRoute);
// app.use('/create-checkout-session', checkoutRoute);
app.use('/api/v1/upload', uploadRoutes);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(path.resolve(), '/frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(path.resolve(), 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);
