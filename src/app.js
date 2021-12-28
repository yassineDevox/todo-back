const express = require("express")
const { API_URL } = require("./config/api")
const { db } = require("./config/mysql")
const cors = require("cors")
const bp = require("body-parser")
const { verifyEmail,register } = require("./api/auth")


//Connect
db.connect((err) => {
    if (err) throw err
    console.log("Mysql connected...")
})

const app = express()

//body could have diff types 
app.use(bp.urlencoded({extended:true}))
//looks at requests where the Content-Type: application/json (Header)
app.use(bp.json())
//appliquer le cors comme middle ware 
app.use(cors())


app.listen('9000', () => {
    console.log('Server started on port 9000 😇');
})

//user api register
app.post(`/${API_URL.auth}/register`, register)
//verify email after register
app.post(`/${API_URL.auth}/verify-email`, verifyEmail)
//login
app.post(`/${API_URL.auth}/login`,login)
