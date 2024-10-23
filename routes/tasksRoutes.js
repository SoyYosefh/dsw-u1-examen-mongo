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
 *           type: String
 *           description: Estatus de la tarea
 *     TaskResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la tarea
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *         startDate:
 *           type: string
 *           description: Fecha de inicio
 *         endDate:
 *           type: string
 *           description: Fecha de fin
 *         estatus:
 *           type: string
 *           description: Estatus
 *     ApiKeyRequest:
 *       type: object
 *       required:
 *         - apikey
 *       properties:
 *         apikey:
 *           type: string
 *           description: La clave API del usuario
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       401:
 *         description: No autorizado
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
 *             $ref: '#/components/schemas/ApiKeyRequest'
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskResponse'
 *       401:
 *         description: No autorizado
 */
router.post('/all', authMiddleware, tasksController.obtenerTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     tags: [Tareas]
 *     security:
 *       - ApiKeyAuth: []
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
 *               title:
 *                 type: string
 *                 description: Título actualizado de la tarea
 *               description:
 *                 type: string
 *                 description: Descripción detallada de la tarea
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio en formato ISO
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin en formato ISO
 *               estatus:
 *                 type: string
 *                 description: Estado actualizado de la tarea (por ejemplo, "Terminada")
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
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskResponse'
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autorizado
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
