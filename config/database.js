// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')

const connectdatabase = async () => {
    // const uri = "mongodb+srv://devsvprince:Abba@1221@akstore@akstore-cluster.wekpn2o.mongodb.net/?retryWrites=true&w=majority";
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