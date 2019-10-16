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
        start: {type: Date, required: true},
        end: {type: Date, required: true},
        location: {type: String, required: true},
        host: {type: Schema.Types.ObjectId, required: true}
    })
}