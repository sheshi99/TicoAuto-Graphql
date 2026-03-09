
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;


const verificarToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const tokenDescifrado = jwt.verify(token, SECRET_KEY);
        req.usuario = tokenDescifrado;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};

const verificarTokenOpcional = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        req.usuario = null;
        return next();
    }

    try {
        // Intentamos verificar el token usando la clave secreta
        const tokenDescifrado = jwt.verify(token, SECRET_KEY);

        // Si el token es válido, guardamos la info del usuario en req.usuario
        req.usuario = tokenDescifrado; 
    } catch (error) {
        // Si el token es inválido o expiró (invitado)
        req.usuario = null;
    }

    next();
};


module.exports = {
    verificarToken,
    verificarTokenOpcional
};