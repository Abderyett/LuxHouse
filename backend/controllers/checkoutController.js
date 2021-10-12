/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const stripeAPI = require('../config/stripe');

exports.createCheckoutSession = asyncHandler(async (req, res) => {
  const domainUrl = process.env.WEB_APP_URL;

  const { line_items, customer_email } = req.body;

  if (!line_items || !customer_email) {
    res.status(404).json({ error: 'Missing required session parameters' });
  }

  const session = await stripeAPI.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    automatic_tax: {
      enabled: true,
    },

    line_items,
    customer_email,
    success_url: `${domainUrl}/success/?session?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainUrl}/canceled`,
  });
  res.status(200).json({ sessionId: session.id });
});
