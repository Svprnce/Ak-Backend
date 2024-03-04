const Razorpay = require('razorpay');
const path = require('path')

const dotenv = require('dotenv')

dotenv.config({
    path : path.join(__dirname, '.env')
})


const razorpayinstance = new Razorpay({
    key_id: process.env.PAYMENT_KEYID,
    key_secret: process.env.PAYMENT_SECRET,
});

module.exports = razorpayinstance

   

