const express = require('express')
const { registercontroller, logincontroller, logout } = require('../controllers/authcontroller')
const Userschema = require('../models/Userschema')
const checkaccesstoken = require('../middleware/checkaccesstoken')
const authrouter = express.Router()



authrouter.post('/register',registercontroller)
authrouter.post('/login',logincontroller)
authrouter.get('/logout',logout)


module.exports = authrouter