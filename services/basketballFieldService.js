const requestPromise = require('request-promise');
const errors = require('../errors');
const Moment = require('moment');

const BasketballFieldService = () => {
    const getAllBasketballFields = async () => {
        let arr = [];
        try {
            await requestPromise({
                uri: 'https://basketball-fields.herokuapp.com/api/basketball-fields',
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            }).then(data => {
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
            await requestPromise({
                uri: `https://basketball-fields.herokuapp.com/api/basketball-fields/${id}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            }).then( data => {
                ret = {
                    id: data.id,
                    name: data.name,
                    capacity: data.capacity,
                    yearOfCreation: Moment(data.yearOfCreation).toISOString(),
                    status: data.status,
                };
            });
        } catch(err) {
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

// Examples

// BasketballFieldService().getAllBasketballFields().then(data => {
// //     Do stuff
//     console.log(data);
// })
// .catch(err => {
// //     Handle errors
//     console.log(err)
// });

// BasketballFieldService().getBasketballFieldById('647ffc67-265c-40a4-84c9-ccdcd2fdeac7')
// .then(data => {
// //     Do stuff
//     console.log(data);
// })
// .catch(err => {
// //     Handle errors
//     console.log(err);
// });
