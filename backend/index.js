// backend/index.js

const express = require('express');
// const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/flashcards', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;

// Get all flashcards
app.get('/api/flashcards', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.send(flashcards);
    } catch (error) {
        res.status(500).send('Something went wrong.');
    }
});


// Add a new flashcard
app.post('/api/flashcards', async (req, res) => {
    const { question, answer } = req.body;

    let flashcard = new Flashcard({
        question,
        answer,
    });

    try {
        flashcard = await flashcard.save();
        res.send(flashcard);
    } catch (error) {
        res.status(500).send('Something went wrong.');
    }
});


// Update a flashcard
app.put('/api/flashcards/:id', async (req, res) => {
    const { question, answer } = req.body;

    try {
        const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, { question, answer }, { new: true });
        if (!flashcard) return res.status(404).send('Flashcard not found.');
        res.send(flashcard);
    } catch (error) {
        res.status(500).send('Something went wrong.');
    }
});


// Delete a flashcard
app.delete('/api/flashcards/:id', async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndRemove(req.params.id);
        if (!flashcard) return res.status(404).send('Flashcard not found.');
        res.send(flashcard);
    } catch (error) {
        res.status(500).send('Something went wrong.');
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
