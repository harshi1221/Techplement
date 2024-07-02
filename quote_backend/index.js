// importing the express module to create an express application and creating an instance for the same
const express = require('express');
const app = express();

// importing the cors middleware to handle cross-origin resource sharing
const cors = require('cors');

// importing mongoose to interact with MongoDB DataBase
const mongoose = require('mongoose');

// Destructuring and importing MONGODB_URL from the config file
const { MONGODB_URL } = require('./config');

// Connecting to the MongoDb database
mongoose.connect(MONGODB_URL)
mongoose.connection.on("connected", () => {
    console.log('DataBase connected!');
})
mongoose.connection.on("error", (error) => {
    console.log("Error occured while connecting to database!");
})


// middleware to parse JSON bodies in requests
app.use(cors());
app.use(express.json());

// setting up the models and routes to use it in the application
require('./models/user_model');
require('./models/quote_model')
app.use(require('./routes/user_route'));
app.use(require('./routes/quote_route'));


// starting the server on port 5000
app.listen(5000, () => {
    console.log('Your Server has started!');
})