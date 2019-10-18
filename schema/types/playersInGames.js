const Schema = require('mongoose').Schema;

module.exports = {
    mongoDb: new Schema({
        playerId: { type: Schema.Types.ObjectId, required: true },
        pickupGameId: { type: Schema.Types.ObjectId, required: true }
    })
};