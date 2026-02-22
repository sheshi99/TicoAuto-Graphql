const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/ticoAuto');

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Conexión a la BD exitosa');
});



const app = express();

app.listen(3001, () => {
    console.log("Servidor corriendo en puerto 3001");
});