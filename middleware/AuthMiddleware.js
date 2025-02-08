const jwt = require('jsonwebtoken');
const UserModal = require('../models/User');

const secret = 'test';

const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. No token provided.' });
        }

        const decodedData = jwt.verify(token, secret);
        const user = await UserModal.findById(decodedData.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user; // Attach the authenticated user to the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized.', error: error.message });
    }
};

module.exports = AuthMiddleware;
