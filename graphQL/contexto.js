const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const context = ({ req }) => {
    if (!SECRET_KEY) {
        return { usuario: null };
    }

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return { usuario: null };
    }

    if (!authHeader.startsWith('Bearer ')) {
        return { usuario: null };
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return { usuario: null };
    }

    try {
        const tokenDescifrado = jwt.verify(token, SECRET_KEY);
        return { usuario: tokenDescifrado };
    } catch (error) {
        return { usuario: null };
    }
};

module.exports = context;