const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

// Post assessment results
router.post('/', auth, async (req, res) => {
  const resultsData = req.body;
  try {
    const result = new Result({
      userId: req.userId,
      ...resultsData
    });
    await result.save();
    res.status(201).json({ message: 'Result saved successfully', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user results
router.get('/', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
module.exports.auth = auth;
