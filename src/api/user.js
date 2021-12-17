const { db } = require("../config/mysql");
const randomString = require('randomstring');

const { validateRegisterData } = require("../helpers/register-valid");
const { Credentials } = require("../models/credential");
const { UserModel } = require("../models/user");
const { transport } = require("../config/mailer");

//register user
exports.register = (req, resp) => {

    //fetch data from req
    let newUser = new UserModel(
        "Yassine",
        "Trafargaro",
        "http://assets.stickpng.com/images/58582c01f034562c582205ff.png",
        "yassine.rassy1@gmail.com",
        "Pass1234"
    )
    
    //validate data
    if( validateRegisterData(newUser,req,resp) )    
    //verify if the username already exist 
    db.query(
            `
                SELECT * FROM USERS 
                WHERE username ='${newUser.username}'    
        `, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ);
            if (resQ.length > 0) {
                resp.send("<h1 style='color:red'> Username Already exist 😅 !!</h1>")
            } else {
                //Insert sql query
                let query = `INSERT INTO USERS SET ?`

                //generate the secret token & set verified to false (in default)
                newUser.setEmailToken(randomString.generate())

                //send mail to newUser's email account 
                //mail options
                const mailOptions = {
                    from:"todoApp@GMC.com",
                    to:newUser.username,
                    subject:"Please Verify your email Account",
                    html:`<a href="http://localhost:9000/api/auth/${newUser.username}/code/${newUser.email_token}">Verify My Email</a>`
                }
                transport.sendMail(mailOptions,(err,info)=>{
                    if(err) throw err 
                    else {
                        console.log(info)
                    }
                })


                //work with db 
                db.query(query, newUser, (err, resQ) => {
                    if (err) throw err
                    else {
                        console.log(resQ)
                        resp.send("Hello and Welcome " + newUser.firstname + " 😄 !!")
                    }
                })
            }
        }
    })




}
exports.login = (req,resp)=>{

    let credentials = new Credentials(
        "yassine.rassy1@gmail.com",
        "Pass1234"
    )

    //search user by username and password 
    let query = `
        SELECT * 
        FROM USERS
        WHERE username='${credentials.username}'
        AND password='${credentials.password}'
    `
    //apply query
    db.query(query,(err,resQ)=>{
        if(err) throw err
        else {
            console.log(resQ)
            //result 
            if(resQ.length===0) 
            resp.send("user Not Found Try to register...")
            else
            resp.send("hello & welcome "+resQ[0]["FIRSTNAME"])
        }
    })
}