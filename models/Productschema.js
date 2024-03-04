const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Enter Price amount']
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5
    },
    stock: {
        type: Number,
        default: 1
    },
    image: [
        {
            type: String
        }
    ]
},{timestamps:true})

const Productschema = mongoose.model('Productschema', productschema)

module.exports = Productschema