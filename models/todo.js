const mongoose = require('mongoose')

const TodoSchma = new mongoose.Schema({
    
    title:{
        type: String,
        required:true
    },
    completed:{
        type: Boolean,
        required:true
    }
},{
    timestamps:true
})

const Todo = mongoose.model('todo', TodoSchma)
module.exports = Todo 