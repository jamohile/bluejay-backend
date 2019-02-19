"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/* Router Imports */
var fields_1 = require("./fields");
var data_1 = require("./data");
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
