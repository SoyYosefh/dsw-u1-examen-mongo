const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://joratejedana:joratejedana@clusterdsw.7z41a.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDSW');
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('No se pudo conectar a MongoDB:', error);
        process.exit(1); // Salir del proceso en caso de error
    }
};

module.exports = connectDB;
