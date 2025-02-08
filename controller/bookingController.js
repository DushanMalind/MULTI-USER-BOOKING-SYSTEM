const Booking = require('../models/Booking');
const Service = require('../models/Service');

exports.createBooking = async (req, res) => {
    try {
        const { serviceId, slot } = req.body;
        const userId = req.user.id;

        // Check if the service exists
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // Validate slot availability
        const slotDate = new Date(slot);
        if (!service.availableSlots.includes(slotDate.toISOString())) {
            return res.status(400).json({ message: "Selected slot is not available" });
        }

        // Check if the slot is already booked
        const existingBooking = await Booking.findOne({ serviceId, slot });
        if (existingBooking) {
            return res.status(400).json({ message: "This slot is already booked" });
        }

        // Create new booking
        const booking = new Booking({
            userId,
            serviceId,
            slot
        });
        await booking.save();

        // Emit real-time update using WebSockets
        req.io.emit('bookingUpdate', { message: "New booking added", booking });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


