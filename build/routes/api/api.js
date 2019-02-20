"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/* Router Imports */
var fields_1 = __importDefault(require("./fields"));
var data_1 = __importDefault(require("./data"));
/* Configuration */
var router = express.Router();
/**
 * FORMAT:
 *  For convention, all JSON returning routes will follow the following return structure.
 *
 *  res.json({
 *      ...any metadata needed.
 *      data: {
 *          ...route specific data. The payload.
 *      }
 *  })
 */
/* Subroutes */
router.use('/fields', fields_1.default);
router.use('/data', data_1.default);
exports.default = router;
