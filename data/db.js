const requestPromise = require('request-promise');
const mongoose = require('mongoose');
const playerSchema = require('../schema/types/player').mongoDb;
const pickupGameSchema = require('../schema/types/pickupGame').mongoDb;
const playersInGamesSchema = require('../schema/types/playersInGames').mongoDb;

const connectionString = 'mongodb+srv://admin:Admin12345@hoops-aj2kw.mongodb.net/test?retryWrites=true&w=majority';
const hebbo = 'mongodb+srv://hebbo:Hebbo1337@hoops-aj2kw.mongodb.net/Hoops?retryWrites=true&w=majority';
const connection = mongoose.createConnection(hebbo, { useNewUrlParser: true, useUnifiedTopology: true });


module.exports = {
    // basketballFields: (id) => {
    //     let uri = 'https://basketball-fields.herokuapp.com/api/basketball-fields';
    //     if(id != undefined){ uri += `/${id}` }
    //     return requestPromise({
    //     uri: uri,
    //     headers: {
    //         'User-Agent': 'Request-Promise'
    //     },
    //     json: true
    // }
    // )},
    PickupGame: connection.model('PickupGame', pickupGameSchema, 'PickupGames'),
    Player: connection.model('Player', playerSchema, 'Players'),
    PlayersInGame: connection.model('PlayersInGame', playersInGamesSchema, 'PlayersInGames')
}