const { db } = require("../config/mysql")

// error msg func
exports.error = (msg = "") => `<h2 style='color:red'>${msg}</h2>`


// json resp
exports.respJson = (status = 0, message = "", httpResp) => {
    httpResp
        .status(status)
        .json({ message })
}

//async query 
exports.sqlQuery = (sql, insertedData = null) => new Promise((resolve, reject) => {

    //in case of insert query
    if (insertedData)
        db.query(sql, insertedData, (err, res) => {
            if (err) reject(err)
            else { resolve(res) }
        })
    else
        db.query(sql, (err, res) => {
            if (err) reject(err)
            else { resolve(res) }
        })
})

exports.validate = {
    email: (e) => {
        //email
        let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

        if (!emailPattern.test(data.email))
            return "email Should be valid 😅"
        return ""

    },
    password: (p) => {
        let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
        if (!passwordPattern.test(data.password))
            return "Invalid Password 😅"
        return ""

    },
    minMax: (min, max, field) => {
        let pattern = `/^.{${min},${max}}$/`
        if (!pattern.test(field)) {
            return field.toUpperCase()+" Should be at least 4 characters & maximum 12 😅"

        }
    }
}