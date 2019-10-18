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
        allPlayers: (root, args, context, info) => context.services.playerService.findPlayers({}).then(players => players).catch(err => new Error(err)),
        player: (root, args, context, info) => {
            //Checking if its a valid mongoDB id
            if (mongodb.ObjectID.isValid(args.id)) {
                return context.services.playerService.findPlayers({ "_id": args.id }).then(player => {
                    if (player == []) {
                        return new NotFoundError();
                    }
                    return player[0];
                });
            } else {
                //Return InvalidObjectIdError if the given id is not valid
                return new InvalidObjectIdError();
            }
        }
    },
    mutations: {
        createPlayer: (parent, args, context, info) => {
            return context.db.Player.create({
                name: args.input.name
            }).then(data => data).catch(err => err);
        },
        updatePlayer: (parent, args, context, info) => {
            return context.db.Player.update(
                { "_id": args.id },
                { name: args.input.name }
            ).then(() =>
                context.services.playerService.findPlayers({ "_id": args.id })
                    .then(data => {
                        if (data == []) { return new NotFoundError(); }
                        return data[0]
                    }).catch(err => err))
                .catch(err => err);
        },
        removePlayer: (parent, args, context, info) => {
            if (!mongodb.ObjectID.isValid(args.id)) {
                return new InvalidObjectIdError();
            }
            //If player is found do stuff, else return NotFoundError
            if (context.services.playerService.findPlayers({ "_id": args.id }).then(data => { (data[0] == null) ? false : true }).catch(err => false)) {
                Player.updateOne(
                    { "_id": args.id },
                    { deleted: true }
                ).then(data => data).catch(err => err);
                //Arrya of all games that this person is a host of
                return context.services.pickupGameService.findPickupGames({}).then(games => {
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
            playedGames: (root, args, context, info) => {
                //ping = peopleInGame
                var ping = [];
                return PlayersInGame.find({ playerId: parent.id }, (err, connection) => {
                    if (err) { return new Error(); }
                    connection.map(c => context.services.pickupGameService.findPickupGames({ "_id": c.pickupGameId }).then(pickupGame => {
                        if (err) { return new Error(); }
                        if (pickupGame == []) { return; }
                        ping.push(pickupGame[0]);
                    }));
                    return ping;
                });
            }
        }
    }
}