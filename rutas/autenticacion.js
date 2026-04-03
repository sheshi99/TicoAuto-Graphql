const express = require('express');
const router = express.Router();


// Autenticación local
const {registrarUsuario } = require('../controladores/autenticacion/registrarUsuario');
const {generarToken} = require('../controladores/autenticacion/generarToken');
const {verificarCorreo} = require('../controladores/autenticacion/verificarCorreo');
  

// Autenticación con Google
const { registrarUsuarioGoogle } = require('../controladores/autenticacion/registroGoogle');
const { loginGoogle } = require('../controladores/autenticacion/loginGoogle');


// Rutas de atenticación local
router.post('/autenticacion', registrarUsuario);
router.post('/autenticacion/login', generarToken);


// Verificación de correo
router.get('/autenticacion/verificacion', verificarCorreo);


// Rutas de autenticación con Google
router.post('/autenticacion/google', registrarUsuarioGoogle);
router.post('/autenticacion/google/login', loginGoogle);


module.exports = router;