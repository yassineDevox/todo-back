const nodeMailer = require("nodemailer")
const { MAILGUN } = require("./mailgun")

 exports.transport  = nodeMailer.createTransport({
    service:'Mailgun',
    auth:{
        user:MAILGUN.user,
        pass:MAILGUN.pass
    },
    tls:{
        rejectUnauthorized:false
    }
})
