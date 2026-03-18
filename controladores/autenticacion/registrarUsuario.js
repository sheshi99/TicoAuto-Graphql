
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

const validarDatosRegistro = ({ nombre, primerApellido, segundoApellido, telefono, 
                              correo, contrasenna }) => {
    if (
        !nombre || !nombre.trim() ||
        !primerApellido || !primerApellido.trim() ||
        !segundoApellido || !segundoApellido.trim() ||
        !telefono || !telefono.trim() ||
        !correo || !correo.trim() ||
        !contrasenna || !contrasenna.trim()
    ) {
        return "Todos los campos son obligatorios.";
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo.trim())) {
        return "El formato del correo no es válido.";
    }

    const regexTelefono = /^[0-9]{8,}$/;
    if (!regexTelefono.test(telefono)) {
        alert("El teléfono debe tener al menos 8 dígitos");
        return;
    }

    if (!validarContrasenna(contrasenna.trim())) {
        return "La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial.";
    }

    return null;
};

const registrarUsuario = async (req, res) => {
    const { nombre, primerApellido, segundoApellido, telefono, correo, contrasenna } = req.body;

    try {
        const errorValidacion = validarDatosRegistro({
            nombre,
            primerApellido,
            segundoApellido,
            telefono,
            correo,
            contrasenna
        });

        if (errorValidacion) {
            return res.status(400).json({
                message: errorValidacion
            });
        }

        const usuarioExistente = await usuario.findOne({ correo: correo.trim().toLowerCase() });
        if (usuarioExistente) {
            return res.status(400).json({
                message: "El correo electrónico ya está registrado."
            });
        }

        const hashedContrasenna = await bcrypt.hash(contrasenna.trim(), 10);

        const nuevoUsuario = new usuario({
            nombre: nombre.trim(),
            primerApellido: primerApellido.trim(),
            segundoApellido: segundoApellido.trim(),
            telefono: telefono.trim(),
            correo: correo.trim().toLowerCase(),
            contrasenna: hashedContrasenna
        });

        const usuarioGuardado = await nuevoUsuario.save();

        return res
            .status(201)
            .location(`/api/autenticacion/${usuarioGuardado._id}`)
            .json(usuarioGuardado);
            
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registrarUsuario
};
