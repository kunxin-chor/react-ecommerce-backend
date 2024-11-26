const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productsRouter = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');

const app = express();

// Middleware
app.use(cors());
// app.use(express.json()); <-- can't use it with stripe

// Routes
app.use('/api/products', express.json(), productsRouter);
app.use('/api/users', express.json(), userRoutes);
app.use('/api/cart', express.json(), cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our e-commerce API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});