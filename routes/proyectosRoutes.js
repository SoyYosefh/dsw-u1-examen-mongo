const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear un proyecto (requiere API key)
router.post('/', authMiddleware, proyectoController.crearProyecto);

// Obtener todos los proyectos del usuario (requiere API key)
router.post('/all', authMiddleware, proyectoController.obtenerProyectos);

// Actualizar un proyecto (requiere API key)
router.put('/:id', authMiddleware, proyectoController.actualizarProyecto);

// Eliminar un proyecto (requiere API key)
router.delete('/:id', authMiddleware, proyectoController.eliminarProyecto);

module.exports = router;
