const usuario = require('../modelos/usuario');
const jwt = requiere('jsonwebtoken');
const bcrypt = requiere('bcrypt');

const SECRET_KEY = process.env.JWT_SECRET;


const validarContrasenna = (contrasenna) => {

    const tieneMin = /[a-z]/.test(contrasenna);
    const tieneMay = /[A-Z]/.test(contrasenna);
    const tieneNumero = /\d/.test(contrasenna);
    const tieneEspecial = /[@$!%*?&.#_-]/.test(contrasenna);
    const largoMinimo = contrasenna.length >= 8;

    return tieneMin && tieneMay && tieneNumero && tieneEspecial && largoMinimo;
};


const registrarUsuario = async (req, res) => {
    const { nombre, primerApellido, segundoApellido, correo, contrasenna } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const usuarioExistente = await usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado." });
        }

        // Validación de seguridad
        if (!validarContrasenna(contrasenna)) {
            return res.status(400).json({
                message: "La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial."
            });
        }

        // Encriptar la contraseña
        const hashedContrasenna = await bcrypt.hash(contrasenna, 10);

        // Crear nuevo usuario
        const nuevoUsuario = new usuario({
            nombre,
            primerApellido,
            segundoApellido,
            correo,
            contrasenna: hashedContrasenna
        });

        // Guardar el nuevo usuario en la BD
        const usuarioGuardado = await nuevoUsuario.save();
        return res.status(201).json(usuarioGuardado);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const generarToken = async (req, res) => {
    const { correo, contrasenna } = req.body;

    if (!correo || !contrasenna) {
        return res.status(400).json({ message: "Correo y contraseña son requeridos." });
    }

    try {
        // Buscar el usuario por correo
    const usuarioEncontrado = await usuario.findOne({ correo });

    if (!usuarioEncontrado) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos." });
    }

    const esValida = await bcrypt.compare(contrasenna, usuarioEncontrado.contrasenna);

    if (!esValida) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos." });
    }
    // Crear el JWT
    const token = jwt.sign(
        {
            id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            correo: usuarioEncontrado.correo
        },
        SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRES}
    );

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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


module.exports = {
    registrarUsuario,
    generarToken,
    verificarToken
};