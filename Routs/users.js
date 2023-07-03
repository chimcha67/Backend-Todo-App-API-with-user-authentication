const express = require('express')
const userCntroller = require('../Controllers/user-controller')
const {validateToken} = require('../Controllers/validateUserToken')
const Router = express.Router()
const cors = require('cors')
const  userService  = require('../Controllers/user.services')

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


Router.post('/create', userService.registration)
Router.get('/current',validateToken, userCntroller.currentUser)
Router.get('/', userCntroller.getAllUsers)
Router.get('/:id',validateToken, userCntroller.getSingleUser)
Router.put('/:id',validateToken, userService.update)
Router.delete('/:id', userCntroller.deleteUser)


Router.post('/login', userService.login )


// Router.get('/all', userCntroller.getUsers)
//Router.get('/del', userCntroller.deleteUser)
//Router.get('/getSingleUser', userCntroller.singleUser)

 

module.exports = Router