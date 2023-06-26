const express = require('express')
const userCntroller = require('../Controllers/user-controller')
const {validateToken} = require('../Controllers/validateUserToken')
const Router = express.Router()
const cors = require('cors')


var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


Router.post('/create', userCntroller.createUser)
Router.get('/current',validateToken, userCntroller.currentUser)
Router.get('/', userCntroller.getAllUsers)
Router.get('/:id', userCntroller.getSingleUser)
Router.put('/:id', userCntroller.updateUser)
Router.delete('/:id', userCntroller.deleteUser)


Router.post('/login', userCntroller.loginUser )


// Router.get('/all', userCntroller.getUsers)
//Router.get('/del', userCntroller.deleteUser)
//Router.get('/getSingleUser', userCntroller.singleUser)

 

module.exports = Router