const Stripe = require('stripe');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY); // Executes immediately
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 
  const createPaymentIntent = async (req, res) => {
    try {
      const { amount, currency = 'usd' } = req.body;
      if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        payment_method_types: ['card'],
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ error: 'Payment processing failed', details: err.message });
    }
  };

  module.exports = { createPaymentIntent };