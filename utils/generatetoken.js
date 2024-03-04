const jwt = require('jsonwebtoken')

exports.generatejwtaccesstoken = (userid)=>{
    const secret = process.env.JWT_ACCESS_SECRET_KEY
    return jwt.sign({userid},secret)
}

exports.generatejwtrefreshtoken=(userid)=>{
    const secret = process.env.JWT_REFRESH_SECRET_KEY
    return jwt.sign(userid,secret)
}
