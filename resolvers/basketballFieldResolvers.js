const Moment = require('moment');

module.exports = {
    queries: {
        allBasketballFields: async (root, args, context) => {
            let arr = [];
            await context.services.getAllBasketballFields(
                (err) => {
                    console.log(err)
                }
            ).then(data => {
                data.forEach(i => {
                    arr.push({
                        id: i.id,
                        name: i.name,
                        capacity: i.capacity,
                        yearOfCreation: i.yearOfCreation,
                        pickupGames: [],
                        status: i.status
                    });
                });
            });
            return arr;
        },
        basketballField: async (root, args, context) => {
            let field;
            await context.services.getBasketballFieldById(args.id,
                (err) => { console.log(err); }
            ).then( data => { field = data; });
            return field;
        }
    }
}