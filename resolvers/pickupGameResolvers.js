
const { PickupGameAlreadyPassedError , PlayerAlreadyRegistered, PickupGameOverlapError} = require('../errors');

module.exports = {
    queries: {
        allPickupGames: (root, args, context, info) => context.db.PickupGame.find({}).then(pickupGames => pickupGames).catch(err => err),
        pickupGame: (root, args, context, info) => context.db.PickupGame.findById(args.id).then(pickupGame => pickupGame).catch(err => err)
    },
    mutations: {
        // Creates a pickup game and returns the created pickup game
        createPickupGame: (root, args, context, info) =>  context.db.PickupGame.create({
                start: moment(args.input.start).toISOString(),
                end: moment(args.input.end).toISOString(),
                location: args.input.basketballFieldId,
                host: args.input.hostId
            })
            .then(data => data)
            .catch(err => err),
        // Removes a pickup game by id
        removePickupGame: (parent, id, context, info) => context.db.PickupGame.deleteOne({ "_id" : id}).then(() => 
            context.db.PlayersInGame.deleteMany({"pickupGameId": id}).then(() => true).catch(err => err)
        ).catch(err => err),
        // adds a new player to a specified pickup game
        addPlayerToPickupGame: (parent, connection, context, info) => {
            return context.db.PickupGame.findById(connection.input.pickupGameId)
            .then( pickupGame => {
                return context.db.Player.findById(connection.input.playerId)
                .then(player => {
                    if(pickupGame.end > new moment()) {
                        return new PickupGameAlreadyPassedError();
                    }
                    return context.services.getBasketballFieldById(pickupGame.location)
                    .then(loc => {
                        return context.db.PlayersInGame.find({'pickupGameId': connection.input.pickupGameId})
                        .then(pingForGame => {
                            if ( pingForGame.filter(ping => ping.playerId == player.id).length != 0 ) {
                                return new PlayerAlreadyRegistered();
                            }
                            if (loc.capacity == pingForGame.length) {
                                return new PickupGameAlreadyPassedError();
                            }
                            return context.db.PlayersInGame.find({'playerId': connection.input.playerId})
                            .then(pingForPlayer => {
                                return context.db.PickupGame.find({})
                                .then(pickupGames => {
                                    pgids = pingForGame.map(pingfg => pingfg.playerId);
                                    pickupGames = pickupGames.filter(pg => pgids.includes(pg.id));
                                    for(var i = 0; i < pickupGames.length; i++) {
                                        if(pickupGame.start > pickupGames[i].start > pickupGame.end) {
                                            return new PickupGameOverlapError();
                                        }
                                        if(pickupGames[i].start > pickupGame.start > pickupGames[i].end) {
                                            return new PickupGameOverlapError();
                                        }
                                    }
                                    return context.db.PlayersInGame.create({
                                        'playerId': connection.input.playerId,
                                        'pickupGameId': connection.input.pickupGameId
                                    })
                                    .then(() => pickupGame)
                                    .catch(err => err);
                                })
                                .catch(err => err);
                            })
                            .catch(err => err);
                        })
                        .catch(err => err);
                    })
                    .catch(err => err);
                })
                .catch(err => err);
            })
            .catch(err => err);
        },
        // Removes a player connection to a pickup game
        removePlayerFromPickupGame: (parent, connection, context, info) => context.db.PickupGame.findById(connection.input.pickupGameId).then( pickupGame =>
            context.db.PlayersInGame.deleteOne({
                "playerId": connection.input.playerId,
                "pickupGameId": connection.input.pickupGameId
            }).then(() => true)
            .catch(err => err)
        ).catch(err => err)
    },
    types: {

        PickupGame : {
            // going through all players in game and returning them as an list
            registeredPlayers: (root, args, context, info) => context.db.PlayersInGame.find({'pickupGameId': root.id})
                .then(ping => ping.map(
                    p => context.db.Player.findById(p.playerId).then(player => player).catch(err => err)
                )).catch(err => err),
            // location holds the id of the basketball field stored in a heroku api
            location: (parent, args, context, info) => context.services.getBasketballFieldById(parent.location, (err) => err).then(data => data),
            // Finding the host of the game
            host: (root, args, context, info) =>  context.db.Player.findById(root.host).then(data => data).catch(err => err)
        }
    }
}