const mongoose = require("mongoose");


const addressschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Userschema'
    },
    address: [{
        name: {
            type: String
        },
        ph: {
            type: Number
        },
        pincode: {
            type: Number
        },
        district: {
            type: String
        },
        landmark: {
            type: String
        },
        state: {
            type: String
        },
        type: {
            type: String,
            enum: ['home', 'office'],
            required: true,
        }
    }]
})


const Addressschema = mongoose.model('Addressschema', addressschema)

module.exports = Addressschema