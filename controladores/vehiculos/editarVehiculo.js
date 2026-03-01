const Vehiculo = require("../../modelos/vehiculo");

const editarVehiculo = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const imagen = req.file; // Verificar si se ha subido una nueva imagen
        if (imagen) {
            // Actualizar el campo de imagen con el nuevo nombre de archivo
            body.imagen = req.file.filename;
        }

        const opciones = { new: true }; 
        const updatedVehiculo = await Vehiculo.findByIdAndUpdate(id, body, opciones);
        if (!updatedVehiculo) { 
            return res.status(404);
        }
        res.status(200).json(updatedVehiculo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    editarVehiculo
};