"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
/* Route Imports */
var api_1 = require("./routes/api/api");
var db_1 = require("./database/db");
/* Application Configuration */
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
/* Routing */
// Before handling any queries, make sure the database is up.
app.use(function (req, res, next) {
    console.dir('yo');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (db_1.isDBActive()) {
        next();
    }
    else {
        res.sendStatus(500);
    }
});
app.use('/api', api_1.default);
module.exports = app;
