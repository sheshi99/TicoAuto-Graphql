const Vehiculo = require('../modelos/vehiculo');
const validarFiltroVehiculos = require('../validaciones/vehiculos/filtroVehiculos');

const resolvers = {
    Query: {
        filtroVehiculos: async (_, args) => {
            try {

                // Validar los datos de entrada
                const validacion = validarFiltroVehiculos(args);

                if (validacion.error) {
                    throw new Error(validacion.error);
                }

                const {
                    pagina,
                    limite,
                    annoMinNum,
                    annoMaxNum,
                    precioMinNum,
                    precioMaxNum
                } = validacion;

                const {
                    marca,
                    modelo,
                    anno_min,
                    anno_max,
                    precio_min,
                    precio_max,
                    estado
                } = args;

                const filtro = {};

                if (marca) {
                    filtro.marca = {
                        $regex: marca,
                        $options: 'i'
                    };
                }

                if (modelo) {
                    filtro.modelo = {
                        $regex: modelo,
                        $options: 'i'
                    };
                }

                if (anno_min || anno_max) {
                    filtro.anno = {};
                    if (anno_min) filtro.anno.$gte = annoMinNum;
                    if (anno_max) filtro.anno.$lte = annoMaxNum;
                }

                if (precio_min || precio_max) {
                    filtro.precio = {};
                    if (precio_min) filtro.precio.$gte = precioMinNum;
                    if (precio_max) filtro.precio.$lte = precioMaxNum;
                }

                if (estado) {
                    filtro.estado = {
                        $regex: estado,
                        $options: 'i'
                    };
                }

                const skip = (pagina - 1) * limite;

                const totalVehiculos = await Vehiculo.countDocuments(filtro);
                const totalPaginas = Math.ceil(totalVehiculos / limite);

                const vehiculos = await Vehiculo.find(filtro)
                    .skip(skip)
                    .limit(limite);

                return {
                    vehiculos,
                    paginaActual: pagina,
                    totalPaginas
                };

            } catch (error) {
                throw new Error(error.message || "Error en filtroVehiculos");
            }
        }
    }
};

module.exports = resolvers;