"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
/* Route Imports */
var api_1 = __importDefault(require("./routes/api/api"));
var db_1 = require("./database/db");
/* Application Configuration */
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(cors_1.default());
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
