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
       req.body.password,
   )
   console.log(newUser);
   
    
  


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