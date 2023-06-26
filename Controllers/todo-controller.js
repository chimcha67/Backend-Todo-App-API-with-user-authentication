const express = require('express')
const Todo = require('../models/todoModels')


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
    } else{

    //  if(!req.body.content){
    //     return res.status(400).json({message: 'input field cannot be empty'})
    // }

    // create a todo
    const todo = await Todo.create({
        content: req.body.content ,
        user_id: req.user.id
    })

    // if(!todo) return res.status(500).json({
    //     status: false,
    //     message: 'something went wrong'
    // })
    return res.status(201).json({
        success: true,
        message: 'todo added successfully',
        todo: todo
    })
    // if(res.headerSent !== true){
    //     res.send('hello')
    // }
}
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
            message: "todos not found"
        })
        // throw new Error('Users not found')
    }else{
     return res.status(200).json({
        success: true,
        message: 'todos fetched successfully',
        todos: allTodo
    })}
    } catch (error) {
        console.log(error)
    }
}



    // update a todo idemtified by todoid in the request

const updateTodoContent = async(req, res, next)=>{
    const todo = await Todo.findById(req.params.id)
    if(!todo){
        return res.status(400).json({message: 'content cannot be empty'})
    }else{

    // find a todo and update

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    
    
    return res.status(200).json(updatedTodo)
    }
}



// delete a todo by an id

const deleteTodo = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24){
     res.status(400)
    const todo = await Todo.findById(id)
    const todoDelete = await Todo.findByIdAndDelete(
        req.params.id
    )
    }
    else if(!todoDelete){ 
        return  res.status(404).json({
            message: 'todo not found',
        })
        
    }else{
    
   
        return res.status(200).json({
        message: 'todo deleted successfully',
        todo: todoDelete
    })
}
}


module.exports = {
    createTodo,
    deleteTodo,
    getAll,
    updateTodoContent
}