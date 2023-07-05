const express = require('express')
const userRouter = require('./Routs/users')
const todoRouter = require('./Routs/todoRoutes')
const cors = require('cors')
const  connectDb  = require('./Routs/config/db')
const bodyParser = require('body-parser');

const app = express()

app.use(
    express.json()
)


app.use (cors())
require('./Routs/index.routes')
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }))

// app.use(cors({
//     methods:['GET', 'POST','DELETE', 'UPDATE', ,'PUT']
// }))

app.use(bodyParser.json());
connectDb()

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.send('wlecome!!!')
   
})

app.use('/users', userRouter)
app.use('/todo', todoRouter)

app.listen(8000)

// http.createServer(function( req, res){
//     res.end('welcome!!!!')
//     // return res.statusCode(200).json({
//     //     success: true,
//     //     message: "welcome to the tutorial"
//     // })
// }).listen(8000)