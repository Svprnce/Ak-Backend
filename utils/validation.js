exports.emailvalidation = (useremail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail)) {
        return true
    }
    else {
        return false
    }
}
exports.passwordvalidation = (userpassword) => {
    if (userpassword.length > 8) return true
    else return false
}