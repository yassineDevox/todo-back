const mysql = require("mysql")

//create the connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todos-db'
})


exports.db = db