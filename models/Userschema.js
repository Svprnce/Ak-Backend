const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
        Select : true
    },
    name :{
        type : String,
        required : true,
    },
    gender :{
        type : String,
        enum : ['Male','Female'],
        required : true,
        default : 'Male'
    },
    createddate : {
        type : Date,
        default : Date.now()
    }
})

const Userschema = mongoose.model('Userschema', userschema)

module.exports = Userschema