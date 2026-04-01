const { consultarCedula } = require('../servicios/padronServicio');

const obtenerDatosCedula = async (req, res) => {
    const { cedula } = req.params;

    try {
        if (!/^\d{9}$/.test(cedula)) {
            return res.status(400).json({
                message: "Cédula inválida"
            });
        }

        const persona = await consultarCedula(cedula);

        if (!persona) {
            return res.status(404).json({
                message: "No encontrada en el padrón"
            });
        }

        return res.status(200).json(persona);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    obtenerDatosCedula
};