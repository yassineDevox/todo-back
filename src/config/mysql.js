const mysql = require("mysql")

//create the connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoDB'
})


exports.db = db