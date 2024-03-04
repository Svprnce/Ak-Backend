const mongoose = require("mongoose");

const cartschema = new mongoose.Schema({
    
    userid : {
        type : mongoose.Schema.Types.ObjectId,
    },
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Productschema'
    }]
})

const Cartschema = mongoose.model('Cartschema', cartschema)
module.exports = Cartschema