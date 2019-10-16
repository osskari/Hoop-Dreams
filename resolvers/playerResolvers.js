const { PickupGame, Player, PlayersInGame } = require('../data/db');
const { NotFoundError } = require('../errors.js');
const mongodb = require("mongodb");
//Finds and return all players in the database
const allPlayers = Player.find({}, (err, players) => {
    if (err) { throw new Error(err); }
    return players;
})

module.exports = {
    queries: {
        allPlayers: () => allPlayers,
        player: async (parent, args) => {
            var error = false;
            //Checking if its a valid mongoDB id
            if (mongodb.ObjectID.isValid(args.id)) {
                const playerFound = await Player.findById({ _id: args.id }, (err, player) => {
                    if (player == null) {
                        //If player is not found set error to true, and return a NotFoundError()
                        error = true;
                    }
                });
                if (error) {
                    return new NotFoundError();
                } else {
                    return playerFound;
                }
            } else {
                return new NotFoundError();
            }
        }
    },
    mutations: {
        createPlayer: (player) => ({}),
        updatePlayer: (id, player) => ({}),
        removePlayer: (id) => ({})
    },
    types: {
        Player: {
            playedGames: parent => {
                //ping = peopleInGame
                var ping = [];
                return PlayersInGame.find({ playerId: parent.id }, (err, connection) => {
                    if (err) { return; /*TODO?*/ }
                    connection.map(c => PickupGame.findById(c.pickupGameId, (err, pickupGame) => {
                        if (err) { return; /*TODO?*/ }
                        ping.push(pickupGame);
                    }));
                    return ping;
                });
            }
        }
    }
}