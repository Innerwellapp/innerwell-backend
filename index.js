const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(express.json());

const YOUR_DOMAIN = 'https://innerwell.app'; // Cambia si estás en desarrollo

app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/premium`,
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log('✅ Stripe server running on port 4242'));
