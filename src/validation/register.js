exports.validateData = (data,httpResp) => {

    //firstname
    let firstnamePattern = /^.{4,12}$/
    if (!firstnamePattern.test(data.firstName)) {
        httpResp.status(403).json({
            message: "FirstName Should be at least 4 characters & maximum 12 😅"
        })
    }
    //lastname
    let lastnamePattern = /^.{4,12}$/
    if (!lastnamePattern.test(data.lastName)) {
        httpResp.status(403).json({
            message: "LastName Should be at least 4 characters & maximum 12 😅"
        })
    }
    //username
    let emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

    if (!emailPattern.test(data.email)) {
        httpResp.status(403).json({
            message: "email Should be at least 4 characters & maximum 30 😅"
        })
    }
    //password
    
    //rpassword and password should be much 
    if (data.password !== data.rPassword)
        httpResp.status(403).json({
            message: "The Repeated Password should match the Password 😅"
        })


}