const { basketballFields } = require('../data/db');
const errors = require('../errors');
const Moment = require('moment');

const BasketballFieldService = () => {
    const getAllBasketballFields = async () => {
        let arr = [];
        try {
            await basketballFields().then( data => {
                data.forEach(i => {
                    arr.push({
                        id: i.id,
                        name: i.name,
                        capacity: i.capacity,
                        yearOfCreation: Moment(i.yearOfCreation).toISOString(),
                        status: i.status
                    });
                });
            });
        } catch(err) {
            throw new Error(err);
        }
        return arr;
    };

    const getBasketballFieldById = async (id) => {
        if(!id){ throw new errors.UserInputError("No id given"); }
        let ret;
        try {
            await basketballFields(id).then( data => {
                ret = {
                    id: data.id,
                    name: data.name,
                    capacity: data.capacity,
                    yearOfCreation: Moment(data.yearOfCreation).toISOString(),
                    status: data.status,
                };
            });
        } catch(err){
            if (err == 'StatusCodeError: 404 - "Basketball field was not with this id."'){
                throw new errors.UserInputError(err);
            }
        }
        return ret
    }

    return {
        getAllBasketballFields,
        getBasketballFieldById
    }
};

module.exports = BasketballFieldService();

// BasketballFieldService().getAllBasketballFields().then(data => {
//     console.log(data);
// });

// BasketballFieldService().getBasketballFieldById()
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// });

