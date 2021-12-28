
// error msg func
exports.error =(msg = "") => `<h2 style='color:red'>${msg}</h2>`


// json resp
exports.respJson =(status = 0, message = "") => {
    httpResp
        .status(status)
        .json({ message })
}