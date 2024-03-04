const Errorhandler = require("../Error/error");
const Productschema = require("../models/Productschema");

exports.getallproducts = async (req, res) => {
    const products = await Productschema.find({})
    res.status(200).json({
        msg: 'success',
        products
    })
}
exports.createproduct = async (req, res) => {
    let product;
    try{

        product = await Productschema.create(req.body)
    }
    catch(err){
        return next(new Errorhandler('chech proper fields', 200,err))
    }
    res.status(200).json({
        msg: 'success',
        product: product
    })
}

exports.getproduct = async(req, res,next) => {
    let product;
    try{
        product = await Productschema.findOne({ _id: req.params.id })
    }
    catch(err){
        // console.log(err.name);
        if (err.name === 'CastError') return next(new Errorhandler('no product found', 404,err))
    }
    res.status(200).json({
        msg: 'success',
        product
    })
}
exports.updateproduct = async (req, res) => {
    let product;
    try{
        product = await Productschema.updateOne({ _id: req.params.id }, { $set: req.body })
    }
    catch(err){
        return next(new Errorhandler('no matching product found', 404,err))
    }
    res.status(200).json({
        msg: 'success',
        product
    })
}
exports.deleteproduct = async (req, res,next) => {
    try{

        await Productschema.deleteOne({ _id: req.params.id })
    }
    catch(err){
        return next(new Errorhandler('no matching product found', 404,err))
    }
    res.status(200).json({
        msg: 'product deleted'
    })
}

exports.searchproducts = async (req, res,next) => {
    const searchquery = req.query.q
    const searchrating =  null || req.query.r


    if(!searchquery){
        return res.status(200).json({
            msg : 'please enter keyword'
        })
    }
    
    // using mongodb aggreate for searching the product and filter using ratings
    const stages = [{
        $match: {product_name : { $regex: searchquery, $options: "i" }}
    }]

    if(searchrating !== undefined){
        stages.push({
            $match : {
                ratings : Number(searchrating)
            }
        })
    }

    
    const products = await Productschema.aggregate(stages)
    if (products.length === 0) {
        return res.status(200).json({
            msg : 'no product found for this query'
        })
    }
    res.status(200).json({
        products
    })
}
