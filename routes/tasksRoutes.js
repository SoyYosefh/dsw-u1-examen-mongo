const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *         - estatus
 *       properties:
 *         title:
 *           type: string
 *           description: El título de la tarea
 *         description:
 *           type: string
 *           description: La descripción de la tarea
 *         startDate:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la tarea
 *         endDate:
 *           type: string
 *           format: date
 *           description: Fecha de finalización de la tarea
 *         estatus:
 *           type: string
 *           description: Estatus de la tarea
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título del proyecto
 *               description:
 *                 type: string
 *                 description: Una descripción detallada del proyecto
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del proyecto en formato ISO
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin del proyecto en formato ISO
 *               estatus:
 *                 type: string
 *                 description: Estado del proyecto (por ejemplo, "Terminada" o "No terminada")
 *               apikey:
 *                 type: string
 *                 description: La API key del usuario para autorización
 *             example:
 *               title: "Proyecto1"
 *               description: "Descripción detallada del nuevo proyecto."
 *               startDate: "2024-10-22" 
 *               endDate: "2024-12-31"
 *               estatus: "No terminada" 
 *               apikey: "WW9zZWZoOllvc2VmaA=="
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, API key inválida
 */
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     description: Crea una nueva tarea con los detalles proporcionados.
 *     security:
 *       - apiKey: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - startDate
 *               - endDate
 *               - estatus
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea
 *               description:
 *                 type: string
 *                 description: La descripción de la tarea
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la tarea
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de finalización de la tarea
 *               estatus:
 *                 type: string
 *                 description: Estatus de la tarea
 *           example:
 *             title: "Tarea de ejemplo"
 *             description: "Descripción de la tarea de ejemplo."
 *             startDate: "2024-10-25"
 *             endDate: "2024-10-30"
 *             estatus: "pendiente"
 *             apikey: "WW9zZWZoOllvc2VmaA=="
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID único de la tarea creada
 *                 title:
 *                   type: string
 *                   description: El título de la tarea
 *                 description:
 *                   type: string
 *                   description: La descripción de la tarea
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   description: Fecha de inicio de la tarea
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   description: Fecha de finalización de la tarea
 *                 estatus:
 *                   type: string
 *                   description: Estatus de la tarea
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, API key inválida
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authMiddleware, tasksController.crearTask);

/**
 * @swagger
 * /tasks/all:
 *   post:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apikey:
 *                 type: string
 *                 description: La API key del usuario para autorización
 *             example:
 *               apikey: "WW9zZWZoOllvc2VmaA=="
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *       401:
 *         description: No autorizado, API key inválida
 */
router.post('/all', authMiddleware, tasksController.obtenerTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar un proyecto existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proyecto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El nuevo título del proyecto
 *               description:
 *                 type: string
 *                 description: Una nueva descripción detallada del proyecto
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de inicio del proyecto en formato ISO
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Nueva fecha de fin del proyecto en formato ISO
 *               estatus:
 *                 type: string
 *                 description: Nuevo estado del proyecto (por ejemplo, "Terminada" o "No terminada")
 *               apikey:
 *                 type: string
 *                 description: La API key del usuario para autorización
 *             example:
 *               title: "Proyecto Actualizado"
 *               description: "Descripción detallada del nuevo proyecto."
 *               startDate: "2024-10-22" 
 *               endDate: "2024-12-31" 
 *               estatus: "Terminada" 
 *               apikey: "WW9zZWZoOllvc2VmaA=="
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, API key inválida
 *       404:
 *         description: Proyecto no encontrado
 */
router.put('/:id', authMiddleware, tasksController.actualizarTask);

/**
 * @swagger
 * /tasks/{id}/no-terminada:
 *   patch:
 *     summary: Marcar una tarea como no terminada
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apikey:
 *                 type: string
 *                 description: La API key del usuario para autorización
 *             example:
 *               apikey: "WW9zZWZoOllvc2VmaA=="
 *     responses:
 *       200:
 *         description: Estado de la tarea actualizado a 'no terminada'
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 */
router.patch('/:id/no-terminada', authMiddleware, tasksController.tareaNoTerminada);

/**
 * @swagger
 * /tasks/{id}/terminada:
 *   patch:
 *     summary: Marcar una tarea como terminada
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apikey:
 *                 type: string
 *                 description: La API key del usuario para autorización
 *             example:
 *               apikey: "WW9zZWZoOllvc2VmaA=="
 *     responses:
 *       200:
 *         description: Estado de la tarea actualizado a 'terminada'
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 */
router.patch('/:id/terminada', authMiddleware, tasksController.tareaTerminada);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a eliminar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apikey:
 *                 type: string
 *                 description: La API key del usuario para autorización
 *             example:
 *               apikey: "WW9zZWZoOllvc2VmaA=="
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, tasksController.eliminarTask);


module.exports = router;
