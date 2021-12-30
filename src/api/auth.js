const randomString = require('randomstring');
const { UserModel } = require("../models/user");
const bcryptjs = require("bcryptjs");
const { transport } = require("../config/mailer");
const { validateData } = require("../validation/register");
const { respJson, error, sqlQuery } = require("../helpers/helpers");
const { Credentials } = require('../models/credential');
const { validateDataLogin } = require('../validation/login');
const { validateDataFP } = require('../validation/forget-pass');

//register user
exports.register = async (httpReq, httpResp) => {

    //fetch data 
    let newUser = new UserModel(
        httpReq.body.firstName,
        httpReq.body.lastName,
        httpReq.body.email,
        httpReq.body.password
    )
    //validate data 
    validateData(newUser, httpResp)
    //query is email exist 
    try {
        let res = await sqlQuery(` SELECT * FROM USERS WHERE email='${newUser.email}'`)
        //if email exist 
        if (res.length > 0 && res[0].isVerified == 1)
            respJson(403, "User Already exist ", httpResp)
        else if (res.length > 0)
            respJson(403, "Please Verify your account ", httpResp)

        else {

            //generate token 
            let emailToken = randomString.generate()
            newUser.email_token = emailToken
            newUser.isVerified = false
            newUser.expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
            //crypt the password 
            newUser.password = await bcryptjs.hash(newUser.password, 10)
            //insert the newUser into database
            let newUser = await sqlQuery(` INSERT INTO USERS SET ? `, newUser)

            //send mail to newUser's email account 
            //mail options
            const mailOptions = {
                from: "todoApp@GMC.com",
                to: newUser.username,
                subject: "Please Verify your email Account",
                html: `<a href="http://localhost:9000/api/auth/verify-email/${newUser.email}/code/${newUser.email_token}">Verify My Email</a>`
            }
            let info = await transport.sendMail(mailOptions)
            console.log(info);
            respJson(201, "Please verify Your Email !!", httpResp)
        }
    } catch (error) {
        respJson(500, error.message, httpResp)
    }
}

//verify email after register
exports.verifyEmail = async (httpReq, httpResp) => {

    //fetch data 
    let { email, token } = httpReq.params
    //validate email and token 

    try {
        let res = await sqlQuery(`SELECT * FROM USERS WHERE email='${email}' AND token='${token}'`)
        if (res.length == 0) httpResp.send(error("invalid email or token "))
        else {
            //verify expiration date 
            let expirationDate = res[0].expirationDate
            let currentDate = Date.now()
            if (expirationDate < currentDate)
                httpResp.send(error("token has been expired"))
            else {
                let userUpdated = await sqlQuery(`UPDATE USERS SET token='',isVerified=1 WHERE email='${email}'`)
                console.log(userUpdated);
                httpResp.
                    send(`<h1>Your Account has been verified successfully </h1>
                            <a href="http//localhost:3000/login">Login</a> `)
            }
        }

    } catch (error) {
        respJson(500, error.message, httpResp)
    }

}

//login after verifying email 
exports.login = async (httpReq, httpResp) => {

    //fetch data
    let { email, password } = httpReq.body
    let credential = new Credentials(email, password)
    //validation
    validateDataLogin(credential, httpResp)
    try {

        //query by email 
        let res = await sqlQuery(` SELECT * FROM USERS WHERE email='${newUser.email}'`)
        if (res.length == 0)
            respJson(404, "Email not found ", httpResp)
        else
            let userExists = await bcryptjs.compare(res[0].password, password)
        if (!userExists)
            respJson(403, "Password Invalid", httpResp)
        else
            respJson(200, res[0], httpResp)

    } catch (error) {
        respJson(500, error.message, httpResp)

    }

}

//forget password 
exports.forgetPassword = async (httpReq, httpResp) => {

    //fetch data 
    let { email } = httpReq.body

    //validate data 
    validateDataFP({ email }, httpResp)

    //test if the email exist 
    try {
        let res = await sqlQuery(` SELECT * FROM USERS 
                                   WHERE email='${newUser.email}'
                                `)
        if (res.length == 0)
            respJson(404, "Email not found ", httpResp)
        else if (res[0].isVerified == 0)
            respJson(403, "Please verify Your Email !! ", httpResp)
        else {
            //generate token 
            let token = randomString.generate()
            let expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
            //update token and expiration date 
            let updated = await sqlQuery(` 
                    UPDATE USERS SET 
                    email_token='${token}',
                    expirationDate=${expirationDate}
                     `)
            console.log(updated);
            //send mail to newUser's email account 
            //mail options
            const mailOptions = {
                from: "todoApp@GMC.com",
                to: email,
                subject: "confirm reset password ",
                html: `
                <a href="http://localhost:3000/reset-pass/${email}/code/${token}">Click Here to reset your password</a>`
            }
            let info = await transport.sendMail(mailOptions)
            console.log(info);
            respJson(201, "Please Check Your Email !!", httpResp)
        }

    } catch (error) {
        respJson(500, error.message, httpResp)
    }
}









//resend 
exports.resend = async (httpReq, httpResp) => { 

    //fetch data 
    let { email } = httpReq.body

    //validate data 
    validateDataFP({ email }, httpResp)

    //test if the email exist 
    try {
        let res = await sqlQuery(` SELECT * FROM USERS 
                                   WHERE email='${email}'
                                `)
        if (res.length == 0)
            respJson(404, "Email not found ", httpResp)
        else {
            //regenerate token 
            let token = randomString.generate()
            let expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
            //update token and expiration date 
            let updated = await sqlQuery(` 
                    UPDATE USERS SET 
                    email_token='${token}',
                    expirationDate=${expirationDate}
                     `)
            console.log(updated);
            //send mail to newUser's email account 
            //mail options
            const mailOptions = {
                from: "todoApp@GMC.com",
                to: email,
                subject: "confirm reset password ",
                html: `
                <a href="http://localhost:3000/reset-pass/${email}/code/${token}">Click Here to reset your password</a>`
            }
            let info = await transport.sendMail(mailOptions)
            console.log(info);
            respJson(201, "Please Check Your Email !!", httpResp)
        }

    } catch (error) {
        respJson(500, error.message, httpResp)
    }
}


//reset password 
exports.resetPassword = async (httpReq, httpResp) => { }

