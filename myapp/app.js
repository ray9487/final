// 引入套件
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const express = require('express');
const app = express();

app.use(cookieParser());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 引入Router (routes目錄底下的data.js)
const dataRouter = require("./routes/data");
// 此處的/data代表連線到該Router的基本路徑為 http://localhost:3000/data
app.use("/data", dataRouter);

module.exports = app;