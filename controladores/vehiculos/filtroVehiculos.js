const Vehiculo = require('../../modelos/vehiculo');


const filtroVehiculos = async (req, res) => {
  try {
    const { marca, modelo, anno_min, anno_max, precio_min, precio_max, estado } = req.query;
    const filtro = {};

if (marca) {
    filtro.marca = { 
        $regex: marca,
        $options: "i" 
    };
}
    if (modelo) {
        filtro.modelo = {
            $regex: modelo,
            $options: "i"
        };
    }
    if (anno_min || anno_max) {
        filtro.anno = {};                    
        if (anno_min) filtro.anno.$gte = parseInt(anno_min); 
        if (anno_max) filtro.anno.$lte = parseInt(anno_max);
    }
    if (precio_min || precio_max) {
        filtro.precio = {};
        if (precio_min) filtro.precio.$gte = parseInt(precio_min);
        if (precio_max) filtro.precio.$lte = parseInt(precio_max);
    }
    if (estado) {
        filtro.estado = estado;
    }

    const vehiculos = await Vehiculo.find(filtro);

    if (vehiculos.length === 0) {
        return res.status(404).json({ message: "No se encontraron vehiculos con el filtro aplicado"});
    }

    res.status(200).json(vehiculos);

  } catch (error) {
    res.status(500).json({ message: "Error al filtrar vehículos", error: error.message });
  }
};

module.exports = {
    filtroVehiculos
};