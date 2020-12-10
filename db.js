// Config Database //
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "password051455",
    host: "localhost",
    port: "5432",
    database: "express_js"
});

module.exports = pool;