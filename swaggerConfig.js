const swaggerJsdoc = require('swagger-jsdoc');

// Definición de configuración de Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de tareas y Usuarios',
            version: '1.0.0',
            description: 'API para gestionar tareas y usuarios con autenticación por apikey.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            },
        ],
    },
    apis: ['./routes/*.js'], // Rutas donde estarán los comentarios de Swagger
};

const swaggerSpecs = swaggerJsdoc(options);

module.exports = swaggerSpecs;
