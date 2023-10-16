import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import router from './routes/index';
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

const app = express();
app.use(cors({credentials: true,}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const server = http.createServer(app);
require('./config/config')
require('./config/config')();

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

app.use('/', router());