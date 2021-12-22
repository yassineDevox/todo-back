class UserModel {
    constructor(
        firstname = "",
        lastname = "",
        email = "",
        password = "",
        avatar_url = "",
        isVerified=false,
        email_token="",
        expirationDate=new Date(),
        id = null) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.avatar_url = avatar_url
        this.email = email
        this.password = password
        this.isVerified = isVerified
        this.expirationDate = expirationDate
        this.email_token = email_token
    }
   
}

exports.UserModel = UserModel