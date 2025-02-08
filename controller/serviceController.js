const Service = require('../models/Service');

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createService = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
        console.log(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
