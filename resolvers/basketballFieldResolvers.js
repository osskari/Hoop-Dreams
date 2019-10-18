module.exports = {
    queries: {
        allBasketballFields: async (root, args, context) => {
            let arr = [];
            await context.services.getAllBasketballFields(
                (err) => {
                    console.log(err)
                }
            ).then(data => { arr = data; });
            return arr;
        },
        basketballField: async (root, args, context) => {
            let field;
            await context.services.getBasketballFieldById(args.id,
                (err) => { console.log(err); }
            ).then( data => { field = data; });
            return field;
        }
    },
    types: {
        BasketballField: {
            pickupGames(root, args, context, info) {
                console.log("id", root.id);
                return context.db.PickupGame.find({location: root.id}, (err, games) => {
                    if (err) { console.log(err); }
                    return games;
                });
            }
        }
    }
}