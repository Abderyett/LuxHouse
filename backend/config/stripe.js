const srtipeAPI = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = srtipeAPI;
