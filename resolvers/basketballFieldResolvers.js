const Moment = require('moment');

module.exports = {
    queries: {
        allBasketballFields: async (root, args, context) => {
            let arr = []
            await context.services.getAllBasketballFields(
                (data) => {
                    data.forEach(i => {
                        arr.push({
                            id: i.id,
                            name: i.name,
                            capacity: i.capacity,
                            yearOfCreation: Moment(i.yearOfCreation).toISOString(),
                            pickupGames: [],
                            status: i.status
                        });
                    });
                },
                (err) => {
                    console.log(err)
                }
            );
            Promise.resolve("Success");
            return arr;
        },
        basketballField: (id) => ({})
    }
}