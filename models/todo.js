const mongoose = require('mongoose');

const TodoSchma = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});

const Todo = mongoose.model('todos', TodoSchma);
module.exports = Todo;