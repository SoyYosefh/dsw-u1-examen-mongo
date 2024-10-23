const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');

// Ruta para registrar un usuario (POST /usuarios/register)
router.post('/register', usuarioController.crearUsuario);

// Ruta para autenticar a un usuario (POST /usuarios/login)
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
