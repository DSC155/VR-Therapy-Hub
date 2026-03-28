const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const resultRoutes = require('./routes/results');
const therapyRoutes = require('./routes/therapyRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/therapy', therapyRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'server is running' });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
