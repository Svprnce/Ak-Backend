const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Userschema',
    },
    orderedinfo: [{
        products: [
            {
                productid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Productschema',
                    required: true
                },
                quantity: {
                    type: Number,
                    min: 1,
                    max: 5,
                    default: 1
                }
            }
        ],
        selectedaddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Addressschema',
            required: true
        },
        orderstatus: {
            type: String,
            enum: ['PENDING', 'PLACED', 'ONTHEWAY', 'COMPLETED', 'CANCELLED'],
            default: 'PENDING'
        },
        cashmode: {
            type: String,
            enum: ['ONLINE', 'OFFLINE']
        },
        placeddate :{
            type : Date,
            default : (()=>Date.now())
        }
        // expirationtime :{
        //     type : Date,
        //     default : ()=> Date.now().setHours(process.env.DB_EXPIRESTIME)
        // }
    }]
})


const Orderschema = mongoose.model('Orderschema', orderschema)

module.exports = Orderschema
