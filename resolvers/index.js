const basketballFieldResolver = require('./basketballFieldResolvers');
const pickupGameResolver = require('./pickupGameResolvers');
const playerResolver = require('./playerResolvers');
const scalar = require('../schema/scalar/index').scalar;

module.exports = {
    Query: {
        ...playerResolver.queries,
        ...pickupGameResolver.queries,
        ...basketballFieldResolver.queries
    },
    Mutation: {
        ...playerResolver.mutations,
        ...pickupGameResolver.mutations
    }


};