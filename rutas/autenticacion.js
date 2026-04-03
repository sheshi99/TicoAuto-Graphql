const express = require('express');
const router = express.Router();


// Autenticación local
const {registrarUsuario } = require('../controladores/autenticacion/registrarUsuario');
const {generarToken} = require('../controladores/autenticacion/generarToken');
const {verificarCorreo} = require('../controladores/autenticacion/verificarCorreo');
const {verificarCodigo2FA} = require('../controladores/autenticacion/verificarCodigo2FA');
  

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

// Verificación del código 2FA → aquí sí devuelve el JWT final
router.post('/autenticacion/codigo2FA', verificarCodigo2FA);

module.exports = router;