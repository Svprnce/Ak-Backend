const pagenotfound = async(req,res,next)=>{
    res.status(404).json({
        msg : 'page not found'
    })
}

module.exports = pagenotfound