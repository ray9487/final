const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
mongoose.connect('mongodb://localhost:27017/datadb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection fails!'));
db.once('open', function () {
    console.log('Connected to database...');
});
const dataSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const Data = mongoose.model('Data', dataSchema);
router.get("/", async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});
router.post("/", async (req, res) => {
    const data = new Data({
        thing: req.body.thing,
        isDone: req.body.isDone,
    });
    try {
        const newData = await data.save();
        res.status(201).json(newData);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});
module.exports = router;