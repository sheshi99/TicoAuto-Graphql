const usuario = require('../modelos/usuario');
const bcrypt = require('bcrypt');

const registrarUsuario = async (req, res) => {
    const { nombre, primerApellido, segundoApellido, correo, contrasenna } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const usuarioExistente = await usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado." });
        }

        // Encriptar la contraseña
        const hashedContrasenna = await bcrypt.hash(contrasenna, 10);

        // Crear nuevo usuario
        const nuevoUsuario = new usuario({
            nombre,
            primerApellido,
            segundoApellido,
            correo,
            contrasenna: hashedContrasenna,
            token: null
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
        const usuario = await Usuario.findOne({ correo });

        if (!usuario || usuario.contrasenna !== contrasenna) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos." });
        }

        const token = await bcrypt.hash(correo + contrasenna, 10);
        usuario.token = token;
        await usuario.save();
        return res.status(201).json({ token: usuario.token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    registrarUsuario,
    generarToken
};