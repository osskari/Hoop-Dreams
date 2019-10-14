const { PickupGame, Player, PlayersInGame } = require('../data/db');
const { NotFoundError } = require('../errors.js');
//Finds and return all players in the database
const allPlayers = Player.find({}, (err, players) => {
    if (err) { throw new Error(err); }
    return players;
})

module.exports = {
    queries: {
        allPlayers: () => allPlayers,
        player: (parent, args) => {
            var error = null;
            const playerFound = Player.findById({ _id: args.id }, (err, player) => {
                if (err) { error = new NotFoundError() }
            });
            if (error == null) {
                return playerFound;
            } else {
                return error;
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
                var ping = [];
                return PlayersInGame.find({ playerId: parent.id }, (err, connection) => {
                    if (err) { console.log("dsd"); }
                    connection.map(c => PickupGame.findById(c.pickupGameId, (err, pickupGame) => {
                        if (err) { console.log("sad"); }
                        ping.push(pickupGame);
                    }));
                    return ping;
                });
           }
        }
    }
}