const express = require('express');
const fs = require('fs');

const app = express();

let products = null;
const readData = async () => {
  await fs.readFile(`${__dirname}/data/products.json`, 'utf-8', (err, data) => {
    products = JSON.parse(data);
  });
};
readData();

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/api/v1/products', (req, res) => {
  res.send(products);
});

app.get('/api/v1/products/:id', (req, res) => {
  const product = products.find((el) => el.id === req.params.id);

  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cannot find this product',
    });
  }
  res.status(200).json({
    status: 'success',
    product,
  });
});

app.listen(5000, console.log('Server runing on port 5000'));
