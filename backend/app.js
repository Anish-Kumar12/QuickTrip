const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express();

app.use(cors())

module.exports = app;
