const gql = String.raw;

const vehiculoTypeDefs = gql`
  type Usuario {
    _id: ID
    nombre: String
    lastName: String
    correo: String
    telefono: String
  }

  type Vehiculo {
    _id: ID!
    marca: String!
    modelo: String!
    anno: Int!
    precio: Float!
    estado: String!
    imagen: String!
    usuario: Usuario
  }

  type VehiculosPaginados {
    vehiculos: [Vehiculo!]!
    paginaActual: Int!
    totalPaginas: Int!
  }

  extend type Query {
    filtroVehiculos(
      marca: String
      modelo: String
      anno_min: Int
      anno_max: Int
      precio_min: Float
      precio_max: Float
      estado: String
      page: Int!
      limit: Int!
    ): VehiculosPaginados!

    obtenerVehiculoPorId(id: ID!): Vehiculo
    obtenerMisVehiculos: [Vehiculo!]!
    obtenerVehiculoEdicion(id: ID!): Vehiculo
  }
`;

module.exports = vehiculoTypeDefs;