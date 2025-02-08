const express = require('express');
const { getServices, createService , updateService, deleteService } = require('../controller/serviceController');
const  authMiddleware  = require('../middleware/AuthMiddleware');
const router = express.Router();

// Public routes
router.get('/services', getServices);

// Admin-only Routes
router.post('/services', authMiddleware, createService);
router.put('/services/:id', authMiddleware, updateService);
router.delete('/services/:id', authMiddleware, deleteService);

module.exports = router;
