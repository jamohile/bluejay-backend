"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = __importStar(require("../../database/db"));
/* Configuration */
var router = express.Router();
/** GET an array of all fields that can be filtered on */
router.get('/', function (req, res, next) {
    // We inline this because it's simple enough.
    db_1.default.query("SHOW COLUMNS FROM " + db_1.TABLE, function (err, results) {
        if (err) {
            res.sendStatus(500);
            return false;
        }
        // Take the fields we got, and just return the names.
        var fieldNames = results.map(function (r) { return r.Field; });
        res.json({
            data: {
                num: fieldNames.length,
                fields: fieldNames
            }
        });
    });
});
exports.default = router;
