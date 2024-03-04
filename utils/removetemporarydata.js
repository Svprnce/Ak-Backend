const Orderschema = require("../models/Orderschema")



// has error in the below code

exports.removependingorders = async (req,res) => {
    let currentTime = Date.now()
    await Orderschema.updateMany(
        { 'userid': req.userid, 'orderedinfo.orderstatus': 'PENDING', 'orderedinfo.expirationtime': { $lte: currentTime } },
        { $pull: { orderedinfo: { orderstatus: 'PENDING', expirationtime: { $lte: currentTime } } } }
    );

    res.status(200).json({
        msg : 'temporary pending orders are cleared'
    })
}

// exports.removependingorders = async (req,res) => {
//     let currentTime = Date.now()
//     await Orderschema.updateMany(
//         { 'userid': req.userid, 'orderedinfo.orderstatus': 'PENDING', 'orderedinfo.expirationtime': { $lte: currentTime } },
//         { $pull: { orderedinfo: { orderstatus: 'PENDING', expirationtime: { $lte: currentTime } } } }
//     );

//     res.status(200).json({
//         msg : 'temporary pending orders are cleared'
//     })
// }