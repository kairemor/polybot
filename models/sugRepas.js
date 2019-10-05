const mongoose = require('mongoose');
const sugChemat = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const SugRepas = mongoose.model('sugrepas', sugChemat);

module.exports = SugRepas;