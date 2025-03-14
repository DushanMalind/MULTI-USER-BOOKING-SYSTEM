const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    availableSlots: { type: [Date], required: true }
},{timestamps: true});

module.exports = mongoose.model('Service', ServiceSchema);
