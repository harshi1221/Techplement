const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const QuoteModel = mongoose.model('QuoteModel');

// importing middleware from other file to handle authentications
const protectedRoute = require('../middleware/protection.js')


// route for adding a new quote
router.post('/addquote', protectedRoute, async (req, res) => {
    const { content, author } = req.body;

    try {
        //Making sure if the quote already exists in the database that user wants to add
        const QuoteExists = await QuoteModel.findOne({content,author})
        if(QuoteExists){
            return res.status(400).json({error:'Quote already exists. Try Other Quote'})
        }
        // creating a new quote instance and saving it to the database
        const newQuote = new QuoteModel({ content, author });
        const savedQuote = await newQuote.save();
        console.log('savedQuote', savedQuote);
        res.json(savedQuote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save quote' });
    }
})


// route for getting a random quote
router.get('/randomquote', protectedRoute, async (req, res) => {
    try {
        // fetching a random quote using Math.random() from all quotes present in the database.
        const quotes = await QuoteModel.find();
        const randomQuote = Math.floor(Math.random() * quotes.length);
        // sending the random quote as the response
        res.json(quotes[randomQuote]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
})

// route for fetching the quotes by specific author
router.get('/quote/:author', protectedRoute, async (req, res) => {
    const { author } = req.params;
    try {
        // finding quotes by author name 
        const quotes = await QuoteModel.find({ author });
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quotes by author' });
    }
})

module.exports = router;