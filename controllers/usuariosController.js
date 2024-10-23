const Usuario = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ username });
    if (usuarioExistente) {
        return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
        username,
        password: hashedPassword,
        apikey: generateApiKey(username, password) // Asegúrate de tener esta función
    });

    try {
        await nuevoUsuario.save();
        res.status(201).json({
            username: nuevoUsuario.username,
            apikey: nuevoUsuario.apikey
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

const loginUsuario = async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ username });
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña
        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Si las credenciales son correctas, devuelve el usuario y la apikey
        res.json({
            username: usuario.username,
            apikey: usuario.apikey
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

const generateApiKey = (username, password) => {
    return Buffer.from(`${username}:${password}`).toString('base64');
};

module.exports = { crearUsuario, loginUsuario };
