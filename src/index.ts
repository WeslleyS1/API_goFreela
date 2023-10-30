import express, { Application } from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import router from './routes';

const app = express();
app.use(cors({ credentials: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const server = http.createServer(app);
require('./config/config');
require('./config/config')();

const PORT = process.env.PORT ||'' ;

server.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

app.use('/', router());
