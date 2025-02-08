const express = require('express');
const { getServices } = require('../controller/serviceController');
const { authenticate } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.get('/services', authenticate, getServices);

module.exports = router;
