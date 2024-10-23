const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    estatus: { type: String, required: true },
    user: { type: String, required: true }
});

module.exports = mongoose.model('tasks', taskSchema);
