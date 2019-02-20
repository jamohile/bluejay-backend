import express = require('express');
import {MysqlError} from "mysql";

import db, {TABLE} from '../../database/db';

/* Configuration */
const router: express.Router = express.Router();

/** GET an array of all fields that can be filtered on */
router.get('/', (req, res, next) => {
    // We inline this because it's simple enough.
    db.query(`SHOW COLUMNS FROM ${TABLE}`,
        (err: MysqlError, results: [{Field}]) => {
            if (err) {
                res.sendStatus(500);
                return false;
            }

            // Take the fields we got, and just return the names.
            const fieldNames = results.map(r => r.Field);
            res.json({
                data: {
                    num: fieldNames.length,
                    fields: fieldNames
                }
            })
        })
});

export default router;




