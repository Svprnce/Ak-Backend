const app = require('express')()
const dotenv = require('dotenv')
const path = require('path')
const connectdatabase = require('./config/database')
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')
const authrouter = require('./Routes/authroute')
const productrouter = require('./Routes/productroute')
const userrouter = require('./Routes/userroute')
const checkaccesstoken = require('./middleware/checkaccesstoken')
const publicrouter = require('./Routes/publicroute')
const errormiddleware = require('./Error/errormiddleware')
const pagenotfound = require('./controllers/pagenotfound')
const cors = require('cors')
const paymentrouter = require('./Routes/paymentroute')


dotenv.config({
    path : path.join(__dirname,'config', '.env')
})

connectdatabase()


app.use(cors({
    origin : ["http://localhost:5173/",'http://localhost:5173','http://localhost:3000','https://akstorebysv.netlify.app/','https://akstorebysv.netlify.app/'],
    credentials : true,
}))

app.use(cookieparser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('',publicrouter)
app.use('/auth', authrouter)

app.use(checkaccesstoken)

app.use('/api',productrouter)
app.use('/me',userrouter)
app.use('/payment',paymentrouter)

app.route('/*').get(pagenotfound).post(pagenotfound)

app.use(errormiddleware)


module.exports = app