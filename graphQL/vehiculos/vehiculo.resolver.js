const Vehiculo = require('../../modelos/vehiculo');
const validarFiltroVehiculos = require('../../validaciones/vehiculos/filtroVehiculos');

const vehiculoResolvers = {
    Query: {
        filtroVehiculos: async (_, args) => {
            try {
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
                    .populate('usuario')
                    .skip(skip)
                    .limit(limite);

                return {
                    vehiculos,
                    paginaActual: pagina,
                    totalPaginas
                };

            } catch (error) {
                throw new Error(error.message || 'Error en filtroVehiculos');
            }
        },

        obtenerVehiculoPorId: async (_, { id }, contexto) => {
            try {
                const vehiculo = await Vehiculo.findById(id).populate('usuario');

                if (!vehiculo) {
                    throw new Error('Vehículo no encontrado');
                }

                let usuarioData;

                if (contexto.usuario) {
                    usuarioData = vehiculo.usuario;
                } else {
                    usuarioData = {
                        nombre: vehiculo.usuario.nombre
                    };
                }

                return {
                    ...vehiculo.toObject(),
                    usuario: usuarioData
                };

            } catch (error) {
                throw new Error(error.message || 'Error al obtener vehículo');
            }
        },

        obtenerMisVehiculos: async (_, __, contexto) => {
            try {
                if (!contexto.usuario || !contexto.usuario.id) {
                    throw new Error('Usuario no autenticado');
                }

                const vehiculos = await Vehiculo.find({
                    usuario: contexto.usuario.id,
                    estado: 'Disponible'
                }).populate('usuario');

                return vehiculos;

            } catch (error) {
                throw new Error(error.message || 'Error al obtener mis vehículos');
            }
        },

        obtenerVehiculoEdicion: async (_, { id }, contexto) => {
            try {
                if (!contexto.usuario || !contexto.usuario.id) {
                    throw new Error('Usuario no autenticado');
                }

                const vehiculo = await Vehiculo.findById(id).populate('usuario');

                if (!vehiculo) {
                    throw new Error('Vehículo no encontrado');
                }

                if (vehiculo.usuario._id.toString() !== contexto.usuario.id) {
                    throw new Error('No tiene permiso para editar este vehículo');
                }

                return vehiculo;

            } catch (error) {
                throw new Error(error.message || 'Error al obtener vehículo para edición');
            }
        }
    }
};

module.exports = vehiculoResolvers;