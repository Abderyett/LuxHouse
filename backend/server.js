const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();
connectDB();

app.get('/', (req, res) => {
  res.send('Home page');
});
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users/login', userRoutes);

app.use('*', notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
