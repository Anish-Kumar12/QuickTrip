const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.createUser = async ({ email, password, firstname, lastname }) => {
    if (!email || !password || !firstname || !lastname) {
        throw new Error('All fields are required');
    }

    try {
        // Create a new user document
        const user = await userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashedPassword
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};
