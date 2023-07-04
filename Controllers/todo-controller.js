const express = require('express')
const Todo = require('../models/todoModels')


//LINK
const link = 'https://todo-api-bvr7.onrender.com'

// create and save new todo

const createTodo = async(req, res,next)=>{
   try {
     // validate request
    const {content} = req.body
     const existingTodo = await Todo.findOne({content})
     if(existingTodo){
         return res.status(400).json({
             status: false,
             message: 'todo already exist'
     })
     }
     else if(!req.body.content){
        return res.status(400).json({message: 'input field cannot be empty'})
    }

     if(!req.body.content){
        return res.status(400).json({message: 'input field cannot be empty'})
    }

    // create a todo
    const todo = await Todo.create({
        content: req.body.content ,
        user_id: req.user.id
    })

    if(!todo) return res.status(500).json({
        status: false,
        message: 'something went wrong'
    })
     res.status(201).json({
        success: true,
        message: 'todo added successfully',
        todo: todo
    })
    // if(res.headerSent !== true){
    //    return res.send('hello')
    // }
   } catch (error) {
     console.log(error)
   }

};

// get all todo


const getAll = async(req, res, next)=>{
    try {
        const allTodo = await Todo.find({user_id: req.user.id})

    if(!allTodo){
       return res.status(404).json({
            success: false,
            message: "todo is empty"
        })
        // throw new Error('Users not found')
    }
    res.status(200).json({
        success: true,
        message: 'todos fetched successfully',
        todos: allTodo
    })
    } catch (error) {
        console.log(error)
    }
}


const getSingleTodo = async(req, res, next)=>{
    try {
     const id = req.params.id
     if(id.length>24 || id.length<24) return res.status(400).json({message: 'invalid id'})
     const todo = await Todo.findById(id)
 
    //  if(!todo){
    //      res.status(404).json({
    //          success: false,
    //          message:'to not found'
    //      })
         // throw new Error('User not found')
  //   }
  if(JSON.stringify(todo.user_id) !== JSON.stringify(req.user.id)){
    return res.status(403).json({
        message: 'user cannot edit another users todo'
    })
}
     res.status(200).json({
         status: true,
         message: 'todo fetched successfully',
         todo: todo
     })
    } catch (error) {
     console.log(error)
    }
 }


    // update a todo idemtified by todoid in the request

const updateTodoContent = async(req, res, next)=>{
    const todo = await Todo.findById(req.params.id)
    if(!todo){
        return res.status(400).json({message: 'content cannot be empty'})
    }

    if(JSON.stringify(todo.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot edit another users todo'
        })
    }
    // find a todo and update

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    
    
    res.status(200).json(updatedTodo)
}



// delete a todo by an id

const deleteTodo = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400)
    const todo = await Todo.findById(req.params.id)
   
    if(!todo){ 
        return res.status(404).json({
            message: 'todo not found',
        })
    }
    if(JSON.stringify(todo.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot edit another users todo'
        })
    }

    const todoDelete = await Todo.findByIdAndDelete(
        req.params.id
    )
    
    res.status(200).json({
        message: 'todo deleted successfully',
        todo: todoDelete
    })
s
}


module.exports = {
    createTodo,
    deleteTodo,
    getAll,
    getSingleTodo,
    updateTodoContent
}