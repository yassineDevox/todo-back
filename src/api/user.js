const { db } = require("../config/mysql");
const randomString = require('randomstring');
const { UserModel } = require("../models/user");
const bcryptjs = require("bcryptjs");
const { transport } = require("../config/mailer");

//register user
exports.register = (httpReq, httpResp) => {

    //fetch data 
    let newUser = new UserModel(
        httpReq.body.firstName,
        httpReq.body.lastName,
        httpReq.body.email,
        httpReq.body.password
    )
    //validate data 

    //firstname
    let firstnamePattern = /^.{4,12}$/
    if (!firstnamePattern.test(newUser.firstName)) {
        httpResp.status(403).json({
            message: "FirstName Should be at least 4 characters & maximum 12 😅"
        })
    }
    //lastname
    let lastnamePattern = /^.{4,12}$/
    if (!lastnamePattern.test(newUser.lastName)) {
        httpResp.status(403).json({
            message: "LastName Should be at least 4 characters & maximum 12 😅"
        })
    }
    //username
    let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

    if (!emailPattern.test(newUser.email)) {
        httpResp.status(403).json({
            message: "email Should be at least 4 characters & maximum 30 😅"
        })
    }
    //password
    let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/
    if (
        !passwordPattern.test(newUser.password)
    ) {
        httpResp.status(403).json({
            message: "Password Should be at least 8 characters & maximum 12 and contains at least one number one uppercase and lowercase 😅"
        })
    }
    //rpassword and password should be much 
    if (newUser.password !== newUser.rPassword)
        httpResp.status(403).json({
            message: "The Repeated Password should match the Password 😅"
        })

    //check if the email exist 

    console.log(newUser);

    //query is username exist 
    db.query(` 
    SELECT * FROM USERS 
    WHERE email=${newUser.email}
    `, (err, resQ) => {
        if (err) throw err
        else {
            //if email exist 
            if (resQ.length > 0) {
                let userVerified = resQ[0].isVerified
                if (userVerified == 1)
                    httpResp
                        .status(403)
                        .json({
                            message: "User Already exist"
                        })
                else
                    httpResp
                        .status(403)
                        .json({
                            message: "Please Verify Your Email"
                        })

            }
            //email doesnt exist 
            else {

                //generate token 
                let emailToken = randomString.generate()
                newUser.email_token = emailToken
                newUser.isVerified = false
                newUser.expirationDate = new Date(Date.now())
                //crypt the password 
                bcryptjs.hash(newUser.password, 10)
                    .then((hash) => {
                        newUser.password = hash
                        //insert the newUser into database
                        db.query(` INSERT INTO USERS SET ? `, newUser, (err, resQQ) => {
                            if (err) throw err
                            else {

                                // send email to the newUser's email
                                //send mail to newUser's email account 
                                //mail options
                                const mailOptions = {
                                    from: "todoApp@GMC.com",
                                    to: newUser.username,
                                    subject: "Please Verify your email Account",
                                    html: `<a href="http://localhost:9000/api/auth/${newUser.email}/code/${newUser.email_token}">Verify My Email</a>`
                                }
                                transport.sendMail(mailOptions, (err, info) => {
                                    if (err) throw err
                                    else {
                                        console.log(info)
                                        httpResp
                                            .status(201)
                                            .json({
                                                message: "Please verify Your Email !!"
                                            })
                                    }
                                })

                            }
                        })

                    })
                    .catch(err => console.log(err))
            }
        }
    })
}





