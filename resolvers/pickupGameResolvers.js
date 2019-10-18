
const { PickupGameAlreadyPassedError, PlayerAlreadyRegistered, PickupGameOverlapError, NotFoundError, BasketballFieldClosedError } = require('../errors');
const moment = require('moment');

module.exports = {
   queries: {
      allPickupGames: (root, args, context, info) => context.services.pickupGameService.findPickupGames({}).then(pickupGames => pickupGames).catch(err => err),
      pickupGame: (root, args, context, info) => context.services.pickupGameService.findPickupGames({ "_id": args.id }).then(pickupGame => pickupGame[0]).catch(err => err)
   },
   mutations: {
      // Creates a pickup game and returns the created pickup game
      createPickupGame: (root, args, context, info) => {
         return context.services.basketballFieldService.getBasketballFieldById(args.input.basketballFieldId)
            .then(field => {
               if (field.status == "CLOSED") {
                  return new BasketballFieldClosedError();
               }
               return context.db.PickupGame.create({
                  start: moment(args.input.start).toISOString(),
                  end: moment(args.input.end).toISOString(),
                  location: args.input.basketballFieldId,
                  host: args.input.hostId
               })
                  .then(data => data)
                  .catch(err => err)
            })
            .catch(err => err);

      },
      // Removes a pickup game by id
      removePickupGame: (parent, id, context, info) => {
         return context.db.PickupGame.deleteOne({ "_id": id })
            .then(() => {
               return context.db.PlayersInGame.deleteMany({ "pickupGameId": id }).then(() => true).catch(err => err)
            })
            .catch(err => err)
      },
      // adds a new player to a specified pickup game
      addPlayerToPickupGame: (parent, connection, context, info) => {
         bbfs = context.services.basketballFieldService;
         pgs = context.services.pickupGameService;
         ps = context.services.playerService;
         pings = context.db.PlayersInGame;
         // Finds pickup game
         return pgs.findPickupGames({ "_id": connection.input.pickupGameId })
            .then(pickupGame => {
               pickupGame = pickupGame[0];
               if (pickupGame.end > moment()) {
                  return new PickupGameAlreadyPassedError();
               }
               // finds player
               return ps.findPlayers({ "_id": connection.input.playerId })
                  .then(player => {
                     player = player[0];

                     // Finds the field
                     return bbfs.getBasketballFieldById(pickupGame.location)
                        .then(loc => {
                           return pings.find({ 'pickupGameId': connection.input.pickupGameId })
                              // Gets all players in pick up game
                              .then(pingForGame => {
                                 if (pingForGame.filter(ping => ping.playerId == player.id).length != 0) {
                                    return new PlayerAlreadyRegistered();
                                 }
                                 if (loc.capacity == pingForGame.length) {
                                    return new PickupGameAlreadyPassedError();
                                 }
                                 // Gets all connections player played in 
                                 return pings.find({ 'playerId': connection.input.playerId })
                                    .then(pingForPlayer => {
                                       // Gets all pickup games player played in
                                       return pgs.findPickupGames({})
                                          .then(pickupGames => {
                                             pgids = pingForGame.map(pingfg => pingfg.playerId);
                                             pickupGames = pickupGames.filter(pg => pgids.includes(pg.id));
                                             for (var i = 0; i < pickupGames.length; i++) {
                                                if (pickupGame.start > pickupGames[i].start > pickupGame.end) {
                                                   return new PickupGameOverlapError();
                                                }
                                                if (pickupGames[i].start > pickupGame.start > pickupGames[i].end) {
                                                   return new PickupGameOverlapError();
                                                }
                                             }
                                             // creates a player pickupgame connection
                                             return pings.create({
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
      removePlayerFromPickupGame: (parent, connection, context, info) => {
         return context.services.pickupGameService.findPickupGames({ "_id": connection.input.pickupGameId })
            .then(pg => {
               return context.services.playerService.findPlayers({ "_id": connection.input.playerId }).then(player => {
                  player = player[0];
                  pg = pg[0];
                  if (pg == null || player == null) {
                     return new NotFoundError();
                  }
                  return context.db.PlayersInGame.deleteOne({
                     "playerId": connection.input.playerId,
                     "pickupGameId": connection.input.pickupGameId
                  })
                     .then(() => true)
                     .catch(err => err)
               })
            })
            .catch(err => err)
      }
   },
   types: {

      PickupGame: {
         // going through all players in game and returning them as an list
         registeredPlayers: (root, args, context, info) => {
            return context.db.PlayersInGame.find({ 'pickupGameId': root.id })
               .then(ping => {
                  console.log(ping);

                  return ping.map(p => context.services.playerService.findPlayers({ "_id": p.playerId })
                     .then(player => {
                        console.log(player);
                        return player[0];
                     })
                     .catch(err => err));
               }).catch(err => err)
         },
         // location holds the id of the basketball field stored in a heroku api
         location: (parent, args, context, info) => context.services.basketballFieldService.getBasketballFieldById(parent.location).then(data => data).catch(err => err),
         // Finding the host of the game
         host: (root, args, context, info) => context.services.playerService.findPlayers({ "_id": root.host }).then(data => data[0]).catch(err => err)
      }
   }
}