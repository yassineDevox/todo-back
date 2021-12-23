const { db } = require("../config/mysql");

// error msg func
const error = (msg) => `<h2 style='color:red'>${msg}</h2>` 


exports.verifyEmail = (httpReq, httpResp) => {
    //fetch data 
    let email = httpReq.params.email
    let token = httpReq.params.token
    console.log(token, email);
    //validate email and token 
    db.query(`
     SELECT * FROM USERS WHERE email=${email} AND token
      `, (err,resQ) => {
          if(err) throw err
          else {
              if(resQ.length==0)
              httpResp.send(error("invalid email or token "))
              else {
                //verify expiration date 
                let expirationDate = resQ[0].expirationDate
                let currentDate = Date.now()
                if(expirationDate<currentDate)
                    httpResp.send(error("token has been expired"))
                else{
                    db.query(` 
                        UPDATE USERS SET token='',isVerified=1 
                        WHERE email=${email}`
                    ,(err,resQQ)=>{
                        if(err) throw err
                        else 
                            httpResp.
                            send(`<h1>
                                    Your Account 
                                    has been verified 
                                    successfully 
                                </h1>
                                <a href="http//localhost:3000/login">Login</a> `)
                    })
                }
              }
          }
       }
    )
}