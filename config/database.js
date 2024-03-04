const mongoose = require('mongoose')

const connectdatabase = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL + 'akstore')
        console.log('database connected')
    }
    catch(e){
        console.log('error on database')
    }
}

module.exports = connectdatabase