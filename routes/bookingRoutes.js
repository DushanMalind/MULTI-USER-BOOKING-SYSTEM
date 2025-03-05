const express = require('express');
const { createBooking, getUserBookings, cancelBooking, availableSlots } = require('../controller/bookingController');
const  authenticate  = require('../middleware/authMiddleware');
const authMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();

router.post('/bookings', authenticate, createBooking);
router.get('/bookings/user', authenticate, getUserBookings);
router.delete('/bookings/:id', authenticate, cancelBooking);
router.get('/services/:serviceId/slots', authenticate, availableSlots);

module.exports = router;
