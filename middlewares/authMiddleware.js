const User = require('../models/UsuarioModel');

const authMiddleware = async (req, res, next) => {
    const { apikey } = req.body;

    if (!apikey) {
        return res.status(403).json({ error: 'Se requiere una API key' });
    }

    const usuario = await User.findOne({ apikey });

    if (!usuario) {
        return res.status(403).json({ error: 'API key inválida' });
    }

    req.usuario = usuario;
    next();
};

module.exports = authMiddleware;
