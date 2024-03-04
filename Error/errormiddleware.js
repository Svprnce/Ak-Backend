const errormiddleware = (err,req,res,next)=>{
    
    console.log('error ocuured on error middleware');
    res.status(err.statuscode).json({
        msg : 'error occured',
        error_msg : err.msg,
        status_code : err.statuscode,
        error : err.info
    })  
}

module.exports = errormiddleware