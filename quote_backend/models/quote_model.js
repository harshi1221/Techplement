// importing mongoose to define the schema and model for mongodb
const mongoose = require('mongoose');

// defining a schema for the quote collection in mongodb
const quoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

// exporting the model created from the schema
module.exports = mongoose.model('QuoteModel', quoteSchema)