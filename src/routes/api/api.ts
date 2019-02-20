import express = require('express');

/* Router Imports */
import fieldsRouter from './fields';
import dataRouter from './data';

/* Configuration */
const router: express.Router = express.Router();

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
router.use('/fields', fieldsRouter);
router.use('/data', dataRouter);

export default router;




