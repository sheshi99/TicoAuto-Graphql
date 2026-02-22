const express = require('express');
const router = express.Router();

const { crearVehiculo } = require("../controladores/vehiculo");



// Ruta para crear un nuevo vehículo
router.post('/vehiculo', crearVehiculo)

module.exports = router;





