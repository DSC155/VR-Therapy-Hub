const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gad7Scores: {
    type: Map,
    of: Number
  },
  phobiaRatings: {
    type: Map,
    of: Map
  },
  pcl5Scores: {
    type: Map,
    of: Number
  },
  biometrics: {
    heartRate: Number,
    bloodPressure: String,
    stressLevel: String,
    timestamp: Date
  },
  gad7Total: Number,
  pcl5Total: Number,
  significantPhobias: Array,
  recommendations: Object,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', ResultSchema);
