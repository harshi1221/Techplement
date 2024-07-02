// importing mongoose to define the schema and model for mongodb
const mongoose = require('mongoose');

// defining a schema for the user collection in mongodb
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// exporting the model created from the schema
module.exports = mongoose.model('UserModel', userSchema)