const productrouter = require('express').Router()
const { createproduct, updateproduct, deleteproduct} = require('../controllers/productcontroller')




productrouter.route('/product/:id').post(updateproduct).delete(deleteproduct)
productrouter.post('/product', createproduct)



module.exports = productrouter