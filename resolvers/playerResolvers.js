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
                    //If error has been set, return NotFoundError
                    return new NotFoundError();
                } else {
                    //If error var was not set, return the found player
                    return playerFound;
                }
            } else {
                //Return NotFoundError if the given id is not valid
                return new NotFoundError();
            }
        }
    },
    mutations: {
        createPlayer: (parent, args, context, info) => {
            return Player.create({
                name: args.input.name
            }).then(data => data).catch(err => err);
        },
        updatePlayer: (parent, args, context, info) => {
            return Player.update(
                { "_id": args.id },
                { name: args.input.name }
            ).then(() => Player.findById(args.id).then(data => data).catch(err => err)).catch(err => err);
        },
        removePlayer: (parent, args, context, info) => ({})
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