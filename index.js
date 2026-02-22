const express = require('express');

const app = express();

app.listen(3001, () => {
    console.log("Servidor corriendo en puerto 3001");
});