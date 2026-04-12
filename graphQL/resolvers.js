const vehiculoResolvers = require('./vehiculos/vehiculo.resolver');
const conversacionesResolvers = require('./conversaciones/conversacion.resolver');

const resolvers = {
    Query: {
        ...vehiculoResolvers.Query,
        ...conversacionesResolvers.Query
    }
};

module.exports = resolvers;