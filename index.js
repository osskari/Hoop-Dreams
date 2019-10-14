const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/index');
const resolvers = require('./resolvers');
const Database = require('./data/db');
const Service = require('./services/basketballFieldService');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
        db: Database,
        services: Service
    })
});

server.listen()
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));
