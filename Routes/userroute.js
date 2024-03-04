const userrouter = require('express').Router()
const { addtocart, getcarts, addtoaddress, getaddress, getorders, addtoorder, removeexpireddata, cart, getsingleorder, clearcarts, getplacedorders, getsingleaddress, cancelorder } = require('../controllers/usercontroller');
const Userschema = require('../models/Userschema');

//cart route 


userrouter.get('/profile',async (req,res)=>{
    const profile = await Userschema.findById(req.userid).select(' -password -createddate -__v')
    res.status(200).json(
        {msg : 'ok',
        profile}
    )
})

userrouter.post('/addtocart/:id', addtocart)
userrouter.get('/carts', getcarts)
userrouter.delete('/cart/:id',cart)
userrouter.delete('/clearcarts',clearcarts)
// address route

userrouter.post('/addtoaddress', addtoaddress)
userrouter.get('/getaddress', getaddress)
userrouter.get('/getaddress/:id', getsingleaddress)


// ORDERS

userrouter.post('/orderconfirmed',addtoorder)
userrouter.get('/orders', getorders)
userrouter.get('/placedorders', getplacedorders)
userrouter.get('/order/:id',getsingleorder)
userrouter.patch('/cancelorder/:id', cancelorder)


userrouter.get('/clear',removeexpireddata)

module.exports = userrouter