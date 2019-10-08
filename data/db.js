const mongoose = require('mongoose');
const playerSchema = require('../schema/types/player').mongoDb;
const pickupGameSchema = require('../schema/types/pickupGame').mongoDb;
const playersInGamesSchema = require('../schema/types/playersInGames').mongoDb;

const connectionString = 'mongodb+srv://admin:Admin12345@hoops-aj2kw.mongodb.net/Hoops?retryWrites=true&w=majority';
const connection = mongoose.createConnection(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });


module.exports = {
    PickupGame: connection.model('PickupGame', pickupGameSchema, 'PickupGames'),
    Player: connection.model('Player', playerSchema, 'Players'),
    PlayersInGame: connection.model('PlayersInGame', playersInGamesSchema, 'PlayersInGames')
}
