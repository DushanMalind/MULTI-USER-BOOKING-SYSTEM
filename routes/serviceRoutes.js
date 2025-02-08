const express = require('express');
const { getServices, createService } = require('../controller/serviceController');
const  authMiddleware  = require('../middleware/AuthMiddleware');
const router = express.Router();

// Public routes
router.get('/services', getServices);

// Admin-only Routes
router.post('/services', authMiddleware, createService);

module.exports = router;
