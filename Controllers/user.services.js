const validator = require("./validator")
const { registerSchema, loginSchema , updateSchema} = require("./validator")
const userService = require('./user-controller')


const registration = async(req, res, next)=>{
    const {error} = await registerSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await userService.createUser(req,res, next)
}


// login service

const login = async(req, res, next)=>{
    const {error} = await loginSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await userService.loginUser(req,res, next)
}

// update user details

const update = async(req, res, next)=>{
    const {error} = await updateSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await userService.updateUser(req,res, next)
}



module.exports = {
    registration,
    login,
    update
}