const userModel = require('../models/user.model');

module.exports.createUser = async ({ email, password, firstname , lastname }) => {
    if(!email || !password || !firstname || !lastname){
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname : {
            firstname,
            lastname
        },
        email,
        password
    });
    return user;

}

