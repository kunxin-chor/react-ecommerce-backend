const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productsRouter = require('./routes/products');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our e-commerce API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});