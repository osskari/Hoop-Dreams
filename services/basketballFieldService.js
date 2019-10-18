const requestPromise = require('request-promise');
const errors = require('../errors');
const Moment = require('moment');

const BasketballFieldService = () => {
    const getAllBasketballFields = async () => {
        return await requestPromise({
            uri: 'https://basketball-fields.herokuapp.com/api/basketball-fields',
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        });
    };

    const getBasketballFieldById = async (id) => {

        if (!id) { throw new Error("No id given") }
        return await requestPromise({
            uri: `https://basketball-fields.herokuapp.com/api/basketball-fields/${id}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        });
    };

    return {
        getAllBasketballFields,
        getBasketballFieldById
    }
};

module.exports = BasketballFieldService();

// Examples

// console.log("Hebbo", BasketballFieldService().getAllBasketballFields(
//     (data) => {
//         let arr = [];
//         data.forEach(i => {
//             arr.push({
//                 id: i.id,
//                 name: i.name,
//                 capacity: i.capacity,
//                 yearOfCreation: Moment(i.yearOfCreation).toISOString(),
//                 status: i.status
//             });
//         });
//         return arr;
//     },
//     (err) => {
//         console.log(err)
//     }
// ));

// BasketballFieldService().getBasketballFieldById('647ffc67-265c-40a4-84c9-ccdcd2fdeac7', 
//     (data) => {
//         console.log(data);
//         return {
//             id: data.id,
//             name: data.name,
//             capacity: data.capacity,
//             yearOfCreation: Moment(data.yearOfCreation).toISOString(),
//             status: data.status
//         };
//     },
//     (err) => { console.log(err); }
// );
