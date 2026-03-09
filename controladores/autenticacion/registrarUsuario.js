
const usuario = require('../../modelos/usuario');
const bcrypt = require('bcrypt');

const validarContrasenna = (contrasenna) => {

    const tieneMin = /[a-z]/.test(contrasenna);
    const tieneMay = /[A-Z]/.test(contrasenna);
    const tieneNumero = /\d/.test(contrasenna);
    const tieneEspecial = /[@$!%*?&.#_-]/.test(contrasenna);
    const largoMinimo = contrasenna.length >= 8;

    return tieneMin && tieneMay && tieneNumero && tieneEspecial && largoMinimo;
};


const registrarUsuario = async (req, res) => {
    const { nombre, primerApellido, segundoApellido, telefono, correo, contrasenna } = req.body;

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
            telefono,
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

module.exports = {
    registrarUsuario
};
