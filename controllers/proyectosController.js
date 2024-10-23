const Project = require('../models/ProyectoModel');
const User = require('../models/UsuarioModel');

// Crear un nuevo proyecto
exports.crearProyecto = async (req, res) => {
    const { title, description, startDate, endDate, budget, apikey } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    const nuevoProyecto = new Project({
        title,
        description,
        startDate,
        endDate,
        budget,
        user: apikey // Asocia el proyecto al usuario autenticado
    });

    try {
        await nuevoProyecto.save();
        res.json(nuevoProyecto);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
};

// Obtener todos los proyectos del usuario autenticado
exports.obtenerProyectos = async (req, res) => {
    const { apikey } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    try {
        const proyectos = await Project.find({ user: apikey });  // Filtra por el usuario autenticado
        res.json(proyectos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};

// Actualizar un proyecto
exports.actualizarProyecto = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        startDate,
        endDate,
        budget,
        apikey
    } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    try {
        const proyectoActualizado = await Project.findOneAndUpdate(
            { _id: id, user: apikey },  // Asegúrate de que el proyecto pertenece al usuario autenticado
            { title, description, startDate, endDate, budget },
            { new: true }
        );

        if (!proyectoActualizado) return res.status(404).json({ error: 'Proyecto no encontrado' });

        res.json(proyectoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
};

// Eliminar un proyecto
exports.eliminarProyecto = async (req, res) => {
    const { id } = req.params;
    const { apikey } = req.body;

    // Verifica la API key
    const usuario = await User.findOne({ apikey });
    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    try {
        const proyectoEliminado = await Project.findOneAndDelete({ _id: id, user: apikey });  // Solo el usuario autenticado puede eliminar su proyecto

        if (!proyectoEliminado) return res.status(404).json({ error: 'Proyecto no encontrado' });

        res.json({ mensaje: 'Proyecto eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
};
