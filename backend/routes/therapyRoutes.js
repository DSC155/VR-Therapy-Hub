const express = require('express');
const router = express.Router();

// GET /api/therapy/claustrophobia
router.get('/claustrophobia', (req, res) => {
  res.json({
    name: "Claustrophobia Therapy",
    levels: ["Elevator Simulation", "Narrow Tunnel Walk", "Locked Room Experience"],
    description: "Gradual exposure to confined spaces like elevators and tunnels"
  });
});

// GET /api/therapy/darkness
router.get('/darkness', (req, res) => {
  res.json({
    name: "Darkness Therapy",
    levels: ["Dim Light Room", "Night Walk Simulation", "Complete Darkness Challenge"],
    description: "Overcome fear of darkness through gradual exposure"
  });
});

module.exports = router;
