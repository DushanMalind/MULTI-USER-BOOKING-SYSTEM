const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    slots: [{ type: Date }]
},{timestamps: true});

module.exports = mongoose.model('Service', ServiceSchema);
