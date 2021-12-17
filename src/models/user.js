class UserModel {
    constructor(
        firstname = "",
        lastname = "",
        avatar_url = "",
        username = "",
        password = "",
        isVerified=false,
        email_token="",
        id = null) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.avatar_url = avatar_url
        this.username = username
        this.password = password
        this.isVerified=isVerified
        this.email_token = email_token
    }
    //oop principal 
    setVerified = (isVerified)=> this.isVerified = isVerified
    setEmailToken = (email_token)=> this.email_token = email_token
}

exports.UserModel = UserModel