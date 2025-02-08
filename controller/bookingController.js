const Booking = require("../models/Booking");
const Service = require("../models/Service");

exports.createBooking = async (req, res) => {
    try {
        const { serviceId, slot } = req.body;

        // Check if the slot is already booked
        const existingBooking = await Booking.findOne({ service: serviceId, slot });
        if (existingBooking) {
            return res.status(400).json({ message: "Slot already booked" });
        }

        const booking = new Booking({ user: req.user._id, service: serviceId, slot });
        await booking.save();

        // Emit real-time update to clients
        global.io.emit("bookingUpdate", { message: "New booking made", serviceId, slot });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate("service");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        await booking.deleteOne();

        // Emit update when a booking is canceled
        global.io.emit("bookingUpdate", { message: "Booking canceled", serviceId: booking.service, slot: booking.slot });

        res.json({ message: "Booking canceled" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
