const express = require('express');
const router = express.Router();
const { obtenerDatosCedula } = require('../controladores/padron/padron');

router.get('/padron/:cedula', obtenerDatosCedula);

module.exports = router;