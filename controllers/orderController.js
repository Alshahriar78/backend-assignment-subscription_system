const Order = require('../models/Order');
const Product = require('../models/Product');
const stripe = require('../utils/stripe');

const createOrder = async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if(!product) return res.status(404).json({ message: 'Product not found' });

  const order = await Order.create({
    user: req.user._id,
    product: product._id,
    amount: product.price , 
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.amount * 100),
    currency: 'bdt',
    metadata: { orderId: order._id.toString() },
  });

  order.paymentIntentId = paymentIntent.id;
  await order.save();

  res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
};

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;

      if (!orderId) {
        console.log(' No orderId found in metadata');
        return res.json({ received: true });
      }

      const order = await Order.findById(orderId);

      if (!order) {
        console.log(' Order not found:', orderId);
        return res.json({ received: true });
      }

      order.status = 'paid';
      await order.save();

      console.log('Order marked as PAID:', orderId);
    }

    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;

      if (!orderId) return res.json({ received: true });

      const order = await Order.findById(orderId);
      if (!order) return res.json({ received: true });

      order.status = 'failed';
      await order.save();

      console.log(' Order marked as FAILED:', orderId);
    }

    res.json({ received: true });
  } catch (error) {
    console.error(' Webhook processing error:', error);
    res.status(500).json({ message: 'Webhook handler failed' });
  }
};


module.exports = { createOrder, stripeWebhook };
