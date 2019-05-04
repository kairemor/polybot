const mongoose = require('mongoose')
const apreRepas = new mongoose.Schema({
    day_number: {
        type: Number,
        required: true
    },
    pos_apre: {
        type: Number,
        default: 0
    },
    neg_apre: {
        type: Number,
        default: 0
    },
    text_apre: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const ApreRepas = mongoose.model('apre', apreRepas)
module.exports = ApreRepas