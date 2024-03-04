const Errorhandler = require("../Error/error")
const Cartschema = require("../models/Cartschema")
const Orderschema = require("../models/Orderschema")
const Productschema = require("../models/Productschema")
const Addressschema = require("../models/addressschema")
const { ObjectId } = require('mongodb');
const { Isvalidaddressid } = require("../utils/checking")
const { removependingorders } = require("../utils/removetemporarydata")
const razorpayinstance = require("../config/paymentconfig")

// CARTS

exports.addtocart = async (req, res) => {

    // const { cart } = req.body
    // const token = req.cookies.access_token
    // const userid = jwt.verify(token,process.env.JWT_SECRET_KEY)
    // console.log(userid);
    const carts = await Cartschema.findOneAndUpdate({ userid: req.userid }, { $push: { cart: req.params.id } })
    if (!carts) {
        const profileid = new Cartschema({ userid: req.userid, cart: req.params.id })
        profileid.save()
    }

    res.status(200).json({
        msg: 'cart added'
    })

}
exports.getcarts = async (req, res) => {
    //const {userid} = req.body
    //  console.log(req.body);

    const userprofile = await Cartschema.findOne({ userid: req.userid }).populate('cart')
    //  console.log(userprofile);
    const cart = userprofile?.cart

    res.status(200).json({

        cart
    })

}
exports.cart = async (req, res) => {

    await Cartschema.updateOne(
        { "userid": req.userid },
        { $pull: { "cart": { $in: [req.params.id] } } }
    )



    // await Cartschema.updateOne({ userid: req.userid },{$pull : {"cart" : {_id : req.params.id}} })
    res.status(200).json({
        res: 'ok',
        msg: 'removed from cart'
    })

}
exports.clearcarts = async (req, res) => {
    await Cartschema.deleteMany({ userid: req.userid })
    res.status(200).json({
        msg: 'carts cleared'
    })
}


// ADDRESS
exports.addtoaddress = async (req, res) => {
    const { ...data } = req.body
    let address;
    try {
        if (data) {
            address = await Addressschema.findOneAndUpdate({ userid: req.userid }, { $push: { ...data } })
            if (!address) {
                address = await Addressschema.create({ userid: req.userid, ...data })
            }
        }
        else {
            console.log('no data empty api');
        }
    }
    catch (err) {
        return new Errorhandler('error on address', 400, err)
    }
    res.status(200).json({
        msg: 'success',
        //address
    })
}
exports.getaddress = async (req, res) => {
    //const { userid} = req.body
    const addressdata = await Addressschema.findOne({ userid: req.userid }).select('-_id -userid')
    const address = addressdata.address
    res.status(200).json({
        msg: 'success',
        address
    })
}
exports.getsingleaddress = async (req, res) => {

    const id = req.params.id

    //console.log(id);
    const addressdata = await Addressschema.findOne({ userid: req.userid }).select('-_id -userid')
    const address = addressdata.address
    let addressdetail = address.filter((c) => {
        if (c._id.toString() == id) {
            return c
        }
    })
    //console.log(addressdetail[0]);
    res.status(200).json({
        msg: 'success',
        addressdetail
    })
}

// ORDERS

exports.getorders = async (req, res) => {

    const orders = await Orderschema.findOne({ userid: req.userid })

    res.status(200).json({
        msg: 'yours orders are listed below',
        orders
    })
}
exports.getplacedorders = async (req, res) => {
    let orders;
    let orderedinfo
    let add
    // orderedinfo.products.productid
    try {
        orders = await Orderschema.findOne({ userid: req.userid }).populate('orderedinfo.products.productid')
        //add = await Addressschema.findOne({userid: req.userid})
        // console.log(orders);
        orderedinfo = orders.orderedinfo
    } catch (error) {
        //console.log(error);
        return res.status(200).json({
            msg: 'yours orders are empty',
            placedorders: []
        })
    }

    // try {
    //     let order = await Orderschema.aggregate([
    //         { $match: { userid: new ObjectId(req.userid) } },
    //         { $unwind: "$orderedinfo" }, // If orderedinfo is an array, unwind it to access its elements
    //         { $lookup: {
    //             from: "addressschemas", // Collection name of Addressschema
    //             localField: "orderedinfo.selectedaddress",
    //             foreignField: "_id",
    //             as: "orderedinfo.selectedaddress"
    //         }},
    //         { $unwind: "$orderedinfo.selectedaddress" }, // If selectedaddress is an array, unwind it
    //         { $group: { _id: "$_id", orderedinfo: { $push: "$orderedinfo" } } }, // Group back the order info
    //     ]);

    //     if (order && order.length > 0) {
    //         console.log('Order found with populated address:', order[0]);
    //     } else {
    //         console.log('No order found for the user ID:', req.userid);
    //     }
    // } catch (error) {
    //     console.error('Error fetching order:', error);
    // }



    let placedorders = orderedinfo.filter((c, i) => {
        if (c.orderstatus == 'PLACED') {
            return c
        }
    })
    //console.log(placedorders);
    res.status(200).json({
        msg: 'yours orders are listed below',
        placedorders

    })
}
exports.cancelorder = async (req, res) => {
    const id = req.params.id
    let filter = {
        userid: new ObjectId(req.userid),
        "orderedinfo._id": new ObjectId(id)
    };

    let update = {
        $set: {
            "orderedinfo.$.orderstatus": "CANCELLED"
        }
    };

    await Orderschema.updateOne(filter,update)
    res.status(200).json({
        msg: 'yours order was cancelled',
        id: req.params.id

    })
}
exports.addtoorder = async (req, res) => {


    let totalamount = 0;
    let totalquantity = 0;
    let temeporaryorder;

    //const { ...data } = req.body
    const { orderedinfo } = req.body
    //console.log(orderedinfo);
    //Added { new: true, upsert: true } in findOneAndUpdate() to return the updated document and create it if it doesn't exist.

    try {
        // temeporaryorder = await Orderschema.findOneAndUpdate({ userid: req.userid }, {$push: { ...data }}, { new: true, upsert: true, fields: { _id: 1 } })
        temeporaryorder = await Orderschema.findOneAndUpdate({ userid: req.userid }, { $push: { orderedinfo } }, { new: true, upsert: true, fields: { _id: 1 } })

    }
    catch (e) {
        console.log('error ');
    }
    // console.log(temeporaryorder);

    if (temeporaryorder) {
        //console.log('has created temporray', data);

        //let { orderedinfo } = data
        //console.log(orderedinfo);
        let { products } = orderedinfo
        //console.log(products);

        for (const product of products) {


            let productdocument = await Productschema.findById(product.productid)

            if (productdocument) {

                const subtotal = productdocument.price * product.quantity;
                // console.log(`Product: ${productdocument.product_name}, Quantity: ${product.quantity}, Subtotal: ${subtotal}`);
                totalamount += subtotal;
                totalquantity += product.quantity
            }
        }



    }
    let stages = [
        {
            $match: {
                userid: new ObjectId(
                    req.userid
                ),
            },
        },
        // Unwind the orderedinfo array
        {
            $unwind: "$orderedinfo",
        },
        // Sort the documents based on the _id of nested objects in descending order
        {
            $sort: {
                "orderedinfo._id": -1,
            },
        },
        // Limit the result to the first document
        {
            $limit: 1,
        },
        // Project only the _id field of the nested object
        {
            $project: {
                _id: "$orderedinfo._id",
            },
        },
    ]
    const orderidlast = await Orderschema.aggregate(stages);
    const orderid = orderidlast[0]._id.toString();


    // create payment instance and send id
    const paymentid = await razorpayinstance.orders.create({
        amount: totalamount * 100,
        currency: "INR",
        receipt: orderid,
    })




    res.status(200).json({
        status: 'ok',
        msg: 'product created on db',
        totalamount,
        totalquantity,
        orderid,
        payment: paymentid.id
    })
}

exports.getsingleorder = async (req, res) => {


    const getorderdetail = await Orderschema.findOne({ userid: req.userid })
    const orders = getorderdetail.orderedinfo.filter((c, i) => {
        if (c._id == req.params.id) {
            return c
        }
    })
    const singleorder = orders[0]

    res.status(200).json({
        msg: 'product created on db',
        orders: singleorder
    })
}

exports.removeexpireddata = async (req, res) => {
    await removependingorders(req, res)
}