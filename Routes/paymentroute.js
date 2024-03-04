const express = require('express')
const { handlepayment } = require('../controllers/paymentcontroller')
const paymentrouter = express.Router()

//app.use('/payment',paymentrouter)

paymentrouter.post('/handlepayment',handlepayment)


module.exports = paymentrouter