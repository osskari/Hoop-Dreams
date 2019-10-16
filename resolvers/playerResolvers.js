const { NotFoundError } = require('../errors.js');
const mongodb = require("mongodb");

module.exports = {
    queries: {
        allPlayers: (root, args, context, info) => context.db.Player.find({}, (err, players) => {
            if (err) { throw new Error(err); }
            return players;
        }),
        player: async (root, args, context, info) => {
            var error = false;
            //Checking if its a valid mongoDB id
            if (mongodb.ObjectID.isValid(args.id)) {
                const playerFound = await context.db.Player.findById({ _id: args.id }, (err, player) => {
                    if (player == null || err != null) {
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
            playedGames: (parent, args, context, info) => {
                //ping = peopleInGame
                var ping = [];
                return context.db.PlayersInGame.find({ playerId: parent.id }, (err, connection) => {
                    if (err) { return; /*TODO?*/ }
                    connection.map(c => context.db.PickupGame.findById(c.pickupGameId, (err, pickupGame) => {
                        if (err) { return; /*TODO?*/ }
                        ping.push(pickupGame);
                    }));
                    return ping;
                });
            }
        }
    }
}