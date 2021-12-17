const express = require("express")
const { addTodo } = require("./api/todo")
const { register, login } = require("./api/user")
const { API_URL } = require("./config/api")
const { db } = require("./config/mysql")



//Connect
db.connect((err) => {
    if (err) throw err
    console.log("Mysql connected...")
})

const app = express()

app.listen('9000', () => {
    console.log('Server started on port 9000 😇');
})

//user api
app.get(`/${API_URL.user}/register`, register)
app.get(`/${API_URL.user}/login`, login)

//todo api
app.get(`/${API_URL.user}/:userId/${API_URL.todo}/add`, addTodo)

//security
app.get(`/${API_URL.auth}/:userEmail/code/:token`, (req, resp) => {

    //flag isVerified field as true 
    db.query(` 
                UPDATE USERS SET isVerified=1 , email_token=''
                WHERE username=${req.params.userEmail}
            `, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ)
            resp.send("<h1>Thank you for registering & verifying your email 😇 !!")
        }
    })

})