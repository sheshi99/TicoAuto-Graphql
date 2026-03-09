const express = require('express');
const router = express.Router();


const {registrarUsuario} = require('../controladores/autenticacion/registrarUsuario');

const {generarToken} = require('../controladores/autenticacion/generarToken');
  
        
// Ruta para registrar un nuevo usuario
router.post('/autenticacion', registrarUsuario);

router.post('/autenticacion/login', generarToken);

module.exports = router;