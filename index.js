require('dotenv').config();
require('./modelos/usuario');
require('./modelos/vehiculo');
require('./modelos/pregunta');
require('./modelos/respuesta');


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');

const typeDefs = require('./graphql/esquema');
const resolvers = require('./graphql/resolvers');
const contexto = require('./graphql/contexto');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['POST']
}));

app.use(express.json());

async function iniciarServidor() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a MongoDB exitosa');

        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers
        });

        await apolloServer.start();

        app.use(
            '/graphql',
            expressMiddleware(apolloServer, {
                context: async ({ req }) => contexto({ req })
            })
        );

        app.listen(process.env.PORT, () => {
            console.log(`Servidor GraphQL corriendo en puerto ${process.env.PORT}`);
            console.log(`GraphQL disponible en http://localhost:${process.env.PORT}/graphql`);
        });

    } catch (error) {
        console.error('Error al iniciar GraphQL:', error);
    }
}

iniciarServidor();