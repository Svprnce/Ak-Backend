const jwt = require('jsonwebtoken')
const Isuserexited = require('../utils/checking');
const { generatejwtaccesstoken } = require('../utils/generatetoken');

const checkaccesstoken = async (req, res, next) => {
    let err;
    let token;
    let rtoken;
    
    try{
        
        token = req.cookies.jwt_r
        //console.log(token);

        // if(!token){
            
        //     rtoken = req.cookies.jwt_r
           
        //     if (!rtoken) {
        //         return res.status(200).json({
        //             msg: 'no token',
        //             err
        //         })
        //     }
        //     const userid = jwt.verify(rtoken,process.env.JWT_REFRESH_SECRET_KEY)

        //     if(userid){
        //         token = generatejwtaccesstoken(userid)
                
        //         res.cookie('jwt_a',token,{
        //             maxAge : 1000 * 60
        //         })
        //         req.userid = userid
        //         return next()
        //     }
        // }
    }
    catch(e){
        err = e.message
    }
    if (!token) {
        return res.status(200).json({
            msg: 'no token',
            err
        })
    }
    const userid =jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
    // console.log(userid);
    if (userid) {
        req.userid = userid
        next()

    }
}

module.exports = checkaccesstoken