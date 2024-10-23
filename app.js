const express = require('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuariosRoutes');
const proyectoRoutes = require('./routes/proyectosRoutes');
const connectDB = require('./db'); // Importar la función de conexión

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/proyectos', proyectoRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});