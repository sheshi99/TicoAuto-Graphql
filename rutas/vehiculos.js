const express = require('express');
const router = express.Router();

const { 
    crearVehiculo,
    editarVehiculo,
    eliminarVehiculo,
    marcarVendido,
    obtenerVehiculos
 } = require("../controladores/vehiculo");

const { verificarToken } = require('../controladores/autenticacion');

// Crear un nuevo vehículo
router.post('/vehiculo', crearVehiculo)

// Editar un vehículo existente
router.put('/vehiculo/:id', verificarToken, editarVehiculo)

// Obtener todos los vehículos
router.get('/vehiculos', obtenerVehiculos)

// Eliminar un vehículo existente
router.delete('/vehiculo/:id', verificarToken, eliminarVehiculo)

// Cambiar estado del vehículo a vendido
router.patch('/vehiculo/vendido/:id', verificarToken, marcarVendido);

module.exports = router;





