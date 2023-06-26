const express = require('express')
const todoCntroller = require('../Controllers/todo-controller')
const { validateToken } = require('../Controllers/validateUserToken')
//const {validateToken} = require('../Controllers/validateUserToken')
const Router = express.Router()


// Router.use(validateToken)


Router.get('/',validateToken, todoCntroller.getAll)
Router.post('/create',validateToken, todoCntroller.createTodo)
Router.put('/:id', todoCntroller.updateTodoContent)
Router.delete('/:id', todoCntroller.deleteTodo)


module.exports = Router