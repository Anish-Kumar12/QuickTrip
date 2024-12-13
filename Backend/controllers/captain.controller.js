const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const BlacklistTokenModel = require("../models/blacklistToken.model");
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (error) {
        console.error('Error registering captain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({ token, captain });
    } catch (error) {
        console.error('Error logging in captain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        res.status(200).json({ captain: req.captain });
    } catch (error) {
        console.error('Error fetching captain profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await BlacklistTokenModel.create({ token });
        res.clearCookie('token');

        res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        console.error('Error logging out captain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
