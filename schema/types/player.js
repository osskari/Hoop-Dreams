const {Schema} = require('mongoose');

module.exports = {
    graphQl: `
        type Player {
            id: ID!
            name: String!
            playedGames: [PickupGame!]!
        }
    `,
    mongoDb: new Schema({
        name: {type: String, required: true},
    })
};