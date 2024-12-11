const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req ,res ,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message : "Token not found"})
    }
    const isBlacklisted = await BlacklistTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message : "Unauthorized access" , error : "User not found"})
        }
        req.user = user;

        return next();
    }
    catch(error){
        return res.status(401).json({message : "Unauthorized access"})
    }
}