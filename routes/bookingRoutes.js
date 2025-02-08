const express = require('express');
const { createBooking, getUserBookings, cancelBooking } = require('../controller/bookingController');
const  authenticate  = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/bookings', authenticate, createBooking);


module.exports = router;
