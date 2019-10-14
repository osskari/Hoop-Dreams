const { PickupGame, Player } = require("../data/db");
const BasketballFieldService = require("../services/basketballFieldService");
const Moment = require("moment");

module.exports = {
    queries: {
        allPickupGames: () => {
            return PickupGame.find({}, (err, pickupGames) => {
                if (err) {console.log(err)}
            });
        },
        pickupGame: (parent, args) => {
            return PickupGame.findById(args.id, (err, pickupGame) => {
                if (err) { return err }
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
            PickupGame.create({
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
            registeredPlayers(parent) {
                return Player.find({}, (err, players) => {
                    if(err) {console.log("Player error: ",err)};
                    return players;
                });
            },
            location(parent) {
                return BasketballFieldService.getAllBasketballFields(
                    (err) => {console.log("basketball ", err)}).then(data => data[0]);
            },
            host(parent) {
                return Player.findById(parent.host, (err, player) => {
                    if(err) {console.log(err);}
                })
            },
            start(parent) {
                return Moment(parent.start).format('llll');
            },
            end(parent) {
                return Moment(parent.end).format('llll');
            }
        }
    }
}