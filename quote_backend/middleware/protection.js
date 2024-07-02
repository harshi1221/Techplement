const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel');

// middleware function for authenticating jwt tokens
const authenticationToken = (req, res, next) => {
    // getting the token from authorisation header
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'User not logged in' });
    }
    // removed the perfix Bearer from the token
    const Token = token.replace("Bearer ", "");
    jwt.verify(Token, JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: 'User not logged in' });
        }
        // destructuring the payload to get the user id
        const { _id } = payload;
        // finding the user in the database by id
        UserModel.findById(_id)
            .then((dbUser) => {
                // assigning the user to the request
                req.user = dbUser;
                // calling the next middleware function
                next();
            }).catch((err)=>{
                    console.log(err);
            })
    });
}

module.exports = authenticationToken;