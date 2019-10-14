const Moment = require('moment');

module.exports = {
    queries: {
        allBasketballFields: async (root, args, context) => {
            let arr = []
            await context.services.getAllBasketballFields(
                (data) => {
                    // let arr = [];
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
                    console.log("yarr", arr);
                    return arr;
                    // arr = data;
                },
                (err) => {
                    console.log(err)
                }
            ).then( () => { console.log("then", arr); return []; });
            // console.log("darr", arr);
            // // console.log(a);
            // return arr;
            
        },
        basketballField: (id) => ({})
    }
}