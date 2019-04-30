const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true
    },
    joueur: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('basket', basketSchema)