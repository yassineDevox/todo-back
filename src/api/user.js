const { db } = require("../config/mysql");
const randomString = require('randomstring');

const { Credentials } = require("../models/credential");
const { UserModel } = require("../models/user");
const { transport } = require("../config/mailer");

//register user
exports.register = (req, resp) => {

    //fetch data 
    let newUser = new UserModel(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
    )
    //validate data 

    //firstname
    let firstnamePattern = /^.{4,12}$/
    if (!firstnamePattern.test(newUser.firstName)) {
        resp.status(403).json({
            message:"FirstName Should be at least 4 characters & maximum 12 😅"
        })
    }
    //lastname
    let lastnamePattern = /^.{4,12}$/
    if (!lastnamePattern.test(newUser.lastName)) {
        resp.status(403).json({
            message:"LastName Should be at least 4 characters & maximum 12 😅"
        })
    }
    //username
    let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

    if (!emailPattern.test(newUser.email)) {
        resp.status(403).json({
            message:"email Should be at least 4 characters & maximum 30 😅"
        })
    }
    //password
    let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/
    if (
        !passwordPattern.test(newUser.password)
    ) {
        resp.status(403).json({
            message:"Password Should be at least 8 characters & maximum 12 and contains at least one number one uppercase and lowercase 😅"
        })
    }
    //rpassword and password should be much 
    if (newUser.password !== newUser.rPassword) 
    resp.status(403).json({
        message:"The Repeated Password should match the Password 😅"
    })
    
    //check if the email exist 
    
    console.log(newUser);
}







exports.login = (req, resp) => {

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
    db.query(query, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ)
            //result 
            if (resQ.length === 0)
                resp.send("user Not Found Try to register...")
            else
                resp.send("hello & welcome " + resQ[0]["FIRSTNAME"])
        }
    })
}