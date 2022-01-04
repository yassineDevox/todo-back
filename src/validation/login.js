const { respJson } = require("../helpers/helpers")

exports.validateDataLogin = (data) => {

     //email
     let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

     if (!emailPattern.test(data.email)) {
         return "email Should be valid 😅"
     }
     return ""
  
}