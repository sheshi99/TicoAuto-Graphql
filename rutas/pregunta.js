const express = require('express');
const router = express.Router();

const {crearPregunta} = required('../controladores/pregunta/crearPregunta');

router.post('/pregunta/crear', crearPregunta);

module.exports = router;