const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuariosRoutes');
const proyectoRoutes = require('./routes/tasksRoutes');
const connectDB = require('./db');

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(bodyParser.json());

// Documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/tasks', proyectoRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

module.exports = app; // Exporta solo la aplicación Express sin levantar el servidor
