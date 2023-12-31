const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const bodyParser = require('body-parser');
 require("dotenv").config()
 const emailValidator = require('deep-email-validator')

const controller = express()

const createUser = async(req, res, next)=>{
    try {
        const {name, email,  password, repeat_password}= req.body
        console.log(name, email, )

        //const {valid, reason, validators} = await emailValidator.validate(email);

        // if (valid) return res.send({message: "OK"});

        // return res.status(400).send({
        //     message: "Please provide a valid email address.",
        //     reason: validators[reason].reason
        // })


        if(!name ||  !email || !password || !repeat_password){
            res.status(400).json({
                message: 'all fields are required'
            }
            )
            
        }

        // check if user exist


        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                status: false,
                message: 'user already registered'
        })
        }
        else if(!email.includes("@")){
            return res.status(400).json({
                status: false,
                message: 'pls provide a valid email',
                // reason: validators[reason].reason
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
         const repeatPassword = await bcrypt.hash(password, 10)
         if(repeat_password !== password){
            return res.status(400).json({message: 'password must be thesame'})
         }



        // creating user


        const user = await User.create({
                name: name,
                //age: age,
                email: email,
                //gender: gender,
                password: hashedPassword,
                repeat_password: repeatPassword
               
            })
        // const user = await new User ({
        //     name: name,
        //     age: age,
        //     email: email,
        //     gender: gender,
        //     password: password
        // })
        // await user.save()
        if(!user) return res.status(500).json({
            status: false,
            message: 'something went wrong'
        })
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            user: user
        })

       
        //const result = await User.create(user)
    } catch (error) {
        console.log(error)
    }
}

//for reading all users

const getAllUsers = async(req, res, next)=>{
    try {
        const {page, limit} = req.query
        if(page===0) return res.status(400).json({
            success: true,
            message:'invalide page'
        })
        const usePage = page-1
    const users = await User.find().skip(usePage * limit).limit(limit)
    if(!users){
        res.status(404).json({
            success: false,
            message: "users not found"
        })
        // throw new Error('Users not found')
    }
    res.status(200).json({
        success: true,
        message: 'users fetched successfully',
        users: users
    })
    } catch (error) {
        console.log(error)
    }
    
}


const getSingleUser = async(req, res, next)=>{
   try {
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})
    const user = await User.findById(id)

    if(!user){
        res.status(404).json({
            success: false,
            message:'user not found'
        })
        // throw new Error('User not found')
    }
    res.status(200).json({
        status: true,
        message: 'user fetched successfully',
        user: user
    })
   } catch (error) {
    console.log(error)
   }
}


const updateUser = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})

    const user = await User.findById(id)
    if(!user){
        res.status(404)
        // throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedUser)

}

const deleteUser = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400)
    const user = await User.findById(id)
    const userDelete = await User.findByIdAndDelete(
        req.params.id
    )
    if(!userDelete){ 
        res.status(404).json({
            message: 'user not found',
            user: userDelete
        })
        // throw new Error('User not found')
    }
    
    //await User.remove()
    res.status(200).json({
        message: 'user deleted successfully',
        user: userDelete
    })
}


const loginUser = async(req,res)=>{

    const {email, password} = req.body

    if(!email || !password){
        res.status(400).json({
            message: 'all fields are required'
        }
        )
        
    }
    else{    const user = await User.findOne({email})
        // !user && res.status(404).json("user not found");

        // const validPsaaword = await bcrypt.compare(password, user.password)
        // !validPassword && res.status(400).json("wrong password")

        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign({
                user:{
                    email: user.email,
                    name: user.name,
                    //age: user.age,
                    //gender: user.gender,
                     id : user.id
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30m"}
            )
            res.status(200).json({
                message: 'login successful',
                accessToken: accessToken
            })
        }else return res.status(401).json({
            message:'email or password is not valid'
        }
        
        )}
    
} 

// current info for  authenticated user

const currentUser = async(req,res)=>{

        res.json(req.user)
    //     if(res.headersSent !== true) {
    //     res.send('Hello World!');
    // }
    
}



module.exports = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser, 
    loginUser,
    currentUser
}


// const users = [
//     {
//         name:'chimy',
//         age: 200
//     },
//     {
//         name:'chimcha',
//         age: 20
//     },
//     {
//         name:'chimmizy',
//         age: 4
//     }
// ]

// const getUsers = async(req, res)=>{
//     return res.send({
//         message: 'get all users',
//         users: users
//     })

    
// }


// // for getting single user

// const singleUser = async(req, res)=>{
//     const id = req.query.id
//     //const index = users.findIndex(i=> i.id === id)
//     if(id){
//         res.send(
//             users[id]
//         )
//     }
// }




// const deleteUser = async(req, res)=>{
//     //const id = req.params.id
//     const id = req.query.id
//     const index = users.findIndex(i=> i.id === id)
//     const name = users[index].name
//     if(name){
//         //delete users[index]
//         users.splice(index, 1)
//         return res.send({
//             message: 'this is updated users list',
//             users: users
//         })
//     }
    
// }

// module.exports = {
//     getUsers,
//     deleteUser,
//     singleUser
// }