const Schema = require('mongoose').Schema;


module.exports = {
    graphQl:`
        type PickupGame {
            id: ID!
            start: Boolean!
            end: Boolean!
            location: BasketballField!
            registeredPlayers: [Player!]!
            host: Player!
        }
    `,
    mongoDb: new Schema({
        start: {type: Date, required: true},
        end: {type: Date, required: true},
        location: {type: Schema.Types.ObjectId, required: true},
        host: {type: Schema.Types.ObjectId, required: true}
    })
}