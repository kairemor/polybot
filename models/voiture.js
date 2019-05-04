const mongoose = require('mongoose')

const voitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    itineraire: {
        type: String,
        required: true
    },
    heure: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const Voiture = mongoose.model('voiture', voitureSchema)

module.exports = Voiture