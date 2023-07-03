const mongoose = require('mongoose')
const colors = require('colors')
const env = require('dotenv')

 const connectDb = async()=>{
    try {
      const connect =  await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log(
        `mongoose connected: ${connect.connection.host} ${connect.connection.name}`
      )

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDb