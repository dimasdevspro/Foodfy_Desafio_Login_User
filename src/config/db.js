const { Pool } = require('pg')

module.exports = new Pool({
    user:'dimas',
    password:"Magus@369",
    host: "localhost",
    port: 5432,
    database:"foodfy"
})