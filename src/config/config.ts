import express, { Router } from 'express';
import Logging from '../library/Logging';

const mongoose = require('mongoose');
mongoose.Promise = Promise;
require('dotenv').config();

module.exports = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            Logging.info('Connected to MongoDB');
        })
        .catch((err: { message: any }) =>
            Logging.error('Unable to connect to MongoDB: ' + err.message)
        );
};
