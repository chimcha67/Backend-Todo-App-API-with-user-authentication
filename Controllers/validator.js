const Joi = require('joi')


// middleware for validating logged in user token
const registerSchema = Joi.object({
    name: Joi.string().required(),
    //age: Joi.number().min(10),
    email: Joi.string().email().required(),
    //gender: Joi.string().valid('M','F'),
    //password:Joi.string().min(8).required()
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password')

})


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().min(8).required()

})


const updateSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('M','F').required(),
    //password:Joi.string().min(8).required()

})


module.exports = {
    registerSchema,
    loginSchema,
    updateSchema
}
