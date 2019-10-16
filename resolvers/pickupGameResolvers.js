const { PickupGame, Player, PlayersInGame } = require("../data/db");
const BasketballFieldService = require("../services/basketballFieldService");
const moment = require('moment');

module.exports = {
    queries: {
        allPickupGames: () => PickupGame.find({}).then(pickupGames => pickupGames).catch(err => err),
        pickupGame: (parent, args) => PickupGame.findById(args.id).then(pickupGame => pickupGame).catch(err => err)
    },
    mutations: {
        // Creates a pickup game and returns the created pickup game
        createPickupGame: (parent, pickupGame) =>  PickupGame.create({
                start: moment(pickupGame.input.start).toISOString(),
                end: moment(pickupGame.input.end).toISOString(),
                location: pickupGame.input.basketballFieldId,
                host: pickupGame.input.hostId})
            .then(data => data)
            .catch(err => err),
        // Removes a pickup game aftre id
        removePickupGame: (parent, id) => PickupGame.deleteOne({ _id : id}).then(() => 
            PlayersInGame.deleteMany({"pickupGameId": id}).then(() => true).catch(err => err)
        ).catch(err => err),
        // adds a new player to a specified pickup game
        addPlayerToPickupGame: (parent, connection) => PickupGame.findById(connection.input.pickupGameId).then( pickupGame =>
            PlayersInGame.create({ 
                "playerId": connection.input.playerId, 
                "pickupGameId": connection.input.pickupGameId 
            }).then(() => pickupGame)
            .catch((err) => err)
        ).catch(err => err),
        removePlayerFromPickupGame: (parent, connection) => PickupGame.findById(connection.input.pickupGameId).then( pickupGame =>
            PlayersInGame.deleteOne({
                "playerId": connection.input.playerId,
                "pickupGameId": connection.input.pickupGameId
            }).then(() => true)
            .catch(err => err)
        ).catch(err => err)
    },
    types: {
        PickupGame : {
            // going through all players in game and returning them as an list
            registeredPlayers: parent => PlayersInGame.find({'pickupGameId': parent.id})
                .then(ping => ping.map(
                    p => Player.findById(p.playerId).then(player => player).catch(err => err)
                )).catch(err => err),
            // location holds the id of the basketball field stored in a heroku api
            location: parent =>  BasketballFieldService.getBasketballFieldById(parent.location, (err) => err).then(data => data),
            // Finding the host of the game
            host: parent =>  Player.findById(parent.host).then(data => data).catch(err => err)
        }
    }
}