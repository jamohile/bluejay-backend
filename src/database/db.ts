import * as mysql from 'mysql';

export const TABLE = 'census_learn_sql';

// Whether we have connected to the database successfully.
let dbActive:boolean = false;
export const isDBActive = () => dbActive;


const db: mysql.Connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB
})

db.connect((err: mysql.MysqlError) => {
    if (err) {
        console.dir('Server could not connect to database.')
    }else{
        console.dir('Connected to DB');
        dbActive = true;
    }
})

export default db;