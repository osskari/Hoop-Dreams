const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/index');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
    /*
        Add typeDefs
        Add resolvers
    */
});

server.listen()
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));
