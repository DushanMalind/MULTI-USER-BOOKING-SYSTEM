const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    slot: { type: Date, required: true }
},{timestamps: true});

module.exports = mongoose.model('Booking', BookingSchema);
