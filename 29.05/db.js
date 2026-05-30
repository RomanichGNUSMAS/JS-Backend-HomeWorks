const { Client, Pool } = require('pg');
require('dotenv').config({ quiet: true });

const { HOST, USER, PASSWORD, DATABASE, DEFAULT_DATABASE, DB_PORT } = process.env;
exports.start = async function start() {
    const cl = new Client({
        port: DB_PORT,
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DATABASE,
    })


    try {
        await cl.connect();
        await cl.end();
    } catch (err) {
        const adminBase = new Client({
            port: DB_PORT,
            host: HOST,
            user: USER,
            password: PASSWORD,
            database: DEFAULT_DATABASE,
        });
        try {
            console.log(DATABASE, ' not exists trying to create...');
            await adminBase.connect();

            await adminBase.query('CREATE DATABASE $1;', [DATABASE]);
            console.log('created successfully');
        } catch (err) {
            console.log(err.message);
        } finally {
            await adminBase.end();
        }
    }
}

exports.pool = new Pool({
    port: DB_PORT,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})

