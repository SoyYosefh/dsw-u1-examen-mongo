const Project = require('../models/TaskModel');
const User = require('../models/UsuarioModel');

// Crear un nuevo tarea
exports.crearTask = async (req, res) => {
    const { title, description, startDate, endDate, estatus, apikey } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    const nuevoTasko = new Project({
        title,
        description,
        startDate,
        endDate,
        estatus,
        user: apikey // Asocia el tarea al usuario autenticado
    });

    try {
        await nuevoTasko.save();
        res.json(nuevoTasko);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el tarea' });
    }
};

// Obtener todos los tareas del usuario autenticado
exports.obtenerTasks = async (req, res) => {
    const { apikey } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    try {
        const tareas = await Project.find({ user: apikey });  // Filtra por el usuario autenticado
        res.json(tareas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

// Actualizar un tarea
exports.actualizarTask = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        startDate,
        endDate,
        estatus,
        apikey
    } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    try {
        const tareaActualizado = await Project.findOneAndUpdate(
            { _id: id, user: apikey },  // Asegúrate de que el tarea pertenece al usuario autenticado
            { title, description, startDate, endDate, estatus },
            { new: true }
        );

        if (!tareaActualizado) return res.status(404).json({ error: 'Task no encontrado' });

        res.json(tareaActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el tarea' });
    }
};

// tarea estatus "No terminada"
exports.tareaNoTerminada = async (req, res) => {
    const { id } = req.params;
    const { apikey } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    try {
        const tareaActualizado = await Project.findOneAndUpdate(
            { _id: id, user: apikey },  // Asegúrate de que el tarea pertenece al usuario autenticado
            { estatus: 'No terminada' },
            { new: true }
        );

        if (!tareaActualizado) return res.status(404).json({ error: 'Task no encontrado' });

        res.json(tareaActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el tarea' });
    }
};

// tarea estatus "Terminada"
exports.tareaTerminada = async (req, res) => {
    const { id } = req.params;
    const { apikey } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    try {
        const tareaActualizado = await Project.findOneAndUpdate(
            { _id: id, user: apikey },  // Asegúrate de que el tarea pertenece al usuario autenticado
            { estatus: 'Terminada' },
            { new: true }
        );

        if (!tareaActualizado) return res.status(404).json({ error: 'Task no encontrado' });

        res.json(tareaActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el tarea' });
    }
};

// Eliminar un tarea
exports.eliminarTask = async (req, res) => {
    const { id } = req.params;
    const { apikey } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    try {
        const tareaEliminado = await Project.findOneAndDelete({ _id: id, user: apikey });  // Solo el usuario autenticado puede eliminar su tarea

        if (!tareaEliminado) return res.status(404).json({ error: 'Task no encontrado' });

        res.json({ mensaje: 'Tasko eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el tarea' });
    }
};
