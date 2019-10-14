const PickupGames = require('./pickupGames');
const BasketballFields = require('./basketballFields');
const Players = require('./players')
module.exports = `
    type Query {
        ${PickupGames}
        ${BasketballFields}
        ${Players}
    }
`;