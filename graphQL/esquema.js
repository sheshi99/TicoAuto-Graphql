const gql = String.raw;

const typeDefs = gql`
  type Vehiculo {
    _id: ID!
    marca: String!
    modelo: String!
    anno: Int!
    precio: Float!
    estado: String!
    imagen: String
    usuario: ID
  }

  type VehiculosPaginados {
    vehiculos: [Vehiculo!]!
    paginaActual: Int!
    totalPaginas: Int!
  }

  type Query {
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

  }
`;

module.exports = typeDefs;