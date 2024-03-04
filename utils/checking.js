const Userschema = require("../models/Userschema")
const Addressschema = require("../models/addressschema")

exports.Isuserexited = async ()=>{
   
   const user = await Userschema.findOne({_id : req.userid})
   return user ? true : false
}

exports.Isvalidaddressid = async (req,addressid)=>{
   const useraddresses = await Addressschema.findOne({userid : req.userid})
   const isaddressfound = useraddresses.address.find((address)=>address._id.toString() === addressid)
   //console.log(isaddressfound);
   return isaddressfound !== undefined ? true : false
}