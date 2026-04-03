const usuario = require('../../modelos/usuario');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const verificarCodigo2FA = async (req, res) => {
    const { usuarioId, codigo } = req.body;

    if (!usuarioId || !codigo || !codigo.trim()) {
        return res.status(400).json({
            message: "Usuario y código son requeridos."
        });
    }

    try {
        const usuarioEncontrado = await usuario.findById(usuarioId);

        if (!usuarioEncontrado) {
            return res.status(404).json({
                message: "Usuario no encontrado."
            });
        }

        if (!usuarioEncontrado.loginPendiente) {
            return res.status(400).json({
                message: "No hay un inicio de sesión pendiente."
            });
        }

        if (!usuarioEncontrado.codigo2FA || !usuarioEncontrado.codigo2FAExpira) {
            return res.status(400).json({
                message: "No hay un código activo."
            });
        }

        if (usuarioEncontrado.codigo2FAExpira < new Date()) {
            return res.status(400).json({
                message: "El código expiró."
            });
        }

        if (usuarioEncontrado.codigo2FA !== codigo.trim()) {
            return res.status(401).json({
                message: "El código es incorrecto."
            });
        }

        usuarioEncontrado.codigo2FA = null;
        usuarioEncontrado.codigo2FAExpira = null;
        usuarioEncontrado.loginPendiente = false;

        await usuarioEncontrado.save();

        const token = jwt.sign(
            {
                id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                correo: usuarioEncontrado.correo,
                proveedor: usuarioEncontrado.proveedor
            },
            SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        return res.status(200).json({
            message: "Código verificado correctamente.",
            token,
            usuarioId: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
            proveedor: usuarioEncontrado.proveedor
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    verificarCodigo2FA
};