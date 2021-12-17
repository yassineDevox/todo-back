const { UserModel } = require("../models/user")

exports.validateRegisterData = (newUser = new UserModel(),req,resp) => {

    //password
    let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/
    if (
        !passwordPattern.test(newUser.password)
    ) {
        resp.send("<h1 style='color:red'>Password Should be at least 8 characters & maximum 12 and contains at least one number one uppercase and lowercase😅 !!</h1>")
        return false 
    }
    //username
    let usernamePattern = /^.{4,30}$/
    if (!usernamePattern.test(newUser.username)) {
        resp.send("<h1 style='color:red'>Username Should be at least 4 characters & maximum 30 😅 !!</h1>")
        return false
    }
    //firstname
    let firstnamePattern = /^.{4,12}$/
    if (!firstnamePattern.test(newUser.firstname)) {
        resp.send("<h1 style='color:red'>FirstName Should be at least 4 characters & maximum 12 😅 !!</h1>")
        return false
    }
    //lastname
    let lastnamePattern = /^.{4,12}$/
    if (!lastnamePattern.test(newUser.lastname)) {
        resp.send("<h1 style='color:red'>LastName Should be at least 4 characters & maximum 12 😅 !!</h1>")
        return false
    }
    return true
}