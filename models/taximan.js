const mongoose = require('mongoose')
const taxiSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'taximan'
    },
    number: {
        type: Number,
        unique: true
    }
})
const Taximan = mongoose.model('taximan', taxiSchema)

module.exports = Taximan