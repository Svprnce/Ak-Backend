const Cartschema = require("../models/Cartschema");
const Orderschema = require("../models/Orderschema");
const { ObjectId } = require('mongodb');

exports.handlepayment = async (req, res) => {
    const { orderid } = req.body

    await Cartschema.deleteMany({ userid: req.userid })

    // let stages = [
    //     {
    //         $match: {
    //             userid: new ObjectId(
    //                 req.userid
    //             ),
    //         },
    //     },
    //     {
    //         $unwind: "$orderedinfo",
    //     },
    //     {
    //         $match: {
    //             "orderedinfo._id": new ObjectId(
    //                 orderid
    //             ),
    //         },
    //     },
    //     {
    //         $set: {
    //             "orderedinfo.orderstatus": "PLACED"
    //         }
    //     },
    //     {
    //         $out : 'Placedorders'
    //     }
    // ]
    //await Orderschema.aggregate(stages)
    //console.log(orderid, req.userid);

    let filter = {
        userid: new ObjectId(req.userid),
        "orderedinfo._id": new ObjectId(orderid)
      };
      
      let update = {
        $set: {
          "orderedinfo.$.orderstatus": "PLACED"
        }
      };
      
      let result = await Orderschema.updateMany(filter, update);

      
    res.status(200).json({
        carts: 'carts cleared',
        order: 'order placed',
        //res : req.body
        //updateplaced

    })
}