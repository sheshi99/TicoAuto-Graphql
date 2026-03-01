const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");

//Conexión a la BD
mongoose.connect('mongodb://127.0.0.1:27017/ticoAuto');
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Conexión a la BD exitosa');
});


//Creación del servidor
const app = express();


//middleswares
app.use(bodyParser.json());
app.use(cors({
    domains:'*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
}));

//Ruta para acceder a las imágenes
app.use('/imagenes', express.static('imagenes'));

//Rutas
app.use('/api', require('./rutas/vehiculos'));
app.use('/api', require('./rutas/autenticacion'));

//Inicialización del servidor
app.listen(3001, () => {
    console.log("Servidor corriendo en puerto 3001");
});