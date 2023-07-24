const express = require('express')
const userCntroller = require('../Controllers/user-controller')
const {validateToken} = require('../Controllers/validateUserToken')
const Router = express.Router()
const cors = require('cors')
const  userService  = require('../Controllers/user.services')




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