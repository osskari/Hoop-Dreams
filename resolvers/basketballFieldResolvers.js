module.exports = {
    queries: {
        allBasketballFields: async (root, args, context) => {
            let arr = [];
            await context.services.basketballFieldService.getAllBasketballFields().then(data => { arr = data; }).catch(err => err);
            return (args.status) ? arr = arr.filter(field => field.status == args.status) : arr;
        },
        basketballField: async (root, args, context) => {
            let field;
            await context.services.basketballFieldService.getBasketballFieldById(args.id).then(data => { field = data; }).catch(err => err);
            return field;
        }
    },
    types: {
        BasketballField: {
            pickupGames(root, args, context, info) {
                return context.db.PickupGame.find({ location: root.id }, (err, games) => {
                    if (err) { return err; }
                    return games;
                });
            }
        }
    }
}