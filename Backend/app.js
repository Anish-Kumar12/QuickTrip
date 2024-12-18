const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const cors = require('cors')
const app = express();
const connectDB = require('./db/db');
const userRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRouter = require('./routes/captain.routes');
const mapRouter = require('./routes/maps.routes');

connectDB()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user', userRouter); 
app.use('/captain', captainRouter);
app.use('/maps', mapRouter);



module.exports = app;