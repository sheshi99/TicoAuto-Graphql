const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
    respuesta: {
        type: String,
        required: true,
        trim: true
    },
    pregunta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pregunta',
        required: true,
        unique: true
    },
    usuarioRespuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fechaRespuesta: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Respuesta', respuestaSchema);