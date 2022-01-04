
exports.validateDataRegister = (data) => {

    //firstname
    let firstnamePattern = /^.{4,12}$/
    if (!firstnamePattern.test(data.firstname)) {
        return "FirstName Should be at least 4 characters & maximum 12 😅"

    }

    //lastname
    let lastnamePattern = /^.{4,12}$/
    if (!lastnamePattern.test(data.lastname)) {
        return "LastName Should be at least 4 characters & maximum 12 😅"

    }

    //email
    let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

    if (!emailPattern.test(data.email)) {
        return "email Should be valid 😅"

    }

    //password
    let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    if (!passwordPattern.test(data.password)) {
        return "Invalid Password 😅"

    }

    //rpassword and password should be much 
    if (data.password !== data.rPassword)
        return "The Repeated Password should match the Password 😅"

    return ""

}