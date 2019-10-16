const moment = require('moment');

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
        removePickupGame: (root, args, context, info) => context.db.PickupGame.deleteOne({ _id : args.id}).then(() => 
            context.db.PlayersInGame.deleteMany({"pickupGameId": args.id}).then(() => true).catch(err => err)
        ).catch(err => err),
        // adds a new player to a specified pickup game
        addPlayerToPickupGame: (root, args, context, info) => context.db.PickupGame.findById(args.input.pickupGameId).then( pickupGame =>
            context.db.PlayersInGame.create({ 
                "playerId": args.input.playerId, 
                "pickupGameId": args.input.pickupGameId 
            }).then(() => pickupGame)
            .catch((err) => err)
        ).catch(err => err),
        removePlayerFromPickupGame: (root, args, context, info) => context.db.PickupGame.findById(args.input.pickupGameId).then( pickupGame =>
            args.db.PlayersInGame.deleteOne({
                "playerId": args.input.playerId,
                "pickupGameId": args.input.pickupGameId
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
            location: (root, args, context, info) =>  context.service.BasketballFieldService.getBasketballFieldById(root.location, (err) => err).then(data => data),
            // Finding the host of the game
            host: (root, args, context, info) =>  context.db.Player.findById(root.host).then(data => data).catch(err => err)
        }
    }
}