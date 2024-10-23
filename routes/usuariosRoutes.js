const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioRegistro:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *     UsuarioRespuestaRegistro:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: El nombre de usuario
 *         password:
 *           type: string
 *           description: La contraseña del usuario
 *         apikey:
 *           type: string
 *           description: Clave de API generada para el usuario
 *     UsuarioLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *     UsuarioRespuestaLogin:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: El nombre de usuario
 *         apikey:
 *           type: string
 *           description: Clave de API del usuario
 */

/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRegistro'
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente, devuelve el usuario, contraseña y apikey
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioRespuestaRegistro'
 *       400:
 *         description: Error en el registro
 */

router.post('/register', usuarioController.crearUsuario);


/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioLogin'
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente y devuelve el usuario y apikey
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioRespuestaLogin'
 *       400:
 *         description: Credenciales inválidas
 */
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
