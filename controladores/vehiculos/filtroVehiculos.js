const Vehiculo = require('../../modelos/vehiculo');

const filtroVehiculos = async (req, res) => {
  try {
    const { 
      marca, modelo, 
      anno_min, anno_max, 
      precio_min, precio_max, 
      estado, page, limit
    } = req.query;

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
      if (precio_min) filtro.precio.$gte = parseInt(precio_min); //mayor igual que
      if (precio_max) filtro.precio.$lte = parseInt(precio_max); //menor igual que
    }

    if (estado) {
      filtro.estado = {
        $regex: estado,
        $options: "i"
      };
    }

    const pagina = parseInt(page);
    const limite = parseInt(limit);

    // Calcula cuántos registros se deben pasar (paginación)
    const skip = (pagina - 1) * limite; 

    const totalVehiculos = await Vehiculo.countDocuments(filtro);
    
    // Calcula el total de páginas según el número de vehículos y el límite por página
    const totalPaginas = Math.ceil(totalVehiculos / limite);

    const vehiculos = await Vehiculo
      .find(filtro)
      .skip(skip)
      .limit(limite);

    res.status(200).json({
      vehiculos,
      paginaActual: pagina,
      totalPaginas
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al filtrar vehículos",
      error: error.message
    });
  }
};

module.exports = {
  filtroVehiculos
};