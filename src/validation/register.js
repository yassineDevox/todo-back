const { respJson } = require("../helpers/helpers")

exports.validateData = (data,httpResp) => {

    //firstname
    let firstnamePattern = /^.{4,12}$/
    if (!firstnamePattern.test(data.firstName))
        respJson(403, "FirstName Should be at least 4 characters & maximum 12 😅",httpResp)

    //lastname
    let lastnamePattern = /^.{4,12}$/
    if (!lastnamePattern.test(data.lastName))
        respJson(403, "LastName Should be at least 4 characters & maximum 12 😅",httpResp)

    //username
    let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

    if (!emailPattern.test(data.email))
        respJson(403, "email Should be valid 😅",httpResp)

    //password

    //rpassword and password should be much 
    if (data.password !== data.rPassword)
        respJson(403, "The Repeated Password should match the Password 😅",httpResp)

}