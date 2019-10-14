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
                console.log(parent.id);
            }
        }
    }
}