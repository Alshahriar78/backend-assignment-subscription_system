const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

/**
 * STRIPE WEBHOOK (RAW BODY)
 */
app.use(
  '/api/v1/orders/webhook',
  express.raw({ type: 'application/json' })
);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/products', require('./routes/product'));
app.use('/api/v1/orders', require('./routes/order'));

// 404 handler
app.use(notFound);

// General error handler
app.use(errorHandler);


// Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
