const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: [ 'Active', 'Inactive' ]},
    createdAt: { type: Date, required: true },
    description: { type: String, required: true }
});

module.exports = model('Tipo', TipoSchema);


