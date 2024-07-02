const express = require('express');
// creating an instance for express router
const router = express.Router();

const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel');

// importing bcryptjs for hashing and comparing passwords
const bcryptjs = require('bcryptjs');

// jsonwebtoken for creating and verifying jwt tokens
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')


// route for user signup
router.post('/signup', async (req, res) => {
    // destructuring the request body to get relevant fields
    const { name, email, userName, password } = req.body;
    if (!name || !email || !userName || !password) {
        return res.status(400).json({ error: 'one or more mandatory fields are empty' })
    }

    try {
        // checking if a user with the same email or username already exists in the database
        const userInDB = await UserModel.findOne({ $or: [{ email: email }, { userName: userName }] })

        if (userInDB) {
            console.log('signup request', req.body);
            return res.status(409).json({ error: 'User with this email or username has already registered' })
        }
        // hashing the user's password, and creating new user instance with hashed password
        const hashedPassword = await bcryptjs.hash(password, 16)
        const user = new UserModel({ name, email, userName, password: hashedPassword });
        const newUser = await user.save();
        res.status(200).json({ result: 'User has successfully registered' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// route for user login
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ error: 'One or more mandatory fields are empty' })
    }

    try {
        // checking if a user with the given username exists in the database
        const userInDB = await UserModel.findOne({ userName: userName })
        if (!userInDB) {
            return res.status(401).json({ error: 'User not found' })
        }
        // comparing the provided password with hashed password in the database
        const didMatch = await bcryptjs.compare(password, userInDB.password)

        if (didMatch) {
            // created a jwt token with user's id and stored the user information to send in the response
            const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
            const userInfo = { "_id": userInDB._id, "email": userInDB.email, "Name": userInDB.name }
            res.status(200).json({ result: { token: jwtToken, user: userInfo } })
        }else{
            return res.status(401).json({error:'Invalid Credentials'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

})

// exported the router to be used in the application
module.exports = router;










