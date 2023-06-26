const mongoose = require('mongoose')
const colors = require('colors')

 const connectDb = async()=>{
    try {
      const connect =  await mongoose.connect('mongodb://127.0.0.1:27017/Tutorials', {
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