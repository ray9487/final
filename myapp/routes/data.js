const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
// 連接到 MongoDB 資料庫
mongoose.connect('mongodb://localhost:27017/datadb');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection fails!'));
db.once('open', function () {
    console.log('Connected to database...U mother fucker');
});
const dataSchema = new mongoose.Schema({
    myJSON: { //
        type: String,
        required: true,
    },
    date: { //新增的時間
        type: Date,
        default: Date.now,
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
        console.log(req.body.myJSON);
        console.log(typeof(req.body.myJSON));
    const data = new Data({myJSON : req.body.myJSON});
    try {
        const newData = await data.save();
        res.status(201).json(newData);
    } catch (err) {
        
        res.status(400).json({ message: err.message })
    }
});
module.exports = router;