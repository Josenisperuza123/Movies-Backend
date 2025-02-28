const { Schema, model } = require('mongoose');

const MediaSchema = Schema({

    serial: { type: String, required: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true },
    url: { type: String, required: true },
    imagen: { type: String, required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true}, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

module.exports = model('Media', MediaSchema);

