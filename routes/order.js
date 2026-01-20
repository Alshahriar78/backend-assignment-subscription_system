const express = require('express');
const { createOrder, stripeWebhook } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createOrder);
router.post('/webhook',  stripeWebhook);

module.exports = router;
