const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const BlacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        const isBlacklisted = await BlacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized access", error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authUser:', error);
        res.status(401).json({ message: "Unauthorized access" });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log('Received token (authCaptain):', token); // Log the token for debugging

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    try {
        const isBlacklisted = await BlacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized access', error: 'Captain not found' });
        }

        req.captain = captain;
        next();
    } catch (error) {
        console.error('Error in authCaptain:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
