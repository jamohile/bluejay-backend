"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql_1 = require("mysql");
var db_1 = require("../../database/db");
var router = express.Router();
/**
 * GET data for a particular field through query.
 * query on property 'field' with a field, of those returned by /api/fields.
 * */
router.get('/', function (req, res, next) {
    // The field being requested.
    var field = req.query.field;
    // If the request is malformed, the field will not be defined. Stop because our next steps depend on field.
    if (!field) {
        res.sendStatus(400);
        return false;
    }
    /** When selecting a column name we need an unescaped version of the column name.
     * To be fair this is a risk, decided it was acceptable for now.
     * Alternative would be to load *all* columns, and filter server-side...if it was really needed that could be done.
     */
    var column = mysql_1.raw(field);
    //Format the string seperately to preserve the raw column.
    var sql = mysql_1.format("\n    SELECT\n      `?` as value,\n      count(`" + field + "`) as count,\n      avg(age) as 'age'\n    FROM \n      " + db_1.TABLE + "\n    GROUP BY \n      `" + field + "`\n    ORDER BY count DESC\n  ", [column]);
    db_1.default.query(sql, function (err, results) {
        if (err) {
            // Let's just assume its a server fault for now. TODO: More specificity.
            res.sendStatus(500);
            return false;
        }
        var filteredResults = results.slice();
        var excessRows = 0;
        if (filteredResults.length > 100) {
            console.dir(filteredResults.length);
            filteredResults = filteredResults.slice(0, 99);
            console.dir(results.length);
            console.dir(filteredResults.length);
            excessRows = results.length - filteredResults.length;
        }
        // Return data in standard format.
        res.json({
            data: {
                field: field,
                rows: filteredResults,
                excessRows: excessRows
            }
        });
    });
});
exports.default = router;
