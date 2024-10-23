const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apikey: { type: String, required: true }
});

module.exports = mongoose.model('user', usuarioSchema);
