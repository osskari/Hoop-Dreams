const { PickupGame, Player, PlayersInGame } = require('../data/db');
const { NotFoundError, InvalidObjectIdError } = require('../errors.js');
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
                //Return InvalidObjectIdError if the given id is not valid
                return new InvalidObjectIdError();
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
        removePlayer: (parent, args, context, info) => {
            if (!mongodb.ObjectID.isValid(args.id)) {
                return new InvalidObjectIdError();
            }
            //If player is found do stuff, else return NotFoundError
            if (Player.findById(args.id).then(data => { (data == null) ? false : true }).catch(err => false)) {
                Player.updateOne(
                    { "_id": args.id },
                    { deleted: true }
                ).then(data => data).catch(err => err);
                //Arrya of all games that this person is a host of
                return PickupGame.find({}).then(games => {
                    pg = games.filter(g => g.host == args.id)
                    if (pg.length == 0) {
                        //If he is not a host of any game, return true;
                        return true;
                    }
                    for (var game in pg) {
                        PlayersInGame.find({ "pickupGameId": game.id }).then(ping => {
                            if (ping == null) {
                                //remove game
                                PickupGame.updateOne(
                                    { "_id": game.id },
                                    { deleted: true }
                                )
                            }
                            else {
                                //Update games host to new player alphabetically
                                ping.sort(a => a.name);
                                PickupGame.updateOne(
                                    { "_id": game.id },
                                    { host: ping[0].id }
                                )
                            }
                        }).catch(err => err);
                    };
                    return true;
                }).catch(err => err);

            } else {
                return new NotFoundError();
            }
        }
    },
    types: {
        Player: {
            playedGames: parent => {
                //ping = peopleInGame
                var ping = [];
                return PlayersInGame.find({ playerId: parent.id }, (err, connection) => {
                    if (err) { return new Error(); }
                    connection.map(c => PickupGame.findById(c.pickupGameId, (err, pickupGame) => {
                        if (err) { return new Error(); }
                        ping.push(pickupGame);
                    }));
                    return ping;
                });
            }
        }
    }
}