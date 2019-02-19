"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
exports.TABLE = 'census_learn_sql';
// Whether we have connected to the database successfully.
var dbActive = false;
exports.isDBActive = function () { return dbActive; };
var db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB
});
db.connect(function (err) {
    if (err) {
        console.dir('Server could not connect to database.');
    }
    else {
        console.dir('Connected to DB');
        dbActive = true;
    }
});
exports.default = db;
