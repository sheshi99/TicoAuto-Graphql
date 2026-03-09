const Pregunta = require("../../modelos/pregunta");
const Vehiculo = require("../../modelos/vehiculo");

const crearPregunta = async (req, res) => {

    const { vehiculo, pregunta } = req.body;

    if (!vehiculo || !pregunta) {
        return res.status(400).json({
            mensaje: "Un vehiculo y una pregunta son requeridos."
        });
    }

    try {

        // Verificar que el vehículo exista
        const vehiculoEncontrado = await Vehiculo.findById(vehiculo);

        if (!vehiculoEncontrado) {
            return res.status(404);
        }

        // Crear la pregunta
        const nuevaPregunta = await Pregunta.create({
            vehiculo: vehiculo,
            usuario: req.usuario.id, // usuario que hace la pregunta
            pregunta: pregunta.trim()
        });

        return res.status(201).json({nuevaPregunta});

    } catch (error) {

        return res.status(500).json({
            mensaje: "Error al crear la pregunta",
            error: error.message
        });
    }
};

module.exports = crearPregunta;