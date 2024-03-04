
const Userschema = require("../models/Userschema")
const {generatejwtaccesstoken, generatejwtrefreshtoken} = require("../utils/generatetoken")
const { hassthepassword, comparehasspasword } = require("../utils/hassing")
const { emailvalidation, passwordvalidation } = require("../utils/validation")

exports.registercontroller = async (req, res) => {

    
    console.log(req.body);
    const { email, password, ...data } = req.body
    //console.log(email);
    // checking validation
    const isemailvalidated = emailvalidation(email)
    const ispassvalidated = passwordvalidation(password)

    if (isemailvalidated && ispassvalidated) {

        const passwordhassed = await hassthepassword(password)
        const User = await Userschema.create({ email, password: passwordhassed, ...data })
        const token = generatejwtrefreshtoken(User._id.toString())
        res.cookie("access_token", token,{
            httpOnly : true,
            secure : true
        }).status(200).json({
            msg: 'register post ok',
            User,
            token
        })
    }
    else {
        res.status(200).json({
            msg: 'invalid email or password length'
        })
    }
}
exports.logincontroller = async (req, res) => {
    const { email, password } = req.body
    const user = await Userschema.findOne({ email: email })
    
    if (!user) {
        res.status(200).json({
            msg: 'not regsitered'
        })
    }
    else {
        const ispasswordcorrect = await comparehasspasword(password, user.password)

        if (ispasswordcorrect) {

            // if email & password correct, then generate access & refresh token
            const accesstoken = generatejwtaccesstoken(user._id.toString())
            const refreshtoken = generatejwtrefreshtoken(user._id.toString())
            res.cookie('jwt_r', refreshtoken,{
                httpOnly : true,
                secure : true
            }).status(200).json({
                code : 200,
                res : 'ok',
                //token : accesstoken,
                details: user
            })
        }
        else {
            res.status(200).json({
                msg: 'wrong  password'
            })
        }
    }
}

exports.logout = async (req,res)=>{
    res.clearCookie('jwt_r', '',{
        httpOnly : true,
        secure : true
    }).status(200).json({
        msg: 'you have succesfully logged off',
    })
}