module.exports = {
    queries: {
        allPickupGames: (root, args, context, info) => {
            return context.db.PickupGame.find({}, (err, pickupGames) => {
                if (err) { console.log(err); }
            });
        },
        pickupGame: (root, args, context, info) => {
            return context.db.PickupGame.findById(args.id, (err, pickupGame) => {
                if (err) { return err; }
            });
        }
    },
    mutations: {
        createPickupGame: (parent, pickupGame) => {;
        //    Player.findById(pickupGame.hostId, (err, player) => {
        //         if(err) {console.log("Player ", err)}
        //         else {
        //             console.log("Player found");
        //             field = BasketballFieldService.getBasketballFieldById(
        //                 pickupGame.basketballFieldId, 
        //                 (err) => {console.log("basketball ", err)}
        //             ).then(data => {
        //                 console.log("basketballfield found");
                        
        //             });
        //         }
        //     });
            context.db.PickupGame.create({
                start: pickupGame.start,
                end: pickupGame.end,
                location: pickupGame.basketballFieldId,
                host: pickupGame.hostId
            }, (err, pickupGame) => {
                if(err) {console.log(err)}
            })
        },
        removePickupGame: (parent, id) => ({}),
        addPlayerToPickupGame: (parent, player) => ({}),
        removePlayerFromPickupGame: (parent, id) => ({})
    },
    types: {
        PickupGame : {
            registeredPlayers(root, args, context, info) {
                return context.db.Player.find({}, (err, players) => {
                    if(err) {console.log("Player error: ",err)};
                    return players;
                });
            },
            location(root, args, context, info) {
                return context.db.BasketballFieldService.getAllBasketballFields(
                    (err) => {console.log("basketball ", err)}).then(data => data[0]);
            },
            host(root, args, context, info) {
                return context.db.Player.findById(root.host, (err, player) => {
                    if(err) {console.log(err);}
                });
            }
        }
    }
}