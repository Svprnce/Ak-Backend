const bcrypt = require('bcryptjs')

exports.hassthepassword = async (info) =>{
    const hassedpassword = await bcrypt.hash(info,process.env.SALT)
    return hassedpassword
}

exports.comparehasspasword = async (plainpass, hasspass)=>{
    return await bcrypt.compare(plainpass, hasspass)

}