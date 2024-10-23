const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    user: { type: String, required: true }
});

module.exports = mongoose.model('projects', proyectoSchema);
