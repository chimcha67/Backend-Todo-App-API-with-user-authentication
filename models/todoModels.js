const mongoose = require('mongoose')


const todoModel =  mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content:{
        type: String,
        required: [true, 'content cannot be empty']
    },

},
{
    timestamps: true
}
)

module.exports = mongoose.model('Todo', todoModel)