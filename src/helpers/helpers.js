const { db } = require("../config/mysql")

// error msg func
exports.error =(msg = "") => `<h2 style='color:red'>${msg}</h2>`


// json resp
exports.respJson =(status = 0, message = "",httpResp) => {
    httpResp
        .status(status)
        .json({ message })
}

//async query 
exports.sqlQuery=(sql,insertedData=null) => new Promise((resolve, reject) => {

    //in case of insert query
    if(insertedData)
    db.query(sql,insertedData,(err, res) => {
        if (err) reject(err)
        else { resolve(res) }
    })
    else
    db.query(sql,(err, res) => {
        if (err) reject(err)
        else { resolve(res) }
    })
})