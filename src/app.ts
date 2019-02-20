import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

/* Route Imports */
import apiRouter from './routes/api/api';
import {isDBActive} from "./database/db";

/* Application Configuration */
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

/* Routing */

// Before handling any queries, make sure the database is up.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (isDBActive()) {
        next();
    } else {
        res.sendStatus(500);
    }
})

app.use('/api', apiRouter);



module.exports = app;