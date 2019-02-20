import express = require('express');
import {raw, format} from "mysql";
import db, {TABLE} from '../../database/db';

const router: express.Router = express.Router();

/**
 * GET data for a particular field through query.
 * query on property 'field' with a field, of those returned by /api/fields.
 * */
router.get('/', (req, res, next) => {
    // The field being requested.
    const field: string = req.query.field;
    // If the request is malformed, the field will not be defined. Stop because our next steps depend on field.
    if (!field) {
        res.sendStatus(400);
        return false;
    }

    /** When selecting a column name we need an unescaped version of the column name.
     * To be fair this is a risk, decided it was acceptable for now.
     * Alternative would be to load *all* columns, and filter server-side...if it was really needed that could be done.
     */

    const column: () => string = raw(field);

    //Format the string seperately to preserve the raw column.
    const sql: string = format(`
    SELECT
      \`?\` as value,
      count(\`${field}\`) as count,
      avg(age) as 'age'
    FROM 
      ${TABLE}
    GROUP BY 
      \`${field}\`
    ORDER BY count DESC
  `, [column])


    db.query(sql, (err: undefined | any, results: {}[]) => {
        if (err) {
            // Let's just assume its a server fault for now. TODO: More specificity.
            res.sendStatus(500);
            return false;
        }
        let filteredResults = [...results];
        let excessRows = 0;

        if(filteredResults.length > 100){
            filteredResults = filteredResults.slice(0, 100);
            excessRows = results.length - filteredResults.length;
        }

        // Return data in standard format.
        res.json({
            data: {
                field: field,
                rows: filteredResults,
                excessRows: excessRows
            }
        })
    })
});

export default router;




