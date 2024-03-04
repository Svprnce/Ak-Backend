// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')

const connectdatabase = async () => {
    try{
        // await mongoose.connect(process.env.MONGODB_URL + 'akstore')
        await mongoose.connect(process.env.MONGODB_URL)

        console.log('database connected')
    }
    catch(e){
        console.log('error on database',e)
    }
}

module.exports = connectdatabase
