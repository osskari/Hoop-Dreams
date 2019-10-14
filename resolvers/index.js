const basketballFieldResolver = require('./basketballFieldResolvers');
const pickupGameResolver = require('./pickupGameResolvers');
const playerResolver = require('./playerResolvers');
const scalar = require('../schema/scalar').resolve;

module.exports = {
    ...scalar,
    Query: {
        ...playerResolver.queries,
        ...pickupGameResolver.queries,
        ...basketballFieldResolver.queries
    },
    Mutation: {
        ...playerResolver.mutations,
        ...pickupGameResolver.mutations
    },
    ...pickupGameResolver.types

};