const { respJson } = require("../helpers/helpers")

exports.validateDataFP = (data,httpResp) => {

    //emailS
    let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

    if (!emailPattern.test(data.email))
        respJson(403, "email Should be valid 😅",httpResp)

  
}