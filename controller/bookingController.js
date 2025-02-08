const Booking = require('../models/Booking');
const Service = require('../models/Service');

exports.createBooking = async (req, res) => {
    try {
        const { serviceId, slot } = req.body;
        const booking = new Booking({ user: req.user.id, service: serviceId, slot });
        await booking.save();
        req.io.emit('bookingUpdate', { message: "New booking added" });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


