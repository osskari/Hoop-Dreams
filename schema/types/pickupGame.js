const Schema = require('mongoose').Schema;


module.exports = {
    graphQl:`
        type PickupGame {
            id: ID!
            start: Moment!
            end: Moment!
            location: BasketballField!
            registeredPlayers: [Player!]!
            host: Player!
        }
    `,
    mongoDb: new Schema({
        start: {type: String, required: true},
        end: {type: String, required: true},
        location: {type: String, required: true},
        host: {type: Schema.Types.ObjectId, required: true}
    })
}