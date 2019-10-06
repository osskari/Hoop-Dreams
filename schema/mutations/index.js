const PickupGames = require('./pickupGames');
const Players = require('./players');

module.exports = `
    type Mutation {
        ${PickupGames}
        ${Players}
    }
`;